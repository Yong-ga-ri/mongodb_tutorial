const express = require('express');
const app = express()
const mongoose = require('mongoose')

const server = async() => {
    try{
        const { MONGO_URI } = process.env;
        if (!MONGO_URI) throw new Error("MONGO_URI is required!!!");
        if ( !PORT ) throw new Error("PORT is required!!!");

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
        });

        app.post('/test', function(req, res){
            console.log(req.body.name)
            return res.send({ success: true })
        });

        app.listen(PORT, async () => {
            console.log(`server listening on port ${PORT}`);
        });
    }catch(err) {
        console.log(err);
    }
}

server()