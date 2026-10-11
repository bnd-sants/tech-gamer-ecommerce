# Design QA — NÚCLEO

**Fonte visual:** conceito claro escolhido pelo usuário em `C:\Users\Bernardo\.codex\generated_images\01a12195-2ca4-7b13-8879-daabe17d28af\exec-af65f7e4-4e8c-4848-9582-057d33c49fd8.png`.

**Implementação revisada:** `http://127.0.0.1:4173/`, catálogo de hardware, detalhe da GPU, carrinho, checkout, login e área da conta. Comparação visual feita no navegador integrado com o mockup e as páginas renderizadas.

## Correções feitas na revisão

- P1 — A foto inicial competia com o texto. Reenquadrei as três imagens do showroom à direita e ajustei a transição clara atrás da cópia.
- P1 — O catálogo continuava com cards escuros e fotos repetidas. Troquei os cards por uma apresentação editorial clara e gerei imagens ilustrativas próprias para GPU, CPU, RAM, teclado, monitor e mouse.
- P1 — O detalhe do produto tinha texto branco sobre fundo claro. Reestilizei galeria, conteúdo e bloco de compra.
- P1 — Quantidade e total se sobrepunham no carrinho. Reorganizei cada item em uma grade e conferi a atualização de 1 para 2 unidades e de volta para 1.
- P1 — Checkout exibia Pix e boleto fictícios, simulava token de cartão e confirmava pedido mesmo com erro da API. Removi esses fluxos; a página agora informa que o pagamento está em preparação, e a API rejeita novos pedidos até existir integração real.
- P1 — Histórico exibia pedidos inventados quando a API falhava. Agora apresenta um estado de erro claro.
- P2 — Login e área da conta mantinham cartões escuros. Apliquei a paleta clara e conferi as páginas no navegador.
- P1 — Trocas rápidas das etapas do showroom deixavam todas as imagens temporariamente transparentes. Mantive a imagem inicial como camada base e confirmei que as três imagens carregam após alternâncias rápidas.
- P1 — A conta de demonstração tentava usar a API do carrinho, impedindo adicionar produtos quando o servidor estava desligado. O carrinho de demonstração agora usa armazenamento local; adição, quantidade e remoção foram conferidas no navegador.
- P2 — Perfil, detalhe do produto e carrinho receberam hierarquia editorial mais clara, estados de demonstração explícitos e ajustes para telas estreitas.
- P1 — Os links do cabeçalho marcavam todas as categorias como ativas porque apontam para a mesma rota com parâmetros diferentes. O destaque agora acompanha a categoria da URL; conferi Hardware, Periféricos e Todos os produtos, inclusive a atualização de 3 para 2 e para 6 itens.
- P2 — Adicionei transições curtas entre páginas da loja e de autenticação, além de uma troca suave na grade do catálogo quando a categoria da rota muda. O movimento é desativado para quem prefere animação reduzida. A navegação para produto e carrinho foi conferida no navegador.
- P1 — A página Sobre ainda se apresentava como TechGamer e prometia logística, suporte e garantia não comprovados. Agora explica a proposta NÚCLEO e o estado da prévia. A antiga página de ofertas virou uma curadoria clara, sem alegar promoção ativa.
- P1 — Removi a categoria PC Gamer vazia da navegação e coloquei o montador em seu lugar; um link antigo para a categoria recebe um estado vazio explicativo. Retirei parcelas simuladas da vitrine, cards e detalhe, mantendo o preço marcado como demonstrativo.
- P2 — O catálogo permite selecionar até três produtos; o comparador mostra preço, marca, disponibilidade e especificações lado a lado, com ausências explícitas. O montador combina CPU, GPU e RAM e verifica socket, tipo de memória, potência informada da fonte e medidas informadas do gabinete, distinguindo conflito, ausência de dado e critério sem conflito.
- P2 — Perfil, favoritos, histórico e detalhe de pedido agora compartilham a mesma estrutura editorial. Favoritos usam um estado reativo comum: adicionar no catálogo e remover na lista atualiza ambas as telas imediatamente. Histórico e detalhe preservam estados honestos quando a API não responde; a página 404 também recebeu o visual NÚCLEO.
- P1 — O painel administrativo mostrava receita, pedidos, eventos de pagamento e telemetria inventados. A visão geral agora explica o estado real da prévia; pedidos são apenas consultados quando há sessão real, e a sessão de demonstração mostra uma fila indisponível. O catálogo identifica os produtos ilustrativos e opera somente em modo de consulta. O painel recebeu a paleta editorial NÚCLEO, inclusive em telas menores.

## Superfícies de fidelidade

- **Tipografia:** Inter, pesos e escala próximos à referência; o hero usa uma chamada editorial própria porque o gabinete é uma peça conceitual, sem SKU confirmado.
- **Espaçamento:** navegação compacta, hero amplo e grade de três produtos seguem a hierarquia do mockup.
- **Cores:** marfim, grafite, azul concentrado nas ações. O varejo neon foi retirado das telas revisadas.
- **Imagens:** ativos gerados localmente em `public/showroom/`; imagens do catálogo são identificadas como ilustrativas.
- **Conteúdo:** não há preço nem promessa de entrega para o gabinete conceitual. Preços dos produtos existentes continuam vindo de dados de demonstração do projeto.

## Limites conhecidos

- Nome **NÚCLEO** permanece provisório.
- A animação do showroom é uma sequência navegável de três renders com transição, ainda sem modelo 3D manipulável.
- A versão móvel foi conferida em 390 px para checkout, perfil, detalhe do produto e carrinho; as telas revisadas não apresentam rolagem horizontal.
- Pagamentos e criação de pedidos estão indisponíveis até a integração real de um provedor. Operações administrativas de catálogo, estoque e pedidos exigem uma API persistente antes de serem habilitadas.
- O comparador usa seis produtos demonstrativos, com apenas um produto em várias famílias; comparações da mesma família ficam mais úteis quando houver catálogo real. O montador é orientativo: BIOS, chipset, conectores, consumo total, capacidade e frequência da memória, refrigeração e garantia não são validados automaticamente.

**Verificação:** a compilação passou para as telas revisadas e a proteção contra pagamentos simulados permanece. O novo painel administrativo ainda aguarda conferência visual no navegador; a sessão de navegador disponível foi barrada pela política de acesso antes dessa etapa. Publicação comercial depende da integração de pagamentos e de dados operacionais persistentes.
