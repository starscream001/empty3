import allure
import pytest

from tests.ui.pages.home_page import HomePage, NavTarget


@allure.epic("Effective Mobile site")
@allure.feature("Home page navigation")
class TestHomeNavigation:
    @pytest.mark.parametrize("target", HomePage.NAV_TARGETS, ids=lambda nav: nav.name)
    def test_navigation_links(self, home_page: HomePage, target: NavTarget) -> None:
        """Verify that each navigation link opens the correct block."""
        home_page.navigate_to(target)
        with allure.step("Validate final URL fragment"):
            assert target.fragment in home_page.page.url
        with allure.step("Validate that the destination section is visible"):
            assert home_page.section(target).first.is_visible()
