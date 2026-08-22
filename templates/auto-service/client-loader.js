(function () {
  const baseConfig = window.AUTO_SERVICE_TEMPLATE_CONFIG || {};
  const params = new URLSearchParams(window.location.search);
  const requestedClient = params.get("client");
  const fallbackClient = "prime-service";

  const isObject = (value) => {
    return value && typeof value === "object" && !Array.isArray(value);
  };

  const mergeConfig = (base, override) => {
    if (Array.isArray(override)) return override.map((item) => item);
    if (!isObject(override)) return override === undefined ? base : override;

    const result = isObject(base) ? { ...base } : {};
    Object.entries(override).forEach(([key, value]) => {
      result[key] = mergeConfig(result[key], value);
    });
    return result;
  };

  const loadJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Не удалось загрузить ${url}`);
    return response.json();
  };

  document.documentElement.dataset.templateLoading = "true";

  window.AUTO_SERVICE_CONFIG_READY = (async () => {
    const manifest = await loadJson("./clients/manifest.json?v=2");
    const hasRequestedClient = requestedClient
      && Object.prototype.hasOwnProperty.call(manifest.clients, requestedClient);
    const clientId = hasRequestedClient ? requestedClient : manifest.defaultClient;
    const clientEntry = manifest.clients[clientId];
    const clientConfig = await loadJson(`${clientEntry.config}?v=2`);
    const mergedConfig = mergeConfig(baseConfig, clientConfig);

    window.AUTO_SERVICE_CLIENT_ID = clientId;
    window.AUTO_SERVICE_CLIENT_META = clientEntry;
    window.AUTO_SERVICE_TEMPLATE_CONFIG = mergedConfig;
    document.documentElement.dataset.client = clientId;
    return mergedConfig;
  })().catch((error) => {
    console.error("Не удалось загрузить конфигурацию клиента", error);
    window.AUTO_SERVICE_CLIENT_ID = fallbackClient;
    document.documentElement.dataset.client = fallbackClient;
    return baseConfig;
  });
})();
