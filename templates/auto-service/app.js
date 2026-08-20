(function () {
  const config = window.AUTO_SERVICE_TEMPLATE_CONFIG || {};
  const doc = document;
  const activeVariant = window.AUTO_SERVICE_VARIANT || config.defaultVariant || "industrial";

  const getValue = (path) => {
    return path.split(".").reduce((current, key) => {
      if (current && Object.prototype.hasOwnProperty.call(current, key)) {
        return current[key];
      }
      return "";
    }, config);
  };

  const applyTextBindings = () => {
    doc.querySelectorAll("[data-config]").forEach((node) => {
      const value = getValue(node.dataset.config);
      if (value !== "") node.textContent = value;
    });
  };

  const applyAttributeBindings = () => {
    doc.querySelectorAll("[data-config-attr]").forEach((node) => {
      const [path, attribute] = node.dataset.configAttr.split(":");
      const value = getValue(path);
      if (value !== "") node.setAttribute(attribute, value);
    });
  };

  const applyTheme = () => {
    const theme = config.themes?.[activeVariant] || config.theme || {};
    const themeMap = {
      accent: "--accent",
      accentDark: "--accent-dark",
      accentSoft: "--accent-soft",
      graphite: "--graphite",
      graphiteMuted: "--graphite-muted",
      surface: "--surface",
      surfaceElevated: "--surface-elevated",
      surfaceMuted: "--surface-muted",
      ink: "--ink",
      inkMuted: "--ink-muted",
      inkSubtle: "--ink-subtle",
      hairline: "--hairline",
      hairlineStrong: "--hairline-strong"
    };

    Object.entries(themeMap).forEach(([key, property]) => {
      if (theme[key]) doc.documentElement.style.setProperty(property, theme[key]);
    });
  };

  const createNode = (tagName, className, text) => {
    const node = doc.createElement(tagName);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const createLink = ({ label, href }, className) => {
    const link = createNode("a", className, label);
    link.href = href;
    return link;
  };

  const renderLinks = (selector, links, className) => {
    const list = doc.querySelector(selector);
    if (!list) return;
    list.replaceChildren();

    links.forEach((linkItem) => {
      const listItem = createNode("li");
      listItem.append(createLink(linkItem, className));
      list.append(listItem);
    });
  };

  const renderQuickFacts = () => {
    const root = doc.querySelector("[data-quick-facts]");
    if (!root) return;
    root.replaceChildren();

    (config.quickFacts || []).forEach((fact) => {
      const item = createNode("article", "quick-fact");
      item.append(createNode("strong", "", fact.value));
      item.append(createNode("span", "", fact.label));
      root.append(item);
    });
  };

  const renderServices = () => {
    const root = doc.querySelector("[data-services]");
    if (!root) return;

    root.replaceChildren();

    (config.services || []).forEach((service, index) => {
      const card = createNode("article", "service-card");
      const indexNode = createNode("span", "service-card__index", String(index + 1).padStart(2, "0"));
      const title = createNode("h3", "", service.title);
      const description = createNode("p", "", service.description);
      const price = createNode("strong", "", service.price);

      card.append(indexNode, title, description, price);
      root.append(card);
    });
  };

  const renderBenefits = () => {
    const root = doc.querySelector("[data-benefits]");
    if (!root) return;
    root.replaceChildren();

    (config.benefits || []).forEach((benefit) => {
      const item = createNode("article", "benefit");
      item.append(createNode("h3", "", benefit.title));
      item.append(createNode("p", "", benefit.text));
      root.append(item);
    });
  };

  const renderWorkflow = () => {
    const root = doc.querySelector("[data-workflow]");
    if (!root) return;
    root.replaceChildren();

    (config.workflow || []).forEach((step) => {
      const item = createNode("li", "workflow-step");
      item.append(createNode("h3", "", step.title));
      item.append(createNode("p", "", step.text));
      root.append(item);
    });
  };

  const renderBrands = () => {
    const root = doc.querySelector("[data-brands]");
    if (!root) return;
    root.replaceChildren();

    (config.brands || []).forEach((brand) => {
      root.append(createNode("span", "", brand));
    });
  };

  const renderReviews = () => {
    const root = doc.querySelector("[data-reviews]");
    if (!root) return;
    root.replaceChildren();

    (config.reviews || []).forEach((review) => {
      const card = createNode("article", "review-card");
      const text = createNode("p", "", review.text);
      const author = createNode("footer");
      author.append(createNode("strong", "", review.author));
      author.append(createNode("span", "", review.role));
      card.append(text, author);
      root.append(card);
    });
  };

  const renderFaq = () => {
    const root = doc.querySelector("[data-faq]");
    if (!root) return;
    root.replaceChildren();

    (config.faq || []).forEach((faqItem) => {
      const details = createNode("details", "faq-item");
      const summary = createNode("summary", "", faqItem.question);
      details.append(summary, createNode("p", "", faqItem.answer));
      root.append(details);
    });
  };

  const renderContactActions = () => {
    const root = doc.querySelector("[data-contact-actions]");
    if (!root) return;
    root.replaceChildren();

    (config.contacts?.actions || []).forEach((action) => {
      const link = createLink(action, "contact-action");
      if (action.href.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      root.append(link);
    });
  };

  const configureHeroImage = () => {
    const image = doc.querySelector("[data-hero-image]");
    if (!image || !config.hero) return;
    const variantImage = config.hero.images?.[activeVariant];
    image.src = variantImage?.src || config.hero.image || image.src;
    image.alt = variantImage?.alt || config.hero.imageAlt || "";
  };

  const setMetaContent = (selector, content) => {
    const node = doc.querySelector(selector);
    if (!node || !content) return;
    node.setAttribute("content", content);
  };

  const configureStructuredData = (socialImage) => {
    const script = doc.getElementById("structured-data");
    if (!script || !config.meta?.structuredDataEnabled) {
      script?.remove();
      return;
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      name: config.brand?.name,
      description: config.meta?.description,
      image: socialImage,
      url: config.meta?.canonicalUrl || undefined,
      telephone: config.business?.phone,
      address: config.business?.address,
      openingHours: config.business?.openingHoursSchema,
      priceRange: config.meta?.priceRange
    };

    script.textContent = JSON.stringify(structuredData);
  };

  const buildMapProviders = () => {
    const address = config.business?.address || "";
    const encodedAddress = encodeURIComponent(address);
    const zoom = config.location?.zoom || 16;

    return {
      yandex: {
        label: "Яндекс Карты",
        embedUrl: `https://yandex.ru/map-widget/v1/?mode=search&text=${encodedAddress}&z=${zoom}`,
        externalUrl: `https://yandex.ru/maps/?text=${encodedAddress}`
      },
      google: {
        label: "Google Maps",
        embedUrl: `https://www.google.com/maps?q=${encodedAddress}&output=embed&z=${zoom}`,
        externalUrl: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
      }
    };
  };

  const setupMaps = () => {
    const mapRoot = doc.querySelector("[data-map]");
    const frame = doc.querySelector("[data-map-frame]");
    const externalLink = doc.querySelector("[data-map-external]");
    const tabs = [...doc.querySelectorAll("[data-map-provider]")];
    if (!mapRoot || !frame || !externalLink || !tabs.length) return;

    const providers = buildMapProviders();
    const defaultProvider = providers[config.location?.defaultProvider] ? config.location.defaultProvider : "yandex";

    const showProvider = (providerName) => {
      const provider = providers[providerName];
      if (!provider) return;

      frame.src = provider.embedUrl;
      frame.title = `${config.business?.address || "Автосервис"} — ${provider.label}`;
      externalLink.href = provider.externalUrl;
      externalLink.textContent = `Открыть в ${provider.label}`;

      tabs.forEach((tab) => {
        const isActive = tab.dataset.mapProvider === providerName;
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });
    };

    tabs.forEach((tab, tabIndex) => {
      tab.addEventListener("click", () => showProvider(tab.dataset.mapProvider));
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextTab = tabs[(tabIndex + direction + tabs.length) % tabs.length];
        nextTab.focus();
        showProvider(nextTab.dataset.mapProvider);
      });
    });

    showProvider(defaultProvider);
  };

  const configureMeta = () => {
    const meta = config.meta || {};
    const variantImage = config.hero?.images?.[activeVariant]?.src;
    const socialImage = variantImage || meta.ogImage;
    const canonical = doc.querySelector("link[rel='canonical']");
    const themeColor = config.themes?.[activeVariant]?.themeColor;

    if (meta.language) doc.documentElement.lang = meta.language;
    if (meta.title) doc.title = meta.title;
    setMetaContent("meta[name='description']", meta.description);
    setMetaContent("meta[name='keywords']", meta.keywords);
    setMetaContent("meta[name='author']", meta.author);
    setMetaContent("meta[name='robots']", meta.robots);
    setMetaContent("meta[name='theme-color']", themeColor);
    setMetaContent("meta[property='og:title']", meta.title);
    setMetaContent("meta[property='og:description']", meta.description);
    setMetaContent("meta[property='og:type']", meta.ogType);
    setMetaContent("meta[property='og:site_name']", meta.siteName);
    setMetaContent("meta[property='og:locale']", meta.ogLocale);
    setMetaContent("meta[property='og:image']", socialImage);
    setMetaContent("meta[name='twitter:card']", meta.twitterCard);
    setMetaContent("meta[name='twitter:title']", meta.title);
    setMetaContent("meta[name='twitter:description']", meta.description);
    setMetaContent("meta[name='twitter:image']", socialImage);

    if (canonical && meta.canonicalUrl) canonical.href = meta.canonicalUrl;
    if (canonical && !meta.canonicalUrl) canonical.remove();
    configureStructuredData(socialImage);
    applyTextBindings();
    applyAttributeBindings();
  };

  const setHeaderState = () => {
    const header = doc.querySelector("[data-header]");
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  const setupNavigation = () => {
    const navToggle = doc.querySelector("[data-nav-toggle]");
    const navList = doc.querySelector("[data-nav-list]");
    if (!navToggle || !navList) return;

    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navList.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  };

  const setupToTop = () => {
    const button = doc.querySelector("[data-to-top]");
    if (!button) return;
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const init = () => {
    applyTheme();
    configureMeta();
    configureHeroImage();
    renderLinks("[data-nav-list]", config.navigation || [], "nav__link");
    renderLinks("[data-footer-links]", config.footerLinks || [], "footer__link");
    renderQuickFacts();
    renderServices();
    renderBenefits();
    renderWorkflow();
    renderBrands();
    renderReviews();
    renderFaq();
    renderContactActions();
    setupMaps();
    setupNavigation();
    setupToTop();
    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
  };

  init();
})();
