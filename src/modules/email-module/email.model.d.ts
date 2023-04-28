import { type } from "os";
import { IEmail } from "./entities/email.entity";

export type EmailTask = {
    _id: string;
    subject: string;
    body: string;
    send_to: string;
    from_email: string;
    attempted:number
}

export type PagingEmailList = {
    current_page: number,
    total_pages: number
    data: Array<IEmail>,
    total_items: number,
    page_size: number,
}