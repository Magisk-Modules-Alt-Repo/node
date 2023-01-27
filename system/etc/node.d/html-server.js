const http = require("http");
const path = require("path");
const fs = require("fs");
const { Log } = require("@android/util");
const { SystemProperties } = require("@android/os");
const TAG = "HTML-Server";
const config = {
  host: SystemProperties.get("persist.node.conf.html_server.host", "0.0.0.0"),
  port: SystemProperties.getNumber("persist.node.conf.html_server.port", 6970),
  root: SystemProperties.get("persist.node.conf.html_server.root", "/system/usr/share/node/server/www"),
  index: SystemProperties.get("persist.node.conf.html_server.index", "index.html"),
};
const server = http.createServer((req, response) => {
  Log.i(TAG, "------------------------------------------------------------------");
  if (req.url == "/") {
    req.url = `/${config.index}`;
  }
  Log.i(TAG, new Date());
  Log.i(TAG, "Incoming request: %s", req.url);
  const targetPath = path.normalize(config.root + req.url);
  const extension = path.extname(targetPath).substr(1);
  Log.i(TAG, "Absolute target will be : %s", targetPath);
  Log.i(TAG, "Extension is: %s", extension);
  let mimeType = "text/html";
  fs.exists(targetPath, (exists) => {
    if (!exists) {
      response.writeHead(404, { "Content-Type": mimeType });
      response.end('Error 404 - "%s" not found!', req.url);
      Log.e(TAG, `"${req.url}" not found!`);
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
      Log.i(TAG, "Using mimeType: %s", mimeType);
      response.writeHead(200, { "Content-Type": mimeType });
      fs.createReadStream(targetPath).pipe(response);
    }
  });
});

try {
  server.listen(config.port, config.host);
  Log.i(TAG, "Server running");
} catch (e) {
  Log.e(TAG, e?.message);
}
