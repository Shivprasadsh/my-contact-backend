const express = require("express")
const router = express.Router()
const {getContact,getidContact,createContact,updateContact,deleteContact} = require('../controller/contactcontroller')
const validationToken = require("../middleware/validateTokenHnadler")





router.use(validationToken)

router.route('/').get(getContact).post(createContact)
router.route('/:id').get(getidContact).put(updateContact).delete(deleteContact)





module.exports = router