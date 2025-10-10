declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (
            options: { 
              pageLanguage: string; 
              includedLanguages: string; 
              layout: number;
            }, 
            elementId: string
          ): TranslateElementInstance;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

interface TranslateElementInstance {
  setEnabled(enabled: boolean): void;
  setLanguage(language: string): void;
  getInstance(): TranslateElementInstance;
}

export const loadGoogleTranslate = (
  changeLanguage: (langCode: string) => void
) => {
  const script = document.createElement("script");
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,es,fr",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  const handleLanguageChange = (langCode: string) => {
    const googleTranslate = new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,es,fr",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    ).getInstance();
    if (googleTranslate) {
      googleTranslate.setEnabled(true);
      googleTranslate.setLanguage(langCode);
    }
    changeLanguage(langCode);
  };

  return handleLanguageChange;
};
