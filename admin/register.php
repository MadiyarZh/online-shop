
<?php require_once("../includes/connection.php"); ?>

<?php include("../includes/header.php"); ?>

<?php
	
	if(isset($_POST["register"])){
	
        if(!empty($_POST['full_name']) && !empty($_POST['email']) && !empty($_POST['username']) && !empty($_POST['password'])) {
            $full_name= htmlspecialchars($_POST['full_name']);
            $email=htmlspecialchars($_POST['email']);
            $username=htmlspecialchars($_POST['username']);
            $password=htmlspecialchars($_POST['password']);
            $query=mysqli_query($conn, "SELECT * FROM admin WHERE username='".$username."'");
            $numrows=mysqli_num_rows($query);
            if($numrows==0) {
                $sql="INSERT INTO admin (full_name, email, username, password) VALUES('$full_name','$email', '$username', '$password')";
                $result=mysqli_query($conn, $sql);
                if($result){
                    $message = "Учетная запись успешно создана!";
                } else {
                    $error_message = "Не удалось вставить информацию о данных!";
                }
            } else {
                $error_message = "Такое имя пользователя уже существует! Пожалуйста, попробуйте другой!";
            }   
        } else {
            $error_message = "Все поля обязательны к заполнению!";
        }
	}
?>

<div class="container mregister">
    <div id="login">
        <h1>Регистрация</h1>
        <?php 
            if (!empty($error_message)) {
                echo "<p class='alert alert-warning' role='alert'>" . $error_message . "</p>";
            } elseif(!empty($message)) {
                echo "<p class='alert alert-success'role='alert'>" . $message . "</p>";
            } 
        ?>
        <form action="register.php" id="registerform" method="post"name="registerform">
            <p><label for="user_login">Полное имя<br>
            <input class="input" id="full_name" name="full_name"size="32"  type="text" value=""></label></p>
            <p><label for="user_pass">E-mail<br>
            <input class="input" id="email" name="email" size="32"type="email" value=""></label></p>
            <p><label for="user_pass">Имя пользователя<br>
            <input class="input" id="username" name="username"size="20" type="text" value=""></label></p>
            <p><label for="user_pass">Пароль<br>
            <input class="input" id="password" name="password"size="32"   type="password" value=""></label></p>
            <p class="submit"><input class="button" id="register" name= "register" type="submit" value="Зарегистрироваться"></p>
            <p class="regtext">Уже зарегистрированы? <a href= "index.php">Введите имя пользователя</a>!</p>
        </form>
    </div>              
</div>

<?php include("../includes/footer.php"); ?>

