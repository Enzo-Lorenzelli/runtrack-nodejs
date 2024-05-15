const fs = require('fs');

const filepath = 'C:\\Users\\L.E\\Desktop\\Node.js\\Jour1\\data.txt';
// New content to be written to the file
const newContent = 'Je manipule les fichiers avec un module node !';

// Read the current content of the file
fs.readFile(filepath, 'utf8', (err, data) => {
  if (err) {
    console.error('erreur lors de la lecture du fichier', err);
    return;
  }

  // Log the current content to the console
  console.log('Contenu actuel du fichier :', data);

  // Modify the content in memory
  data = newContent;

  // Write the modified content back to the file
  fs.writeFile(filepath, data, 'utf8', (err) => {
    if (err) {
      console.error("erreur lors de l'écriture dans le fichier", err);
      return;
    }
    console.log('Le contenu du fichier a été modifié avec succès.');
  });
});
