# NÚCLEO — conceito de e-commerce de componentes

Projeto de portfólio e base potencial para um template. A experiência apresenta uma loja de componentes para PC com direção visual premium, showroom, catálogo, busca, filtros, detalhe de produto, comparador, montador de setup, carrinho e uma conclusão **demonstrativa**. Não existem vendas, cobrança, frete ou reserva de estoque.

## Rodar localmente

```sh
npm install
npm run dev
```

Para conferir o pacote: `npm run build`. O frontend usa Vue 3, TypeScript, Vite, Pinia e Vuetify. A API Hono/Drizzle em `../tech-gamer-ecommerce-api` é opcional para navegar pelo catálogo demonstrativo; contas conectadas à API exigem um ambiente configurado.

## Fluxo de demonstração

1. Explore produtos e monte um carrinho.
2. Em `/checkout`, revise os itens e clique em **Concluir demonstração**.
3. Veja a confirmação fictícia e o histórico em `/demo-orders`. A página de login também oferece uma conta de cliente demonstrativa para explorar perfil, favoritos e simulações sem servidor.

As simulações são salvas apenas no `localStorage` deste navegador, com itens, quantidades, valores ilustrativos e data. Nenhum endereço, documento ou cartão é solicitado. Os dados podem sumir quando o navegador for limpo. As sessões demonstrativas de cliente e administrador são locais e não concedem acesso à API.

## Ao reutilizar como template

Substitua dados demonstrativos, textos, imagens e identidade visual conforme a marca. Integre uma API de catálogo, estoque, conta, atendimento e entrega conforme o caso. O pagamento funcional foi deixado fora do escopo deste projeto. O [mapa de capacidades e pontos de extensão](ECOMMERCE-READINESS.md) separa o que existe no protótipo das necessidades de uma operação comercial real.
