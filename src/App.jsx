import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Github, Linkedin, ExternalLink, FileText, Download } from "lucide-react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();

  // Premium background transitions (adjusted for theme)
  const lightBg = ["#FFFFFF", "#F8F9FA", "#FDF5E6", "#ECEFEC", "#FEFFFC", "#F5F6F7"];
  const darkBg = ["#0F1113", "#1A1C1E", "#16181A", "#1C1E20", "#141618", "#111416"];
  
  const background = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    isDarkMode ? darkBg : lightBg
  );

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Grounded loading sequence duration
    const timer = setTimeout(() => setLoading(false), 3500);
    const scrollListener = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", scrollListener);
    
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", scrollListener);
      lenis.destroy();
    };
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  if (loading) {
    return <GroundedLoader />;
  }

  return (
    <motion.div 
      style={{ background }} 
      className={`font-inter min-h-screen selection:bg-indigo-100 transition-colors duration-700 ${isDarkMode ? 'text-gray-300' : 'text-[#2B2E33]'}`}
    >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-3xl -z-10 ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50/50'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full blur-3xl -z-10 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50/50'}`} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl text-center"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full ${isDarkMode ? 'text-indigo-400 bg-indigo-950/50' : 'text-indigo-600 bg-indigo-50'}`}
          >
            Full Stack Engineer | New Delhi
          </motion.span>
          
          <h1 className={`text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-[1.1] ${isDarkMode ? 'text-white' : 'text-[#1A1C1E]'}`}>
            Md <span className="text-indigo-600">Rehanul</span> Haque.
          </h1>

          <p className={`max-w-2xl mx-auto text-xl mb-12 leading-relaxed font-medium ${isDarkMode ? 'text-gray-400' : 'text-[#7B7F85]'}`}>
            Full Stack Developer with 4 years of hands-on experience building and maintaining production-grade MERN applications, 
            including EV charging platforms and identity management systems. Experienced in solving real-time issues related to 
            API failures, performance bottlenecks, and role-based access control in multi-user systems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#projects"
              className={`px-10 py-4 rounded-xl font-medium transition-all shadow-xl ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-900/20' : 'bg-[#1A1C1E] text-white hover:bg-black shadow-indigo-100'}`}
            >
              Examine Work
            </a>
            <a
              href="/Md_Rehaul_Haque_full_stack.pdf"
              download
              className={`px-10 py-4 rounded-xl font-medium border transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500' : 'border-[#E7EAE5] bg-white hover:border-[#C1C4C8]'}`}
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex justify-center gap-8 text-sm font-semibold text-[#7B7F85]">
            <a href="https://www.linkedin.com/in/rehanul-haque" target="_blank" className="hover:text-indigo-600 transition flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-indigo-500/70" />
              LinkedIn
            </a>
            <a href="https://github.com/Rehan72" target="_blank" className="hover:text-indigo-600 transition flex items-center gap-2">
              <Github className="w-5 h-5 text-indigo-500/70" />
              GitHub
            </a>
            <a href="https://rehanulportfolio.netlify.app" target="_blank" className="hover:text-indigo-600 transition flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-indigo-500/70" />
              Old Portfolio
            </a>
          </div>
        </motion.div>
      </section>

      {/* METRICS */}
      <section className={`py-20 border-y backdrop-blur-sm ${isDarkMode ? 'border-gray-800 bg-gray-900/30' : 'border-[#ECEFEC]/50 bg-white/30'}`}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <Metric label="Experience" value="4 Years" isDarkMode={isDarkMode} />
          <Metric label="Latency Reduction" value="30%" isDarkMode={isDarkMode} />
          <Metric label="UI Defect Reduction" value="20%" isDarkMode={isDarkMode} />
          <Metric label="Enterprise Apps" value="5+" isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* SERVICES SECTION - NEW */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-4xl font-bold tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-[#1A1C1E]'}`}>Specialized Services</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              title="Full Stack Architecture"
              description="Design and implementation of robust MERN architectures tailored for efficiency and long-term scalability."
              icon="🏗️"
              isDarkMode={isDarkMode}
            />
            <ServiceCard 
              title="API Design & Auth"
              description="Building secure, RESTful API layers with JWT authentication, role-based access, and microservices integration."
              icon="🔐"
              isDarkMode={isDarkMode}
            />
            <ServiceCard 
              title="UI/UX Engineering"
              description="Crafting high-performance web interfaces using React/Angular with a focus on speed, aesthetics, and user impact."
              icon="🎨"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-4xl font-bold tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-[#1A1C1E]'}`}>Professional Journey</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="space-y-12 relative">
            <TimelineItem 
              year="Jan 2021 - Present"
              title="Software Engineer"
              company="Samin TekMindz India Pvt. Ltd."
              isDarkMode={isDarkMode}
              description={[
                "Engineered the Sparke EV Charging core modules, significantly boosting system availability.",
                "Reduced dashboard latency by 30% through advanced memoization and lazy-loading techniques.",
                "Integrated multi-vendor OCPP protocols for seamless charging cluster management.",
                "Mentored junior developers and established standardized code review practices."
              ]}
            />
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-32">
        <div className={`max-w-6xl mx-auto px-6 ${isDarkMode ? 'bg-gray-900/20' : 'bg-white/50'} py-20 rounded-[40px]`}>
          <div className="mb-20 text-center">
            <h2 className={`text-4xl font-bold tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-[#1A1C1E]'}`}>Production Exhibits</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-[#7B7F85]'} text-lg max-w-2xl mx-auto`}>
              High-availability systems built for performance, security, and industrial reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <DetailedProjectItem 
              title="AssetWork"
              category="EV Charging Management (Live)"
              date="Angular Era"
              description="A multi-vendor EV charging diagnostic platform managing thousands of sessions globally."
              features={["Unified Diagnostics", "Reporting Engine", "Multi-tenant Support"]}
              tech={["Angular", "TypeScript", "REST"]}
              isDarkMode={isDarkMode}
            />
            <DetailedProjectItem 
              title="Sparke"
              category="EV Enterprise (Live)"
              date="React Era"
              description="Industrial dashboard for real-time monitoring of charging power loads and transaction flows."
              features={["Live Load Tracking", "Redux State Management", "Custom Auth"]}
              tech={["React.js", "Redux", "Tailwind"]}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-32">
        <div className={`max-w-6xl mx-auto px-6 py-24 rounded-[40px] ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-[#1A1C1E]'}`}>
          <h2 className="text-4xl font-bold mb-20 tracking-tight text-center text-white">Advanced System Stack</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <SkillCategory title="Frontend" items={["React / Next.js", "Angular", "TypeScript", "Framer Motion"]} />
            <SkillCategory title="Backend" items={["Node / Express", "REST / JSON", "JWT Security", "WebSockets"]} />
            <SkillCategory title="Data" items={["MongoDB", "SQL Basics", "Redis Cache", "Data Modeling"]} />
            <SkillCategory title="Tools" items={["Docker", "Git / CI", "AWS Basics", "Jest / Unit Testing"]} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-20 border-t ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-[#ECEFEC]'}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h3 className={`text-2xl font-bold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-[#1A1C1E]'}`}>REHANUL.HQ</h3>
            <p className={`${isDarkMode ? 'text-gray-500' : 'text-[#7B7F85]'} text-sm`}>Crafting the future of full-stack engineering.</p>
          </div>
          <div className={`flex gap-8 text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-[#7B7F85]'}`}>
            <a href="#home" className="hover:text-indigo-600 transition">Identity</a>
            <a href="#services" className="hover:text-indigo-600 transition">Services</a>
            <a href="#projects" className="hover:text-indigo-600 transition">Exhibits</a>
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            © 2026 Md Rehanul Haque. <br className="md:hidden" /> All engineering rights reserved.
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-indigo-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Navbar({ isDarkMode, toggleTheme }) {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 font-inter">
      <div className={`max-w-6xl mx-auto flex justify-between items-center backdrop-blur-xl border px-8 py-4 rounded-2xl shadow-sm transition-all ${isDarkMode ? 'bg-black/60 border-gray-800' : 'bg-white/70 border-white/20'}`}>
        <div className={`font-bold text-xl tracking-tighter cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`} onClick={() => window.scrollTo(0,0)}>
          REHANUL.HQ
        </div>
        
        <div className={`hidden md:flex gap-8 text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-[#7B7F85]'}`}>
          <a href="#home" className={`hover:scale-105 transition ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Identity</a>
          <a href="#services" className={`hover:scale-105 transition ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Services</a>
          <a href="#experience" className={`hover:scale-105 transition ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Journey</a>
          <a href="#projects" className={`hover:scale-105 transition ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Exhibits</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          <a 
            href="/Md_Rehaul_Haque_full_stack.pdf"
            download
            className={`hidden lg:flex px-6 py-2 rounded-lg text-sm font-bold transition shadow-sm items-center gap-2 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#1A1C1E] text-white hover:bg-black'}`}
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

function Metric({ label, value, isDarkMode }) {
  return (
    <div className="space-y-1">
      <div className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1C1E]'}`}>{value}</div>
      <div className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-[#7B7F85]'}`}>{label}</div>
    </div>
  );
}

function ServiceCard({ title, description, icon, isDarkMode }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`p-10 rounded-3xl border transition-all ${isDarkMode ? 'bg-gray-900/50 border-gray-800 hover:border-indigo-500/50 shadow-2xl' : 'bg-white border-[#ECEFEC] hover:border-indigo-200 shadow-sm'}`}
    >
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className={`text-xl font-bold mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-[#7B7F85]'}`}>{description}</p>
    </motion.div>
  );
}

function TimelineItem({ year, title, company, description, isDarkMode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-10 rounded-3xl border transition-colors ${isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-[#ECEFEC] shadow-sm'}`}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
        <div>
          <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1A1C1E]'}`}>{title}</h3>
          <span className="text-lg font-semibold text-indigo-600 uppercase tracking-wider">{company}</span>
        </div>
        <time className={`font-bold text-sm px-4 py-1.5 rounded-full mt-4 md:mt-0 ${isDarkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>{year}</time>
      </div>
      <ul className="space-y-4">
        {description.map((bullet, idx) => (
          <li key={idx} className="flex gap-4 text-sm md:text-base leading-relaxed">
            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
            <span className={isDarkMode ? 'text-gray-400' : 'text-[#7B7F85]'}>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function DetailedProjectItem({ title, category, date, description, features, tech, isDarkMode }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`p-10 rounded-3xl border transition-all flex flex-col ${isDarkMode ? 'bg-gray-950 border-gray-800 hover:border-indigo-900 shadow-2xl' : 'bg-white border-[#ECEFEC] hover:border-indigo-100 shadow-sm'}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{category}</div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded italic ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>{date}</span>
      </div>
      <h3 className={`text-2xl font-bold mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</h3>
      <p className={`mb-8 flex-grow ${isDarkMode ? 'text-gray-400' : 'text-[#7B7F85]'}`}>{description}</p>
      
      <div className="mb-8 space-y-3">
        {features.map((f) => (
          <div key={f} className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            {f}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${isDarkMode ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-900/50' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function GroundedLoader() {
  const [step, setStep] = useState(0);
  const logs = [
    "Checking production clusters...",
    "Initializing Sparke EV state machines...",
    "Hardening JWT & RBAC middleware...",
    "Optimizing multi-vendor API diagnostics...",
    "Resolving Redux state bottlenecks...",
    "Finalizing production handshake...",
    "System stable. Deploying exhibits."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <div className="h-screen bg-[#0F1113] flex flex-col items-center justify-center p-6 font-mono">
      <div className="max-w-md w-full">
        {/* Branding */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 text-center"
        >
          <h2 className="text-indigo-500 text-sm tracking-[0.3em] font-bold uppercase mb-2">System Init</h2>
          <h1 className="text-white text-2xl font-bold tracking-tighter">REHANUL.HQ_v4.0</h1>
        </motion.div>

        {/* Terminal Window */}
        <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="flex gap-1.5 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>

          <div className="space-y-2 min-h-[120px]">
            {logs.slice(0, step + 1).map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 text-xs md:text-sm"
              >
                <span className="text-gray-600">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
                <span className={i === step ? "text-indigo-400" : "text-gray-400"}>
                  {i === step ? "> " : "✓ "}
                  {log}
                </span>
              </motion.div>
            ))}
            {step < logs.length - 1 && (
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-indigo-500 inline-block ml-11"
              />
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 bg-gray-900 h-1 w-full rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / logs.length) * 100}%` }}
            className="h-full bg-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

function SkillCategory({ title, items }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-gray-400 text-sm font-medium group">
            <div className="w-1 h-1 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
            <span className="group-hover:text-white transition-colors">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
