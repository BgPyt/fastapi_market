const object_items = Object.values($.parseJSON(localStorage.getItem('favoritesProduct')))

if (!(object_items.length))  {
    $(".product-table-block").remove()
    $(".wrapper").append(
        `
        <div class="empty-block">
            <div class="empty-svg">
                 <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="250" height="250" x="0" y="0" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
                       <g><path fill="#ffd150" d="M512.001 256c0 32.76-6.16 64.09-17.38 92.88-1.8 4.62-3.73 9.18-5.79 13.66-28.2 61.55-80.1 109.98-144.01 133.62-3.47 1.28-6.97 2.49-10.51 3.63-24.68 7.93-50.99 12.21-78.31 12.21-34.89 0-68.16-6.98-98.47-19.63-31.25-13.03-59.36-32.08-82.88-55.69C28.521 390.38.001 326.52.001 256c0-27.56 4.36-54.11 12.43-78.99 3.33-10.29 7.3-20.3 11.87-29.98 1.86-3.96 3.82-7.86 5.88-11.71 2.26-4.22 4.63-8.37 7.12-12.45a257.123 257.123 0 0 1 65.34-71.86c2.87-2.15 5.78-4.24 8.74-6.27 19.96-13.69 41.96-24.63 65.45-32.25 2.83-.93 5.69-1.8 8.56-2.62 22.43-6.43 46.12-9.87 70.61-9.87 141.38 0 256 114.62 256 256z" opacity="1" data-original="#ffd150" class=""></path><path fill="#443a4c" d="M488.831 362.54c-28.2 61.55-80.1 109.98-144.01 133.62-3.47 1.28-6.97 2.49-10.51 3.63-.24-1.5-.45-3.01-.62-4.52-3.3-28.44-13.04-55.77-28.97-79.57l-61.67-92.18c-29.63-44.27-77.46-73.63-130.55-78.13-38.43-3.25-74.94-24.48-96.13-61.02-1.41-2.42-2.72-4.88-3.94-7.36a120.07 120.07 0 0 1-8.62-23.4 123.444 123.444 0 0 1-3.74-34.66l17.33 9.42 12.78 6.95 37.54 20.42c8.25 4.49 17.15 6.62 25.91 6.62 19.28 0 37.94-10.27 47.8-28.4 14.33-26.36 4.59-59.36-21.77-73.7l-17.02-9.25-7.85-4.27-43.58-23.7c36.75-26.29 82.67-29.42 120.91-12.73 1.58.69 3.16 1.41 4.71 2.18 18.87 9.2 35.63 23.36 48.15 42.07 11.21 16.76 17.75 35.26 19.93 54 3.3 28.45 13.04 55.77 28.97 79.57l61.68 92.18c29.62 44.28 77.46 73.64 130.53 78.14 7.7.65 15.31 2.02 22.74 4.09z" opacity="1" data-original="#443a4c" class=""></path><path fill="#417293" d="M76.991 367.874c13.206 13.206 34.617 13.206 47.823 0L401.153 91.536 353.33 43.713 76.991 320.051c-13.206 13.206-13.206 34.617 0 47.823z" opacity="1" data-original="#417293" class=""></path><g fill="#5d8aaf"><path d="M352.188 28.07c-6.203 6.201-6.207 16.255-.009 22.461l.013.013.015-.015 42.13 42.13-.015.015 92.607 92.593c5.738 5.737 15.04 5.735 20.775-.005a14.688 14.688 0 0 0 2.814-16.813l-48.78-100.137-63.659-63.659c-6.203-6.203-16.261-6.204-22.465-.002zM427.951 244.25l-134.73-134.73c-6.21-6.21-16.26-6.21-22.47 0l-34.64 34.64-54.31 54.3c-6.21 6.2-6.21 16.26 0 22.47l26.74 26.73 27.57 27.57-161.46 161.45c23.52 23.61 51.63 42.66 82.88 55.69l143.65-143.65a69.832 69.832 0 0 0 18.29-32.17l14.92-58.8c3.18-12.54 17.07-18.98 28.71-13.33l48.03 23.41c2.05 1 4.25 1.49 6.43 1.49 3.81 0 7.57-1.49 10.39-4.31 5.73-5.73 5.73-15.03 0-20.76z" fill="#5d8aaf" opacity="1" data-original="#5d8aaf" class=""></path></g></g></svg>
            </div>
            <div class="empty-span">
                <span>Отсутсвуют товары. Добавьте, чтобы не потерять</span>
            </div>
            <a class="empty-a" href="/">Перейти на главную</a>
        </div>` 
        )
};

$(document).ajaxStart(function() {
    console.log(this)
})

$.ajax({
    url: `/api/get-items`,
    method: "get",
    dataType: "json",
    data: {"id_list": JSON.stringify(object_items)},
    headers: {"Cache-Control": "max-age=10800"},
    contentType: "application/json; charset=utf-8",
    cache: true,
}).done(function(data, extStatus, jqXHR) {
    console.log(jqXHR.getResponseHeader("Cache-Control"))
    const blockItem = data.forEach(item => {
        let divAddress = ""
        const itemAddress = item.address.forEach(element => {
            const address = element.address_relationship
            let nameAddress = new RegExp("[А-Я][а-я]?").exec(address['title'])[0].toUpperCase()
            divAddress += `<div title="${address.city} ${address.title}"><span>${nameAddress}</span></div>`
        });
        $(".catalog-show-product-block").append(
            `<div class="product-block" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                <div class="table-list-item-article">12454</div>
                <div class="table-list-item-name">
                    <a href="catalog/${item.id}">${item.name}</a>
                </div>
                <div class="table-list-item-availability">
                    ${divAddress}
                </div>
                <div class="table-list-item-price">${item.price.toLocaleString('ru-RU')}.00 ₽</div>
                <div class="table-list-item-button">
                    <div class="product-block-down">
                        <div class="product-add_basket">
                            <svg class="product-add_basket-button" data-id="${item.id}" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="35" height="35" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#ffa260" d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 0" opacity="1" data-original="#2196f3" class=""></path><path fill="#fafafa" d="M368 277.332h-90.668V368c0 11.777-9.555 21.332-21.332 21.332s-21.332-9.555-21.332-21.332v-90.668H144c-11.777 0-21.332-9.555-21.332-21.332s9.555-21.332 21.332-21.332h90.668V144c0-11.777 9.555-21.332 21.332-21.332s21.332 9.555 21.332 21.332v90.668H368c11.777 0 21.332 9.555 21.332 21.332s-9.555 21.332-21.332 21.332zm0 0" opacity="1" data-original="#fafafa" class=""></path></g></svg>
                        </div>
                    </div>
                    <svg data-id="${item.id}" data-name="${item.name}" class="product-block-up-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="35" height="35" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g>
                    <path fill="#ffffff" d="M22.128 3.901C20.918 2.675 19.309 2 17.596 2s-3.321.675-4.531 1.9L12 4.98l-1.065-1.079A6.323 6.323 0 0 0 6.404 2a6.324 6.324 0 0 0-4.532 1.901c-2.491 2.524-2.491 6.631 0 9.153l9.594 9.722a.746.746 0 0 0 1.068 0l9.594-9.721c2.491-2.523 2.491-6.629 0-9.154z" data-original="#f44336" opacity="1" class="svg-path" style="fill: rgb(255, 73, 73);"></path>
                    <path d="M11.466 22.776a.746.746 0 0 0 1.068 0l9.594-9.721c2.491-2.523 2.491-6.63 0-9.154C20.918 2.675 19.309 2 17.596 2s-3.321.675-4.531 1.9L12 4.98l-1.065-1.079A6.323 6.323 0 0 0 6.404 2a6.324 6.324 0 0 0-4.532 1.901c-2.491 2.524-2.491 6.631 0 9.153zM2.939 4.954A4.84 4.84 0 0 1 6.403 3.5c1.308 0 2.538.517 3.463 1.455l1.599 1.62a.773.773 0 0 0 1.067 0l1.599-1.621A4.847 4.847 0 0 1 17.596 3.5a4.84 4.84 0 0 1 3.464 1.454c1.917 1.943 1.917 5.104 0 7.048L12 21.183l-9.061-9.182c-1.917-1.942-1.917-5.104 0-7.047z" fill="#000000" data-original="#000000" class="svg-path-contour"></path></g></svg>
                </div>
            </div>`
                )
    });
})

$(document).ajaxSuccess(function(document) {
    $('.svg-path').click(function() {
        $(this).unbind()
        const divItem =   $($(this).parentsUntil(".catalog-show-product-block").last())
        divItem.slideUp(700, function() {
            divItem.remove()
        })
        setTimeout(function() {
            if (!(Object.keys(JSON.parse(localStorage.getItem('favoritesProduct'))).length)) {
                location.reload()
            }}, 500)
    });
    $(".clear-all_favoruties").click(function() {
        localStorage.setItem("favoritesProduct", JSON.stringify({}))
        setTimeout(function() {
            location.reload()
        }, 500)
    });
});

basket-table-cell-amount