import { Switch, Route, Router as WouterRouter } from "wouter";
import { useState, useEffect } from "react";
import { useLenis } from "@/lib/useLenis";
import StarField from "@/components/StarField";
import IntroSequence from "@/components/IntroSequence";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import RoadmapSection from "@/components/RoadmapSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import { motion, AnimatePresence } from "framer-motion";

function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);
  useLenis();

  useEffect(() => {
    const seen = sessionStorage.getItem("csx_intro_seen");
    if (seen === "true") {
      setIntroFinished(true);
    }
  }, []);

  return (
    <>
      <StarField />
      <AnimatePresence>
        {!introFinished && (
          <IntroSequence onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {introFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen flex flex-col z-10 overflow-x-hidden selection:bg-pulsar-lavender/30"
          >
            <Navbar />
            <main className="flex-grow">
              <HeroSection />
              <FeaturesSection />
              <MarqueeTicker direction="left" />
              <RoadmapSection />
              <MarqueeTicker direction="right" />
              <WaitlistSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AboutPage() {
  useLenis();
  return (
    <>
      <StarField />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative min-h-screen flex flex-col z-10 overflow-x-hidden selection:bg-pulsar-lavender/30"
      >
        <Navbar />
        <main className="flex-grow">
          <TeamSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-space-black flex items-center justify-center text-starlight-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-on-surface-variant">Page not found</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
