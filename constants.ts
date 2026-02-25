import { ContactInfo, Product, ProductCategory, ServiceItem, Slide } from './types';

export const COMPANY_NAME = "LN Máquinas e Peças Agrícolas";

export const CONTACT_INFO: ContactInfo = {
  address: "Rua Jerônimo Vilela, nº 156 - Jardim América - Jataí/GO",
  phone: "(64) 3636-4067",
  whatsapp: {
    commercial: "(64) 99658-1267",
    financial: "(64) 99608-2781"
  },
  emails: {
    notes: "nfelnmaquinasjti@gmail.com",
    financial: "financieiroLnmaquinasjti@gmail.com",
    commercial: "ln.maquinasmatriz@gmail.com"
  },
  social: {
    instagram: "@lnmaquinasjata"
  }
};

export const UNIDADES = [
  {
    name: "Unidade Jataí – GO",
    company: "LN Máquinas e Peças Agrícolas LTDA",
    address: "Rua Jerônimo Vilela, nº 156 - Bairro Jardim América - Jataí – GO",
    phone: "(64) 3636-4067",
    whatsapp: "(64) 99658-1267",
    instagram: "@lnmaquinas"
  },
  {
    name: "Unidade Iporá – GO",
    company: "LN Máquinas e Peças Agrícolas – Unidade Iporá",
    address: "Av. Pará, 2461 - Jardim Monte Alto - Iporá – GO, CEP: 76200-000",
    phone: "(64) 99988-7180",
    whatsapp: "(64) 99988-7180",
    instagram: "@lnmaquinasipora"
  }
];

import { Tractor, GearSix, Wrench, Drone } from '@phosphor-icons/react';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: "Máquinas Agrícolas",
    description: "Comercialização de máquinas novas e seminovas, focadas em alta performance e tecnologia para o campo.",
    icon: Tractor
  },
  {
    id: '2',
    title: "Peças Agrícolas",
    description: "Peças originais e de reposição para diversas marcas, incluindo soluções para plantadeiras e pulverizadores.",
    icon: GearSix
  },
  {
    id: '3',
    title: "Assistência Técnica",
    description: "Equipe técnica autorizada, treinada e capacitada para manutenção preventiva e corretiva.",
    icon: Wrench
  },
  {
    id: '4',
    title: "Tecnologia Agrícola",
    description: "Soluções tecnológicas como drones agrícolas XAG, GPS e sistemas de precisão.",
    icon: Drone
  }
];

export const INITIAL_SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    subtitle: "TECNOLOGIA NO CAMPO",
    title: "Maximize sua Produtividade",
    text: "Soluções completas em maquinário e agricultura de precisão.",
    cta: "Ver Máquinas",
    link: "/produtos"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    subtitle: "PEÇAS ORIGINAIS",
    title: "Manutenção Garantida",
    text: "O maior estoque de peças de reposição da região.",
    cta: "Cotar Peças",
    link: "/produtos"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1625246333195-58f21a408738?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    subtitle: "ASSISTÊNCIA TÉCNICA",
    title: "Suporte Especializado",
    text: "Equipe pronta para atender sua lavoura onde você estiver.",
    cta: "Falar com Técnico",
    link: "/contato"
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '101',
    name: 'Pulverizador Autopropelido X20',
    category: ProductCategory.MACHINERY,
    price: 850000,
    description: 'Alta capacidade e precisão para grandes lavouras.',
    imageUrl: 'https://picsum.photos/id/292/600/400',
    inStock: true
  },
  {
    id: '102',
    name: 'Drone Agrícola XAG P100',
    category: ProductCategory.TECHNOLOGY,
    price: 120000,
    description: 'Tecnologia de ponta para pulverização aérea autônoma.',
    imageUrl: 'https://picsum.photos/id/119/600/400',
    inStock: true
  },
  {
    id: '103',
    name: 'Kit Disco de Plantio Soja',
    category: ProductCategory.PARTS,
    price: 450,
    description: 'Discos de alta resistência para plantadeiras universais.',
    imageUrl: 'https://picsum.photos/id/252/600/400',
    inStock: true
  },
  {
    id: '104',
    name: 'GPS Agrícola Precision 7',
    category: ProductCategory.TECHNOLOGY,
    price: 15000,
    description: 'Navegação precisa com margem de erro sub-centimétrica.',
    imageUrl: 'https://picsum.photos/id/3/600/400',
    inStock: true
  },
  {
    id: '105',
    name: 'Colheitadeira Axial Series',
    category: ProductCategory.MACHINERY,
    price: 1250000,
    description: 'Máxima produtividade na colheita de grãos.',
    imageUrl: 'https://picsum.photos/id/514/600/400',
    inStock: false
  },
  {
    id: '106',
    name: 'Rolamento Blindado Heavy Duty',
    category: ProductCategory.PARTS,
    price: 120,
    description: 'Ideal para eixos de alta rotação em maquinário pesado.',
    imageUrl: 'https://picsum.photos/id/859/600/400',
    inStock: true
  }
];

export const ABOUT_TEXT = "A LN Máquinas e Peças Agrícolas atua no mercado do agronegócio oferecendo soluções completas em máquinas, peças e assistência técnica, sempre com foco em qualidade, tecnologia e confiança. Com uma equipe técnica especializada e parcerias com grandes marcas do setor, a LN se tornou referência em Jataí e região, atendendo produtores rurais que buscam desempenho, produtividade e segurança em cada safra.";

import logoXag from './src/parceiros/logo_xag.webp';
import logoJan from './src/parceiros/logo_jan.png';
import logoJassy from './src/parceiros/logo_jassy.png';
import logoOrion from './src/parceiros/logo_orion.png';
import logoVenceTudo from './src/parceiros/logo_vencetudo.webp';
import logoAgromann from './src/parceiros/logo_agromann.png';

export const PARTNERS = [
  { name: 'XAG', logo: logoXag },
  { name: 'Jan', logo: logoJan },
  { name: 'Jassy', logo: logoJassy },
  { name: 'Orion', logo: logoOrion },
  { name: 'Vence Tudo', logo: logoVenceTudo },
  { name: 'Agromann', logo: logoAgromann },
];