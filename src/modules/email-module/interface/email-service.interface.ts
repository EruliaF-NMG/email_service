import { ICoreService } from "../../../core/interfaces/core-service.interface";
import { PagingEmailList } from "../email.model";

export interface IEmailService<T> extends ICoreService<T> {
    pagination(filterObject:any):Promise<PagingEmailList|boolean>
}