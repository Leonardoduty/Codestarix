import { motion } from "framer-motion";
import { TEAM_SOCIALS } from "@/config/socials";

interface TeamMember {
  firstName: string;
  fullName: string;
  role: string;
  bio: string;
  initials: string;
  avatarColors: [string, string];
  glowColor: string;
  linkedInKey: keyof typeof TEAM_SOCIALS;
}

const LinkedInIcon = () => (
  <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function TeamSection() {
  const team: TeamMember[] = [
    {
      firstName: "Lavanya",
      fullName: "Lavanya N Gajbhiye",
      role: "Chief Product Officer",
      bio: "Lavanya leads product strategy and vision at Codestarix. She shapes the platform experience, drives feature decisions, and ensures every pillar of the product stays true to the mission.",
      initials: "LG",
      avatarColors: ["#7C3AED", "#9D6FFF"],
      glowColor: "radial-gradient(circle at top left, rgba(124,58,237,0.2) 0%, transparent 60%)",
      linkedInKey: "lavanya",
    },
    {
      firstName: "Tanishk",
      fullName: "Tanishk Soni",
      role: "Chief Technology Officer",
      bio: "Tanishk owns the entire technical build at Codestarix. From architecture to deployment, he turns the product vision into a real, scalable platform.",
      initials: "TS",
      avatarColors: ["#1D4ED8", "#60A5FA"],
      glowColor: "radial-gradient(circle at top left, rgba(59,130,246,0.18) 0%, transparent 60%)",
      linkedInKey: "tanishk",
    },
    {
      firstName: "Hasan",
      fullName: "Hasan Rauf",
      role: "Chief Marketing Officer",
      bio: "Hasan drives all content, growth, and marketing execution at Codestarix. He owns the brand voice, the content strategy, and the road to 1,000 followers and beyond.",
      initials: "HR",
      avatarColors: ["#6D28D9", "#A78BFA"],
      glowColor: "radial-gradient(circle at top left, rgba(109,40,217,0.2) 0%, transparent 60%)",
      linkedInKey: "hasan",
    },
    {
      firstName: "Shrijan",
      fullName: "Shrijan Khare",
      role: "Growth & Content",
      bio: "Shrijan supports the marketing engine at Codestarix — contributing to content, community, and growth initiatives as the platform gears up for launch.",
      initials: "SK",
      avatarColors: ["#0F766E", "#2DD4BF"],
      glowColor: "radial-gradient(circle at top left, rgba(20,184,166,0.18) 0%, transparent 60%)",
      linkedInKey: "shrijan",
    },
  ];

  return (
    <section className="pt-36 pb-24 relative z-10 overflow-hidden" id="team">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-[24px]">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-space font-bold mb-3"
            style={{ fontSize: "clamp(28px,4vw,48px)", color: "#F0EEF8" }}
          >
            The minds behind the mission.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="font-sans text-sm font-medium"
            style={{ color: "#8B89A0" }}
          >
            A small team. A massive vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.fullName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                background: "rgba(17,17,24,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.25s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              {/* BG glow */}
              <div style={{ background: member.glowColor, position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.7 }} />

              <div className="relative z-10">
                {/* Avatar */}
                <div style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${member.avatarColors[0]}, ${member.avatarColors[1]})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}>
                  {member.initials}
                </div>

                {/* Name */}
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 600, color: "#F0EEF8", marginBottom: "4px" }}>
                  {member.firstName}
                </h3>

                {/* Role */}
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "#7C3AED",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "16px",
                }}>
                  {member.role}
                </p>

                {/* Bio */}
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#8B89A0", lineHeight: "1.7", marginBottom: "24px" }}>
                  {member.bio}
                </p>

                {/* Divider */}
                <hr style={{ borderColor: "rgba(255,255,255,0.07)", marginBottom: "16px" }} />

                {/* LinkedIn button */}
                <a
                  href={TEAM_SOCIALS[member.linkedInKey]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "#4A4860" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#F0EEF8";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#4A4860";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
