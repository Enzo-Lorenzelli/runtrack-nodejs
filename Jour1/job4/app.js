const fs = require('fs');

// Chemin du répertoire à lister
const directoryPath = 'C:\\Users\\L.E\\Desktop\\Node.js';

// Lire le contenu du répertoire
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du répertoire :', err);
    return;
  }

  // Afficher les noms des fichiers (et dossiers)
  console.log('Contenu du répertoire courant :');
  files.forEach((file) => {
    console.log(file);
  });
});
