const app = require("../app");
const http = require('http');
require('dotenv').config({ path : ".env" });

const port = process.env.PORT;

server = http.createServer(app);

server.listen(port, () => {
    console.log('Server on ' + port);
});
