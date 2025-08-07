import type { Plugin } from 'vite';

const devServerProxy = (): Plugin => {
    return {
        name: 'dev-server-proxy',
        configureServer(server) {
            if (process.env.NODE_ENV === 'development') {
                server.middlewares.use((req, res, next) => {
                    req.url = '/proxy/5173' + req.url;

                    next();
                });
            }
        },
    };
};

export default devServerProxy;
