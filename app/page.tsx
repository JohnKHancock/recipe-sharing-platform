import Link from "next/link";
import { Header } from "./components/header";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-50 md:text-6xl lg:text-7xl">
              Share Your Favorite
              <span className="block text-orange-600 dark:text-orange-400">
                Recipes
              </span>
          </h1>

            <p className="mx-auto max-w-xl text-xl text-gray-600 dark:text-gray-400 md:text-2xl">
              Join our community of home cooks and share your culinary creations
              with the world.
            </p>

            <div className="flex items-center justify-center">
              <Link
                href="/auth/sign-up"
                className="rounded-md bg-orange-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                Start Creating
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/sign-in"
                  className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
            >
                  Sign in here
                </Link>
          </p>
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
