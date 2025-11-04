# Configuração do Google Analytics 4 e Search Console

## 📊 Google Analytics 4 (GA4)

### Passo 1: Criar Propriedade no GA4

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Clique em "Admin" (⚙️) no canto inferior esquerdo
3. Em "Property", clique em "Create Property"
4. Preencha:
   - **Property name**: Blog da Vocaliza
   - **Reporting time zone**: (GMT-03:00) Brasilia
   - **Currency**: Brazilian Real (R$)
5. Clique em "Next"
6. Selecione categoria: "Technology" ou "Business and Industrial"
7. Clique em "Create"

### Passo 2: Obter seu Measurement ID

1. Após criar a propriedade, você verá "Data Streams"
2. Clique em "Add stream" → "Web"
3. Preencha:
   - **Website URL**: `https://blog.vocaliza.app`
   - **Stream name**: Blog da Vocaliza
4. Clique em "Create stream"
5. **Copie o Measurement ID** (formato: `G-XXXXXXXXXX`)

### Passo 3: Adicionar o ID ao hugo.toml

Edite o arquivo `hugo.toml` e substitua a linha:

```toml
googleAnalytics = ""  # Insira aqui seu ID GA4 (ex.: G-XXXXXXXXXX)
```

Por:

```toml
googleAnalytics = "G-XXXXXXXXXX"  # Seu ID real do GA4
```

**Importante:** Substitua `G-XXXXXXXXXX` pelo seu Measurement ID real!

### Passo 4: Verificar instalação

1. Faça commit e push das alterações
2. Aguarde o deploy (2-3 minutos)
3. No GA4, vá em "Reports" → "Realtime"
4. Acesse seu blog em uma aba anônima
5. Você deve ver sua visita aparecer no Realtime

---

## 🔍 Google Search Console

### Passo 1: Adicionar Propriedade

1. Acesse [Google Search Console](https://search.google.com/search-console/)
2. Clique em "Add property"
3. Selecione "Domain" ou "URL prefix":
   - **Domain**: `vocaliza.app` (requer verificação DNS)
   - **URL prefix**: `https://blog.vocaliza.app` (mais fácil)
4. Recomendo usar **URL prefix** para ser mais rápido

### Passo 2: Verificar Propriedade

Existem 4 métodos. O mais fácil para Hugo é:

#### Método 1: HTML Tag (Recomendado)

1. No Search Console, selecione "HTML tag"
2. Copie o código de verificação (algo como `google-site-verification=abc123xyz`)
3. Copie apenas a parte: `abc123xyz`
4. Edite `hugo.toml` e adicione na seção `[params.analytics]`:

```toml
[params.analytics]
  [params.analytics.google]
    SiteVerificationTag = "abc123xyz"  # Cole seu código aqui
```

5. Faça commit, push e aguarde o deploy
6. Volte ao Search Console e clique em "Verify"

#### Método 2: Google Analytics (Mais Rápido)

Se você já configurou o GA4 acima:

1. No Search Console, selecione "Google Analytics"
2. Clique em "Verify"
3. Pronto! Ele detecta automaticamente o GA4 no site

### Passo 3: Enviar Sitemap

1. Após verificação, vá em "Sitemaps" no menu lateral
2. Digite: `sitemap.xml`
3. Clique em "Submit"
4. Aguarde 1-2 dias para o Google indexar
5. Seu sitemap está em: `https://blog.vocaliza.app/sitemap.xml`

---

## ✅ Verificação Final

### Checklist pós-configuração:

- [ ] GA4 Measurement ID adicionado no `hugo.toml`
- [ ] Site deployed e funcionando
- [ ] GA4 Realtime mostrando visitas
- [ ] Search Console verificado com sucesso
- [ ] Sitemap enviado ao Search Console
- [ ] Aguardar 24-48h para dados aparecerem em GA4
- [ ] Aguardar 3-7 dias para indexação no Search Console

### Eventos Personalizados (Opcional)

No futuro, você pode adicionar eventos customizados como:

```javascript
// Rastrear cliques em "Testar Grátis"
gtag('event', 'cta_click', {
  'event_category': 'engagement',
  'event_label': 'testar_gratis_header'
});

// Rastrear leitura completa de artigo
gtag('event', 'scroll_depth', {
  'event_category': 'engagement',
  'event_label': 'article_100_percent'
});
```

---

## 📊 Relatórios Importantes no GA4

Após alguns dias, confira estes relatórios:

1. **Realtime** → Ver visitantes ao vivo
2. **Acquisition** → De onde vêm seus visitantes
3. **Engagement** → Páginas mais vistas
4. **Events** → Ações dos usuários (cliques, scrolls)
5. **Conversions** → Configure goals (ex: cliques em CTA)

---

## 🔍 Relatórios Importantes no Search Console

1. **Performance** → Cliques, impressões, CTR, posição média
2. **Coverage** → Páginas indexadas vs. erros
3. **Enhancements** → Core Web Vitals, mobile usability
4. **Links** → Quem está linkando para você

---

## 🚀 Próximos Passos

Após configurar GA4 e Search Console:

1. **Criar Goals no GA4**:
   - Conversão: Clique em "Testar Grátis"
   - Conversão: Submissão de Newsletter
   - Engagement: Leitura completa de artigo

2. **Monitorar Performance**:
   - Verificar semanalmente no Search Console
   - Analisar mensalmente no GA4
   - Identificar posts que mais convertem

3. **Otimizar SEO**:
   - Focar em palavras-chave com baixa concorrência
   - Melhorar posts com baixo CTR
   - Criar conteúdo sobre queries em alta

---

## 🆘 Problemas Comuns

### GA4 não mostra dados

- Verifique se o Measurement ID está correto no `hugo.toml`
- Teste em aba anônima (extensões podem bloquear)
- Aguarde 24-48h para dados aparecerem

### Search Console não verifica

- Certifique-se de que o site está deployed
- Verifique se o código de verificação está correto
- Tente usar o método do Google Analytics

### Sitemap não indexa

- Verifique: `https://blog.vocaliza.app/sitemap.xml`
- Aguarde 3-7 dias após submissão
- Confira erros na aba "Coverage"

---

**✅ Setup Concluído!**

Agora você tem:
- ✅ Google Analytics 4 configurado e rastreando
- ✅ Google Search Console verificado
- ✅ Sitemap pronto para submissão
- ✅ Meta tags de verificação instaladas

**Importante:** Lembre-se de substituir os placeholders (`G-XXXXXXXXXX` e `abc123xyz`) pelos seus códigos reais!
