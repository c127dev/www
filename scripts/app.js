(() => {
    const chunkLoader = (path) => {
        return fetch(path).then(response => response.text());
    };

    const addExternalStyle = (path) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        return link;
    };

    const addExternalJS = (path) => {
        const script = document.createElement('script');
        script.src = path;
        return script;
    };

    const getMetadata = (head, name) => {
        return Array.from(head.getElementsByTagName('meta')).filter(elem => elem.name === name).reduce((acc, elem) => elem.content);
    };

    const changeFavicon = (href) => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = href;
    };


    window.addEventListener('load', async () => {
        const head = document.head;
        const body = document.body;
        const pageName = getMetadata(head, 'pageName').content;

        // Add Bootstrap
        head.appendChild(addExternalStyle('styles/bootstrap.min.css'));
        head.appendChild(addExternalStyle('styles/simplebar.css'));
        head.appendChild(addExternalStyle('styles/owl.carousel.min.css'));
        head.appendChild(addExternalStyle('styles/owl.theme.default.min.css'));
        head.appendChild(addExternalStyle('styles/global.css'));
        head.appendChild(addExternalStyle(`styles/pages/${pageName}.css`));

        head.appendChild(addExternalJS('scripts/bootstrap.bundle.min.js'));
        head.appendChild(addExternalJS('scripts/owl.carousel.min.js'));
        head.appendChild(addExternalJS('scripts/simplebar.min.js'));
        head.appendChild(addExternalJS(`scripts/pages/${pageName}.js`));

        //changeFavicon("favicon.ico");

        try {
            const headerHTML = await chunkLoader('chunks/header.html');
            const footerHTML = await chunkLoader('chunks/footer.html');
            body.getElementsByTagName('main')[0].insertAdjacentHTML('afterbegin', headerHTML);
            body.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', footerHTML);
        } catch (error) {
            console.error(`Error loading chunk: ${error}`);
        }

        $('.site-name').click(() => {
            window.location.href = '/';
        });

        $('.menu-toggle').click((event) => {
            $('.android-menu').toggleClass('show');
        });

        setTimeout(() => {
            body.style.visibility = 'visible';
        }, 400);
    });
})();