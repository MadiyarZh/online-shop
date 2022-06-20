function init() {
    $.post(
        "core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

function showGoods(data) {
    data = JSON.parse(data);
    console.log(data);
    var out='<select>';
    out +='<option data-id="0">Новый товар</option>';
    for (var id in data) {
        out +=`<option data-id="${id}">${data[id].name}</option>`;
    }
    out +='</select>';
    $('.goods-out').html(out);
    $('.goods-out select').on('change', selectGoods);
}

function selectGoods() {
    var id = $('.goods-out select option:selected').attr('data-id');
    console.log(id);
    $.post(
        "core.php",
        {
            "action" : "selectOneGoods",
            "gid" : id
        },
        function(data) {
            data = JSON.parse(data);
            $('#gname').val(data.name);
            $('#gprice1').val(data.price1);
            $('#gprice2').val(data.price2);
            $('#gprice3').val(data.price3);
            $('#gdescr').val(data.description);
            $('#gorder').val(data.ord);
            $('#gimg').val(data.img);
            $('#gsize1').val(data.size1);
            $('#gsize2').val(data.size2);
            $('#gsize3').val(data.size3);
            $('#gid').val(data.id);
        }
    )
}

function saveToDb() {
    var id = $('#gid').val();
    if (id!="") {
        $.post(
            "core.php",
            {
                "action" : "updateGoods",
                "id" : id,
                "gname" : $('#gname').val(),
                "gprice1" : $('#gprice1').val(),
                "gprice2" : $('#gprice2').val(),
                "gprice3" : $('#gprice3').val(),
                "gdescr" : $('#gdescr').val(),
                "gorder" : $('#gorder').val(),
                "gsize1" : $('#gsize1').val(),
                "gsize2" : $('#gsize2').val(),
                "gsize3" : $('#gsize3').val(),
                "gimg" : $('#gimg').val()
            },
            function(data) {
                if (data==1) {
                    alert('Товар обновлен');
                    init();
                }
                else {
                    console.log(data);
                }
            }
        );
    }
    else {
        $.post(
            "core.php",
            {
                "action" : "newGoods",
                "id" : 0,
                "gname" : $('#gname').val(),
                "gprice1" : $('#gprice1').val(),
                "gprice2" : $('#gprice2').val(),
                "gprice3" : $('#gprice3').val(),
                "gdescr" : $('#gdescr').val(),
                "gorder" : $('#gorder').val(),
                "gimg" : $('#gimg').val(),
                "gsize1" : $('#gsize1').val(),
                "gsize2" : $('#gsize2').val(),
                "gsize3" : $('#gsize3').val()
            },
            function(data) {
                if (data==1) {
                    alert('Товар добавлен');
                    init();
                } 
                else {
                    console.log(data);
                }
            }
        );
    }
}

$(document).ready(function() {
    init();
    $('.add-to-db').on('click', saveToDb);
})