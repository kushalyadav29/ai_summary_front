'use client';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gold">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p className="mb-4">Sign in to get 15 more credits!</p>
      <button className="bg-gold text-black px-6 py-2 rounded">
        Sign In with Google
      </button>
    </div>
  );
}
