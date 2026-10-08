#!/usr/bin/env python3
"""Génère les versions anglaise (en/) et arabe (ar/) des pages éditoriales fixes
(Qui est le Shaykh ?, Le Shaykh, Projet Merkez) à partir des pages françaises.
Chaque entrée : texte français exact -> (anglais, arabe). Une entrée introuvable arrête le script.
Utilisation : python3 scripts/langues-pages.py"""
import re, sys, os

def lire(p): return open(p, encoding="utf-8").read()

def traduire(src, table, code):
    html = lire(src)
    i = 1 if code == "en" else 2
    for ligne in table:
        fr = ligne[0]
        if fr not in html:
            sys.exit("introuvable dans %s : %s" % (src, fr[:70]))
        html = html.replace(fr, ligne[i])
    html = html.replace('<html lang="fr">', '<html lang="%s"%s>' % (code, ' dir="rtl"' if code == "ar" else ""), 1)
    os.makedirs(code, exist_ok=True)
    open(os.path.join(code, os.path.basename(src)), "w", encoding="utf-8").write(html)

# ---------------------------------------------------------------- Le Shaykh (page d'entrée)
HUB = [
 ("Le Shaykh Mohamed Faouzi Al Karkari : qui il est, et la chaîne de transmission dont il est l'héritier.", "Shaykh Mohamed Faouzi Al Karkari: who he is, and the chain of transmission he inherits.", "الشيخ محمد فوزي الكركري: من هو، وسلسلة الإسناد التي ورثها."),
 ("Le Shaykh — Shaykh Mohamed Faouzi Al Karkari", "The Shaykh — Shaykh Mohamed Faouzi Al Karkari", "الشيخ — الشيخ محمد فوزي الكركري"),
 ('<p class="kicker">Le Shaykh</p>', '<p class="kicker">The Shaykh</p>', '<p class="kicker">الشيخ</p>'),
 ("<h1 class=\"h2\" data-split>Shaykh Mohamed Faouzi Al Karkari</h1>", "<h1 class=\"h2\" data-split>Shaykh Mohamed Faouzi Al Karkari</h1>", "<h1 class=\"h2\" data-split>الشيخ محمد فوزي الكركري</h1>"),
 ("Guide spirituel de la Confrérie Soufie Karkariya. Cinq portes pour le connaître.", "Spiritual guide of the Karkariya Sufi Order. Five doors to get to know him.", "المرشد الروحي للطريقة الصوفية الكركرية. خمسة أبواب للتعرّف عليه."),
 ("<h2>Qui est le Shaykh&nbsp;?</h2>", "<h2>Who is the Shaykh?</h2>", "<h2>من هو الشيخ؟</h2>"),
 ("Son parcours, ses recherches, sa biographie.", "His journey, his research, his biography.", "مسيرته وأبحاثه وسيرته."),
 ("<h2>Sa chaîne de transmission</h2>", "<h2>His chain of transmission</h2>", "<h2>سلسلة إسناده</h2>"),
 ("La silsila, et les maîtres qui l'ont précédé.", "The silsila, and the masters who came before him.", "السلسلة والمشايخ الذين سبقوه."),
 ("<h2>Sa lignée chérifienne</h2>", "<h2>His noble lineage</h2>", "<h2>نسبه الشريف</h2>"),
 ("Une noble famille, jusqu'au Prophète ﷺ.", "A noble family, all the way back to the Prophet ﷺ.", "أسرة شريفة تمتدّ إلى النبي ﷺ."),
 ("<h2>Son ascendance</h2>", "<h2>His ancestry</h2>", "<h2>أصوله وأجداده</h2>"),
 ("Du Prophète ﷺ aux Idrissides du Rif : l'histoire de sa lignée.", "From the Prophet ﷺ to the Idrisids of the Rif: the story of his lineage (article in French).", "من النبي ﷺ إلى الأدارسة في الريف: قصة نسبه (المقال بالفرنسية)."),
 ('href="ascendance-prophetique.html"', 'href="../ascendance-prophetique.html"', 'href="../ascendance-prophetique.html"'),
 ("<h2>Une marche de 10 ans à travers le Maroc</h2>", "<h2>A 10-year walk across Morocco</h2>", "<h2>مسيرة عشر سنوات عبر المغرب</h2>"),
 ("Seul, en quête de son Seigneur, de 1994 à 2004.", "Alone, in search of his Lord, from 1994 to 2004.", "وحيدًا، في طلب ربّه، من 1994 إلى 2004."),
 ('<span class="hub-go">Découvrir <i>→</i></span>', '<span class="hub-go">Discover <i>→</i></span>', '<span class="hub-go">اكتشف <i>←</i></span>'),
]

# ---------------------------------------------------------------- Projet Merkez
MERKEZ = [
 ("Le Projet Merkez sera présenté prochainement.", "The Merkez Project will be presented soon.", "سيُعرض مشروع مركز قريبًا."),
 ("Projet Merkez — Shaykh Mohamed Faouzi Al Karkari", "Merkez Project — Shaykh Mohamed Faouzi Al Karkari", "مشروع مركز — الشيخ محمد فوزي الكركري"),
 ('<p class="kicker">Projet Merkez</p>', '<p class="kicker">Merkez Project</p>', '<p class="kicker">مشروع مركز</p>'),
 ("Merkez, le centre.", "Merkez, the centre.", "مركز، المحور."),
 ("Le Projet Merkez sera présenté prochainement sur cette page.", "The Merkez Project will be presented soon on this page.", "سيُعرض مشروع مركز قريبًا في هذه الصفحة."),
 ("<span>Être informé</span>", "<span>Stay informed</span>", "<span>ابقَ على اطلاع</span>"),
 ("<i>→</i></a>", "<i>→</i></a>", "<i>←</i></a>"),
]

# ---------------------------------------------------------------- Qui est le Shaykh ?
QUI = [
 ("Le Shaykh Mohamed Faouzi Al Karkari : un héritier de la chaîne de transmission, un chercheur de son temps.", "Shaykh Mohamed Faouzi Al Karkari: an heir to the chain of transmission, a researcher of his time.", "الشيخ محمد فوزي الكركري: وارثٌ لسلسلة الإسناد، وباحثٌ في عصره."),
 ("Qui est le Shaykh ? — Shaykh Mohamed Faouzi Al Karkari", "Who is the Shaykh? — Shaykh Mohamed Faouzi Al Karkari", "من هو الشيخ؟ — الشيخ محمد فوزي الكركري"),
 ('data-cursor="Voir"', 'data-cursor="View"', 'data-cursor="عرض"'),
 ('alt="Le Shaykh Mohamed Faouzi Al Karkari en djellaba blanche et chéchia rouge"', 'alt="Shaykh Mohamed Faouzi Al Karkari in a white djellaba and red chechia"', 'alt="الشيخ محمد فوزي الكركري بجلبابٍ أبيض وطربوشٍ أحمر"'),
 ('alt="Le Shaykh prenant la parole lors d\'une conférence"', 'alt="The Shaykh speaking at a conference"', 'alt="الشيخ يتحدث في أحد المؤتمرات"'),
 ('<p class="kicker">Qui est le Shaykh ?</p>', '<p class="kicker">Who is the Shaykh?</p>', '<p class="kicker">من هو الشيخ؟</p>'),
 ("Un héritier de la chaîne, un chercheur de son temps.", "An heir to the chain, a researcher of his time.", "وارثٌ للسلسلة، وباحثٌ في عصره."),
 ("Le Shaykh Mohamed Faouzi Al Karkari est le guide spirituel de l'Ordre soufi Karkariya, héritier d'une chaîne de transmission ininterrompue remontant au Prophète Mohamed ﷺ. Auteur de 55 livres publiés dans six langues, dont certains sont étudiés dans certaines universités américaines, il conjugue l'accompagnement spirituel, l'écriture et la recherche internationale sur le soufisme — de Nador à Chicago, de Paris à Genève.",
  "Shaykh Mohamed Faouzi Al Karkari is the spiritual guide of the Karkariya Sufi Order, heir to an unbroken chain of transmission going back to the Prophet Muhammad ﷺ. Author of 55 books published in six languages, some of which are studied in American universities, he combines spiritual guidance, writing and international research on Sufism — from Nador to Chicago, from Paris to Geneva.",
  "الشيخ محمد فوزي الكركري هو المرشد الروحي للطريقة الكركرية، ووارثُ سلسلة إسنادٍ متصلة تعود إلى النبي محمد ﷺ. مؤلِّفُ خمسةٍ وخمسين كتابًا منشورة بست لغات، يُدرَّس بعضها في جامعات أمريكية، وهو يجمع بين الإرشاد الروحي والتأليف والبحث الدولي في التصوّف — من الناظور إلى شيكاغو، ومن باريس إلى جنيف."),
 ("« La Lumière divine n'est pas une métaphore, mais une réalité qui se voit. »", "“The divine Light is not a metaphor, but a reality that can be seen.”", "«النور الإلهي ليس استعارةً، بل حقيقةٌ تُرى.»"),
 ('<p class="kicker" data-reveal>Quelques chiffres</p>', '<p class="kicker" data-reveal>A few figures</p>', '<p class="kicker" data-reveal>بعض الأرقام</p>'),
 ('<strong>pays</strong><span>où sont présents les disciples du Shaykh, sur les cinq continents</span>', "<strong>countries</strong><span>where the Shaykh's disciples are present, on all five continents</span>", '<strong>بلدًا</strong><span>يتواجد فيها تلاميذ الشيخ عبر القارات الخمس</span>'),
 ('<strong>millions</strong><span>de disciples et de sympathisants à travers le monde</span>', '<strong>million</strong><span>disciples and sympathisers around the world</span>', '<strong>مليون</strong><span>من المريدين والمتعاطفين عبر العالم</span>'),
 ("<strong>universités</strong><span>l'ont invité à donner une conférence, aux États-Unis, au Brésil, en France et ailleurs</span>", '<strong>universities</strong><span>have invited him to lecture, in the United States, Brazil, France and elsewhere</span>', '<strong>جامعات</strong><span>دعته لإلقاء محاضرة، في الولايات المتحدة والبرازيل وفرنسا وغيرها</span>'),
 ('<strong>ouvrages</strong><span>publiés par le Shaykh, dont 6 livres écrits en arabe</span>', '<strong>books</strong><span>published by the Shaykh, 6 of them written in Arabic</span>', '<strong>مؤلَّفًا</strong><span>نشرها الشيخ، منها ستة كتب كُتبت بالعربية</span>'),
 ('<strong>langues</strong><span>dans lesquelles ses livres sont traduits : arabe, français, italien, espagnol, anglais, néerlandais</span>', '<strong>languages</strong><span>into which his books are translated: Arabic, French, Italian, Spanish, English and Dutch</span>', '<strong>لغات</strong><span>تُرجمت إليها كتبه: العربية والفرنسية والإيطالية والإسبانية والإنجليزية والهولندية</span>'),
 ("<!-- ============ BIOGRAPHIE (importée du site d'origine) ============ -->", "<!-- ============ BIOGRAPHY ============ -->", "<!-- ============ BIOGRAPHY ============ -->"),
 ('<p class="kicker">Biographie</p>', '<p class="kicker">Biography</p>', '<p class="kicker">السيرة</p>'),
 ("Un cheminement, une transmission", "A path, a transmission", "مسيرةٌ وتبليغ"),
 ("<h3>Origines et formation</h3>", "<h3>Origins and education</h3>", "<h3>النشأة والتكوين</h3>"),
 ("Le Shaykh Mohamed Faouzi Al Karkari est né en 1974 (1394 de l'hégire) à Tamsaman, dans le Rif marocain, dans la zawiya de son grand-père, le Shaykh Moulay Tahar al-Karkari, lui-même héritier du Shaykh Ahmad al-Alawi. Issu d'une noble famille chérifienne, descendant de la lignée idrisside qui remonte au Prophète Muhammad (que la paix soit sur lui), il a grandi au milieu des disciples. Il suit sa scolarité primaire à Al Hoceima, puis ses études secondaires à Taza.",
  "Shaykh Mohamed Faouzi Al Karkari was born in 1974 (1394 AH) in Tamsaman, in the Moroccan Rif, in the zawiya of his grandfather, Shaykh Moulay Tahar al-Karkari, himself an heir of Shaykh Ahmad al-Alawi. Born into a noble sharifian family, a descendant of the Idrisid line going back to the Prophet Muhammad (peace be upon him), he grew up among the disciples. He attended primary school in Al Hoceima, then secondary school in Taza.",
  "وُلد الشيخ محمد فوزي الكركري سنة 1974م (1394هـ) في تمسمان بالريف المغربي، في زاوية جدّه الشيخ مولاي الطاهر الكركري، وارث الشيخ أحمد العلاوي. ينتمي إلى أسرة شريفة، من سلالة الأدارسة التي يتصل نسبها بالنبي محمد ﷺ، ونشأ بين المريدين. تابع دراسته الابتدائية بالحسيمة ثم الثانوية بتازة."),
 ("<h3>La pérégrination</h3>", "<h3>The wandering</h3>", "<h3>السياحة</h3>"),
 ("En 1994, à vingt ans, il quitte sa famille et sa région pour partir sur les routes du Maroc. Pendant dix ans, jusqu'en 2004, il traverse le pays seul, en quête de son Seigneur, sans aucun objectif ni destination, vivant de ce qu'Allah lui donne au fil du chemin.",
  "In 1994, at the age of twenty, he left his family and region to take to the roads of Morocco. For ten years, until 2004, he crossed the country alone, in search of his Lord, with no goal or destination whatsoever, living on whatever God gave him along the way.",
  "في سنة 1994م، وهو في العشرين من عمره، غادر أسرته وإقليمه ليسير في دروب المغرب. وطوال عشر سنوات، حتى سنة 2004م، قطع البلاد وحيدًا، طلبًا لربّه، من غير هدفٍ ولا وجهة، يعيش مما يرزقه الله على الطريق."),
 ("D'Oujda à Al Mahbes, dans le désert marocain, de Tanger à Guelmim, il avance de région en région, sans plan ni attache, s'en remettant chaque jour à ce que Dieu met sur sa route.",
  "From Oujda to Al Mahbes in the Moroccan desert, from Tangier to Guelmim, he moved from region to region, with no plan and no ties, relying each day on whatever God placed on his path.",
  "من وجدة إلى المحبس في الصحراء المغربية، ومن طنجة إلى كلميم، انتقل من إقليم إلى آخر، بلا خطةٍ ولا قيد، متوكّلًا كل يوم على ما يضعه الله في طريقه."),
 ("<span>Lire le récit de cette marche de dix ans</span>", "<span>Read the story of this ten-year walk</span>", "<span>اقرأ قصة هذه المسيرة التي دامت عشر سنوات</span>"),
 ('href="marche-de-dix-ans.html"', 'href="marche-de-dix-ans.html"', 'href="marche-de-dix-ans.html"'),
 ("À son retour à Nador, un feu intérieur, un besoin de repentir et une quête profonde du divin le conduisent chez son Shaykh.",
  "On his return to Nador, an inner fire, a need for repentance and a deep quest for the divine led him to his Shaykh.",
  "وعند عودته إلى الناظور، قادته نارٌ باطنة وحاجةٌ إلى التوبة وطلبٌ عميق للحقّ إلى شيخه."),
 ("<h3>La rencontre avec son maître et la succession</h3>", "<h3>Meeting his master, and the succession</h3>", "<h3>اللقاء بالشيخ والخلافة</h3>"),
 ("En 2004, il rend visite à son oncle, le Shaykh Sidi Mawlay al-Hassan Al Karkari, héritier du Shaykh Moulay Tahar, auprès duquel il demande à s'engager sur la voie. Il entre en retraite spirituelle (<em>khalwa</em>) en novembre 2004, puis demeure environ deux ans à ses côtés, dans l'étude, l'assiduité et l'invocation.",
  "In 2004 he visited his uncle, Shaykh Sidi Mawlay al-Hassan Al Karkari, heir of Shaykh Moulay Tahar, and asked to be admitted to the path. He entered a spiritual retreat (<em>khalwa</em>) in November 2004, then remained with him for about two years, in study, devotion and invocation.",
  "في سنة 2004م زار عمَّه الشيخ سيدي مولاي الحسن الكركري، وارثَ الشيخ مولاي الطاهر، وطلب منه أن يأخذ عنه الطريق. دخل الخلوة (<em>khalwa</em>) في نوفمبر 2004م، ثم لازمه نحو سنتين في الدراسة والمداومة والذكر."),
 ("À la mort de son Shaykh, en 2007 (1428 de l'hégire), celui-ci témoigne devant une trentaine de témoins que Mohamed Faouzi Al Karkari est son héritier. Il renouvelle alors l'enseignement de la voie et en rend les fondements accessibles à ceux qui s'y engagent. Il est aujourd'hui le Guide spirituel de l'Ordre Soufi Karkariya, héritier d'une chaîne de transmission reconnue à travers le monde.",
  "When his Shaykh passed away in 2007 (1428 AH), he had declared before some thirty witnesses that Mohamed Faouzi Al Karkari was his heir. He then renewed the teaching of the path and made its foundations accessible to those who commit to it. He is today the spiritual Guide of the Karkariya Sufi Order, heir to a chain of transmission recognised throughout the world.",
  "وعند وفاة شيخه سنة 2007م (1428هـ) كان قد أشهد نحو ثلاثين شاهدًا بأن محمد فوزي الكركري وارثُه. فجدّد تعليم الطريق وجعل أصوله في متناول من يسلكه. وهو اليوم المرشد الروحي للطريقة الصوفية الكركرية، وارثُ سلسلة إسنادٍ معروفة في أنحاء العالم."),
 ("<h3>Une voie qui rayonne</h3>", "<h3>A path that radiates</h3>", "<h3>طريقٌ يشعّ</h3>"),
 ("Porté par un message d'unité, de fraternité et d'amour de Dieu à travers l'amour de Sa création, l'ordre s'est développé très rapidement. Il est aujourd'hui présent dans 36 pays, sur les cinq continents.",
  "Carried by a message of unity, brotherhood and love of God through love of His creation, the order grew very quickly. It is now present in 36 countries, on all five continents.",
  "بفضل رسالةٍ تقوم على الوحدة والأخوّة ومحبة الله من خلال محبة خلقه، انتشرت الطريقة سريعًا، وهي حاضرة اليوم في 36 بلدًا عبر القارات الخمس."),
 ("Depuis janvier 2023, il est Chercheur principal pour les États-Unis et à l'international, au sein d'une collaboration entre des chercheurs de la Divinity School de l'Université de Chicago, de l'Université Yale et de l'American University of Sharjah. Conduit à l'invitation du professeur Yousef Casewit (Université de Chicago), ce projet met en lumière les enseignements et les apports de grandes figures soufies moins connues, parmi lesquelles Sidi Abdurrahman al-Majdoub, ʿAbd al-Karīm al-Jīlī, Ibn al-Fāriḍ, Abū l-Ḥasan al-Shādhilī et ʿĀʾisha al-Manūbiyya.",
  "Since January 2023 he has been Principal Investigator for the United States and internationally, within a collaboration between researchers of the University of Chicago Divinity School, Yale University and the American University of Sharjah. Led at the invitation of Professor Yousef Casewit (University of Chicago), this project sheds light on the teachings and contributions of great but lesser-known Sufi figures, among them Sidi Abdurrahman al-Majdoub, ʿAbd al-Karīm al-Jīlī, Ibn al-Fāriḍ, Abū l-Ḥasan al-Shādhilī and ʿĀʾisha al-Manūbiyya.",
  "منذ يناير 2023م وهو الباحث الرئيسي للولايات المتحدة وعلى الصعيد الدولي، ضمن تعاونٍ بين باحثين من كلية اللاهوت بجامعة شيكاغو وجامعة ييل والجامعة الأمريكية في الشارقة. ويُنجَز هذا المشروع بدعوةٍ من الأستاذ يوسف كاسويت (جامعة شيكاغو)، ويُبرز تعاليمَ كبار أعلام التصوف الأقلّ شهرة وإسهاماتِهم، ومنهم سيدي عبد الرحمن المجذوب وعبد الكريم الجيلي وابن الفارض وأبو الحسن الشاذلي وعائشة المنوبية."),
 ("Il est également fondateur et président de l'Al Karkari Institute for Sufi Studies, organisation américaine à but non lucratif dédiée à la recherche académique sur le soufisme. L'Institut crée des ponts entre la recherche académique et l'expérience spirituelle vécue : traduction de la littérature soufie, partenariats avec des universités de premier plan pour des projets de traduction collaborative, rédaction d'ouvrages. Chercheur invité à l'Université de Chicago en 2023, il y a animé des ateliers de niveau master et doctorat consacrés à la littérature soufie extatique.",
  "He is also founder and president of the Al Karkari Institute for Sufi Studies, an American non-profit organisation dedicated to academic research on Sufism. The Institute builds bridges between academic research and lived spiritual experience: translation of Sufi literature, partnerships with leading universities on collaborative translation projects, and the writing of books. A visiting researcher at the University of Chicago in 2023, he led master's and doctoral level workshops there on ecstatic Sufi literature.",
  "وهو كذلك مؤسس ورئيس معهد الكركري للدراسات الصوفية، وهو منظمة أمريكية غير ربحية مكرّسة للبحث الأكاديمي في التصوف. ويُقيم المعهد جسورًا بين البحث الأكاديمي والتجربة الروحية المعيشة: ترجمة الأدب الصوفي، وشراكات مع جامعات رائدة في مشاريع ترجمة تعاونية، وتأليف الكتب. وكان باحثًا زائرًا في جامعة شيكاغو سنة 2023م، حيث أدار ورشات للماجستير والدكتوراه حول الأدب الصوفي الوجدي."),
 ("<h3>L'auteur</h3>", "<h3>The author</h3>", "<h3>المؤلِّف</h3>"),
 ("Le Shaykh est l'auteur d'une œuvre en langue arabe de six livres consacrés à la voie soufie. Traduits en français, anglais, espagnol, italien et néerlandais, ils forment aujourd'hui, avec d'autres ouvrages consacrés à son enseignement, une bibliothèque de quarante-neuf titres à la disposition des chercheurs comme des chercheurs de Dieu.",
  "The Shaykh is the author of six books written in Arabic on the Sufi path. Translated into French, English, Spanish, Italian and Dutch, they now form, together with other works on his teaching, a library of forty-nine titles, at the disposal of scholars and seekers of God alike.",
  "للشيخ ستة كتب بالعربية في الطريق الصوفي. وقد تُرجمت إلى الفرنسية والإنجليزية والإسبانية والإيطالية والهولندية، وهي تشكّل اليوم، مع مؤلفات أخرى حول تعاليمه، مكتبةً من تسعة وأربعين عنوانًا في متناول الباحثين وطلاب الحقّ على السواء."),
 ("Cette œuvre est désormais étudiée dans le monde académique : <em>Les Fondements de l'Ordre Karkariya</em> (<em>The Foundations of the Karkariya Order</em>) a ainsi été traduit en anglais par Y. Casewit, K. Williams et J. Zaghdoudi (2021).",
  "This body of work is now studied in the academic world: <em>The Foundations of the Karkariya Order</em> was thus translated into English by Y. Casewit, K. Williams and J. Zaghdoudi (2021).",
  "وقد بات هذا المؤلَّف موضع دراسةٍ في الأوساط الأكاديمية: فكتاب <em>The Foundations of the Karkariya Order</em> (أصول الطريقة الكركرية) تُرجم إلى الإنجليزية على يد ي. كاسويت وك. ويليامز وج. الزغدودي (2021م)."),
 ("<h3>Conférences et ateliers</h3>", "<h3>Lectures and workshops</h3>", "<h3>المحاضرات والورشات</h3>"),
 ("Il intervient régulièrement en Europe, aux États-Unis et au Brésil. Parmi ses interventions récentes :", "He speaks regularly in Europe, the United States and Brazil. Among his recent talks:", "يلقي محاضرات بانتظام في أوروبا والولايات المتحدة والبرازيل، ومن مداخلاته الأخيرة:"),
 ("<strong>23 mai 2026</strong> — Assise spirituelle à Genève (Suisse)", "<strong>23 May 2026</strong> — Spiritual gathering in Geneva (Switzerland)", "<strong>23 مايو 2026</strong> — مجلس روحي في جنيف (سويسرا)"),
 ("<strong>18 mai 2026</strong> — Table ronde à Paris", "<strong>18 May 2026</strong> — Round table in Paris", "<strong>18 مايو 2026</strong> — مائدة مستديرة في باريس"),
 ("<strong>17 mai 2026</strong> — Conférence à Bruxelles", "<strong>17 May 2026</strong> — Lecture in Brussels", "<strong>17 مايو 2026</strong> — محاضرة في بروكسل"),
 ("<strong>16 mai 2026</strong> — Conférence à Eindhoven (Pays-Bas)", "<strong>16 May 2026</strong> — Lecture in Eindhoven (Netherlands)", "<strong>16 مايو 2026</strong> — محاضرة في أيندهوفن (هولندا)"),
 ("<strong>11 mai 2026</strong> — Table ronde à Schleswig (Allemagne)", "<strong>11 May 2026</strong> — Round table in Schleswig (Germany)", "<strong>11 مايو 2026</strong> — مائدة مستديرة في شلسفيغ (ألمانيا)"),
 ("<strong>Octobre 2025</strong> — « Histoire et pertinence contemporaine du soufisme », Université de Santa Catarina, Blumenau (Brésil)", "<strong>October 2025</strong> — “History and contemporary relevance of Sufism”, University of Santa Catarina, Blumenau (Brazil)", "<strong>أكتوبر 2025</strong> — «تاريخ التصوف وراهنيّته المعاصرة»، جامعة سانتا كاتارينا، بلومينو (البرازيل)"),
 ("<li><strong>21 septembre 2025</strong> — Symposium pour la Paix du Rotary, Antony : table ronde « Laïcité et culte » avec des responsables juifs, chrétiens et hindou et des personnalités politiques françaises</li>", "<strong>21 September 2025</strong> — Rotary Peace Symposium, Antony: round table “Secularism and worship” with Jewish, Christian and Hindu leaders and French political figures", "<strong>21 سبتمبر 2025</strong> — ندوة السلام للروتاري، أنطوني: مائدة مستديرة «العلمانية والعبادة» بحضور مسؤولين يهود ومسيحيين وهندوس وشخصيات سياسية فرنسية"),
 ("<strong>Avril 2025</strong> — Conférence internationale pour la Paix « Une Voix pour la Paix », Paris", "<strong>April 2025</strong> — International Peace Conference “A Voice for Peace”, Paris", "<strong>أبريل 2025</strong> — المؤتمر الدولي للسلام «صوتٌ من أجل السلام»، باريس"),
 ("<strong>Février 2025</strong> — « IA et Paix, quel futur voulons-nous ? », Sorbonne, Paris", "<strong>February 2025</strong> — “AI and Peace: what future do we want?”, Sorbonne, Paris", "<strong>فبراير 2025</strong> — «الذكاء الاصطناعي والسلام: أيّ مستقبل نريد؟»، السوربون، باريس"),
 ("<strong>Février 2025</strong> — Deux ateliers à Stanford University sur l'ordre numérique et l'ordre divin, puis un atelier à UC Berkeley : « Illumination et Lumière dans la sagesse d'Ibn ʿAṭāʾ Allāh al-Iskandarī »", "<strong>February 2025</strong> — Two workshops at Stanford University on the digital order and the divine order, then a workshop at UC Berkeley: “Illumination and Light in the wisdom of Ibn ʿAṭāʾ Allāh al-Iskandarī”", "<strong>فبراير 2025</strong> — ورشتان في جامعة ستانفورد حول النظام الرقمي والنظام الإلهي، ثم ورشة في جامعة بيركلي: «الإشراق والنور في حكمة ابن عطاء الله السكندري»"),
 ("<strong>Juillet 2024</strong> — « Les dimensions spirituelles de la calligraphie islamique », The Reed Society, Washington DC", "<strong>July 2024</strong> — “The spiritual dimensions of Islamic calligraphy”, The Reed Society, Washington DC", "<strong>يوليو 2024</strong> — «الأبعاد الروحية للخط الإسلامي»، The Reed Society، واشنطن"),
 ("<strong>Mai 2023</strong> — « Soufisme vivant et intelligence artificielle », Divinity School de l'Université de Chicago", "<strong>May 2023</strong> — “Living Sufism and artificial intelligence”, Divinity School of the University of Chicago", "<strong>مايو 2023</strong> — «التصوف الحيّ والذكاء الاصطناعي»، كلية اللاهوت بجامعة شيكاغو"),
 ("<h3>Distinctions</h3>", "<h3>Honours</h3>", "<h3>التكريمات</h3>"),
 ("<strong>21 septembre 2025</strong> — Paul Harris Fellow (Rotary International), en reconnaissance d'un engagement exceptionnel en faveur de la paix, du dialogue interculturel et du service à la communauté", "<strong>21 September 2025</strong> — Paul Harris Fellow (Rotary International), in recognition of an exceptional commitment to peace, intercultural dialogue and service to the community", "<strong>21 سبتمبر 2025</strong> — زميل بول هاريس (الروتاري الدولي)، تقديرًا لالتزامٍ استثنائي بالسلام والحوار بين الثقافات وخدمة المجتمع"),
 ("<strong>2020</strong> — Certificate of Honor for Humanitarian Impact in Africa, First African Summit, Nations unies", "<strong>2020</strong> — Certificate of Honor for Humanitarian Impact in Africa, First African Summit, United Nations", "<strong>2020</strong> — شهادة تكريم عن الأثر الإنساني في إفريقيا، القمة الإفريقية الأولى، الأمم المتحدة"),
 ('<span>Sa chaîne de transmission</span><i>→</i>', '<span>His chain of transmission</span><i>→</i>', '<span>سلسلة إسناده</span><i>←</i>'),
]

if __name__ == "__main__":
    for code in ("en", "ar"):
        traduire("le-shaykh.html", HUB, code)
        traduire("projet-merkez.html", MERKEZ, code)
        traduire("qui-est-le-shaykh.html", QUI, code)
    print("pages éditoriales : en/ + ar/")
