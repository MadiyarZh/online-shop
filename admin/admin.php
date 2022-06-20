<?php

session_start();

if(!isset($_SESSION["session_username"])):
header("location:index.php");
else:
?>

<?php 
include("../includes/connection.php");
include("../includes/header.php"); 
?>

    <div class="goods-out"></div>

    <h2>Товар</h2>
    <p> Имя: <input type="text" id="gname"></p>
    <p> Стоимость-1(small): <input type="text" id="gprice1"></p>
    <p> Стоимость-2(medium): <input type="text" id="gprice2"></p>
    <p> Стоимость-3(large): <input type="text" id="gprice3"></p>
    <p> Описание: <textarea id="gdescr"></textarea></p>
    <p> Изображение: <input type="text" id="gimg"></p>
    <p> Размер-1(small): <input type="text" id="gsize1"></p>
    <p> Размер-2(medium): <input type="text" id="gsize2"></p>
    <p> Размер-2(medium): <input type="text" id="gsize3"></p>
    <p> Порядок: <input type="text" id="gorder"></p>
    <input type="hidden" id="gid">
    <button class="add-to-db">Обновить</button>

	<script src="/admin/js/jquery-3.6.0.min.js"></script>
    <script src="/admin/js/admin.js"></script>

<?php include("../includes/footer.php"); ?>

<?php endif; ?>

