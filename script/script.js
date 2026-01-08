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





//modalCloseBtn-2

document.addEventListener('DOMContentLoaded', function() {
    const newBtn = document.getElementById('modalCloseBtn-2');
    const modalMenu = document.getElementById('modalMenu');

    if (newBtn && modalMenu) {
        newBtn.addEventListener('click', function() {
            // Используем ту же функцию, что и для оригинальной кнопки
            modalMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Функция поиска по сайту
    const searchInputs = document.querySelectorAll('.head_1 .input_text');
    
    // Список страниц для поиска
    const pages = [
        { url: 'index.html', title: 'Главная', keywords: ['главная', 'домой', 'начало'] },
        { url: 'o-kompanii.html', title: 'О компании', keywords: ['о компании', 'компания', 'о нас'] },
        { url: 'uslugi.html', title: 'Услуги', keywords: ['услуги', 'сервис', 'работы'] },
        { url: 'remont.html', title: 'Ремонт', keywords: ['ремонт', 'починка', 'восстановление'] },
        { url: 'korpus-remont.html', title: 'Ремонт корпуса', keywords: ['корпус', 'кузов', 'ремонт корпуса'] },
        { url: 'interier.html', title: 'Интерьер', keywords: ['интерьер', 'салон', 'внутренняя отделка'] },
        { url: 'sezonnye-raboty.html', title: 'Сезонные работы', keywords: ['сезонные работы', 'сезон', 'подготовка'] },
        { url: 'blog.html', title: 'Блог', keywords: ['блог', 'статьи', 'новости'] },
        { url: 'kontakty.html', title: 'Контакты', keywords: ['контакты', 'адрес', 'телефон', 'связаться'] }
    ];

    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim().toLowerCase();
                
                if (!searchTerm) return;
                
                // Ищем страницу, соответствующую запросу
                const foundPage = pages.find(page => 
                    page.title.toLowerCase().includes(searchTerm) ||
                    page.keywords.some(keyword => keyword.includes(searchTerm))
                );
                
                if (foundPage) {
                    // Если страница найдена, переходим на неё
                    window.location.href = foundPage.url;
                } else {
                    // Если страница не найдена, переходим на 404.html
                    window.location.href = '404.html';
                }
            }
        });
    });
});