import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const clientsDirectory = path.join(projectRoot, "templates", "auto-service", "clients");
const manifestPath = path.join(clientsDirectory, "manifest.json");
const catalogPath = path.join(clientsDirectory, "pskov-demo-catalog.json");
const sourcePath = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(projectRoot, "data", "autoservice-leads-pskov-first-50.json");

const transliteration = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
};

const slugify = (value) => String(value || "service")
  .toLowerCase()
  .split("")
  .map((character) => transliteration[character] ?? character)
  .join("")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 40) || "service";

const cleanText = (value) => String(value || "").replace(/\s+/g, " ").trim();

const capitalize = (value) => {
  const text = cleanText(value);
  return text ? `${text[0].toUpperCase()}${text.slice(1)}` : "";
};

const splitServices = (value) => cleanText(value)
  .replace(/\s+Способ оплаты:.*$/i, "")
  .split(",")
  .map(capitalize)
  .filter(Boolean)
  .slice(0, 6);

const toPhoneHref = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits ? `tel:+${digits.length === 11 && digits.startsWith("8") ? `7${digits.slice(1)}` : digits}` : "";
};

const shortName = (name) => {
  const letters = cleanText(name).match(/[A-Za-zА-Яа-я0-9]/g) || [];
  return letters.slice(0, 2).join("").toUpperCase() || "СТО";
};

const formatRating = (rating) => {
  const number = Number(rating);
  return Number.isFinite(number) && number > 0 ? number.toFixed(1).replace(".0", "") : "";
};

const reviewLabel = (count) => {
  const value = Number(count) || 0;
  const remainder = value % 100;
  const last = value % 10;
  if (remainder >= 11 && remainder <= 14) return "отзывов на Яндекс Картах";
  if (last === 1) return "отзыв на Яндекс Картах";
  if (last >= 2 && last <= 4) return "отзыва на Яндекс Картах";
  return "отзывов на Яндекс Картах";
};

const chooseVariant = (services) => {
  const searchText = services.join(" ").toLowerCase();
  if (/кузов|покраск|полиров|оклейк|детейл|аэрограф|брониров|шумоизоляц/.test(searchText)) return "atelier";
  if (/тюнинг|выхлоп|глушител|диск|автосвет/.test(searchText)) return "performance";
  if (/диагност|электр|акпп|dsg|форсунк|инжектор|турбо|двигател/.test(searchText)) return "diagnostic";
  return "industrial";
};

const buildActions = (lead, phoneHref) => {
  const actions = [];
  if (phoneHref) actions.push({ label: "Позвонить", href: phoneHref });
  if (cleanText(lead.whatsapp_url)) actions.push({ label: "WhatsApp", href: cleanText(lead.whatsapp_url) });
  if (cleanText(lead.telegram_url)) actions.push({ label: "Telegram", href: cleanText(lead.telegram_url) });
  if (cleanText(lead.vk_url)) actions.push({ label: "ВКонтакте", href: cleanText(lead.vk_url) });
  return actions;
};

const buildSecondaryCta = (actions) => {
  const messenger = actions.find((action) => action.label === "WhatsApp")
    || actions.find((action) => action.label === "Telegram")
    || actions.find((action) => action.label === "ВКонтакте");

  return messenger
    ? { secondary: `Написать в ${messenger.label}`, secondaryHref: messenger.href }
    : { secondary: "Контакты сервиса", secondaryHref: "#contacts" };
};

const buildConfig = (lead) => {
  const name = cleanText(lead.name) || "Автосервис";
  const city = cleanText(lead.city) || "Псков";
  const address = cleanText(lead.address);
  const hours = cleanText(lead.hours);
  const phone = cleanText(lead.phone);
  const phoneHref = toPhoneHref(phone);
  const rating = formatRating(lead.rating);
  const reviewsCount = Number(lead.reviews_count) || 0;
  const services = splitServices(lead.services);
  const variant = chooseVariant(services);
  const clientId = `pskov-${String(lead.lead_id || "").slice(-3).toLowerCase()}-${slugify(name)}`;
  const actions = buildActions(lead, phoneHref);
  const primaryService = services[0] || "Ремонт и обслуживание автомобилей";
  const quickFacts = [
    ...(rating ? [{ value: rating, label: "рейтинг на Яндекс Картах" }] : []),
    ...(reviewsCount ? [{ value: String(reviewsCount), label: reviewLabel(reviewsCount) }] : []),
    ...(hours ? [{ value: hours.replace(/^Открыто\s*/i, ""), label: "график по данным сервиса" }] : []),
    { value: String(services.length), label: "направлений в карточке" }
  ].slice(0, 4);

  const config = {
    defaultVariant: variant,
    meta: {
      title: `${name} - автосервис в ${city}`,
      description: `${name}: услуги автосервиса, контакты, карта и отзывы в ${city}.`,
      keywords: `${name}, автосервис, ${city}, ремонт автомобилей, СТО`,
      author: name,
      robots: "index, follow",
      canonicalUrl: "",
      siteName: name
    },
    brand: {
      name,
      shortName: shortName(name),
      caption: "Автосервис"
    },
    business: {
      ratingText: rating && reviewsCount ? `${rating} рейтинг · ${reviewsCount} отзывов` : "Автосервис",
      address,
      hours,
      phone,
      phoneHref,
      whatsappHref: cleanText(lead.whatsapp_url),
      openingHoursSchema: ""
    },
    navigation: [
      { label: "Услуги", href: "#services" },
      { label: "О сервисе", href: "#about" },
      { label: "Отзывы", href: "#reviews" },
      { label: "Контакты", href: "#contacts" }
    ],
    cta: {
      primary: "Связаться с сервисом",
      ...buildSecondaryCta(actions)
    },
    hero: {
      eyebrow: `${city} · автосервис`,
      title: `${name} - сервис для вашего автомобиля`,
      text: "Уточните актуальные работы, стоимость и удобное время записи по телефону или в мессенджере.",
      imageLabel: primaryService,
      imageMetric: rating && reviewsCount ? `${rating} · ${reviewsCount} отзывов` : hours
    },
    quickFacts,
    servicesIntro: {
      eyebrow: "Услуги",
      title: "Работы, указанные в сервисе",
      text: "Актуальную стоимость и возможность записи уточняйте у администрации."
    },
    services: services.map((title) => ({
      title,
      description: "Актуальную стоимость и сроки уточняйте по контактам сервиса.",
      price: "по запросу"
    })),
    about: {
      eyebrow: "О сервисе",
      title: `${name} в ${city}`,
      text: "Автосервис с публично указанными контактами и перечнем работ. Перед визитом уточните актуальные условия записи."
    },
    benefits: [
      { title: "Перечень работ", text: "Услуги собраны из публичной карточки сервиса." },
      { title: "Контакты", text: "Позвоните или напишите в доступный мессенджер." },
      { title: "Карты", text: "Постройте маршрут в Яндекс Картах или Google Maps." },
      { title: "Отзывы", text: "Отзывы открываются из карточки на Яндекс Картах." }
    ],
    workflowIntro: {
      eyebrow: "Запись",
      title: "Как связаться с сервисом",
      text: "Уточните детали работ и свободное время до визита."
    },
    workflow: [
      { title: "Связь", text: "Позвоните или напишите сервису." },
      { title: "Уточнение работ", text: "Опишите автомобиль и нужную услугу." },
      { title: "Согласование", text: "Уточните стоимость и время записи." },
      { title: "Визит", text: "Приезжайте в согласованное время." }
    ],
    sections: {
      promo: false,
      brands: false,
      faq: false
    },
    reviewsIntro: {
      eyebrow: "Отзывы",
      title: `Отзывы о ${name}`,
      linkText: "Все отзывы на Яндекс Картах",
      linkHref: cleanText(lead.yandex_url)
    },
    reviews: {
      source: "yandex",
      yandex: {
        organizationId: cleanText(lead.yandex_org_id),
        profileUrl: cleanText(lead.yandex_url),
        title: `Отзывы о ${name} на Яндекс Картах`,
        linkText: "Все отзывы на Яндекс Картах"
      }
    },
    location: {
      defaultProvider: "yandex",
      zoom: 16
    },
    contacts: {
      eyebrow: "Контакты",
      title: "Позвоните или напишите сервису",
      text: "Уточните актуальные работы, стоимость и время записи по указанным контактам.",
      actions
    },
    footer: {
      text: "Контакты, услуги, карта и отзывы автосервиса."
    },
    footerLinks: [
      { label: "Услуги", href: "#services" },
      { label: "Отзывы", href: "#reviews" },
      { label: "Контакты", href: "#contacts" }
    ]
  };

  return {
    clientId,
    config,
    catalogItem: {
      id: clientId,
      leadId: cleanText(lead.lead_id),
      name,
      city,
      address,
      rating,
      reviewsCount,
      services,
      defaultVariant: variant,
      yandexUrl: cleanText(lead.yandex_url)
    }
  };
};

const source = JSON.parse(await readFile(sourcePath, "utf8"));
const leads = Array.isArray(source.leads) ? source.leads : [];
if (leads.length !== 50) throw new Error(`Ожидалось 50 лидов, получено: ${leads.length}`);

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const generated = leads.map(buildConfig);
await mkdir(clientsDirectory, { recursive: true });

for (const item of generated) {
  const configPath = path.join(clientsDirectory, `${item.clientId}.json`);
  await writeFile(configPath, `${JSON.stringify(item.config, null, 2)}\n`, "utf8");
  manifest.clients[item.clientId] = {
    label: item.catalogItem.name,
    config: `./clients/${item.clientId}.json`
  };
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
await writeFile(catalogPath, `${JSON.stringify({
  title: "Демо автосервисов Псковской области",
  generatedAt: source.extractedAt || "",
  items: generated.map((item) => item.catalogItem)
}, null, 2)}\n`, "utf8");

console.log(`Created or updated ${generated.length} client configs. Existing configs were kept.`);
