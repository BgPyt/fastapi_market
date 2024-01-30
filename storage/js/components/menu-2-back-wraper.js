

export function menuBackWraper(data) {
    console.log(data)
    var htmlContext = ""
    for(var item of data) {
        htmlContext += `<div class="menu-2-back-wraper-subcategory">
        <div class="menu-2-back-wraper-subcategory-main">
            <a href="/catalog/${item[0].slug}" class="menu-2-back-wraper-subcategory-main-a">${item[0].name}</a>
        </div>
        <ul class="menu-2-back-wraper-subcategory-ul">`
        if(item[1].length === 0) {
            htmlContext += '</div>'
            continue
        }
        for (var element of item[1]){
            if(item[1].indexOf(element) === 5 ) {
                htmlContext += `</ul>
                <a href="/catalog/${item[0].slug}" class="menu-2-back-wraper-subcategory-other_subcategory">Все товары</a>
            </div>`
            break
            }
            htmlContext += `<li><a href="/catalog/${element.slug}" class="menu-2-back-wraper-subcategory-ul-a">${element.name}</a></li>`
        };
        htmlContext += '</div>'
    }
    return htmlContext
}

