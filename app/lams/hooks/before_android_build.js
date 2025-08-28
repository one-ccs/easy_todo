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
        <script src="https://localhost/cordova.js"></script>
        <!-- before-build end -->
    `;
    let modifiedData = '';

    try {
        const indexHTMLContent = fs.readFileSync(indexHTML, { encoding: 'utf8' });

        modifiedData = indexHTMLContent
            .replace(/<!-- before-build start -->[\s\S]+<!-- before-build end -->\s+/, '')
            .replace('</title>', '</title>' + modifyData);
    } catch (err) {
        return error(err);
    }

    try {
        fs.writeFileSync(indexHTML, modifiedData, { encoding: 'utf8' });
        log('修改成功');
    } catch (err) {
        return error(err);
    }
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
