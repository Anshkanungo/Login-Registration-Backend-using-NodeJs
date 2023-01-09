const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Mshi:yLrrcObnpaHOCCdg@cluster0.yzcdoj4.mongodb.net/?retryWrites=true&w=majority', function(err){
    if (err){
        console.log('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});

exports.register = async(req, res) => {
        const salt = bcrypt.genSalt(10);
        const hasPassword = bcrypt.hash(req.body.password);
    
        let user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hasPassword,
            user_type_id: req.body.user_type_id
        })
    
        user.save((err, userRegistered) => {
            if(err) {
                console.log(err)
            } else{
                let payload = { id: userRegistered.__id, user_type_id: req.body.user_type_id || 0 };
                const token = jwt.sign(payload, config.TOKEN_SECRET);
                res.status(200).send({token})
            }
        })
    }