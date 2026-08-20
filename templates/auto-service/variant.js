(function () {
  const configureVariant = async () => {
    const config = await (window.AUTO_SERVICE_CONFIG_READY || Promise.resolve(
      window.AUTO_SERVICE_TEMPLATE_CONFIG || {}
    ));
    const variants = config.variants || [];
    const requestedVariant = new URLSearchParams(window.location.search).get("variant");
    const defaultVariant = config.defaultVariant || variants[0]?.id || "industrial";
    const selectedVariant = variants.find((variant) => variant.id === requestedVariant)
      || variants.find((variant) => variant.id === defaultVariant)
      || { id: "industrial", stylesheet: "" };

    window.AUTO_SERVICE_VARIANT = selectedVariant.id;
    document.documentElement.dataset.variant = selectedVariant.id;

    if (!selectedVariant.stylesheet) return selectedVariant.id;

    await new Promise((resolve) => {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = `${selectedVariant.stylesheet}?v=3`;
      stylesheet.dataset.variantStylesheet = selectedVariant.id;
      stylesheet.addEventListener("load", resolve, { once: true });
      stylesheet.addEventListener("error", resolve, { once: true });
      document.head.append(stylesheet);
    });

    return selectedVariant.id;
  };

  window.AUTO_SERVICE_VARIANT_READY = configureVariant();
})();
