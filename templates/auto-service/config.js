window.AUTO_SERVICE_TEMPLATE_CONFIG = {
  defaultVariant: "industrial",
  variants: [
    {
      id: "industrial",
      label: "Industrial Trust",
      title: "Индустриальный",
      description: "Тёплый, уверенный и универсальный вариант для СТО полного цикла.",
      image: "./assets/hero-workshop.png",
      stylesheet: ""
    },
    {
      id: "performance",
      label: "Midnight Performance",
      title: "Динамичный тёмный",
      description: "Контрастный дизайн для тюнинга, детейлинга и сервиса премиальных автомобилей.",
      image: "./assets/hero-performance.png",
      stylesheet: "./variants/performance.css"
    },
    {
      id: "atelier",
      label: "Precision Atelier",
      title: "Светлый премиальный",
      description: "Спокойная редакционная подача для сервиса с высоким уровнем заботы.",
      image: "./assets/hero-atelier.png",
      stylesheet: "./variants/atelier.css"
    },
    {
      id: "diagnostic",
      label: "Diagnostic System",
      title: "Технологичный",
      description: "Строгий интерфейс для диагностического центра и современной сетевой СТО.",
      image: "./assets/hero-diagnostic.png",
      stylesheet: "./variants/diagnostic.css"
    }
  ],
  meta: {
    language: "ru",
    title: "Прайм Сервис — автосервис полного цикла",
    description: "Диагностика, техническое обслуживание, слесарный и кузовной ремонт автомобилей в Санкт-Петербурге.",
    keywords: "автосервис, ремонт автомобилей, диагностика, техническое обслуживание, СТО Санкт-Петербург",
    author: "Прайм Сервис",
    robots: "index, follow",
    canonicalUrl: "",
    siteName: "Прайм Сервис",
    ogType: "website",
    ogLocale: "ru_RU",
    ogImage: "./assets/hero-workshop.png",
    twitterCard: "summary_large_image",
    priceRange: "₽₽",
    structuredDataEnabled: true
  },
  brand: {
    name: "Прайм Сервис",
    shortName: "PS",
    caption: "СТО полного цикла"
  },
  business: {
    ratingText: "4.9 рейтинг • 900+ отзывов",
    address: "Санкт-Петербург, Полюстровский проспект, 74",
    hours: "Ежедневно с 9:00 до 21:00",
    phone: "+7 (812) 327-43-33",
    phoneHref: "tel:+78123274333",
    whatsappHref: "https://wa.me/78123274333?text=%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%A1%D0%A2%D0%9E",
    openingHoursSchema: "Mo-Su 09:00-21:00"
  },
  themes: {
    industrial: {
      accent: "#d63f2d",
      accentDark: "#a42e22",
      accentSoft: "#f4d8d3",
      graphite: "#171a1f",
      graphiteMuted: "#2b3038",
      surface: "#f6f4ef",
      surfaceElevated: "#ffffff",
      surfaceMuted: "#e9e5dc",
      ink: "#111113",
      inkMuted: "#62615d",
      inkSubtle: "#8d8980",
      hairline: "#d9d4c8",
      hairlineStrong: "#bcb5a7",
      themeColor: "#171a1f"
    },
    performance: {
      accent: "#db4437",
      accentDark: "#b32f25",
      accentSoft: "#f0b8b2",
      graphite: "#101113",
      graphiteMuted: "#24262a",
      surface: "#111214",
      surfaceElevated: "#191b1e",
      surfaceMuted: "#26282c",
      ink: "#f1f0ed",
      inkMuted: "#aaa9a5",
      inkSubtle: "#777872",
      hairline: "#33353a",
      hairlineStrong: "#55575e",
      themeColor: "#101113"
    },
    atelier: {
      accent: "#7c2637",
      accentDark: "#581926",
      accentSoft: "#ead8da",
      graphite: "#1b1918",
      graphiteMuted: "#34302e",
      surface: "#f5f1e9",
      surfaceElevated: "#fffdf9",
      surfaceMuted: "#e7e0d5",
      ink: "#1b1918",
      inkMuted: "#6a625b",
      inkSubtle: "#948b82",
      hairline: "#d8d0c4",
      hairlineStrong: "#b6aa9b",
      themeColor: "#f5f1e9"
    },
    diagnostic: {
      accent: "#147451",
      accentDark: "#0d5038",
      accentSoft: "#cde5da",
      graphite: "#111513",
      graphiteMuted: "#27302c",
      surface: "#f2f4f1",
      surfaceElevated: "#ffffff",
      surfaceMuted: "#e4e8e4",
      ink: "#111513",
      inkMuted: "#59615d",
      inkSubtle: "#818984",
      hairline: "#d1d7d3",
      hairlineStrong: "#aab4ae",
      themeColor: "#f2f4f1"
    }
  },
  navigation: [
    { label: "Услуги", href: "#services" },
    { label: "О сервисе", href: "#about" },
    { label: "Акция", href: "#promo" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакты", href: "#contacts" }
  ],
  cta: {
    primary: "Записаться на СТО",
    secondary: "Написать в WhatsApp"
  },
  hero: {
    eyebrow: "Сервис, которому доверяют",
    title: "Ремонт вашего авто без лишних сюрпризов",
    text: "Оставьте заявку, и мастер-приемщик свяжется с вами в течение 10 минут: уточнит задачу, подберет время и заранее объяснит порядок работ.",
    image: "./assets/hero-workshop.png",
    imageAlt: "Автомобиль на подъемнике в чистой зоне сервиса",
    images: {
      industrial: {
        src: "./assets/hero-workshop.png",
        alt: "Автомобиль на подъемнике в чистой зоне сервиса"
      },
      performance: {
        src: "./assets/hero-performance.png",
        alt: "Премиальный автомобиль на осмотре в тёмной сервисной зоне"
      },
      atelier: {
        src: "./assets/hero-atelier.png",
        alt: "Светлый автомобиль проходит осмотр в просторном сервисном ателье"
      },
      diagnostic: {
        src: "./assets/hero-diagnostic.png",
        alt: "Кроссовер подключён к оборудованию на современном диагностическом посту"
      }
    },
    imageLabel: "Диагностика, ТО и ремонт",
    imageMetric: "гарантия до 12 месяцев"
  },
  quickFacts: [
    { value: "10 мин", label: "среднее время ответа по заявке" },
    { value: "12 постов", label: "для слесарных и кузовных работ" },
    { value: "1 год", label: "гарантия на установленные детали" },
    { value: "09:00-21:00", label: "ежедневно, без выходных" }
  ],
  servicesIntro: {
    eyebrow: "Услуги",
    title: "Основные работы для вашего автомобиля",
    text: "Шаблон рассчитан на сервис полного цикла: от регулярного ТО до диагностики, электрики, подвески и кузовного ремонта."
  },
  services: [
    {
      title: "Техническое обслуживание",
      description: "Масло, фильтры, свечи, жидкости и регламентные работы по модели автомобиля.",
      price: "от 3 900 ₽"
    },
    {
      title: "Диагностика",
      description: "Компьютерная диагностика, поиск ошибок, осмотр подвески, тормозов и двигателя.",
      price: "от 1 500 ₽"
    },
    {
      title: "Подвеска и тормоза",
      description: "Амортизаторы, рычаги, сайлент-блоки, колодки, диски и развал-схождение.",
      price: "от 1 100 ₽"
    },
    {
      title: "Двигатель и КПП",
      description: "Замена ремня ГРМ, ремонт навесного, обслуживание коробки передач.",
      price: "по расчету"
    },
    {
      title: "Автоэлектрика",
      description: "Поиск неисправностей, датчики, генератор, стартер, свет и электронные блоки.",
      price: "от 2 000 ₽"
    },
    {
      title: "Кузовной ремонт",
      description: "Локальная покраска, восстановление геометрии, ремонт вмятин и полировка.",
      price: "по осмотру"
    }
  ],
  about: {
    eyebrow: "О сервисе",
    title: "Сначала диагностика, потом согласованный ремонт",
    text: "Мы делаем ремонт понятным: показываем причину, объясняем риски простым языком и согласуем смету до начала работ. Клиент может присутствовать при осмотре и получить фото- или видеоотчет."
  },
  benefits: [
    { title: "Прозрачная смета", text: "Фиксируем цену до старта работ и согласуем каждую дополнительную операцию." },
    { title: "Запчасти в наличии", text: "Подбираем оригинальные детали и проверенные аналоги под бюджет клиента." },
    { title: "Комфортная запись", text: "Онлайн-заявка, быстрый звонок, удобное время визита и напоминание перед приездом." },
    { title: "Гарантия на работы", text: "Закрывающие документы и понятные условия гарантии на выполненный ремонт." }
  ],
  workflowIntro: {
    eyebrow: "Процесс",
    title: "Как проходит визит",
    text: "Эти шаги легко заменить под реальный регламент конкретного сервиса."
  },
  workflow: [
    { title: "Заявка", text: "Клиент оставляет телефон, выбирает услугу и удобное время." },
    { title: "Диагностика", text: "Мастер осматривает автомобиль и объясняет, что критично, а что можно отложить." },
    { title: "Согласование", text: "Фиксируем список работ, стоимость, сроки и варианты запчастей." },
    { title: "Ремонт и выдача", text: "Проводим работы, проверяем результат и передаем автомобиль с рекомендациями." }
  ],
  promotion: {
    eyebrow: "Акция",
    title: "Развал-схождение по спеццене при комплексном ТО",
    text: "Добавьте живое сезонное предложение: оно делает демо конкретным и помогает клиенту быстрее увидеть будущую страницу.",
    label: "Цена",
    price: "2 500 ₽",
    until: "до конца месяца",
    cta: "Записаться по акции"
  },
  brandsIntro: {
    eyebrow: "Марки",
    title: "Работаем с популярными марками"
  },
  brands: [
    "Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Skoda", "Toyota",
    "Nissan", "Kia", "Hyundai", "Mazda", "Ford", "Renault",
    "Lada", "Geely", "Haval", "Chery", "EXEED", "Omoda"
  ],
  reviewsIntro: {
    eyebrow: "Отзывы",
    title: "Клиенты ценят сроки, понятные цены и нормальное общение",
    linkText: "Смотреть расположение",
    linkHref: "#contacts"
  },
  reviews: {
    source: "manual",
    items: [
      {
        author: "Борис",
        role: "кузовной ремонт",
        text: "Два элемента красили и исправляли вмятины. Уложились в обещанные пару дней, по цене все как обсуждали."
      },
      {
        author: "Станислав",
        role: "ремонт после ДТП",
        text: "Сделали расчет, цена адекватная, работы выполнены в срок. Машина после ремонта выглядит отлично."
      },
      {
        author: "Марина",
        role: "плановое обслуживание",
        text: "Обслуживаю автомобиль по записи. Нравится, что мастер объясняет, что нужно сейчас, а что можно позже."
      }
    ],
    yandex: {
      organizationId: "",
      widgetUrl: "",
      profileUrl: "",
      title: "Отзывы об автосервисе на Яндекс Картах",
      linkText: "Все отзывы на Яндекс Картах"
    }
  },
  faqIntro: {
    eyebrow: "FAQ",
    title: "Вопросы перед записью",
    text: "Блок помогает снять типовые сомнения и снижает нагрузку на администратора."
  },
  faq: [
    {
      question: "Нужно ли записываться заранее?",
      answer: "Да, лучше оставить заявку или позвонить. Так мы заранее подготовим пост, мастера и нужные расходники."
    },
    {
      question: "Сколько занимает диагностика?",
      answer: "Обычно от 30 минут до 1 часа. Точное время зависит от марки, симптомов и состояния автомобиля."
    },
    {
      question: "Можно приехать со своими запчастями?",
      answer: "Да, можно. В этом случае гарантия распространяется на выполненные работы, а не на деталь клиента."
    },
    {
      question: "Вы называете цену до ремонта?",
      answer: "Да. После осмотра мастер согласует список работ и стоимость. Дополнительные работы делаем только после подтверждения."
    }
  ],
  location: {
    defaultProvider: "yandex",
    zoom: 16
  },
  contacts: {
    eyebrow: "Контакты",
    title: "Позвоните или напишите нам",
    text: "Подскажем по стоимости, подберём время и ответим на вопросы. Обычно отвечаем в течение 10 минут.",
    actions: [
      { label: "Позвонить", href: "tel:+78123274333" },
      { label: "WhatsApp", href: "https://wa.me/78123274333" },
      { label: "Telegram", href: "https://t.me/prime_service_spb" },
      { label: "ВКонтакте", href: "https://vk.me/prime_service_spb" }
    ]
  },
  footer: {
    text: "Диагностика, техническое обслуживание и ремонт автомобилей по предварительной записи."
  },
  footerLinks: [
    { label: "Услуги", href: "#services" },
    { label: "Акция", href: "#promo" },
    { label: "Контакты", href: "#contacts" }
  ]
};
