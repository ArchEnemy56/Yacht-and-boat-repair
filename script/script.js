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

    // Функция для оптимизации частых вызовов при ресайзе
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Рассчитываем количество карточек в зависимости от ширины экрана
    function calculateCardsPerView() {
        const container = document.querySelector('.slider-container');
        const containerWidth = container ? container.offsetWidth : window.innerWidth;

        if (containerWidth <= 768) {
            cardsPerView = 1;    // 1 карточка на экранах до 768px
        } else if (containerWidth <= 1000) {
            cardsPerView = 2;    // 2 карточки на экранах от 769px до 1000px
        } else if (containerWidth <= 1200) {
            cardsPerView = 3;    // 3 карточки на экранах от 1001px до 1200px
        } else {
            cardsPerView = 4;    // 4 карточки на экранах шире 1200px
        }

        maxSlides = Math.max(0, Math.ceil(cards.length / cardsPerView) - 1);
        updateSlider();
        createDots();
    }

    // Обновляем параметры слайдера
    function updateSlider() {
        if (cards.length > 0) {
            // Устанавливаем ширину карточки в зависимости от количества карточек в ряду
            cardWidth = (sliderTrack.offsetWidth - (gap * (cardsPerView - 1))) / cardsPerView;
            
            // Устанавливаем фиксированную ширину для всех карточек
            cards.forEach(card => {
                card.style.minWidth = `${cardWidth}px`;
                card.style.maxWidth = `${cardWidth}px`;
            });
            
            step = cardWidth + gap;
            sliderTrack.style.transform = `translateX(${-currentSlide * step}px)`;
            
            updateButtons();
            updateDots();
        }
    }

    // Добавляем обработчик события resize с debounce
    window.addEventListener('resize', debounce(calculateCardsPerView, 250));

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

    // Инициализация слайдера
    calculateCardsPerView();

    // Пересчитываем при полной загрузке страницы
    window.addEventListener('load', calculateCardsPerView);
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


document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального меню
    const modalMenu = document.getElementById('modalMenu');
    const burgerMenuBtn = document.getElementById('burger_menuBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // Функция для открытия модального меню
    function openModalMenu() {
        console.log('Opening modal menu'); // Логируем открытие
        if (modalMenu) {
            modalMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Modal menu element not found');
        }
    }

    // Функция для закрытия модального меню
    function closeModalMenu() {
        console.log('Closing modal menu'); // Логируем закрытие
        if (modalMenu) {
            modalMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Обработчики событий
    if (burgerMenuBtn) {
        console.log('Burger button found'); // Проверяем, что кнопка найдена
        burgerMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Burger button clicked'); // Логируем клик
            openModalMenu();
        });
    } else {
        console.error('Burger button not found');
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModalMenu);
    } else {
        console.error('Close button not found');
    }

    // Закрытие модального окна при клике вне его области
    if (modalMenu) {
        modalMenu.addEventListener('click', function(e) {
            if (e.target === modalMenu) {
                closeModalMenu();
            }
        });
    }

    // Закрытие модального окна при нажатии клавиши Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalMenu && modalMenu.classList.contains('active')) {
            closeModalMenu();
        }
    });

    // Обработка кликов по ссылкам в меню
    const menuLinks = document.querySelectorAll('.modal-menu__nav-list a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeModalMenu);
    });
});