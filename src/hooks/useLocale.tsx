import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { LocaleCode, LocaleData } from "@/locales/types";
import { en } from "@/locales/en";
import { fr } from "@/locales/fr";

const STORAGE_KEY = "resume-locale";
const LOCALES: Record<LocaleCode, LocaleData> = { en, fr };

function getInitialLocale(): LocaleCode {
  if (typeof document === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY) as LocaleCode | null;
  if (stored === "en" || stored === "fr") return stored;
  // Prefer browser language so e.g. visitors in France see French by default
  const browserLangs =
    typeof navigator !== "undefined"
      ? [navigator.language, ...(navigator.languages ?? [])]
      : [];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase().split("-")[0];
    if (code === "fr") return "fr";
    if (code === "en") return "en";
  }
  return "en";
}

type LocaleContextValue = {
  locale: LocaleCode;
  setLocale: (next: LocaleCode | ((prev: LocaleCode) => LocaleCode)) => void;
  t: LocaleData;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(getInitialLocale);
  const t = LOCALES[locale];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: LocaleCode | ((prev: LocaleCode) => LocaleCode)) => {
    setLocaleState((prev) => (typeof next === "function" ? next(prev) : next));
  }, []);

  const value: LocaleContextValue = { locale, setLocale, t };

  return React.createElement(
    LocaleContext.Provider,
    { value },
    children
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (ctx == null) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
