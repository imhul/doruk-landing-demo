import { useState, useRef } from "react";
// utils
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from '@gsap/react';
// components
import MainSection from "./sections/MainSection";
import About from "./sections/About";
import KeyFacts from "./sections/KeyFacts";
import OurBenefits from "./sections/OurBenefits";
import KeepInTouch from "./sections/KeepInTouch";
// config
import { menu, snapSpeed } from "./config";
// styles
import "./scss/fonts.css";
import "./App.scss";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, ScrollSmoother);

/**
 * @see {@link https://gsap.com} for GSAP animation library
 * @see {@link https://gsap.com/resources/React} useGSAP() Hook
 * @see {@link https://gsap.com/docs/v3/Plugins/ScrollTrigger} for ScrollTrigger plugin
 * @see {@link https://gsap.com/docs/v3/Plugins/ScrollToPlugin} for ScrollToPlugin
 * @see {@link https://gsap.com/docs/v3/Plugins/ScrollSmoother} for ScrollSmoother plugin
 */

const App = () => {
  const container = useRef(),
    [mobileMenuOpen, setMobileMenuOpen] = useState(false),
    [activeSection, setActiveSection] = useState("top-section"),
    [lang, setLang] = useState("en"),
    [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: container.current,
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
    });

    // ScrollTrigger for horizontal section
    ScrollTrigger.create({
      trigger: "#horizontal-container",
      start: "clamp(top bottom)",
      end: "clamp(bottom bottom)",
      markers: false,
      // snap: snapConfig,
      onEnter: () => setActiveSection("horizontal-container"),
      onEnterBack: () => setActiveSection("horizontal-container"),
      onUpdate: (self) => setScrollProgress(self.progress * 100),
    });

    // ScrollTrigger for top section
    ScrollTrigger.create({
      trigger: "#top-section",
      start: "top top",
      end: "bottom top",
      markers: false,
      // snap: snapConfig,
      onEnter: () => setActiveSection("top-section"),
      onEnterBack: () => setActiveSection("top-section"),
      onUpdate: (self) => setScrollProgress(self.progress * 100),
    });

    // ScrollTrigger for bottom section 1
    ScrollTrigger.create({
      trigger: "#bottom-section-1",
      start: "clamp(top bottom)",
      end: "clamp(bottom bottom)",
      markers: false,
      // snap: snapConfig,
      onEnter: () => setActiveSection("bottom-section-1"),
      onEnterBack: () => setActiveSection("bottom-section-1"),
      onUpdate: (self) => setScrollProgress(self.progress * 100),
    });

    // ScrollTrigger for bottom section 2
    ScrollTrigger.create({
      trigger: "#bottom-section-2",
      start: "clamp(top bottom)",
      end: "clamp(bottom bottom)",
      markers: false,
      // snap: snapConfig,
      onEnter: () => setActiveSection("bottom-section-2"),
      onEnterBack: () => setActiveSection("bottom-section-2"),
      onUpdate: (self) => setScrollProgress(self.progress * 100),
    });

    // ScrollTrigger for bottom section 3
    ScrollTrigger.create({
      trigger: "#bottom-section-3",
      start: "clamp(top bottom)",
      end: "clamp(bottom bottom)",
      markers: false,
      // snap: snapConfig,
      onEnter: () => setActiveSection("bottom-section-3"),
      onEnterBack: () => setActiveSection("bottom-section-3"),
      onUpdate: (self) => setScrollProgress(self.progress * 100),
    });
  }, { scope: container });

  const Nav = ({ isMobileMenu = false }) => {
    return (
      <nav>
        {menu.map(item => (
          <div
            key={item.id}
            className={`menu-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => {
              isMobileMenu && setMobileMenuOpen(false);

              gsap.to(window, {
                duration: 0.5,
                scrollTo: "#" + item.id,
                ease: "power2.out",
                onComplete: () => setActiveSection(item.id),
              });
            }}
          >
            {isMobileMenu
              ? (<span>{item.title[lang]}</span>)
              : (<i className={`${item.icon} icon`} />)
            }
          </div>
        ))}
      </nav>
    );
  }

  return (
    <main ref={container}>
      <div className={`mobile-menu ${mobileMenuOpen ? "opened" : "closed"}`}>
        <div className="decorations">
          <div className="horizontal-rectangles">
            <div className="rectangle" />
            <div className="rectangle" />
            <div className="rectangle" />
            <div className="rectangle" />
          </div>
          <div className="vertical-rectangles">
            <div className="rectangle" />
            <div className="rectangle" />
            <div className="rectangle" />
          </div>
        </div>
        <Nav isMobileMenu={true} />
      </div>
      <aside>
        <button
          type="button"
          aria-label="Toggle mobile menu"
          className={`mobile-menu-toggle ${mobileMenuOpen ? "opened" : ""}`}
          onClick={() => setMobileMenuOpen(prev => !prev)}
        >
          <i className={mobileMenuOpen ? "icon-close" : "icon-menu"}></i>
        </button>
        <Nav />
      </aside>

      <div id="smooth-content">
        <section id="top-section" className="full-height-section">
          <MainSection
            setLang={setLang}
            sectionIsActive={activeSection === "top-section"}
            scrollProgress={scrollProgress}
            lang={lang}
          />
        </section>
        <section id="horizontal-container" className="full-height-section">
          <About lang={lang} />
        </section>
        <section id="bottom-section-1" className="double-height-section">
          <KeyFacts scrollProgress={scrollProgress} lang={lang} />
        </section>
        <section id="bottom-section-2" className="full-height-section">
          <OurBenefits lang={lang} />
        </section>
        <section id="bottom-section-3" className="full-height-section">
          <KeepInTouch lang={lang} />
        </section>
      </div>
    </main>
  );
};

export default App;
