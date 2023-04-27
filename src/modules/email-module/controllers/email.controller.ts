import { Request, Response } from "express";

import { exceptionOccurredResponse, successGetResponse } from "../../../config/api-response.config";
import { Controller, Get } from "../../../core";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";

@Controller('/api/email')
export default class EmailController {
    
    constructor(
       
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,"API works"));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'error'));
        }
    }
}