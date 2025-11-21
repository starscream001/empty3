import allure
import pytest
from playwright.sync_api import Page

from tests.ui.pages.home_page import HomePage


@pytest.fixture(scope="session")
def base_url() -> str:
    return HomePage.url


@pytest.fixture()
def home_page(page: Page, base_url: str) -> HomePage:
    home = HomePage(page)
    home.open()
    return home


@pytest.hookimpl(hookwrapper=True, tryfirst=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()

    if report.when != "call" or report.passed:
        return

    page: Page | None = item.funcargs.get("page")
    if not page:
        return

    allure.attach(
        page.screenshot(full_page=True),
        name=f"failure-screenshot-{item.name}",
        attachment_type=allure.attachment_type.PNG,
    )
    allure.attach(
        page.content(),
        name=f"failure-dom-{item.name}",
        attachment_type=allure.attachment_type.HTML,
    )
