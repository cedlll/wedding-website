import { motion } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";

function generateICS(): string {
  const dateStr = config.date.iso.replace(/-/g, "");
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//EN",
    "BEGIN:VEVENT",
    `DTSTART:${dateStr}T070000Z`,
    `DTEND:${dateStr}T140000Z`,
    `DTSTAMP:${stamp}`,
    `SUMMARY:${config.couple.partner1} & ${config.couple.partner2}'s Wedding`,
    `LOCATION:${config.venue.name}, ${config.venue.city}`,
    `DESCRIPTION:Wedding ceremony and reception at ${config.venue.name}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function SaveTheDateFab() {
  const [tooltip, setTooltip] = useState(false);

  const handleDownload = () => {
    const ics = generateICS();
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.couple.partner1}-${config.couple.partner2}-wedding.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bottom-full right-0 mb-2 px-3 py-1 rounded-sm whitespace-nowrap font-mono-micro shadow-warm-sm"
          style={{ backgroundColor: "var(--paper-deep)", color: "var(--wood)" }}
        >
          Save the Date
        </div>
      )}

      <motion.button
        onClick={handleDownload}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-warm-md transition-shadow hover:shadow-warm-lg"
        style={{
          backgroundColor: "var(--paper-deep)",
          border: "2px solid var(--gold)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Save the date — download calendar event"
      >
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
          {/* Wax seal circle */}
          <circle cx="20" cy="20" r="16" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="13" stroke="var(--gold)" strokeWidth="0.5" opacity="0.4" />
          {/* Date text */}
          <text
            x="20"
            y="18"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="7"
            fontWeight="bold"
            fill="var(--gold)"
          >
            07
          </text>
          <text
            x="20"
            y="27"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="6"
            fill="var(--gold)"
          >
            NOV
          </text>
        </svg>
      </motion.button>
    </div>
  );
}
