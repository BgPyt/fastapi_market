var urlParams = new URLSearchParams(window.location.search)

class Form {
    constructor(select, checkbox, radio) {
        this.select = select ? select : "sort_desc"
        this.checkbox = checkbox
        this.radio = radio 
    }
    init_radio(){
        var radio = $(`input[value="${this.radio}"][type="radio"]`)
        radio.prop("checked", true)
        radio.parent().css('background-color', "#0099f5")
        radio = $(`input[value!="${this.radio}"][type="radio"]`)
        radio.parent().css('background-color', "#dbdbdb")
        if (radio.length == 2) {
            $(`input[value="table"][type="radio"]`)
            .parent()
            .css('background-color', "#0099f5")
        } 
    }
    
    init_checkbox(){
        if(urlParams.get("switch")) {
            $('#switch').prop('checked', true)
        }
    }

    init_select() {
        $('.sorted-select').val($(`option[value=${this.select}]`).val())
    }
}

const filter = new Form(urlParams.get("sorted-select"), urlParams.get("switch"),  urlParams.get("set_view"))
filter.init_radio()
filter.init_checkbox()

$(".sorted-select").each(function () {
    const _this = $(this),
        selectOption = _this.find("option"),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(":selected"),
        duration = 450;
    _this.hide();
    _this.wrap("<div class='select'></div>");
    $("<div>", {
        class: "new-select",
        text: $(`option[value=${filter.select}]`).text()
    }).insertAfter(_this);

    const selectHead = _this.next(".new-select");
    $("<div>", {
        class: "new-select__list"
    }).insertAfter(selectHead);

    const selectList = selectHead.next(".new-select__list");
    for (let i = 1; i < selectOptionLength; i++) {
        $("<div>", {
            class: "new-select__item",
            html: $("<span>", {
                text: selectOption.eq(i).text()
            })
        })
            .attr("data-value", selectOption.eq(i).val())
            .appendTo(selectList);
    }

    const selectItem = selectList.find(".new-select__item");
    selectList.slideUp(0);
    selectHead.on("click", function () {
        if (!$(this).hasClass("on")) {
            $(this).addClass("on");
            selectList.slideDown(duration);

            selectItem.on("click", function () {
                let chooseItem = $(this).data("value");

                $(".sorted-select").val(chooseItem).attr("selected", "selected");
                selectHead.text($(this).find("span").text());

                selectList.slideUp(duration);
                selectHead.removeClass("on");
                setTimeout(() => {$(".filter").submit()}, 500)
                
            });

        } else {
            $(this).removeClass("on");
            selectList.slideUp(duration);
        }

        
    });
});
filter.init_select()

$(".group-display_sheme").children().each( function()  {
    const _this = $(this)
    _this.click(() => {
        $(this).css("background-color", "#0099f5")
        if ($(this).prev().length) {
            $(this).prev().css("background-color", "#dbdbdb")
            
        }
        else {
            $(this).next().css("background-color", "#dbdbdb")
        }

        $(this).children().eq(0).prop("checked", true)
        setTimeout(() => {$(".filter").submit()}, 500)
    })
})


$("label[for='switch']").click( function() {
    const _this = $(this)
    setTimeout(() => {$(".filter").submit()}, 800)
})



var ParamPage = urlParams.get('page')
urlParams.delete('page')
const symbol = urlParams.toString() ? "&" : "?" 
const urlString = urlParams.toString() ? "?" + urlParams.toString() : urlParams.toString()




const items = $.makeArray($('.navigation-list').children().slice(2)).map((elem) => { return 'category=' + $(elem).text()}).join('&')
$.ajax({
    url: `/api/get-products?${items}`,
    method: "get",
    dataType: "json",
    headers: {"Cache-Control": "max-age=10800"},
    contentType: "application/json; charset=utf-8",
    cache: true,
}).done(function(data) {
    if (!(data.length)) {
        $(".catalog-block").css('display', 'none')
        $(".product-missing-products-block").css('display', 'flex')
    }
    if (filter.checkbox) {
        data = data.filter((elem) => elem.quantity <= 0)
    }
    data.sort(function(a, b) {
    let order_select = {"sort_desc": "", // sort_desc edit in the near future 
    "name_asc": a.name > b.name,
    "name_desc": a.name < b.name,
    "price_desc": b.price - a.price ,
    "price_asc": a.price - b.price}
    return order_select[filter.select]
    }
    )
    if (!(ParamPage) || ParamPage < 1 || ParamPage > data.length) {
        ParamPage = 1
    }
    else {
        ParamPage = Number(ParamPage)
    }
    const offset = 8
    const allPage = Math.ceil(data.length / offset)
    data.slice(offset * (ParamPage - 1), offset * ParamPage).forEach(element => {
        let classAvailability = 'product-availability_not'
        let availability = 'Нет в наличии'
        const city = localStorage.getItem('_city')
        element.address.some(storage => {
            const address = storage.address_relationship
            if (address.city === city) {
                availability = 'В наличии'
                classAvailability = ''
                return true
            }
            else {
                availability = 'Под заказ 7-14 дней'
                classAvailability = 'product-availability-order'
            }
        });
        $(".catalog-show-product-block").append(
        `<div data-id="${element.id}" data-name="${element.name}" data-price="${element.price}" class="product-block">
            <div class="product-block-up">
                <a href="/catalog/${element.id}">
                    <img class="product-block-up-img" src="/storage/image_product/${element.image._name}">
                </a>
                <svg data-id="${element.id}" data-name="${element.name}" class="product-block-up-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="30" height="30" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g>
                    <path fill="#ffffff" d="M22.128 3.901C20.918 2.675 19.309 2 17.596 2s-3.321.675-4.531 1.9L12 4.98l-1.065-1.079A6.323 6.323 0 0 0 6.404 2a6.324 6.324 0 0 0-4.532 1.901c-2.491 2.524-2.491 6.631 0 9.153l9.594 9.722a.746.746 0 0 0 1.068 0l9.594-9.721c2.491-2.523 2.491-6.629 0-9.154z" data-original="#f44336" opacity="1" class="svg-path" style="fill: white;"></path>
                    <path d="M11.466 22.776a.746.746 0 0 0 1.068 0l9.594-9.721c2.491-2.523 2.491-6.63 0-9.154C20.918 2.675 19.309 2 17.596 2s-3.321.675-4.531 1.9L12 4.98l-1.065-1.079A6.323 6.323 0 0 0 6.404 2a6.324 6.324 0 0 0-4.532 1.901c-2.491 2.524-2.491 6.631 0 9.153zM2.939 4.954A4.84 4.84 0 0 1 6.403 3.5c1.308 0 2.538.517 3.463 1.455l1.599 1.62a.773.773 0 0 0 1.067 0l1.599-1.621A4.847 4.847 0 0 1 17.596 3.5a4.84 4.84 0 0 1 3.464 1.454c1.917 1.943 1.917 5.104 0 7.048L12 21.183l-9.061-9.182c-1.917-1.942-1.917-5.104 0-7.047z" fill="#000000" data-original="#000000" class="svg-path-contour"></path></g></svg>
            </div>
            <div class="product-block-down">
                <div class="product-block-down-description">
                    <div class="product-code"><b>Код:</b> 000001</div>
                    <a href="/catalog/${element.id}">
                    <div class="product-name">${element.name}</div>
                    </a>
                    <div class="product-availability ${classAvailability}">${availability}</div>
                    <div class="product-price">${element.price.toLocaleString('ru-RU')}.00 ₽</div>
                </div>
                <div class="product-add_basket">
                     <button class="product-add_basket-button">
                     <span>Добавить в корзину</span>
                     </button>
                </div>
            </div>
        </div>`) 
    });
    let activePage = `<span class="pagination-active">${ParamPage}</span>`
    if (ParamPage - 1 > 0) {
        activePage = `<a href=${urlString + symbol}page=${ParamPage - 1} class="pagination-item">${ParamPage - 1}</a>` + activePage
    }
    if (ParamPage - 2 > 0) {
        activePage = `<a href=${urlString + symbol}page=${ParamPage - 2} class="pagination-item">${ParamPage - 2}</a>` + activePage
    }
    if (ParamPage + 1 <= allPage) {
        activePage = activePage + `<a href=${urlString + symbol}page=${ParamPage + 1} class="pagination-item">${ParamPage + 1}</a>` 
    }
    if (ParamPage + 2 <= allPage) {
        activePage = activePage + `<a href=${urlString + symbol}page=${ParamPage + 2} class="pagination-item">${ParamPage + 2}</a>` 
    }
    if (ParamPage - 2 > 1) {
        activePage = `<a hhref=${urlString + symbol}page=1 class="pagination-item">1</a><span class="pagination-item__">...</span>` + activePage
    }
    if (ParamPage + 2 < allPage) {
        activePage = activePage + `<span class="pagination-item__">...</span><a href=${urlString + symbol}page=${allPage} class="pagination-item">${allPage}</a>`

    }
    $('.pagination-block').append(`
    <div class="pagination-main">
        <a ${ParamPage - 1 >= 1 ? `href=${urlString + symbol}page=${ParamPage - 1}` : ""} class="pagination-item-arrow arrow-left">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="2em" height="2em" x="0" y="0" viewBox="0 0 404.375 404.375" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,404.3762512207031,404.3752555847168)"><path d="M108.669 404.375c-4.18 0-7.837-1.567-10.971-4.702-6.269-6.269-6.269-16.196 0-21.943l176.065-175.543L97.698 26.645c-6.269-6.269-6.269-16.196 0-21.943 6.269-6.269 16.196-6.269 21.943 0l187.037 186.514c3.135 3.135 4.702 6.792 4.702 10.971 0 4.18-1.567 8.359-4.702 10.971L119.641 399.673c-3.135 3.135-6.792 4.702-10.972 4.702z" style="" fill="#1185e0" data-original="#1185e0" class="${ParamPage == 1 ? "disabled" : ""}"></path></g></svg>
         </a>
        ${activePage}
        <a ${ParamPage + 1 <= allPage ? `href=${urlString + symbol}page=${ParamPage + 1}` : ""} class="pagination-item-arrow arrow-right">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="2em" height="2em" x="0" y="0" viewBox="0 0 404.375 404.375" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M108.669 404.375c-4.18 0-7.837-1.567-10.971-4.702-6.269-6.269-6.269-16.196 0-21.943l176.065-175.543L97.698 26.645c-6.269-6.269-6.269-16.196 0-21.943 6.269-6.269 16.196-6.269 21.943 0l187.037 186.514c3.135 3.135 4.702 6.792 4.702 10.971 0 4.18-1.567 8.359-4.702 10.971L119.641 399.673c-3.135 3.135-6.792 4.702-10.972 4.702z" style="" fill="#1185e0" data-original="#1185e0" class="${ParamPage == allPage ? "disabled" : ""}"></path></g></svg>
        </a>
    </div>
    `)
    $('#product-quantity').text(`Нашлось ${data.length} товаров`)
    $(".preloader").animate({
        opacity: 0
    }, function() {
        $(this).remove()
    })
})

.fail(function(textStatus) {
    console.log("Ошибка запроса " + textStatus)
});


if (!($('.category-list > ul li').length)) {
    $('.category-list').css('display', 'none')
}

