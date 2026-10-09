export interface ProjectItem {
  id: string;
  category: "landing" | "system" | "creative";
  categoryLabel: { id: string; en: string };
  title: { id: string; en: string };
  client: string;
  summary: { id: string; en: string };
  challenge: { id: string; en: string };
  solution: { id: string; en: string };
  techStack: string[];
  features: { id: string[]; en: string[] };
  imageSrc: string;
  demoUrl?: string;
}
