const express = require("express");
const app = express();
const config = require("./config");
const ntlm = require("express-ntlm");
const { getSelect } = require("./sqldb");
// const fs = require('fs')

app.use(express.static("build"));

if (process.env.PROD === "stend") {
  //ntlm
  app.use(function (req, res, next) {
    req.ntlm = {
      DomainName: "REGION",
      UserName: "22KolchinNV",
      Workstation: "D22KNV",
      Authenticated: true,
    };
    next();
  });
} else {
  app.use(ntlm());
}

app.get("/ntlm", function (req, res) {
  //ntlm
  res.end(JSON.stringify(req.ntlm));
});

app.get("/test", async function (req, res) {
  const result = await getSelect(`SELECT distinct Name FROM EgrulItems`);
  //const out = result.map((row) => JSON.parse(row["Name"]));
  res.end(JSON.stringify(result));
});

app.listen(4000, function () {
  console.log("Express server listening on port " + config.get("port"));
  app.on("error", (error) => {
    console.log("ERROR in index.js");
    console.log(error);
  });
});
