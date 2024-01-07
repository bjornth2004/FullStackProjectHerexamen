module.exports = {
  // Hiermee schakel je debug-modus in als de NODE_ENV variabele 'development' is
  debug: process.env.NODE_ENV === "development",
  i18n: {
    // Stel de standaard locale in op Engels
    defaultLocale: "nl",
    // Definieer welke locales jouw applicatie zal ondersteunen
    locales: ["nl", "en"],
  },
};
