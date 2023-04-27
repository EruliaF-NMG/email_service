import { Module } from "./core";
import EmailModule from "./modules/email-module/email.module";

@Module({
    modules:[EmailModule]
})
export default class MainModule{}