<?php
	require("constants.php");

    $conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
?>