$(document).ready(function() {
    $.getJSON('blogs.json', function(data) {
        let blogList = $('#blog-list');
        data.forEach(function(blog) {
            let blogItem = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${blog.image}" class="card-img-top" alt="${blog.title}">
                        <div class="card-body">
                            <h5 class="card-title">${blog.title}</h5>
                            <p class="card-text">${new Date(blog.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p class="card-text blog-description">${blog.description}</p>
                            <div class="d-flex justify-content-center">
                                <a href="blog-reader.html?blog=${blog.page}" class="btn btn-primary read-more">Leer mas</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            blogList.append(blogItem);
        });
        $('body').css('visibility', 'visible');
    });
});