import mongoose from "mongoose";
import { Column, ICoreEntity } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { EmailStatus } from "../../../config/core.enum";

export interface IEmail extends ICoreEntity {
    subject: string;
    body: string;
    send_to: string;
    from_email: string;
    status: string;
}
  
export class Email {
    @Column({
        trim: true,
    })
    subject: string;
  
    @Column({
        trim: true,
    })
    body: string;
    
    @Column({
        trim: true,
    })
    send_to: string;

    @Column({
        trim: true,
    })
    from_email: string;
  
    @Column({
        default: EmailStatus.Create,
        enum: [EmailStatus.Create,EmailStatus.Send,EmailStatus.Failed],
        trim: true,
    })
    state: string;

    @Column({
        default: Date.now,
    })
    created_at: Date;
    
    @Column({
        default: Date.now,
    })
    updated_at: Date;
}
  
export const EmailEntity = mongooseWrapper.createModelBySchemaClass<IEmail>(Email);