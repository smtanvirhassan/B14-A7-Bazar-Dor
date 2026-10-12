"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে!");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-700 p-1.5 rounded-xl">
              <Image
                src="/images/logo-icon.png"
                alt="বাজার দর"
                height={24}
                width={24}
                className="rounded-lg"
              />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight text-base">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                প্রয়োজনীয় পণ্যের দাম
              </p>
            </div>
          </Link>

          
          <button
            className="lg:hidden btn btn-ghost btn-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          
          <div className="hidden lg:flex items-center gap-2">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="btn btn-ghost btn-sm text-gray-700"
                >
                  👤 {session.user.name || "প্রোফাইল"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-sm border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                >
                  সাইন আউট
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="btn btn-outline btn-sm border-green-600 text-green-700 hover:bg-green-50"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-sm bg-green-700 hover:bg-green-800 text-white border-0"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto">
            {categories.map((cat) => {
              const isActive =
                pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pb-4">
          <nav className="flex flex-wrap gap-2 py-3">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            {session?.user ? (
              <>
                <Link
                  href="/profile"
                  className="btn btn-ghost btn-sm flex-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👤 {session.user.name || "প্রোফাইল"}
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline btn-sm border-red-300 text-red-600"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="btn btn-outline btn-sm flex-1 border-green-600 text-green-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-sm flex-1 bg-green-700 text-white border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      
      <PriceTicker />
    </header>
  );
}

function PriceTicker() {
  const [products, setProducts] = useState<
    {
      id: number;
      slug: string;
      image: string;
      nameBn: string;
      today: number;
      unit: string;
      change: { dir: string; pct: number };
    }[]
  >([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  if (products.length === 0) return null;

  const items = [...products, ...products]; // duplicate for seamless loop

  return (
    <div className="group relative w-full h-10 flex items-center overflow-hidden border-t border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <div
        className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{
          animation: "ticker-scroll 40s linear infinite",
        }}
      >
        {items.map((d, idx) => (
          <Link
            key={`${d.id}-${idx}`}
            href={`/product/${d.slug}`}
            className="inline-flex items-center gap-1.5 px-4 text-sm hover:underline cursor-pointer transition-colors hover:text-green-800"
          >
            <span>{d.image}</span>
            <span className="font-semibold">{d.nameBn}</span>
            <span>
              {d.today.toLocaleString("bn-BD")} টাকা/{unitBn[d.unit] ?? d.unit}
            </span>
            <span
              className={`font-semibold ${
                d.change.dir === "up"
                  ? "text-red-600"
                  : d.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-400"
              }`}
            >
              {d.change.dir === "up" ? "▲" : d.change.dir === "down" ? "▼" : "–"}{" "}
              {Math.abs(d.change.pct).toLocaleString("bn-BD")}%
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
