'use client';

export default function BuyCreditsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gold">
      <h1 className="text-2xl font-bold">Buy More Credits</h1>
      <p className="mb-4">Purchase credits to continue summarizing text.</p>
      <button className="bg-gold text-black px-6 py-2 rounded">
        Buy 50 Credits for $5
      </button>
    </div>
  );
}
