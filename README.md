# UI-тесты главной страницы Effective Mobile

Проект содержит UI-тесты главной страницы https://www.effective-mobile.ru/, написанные на Python 3.10 с использованием Playwright, Pytest, Allure и паттерна Page Object.

## Требования
- Python 3.10+
- Доступ в интернет к домену `www.effective-mobile.ru` (тесты открывают продакшн-сайт)
- Allure CLI (для просмотра отчётов, опционально)

## Быстрый старт (локально)
1. Создайте виртуальное окружение и активируйте его:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Установите зависимости и скачайте Chromium для Playwright:
   ```bash
   pip install -r requirements.txt
   playwright install --with-deps chromium
   ```
   > Если PyPI недоступен, убедитесь, что у вас настроен доступ к интернету/прокси; без пакетов `playwright` и `pytest-playwright` тесты будут помечены как пропущенные.
3. Запустите тесты с сохранением артефактов для Allure:
   ```bash
   pytest tests/ui --alluredir=allure-results
   ```
4. При необходимости посмотрите отчёт Allure:
   ```bash
   allure serve allure-results
   ```

## Запуск в Docker
1. Соберите образ:
   ```bash
   docker build -t effective-mobile-tests .
   ```
2. Выполните тесты в контейнере (артефакты будут сохранены в текущей директории):
   ```bash
   docker run --rm -v $(pwd)/allure-results:/app/allure-results effective-mobile-tests
   ```
   По умолчанию внутри контейнера выполняется `pytest tests/ui --alluredir=allure-results`.

## Структура проекта
- `tests/ui/pages/` — реализация Page Object (базовый класс и главная страница).
- `tests/ui/test_home_navigation.py` — тесты навигации по шапке и блоку «Услуги».
- `tests/ui/conftest.py` — фикстуры Pytest, подключение плагина Playwright и вложения в Allure при падении.
- `Dockerfile` — окружение для запуска тестов в изоляции.
- `requirements.txt` — зависимости проекта.

## Что проверяют тесты
- Переходы по пунктам навигации в шапке: «О нас», «Вакансии», «Отзывы», «Контакты».
- Наличие и видимость ссылок в блоке «Услуги».
- Клики по ссылкам «Услуги» приводят к ожидаемым фрагментам `#services` и `#contact`, целевые блоки отображаются.
- При недоступности сайта появится ошибка соединения — убедитесь, что домен открыт из вашего окружения.
