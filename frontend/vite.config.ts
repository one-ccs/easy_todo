import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        __APP_NAME__: JSON.stringify(process.env.npm_package_name),
    },
    plugins: [VueRouter(), vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        allowedHosts: ['code.oc-nas.duckdns.org', 'test.oc-nas.duckdns.org'],
    },
    base: '/',
    build: {
        sourcemap: false, // 取消生成 sourcemap 可以防止在浏览器“源代码”目录树中暴露项目结构
        outDir: 'dist', // 输出目录
        chunkSizeWarningLimit: 800, // 包大小警告
        reportCompressedSize: false, // 禁用 gzip 压缩大小报告
        minify: 'esbuild', // 指定混淆器
        assetsInlineLimit: 4096, // 内联小于 4kb 的资源
        rollupOptions: {
            output: {
                // 打包规则
                manualChunks(id) {
                    // node_modules 依赖
                    if (id.includes('node_modules')) {
                        return 'vender';
                    }
                    // 项目资源打包规则
                    if (id.includes('src')) {
                        return 'main';
                    }
                },
                // 入口文件命名规则
                entryFileNames: 'assets/js/[name]-[hash].js',
                // 分包文件命名规则
                chunkFileNames: 'assets/js/[name]-[hash].js',
                // 资源文件命名规则
                assetFileNames: (assetInfo) => {
                    const fontExts = ['.eot', '.woff', '.woff2', '.ttf'];
                    const imgExts = [
                        '.jpg',
                        '.jpeg',
                        '.png',
                        '.webp',
                        '.gif',
                        '.ico',
                        '.svg',
                    ];

                    if (fontExts.some((ext) => assetInfo.names[0].endsWith(ext))) {
                        return 'assets/fonts/[name]-[hash].[ext]';
                    } else if (imgExts.some((ext) => assetInfo.names[0].endsWith(ext))) {
                        return 'assets/images/[name]-[hash].[ext]';
                    }
                    return 'assets/[ext]/[name]-[hash].[ext]';
                },
            },
        },
    },
});
