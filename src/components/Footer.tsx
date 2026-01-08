import Logo from "./Logo";
import { Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTelegramPlane,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const jobsByType = [
    { label: "Full time jobs", href: "/?type=Full time" },
    { label: "Internships", href: "/?type=Internship" },
  ];

  const jobsByCategory = [
    { label: "Jobs in Frontend development", href: "/?search=Frontend" },
    { label: "Jobs in Backend development", href: "/?search=Backend" },
    { label: "Jobs in App development", href: "/?search=App" },
    { label: "Jobs in Data analytics", href: "/?search=Data analytics" },
    { label: "Jobs in Fullstack development", href: "/?search=Fullstack" },
    { label: "Jobs in Web development", href: "/?search=Web" },
    { label: "Jobs in Quality analyst (QA)", href: "/?search=QA" },
  ];

  const jobsByLocation = [
    { label: "Remote Jobs", href: "/?location=Remote" },
    { label: "Hybrid Jobs", href: "/?location=Hybrid" },
    { label: "Jobs in Bengaluru", href: "/?location=Bengaluru" },
    { label: "Jobs in Noida", href: "/?location=Noida" },
    { label: "Jobs in Gurgaon", href: "/?location=Gurgaon" },
    { label: "Jobs in Delhi", href: "/?location=Delhi" },
    { label: "Jobs in Pune", href: "/?location=Pune" },
    { label: "Jobs in Mumbai", href: "/?location=Mumbai" },
    { label: "Jobs in Hyderabad", href: "/?location=Hyderabad" },
  ];

  const jobsByBatch = [
    { label: "Jobs for 2020 batch", href: "/?batch=2020" },
    { label: "Jobs for 2021 batch", href: "/?batch=2021" },
    { label: "Jobs for 2022 batch", href: "/?batch=2022" },
    { label: "Jobs for 2023 batch", href: "/?batch=2023" },
    { label: "Jobs for 2024 batch", href: "/?batch=2024" },
    { label: "Jobs for 2025 batch", href: "/?batch=2025" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Connect with us */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Connect with us
            </h3>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mb-4">
              {[
                {
                  href: "https://www.instagram.com/beinghired/",
                  icon: <FaInstagram size={18} />,
                },
                {
                  href: "https://t.me/beinghired",
                  icon: <FaTelegramPlane size={18} />,
                },
                {
                  href: "https://linkedin.com/company/beinghired",
                  icon: <FaLinkedinIn size={18} />,
                },
                {
                  href: "https://whatsapp.com/channel/0029Vb78Bt31SWswoR72SU18",
                  icon: <FaWhatsapp size={18} />,
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                  w-10 h-10
                  flex items-center justify-center
                  border border-muted-foreground/40
  rounded-md
  text-black dark:text-white
  hover:text-primary
  hover:border-primary
  transition-all duration-300
"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <ul className="space-y-2">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=rohan2by1@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Mail className="w-4 h-4" />
                  Contact us
                </a>

              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/dmca"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  DMCA
                </a>
              </li>
            </ul>
          </div>

          {/* Jobs by type */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Jobs by types
            </h3>
            <ul className="space-y-2">
              {jobsByType.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jobs by category */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Jobs by category
            </h3>
            <ul className="space-y-2">
              {jobsByCategory.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jobs by location */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Jobs by location
            </h3>
            <ul className="space-y-2">
              {jobsByLocation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jobs by batch */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Jobs by batch
            </h3>
            <ul className="space-y-2">
              {jobsByBatch.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>in India by</span>
            <a
              href="https://twitter.com/rohan2by1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <Twitter className="w-4 h-4" />
              @rohan2by1
            </a>
          </div>

          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo />
          </Link>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BeingHired. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;