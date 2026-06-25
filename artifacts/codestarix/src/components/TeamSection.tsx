
import { motion } from "framer-motion";
import { TEAM_SOCIALS } from "@/config/socials";

interface TeamMember {
  firstName: string;
  fullName: string;
  role: string;
  bio: string;
  glowColor: string; // CSS radial-gradient styling
}

export default function TeamSection() {
  const team: TeamMember[] = [
    {
      firstName: "Lavanya",
      fullName: "Lavanya N Gajbhiye",
      role: "Chief Product Officer",
      bio: "Lavanya leads product strategy and vision at Codestarix. He shapes the platform experience, drives feature decisions, and ensures every pillar of the product stays true to the mission.",
      glowColor: "radial-gradient(circle at top left, rgba(244, 63, 94, 0.25) 0%, transparent 60%)",
    },
    {
      firstName: "Tanishk",
      fullName: "Tanishk Soni",
      role: "Chief Technology Officer",
      bio: "Tanishk owns the entire technical build at Codestarix. From architecture to deployment, he turns the product vision into a real, scalable platform.",
      glowColor: "radial-gradient(circle at top left, rgba(59, 130, 246, 0.25) 0%, transparent 60%)",
    },
    {
      firstName: "Hasan",
      fullName: "Hasan Rauf",
      role: "Chief Marketing Officer",
      bio: "Hasan drives all content, growth, and marketing execution at Codestarix. He owns the brand voice, the content strategy, and the road to 1,000 followers and beyond.",
      glowColor: "radial-gradient(circle at top left, rgba(168, 85, 247, 0.25) 0%, transparent 60%)",
    },
    {
      firstName: "Shrijan",
      fullName: "Shrijan Khare",
      role: "Marketing Intern",
      bio: "Shrijan supports the marketing engine at Codestarix — contributing to content, community, and growth initiatives as the platform gears up for launch.",
      glowColor: "radial-gradient(circle at top left, rgba(20, 184, 166, 0.25) 0%, transparent 60%)",
    },
  ];

  // Animation variants for staggered slide-up entry on scroll
  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // Staggered 100ms delay per card
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    }),
  };

  return (
    <section className="pt-36 pb-24 relative z-10 bg-transparent overflow-hidden" id="team">
      {/* Subtle background ambient light */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pulsar-lavender/5 to-nebula-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto px-6 md:px-gutter">
        {/* Section Heading & Subheading */}
        <div className="text-center mb-16 select-none">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-bold text-3xl md:text-4xl text-starlight-white mb-3"
          >
            The minds behind the mission.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-sm text-on-surface-variant/80 font-medium"
          >
            A small team. A massive vision.
          </motion.p>
        </div>

        {/* 2x2 Grid for Desktop, Single Column for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.fullName}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -6,
                borderColor: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
              }}
              style={{
                backgroundColor: "rgba(30, 30, 40, 0.8)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "20px",
              }}
              className="relative overflow-hidden p-8 flex flex-col justify-between group transition-all duration-300"
            >
              {/* Radial gradient glow in top-left corner */}
              <div
                style={{
                  background: member.glowColor,
                }}
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
              />

              {/* Card content */}
              <div className="relative z-10">
                {/* Large bold white first name */}
                <h3 className="font-space font-bold text-[2rem] text-starlight-white leading-tight tracking-tight mb-1">
                  {member.firstName}
                </h3>
                {/* Role subtitle in muted grey */}
                <p className="font-sans font-medium text-xs md:text-sm text-on-surface-variant/60 mb-5 uppercase tracking-wider">
                  {member.role}
                </p>
                {/* Bio paragraph in light grey */}
                <p className="font-sans text-[0.95rem] text-on-surface-variant/90 leading-[1.7] mb-8">
                  {member.bio}
                </p>
              </div>

              {/* Action area */}
              <div className="relative z-10 mt-auto">
                {/* Thin horizontal divider */}
                <hr className="border-t border-white/[0.08] mb-5" />
                {/* Social button */}
                {(() => {
                  const url = TEAM_SOCIALS[member.firstName.toLowerCase() as keyof typeof TEAM_SOCIALS];
                  const isInstagram = url?.includes("instagram.com");
                  return (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3 px-5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-starlight-white font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.1] hover:-translate-y-[2px] active:translate-y-0"
                    >
                      {isInstagram ? (
                        <>
                          <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                          <span>Instagram</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          <span>LinkedIn</span>
                        </>
                      )}
                    </a>
                  );
                })()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
