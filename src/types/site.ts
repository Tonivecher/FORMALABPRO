export interface NavItem {
  id: string;
  label: string;
}

export interface HeroMetric {
  value: string;
  label: string;
}

export interface MaterialFeature {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export type GallerySpan = "feature" | "portrait" | "landscape" | "square";

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  span: GallerySpan;
  // New Case Study fields
  task?: string;
  materials?: string;
  scope?: string;
  result?: string;
}

export interface AudienceSegment {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  points: string[];
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  materials: string;
  tasks: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactFormValues {
  name: string;
  contact: string;
  projectType: string;
  scope: string;
  location: string;
  timeframe: string;
  hasDrawings: boolean;
  message: string;
}

