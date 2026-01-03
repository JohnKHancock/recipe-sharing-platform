import { signIn } from "@/app/actions/auth";
import Link from "next/link";
import { SignInForm } from "./sign-in-form";

interface SignInPageProps {
  searchParams: Promise<{ message?: string; error?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign in to RecipeShare
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
            >
              create a new account
            </Link>
          </p>
        </div>

        {params?.message && (
          <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
            {params.message}
          </div>
        )}

        {params?.error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-300">
            {params.error}
          </div>
        )}

        <SignInForm />
      </div>
    </div>
  );
}
