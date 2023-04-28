
import schedule from 'node-schedule';
import queueService from '../core/service/queue-service';
import { EmailTask } from '../modules/email-module/email.model';
import { EmailEntity, IEmail } from '../modules/email-module/entities/email.entity';
import { sendEmail } from './email-helpers';
import { EmailStatus } from '../config/core.enum';
import socketService from '../core/service/socket-service';
import { attemptedCount } from '../config/app.config';

/**
 * Type Guard for EmailTask
 * @param list 
 * @returns 
 */
const isEmailTask = (list:boolean|EmailTask): list is EmailTask => {
    return list != false; 
}

/**
 * update email entity and broadcast message 
 * @param id parent key
 * @param status EmailStatus
 * @param isNew is new or updated one
 * @returns 
 */
const updateEmailStatus = async (id:string,status:EmailStatus,isNew:Boolean=false):Promise<any> => {
    try {
        let result: any = await EmailEntity.findOneAndUpdate({_id:id}, {state:status}, { new: true });
        result = {
            ...result.toJSON(),
            _id:result._id.toString()
        }
        const broadcastKey= isNew ? 'new-email':'update-email';
        //broadcast message
        socketService.broadcast(broadcastKey,result);
        return result;
    }  catch (ex) {
        console.log(ex);
    }
}

/**
 * Run Task to save and send emails
 * @returns 
 */
const runEmailTask = async () => { 
    let currentTask:EmailTask;
    try {
        const taskList = await queueService.getAllTasks();
        if(!taskList) return;
        for( let i=0; i < (taskList as EmailTask[]).length; i++ ) {
            const result: boolean | EmailTask = await queueService.getLastElement();
            if(!isEmailTask(result)) continue;

            currentTask = {
                ...result,
                attempted:result.attempted+1
            }

            // Check task is insert to DB
            if( currentTask.hasOwnProperty('_id') && currentTask._id ) {
                // Try to send E-mail
                const status:boolean = await sendEmail(currentTask);

                if(status) await updateEmailStatus(currentTask._id,EmailStatus.Send);
                if(!status && currentTask.attempted < attemptedCount) await queueService.pushElement(currentTask);
                if(!status && currentTask.attempted >= attemptedCount) await updateEmailStatus(currentTask._id,EmailStatus.Failed);
                
            } else {
                // Save to DB and Try to send E-mail
                const {attempted, ...restCurrentTask} = currentTask;
                const {_id,subject,body,send_to,from_email} = await EmailEntity.create(restCurrentTask);
               
                currentTask = {
                    _id:_id.toString(),
                    subject,
                    body,
                    send_to,
                    from_email,
                    attempted:currentTask.attempted
                };
                
                const status:boolean = await sendEmail(currentTask);

                if(!status) await queueService.pushElement(currentTask);
                else await updateEmailStatus(currentTask._id,EmailStatus.Send,true);
            }
        }
    } catch (ex) {
       console.log(ex);
    }
}


schedule.scheduleJob("*/10 * * * *", runEmailTask);