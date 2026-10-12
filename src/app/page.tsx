import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ProductSections from "@/components/ProductSections";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense
        fallback={
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="space-y-14">
              <section>
                <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        }
      >
        <ProductSections />
      </Suspense>
    </>
  );
}
