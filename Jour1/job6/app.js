const fs = require('fs'); // Remplacez fs par 'fs'

const filepath = 'C:\\Users\\L.E\\Desktop\\Node.js\\Jour1\\data.txt';

fs.readFile(filepath, 'utf8', (err, data) => {
  // Utilisez readFile au lieu de readfile
  if (err) {
    console.error('erreur', err);
    return;
  }

  console.log('Contenu du fichier :', data);
});
