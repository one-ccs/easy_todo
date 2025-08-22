/**
 * node 脚本，在 Android 端编译前执行的脚本，对一些文件进行特定的修改
 */
const fs = require('fs');
const path = require('path');

function log(...args) {
    console.log('[BEFORE_BUILD Android]', ...args);
}

function error(...args) {
    console.error('[BEFORE_BUILD Android]', ...args);
}

(function modifyIndexHTML() {
    const indexHTML = path.join(__dirname, '../www/index.html');
    const modifyData = /* html */ `
        <!-- before-build start -->
        <script src="cordova.js"></script>
        <!-- before-build end -->
    `;

    fs.readFile(indexHTML, 'utf8', function (err, data) {
        if (err) {
            return error(err);
        }

        var modifiedData = data
            .replace(/<!-- before-build start -->[\s\S]+<!-- before-build end -->\s+/, '')
            .replace('</title>', '</title>' + modifyData);

        fs.writeFile(indexHTML, modifiedData, 'utf8', function (err) {
            if (err) {
                return error(err);
            }
            log('修改成功');
        });
    });
})();

(function copyEntry() {
    const srcDir = path.join(__dirname, '../entry');
    const destDir = path.join(__dirname, '../www');

    function copyDir(src, dst) {
        if (!fs.existsSync(dst)) {
            fs.mkdirSync(dst, { recursive: true });
            log(`创建目录 ${dst}`);
        }
        fs.readdirSync(src, { withFileTypes: true }).forEach((_path) => {
            const srcPath = path.join(src, _path.name);
            const dstPath = path.join(dst, _path.name);

            if (_path.isDirectory()) {
                copyDir(srcPath, dstPath);
            } else {
                fs.copyFileSync(srcPath, dstPath);
                log(`拷贝文件 ${srcPath} -> ${dstPath}`);
            }
        });
    }
    copyDir(srcDir, destDir);
})();
