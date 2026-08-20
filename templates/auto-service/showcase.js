(function () {
  const config = window.AUTO_SERVICE_TEMPLATE_CONFIG || {};
  const grid = document.querySelector("[data-variant-grid]");
  if (!grid) return;

  const createNode = (tagName, className, text) => {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  (config.variants || []).forEach((variant, index) => {
    const article = createNode("article", `design-card design-card--${variant.id}`);
    const preview = createNode("a", "design-card__preview");
    const image = createNode("img");
    const body = createNode("div", "design-card__body");
    const number = createNode("span", "design-card__number", String(index + 1).padStart(2, "0"));
    const name = createNode("p", "design-card__name", variant.label);
    const title = createNode("h2", "", variant.title);
    const description = createNode("p", "design-card__description", variant.description);
    const action = createNode("a", "design-card__action", "Открыть дизайн →");
    const href = `./?variant=${encodeURIComponent(variant.id)}`;

    image.src = variant.image;
    image.alt = `Дизайн сайта автосервиса: ${variant.title}`;
    preview.href = href;
    action.href = href;
    preview.append(image);
    body.append(number, name, title, description, action);
    article.append(preview, body);
    grid.append(article);
  });
})();
