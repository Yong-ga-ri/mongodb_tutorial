const express = require('express');
const app = express()
const mongoose = require('mongoose')


const MONGO_URI = 'mongodb+srv://ys:ew4hylORn4hKnJun@directory.4kdpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const server = async() => {
    try{
        await mongoose.connect(MONGO_URI, { dbName: 'movium', useNewUrlParser: true, useUnifiedTopology: true})
        console.log('MongoDB connected');
        //req.body에서 json parsing 진행 middleware
        app.use(express.json())

        db = mongoose.connection


        app.get('/home', async (req, res) => {  
            try{
                const data = await db.collection('review_data').find().toArray()

                return res.send({ data })

            } catch(err){
                console.log(err);
                return res.status(500).send({ err:  err.message })
            }
        })

        app.post('/test', function(req, res){
            console.log(req.body.name)
            return res.send({ success: true })
        })

        app.listen(3000, function(){
            console.log('server listening on port 3000')
        })
    }catch(err) {
        console.log(err);
    }
}

server()