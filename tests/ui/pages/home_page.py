from __future__ import annotations

import re
from dataclasses import dataclass

import allure
from playwright.sync_api import Locator, Page

from .base_page import BasePage


@dataclass(frozen=True)
class NavTarget:
    """Description of a navigation target on the home page."""

    name: str
    fragment: str
    note: str

    @property
    def section_query(self) -> str:
        return f"[id*='{self.fragment.lstrip('#')}']"


class HomePage(BasePage):
    url: str = "https://www.effective-mobile.ru/"

    NAV_TARGETS: tuple[NavTarget, ...] = (
        NavTarget(name="О нас", fragment="#about", note="Company overview"),
        NavTarget(name="Услуги", fragment="#services", note="Services overview"),
        NavTarget(name="Проекты", fragment="#cases", note="Project highlights"),
        NavTarget(name="Команда", fragment="#team", note="Team expertise"),
        NavTarget(name="Карьера", fragment="#career", note="Career opportunities"),
        NavTarget(name="Контакты", fragment="#contacts", note="Contact details"),
    )

    def open(self) -> None:  # type: ignore[override]
        super().open(self.url)

    def nav_link(self, target: NavTarget) -> Locator:
        return self.page.get_by_role("link", name=re.compile(target.name, re.IGNORECASE))

    def section(self, target: NavTarget) -> Locator:
        return self.page.locator(target.section_query)

    def navigate_to(self, target: NavTarget) -> None:
        with allure.step(f"Navigate to '{target.name}' section"):
            link = self.nav_link(target)
            link.scroll_into_view_if_needed()
            link.click()
            self.wait_for_fragment(target.fragment)
            section = self.section(target)
            section.first.wait_for(state="visible")
            allure.attach(
                self.page.screenshot(full_page=True),
                name=f"{target.name} screenshot",
                attachment_type=allure.attachment_type.PNG,
            )
