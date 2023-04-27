import {createTransport} from 'nodemailer';
import { emailConfig } from '../config/app.config';
import { EmailTask } from '../modules/email-module/email.model';

export const sendEmail = async (emailTask:EmailTask) : Promise<boolean> =>{
    try{
        const mailTransporter = createTransport(emailConfig);
        const mailDetails = {
            from: emailTask.from_email,
            to: emailTask.send_to,
            subject: emailTask.subject,
            html: `<div>${emailTask.body}</div>`
        };
        console.log("mailDetails---",mailDetails);
        const info = await mailTransporter.sendMail(mailDetails);
        return true;
    } catch (ex) {
        console.log(ex);
        return false;
    }
}