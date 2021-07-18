const crypto = require("crypto");
const config = require("../config/app.config");

const PASSWORD_SALT = config.hash.salt;
const PASSWORD_STRECH = config.hash.strech;

const digest = function (text) {
  let hash;
  text += PASSWORD_SALT;

  for (let i = PASSWORD_STRECH; i--;) {
    hash = crypto.createHash("sha512");
    hash.update(text);
    text = hash.digest("hex");
  }
  return text;
};

module.exports = {
  digest
};