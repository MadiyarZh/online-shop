var cart = {}; // корзина

function init() {
    //вычитуем файл goods.json
    // $.getJSON("goods.json", goodsOut);
    $.post(
        "../admin/core.php",
        {
            "action" : 'loadGoods'
        },
        goodsOut
    );
}

function goodsOut(data) {
    // вывод на  страницу
    data = JSON.parse(data);
    // console.log(data);
    var out='';
    for (var key in data) {
        out +='<div class="cart col-lg-4 col-md-6 col-sm-12">';
        
        if (localStorage.getItem('later')) {

            // если есть - расшифроваем и запсываем в переменный
            later = JSON.parse(localStorage.getItem('later'));

            // console.log(later); 
            
            if(later[key] == data[key].id) {
                out +=`<button class="later active" title="Удалить из избранное" data-id="${key}"><i class="icon-heart"></i></button>`;
            } 
            else {
                out +=`<button class="later" title="В избранное" data-id="${key}"><i class="icon-heart"></i></button>`;
            }
            
        } else {
            out +=`<button class="later" title="В избранное" data-id="${key}"><i class="icon-heart"></i></button>`;
        }
       
        
        out +=`<a href="../goods.php#${key}"><span class="cart-img" style="background-image: url(../images/${data[key].img}")></span></a>`;
        out +=`<p class="name"><a href="../goods.php#${key}">${data[key].name}</a> </p>`;
        // out +=`<div class="cost">${data[key].cost}</div>`;
        // out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
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
    
    var id = $(this).attr('data-id');
    
    if(later[id] == id) {
        delete later[id];
        alert('Удалено из Избранное');
    } 
    else {
        later[id] = id;
        alert('Добавлено в Избранное');
    }
    localStorage.setItem('later', JSON.stringify(later)); // корзину в строку
    init();
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
    var out=0;
    for(var id in cart) {
        // out += key + ' --- ' + cart[key]+'<br>';
        for (let index = 0; index < cart[id].length; index++) {
            out += cart[id][index].id;
        }
    }
    $('.number-of-cart').html(": " + out);
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
