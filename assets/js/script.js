const init = function() {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    runJSSlider();
}

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function() {
    const imagesSelector = '.gallery__item';
    const sliderRootSelector = '.js-slider'; 

    const imagesList = document.querySelectorAll(imagesSelector);
    const sliderRootElement = document.querySelector(sliderRootSelector);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function(imagesList, sliderRootElement) {
    imagesList.forEach( function(item)  {
        item.addEventListener('click', function(e) {
            fireCustomEvent(e.currentTarget, 'js-slider-img-click');
        });        
    });

    // todo: 
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]
    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
    if(navNext){
        navNext.addEventListener('click', function(e) {
            fireCustomEvent(navNext, 'js-slider-img-next');
            e.stopPropagation();
        });
    }

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
    if(navPrev){
        navPrev.addEventListener('click', function(e) {
            fireCustomEvent(navPrev, 'js-slider-img-prev');
            e.stopPropagation();
        });
    }

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    if(zoom){
        zoom.addEventListener('click', function(e) {
            if(e.currentTarget === zoom){
            fireCustomEvent(zoom, 'js-slider-close');
            }
        });
    }
}

const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event );
}

const initCustomEvents = function(imagesList, sliderRootElement, imagesSelector) {
    imagesList.forEach(function(img) {
        img.addEventListener('js-slider-img-click', function(event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });
    
    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}

let idTimeInterval;
const onImageClick = function(event, sliderRootElement, imagesSelector) {
    // todo:  
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
    sliderRootElement.classList.add('js-slider--active');
    // 2. wyszukać ściężkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
    const clickedImg = event.target.querySelector('img');
    const clickedImgSrc = clickedImg.getAttribute('src');
    console.log(clickedImgSrc);
    const sliderImg = sliderRootElement.querySelector('img');
    sliderImg.setAttribute('src', clickedImgSrc);
    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
    const groupName = event.target.dataset.sliderGroupName;
    console.log(groupName);
    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku
    const allImagesList = document.querySelectorAll(imagesSelector);
    console.log(allImagesList);
    const groupImagesList = []; 
    allImagesList.forEach(function(item){
        if(item.dataset.sliderGroupName === groupName){
            groupImagesList.push(item);    
        }
    });
    console.log(groupImagesList);
    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
        const footerEl = document.querySelector('.js-slider__thumbs');
        console.log(footerEl);
        if(footerEl){
            groupImagesList.forEach(function(element){
                const newFigure = document.createElement('figure');
                newFigure.classList.add('js-slider__thumbs-item');
                footerEl.appendChild( newFigure );
                const newImg = document.createElement('img');
                newImg.classList.add('js-slider__thumbs-image');
                const elementImg = element.querySelector('img');
                const elementImgSrc = elementImg.getAttribute('src');
                newImg.setAttribute('src',  elementImgSrc);
                newFigure.appendChild( newImg );
            });
        }
    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany
    const footerImagesList = document.querySelectorAll('.js-slider__thumbs-image');
    console.log(footerImagesList);
    footerImagesList.forEach(function(item){
        if(clickedImgSrc === item.getAttribute('src')) {
            item.classList.add('js-slider__thumbs-image--current');
        }
    });
    //dodanie kodu, który automatycznie przełącza obrazki co 2000 ms
    idTimeInterval = setInterval(onImageNext, 2000);
}

/*const onImageNext = function(event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
     const displayedEl = document.querySelector('.js-slider__thumbs-image--current');
     console.log(displayedEl);
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const figureEl = displayedEl.parentElement;
    console.log(figureEl);
    const nextEl = figureEl.nextElementSibling;
    console.log(nextEl);
    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
    if(!nextEl){
        return null;
    }
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    displayedEl.classList.remove('js-slider__thumbs-image--current');
    nextElImg = nextEl.querySelector('img');
    nextElImg.classList.toggle('js-slider__thumbs-image--current');
    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]
    sliderImage = document.querySelector('.js-slider__image');
    console.log(sliderImage);
    nextElAttr = nextElImg.getAttribute('src');
    sliderImage.setAttribute('src', nextElAttr);
}*/

/*const onImagePrev = function(event) {
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const displayedEl = document.querySelector('.js-slider__thumbs-image--current');
    console.log(displayedEl);
    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const figureEl = displayedEl.parentElement;
    console.log(figureEl);
    const prevEl = figureEl.previousElementSibling;
    console.log(prevEl);
    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    //const prevElClassName = prevEl.className;
    if((!prevEl) || (prevEl.className.includes('js-slider__thumbs-item--prototype'))){
        return null;
    }
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    displayedEl.classList.remove('js-slider__thumbs-image--current');
    prevElImg = prevEl.querySelector('img');
    prevElImg.classList.toggle('js-slider__thumbs-image--current');
    // 5. podmienić atrybut [src] dla [.js-slider__image]
    sliderImage = document.querySelector('.js-slider__image');
    console.log(sliderImage);
    prevElAttr = prevElImg.getAttribute('src');
    sliderImage.setAttribute('src', prevElAttr);

}*/

//kod, który pozwoli przełączać obrazki w nieskończoność 
const onImageNext = function(event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
     const displayedEl = document.querySelector('.js-slider__thumbs-image--current');
     console.log(displayedEl);
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const figureEl = displayedEl.parentElement;
    console.log(figureEl);
    let nextEl = figureEl.nextElementSibling;
    console.log(nextEl);
    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
    if(!nextEl){
        prototypeEl = document.querySelector('.js-slider__thumbs-item--prototype');
        nextEl =  prototypeEl.nextElementSibling;
    }
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    displayedEl.classList.remove('js-slider__thumbs-image--current');
    nextElImg = nextEl.querySelector('img');
    nextElImg.classList.toggle('js-slider__thumbs-image--current');
    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]
    sliderImage = document.querySelector('.js-slider__image');
    console.log(sliderImage);
    nextElAttr = nextElImg.getAttribute('src');
    sliderImage.setAttribute('src', nextElAttr);
}

const onImagePrev = function(event) {
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const displayedEl = document.querySelector('.js-slider__thumbs-image--current');
    console.log(displayedEl);
    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const figureEl = displayedEl.parentElement;
    console.log(figureEl);
    let prevEl = figureEl.previousElementSibling;
    console.log(prevEl);
    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    //const prevElClassName = prevEl.className;
    if((!prevEl) || (prevEl.className.includes('js-slider__thumbs-item--prototype'))){
        footerEl = document.querySelector('footer');
        prevEl = footerEl.lastElementChild;
    }
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    displayedEl.classList.remove('js-slider__thumbs-image--current');
    prevElImg = prevEl.querySelector('img');
    prevElImg.classList.toggle('js-slider__thumbs-image--current');
    // 5. podmienić atrybut [src] dla [.js-slider__image]
    sliderImage = document.querySelector('.js-slider__image');
    console.log(sliderImage);
    prevElAttr = prevElImg.getAttribute('src');
    sliderImage.setAttribute('src', prevElAttr);
}

const onClose = function(event) {
    // todo:
    console.log('Onclose');
    // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
    const jsSlider = document.querySelector('.js-slider');
    console.log(jsSlider);
    jsSlider.classList.remove('js-slider--active');
    // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
    const prototypeEl = document.querySelector('.js-slider__thumbs-item--prototype');
    const footerEl = document.querySelector('.js-slider__thumbs');
    const figureList = footerEl.querySelectorAll('.js-slider__thumbs-item');
    if(footerEl){
        figureList.forEach(function(item){
            if(item !== prototypeEl){
                footerEl.removeChild(item);
            }
        });
    }
    clearInterval(idTimeInterval);
}




