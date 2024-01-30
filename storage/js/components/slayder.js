const sliderTagLi = document.getElementsByClassName('input-decoration')
const sliderDiv = document.getElementById('slider-line')
sliderDiv.prevElement = sliderTagLi[0]

setInterval(() => {
    if (sliderDiv.prevElement.id === 'four_radio') {
        sliderTagLi[0].click()
    }
    else {
        sliderDiv.prevElement['nextElementSibling'].click()
    }

}, 2000)


for (const element of sliderTagLi){
    element.addEventListener('click', browsing);
}

function browsing(event) {
    const RadioTag = event['target']
        if (sliderDiv.hasOwnProperty('prevElement')) {
            sliderDiv.prevElement.style.background = '#ffffff'
        }
        var width = 670
        const position = event['target'].value
        if (outerWidth < 670) {
            width = outerWidth
        }
        sliderDiv.style.transform = `translateX(-${width * Number(position)}px)`;
        sliderDiv.position = position
        sliderDiv.offset = width * Number(position)
        sliderDiv.prevElement = RadioTag
        RadioTag.style.background = 'red'

        
    }


window.addEventListener('resize', () => {
     if (outerWidth < 670) {
        [].forEach.call(sliderDiv.children, (el) => {
            el.style.width = `${outerWidth}px`
            sliderDiv.style.transform = `translateX(-${outerWidth * sliderDiv.position}px)`
        } )
     }

     else {
        [].forEach.call(sliderDiv.children, (el) => {
            el.style.width = `670px`
        } )
        
    }
})

Array.prototype.forEach.call(sliderDiv.children, (el) => {
    if (outerWidth < 670) {
    el.style.width = `${outerWidth}px`
    }
    else {
        el.style.width = '670px'
    }
} )


