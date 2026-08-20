(async function () {
  const createNode = (tagName, className, text) => {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  try {
    const config = await (window.AUTO_SERVICE_CONFIG_READY || Promise.resolve(
      window.AUTO_SERVICE_TEMPLATE_CONFIG || {}
    ));
    const clientId = window.AUTO_SERVICE_CLIENT_ID || "prime-service";
    const grid = document.querySelector("[data-variant-grid]");
    if (!grid) return;

    const brandName = config.brand?.name || "Автосервис";
    const brandShortName = config.brand?.shortName || "AS";
    const variants = config.variants || [];
    const clientQuery = `client=${encodeURIComponent(clientId)}`;
    const descriptionMeta = document.querySelector("meta[name='description']");
    const showcaseLink = document.querySelector("[data-client-showcase]");

    document.title = `Дизайны сайта ${brandName}`;
    if (descriptionMeta) {
      descriptionMeta.content = `Четыре варианта сайта для ${brandName}: выберите подходящий дизайн автосервиса.`;
    }
    if (showcaseLink) showcaseLink.href = `./showcase.html?${clientQuery}`;

    document.querySelectorAll("[data-client-name]").forEach((node) => {
      node.textContent = brandName;
    });
    document.querySelectorAll("[data-client-short-name]").forEach((node) => {
      node.textContent = brandShortName;
    });

    grid.replaceChildren();
    variants.forEach((variant, index) => {
      const article = createNode("article", `design-card design-card--${variant.id}`);
      const preview = createNode("a", "design-card__preview");
      const image = createNode("img");
      const body = createNode("div", "design-card__body");
      const number = createNode("span", "design-card__number", String(index + 1).padStart(2, "0"));
      const name = createNode("p", "design-card__name", variant.label);
      const title = createNode("h2", "", variant.title);
      const description = createNode("p", "design-card__description", variant.description);
      const action = createNode("a", "design-card__action", "Открыть дизайн →");
      const href = `./?${clientQuery}&variant=${encodeURIComponent(variant.id)}`;
      const clientImage = config.hero?.images?.[variant.id];

      image.src = clientImage?.src || variant.image;
      image.alt = clientImage?.alt || `Дизайн сайта автосервиса: ${variant.title}`;
      preview.href = href;
      action.href = href;
      preview.append(image);
      body.append(number, name, title, description, action);
      article.append(preview, body);
      grid.append(article);
    });

    const firstVariant = variants[0]?.id || config.defaultVariant || "industrial";
    const firstDesignLink = document.querySelector("[data-first-design]");
    if (firstDesignLink) {
      firstDesignLink.href = `./?${clientQuery}&variant=${encodeURIComponent(firstVariant)}`;
    }
  } catch (error) {
    console.error("Не удалось собрать витрину дизайнов", error);
  } finally {
    delete document.documentElement.dataset.templateLoading;
  }
})();
