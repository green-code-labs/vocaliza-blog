# 🔥 Guia de Configuração do Hotjar - Blog da Vocaliza

## 📊 O que é Hotjar?

O **Hotjar** é uma ferramenta de análise de comportamento do usuário que fornece:
- 🗺️ **Heatmaps (Mapas de Calor)**: Veja onde os usuários clicam, movem o mouse e rolam
- 🎥 **Session Recordings**: Assista gravações reais de como visitantes navegam no blog
- 💬 **Feedback Widgets**: Colete feedback direto dos visitantes
- 📝 **Surveys**: Faça pesquisas contextuais
- 🎯 **Conversion Funnels**: Identifique onde usuários abandonam o fluxo

---

## 🚀 Passo 1: Criar Conta no Hotjar

### 1.1. Acesse o Hotjar
- URL: https://www.hotjar.com/
- Clique em **"Sign up free"** (plano gratuito com até 35 sessões/dia)

### 1.2. Criar Conta
- Use o email **comercial@vocaliza.app** ou **seu email profissional**
- Complete o cadastro

### 1.3. Adicionar Site
1. Após login, clique em **"+ Add site"**
2. Preencha:
   - **Site name**: Blog da Vocaliza
   - **Site URL**: `https://blog.vocaliza.app`
3. Clique em **"Add site"**

---

## 🔑 Passo 2: Obter o Site ID

### 2.1. Copiar o Site ID
Após adicar o site, o Hotjar vai mostrar:
```javascript
<!-- Hotjar Tracking Code -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1234567,hjsv:6};  // ← ESTE É O SEU SITE ID!
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

**Cole APENAS o número** (ex: `1234567`, sem aspas)

### 2.2. Adicionar ao Hugo
1. Abra o arquivo **`hugo.toml`**
2. Localize a seção `[params.analytics.hotjar]`
3. Cole o Site ID:
```toml
[params.analytics.hotjar]
  siteId = "1234567"  # ← Cole aqui o número do seu Site ID
```

---

## 🏗️ Passo 3: Build e Deploy

### 3.1. Testar Localmente
```bash
hugo server --gc --minify
```
- Abra http://localhost:1313
- Inspecione o código-fonte (Ctrl+U)
- Procure por `static.hotjar.com` no `<head>`
- Se aparecer o script, está funcionando! ✅

### 3.2. Fazer Deploy
```bash
git add -A
git commit -m "feat: adicionar Hotjar para análise de comportamento"
git push
```

### 3.3. Aguardar GitHub Actions
- GitHub Actions vai buildar e fazer deploy (~2-3 min)
- Acompanhe em: https://github.com/green-code-labs/vocaliza-blog/actions

---

## ✅ Passo 4: Verificar Instalação

### 4.1. No Hotjar Dashboard
1. Acesse https://insights.hotjar.com/sites
2. Clique no site **"Blog da Vocaliza"**
3. Você verá: **"Verifying installation..."**
4. Abra seu blog em outra aba: https://blog.vocaliza.app
5. Navegue por 2-3 páginas
6. Volte ao Hotjar (aguarde ~1 minuto)
7. Status deve mudar para: **"✅ Hotjar is installed correctly"**

### 4.2. Teste Rápido
- **Session Recordings** vai começar a capturar sessões automaticamente
- **Heatmaps** levam 24-48h para acumular dados suficientes

---

## 📈 Passo 5: Configurar Recursos

### 5.1. Heatmaps (Mapas de Calor)

#### Criar Heatmap:
1. No dashboard, vá em **"Heatmaps"**
2. Clique em **"+ New heatmap"**
3. Configure:
   - **Name**: "Homepage - Desktop"
   - **URL**: `https://blog.vocaliza.app/`
   - **Device**: Desktop
4. Clique em **"Create heatmap"**

#### Heatmaps Recomendados:
- **Homepage Desktop**: `https://blog.vocaliza.app/`
- **Homepage Mobile**: `https://blog.vocaliza.app/` (device: Mobile)
- **Página de Posts**: `https://blog.vocaliza.app/posts/*` (use wildcard)
- **Calculadora ROI**: `https://blog.vocaliza.app/posts/calculadora-roi-vocaliza/`
- **Página Sobre**: `https://blog.vocaliza.app/sobre/`
- **Página Contato**: `https://blog.vocaliza.app/contato/`

---

### 5.2. Session Recordings (Gravações)

#### Configurar Filtros:
1. Vá em **"Recordings"**
2. Clique em **"Settings"**
3. Configure:
   - **Capture all sessions**: ON (plano gratuito: 35/dia)
   - **Device type**: All devices
   - **Sample rate**: 100% (capturar todas)

#### Filtros Úteis para Análise:
- **Visitantes que ficaram 3+ minutos**: Engajados
- **Visitantes que clicaram em CTAs**: Interesse alto
- **Rage clicks** (cliques repetidos): Frustração/bug
- **U-turn exits**: Abandonam rapidamente

---

### 5.3. Feedback Widgets

#### Criar Widget de Feedback:
1. Vá em **"Feedback"**
2. Clique em **"+ New feedback"**
3. Escolha tipo:
   - **Incoming feedback**: Widget sempre visível no lado
   - **Feedback button**: Botão personalizado

#### Widget Recomendado:
```
Tipo: Incoming feedback
Pergunta: "Este artigo foi útil?"
Respostas: 👍 Sim | 👎 Não | 💡 Tenho sugestões
Posição: Lado direito (meio da página)
Páginas: Apenas /posts/* (posts do blog)
```

---

### 5.4. Surveys (Pesquisas)

#### Survey de Qualidade do Conteúdo:
1. Vá em **"Surveys"**
2. Clique em **"+ New survey"**
3. Configure:
   - **Trigger**: After 30 seconds on page
   - **Pages**: `/posts/*`
   - **Question 1**: "O que você está buscando no blog?"
     - Opções:
       - [ ] Aprender sobre IA de voz
       - [ ] Comparar soluções
       - [ ] Calcular ROI
       - [ ] Implementar na minha empresa
       - [ ] Outro: _____
   - **Question 2**: "Você encontrou o que procurava?"
     - [ ] Sim, totalmente
     - [ ] Parcialmente
     - [ ] Não

---

## 🎯 Passo 6: Análise de Dados (Primeiros Insights)

### Após 7 Dias, Analise:

#### 1. **Heatmaps**
- **Homepage**: Usuários clicam nos CTAs? Ou ignoram?
- **Post Cards**: Quais posts atraem mais cliques?
- **Calculadora ROI**: Usuários interagem com os inputs?
- **Scroll Depth**: Até onde as pessoas rolam? 50%? 80%?

#### 2. **Session Recordings**
- **Comportamentos comuns**: O que 80% dos usuários fazem?
- **Pontos de confusão**: Onde hesitam ou clicam sem efeito?
- **Rage clicks**: Onde clicam freneticamente (bug/frustração)?
- **Quick exits**: Chegam e saem rápido - por quê?

#### 3. **Feedback & Surveys**
- **O que falta?**: Perguntas não respondidas nos posts
- **O que amam?**: Conteúdos mais úteis
- **O que querem?**: Novos tópicos sugeridos

---

## 💡 Insights Acionáveis

### Problemas Comuns e Soluções:

| **Problema Identificado** | **Ação Corretiva** |
|---------------------------|-------------------|
| Heatmap mostra que ninguém clica no CTA "Testar Grátis" | Mudar cor, posição ou texto do CTA |
| Recordings mostram que usuários não veem calculadora de ROI | Adicionar CTA para calculadora no topo da homepage |
| Scroll depth baixo (40% dos usuários não chegam ao fim) | Posts muito longos → dividir em séries |
| Rage clicks no menu mobile | Menu não abre → bug CSS, corrigir |
| Feedback: "Não entendi como funciona a integração" | Criar post específico: "Como Integrar Vocaliza em 5 Passos" |
| Survey: 60% buscam "calcular ROI" | Promover calculadora mais agressivamente |
| Recordings: Usuários voltam à homepage 3x | Confusos com navegação → melhorar breadcrumbs |

---

## 📊 Métricas Importantes (KPIs)

### Semanais:
- **Engagement Score** (Hotjar): Meta > 50
- **Average time on page**: Meta > 3 min
- **Scroll depth average**: Meta > 60%
- **CTA click rate**: Meta > 5% dos visitantes

### Mensais:
- **Rage clicks**: Meta < 0.5% das sessões
- **U-turn rate**: Meta < 20% das sessões
- **Feedback positivo**: Meta > 70% "útil"
- **Survey completion rate**: Meta > 40%

---

## 🔐 Boas Práticas de Privacidade

### Dados Sensíveis:
O Hotjar **NÃO** captura automaticamente:
- Campos de senha
- Campos de cartão de crédito
- Inputs com `type="password"`

### Mascarar Dados Adicionais (se necessário):
Adicione a classe `data-hj-suppress` em elementos sensíveis:
```html
<input type="text" class="data-hj-suppress" placeholder="Email">
```

### LGPD Compliance:
- Hotjar é GDPR/LGPD compliant
- IPs são anonimizados automaticamente
- Usuários podem optar por não serem rastreados (Do Not Track)

---

## 🎓 Recursos de Aprendizado

### Documentação Oficial:
- **Hotjar Academy**: https://help.hotjar.com/
- **Best Practices**: https://www.hotjar.com/blog/
- **Caso de estudos**: https://www.hotjar.com/customers/

### Vídeos Recomendados:
- "How to Read a Heatmap" (Hotjar YouTube)
- "Session Recordings 101" (Hotjar YouTube)
- "User Feedback Best Practices" (Hotjar YouTube)

---

## 🚀 Próximos Passos

1. **Semana 1-2**: Acumular dados (não tome decisões ainda)
2. **Semana 3**: Primeira análise → identificar 3 problemas principais
3. **Semana 4**: Implementar correções
4. **Semana 5**: Medir impacto das mudanças (A/B test mental)
5. **Mensal**: Review de todos os insights → planejar próximas melhorias

---

## 📞 Suporte

**Dúvidas sobre o Hotjar?**
- Hotjar Support: support@hotjar.com
- Chat ao vivo: https://www.hotjar.com/

**Dúvidas sobre configuração no blog?**
- Entre em contato: suporte@vocaliza.app

---

## ✅ Checklist de Implementação

- [ ] Criar conta no Hotjar (plano gratuito)
- [ ] Adicionar site "Blog da Vocaliza"
- [ ] Copiar Site ID do script de instalação
- [ ] Adicionar Site ID no `hugo.toml` (seção `[params.analytics.hotjar]`)
- [ ] Testar localmente (`hugo server`)
- [ ] Verificar script no código-fonte (Ctrl+U)
- [ ] Fazer commit e push
- [ ] Aguardar deploy (~3 min)
- [ ] Verificar instalação no dashboard Hotjar
- [ ] Configurar 3 heatmaps principais (Homepage, Posts, Calculadora)
- [ ] Configurar gravação de sessões (100% sample rate)
- [ ] Criar feedback widget em posts
- [ ] Criar survey de qualidade de conteúdo
- [ ] Aguardar 7 dias para dados
- [ ] Analisar primeiros insights
- [ ] Implementar melhorias baseadas em dados

---

**🎯 Meta:** Usar dados do Hotjar para aumentar conversão de visitantes → leads em **30% nos próximos 60 dias**.

**🔥 Lembre-se:** Dados sem ação = desperdício. Analise semanalmente e implemente melhorias rapidamente!
