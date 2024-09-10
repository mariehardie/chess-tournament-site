const arrowBtns = document.querySelectorAll('.arrow');
const carousel = document.querySelector('.carousel');
const carouselChildren = [...carousel.children];
const wrapper = document.querySelector('.wrapper');
const firstCardWidth = carousel.querySelector('.slider-item').offsetWidth;

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
});

carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML);    
});

arrowBtns.forEach(button => {
    button.addEventListener('click', () => {
    carousel.scrollLeft += button.id === 'prev' ? -firstCardWidth : firstCardWidth;
})
})

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove('dragging');
}

const autoplay = () => {
    if (window.innerWidth < 600) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}

autoplay();

function infiniteScroll() {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove('no-transition');
    }
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    }
    clearTimeout(timeoutId);
    if (!wrapper.matches(':hover')) autoplay();
}


carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
wrapper.addEventListener('mouseleave', autoplay);


    
    
    

    
    
  



