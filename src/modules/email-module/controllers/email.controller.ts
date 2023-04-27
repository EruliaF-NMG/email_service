import { Request, Response } from "express";

import { exceptionOccurredResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Post, ValidateBodyRequest } from "../../../core";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import queueService from "../../../core/service/queue-service";
import { EmailDTO } from "../dtos/email.dto";
import { CustomRequest } from "../../../core/types/type.interface";
import { EmailTask } from "../email.model";

@Controller('/api/email')
export default class EmailController {
    
    constructor(
       
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const data = await queueService.getAllTasks();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,data));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'error'));
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