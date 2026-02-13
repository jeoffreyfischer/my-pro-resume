export const site = {
  name: "Jeoffrey Fischer",
  suffix: "PhD",
  title: "Full-Stack Software Engineer",
  tagline: "From shipping rockets to shipping software 🚀",
  location: "Strasbourg, France",
  summary:
    "Full-Stack Software Engineer with a PhD in Aerospace. After 10+ years in academia, I transitioned into fast-evolving software development, applying rigorous problem solving to build scalable web applications, APIs, and Cloud solutions. I specialize in .NET, Angular, and Azure, leveraging AI tools to improve development efficiency.",
  links: {
    email: "mailto:jeoffrey.fischer@gmail.com",
    github: "https://github.com/jeoffreyfischer",
    linkedin: "https://www.linkedin.com/in/jeoffrey-fischer-9403b9a4/",
    professionalProfile: "https://www.ssw.com.au/people/jeoffrey-fischer/",
    publicVideos: "https://www.youtube.com/watch?v=fGVnV1yX4Ts&list=PLpiOR7CBNvlqbUE95zfRuNDodbZI3aEJW",
    publications: "https://scholar.google.com/citations?user=Db1P2mwAAAAJ",
  },
} as const;

export const skills = [
  {
    category: "Backend",
    items: [".NET & EF Core", "Node.js", "REST APIs", "Duende IdentityServer"],
  },
  {
    category: "Frontend",
    items: ["Angular", "React", "Next.js", "TypeScript", "Modern JavaScript"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Azure", "Power Apps", "CI/CD", "GitOps (Octopus Deploy)"],
  },
  {
    category: "AI",
    items: ["Cursor", "ChatGPT", "Copilot", "Claude", "YakShaver"],
  },
  {
    category: "Leadership",
    items: ["Scrum Master", "Client workshops", "Team mentoring"],
  },
  {
    category: "Research & Data",
    items: ["Matlab", "Data analysis", "Publications", "Technical writing"],
  },
] as const;

export const timeline = [
  {
    type: "education" as const,
    title: "🚀 PhD - Aerospace Engineering",
    org: "University of Poitiers, France",
    period: "Sep 2009 – Mar 2013",
    description:
      "Conducted doctoral research in aerospace engineering, focusing on experimental and computational fluid dynamics.",
  },
  {
    type: "work" as const,
    title: "🧑‍🏫 Lecturer (Full-Time, Fixed-Term)",
    org: "IUT Civil Engineering, Bordeaux, France",
    period: "Sep 2013 – Aug 2015",
    description:
      "Delivered undergraduate courses in fluid mechanics, acoustics, and lighting; developed course materials and assessed student performance.",
  },
  {
    type: "work" as const,
    title: "🚀 Research Associate – Aerospace Engineering",
    org: "University of New South Wales (UNSW), Sydney, Australia",
    period: "May 2015 – Oct 2022",
    description:
      "Led experimental research and data analysis using MATLAB; published in leading peer-reviewed journals and collaborated with industry partners.",
  },
  {
    type: "education" as const,
    title: "🏋️ Certificate III & IV in Fitness",
    org: "AIF, Sydney, Australia",
    period: "Oct 2022 – May 2023",
    description:
      "Followed the AIF program to become a certified Personal Trainer.",
  },
  {
    type: "education" as const,
    title: "💻 Full-Stack Developer Internship",
    org: "SSW, Sydney, Australia",
    period: "May 2023 – Oct 2023",
    description:
      "Developed full-stack features using .NET and modern front-end frameworks within an agile team environment.",
  },
  {
    type: "work" as const,
    title: "💻 Software Engineer",
    org: "SSW, Sydney, Australia",
    period: "Oct 2023 – Present",
    description:
      "Build full-stack applications using .NET, EF Core, Angular, React, Next.js, Power Apps, Duende IdentityServer, and Azure. Serve as Scrum Master for teams of 3–8 and promote AI-assisted development practices. Major contributor to SSW Rules.",
  },  
];

export const projects = [
  {
    title: "Berkley",
    role: "Long-term client",
    description: "Improving .NET + Angular application.",
  },
  {
    title: "Delta Elcom · Caprice Plaster · Seventh Day Adventist Church",
    role: "Short-term clients",
    description: "Power Apps · Azure B2C",
  },
  {
    title: "Auction Plus · CommBox · CR Formulation · Knight Frank Valuation · Toll",
    role: "Specification Reviews",
    description: ".NET · OAuth2 · AI · Power Apps",
  },
  {
    title: "Angular SuperPowers",
    role: "2-day Workshop",
    description: "Ran Angular workshops for clients.",
  },
];

export const certifications = [
  {
    name: "Certified Scrum Master – Scrum Alliance",
    url: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
    logoSrc: "/images/badge-scrum-master-removebg.png",
  },
  {
    name: "AI-900 (Azure AI Fundamentals) – Microsoft",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/",
    logoSrc: "/images/badge-az-fund-removebg.png",
  },
  {
    name: "AZ-900 (Azure Fundamentals) – Microsoft",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    logoSrc: "/images/badge-az-fund-removebg.png",
  },
  {
    name: "GitOps Fundamentals – Octopus Deploy",
    url: "https://learning.octopus.com/course/gitops-fundamentals",
    logoSrc: "/images/badge-gitops-fund-removebg.png",
  },
];

export const hobbies = [
  {
    title: "🎸 Guitar",
    detail: "25 years – I can play a few chords",
    placeholder: "video" as const,
    embedUrl: "https://www.youtube.com/embed/WS0HWQtoBv8",
  },
  {
    title: "💃🕺 Salsa & Bachata",
    detail: "8 years – Still stepping on some unlucky toes…",
    placeholder: "none" as const,
  },
  {
    title: "🏃‍♂️ Running",
    detail: "Half-marathon but double-pain",
    placeholder: "image" as const,
    imageSrc: "/images/2025-sydney-half-marathon.png",
  },
  {
    title: "🏋️💪 Fitness & Personal Training",
    detail: "From Bicep files to Biceps",
    placeholder: "none" as const,
  },
];
