const http = require("http");
const fs = require('fs').promises;
const { exec } = require("child_process");

const host = '0.0.0.0';
const port = Math.floor(Math.random() * 9999);

let conf;
try {
	conf = require('/system/usr/share/.node/server/config.json');
} catch (e) {
	if (e.code !== 'MODULE_NOT_FOUND') {
		throw e;
	}
	conf = {
		location: "/sdcard/Documents/Node",
		index: "index.html",
		notify: true
	}
}

async function main() {
	const notification = (message) => {
		exec(
			`cmd notification post -S bigtext -t "HTML Server" "${port}" "${message}"`, { uid: 2000 }
		);
	};

	const requestListener = function(req, res) {
		fs.readFile(`${conf.location}/${conf.index}`)
			.then(contents => {
				res.setHeader("Content-Type", "text/html");
				res.writeHead(200);
				res.end(contents);
			})
			.catch(err => {
				res.writeHead(500);
				res.end(err);
				return;
			});
	};

	const server = http.createServer(requestListener);
	server.listen(port, host, () => {
		if (conf.notify) {
			notification(`Server is running on http://${host}:${port}`);
		}
	});
}

main()