const http = require("http");
const path = require("path");
const fs = require("fs");
const Logger = require("android-logger");
const log = new Logger({ debug: false });
const TAG = "HTML-Server";
let config;
try {
  config = require("/sdcard/node.server.json");
} catch (e) {
  if (e.code !== "MODULE_NOT_FOUND") {
    throw e;
  }
  config = {
    host: "0.0.0.0",
    port: 6970,
    root: "/system/usr/share/.node/server/www",
    index: "index.html",
  };
}
const server = http.createServer((req, response) => {
  log.i(TAG, "------------------------------------------------------------------");
  if (req.url == "/") {
    req.url = `/${config.index}`;
  }
  log.i(TAG, new Date());
  log.i(TAG, "Incoming request: " + req.url);
  const targetPath = path.normalize(config.location + req.url);
  const extension = path.extname(targetPath).substr(1);
  log.i(TAG, "Absolute target will be : " + targetPath);
  log.i(TAG, "Extension is: " + extension);
  let mimeType = "text/html";
  fs.exists(targetPath, (exists) => {
    if (!exists) {
      response.writeHead(404, { "Content-Type": mimeType });
      response.end('Error 404 - "' + req.url + '" not found!');
      log.e(TAG, `"${req.url}" not found!`);
    } else {
      if (extension == "css") {
        mimeType = "text/css";
      }
      if (extension == "js") {
        mimeType = "application/x-javascript";
      }
      if (extension == "htm") {
        mimeType = "text/html";
      }
      if (extension == "png") {
        mimeType = "image/png";
      }
      log.i(TAG, "Using mimeType: " + mimeType);
      response.writeHead(200, { "Content-Type": mimeType });
      fs.createReadStream(targetPath).pipe(response);
    }
  });
});

try {
  server.listen(config.port, config.host);
  log.i(TAG, "Server running");
} catch (e) {
  log.e(TAG, e?.message);
}
