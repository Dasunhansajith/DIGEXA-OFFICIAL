export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  iconName?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  thumbnail: string;
  featured?: boolean;
}

export interface AgencyConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  established: string;
}

