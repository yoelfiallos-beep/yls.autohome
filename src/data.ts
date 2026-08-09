export const BUSINESS = {
  name: "YL's Auto & Home Care",
  phone: '609-977-4052',
  phoneHref: 'tel:+16099774052',
  serviceArea: 'Mercer County, New Jersey',
  email: 'yls.autohome@gmail.com',
  instagram: 'https://www.instagram.com/yls_autohome/',
} as const;

/**
 * Brand config — update these to match your logo.
 *
 * LOGO_URL:        Set to your uploaded logo image path (e.g. "/logo.png").
 *                  Leave empty to show the built-in icon placeholder.
 * LOGO_DARK_URL:   Optional light-on-dark variant for the dark navbar/footer.
 *                  Falls back to LOGO_URL if set, otherwise the placeholder.
 *
 * Brand colors live in tailwind.config.js:
 *   brand  = red (#D91F26)   — primary, buttons, CTAs
 *   silver = metallic silver — icons, borders, dividers
 *   steel  = deep blue        — used sparingly as accent
 *   ink    = matte black      — backgrounds
 */
export const BRAND = {
  logoUrl: '/FE773876-0698-4229-9665-DB33BC823ED4-1.PNG',
  logoDarkUrl: '',
} as const;

export const IMAGES = {
  polish: 'https://images.pexels.com/photos/14615260/pexels-photo-14615260.jpeg?auto=compress&cs=tinysrgb&w=1600',
  trimmer: 'https://images.pexels.com/photos/29288279/pexels-photo-29288279.jpeg?auto=compress&cs=tinysrgb&w=1600',
  truck: 'https://images.pexels.com/photos/29584744/pexels-photo-29584744.jpeg?auto=compress&cs=tinysrgb&w=1600',
  snowShovel: 'https://images.pexels.com/photos/6952441/pexels-photo-6952441.jpeg?auto=compress&cs=tinysrgb&w=1600',
} as const;

export type ServiceId = 'auto-detailing' | 'landscaping' | 'junk-removal' | 'snow-removal';

export type ServiceCategory = {
  id: ServiceId;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  image: string;
};

export const SERVICES: ServiceCategory[] = [
  {
    id: 'auto-detailing',
    title: 'Auto Detailing',
    tagline: 'Showroom shine, brought to your driveway',
    description:
      'Professional mobile detailing that restores and protects your vehicle inside and out. We come to you across Mercer County with premium products and careful, hand-finished work.',
    items: ['Interior Detailing', 'Exterior Detailing', 'Full Vehicle Detail'],
    image: IMAGES.polish,
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    tagline: 'Curb appeal you can be proud of',
    description:
      'Complete yard care and property cleanup to keep your outdoor space looking its best through every season — tidy, healthy, and well maintained.',
    items: ['Yard Cleanup', 'Weeding', 'Lawn Maintenance', 'Property Cleanup'],
    image: IMAGES.trimmer,
  },
  {
    id: 'junk-removal',
    title: 'Junk Removal',
    tagline: 'Reclaim your space, we do the heavy lifting',
    description:
      'Fast, friendly removal of unwanted furniture, clutter, and debris. We load it, haul it, and leave your space clean — no effort required from you.',
    items: ['Furniture Removal', 'Garage Cleanouts', 'General Cleanup'],
    image: IMAGES.truck,
  },
  {
    id: 'snow-removal',
    title: 'Snow Removal',
    tagline: 'Clear paths, safe winters',
    description:
      'Reliable snow and ice clearing for driveways and walkways so your property stays safe and accessible all winter long. Prompt service when you need it most.',
    items: ['Driveways', 'Walkways', 'Winter Cleanup'],
    image: IMAGES.snowShovel,
  },
];
