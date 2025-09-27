const http = require("http");

const port = 8080;

const server = http.createServer((req, res) => {
    if (req.url === "/home") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end('<h1>Hello World!</h1>');
    }

    if (req.url === "/users") {
        const users = [
            { 
                name: "Cassio", 
                age: 30,
                email: 'cassio@leite.com'
            },
            { 
                name: "Carlos", 
                age: 30,
                email: 'carlos@.com'
            },
        ];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    }
});

server.listen(port, () => {
    console.log(`Rodando na porta http://localhost:${port}/`);
});