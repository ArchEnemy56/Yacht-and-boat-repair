// Карусель карточек
function initCardSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const slider = sliderContainer.querySelector('.slider-track');
    const cards = sliderContainer.querySelectorAll('.card_our');
    const prevBtn = document.querySelector('.slider-btn.prev-btn');
    const nextBtn = document.querySelector('.slider-btn.next-btn');

    if (!slider || cards.length === 0) return;

    let cardWidth = cards[0].offsetWidth;
    const gap = 30;
    let currentPosition = 0;
    let cardsToShow = window.innerWidth <= 1024 ? 2 : 3;

    // Функция для обновления видимой области
    function updateSlider() {
        cardsToShow = window.innerWidth <= 1024 ? 2 : 3;
        const maxPosition = (cards.length - cardsToShow) * (cardWidth + gap);

        // Корректируем позицию, если она выходит за пределы
        if (currentPosition < -maxPosition) {
            currentPosition = -maxPosition;
        } else if (currentPosition > 0) {
            currentPosition = 0;
        }

        slider.style.transform = `translateX(${currentPosition}px)`;
    }

    // Обработчик кнопки "Вперед"
    function slideNext() {
        cardWidth = cards[0].offsetWidth;
        const maxPosition = (cards.length - cardsToShow) * (cardWidth + gap);
        currentPosition -= (cardWidth + gap);

        if (currentPosition < -maxPosition) {
            currentPosition = 0;
        }

        slider.style.transition = 'transform 0.5s ease-in-out';
        updateSlider();
    }

    // Обработчик кнопки "Назад"
    function slidePrev() {
        cardWidth = cards[0].offsetWidth;
        const maxPosition = (cards.length - cardsToShow) * (cardWidth + gap);
        currentPosition += (cardWidth + gap);

        if (currentPosition > 0) {
            currentPosition = -maxPosition;
        }

        slider.style.transition = 'transform 0.5s ease-in-out';
        updateSlider();
    }

    // Вешаем обработчики событий
    if (nextBtn) nextBtn.addEventListener('click', slideNext);
    if (prevBtn) prevBtn.addEventListener('click', slidePrev);

    // Обработчик изменения размера окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newCardWidth = cards[0].offsetWidth;
            if (cardWidth > 0) {
                currentPosition = currentPosition * (newCardWidth / cardWidth);
            }
            cardWidth = newCardWidth;
            updateSlider();
        }, 250);
    });

    // Инициализация слайдера
    updateSlider();
}

// Запускаем слайдер после полной загрузки страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardSlider);
} else {
    initCardSlider();
}