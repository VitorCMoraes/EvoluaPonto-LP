# Evolua Ponto — Landing Page

Landing page institucional do **Evolua Ponto**, sistema SaaS de controle de ponto eletrônico para empresas brasileiras. Desenvolvida em React + Vite, apresenta os principais diferenciais do produto e direciona leads para um atendimento via WhatsApp.

## Stack

| Tecnologia | Versão |
|---|---|
| React | 18.x |
| Vite | 5.x |
| @vitejs/plugin-react | 4.x |

Sem dependências de UI externas — estilos escritos via CSS-in-JS inline e um bloco `<style>` global.

## Pré-requisitos

- Node.js 18+ instalado
- npm 9+

## Instalação e execução local

```bash
# instalar dependências
npm install

# iniciar servidor de desenvolvimento (http://localhost:5173)
npm run dev
```

## Build de produção

```bash
npm run build
```

Os arquivos otimizados são gerados em `dist/`. Para pré-visualizar o build localmente:

```bash
npm run preview
```

## Estrutura do projeto

```
evolua-ponto-lp/
├── index.html          # Ponto de entrada HTML
├── vite.config.js      # Configuração do Vite
├── src/
│   ├── main.jsx        # Bootstrap do React
│   └── App.jsx         # Toda a aplicação (componentes e seções)
└── dist/               # Build gerado (não versionado)
```

## Seções da página

| # | Seção | Descrição |
|---|---|---|
| 0 | Navbar | Barra fixa com CTA de contato |
| 1 | Hero | Headline principal e mockup do sistema |
| 2 | Problema | Dores comuns de quem ainda usa planilhas |
| 3 | Bater Ponto | Registro com GPS e hash SHA-256 |
| 4 | Espelho de Ponto | Relatório digital auditável |
| 5 | Gestão | Painel completo para gestores |
| 6 | Conformidade | Geração de AFD/AEJ exigidos pelo MTE |
| 7 | Como Funciona | Fluxo em 3 passos |
| 8 | CTA Final | Chamada para demonstração gratuita |

## Contato / CTA

Todos os botões redirecionam para o WhatsApp do time comercial. Para atualizar o número ou a mensagem pré-preenchida, edite a constante `WA_LINK` no topo de [src/App.jsx](src/App.jsx).
