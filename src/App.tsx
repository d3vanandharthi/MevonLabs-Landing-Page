import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  X, 
  MessageSquare, 
  Store, 
  GraduationCap, 
  Rocket, 
  ShoppingCart,
  Menu,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL = "https://wa.me/910000000000?text=Hi!%20I%20saw%20your%20website.%20I%20want%20to%20discuss%20a%20website%20project.";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const MagneticFluidButton = ({
  href,
  target,
  rel,
  className = "",
  innerClassName = "flex items-center justify-center gap-2",
  children,
  magneticStrength = 0.3,
  wrapperClassName = "inline-block"
}: {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  magneticStrength?: number;
  wrapperClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={wrapperClassName}
    >
      <motion.div 
        animate={{ x: position.x * 0.2, y: position.y * 0.2 }} 
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} 
        className="w-full h-full"
      >
        <a 
          href={href} 
          target={target} 
          rel={rel} 
          className={`relative block overflow-hidden group border border-white/20 text-white transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-white ${className}`}
        >
          <div className="absolute inset-x-0 bottom-0 top-[101%] bg-white group-hover:top-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          <div className={`relative z-10 w-full h-full group-hover:text-black transition-colors duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${innerClassName}`}>
            {children}
          </div>
        </a>
      </motion.div>
    </motion.div>
  )
};

const FluidTextLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} className="group relative inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.2em] text-white transition-colors pb-2">
    <span className="relative z-10 flex items-center gap-3">{children}</span>
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-transparent transition-colors duration-500"></div>
    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
  </a>
);

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-[#050505]/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <span className="font-serif italic text-2xl tracking-tighter text-white">Mevon<span className="text-white/40 ml-1 font-sans not-italic text-sm tracking-widest uppercase">Labs.</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            <a href="#services" className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 hover:text-white transition-colors">Services</a>
            <a href="#pricing" className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 hover:text-white transition-colors">Pricing</a>
            <a href="#work" className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 hover:text-white transition-colors">Work</a>
            <MagneticFluidButton 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em]"
            >
              WhatsApp Us
            </MagneticFluidButton>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white/60 hover:text-white transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-8 flex flex-col gap-6">
              <a href="#services" onClick={() => setIsOpen(false)} className="block text-white/60 font-serif text-xl px-2">Services</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="block text-white/60 font-serif text-xl px-2">Pricing</a>
              <a href="#work" onClick={() => setIsOpen(false)} className="block text-white/60 font-serif text-xl px-2">Work</a>
              <MagneticFluidButton 
                href={WHATSAPP_URL}
                className="mt-4 px-5 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium"
                wrapperClassName="block"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </MagneticFluidButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useGSAP(() => {
    // Reveal text lines staggering upwards with a clip mask
    const lines = gsap.utils.toArray('.hero-line');
    gsap.fromTo(lines, 
      { y: 150, rotateZ: 5, opacity: 0 },
      { 
        y: 0, 
        rotateZ: 0,
        opacity: 1, 
        duration: 1.5, 
        stagger: 0.15, 
        ease: "power4.out",
        delay: 0.2
      }
    );

    // Parallax effect on scroll applied to the container rather than conflicting lines
    gsap.to(textRef.current, {
      y: -100,
      opacity: 0.2,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative pt-32 pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <FadeIn>
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 text-white/60 text-[9px] uppercase tracking-[0.2em] mb-12">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            Accepting New Projects
          </div>
        </FadeIn>
        
        <h1 ref={textRef} className="flex flex-col items-center font-serif text-white leading-[0.85] tracking-tight mb-8 perspective-[1000px]">
          <div className="overflow-hidden p-2"><span className="hero-line block text-6xl md:text-[110px] font-normal mb-2 origin-bottom-left">Your business</span></div>
          <div className="overflow-hidden p-2"><span className="hero-line block text-4xl md:text-[90px] font-sans font-bold uppercase tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] origin-bottom-left">
            deserves a
          </span></div>
          <div className="overflow-hidden p-2"><span className="hero-line block text-6xl md:text-[110px] font-normal mt-2 italic pr-4 origin-bottom-left">real website.</span></div>
        </h1>

        <FadeIn delay={0.8}>
          <p className="text-[14px] text-white/40 mb-16 max-w-xl mx-auto leading-[1.8] font-sans">
            Not a template. Not a compromise. We build fast, affordable websites for local businesses, schools & startups across India.
          </p>
        </FadeIn>

        <FadeIn delay={0.9} className="flex flex-col items-center w-full">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-lg mx-auto">
            <MagneticFluidButton 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full text-[10px] uppercase tracking-[0.15em] hover:bg-white transition-all flex flex-col items-center justify-center"
              innerClassName="flex flex-col items-center justify-center"
              magneticStrength={0.5}
            >
              <span>Talk to Us</span>
              <ArrowRight className="w-4 h-4 mt-2 group-hover:rotate-45 transition-transform" />
            </MagneticFluidButton>
            
            <MagneticFluidButton 
              href="#work"
              className="px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.15em] border-white/10"
              magneticStrength={0.2}
            >
              See our work
            </MagneticFluidButton>
          </div>
          <p className="mt-12 text-white/40 text-[10px] uppercase tracking-[0.2em]">Starting at <span className="text-white font-serif italic text-sm">₹4,999</span></p>
        </FadeIn>
      </div>
    </section>
  );
}

function AudienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Parallax on cards
    const cards = gsap.utils.toArray('.audience-card');
    
    // Check if we're on desktop for extreme parallax
    const isDesktop = window.innerWidth > 768;

    gsap.to(cards, {
      y: (i) => {
        // Apply varying speed multipliers to different cards for asymmetrical drift
        const speed = i % 2 === 0 ? 0.3 : 1.2;
        return isDesktop ? -150 * speed : -50 * speed;
      },
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Sticky fade text effect
    gsap.fromTo('.audience-title',
      { opacity: 0.3, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.audience-title',
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );

  }, { scope: sectionRef });

  const audiences = [
    {
      icon: <Store className="w-6 h-6"/>,
      title: "Local Businesses",
      description: "Restaurants, clinics, shops, salons, gyms — get found on Google & look professional to local customers.",
      price: "₹4,999",
      className: "md:col-span-7",
      cardClass: "h-full min-h-[400px]",
      num: "01"
    },
    {
      icon: <GraduationCap className="w-6 h-6"/>,
      title: "Schools & Institutions",
      description: "Admissions sites, notice boards, gallery, parent communication — look professional & trustworthy.",
      price: "₹7,999",
      className: "md:col-span-5 md:mt-24 lg:mt-32",
      cardClass: "h-full min-h-[480px] bg-white/[0.02]",
      num: "02"
    },
    {
      icon: <Rocket className="w-6 h-6"/>,
      title: "Startups & SaaS",
      description: "Landing pages, MVPs, product sites — turn your growing idea into something real and investable.",
      price: "₹9,999",
      className: "md:col-span-5",
      cardClass: "h-full min-h-[480px] md:-mt-12 lg:-mt-20",
      num: "03"
    },
    {
      icon: <ShoppingCart className="w-6 h-6"/>,
      title: "E-Commerce",
      description: "Product catalog, online ordering, payment gateway setup — start selling online immediately.",
      price: "₹12,999",
      className: "md:col-span-7",
      cardClass: "h-full min-h-[400px] md:mt-12 lg:mt-24 lg:ml-12",
      num: "04"
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-32 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row gap-16 lg:gap-24">
        
        {/* Sticky Sidebar Title */}
        <div className="md:w-1/3 relative">
          <div className="md:sticky md:top-32 font-serif">
            <h2 className="audience-title text-4xl md:text-5xl lg:text-7xl text-white mb-8 leading-[1.1] tracking-tight">
              We build for people who are serious about their business.
            </h2>
            <div className="h-px w-24 bg-white/20"></div>
          </div>
        </div>

        {/* Cards container */}
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          {audiences.map((aud, i) => (
            <div key={i} className={`${aud.className} audience-card will-change-transform`}>
              <div className={`p-10 md:p-14 border border-white/10 bg-[#050505] hover:border-white/30 transition-all duration-700 group relative overflow-hidden flex flex-col justify-between ${aud.cardClass}`}>
                
                <div className="absolute right-0 top-0 pr-8 pt-8 font-serif italic text-white/[0.03] text-8xl md:text-9xl tracking-tighter pointer-events-none group-hover:scale-110 transition-transform duration-1000 origin-top-right">
                  {aud.num}
                </div>

                <div>
                  <div className="mb-12 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/30 transition-all duration-500 relative z-10">
                    {aud.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-6 relative z-10">{aud.title}</h3>
                  <p className="text-white/40 text-[14px] leading-loose max-w-sm mb-12 relative z-10">
                    {aud.description}
                  </p>
                </div>

                <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/60 relative z-10">
                  From <span className="font-serif italic text-2xl ml-2 text-white">{aud.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Deliverables() {
  const included = [
    "Custom design tailored to you (not a template)",
    "Mobile-friendly (works perfectly on every phone)",
    "Google-ready (shows up in search)",
    "Floating WhatsApp button (customers message you)",
    "Contact forms (get inquiries while you sleep)",
    "Lightning fast loading (under 3 seconds)",
    "Free 1-month support after launch",
    "You own everything (domain, hosting, code)"
  ];

  const excluded = [
    "Lock you into expensive monthly fees",
    "Use cheap templates and call it custom",
    "Disappear immediately after taking payment",
    "Talk in technical jargon you don't understand"
  ];

  return (
    <section className="py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative">
          
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
              Clear expectations.<br/><span className="italic text-white/60">Honest delivery.</span>
            </h2>
            <p className="text-[14px] text-white/40 leading-loose mb-16 max-w-md">
              We don't believe in hiding what you get, or charging you extra for basics. Every website we build is production-ready from day one.
            </p>
            
            <div className="pt-12 border-t border-white/10">
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#dcaaa0] mb-8">
                What we don't do
              </h3>
              <ul className="space-y-6">
                {excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[14px] text-white/40">
                    <span className="text-[#dcaaa0]/50 font-serif">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:mt-32">
            <div className="p-10 md:p-16 border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white mb-10">
                Every website includes
              </h3>
              <ul className="space-y-6">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[14px] text-white/80">
                    <span className="text-white/40 font-serif italic">/</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      num: "01",
      title: "Tell Us",
      desc: "Tell us about your business on WhatsApp. Takes literally 10 mins."
    },
    {
      num: "02",
      title: "We Build",
      desc: "We design & build your website. You review it and request changes."
    },
    {
      num: "03",
      title: "You Go Live",
      desc: "Your website is live in 5-7 days. You approve, we launch it."
    }
  ];

  return (
    <section className="py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-24 flex items-center gap-8">
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              The Protocol.
            </h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-16 md:gap-8">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1} className="relative pt-6">
              <div className="absolute top-0 right-4 font-serif italic text-6xl md:text-8xl text-white/[0.04] pointer-events-none">
                {step.num}
              </div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white mb-6 relative z-10 border-b border-white/20 inline-block pb-2">
                {step.title}
              </h3>
              <p className="text-[14px] text-white/40 leading-loose max-w-[280px] relative z-10">
                {step.desc}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "4,999",
      target: "Perfect for local shops & clinics",
      features: [
        "Up to 3 pages",
        "Mobile-ready design",
        "WhatsApp call-to-action",
        "Basic Google Setup",
        "Contact Form"
      ],
      time: "5-7 days",
      popular: false
    },
    {
      name: "Growth",
      price: "9,999",
      target: "For growing businesses & startups",
      features: [
        "Up to 7 pages",
        "Everything in Starter",
        "Content Management (Blog)",
        "Photo Gallery setup",
        "Advanced SEO setup"
      ],
      time: "7-10 days",
      popular: true
    },
    {
      name: "Custom",
      price: "19,999+",
      target: "For complex logic & stores",
      features: [
        "Unlimited pages",
        "Everything in Growth",
        "E-Commerce integration",
        "Payment Gateway Setup",
        "Custom functionality"
      ],
      time: "10-15 days",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Honest pricing.
            </h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">No hidden fees. No surprises.</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <div className={`p-10 md:p-14 h-full flex flex-col bg-[#050505] relative ${
                plan.popular ? 'bg-white/[0.04]' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-white animate-pulse" title="Most Popular" />
                )}
                
                <div className="mb-12">
                  <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/60 mb-8 border-b border-white/10 pb-4 inline-block">
                    {plan.name}
                  </h3>
                  <div className="flex text-white font-serif">
                    <span className="text-xl mt-2 opacity-40 italic">₹</span>
                    <span className="text-5xl md:text-6xl tracking-tight">{plan.price}</span>
                  </div>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.15em] text-white/40">{plan.target}</p>
                </div>
                
                <ul className="space-y-6 mb-16 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-4 text-[14px] text-white/70">
                      <span className="text-white/20 font-serif italic">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-8 border-t border-white/10 mb-10 flex justify-between items-center text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-white/40">Turnaround</span>
                  <span className="text-white">{plan.time}</span>
                </div>
                
                <MagneticFluidButton 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  wrapperClassName="block w-full"
                  className="w-full py-5 text-center font-sans text-[10px] uppercase tracking-[0.2em]"
                >
                  Choose {plan.name}
                </MagneticFluidButton>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-20 text-center">
            <div className="text-[13px] text-white/40 leading-loose">
              <strong className="text-white/80 font-normal">All plans include:</strong> 1 month free support, domain guidance, and hosting setup help.<br/>
              * Prices may vary based on complexity. <FluidTextLink href={WHATSAPP_URL}>Let's talk</FluidTextLink> to figure out what works for you.
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Portfolio() {
  const demos = [
    {
      title: "Azulejos Goa",
      type: "Heritage Artisans",
      img: "https://image.pollinations.ai/prompt/close-up%20macro%20shot%20of%20traditional%20hand-painted%20blue%20goan%20azulejo%20tiles%20arranged%20artistically.%20dark%20moody%20studio%20lighting,%20editorial%20photography,%20high%20contrast,%20deep%20shadows,%20premium%20craftsmanship,%208k%20resolution?width=800&height=1000&nologo=true",
      link: "http://azulejosgoa.com/"
    },
    {
      title: "Ranjan Engravings",
      type: "Precision Craft",
      img: "https://image.pollinations.ai/prompt/macro%20shot%20of%20a%20heavy%20brass%20industrial%20metal%20engraving%20die%20with%20intricate%20machined%20typography.%20dark%20moody%20studio%20lighting,%20editorial%20macro%20photography,%20stark%20reflections,%20premium%20engineering?width=800&height=1000&nologo=true",
      link: "https://www.ranjanengravings.com/"
    },
    {
      title: "Aura Boutique",
      type: "Luxury Hospitality",
      img: "https://image.pollinations.ai/prompt/dark%20moody%20architectural%20photography%20of%20a%20luxury%20brutalist%20boutique%20interior.%20black%20concrete%20walls,%20warm%20terracotta%20and%20twilight%20blue%20ambient%20lighting,%20sharp%20shadows,%20editorial%20design%20magazine%20style?width=800&height=1000&nologo=true",
      link: "#work"
    }
  ];

  return (
    <section id="work" className="py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                Selected Work.
              </h2>
              <p className="text-[14px] text-white/40 leading-loose">
                These are examples of our conceptual capability. Yours will be 100% custom and precisely engineered for your business.
              </p>
            </div>
            <FluidTextLink href={WHATSAPP_URL}>
              Start your project <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </FluidTextLink>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {demos.map((demo, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a 
                href={demo.link} 
                target={demo.link !== "#work" ? "_blank" : "_self"}
                rel="noreferrer" 
                className="group cursor-pointer block"
              >
                <div className="relative overflow-hidden mb-6 aspect-[4/5] border border-white/10 grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700">
                  <img src={demo.img} alt={demo.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                </div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-serif text-2xl text-white group-hover:italic transition-all">{demo.title}</h3>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 text-right mt-2 min-w-max">{demo.type}</p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Why shouldn't I just use Wix or GoDaddy?",
      a: "Templates look generic. Customers can tell. We build something that aligns precisely with YOUR business identity, not like 10,000 other sites. With builders you pay forever. With us, you own the asset fully."
    },
    {
      q: "What if I need changes after the site is done?",
      a: "We provide 1 month of free engineering support to ensure everything operates flawlessly. After that, nominal updates are billed transparently (₹500-1000). We do not vanish post-launch."
    },
    {
      q: "Do I need to buy domain & hosting separately?",
      a: "As your technical advisors, we guide you to register these assets under your own name, ensuring complete absolute ownership. We handle the technical integration. Domain costs ~₹800/yr; Hosting ~₹2000-3000/yr."
    },
    {
      q: "How do I pay?",
      a: "We accept UPI, Bank Transfer, or Razorpay. The financial architecture is standard: 50% mobilization advance, and 50% prior to final production deployment."
    },
    {
      q: "I don't know anything about websites. Is that OK?",
      a: "That is our precise mandate. Communicate your business model to us on WhatsApp. We translate your commercial objectives into a high-performance digital presence."
    }
  ];

  return (
    <section className="py-32 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-20">
            Inquiries.
          </h2>
        </FadeIn>

        <div className="space-y-0 text-white">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <details className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-10 text-white font-serif text-xl md:text-2xl hover:text-white/60 transition-colors">
                  {faq.q}
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] opacity-30 group-open:opacity-0 transition-opacity whitespace-nowrap">Open</span>
                </summary>
                <div className="pb-12 text-[14px] text-white/50 leading-loose max-w-2xl font-sans">
                  {faq.a}
                </div>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-40 relative overflow-hidden border-t border-white/10 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <FadeIn className="flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8">
            Ready to begin?
          </h2>
          <p className="text-[14px] text-white/40 mb-20 max-w-xl mx-auto leading-loose">
            Message us on WhatsApp. Takes 2 minutes. No commitment. We typically respond within an hour.
          </p>
          
          <MagneticFluidButton 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full text-[10px] uppercase tracking-[0.2em]"
            innerClassName="flex flex-col items-center justify-center"
            magneticStrength={0.6}
          >
            <span>Initiate</span>
            <span className="mt-1 font-serif italic capitalize text-white/60 font-normal text-sm md:text-base group-hover:text-black/60 transition-colors">Project</span>
          </MagneticFluidButton>
          
          <div className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/20 font-sans">
            <span>+91 90000 00000</span>
            <span className="hidden sm:block w-px h-3 bg-white/20"></span>
            <span>hello@mevonlabs.com</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-start justify-between gap-16">
        <div className="flex flex-col gap-6">
          <span className="font-serif italic text-3xl text-white">Mevon<span className="text-white/40 ml-1 font-sans not-italic text-sm tracking-widest uppercase">Labs.</span></span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 max-w-xs leading-loose">Automating trust and establishing precision aesthetics for your business.</span>
        </div>
        
        <div className="flex gap-12 text-[9px] uppercase tracking-[0.2em] text-white/50">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href={WHATSAPP_URL} className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <div className="flex flex-col gap-4 text-[9px] uppercase tracking-[0.2em] text-white/30 md:text-right">
          <span>© {new Date().getFullYear()} / Version 5.0</span>
          <span>Made with precision in India</span>
        </div>
      </div>
      
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-px h-24 bg-white/10 hidden lg:block"></div>
      <div className="absolute right-[5%] top-[70%] [writing-mode:vertical-rl] text-[8px] uppercase tracking-[0.3em] text-white/10 hidden lg:block">
        51.5074° N, 0.1278° W
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 relative">
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay" 
        style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}
      />
      <div className="fixed -top-[200px] -left-[200px] w-[800px] h-[800px] rounded-full blur-[140px] opacity-30 bg-[radial-gradient(circle,_var(--color-terracotta)_0%,_transparent_70%)] pointer-events-none z-0"></div>
      <div className="fixed top-1/2 right-[10%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-20 bg-[radial-gradient(circle,_var(--color-twilight)_0%,_transparent_70%)] pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <AudienceSection />
          <Deliverables />
          <Process />
          <Pricing />
          <Portfolio />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
