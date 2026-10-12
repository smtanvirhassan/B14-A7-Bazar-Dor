"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে লগইন করুন!");
      router.push("/signin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
          <div className="h-10 bg-gray-200 rounded w-40 mx-auto" />
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        {/* Avatar */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            "👤"
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {user.name || "ব্যবহারকারী"}
        </h1>
        <p className="text-gray-500 mb-6">{user.email}</p>

        <div className="space-y-3">
          <Link
            href="/profile/update"
            className="btn w-full bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg"
          >
            তথ্য আপডেট করুন
          </Link>
          <button
            onClick={handleSignOut}
            className="btn btn-outline w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-lg"
          >
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}
