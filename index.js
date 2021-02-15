const express = require("express");
const {ArgumentParser} = require("argparse");
const {version} = require("./package.json");
const data = require("./data.json");

const parser = new ArgumentParser({
    description: "запустить сервер",
    add_help: true
});

parser.add_argument("-v", "--version", {action: "version", version});
parser.add_argument("--port", {help: "укажите порт"});
const args = parser.parse_args();
const port = args.port ? args.port : 80;

const pageSize = 10;
const pageIndexRange = pageID => [
    pageSize * pageID,
    pageSize * pageID + pageSize,
];

const app = express();

app.get("/", (r, w) => {
    const params = new URLSearchParams(r.url);
    const pageID = params.get("/?page") || params.get("page") || 0;
    const range = pageIndexRange(pageID);
    console.log(`отправляю страницу №${pageID} (карточки ${range})`);
    w.send(data.slice(range[0], range[1]));
});

app.get("/get/:id", (r, w) => {
    const id = r.params.id;
    console.log(`отправляю карточку №${id}...`);
    w.set("Content-Type", "application/json");
    w.send(data[id]);
});

app.listen (port, () => {
    console.log(`сервер слушает на localhost:${port}...`);
});



