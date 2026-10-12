export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛒</span>
          <div>
            <h3 className="font-bold text-white text-lg">বাজার দর</h3>
            <p className="text-sm text-gray-400">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400 md:text-right max-w-md">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © ২০২৬ বাজার দর। সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
 }
