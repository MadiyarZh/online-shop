var cart = {}; // корзина

function init() {
    var hash = window.location.hash.substring(1);
    console.log(hash);
    $.post(
        "admin/core.php",
        {
            "action" : 'loadSingleGoods',
            "id" : hash
        },
        goodsOut
    );
}

function goodsOut(data) {
    // вывод на  страницу
    if (data!=0) {
        data = JSON.parse(data);
        console.log(data);
        var out='';
        out +='<div class="cart">';
        out +=`<button class="later" data-id="${data.id}">&hearts;</button>`;
        out +=`<p class="name">${data.name}</p>`;
        out +=`<img src="images/${data.img}" alt="">`;
        out +=`<div class="cost">${data.cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${data.id}">Купить</button>`;
        out +='</div>'
        
        $('.goods-out').html(out);
        $('.add-to-cart').on('click', addToCart);
        $('.later').on('click', addToLater);

    }
    else {
        $('.goods-out').html('Такого товара не существует!');
    }
}

function addToLater() {
    // добавление товар в 'избранное'
    var later = {};
    if (localStorage.getItem('later')) {
        // если есть - расшифроваем и запсываем в переменный
        later = JSON.parse(localStorage.getItem('later'));
    }
    alert('Добавлено в Избранное');
    var id = $(this).attr('data-id');
    later[id] = 1;
    localStorage.setItem('later', JSON.stringify(later)); // корзину в строку
}

function addToCart() {
    // добавляем товар в корзину
    var id = $(this).attr('data-id');
    // console.log(id);

    if (cart[id]==undefined) {
        cart[id] = 1;
    }
    else {
        cart[id]++;
    }
    showMiniCart();
    saveCart();
}

function saveCart() {
    // сохранить корзину в LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // корзину в строку
}

function showMiniCart() {
    // показываем мини корзину
    var out="";
    for(var key in cart) {
        out += key + ' --- ' + cart[key]+'<br>';
    }
    $('.mini-cart').html(out);
}

function loadCart() {
    // проверяем есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расшифроваем и запсываем в переменный
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    init();
    loadCart();
})