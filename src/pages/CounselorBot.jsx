import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ChevronDown, GraduationCap, Globe, FileText, DollarSign, Plane, BookOpen } from "lucide-react";

/* ─────────────────────────────────────────────
   PRE-LOADED KNOWLEDGE BASE
───────────────────────────────────────────────*/
const KNOWLEDGE_BASE = [
  { id: "lo-1", question: "What is Learn Overseas?", answer: "Learn Overseas is a premium study-abroad consultancy based in India. We guide students from 60+ cities across every step of their international education journey — from choosing the right university to landing in your dream country. With 200+ global university partnerships and a 99% visa success rate, we are India's most trusted gateway to global education.", tags: ["general", "about"] },
  { id: "lo-2", question: "Which countries does Learn Overseas cover?", answer: "We have active programmes and partnerships in the USA, UK, Canada, Australia, Germany, Ireland, New Zealand, France, Netherlands, Singapore, Dubai, and more. Each destination has curated university lists, scholarship data, and visa processing support managed by our in-house country specialists.", tags: ["countries", "destinations"] },
  { id: "lo-3", question: "How do I start my study abroad journey with Learn Overseas?", answer: "Step 1: Book a free counselling session via our website or WhatsApp.\nStep 2: Our counsellor analyses your academic profile, budget, and goals.\nStep 3: We shortlist the best universities and programmes for you.\nStep 4: Our team handles your application, SOP, LORs, and document prep.\nStep 5: We manage your visa filing, pre-departure briefing, and airport assistance.", tags: ["getting started", "process"] },
  { id: "adm-1", question: "What is the typical eligibility to study abroad?", answer: "Eligibility varies by country and programme:\n• USA/Canada/UK: 60-70% in 12th, IELTS 6.0-7.0 or TOEFL 80-100\n• Germany: 70%+ in 12th, no language requirement for English-taught courses\n• Australia: 65%+ with IELTS 6.0+\n• Ireland/New Zealand: 55%+ with IELTS 6.0+\nWe assess your profile and find the best fit even if your scores are borderline.", tags: ["eligibility", "admissions", "academics"] },
  { id: "adm-2", question: "Do I need IELTS or TOEFL? Which one is better?", answer: "Most universities accept both.\n• IELTS is preferred in UK, Australia, Canada, and New Zealand.\n• TOEFL is preferred by US and some European institutions.\n• IELTS Academic: Required band 6.0-7.0 depending on course.\n• TOEFL iBT: Scores of 80-100 are typically required.\nWe advise students based on their target country and connect them with trusted coaching partners.", tags: ["tests", "ielts", "toefl", "language"] },
  { id: "adm-3", question: "What is GRE / GMAT and do I need it?", answer: "GRE is required for Masters programmes at most US universities. GMAT is for MBA applications globally. Not all universities require them — many in UK, Canada, and Australia offer waivers for strong academics or work experience. Our counsellors tell you exactly which tests to take for your shortlisted universities.", tags: ["gre", "gmat", "masters", "mba"] },
  { id: "adm-4", question: "What documents are needed for university application?", answer: "Standard documents include:\n1. Academic transcripts & certificates (10th, 12th, UG if applicable)\n2. Passport copy (valid for at least 2 years)\n3. English test scores (IELTS/TOEFL)\n4. Statement of Purpose (SOP)\n5. Letters of Recommendation (LOR) — usually 2-3\n6. CV / Resume\n7. Work experience letter (for MBA/PG with work-ex requirement)\nLearn Overseas assists in drafting all of these to the highest standard.", tags: ["documents", "sop", "lor", "application"] },
  { id: "adm-5", question: "What is a Statement of Purpose (SOP) and how do I write a good one?", answer: "A Statement of Purpose is a personal essay (600-1000 words) explaining why you want to study a particular programme, your academic background, career goals, and why you chose that university. A strong SOP is:\n• Authentic and specific — not generic\n• Structured: academics → experience → why this course → why this university → goals\n• Free of grammatical errors\nOur expert SOP writers at Learn Overseas craft personalised SOPs that have secured admits to Oxford, MIT, Caltech, and top-50 globally ranked universities.", tags: ["sop", "documents", "application"] },
  { id: "fin-1", question: "How much does it cost to study abroad?", answer: "Annual costs (tuition + living) by destination (approx.):\n• USA: Rs 25-60 lakh/year\n• UK: Rs 20-45 lakh/year\n• Canada: Rs 18-35 lakh/year\n• Australia: Rs 18-38 lakh/year\n• Germany (public): Rs 2-6 lakh/year (mostly living costs)\n• Ireland: Rs 18-30 lakh/year\n• New Zealand: Rs 15-28 lakh/year\nScholarships can offset 20-100% of costs. Learn Overseas has helped students collectively save M+ in scholarships.", tags: ["cost", "finances", "budget"] },
  { id: "fin-2", question: "What scholarships are available for Indian students?", answer: "Popular scholarships for Indian students:\n• Chevening Scholarship (UK) — full funding, competitive\n• Commonwealth Scholarship (UK/Canada/Australia)\n• DAAD Scholarship (Germany) — full or partial\n• Fulbright-Nehru Fellowship (USA)\n• Australia Awards Scholarship\n• University-specific merit scholarships (most top-100 universities offer these)\nLearn Overseas has a dedicated Scholarships Cell that identifies and applies to 50+ scholarships relevant to each student's profile.", tags: ["scholarships", "funding", "finances"] },
  { id: "fin-3", question: "Can I get an education loan to study abroad?", answer: "Yes! Education loans are widely available:\n• Public banks: SBI Global Ed-Vantage (up to Rs 1.5 cr), Bank of Baroda, Canara Bank\n• Private: HDFC Credila, Avanse, Auxilo — no collateral up to Rs 40 lakh for top universities\n• NBFCs: Prodigy Finance (no collateral for top 500 global universities)\nLearn Overseas partners with leading loan providers and can expedite your loan process.", tags: ["loan", "finances", "funding"] },
  { id: "vis-1", question: "What is the visa process for studying abroad?", answer: "The visa process varies by country:\n• UK: Apply for Student Visa after receiving CAS from university\n• USA: F-1 Student Visa via online DS-160 form + embassy interview\n• Canada: Study Permit application online — SDS stream is fastest\n• Australia: Student Visa (Subclass 500) via ImmiAccount\n• Germany: Apply at German consulate with admission letter + funds proof\nLearn Overseas has a 99% visa success rate and our OISC-registered visa team handles your entire visa filing.", tags: ["visa", "process"] },
  { id: "vis-2", question: "How much funds do I need to show for a student visa?", answer: "Funds required (approx.) in your bank account:\n• USA (F-1): 1 year of total expenses = Rs 25-60 lakh\n• UK: 9 months living costs (~GBP 1,023/month London)\n• Canada: Tuition for 1st year + CAD 10,000 living\n• Australia: 1 year tuition + AUD 21,041 living\n• Germany: EUR 11,208 blocked amount in Sperrkonto account\nLearn Overseas helps you prepare all financial documentation.", tags: ["visa", "funds", "finances"] },
  { id: "vis-3", question: "What is the Student Direct Stream (SDS) for Canada?", answer: "SDS is a fast-track Canadian study permit for eligible countries including India. Processing time: 20 days (vs 8+ weeks regular). Requirements:\n• Acceptance letter from a Designated Learning Institution (DLI)\n• IELTS overall 6.0 (no band below 6.0)\n• Guaranteed Investment Certificate (GIC) of CAD 10,000\n• Medical exam done upfront\nMost of our Canada-bound students qualify for SDS and we guide them through it.", tags: ["visa", "canada", "sds"] },
  { id: "asp-1", question: "What is the Aspire Plan? What does it include?", answer: "The Aspire Plan is Learn Overseas's flagship end-to-end study-abroad package covering:\n1. Profile Assessment & University Shortlisting\n2. SOP & LOR Drafting (unlimited revisions)\n3. University Application Filing & Follow-ups\n4. Scholarship Research & Applications\n5. Visa Documentation & Filing (guaranteed)\n6. Pre-Departure Orientation\n7. Airport Assistance & Partner Housing Support\n\nPlans:\n• Aspire — Rs 38,800 (standard package)\n• Aspire Plus+ — Rs 72,800 (priority processing, dedicated counsellor, guaranteed admission or refund guarantee)", tags: ["aspire", "packages", "pricing"] },
  { id: "dest-1", question: "Why should I study in the UK?", answer: "The UK offers 1-1.5 year Masters programmes (shorter = cheaper than USA), world-class universities (Oxford, Cambridge, LSE, Imperial), a 2-year Post-Study Work Visa (Graduate Route), and globally respected degrees. Popular courses: Business, Law, Data Science, Medicine, Engineering. Learn Overseas has partnered with 35+ UK universities.", tags: ["uk", "destinations"] },
  { id: "dest-2", question: "Why should I study in Canada?", answer: "Canada is the top choice for immigration-minded students. Benefits:\n• PR-friendly pathways (Express Entry, PNP)\n• 3-year Post-Graduation Work Permit (PGWP)\n• Affordable tuition, multicultural environment\n• High quality of life\nKey provinces: Ontario, BC, Alberta. Learn Overseas has 40+ Canadian university partners.", tags: ["canada", "destinations", "pr"] },
  { id: "dest-3", question: "Why should I study in Germany?", answer: "Germany is the best choice for budget-conscious students. Public universities charge only a semester fee (~EUR 250-500) — no tuition fee! Requirements: German language (B2/C1) for German-taught courses, or IELTS for English-taught courses. Germany offers an 18-month job-search visa after graduation. Learn Overseas has specialist Germany counsellors.", tags: ["germany", "destinations", "budget"] },
  { id: "dest-4", question: "Is studying in Australia good for PR and career?", answer: "Australia is excellent for both career and PR:\n• 2-4 year Temporary Graduate Visa (485) post-study\n• Skills shortage occupation lists favour engineering, healthcare, IT, and trade\n• High minimum wage (AUD 23.23/hour part-time allowed)\n• State Nomination (Subclass 190) offers additional PR points\nLearn Overseas has placement support through partner network in Sydney, Melbourne, and Brisbane.", tags: ["australia", "destinations", "pr"] },
  { id: "tim-1", question: "How early should I start my study abroad application?", answer: "We recommend starting at least 12-18 months before your intended intake:\n• 18 months before: Begin English test preparation\n• 12 months before: Profile assessment, university shortlisting\n• 10 months before: SOP & LOR drafting, document collection\n• 8 months before: Submit university applications\n• 6 months before: Accept offer letter, apply for visa\n• 3 months before: Pre-departure orientation, accommodation, forex\nFor Jan intakes, start by March. For Sep intakes, start by October the previous year.", tags: ["timeline", "process", "planning"] },
  { id: "tim-2", question: "What are the two main intakes for international universities?", answer: "Most universities have two primary intakes:\n• September/October Intake (Fall): Main intake — highest number of universities open, best scholarship availability. Applications open Jan-May.\n• January/February Intake (Winter): Smaller intake — not all programmes available. Good for students who missed the Fall deadline. Applications open Aug-Nov.\nSome countries (e.g., Australia) also have a February/July intake system.", tags: ["intake", "timeline"] },
];

const CATEGORIES = [
  { id: "all", label: "All Topics", icon: "Sparkles" },
  { id: "general", label: "About Learn Overseas", icon: "Globe" },
  { id: "admissions", label: "Admissions & Tests", icon: "GraduationCap" },
  { id: "documents", label: "Documents & SOP", icon: "FileText" },
  { id: "finances", label: "Fees & Scholarships", icon: "DollarSign" },
  { id: "visa", label: "Visa & Immigration", icon: "Plane" },
  { id: "destinations", label: "Study Destinations", icon: "Globe" },
  { id: "aspire", label: "Aspire Plan", icon: "BookOpen" },
];

const CATEGORY_TAGS = {
  all: [],
  general: ["general", "about", "getting started", "process"],
  admissions: ["eligibility", "admissions", "academics", "tests", "ielts", "toefl", "language", "gre", "gmat", "masters", "mba"],
  documents: ["documents", "sop", "lor", "application"],
  finances: ["cost", "finances", "budget", "scholarships", "funding", "loan"],
  visa: ["visa", "process", "funds", "canada", "sds"],
  destinations: ["countries", "destinations", "uk", "canada", "germany", "australia", "pr"],
  aspire: ["aspire", "packages", "pricing"],
};

const ICON_MAP = { Sparkles, Globe, GraduationCap, FileText, DollarSign, Plane, BookOpen };

const QUICK_REPLIES = [
  "How do I start my application?",
  "What is the Aspire Plan?",
  "Canada or UK — which is better?",
  "What scholarships are available?",
  "Do I need IELTS?",
  "How much does it cost to study in Germany?",
];

function findBestAnswer(query) {
  const q = query.toLowerCase();
  const scored = KNOWLEDGE_BASE.map(item => {
    let score = 0;
    const queryWords = q.split(/\s+/).filter(w => w.length > 2);
    queryWords.forEach(word => {
      if (item.question.toLowerCase().includes(word)) score += 3;
      if (item.answer.toLowerCase().includes(word)) score += 1;
      if (item.tags.some(t => t.includes(word) || word.includes(t))) score += 2;
    });
    if (item.question.toLowerCase().includes(q.slice(0, 15))) score += 5;
    return { ...item, score };
  });
  const best = scored.sort((a, b) => b.score - a.score);
  if (best[0].score < 2) {
    return {
      answer: "That is a great question! While I do not have a specific answer pre-loaded for that, our expert counsellors at Learn Overseas would love to help you.\n\nBook a free session via the Contact page, or WhatsApp us directly. Our team typically responds within 2 hours on business days.",
      confidence: "low",
      relatedIds: best.slice(0, 2).map(b => b.id),
    };
  }
  return { answer: best[0].answer, confidence: best[0].score > 6 ? "high" : "medium", relatedIds: best.slice(1, 3).map(b => b.id) };
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 18px" }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent-gold)" }} />
      ))}
    </div>
  );
}

function FormattedAnswer({ text }) {
  const lines = text.split("\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {lines.map((line, i) => {
        if (!line.trim()) return null;
        return (
          <div key={i} style={{ lineHeight: 1.65, fontSize: 14 }}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

export default function CounselorBot() {
  const [messages, setMessages] = useState([{
    id: "welcome", role: "bot",
    content: "Hello! I am ARIA, your AI Study Counsellor from Learn Overseas.\n\nI have detailed knowledge about studying abroad — universities, visa processes, scholarships, country guides, and our Aspire Plan.\n\nAsk me anything, or click a question from the sidebar!",
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    const userMsg = { id: "u-" + Date.now(), role: "user", content: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setShowQuick(false);
    const delay = 800 + Math.random() * 600;
    await new Promise(r => setTimeout(r, delay));
    const result = findBestAnswer(trimmed);
    setIsTyping(false);
    const botMsg = { id: "b-" + Date.now(), role: "bot", content: result.answer, relatedIds: result.relatedIds, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
  }, [input]);

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const filteredFaqs = activeCategory === "all"
    ? KNOWLEDGE_BASE
    : KNOWLEDGE_BASE.filter(item => item.tags.some(tag => CATEGORY_TAGS[activeCategory]?.includes(tag)));

  const getRelatedItems = (ids) => KNOWLEDGE_BASE.filter(item => ids?.includes(item.id));

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-dark)", paddingTop: 90, fontFamily: "var(--font-sans)" }}>

      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", padding: "48px 24px 32px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 350, background: "radial-gradient(ellipse at center, rgba(249,212,64,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 100, border: "1px solid rgba(249,212,64,0.3)", background: "rgba(249,212,64,0.06)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--accent-gold)", textTransform: "uppercase", marginBottom: 20 }}>
            <Sparkles size={12} /> AI-Powered Study Counsellor
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.15, marginBottom: 14 }}>
            Ask ARIA, Your<br /><span style={{ color: "var(--accent-gold)" }}>Study-Abroad Counsellor</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Instant answers on universities, visas, scholarships, countries, and the Aspire Plan — backed by Learn Overseas\'s 10+ years of expertise.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 36, flexWrap: "wrap" }}>
          {[{ val: "18+", label: "Topics covered" }, { val: "99%", label: "Visa success rate" }, { val: "200+", label: "Partner universities" }, { val: "24/7", label: "Bot availability" }].map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--accent-gold)" }}>{val}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.05em" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px", display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, alignItems: "start" }}>

        {/* LEFT SIDEBAR */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ position: "sticky", top: 100, border: "1px solid var(--border-light)", borderRadius: 20, overflow: "hidden", background: "rgba(10,10,15,0.8)" }}>
          <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border-light)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--accent-gold)", textTransform: "uppercase", marginBottom: 4 }}>Browse Topics</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{filteredFaqs.length} questions loaded</div>
          </div>
          <div style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>
            {CATEGORIES.map(cat => {
              const Icon = ICON_MAP[cat.icon];
              const isActive = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left", background: isActive ? "rgba(249,212,64,0.1)" : "transparent", color: isActive ? "var(--accent-gold)" : "var(--text-secondary)", fontSize: 13, fontWeight: isActive ? 600 : 400, transition: "all 0.2s", marginBottom: 2, fontFamily: "var(--font-sans)" }}>
                  <Icon size={14} /> {cat.label}
                </button>
              );
            })}
          </div>
          <div style={{ maxHeight: 400, overflowY: "auto", padding: "8px 0" }}>
            {filteredFaqs.map(faq => (
              <div key={faq.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <button onClick={() => sendMessage(faq.question)} style={{ width: "100%", padding: "12px 16px", border: "none", cursor: "pointer", textAlign: "left", background: "transparent", color: "var(--text-secondary)", fontSize: 12.5, lineHeight: 1.5, fontFamily: "var(--font-sans)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: "var(--accent-gold)", marginTop: 1, flexShrink: 0, fontWeight: 700 }}>Q</span>
                  <span style={{ flex: 1 }}>{faq.question}</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CHAT */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", height: 680, border: "1px solid var(--border-light)", borderRadius: 24, overflow: "hidden", background: "rgba(6,6,10,0.95)", position: "sticky", top: 100 }}>

          {/* Chat header */}
          <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: 14, background: "rgba(10,10,16,0.9)", flexShrink: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent-gold), #D4803A)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
              <Bot size={22} color="#000" />
              <div style={{ position: "absolute", bottom: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid #06060a" }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>ARIA — AI Study Counsellor</div>
              <div style={{ fontSize: 12, color: "#22c55e", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                Online · Learn Overseas
              </div>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-muted)", textAlign: "right" }}>
              <div>Powered by</div>
              <div style={{ color: "var(--accent-gold)", fontWeight: 600 }}>Learn Overseas AI</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
            <AnimatePresence initial={false}>
              {messages.map(msg => {
                const isBot = msg.role === "bot";
                const related = getRelatedItems(msg.relatedIds);
                return (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", flexDirection: isBot ? "row" : "row-reverse", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: isBot ? "linear-gradient(135deg, var(--accent-gold), #D4803A)" : "rgba(125,193,177,0.15)", border: isBot ? "none" : "1px solid rgba(125,193,177,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {isBot ? <Bot size={17} color="#000" /> : <User size={17} color="var(--accent-blue)" />}
                    </div>
                    <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ padding: "14px 18px", borderRadius: isBot ? "4px 18px 18px 18px" : "18px 4px 18px 18px", background: isBot ? "rgba(20,20,28,0.9)" : "rgba(249,212,64,0.07)", border: isBot ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(249,212,64,0.2)", color: "var(--text-primary)", fontSize: 14, lineHeight: 1.65 }}>
                        <FormattedAnswer text={msg.content} />
                      </div>
                      {isBot && related.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Related:</span>
                          {related.map(r => (
                            <button key={r.id} onClick={() => sendMessage(r.question)} style={{ fontSize: 11.5, padding: "4px 12px", borderRadius: 100, border: "1px solid rgba(249,212,64,0.25)", background: "rgba(249,212,64,0.05)", color: "var(--accent-gold)", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.2s" }}>
                              {r.question.length > 42 ? r.question.slice(0, 42) + "…" : r.question}
                            </button>
                          ))}
                        </div>
                      )}
                      <div style={{ fontSize: 10.5, color: "var(--text-muted)", textAlign: isBot ? "left" : "right", paddingLeft: isBot ? 4 : 0, paddingRight: isBot ? 0 : 4 }}>
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent-gold), #D4803A)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Bot size={17} color="#000" />
                  </div>
                  <div style={{ background: "rgba(20,20,28,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px 18px 18px 18px" }}>
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showQuick && messages.length === 1 && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 46 }}>
                  {QUICK_REPLIES.map(q => (
                    <button key={q} onClick={() => sendMessage(q)} style={{ padding: "8px 16px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,212,64,0.4)"; e.currentTarget.style.color = "var(--accent-gold)"; e.currentTarget.style.background = "rgba(249,212,64,0.06)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border-light)", background: "rgba(10,10,16,0.95)", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "10px 12px 10px 18px" }}>
              <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Ask about universities, visas, scholarships, Aspire Plan..." rows={1}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 14, lineHeight: 1.5, fontFamily: "var(--font-sans)", resize: "none", maxHeight: 100, overflowY: "auto" }} />
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => sendMessage()} disabled={!input.trim() || isTyping}
                style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, border: "none", cursor: input.trim() && !isTyping ? "pointer" : "not-allowed", background: input.trim() && !isTyping ? "linear-gradient(135deg, var(--accent-gold), #D4803A)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                <Send size={16} color={input.trim() && !isTyping ? "#000" : "var(--text-muted)"} />
              </motion.button>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8, textAlign: "center" }}>
              ARIA provides general guidance. For personalised advice, book a free session with our counsellors.
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── FULL FAQ SECTION ── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 100px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 100, border: "1px solid rgba(249,212,64,0.25)", background: "rgba(249,212,64,0.05)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent-gold)", textTransform: "uppercase", marginBottom: 20 }}>Knowledge Base</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--text-primary)", fontWeight: 700, marginBottom: 12 }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 480, margin: "0 auto" }}>Everything pre-loaded into ARIA — browse, click to expand, or ask directly.</p>
        </motion.div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {KNOWLEDGE_BASE.map((faq, idx) => {
            const isOpen = expandedFaq === "faq-" + faq.id;
            return (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.03 }}
                style={{ border: "1px solid", borderColor: isOpen ? "rgba(249,212,64,0.3)" : "var(--border-light)", borderRadius: 16, overflow: "hidden", background: isOpen ? "rgba(249,212,64,0.03)" : "rgba(10,10,15,0.6)", transition: "all 0.3s" }}>
                <button onClick={() => setExpandedFaq(isOpen ? null : "faq-" + faq.id)} style={{ width: "100%", padding: "20px 24px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontFamily: "var(--font-sans)" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: isOpen ? "var(--accent-gold)" : "var(--text-primary)", lineHeight: 1.4 }}>{faq.question}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
                    <ChevronDown size={18} color={isOpen ? "var(--accent-gold)" : "var(--text-muted)"} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                      <div style={{ padding: "0 24px 22px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 18 }}>
                        <FormattedAnswer text={faq.answer} />
                        <button onClick={() => { sendMessage(faq.question); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          style={{ marginTop: 14, padding: "8px 20px", borderRadius: 100, border: "1px solid rgba(249,212,64,0.3)", background: "rgba(249,212,64,0.06)", color: "var(--accent-gold)", fontSize: 12.5, cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <Bot size={13} /> Ask ARIA this question
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background: "linear-gradient(180deg, rgba(249,212,64,0.04) 0%, transparent 100%)", borderTop: "1px solid rgba(249,212,64,0.1)", padding: "64px 24px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--text-primary)", fontWeight: 700, marginBottom: 14 }}>
            Still have questions? Talk to a <span style={{ color: "var(--accent-gold)" }}>real counsellor.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.7 }}>
            ARIA gives you instant answers, but our human counsellors bring 10+ years of experience to craft your personalised study-abroad roadmap.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" style={{ padding: "14px 32px", borderRadius: 100, background: "linear-gradient(135deg, var(--accent-gold), #D4803A)", color: "#000", fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block", letterSpacing: "0.02em" }}>Book Free Counselling</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ padding: "14px 32px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.15)", color: "var(--text-primary)", fontWeight: 600, fontSize: 15, textDecoration: "none", display: "inline-block" }}>WhatsApp Us</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
