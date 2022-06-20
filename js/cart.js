var cart = {};

function loadCart() {
    // проверяем есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расшифроваем и запсываем в переменный
        cart = JSON.parse(localStorage.getItem('cart'));
        // showCart();
        showMiniCart();
        $.post(
            "../admin/core.php",
            {
                "action" : 'loadGoods'
            },
            goodsOut
        );
    }
    else {
        $('.main-cart').html('Корзина пуста!');
    }

}

function goodsOut(data) {
    if (isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    } else {
        // вывод на  страницу
        data = JSON.parse(data);
        // console.log(data);
        var goods = data;
        var out = '';
        for (var id in cart) {
            
            console.log(cart[id]);
            for (let index = 0; index < cart[id].length; index++) {
                var keys = Object.keys(cart[id]);
                console.log(keys[index]);   
                out += `<button data-id="${id}" data-index="${keys[index]}" class="del-goods">x</button>`;
                out += `<img src="images\\${goods[id].img}">`;
                out += ` ${goods[id].name }`;
                out += `<span>${cart[id][index].size}</span>`;
                out += `<button data-id="${id}" data-index="${keys[index]}" class="minus-goods">-</button>`;
                out += `: ${cart[id][index].id } штук`;
                out += `<button data-id="${id}" data-index="${keys[index]}" class="plus-goods">+</button>`;
                out += cart[id][index].id*cart[id][index].price;
                out += '<br>';
            }
        }
        $('.main-cart').html(out);
        $('.del-goods').on('click', delGoods);
        $('.plus-goods').on('click', plusGoods);
        $('.minus-goods').on('click', minusGoods);
    }

}

// function showCart() {
//     // вывод корзины
//     if (isEmpty(cart)) {
//         $('.main-cart').html('Корзина пуста!');
//     } else {
//         $.getJSON('goods.json', function (data) {
//             var goods = data;
//             var out = '';
//             for (var id in cart) {
//                 out += `<button data-id="${id}" class="del-goods">x</button>`;
//                 out += `<img src="images\\${goods[id].img}">`;
//                 out += ` ${goods[id].name }`;
//                 out += `<button data-id="${id}" class="minus-goods">-</button>`;
//                 out += `: ${cart[id] } штук`;
//                 out += `<button data-id="${id}" class="plus-goods">+</button>`;
//                 out += cart[id]*goods[id].price1;
//                 out += '<br>';
//             }
//             $('.main-cart').html(out);
//             $('.del-goods').on('click', delGoods);
//             $('.plus-goods').on('click', plusGoods);
//             $('.minus-goods').on('click', minusGoods);
//         });
//     }
// }

function delGoods() {
    // удаляем товар из корзины
    var id = $(this).attr('data-id');
    var index = $(this).attr('data-index');
    // console.log(cart[id][index]);
    // [index];
    if (cart[id].length>1) {
        Array.prototype.splice.call(cart[id],index, 1);
    } else {
        delete cart[id];
    }
    // console.log(cart[id].index);
    // cart[id].map(x => 0);
    saveCart();
    loadCart();
}


function plusGoods() {
    // добавляем товар в корзине
    var id = $(this).attr('data-id');
    var index = $(this).attr('data-index');
    cart[id][index] =  
    {
        id : cart[id][index].id+1,
        "price" : cart[id][index].price
    }
    saveCart();
    loadCart();
}

function minusGoods() {
    // уменшаем колчество товаров в корзине
    var id = $(this).attr('data-id');
    var index = $(this).attr('data-index');
    console.log(cart[id].length);

    if(cart[id].length==1 && cart[id][index].id==1 ) {
        delete cart[id];
    }

    else if (cart[id][index].id==1) {
        Array.prototype.splice.call(cart[id],index, 1);
    }

    else {
        cart[id][index] = {
            id : cart[id][index].id-1,
            "price" : cart[id][index].price
        };
    }
        saveCart();
        loadCart();
}

function saveCart() {
    // сохранить корзину в LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // корзину в строку
}

function isEmpty(object) {
    // Проверка корзина на пустоту
    for (var key in object)

    if (object.hasOwnProperty(key)) return false

    return true
}

function sendEmail() {
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();

    if (name != '' && email != '' && phone != '') {
        if (!isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "name" : name,
                    "email" : email,
                    "phone" : phone,
                    "cart" : cart
                },
                function(data) {
                    if(data==1) {
                        alert('Заказ отправлен')
                    }
                    else {
                        alert('Повторите заказ');
                    }
                }
            );
        }
        else {
            alert('Корзина пуста!');
        }
    }
    else {
        alert('Заполните поля');
    }
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
    loadCart();
    $('.send-email').on('click', sendEmail); // отправить письмо с заказом
})