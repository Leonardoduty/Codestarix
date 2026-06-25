
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured, mockWaitlistDb } from "@/lib/supabase";
import { sendWebhookBackup } from "@/lib/googleWebhook";
import { CheckCircle2, Copy, Share2, AlertCircle, Loader2 } from "lucide-react";
import CountryCodeSelect, { COUNTRIES, CountryOption } from "./CountryCodeSelect";
import MagneticButton from "./MagneticButton";

const schema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod
    .string()
    .transform((val) => val.trim())
    .pipe(
      zod.string().refine(
        (val) => val === "" || /^\d{4,15}$/.test(val),
        "Enter a valid phone number (digits only)"
      )
    ),
});

type FormValues = zod.infer<typeof schema>;

const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default function WaitlistSection() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralUrl, setReferralUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [peopleCount, setPeopleCount] = useState(1240);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
    COUNTRIES.find((c) => c.id === "IN") || COUNTRIES[0]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setDbError(null);

    const code = generateReferralCode();
    const createdAt = new Date().toISOString();

    // Check URL parameters for any referred_by code
    let referredBy: string | null = null;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      referredBy = params.get("ref");
    }

    try {
      if (isSupabaseConfigured && supabase) {
        // Real Supabase insert
        const fullPhone = data.phone ? `${selectedCountry.code}${data.phone}` : "";
        const { error } = await supabase.from("waitlist_entries").insert({
          name: data.name,
          email: data.email,
          phone: fullPhone,
          referral_code: code,
          referred_by: referredBy,
          source: referredBy ? "referral" : "organic",
        });

        if (error) {
          if (error.code === "23505") {
            throw new Error("You are already registered on the waitlist!");
          }
          throw new Error(error.message);
        }
      } else {
        // Safe Demo Mock DB fallback
        const fullPhone = data.phone ? `${selectedCountry.code}${data.phone}` : "";
        await mockWaitlistDb.insert({
          name: data.name,
          email: data.email,
          phone: fullPhone,
          referral_code: code,
          referred_by: referredBy || undefined,
          source: referredBy ? "referral" : "organic",
        });
      }

      // Success branch
      setReferralCode(code);
      const inviteUrl = `${typeof window !== "undefined" ? window.location.origin : ""}?ref=${code}`;
      setReferralUrl(inviteUrl);

      // Async Backup Google Webhook - wrap inside try/catch so failure never blocks submission
      const webhookPhone = data.phone ? `${selectedCountry.code}${data.phone}` : "";
      sendWebhookBackup({
        name: data.name,
        email: data.email,
        phone: webhookPhone,
        referralCode: code,
        createdAt,
      });

      // Fetch new waitlist total count (or increment current state for UI)
      setPeopleCount((c) => c + 1);

      // Advance UI Success flow stages
      setStep(1); // Checkmark stage
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setDbError(message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1 checkmark auto-advance timer
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        setStep(2); // Counter stage
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Step 2 counter auto-advance timer
  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3); // Referral sharing stage
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Count-up animation driver inside Step 2
  const [currentCounterVal, setCurrentCounterVal] = useState(0);
  useEffect(() => {
    if (step === 2) {
      const start = 0;
      const end = peopleCount;
      const duration = 1200; // ms
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quad ease out transition curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const val = Math.floor(easeOut * (end - start) + start);
        
        setCurrentCounterVal(val);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [step, peopleCount]);

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && referralUrl) {
      navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Click-to-share dynamic URL links
  const shareText = encodeURIComponent(
    "I just joined the waitlist for Codestarix — the future of coding education! Claim your elite developer spot here:"
  );
  
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(referralUrl)}`,
    x: `https://x.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(referralUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`,
  };

  return (
    <section className="py-24 relative z-20" id="waitlist">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] md:w-[35vw] md:h-[35vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[620px] mx-auto px-6 md:px-gutter">
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-visible min-h-[380px] flex flex-col justify-center select-none shadow-[inset_0_0_30px_rgba(167,139,250,0.06)] border border-pulsar-lavender/20">
          
          <AnimatePresence mode="wait">
            
            {/* Step 0: Input Waitlist registration Form */}
            {step === 0 && (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col justify-center overflow-visible"
              >
                <div className="text-center mb-8">
                  <h2 className="font-space font-bold text-2xl md:text-3xl text-starlight-white mb-3">
                    Secure Your Access
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-sm mx-auto">
                    Join the waitlist of elite developers waiting to break the limits.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5 overflow-visible">
                  {/* Full Name field */}
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      placeholder="Full Name"
                      {...register("name")}
                      className={`w-full bg-[#0a0a0f]/60 border rounded-xl px-5 py-3.5 text-xs md:text-sm text-starlight-white placeholder:text-on-surface-variant/50 focus:outline-none transition-all duration-300 font-sans ${
                        errors.name
                          ? "border-error focus:border-error focus:shadow-[0_0_12px_rgba(255,180,171,0.25)]"
                          : "border-glass-stroke focus:border-pulsar-lavender focus:shadow-[0_0_12px_rgba(167,139,250,0.25)]"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[10px] text-error flex items-center gap-1 font-mono tracking-wider uppercase pl-2">
                        <AlertCircle size={10} /> {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="email"
                      placeholder="Email Address"
                      {...register("email")}
                      className={`w-full bg-[#0a0a0f]/60 border rounded-xl px-5 py-3.5 text-xs md:text-sm text-starlight-white placeholder:text-on-surface-variant/50 focus:outline-none transition-all duration-300 font-sans ${
                        errors.email
                          ? "border-error focus:border-error focus:shadow-[0_0_12px_rgba(255,180,171,0.25)]"
                          : "border-glass-stroke focus:border-pulsar-lavender focus:shadow-[0_0_12px_rgba(167,139,250,0.25)]"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-error flex items-center gap-1 font-mono tracking-wider uppercase pl-2">
                        <AlertCircle size={10} /> {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Phone number with country code selector (optional) */}
                  <div className="flex flex-col gap-1.5 overflow-visible">
                    <div className="flex items-center gap-1.5 text-on-surface-variant/40 pl-1 mb-0.5">
                      <span className="font-sans text-[10px] md:text-xs">Phone</span>
                      <span className="font-mono text-[9px] md:text-[10px] bg-white/[0.04] border border-glass-stroke rounded-md px-1.5 py-0.5 text-on-surface-variant/35">
                        optional
                      </span>
                    </div>
                    <div 
                      className={`relative flex items-center bg-[#0a0a0f]/60 border rounded-xl overflow-visible transition-all duration-300 ${
                        errors.phone
                          ? "border-error focus-within:border-error focus-within:shadow-[0_0_12px_rgba(255,180,171,0.25)]"
                          : "border-glass-stroke focus-within:border-pulsar-lavender focus-within:shadow-[0_0_12px_rgba(167,139,250,0.25)]"
                      }`}
                    >
                      {/* Country code selector */}
                      <CountryCodeSelect
                        selected={selectedCountry}
                        onChange={setSelectedCountry}
                      />
                      
                      {/* Vertical Divider */}
                      <div className="w-[1px] h-6 bg-glass-stroke flex-shrink-0" />
                      
                      {/* Phone number input */}
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phone")}
                        className="w-full bg-transparent border-0 px-4 py-3.5 text-xs md:text-sm text-starlight-white placeholder:text-on-surface-variant/50 focus:outline-none font-sans"
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-[10px] text-error flex items-center gap-1 font-mono tracking-wider uppercase pl-2">
                        <AlertCircle size={10} /> {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Database submission error block */}
                  {dbError && (
                    <div className="p-3 bg-error-container/10 border border-error/20 rounded-xl text-error text-[10px] md:text-xs font-mono tracking-wider uppercase text-center flex items-center justify-center gap-2">
                      <AlertCircle size={12} /> {dbError}
                    </div>
                  )}

                  {/* Submit Trigger button */}
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 inline-flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-primary-container to-nebula-purple text-starlight-white font-mono text-xs tracking-widest font-bold uppercase hover:glow-effect transition-all duration-300 disabled:opacity-50 select-none cursor-pointer"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        "Claim Your Spot"
                      )}
                    </button>
                  </MagneticButton>
                </form>
              </motion.div>
            )}

            {/* Step 1: Animated Checkmark Success Frame */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col justify-center items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: [0.4, 1.1, 1], opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="p-4 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 shadow-[0_0_20px_rgba(210,187,255,0.2)]"
                >
                  <CheckCircle2 size={54} className="stroke-[1.5]" />
                </motion.div>
                <h3 className="font-space font-bold text-2xl md:text-3xl text-starlight-white mb-2 leading-snug">
                  🎉 You&apos;re on the list!
                </h3>
              </motion.div>
            )}

            {/* Step 2: Animated Queue Counter Frame */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full flex flex-col justify-center items-center text-center px-4"
              >
                <p className="font-sans text-sm md:text-base text-starlight-white leading-relaxed">
                  You&apos;re joining
                </p>
                {/* Count-up rolling number display */}
                <span className="text-3xl md:text-5xl font-space font-bold text-pulsar-lavender my-4 tracking-tight filter drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
                  {currentCounterVal.toLocaleString()}+
                </span>
                <p className="font-sans text-sm md:text-base text-starlight-white leading-relaxed">
                  people already waiting.
                </p>
              </motion.div>
            )}

            {/* Step 3: Referral Sharing module */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col justify-center items-center text-center"
              >
                <h3 className="font-space font-bold text-xl md:text-2xl text-starlight-white mb-3">
                  Elevate Your Flight Position
                </h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-sm mb-8 leading-relaxed">
                  Share Codestarix and move up the waitlist ranks immediately.
                </p>

                {/* Invite link copying HUD card */}
                <div className="w-full flex items-center justify-between gap-3 bg-[#0a0a0f]/80 border border-glass-stroke rounded-xl px-4.5 py-3 mb-8 select-all">
                  <span className="font-mono text-[10px] md:text-xs text-on-surface-variant truncate pr-2 select-text">
                    {referralUrl}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-glass-stroke text-pulsar-lavender hover:bg-white/10 active:scale-95 duration-200 cursor-pointer focus:outline-none flex items-center justify-center"
                    aria-label="Copy invitation link"
                  >
                    {copied ? (
                      <span className="font-mono text-[9px] uppercase tracking-widest font-semibold text-green-400">
                        Copied!
                      </span>
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                {/* Sharing Platform Buttons */}
                <div className="flex flex-wrap justify-center gap-4.5 w-full">
                  {/* WhatsApp */}
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2.5 px-4.5 py-3 rounded-full bg-white/[0.02] border border-glass-stroke text-on-surface-variant hover:text-green-400 hover:border-green-400/20 hover:bg-white/[0.05] duration-200 font-mono text-[10px] tracking-wider uppercase font-semibold"
                  >
                    WhatsApp
                  </a>

                  {/* X (formerly Twitter) */}
                  <a
                    href={shareLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2.5 px-4.5 py-3 rounded-full bg-white/[0.02] border border-glass-stroke text-on-surface-variant hover:text-white hover:border-white/20 hover:bg-white/[0.05] duration-200 font-mono text-[10px] tracking-wider uppercase font-semibold"
                  >
                    X Platform
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2.5 px-4.5 py-3 rounded-full bg-white/[0.02] border border-glass-stroke text-on-surface-variant hover:text-blue-400 hover:border-blue-400/20 hover:bg-white/[0.05] duration-200 font-mono text-[10px] tracking-wider uppercase font-semibold"
                  >
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
