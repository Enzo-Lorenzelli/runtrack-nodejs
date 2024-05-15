const path = require('path');

const filepath = 'C:\\Users\\L.E\\Desktop\\Node.js\\Jour1\\data.txt';
const fileName = path.basename(filePath);
console.log('Nom de fichier :', fileName);

const fileExtension = path.extname(filePath);
console.log('Extension du fichier:', fileExtension);

const parentDirectory = path.dirname(filePath);
console.log('Répertoire parent du fichier:', parentDirectory);
