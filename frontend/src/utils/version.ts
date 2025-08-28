/**
 * 返回版本号中的各个部分
 * @param version 语义化版本号
 */
function* walkVersion(version: string) {
    const terminals = ['.', '-', '+'];
    let part = '';

    for (let i = 0; i < version.length; i++) {
        if (terminals.includes(version[i])) {
            if (part) {
                yield part;
                part = '';
            }
        } else {
            part += version[i];
        }
    }
    if (part) {
        yield part;
    }
}

/**
 * 比较两个语义化版本号的大小
 * @param version1 语义化版本号1
 * @param version2 语义化版本号2
 * @returns -1: version1 < version2; 0: version1 == version2; 1: version1 > version2
 */
function compareVersion(version1: string, version2: string): -1 | 0 | 1 {
    const v1 = walkVersion(version1);
    const v2 = walkVersion(version2);

    while (true) {
        const n1 = v1.next();
        const n2 = v2.next();

        if (n1.done && n2.done) {
            return 0;
        } else if (n1.done) {
            return -1;
        } else if (n2.done) {
            return 1;
        } else if (n1.value < n2.value) {
            return -1;
        } else if (n1.value > n2.value) {
            return 1;
        }
    }
}

export { walkVersion, compareVersion };
