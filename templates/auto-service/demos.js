(async function () {
  const grid = document.querySelector("[data-demo-grid]");
  const search = document.querySelector("[data-search]");
  const variantFilter = document.querySelector("[data-variant-filter]");
  const count = document.querySelector("[data-catalog-count]");
  const emptyState = document.querySelector("[data-empty-state]");

  const createNode = (tagName, className, text) => {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const createLink = (className, text, href) => {
    const link = createNode("a", className, text);
    link.href = href;
    return link;
  };

  const variantLabel = {
    industrial: "Индустриальный",
    performance: "Динамичный",
    atelier: "Светлый премиальный",
    diagnostic: "Технологичный"
  };

  const getSearchableText = (item) => [item.name, item.city, item.address, ...(item.services || [])]
    .join(" ")
    .toLowerCase();

  const createCard = (item) => {
    const article = createNode("article", "demo-card");
    const heading = createNode("div", "demo-card__heading");
    const title = createNode("h2", "", item.name);
    const design = createNode("span", `design-tag design-tag--${item.defaultVariant}`, variantLabel[item.defaultVariant]);
    const address = createNode("p", "demo-card__address", item.address || item.city);
    const meta = createNode("p", "demo-card__meta");
    const services = createNode("div", "demo-card__services");
    const actions = createNode("div", "demo-card__actions");

    if (item.rating) meta.append(createNode("span", "", `${item.rating} рейтинг`));
    if (item.reviewsCount) meta.append(createNode("span", "", `${item.reviewsCount} отзывов`));

    (item.services || []).slice(0, 3).forEach((service) => {
      services.append(createNode("span", "", service));
    });

    const clientQuery = `client=${encodeURIComponent(item.id)}`;
    actions.append(
      createLink("button-link button-link--primary", "Открыть сайт", `./?${clientQuery}`),
      createLink("button-link button-link--quiet", "4 дизайна", `./showcase.html?${clientQuery}`)
    );

    heading.append(title, design);
    article.append(heading, address, meta, services, actions);
    return article;
  };

  const render = (items) => {
    const searchValue = search.value.trim().toLowerCase();
    const selectedVariant = variantFilter.value;
    const visibleItems = items.filter((item) => {
      const matchesSearch = !searchValue || getSearchableText(item).includes(searchValue);
      const matchesVariant = !selectedVariant || item.defaultVariant === selectedVariant;
      return matchesSearch && matchesVariant;
    });

    grid.replaceChildren(...visibleItems.map(createCard));
    count.textContent = `Показано: ${visibleItems.length} из ${items.length}`;
    emptyState.hidden = visibleItems.length > 0;
  };

  try {
    const response = await fetch("./clients/pskov-demo-catalog.json?v=1");
    if (!response.ok) throw new Error("Не удалось загрузить каталог демо");
    const catalog = await response.json();
    const items = Array.isArray(catalog.items) ? catalog.items : [];

    render(items);
    search.addEventListener("input", () => render(items));
    variantFilter.addEventListener("change", () => render(items));
  } catch (error) {
    console.error(error);
    count.textContent = "Каталог пока недоступен.";
  }
})();
