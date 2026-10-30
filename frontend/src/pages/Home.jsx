import {
  ArrowRight,
  GraduationCap,
  School,
  Users,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import InquiryForm from "../components/inquiry/InquiryForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0B171B] text-[#E7F0EF]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#315052]/60 bg-[#102E32]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087F78]">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                K12 <span className="text-[#70D6C7]">Hunar</span>
              </h1>
              <p className="text-[10px] tracking-[2px] text-[#9BB6B4]">
                EDUCATION ECOSYSTEM
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#B8C9C8] md:flex">
            <a href="#home" className="transition hover:text-[#70D6C7]">
              Home
            </a>
            <a href="#about" className="transition hover:text-[#70D6C7]">
              Who We Serve
            </a>
            <a href="#inquiry" className="transition hover:text-[#70D6C7]">
              Contact
            </a>
          </nav>

          <a
            href="#inquiry"
            className="flex items-center gap-2 rounded-full bg-[#087F78] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#09968C]"
          >
            Get in Touch <ArrowRight size={16} />
          </a>
        </div>
      </header>

      {/* Hero */}
      <main id="home">
        <section className="relative overflow-hidden border-b border-[#244044]">
          <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#087F78]/10 blur-[110px]" />
          <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#168C83]/10 blur-[110px]" />

          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#32615D] bg-[#153536] px-4 py-2 text-xs font-semibold tracking-wider text-[#70D6C7]">
              <Sparkles size={14} />
              CONNECTING EDUCATION & OPPORTUNITIES
            </div>

            <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#F0F5F3] md:text-6xl">
              Every Student Deserves an{" "}
              <span className="font-serif italic text-[#55C7AE]">
                Opportunity
              </span>{" "}
              to Shine.
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#A7BCBB] md:text-lg">
              K12 Hunar connects students, parents and schools with meaningful
              learning opportunities, scholarships, competitions and a brighter
              educational future.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-[#087F78] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#087F78]/20 transition hover:-translate-y-0.5 hover:bg-[#09968C]"
              >
                Submit an Inquiry <ArrowRight size={17} />
              </a>
              <a
                href="#about"
                className="rounded-full border border-[#42605F] px-7 py-3.5 text-sm font-semibold text-[#D2E1DF] transition hover:border-[#70D6C7] hover:bg-[#173437]"
              >
                Discover More
              </a>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-[#9CB5B2]">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-[#70D6C7]" />{" "}
                Student-focused
              </span>
              <span className="flex items-center gap-2">
                <Users size={17} className="text-[#70D6C7]" /> Community-driven
              </span>
              <span className="flex items-center gap-2">
                <School size={17} className="text-[#70D6C7]" /> School-connected
              </span>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[3px] text-[#55C7AE]">
              WHO WE SERVE
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              An Ecosystem Built Around{" "}
              <span className="font-serif italic text-[#70D6C7]">You</span>
            </h2>
            <p className="mt-4 leading-7 text-[#9FB4B2]">
              We believe every learner deserves access to the right
              opportunities and support.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Students",
                description:
                  "Explore scholarships, competitions, mentorship and opportunities to grow.",
                color: "text-[#48D5C5]",
                bg: "bg-[#48D5C5]/10",
              },
              {
                icon: School,
                title: "Schools",
                description:
                  "Connect with educational initiatives and build stronger learning communities.",
                color: "text-[#65ACFF]",
                bg: "bg-[#65ACFF]/10",
              },
              {
                icon: Users,
                title: "Parents",
                description:
                  "Stay informed and support your child's learning and development journey.",
                color: "text-[#E58BCB]",
                bg: "bg-[#E58BCB]/10",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#315052] bg-gradient-to-br from-[#1A3035] to-[#122429] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#4C8D84]"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
                  >
                    <Icon size={25} className={item.color} />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#A4B9B7]">
                    {item.description}
                  </p>
                  <a
                    href="#inquiry"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#70D6C7] hover:text-white"
                  >
                    Get started <ArrowRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Inquiry Section */}
        <section
          id="inquiry"
          className="relative overflow-hidden border-t border-[#284448] bg-[#102328] px-6 py-24"
        >
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#087F78]/10 blur-[100px]" />
          <div className="relative mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="pt-8">
              <p className="text-xs font-bold tracking-[3px] text-[#55C7AE]">
                LET'S CONNECT
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
                How Can We{" "}
                <span className="font-serif italic text-[#70D6C7]">
                  Help You?
                </span>
              </h2>
              <p className="mt-6 max-w-lg leading-8 text-[#A7BCBB]">
                Have a question about scholarships, admissions, competitions or
                educational opportunities? Send us your inquiry. Our team will
                get in touch with you.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Share your requirements with us",
                  "Our team reviews your inquiry",
                  "We connect with you with the next steps",
                ].map((step, index) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3A7770] bg-[#17413D] text-sm font-semibold text-[#70D6C7]">
                      0{index + 1}
                    </div>
                    <p className="text-sm text-[#C2D2D0]">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#365B5A] bg-[#172D32] p-6 shadow-2xl shadow-black/20 sm:p-9">
              <div className="mb-8 border-b border-[#345052] pb-6">
                <h3 className="text-2xl font-semibold">Submit Your Inquiry</h3>
                <p className="mt-2 text-sm text-[#9FB5B3]">
                  Fill in your details and our team will contact you.
                </p>
              </div>
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#294448] bg-[#0B171B] px-6 py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="font-semibold">
            K12 <span className="text-[#70D6C7]">Hunar</span>
          </p>
          <p className="text-xs text-[#819A98]">
            © {new Date().getFullYear()} K12 Hunar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
