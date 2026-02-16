export const site = {
  name: "Jeoffrey Fischer",
  suffix: "PhD",
  title: "Full-Stack Software Engineer",
  tagline: "From shipping rockets to shipping software 🚀",
  location: "Strasbourg, France",
  summary:
    "Full-Stack Software Engineer with a PhD in Aerospace. After 10+ years in academia, I transitioned into software development, applying rigorous problem solving to build scalable web applications, APIs, and Cloud solutions.",
  specialty:
    "I specialize in .NET, Angular, and Azure, leveraging AI tools to improve development efficiency - and occasionally write awesome resumes.",
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
  { id: "-0PUveZg3wk", title: "3 tips to a clean Sprint board" },
  { id: "K-YUqVTyU3k", title: "SSW TimePro - Create a new tenant" },
  { id: "IjsXSMOAMCA", title: "Do you know to stretch when working at a desk?" },
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
    title: "SSW TimePro",
    category: "Internal",
    description: "Web-based time tracking, invoicing and receipting application that integrates with Dynamics 365 and Azure DevOps.",
    tech: [".NET", "ASP.NET Core", "EF Core", "SQL Server", "Angular", "Azure Devops"],
  },
  {
    title: "SSW EagleEye",
    category: "Internal",
    description: "AI-based reporting solution for emails and GitHub that intergrates with PowerBI",
    tech: [".NET", "Semantic Kernel", "SQL Server", "Next.js", "Azure", "PowerBI"],
  },
  {
    title: "SSW Website",
    category: "Internal",
    description: "Scrum Master for the SSW company website.",
    tech: ["React", "NextJS", "TinaCMS", "Docker", "Azure"],
  },
  {
    title: "Berkley",
    category: "Client",
    description: "Improved the client facing portal for Berkley, a global insurance company",
    tech: [".NET", "Angular"],
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
  },
  {
    title: "Auction Plus",
    category: "Client",
    description: "Specification Review - Involved in a Spec Review for Auction Plus, an auction company.",
    tech: [".NET", "OAuth2", "AI", "Power Apps"],
  },
  {
    title: "CommBox",
    category: "Client",
    description: "Specification Review - Involved in a Spec Review for CommBox, a communication company.",
    tech: ["OAuth2"],
  },
  {
    title: "CR Formulation",
    category: "Client",
    description: "Specification Review - Involved in a Spec Review for CR Formulation, a beauty products company.",
    tech: ["AI"],
  },
  {
    title: "Knight Frank Valuation",
    category: "Client",
    description: "Specification Review - Involved in a Spec Review for Knight Frank Valuation, a property valuation company.",
    tech: ["Power Apps"],
  },
  {
    title: "Toll",
    category: "Client",
    description: "Specification Review - Involved in a Spec Review for Toll, a toll road company.",
    tech: [".NET", "OAuth2", "AI", "Power Apps"],
  },
  {
    title: "AdSafe",
    category: "Client",
    description: "Tender - Prepared a proposal for AdSafe, a security company.",
    tech: ["Azure"],
  },
  {
    title: "Dairy Australia",
    category: "Client",
    description: "Tender - Prepared a proposal for Dairy Australia, a dairy company.",
    tech: ["Azure"],
  },
  {
    title: "Angular SuperPowers",
    category: "Workshop",
    description: "Ran Angular workshops for clients.",
    tech: ["Angular"],
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
