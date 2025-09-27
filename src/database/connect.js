const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejsdicasparadev.ixa8uhx.mongodb.net/curso-node`);
        console.log("Conectado ao banco de dados MongoDB!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados MongoDB:", error);
    }
};

module.exports = connectToDatabase;