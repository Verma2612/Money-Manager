import {FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from "../../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
                     <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
                     <h2 className="font-bold text-lg tracking-tight text-foreground">
                       <span className="text-white ">Money</span><span className="text-gradient-brand">Manager</span>
                     </h2>
                   </div>
            <p className="text-md text-slate-400 max-w-sm">
              The premium way to track your money, manage budgets, and grow your savings — all in one beautiful dashboard.
            </p>
            <div className="flex gap-3 mt-5">
              {[FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub].map((I, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Quick Links" links={["Home", "Features", "Pricing", "About"]} />
          <FooterCol title="Resources" links={["Blog", "Help Center", "Guides", "API"]} />
          <FooterCol title="Contact" links={["support@expense.io", "+91 98765 43210", "Bengaluru, IN"]} />
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-white font-semibold text-md mb-4">{title}</h4>
      <ul className="space-y-2 text-md ">
        {links.map((l) => (
          <li key={l}><a href="#" className="text-slate-400 hover:text-white transition-colors">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
