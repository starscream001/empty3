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

Доступные варианты: `industrial`, `performance`, `atelier` и `diagnostic`. Поле `defaultVariant` в клиентском JSON определяет, какой из них откроется без параметра `variant`.

## Локальный запуск

```bash
python3 -m http.server 8000
```

После запуска витрина клиента доступна по адресу `http://localhost:8000/templates/auto-service/showcase.html?client=prime-service`.

## Что настраивается у клиента

- `meta` — title, description, keywords, автор, canonical URL, Open Graph, Twitter Card и JSON-LD.
- `brand` и `business` — название, адрес, телефон, часы и рейтинг.
- `hero`, `services`, `promotion`, `brands`, `reviews` и `faq` — содержание страницы.
- `contacts.actions` — телефон, WhatsApp, Telegram и ВКонтакте.
- `location` — карта по умолчанию и масштаб.
- `themes` — фирменные цвета для каждого из четырёх дизайнов.

Адрес из `business.address` автоматически используется для Яндекс Карт и Google Maps. Клиентские конфиги содержат только публичные данные; токены и другие секреты в них добавлять нельзя.
