/**
 * 有超时功能的 fetch 函数
 * @param url 链接
 * @param timeout 超时时间
 * @returns Promise<Response>
 */
async function fetchTimeout(url: string, timeout: number = 0) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId =
        timeout &&
        setTimeout(() => {
            controller.abort();
        }, timeout);

    try {
        return await fetch(`${url}?v=${new Date().getTime()}`, { signal });
    } catch (err) {
        throw err;
    } finally {
        timeoutId && clearTimeout(timeoutId);
    }
}

export { fetchTimeout };
