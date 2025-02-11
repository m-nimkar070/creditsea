const dotenv = require("dotenv");
const path = require("path");
const joi = require('joi');

dotenv.config({path : path.join(__dirname , '../../.env')});

const envVarsSchema = joi.object().keys({
    PORT:joi.number().default(8082),
    MONGODB_URL:joi.string().required().description("MongoDb URL")
}).unknown();

const {value:envVars , errors} = envVarsSchema.prefs({errors:{label:'key'}}).validate(process.env);

if(errors){
    throw new Error(`Config validation error: ${errors.message}`);
}

module.exports = {
    port:envVars.PORT,
    
    mongoose:{
        url:envVars.MONGODB_URL,
        options:{
            useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true,
        },
    },
};