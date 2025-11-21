from __future__ import annotations

from dataclasses import dataclass

import allure
from playwright.sync_api import Page, Locator

from .base_page import BasePage


@dataclass
class NavTarget:
    """Navigation target description for the home page."""
    name: str       # Видимый текст ссылки (например: "О нас")
    fragment: str   # Фрагмент / якорь (например: "#about")
    note: str       # Описание для читаемых id тестов


class HomePage(BasePage):
    """Page Object для главной страницы effective-mobile.ru."""

    # Базовый URL
    url: str = "https://www.effective-mobile.ru/"

    # Пункты навигации в шапке
    NAV_TARGETS: list[NavTarget] = [
        NavTarget(name="О нас",       fragment="#about",           note="Company overview"),
        NavTarget(name="Вакансии",    fragment="#specializations", note="Vacancies list"),
        NavTarget(name="Отзывы",      fragment="#testimonials",    note="Testimonials"),
        NavTarget(name="Контакты",    fragment="#contact",         note="Contacts section"),
    ]

    # Ссылки в блоке «Услуги»
    # По HTML:
    # - "Аутстафф"       → href="...#services"
    # - "Трудоустройство"→ href="...#services"
    # - "Консультация"   → href="...#contact"
    SERVICE_LINKS: list[NavTarget] = [
        NavTarget(name="Аутстафф",       fragment="#services", note="Service link: outstaff"),
        NavTarget(name="Трудоустройство", fragment="#services", note="Service link: employment"),
        NavTarget(name="Консультация",    fragment="#contact",  note="Service link: consultation"),
    ]

    def __init__(self, page: Page) -> None:
        super().__init__(page)

    # ---------- Базовые действия ----------

    def open(self) -> None:
        """Открыть главную страницу."""
        self.page.context.clear_cookies()
        super().open(self.url)

    # ---------- Навигация по шапке ----------

    def navigate_to(self, target: NavTarget) -> None:
        """
        Перейти к секции через пункт навигации в шапке.
        """
        with allure.step(f"Navigate to '{target.name}' ({target.fragment})"):
            link: Locator = self.page.get_by_role(
                "link",
                name=target.name,
                exact=True,
            )
            link.click()
            self.wait_for_fragment(target.fragment)

    def section(self, target: NavTarget) -> Locator:
        """
        Вернуть локатор секции, к которой логически относится пункт меню.
        Завязка на реальные заголовки на странице.
        """
        if target.name == "О нас":
            return self.page.get_by_role("heading", name="О компании", exact=True)
        if target.name == "Вакансии":
            return self.page.get_by_role("heading", name="Кого мы ищем", exact=True)
        if target.name == "Отзывы":
            return self.page.get_by_role("heading", name="Отзывы специалистов", exact=True)
        if target.name == "Контакты":
            return self.page.get_by_role("heading", name="Свяжитесь с нами", exact=True)

        # Fallback на случай будущих пунктов
        return self.page.locator("body")

    # ---------- Блок «Услуги» ----------

    def services_heading(self) -> Locator:
        """Заголовок блока «Услуги»."""
        return self.page.get_by_role("heading", name="Услуги", exact=True)

    def click_service_link(self, target: NavTarget) -> None:
        """
        Клик по ссылке в блоке «Услуги».
        """
        with allure.step(f"Click service link '{target.name}' ({target.fragment})"):
            link: Locator = self.page.get_by_role(
                "link",
                name=target.name,
                exact=True,
            )
            link.click()
            self.wait_for_fragment(target.fragment)

    def service_section(self, target: NavTarget) -> Locator:
        """
        Логическая «целевая секция» после клика по сервису.
        Для простоты:
        - для #services считаем целевым блоком заголовок «Услуги»
        - для #contact — заголовок «Контакты» / «Свяжитесь с нами»
        """
        if target.fragment == "#services":
            return self.services_heading()
        if target.fragment == "#contact":
            return self.page.get_by_role("heading", name="Свяжитесь с нами", exact=True)

        return self.page.locator("body")
