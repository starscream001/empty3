from __future__ import annotations

from dataclasses import dataclass

import allure
from playwright.sync_api import Page, Locator

from .base_page import BasePage


@dataclass
class NavTarget:
    """Navigation target description for the home page header menu."""
    name: str       # Видимый текст ссылки в меню (например: "О нас")
    fragment: str   # Ожидаемый фрагмент / якорь (например: "#about")
    note: str       # Краткое описание секции (для читаемых id тестов)


class HomePage(BasePage):
    """Page Object для главной страницы effective-mobile.ru."""

    # Базовый URL, используется в фикстуре base_url и методе open()
    url: str = "https://www.effective-mobile.ru/"

    # Ожидаемые пункты навигации в шапке
    NAV_TARGETS: list[NavTarget] = [
        NavTarget(name="О нас",       fragment="#about",           note="Company overview"),
        NavTarget(name="Вакансии",    fragment="#specializations", note="Vacancies list"),
        NavTarget(name="Отзывы",      fragment="#testimonials",    note="Testimonials"),
        NavTarget(name="Контакты",    fragment="#contact",         note="Contacts section"),
    ]

    def __init__(self, page: Page) -> None:
        super().__init__(page)

    def open(self) -> None:
        """Открыть главную страницу."""
        # Для стабильности тестов очищаем куки перед открытием
        self.page.context.clear_cookies()
        super().open(self.url)

    def navigate_to(self, target: NavTarget) -> None:
        """
        Перейти к секции через пункт навигации.

        Здесь важно:
        - использовать exact=True для текста ссылки, чтобы не ловить strict mode
          (например, есть ещё ссылка «Актуальные вакансии»);
        - после клика чуть подождать (BasePage.wait_for_fragment), чтобы не падать
          на анимациях/скролле.
        """
        with allure.step(f"Navigate to '{target.name}' ({target.fragment})"):
            # Ссылка в основном меню в блоке «Компания»
            link: Locator = self.page.get_by_role(
                "link",
                name=target.name,
                exact=True,
            )
            link.click()
            self.wait_for_fragment(target.fragment)

    def section(self, target: NavTarget) -> Locator:
        """
        Вернуть локатор "секции", к которой якобы ведёт пункт меню.

        На реальном проекте здесь стоило бы искать по реальным id/селектору секции.
        В учебном примере сайт не содержит id #about/#specializations/#testimonials/#contact,
        поэтому, чтобы не городить хрупкую магию, считаем секцией всю страницу.
        Это достаточно для проверки, что переход по меню не ломает страницу.
        """
        # Возвращаем стабильный видимый контейнер
        return self.page.locator("body")
