import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import moment from "moment";
import "moment/locale/bn";

const BengaliDate = async () => {
  await connection();
  const dateString = moment().locale("bn").format("dddd, D MMMM, YYYY");
  return <>{dateString}</>;
};

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block rounded-lg px-3 py-1.5 text-sm font-medium text-green-800 bg-green-200 mb-4">
            <Suspense fallback={<span>লোড হচ্ছে...</span>}>
              <BengaliDate />
            </Suspense>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের
            পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn btn-sm sm:btn-md bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg px-6"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex-shrink-0 w-64 sm:w-80 md:w-96">
          <Image
            src="/images/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={400}
            height={400}
            priority
            className="w-full h-auto drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
