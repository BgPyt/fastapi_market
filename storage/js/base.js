import {menuBackWraper} from "/storage/js/components/menu-2-back-wraper.js";
import {editBasket} from "/storage/js/components/editBasket.js";

var catalogAll_a = document.getElementsByClassName('head-down-catalog-pop_up-span');
var menu_2 = document.getElementById('menu-2')
var pop_up = document.getElementById("catalog-pop_up")
const slider = document.getElementById('container-slider')
const nextOffer = document.getElementById("next-offer")
const prevOffer = document.getElementById("prev-offer")
const divHotSale = document.getElementById("hot-sale")
const offerBlocks = document.getElementsByClassName("hot-sale-block")
const City = document.getElementById('city')

$('#catalog-pop_up').on("mouseleave", () => {
    menu_2.style.display = "none";
    $('.slider').css('display', 'flex'); 
})

  

for (let number = 0; number < catalogAll_a.length; number++) {
    const catalog_a = catalogAll_a[number]
    catalog_a.addEventListener('mouseenter', categoryContainer)
    catalog_a.addEventListener("mouseleave", categoryContainerLeave)
}

async function categoryContainer(event) {
    var getContainer = setTimeout(async () => {
        const promisse = await fetch(`/api/search/menu-2/?category_name=${event["target"].textContent}`).then(responce => {
        return responce.json()
    }).then(data => {
        console.log(data)
        document.getElementById('menu-2-category-name').innerText = event['target'].innerText
        document.getElementById('menu-2-subcategory-length').innerText = Object.keys(data).length + ' Категорий'
        document.getElementById('menu-2-subcategory-length').href = `${event["target"].parentElement.href}`
        return document.getElementById('back-wraper-content').innerHTML = menuBackWraper(data)
    })
    menu_2.style.display = "flex";
    $('.slider').css('display', 'none') 
    }, 300)
    event['target'].TimeOnContainer = getContainer
}

async function categoryContainerLeave(event) {
    clearTimeout(event['target'].TimeOnContainer)
}

if (localStorage.getItem("favoritesProduct")) {
    let productsQuantity = Object.entries(JSON.parse(localStorage.getItem("favoritesProduct"))).length
    $('#favourites-number').text(productsQuantity < 100 ? productsQuantity : 99)
}
else  {
    localStorage.setItem("favoritesProduct", JSON.stringify({}))
};

if (localStorage.getItem('add_basket') && Object.keys(JSON.parse(localStorage.getItem('add_basket'))).length) {
    editBasket()
}

else {
    localStorage.setItem('add_basket', JSON.stringify({}))
};

$('#next-offer').on('click', () => {
    $('#hot-sale > div').each(function(index) {
       if (window.getComputedStyle(this).opacity == "1") {
        if (!(this.nextElementSibling)) {
        }
        else {
        this.style.opacity = "0"
        this.movement = "next"
        }

       }
    });
})

$('#prev-offer').on("click", () => {
    $('#hot-sale > div').each(function(index) {
       if (window.getComputedStyle(this).opacity == "1") {
        if (!(this.previousElementSibling)) {
        }
        else {
        this.style.opacity = "0"
        this.movement = "prev"
        }

       }
    });
});


[].forEach.call(offerBlocks, (el) => {
    el.addEventListener("transitionend", function(event)  {
        if (event.propertyName == "opacity" && this.style.opacity == 0 && this.movement == "next"){
            this.style.display = 'none'
            this.nextElementSibling.style.display = "grid"
            this.nextElementSibling.style.opacity = "1"
            this.nextElementSibling.movement = "next"
        }
        else if (event.propertyName == "opacity" && this.style.opacity == 0 && this.movement == "prev") {
            this.style.display = 'none'
            this.previousElementSibling.style.display = "grid"
            this.previousElementSibling.style.opacity = "1"
            this.previousElementSibling.movement = "prev"
        }
        
    })
})

if (!(localStorage.getItem('_city'))) {
    localStorage.setItem("_city", "Кемерово");
}
else {
    $(`option[value='${localStorage.getItem('_city')}']`).attr('selected', 'true')
}

City.addEventListener("change", function()  {
    localStorage.setItem("_city", this.value)
    location.reload()
})


