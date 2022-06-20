var cart = {}; // корзина

function init() {
    var hash = window.location.hash.substring(1);
    // console.log(hash);
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
        // console.log(data);
        var out='';
        out +='<div class="cart-detail">';
            out +=`<div class="left-side">`
                out +=`<img src="images/${data.img}" alt="">`;
            out +=`</div>`;
            out +=`<div class="right-side">`;
                
                    out +=`<h1 class="name" content="${data.name}">${data.name}</h1>`;
                    
                    out +=`<div class="price"></div>`;
                    out +=`<label>Размеры</label>`;
                    out +=`<select class="size" data-id="${data.id}">`;
                        out +=`<option disabled selected value>Выберите размеры</option>`;
                        out +=`<option value='${data.size1}' data-price="${data.price1}">${data.size1}</option>`;
                        out +=`<option value='${data.size2}' data-price="${data.price2}">${data.size2}</option>`;
                        out +=`<option value='${data.size3}' data-price="${data.price3}">${data.size3}</option>`;
                    out +=`</select>`;
                    // out +=`<button class="add-to-cart" data-id="${data.id}">Добавить в корзину</button>`;
                    out +=`<div class="to-cart" data-id="${data.id}"></div>`;
                    out +=`<p class="description">${data.description}</p>`;
                    
                    if (localStorage.getItem('later')) {

                        // если есть - расшифроваем и запсываем в переменный
                        later = JSON.parse(localStorage.getItem('later'));
    
                        if (isEmpty(later)) {
                            out +=`<button class="later" data-id="${data.id}">&hearts;</button>`;
                        } else {
    
                            var id = data.id;
    
                            if (later[id] == data.id || later[id] == "undefined") {
                                out +=`<button class="later active" data-id="${data.id}">&hearts;</button>`;
                            } else {
                                out +=`<button class="later" data-id="${data.id}">&hearts;</button>`;
                            }
                        }
                    } else {
                        out +=`<button class="later" data-id="${data.id}">&hearts;</button>`;
                    }
            out +=`</div>`;
        out +='</div>';
       
        
        $('.detail-page').html(out);
        $('.to-cart').on('click', addToCart);
        $('.later').on('click', addToLater);
        $('.size').on('change', priceBySize);

    }
    else {
        $('.detail-page').html('Такого товара не существует!');
    }
}

function priceBySize() {
    var price = $('.cart-detail .right-side option:selected').attr('data-price');
    var id =  $('.cart-detail .right-side .size').attr('data-id');

    $('.price').html(price +' тг');
    $('.to-cart').html('<button class="add-to-cart" data-id="'+id+'">Добавить в корзину</button>');
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
    } else {
        later[id] = id;
        alert('Добавлено в Избранное');
    }
    localStorage.setItem('later', JSON.stringify(later)); // корзину в строку
    init();
}

function addToCart() {
    // добавляем товар в корзину
    var id = $(this).attr('data-id');
    var index = 0;
    var price = parseInt($('.cart-detail .right-side option:selected').attr('data-price'), 10);
    var img_size = $('.cart-detail .right-side option:selected').val();

    console.log(img_size);

    if (cart[id]==undefined) {
        cart[id] = [
            {
                id : 1,
                "price" : price,
                'size' : img_size
            }
        ]
    }
    else if (cart[id][0].price==price) {
        cart[id][0] =  
        {
            id : cart[id][0].id+1,
            "price" : price,
            'size' : img_size
        }
    }

    else if (cart[id][1]==undefined) {
        cart[id].push({
            id : 1,
            "price" : price,
            'size' : img_size
        });
    }

    else if (cart[id][1].price==price) {
        cart[id][1] =  
        {
            id : cart[id][1].id+1,
            "price" : price,
            'size' : img_size
        }
    }
    
    else if (cart[id][2]==undefined) {
        cart[id].push({
            id : 1,
            "price" : price,
            'size' : img_size
        });
    }

    else if (cart[id][2].price==price) {
        cart[id][2] =  
        {
            id : cart[id][2].id+1,
            "price" : price,
            'size' : img_size
        }
    }

    // else if(price) {
    //     switch (price) {
    //         case cart[id][0].price:
    //             cart[id][0] =  
    //             {
    //                 id : cart[id][0].id+1,
    //                 "price" : price
    //             }
    //             break;
    //         case cart[id][1].price:
    //             cart[id][1] =  
    //             {
    //                 id : cart[id][1].id+1,
    //                 "price" : price
    //             }
    //             break;
    //         case cart[id][2].price:
    //             cart[id][2] =  
    //             {
    //                 id : cart[id][2].id+1,
    //                 "price" : price
    //             }
    //             break;
    //     }
    // }



    // else if (price) {
    //     switch (price) {
    //         case cart[id][0].price:
    //             cart[id][0] =  
    //                 {
    //                     id : cart[id][0].id+1,
    //                     "price" : price
    //                 }
                
    //             break;
    //         case cart[id][1].price:
    //             cart[id][1] =  
    //                 {
    //                     id : cart[id][1].id+1,
    //                     "price" : price
    //                 }
    //             break;
    //         case cart[id][2].price:
    //             cart[id][2] =  
    //                 {
    //                     id : cart[id][2].id+1,
    //                     "price" : price
    //                 }
    //             break;
    //     }
    // }
    showMiniCart();
    saveCart();
}

function isEmpty(object) {
    // Проверка корзина на пустоту
    for (var key in object)

    if (object.hasOwnProperty(key)) return false

    return true
}

function saveCart() {
    // сохранить корзину в LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // корзину в строку
}

function showMiniCart() {
    // показываем мини корзину
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