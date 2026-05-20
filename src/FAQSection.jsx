import { useState, useEffect, useRef } from 'react'

const WA_LINK =
  'https://wa.me/5562999148580?text=Ol%C3%A1!%20Tenho%20interesse%20em%20conhecer%20o%20Evolua%20Ponto.%20Pode%20me%20ajudar%3F'

const FAQS = [
  {
    q: 'O sistema substitui o relógio de ponto físico?',
    a: 'O Evolua Ponto é um REP-A (Registrador Eletrônico de Ponto Alternativo), modalidade prevista na Portaria MTE 671/2021. Para uso regularizado, a empresa precisa ter convenção ou acordo coletivo vigente que autorize sistemas alternativos de ponto — o que é comum em diversas categorias. Nosso representante orienta você nessa verificação antes da contratação.',
  },
  {
    q: 'Precisa instalar algum aplicativo?',
    a: 'Não. O sistema funciona direto no navegador do celular ou computador. O funcionário acessa pelo link, faz login e bate o ponto. Sem download, sem instalação, funciona em qualquer aparelho.',
  },
  {
    q: 'O funcionário pode bater ponto de qualquer lugar?',
    a: 'Cada estabelecimento tem um raio de geolocalização configurável. Registros fora do raio ficam sinalizados no histórico do administrador. O sistema garante transparência total sobre onde cada batida foi realizada.',
  },
  {
    q: 'O sistema rastreia o funcionário o tempo todo?',
    a: 'Não. A localização é capturada apenas no momento exato do registro — entrada ou saída. Sem monitoramento contínuo nem histórico de localização além dos momentos de registro.',
  },
  {
    q: 'O registro tem validade jurídica?',
    a: 'Sim, para empresas com o instrumento coletivo exigido para REP-A. Cada batida gera um hash criptográfico SHA-256 único e os relatórios são assinados digitalmente com certificado ICP-Brasil. Os dados não podem ser alterados sem que a adulteração seja detectada.',
  },
  {
    q: 'Quais relatórios o sistema gera?',
    a: 'AFD e AEJ (exigidos pelo MTE), Espelho de Ponto em PDF com assinatura digital e Excel em lote — todos gerados em poucos cliques, sem montar planilha.',
  },
  {
    q: 'Funciona para empresas com mais de uma filial?',
    a: 'Sim. Cadastre quantas filiais precisar, cada uma com seu endereço e raio de GPS próprios. Gerencie todos os funcionários de todas as unidades no mesmo painel.',
  },
  {
    q: 'E se o funcionário esquecer de bater o ponto?',
    a: 'Ele solicita um ajuste com justificativa diretamente no sistema. O administrador aprova ou rejeita. Se aprovado, o registro é criado com assinatura digital e identificado como ajuste manual no histórico.',
  },
  {
    q: 'Quanto tempo leva para começar a usar?',
    a: 'A implantação básica leva horas, não semanas. Cadastre a empresa, os estabelecimentos, as escalas e os funcionários — e está pronto. Nosso representante acompanha você nos primeiros passos.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Você tem um representante comercial dedicado como primeiro ponto de contato. Dúvidas de uso são resolvidas diretamente com ele, sem fila de tickets. Problemas técnicos são escalados para nossa equipe de desenvolvimento.',
  },
]

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function FAQSection() {
  const [open, setOpen] = useState(null)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function toggle(i) {
    setOpen(prev => (prev === i ? null : i))
  }

  return (
    <>
      <style>{`
        .faq-cta:hover {
          background: #1DA851 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 8px 28px rgba(37,211,102,0.40) !important;
        }
        @media (max-width: 768px) {
          .faq-section { padding: 60px 24px !important; }
          .faq-cta {
            white-space: normal !important;
            display: flex !important;
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
        }
        @media (max-width: 480px) {
          .faq-section { padding: 52px 20px !important; }
        }
      `}</style>

      <section
        className="faq-section"
        style={{ background: '#F8FAFC', padding: '96px 48px' }}
      >
        <div
          ref={sectionRef}
          style={{
            maxWidth: 760,
            margin: '0 auto',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Label */}
          <p style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#0088CE',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 14,
          }}>
            DÚVIDAS FREQUENTES
          </p>

          {/* Title */}
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 900,
            color: '#0F172A',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            Perguntas frequentes
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: 15,
            color: '#64748B',
            textAlign: 'center',
            marginBottom: 48,
            lineHeight: 1.6,
          }}>
            Não encontrou sua dúvida?{' '}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0088CE', fontWeight: 600, textDecoration: 'none' }}
            >
              Fale com a gente no WhatsApp.
            </a>
          </p>

          {/* Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((item, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: 12,
                    border: `1.5px solid ${isOpen ? '#0088CE' : '#E2E8F0'}`,
                    boxShadow: isOpen
                      ? '0 4px 20px rgba(0,136,206,0.10)'
                      : '0 1px 4px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '20px 22px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: isOpen ? '#0088CE' : '#0F172A',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      lineHeight: 1.4,
                      transition: 'color 0.2s ease',
                    }}>
                      {item.q}
                    </span>

                    <span style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isOpen ? '#0088CE' : '#F1F5F9',
                      color: isOpen ? '#fff' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      fontWeight: 300,
                      lineHeight: 1,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease, background 0.2s ease, color 0.2s ease',
                      userSelect: 'none',
                    }}>
                      +
                    </span>
                  </button>

                  {/* Answer */}
                  <div style={{
                    maxHeight: isOpen ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}>
                    <p style={{
                      margin: 0,
                      padding: '0 22px 20px',
                      fontSize: 14,
                      color: '#475569',
                      lineHeight: 1.75,
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="faq-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#25D366',
                color: '#fff',
                borderRadius: 10,
                padding: '15px 30px',
                fontSize: 15,
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(37,211,102,0.28)',
                transition: 'all 0.2s ease',
              }}
            >
              <WhatsAppIcon size={20} />
              Ainda tem dúvidas? Fale com a gente
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
