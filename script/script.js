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



// карусель отзывы

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменных
    const sliderTrack = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.card_our');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    // Параметры слайдера
    let currentSlide = 0;
    let cardsPerView = 3;
    let cardWidth = 0;
    let gap = 30;
    let step = 0;
    let maxSlides = 0;
    
    // Создаем точки навигации
    function createDots() {
        dotsContainer.innerHTML = '';
        const dotsCount = Math.ceil(cards.length / cardsPerView);
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Рассчитываем количество карточек в зависимости от ширины экрана
    function calculateCardsPerView() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 768) {
            cardsPerView = 1;
        } else if (screenWidth <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        
        maxSlides = Math.ceil(cards.length / cardsPerView) - 1;
        updateSlider();
        createDots();
    }
    
    // Обновляем параметры слайдера
    function updateSlider() {
        if (cards.length > 0) {
            // Получаем актуальную ширину карточки
            cardWidth = cards[0].offsetWidth;
            step = (cardWidth + gap) * cardsPerView;
            
            // Обновляем состояние кнопок
            updateButtons();
            updateDots();
        }
    }
    
    // Переход к определенному слайду
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -currentSlide * step;
        sliderTrack.style.transform = `translateX(${translateX}px)`;
        
        updateButtons();
        updateDots();
    }
    
    // Обновление состояния кнопок
    function updateButtons() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= maxSlides;
    }
    
    // Обновление активной точки
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Обработчики событий для кнопок
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            goToSlide(currentSlide);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < maxSlides) {
            currentSlide++;
            goToSlide(currentSlide);
        }
    });
    
    // Обработчик изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            calculateCardsPerView();
        }, 200);
    });
    
    // Инициализация слайдера после полной загрузки страницы
    window.addEventListener('load', () => {
        calculateCardsPerView();
    });
    
    // Также инициализируем сразу на случай, если страница уже загружена
    if (document.readyState === 'complete') {
        calculateCardsPerView();
    } else {
        calculateCardsPerView();
    }
});

// Кнопка прокрутки вверх
document.addEventListener('DOMContentLoaded', function() {
    const btnUp = document.getElementById('btnUp');
    
    // Показываем/скрываем кнопку при прокрутке страницы
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btnUp.classList.add('active');
        } else {
            btnUp.classList.remove('active');
        }
    });
    
    // Плавная прокрутка вверх при клике на кнопку
    btnUp.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});