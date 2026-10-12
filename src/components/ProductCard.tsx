"use client";
import Link from "next/link";
import { Product, toBengaliNum, formatBengaliPrice, unitMap } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const { slug, image, nameBn, unit, today, change } = product;

  const changeColor =
    change.dir === "up"
      ? "bg-red-100 text-red-700"
      : change.dir === "down"
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-500";

  const changeIcon =
    change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";

  return (
    <Link href={`/product/${slug}`} className="block">
      <div className="product-card bg-white rounded-2xl border border-gray-200 p-5 h-full flex flex-col gap-3">
        <div className="text-5xl">{image}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900">{nameBn}</h3>
          <p className="text-sm text-gray-500">{unitMap[unit] ?? unit}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-xl font-bold text-gray-900">
              {formatBengaliPrice(today)} টাকা
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${changeColor}`}
          >
            {changeIcon} {toBengaliNum(Math.abs(change.pct).toFixed(1))}%
          </span>
        </div>
      </div>
    </Link>
  );
}
