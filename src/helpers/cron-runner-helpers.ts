
import schedule from 'node-schedule';
import queueService from '../core/service/queue-service';
import { EmailTask } from '../modules/email-module/email.model';
import { EmailEntity, IEmail } from '../modules/email-module/entities/email.entity';
import { sendEmail } from './email-helpers';
import { EmailStatus } from '../config/core.enum';


const isEmailTask = (list:boolean|EmailTask): list is EmailTask => {
    return list != false; 
}

const runEmailTask = async () => { 
    console.log("crone strt");
    let currentTask:EmailTask;
    try {
        const taskList = await queueService.getAllTasks();
        if(!taskList) return;
        for( let i=0; i < (taskList as EmailTask[]).length; i++ ) {
            const result: boolean | EmailTask = await queueService.getLastElement();
            if(!isEmailTask(result)) continue;
            console.log("all task element - ",result);
            currentTask = {
                ...result,
                attempted:result.attempted+1
            }
            // Check task is insert to DB
            if( currentTask.hasOwnProperty('_id') && currentTask._id ) {
                // Try to send E-mail
                const status:boolean = await sendEmail(currentTask);
                console.log("send 1 - ",currentTask);
                if(status) await EmailEntity.findOneAndUpdate({_id:currentTask._id}, {state:EmailStatus.Send}, { new: true });
                if(!status && currentTask.attempted < 5) await queueService.pushElement(currentTask);
                if(!status && currentTask.attempted >= 5) await EmailEntity.findOneAndUpdate({_id:currentTask._id}, {state:EmailStatus.Failed}, { new: true });
                
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
                }
                console.log("new insert - ",currentTask);
                const status:boolean = await sendEmail(currentTask);
                console.log("send 2 - ",currentTask,status);
                if(!status) await queueService.pushElement(currentTask);
                else await EmailEntity.findOneAndUpdate({_id:currentTask._id}, {state:EmailStatus.Send}, { new: true });
            }
        }
    } catch (ex) {
       console.log(ex);
    }
}


schedule.scheduleJob("*/1 * * * *", runEmailTask);