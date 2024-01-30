const object_items = Object.keys($.parseJSON(localStorage.getItem('add_basket')))

$.ajax({
    url: `/api/get-items`,
    method: "get",
    dataType: "json",
    data: {"id_list": JSON.stringify(object_items)},
    headers: {"Cache-Control": "max-age=3600"},
    contentType: "application/json; charset=utf-8",
    cache: true,
}).done(function(data, extStatus, jqXHR) {
    const blockItem = data.forEach(item => {
        let divAddress = ""
        const itemAddress = item.address.forEach(element => {
            const address = element.address_relationship
            let nameAddress = new RegExp("[А-Я][а-я]?").exec(address['title'])[0].toUpperCase()
            divAddress += `<div class="availability-address" title="${address.city} ${address.title}"><span>${nameAddress}</span></div>`
        });
        let classAvailability = 'product-availability_not'
        let availability = 'Нет в наличии'
        const city = localStorage.getItem('_city')
        item.address.some(storage => {
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
        const itemQuantity = JSON.parse(localStorage.getItem("add_basket"))[item.id].quantity
        const sum = itemQuantity * item.price
        $(".catalog-show-product-block").append(
            `<tr class="item-column" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
            <td class="basket-table-cell-description">
                <div class="basket-td-block">
                    <a class="basket-item-a" href="/catalog/${item.id}">
                        <img class="basket-item-img" src="/storage/image_product/${item.image._name}"> 
                    </a>
                    <div class="basket-td-description">
                        <div class="description-article item-description"><a href="/catalog/${item.id}"><span>Код: 20432</span></a></div>
                        <div class="description-name item-description"><a href="/catalog/${item.id}"><span>${item.name}</span></a></div>
                        <div class="description-availability item-description ${classAvailability}">${availability}</span></div>
                    </div>
                </div>
            </td>
            <td class="basket-table-cell-availability">
                ${divAddress}
            </td>
            <td class="basket-table-cell-quantity">
                <div class="counter-product-block">
                <div class="counter-product">
                    <button id="minus" class="score" disabled="disabled">
                        <svg class="number-minus" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" x="0" y="0" viewBox="0 0 1.707 1.707" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd"><g><rect class="number-symbol" width="1.707" height=".271" y=".718" rx=".135" opacity="1"></rect></g></svg>
                    </button>
                    <input type="number" value="${itemQuantity}">
                    <button id="plus" class="score">
                         <svg class="number-plus" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path class="number-symbol" d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z" opacity="1"></path></g></svg>
                    </button>
                </div>
            </div>
            </td>
            <td class="basket-table-cell-price">
                <span>${item.price.toLocaleString('ru-RU')}.00 ₽</span>
            </td>
            <td class="basket-table-cell-amount">
                <span>${sum.toLocaleString('ru-RU')}.00 ₽</span>
            </td>
        </tr>`
                )
    });
})