"use client";

import { useEffect, useState } from "react";

// Illustrative only — there's no backend feeding this.
// Wire it to real analytics later if you want an accurate figure.
function seedCount() {
  return 180 + Math.floor(Math.random() * 40);
}

export default function ListenerCount() {
  const [count, setCount] = useState(200);

  useEffect(() => {
    setCount(seedCount());

    const id = setInterval(() => {
      setCount((c) => Math.max(120, c + Math.floor(Math.random() * 7) - 3));
    }, 6000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      {count.toLocaleString()} listening
    </div>
  );
}