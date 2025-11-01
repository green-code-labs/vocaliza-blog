# Blog da Vocaliza - Documentação Técnica# Blog da Vocaliza - Documentação Técnica



> Blog oficial da Vocaliza sobre Inteligência Artificial, IA de Voz e Automação de Atendimento> Blog oficial da Vocaliza sobre Inteligência Artificial, IA de Voz e Automação



[![Hugo](https://img.shields.io/badge/Hugo-0.152.2-blue)](https://gohugo.io/)[![Hugo](https://img.shields.io/badge/Hugo-0.152.2-blue)](https://gohugo.io/)

[![Theme](https://img.shields.io/badge/Theme-PaperMod-brightgreen)](https://github.com/adityatelange/hugo-PaperMod)[![Theme](https://img.shields.io/badge/Theme-PaperMod-brightgreen)](https://github.com/adityatelange/hugo-PaperMod)



## Índice## ��� Visão Geral



- Visão GeralBlog estático construído com **Hugo** focado em conteúdo de alta qualidade sobre IA, machine learning e automação de atendimento.

- Requisitos

- Instalação### Objetivos

- Estrutura do Projeto- SEO: Ranquear top 3 para palavras-chave de IA de voz

- Desenvolvimento- Educação: Conteúdo técnico sobre IA conversacional

- Criação de Conteúdo- Lead Generation: Atrair clientes para plataforma Vocaliza

- Build e Deploy

- Customizações (CSS/JS)### Stack Tecnológica

- SEO- **Generator**: Hugo v0.152.2 Extended

- Troubleshooting- **Theme**: PaperMod (customizado)

- **CSS**: Design system customizado (800+ linhas)

---- **JavaScript**: Interatividade (350+ linhas)

- **Fontes**: Inter (Google Fonts)

## Visão Geral- **Deploy**: GitHub Pages / Netlify / Vercel



O **Blog da Vocaliza** é um site estático em [Hugo](https://gohugo.io/) com o tema [PaperMod](https://github.com/adityatelange/hugo-PaperMod) e customizações visuais/JS para refletir a identidade do [vocaliza.app](https://vocaliza.app).## �� Quick Start



Objetivos:```bash

- SEO: ranquear para termos relacionados a IA de voz# Clonar repositório

- Educação: explicar tecnologias de IA aplicadas a atendimentogit clone https://github.com/green-code-labs/vocaliza-blog.git

- Conversão: levar tráfego qualificado à plataformacd vocaliza-blog



---# Instalar Hugo Extended

# Windows: scoop install hugo-extended

## Requisitos# macOS: brew install hugo

# Linux: https://gohugo.io/installation/

- Hugo Extended v0.152.2+

- Git# Iniciar servidor de desenvolvimento

- Opcional: Node.js 18+hugo server -D



Verificar:# Acessar: http://localhost:1313

```bash```

hugo version

git --version## ��� Estrutura do Projeto

```

```

---vocaliza-blog/

├── assets/

## Instalação│   ├── css/extended/        # CSS customizado

│   │   ├── custom.css       # Design system

```bash│   │   └── animations.css   # Animações

git clone https://github.com/green-code-labs/vocaliza-blog.git│   └── js/

cd vocaliza-blog│       └── extended.js      # JavaScript features

hugo server -D├── content/

```│   ├── posts/               # Artigos (16 posts)

Acesse http://localhost:1313│   ├── sobre/               # Página Sobre

│   └── contato/             # Contato (WhatsApp)

---├── layouts/

│   ├── _default/            # Templates

## Estrutura do Projeto│   ├── partials/            # Componentes

│   │   └── extend_head.html # Meta tags, Schema.org

```│   └── index.html           # Homepage custom

assets/css/extended/      # custom.css, animations.css├── static/

assets/js/extended.js     # interações (progress bar, scroll-top, etc.)│   ├── CNAME                # blog.vocaliza.app

content/                  # posts e páginas (sobre, contato)│   └── images/

layouts/                  # layouts custom (index, list, single)├── themes/PaperMod/         # Tema base

static/                   # assets estáticos (favicons, imagens)├── hugo.toml                # Configuração

themes/PaperMod/          # tema base├── README.md                # Este arquivo

hugo.toml                 # configuração geral (menu, params, SEO)└── PROJECT_MANAGEMENT.md    # Doc de gerenciamento

``````



Arquivos-chave:## ✍️ Criação de Conteúdo

- `assets/css/extended/custom.css`: design system e navegação

- `assets/js/extended.js`: funcionalidades JS (defer)### Novo Post

- `layouts/index.html`: home custom

- `layouts/_default/single.html`: CTA no rodapé do post```bash

- `layouts/partials/extend_head.html`: fontes, schema.org, scriptshugo new posts/meu-post.md

```

---

### Front Matter Obrigatório

## Desenvolvimento

```yaml

Servidor local com hot reload:---

```bashtitle: "Título SEO-friendly (50-60 chars)"

hugo server -Ddate: 2025-10-31T10:00:00-03:00

```draft: false  # true = rascunho

Build de produção:description: "Meta description 150-160 chars para SEO"

```bashkeywords: ["palavra1", "palavra2", "palavra3"]

hugo --gc --minifycategories: ["Inteligência Artificial"]

```tags: ["IA", "ML", "NLP"]

Saída em `/public`.author: "Equipe Vocaliza"

---

---```



## Criação de Conteúdo### Boas Práticas



Novo post:**SEO:**

```bash- Título com palavra-chave principal

hugo new posts/meu-artigo.md- 1.500-2.500 palavras

```- Headings hierárquicos (H1 → H2 → H3)

Front matter recomendado:- Links internos entre posts

```yaml- Alt text em imagens

---

title: "Título SEO-friendly"**Legibilidade:**

date: 2025-11-01T10:00:00-03:00- Parágrafos curtos (2-3 frases)

draft: false- Listas e bullet points

description: "Meta description (150-160 caracteres)"- Exemplos práticos de código

keywords: ["palavra1", "palavra2", "palavra3"]- Call-to-action ao final

categories: ["Inteligência Artificial"]

tags: ["IA", "Voz"]## ���️ Build e Deploy

author: "Equipe Vocaliza"

---### Build Local

```

Covers opcionais:```bash

```yaml# Build de produção

cover:hugo --gc --minify

  image: "/images/capa.webp"

  alt: "Descrição da imagem"# Output gerado em /public/

  caption: "Legenda opcional"```

```

### Deploy GitHub Pages

---

**Automático via GitHub Actions:**

## Build e Deploy

Arquivo `.github/workflows/deploy.yml`:

- Produção local: `hugo --gc --minify`

- Deploy GitHub Pages/Netlify/Vercel (configure para publicar `/public`)```yaml

- Domínio: `static/CNAME` ou painel do provedorname: Deploy Hugo



---on:

  push:

## Customizações (CSS/JS)    branches: ["main"]



- Menu estilizado: ver `.header` e `.nav a` em `assets/css/extended/custom.css`jobs:

- Mensagem inicial (home-info) com correções de overflow: classe `.home-info`  build:

- Botão "Plataforma" estilizado como CTA no menu    runs-on: ubuntu-latest

    steps:

JS (em `assets/js/extended.js`):      - uses: actions/checkout@v4

- Barra de leitura, scroll-to-top, lazy loading      - uses: peaceiris/actions-hugo@v2

- Cópia de código, smooth scrolling, TOC ativo        with:

          hugo-version: '0.152.2'

---          extended: true

      - run: hugo --gc --minify

## SEO      - uses: actions/upload-pages-artifact@v2

        with:

- Meta/OG/Twitter e Schema.org em `extend_head.html`          path: ./public

- Sitemap ativo (`/sitemap.xml`)```

- Robots liberado (`/robots.txt`)

- Títulos hierárquicos e links internos entre posts### Deploy Netlify



---```toml

# netlify.toml

## Onde editar o WhatsApp do Contato[build]

  publish = "public"

- Arquivo: `content/contato/_index.md`  command = "hugo --gc --minify"

- Procure o link `https://wa.me/5500000000000` e substitua pelo número (DDI+DDD+número).

[build.environment]

---  HUGO_VERSION = "0.152.2"

```

## Troubleshooting

### Deploy Vercel

- Post não aparece: `draft: false` e data válida

- CSS não aplica: assegure Hugo Extended e assets em `assets/css/extended/`Conecte GitHub repo e configure:

- Erros de template: rode `hugo server -D` e verifique logs- Build Command: `hugo --gc --minify`

- Output Directory: `public`

---- Hugo Version: `0.152.2`



## Licença## ��� Customizações



© 2025 Vocaliza. Todos os direitos reservados.### Design System


**Cores** (`assets/css/extended/custom.css`):

```css
:root {
  --vocaliza-primary: #4285f4;      /* Azul principal */
  --vocaliza-primary-dark: #1967d2;
  --vocaliza-accent: #0052cc;
}
```

**Tipografia:**
- Fonte: Inter (Google Fonts)
- Headings: 700-800 weight
- Body: 400-500 weight

### JavaScript Features

Recursos em `assets/js/extended.js`:
- ✅ Barra de progresso de leitura
- ✅ Botão scroll-to-top
- ✅ Lazy loading de imagens
- ✅ Copy buttons em código
- ✅ TOC highlight automático
- ✅ Smooth scrolling

### Menu

Editar em `hugo.toml`:

```toml
[[menu.main]]
  name = "Início"
  url = "/"
  weight = 1
```

## ��� SEO

### Meta Tags

Configuradas em `layouts/partials/extend_head.html`:
- Title tags otimizados
- Meta descriptions (150-160 chars)
- Open Graph (Facebook)
- Twitter Cards
- Canonical URLs

### Schema.org

JSON-LD structured data:
- WebSite
- BlogPosting
- Organization
- BreadcrumbList

### Performance

Target Lighthouse Scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

Otimizações:
- ✅ HTML/CSS/JS minificado
- ✅ Lazy loading de imagens
- ✅ Critical CSS inline
- ✅ JavaScript com `defer`

## ��� Troubleshooting

### Hugo não encontra tema

```bash
git submodule update --init --recursive
```

### CSS customizado não aplica

- Verifique Hugo Extended: `hugo version`
- Limpe cache: `hugo --gc --cleanDestinationDir`
- Reinicie servidor

### Posts não aparecem

Checklist:
- [ ] `draft: false` no front matter?
- [ ] Data no passado?
- [ ] Arquivo em `/content/posts/`?
- [ ] Extensão `.md`?

## ��� Comandos Úteis

```bash
# Desenvolvimento
hugo server -D              # Servidor com drafts
hugo server --disableFastRender  # Sem cache

# Build
hugo --gc --minify         # Build produção
hugo --templateMetrics     # Estatísticas

# Limpeza
hugo --gc --cleanDestinationDir

# Novo conteúdo
hugo new posts/titulo.md
```

## ��� Conteúdo Atual

### Posts Publicados (16 total)

**IA e Fundamentos:**
1. O Futuro da Inteligência Artificial em 2025
2. ChatGPT vs Google Bard vs Claude
3. Machine Learning vs Deep Learning
4. Como Treinar um Modelo de IA

**IA de Voz:**
5. Reconhecimento de Voz: Como Funciona
6. Processamento de Linguagem Natural (NLP)

**Vocaliza Específico:**
7. Como Funciona a Vocaliza
8. IA de Voz: O Que É e Como Funciona
9. Redução de Custos em Call Center com IA
10. Casos de Uso de IA de Voz Por Setor

...e mais 6 posts

### Páginas

- **Homepage**: Customizada com hero section
- **Sobre**: Informações detalhadas da Vocaliza
- **Contato**: WhatsApp (editar número em `/content/contato/_index.md` linha 14)

## ��� Edições Importantes

### Alterar Número do WhatsApp

Arquivo: `content/contato/_index.md`  
Linha: 14

```markdown
<a href="https://wa.me/5500000000000" ...>
           ^ Substituir por: 55 + DDD + número
           Exemplo: 5511999887766
```

### Adicionar Logo

Colocar imagem em `/static/images/logo.png` e referenciar em `hugo.toml`:

```toml
[params]
  images = ["/images/logo.png"]
```

## ��� Contribuição

### Workflow

1. Fork o repositório
2. Crie branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/minha-feature`
5. Abra Pull Request

### Padrões de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
perf: performance
test: testes
chore: manutenção
```

## ��� Suporte

- **Issues**: [GitHub Issues](https://github.com/green-code-labs/vocaliza-blog/issues)
- **Email**: tech@vocaliza.app
- **Website**: [vocaliza.app](https://vocaliza.app)
- **Blog**: [blog.vocaliza.app](https://blog.vocaliza.app)

## ��� Licença

© 2025 Vocaliza. Todos os direitos reservados. Projeto proprietário.

---

**Última atualização:** 31/10/2025  
**Versão:** 2.0.0  
**Mantido por:** Equipe Vocaliza
