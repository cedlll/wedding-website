import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const isConfigured = config.rsvp.googleFormUrl.startsWith("https://");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || attending === null) return;

    if (!isConfigured) {
      // googleFormUrl is still the placeholder value — surface this instead
      // of silently showing a false "Thank You" to the guest.
      setError(true);
      return;
    }

    setError(false);
    setSubmitting(true);

    const fields = config.rsvp.googleFormFields;
    const formData = new URLSearchParams();
    formData.append(fields.name, name);
    formData.append(fields.attending, attending ? "Yes" : "No");
    formData.append(fields.guestCount, guestCount.toString());
    if (message) formData.append(fields.message, message);

    try {
      await fetch(config.rsvp.googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
    } catch {
      // Google Forms returns opaque response
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="divider-line mb-8" />
            <p
              className="font-display text-4xl md:text-5xl mb-4"
              style={{ color: "var(--charcoal)", letterSpacing: "0.02em", fontWeight: 400 }}
            >
              Thank You
            </p>
            <p className="text-base font-body" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
              We can't wait to celebrate with you.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-8"
            exit={{ opacity: 0 }}
          >
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <label className="label-text block mb-3" htmlFor="rsvp-name">
                Full Name
              </label>
              <motion.input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-0 py-3 bg-transparent border-0 border-b text-base focus:outline-none focus:ring-0 transition-all duration-300"
                style={{
                  borderColor: "var(--divider)",
                  color: "var(--charcoal)",
                }}
                whileFocus={{
                  borderColor: "var(--gold)",
                  scale: 1.01
                }}
                placeholder="Your full name"
              />
            </motion.div>

            {/* Attending */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="label-text block mb-4">Will you attend?</span>
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  onClick={() => setAttending(true)}
                  className="flex-1 py-4 text-center text-xs font-semibold tracking-wider uppercase transition-all duration-400 relative overflow-hidden"
                  style={{
                    border: "2px solid var(--charcoal)",
                    backgroundColor:
                      attending === true ? "var(--charcoal)" : "transparent",
                    color:
                      attending === true ? "var(--white)" : "var(--charcoal)",
                    letterSpacing: "0.12em"
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Joyfully Accept
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setAttending(false)}
                  className="flex-1 py-4 text-center text-xs font-semibold tracking-wider uppercase transition-all duration-400 relative overflow-hidden"
                  style={{
                    border: "2px solid var(--charcoal)",
                    backgroundColor:
                      attending === false ? "var(--charcoal)" : "transparent",
                    color:
                      attending === false ? "var(--white)" : "var(--charcoal)",
                    letterSpacing: "0.12em"
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Regretfully Decline
                </motion.button>
              </div>
            </motion.div>

            {/* Guest count (conditional) */}
            <AnimatePresence>
              {attending === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden space-y-8"
                >
                  <div>
                    <label
                      className="label-text block mb-3"
                      htmlFor="rsvp-guests"
                    >
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-6">
                      <motion.button
                        type="button"
                        onClick={() =>
                          setGuestCount(Math.max(1, guestCount - 1))
                        }
                        className="w-10 h-10 flex items-center justify-center text-lg transition-colors"
                        style={{
                          border: "1px solid var(--divider)",
                          color: "var(--charcoal)",
                        }}
                        whileHover={{ scale: 1.1, borderColor: "var(--gold)" }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Decrease guest count"
                      >
                        &minus;
                      </motion.button>
                      <motion.span
                        className="font-display text-3xl w-8 text-center"
                        style={{ color: "var(--charcoal)", letterSpacing: "0.02em", fontWeight: 400 }}
                        id="rsvp-guests"
                        key={guestCount}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }}
                      >
                        {guestCount}
                      </motion.span>
                      <motion.button
                        type="button"
                        onClick={() =>
                          setGuestCount(Math.min(6, guestCount + 1))
                        }
                        className="w-10 h-10 flex items-center justify-center text-lg transition-colors"
                        style={{
                          border: "1px solid var(--divider)",
                          color: "var(--charcoal)",
                        }}
                        whileHover={{ scale: 1.1, borderColor: "var(--gold)" }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Increase guest count"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <label className="label-text block mb-3" htmlFor="rsvp-message">
                Message{" "}
                <span className="normal-case opacity-60">(optional)</span>
              </label>
              <motion.textarea
                id="rsvp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-0 py-3 bg-transparent border-0 border-b text-base resize-none focus:outline-none focus:ring-0 transition-all duration-300"
                style={{
                  borderColor: "var(--divider)",
                  color: "var(--charcoal)",
                }}
                whileFocus={{
                  borderColor: "var(--gold)",
                  scale: 1.01
                }}
                placeholder="A few words for the couple..."
              />
            </motion.div>

            {/* Configuration error */}
            {error && (
              <motion.p
                role="alert"
                className="text-sm text-center"
                style={{ color: "#b3543e" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                RSVPs aren't connected yet — please contact the couple directly so your response isn't lost.
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={!name || attending === null || submitting}
              className="w-full py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-400 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
              style={{
                backgroundColor: "var(--charcoal)",
                color: "var(--white)",
                border: "2px solid var(--charcoal)",
                letterSpacing: "0.15em"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={!submitting && name && attending !== null ? { scale: 1.02 } : {}}
              whileTap={!submitting && name && attending !== null ? { scale: 0.98 } : {}}
            >
              {submitting && (
                <motion.span
                  className="inline-block mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⟳
                </motion.span>
              )}
              {submitting ? "Sending..." : "Confirm RSVP"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
