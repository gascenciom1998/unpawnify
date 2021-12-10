var sha256 = require('js-sha256').sha256;
const hasher = function(pass,url,pad) {
  let hash = pass;
  for (let i = 0; i < 500; i++) {
    hash = sha256(url.hostname + hash + pad);
  }
  return "@A"+hash;
}
console.log(hasher('12345',{hostname:'accounts.google.com'},'pad'));
