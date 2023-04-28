import { CoreService } from "../../../core";
import { getValue } from "../../../helpers/util-helpers";
import { PagingEmailList } from "../email.model";
import { EmailEntity, IEmail } from "../entities/email.entity";
import { IEmailService } from "../interface/email-service.interface";

export class EmailService extends CoreService<IEmail> implements IEmailService<IEmail> {

    constructor() {
        super(EmailEntity);
    }

    async pagination(filterObject:any):Promise<PagingEmailList|boolean>{
        try {
            const page = Number(getValue(filterObject, 'page', 1));
            const limit = Number(getValue(filterObject, 'limit', 10));
            const skip = page <= 1 ? 0 : limit * (page - 1);

            const count = await EmailEntity.count({});
            const result = await EmailEntity.find({}).skip(skip).limit(limit).exec();

            return {
                current_page: page,
                total_pages: Math.ceil(count / limit),
                data: result,
                total_items: count,
                page_size: limit,
            }

        } catch(ex) {
            console.log(ex);
            return false;
        }
    }
}