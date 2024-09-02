import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://streamfamily2727:Juancamilo@cluster0.mp1rmhi.mongodb.net/streamfamily2727?retryWrites=true&w=majority&appName=Cluster0');
        console.log(">>> Conectado con la base de datos");

    } catch (error) {
        console.log(error);
    }
};

