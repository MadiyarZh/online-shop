var cart = {}; // корзина

function init() {
    //вычитуем файл goods.json
    // $.getJSON("goods.json", goodsOut);
    $.post(
        "admin/core.php",
        {
            "action" : 'loadGoods'
        },
        goodsOut
    );
}

function goodsOut(data) {
    // вывод на  страницу
    data = JSON.parse(data);
    console.log(data);
    var out='';
    for (var key in data) {
        out +='<div class="cart">';
        out +=`<button class="later" data-id="${key}">&hearts;</button>`;
        out +=`<p class="name"><a href="goods.html#${key}">${data[key].name}</a> </p>`;
        out +=`<img src="images/${data[key].img}" alt="">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +='</div>'
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.later').on('click', addToLater);

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
    // показываем мини карзину
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