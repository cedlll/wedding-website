import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";
import CountdownTimer from "./CountdownTimer";

type MealOption = "Chicken" | "Fish" | "Vegetarian";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [meal, setMeal] = useState<MealOption | null>(null);
  const [songRequest, setSongRequest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || attending === null) return;

    setSubmitting(true);

    const fields = config.rsvp.googleFormFields;
    const formData = new URLSearchParams();
    formData.append(fields.name, name);
    formData.append(fields.attending, attending ? "Yes, joyfully" : "Regretfully unable");
    formData.append(fields.guestCount, guestCount.toString());
    if (meal) formData.append(fields.mealPreference, meal);
    if (songRequest) formData.append(fields.songRequest, songRequest);
    if (message) formData.append(fields.message, message);

    try {
      await fetch(config.rsvp.googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
    } catch {
      // Google Forms returns opaque response — treat any result as success
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto">
      <CountdownTimer />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="text-center py-16 px-8 card-bordered rounded-sm"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, duration: 0.6 }}
            style={{ transformOrigin: "bottom" }}
          >
            {/* Botanical illustration */}
            <svg viewBox="0 0 120 60" className="w-24 h-12 mx-auto mb-6" fill="none" aria-hidden="true">
              <path d="M20 50 C40 45, 60 30, 100 15" stroke="var(--olive)" strokeWidth="1.25" strokeLinecap="round" />
              <path d="M45 40 C43 34, 50 28, 53 32 C56 36, 48 42, 45 40Z" stroke="var(--olive)" strokeWidth="1.25" />
              <path d="M65 30 C63 24, 70 18, 73 22 C76 26, 68 32, 65 30Z" stroke="var(--olive)" strokeWidth="1.25" />
              <path d="M82 22 C80 16, 87 10, 90 14 C93 18, 85 24, 82 22Z" stroke="var(--olive)" strokeWidth="1.25" />
            </svg>

            <p className="font-script text-4xl mb-4" style={{ color: "var(--gold)" }}>
              See you on the 7th!
            </p>
            <p className="font-display text-2xl font-light" style={{ color: "var(--wood-deep)" }}>
              {config.couple.partner1} &amp; {config.couple.partner2}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-8"
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: "top" }}
          >
            {/* Name */}
            <div>
              <label className="section-label block mb-2" htmlFor="rsvp-name">
                Full Name
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-paper-deep border font-body rounded-sm focus:outline-none focus:ring-2 focus:ring-olive"
                style={{ borderColor: "rgba(107,79,58,0.22)" }}
                placeholder="Your full name"
              />
            </div>

            {/* Attending */}
            <div>
              <span className="section-label block mb-3">Will you be attending?</span>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`p-4 text-center rounded-sm transition-all font-body ${
                    attending === true
                      ? "ring-2 ring-olive shadow-warm-sm"
                      : "hover:shadow-warm-sm"
                  }`}
                  style={{
                    backgroundColor: attending === true ? "rgba(74,93,58,0.08)" : "var(--paper-deep)",
                    border: "var(--border-card)",
                  }}
                >
                  <span className="block text-lg mb-1">Yes, joyfully</span>
                  <span className="text-xs" style={{ color: "var(--olive-soft)" }}>🌿</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`p-4 text-center rounded-sm transition-all font-body ${
                    attending === false
                      ? "ring-2 ring-olive shadow-warm-sm"
                      : "hover:shadow-warm-sm"
                  }`}
                  style={{
                    backgroundColor: attending === false ? "rgba(74,93,58,0.08)" : "var(--paper-deep)",
                    border: "var(--border-card)",
                  }}
                >
                  <span className="block text-lg mb-1">Regretfully unable</span>
                  <span className="text-xs" style={{ color: "var(--olive-soft)" }}>🍂</span>
                </button>
              </div>
            </div>

            {/* Conditional fields for attending */}
            <AnimatePresence>
              {attending === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-8 overflow-hidden"
                >
                  {/* Guest count */}
                  <div>
                    <label className="section-label block mb-2" htmlFor="rsvp-guests">
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-10 h-10 rounded-full flex items-center justify-center font-display text-xl"
                        style={{ border: "var(--border-card)", color: "var(--wood)" }}
                        aria-label="Decrease guest count"
                      >
                        −
                      </button>
                      <span
                        className="font-display text-3xl font-light w-12 text-center"
                        style={{ color: "var(--wood-deep)" }}
                        id="rsvp-guests"
                      >
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
                        className="w-10 h-10 rounded-full flex items-center justify-center font-display text-xl"
                        style={{ border: "var(--border-card)", color: "var(--wood)" }}
                        aria-label="Increase guest count"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Meal preference */}
                  <div>
                    <span className="section-label block mb-3">Meal Preference</span>
                    <div className="grid grid-cols-3 gap-3">
                      {(["Chicken", "Fish", "Vegetarian"] as MealOption[]).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setMeal(option)}
                          className={`p-3 text-center rounded-sm transition-all font-body text-sm ${
                            meal === option
                              ? "ring-2 ring-olive shadow-warm-sm"
                              : "hover:shadow-warm-sm"
                          }`}
                          style={{
                            backgroundColor: meal === option ? "rgba(74,93,58,0.08)" : "var(--paper-deep)",
                            border: "var(--border-card)",
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Song request */}
                  <div>
                    <label className="section-label block mb-2" htmlFor="rsvp-song">
                      Song Request <span className="normal-case" style={{ color: "var(--olive-soft)" }}>(optional)</span>
                    </label>
                    <input
                      id="rsvp-song"
                      type="text"
                      value={songRequest}
                      onChange={(e) => setSongRequest(e.target.value)}
                      className="w-full px-4 py-3 bg-paper-deep border font-body rounded-sm focus:outline-none focus:ring-2 focus:ring-olive"
                      style={{ borderColor: "rgba(107,79,58,0.22)" }}
                      placeholder="A song that makes you dance"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message */}
            <div>
              <label className="section-label block mb-2" htmlFor="rsvp-message">
                Message for {config.couple.partner1} &amp; {config.couple.partner2}{" "}
                <span className="normal-case" style={{ color: "var(--olive-soft)" }}>(optional)</span>
              </label>
              <textarea
                id="rsvp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-paper-deep border font-body rounded-sm lined-card resize-none focus:outline-none focus:ring-2 focus:ring-olive"
                style={{ borderColor: "rgba(107,79,58,0.22)" }}
                placeholder="A few words for the couple..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!name || attending === null || submitting}
              className="w-full py-4 font-mono-micro rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--olive)",
                color: "var(--paper)",
                border: "1px solid var(--olive)",
              }}
            >
              {submitting ? "Sending..." : "Send RSVP"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
