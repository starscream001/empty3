# Шаблон сайта автосервиса

Один шаблон собирает отдельные демо для любого числа клиентов и показывает каждое демо в четырёх вариантах дизайна. Общая структура и стили лежат в корне папки, а данные клиентов изолированы в `clients/`.

## Новый клиент за пять минут

1. Скопируйте `clients/_example.json` в `clients/<client-slug>.json`.
2. Заполните название, контакты, услуги, тексты, цены и мета-информацию.
3. Добавьте клиента в `clients/manifest.json`.
4. При необходимости положите фотографии в `assets/clients/<client-slug>/` и укажите пути в `hero.images`.
5. Откройте `showcase.html?client=<client-slug>` и отправьте ссылку клиенту.

`config.js` содержит общую структуру шаблона, список дизайнов и базовые значения. Для нового клиента его менять не нужно.

## Адреса демо

- `showcase.html?client=prime-service` — выбор из четырёх дизайнов для клиента.
- `?client=prime-service` — дизайн клиента по умолчанию.
- `?client=prime-service&variant=performance` — конкретный дизайн клиента.
- `demos.html` — каталог подготовленных демо для автосервисов Псковской области.

Доступные варианты: `industrial`, `performance`, `atelier` и `diagnostic`. Поле `defaultVariant` в клиентском JSON определяет, какой из них откроется без параметра `variant`.

## Пакет из 50 демо

Подготовлены конфиги для 50 сервисов из `data/autoservice-leads-pskov-first-50.xlsx`. Их исходные данные также сохранены в `data/autoservice-leads-pskov-first-50.json`, а сами конфиги лежат в `clients/pskov-*.json`.

- Главный каталог: `demos.html`.
- Пример основной страницы: `?client=pskov-001-pskovhab`.
- Пример выбора дизайна: `showcase.html?client=pskov-001-pskovhab`.
- После подключения домена адрес будет выглядеть так: `https://<ваш-домен>/templates/auto-service/?client=pskov-001-pskovhab`.

Чтобы обновить весь пакет после изменения исходного JSON, выполните:

```bash
node scripts/generate-auto-service-demos.mjs
```

Скрипт обновляет только эти 50 конфигов и добавляет их в манифест. Он не удаляет существующие клиентские конфиги или демо-страницы.

## Локальный запуск

```bash
python3 -m http.server 8000
```

После запуска каталог доступен по адресу `http://localhost:8000/templates/auto-service/demos.html`, а витрина конкретного клиента — по адресу `http://localhost:8000/templates/auto-service/showcase.html?client=pskov-001-pskovhab`.

## Что настраивается у клиента

- `meta` — title, description, keywords, автор, canonical URL, Open Graph, Twitter Card и JSON-LD.
- `brand` и `business` — название, адрес, телефон, часы и рейтинг.
- `hero`, `services`, `promotion`, `brands`, `reviews` и `faq` — содержание страницы.
- `contacts.actions` — телефон, WhatsApp, Telegram и ВКонтакте.
- `cta.secondary` и `cta.secondaryHref` — текст и адрес второй кнопки в первом экране.
- `sections` — позволяет отключить неподтвержденные блоки `promo`, `brands` и `faq` для конкретного клиента.
- `location` — карта по умолчанию и масштаб.
- `themes` — фирменные цвета для каждого из четырёх дизайнов.

Адрес из `business.address` автоматически используется для Яндекс Карт и Google Maps. Клиентские конфиги содержат только публичные данные; токены и другие секреты в них добавлять нельзя.

## Отзывы из Яндекс Карт

По умолчанию `reviews.source` имеет значение `manual`, а сайт показывает карточки из `reviews.items`. Для реального клиента:

1. Найдите организацию в Яндекс Картах и скопируйте её числовой ID.
2. Укажите ID в `reviews.yandex.organizationId`.
3. Поменяйте `reviews.source` на `yandex`.

Если Яндекс выдал готовый код виджета, можно скопировать адрес из атрибута `src` в `reviews.yandex.widgetUrl`. Поле `profileUrl` задаёт ссылку на полную карточку организации. При пустом или некорректном адресе виджета шаблон автоматически показывает `reviews.items`.

У подготовленных 50 демо уже заполнены `organizationId` и `profileUrl`, поэтому виджет отзывов берёт реальные отзывы из Яндекс Карт. Для новой версии сайта на домене заполните `meta.canonicalUrl` в нужном клиентском JSON.
