# Шаблон сайта автосервиса

Конфигурируемый одностраничный шаблон для быстрого демо автосервиса. Ориентир по структуре: плотный верх с доверием и контактами, герой с записью, услуги, преимущества, процесс, акция, марки, отзывы, FAQ, мессенджеры и карты.

## Быстрый запуск демо

1. Откройте `templates/auto-service/config.js`.
2. Замените `brand`, `business`, `hero`, `services`, `promotion`, `reviews` и `faq` под клиента.
3. Положите фото сервиса в `templates/auto-service/assets/` и укажите пути в `hero.images`.
4. Настройте заголовок, описание, Open Graph и JSON-LD в `meta`.
5. Откройте `templates/auto-service/showcase.html` и выберите дизайн.

Для локального сервера:

```bash
python3 -m http.server 8000 --directory templates/auto-service
```

После запуска выбор дизайна доступен по адресу `http://localhost:8000/showcase.html`.

## Четыре варианта дизайна

- `?variant=industrial` — универсальный индустриальный.
- `?variant=performance` — тёмный динамичный.
- `?variant=atelier` — светлый премиальный.
- `?variant=diagnostic` — строгий технологичный.

Все варианты используют один `index.html` и один `config.js`. Список вариантов, их обложки, палитры и файлы стилей находятся в `variants`, `themes` и `hero.images`.

## Настройка контактов и карт

Ссылки на телефон и мессенджеры находятся в `contacts.actions`. Адрес из `business.address` автоматически используется для Яндекс Карт и Google Maps. Провайдер по умолчанию и масштаб задаются в `location`.

## Что менять для нового клиента

- `meta` — title, description, keywords, robots, Open Graph, Twitter Card, canonical URL и JSON-LD.
- `themes` — цвета каждого варианта.
- `brand` и `business` — название, адрес, телефон, часы, рейтинг.
- `hero` — главный экран и изображение.
- `services` — услуги и цены.
- `promotion` — сезонная акция.
- `brands` — марки автомобилей.
- `reviews` и `faq` — доверие и ответы на частые вопросы.
- `contacts.actions` — телефон, WhatsApp, Telegram и ВКонтакте.
- `location` — карта по умолчанию и масштаб.
