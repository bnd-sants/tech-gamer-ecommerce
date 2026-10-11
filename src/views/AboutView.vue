<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="about-copy">
        <span class="eyebrow">NÚCLEO / NOSSA IDEIA</span>
        <h1>O detalhe faz<br>o conjunto.</h1>
        <p>Uma loja em construção para quem escolhe cada componente com intenção. Queremos aproximar informação técnica, boa apresentação e prazer em montar.</p>
        <router-link to="/products">Explorar o catálogo <v-icon size="18">mdi-arrow-up-right</v-icon></router-link>
      </div>
      <img src="/showroom/assembly-03.png" alt="Conjunto de computador apresentado em um ambiente claro" />
    </section>

    <section class="about-principles" aria-labelledby="principles-title">
      <div class="section-heading"><span class="eyebrow">COMO PENSAMOS</span><h2 id="principles-title">Escolher bem faz parte do projeto.</h2></div>
      <div class="principle-grid">
        <article><span>01 / CLAREZA</span><h3>Ficha que ajuda.</h3><p>Especificações e limites devem ser fáceis de comparar antes de uma decisão.</p></article>
        <article><span>02 / CONJUNTO</span><h3>Peças que conversam.</h3><p>O montador reúne componentes e aponta o que já pode ou ainda precisa ser verificado.</p></article>
        <article><span>03 / PRESENÇA</span><h3>Engenharia à vista.</h3><p>O showroom revela a montagem em etapas e inspira novas combinações.</p></article>
      </div>
    </section>

    <section class="about-status"><span class="eyebrow">ESTADO DO PROJETO</span><h2>Uma prévia em desenvolvimento.</h2><p>NÚCLEO é um nome provisório. As imagens e os preços atuais são ilustrativos. Pedidos, pagamentos, frete e garantias comerciais ainda não estão disponíveis nesta prévia.</p><router-link to="/build">Conhecer o montador <v-icon size="17">mdi-arrow-right</v-icon></router-link></section>
  </div>
</template>

<style scoped>
.about-page{background:#f7f5f1;color:#171717}.eyebrow{font-size:10px;font-weight:700;letter-spacing:.27em;color:#0c38c5}.about-hero{min-height:570px;display:grid;grid-template-columns:1fr 1fr;background:#eeece7}.about-copy{padding:clamp(48px,8vw,130px) clamp(28px,6vw,100px);align-self:center}.about-copy h1{font-size:clamp(48px,5.2vw,78px);line-height:1.02;letter-spacing:-.07em;margin:22px 0}.about-copy p{max-width:560px;color:#66635d;line-height:1.7;font-size:16px}.about-copy a,.about-status a{display:inline-flex;align-items:center;gap:24px;margin-top:30px;color:#0c38c5;text-decoration:none;font-size:14px;font-weight:700;border-bottom:1px solid #0c38c5;padding-bottom:8px}.about-hero img{display:block;width:100%;height:100%;min-height:570px;object-fit:cover}.about-principles{max-width:1450px;padding:95px 48px 110px;margin:auto}.section-heading h2{font-size:clamp(32px,3.6vw,54px);letter-spacing:-.055em;line-height:1.08;margin:16px 0 42px}.principle-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #d9d5cc}.principle-grid article{padding:30px 28px 0 0}.principle-grid article+article{border-left:1px solid #d9d5cc;padding-left:28px}.principle-grid span{font-size:10px;color:#0c38c5;letter-spacing:.2em;font-weight:700}.principle-grid h3{font-size:24px;letter-spacing:-.045em;margin:22px 0 12px}.principle-grid p{color:#6e6a63;line-height:1.6;font-size:14px;max-width:320px}.about-status{background:#17201e;color:#fff;padding:80px max(28px,calc((100vw - 1354px)/2));}.about-status h2{font-size:clamp(32px,3.3vw,49px);letter-spacing:-.05em;margin:18px 0}.about-status p{max-width:700px;color:#c4c9c5;line-height:1.65;font-size:15px}.about-status a{color:#dce6ff;border-color:#dce6ff}@media(max-width:800px){.about-hero{grid-template-columns:1fr}.about-copy{padding:65px 24px}.about-hero img{min-height:0;height:340px}.about-principles{padding:65px 24px}.principle-grid{grid-template-columns:1fr}.principle-grid article,.principle-grid article+article{padding:24px 0;border-left:0;border-bottom:1px solid #d9d5cc}.about-status{padding:65px 24px}}
</style>
