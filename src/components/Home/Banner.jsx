import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiActivity, FiLayers, FiCode } from "react-icons/fi";

const Banner = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#03000a] flex items-center justify-center overflow-hidden pt-20">
      {/* Abstract Glowing Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-600/10 rounded-full filter blur-[80px] md:blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-fuchsia-600/10 rounded-full filter blur-[80px] md:blur-[100px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copy and Actions */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          {/* Neon Purple Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>EduConnect Pro v2.0</span>
          </motion.div>

          {/* Majestic Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
          >
            Learn at the Speed of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 shadow-sm">
              Innovation
            </span>
          </motion.h1>

          {/* Core Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-purple-200/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            Master code, design, and AI with our next-generation learning platform. 
            Connect with expert instructors, track your progress on interactive dashboards, and fast-track your tech career.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link
              to="/all-classes"
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
            >
              <span>Explore Classes</span>
              <FiArrowRight />
            </Link>
            <Link
              to="/TeachOnWebsite"
              className="w-full sm:w-auto px-6 py-3.5 bg-transparent text-purple-200 border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-950/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>Teach on EduConnect</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Interactive Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative w-full max-w-md mx-auto"
        >
          {/* Neon Ambient Glow Ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-fuchsia-500/20 rounded-2xl filter blur-2xl z-0" />

          {/* Mock Window Container */}
          <div className="relative z-10 w-full bg-[#0c0a12]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Header / Window Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#07050a] border-b border-purple-950/50">
              <div className="flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase">learning_panel.jsx</span>
              <span className="w-6" />
            </div>

            {/* Inner Dashboard View */}
            <div className="p-5 space-y-5">
              {/* Row 1: Course Summary */}
              <div className="flex items-center gap-3 bg-[#110e1a]/80 p-3.5 rounded-xl border border-purple-500/10">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                  <FiLayers size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate">Advanced React Path</h4>
                  <p className="text-[10px] text-purple-300/60 truncate">Instructor: Dr. Sarah Jane</p>
                </div>
                <span className="text-xs font-bold text-purple-400">78%</span>
              </div>

              {/* Progress Slider (animated) */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-purple-300/50 font-mono">
                  <span>MODULE 4 OF 6</span>
                  <span>14h remaining</span>
                </div>
                <div className="w-full h-2 bg-purple-950/40 rounded-full overflow-hidden border border-purple-900/20">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
                  />
                </div>
              </div>

              {/* Row 3: Stats Panel */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#110e1a]/50 p-3 rounded-xl border border-purple-500/5 flex flex-col justify-center">
                  <span className="text-[10px] text-purple-300/40 uppercase tracking-wider font-semibold font-mono">XP Earned</span>
                  <span className="text-lg font-bold text-white mt-0.5">2,450 XP</span>
                </div>
                <div className="bg-[#110e1a]/50 p-3 rounded-xl border border-purple-500/5 flex flex-col justify-center">
                  <span className="text-[10px] text-purple-300/40 uppercase tracking-wider font-semibold font-mono">Coding Hours</span>
                  <span className="text-lg font-bold text-white mt-0.5">48.2 hrs</span>
                </div>
              </div>

              {/* Row 4: Live Output Console */}
              <div className="bg-[#07050a] p-3 rounded-xl border border-purple-950/80 font-mono text-[9px] text-purple-400 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-300/70">
                  <FiCode size={11} className="text-fuchsia-400" />
                  <span>console.log("Welcome to EduConnect");</span>
                </div>
                <div className="text-green-400/80">&gt; Compiled successfully.</div>
                <div className="text-purple-300/40">&gt; Initializing learning dashboard hooks... done.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
