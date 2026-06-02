"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured, mockWaitlistDb } from "@/lib/supabase";
import { sendWebhookBackup } from "@/lib/googleWebhook";
import { CheckCircle2, Copy, Share2, AlertCircle, Loader2, ChevronDown } from "lucide-react";

// Complete world country codes list (India pinned at top as default)
const COUNTRY_CODES = [
  // ── Default ──
  { code: "+91", country: "IN", label: "India" },
  // ── A ──
  { code: "+93", country: "AF", label: "Afghanistan" },
  { code: "+355", country: "AL", label: "Albania" },
  { code: "+213", country: "DZ", label: "Algeria" },
  { code: "+1684", country: "AS", label: "American Samoa" },
  { code: "+376", country: "AD", label: "Andorra" },
  { code: "+244", country: "AO", label: "Angola" },
  { code: "+1264", country: "AI", label: "Anguilla" },
  { code: "+1268", country: "AG", label: "Antigua & Barbuda" },
  { code: "+54", country: "AR", label: "Argentina" },
  { code: "+374", country: "AM", label: "Armenia" },
  { code: "+297", country: "AW", label: "Aruba" },
  { code: "+61", country: "AU", label: "Australia" },
  { code: "+43", country: "AT", label: "Austria" },
  { code: "+994", country: "AZ", label: "Azerbaijan" },
  // ── B ──
  { code: "+1242", country: "BS", label: "Bahamas" },
  { code: "+973", country: "BH", label: "Bahrain" },
  { code: "+880", country: "BD", label: "Bangladesh" },
  { code: "+1246", country: "BB", label: "Barbados" },
  { code: "+375", country: "BY", label: "Belarus" },
  { code: "+32", country: "BE", label: "Belgium" },
  { code: "+501", country: "BZ", label: "Belize" },
  { code: "+229", country: "BJ", label: "Benin" },
  { code: "+1441", country: "BM", label: "Bermuda" },
  { code: "+975", country: "BT", label: "Bhutan" },
  { code: "+591", country: "BO", label: "Bolivia" },
  { code: "+387", country: "BA", label: "Bosnia & Herzegovina" },
  { code: "+267", country: "BW", label: "Botswana" },
  { code: "+55", country: "BR", label: "Brazil" },
  { code: "+673", country: "BN", label: "Brunei" },
  { code: "+359", country: "BG", label: "Bulgaria" },
  { code: "+226", country: "BF", label: "Burkina Faso" },
  { code: "+257", country: "BI", label: "Burundi" },
  // ── C ──
  { code: "+855", country: "KH", label: "Cambodia" },
  { code: "+237", country: "CM", label: "Cameroon" },
  { code: "+1", country: "CA", label: "Canada" },
  { code: "+238", country: "CV", label: "Cape Verde" },
  { code: "+1345", country: "KY", label: "Cayman Islands" },
  { code: "+236", country: "CF", label: "Central African Republic" },
  { code: "+235", country: "TD", label: "Chad" },
  { code: "+56", country: "CL", label: "Chile" },
  { code: "+86", country: "CN", label: "China" },
  { code: "+57", country: "CO", label: "Colombia" },
  { code: "+269", country: "KM", label: "Comoros" },
  { code: "+242", country: "CG", label: "Congo" },
  { code: "+243", country: "CD", label: "Congo (DRC)" },
  { code: "+506", country: "CR", label: "Costa Rica" },
  { code: "+225", country: "CI", label: "Côte d'Ivoire" },
  { code: "+385", country: "HR", label: "Croatia" },
  { code: "+53", country: "CU", label: "Cuba" },
  { code: "+357", country: "CY", label: "Cyprus" },
  { code: "+420", country: "CZ", label: "Czech Republic" },
  // ── D ──
  { code: "+45", country: "DK", label: "Denmark" },
  { code: "+253", country: "DJ", label: "Djibouti" },
  { code: "+1767", country: "DM", label: "Dominica" },
  { code: "+1809", country: "DO", label: "Dominican Republic" },
  // ── E ──
  { code: "+593", country: "EC", label: "Ecuador" },
  { code: "+20", country: "EG", label: "Egypt" },
  { code: "+503", country: "SV", label: "El Salvador" },
  { code: "+240", country: "GQ", label: "Equatorial Guinea" },
  { code: "+291", country: "ER", label: "Eritrea" },
  { code: "+372", country: "EE", label: "Estonia" },
  { code: "+268", country: "SZ", label: "Eswatini" },
  { code: "+251", country: "ET", label: "Ethiopia" },
  // ── F ──
  { code: "+500", country: "FK", label: "Falkland Islands" },
  { code: "+298", country: "FO", label: "Faroe Islands" },
  { code: "+679", country: "FJ", label: "Fiji" },
  { code: "+358", country: "FI", label: "Finland" },
  { code: "+33", country: "FR", label: "France" },
  { code: "+594", country: "GF", label: "French Guiana" },
  { code: "+689", country: "PF", label: "French Polynesia" },
  // ── G ──
  { code: "+241", country: "GA", label: "Gabon" },
  { code: "+220", country: "GM", label: "Gambia" },
  { code: "+995", country: "GE", label: "Georgia" },
  { code: "+49", country: "DE", label: "Germany" },
  { code: "+233", country: "GH", label: "Ghana" },
  { code: "+350", country: "GI", label: "Gibraltar" },
  { code: "+30", country: "GR", label: "Greece" },
  { code: "+299", country: "GL", label: "Greenland" },
  { code: "+1473", country: "GD", label: "Grenada" },
  { code: "+590", country: "GP", label: "Guadeloupe" },
  { code: "+1671", country: "GU", label: "Guam" },
  { code: "+502", country: "GT", label: "Guatemala" },
  { code: "+224", country: "GN", label: "Guinea" },
  { code: "+245", country: "GW", label: "Guinea-Bissau" },
  { code: "+592", country: "GY", label: "Guyana" },
  // ── H ──
  { code: "+509", country: "HT", label: "Haiti" },
  { code: "+504", country: "HN", label: "Honduras" },
  { code: "+852", country: "HK", label: "Hong Kong" },
  { code: "+36", country: "HU", label: "Hungary" },
  // ── I ──
  { code: "+354", country: "IS", label: "Iceland" },
  { code: "+62", country: "ID", label: "Indonesia" },
  { code: "+98", country: "IR", label: "Iran" },
  { code: "+964", country: "IQ", label: "Iraq" },
  { code: "+353", country: "IE", label: "Ireland" },
  { code: "+972", country: "IL", label: "Israel" },
  { code: "+39", country: "IT", label: "Italy" },
  // ── J ──
  { code: "+1876", country: "JM", label: "Jamaica" },
  { code: "+81", country: "JP", label: "Japan" },
  { code: "+962", country: "JO", label: "Jordan" },
  // ── K ──
  { code: "+7", country: "KZ", label: "Kazakhstan" },
  { code: "+254", country: "KE", label: "Kenya" },
  { code: "+686", country: "KI", label: "Kiribati" },
  { code: "+965", country: "KW", label: "Kuwait" },
  { code: "+996", country: "KG", label: "Kyrgyzstan" },
  // ── L ──
  { code: "+856", country: "LA", label: "Laos" },
  { code: "+371", country: "LV", label: "Latvia" },
  { code: "+961", country: "LB", label: "Lebanon" },
  { code: "+266", country: "LS", label: "Lesotho" },
  { code: "+231", country: "LR", label: "Liberia" },
  { code: "+218", country: "LY", label: "Libya" },
  { code: "+423", country: "LI", label: "Liechtenstein" },
  { code: "+370", country: "LT", label: "Lithuania" },
  { code: "+352", country: "LU", label: "Luxembourg" },
  // ── M ──
  { code: "+853", country: "MO", label: "Macau" },
  { code: "+261", country: "MG", label: "Madagascar" },
  { code: "+265", country: "MW", label: "Malawi" },
  { code: "+60", country: "MY", label: "Malaysia" },
  { code: "+960", country: "MV", label: "Maldives" },
  { code: "+223", country: "ML", label: "Mali" },
  { code: "+356", country: "MT", label: "Malta" },
  { code: "+692", country: "MH", label: "Marshall Islands" },
  { code: "+596", country: "MQ", label: "Martinique" },
  { code: "+222", country: "MR", label: "Mauritania" },
  { code: "+230", country: "MU", label: "Mauritius" },
  { code: "+262", country: "YT", label: "Mayotte" },
  { code: "+52", country: "MX", label: "Mexico" },
  { code: "+691", country: "FM", label: "Micronesia" },
  { code: "+373", country: "MD", label: "Moldova" },
  { code: "+377", country: "MC", label: "Monaco" },
  { code: "+976", country: "MN", label: "Mongolia" },
  { code: "+382", country: "ME", label: "Montenegro" },
  { code: "+1664", country: "MS", label: "Montserrat" },
  { code: "+212", country: "MA", label: "Morocco" },
  { code: "+258", country: "MZ", label: "Mozambique" },
  { code: "+95", country: "MM", label: "Myanmar" },
  // ── N ──
  { code: "+264", country: "NA", label: "Namibia" },
  { code: "+674", country: "NR", label: "Nauru" },
  { code: "+977", country: "NP", label: "Nepal" },
  { code: "+31", country: "NL", label: "Netherlands" },
  { code: "+687", country: "NC", label: "New Caledonia" },
  { code: "+64", country: "NZ", label: "New Zealand" },
  { code: "+505", country: "NI", label: "Nicaragua" },
  { code: "+227", country: "NE", label: "Niger" },
  { code: "+234", country: "NG", label: "Nigeria" },
  { code: "+850", country: "KP", label: "North Korea" },
  { code: "+389", country: "MK", label: "North Macedonia" },
  { code: "+47", country: "NO", label: "Norway" },
  // ── O ──
  { code: "+968", country: "OM", label: "Oman" },
  // ── P ──
  { code: "+92", country: "PK", label: "Pakistan" },
  { code: "+680", country: "PW", label: "Palau" },
  { code: "+970", country: "PS", label: "Palestine" },
  { code: "+507", country: "PA", label: "Panama" },
  { code: "+675", country: "PG", label: "Papua New Guinea" },
  { code: "+595", country: "PY", label: "Paraguay" },
  { code: "+51", country: "PE", label: "Peru" },
  { code: "+63", country: "PH", label: "Philippines" },
  { code: "+48", country: "PL", label: "Poland" },
  { code: "+351", country: "PT", label: "Portugal" },
  { code: "+1787", country: "PR", label: "Puerto Rico" },
  // ── Q ──
  { code: "+974", country: "QA", label: "Qatar" },
  // ── R ──
  { code: "+262", country: "RE", label: "Réunion" },
  { code: "+40", country: "RO", label: "Romania" },
  { code: "+7", country: "RU", label: "Russia" },
  { code: "+250", country: "RW", label: "Rwanda" },
  // ── S ──
  { code: "+1869", country: "KN", label: "Saint Kitts & Nevis" },
  { code: "+1758", country: "LC", label: "Saint Lucia" },
  { code: "+1784", country: "VC", label: "Saint Vincent" },
  { code: "+685", country: "WS", label: "Samoa" },
  { code: "+378", country: "SM", label: "San Marino" },
  { code: "+239", country: "ST", label: "São Tomé & Príncipe" },
  { code: "+966", country: "SA", label: "Saudi Arabia" },
  { code: "+221", country: "SN", label: "Senegal" },
  { code: "+381", country: "RS", label: "Serbia" },
  { code: "+248", country: "SC", label: "Seychelles" },
  { code: "+232", country: "SL", label: "Sierra Leone" },
  { code: "+65", country: "SG", label: "Singapore" },
  { code: "+421", country: "SK", label: "Slovakia" },
  { code: "+386", country: "SI", label: "Slovenia" },
  { code: "+677", country: "SB", label: "Solomon Islands" },
  { code: "+252", country: "SO", label: "Somalia" },
  { code: "+27", country: "ZA", label: "South Africa" },
  { code: "+82", country: "KR", label: "South Korea" },
  { code: "+211", country: "SS", label: "South Sudan" },
  { code: "+34", country: "ES", label: "Spain" },
  { code: "+94", country: "LK", label: "Sri Lanka" },
  { code: "+249", country: "SD", label: "Sudan" },
  { code: "+597", country: "SR", label: "Suriname" },
  { code: "+46", country: "SE", label: "Sweden" },
  { code: "+41", country: "CH", label: "Switzerland" },
  { code: "+963", country: "SY", label: "Syria" },
  // ── T ──
  { code: "+886", country: "TW", label: "Taiwan" },
  { code: "+992", country: "TJ", label: "Tajikistan" },
  { code: "+255", country: "TZ", label: "Tanzania" },
  { code: "+66", country: "TH", label: "Thailand" },
  { code: "+670", country: "TL", label: "Timor-Leste" },
  { code: "+228", country: "TG", label: "Togo" },
  { code: "+676", country: "TO", label: "Tonga" },
  { code: "+1868", country: "TT", label: "Trinidad & Tobago" },
  { code: "+216", country: "TN", label: "Tunisia" },
  { code: "+90", country: "TR", label: "Turkey" },
  { code: "+993", country: "TM", label: "Turkmenistan" },
  { code: "+1649", country: "TC", label: "Turks & Caicos" },
  { code: "+688", country: "TV", label: "Tuvalu" },
  // ── U ──
  { code: "+256", country: "UG", label: "Uganda" },
  { code: "+380", country: "UA", label: "Ukraine" },
  { code: "+971", country: "AE", label: "United Arab Emirates" },
  { code: "+44", country: "GB", label: "United Kingdom" },
  { code: "+1", country: "US", label: "United States" },
  { code: "+598", country: "UY", label: "Uruguay" },
  { code: "+998", country: "UZ", label: "Uzbekistan" },
  // ── V ──
  { code: "+678", country: "VU", label: "Vanuatu" },
  { code: "+379", country: "VA", label: "Vatican City" },
  { code: "+58", country: "VE", label: "Venezuela" },
  { code: "+84", country: "VN", label: "Vietnam" },
  { code: "+1340", country: "VI", label: "Virgin Islands (US)" },
  // ── Y ──
  { code: "+967", country: "YE", label: "Yemen" },
  // ── Z ──
  { code: "+260", country: "ZM", label: "Zambia" },
  { code: "+263", country: "ZW", label: "Zimbabwe" },
];

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

export default function WaitlistSection() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralUrl, setReferralUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [peopleCount, setPeopleCount] = useState(1240);
  const [selectedCode, setSelectedCode] = useState("+91");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

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
        const fullPhone = data.phone ? `${selectedCode}${data.phone}` : "";
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
        const fullPhone = data.phone ? `${selectedCode}${data.phone}` : "";
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
      const webhookPhone = data.phone ? `${selectedCode}${data.phone}` : "";
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
    } catch (err: any) {
      setDbError(err.message || "Something went wrong. Please try again.");
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
      let start = 0;
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
    <section className="py-24 relative z-10" id="waitlist">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] md:w-[35vw] md:h-[35vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[620px] mx-auto px-6 md:px-gutter">
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden min-h-[380px] flex flex-col justify-center select-none shadow-[inset_0_0_30px_rgba(167,139,250,0.06)] border border-pulsar-lavender/20">
          
          <AnimatePresence mode="wait">
            
            {/* Step 0: Input Waitlist registration Form */}
            {step === 0 && (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col justify-center"
              >
                <div className="text-center mb-8">
                  <h2 className="font-space font-bold text-2xl md:text-3xl text-starlight-white mb-3">
                    Secure Your Access
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-sm mx-auto">
                    Join the waitlist of elite developers waiting to break the limits.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5">
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
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-on-surface-variant/40 pl-1 mb-0.5">
                      <span className="font-sans text-[10px] md:text-xs">Phone</span>
                      <span className="font-mono text-[9px] md:text-[10px] bg-white/[0.04] border border-glass-stroke rounded-md px-1.5 py-0.5 text-on-surface-variant/35">
                        optional
                      </span>
                    </div>
                    <div className="relative flex items-center gap-0">
                      {/* Country code dropdown */}
                      <div className="relative flex-shrink-0">
                        <select
                          value={selectedCode}
                          onChange={(e) => setSelectedCode(e.target.value)}
                          className="appearance-none bg-[#0a0a0f]/60 border border-glass-stroke border-r-0 rounded-l-xl pl-3.5 pr-7 py-3.5 text-xs md:text-sm text-pulsar-lavender font-mono focus:outline-none focus:border-pulsar-lavender focus:shadow-[0_0_12px_rgba(167,139,250,0.25)] transition-all duration-300 cursor-pointer hover:bg-white/[0.03]"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code + c.country} value={c.code} className="bg-[#0a0a0f] text-starlight-white">
                              {c.code} {c.country}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={12}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none"
                        />
                      </div>
                      {/* Phone number input */}
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phone")}
                        className={`w-full bg-[#0a0a0f]/60 border rounded-r-xl px-4 py-3.5 text-xs md:text-sm text-starlight-white placeholder:text-on-surface-variant/50 focus:outline-none transition-all duration-300 font-sans ${
                          errors.phone
                            ? "border-error focus:border-error focus:shadow-[0_0_12px_rgba(255,180,171,0.25)]"
                            : "border-glass-stroke focus:border-pulsar-lavender focus:shadow-[0_0_12px_rgba(167,139,250,0.25)]"
                        }`}
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
                  🎉 You're on the list!
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
                  You're joining
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
