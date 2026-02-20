/** Shared structure for all locale data. Links are the same across locales. */
export interface LocaleData {
  ui: {
    skipToContent: string;
    nav: {
      intro: string;
      skills: string;
      certifications: string;
      projects: string;
      workProjects: string;
      personalProjects: string;
      journey: string;
      videos: string;
      hobbies: string;
      contact: string;
      toggleMenu: string;
      switchToLight: string;
      switchToDark: string;
      switchToEnglish: string;
      switchToFrench: string;
    };
    sections: {
      skills: string;
      certifications: string;
      projects: string;
      workProjects: string;
      personalProjects: string;
      journey: string;
      videos: string;
      hobbies: string;
      contact: string;
    };
    journey: {
      work: string;
      education: string;
      headLabel: string;
      initialCommitLine1: string;
      initialCommitLine2: string;
    };
    buttons: {
      contact: string;
      seeMore: string;
      seeLess: string;
      watchFullPlaylist: string;
      openInNewTab: string;
      email: string;
      github: string;
      linkedin: string;
      sswProfile: string;
      publicVideos: string;
      publications: string;
    };
    aria: {
      contactByEmail: string;
      githubOpens: string;
      linkedinOpens: string;
      emailOpens: string;
      sswProfileOpens: string;
      publicVideosOpens: string;
      publicationsOpens: string;
      openInNewTab: string;
    };
    contact: {
      intro: string;
    };
    footer: string;
  };
  site: {
    name: string;
    suffix: string;
    title: string;
    tagline: string;
    location: string;
    citizenship: string;
    summaryParts: { before: string; highlight: string; after: string };
    specialtyParts: { before: string; highlight: string; after: string };
    passionParts: { before: string; highlight: string; after: string };
    links: {
      email: string;
      github: string;
      linkedin: string;
      professionalProfile: string;
      publicVideos: string;
      publications: string;
    };
  };
  publicVideos: Array<{ id: string; title: string }>;
  skills: Array<{ category: string; items: string[] }>;
  timeline: Array<{
    type: "work" | "education";
    title: string;
    org: string;
    period: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    category: string;
    description: string;
    tech: string[];
    url?: string;
  }>;
  personalProjects: Array<{
    title: string;
    description: string;
    url: string;
    imageSrcLight: string;
    imageSrcDark: string;
    imageAlt: string;
  }>;
  certifications: Array<{
    name: string;
    url: string;
    logoSrc: string;
  }>;
  hobbies: Array<{
    title: string;
    detail: string;
    placeholder: "video" | "image" | "none";
    embedUrl?: string;
    imageSrc?: string;
  }>;
}

export type LocaleCode = "en" | "fr";
