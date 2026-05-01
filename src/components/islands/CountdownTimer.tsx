import { useState, useEffect } from "react";
import config from "../../lib/wedding-config";

export default function CountdownTimer() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const deadline = new Date(config.date.rsvpDeadlineIso + "T23:59:59");
    const now = new Date();
    const diff = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    setDaysLeft(diff);
  }, []);

  if (daysLeft === null) return null;

  if (daysLeft <= 0) {
    return (
      <div className="text-center mb-10">
        <p className="font-mono-micro" style={{ color: "var(--olive-soft)" }}>
          the rsvp deadline has passed
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mb-10">
      <span
        className="font-display text-6xl font-light"
        style={{ color: "var(--gold)" }}
      >
        {daysLeft}
      </span>
      <p className="font-mono-micro mt-2" style={{ color: "var(--olive-soft)" }}>
        days left to rsvp
      </p>
    </div>
  );
}
