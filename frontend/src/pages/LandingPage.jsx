import Navbar from "../components/site/Navbar";
import {Footer} from "../components/site/Footer";
import { motion } from "framer-motion";
import {
  ArrowRight, Play, ShieldCheck, CreditCard, Sparkles,
  Wallet, TrendingUp, Target, PieChart, Cloud, FileText,
  Plus, FolderTree, BarChart3, Check, Star, Zap,
} from "lucide-react";
import { AnimatedCounter } from "../components/site/AnimatedCounter";
import { Link } from "react-router-dom";
import {useEffect} from "react";
import dashboardImage from "../assets/dashboard.png";


const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
transition: { duration: 0.55, ease: "easeOut" },
};

const LandingPage = () => {
    useEffect(() => {
    document.title = "MoneyManager — Manage Your Money Easily";
  }, []);
  return (
    <div className="bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Benefits />
      <Testimonials />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#ECFEFF]" />
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-[#2563EB]/25 blur-3xl animate-float" />
      <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-[#06B6D4]/25 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#22C55E]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 glass px-4 py-1.5 text-xs font-semibold text-[#2563EB] mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> New — AI-powered insights
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.05]">
            Manage Every Rupee with <span className="text-gradient-brand">Confidence.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Track your income, expenses, savings, and budgets from one beautiful dashboard designed for the way you actually live.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-20px_rgb(37_99_235_/_0.55)] transition-all">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
              <Play className="h-4 w-4 text-[#2563EB]" /> Watch Demo
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CreditCard className="h-4 w-4 text-[#22C55E]" /> No credit card required</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#22C55E]" /> Secure data</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-[#22C55E]" /> Free forever plan</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}>
          <div className="rounded-[28px] bg-white p-3 shadow-[var(--shadow-soft)] border border-border">
  <img
    src={dashboardImage}
    alt="MoneyManager Dashboard"
    className="w-full rounded-[20px]"
  />
</div>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  { icon: Wallet, title: "Expense Tracking", desc: "Log every expense in seconds and see where your money really goes." },
  { icon: TrendingUp, title: "Income Management", desc: "Track multiple income sources and watch your cash flow grow." },
  { icon: Target, title: "Budget Planning", desc: "Set smart budgets by category and stay ahead every single month." },
  { icon: PieChart, title: "Smart Analytics", desc: "Beautiful charts that turn raw numbers into meaningful insights." },
  { icon: Cloud, title: "Secure Cloud Sync", desc: "Your data, safely encrypted and synced across all your devices." },
  { icon: FileText, title: "Monthly Reports", desc: "Auto-generated reports that make tax season and reviews effortless." },
];

function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold text-[#2563EB] mb-3">FEATURES</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Everything you need to take control</h2>
          <p className="mt-4 text-muted-foreground">Powerful tools bundled into a delightful, minimal experience.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-[20px] bg-card p-7 shadow-[var(--shadow-soft)] border border-border/50 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgb(15_23_42_/_0.18)] transition-all duration-300"
            >
              <div className="inline-grid h-12 w-12 place-items-center rounded-2xl gradient-brand text-white shadow-[var(--shadow-glow)] group-hover:scale-110 transition-transform">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Plus, title: "Add Transactions", desc: "Quickly log incomes and expenses in a few taps." },
    { icon: FolderTree, title: "Organize Categories", desc: "Tag transactions and personalise categories that fit you." },
    { icon: BarChart3, title: "View Reports & Insights", desc: "Get instant insights, trends, and money-saving ideas." },
  ];
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-transparent to-[#EFF6FF]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold text-[#2563EB] mb-3">HOW IT WORKS</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Get started in 3 simple steps</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#2563EB]/30 via-[#06B6D4]/40 to-[#2563EB]/30" />
          {steps.map((s, i) => (
            <motion.div key={s.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-[20px] bg-card p-7 shadow-[var(--shadow-soft)] border border-border/50 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full gradient-brand text-white shadow-[var(--shadow-glow)] relative">
                <s.icon className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full bg-white text-[10px] font-bold text-[#2563EB] border border-[#2563EB]/20 shadow">{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { end: 15000, suffix: "+", label: "Users" },
    { end: 10, suffix: " Cr+", prefix: "₹", label: "Expenses Managed" },
    { end: 99.9, suffix: "%", decimals: 1, label: "Uptime" },
    { end: 4.9, suffix: "★", decimals: 1, label: "Rating" },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] gradient-brand p-8 md:p-12 text-white shadow-[var(--shadow-glow)] relative overflow-hidden">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            {items.map((it) => (
              <div key={it.label} className="text-center">
                <p className="text-3xl md:text-4xl font-black tracking-tight">
                  <AnimatedCounter end={it.end} prefix={it.prefix} suffix={it.suffix} decimals={it.decimals ?? 0} />
                </p>
                <p className="mt-2 text-sm text-white/80 font-medium">{it.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    "Real-time tracking",
    "Smart budgeting",
    "Secure authentication",
    "Interactive charts",
    "Export reports",
    "Responsive on all devices",
  ];
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div {...fadeUp}>
          <div className="relative rounded-[28px] bg-gradient-to-br from-[#EFF6FF] to-[#ECFEFF] p-8 border border-white shadow-[var(--shadow-soft)]">
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#2563EB]/20 blur-2xl" />
            <div className="rounded-[28px] bg-white p-3 shadow-[var(--shadow-soft)] border border-border">
  <img
    src={dashboardImage}
    alt="MoneyManager Dashboard"
    className="w-full rounded-[20px]"
  />
</div>
          </div>
        </motion.div>
        <motion.div {...fadeUp}>
          <p className="text-sm font-semibold text-[#2563EB] mb-3">WHY EXPENSETRACKER</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for people who care about their money</h2>
          <p className="text-muted-foreground mb-8">Everything premium — none of the complexity. A finance app that respects your time and your privacy.</p>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#22C55E]/15 text-[#22C55E]">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Ananya Sharma", role: "Product Designer", text: "The cleanest expense app I've used. Charts are gorgeous and it actually helped me save." , avatar: "https://i.pravatar.cc/100?img=47"},
    { name: "Rahul Verma", role: "Freelance Developer", text: "Finally a tracker that respects my time. Onboarding took 2 minutes, ROI took 1 week." , avatar: "https://i.pravatar.cc/100?img=12"},
    { name: "Priya Nair", role: "Founder, Bloomly", text: "Our whole team runs personal budgets on ExpenseTracker. It just works, beautifully.", avatar: "https://i.pravatar.cc/100?img=32" },
  ];
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#EFF6FF]/50 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold text-[#2563EB] mb-3">LOVED BY THOUSANDS</p>
          <h2 className="text-3xl sm:text-4xl font-bold">What our users say</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div key={t.name} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-[20px] bg-card p-7 shadow-[var(--shadow-soft)] border border-border/50 hover:-translate-y-1.5 transition-all">
              <div className="flex gap-1 text-[#F59E0B] mb-4">
                {[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm text-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover border-2 border-white shadow" />
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold text-[#2563EB] mb-3">PRICING</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Simple pricing for everyone</h2>
          <p className="mt-4 text-muted-foreground">Start free forever. Upgrade when you're ready.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="rounded-[20px] bg-card p-8 border border-border shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold text-muted-foreground">Free</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-black">₹0</span>
              <span className="text-muted-foreground text-sm">/forever</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Everything you need to get started.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Unlimited transactions", "Budget tracking", "Basic reports"].map((f) => (
                <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#22C55E]" />{f}</li>
              ))}
            </ul>
            <Link to="/signup" className="mt-8 block text-center rounded-full border border-border py-2.5 text-sm font-semibold hover:bg-secondary transition-colors">Get Started</Link>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.08 }}
            className="relative rounded-[20px] p-8 gradient-brand text-white shadow-[var(--shadow-glow)] overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white/90">Premium</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold"><Zap className="h-3 w-3" /> Popular</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-black">₹299</span>
              <span className="text-white/80 text-sm">/month</span>
            </div>
            <p className="mt-3 text-sm text-white/85">For power users who want it all.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Advanced analytics", "Export PDF/Excel", "Cloud backup", "Priority support"].map((f) => (
                <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4" />{f}</li>
              ))}
            </ul>
            <Link to="/signup" className="mt-8 block text-center rounded-full bg-white text-[#2563EB] py-2.5 text-sm font-bold hover:bg-white/95 transition-colors">Upgrade to Premium</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="relative rounded-[28px] bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] p-10 md:p-16 text-center text-white overflow-hidden shadow-[var(--shadow-soft)]">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#2563EB]/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#06B6D4]/40 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Start Managing Your Money Smarter Today</h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">Join thousands of people already taking back control of their finances.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/15 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingPage;