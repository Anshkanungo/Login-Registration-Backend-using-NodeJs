const User = require('../model/user');
const bcrypt = require("bcryptjs");




exports.findAll = (req, res) => {
    User.find()
    .then(
        user => {res.json(user)}
      ) .catch (err) (
        res.status(500).json({ message: err.message })
      )
};


exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });
};


exports.update = async (req, res) => {
    // Validate Request
    const { first_name, last_name, password } = req.body;
    if (!( password && first_name && last_name)) {
        res.status(400).send("All input is required");
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    
  
    User.findByIdAndUpdate(req.params.id,{ 
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: encryptedPassword }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        });
    });
};