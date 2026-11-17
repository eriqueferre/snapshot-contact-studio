import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cable, Gauge, ShieldCheck, Headphones, Wifi, Check, MapPin, MessageCircle, UserCheck, Wrench, ShoppingBag, Instagram, Globe } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site, plans, faq, waLink } from "@/config/site";

const nav = [
  ["Início", "#inicio"], ["Sobre nós", "#sobre"], ["Planos", "#planos"], ["Cobertura", "#cobertura"], ["Atendimento", "#atendimento"],
];

export function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2 font-display text-xl font-black tracking-wider" aria-label="VEIGANET início">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand glow"><Wifi className="h-5 w-5" /></span>
      VEIGA<span className="text-gradient">NET</span>
    </a>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}

function Title({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <h2 className="text-2xl font-bold leading-tight md:text-4xl">{children}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-border">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {nav.map(([l, h]) => <a key={h} href={h} className="text-sm text-muted-foreground transition hover:text-neon">{l}</a>)}
          <a href={waLink(site.messages.contratar)} target="_blank" rel="noreferrer" className="btn-glow rounded-full px-5 py-2.5 text-sm font-bold">CONTRATAR AGORA</a>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border lg:hidden">
            <div className="flex flex-col gap-4 px-5 py-6">
              {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="text-lg">{l}</a>)}
              <a href={waLink(site.messages.contratar)} target="_blank" rel="noreferrer" className="btn-glow rounded-full px-5 py-3 text-center font-bold">CONTRATAR AGORA</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    let raf = 0; const color = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim();
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const ps = Array.from({ length: 60 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 1.8 + 0.4, v: Math.random() * 0.4 + 0.1 }));
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height); ctx.fillStyle = color;
      for (const p of ps) { p.y -= p.v; if (p.y < 0) p.y = c.height; ctx.globalAlpha = 0.3 + p.r / 3; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}

function FiberLines() {
  const paths = ["M-50 600 C 300 500, 500 200, 1500 150", "M-50 700 C 400 600, 700 350, 1500 300", "M-50 500 C 250 450, 600 100, 1500 50", "M-50 800 C 500 700, 900 500, 1500 450"];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="none" aria-hidden>
      <defs><linearGradient id="fg" x1="0" x2="1"><stop offset="0" stopColor="var(--primary)" /><stop offset="1" stopColor="var(--neon)" /></linearGradient></defs>
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="var(--neon)" strokeOpacity="0.12" strokeWidth="1" fill="none" />
          <path d={d} stroke="url(#fg)" strokeWidth="2.5" fill="none" className="fiber-line" style={{ animationDelay: `${i * -1.4}s` }} />
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[92vh] items-center overflow-hidden pt-24 grid-tech">
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-neon/20 blur-[120px]" />
      <FiberLines />
      <Particles />
      <div className="relative mx-auto max-w-7xl px-5">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs tracking-widest text-neon">
          <Cable className="h-4 w-4" /> 100% FIBRA ÓPTICA
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl text-4xl font-black leading-[1.1] md:text-6xl">
          A VELOCIDADE QUE <span className="text-gradient">CONECTA VOCÊ</span> AO FUTURO.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Internet 100% fibra óptica para você navegar, trabalhar, estudar, assistir e jogar com muito mais velocidade e estabilidade.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#planos" className="btn-glow rounded-full px-7 py-4 font-bold">CONHEÇA NOSSOS PLANOS</a>
          <a href={waLink(site.messages.geral)} target="_blank" rel="noreferrer" className="rounded-full border border-neon/50 px-7 py-4 font-bold transition hover:bg-neon/10 hover:glow">FALE COM UM ATENDENTE</a>
        </motion.div>
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    [Cable, "Fibra óptica", "Tecnologia para uma conexão de qualidade."],
    [Gauge, "Velocidade", "Navegue, trabalhe e assista sem complicação."],
    [ShieldCheck, "Estabilidade", "Conexão pensada para acompanhar sua rotina."],
    [Headphones, "Atendimento", "Suporte próximo e dedicado aos clientes."],
  ] as const;
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <Title>MUITO MAIS QUE INTERNET. <span className="text-gradient">UMA NOVA EXPERIÊNCIA DE CONEXÃO.</span></Title>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([Icon, t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="card-tech group h-full p-7">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand glow transition group-hover:scale-110"><Icon className="h-7 w-7" /></div>
              <h3 className="mb-2 text-lg font-bold">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Plans() {
  return (
    <section id="planos" className="relative bg-deep/40 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Title sub="Escolha a velocidade que combina com sua rotina.">ENCONTRE O <span className="text-gradient">PLANO IDEAL</span> PARA VOCÊ.</Title>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={`card-tech relative flex h-full flex-col p-7 ${p.recommended ? "border-neon glow" : ""}`}>
                {p.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-4 py-1 text-xs font-bold">RECOMENDADO</span>}
                <p className="text-sm text-muted-foreground">{p.name}</p>
                <p className="mt-3 font-display text-5xl font-black text-gradient">{p.speed}</p>
                <p className="font-display text-sm tracking-widest">MEGA</p>
                <div className="my-6 border-t border-border pt-6">
                  {p.price ? <p className="text-3xl font-bold">R$ {p.price}<span className="text-sm text-muted-foreground">/mês</span></p> : <p className="text-lg font-semibold text-muted-foreground">Consulte o valor</p>}
                </div>
                <ul className="mb-8 flex-1 space-y-2">
                  {p.benefits.map((b) => <li key={b} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-neon" />{b}</li>)}
                </ul>
                <a href={waLink(`${site.messages.contratar} Tenho interesse no ${p.name} (${p.speed} Mega).`)} target="_blank" rel="noreferrer" className={`rounded-full px-5 py-3 text-center text-sm font-bold ${p.recommended ? "btn-glow" : "border border-neon/50 transition hover:bg-neon/10"}`}>QUERO CONTRATAR</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const fields = [["nome", "Nome completo"], ["whatsapp", "WhatsApp"], ["cidade", "Cidade"], ["bairro", "Bairro"], ["rua", "Rua"], ["numero", "Número"]] as const;

export function Coverage() {
  const [sent, setSent] = useState(false);
  // Estrutura pronta para integração futura (banco de dados / sistema de atendimento).
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as unknown as { nome: string; whatsapp: string; cidade: string; bairro: string; rua: string; numero: string };
    const msg = `Olá! Quero consultar a cobertura da VEIGANET.\nNome: ${d.nome}\nWhatsApp: ${d.whatsapp}\nEndereço: ${d.rua}, ${d.numero} - ${d.bairro}, ${d.cidade}`;
    window.open(waLink(msg), "_blank");
    setSent(true);
  };
  return (
    <section id="cobertura" className="mx-auto max-w-5xl px-5 py-24">
      <Title sub="Consulte a disponibilidade da nossa internet no seu endereço.">SUA REGIÃO JÁ ESTÁ CONECTADA À <span className="text-gradient">VEIGANET?</span></Title>
      <Reveal>
        <form onSubmit={submit} className="card-tech grid gap-5 p-8 hover:translate-y-0 md:grid-cols-2">
          {fields.map(([n, l]) => (
            <label key={n} className={`flex flex-col gap-2 text-sm ${n === "nome" ? "md:col-span-2" : ""}`}>
              {l}
              <input required name={n} type={n === "whatsapp" ? "tel" : "text"} className="rounded-xl border border-input bg-background/60 px-4 py-3 outline-none transition focus:border-neon focus:glow" />
            </label>
          ))}
          <button type="submit" className="btn-glow mt-2 flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold md:col-span-2"><MapPin className="h-5 w-5" /> CONSULTAR DISPONIBILIDADE</button>
          {sent && <p className="text-center text-sm text-neon md:col-span-2">Recebemos seus dados! Nossa equipe vai verificar a disponibilidade e retornar pelo WhatsApp.</p>}
        </form>
      </Reveal>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-deep/40 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold md:text-4xl">CONEXÃO QUE <span className="text-gradient">APROXIMA PESSOAS.</span></h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">A VEIGANET trabalha para proporcionar uma experiência de internet com qualidade, velocidade e estabilidade. Nosso objetivo é conectar pessoas, famílias e negócios, oferecendo uma solução de internet por fibra óptica para acompanhar as necessidades do dia a dia.</p>
          <p className="mt-8 font-display text-sm tracking-[0.3em] text-neon">VEIGANET — SUA CONEXÃO COM O FUTURO.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="absolute rounded-full border border-neon/40" style={{ inset: `${i * 15}%` }} animate={{ rotate: i % 2 ? -360 : 360 }} transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}>
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-neon glow" />
              </motion.div>
            ))}
            <div className="absolute inset-[42%] grid place-items-center rounded-full bg-gradient-brand glow"><Wifi className="h-10 w-10" /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Support() {
  const opts = [[ShoppingBag, "Quero contratar", site.messages.contratar], [UserCheck, "Já sou cliente", site.messages.cliente], [Wrench, "Preciso de suporte técnico", site.messages.suporte]] as const;
  return (
    <section id="atendimento" className="mx-auto max-w-6xl px-5 py-24">
      <Title>PRECISA DE AJUDA? <span className="text-gradient">ESTAMOS AQUI PARA VOCÊ.</span></Title>
      <div className="grid gap-6 md:grid-cols-3">
        {opts.map(([Icon, t, m], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <a href={waLink(m)} target="_blank" rel="noreferrer" className="card-tech group flex h-full flex-col items-center p-8 text-center">
              <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand glow transition group-hover:scale-110"><Icon className="h-8 w-8" /></div>
              <h3 className="text-lg font-bold">{t}</h3>
              <span className="mt-3 flex items-center gap-2 text-sm text-neon"><MessageCircle className="h-4 w-4" /> Falar no WhatsApp</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-24">
      <Title>PERGUNTAS <span className="text-gradient">FREQUENTES</span></Title>
      <Reveal>
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`} className="card-tech border px-6 hover:translate-y-0">
              <AccordionTrigger className="text-left hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neon/30 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div><Logo /><p className="mt-4 max-w-xs text-sm text-muted-foreground">{site.description}</p></div>
        <nav className="flex flex-col gap-2 text-sm" aria-label="Rodapé">
          {nav.map(([l, h]) => <a key={h} href={h} className="text-muted-foreground hover:text-neon">{l}</a>)}
        </nav>
        <div className="flex flex-col gap-3 text-sm">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-neon"><Instagram className="h-4 w-4" /> Instagram</a>
          <a href={waLink(site.messages.geral)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-neon"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          <a href={site.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-neon"><Globe className="h-4 w-4" /> Site oficial</a>
          <a href={site.privacyUrl} className="text-muted-foreground hover:text-neon">Política de privacidade</a>
        </div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} VEIGANET. Todos os direitos reservados.</p>
    </footer>
  );
}

export function WhatsFab() {
  return (
    <a href={waLink(site.messages.geral)} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" className="btn-glow fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full glow">
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
