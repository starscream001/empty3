from __future__ import annotations

import allure
from playwright.sync_api import Page


class BasePage:
    """Base class for all pages with helper actions."""

    def __init__(self, page: Page) -> None:
        self.page = page

    def open(self, url: str) -> None:
        """Open the given URL and wait for the network to be idle."""
        with allure.step(f"Open {url}"):
            self.page.goto(url)
            self.page.wait_for_load_state("networkidle")

    def wait_for_fragment(self, fragment: str) -> None:
        """Wait until the current URL contains the provided fragment."""
        with allure.step(f"Wait for URL fragment '{fragment}'"):
            self.page.wait_for_url(f"**{fragment}")

    def attach_dom(self, name: str = "dom") -> None:
        """Attach the current page HTML to the Allure report."""
        html = self.page.content()
        allure.attach(html, name=name, attachment_type=allure.attachment_type.HTML)
