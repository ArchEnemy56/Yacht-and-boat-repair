// Карусель карточек
function initCardSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const slider = sliderContainer.querySelector('.slider-track');
    const cards = sliderContainer.querySelectorAll('.card_our');
    const prevBtn = document.querySelector('.slider-btn.prev-btn');
    const nextBtn = document.querySelector('.slider-btn.next-btn');
    const dotsContainer = sliderContainer.querySelector('.slider-dots');

    if (!slider || cards.length === 0) return;

    let cardWidth = cards[0].offsetWidth;
    const gap = 30;
    let currentPosition = 0;
    let currentSlide = 0;
    let cardsToShow = getCardsToShow();
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Функция для определения количества отображаемых карточек
    function getCardsToShow() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Функция для обновления видимой области
    function updateSlider() {
        cardsToShow = getCardsToShow();
        const maxPosition = Math.max(0, (cards.length - cardsToShow) * (cardWidth + gap));

        // Корректируем позицию, если она выходит за пределы
        if (currentPosition < -maxPosition) {
            currentPosition = -maxPosition;
        } else if (currentPosition > 0) {
            currentPosition = 0;
        }

        slider.style.transform = `translateX(${currentPosition}px)`;
        updateDots();
    }

    // Функция для обработки начала касания/нажатия
    function startDrag(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        currentX = currentPosition;
        slider.style.transition = 'none';
        e.preventDefault();
    }

    // Функция для обработки движения пальца/мыши
    function drag(e) {
        if (!isDragging) return;
        const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const dragDistance = x - startX;
        currentPosition = currentX + dragDistance;
        updateSlider();
    }

    // Функция для завершения перетаскивания
    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        slider.style.transition = 'transform 0.3s ease-in-out';

        // Определяем направление свайпа
        const x = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
        const dragDistance = x - startX;

        // Если свайп был достаточно большим, переключаем слайд
        if (Math.abs(dragDistance) > cardWidth / 4) {
            if (dragDistance > 0) {
                slidePrev();
            } else {
                slideNext();
            }
        } else {
            // Иначе возвращаем к предыдущей позиции
            updateSlider();
        }
    }

    // Обработчик кнопки "Вперед"
    function slideNext() {
        cardWidth = cards[0].offsetWidth;
        const maxPosition = Math.max(0, (cards.length - cardsToShow) * (cardWidth + gap));
        currentPosition -= (cardWidth + gap);

        if (currentPosition < -maxPosition) {
            if (window.innerWidth <= 480) {
                // Для мобильных - зацикливаем на начало
                currentPosition = 0;
            } else {
                // Для десктопа - останавливаемся на последней карточке
                currentPosition = -maxPosition;
            }
        }

        slider.style.transition = 'transform 0.5s ease-in-out';
        updateSlider();
    }

    // Обработчик кнопки "Назад"
    function slidePrev() {
        cardWidth = cards[0].offsetWidth;
        const maxPosition = Math.max(0, (cards.length - cardsToShow) * (cardWidth + gap));
        currentPosition += (cardWidth + gap);

        if (currentPosition > 0) {
            if (window.innerWidth <= 480) {
                // Для мобильных - переходим к последней карточке
                currentPosition = -maxPosition;
            } else {
                // Для десктопа - останавливаемся на первой карточке
                currentPosition = 0;
            }
        }

        slider.style.transition = 'transform 0.5s ease-in-out';
        updateSlider();
    }

    // Вешаем обработчики событий для мыши
    slider.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mouseleave', endDrag);

    // Вешаем обработчики событий для сенсорных устройств
    slider.addEventListener('touchstart', startDrag, { passive: false });
    slider.addEventListener('touchmove', drag, { passive: false });
    slider.addEventListener('touchend', endDrag);
    slider.addEventListener('touchcancel', endDrag);

    // Кнопки навигации
    if (nextBtn) nextBtn.addEventListener('click', slideNext);
    if (prevBtn) prevBtn.addEventListener('click', slidePrev);

    // Функция для создания точек навигации
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const dotCount = Math.ceil(cards.length / cardsToShow);
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Функция для обновления активной точки
    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        if (!dots.length) return;
        
        const newSlide = Math.abs(Math.round(currentPosition / (cardWidth + gap)));
        if (newSlide !== currentSlide) {
            currentSlide = newSlide;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }
    
    // Функция для перехода к определенному слайду
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        currentPosition = -slideIndex * (cardWidth + gap);
        slider.style.transition = 'transform 0.5s ease-in-out';
        updateSlider();
    }

    // Обработчик изменения размера окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newCardWidth = cards[0].offsetWidth;
            if (cardWidth > 0) {
                const currentIndex = Math.round(Math.abs(currentPosition) / (cardWidth + gap));
                currentPosition = -currentIndex * (newCardWidth + gap);
            }
            cardWidth = newCardWidth;
            createDots();
            updateSlider();
        }, 250);
    });

    // Инициализация слайдера
    createDots();
    updateSlider();
}

// Запускаем слайдер после полной загрузки страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardSlider);
} else {
    initCardSlider();
}