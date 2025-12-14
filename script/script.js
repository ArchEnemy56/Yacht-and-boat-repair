document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    // Клонируем все карточки, чтобы создать «запас» для бесконечной прокрутки
    const items = Array.from(carousel.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
    
    // Текущий индекс видимой первой карточки (в исходном наборе)
    let currentIndex = 0;
    const totalOriginalItems = items.length; // 10
    const itemWidth = items[0].offsetWidth;
    const gap = 16; // значение из CSS (gap: 16px)
    const scrollAmount = itemWidth + gap;

    // Функция прокрутки вперёд (вправо)
    function scrollNext() {
        currentIndex++;
        
        // Если вышли за пределы оригинала — «перематываем» визуально
        if (currentIndex >= totalOriginalItems) {
            // Плавно прокручиваем до клонированной копии первой карточки
            carousel.scrollLeft += totalOriginalItems * scrollAmount;
            // Сбрасываем индекс, чтобы продолжить цикл
            currentIndex = 0;
        }
        
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Функция прокрутки назад (влево)
    function scrollPrev() {
        currentIndex--;
        
        // Если ушли до отрицательного — «перематываем» в конец
        if (currentIndex < 0) {
            // Прокручиваем до последней оригинальной карточки
            carousel.scrollLeft -= totalOriginalItems * scrollAmount;
            // Устанавливаем индекс на последнюю карточку
            currentIndex = totalOriginalItems - 1;
        }
        
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    }

    // Обработчики кнопок
    nextBtn.addEventListener('click', scrollNext);
    prevBtn.addEventListener('click', scrollPrev);
});

// Button Up

window.onscroll = function () { scrollFunction() };

const upbuttons = document.getElementById("btnUp");

for (const upbutton of upbuttons) {
    upbutton.addEventListener("click", clickHandler);
}

function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");

    document.querySelector(href).scrollIntoView({
        behavior: "smooth"
    });
}

function scrollFunction() {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        document.getElementById('btnUp').className = 'btn-up visible';
    } else {
        document.getElementById('btnUp').className = 'btn-up hidden';
    }
}

//popup

