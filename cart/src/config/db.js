const mongoose = require('mongoose');

// Fonction pour se connecter à MongoDB
const connectDB = async () => {
  try {
    // Connexion à la base de données MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/Cart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Pour créer des index automatiquement
      useFindAndModify: false, // Pour éviter l'utilisation de `findOneAndUpdate()`
    });
    
    // Affichage de l'hôte de connexion
    console.log(`MongoDB connected: ${conn.connection.host}`); 
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`); // Affiche l'erreur de connexion
    process.exit(1); // Arrêter le processus en cas d'erreur
  }
};



module.exports = connectDB; // Exporter la fonction de connexion
