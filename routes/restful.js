const express = require('express')
const router = express.Router()
const User = require("../model/user");
const users = require('./controller');


router.get('/', async (req, res) => {
    try {
      const user = await User.find()
      res.json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

    // Retrieve a single Note with noteId
router.get('/:id', users.findOne);

    // Update a Note with noteId
router.put('/:id', users.update);

    // Delete a Note with noteId
router.delete('/:id', users.delete);

module.exports = router
