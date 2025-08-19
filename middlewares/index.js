const fs = require("fs");

function logReqRes(filename) {
  //console.log("logReqRes called..");
  return (req, res, next) => {
    fs.writeFile(
      filename,
      `\n${Date.now()} - ${req.ip} - ${req.method} - ${req.path} \n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
