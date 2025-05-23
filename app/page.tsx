"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Twitter, Linkedin, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

type StackItem = {
  id: number;
  src: string;
  alt: string;
};

const stackItems: StackItem[] = [
  { id: 1, src: "/nextjs-logo.svg", alt: "Next.js logo" },
  { id: 2, src: "/typescript-logo.svg", alt: "TypeScript logo" },
  { id: 3, src: "/react-logo.svg", alt: "React logo" },
  { id: 4, src: "/tailwind-logo.svg", alt: "Tailwind CSS logo" },
  { id: 5, src: "/git-logo.svg", alt: "Git logo" },
  { id: 6, src: "/python-logo.svg", alt: "Python logo" },
  { id: 7, src: "/html5-logo.svg", alt: "HTML5 logo" },
  { id: 8, src: "/css3-logo.svg", alt: "CSS3 logo" },
];

type Project = {
  id: number;
  src: string;
  alt: string;
  href: string;
  viewText: string;
};

const projects: Project[] = [
  {
    id: 1,
    src: "/verdictr.png",
    alt: "Verdictr screenshot",
    href: "https://verdictr.github.io/",
    viewText: "View Project | Verdictr | w/ Stanford",
  },
  {
    id: 2,
    src: "/lexflow.png",
    alt: "LexFlow screenshot",
    href: "https://github.com/ShriyanYamali/LexFlow",
    viewText: "View Project | LexFlow | w/ UPenn",
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Profile */}
          <div className="flex items-center gap-4 pt-8">
            <Image
              src="/pfp-cropped.jpg"
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-mono">SHRIYAN Y.</h1>
              <p className="text-gray-400">STUDENT</p>
            </div>
          </div>

          {/* Bio + Full Site Button */}
          <div className="space-y-6">
            <p className="text-gray-300 text-md leading-relaxed font-mono pb-2">
              Hi, I’m a high school student interested in computer science and
              law. I have experience in both fields, working with Stanford
              University and the University of Delaware, among other
              institutions, where I’ve done programming projects and conducted
              legal research. 4x BPA National Champion.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-lg font-mono text-black hover:bg-gray-950 hover:text-white duration-300"
            >
              <Link
                href="https://www.shriyanyamali.tech/"
              >
                View Full Site <span className="text-2xl font-mono">→</span>
              </Link>
            </Button>
          </div>

          {/* Social Icons */}
          <div className="space-y-4">
            <div className="flex gap-4">
              {[
                {
                  icon: <Instagram className="w-5 h-5" />,
                  url: "https://www.instagram.com/_shriyanyamali/",
                },
                {
                  icon: <Twitter className="w-5 h-5" />,
                  url: "https://x.com/Shriyan_Y",
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
            <div className="text-gray-400 text-sm font-mono">
              <p>Copyright &copy; {new Date().getFullYear()} Shriyan Yamali.</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="space-y-8">

          {/* Projects */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-mono">My Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(({ id, src, alt, href, viewText }) => (
              <div
                key={id}
                className="relative h-[28rem] bg-gray-900 rounded-lg overflow-hidden"
              >
                <Image src={src} alt={alt} fill className="object-cover" />

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
                  <span className="text-2xl font-mono group-hover:hidden">
                  +
                  </span>
                  <span className="text-2xl font-mono hidden group-hover:block">
                  →
                  </span>
                  <span className="text-xl font-mono hidden group-hover:block pl-8">
                  {viewText}
                  </span>
                </Link>
                </Button>
              </div>
              ))}
            </div>
          </section>

          {/* Stack */}
          <section className="bg-blue-600 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-mono">My Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {stackItems.map(({ id, src, alt }) => (
                <div
                  key={id}
                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Contact & Resume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Contact",
                link: "https://www.shriyanyamali.tech/contact",
              },
              {
                title: "Resume",
                link: "https://www.shriyanyamali.tech/Shriyan%20Yamali%20Resume.pdf",
              },
            ].map(({ title, link }) => (
              <section
                key={title}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6"
              >
                <h2 className="text-2xl font-mono mb-4">{title}</h2>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                >
                  <Link href={link}>
                    <span className="text-2xl font-mono">→</span>
                  </Link>
                </Button>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
