import type { Plugin } from 'vite';

export type DevServerProxyOPtions = {
    baseUrl?: string;
};

const devServerProxy = ({ baseUrl = '/' }: DevServerProxyOPtions): Plugin => {
    return {
        name: 'dev-server-proxy',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                req.url = baseUrl + req.url;

                next();
            });
        },
    };
};

export default devServerProxy;
