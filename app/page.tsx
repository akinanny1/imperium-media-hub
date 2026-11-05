
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import PortfolioGallery from "@/components/PortfolioGallery";

const services = [
  {
    number: "01",
    title: "Logo & Brand Identity",
    description:
      "We create distinctive logos and visual identities that make businesses recognizable, memorable and professional.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Social Media Design",
    description:
      "Eye-catching social media posts, flyers and advertisements designed to capture attention and drive engagement.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Business Branding",
    description:
      "Complete branding solutions that give your business a consistent, polished and powerful identity.",
    icon: "✧",
  },
  {
    number: "04",
    title: "Digital Marketing",
    description:
      "Creative digital promotions and marketing solutions that help businesses reach more people.",
    icon: "↗",
  },
  {
    number: "05",
    title: "Photo Editing & Retouching",
    description:
      "Professional image enhancement, retouching and creative photo finishing.",
    icon: "◎",
  },
  {
    number: "06",
    title: "Photo Frames & Framing",
    description:
      "Beautiful photo framing services that transform your favourite memories into lasting displays.",
    icon: "▣",
  },
  {
    number: "07",
    title: "Graphic Design Academy",
    description:
      "Learn practical graphic design skills through creative training and professional guidance.",
    icon: "⌘",
  },
  {
    number: "08",
    title: "Event Publicity",
    description:
      "Promotional designs and publicity materials that make your events stand out.",
    icon: "✳",
  },
  {
    number: "09",
    title: "Printing & Branding Materials",
    description:
      "Quality printing and branded materials that bring your business identity into the physical world.",
    icon: "▤",
  },
];

export default async function Home() {
  await connection();

  const supabase = await createClient();

  const [
    { data: projects, error: projectsError },
    { data: categories, error: categoriesError },
  ] = await Promise.all([
    supabase
      .from("portfolio_projects")
      .select("id, title, description, image_url, category_id")
      .eq("published", true)
      .order("created_at", { ascending: false }),

    supabase
      .from("portfolio_categories")
      .select("id, name")
      .order("name", { ascending: true }),
  ]);

  return (
    <main className="min-h-screen bg-[#071629] text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071629]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/imperium-logo.png"
              alt="Imperium Media Hub logo"
              className="h-14 w-14 object-contain"
            />
            <div>
              <p className="text-lg font-bold tracking-[0.12em] text-white">
                IMPERIUM
              </p>
              <p className="text-[10px] tracking-[0.35em] text-[#D5AE57]">
                MEDIA HUB
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-gray-300 lg:flex">
            <a href="#home" className="transition hover:text-[#D5AE57]">Home</a>
            <a href="#about" className="transition hover:text-[#D5AE57]">About</a>
            <a href="#services" className="transition hover:text-[#D5AE57]">Services</a>
            <a href="#portfolio" className="transition hover:text-[#D5AE57]">Portfolio</a>
            <a href="#academy" className="transition hover:text-[#D5AE57]">Academy</a>
            <a href="#contact" className="transition hover:text-[#D5AE57]">Contact</a>
          </nav>

          <a
            href="https://wa.me/2348116505422"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#D5AE57] px-5 py-3 text-xs font-bold text-[#071629] transition hover:bg-white"
          >
            LET&apos;S TALK ↗
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-32 h-[550px] w-[550px] rounded-full bg-[#C49A45]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 md:px-8 lg:grid-cols-2">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#D5AE57]/30 px-5 py-3">
              <span className="h-2 w-2 rounded-full bg-[#D5AE57]" />
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#D5AE57]">
                CREATIVE EXCELLENCE. POWERFUL IDENTITY.
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              WE CREATE
              <span className="block text-[#D5AE57]">VISUALS THAT</span>
              DEFINE YOUR
              <span className="block">GREATNESS.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
              We transform ideas into powerful visual experiences. From brand
              identity to digital marketing, we help businesses stand out,
              connect and command attention.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="rounded-full bg-[#D5AE57] px-8 py-4 text-sm font-bold text-[#071629] transition hover:bg-white"
              >
                EXPLORE OUR WORK ↗
              </a>
              <a
                href="#services"
                className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold transition hover:border-[#D5AE57] hover:text-[#D5AE57]"
              >
                OUR SERVICES
              </a>
            </div>

            <div className="mt-16 border-t border-white/10 pt-7">
              <p className="text-[10px] font-semibold tracking-[0.3em] text-[#D5AE57]">
                OUR PHILOSOPHY
              </p>
              <p className="mt-3 text-sm tracking-[0.12em] text-gray-300">
                AUTHORITY <span className="text-[#D5AE57]">•</span> DOMINION{" "}
                <span className="text-[#D5AE57]">•</span> EXCELLENCE{" "}
                <span className="text-[#D5AE57]">•</span> GREATNESS
              </p>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
            <div className="absolute inset-8 rounded-full border border-[#D5AE57]/20" />
            <div className="absolute inset-16 rounded-full border border-[#D5AE57]/10" />
            <div className="relative flex aspect-square w-full items-center justify-center rounded-[45%] border border-[#D5AE57]/30 bg-gradient-to-br from-[#172F4B] via-[#0C2037] to-[#071629] p-12 shadow-2xl shadow-black/40">
              <div className="absolute inset-5 rounded-[45%] border border-white/5" />
              <img
                src="/imperium-logo.png"
                alt="Imperium Media Hub emblem"
                className="relative z-10 max-h-[75%] max-w-[75%] object-contain drop-shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-4 right-0 rounded-xl border border-[#D5AE57]/30 bg-[#10243B] px-6 py-4 shadow-xl">
              <p className="text-xs font-bold tracking-[0.2em] text-[#D5AE57]">
                CREATIVE POWER
              </p>
              <p className="mt-1 text-xs text-gray-400">Beyond Ordinary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION STRIP */}
      <section className="border-y border-[#D5AE57]/20 bg-[#0C2037] py-7">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-4 px-5 text-center text-xs font-bold tracking-[0.2em] text-[#D5AE57] md:justify-between md:px-8">
          <span>CREATIVITY</span>
          <span>IDENTITY</span>
          <span>INNOVATION</span>
          <span>EXCELLENCE</span>
          <span>GREATNESS</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto grid max-w-7xl gap-14 px-5 py-28 md:px-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-[#D5AE57]">
            WHO WE ARE
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Creativity with
            <span className="text-[#D5AE57]"> purpose.</span>
            <br />
            Design with
            <span className="text-[#D5AE57]"> authority.</span>
          </h2>
        </div>

        <div className="self-end">
          <p className="text-base leading-8 text-gray-400">
            Imperium Media Hub is a creative media and branding company
            committed to helping individuals, entrepreneurs and businesses
            communicate their value through exceptional design and strategic
            visual communication.
          </p>
          <p className="mt-5 text-base leading-8 text-gray-400">
            We believe every brand deserves an identity that commands
            attention, inspires confidence and leaves a lasting impression.
          </p>
          <a href="#contact" className="mt-8 inline-block text-sm font-bold text-[#D5AE57] hover:text-white">
            WORK WITH US ↗
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#0C2037] py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-[#D5AE57]">
                WHAT WE DO
              </p>
              <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                Our <span className="text-[#D5AE57]">Services.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-gray-400">
              Creative solutions designed to build powerful brands, elevate
              businesses and bring extraordinary ideas to life.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.number}
                className="group bg-[#0C2037] p-8 transition duration-300 hover:bg-[#142E49]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl text-[#D5AE57]">{service.icon}</span>
                  <span className="text-xs text-gray-500">{service.number}</span>
                </div>
                <h3 className="mt-9 text-xl font-bold transition group-hover:text-[#D5AE57]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {service.description}
                </p>
                <a href="#contact" className="mt-7 inline-block text-xs font-bold tracking-widest text-[#D5AE57]">
                  ENQUIRE NOW ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
        <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#D5AE57]">
              SELECTED WORK
            </p>
            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Our Creative <span className="text-[#D5AE57]">World.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-400">
            A showcase of the creativity, ideas and visual direction that
            define our approach to design.
          </p>
        </div>

        {projectsError || categoriesError ? (
          <p className="text-center text-red-400">
            Our portfolio is temporarily unavailable. Please check back soon.
          </p>
        ) : (
          <PortfolioGallery
            projects={projects ?? []}
            categories={categories ?? []}
          />
        )}
      </section>

      {/* ACADEMY */}
      <section id="academy" className="border-y border-[#D5AE57]/20 bg-[#0C2037] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#D5AE57]">
              LEARN. CREATE. EXCEL.
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Turn your
              <span className="text-[#D5AE57]"> creativity </span>
              into a skill.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-gray-400">
              The Imperium Graphic Design Academy is dedicated to helping
              aspiring creatives develop practical design skills and build
              confidence in the creative industry.
            </p>
            <a href="#contact" className="mt-9 inline-block rounded-full bg-[#D5AE57] px-8 py-4 text-sm font-bold text-[#071629] transition hover:bg-white">
              ENQUIRE ABOUT TRAINING ↗
            </a>
          </div>

          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-[#D5AE57]/20 bg-gradient-to-br from-[#1B3552] to-[#071629] p-10">
            <div className="text-center">
              <span className="text-7xl text-[#D5AE57]">✦</span>
              <p className="mt-6 text-3xl font-black tracking-widest">DESIGN</p>
              <p className="mt-3 text-xs tracking-[0.35em] text-[#D5AE57]">
                KNOWLEDGE IS CREATIVE POWER
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-5 py-28 text-center md:px-8">
        <p className="text-xs font-bold tracking-[0.3em] text-[#D5AE57]">
          LET'S CREATE SOMETHING GREAT
        </p>
        <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
          YOUR VISION.
          <span className="block text-[#D5AE57]">OUR CREATIVE POWER.</span>
          ONE GREAT RESULT.
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-gray-400">
          Have a project in mind? Let's discuss how Imperium Media Hub can
          help bring your ideas to life.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/2348116505422"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#D5AE57] px-9 py-4 text-sm font-bold text-[#071629] transition hover:bg-white"
          >
            CHAT ON WHATSAPP ↗
          </a>
          <a
            href="mailto:imperiummediahub@gmail.com"
            className="rounded-full border border-white/20 px-9 py-4 text-sm font-bold transition hover:border-[#D5AE57] hover:text-[#D5AE57]"
          >
            SEND AN EMAIL
          </a>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          <div>
            <p className="text-xs tracking-widest text-[#D5AE57]">PHONE ONE</p>
            <a href="tel:08116505422" className="mt-3 block text-sm text-gray-300">
              08116505422
            </a>
          </div>
          <div>
            <p className="text-xs tracking-widest text-[#D5AE57]">PHONE TWO</p>
            <a href="tel:08145138915" className="mt-3 block text-sm text-gray-300">
              08145138915
            </a>
          </div>
          <div>
            <p className="text-xs tracking-widest text-[#D5AE57]">EMAIL</p>
            <a href="mailto:imperiummediahub@gmail.com" className="mt-3 block break-all text-sm text-gray-300">
              imperiummediahub@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#040E1B] px-5 py-9 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <p className="font-bold tracking-[0.2em]">IMPERIUM MEDIA HUB</p>
            <p className="mt-2 text-[10px] tracking-widest text-[#D5AE57]">
              AUTHORITY • DOMINION • EXCELLENCE • GREATNESS
            </p>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Imperium Media Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
