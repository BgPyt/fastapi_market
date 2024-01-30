export function editBasket () {
    const add_basket = JSON.parse(localStorage.getItem('add_basket'))
    const productLen = Object.keys(add_basket).length
    const textBasketLabel = 10 < Number(String(productLen).slice(-2)) && Number(String(productLen).slice(-2)) < 20 ? "товаров" :
                            Number(String(productLen).slice(-1)) == 1 ? "товар" :
                            1 < Number(String(productLen).slice(-1)) && Number(String(productLen).slice(-1)) < 5 ? "товара" : " товаров";
   const sum_product = Object.values(add_basket).reduce(function(total, item) {
       return total + (item.price * item.quantity)
   }, 0)
   $(".item-column").each(function() {
    const jsonItem =  add_basket[$(this).attr('data-id')]
    const sum = jsonItem.quantity* jsonItem.price
    $(this).find(".basket-table-cell-amount > span").text(`${sum.toLocaleString('ru-RU')}.00 ₽`)
   })
   $('.h-profile-basket-label').empty().append(`<span id="label_text">${productLen} ${textBasketLabel}</span><span id="sum_product">${sum_product.toLocaleString('ru-RU')}</span>`)

}
