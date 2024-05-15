const fs = require('fs');
const path = require('path');

// Fonction pour gérer les requêtes GET sur /tasks
function handleGetTasks(req, res) {
  // Lire les données à partir du fichier JSON
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal server error' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    }
  });
}

// Fonction pour gérer les requêtes POST sur /tasks
function handlePostTask(req, res) {
  // Logique pour créer une nouvelle tâche
}

// Fonction pour gérer les requêtes PUT sur /tasks/:id
function handlePutTask(req, res, taskId) {
  // Logique pour mettre à jour une tâche existante
}

// Fonction pour gérer les requêtes DELETE sur /tasks/:id
function handleDeleteTask(req, res, taskId) {
  // Logique pour supprimer une tâche existante
}

module.exports = {
  handleGetTasks,
  handlePostTask,
  handlePutTask,
  handleDeleteTask,
};
