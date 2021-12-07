# unpawnify
Chrome extension to protect reused passwords

### TODOs
1. support multiple accounts on same host
2. support more kinds of password forms
3. intercept requests
### How to run

1. Clone repo
1. Run npm install
1. Go to chrome://extensions
2. Click on the "Developer mode" button
3. Click on Load Unpacked
4. Select the unpawnify folder

### How to develop

1. Make your changes locally, make sure to save them
2. If you made changes to popup.js run

        browserify popup.js > popup_bundled.js

  (IMPORTANT: if you don't do this, the popup changes won't be reflected) If you run into errors in this step you might need to run

        npm install browserify -g if you run into errors

3. On chrome://extensions click on the unpawnify's reload button
4. To test your changes visit the website you want to test on
5. Reload the website (IMPORTANT: you need to reload the website, not just the extension)
6. Test your changes

### Other useful facts

1. On chrome://extension you might see an Errors button if there are any errors. There are some warnings showing up right now that you can ignore
2. To debug the background script (currently unused) click on the service worker button on chrome://extensions under unpawnify
3. To debug the popup right click on the unpawnify icon and click "Inspect Popup" note that the inspection console will close automatically if you close the popup.
