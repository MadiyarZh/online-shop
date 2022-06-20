
<?php require_once("includes/connection.php"); ?>

<?php include("includes/header.php"); ?>

        <div class="owl-carousel owl-theme">
            <div class="item"><img src="images/main-carousel/slide_3_1024x1024.webp" alt=""></div>
            <div class="item"><img src="images/main-carousel/slide_5_1024x1024.webp" alt=""></div>
            <div class="item"><img src="images/main-carousel/slide_6_1024x1024.webp" alt=""></div>
        </div>
        
        <div class="goods-out row"></div>

        <div class="main-page-info">
            <h2 class="main-page-info-title">
                Главная страница
            </h2>
            <p class="main-page-info-description"> 
                Добро пожаловать на мой сайт художественной фотографии. Здесь вы можете найти отпечатки большинства моих работ и их доступные размеры. Если у вас есть какие-либо вопросы или запрос на размеры, которых нет в списке, пожалуйста, свяжитесь с нами.
            </p>
        </div>

    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/goods.js"></script>
    <script src="js/main.js"></script>

    <script>
        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            items:1,
            autoplay:true,
            autoplayTimeout:5000,
            dots:false,
            animateOut: 'fadeOut',
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        })
    </script>

<?php include("includes/footer.php"); ?>