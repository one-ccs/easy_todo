/**
 * node 脚本，在 Android 端编译前执行的脚本，对一些文件进行特定的修改
 */
const fs = require('fs');
const path = require('path');

const indexHTML = path.join(__dirname, '../www/index.html');
const modifyData = /* html */`
    <!-- before-build start -->
    <script src="cordova.js"></script>
    <script>
        document.addEventListener('deviceready', () => {
            StatusBar.overlaysWebView(true);
            navigator.splashscreen.hide();
        })
    </script>
    <style>
        #app {
            padding-top: 24px;
        }
    </style>
    <!-- before-build end -->
`;


fs.readFile(indexHTML, 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }

    var modifiedData = data
        .replace(/<!-- before-build start -->[\s\S]+<!-- before-build end -->\s+/, '')
        .replace('</title>', '</title>' + modifyData);

    fs.writeFile(indexHTML, modifiedData, 'utf8', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('[BEFORE_BUILD] - 修改成功 (Android)');
    });
});
