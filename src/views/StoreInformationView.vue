<template>
  <div class="information-page">
    <div class="information-inner">
      <router-link to="/" class="back-link">← Voltar ao início</router-link>
      <span class="eyebrow">NÚCLEO / INFORMAÇÕES DA LOJA</span>
      <h1>{{ content.title }}</h1>
      <p class="intro">{{ content.intro }}</p>
      <div class="notice"><strong>Projeto de portfólio</strong><p>A NÚCLEO apresenta uma experiência demonstrativa de e-commerce. Não há venda, pagamento, envio ou atendimento comercial. Os dados de uma empresa real não fazem parte deste projeto.</p></div>
      <section v-for="section in content.sections" :key="section.title">
        <h2>{{ section.title }}</h2><p>{{ section.body }}</p>
      </section>
      <nav aria-label="Outras informações" class="related">
        <router-link to="/atendimento">Atendimento</router-link><router-link to="/entrega">Entrega</router-link><router-link to="/trocas">Trocas e devoluções</router-link><router-link to="/privacidade">Privacidade</router-link><router-link to="/termos">Termos</router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pages = {
  atendimento: { title: 'Atendimento', intro: 'Como o suporte aparece neste conceito de loja.', sections: [
    { title: 'Demonstração', body: 'Não existe atendimento comercial vinculado a esta experiência. A página representa o espaço reservado para ajuda, dúvidas e acompanhamento em um template de e-commerce.' },
    { title: 'Uso como template', body: 'Quem adaptar o projeto para uma loja real deverá conectar seus próprios canais de suporte e publicar seus dados de contato.' },
  ] },
  entrega: { title: 'Entrega', intro: 'O fluxo visual da loja pode ser explorado sem gerar remessas.', sections: [
    { title: 'Sem frete real', body: 'O projeto não consulta transportadoras, não calcula tarifas e não promete prazos. A conclusão da demonstração registra somente os componentes escolhidos neste navegador.' },
    { title: 'Ponto de extensão', body: 'Para usar o template em uma operação real, será necessário integrar origem, transportadoras, cobertura, preço e prazo, além de validar o estoque antes da compra.' },
  ] },
  trocas: { title: 'Trocas e devoluções', intro: 'Uma referência para a jornada de pós-venda de uma loja real.', sections: [
    { title: 'Demonstração', body: 'Como nenhum produto é vendido ou enviado aqui, não existe troca ou devolução nesta experiência.' },
    { title: 'Uso comercial futuro', body: 'Uma adaptação comercial deverá apresentar uma política operacional, um canal de solicitação e o direito de arrependimento previsto no Código de Defesa do Consumidor para compras fora do estabelecimento.' },
  ] },
  privacidade: { title: 'Privacidade e dados', intro: 'Dados usados para demonstrar os fluxos do projeto.', sections: [
    { title: 'No navegador', body: 'Carrinho, favoritos e simulações concluídas ficam salvos neste navegador. As simulações guardam apenas itens, quantidades, valores ilustrativos e data; não pedem endereço nem cartão.' },
    { title: 'Conta conectada à API', body: 'Caso você crie uma conta real nesta instalação, nome e e-mail são enviados à API. A senha é convertida em hash antes de ser armazenada e os tokens de sessão ficam neste navegador. A conta de demonstração evita o envio desses dados.' },
    { title: 'Ao reutilizar o template', body: 'Uma aplicação pública que colete dados pessoais precisa de informações próprias de privacidade, contato para direitos dos titulares, política de retenção e revisão de segurança.' },
  ] },
  termos: { title: 'Condições da loja', intro: 'A NÚCLEO é um conceito interativo para portfólio.', sections: [
    { title: 'Sem contratação', body: 'Preços e imagens são ilustrativos. Adicionar itens ou concluir a demonstração não reserva estoque, não cria pedido comercial, não estabelece contrato e não gera cobrança.' },
    { title: 'Template', body: 'Os fluxos podem servir de base para um projeto futuro. Dados de empresa, catálogo real, atendimento, frete, políticas e integrações deverão ser substituídos antes de qualquer uso comercial.' },
  ] },
} as const;
const content = computed(() => pages[route.path.slice(1) as keyof typeof pages] || pages.termos);
</script>

<style scoped>
.information-page{background:#f7f5f1;color:#171717;min-height:70vh;padding:55px 24px 95px}.information-inner{max-width:880px;margin:auto}.back-link{display:inline-block;color:#0c38c5;text-decoration:none;font-size:13px;margin-bottom:54px}.eyebrow{display:block;color:#0c38c5;font-size:10px;letter-spacing:.25em;font-weight:700}h1{font-size:clamp(40px,5vw,68px);letter-spacing:-.06em;line-height:1.05;margin:14px 0 20px}.intro{font-size:18px;line-height:1.6;color:#565c58;max-width:680px}.notice{background:#e9edf6;border-left:3px solid #0c38c5;padding:22px 26px;margin:38px 0}.notice p{margin:7px 0 0;line-height:1.55}section{border-top:1px solid #d9d8d2;padding:28px 0}section h2{font-size:21px;margin:0 0 12px}section p{line-height:1.7;color:#525954;margin:0}.related{border-top:1px solid #d9d8d2;padding-top:27px;display:flex;flex-wrap:wrap;gap:14px 25px}.related a{font-size:13px;color:#0c38c5;text-decoration:none}.related a:hover{text-decoration:underline}
</style>
