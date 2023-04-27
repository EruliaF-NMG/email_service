import { CoreService } from "../../../core";
import { EmailEntity, IEmail } from "../entities/email.entity";
import { IEmailService } from "../interface/email-service.interface";

export class EmailService extends CoreService<IEmail> implements IEmailService<IEmail> {

    constructor() {
        super(EmailEntity);
    }
}