(function () {
    'use strict';
    const VERSION_KEY = 'EASY_TODO:VERSION';
    const manifestUrl = 'https://dns.one-ccs.duckdns.org/app/easy-todo/manifest.json';

    function loadDefault() {
        window.location.href = '/index.html';
    }

    async function fetchTimeout(url, timeout) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, timeout);

        try {
            const response = await fetch(url, { signal });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    async function downloadUpdate(zipUrl, newVersion) {
        fetch(zipUrl).then((response) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const zipData = event.target.result;
                const zip = new JSZip();

                zip.loadAsync(zipData).then((zip) => {
                    zip.extractAll(cordova.file.dataDirectory + 'www/').then(() => {
                        localStorage.setItem(VERSION_KEY, newVersion);
                        console.log('Update downloaded and extracted successfully');
                    });
                });
            };
            reader.readAsArrayBuffer(response);
        });
    }

    async function checkForUpdate() {
        fetchTimeout(manifestUrl, 10000)
            .then((response) => response.json())
            .then((data) => {
                const localVersion = localStorage.getItem(VERSION_KEY) ?? '0.0.0';

                if (localVersion !== data.version) {
                    console.log('New version available');
                    downloadUpdate(data.url, data.version);
                } else {
                    console.log('No update available');
                    loadDefault();
                }
            })
            .catch((error) => {
                console.error('Failed to check for updates:', error);
                loadDefault();
            });
    }

    function onDeviceReady() {
        StatusBar.overlaysWebView(false);
        navigator.splashscreen.hide();

        checkForUpdate();
    }

    document.addEventListener('deviceready', onDeviceReady);
})();
