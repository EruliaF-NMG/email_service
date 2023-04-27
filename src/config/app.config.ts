
const currentEnv: string = process.env.APP_ENV || 'development';
const port: number|string = process.env.APP_PORT || 3000;
const baseUrl: string = process.env.APP_URL || `http://localhost:${port}/`;
const apiVersion: string = 'api/v1/';
const mongoUri = 'mongodb://mongo_email:27017/email_db';
const redisPort:number = Number(process.env.REDIS_PORT) || 6379;

const errorMessageList :any = {
    required: 'Please enter the :attribute',
    unique: 'The :attribute has already been taken.',
    max: 'The :attribute may not be greater than :max.',
    min: 'The :attribute must be at least :min.',
    maxAmount: 'The :attribute may not be greater than :max.',
    numeric: 'The :attribute must be a number.',
    valueIn: 'Please :attribute should in [:in].',
    regex: ':attribute value not in the right format.',
    exists: 'The :attribute value is not available in the database',
    checkDroneIsReady: 'selected drone should be in IDLE or LOADING status',
};

export {
    currentEnv,
    port,
    baseUrl,
    apiVersion,
    mongoUri,
    redisPort,
    errorMessageList
}