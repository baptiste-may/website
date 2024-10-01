export type Language = {
  name: string;
  color: string;
};

const LANGUAGES: Record<string, Language> = {
  js: {
    name: "JavaScript",
    color: "#f1e05a"
  },
  ts: {
    name: "TypeScript",
    color: "blue"
  },
  css: {
    name: "CSS",
    color: "#563d7c"
  },
  html: {
    name: "HTML",
    color: "#e34c26"
  },
  java: {
    name: "Java",
    color: "#b07219"
  },
  py: {
    name: "Python",
    color: "#3572A5"
  }
};

const languages = Object.keys(LANGUAGES);
export type LanguagesKey = typeof languages[number];

export function getLang(lang: LanguagesKey) {
  return LANGUAGES[lang];
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
