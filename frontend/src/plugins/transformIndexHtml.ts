import type { Plugin, HtmlTagDescriptor } from 'vite';

const transformIndexHtml = (
    transformIndexHtml: (html: string) => HtmlTagDescriptor[] | string
): Plugin => {
    return {
        name: 'transform-index-html',
        transformIndexHtml,
    };
};

export default transformIndexHtml;
