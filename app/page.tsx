import { Header } from "./components/header";
import { HomeContent } from "./components/home-content";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-50 md:text-5xl">
            Discover Amazing Recipes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Share your favorite recipes and discover new ones from our community
          </p>
        </div>

        {/* Home Content with Client-side Interactivity */}
        <HomeContent />
      </main>
    </div>
  );
}
