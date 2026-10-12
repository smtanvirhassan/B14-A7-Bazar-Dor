"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product, Category } from "@/lib/utils";

type SortOption = "default" | "low-to-high" | "high-to-low";

export default function CategoryPageClient({
  category,
  initialProducts,
}: {
  category: Category;
  initialProducts: Product[];
}) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const copy = [...initialProducts];
    switch (sortBy) {
      case "low-to-high":
        return copy.sort((a, b) => a.today - b.today);
      case "high-to-low":
        return copy.sort((a, b) => b.today - a.today);
      default:
        return copy;
    }
  }, [initialProducts, sortBy]);

  if (initialProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-6">📭</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="text-gray-600 mb-8">
          এই ক্যাটেগরিতে এখন কোনো পণ্য নেই।
        </p>
        <Link
          href="/"
          className="btn bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg px-6"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            মোট {initialProducts.length} টি পণ্য
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">সাজান:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="select select-bordered select-sm bg-white text-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
