import { editBasket } from "/storage/js/components/editBasket.js"

$(document).ajaxSuccess(function() {
    const basketProduct = JSON.parse(localStorage.getItem("add_basket"))

    $('.product-block').each(function() {
        const _this = $(this)
        _this.find('.svg-path').click(AddFavorites)
        _this.find('.product-add_basket-button').click(AddBasket)
        if (_this.attr('data-name') in $.parseJSON(localStorage.getItem('favoritesProduct'))) {
            _this.find('.svg-path').css("fill", "#ff4949")
        }
        if (Object.keys(basketProduct).includes(_this.attr('data-id'))) {
            _this.find('.product-add_basket-button').trigger('click')
        }

    })  
    

    async function AddFavorites() {
        const parent = $(this).parentsUntil('.catalog-show-product-block').last()
        const FavoritesProduct = JSON.parse(localStorage.getItem("favoritesProduct"))
        if  (Object.entries(FavoritesProduct).length !== 0 && Object.values(FavoritesProduct).includes(parent.attr('data-id'))) {
            this.style.fill = "white"
            delete FavoritesProduct[parent.attr('data-name')]
            localStorage.setItem("favoritesProduct", JSON.stringify(FavoritesProduct))
        }
        else {
            FavoritesProduct[parent.attr('data-name')] = parent.attr('data-id')
            localStorage.setItem("favoritesProduct", JSON.stringify(FavoritesProduct))
            this.style.fill = '#ff4949'
        }
        let productsQuantity = Object.entries(FavoritesProduct).length
        $('#favourites-number').text(productsQuantity < 100 ? productsQuantity : 99)
    }

    async function AddBasket() {
        const _this = $(this)
        const item = $(this).parentsUntil('.catalog-show-product-block').last()
        const blockButton = $(this).parentsUntil('.product-block-down').last()
        console.log(blockButton)
        const basketProduct = JSON.parse(localStorage.getItem("add_basket"))
        const ItemId = basketProduct[item.attr('data-id')]
        if (ItemId) {
            var valueItem = ItemId.quantity
        }
        else {
            var valueItem = 1
        }
        basketProduct[item.attr('data-id')] = {price: item.attr('data-price'),
                                               quantity: valueItem}
        localStorage.setItem('add_basket', JSON.stringify(basketProduct))
        blockButton.after(`
            <div class="counter-product-block">
                <div class="counter-product">
                    <button id="minus" class="score" disabled="disabled">
                        <svg class="number-minus" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" x="0" y="0" viewBox="0 0 1.707 1.707" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd" class=""><g><rect class="number-symbol" width="1.707" height=".271" y=".718" rx=".135" opacity="1" class=""></rect></g></svg>
                    </button>
                    <input type='number'>
                    <button id="plus" class="score">
                         <svg class="number-plus" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path class="number-symbol" d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z" opacity="1" class=""></path></g></svg>
                    </button>
                </div>
            </div>`
            )
        item.find("input[type='number']").prop("value", valueItem)
        editBasket(item.find("input[type='number']"))
        blockButton.remove()

        }  
})

var timeout_basket = 0

$('body').on('input', 'input[type="number"]', function(){
    const add_basket = JSON.parse(localStorage.getItem('add_basket'))
    const item = $(this).parentsUntil('.catalog-show-product-block').last()
    clearTimeout(timeout_basket)
	var value = $(this).val().replace(/[^0-9]/g, '');
	if (value < 1) {

		this.value = 1;

	} else if (value > 999999) {

		this.value = 999999;

	} else {

		this.value = value;
	}
    add_basket[$(this).parentsUntil('.catalog-show-product-block').last().attr("data-id")].quantity = value
    localStorage.setItem('add_basket', JSON.stringify(add_basket))


    $(this).siblings('.score').removeAttr('disabled')
    console.log($(this).siblings('.score'))
    if (this.value == 1) {
        $(this).siblings('#minus').attr('disabled', 'disabled')
    }
    else if (this.value == 999999) {
        $(this).siblings('#plus').attr('disabled', 'disabled')
    }
    

    timeout_basket = setTimeout(editBasket, 800)
});


$('body').on('click', '.score', function(){
    const inputNumber = $(this).siblings('input[type="number"]')
    const total = {
        "plus": Number($(inputNumber).val()) + 1, 
        "minus": Number($(inputNumber).val()) - 1,
    }
    inputNumber.val(total[$(this).attr("id")])
    inputNumber.trigger('input')

})




// class Loader {
//     constructor(divLoader, svgLoader) {
//         this.divLoader = divLoader
//         this.svgLoader = svgLoader
//     }

//     start_loader() {
//         this.divLoader.addClass("loader-active")
//         this.svgLoader.addClass("spin-loader")
//     }
//     stop_loader() {
//         this.divLoader.removeClass("loader-active")
//         this.svgLoader.removeClass("spin-loader")
//     }
// }
