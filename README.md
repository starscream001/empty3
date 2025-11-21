# UI-тесты главной страницы Effective Mobile

Проект содержит UI-тесты на главную страницу https://www.effective-mobile.ru/, написанные на Python 3.10 с использованием Playwright, Pytest, Allure и паттерна Page Object.

## Требования
- Python 3.10+
- Доступ в интернет к домену `www.effective-mobile.ru` (тесты открывают продакшн-сайт)
- Allure CLI (для просмотра отчётов, опционально)

## Установка и запуск локально
1. Создайте и активируйте виртуальное окружение:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Установите зависимости и браузер Playwright (Chromium):
   ```bash
   pip install -r requirements.txt
   playwright install --with-deps chromium
   ```
3. Запустите тесты, сохранив результаты для Allure:
   ```bash
   pytest tests/ui --alluredir=allure-results
   ```
4. Сформируйте отчёт Allure (опционально):
   ```bash
   allure serve allure-results
   ```

## Запуск в Docker
1. Соберите образ:
   ```bash
   docker build -t effective-mobile-tests .
   ```
2. Запустите контейнер с передачей папки для артефактов (по желанию):
   ```bash
   docker run --rm -v $(pwd)/allure-results:/app/allure-results effective-mobile-tests
   ```
   По умолчанию контейнер выполнит `pytest tests/ui --alluredir=allure-results`.

## Структура проекта
- `tests/ui/pages/` — реализация Page Object (базовый класс и главная страница).
- `tests/ui/test_home_navigation.py` — набор тестов на переход по разделам навигации.
- `tests/ui/conftest.py` — фикстуры Pytest и автоматические вложения в Allure при падении.
- `Dockerfile` — окружение для запуска тестов в изоляции.
- `requirements.txt` — зависимости проекта.

## Примечания по тестам
- Тесты кликают по пунктам навигации («О нас», «Услуги», «Проекты», «Команда», «Карьера», «Контакты») и проверяют, что URL содержит соответствующий якорь и что целевой блок видим на странице.
- Если сайт недоступен из вашего окружения, тесты завершатся ошибкой соединения; убедитесь, что доступ к домену открыт.
