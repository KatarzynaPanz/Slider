> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 

&nbsp;



# JavaScript: Zdarzenia

W tym projekcie zmierzysz się z kodem napisanym przez **innego programistę**.

Otrzymałeś zadanie, aby utworzyć pokaz slajdów (galerię), który będzie uruchamiany po kliknięciu w wybrane zdjęcie (element `<figure>`, który zawiera element `<img>`). 

Klient ma już gotową część kodu HTML, CSS oraz JS.
Prosi Cię, abyś HTML-a i CSS-a nie zmieniał, a w JavaScripcie trzymał się istniejącej już konwencji.

Element (obraz), w który będziemy klikać, wygląda następująco:

```html
<figure class="gallery__item gallery__item--pos1">
    <img src="./assets/img/1.jpg" alt="1" class="gallery__image">
    <figcaption class="gallery__caption">źródło: unsplash.com</figcaption>
</figure>
```

Natomiast kod HTML do pokazu slajdów prezentuje się w ten sposób:

```html
<section class="js-slider">
    <header class="js-slider__zoom">
        <span class="js-slider__nav js-slider__nav--prev">&lt;</span>
        <span class="js-slider__nav js-slider__nav--next">&gt;</span>
        <figure class="js-slider__wrapper">
            <img class="js-slider__image" src="./assets/img/6.jpg" alt="1">
            <figcaption class="js-slider__caption">źródło: unsplash.com</figcaption>
        </figure>
    </header>
    <footer class="js-slider__thumbs">
        <figure class="js-slider__thumbs-item js-slider__thumbs-item--prototype">
            <img class="js-slider__thumbs-image">
        </figure>
    </footer>
</section>
```

* **.js-slider__zoom** – ma zawierać aktualnie prezentowane zdjęcie
* **.js-slider__thumbs** – ma zawierać listę zdjęć o tej samej nazwie grupy co kliknięte zdjęcie

> Nazwa grupy jest przechowywana w atrybucie `data-slider-group-name` i jest generowana automatycznie przez JS, aby zasymulować zmieniający się kod HTML. 

Efekt po kliknięciu w któryś z obrazów na stronie powinien wyglądać jak na poniższym screenie:

![](./assets/img/img1.png)

&nbsp;

> **Uwaga!** Celem tego projektu jest odnalezienie się w cudzym kodzie i wykonanie powierzonego zadania. Pamiętaj, że nad projektem zazwyczaj pracuje kilka osób z różnym doświadczeniem (junior, regular, senior, a nawet lead czy architekt). To powoduje, że miejscami kod może być bardziej skomplikowany. W tym projekcie nie chodzi więc o to, abyś był w stanie taki kod napisać samodzielnie. W tej chwili masz go na tyle rozumieć, aby wykonać swoją część pracy.

&nbsp;

## Implementacja

Nasze rozwiązanie ma się opierać w głównej mierze na własnych eventach (CustomEvent), których nazwy są następujące:

* **js-slider-img-click** – event, który jest uruchamiany po kliknięciu w obrazek na stronie (jest to już zrobione w pliku `script.js`) i ma wyświetlić nasz pokaz slajdów

* **js-slider-img-next** – event, który jest uruchamiany po kliknięciu w prawą strzałkę na stronie i ma pokazać kolejny obrazek (o ile w ogóle istnieje) spośród tych widocznych w miniaturach

* **js-slider-img-prev** – podobnie jak wyżej, tylko chodzi o lewą strzałkę

* **js-slider-close** – event, który jest uruchamiany po kliknięciu w wolną przestrzeń wokół prezentowanego zdjęcia, czyli w element `.js-slider__zoom` (i tylko w ten element! Trzeba uważać na propagację eventów).

Do uruchomienia eventów będziemy używać napisanej już funkcji `fireCustomEvent`:

```javascript
const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event );
}
```

Dla ułatwienia funkcja ta posiada `console.log()`, który prezentuje nam informację o tym, jaki event jest odpalany i na jakim elemencie.

Zauważ, że funkcja ta przyjmuje dwa parametry: pierwszy to element, na którym ma być wywołany event, a drugi to nazwa eventu.

> Zapoznaj się dokładnie ze strukturą plików HTML i CSS oraz opisem działań w pliku `./assets/js/script.js` – wszystko to pomoże Ci w zrealizowaniu projektu.

&nbsp;

## Zadania dodatkowe

### Zadanie 1

Napisz kod, który pozwoli przełączać obrazki w nieskończoność – jeśli nie ma już następnego obrazka (lub poprzedniego), to po kliknięciu strzałki nawigacji wracamy do początku (lub końca) galerii.

### Zadanie 2

Stwórz kod, który automatycznie, co zadaną ilość czasu, sam przełącza obrazki.



&nbsp;

> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 
