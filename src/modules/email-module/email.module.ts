import { Module } from "../../core";
import EmailController from "./controllers/email.controller";


@Module({
    controllers:[EmailController],
    services:[]
})
export default class EmailModule{}