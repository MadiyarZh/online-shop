var later = {};
var cart = {};


function init() {
    $.post(
        "admin/core.php",
        {
            "action" : 'loadGoods'
        },
        goodsOut
    );
    if (localStorage.getItem('later')) {
        // если есть - расшифроваем и запсываем в переменный
        later = JSON.parse(localStorage.getItem('later'));        
    }
    else {
        $('.goods-out').html('Добавьте товар!!!');
    }
}

function goodsOut(data) {
    // вывод на  страницу

    if (isEmpty(later)) {
        $('.goods-out').html('Добавьте товар!!');
    } else {
        data = JSON.parse(data);
        console.log(data);
        var out='';
        
        if (localStorage.getItem('later')) {
            // если есть - расшифроваем и запсываем в переменный
            later = JSON.parse(localStorage.getItem('later'));
            for (var key in later) {
                out +='<div class="cart">';
                out +=`<button class="del-later" data-id="${key}">x</button>`;
                out +=`<p class="name">${data[key].name}</p>`;
                out +=`<img src="images/${data[key].img}" alt="">`;
                out +=`<div class="cost">${data[key].cost}</div>`;
                out +=`<a href="goods.php#${key}">Просмотреть</a>`;
                out +='</div>'
            }
            $('.goods-out').html(out);
            $('.del-later').on('click', delLater);
        }
        else {
            $('.goods-out').html('Добавьте товар!');
        }
    }
}

function delLater() {
    // удаляем товар из корзины
    if (localStorage.getItem('later')) {
        // если есть - расшифроваем и запсываем в переменный
        later = JSON.parse(localStorage.getItem('later'));
    }
    var id = $(this).attr('data-id');
    delete later[id];
    alert('Удалено из Избранное');
    localStorage.setItem('later', JSON.stringify(later)); // корзину в строку
    init();
}

function isEmpty(object) {
    // Проверка корзина на пустоту
    for (var key in object)

    if (object.hasOwnProperty(key)) return false

    return true
}

function showMiniCart() {
    // показываем мини карзину
    if (localStorage.getItem('cart')) {
        // если есть - расшифроваем и запсываем в переменный
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    var out=0;
    for(var id in cart) {
        // out += key + ' --- ' + cart[key]+'<br>';
        for (let index = 0; index < cart[id].length; index++) {
            out += cart[id][index].id;
        }
    }
    $('.number-of-cart').html(": " + out);
}

$(document).ready(function () {
    showMiniCart();
    init();
})