// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.msg == "password_value") {
//     sendResponse({ password: request.password });
//     console.log(sender);
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       // chrome.tabs.sendMessage(tabs[0].id, { msg: "password_value_c", password: request.password }, function(response) {});
//       // console.log(sha256(request.password));
//       return true;
//     });
//   } else {
//     sendResponse({ result: "error", message: `Invalid 'cmd'` });
//   }
//   return true;
// });
