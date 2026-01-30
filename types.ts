export interface Category {
  id: number;
  name: string;
  slug: string;
}

// Kept for backward compatibility if needed, but Product uses string now
export enum ProductCategory {
  MACHINERY = 'Máquinas',
  PARTS = 'Peças',
  TECHNOLOGY = 'Tecnologia',
}

export interface Product {
  id: string;
  name: string;
  category: string; // Changed from ProductCategory enum to string for dynamic categories
  price: number;
  description?: string;
  imageUrl: string;
  inStock: boolean;
}

export interface Slide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  text: string;
  cta: string;
  link: string;
}

import { ElementType } from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp: {
    commercial: string;
    financial: string;
  };
  emails: {
    notes: string;
    financial: string;
    commercial: string;
  };
  social: {
    instagram: string;
  };
}