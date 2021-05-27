const express = require('express')      //востребовать пакет express
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const  app = express()

app.use(express.json({ extended: true}))

//роуты
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/lessons', require('./routes/lessons.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/',express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
        }
    )
}

const PORT = config.get('port') || 7000

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Application has been started on port ${PORT}...`))
    }
    catch(e){
        console.log('Server error!', e.message)
        process.exit(1)
    }
}

start()

