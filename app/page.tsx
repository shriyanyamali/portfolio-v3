"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Twitter, Linkedin, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StackItem = {
  id: number;
  src: string;
  alt: string;
};

type TimelineItem = {
  id: number;
  date: string;
  role: string;
  org: string;
};

type Project = {
  id: number;
  src: string;
  alt: string;
  href: string;
  viewText: string;
  bgcolor: string;
};

type Award = {
  id: number;
  label: string;
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let scrambleInterval: number;

const timeline: TimelineItem[] = [
  {
    id: 1,
    date: "Sept 2023 — May 2027 | Newark, Delaware",
    role: "Student",
    org: "Newark Charter High School",
  },
  {
    id: 2,
    date: "Sept 2024 — Jan 2025 | Newark, Delaware",
    role: "Frontend Web Developer",
    org: "University of Delaware",
  },
  {
    id: 3,
    date: "July 2024 — Jan 2025 | Hanover, New Hampshire",
    role: "Assistant Editor",
    org: "Dartmouth College",
  },
  {
    id: 4,
    date: "July 2024 — Aug 2024 | Philadelphia, Pennsylvania",
    role: "Summer Intern",
    org: "University of Pennsylvania Carey Law School",
  },
  {
    id: 5,
    date: "June 2024 — Present | Stanford, California",
    role: "Programming Intern",
    org: "Stanford Law School",
  },
  {
    id: 6,
    date: "June 2024 — Feb 2025 | Wilmington, Delaware",
    role: "Research Assistant",
    org: "Wilmington University School of Law",
  },
];

const stackItems: StackItem[] = [
  { id: 1, src: "/logos/nextjs-logo.svg", alt: "Next.js logo" },
  { id: 2, src: "/logos/typescript-logo.svg", alt: "TypeScript logo" },
  { id: 10, src: "/logos/js-logo.svg", alt: "JS logo" },
  { id: 3, src: "/logos/react-logo.svg", alt: "React logo" },
  { id: 4, src: "/logos/framer-logo.svg", alt: "Framer   logo" },
  { id: 5, src: "/logos/tailwind-logo.svg", alt: "Tailwind CSS logo" },
  { id: 6, src: "/logos/git-logo.svg", alt: "Git logo" },
  { id: 8, src: "/logos/html5-logo.svg", alt: "HTML5 logo" },
  { id: 9, src: "/logos/css3-logo.svg", alt: "CSS3 logo" },
  { id: 7, src: "/logos/python-logo.svg", alt: "Python logo" },
  { id: 11, src: "/logos/numpy-logo.svg", alt: "Numpy logo" },
  { id: 12, src: "/logos/pandas-logo.svg", alt: "Pandas logo" },
  { id: 13, src: "/logos/tensorflow-logo.svg", alt: "TensorFlow logo" },
  { id: 14, src: "/logos/pytorch-logo.svg", alt: "PyTorch logo" },
];

const awards: Award[] = [
  {
    id: 1,
    label: "1st Place – Computer Programming Concepts (BPA NLC 2025)",
  },
  {
    id: 2,
    label: "1st Place – Information Technology Concepts (BPA NLC 2025)",
  },
  {
    id: 3,
    label: "1st Place – Meeting & Event Planning Concepts (BPA NLC 2024)",
  },
  {
    id: 4,
    label: "1st Place – Management, Marketing & HR Concepts (BPA NLC 2024)",
  },
  {
    id: 5,
    label: "1st Place – Legal Office Procedures (BPA SLC 2024)",
  },
  {
    id: 6,
    label:
      "2nd Place – Debating Technological Issues (TSA SLC 2025)",
  },
  {
    id: 7,
    label: "Presidential Volunteer Service Award (2025)",
  },
  {
    id: 8,
    label: "3rd Place - Delaware High School Mock Trial Competition (2025)",
  },
  {
    id: 9,
    label: "Top 20 - National High School Mock Trial Competition (2024)",
  },
  {
    id: 10,
    label: "Honorable Mention - Personal Essay & Memoir (2025)",
  },
];

const projects: Project[] = [
  {
    id: 1,
    src: "/projects/verdictr.png",
    alt: "Verdictr screenshot",
    href: "https://verdictr.github.io/",
    viewText: "View Verdictr | w/ Stanford",
    bgcolor: "#d4eeff",
  },
  {
    id: 2,
    src: "/projects/lexflow.png",
    alt: "LexFlow screenshot",
    href: "https://github.com/ShriyanYamali/LexFlow",
    viewText: "View LexFlow | w/ UPenn",
    bgcolor: "#e0e8fa",
  },
];

export default function Portfolio() {
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [active, setActive] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const [hoverStanford, setHoverStanford] = useState(false);
  const [hoverDelaware, setHoverDelaware] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [resumeMinH, setResumeMinH] = useState<string>("0px");

  const [resumeExpanded, setResumeExpanded] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const resumeBottomRef = useRef<HTMLDivElement>(null);
  const [resumeMaxH, setResumeMaxH] = useState("0px");

  const [awardsExpanded, setAwardsExpanded] = useState(false);
  const awardsRef = useRef<HTMLDivElement>(null);
  const awardsBottomRef = useRef<HTMLDivElement>(null);
  const [awardsMaxH, setAwardsMaxH] = useState("0px");

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const runScramble = (target: HTMLHeadingElement) => {
      let iteration = 0;
      const original = target.dataset.value!;

      clearInterval(scrambleInterval);
      setActive(true);

      scrambleInterval = window.setInterval(() => {
        target.innerText = original
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iteration) return original[i];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        if (iteration >= original.length) {
          clearInterval(scrambleInterval);
          setActive(false);
        }
        iteration += 1 / 5;
      }, 30);
    };

    runScramble(el);

    return () => {
      clearInterval(scrambleInterval);
    };
  }, []);

  useEffect(() => {
    if (hovering && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
    }
  }, [hovering]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if (leftColumnRef.current) {
      const h = leftColumnRef.current.getBoundingClientRect().height;
      setResumeMinH(`${h}px`);
    }
  }, []);

  useEffect(() => {
    if (!resumeRef.current) return;
    const content = resumeRef.current.querySelector("ul");
    setResumeMaxH(
      resumeExpanded && content ? `${content.scrollHeight}px` : "0px"
    );

    if (resumeExpanded) {
      setTimeout(() => {
        const el = resumeBottomRef.current;
        if (!el) return;

        const absoluteBottom =
          el.getBoundingClientRect().bottom + window.scrollY;
        const extra = window.innerHeight / 3;
        const targetScroll = absoluteBottom - extra;

        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }, 450);
    }
  }, [resumeExpanded]);

  useEffect(() => {
    if (!awardsRef.current) return;
    const content = awardsRef.current.querySelector("ul");
    setAwardsMaxH(
      awardsExpanded && content ? `${content.scrollHeight}px` : "0px"
    );

    if (awardsExpanded) {
      setTimeout(() => {
        const el = awardsBottomRef.current;
        if (!el) return;

        const absoluteBottom =
          el.getBoundingClientRect().bottom + window.scrollY;
        const extra = window.innerHeight / 3;
        const targetScroll = absoluteBottom - extra;

        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }, 450);
    }
  }, [awardsExpanded]);

  return (
    <div className="min-h-screen bg-black text-white p-6 ">
      <div
        className="grid grid-cols-1 
                 lg:grid-cols-[18rem_1fr]
                 xl:grid-cols-[25rem_1fr]
                 gap-8"
      >
        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Profile */}
          <div className="flex items-center gap-4 pt-4">
            <Image
              src="/pfp-cropped.jpg"
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h1
                ref={headingRef}
                data-value="SHRIYAN YAMALI"
                className={`
                  text-2xl font-mono p-2 rounded transition-colors duration-500 ease-in-out
                `}
              >
                SHRIYAN YAMALI
              </h1>
              <p className="text-base text-neutral-200 font-mono">
                📍Newark, Delaware
              </p>
            </div>
          </div>

          {/* Bio + Full Site Button */}
          <div className="space-y-6 relative" ref={containerRef}>
            <div className="pl-4 border-l-4 border-yellow-400 text-white text-md font-bold leading-relaxed font-mono">
              Hi, I’m a high school student interested in{" "}
              <motion.span
                className="text-cyan-400 inline-block break-words"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.15, rotate: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                computer science
              </motion.span>{" "}
              and{" "}
              <span className="whitespace-nowrap">
                <motion.span
                  className="inline-block text-pink-500"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  law
                </motion.span>
                .
              </span>{" "}
              I have collaborated with{" "}
              <motion.span
                className="inline-block text-white break-words"
                onMouseEnter={() => setHoverStanford(true)}
                onMouseLeave={() => setHoverStanford(false)}
                transition={{ type: "spring", stiffness: 250 }}
              >
                Stanford University
              </motion.span>
              {hoverStanford && (
                <motion.div
                  className="absolute pointer-events-none z-50"
                  style={{
                    top: position.y,
                    left: position.x,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  animate={{
                    opacity: 1,
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: {
                      scale: { type: "spring", stiffness: 500, damping: 10 },
                      rotate: {
                        duration: 0.25,
                        repeat: 0,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Image
                    src="/stanford-tree.png"
                    alt="Stanford Tree"
                    width={60}
                    height={60}
                    className="rounded-full shadow-lg"
                  />
                </motion.div>
              )}{" "}
              and the{" "}
              <motion.span
                className="inline-block text-white break-words"
                onMouseEnter={() => setHoverDelaware(true)}
                onMouseLeave={() => setHoverDelaware(false)}
                transition={{ type: "spring", stiffness: 250 }}
              >
                University of Delaware
              </motion.span>
              {hoverDelaware && (
                <motion.div
                  className="absolute pointer-events-none z-50"
                  style={{
                    top: position.y,
                    left: position.x,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  animate={{
                    opacity: 1,
                    scale: 1.4,
                    rotate: [0, 5, -5, 0],
                    transition: {
                      scale: { type: "spring", stiffness: 500, damping: 10 },
                      rotate: {
                        duration: 0.25,
                        repeat: 0,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Image
                    src="/blue-hen.png"
                    alt="Blue Hen"
                    width={60}
                    height={60}
                    className="rounded-full shadow-lg"
                  />
                </motion.div>
              )}
              , along with other universities, where I’ve worked on programming
              projects like{" "}
              <motion.span
                className="text-green-500 inline-block break-words"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.4, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Verdictr
              </motion.span>{" "}
              and{" "}
              <motion.span
                className="text-emerald-200 inline-block break-words"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                LexFlow
              </motion.span>
              , while concurrently conducting legal research. I am also a{" "}
              <motion.span
                className="inline-block break-words"
                initial={{ scale: 1, color: "#7393B3" }}
                whileHover={{
                  scale: 1.2,
                  color: "#facc15",
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                4x
              </motion.span>{" "}
              BPA{" "}
              <div className="relative inline-block group">
                <span className="font-semibold text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  National Champion
                </span>

                {/* Confetti container */}
                <div className="absolute top-1/2 left-1/2 pointer-events-none z-50">
                  {[...Array(25)].map((_, i) => (
                    <span key={i} className={`confetti confetti-${i}`} />
                  ))}
                </div>
              </div>{" "}
              and an awardee of the{" "}
              <span
                className="relative inline font-semibold text-white hover:text-yellow-400 italic transition-colors break-words"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onMouseMove={handleMouseMove}
              >
                Gold Presidential Volunteer Service Award
                <span className="text-white">.</span>
                <AnimatePresence>
                  {hovering && (
                    <motion.div
                      className="fixed z-50 bg-neutral-900 text-white text-xs px-4 py-2 rounded-md shadow-lg border border-yellow-400 flex items-center gap-2 pointer-events-none"
                      style={{
                        top: mousePos.y + 25,
                        left: mousePos.x - 100,
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      100+ hours volunteered
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </div>

            <Link href="https://dev.shriyanyamali.tech/">
              <Button className="mt-8 group relative inline-flex items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white font-medium">
                <div className="font-mono font-bold inline-flex h-12 translate-y-0 items-center justify-center px-6 text-neutral-950 transition duration-500 group-hover:-translate-y-[200%]">
                  View Full Site →
                </div>
                <div className="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                  <span className="absolute h-full w-full translate-y-full skew-y-6 scale-y-0 bg-neutral-950 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                  <span className="z-10 font-mono font-bold">
                    {" "}
                    View Full Site →
                  </span>
                </div>
              </Button>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="space-y-4">
            <div className="flex gap-4">
              {[
                {
                  icon: <Instagram className="w-5 h-5" />,
                  url: "https://www.instagram.com/shriyanyamali/",
                },
                {
                  icon: <Twitter className="w-5 h-5" />,
                  url: "https://x.com/shriyanyamali",
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  url: "https://www.linkedin.com/in/shriyanyamali/",
                },
                {
                  icon: <Github className="w-5 h-5" />,
                  url: "https://github.com/ShriyanYamali",
                },
              ].map(({ icon, url }, i) => (
                <Button key={i} asChild variant="ghost" size="icon">
                  <Link href={url} target="_blank" rel="noopener noreferrer">
                    {icon}
                  </Link>
                </Button>
              ))}
            </div>
            <p className="font-mono text-sm">@shriyanyamali everywhere</p>

            <div className="text-gray-400 text-sm font-mono">
              <p>Copyright &copy; {new Date().getFullYear()} Shriyan Yamali.</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="space-y-6 pt-[1.25rem]">
          {/* Projects */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-mono">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(({ id, src, alt, href, viewText, bgcolor }) => (
                <div
                  key={id}
                  className="relative h-[20rem] rounded-lg overflow-hidden"
                  style={{ backgroundColor: bgcolor }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className=" 
                  object-contain sm:object-cover lg:object-contain xl:object-cover
                  "
                  />

                  <Button
                    asChild
                    variant="projectb"
                    size="icon"
                    className="
                  absolute bottom-2 left-2
                  h-10 w-10
                  overflow-hidden
                  flex items-center
                  transition-all duration-300 ease-in-out
                  group
                  hover:w-[calc(100%-1rem)]
                  justify-start
                  px-[0.875rem] 
                "
                  >
                    <Link href={href} target="_blank" rel="noopener noreferrer">
                      <span className="text-2xl font-mono hidden sm:inline group-hover:hidden">
                        +
                      </span>
                      <span className="text-2xl font-mono block group-hover:inline sm:hidden">
                        →
                      </span>
                      <span className="text-base sm:text-2xl md:text-lg xl:text-xl 2xl:text-2xl font-mono hidden group-hover:inline pl-4">
                        {viewText}
                      </span>
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Stack */}
          <section className="bg-gradient-to-br from-blue-600 to-blue-700  rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-mono">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {stackItems.map(({ id, src, alt }) => (
                <div
                  key={id}
                  className="w-12 h-12 bg-neutral-200 rounded-xl flex items-center justify-center overflow-hidden
                  transform transition duration-300 ease-in-out
                hover:bg-neutral-800
                  hover:ring-2
                  hover:ring-white
                  "
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-start">
            {" "}
            {/* ─── Left column: Contact + Awards ─── */}
            <div ref={leftColumnRef} className="space-y-4 md:col-span-1">
              {/* Contact */}
              <section className="relative rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-mono">Contact</h2>
                  <Button asChild variant="ghost" size="icon">
                    <Link href="mailto:yamalishriyan@gmail.com">
                      <span className="text-2xl font-mono">→</span>
                    </Link>
                  </Button>
                </div>
                <p className="text-base font-mono text-gray-400">
                  yamalishriyan[at]gmail[dot]com
                </p>
              </section>

              {/* Awards (static or expandable as you already have it) */}
              <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-mono">Awards</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAwardsExpanded((v) => !v)}
                  >
                    <span className="text-2xl font-mono">
                      {awardsExpanded ? "–" : "+"}
                    </span>
                  </Button>
                </div>
                <div
                  ref={awardsRef}
                  style={{ maxHeight: awardsMaxH }}
                  className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                >
                  <AnimatePresence>
                    {awardsExpanded && (
                      <ul className="pt-2 space-y-2">
                        {awards.map((award, i) => (
                          <motion.li
                            key={award.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{
                              delay: i * 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="text-base font-mono bg-gray-800 rounded px-3 py-2 break-words"
                          >
                            {award.label}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </AnimatePresence>
                </div>
                <div ref={awardsBottomRef} />
              </section>
            </div>
            {/* Right column: Resume */}
            <div className="md:col-span-1 min-w-0">
              <section
                style={{ minHeight: resumeMinH }}
                className={`
                
                  relative overflow-hidden rounded-xl
                  bg-gradient-to-br from-gray-900 to-gray-800
                  p-6
                  ${resumeExpanded ? "pb-6" : "pb-[1.5rem]"}
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-mono">Resume</h2>
                  <Link
                    href="https://www.shriyanyamali.tech/Shriyan%20Yamali%20Resume.pdf"
                    target="_blank"
                    className="sm:w-1/2 sm:block hidden"
                  >
                    <Button className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500">
                      <div className="font-mono text-lg translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                        View PDF
                      </div>
                      <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                        >
                          <path
                            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setResumeExpanded((v) => !v)}
                  >
                    <span className="text-2xl font-mono">
                      {resumeExpanded ? "–" : "+"}
                    </span>
                  </Button>
                </div>
                <Link
                  href="https://www.shriyanyamali.tech/Shriyan%20Yamali%20Resume.pdf"
                  className="sm:hidden block"
                >
                  <Button className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500">
                    <div className="font-mono text-lg translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                      View PDF
                    </div>
                    <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </Button>
                </Link>
                <div>
                  <span className="text-2xl font-mono">
                    {!resumeExpanded && (
                      <div className="mt-4 space-y-2 text-base font-mono text-gray-400">
                        <p>
                          <span className="font-extrabold">
                            Extracurricular Activities & Leadership:
                          </span>{" "}
                          CSHS President, Student Council President, BPA Chapter
                          Officer, TSA, Mock Trial.
                        </p>
                      </div>
                    )}
                  </span>
                </div>
                <div
                  ref={resumeRef}
                  style={{ maxHeight: resumeMaxH }}
                  className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                >
                  <AnimatePresence>
                    {resumeExpanded && (
                      <ul className="space-y-4 pt-2">
                        {timeline.map((item, i) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{
                              delay: i * 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="bg-gray-800 rounded-md p-4 font-mono"
                          >
                            <div className="text-sm text-gray-400">
                              {item.date}
                            </div>
                            <div className="mt-1 text-base">{item.org}</div>
                            <div className="text-base text-gray-500">
                              {item.role}
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </AnimatePresence>
                </div>
                <div ref={resumeBottomRef} />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
