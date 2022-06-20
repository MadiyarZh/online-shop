

<?php require_once("includes/connection.php"); ?>

<?php include("includes/header.php"); ?>

        <h1>Ваши произведения искусства</h1>
        <div class="main-cart"></div>
        <div class="email-field">
            <p>Имя: <input type="text" id="name"></p>
            <p>Email: <input type="mail" id="email"></p>
            <p>Телефон: <input type="number" id="phone"></p>
            <p><button class="send-email">Заказать</button></p>
        </div>

        <script src="js/jquery-3.6.0.min.js"></script>
        <script src="js/cart.js"></script>

<?php include("includes/footer.php"); ?>







<!-- 
    <!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cart</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header></header>
    <main>
        <div class="main-cart"></div>
        <div class="email-field">
            <p>Имя: <input type="text" id="name"></p>
            <p>Email: <input type="mail" id="email"></p>
            <p>Телефон: <input type="number" id="phone"></p>
            <p><button class="send-email">Заказать</button></p>
        </div>
    </main>
    <footer></footer>

    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/cart.js"></script>
</body>
</html>
 -->