const templates = [
  {
    title: "Автосервис",
    slug: "auto-service",
    status: "4 варианта",
    actionLabel: "Выбрать дизайн",
    href: "./templates/auto-service/showcase.html",
    image: "./templates/auto-service/assets/hero-workshop.png",
    description: "Четыре готовых дизайна для СТО: от универсального до премиального и технологичного.",
    tags: ["4 дизайна", "карты", "мессенджеры"],
    accent: "Авто"
  },
  {
    title: "Медицинская клиника",
    slug: "medical-clinic",
    status: "Скоро",
    href: "#roadmap",
    image: "",
    description: "Врачи, направления приема, лицензии, расписание, отзывы и запись.",
    tags: ["специалисты", "услуги", "лицензии"],
    accent: "Med"
  },
  {
    title: "Салон красоты",
    slug: "beauty-salon",
    status: "Скоро",
    href: "#roadmap",
    image: "",
    description: "Мастера, прайс, портфолио работ, акции и онлайн-запись.",
    tags: ["мастера", "прайс", "портфолио"],
    accent: "Beauty"
  },
  {
    title: "Ресторан",
    slug: "restaurant",
    status: "Скоро",
    href: "#roadmap",
    image: "",
    description: "Меню, бронь стола, доставка, события и галерея пространства.",
    tags: ["меню", "бронь", "события"],
    accent: "Food"
  },
  {
    title: "Юридические услуги",
    slug: "legal-services",
    status: "Скоро",
    href: "#roadmap",
    image: "",
    description: "Практики, кейсы, консультации, доверие и заявка на разбор ситуации.",
    tags: ["практики", "кейсы", "консультация"],
    accent: "Legal"
  },
  {
    title: "Недвижимость",
    slug: "real-estate",
    status: "Скоро",
    href: "#roadmap",
    image: "",
    description: "Объекты, фильтры, подбор, ипотека, район и форма заявки.",
    tags: ["объекты", "подбор", "ипотека"],
    accent: "Estate"
  }
];

const roadmapItems = [
  "Понятная структура услуг, цен и специальных предложений.",
  "Удобная версия для смартфона, планшета и компьютера.",
  "Звонок, мессенджеры и форма заявки в нужных местах страницы.",
  "Контакты, график работы и маршрут в Google и Яндекс Картах."
];

const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const renderTemplateCards = () => {
  const grid = document.querySelector("[data-template-grid]");
  if (!grid) return;

  templates.forEach((template) => {
    const card = createElement("article", "template-card");
    const media = createElement("a", "template-card__media");
    const content = createElement("div", "template-card__content");
    const status = createElement("span", "template-card__status", template.status);
    const title = createElement("h3", "", template.title);
    const description = createElement("p", "", template.description);
    const tagList = createElement("div", "tag-list");
    const action = createElement("a", "text-link", template.actionLabel || "Скоро появится");

    media.href = template.href;
    action.href = template.href;

    if (template.image) {
      const image = createElement("img");
      image.src = template.image;
      image.alt = `Превью шаблона: ${template.title}`;
      media.append(image);
    } else {
      media.append(createElement("span", "template-card__placeholder", template.accent));
    }

    template.tags.forEach((tag) => {
      tagList.append(createElement("span", "", tag));
    });

    content.append(status, title, description, tagList, action);
    card.append(media, content);
    grid.append(card);
  });
};

const renderRoadmap = () => {
  const root = document.querySelector("[data-roadmap]");
  if (!root) return;

  roadmapItems.forEach((item, index) => {
    const row = createElement("article", "queue__item");
    row.append(createElement("span", "", String(index + 1).padStart(2, "0")));
    row.append(createElement("p", "", item));
    root.append(row);
  });
};

renderTemplateCards();
renderRoadmap();
