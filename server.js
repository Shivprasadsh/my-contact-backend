const express  = require("express")
const dotenv = require("dotenv").config()
const contactRoute = require("./routes/contactroute")
const errHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbconnection');
const userRoute = require('./routes/userRoute')


connectDb();
const app = express()


const port = process.env.PORT|| 6001
app.use(express.json())

app.use('/api/contact',contactRoute)
app.use('/api/user',userRoute)
app.use(errHandler)


app.listen(port,()=>{
    console.log(`Server is running in ${port}`)
})
