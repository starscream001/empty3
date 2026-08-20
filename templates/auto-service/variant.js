(function () {
  const config = window.AUTO_SERVICE_TEMPLATE_CONFIG || {};
  const variants = config.variants || [];
  const requestedVariant = new URLSearchParams(window.location.search).get("variant");
  const defaultVariant = config.defaultVariant || variants[0]?.id || "industrial";
  const selectedVariant = variants.find((variant) => variant.id === requestedVariant)
    || variants.find((variant) => variant.id === defaultVariant)
    || { id: "industrial", stylesheet: "" };

  window.AUTO_SERVICE_VARIANT = selectedVariant.id;
  document.documentElement.dataset.variant = selectedVariant.id;

  if (!selectedVariant.stylesheet) return;

  document.documentElement.dataset.variantLoading = "true";

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = `${selectedVariant.stylesheet}?v=2`;
  stylesheet.dataset.variantStylesheet = selectedVariant.id;
  const revealPage = () => delete document.documentElement.dataset.variantLoading;
  stylesheet.addEventListener("load", revealPage, { once: true });
  stylesheet.addEventListener("error", revealPage, { once: true });
  document.head.append(stylesheet);
})();
