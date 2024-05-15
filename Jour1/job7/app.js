const fs = require('fs');

const filepath = 'C:\\Users\\L.E\\Desktop\\Node.js\\Jour1\\data.txt';

fs.readFile(filepath, 'utf8', (err, data) => {
  if (err) {
    console.error('erreur', err);
    return;
  }

  let result = '';
  for (let i = 0; i < data.length; i += 2) {
    result += data[i];
  }

  let result2 = '';
  for (let b = 1; b < data.length; b += 2) {
    result2 += data[b];
  }

  console.log(data);
  console.log('Lettres sur deux du contenu du fichier :', result);
  console.log('Lettres sur deux du contenu du fichier impair :', result2);
});
