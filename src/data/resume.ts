export const site = {
  name: "Jeoffrey Fischer",
  suffix: "PhD",
  title: "Full-Stack Software Engineer",
  tagline: "From shipping rockets to shipping software 🚀",
  location: "Strasbourg, France",
  citizenship: "French Australian citizen",
  summary:
    "Full-Stack Software Engineer with a PhD in Aerospace. After 10+ years in academia, I transitioned into software development, applying rigorous problem solving to build scalable web applications, APIs, and Cloud solutions.",
  specialty:
    "I specialize in .NET, Angular, React, Next.js and Azure, leveraging AI tools like Cursor and ChatGPT to improve development efficiency.",
  passion:
    "I'm passionate about applying Scrum practices to strengthen team communication and continuously improve product quality.",
  links: {
    email: "mailto:jeoffrey.fischer@gmail.com",
    github: "https://github.com/jeoffreyfischer",
    linkedin: "https://www.linkedin.com/in/jeoffrey-fischer-9403b9a4/",
    professionalProfile: "https://www.ssw.com.au/people/jeoffrey-fischer/",
    publicVideos: "https://www.youtube.com/watch?v=fGVnV1yX4Ts&list=PLpiOR7CBNvlqbUE95zfRuNDodbZI3aEJW",
    publications: "https://scholar.google.com/citations?user=Db1P2mwAAAAJ",
  },
} as const;

/** Public video embeds (id = YouTube video ID). */
export const publicVideos = [
  { id: "IwvCTwz0C7M", title: "Do you share secrets securely?" },
  { id: "K-YUqVTyU3k", title: "SSW TimePro - Create a new tenant" },
  { id: "-0PUveZg3wk", title: "3 tips to a clean Sprint board" },
  { id: "BMecjTmdFA0", title: "Angular workshop migration - Docusaurus VS TinaDocs" },
  { id: "IjsXSMOAMCA", title: "Do you know to stretch when working at a desk?" },
  { id: "AxBS6JYcLIQ", title: "YakShaver - Fix the broken Coffee Machine ☕️ ❌" },
] as const;

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
    items: ["MATLAB", "Data analysis", "Publications", "Technical writing"],
  },
] as const;

export const timeline = [
  {
    type: "education" as const,
    title: "🚀 PhD",
    org: "University of Poitiers, France",
    period: "Sep 2009 – Mar 2013",
    description:
      "Aerospace Engineering - Conducted doctoral research, focusing on experimental and computational fluid dynamics.",
  },
  {
    type: "work" as const,
    title: "🧑‍🏫 Lecturer",
    org: "IUT Civil Engineering, Bordeaux, France",
    period: "Sep 2013 – Aug 2015",
    description:
      "Civil Engineering - Delivered undergraduate courses in fluid mechanics, acoustics, lighting, and more.",
  },
  {
    type: "work" as const,
    title: "🚀 Research Associate",
    org: "University of New South Wales, Sydney, Australia",
    period: "May 2015 – Oct 2022",
    description:
      "Aerospace Engineering - Led experimental research and data analysis using MATLAB. Published in leading peer-reviewed journals and collaborated with industry partners.",
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
    title: "💻 Developer Internship",
    org: "SSW, Sydney, Australia",
    period: "May 2023 – Oct 2023",
    description:
      "Developed a full-stack application using .NET, Angular and SQL Server within an Agile team environment using Scrum.",
  },
  {
    type: "work" as const,
    title: "💻 Software Engineer",
    org: "SSW, Sydney, Australia",
    period: "Oct 2023 – Present",
    description:
      "Built full-stack applications using .NET, EF Core, Angular, React, Next.js, and Azure. Serve as Scrum Master for teams of 3 to 8 people. Promote AI-assisted development practices. Major contributor to [SSW Rules](https://www.ssw.com.au/rules).",
  },  
];

export const projects = [
  {
    title: "SSW TimePro",
    category: "Internal",
    description: "Web-based time tracking, invoicing and receipting application that integrates with Dynamics 365 and Azure DevOps.",
    tech: [".NET", "ASP.NET Core", "EF Core", "SQL Server", "Angular", "Azure Devops"],
    url: "https://sswtimepro.com/",
  },
  {
    title: "SSW EagleEye",
    category: "Internal",
    description: "AI-based reporting solution for emails and GitHub that integrates with PowerBI",
    tech: [".NET", "Semantic Kernel", "SQL Server", "Next.js", "Azure", "PowerBI"],
    url: "https://ssweagleeye.com/",
  },
  {
    title: "SSW Website",
    category: "Internal",
    description: "Scrum Master for the SSW company website.",
    tech: ["React", "NextJS", "TinaCMS", "Docker", "Azure"],
    url: "https://www.ssw.com.au/",
  },
  {
    title: "Berkley",
    category: "Client",
    description: "Improved the internal portal for Berkley, a global insurance company",
    tech: [".NET", "Angular"],
    url: "https://berkleyinaus.com.au/",
  },
  {
    title: "Caprice Plaster",
    category: "Client",
    description: "Improved Power Apps flow for Caprice Plaster, a plastering company.",
    tech: ["Power Apps"],
  },
  {
    title: "Delta Elcom",
    category: "Client",
    description: "Enhanced Power Apps flow for Delta Elcom, an electrical contracting company.",
    tech: ["Power Apps"],
  },
  {
    title: "Seventh Day Adventist Church",
    category: "Client",
    description: "Updated the Azure B2C configuration for the Seventh Day Adventist Church.",
    tech: ["Azure B2C"],
    url: "https://sydney.adventist.org.au/",
  },
  {
    title: "Auction Plus",
    category: "Client",
    description: "Project Scoping - Involved in a Project Scoping for Auction Plus, an auction company.",
    tech: [".NET", "OAuth2", "AI", "Power Apps"],
    url: "https://auctionsplus.com.au/",
  },
  {
    title: "CommBox",
    category: "Client",
    description: "Project Scoping - Involved in a Project Scoping for CommBox, a communication company.",
    tech: ["OAuth2"],
    url: "https://www.commbox.com.au/",
  },
  {
    title: "CR Formulation",
    category: "Client",
    description: "Project Scoping - Involved in a Project Scoping for CR Formulation, a beauty products company.",
    tech: ["AI"],
    url: "https://www.crformulations.com.au/",
  },
  {
    title: "Knight Frank Valuation",
    category: "Client",
    description: "Project Scoping - Involved in a Project Scoping for Knight Frank Valuation, a property valuation company.",
    tech: ["Power Apps"],
    url: "https://www.knightfrank.com.au/",
  },
  {
    title: "Toll",
    category: "Client",
    description: "Project Scoping - Involved in a Project Scoping for Toll, a toll road company.",
    tech: [".NET", "OAuth2", "AI", "Power Apps"],
    url: "https://www.ssw.com.au/company/clients/toll",
  },
  {
    title: "Angular Workshop",
    category: "Workshop",
    description: "Ran Angular workshops for clients.",
    tech: ["Angular"],
    url: "https://www.ssw.com.au/events/angular-workshop",
  },
];

export const personalProjects = [
  {
    title: "Latest Stack",
    description: "Versions of popular frameworks and tools",
    url: "https://lateststack.com/",
    imageSrcLight: "/images/latest-stack-light.png",
    imageSrcDark: "/images/latest-stack-dark.png",
    imageAlt: "Latest Stack Versions screenshot",
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
    title: "🏋️ Fitness",
    detail: "12 years – From Bicep files to Biceps",
    placeholder: "image" as const,
    imageSrc: "/images/hobbies-fitness.png",
  },
  {
    title: "💃🕺 Salsa & Bachata",
    detail: "8 years – Still stepping on some unlucky toes…",
    placeholder: "image" as const,
    imageSrc: "/images/hobbies-salsa.jpg",
  },
];
