const http = require('http')
const path = require('path')
const fs = require('fs');
const host = '0.0.0.0';
const port = 6970;
let config;
try {
  config = require('/system/usr/share/.node/server/config.json');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
  config = {
    location: "/sdcard/Documents/Node",
    index: "index.html",
    notify: true
  }
}
const server = http.createServer((req, response) => {
  console.log("------------------------------------------------------------------");
  if (req.url == '/') {
    req.url = `/${config.index}`;
  }
  console.log(new Date());
  console.log("Incoming request: " + req.url);
  const targetPath = path.normalize(config.location + req.url)
  const extension = path.extname(targetPath).substr(1);
  console.log("Absolute target will be : " + targetPath);
  console.log("Extension is: " + extension);
  let mimeType = 'text/html';
  fs.exists(targetPath, (exists) => {
    if (!exists) {
      response.writeHead(404, { 'Content-Type': mimeType });
      response.end("Error 404 - \"" + req.url + "\" not found!");
    } else {
        if (extension == 'css') {
        mimeType = 'text/css';
      }
      if (extension == 'js') {
        mimeType = 'application/x-javascript';
      }
      if (extension == 'htm') {
        mimeType = 'text/html';
      }
      if (extension == 'png') {
        mimeType = 'image/png';
      }
      console.log("Using mimeType: " + mimeType);
      response.writeHead(200, { 'Content-Type': mimeType });
      fs.createReadStream(targetPath).pipe(response);
    }
  });
});
server.listen(port, host);
console.log('Server running');
console.log(server.address());
