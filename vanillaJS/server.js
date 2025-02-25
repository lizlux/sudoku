const http = require("http");
const path = require("path");
const hostname = "localhost";
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "text/plain");
  // res.sendFile(path.join(__dirname, "index.html"));
  // res.end("Hello, World!\n");

  const filePath = path.join(__dirname, "index.html");

  if (req.url.endsWith(".js")) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(data);
    });
  } else if (req.url.endsWith(".css")) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        return;
      }
      res.writeHead("200", { "Content-Type": "text/css" });
      res.end(data);
    });
  } else {
    // Read the HTML file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Error reading file");
        return;
      }
      // Set the Content-Type header to tell the browser this is HTML
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
