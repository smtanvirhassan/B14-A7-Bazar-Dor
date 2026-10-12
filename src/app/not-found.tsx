import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">৪০৪</h1>
      <p className="text-gray-600 text-lg mb-8">
        দুঃখিত! এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।
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
