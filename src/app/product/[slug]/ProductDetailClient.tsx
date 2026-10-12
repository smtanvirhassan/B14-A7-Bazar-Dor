"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Product,
  toBengaliNum,
  formatBengaliPrice,
  unitMap,
} from "@/lib/utils";

export default function ProductDetailClient({
  product,
}: {
  product: Product;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("এই পৃষ্ঠা দেখতে লগইন করুন!");
      router.push("/signin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const { markets } = product;

  // Calculate min, max, avg from markets
  const allMin = Math.min(...markets.map((m) => m.min));
  const allMax = Math.max(...markets.map((m) => m.max));
  const allAvg = Math.round(
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
  );

  // Group markets by division
  const divisionMap = new Map<
    string,
    { market: string; min: number; max: number }[]
  >();
  markets.forEach((m) => {
    if (!divisionMap.has(m.division)) {
      divisionMap.set(m.division, []);
    }
    divisionMap.get(m.division)!.push(m);
  });

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600 bg-red-50"
      : product.change.dir === "down"
        ? "text-green-600 bg-green-50"
        : "text-gray-500 bg-gray-50";

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        {" / "}
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        {" / "}
        <span className="text-gray-900">{product.nameBn}</span>
      </div>

      {/* Top Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">{product.image}</span>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-gray-500 mt-1">
              বাজারের সর্বশেষ মূল্য তথ্য
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                {unitMap[product.unit] ?? product.unit}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${changeColor}`}
              >
                {changeIcon} {toBengaliNum(Math.abs(product.change.pct).toFixed(1))}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-100">
          <p className="text-sm text-green-700 font-medium mb-1">
            সর্বনিম্ন দাম
          </p>
          <p className="text-2xl font-bold text-green-800">
            {formatBengaliPrice(allMin)} টাকা
          </p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-5 text-center border border-blue-100">
          <p className="text-sm text-blue-700 font-medium mb-1">গড় দাম</p>
          <p className="text-2xl font-bold text-blue-800">
            {formatBengaliPrice(allAvg)} টাকা
          </p>
        </div>
        <div className="bg-red-50 rounded-2xl p-5 text-center border border-red-100">
          <p className="text-sm text-red-700 font-medium mb-1">
            সর্বোচ্চ দাম
          </p>
          <p className="text-2xl font-bold text-red-800">
            {formatBengaliPrice(allMax)} টাকা
          </p>
        </div>
      </div>

      {/* Market-wise prices */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          🏪 বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="space-y-6">
          {Array.from(divisionMap.entries()).map(([division, divMarkets]) => (
            <div key={division}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                📍 {division}
              </h3>
              <div className="overflow-x-auto">
                <table className="table table-sm w-full">
                  <thead>
                    <tr className="text-gray-500">
                      <th>বাজার</th>
                      <th className="text-right">সর্বনিম্ন</th>
                      <th className="text-right">সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {divMarkets.map((m) => (
                      <tr key={m.market} className="hover">
                        <td className="font-medium">{m.market}</td>
                        <td className="text-right text-green-700">
                          {formatBengaliPrice(m.min)} টাকা
                        </td>
                        <td className="text-right text-red-600">
                          {formatBengaliPrice(m.max)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
