import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://colapi:X7jT0Qp0WyAcidyX@cluster0.u8djw.mongodb.net/colapi?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(db => console.log('Base de datos conectada')).catch(error => console.log(error))
