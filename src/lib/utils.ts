const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNum(num: number | string): string {
  return String(num).replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
}

export function formatBengaliPrice(price: number): string {
  const formatted = price.toLocaleString('en-IN');
  return toBengaliNum(formatted);
}

export const unitMap: Record<string, string> = {
  kg: 'প্রতি কেজি',
  litre: 'প্রতি লিটার',
  dozen: 'প্রতি ডজন',
  piece: 'প্রতি পিস',
};

export const unitMapShort: Record<string, string> = {
  kg: 'কেজি',
  litre: 'লিটার',
  dozen: 'ডজন',
  piece: 'পিস',
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const API_BASE = 'https://openapi.programming-hero.com/api/bazardor';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products?category=${category}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json();
}
