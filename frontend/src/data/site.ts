export const site = {
  name: 'Xpert Fulfillment',
  shortName: 'Xpert',
  url: 'https://www.xpertfulfillment.com',
  description:
    'Dependable fulfillment operations for established ecommerce brands that need accuracy, responsiveness, and a partner who stays accountable.',
  launchReady: false,
};

export const navigation = [
  { label: 'Services', href: '/services/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'About', href: '/about/' },
];

export const services = [
  {
    number: '01',
    title: 'Order fulfillment',
    description:
      'A disciplined pick, pack, and ship operation built around your requirements—not a one-size-fits-all workflow.',
  },
  {
    number: '02',
    title: 'Inventory operations',
    description:
      'Structured receiving, storage, and inventory handling that keeps your team informed and exceptions visible.',
  },
  {
    number: '03',
    title: 'Shipping coordination',
    description:
      'Practical carrier and service selection supported by people who understand the cost of missed details.',
  },
  {
    number: '04',
    title: 'Value-added work',
    description:
      'Kitting, inserts, labeling, and brand-specific handling designed around the work your orders actually require.',
  },
];

export const industries = [
  {
    icon: 'apparel' as const,
    title: 'Apparel',
    description: 'Accurate fulfillment for size, color, style, and seasonal product variations.',
  },
  {
    icon: 'ecommerce' as const,
    title: 'Ecommerce',
    description: 'Dependable direct-to-consumer operations across growing catalogs and sales channels.',
  },
  {
    icon: 'technology' as const,
    title: 'Tech & electronics',
    description: 'Careful handling for devices, accessories, components, and connected-product programs.',
  },
  {
    icon: 'nutraceuticals' as const,
    title: 'Nutraceuticals',
    description: 'Detail-oriented fulfillment for wellness products where identification and consistency matter.',
  },
  {
    icon: 'crowdfunding' as const,
    title: 'Crowdfunding',
    description: 'Structured launch fulfillment for campaigns moving from backer promise to repeatable operation.',
  },
  {
    icon: 'publishing' as const,
    title: 'Books & print media',
    description: 'Storage and order handling for books, collections, print programs, and related media.',
  },
];

export const operatingPrinciples = [
  'Clear ownership when something needs attention',
  'Responsive communication with people who know the operation',
  'Documented processes built around repeatable execution',
  'Measured commitments instead of vague promises',
];
