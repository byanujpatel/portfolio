'use client';

import { useEffect, useState } from 'react';

// ============= CONFIGURATION =============
// Edit your info here - LINES 5-30
const config = {
  name: 'Anuj Patel',
  email: 'hello@anujpatel.dev',
  socials: {
    github: 'https://github.com/byanujpatel',
    linkedin: 'https://linkedin.com/in/byanujpatel',
    twitter: 'https://twitter.com/byanujpatel',
    substack: 'https://anujpatel.substack.com',
    email: 'hello@anujpatel.dev',
  },
  skills: ['Full-Stack', 'AI/ML', 'Scalable Systems'],
  stats: { years: '8+', projects: '50+', startups: '3' },
  projects: [
    { name: 'Nexus AI', desc: 'Enterprise AI platform', tags: ['Next.js', 'Python', 'ML'] },
    { name: 'FlowStack', desc: 'Developer tools', tags: ['Go', 'Rust', 'K8s'] },
    { name: 'Pulse', desc: 'Health monitoring', tags: ['React', 'WebSocket'] },
    { name: 'Cipher', desc: 'Encrypted comms', tags: ['TypeScript', 'WebRTC'] },
  ],
  services: [
    { title: 'Full-Stack', desc: 'Scalable web apps' },
    { title: 'AI/ML', desc: 'Intelligent features' },
    { title: 'Consulting', desc: 'Architecture & strategy' },
  ],
};

// SVG Icons
const icons: Record<string, string> = {
  github: 'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  substack: 'M20.5 12h-8v8h-3l10-10-10-10h3v8z',
  email: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
};

function Icon({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={icons[name] || ''} />
    </svg>
  );
}

// Dancing AI Agent
function DancingAgent() {
  const [pose, setPose] = useState(0);
  const [isDancing, setIsDancing] = useState(true);

  useEffect(() => {
    if (!isDancing) return;
    const interval = setInterval(() => setPose((p) => (p + 1) % 8), 400);
    return () => clearInterval(interval);
  }, [isDancing]);

  const poses = [
    <g key="0"><circle cx="50" cy="35" r="18" fill="#FF6B35" /><circle cx="43" cy="32" r="3" fill="white" /><circle cx="57" cy="32" r="3" fill="white" /><path d="M45 40 Q50 45 55 40" stroke="white" strokeWidth="2" fill="none" /><path d="M32 35 Q25 25 30 15" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M68 35 Q75 25 70 15" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="38" y="52" width="24" height="28" rx="4" fill="#FF6B35" /><path d="M42 78 L40 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /><path d="M58 78 L60 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /></g>,
    <g key="1"><circle cx="50" cy="35" r="18" fill="#FF6B35" /><circle cx="43" cy="32" r="3" fill="white" /><circle cx="57" cy="32" r="3" fill="white" /><path d="M45 40 Q50 44 55 40" stroke="white" strokeWidth="2" fill="none" /><path d="M32 35 L20 30" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M68 35 L80 40" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="38" y="52" width="24" height="28" rx="4" fill="#FF6B35" /><path d="M42 78 L35 90" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /><path d="M58 78 L65 90" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /></g>,
    <g key="2"><circle cx="50" cy="35" r="18" fill="#FF6B35" /><circle cx="43" cy="32" r="3" fill="white" /><circle cx="57" cy="32" r="3" fill="white" /><path d="M44 39 Q50 42 56 39" stroke="white" strokeWidth="2" fill="none" /><path d="M32 35 L15 25" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M68 35 L85 25" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="38" y="52" width="24" height="28" rx="4" fill="#FF6B35" /><path d="M42 78 L40 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /><path d="M58 78 L60 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /></g>,
    <g key="3"><circle cx="50" cy="35" r="18" fill="#FF6B35" /><circle cx="43" cy="32" r="3" fill="white" /><circle cx="57" cy="32" r="3" fill="white" /><path d="M44 40 Q50 43 56 40" stroke="white" strokeWidth="2" fill="none" /><path d="M32 35 Q25 30 28 20" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M68 35 L85 15" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="38" y="52" width="24" height="28" rx="4" fill="#FF6B35" /><path d="M42 78 L40 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /><path d="M58 78 L60 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /></g>,
    <g key="4"><circle cx="50" cy="40" r="16" fill="#FF6B35" /><circle cx="44" cy="37" r="2.5" fill="white" /><circle cx="56" cy="37" r="2.5" fill="white" /><path d="M46 43 Q50 46 54 43" stroke="white" strokeWidth="2" fill="none" /><path d="M34 42 Q25 35 30 25" stroke="#FF6B35" strokeWidth="3" fill="none" strokeLinecap="round" /><path d="M66 42 Q75 35 70 25" stroke="#FF6B35" strokeWidth="3" fill="none" strokeLinecap="round" /><rect x="36" y="55" width="28" height="20" rx="4" fill="#FF6B35" /><path d="M40 73 L30 88" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /><path d="M60 73 L70 88" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /></g>,
    <g key="5"><circle cx="50" cy="30" r="16" fill="#FF6B35" /><circle cx="44" cy="27" r="2.5" fill="white" /><circle cx="56" cy="27" r="2.5" fill="white" /><path d="M45 33 Q50 37 55 33" stroke="white" strokeWidth="2" fill="none" /><path d="M34 30 L25 15" stroke="#FF6B35" strokeWidth="3" fill="none" strokeLinecap="round" /><path d="M66 30 L75 15" stroke="#FF6B35" strokeWidth="3" fill="none" strokeLinecap="round" /><rect x="38" y="45" width="24" height="20" rx="4" fill="#FF6B35" /><path d="M42 63 L38 75" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" /><path d="M58 63 L62 75" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" /></g>,
    <g key="6"><circle cx="50" cy="35" r="18" fill="#FF6B35" /><circle cx="43" cy="32" r="3" fill="white" /><circle cx="57" cy="32" r="3" fill="white" /><path d="M45 40 Q50 44 55 40" stroke="white" strokeWidth="2" fill="none" /><path d="M32 35 L20 40" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M68 35 L85 35" stroke="#FF6B35" strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="38" y="52" width="24" height="28" rx="4" fill="#FF6B35" /><path d="M42 78 L42 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /><path d="M58 78 L58 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /></g>,
    <g key="7"><circle cx="50" cy="50" r="16" fill="#FF6B35" /><circle cx="44" cy="47" r="2.5" fill="white" /><circle cx="56" cy="47" r="2.5" fill="white" /><path d="M45 53 Q50 56 55 53" stroke="white" strokeWidth="2" fill="none" /><path d="M34 52 L30 65" stroke="#FF6B35" strokeWidth="3" fill="none" strokeLinecap="round" /><path d="M66 52 L70 65" stroke="#FF6B35" strokeWidth="3" fill="none" strokeLinecap="round" /><rect x="36" y="65" width="28" height="22" rx="4" fill="#FF6B35" /><path d="M40 85 L35 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /><path d="M60 85 L65 95" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" /></g>,
  ];

  return (
    <div className="cursor-pointer" onClick={() => setIsDancing(!isDancing)}>
      <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32" style={{ filter: 'drop-shadow(0 10px 20px rgba(255, 107, 53, 0.3))' }}>
        {poses[pose]}
      </svg>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setContentRevealed(true), 1500);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FF6B35]/5 blur-[150px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#4ECDC4]/5 blur-[120px] transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 h-screen flex flex-col">
        <header className="flex justify-between items-center py-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B35] flex items-center justify-center">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            <span className="font-bold text-xl">{config.name}</span>
          </div>
          <a href={`mailto:${config.email}`} className="bg-[#1A1A1A] text-white px-6 py-3 text-sm font-semibold hover:bg-[#FF6B35]">
            Lets Talk
          </a>
        </header>

        <div className="flex-1 flex flex-col justify-between py-6 overflow-hidden">
          <div className={`grid lg:grid-cols-12 gap-8 mb-6 transition-all duration-700 ${contentRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="lg:col-span-7">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4">
                <span className="block">Building products</span>
                <span className="block text-[#FF6B35]">that matter.</span>
              </h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {config.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-[#1A1A1A]/5 text-xs uppercase tracking-wider font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-[#1A1A1A]/70 text-base max-w-lg mb-6 font-medium">
                {config.stats.years} years shipping products. {config.stats.startups} startups from ground up. I solve problems that move the needle.
              </p>
              <div className="flex gap-10">
                <div><span className="text-4xl font-bold text-[#FF6B35]">{config.stats.years}</span><p className="text-xs uppercase tracking-widest mt-1 font-semibold">Years</p></div>
                <div><span className="text-4xl font-bold text-[#1A1A1A]/60">{config.stats.projects}</span><p className="text-xs uppercase tracking-widest mt-1 font-semibold">Projects</p></div>
                <div><span className="text-4xl font-bold text-[#1A1A1A]/60">{config.stats.startups}</span><p className="text-xs uppercase tracking-widest mt-1 font-semibold">Startups</p></div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <DancingAgent />
                <div><p className="text-sm font-bold">Hi! I&apos;m your AI agent</p><p className="text-xs text-[#1A1A1A]/50">Showing you Anuj&apos;s work</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {config.projects.map((project, i) => (
                  <div key={project.name} className="group p-4 bg-white border-2 border-transparent hover:border-[#FF6B35] shadow-sm hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] text-[#FF6B35] font-bold">0{i + 1}</span>
                      <div className="w-4 h-4 border-2 border-[#1A1A1A]/20 group-hover:border-[#FF6B35] group-hover:bg-[#FF6B35] transition-all" />
                    </div>
                    <h3 className="font-bold text-sm mb-1">{project.name}</h3>
                    <div className="flex gap-1">{project.tags.slice(0, 2).map(t => <span key={t} className="text-[9px] text-[#1A1A1A]/40">{t}</span>)}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest font-bold">Connect</span>
                <div className="flex gap-2">
                  {Object.entries(config.socials).map(([platform, url]) => (
                    url && (
                      <a key={platform} href={platform === 'email' ? `mailto:${url}` : url} target={platform === 'email' ? '_self' : '_blank'} className="w-11 h-11 border-2 border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/50 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all">
                        <Icon name={platform} size={16} />
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`grid lg:grid-cols-2 gap-8 pt-6 border-t-2 border-[#1A1A1A]/10 transition-all duration-700 delay-200 ${contentRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex gap-8">
              {config.services.map((service) => (
                <div key={service.title} className="flex-1"><h4 className="text-sm font-bold mb-1">{service.title}</h4><p className="text-xs text-[#1A1A1A]/50 font-medium">{service.desc}</p></div>
              ))}
            </div>
            <div className="flex lg:items-center lg:justify-between gap-4">
              <div><p className="text-xs uppercase tracking-widest font-bold mb-1">Lets build</p><h2 className="text-3xl font-bold">together.</h2></div>
              <div className="flex flex-col items-end gap-2">
                <a href={`mailto:${config.email}`} className="text-lg font-bold text-[#FF6B35] underline underline-offset-4">{config.email}</a>
                <a href={`mailto:${config.email}`} className="text-xs text-[#1A1A1A]/40 hover:text-[#FF6B35] font-medium">→ Send a message</a>
              </div>
            </div>
          </div>

          <footer className={`pt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs transition-all duration-700 delay-300 ${contentRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <span className="font-medium text-[#1A1A1A]/40">© 2026 {config.name}</span>
            <div className="flex gap-5">
              {Object.entries(config.socials).map(([platform, url]) => (
                url && (
                  <a key={platform} href={platform === 'email' ? `mailto:${url}` : url} target={platform === 'email' ? '_self' : '_blank'} className="hover:text-[#FF6B35] font-medium capitalize">
                    {platform}
                  </a>
                )
              ))}
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}