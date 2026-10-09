#!/usr/bin/env node
/* Génère les pages « Mentions légales » (mentions-legales.html) et « Politique de confidentialité » (confidentialite.html)
   en français, anglais et arabe. Le contact vient de site.config.json (contact_email, sinon la page Facebook officielle).
   Utilisation : node scripts/legal.mjs */
import fs from "node:fs";
import { esc } from "./gabarits-actualites.mjs";

const conf = JSON.parse(fs.readFileSync("site.config.json", "utf8"));
const fb = (txt) => `<a href="${conf.facebook}" target="_blank" rel="noopener">${txt}</a>`;
const mail = conf.contact_email ? `<a href="mailto:${conf.contact_email}">${conf.contact_email}</a>` : "";

const L = {
  fr: { dir: "", lang: "fr", rtl: false, site: conf.nom, kicker: "Informations légales", fleche: "←", accueil: "Retour à l'accueil",
    ml: { titre: "Mentions légales", desc: "Mentions légales du site officiel du Shaykh Mohamed Faouzi Al Karkari.",
      s: [
        ["Éditeur du site", [`Ce site est le site officiel du Shaykh Mohamed Faouzi Al Karkari, guide spirituel, auteur et conférencier. Directeur de la publication : le Shaykh Mohamed Faouzi Al Karkari.`]],
        ["Contact", [mail ? `Vous pouvez nous écrire à l'adresse ${mail} ou passer par la ${fb("page Facebook officielle du Shaykh")}.` : `Pour toute question ou demande, vous pouvez nous contacter par la ${fb("page Facebook officielle du Shaykh")}.`]],
        ["Hébergement", [`Le site est hébergé par Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis (service Cloudflare Pages).`]],
        ["Propriété intellectuelle", [`Les textes, photographies, vidéos, illustrations et logos présentés sur ce site sont protégés. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable est interdite, sauf courte citation avec mention de la source. Les crédits des photographies figurent, lorsqu'ils sont connus, sous les albums concernés.`, `Les articles d'actualité repris du site karkariya.fr restent la propriété de leurs auteurs.`]],
        ["Liens externes et vidéos", [`Ce site contient des liens vers des sites tiers (réseaux sociaux, médias, sites associés) et des vidéos hébergées par YouTube. Leurs éditeurs sont seuls responsables de leurs contenus et de leurs propres règles de confidentialité.`]],
        ["Traductions", [`Les versions anglaise et arabe du site sont des traductions de la version française, qui fait foi en cas de divergence.`]],
      ] },
    cf: { titre: "Politique de confidentialité", desc: "Comment sont utilisées les données recueillies par le formulaire « Prochaines rencontres ».",
      s: [
        ["Qui est responsable de vos données ?", [`Le responsable du traitement est le Shaykh Mohamed Faouzi Al Karkari, éditeur de ce site.`]],
        ["Quelles données recueillons-nous ?", [`Uniquement celles que vous saisissez dans le formulaire « Prochaines rencontres » : prénom, nom, ville, pays, adresse e-mail et, si vous le souhaitez, numéro de téléphone.`, `Le site n'utilise ni publicité ni cookie de suivi.`]],
        ["Pourquoi ?", [`Ces informations servent uniquement à vous prévenir des prochaines rencontres du Shaykh. La base légale est votre consentement, que vous donnez en cochant la case du formulaire.`]],
        ["Qui y a accès ?", [`Seules les personnes chargées d'informer le public des rencontres, via un espace d'administration protégé par mot de passe. Vos données ne sont ni vendues ni cédées. Elles sont stockées chez notre hébergeur, Cloudflare, Inc. (États-Unis), dans le cadre de ses garanties contractuelles de protection des données.`]],
        ["Combien de temps ?", [`Vos données sont conservées tant que vous souhaitez recevoir ces informations, et au plus trois ans après notre dernier contact avec vous.`]],
        ["Vos droits", [`Vous pouvez à tout moment demander l'accès à vos données, leur rectification ou leur suppression, vous opposer à leur utilisation ou retirer votre consentement. ${mail ? `Écrivez-nous à ${mail} ou passez` : "Passez"} par la ${fb("page Facebook officielle du Shaykh")}. Vous pouvez également saisir la CNIL (www.cnil.fr) si vous estimez que vos droits ne sont pas respectés.`]],
        ["Services tiers", [`Les vidéos intégrées sont fournies par YouTube (Google) : leur lecture est soumise à la politique de confidentialité de ce service. De même pour le lien vers Facebook.`]],
      ] },
    liens: ["Mentions légales", "Confidentialité"] },
  en: { dir: "en/", lang: "en", rtl: false, site: conf.nom, kicker: "Legal information", fleche: "←", accueil: "Back to home",
    ml: { titre: "Legal notice", desc: "Legal notice of the official website of Shaykh Mohamed Faouzi Al Karkari.",
      s: [
        ["Publisher", [`This is the official website of Shaykh Mohamed Faouzi Al Karkari, spiritual guide, author and lecturer. Publication director: Shaykh Mohamed Faouzi Al Karkari.`]],
        ["Contact", [mail ? `You can write to us at ${mail} or use the ${fb("Shaykh's official Facebook page")}.` : `For any question or request, you can contact us through the ${fb("Shaykh's official Facebook page")}.`]],
        ["Hosting", [`The site is hosted by Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, United States (Cloudflare Pages service).`]],
        ["Intellectual property", [`The texts, photographs, videos, illustrations and logos shown on this site are protected. Any reproduction, representation or distribution, in whole or in part, without prior authorisation is prohibited, except for a short quotation with the source mentioned. Photo credits appear, where known, beneath the relevant albums.`, `News articles taken from the karkariya.fr website remain the property of their authors.`]],
        ["External links and videos", [`This site contains links to third-party sites (social networks, media, related sites) and videos hosted by YouTube. Their publishers are solely responsible for their content and their own privacy rules.`]],
        ["Translations", [`The English and Arabic versions of the site are translations of the French version, which prevails in case of discrepancy.`]],
      ] },
    cf: { titre: "Privacy policy", desc: "How the data collected through the “Upcoming gatherings” form is used.",
      s: [
        ["Who is responsible for your data?", [`The data controller is Shaykh Mohamed Faouzi Al Karkari, publisher of this site.`]],
        ["What data do we collect?", [`Only what you enter in the “Upcoming gatherings” form: first name, last name, city, country, e-mail address and, if you wish, a phone number.`, `The site uses no advertising and no tracking cookies.`]],
        ["Why?", [`This information is used only to notify you of the Shaykh's upcoming gatherings. The legal basis is your consent, given by ticking the box on the form.`]],
        ["Who has access?", [`Only the people in charge of informing the public about gatherings, through a password-protected administration area. Your data is neither sold nor handed over. It is stored with our host, Cloudflare, Inc. (United States), under its contractual data-protection safeguards.`]],
        ["For how long?", [`Your data is kept for as long as you wish to receive this information, and for no more than three years after our last contact with you.`]],
        ["Your rights", [`You may at any time ask for access to your data, its correction or deletion, object to its use or withdraw your consent. ${mail ? `Write to us at ${mail} or use` : "Use"} the ${fb("Shaykh's official Facebook page")}. You may also lodge a complaint with your national data-protection authority (in France, the CNIL, www.cnil.fr).`]],
        ["Third-party services", [`Embedded videos are provided by YouTube (Google): watching them is subject to that service's privacy policy. The same applies to the link to Facebook.`]],
      ] },
    liens: ["Legal notice", "Privacy"] },
  ar: { dir: "ar/", lang: "ar", rtl: true, site: "الشيخ محمد فوزي الكركري", kicker: "معلومات قانونية", fleche: "→", accueil: "العودة إلى الرئيسية",
    ml: { titre: "إشعار قانوني", desc: "الإشعار القانوني للموقع الرسمي للشيخ محمد فوزي الكركري.",
      s: [
        ["ناشر الموقع", [`هذا هو الموقع الرسمي للشيخ محمد فوزي الكركري، المرشد الروحي والمؤلف والمحاضر. مدير النشر: الشيخ محمد فوزي الكركري.`]],
        ["التواصل", [mail ? `يمكنكم مراسلتنا على العنوان ${mail} أو عبر ${fb("الصفحة الرسمية للشيخ على فيسبوك")}.` : `لأي سؤال أو طلب، يمكنكم التواصل معنا عبر ${fb("الصفحة الرسمية للشيخ على فيسبوك")}.`]],
        ["الاستضافة", [`يستضيف الموقعَ Cloudflare, Inc.، العنوان: 101 Townsend Street, San Francisco, CA 94107، الولايات المتحدة (خدمة Cloudflare Pages).`]],
        ["الملكية الفكرية", [`النصوص والصور ومقاطع الفيديو والرسوم والشعارات المعروضة في هذا الموقع محمية. يُمنع أي نسخ أو عرض أو نشر، كليًّا أو جزئيًّا، دون إذن مسبق، باستثناء اقتباس قصير مع ذكر المصدر. وتظهر أسماء مصوّري الصور، حيثما عُرفت، أسفل الألبومات المعنية.`, `وتبقى مقالات الأخبار المنقولة من موقع karkariya.fr ملكًا لأصحابها.`]],
        ["الروابط الخارجية ومقاطع الفيديو", [`يحتوي هذا الموقع على روابط إلى مواقع أخرى (شبكات التواصل ووسائل الإعلام والمواقع المرتبطة) ومقاطع فيديو مستضافة على يوتيوب. وناشروها وحدهم مسؤولون عن محتوياتها وعن قواعد الخصوصية الخاصة بهم.`]],
        ["الترجمات", [`النسختان الإنجليزية والعربية من الموقع ترجمتان للنسخة الفرنسية، وهي المعتمدة عند أي اختلاف.`]],
      ] },
    cf: { titre: "سياسة الخصوصية", desc: "كيف تُستخدم البيانات التي يجمعها نموذج «اللقاءات القادمة».",
      s: [
        ["من المسؤول عن بياناتكم؟", [`المسؤول عن المعالجة هو الشيخ محمد فوزي الكركري، ناشر هذا الموقع.`]],
        ["ما البيانات التي نجمعها؟", [`فقط ما تُدخلونه في نموذج «اللقاءات القادمة»: الاسم واللقب والمدينة والبلد والبريد الإلكتروني، ورقم الهاتف إن رغبتم.`, `ولا يستخدم الموقع إعلانات ولا ملفات تتبّع.`]],
        ["لماذا؟", [`تُستخدم هذه المعلومات فقط لإعلامكم باللقاءات القادمة للشيخ. وأساسها القانوني هو موافقتكم، التي تعبّرون عنها بتأشير الخانة في النموذج.`]],
        ["من يطّلع عليها؟", [`فقط المكلّفون بإعلام الجمهور باللقاءات، عبر فضاء إدارة محمي بكلمة مرور. ولا تُباع بياناتكم ولا تُتنازل عنها. وهي مخزّنة لدى مستضيفنا Cloudflare, Inc. (الولايات المتحدة) في إطار ضماناته التعاقدية لحماية البيانات.`]],
        ["كم من الوقت؟", [`تُحفظ بياناتكم ما دمتم ترغبون في تلقّي هذه المعلومات، وبما لا يزيد على ثلاث سنوات بعد آخر اتصال بكم.`]],
        ["حقوقكم", [`يمكنكم في أي وقت طلب الاطلاع على بياناتكم أو تصحيحها أو حذفها، أو الاعتراض على استخدامها أو سحب موافقتكم. ${mail ? `راسلونا على ${mail} أو استخدموا` : "استخدموا"} ${fb("الصفحة الرسمية للشيخ على فيسبوك")}. ويمكنكم أيضًا تقديم شكوى إلى هيئة حماية البيانات في بلدكم.`]],
        ["خدمات الأطراف الثالثة", [`مقاطع الفيديو المدمجة يوفّرها يوتيوب (غوغل)، ومشاهدتها خاضعة لسياسة خصوصية تلك الخدمة. وكذلك الرابط إلى فيسبوك.`]],
      ] },
    liens: ["إشعار قانوني", "الخصوصية"] },
};

function page(T, cle, nom) {
  const d = T[cle];
  const titre = `${d.titre} — ${T.site}`;
  const corps = d.s.map(([h, ps]) => `        <h3>${esc(h)}</h3>\n${ps.map((p) => `        <p>${p}</p>`).join("\n")}`).join("\n");
  return `<!doctype html>
<html lang="${T.lang}"${T.rtl ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(titre)}</title>
  <meta name="description" content="${esc(d.desc)}" />
  <meta property="og:title" content="${esc(titre)}" />
  <meta property="og:description" content="${esc(d.desc)}" />
  <meta property="og:image" content="/media/partage-shaykh.jpg" />
</head>
<body data-page="shaykh">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="shaykh-texte maitre">
      <div class="section-head">
        <p class="kicker">${T.kicker}</p>
        <h1 class="h2" data-split>${esc(d.titre)}</h1>
      </div>
      <div class="actu-corps">
${corps}
      </div>
      <div class="center shaykh-suite"><a class="btn-glass btn-glass--dark" href="index.html"><span>${T.fleche} ${T.accueil}</span></a></div>
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;
}

for (const T of Object.values(L)) {
  if (T.dir) fs.mkdirSync(T.dir, { recursive: true });
  fs.writeFileSync(`${T.dir}mentions-legales.html`, page(T, "ml"));
  fs.writeFileSync(`${T.dir}confidentialite.html`, page(T, "cf"));
}
console.log("mentions-legales.html + confidentialite.html ×3");
