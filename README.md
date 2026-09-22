# Joice Nunes Nutricionista — Site

Site one-page para a nutricionista **Joice Nunes** (Mauá/SP), redesenhado a partir do site
original (que estava fora do ar) e de dados reais coletados do Instagram, Facebook e Google
Business Profile da cliente. HTML + CSS + JS puros, com Tailwind CSS via CDN — **sem build,
sem bundler, sem dependências de instalação**.

## Estrutura do projeto

```
NutriJoiceNunes/
├── index.html                 # página única, com todas as seções e âncoras
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css         # estilos complementares ao Tailwind (animações, hovers, etc.)
│   ├── js/
│   │   └── main.js            # menu mobile + header com fundo ao rolar a página
│   └── images/
│       ├── logo-joice-nunes.png   # logo original da cliente (não recriada)
│       ├── joice-retrato.jpg      # foto profissional (otimizada, ~100 KB)
│       ├── joice-retrato.webp     # mesma foto em WebP (fallback automático via <picture>)
│       ├── og-image.jpg           # imagem de compartilhamento (WhatsApp/Instagram/Facebook)
│       └── favicon-32.png / favicon-180.png / favicon-192.png / favicon-512.png
└── .claude/
    └── launch.json             # config opcional para rodar um servidor local (ver abaixo)
```

## Como visualizar localmente

Não há build. Basta servir os arquivos estáticos (abrir `index.html` direto no navegador
também funciona, mas alguns navegadores restringem `fetch`/imagens locais — por isso o
recomendado é subir um servidor simples):

```bash
# Opção 1 — Python (já vem instalado na maioria dos sistemas)
python -m http.server 5173
# depois acesse http://localhost:5173

# Opção 2 — Node (se tiver o pacote `serve` instalado globalmente)
npx serve .
```

## Deploy

Como é um site 100% estático, pode ser publicado em qualquer um destes serviços gratuitos
sem nenhuma configuração adicional:

- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / `root`.
- **Netlify** ou **Vercel**: arraste a pasta do projeto ou conecte o repositório do GitHub —
  nenhum "build command" é necessário (é site estático).
- **Hospedagem tradicional (cPanel etc.)**: envie todo o conteúdo desta pasta para a raiz
  do domínio via FTP.

Ao publicar em `nutricionistajoicenunes.com.br`, atualize a tag `<link rel="canonical">` e as
meta tags `og:url` / `og:image` em `index.html` caso o domínio final seja diferente.

## ⚠️ Pendências que precisam de retorno da cliente

Estes pontos foram sinalizados durante a extração de conteúdo e **não foram inventados**:

1. **Logo**: o domínio original estava fora do ar e o Wayback Machine não arquivou nenhuma
   imagem do site antigo. A logo usada (`assets/images/logo-joice-nunes.png`) foi baixada do
   cartão digital oficial da cliente, a pedido dela
   (`cartaodigitalmw.com.br/nutricionista-joice-nunes`) — é a logo real, não uma recriação.
2. **Preços dos planos** (Consulta Avulsa / 90 dias / 180 dias): nenhum valor está publicado
   em nenhuma fonte pública. Os cards da seção "Planos" direcionam para o WhatsApp com
   mensagens contextuais, sem valores fictícios.
3. **Google Analytics / Meta Pixel**: o código de integração está pronto, mas **comentado**
   no final do `index.html` (procure por `ANALYTICS / PIXEL`). Assim que a cliente tiver um
   `GA_MEASUREMENT_ID` (Google Analytics 4) ou um Pixel ID (Meta), é só substituir o
   placeholder e descomentar o bloco.
4. **Domínio**: o problema original (`DNS_PROBE_FINISHED_NXDOMAIN`) é de registro/DNS do
   domínio `nutricionistajoicenunes.com.br`, não do código — precisa ser resolvido junto ao
   registrador/hospedagem para o domínio voltar a funcionar.

## Conteúdo e fontes

- Textos institucionais e lista de sintomas: site original, recuperado via Wayback Machine.
- Endereço, horário de funcionamento, telefone e nota: Google Business Profile (5,0 ⭐, 93
  avaliações).
- E-mail de contato: página oficial no Facebook (`Nutri Joice Nunes`).
- Depoimentos: 5 avaliações reais, recentes e 5 estrelas, copiadas literalmente do Google
  (nomes e textos reais — nenhuma foi inventada).
- Paleta de cores: extraída da logo original (vinho/bordô `#6C2448`) e do CTA usado no
  cartão digital oficial da cliente (teal `#138B9B`).

## SEO e acessibilidade

- Meta tags de título/descrição, Open Graph e Twitter Card configuradas.
- Dados estruturados `schema.org/MedicalBusiness` (JSON-LD) com endereço, telefone e nota
  do Google — ajuda o Google a exibir rich snippets.
- Favicon gerado a partir da logo original, em múltiplos tamanhos.
- Todas as imagens de conteúdo têm `alt` descritivo; imagens puramente decorativas usam
  `alt=""` + `aria-hidden`.
- Contraste de cores verificado nos textos sobre fundo vinho/teal/creme.
- Navegação por teclado com foco visível (`:focus-visible`) e link "Pular para o conteúdo".
- `prefers-reduced-motion` respeitado (desativa animações para quem pede menos movimento).

---

Site desenvolvido por [TeoCode](https://teocode.com.br/).
