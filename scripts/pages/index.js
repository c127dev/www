(() => {
    const checkCarousel = () => {
        try {
            const owl = $('.owl-carousel');
            owl.owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                dots: true,
                items: 1,
                autoplay: true,
                autoplayTimeout: 3000,
                margin:0,
                navText: [
                    "<div class='nav-btn prev-slide'>&#10094;</div>",
                    "<div class='nav-btn next-slide'>&#10095;</div>"
                ]
            });

            // Mover los dots dentro del carrusel
            const dots = $('.owl-dots');
            $('.owl-carousel').append(dots);
            $('.owl-nav').remove();

        } catch (e) {
            setTimeout(checkCarousel, 10);
            return;
        }
    };

    checkCarousel();
})();
