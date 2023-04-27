import { IEmail } from "./entities/email.entity";

export type EmailTask = {
    _id: string;
    subject: string;
    body: string;
    send_to: string;
    from_email: string;
    attempted:number
}