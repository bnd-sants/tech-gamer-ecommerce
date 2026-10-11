# NÚCLEO: escopo do portfólio e pontos de extensão

Atualizado em 11/10/2026. A NÚCLEO é um projeto de portfólio, com possibilidade de servir como template. As referências abaixo orientam o desenho dos fluxos; não significam que este protótipo esteja pronto para vender. Pagamento funcional permanece fora do escopo.

## Experiência demonstrável

| Área | O que pode ser explorado | Limite declarado |
| --- | --- | --- |
| Vitrine | Home, showroom animado, catálogo, busca, filtros, seleção e detalhe de produto | Produtos, imagens, preços e estoque podem ser ilustrativos |
| Decisão | Comparador, montador de setup e favoritos | Recomendações e compatibilidade são auxiliares, sem validação comercial |
| Carrinho | Adição, quantidade, remoção e subtotal persistidos no navegador | Não sincroniza com conta nem confirma preço/estoque em servidor |
| Checkout | Revisão e conclusão de uma simulação | Nenhum endereço, frete, pagamento, contrato ou pedido comercial |
| Histórico | Confirmação e lista local de simulações | Dados limitados ao navegador, sem rastreio ou atendimento |
| Conta e administração | Contas demonstrativas de cliente e administrador, telas de perfil, favoritos e painel; API de autenticação/catálogo opcional | Sessões demonstrativas sem privilégios reais; operações reais dependem de configuração |

## Pesquisa de referência para adaptação comercial

- [Decreto 7.962/2013](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm): exige identificação e contato do fornecedor, informação sobre produto e oferta, preço/frete, revisão, confirmação, atendimento e arrependimento em comércio eletrônico.
- [Código de Defesa do Consumidor](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm): referência para informação adequada, oferta, garantia e direito de arrependimento.
- [Direitos dos titulares, ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares): referência para acesso, correção e outros direitos sobre dados pessoais.
- [Guia de cookies, ANPD](https://www.gov.br/anpd/pt-br/assuntos/noticias-periodo-eleitoral/anpd-lanca-guia-orientativo-201ccookies-e-protecao-de-dados-pessoais201d?exec=3ba4791): transparência se tecnologias opcionais de rastreamento forem adicionadas.
- [WCAG 2.2, W3C](https://www.w3.org/TR/WCAG22/): critérios para revisão de acessibilidade.
- [Google Search Central, dados de produto](https://developers.google.com/search/docs/appearance/structured-data/product): dados estruturados de oferta precisam refletir informações reais do catálogo.
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html): referência de segurança para uma futura autenticação operacional.

## Se o template virar loja real

Antes de aceitar uma compra, a pessoa responsável terá de configurar identidade e contato da empresa, catálogo e estoque verificados, frete e prazos, políticas de atendimento/troca/devolução, privacidade e direitos dos titulares, confirmação e histórico de pedidos, segurança e infraestrutura de produção. A razão social/CNPJ, endereço, e-mail de atendimento, CEP de origem e transportadora foram informados como **a definir**; não são necessários para apresentar o projeto de portfólio e não serão inventados.

O protótipo mantém `POST /api/orders` desabilitado e não marca pedidos como pagos. A simulação local é identificada na interface e não chama essa rota.
