const ExpressError = require("./utils/ExpressError");
const {counterSchema} = require("./utils/validator");

module.exports.validateCounter = (req , res , next)=> {
    const {error} = counterSchema.validate(req.body);

    if(error){
        const msg = error.details.map(el=> el.message).join(", ");
        throw new ExpressError(400 , msg);
    } else{
        next();
    }
};