<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "online-shop";

function connect(){
    $conn = mysqli_connect("127.0.0.1", "root", "", "online-shop");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT id, name FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function selectOneGoods() {
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM goods WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function updateGoods() {
    $conn = connect();
    $id = $_POST['id'];
    $name = $_POST['gname'];
    $price1 = $_POST['gprice1'];
    $price2 = $_POST['gprice2'];
    $price3 = $_POST['gprice3'];
    $descr = $_POST['gdescr'];
    $ord = $_POST['gorder'];
    $img = $_POST['gimg'];
    $size1 = $_POST['gsize1'];
    $size2 = $_POST['gsize2'];
    $size3 = $_POST['gsize3'];

    $sql = "UPDATE goods SET name = '$name', price1 = '$price1', price2 = '$price2', price3 = '$price3', description = '$descr', ord = '$ord', img = '$img', size1 = '$size1', size2 = '$size2', size3 = '$size3' WHERE id='$id'";

    if (mysqli_query($conn, $sql)) {
        echo "1";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }
    
    mysqli_close($conn);
    // writeJSON();
}

function newGoods() {
    $conn = connect();
    $name = $_POST['gname'];
    $price1 = $_POST['gprice1'];
    $price2 = $_POST['gprice2'];
    $price3 = $_POST['gprice3'];
    $descr = $_POST['gdescr'];
    $ord = $_POST['gorder'];
    $img = $_POST['gimg'];
    $size1 = $_POST['gsize1'];
    $size2 = $_POST['gsize2'];
    $size3 = $_POST['gsize3'];

    $sql = "INSERT INTO goods(name, price1, price2, price3, description, ord, img, size1, size2, size3) VALUES ('$name', '$price1', '$price2', '$price3', '$descr', '$ord', '$img', '$size1', '$size2', '$size3')";

    if (mysqli_query($conn, $sql)) {
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    
    mysqli_close($conn);
    // writeJSON();
}

// function writeJSON() {
//     $conn = connect();
//     $sql = "SELECT * FROM goods";
//     $result = mysqli_query($conn, $sql);

//     if (mysqli_num_rows($result) > 0) {
//         $out = array();
//         while($row = mysqli_fetch_assoc($result)) {
//             $out[$row["id"]] = $row;
//         }
//         $a = file_put_contents('../goods.json', json_encode($out));
//         echo $a;
//     } else {
//         echo "0";
//     }
//     mysqli_close($conn);
    
// }

function loadGoods() {
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function loadSingleGoods() {
    $id = $_POST['id'];
    $conn = connect();
    $sql = "SELECT * FROM goods WHERE id='$id'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}