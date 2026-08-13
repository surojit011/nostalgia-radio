"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));

    update();

    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  const shell =
    "rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-medium tabular-nums text-white/90 backdrop-blur-md";

  if (!time) {
    return <div className={shell}>--:--</div>;
  }

  const [value, meridiem] = time.split(" ");
  const [hours, minutes] = value.split(":");

  return (
    <div className={shell}>
      {hours}
      <span className="blink">:</span>
      {minutes}{" "}
      <span className="text-white/60">{meridiem}</span>
    </div>
  );
}