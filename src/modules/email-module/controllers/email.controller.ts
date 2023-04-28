import { Request, Response } from "express";

import { exceptionOccurredResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, ValidateBodyRequest } from "../../../core";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import queueService from "../../../core/service/queue-service";
import { EmailDTO } from "../dtos/email.dto";
import { CustomRequest } from "../../../core/types/type.interface";
import { EmailTask } from "../email.model";
import { IEmail } from "../entities/email.entity";
import { IEmailService } from "../interface/email-service.interface";

@Injectable()
@Controller('/api/email')
export default class EmailController {
    
    constructor(
        @Inject("IEmailService") private _emailService: IEmailService<IEmail>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const data = await this._emailService.pagination(request.query);
            if(data) return response.status(successGetResponse.httpStatus).json(generateResponse(successGetResponse,data));
            else response.status(exceptionOccurredResponse.httpStatus).json(generateErrorResponse(exceptionOccurredResponse,"",'Something went wrong please try again'));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Something went wrong please try again'));
        }
    }

    @Post()
    @ValidateBodyRequest(EmailDTO)
    async sendEmail(request: CustomRequest<EmailDTO>, response: Response) {
        try{
            const emailTask:EmailTask = {
                ...request.body as EmailTask,
                attempted:0
            } 
            queueService.pushElement( emailTask );
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,'The email will be sent shortly'));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Unfortunately, the email failed to send. Please try again later.'));
        }
    }
}