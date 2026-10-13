"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!isPending && !session?.user && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error("প্রোফাইল আপডেট করতে লগইন করুন!");
      router.replace("/signin");
    }
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [isPending, session?.user, router]);

  if (isPending) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded w-40" />
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }
    setLoading(true);
    try {
      await authClient.updateUser({
        name: name.trim(),
      });
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে! আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <Link
            href="/profile"
            className="text-sm text-green-700 hover:underline"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          তথ্য আপডেট করুন
        </h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="input input-bordered w-full bg-gray-50 focus:bg-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "আপডেট করুন"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
