const asynHandler = require("express-async-handler")
const Contact = require("../models/contactmodel")

//get all contact
//route GET/ api/contact
//acess private

const getContact = asynHandler(async(req,res,next)=>{
    const conatct = await Contact.find({user_id:req.user.id});
    res.status(201).json(conatct)
})

//create  contact
//route post/ api/contact
//acess private

const createContact = asynHandler(async(req,res,next)=>{
    console.log(`The request in body is`,req.body)
    const {name,phone,email}=req.body
    if(!name||!phone||!email){
        res.status(400)
        throw new Error("All field are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id

    })
    res.status(201).send(contact)
})
//Get by id contact
//route get/ api/contact
//acess private


const getidContact = asynHandler(async(req,res,next)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(201).send(contact)
})

//Update contact
//route put/ api/contact
//acess pulbic

const updateContact = asynHandler(async(req,res,next)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user don't have permission to update other user contact")

    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(201).json(updatedContact)
})

//Delect contact
//route delect/ api/contact
//acess pulbic

const deleteContact = asynHandler(async(req,res,next)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user don't have permission to delect other user contact")

    }
   await Contact.findByIdAndDelete(req.params.id);    
    res.status(201).json({message:"contact deletesd succesfully"})
})

module.exports ={getContact,
    createContact,
    getidContact,
    updateContact,
    deleteContact

}