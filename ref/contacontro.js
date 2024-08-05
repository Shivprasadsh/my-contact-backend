// const asynHandler = require("express-async-handler")
// const Contact = require("../models/contactmodel")

// //get all contact
// //route GET/ api/contact
// //acess pulbic

// const getContact = asynHandler(async(req,res,next)=>{
//     const conatct = await Contact.find();
//     res.status(201).json(conatct)
// })

// //create  contact
// //route post/ api/contact
// //acess pulbic

// const createContact = asynHandler(async(req,res,next)=>{
//     console.log(`The request in body is`,req.body)
//     const {name,phone,email}=req.body
//     if(!name||!phone||!email){
//         res.status(400)
//         throw new Error("All field are mandatory")
//     }
//     const contact = await Contact.create({
//         name,
//         email,
//         phone,

//     })
//     res.status(201).send(contact)
// })
// //Get by id contact
// //route get/ api/contact
// //acess pulbic


// const getidContact = asynHandler(async(req,res,next)=>{
//     const contact = await Contact.findById(req.params.id)
//     if(!contact){
//         res.status(404);
//         throw new Error("Contact not found")
//     }
//     res.status(201).send(contact)
// })

// //Update contact
// //route put/ api/contact
// //acess pulbic

// const updateContact = asynHandler(async(req,res,next)=>{
//     const contact = await Contact.findById(req.params.id)
//     if(!contact){
//         res.status(404);
//         throw new Error("Contact not found")
//     }

//     const updatedContact = await Contact.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new:true}
//     )
//     res.status(201).json(updatedContact)
// })

// //Delect contact
// //route delect/ api/contact
// //acess pulbic

// const deleteContact = asynHandler(async(req,res,next)=>{
//     const contact = await Contact.findById(req.params.id)
//     if(!contact){
//         res.status(404);
//         throw new Error("Contact not found")
//     }
//    await Contact.findByIdAndDelete(req.params.id);    
//     res.status(201).json({message:"contact deletesd succesfully"})
// })

// module.exports ={getContact,
//     createContact,
//     getidContact,
//     updateContact,
//     deleteContact

// }