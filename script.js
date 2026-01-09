const TELEGRAM_BOT_TOKEN = "8469319239:AAH2YfOvHZVTAiSs5l7r-HpLtyl1ArG9T8A";
const TELEGRAM_CHAT_ID = "5234599554";

const navToggle = document.querySelector(".nav__toggle");
const navList = document.querySelector(".nav__list");
const toTopButton = document.querySelector(".to-top");
const form = document.getElementById("appointment-form");
const formStatus = document.querySelector(".form__status");
const phoneInput = form?.querySelector("input[name='phone']");

const toggleMenu = () => {
  const isOpen = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
};

navToggle?.addEventListener("click", toggleMenu);

navList?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    toTopButton.classList.add("visible");
  } else {
    toTopButton.classList.remove("visible");
  }
});

toTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const normalized = digits.startsWith("8") ? "7" + digits.slice(1) : digits;
  const parts = normalized.replace(/^7/, "");

  if (!parts) return "";
  if (parts.length <= 3) return `+7 (${parts}`;
  if (parts.length <= 6) return `+7 (${parts.slice(0, 3)}) ${parts.slice(3)}`;
  if (parts.length <= 8) {
    return `+7 (${parts.slice(0, 3)}) ${parts.slice(3, 6)}-${parts.slice(6)}`;
  }
  return `+7 (${parts.slice(0, 3)}) ${parts.slice(3, 6)}-${parts.slice(6, 8)}-${parts.slice(8, 10)}`;
};

phoneInput?.addEventListener("input", (event) => {
  const target = event.target;
  target.value = formatPhone(target.value);
});

const validateForm = (formData) => {
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const time = formData.get("time").trim();

  if (!name || !phone || !time) {
    return "Пожалуйста, заполните имя, телефон и удобное время.";
  }

  if (phone.replace(/\D/g, "").length < 11) {
    return "Проверьте номер телефона — кажется, он заполнен не полностью.";
  }

  return "";
};

const buildMessage = (formData) => {
  return [
    "Новая заявка на гирудотерапию:",
    `Имя: ${formData.get("name")}`,
    `Телефон: ${formData.get("phone")}`,
    `Удобное время: ${formData.get("time")}`,
    `Комментарий: ${formData.get("comment") || "—"}`
  ].join("\n");
};

const sendToTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    })
  });

  if (!response.ok) {
    throw new Error("Telegram API error");
  }
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form__status";

  const formData = new FormData(form);
  const error = validateForm(formData);

  if (error) {
    formStatus.textContent = error;
    formStatus.classList.add("error");
    return;
  }

  const message = buildMessage(formData);

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    formStatus.textContent = "Спасибо! Мы свяжемся с вами. Если нужно быстрее, позвоните по телефону.";
    formStatus.classList.add("success");
    form.reset();
    return;
  }

  try {
    await sendToTelegram(message);
    formStatus.textContent = "Заявка отправлена. Мы подтвердим время приема.";
    formStatus.classList.add("success");
    form.reset();
  } catch (error) {
    formStatus.textContent = "Не удалось отправить заявку. Пожалуйста, позвоните по телефону.";
    formStatus.classList.add("error");
  }
});
