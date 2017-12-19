const swag = require('../models/swag');

module.exports = {
    search: (req,res,next)=>{
        if (req.query.category)
        {
            const filterSwag=swag.filter(elem=>elem.category===req.query.category)
            res.status(200).send(filterSwag)
        }
        else {
            res.status(200).send(swag)            
        }
    }
}

