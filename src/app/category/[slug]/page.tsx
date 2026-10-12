import { fetchProductsByCategory, fetchCategories, Product } from "@/lib/utils";
import { notFound } from "next/navigation";
import CategoryPageClient from "./CategoryPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const categories = await fetchCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  let products: Product[];
  try {
    products = await fetchProductsByCategory(slug);
  } catch {
    products = [];
  }

  return (
    <CategoryPageClient
      category={category}
      initialProducts={products}
    />
  );
}
