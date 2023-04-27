import { RedisClientType, createClient } from 'redis';
import { redisPort, storeKey } from '../../config/app.config';
import { EmailTask } from '../../modules/email-module/email.model';

class QueueService {

    private _redisClient: RedisClientType;

    constructor() {
        console.log("=====constructor=====");
    }

    async init(): Promise<string> {
        return new Promise( async (resolve, reject) => {
            try {
                this._redisClient = createClient({
                    socket: {
                        host: "redis",
                        port: redisPort
                    },
                });
                await this._redisClient.connect();
                resolve('connect');
            } catch (ex) {
                console.log('Redis connection error!');
                reject('error');
            }
        });
    }

    async pushElement(task:any): Promise<boolean> {
        try {
            await this._redisClient.rPush(storeKey,JSON.stringify(task));
            return true;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

    async getAllTasks(): Promise<boolean|Array<EmailTask>> {
        try {
            const result = await this._redisClient.lRange(storeKey,0,-1);
            return result.map((value:string)=>JSON.parse(value));
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

    async getLastElement(): Promise<boolean|EmailTask> {
        try {
            const result:string = await this._redisClient.rPop(storeKey);
            return JSON.parse(result)
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

}

const queueService = new QueueService();
export default queueService;