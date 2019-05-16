const server = require('./api/server.js');

const port = 5000;
server.listen(5000, () => {
  console.log("Server running on localhost: 5000");
});
