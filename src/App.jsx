import { useState, useEffect, useRef } from 'react'

const WA_LINK =
  'https://wa.me/5562999148580?text=Ol%C3%A1!%20Tenho%20interesse%20em%20conhecer%20o%20Evolua%20Ponto.%20Pode%20me%20ajudar%3F'

// ─── Global styles injected via <style> ─────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html { scroll-behavior: smooth; }

      body {
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #0F172A;
        background: #FFFFFF;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      /* ── Scroll reveal ── */
      .reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity .65s ease, transform .65s ease;
      }
      .reveal.visible {
        opacity: 1;
        transform: none;
      }

      /* ── Navbar ── */
      .navbar {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 1000;
        transition: background .3s ease, box-shadow .3s ease;
        padding: 0 48px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .navbar.scrolled {
        background: rgba(255,255,255,0.96);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 1px 20px rgba(0,0,0,0.08);
      }

      /* ── Button base ── */
      .btn-hover { transition: all 0.2s ease; cursor: pointer; }
      .btn-hover:hover { transform: translateY(-1px); }

      /* ── WhatsApp button ── */
      .wa-btn {
        background: #25D366;
        color: #fff;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 800;
        border-radius: 10px;
        text-decoration: none;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      .wa-btn:hover {
        background: #1DA851;
        transform: translateY(-1px);
        box-shadow: 0 8px 28px rgba(37,211,102,0.40);
      }
      .wa-btn.large {
        padding: 15px 30px;
        font-size: 16px;
        box-shadow: 0 4px 16px rgba(37,211,102,0.28);
      }
      .wa-btn.small {
        padding: 10px 20px;
        font-size: 14px;
      }

      /* ── Navbar CTA ── */
      .nav-cta {
        background: #0088CE;
        color: #fff;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
        border-radius: 8px;
        text-decoration: none;
        padding: 10px 18px;
        font-size: 14px;
        transition: all 0.2s ease;
      }
      .nav-cta:hover { background: #006BA3; transform: translateY(-1px); }

      /* ── Section padding ── */
      .sec { padding: 88px 64px; }

      /* ── Feature row ── */
      .feat-row {
        display: flex;
        gap: 64px;
        align-items: center;
        flex-wrap: wrap;
      }
      .feat-row-rev {
        display: flex;
        gap: 64px;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: row-reverse;
      }

      /* ── Browser frame 3-D wrapper ── */
      .frame-3d {
        transform: perspective(900px) rotateY(-4deg) rotateX(2deg);
        flex: 1 1 500px;
        min-width: 300px;
      }

      /* ── Grids ── */
      .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
      .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }

      /* ── Responsive ── */
      @media (max-width: 768px) {
        .navbar { padding: 0 20px; }
        .nav-label { display: none; }
        .sec { padding: 60px 24px !important; }
        .hero-sec { padding: 100px 24px 64px !important; }
        .hero-inner { gap: 40px !important; }
        .feat-row  { flex-direction: column !important; }
        .feat-row-rev { flex-direction: column !important; }
        .frame-3d { transform: none !important; width: 100% !important; flex: none !important; }
        .hero-text { flex: none !important; width: 100% !important; }
        .grid-3 { grid-template-columns: 1fr !important; }
        .grid-4 { grid-template-columns: 1fr 1fr !important; }
        .feat-mockup { overflow: hidden; }
        footer { padding: 36px 24px !important; }
        .wa-btn { white-space: normal; }
        .wa-btn.large { display: flex; width: 100%; justify-content: center; box-sizing: border-box; }
        .wa-btn.small { display: flex; width: 100%; justify-content: center; box-sizing: border-box; }
      }
      @media (max-width: 480px) {
        .hero-sec { padding: 88px 20px 52px !important; }
        .grid-4 { grid-template-columns: 1fr !important; }
        .feat-mockup { display: none !important; }
      }
    `}</style>
  )
}

// ─── Icons ──────────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ClockIcon({ size = 24, color = '#0088CE' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

// ─── Hook: scroll reveal ─────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─── Reusable: BrowserFrame ──────────────────────────────────────────────────
function BrowserFrame({ children, url = 'app.evoluaponto.com.br', height = 380 }) {
  return (
    <div style={{
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.06)',
      background: '#fff',
      height,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Chrome bar */}
      <div style={{
        background: '#F1F5F9',
        borderBottom: '1px solid #E2E8F0',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 5,
          padding: '3px 9px',
          fontSize: 10,
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          border: '1px solid #E2E8F0',
        }}>
          <span>🔒</span>
          <span style={{ fontFamily: 'monospace' }}>{url}</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </div>
  )
}

// ─── Reusable: SideBar ───────────────────────────────────────────────────────
function SideBar({ activeItem = 'Início', showGestao = false }) {
  const mainItems = [
    { label: 'Início',           icon: '⌂' },
    { label: 'Bater ponto',      icon: '⏱' },
    { label: 'Solicitar Ajuste', icon: '✎' },
    { label: 'Comprovantes',     icon: '☰' },
  ]
  const gestaoItems = [
    { label: 'Estabelecimentos', badge: null, icon: '⊞' },
    { label: 'Funcionários',     badge: null, icon: '⊕' },
    { label: 'Escalas',          badge: null, icon: '⊟' },
    { label: 'Solicitações',     badge: '1',  icon: '◆' },
    { label: 'Relatórios',       badge: null, icon: '≡' },
  ]
  const w = showGestao ? 190 : 178

  return (
    <div style={{
      background: '#0088CE',
      width: w,
      minWidth: w,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Logo */}
      <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ClockIcon size={15} color="#fff" />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 12 }}>Evolua Ponto</span>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, paddingTop: 6, overflowY: 'auto' }}>
        {mainItems.map(({ label, icon }) => {
          const active = activeItem === label
          return (
            <div key={label} style={{
              padding: '8px 14px',
              color: '#fff',
              fontWeight: active ? 700 : 400,
              fontSize: 11,
              background: active ? 'rgba(255,255,255,0.22)' : 'transparent',
              borderRadius: active ? '0 8px 8px 0' : 0,
              marginRight: active ? 8 : 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{ fontSize: 10, opacity: 0.85 }}>{icon}</span>
              {label}
            </div>
          )
        })}

        {showGestao && (
          <>
            <div style={{
              padding: '8px 14px',
              color: '#fff',
              fontWeight: 600,
              fontSize: 11,
              background: 'rgba(0,0,0,0.18)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              marginTop: 4,
            }}>
              <span>⚙ Gestão</span>
              <span style={{ fontSize: 9 }}>▲</span>
            </div>
            {gestaoItems.map(g => {
              const active = activeItem === g.label
              return (
                <div key={g.label} style={{
                  padding: '7px 14px 7px 20px',
                  color: '#fff',
                  fontWeight: active ? 700 : 400,
                  fontSize: 10,
                  background: active ? 'rgba(255,255,255,0.22)' : 'transparent',
                  borderRadius: active ? '0 8px 8px 0' : 0,
                  marginRight: active ? 8 : 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 9, opacity: 0.8 }}>{g.icon}</span>
                    {g.label}
                  </span>
                  {g.badge && (
                    <span style={{
                      background: '#EF4444',
                      color: '#fff',
                      borderRadius: 8,
                      padding: '1px 5px',
                      fontSize: 8,
                      fontWeight: 700,
                    }}>
                      {g.badge}
                    </span>
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>

      {/* Sair */}
      <div style={{ padding: '8px 10px 12px', flexShrink: 0 }}>
        <div style={{
          background: '#EF4444',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: 8,
          fontSize: 10,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}>
          ↩ Sair
        </div>
      </div>
    </div>
  )
}

// ─── Reusable: TopBar ────────────────────────────────────────────────────────
function TopBar({ title = 'Início' }) {
  return (
    <div style={{
      background: '#0088CE',
      height: 42,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 14px',
      flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>{title}</span>
      <div style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.22)',
        border: '2px solid rgba(255,255,255,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
      }}>
        👤
      </div>
    </div>
  )
}

// ─── Section 0: Navbar ───────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ClockIcon size={22} color={scrolled ? '#0088CE' : '#fff'} />
        <span style={{
          fontWeight: 800,
          fontSize: 18,
          color: scrolled ? '#0F172A' : '#fff',
          transition: 'color .3s ease',
        }}>
          Evolua Ponto
        </span>
      </div>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="nav-cta btn-hover">
        <WhatsAppIcon size={15} />
        <span className="nav-label">Falar com especialista</span>
      </a>
    </nav>
  )
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero-sec" style={{
      background: 'linear-gradient(145deg, #0088CE 0%, #004f7c 55%, #003356 100%)',
      padding: '140px 64px 96px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="hero-inner" style={{
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        gap: 64,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>

        {/* Left: text */}
        <div style={{ flex: '1 1 400px', minWidth: 300 }} className="hero-text">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
            borderRadius: 20,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 24,
            border: '1px solid rgba(255,255,255,0.20)',
          }}>
            ✓ Conformidade Portaria 671 · MTE
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.12,
            marginBottom: 20,
          }}>
            O ponto eletrônico{' '}
            <span style={{ color: '#7DD3FC' }}>inteligente</span>
            {' '}que sua<br />empresa merece
          </h1>

          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.76)',
            maxWidth: 460,
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            Registre ponto com GPS em tempo real, gerencie equipes e gere relatórios fiscais com assinatura digital — tudo em um só lugar.
          </p>

          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-btn large btn-hover">
            <WhatsAppIcon size={22} />
            Quero uma demonstração gratuita
          </a>

          <div style={{ display: 'flex', gap: 20, marginTop: 22, flexWrap: 'wrap' }}>
            {['GPS em tempo real', 'Sem hardware extra', 'Web + Mobile'].map(b => (
              <span key={b} style={{ fontSize: 13, color: 'rgba(255,255,255,0.70)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#4ADE80', fontWeight: 700 }}>✓</span> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Right: login mockup (3-D) */}
        <div className="frame-3d">
          <BrowserFrame url="app.evoluaponto.com.br" height={370}>
            <div style={{ display: 'flex', height: '100%' }}>
              {/* Blue side */}
              <div style={{
                flex: 1,
                background: 'linear-gradient(140deg, #0088CE, #005081)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px 20px',
                color: '#fff',
                textAlign: 'center',
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 900, lineHeight: 1.3, marginBottom: 8 }}>
                  Bem-vindo ao<br />Evolua Ponto
                </h2>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginBottom: 22, lineHeight: 1.5 }}>
                  Gestão de jornada inteligente e descomplicada.
                </p>
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 12,
                  padding: '16px 20px',
                  backdropFilter: 'blur(4px)',
                }}>
                  <div style={{ fontSize: 32 }}>👤📍</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
                    Registro com localização
                  </div>
                </div>
              </div>

              {/* White side — login form */}
              <div style={{
                flex: 1,
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px 22px',
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#E6F4FC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <ClockIcon size={22} color="#0088CE" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0088CE', marginBottom: 4 }}>
                  Acessar Conta
                </h3>
                <p style={{ fontSize: 11, color: '#64748B', marginBottom: 18 }}>
                  Entre com suas credenciais
                </p>
                {[{ icon: '✉', label: 'Email' }, { icon: '🔒', label: 'Senha' }].map(f => (
                  <div key={f.label} style={{
                    border: '1.5px solid #E2E8F0',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 11,
                    color: '#64748B',
                    marginBottom: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    {f.icon} {f.label}
                  </div>
                ))}
                <div style={{
                  background: '#0088CE',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '9px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: 'center',
                  cursor: 'pointer',
                  marginTop: 2,
                }}>
                  Entrar
                </div>
              </div>
            </div>
          </BrowserFrame>
        </div>
      </div>
    </section>
  )
}

// ─── Section 2: Problema ─────────────────────────────────────────────────────
function ProblemSection() {
  const [ref, visible] = useScrollReveal()
  const cards = [
    { emoji: '📋', title: 'Ainda usa planilha?', text: 'Planilhas são imprecisas, manipuláveis e sem validade legal. Sua empresa está vulnerável em fiscalizações.' },
    { emoji: '📍', title: 'Sem controle de localização?', text: 'Como garantir que o funcionário bateu o ponto de onde deveria? Sem GPS você simplesmente não sabe.' },
    { emoji: '📑', title: 'Relatórios fiscais na mão?', text: 'AFD e AEJ exigidos pelo MTE — gerar manualmente é demorado, chato e sujeito a erros.' },
  ]
  return (
    <section className="sec" style={{ background: '#F8FAFC' }}>
      <div ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0088CE', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>
            SUA EMPRESA HOJE
          </p>
          <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 900, color: '#0F172A', maxWidth: 540 }}>
            Esses problemas custam tempo e dinheiro todos os dias
          </h2>
        </div>
        <div className="grid-3">
          {cards.map(c => (
            <div key={c.title} style={{
              background: '#fff',
              borderRadius: 12,
              padding: '28px 26px',
              borderLeft: '4px solid #0088CE',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{c.emoji}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 3: Feature — Bater Ponto ────────────────────────────────────────
function FeaturePunchSection() {
  const [ref, visible] = useScrollReveal()
  const bullets = [
    'Raio de geolocalização configurável por unidade',
    'Modal de confirmação — zero registro acidental',
    'Funciona no celular sem instalar app',
    'Data, hora, coordenadas e hash SHA-256 por batida',
  ]
  return (
    <section className="sec" style={{ background: '#fff' }}>
      <div ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="feat-row">
          {/* Text */}
          <div style={{ flex: '1 1 360px' }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#0088CE',
              letterSpacing: '2px', textTransform: 'uppercase', background: '#E6F4FC',
              padding: '4px 12px', borderRadius: 20, marginBottom: 16,
            }}>
              REGISTRO DE PONTO
            </span>
            <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#0F172A', marginBottom: 16, lineHeight: 1.2 }}>
              Bata o ponto com GPS em segundos
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
              Funcionários registram entrada e saída pelo navegador ou celular. O sistema valida a localização em tempo real e exige confirmação antes de gravar.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {bullets.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#334155' }}>
                  <span style={{ color: '#0088CE', fontWeight: 700, fontSize: 15, lineHeight: 1.1, flexShrink: 0 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Mockup */}
          <div className="feat-mockup" style={{ flex: '1 1 480px' }}>
            <BrowserFrame url="app.evoluaponto.com.br/ponto" height={388}>
              <div style={{ display: 'flex', height: '100%' }}>
                <SideBar activeItem="Bater ponto" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8FAFC', position: 'relative' }}>
                  <TopBar title="Bater ponto" />
                  <div style={{ flex: 1, padding: '10px 12px', overflowY: 'auto' }}>
                    {/* Map */}
                    <div style={{
                      height: 132,
                      borderRadius: 8,
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #EDF7E6, #C8DEB0)',
                      position: 'relative',
                      marginBottom: 7,
                    }}>
                      {/* Street lines */}
                      {[
                        { top: '38%', left: 0, right: 0, height: 2, width: undefined, bottom: undefined },
                        { top: '70%', left: 0, right: 0, height: 1, width: undefined, bottom: undefined },
                      ].map((s, i) => (
                        <div key={i} style={{ position: 'absolute', background: 'rgba(255,255,255,0.65)', ...s }} />
                      ))}
                      {[
                        { left: '28%', top: 0, bottom: 0, width: 2, height: undefined, right: undefined },
                        { left: '62%', top: 0, bottom: 0, width: 1, height: undefined, right: undefined },
                      ].map((s, i) => (
                        <div key={i} style={{ position: 'absolute', background: 'rgba(255,255,255,0.55)', ...s }} />
                      ))}
                      {/* Radius circle */}
                      <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 66, height: 66, borderRadius: '50%',
                        border: '2px solid rgba(0,136,206,0.40)',
                        background: 'rgba(0,136,206,0.08)',
                      }} />
                      {/* Pin */}
                      <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -100%) rotate(-45deg)',
                        width: 18, height: 18,
                        borderRadius: '50% 50% 50% 0',
                        background: '#0088CE',
                        border: '2.5px solid #fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.28)',
                      }} />
                    </div>

                    <p style={{ fontSize: 9, color: '#64748B', textAlign: 'center', marginBottom: 6 }}>
                      Você está a 127 m do local de trabalho ✓
                    </p>

                    {/* Clock */}
                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', letterSpacing: 1 }}>08:47:23</div>
                      <div style={{ fontSize: 9, color: '#64748B' }}>segunda-feira, 17 de maio de 2026</div>
                    </div>

                    {/* Segmented */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 7 }}>
                      <button style={{
                        flex: 1, padding: '6px 0', borderRadius: 7,
                        border: '1.5px solid #0088CE', background: '#E6F4FC',
                        color: '#0088CE', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                      }}>↪ Entrada</button>
                      <button style={{
                        flex: 1, padding: '6px 0', borderRadius: 7,
                        border: '1.5px solid #E2E8F0', background: '#fff',
                        color: '#64748B', fontSize: 10, fontWeight: 600, cursor: 'pointer',
                      }}>↩ Saída</button>
                    </div>

                    <button style={{
                      width: '100%', padding: '8px 0', borderRadius: 8,
                      border: 'none', background: '#0088CE',
                      color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer',
                    }}>
                      Bater Ponto
                    </button>
                  </div>

                  {/* Confirmation modal overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(15,23,42,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10,
                  }}>
                    <div style={{
                      background: '#fff',
                      borderRadius: 12,
                      padding: '20px 18px',
                      width: '78%', maxWidth: 230,
                      boxShadow: '0 16px 48px rgba(0,0,0,0.22)',
                      textAlign: 'center',
                    }}>
                      <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                        Confirmar Registro
                      </h4>
                      <p style={{ fontSize: 10, color: '#64748B', marginBottom: 12 }}>
                        Você está prestes a registrar um ponto de:
                      </p>
                      <div style={{
                        border: '2px solid #0088CE', color: '#0088CE',
                        borderRadius: 8, padding: '9px 0',
                        fontSize: 17, fontWeight: 800, letterSpacing: 3, marginBottom: 14,
                      }}>
                        ENTRADA
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{
                          flex: 1, padding: '7px 0', borderRadius: 7,
                          border: '1.5px solid #E2E8F0', background: '#F8FAFC',
                          color: '#64748B', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                        }}>Cancelar</button>
                        <button style={{
                          flex: 1, padding: '7px 0', borderRadius: 7,
                          border: 'none', background: '#0088CE',
                          color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                        }}>Confirmar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: Feature — Espelho de Ponto ───────────────────────────────────
function FeatureMirrorSection() {
  const [ref, visible] = useScrollReveal()
  const bullets = [
    'Calendário mensal com status de cada dia',
    'Alertas visuais para ausências e marcações ímpares',
    'Identificação automática de feriados nacionais',
    'Solicitação de ajuste de ponto com justificativa',
  ]
  const days = [
    { day: 17, wd: 'DOM.', type: 'today' },
    { day: 16, wd: 'SÁB.', type: 'folga' },
    { day: 15, wd: 'SEX.', type: 'normal',     chips: ['↪ 07:42', '↩ 17:00'] },
    { day: 14, wd: 'QUI.', type: 'incomplete', chips: ['↪ 11:12'] },
    { day: 13, wd: 'QUA.', type: 'absent' },
    { day: 12, wd: 'TER.', type: 'incomplete', chips: ['↪ 08:22', '↩ 08:23', '↪ 11:20'] },
    { day: 11, wd: 'SEG.', type: 'normal',     chips: ['↪ 16:37', '↩ 16:38'] },
  ]

  function dayBg(type) {
    if (type === 'absent') return '#FEE2E2'
    return '#fff'
  }
  function dayBorder(type) {
    if (type === 'today')  return '2px solid #0088CE'
    if (type === 'absent') return '1px solid #EF4444'
    return '1px solid #E2E8F0'
  }
  function dayNumColor(type) {
    if (type === 'today')  return '#0088CE'
    if (type === 'absent') return '#EF4444'
    return '#0F172A'
  }

  return (
    <section className="sec" style={{ background: '#F8FAFC' }}>
      <div ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="feat-row-rev">
          {/* Text */}
          <div style={{ flex: '1 1 360px' }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#0088CE',
              letterSpacing: '2px', textTransform: 'uppercase', background: '#E6F4FC',
              padding: '4px 12px', borderRadius: 20, marginBottom: 16,
            }}>
              ESPELHO DE PONTO
            </span>
            <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#0F172A', marginBottom: 16, lineHeight: 1.2 }}>
              Cada colaborador vê sua jornada completa
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
              Visão clara do mês inteiro: entradas, saídas, folgas e ausências — tudo sinalizado visualmente.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {bullets.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#334155' }}>
                  <span style={{ color: '#0088CE', fontWeight: 700, fontSize: 15, lineHeight: 1.1, flexShrink: 0 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Mockup */}
          <div className="feat-mockup" style={{ flex: '1 1 480px' }}>
            <BrowserFrame url="app.evoluaponto.com.br" height={388}>
              <div style={{ display: 'flex', height: '100%' }}>
                <SideBar activeItem="Início" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
                  <TopBar title="Início" />
                  <div style={{ flex: 1, padding: '10px 12px', overflowY: 'auto' }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginBottom: 1 }}>Meu Ponto</p>
                    <p style={{ fontSize: 9, color: '#64748B', marginBottom: 9 }}>Olá, Vitor Funcionário · maio/2026</p>

                    {/* Days */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {days.map(d => (
                        <div key={d.day} style={{
                          display: 'flex', borderRadius: 7, overflow: 'hidden',
                          border: dayBorder(d.type), background: dayBg(d.type),
                        }}>
                          {/* Date */}
                          <div style={{
                            padding: '6px 8px',
                            borderRight: '1px solid #E2E8F0',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', minWidth: 36,
                            background: d.type === 'today' ? '#E6F4FC' : 'transparent',
                          }}>
                            <span style={{ fontSize: 13, fontWeight: 800, color: dayNumColor(d.type) }}>{d.day}</span>
                            <span style={{ fontSize: 7, color: d.type === 'today' ? '#0088CE' : '#64748B', fontWeight: 600 }}>{d.wd}</span>
                            {d.type === 'today' && (
                              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#0088CE', marginTop: 2 }} />
                            )}
                          </div>
                          {/* Content */}
                          <div style={{
                            flex: 1, padding: '5px 8px',
                            display: 'flex', alignItems: 'center',
                            flexWrap: 'wrap', gap: 3,
                          }}>
                            {(d.type === 'today' || d.type === 'folga') && (
                              <span style={{ fontSize: 9, color: '#64748B', fontStyle: 'italic' }}>Folga</span>
                            )}
                            {d.type === 'absent' && (
                              <>
                                <span style={{ fontSize: 9, color: '#EF4444', fontStyle: 'italic', flex: 1 }}>Ausente</span>
                                <span style={{ fontSize: 13 }}>⚠</span>
                              </>
                            )}
                            {d.chips && d.chips.map(chip => (
                              <span key={chip} style={{
                                background: 'rgba(0,136,206,0.09)',
                                border: '1px solid rgba(0,136,206,0.28)',
                                color: '#0088CE', borderRadius: 5,
                                padding: '1px 5px', fontSize: 9, fontWeight: 600,
                              }}>
                                {chip}
                              </span>
                            ))}
                            {d.type === 'incomplete' && (
                              <span style={{ fontSize: 12, marginLeft: 'auto' }}>⏰</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 5: Feature — Gestão ─────────────────────────────────────────────
function FeatureManagementSection() {
  const [ref, visible] = useScrollReveal()
  const bullets = [
    'Multi-estabelecimento com GPS individual por unidade',
    'Busca de funcionários por nome ou CPF',
    'Escalas de trabalho personalizadas por equipe',
    'Fila de aprovação de ajustes com justificativa',
  ]
  const establishments = [
    { name: 'Filial Centro',       addr: 'Av. Goiás, 1000 - Centro',       city: 'Goiânia / GO' },
    { name: 'Filial Setor Bueno',  addr: 'Rua 92, 500 - Setor Bueno',      city: 'Goiânia / GO' },
  ]

  function Toggle() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 26, height: 14, borderRadius: 7, background: '#0088CE', position: 'relative' }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%', background: '#fff',
            position: 'absolute', right: 2, top: 2,
          }} />
        </div>
        <span style={{ fontSize: 8, color: '#0088CE', fontWeight: 700 }}>Ativo</span>
      </div>
    )
  }

  return (
    <section className="sec" style={{ background: '#fff' }}>
      <div ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="feat-row">
          {/* Text */}
          <div style={{ flex: '1 1 360px' }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#0088CE',
              letterSpacing: '2px', textTransform: 'uppercase', background: '#E6F4FC',
              padding: '4px 12px', borderRadius: 20, marginBottom: 16,
            }}>
              GESTÃO COMPLETA
            </span>
            <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#0F172A', marginBottom: 16, lineHeight: 1.2 }}>
              Controle total de equipes e unidades
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
              Cadastre múltiplos estabelecimentos, gerencie funcionários, defina escalas e aprove ajustes — tudo no mesmo painel.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {bullets.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#334155' }}>
                  <span style={{ color: '#0088CE', fontWeight: 700, fontSize: 15, lineHeight: 1.1, flexShrink: 0 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Mockup */}
          <div className="feat-mockup" style={{ flex: '1 1 480px' }}>
            <BrowserFrame url="app.evoluaponto.com.br/gestao" height={388}>
              <div style={{ display: 'flex', height: '100%' }}>
                <SideBar activeItem="Estabelecimentos" showGestao />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8FAFC', position: 'relative' }}>
                  <TopBar title="Estabelecimentos" />
                  <div style={{ flex: 1, padding: '10px 12px', overflowY: 'auto' }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#0088CE', marginBottom: 2 }}>Minha Empresa</p>
                    <p style={{ fontSize: 9, color: '#64748B', marginBottom: 10 }}>Gerencie seus estabelecimentos</p>

                    {establishments.map(e => (
                      <div key={e.name} style={{
                        background: '#fff', borderRadius: 10, padding: '10px 12px',
                        marginBottom: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        border: '1px solid #E2E8F0',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <div>
                            <p style={{ fontSize: 11, fontWeight: 800, color: '#0F172A', marginBottom: 3 }}>{e.name}</p>
                            <p style={{ fontSize: 9, color: '#64748B' }}>📍 {e.addr}</p>
                            <p style={{ fontSize: 9, color: '#64748B' }}>🏙 {e.city}</p>
                          </div>
                          <Toggle />
                        </div>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                          {['👥', '✏'].map(ic => (
                            <button key={ic} style={{
                              border: 'none', background: '#E6F4FC', borderRadius: 6,
                              padding: '4px 8px', fontSize: 12, cursor: 'pointer',
                            }}>{ic}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FAB */}
                  <div style={{
                    position: 'absolute', bottom: 12, right: 12,
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#0088CE', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontWeight: 300, cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,136,206,0.42)',
                    lineHeight: 1,
                  }}>
                    +
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 6: Conformidade ─────────────────────────────────────────────────
function ComplianceSection() {
  const [ref, visible] = useScrollReveal()
  const cards = [
    { emoji: '📄', title: 'AFD — Arquivo de Fonte de Dados',    text: 'Gerado conforme Portaria 671 com assinatura CAdES e arquivo .p7s.' },
    { emoji: '⚖️', title: 'AEJ — Arquivo Eletrônico de Jornada', text: 'Exportação com cálculo de horas trabalhadas, extras e atrasos.' },
    { emoji: '📊', title: 'Espelho de Ponto PDF e Excel',        text: 'Relatório individual ou em lote com assinatura digital, pronto para auditorias.' },
    { emoji: '🔐', title: 'Hash SHA-256 em cada batida',         text: 'Todo registro gera hash criptográfico único — imutabilidade e rastreabilidade jurídica.' },
  ]
  return (
    <section className="sec" style={{ background: 'linear-gradient(135deg, #0088CE 0%, #004f7c 100%)' }}>
      <div ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#7DD3FC', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>
            CONFORMIDADE LEGAL
          </p>
          <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 900, color: '#fff', maxWidth: 620, margin: '0 auto 18px' }}>
            100% em conformidade com a Portaria 671 do MTE
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.70)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Sem surpresas em fiscalização. Todos os arquivos exigidos pelo MTE com assinatura digital válida.
          </p>
        </div>
        <div className="grid-4">
          {cards.map(c => (
            <div key={c.title} style={{
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 12, padding: '24px 20px',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{c.emoji}</div>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.70)', lineHeight: 1.65 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 7: Como Funciona ────────────────────────────────────────────────
function HowItWorksSection() {
  const [ref, visible] = useScrollReveal()
  const steps = [
    { num: '01', title: 'Cadastre sua empresa',           text: 'Configure estabelecimentos com raio de GPS, crie escalas e cadastre os funcionários com perfis de acesso.' },
    { num: '02', title: 'Funcionários batem ponto',       text: 'Via navegador ou celular, o colaborador registra entrada e saída com confirmação de localização em tempo real.' },
    { num: '03', title: 'Gestão e relatórios em um clique', text: 'Acompanhe o espelho, aprove ajustes e exporte relatórios fiscais para o MTE com assinatura digital.' },
  ]
  return (
    <section className="sec" style={{ background: '#F8FAFC' }}>
      <div ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0088CE', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>
            COMO FUNCIONA
          </p>
          <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 900, color: '#0F172A' }}>
            Simples de configurar, fácil de usar todo dia
          </h2>
        </div>
        <div className="grid-3">
          {steps.map(s => (
            <div key={s.num} style={{
              background: '#fff', borderRadius: 12,
              padding: '28px 26px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 46, height: 46, borderRadius: '50%',
                background: '#0088CE', color: '#fff',
                fontSize: 14, fontWeight: 900, marginBottom: 18,
                boxShadow: '0 4px 14px rgba(0,136,206,0.38)',
              }}>
                {s.num}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 8: CTA Final ────────────────────────────────────────────────────
function FinalCTASection() {
  const [ref, visible] = useScrollReveal()
  return (
    <section className="sec" style={{ background: '#fff' }}>
      <div ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 44, marginBottom: 20 }}>🚀</div>
        <h2 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: '#0F172A', marginBottom: 18, lineHeight: 1.2 }}>
          Pronto para modernizar o controle de ponto da sua empresa?
        </h2>
        <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, marginBottom: 34 }}>
          Fale agora com um especialista, tire suas dúvidas e veja o sistema funcionando ao vivo.
        </p>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-btn large btn-hover" style={{ marginBottom: 26 }}>
          <WhatsAppIcon size={22} />
          Quero uma demonstração gratuita
        </a>
        <div style={{ display: 'flex', gap: 22, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Sem compromisso', 'Atendimento rápido', 'Demo ao vivo'].map(p => (
            <span key={p} style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#0088CE', fontWeight: 700 }}>✓</span> {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: '#0F172A',
      padding: '36px 64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <ClockIcon size={20} color="#0088CE" />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>Evolua Ponto</span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
          Gestão de jornada inteligente para a sua empresa.
        </p>
      </div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>
        © {new Date().getFullYear()} Evolua Ponto. Todos os direitos reservados.
      </p>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeaturePunchSection />
      <FeatureMirrorSection />
      <FeatureManagementSection />
      <ComplianceSection />
      <HowItWorksSection />
      <FinalCTASection />
      <Footer />
    </>
  )
}
