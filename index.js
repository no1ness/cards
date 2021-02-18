const path = require("path");
const express = require("express");
const data = require("./data.json");

const dist = path.join(__dirname, "client", "dist");
const prod = true;
const port = prod ? 80 : 8000;
const app = express()
const simplify = (card, ord) => ({
    id: ord,
    handle: card.handle,
    avatar: card.avatar,
});

const pageSize = 10;
const pageIndexRange = pageID => [
    pageSize * pageID,
    pageSize * pageID + pageSize,
];

app.get("/", (r, w) => {
    const pageID = r.query.page || 0;
    const range = pageIndexRange(pageID);
    console.log(`отправляю страницу №${pageID} (карточки ${range})`);
    w.set("Access-Control-Allow-Origin", "*");
    w.send(data.slice(range[0], range[1]).map(simplify));
});

app.get("/get/:id", (r, w) => {
    const id = r.params.id;
    console.log(`отправляю карточку №${id}...`);
    w.set("Access-Control-Allow-Origin", "*");
    w.set("Content-Type", "application/json");
    w.send(data[id]);
});

if (prod) {
    app.use("/app", express.static(dist));
    app.get("/app/*", (_r, w) => {
        w.sendFile("index.html", { root: dist });
    });
}

app.listen (port, () => {
    if (prod) console.log("работаю в режиме продакшн...");
    console.log(`сервер слушает на localhost:${port}...`);
});