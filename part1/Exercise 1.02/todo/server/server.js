
const http = require('http');
const port = process.env.PORT || 3000;

const requestHandler = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Server started in port ${port}`);
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
    console.log(`Server started in port ${port}`);
});
