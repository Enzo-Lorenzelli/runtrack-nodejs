const http = require('http');
const {
  handleGetTasks,
  handlePostTask,
  handlePutTask,
  handleDeleteTask,
} = require('./routes');

const server = http.createServer((req, res) => {
  const urlSegments = req.url.split('/');
  const taskId = parseInt(urlSegments[urlSegments.length - 1]);

  if (req.method === 'GET' && req.url === '/tasks') {
    handleGetTasks(req, res);
  } else if (req.method === 'POST' && req.url === '/tasks') {
    handlePostTask(req, res);
  } else if (
    req.method === 'PUT' &&
    req.url.startsWith('/tasks/') &&
    !isNaN(taskId)
  ) {
    handlePutTask(req, res, taskId);
  } else if (
    req.method === 'DELETE' &&
    req.url.startsWith('/tasks/') &&
    !isNaN(taskId)
  ) {
    handleDeleteTask(req, res, taskId);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
