(() => {
    const chunkLoader = (path) => {
        return fetch(path).then(response => response.text());
    };

    const extractFromSearch = (search, key) => {
        const searchParams = new URLSearchParams(search);
        return searchParams.get(key);
    };

    
    const checkBlogPost = () => {
        try {
            const blogpost = document.getElementsByClassName('blogpost')[0];
            if (blogpost === undefined) throw new Error('404 D:');

            const path = window.location.search;
            const blogName = extractFromSearch(path, "blog");

            (async () => {
                const blogContent = await chunkLoader(`chunks/blog/${blogName}.html`);
                const blogContentTest = document.getElementsByClassName("blogpost")[0];
                
                if (blogContentTest.innerHTML.length < 40)
                    blogpost.insertAdjacentHTML('afterbegin', blogContent);
            })();

            document.title = `${document.getElementsByTagName('h1')[0].textContent} | c127.dev`;
        } catch (e) {
            setTimeout(checkBlogPost, 10);
            return;
        }
    };

    checkBlogPost();
})();
