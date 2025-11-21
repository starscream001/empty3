from __future__ import annotations

import allure
import pytest
from playwright.sync_api import expect

from tests.ui.pages.home_page import HomePage, NavTarget


class TestHomeNavigation:
    @pytest.mark.parametrize("target", HomePage.NAV_TARGETS, ids=lambda nav: nav.name)
    def test_navigation_links(self, home_page: HomePage, target: NavTarget) -> None:
        """Verify that each top navigation link opens the correct block."""
        home_page.navigate_to(target)

        with allure.step("Validate final URL fragment"):
            assert target.fragment in home_page.page.url

        with allure.step("Validate that the destination section is visible"):
            section = home_page.section(target)
            expect(section).to_be_visible()


class TestServicesBlock:
    @allure.feature("Home")
    @allure.story("Services block")
    def test_services_block_has_heading_and_links(self, home_page: HomePage) -> None:
        """
        Проверяем, что блок «Услуги» существует и в нём есть все нужные ссылки.
        """
        with allure.step("Validate 'Услуги' heading is visible"):
            heading = home_page.services_heading()
            expect(heading).to_be_visible()

        with allure.step("Validate required service links are present"):
            for service in HomePage.SERVICE_LINKS:
                link = home_page.page.get_by_role(
                    "link",
                    name=service.name,
                    exact=True,
                )
                expect(link).to_be_visible()

    @pytest.mark.parametrize("service", HomePage.SERVICE_LINKS, ids=lambda nav: nav.name)
    def test_service_links_navigate_to_correct_fragment(
        self,
        home_page: HomePage,
        service: NavTarget,
    ) -> None:
        """
        Проверяем, что ссылки в блоке «Услуги»:
        - кликаются;
        - приводят к ожидаемому фрагменту URL;
        - целевой блок/заголовок реально виден.
        """
        home_page.click_service_link(service)

        with allure.step("Validate final URL fragment after service link click"):
            assert service.fragment in home_page.page.url

        with allure.step("Validate logical service section is visible"):
            section = home_page.service_section(service)
            expect(section).to_be_visible()
