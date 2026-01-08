// Инициализация карты
ymaps.ready(init);

function init() {
    // Создаем карту с центром в указанных координатах
    var myMap = new ymaps.Map('map', {
        // Координаты центра карты (замените на нужные)
        center: [55.8973, 37.4655], // Координаты яхт-клуба "Маяк"
        // Масштаб карты (от 0 до 19)
        zoom: 10, // Уменьшенный масштаб (было 12)
        // Элементы управления
        controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
    });

    // Создаем метку
    var myPlacemark = new ymaps.Placemark([55.8973, 37.4655], {
        // Текст, который будет отображаться при наведении на метку
        hintContent: 'Яхт-сервис «Маяк»',
        // Текст, который будет отображаться при клике на метку
        balloonContent: 'Яхт-сервис «Маяк»<br>Московская область, г. Химки, ул. Кудрявцева, 10Б'
    }, {
        // Опции метки
        // Тип метки
        preset: 'islands#icon',
        // Цвет иконки
        iconColor: '#0095b6',
        // Содержимое балуна
        balloonCloseButton: true
    });

    // Добавляем метку на карту
    myMap.geoObjects.add(myPlacemark);

    // Центрируем карту на метке
    myMap.setBounds(myMap.geoObjects.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 50
    }).then(function() {
        // Затем возвращаем нужный масштаб
        myMap.setZoom(16);
    });
}