import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSend } from "react-icons/io5";

const GeminiUi = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://edu-connect-server-ebon.vercel.app/geminiBot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      const aiText =
        typeof data.response === "string"
          ? data.response
          : data.response?.text || "No response from AI.";

      const aiMessage = { text: aiText, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong. Please try again later.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileTap={{ scale: 0.9, rotate: 15 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-fuchsia-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.45)] text-white text-2xl flex items-center justify-center border border-purple-500/25 cursor-pointer"
      >
        💬
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 w-[400px] h-[75vh] bg-[#0c0a12] rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.25)] overflow-hidden z-50 border border-purple-500/20"
          >
            {/* Background Layers */}
            <div className="absolute inset-0 bg-black/75 z-0 rounded-2xl" />
            <div
              className="absolute inset-0 bg-cover bg-center z-[-1] brightness-50"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/ddrkuksmu/image/upload/v1745513325/Bot_s0qjm7.jpg')",
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-2 border-b border-purple-950 pb-2">
                <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                  EduConnect AI Chat
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-purple-400 hover:text-purple-300 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-purple-900/30"
              >
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={`p-3 rounded-xl max-w-[80%] text-sm border ${
                      msg.sender === "user"
                        ? "bg-purple-600 border-purple-500 text-right self-end ml-auto text-white"
                        : "bg-[#110e1a]/85 border-purple-950 text-left self-start mr-auto text-purple-200"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}

                {/* Loading animation */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-xl max-w-[80%] bg-[#110e1a]/85 border border-purple-950 text-left self-start mr-auto text-purple-200 flex items-center gap-2"
                  >
                    <img
                      src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Gemini"
                      alt="AI Avatar"
                      className="w-6 h-6 rounded-full border border-purple-500/20 bg-purple-500/10"
                    />
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleGenerate}
                className="mt-2 flex gap-2 items-center border-t border-purple-950 pt-2"
              >
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-lg bg-[#110e1a]/80 text-white border border-purple-500/20 focus:border-purple-500/60 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="text-purple-400 text-2xl hover:text-purple-300 disabled:opacity-50 cursor-pointer"
                >
                  <IoSend />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeminiUi;
