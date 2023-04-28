import { Module } from "../../core";
import EmailController from "./controllers/email.controller";
import { EmailService } from "./services/email.service";


@Module({
    controllers:[EmailController],
    services:[
        { provide: 'IEmailService', useClass: EmailService },
    ]
})
export default class EmailModule{}