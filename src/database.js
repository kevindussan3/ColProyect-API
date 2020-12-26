import mongoose from "mongoose";


mongoose.connect("mongodb://localhost/colproyectdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(db => console.log('Base de datos conectada')).catch(error => console.log(error))