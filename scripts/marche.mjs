#!/usr/bin/env node
/* Génère la page « Une marche de 10 ans à travers le Maroc » (marche-de-dix-ans.html, en/, ar/).
   Pour la compléter : ajouter des sections dans SECTIONS (une entrée par intertitre), puis node scripts/marche.mjs */
import fs from "node:fs";
import { bandeVideos, esc } from "./videos-data.mjs";

const LANG = {
  fr: { dir: "", kicker: "Le Shaykh", titre: "Une marche de 10 ans à travers le Maroc",
    sous: "1994 – 2004 · du Rif au Sahara, seul, sans but ni destination",
    desc: "De 1994 à 2004, le Shaykh Mohamed Faouzi Al Karkari a parcouru le Maroc seul, en quête de son Seigneur, sans objectif ni destination.",
    intro: "En mai 1994, à dix-neuf ans, le Shaykh Mohamed Faouzi Al Karkari quitte le Rif, fuyant une vie devenue trop lourde. Pendant dix ans, il parcourt le Maroc seul et à pied, vivant de ce qu'Allah lui donne, sans aucun objectif ni destination. Cette page raconte cette marche.",
    alt: "Le désert marocain", video: "La marche comme pratique spirituelle",
    videoLede: "Le Shaykh en parle lui-même, en 2023, à l'Université de Chicago.",
    videoPlace: "Université de Chicago · États-Unis — 23 juillet 2023",
    videoDesc: "Entretien du professeur Yousef Casewit avec le Shaykh, dans le cadre d'un projet vidéo du Marty Center : la « siyaha » soufie, l'errance pieuse fondée sur l'ordre coranique de « parcourir la terre », et la dizaine d'années que le Shaykh a passées à marcher à travers le Maroc.",
    bio: "Sa biographie", chaine: "Sa chaîne de transmission", maitre: "Son maître, Mawlay al-Hassan", fleche: "→" },
  en: { dir: "en/", kicker: "The Shaykh", titre: "A 10-year walk across Morocco",
    sous: "1994 – 2004 · from the Rif to the Sahara, alone, with no goal or destination",
    desc: "From 1994 to 2004, Shaykh Mohamed Faouzi Al Karkari crossed Morocco alone, in search of his Lord, with no goal or destination.",
    intro: "In May 1994, at nineteen, Shaykh Mohamed Faouzi Al Karkari left the Rif, fleeing a life that had become too heavy. For ten years he crossed Morocco alone and on foot, living on what God gave him, with no goal or destination whatsoever. This page tells the story of that walk.",
    alt: "The Moroccan desert", video: "Walking as a Spiritual Practice",
    videoLede: "The Shaykh speaks about it himself, in 2023, at the University of Chicago.",
    videoPlace: "University of Chicago · United States — 23 July 2023",
    videoDesc: "In this video project sponsored by the Marty Center, Professor Yousef Casewit interviews the Shaykh on Sufi wandering (siyaha): a practice rooted in the Qur'anic command to “journey in the land”, and shaped by his decade of walking across Morocco.",
    bio: "His biography", chaine: "His chain of transmission", maitre: "His master, Mawlay al-Hassan", fleche: "→" },
  ar: { dir: "ar/", kicker: "الشيخ", titre: "مسيرة عشر سنوات عبر المغرب",
    sous: "1994 – 2004 · من الريف إلى الصحراء، وحيدًا، بلا هدفٍ ولا وجهة",
    desc: "من 1994 إلى 2004، قطع الشيخ محمد فوزي الكركري المغرب وحيدًا، في طلب ربّه، من غير هدفٍ ولا وجهة.",
    intro: "في ماي 1994م، وهو في التاسعة عشرة، غادر الشيخ محمد فوزي الكركري الريف هاربًا من حياةٍ ثقلت عليه. وطوال عشر سنوات قطع المغرب وحيدًا ماشيًا، يعيش مما يرزقه الله، من غير أيّ هدفٍ ولا وجهة. تروي هذه الصفحة قصة هذه المسيرة.",
    alt: "الصحراء المغربية", video: "المشي ممارسةً روحية",
    videoLede: "يتحدث الشيخ عنها بنفسه سنة 2023 في جامعة شيكاغو.",
    videoPlace: "جامعة شيكاغو · الولايات المتحدة — 23 يوليو 2023",
    videoDesc: "حوار للأستاذ يوسف كاسويت مع الشيخ ضمن مشروع مرئي لمركز مارتي: السياحة الصوفية المستندة إلى الأمر القرآني بالسير في الأرض، وعشر سنوات قضاها الشيخ في المشي عبر المغرب.",
    bio: "سيرته", chaine: "سلسلة إسناده", maitre: "شيخه مولاي الحسن", fleche: "←" },
};

// intertitre + paragraphes, par langue
const SECTIONS = [
  { fr: ["Le départ du Rif, en mai 1994", [
      "Mohamed Faouzi Al Karkari est né en juillet 1974, dans le Rif, au nord du Maroc. En mai 1994, à dix-neuf ans, il quitte sa région natale.",
      "Il ne part pas pour un projet. Il part parce qu'il n'en peut plus : les épreuves, les injustices et les grandes difficultés qui ont marqué sa jeunesse l'ont plongé dans une détresse et un désespoir profonds. Il a voulu mettre fin à ses jours, sans y parvenir. Ne pouvant plus vivre là où il était, il décide de fuir sa vie en quittant le pays qui l'a vu grandir.",
      "Il prend la direction de Fès. Il n'a rien, ni argent, ni point de chute, ni plan.",
    ]],
    en: ["Leaving the Rif, May 1994", [
      "Mohamed Faouzi Al Karkari was born in July 1974 in the Rif, in northern Morocco. In May 1994, at the age of nineteen, he left his native region.",
      "He did not leave with a plan. He left because he could bear no more: the hardships, injustices and great difficulties that had marked his youth had plunged him into deep distress and despair. He had tried to take his own life, without succeeding. Unable to go on living where he was, he decided to flee his life by leaving the place where he had grown up.",
      "He headed for Fez. He had nothing: no money, no place to go, no plan.",
    ]],
    ar: ["مغادرة الريف، ماي 1994", [
      "وُلد محمد فوزي الكركري في يوليو 1974م بالريف، شمال المغرب. وفي ماي 1994م، وهو في التاسعة عشرة، غادر منطقته الأصلية.",
      "لم يخرج لمشروعٍ ما، بل خرج لأنه لم يعد يحتمل: فالمحن والمظالم والصعوبات الكبرى التي طبعت شبابه أغرقته في ضيقٍ ويأسٍ عميقين. وقد حاول أن ينهي حياته فلم يُوفَّق. ولمّا لم يعد قادرًا على العيش حيث كان، قرّر أن يفرّ من حياته بمغادرة الأرض التي نشأ فيها.",
      "اتجه نحو فاس، وليس معه شيء: لا مال ولا مأوى ولا خطة.",
    ]] },
  { img: ["/media/marche-bab-boujloud.webp", ["Bab Boujloud, la porte bleue de Fès, au crépuscule", "Bab Boujloud, the blue gate of Fez, at dusk", "باب بوجلود، الباب الأزرق لفاس، عند الغروب"]], fr: ["Fès : une année sur des cartons", [
      "À Fès, le jeune homme est un vagabond. La nuit, il dort sur des cartons, près de Bab Boujloud. Le jour, il fréquente les quartiers de passage et les zones touristiques, où il vend des mouchoirs à la sauvette pour gagner quelques dirhams et pouvoir manger.",
      "Il reste ainsi à Fès pendant un an.",
    ]],
    en: ["Fez: a year on cardboard", [
      "In Fez, the young man was a vagrant. At night he slept on cardboard near Bab Boujloud. By day he went to the busy districts and tourist areas, selling tissues on the street to earn a few dirhams and be able to eat.",
      "He stayed in Fez like this for a year.",
    ]],
    ar: ["فاس: سنة على الكرتون", [
      "كان الفتى في فاس متشرّدًا. يبيت الليل على الكرتون قرب باب بوجلود، وينهض في النهار إلى الأحياء الكثيرة المرور والمناطق السياحية، فيبيع المناديل الورقية في الطرقات ليكسب بضعة دراهم يقتات بها.",
      "وبقي على هذه الحال في فاس سنةً كاملة.",
    ]] },
  { fr: ["Fès, Oujda, Nador : les premiers allers-retours", [
      "Après cette année, il quitte Fès à pied. Il marche jusqu'à Oujda, puis jusqu'à Nador, avant de revenir à Fès. Il y reste un temps, puis repart de nouveau vers Oujda.",
      "Ces allers-retours n'ont pas de but : il marche, il s'arrête là où il peut survivre, puis il repart.",
    ]],
    en: ["Fez, Oujda, Nador: the first journeys back and forth", [
      "After that year, he left Fez on foot. He walked to Oujda, then to Nador, before returning to Fez. He stayed there for a while, then set off again for Oujda.",
      "These journeys had no purpose: he walked, stopped wherever he could survive, then moved on again.",
    ]],
    ar: ["فاس ووجدة والناظور: أولى الرحلات ذهابًا وإيابًا", [
      "بعد تلك السنة غادر فاس ماشيًا. مشى إلى وجدة، ثم إلى الناظور، ثم عاد إلى فاس، وأقام بها مدةً ثم انطلق من جديد نحو وجدة.",
      "لم يكن لهذه الرحلات غاية: يمشي، ويقيم حيث يستطيع أن يعيش، ثم يرحل.",
    ]] },
  { fr: ["1997 : quitter Oujda, une route prise au hasard", [
      "En 1997, il a vingt-trois ans. Cela fait plusieurs mois qu'il est à Oujda, dont il a fait le tour. À nouveau, une constriction intérieure très dure l'étreint, et il décide de partir pour trouver l'apaisement ailleurs. Il quitte la ville dans un désespoir total.",
      "Il n'a aucun but, aucune destination, aucun objectif. Il prend une route au hasard, et cette route le fait traverser, l'une après l'autre, les villes et les villages du Maroc oriental puis du centre : Taourirt, Guercif, Taza, Fès, tous les villages alentour, Meknès, puis Sidi Slimane et Kénitra. De là, il longe la côte atlantique, par Mehdia, jusqu'à Salé.",
      "Ce trajet lui prend deux ans. Il entre à Salé en juillet 1999, alors que le Maroc vit les jours de deuil qui suivent la mort du roi Hassan II.",
    ]],
    en: ["1997: leaving Oujda, a road taken at random", [
      "In 1997 he was twenty-three. He had been in Oujda for several months and had walked all around it. Once again a harsh inner constriction gripped him, and he decided to leave in search of relief elsewhere. He left the city in total despair.",
      "He had no aim, no destination, no objective. He took a road at random, and that road led him through one town and village after another across eastern and central Morocco: Taourirt, Guercif, Taza, Fez, all the villages around, Meknes, then Sidi Slimane and Kenitra. From there he followed the Atlantic coast, through Mehdia, as far as Salé.",
      "The journey took him two years. He entered Salé in July 1999, while Morocco was in mourning after the death of King Hassan II.",
    ]],
    ar: ["1997: مغادرة وجدة، طريقٌ اختاره بلا قصد", [
      "في سنة 1997م كان في الثالثة والعشرين. مضت عليه في وجدة أشهر طويلة طاف خلالها بالمدينة كلها، فعاد إليه ضيقٌ باطنيٌّ شديد، فقرّر الرحيل طلبًا للسكينة في مكانٍ آخر. وخرج من المدينة في يأسٍ تامّ.",
      "لم يكن له قصدٌ ولا وجهةٌ ولا غاية. سلك طريقًا على غير هدى، فمرّ به على مدنٍ وقرى المغرب الشرقي ثم الأوسط واحدةً بعد أخرى: تاوريرت، كرسيف، تازة، فاس، وكل القرى المجاورة، مكناس، ثم سيدي سليمان والقنيطرة. ومن هناك سار محاذيًا ساحل الأطلسي، مرورًا بالمهدية، حتى سلا.",
      "استغرقت الرحلة سنتين. ودخل سلا في يوليو 1999م، والمغرب في أيام الحداد على وفاة الملك الحسن الثاني.",
    ]] },
  { img: ["/media/marche-grotte-rabat.webp", ["La plage de Rabat-Salé, où se trouvait la petite grotte", "The beach at Rabat-Salé, where the small cave was", "شاطئ الرباط وسلا حيث كانت المغارة الصغيرة"]], fr: ["Rabat-Salé : la grotte au bord de la mer", [
      "Il reste quelques mois à Rabat et Salé. Sur la plage, il trouve une petite grotte, où il élit domicile. Face à elle se dresse un rocher que la mer recouvre à marée haute : il y laisse ses affaires pendant la journée.",
      "Le jour, il part travailler, dans les sources et là où il trouve de quoi gagner sa vie. Le soir, il s'efforce de rentrer avant que la marée ne monte, pour dormir en paix sur cet îlot que l'eau entoure complètement.",
    ]],
    en: ["Rabat-Salé: the cave by the sea", [
      "He stayed a few months in Rabat and Salé. On the beach he found a small cave and made it his home. Facing it stood a rock that the sea covered at high tide: he left his belongings there during the day.",
      "By day he went off to work wherever he could earn a living. In the evening he tried to be back before the tide rose, so as to sleep in peace on this islet, completely surrounded by water.",
    ]],
    ar: ["الرباط وسلا: المغارة على شاطئ البحر", [
      "أقام بضعة أشهر بين الرباط وسلا. وجد على الشاطئ مغارةً صغيرة اتخذها مسكنًا. وكانت قبالتها صخرةٌ يغمرها البحر عند المدّ، فكان يترك أغراضه عليها في النهار.",
      "وفي النهار يذهب إلى العمل حيث يجد ما يكسب به عيشه، وفي المساء يحرص على العودة قبل ارتفاع المدّ لينام آمنًا مطمئنًّا على تلك الجزيرة الصغيرة التي يحيط بها الماء من كل جانب.",
    ]] },
  { img: ["/media/marche-jemaa-el-fna.webp", ["La place Jemaa el-Fna, à Marrakech, au coucher du soleil", "Jemaa el-Fna square in Marrakech at sunset", "ساحة جامع الفنا في مراكش عند الغروب"]], fr: ["Marrakech : la place Jemaa el-Fna (début 2000)", [
      "Il retourne à Fès, puis repart à pied vers Marrakech en traversant le Moyen Atlas : Moulay Bouazza, El Hajeb, Béni Mellal, Fquih Ben Salah, Khénifra, Bouya Omar, jusqu'à Marrakech, où il arrive vers janvier 2000.",
      "Il y reste environ quatre mois, sur la place Jemaa el-Fna. La nuit, il dort sur des cartons. Le jour, il porte une boîte remplie de petites choses, des sucettes notamment, qu'il essaie de vendre aux touristes pour gagner un peu d'argent.",
      "Certains jours, il ne vend rien et n'a pas un dirham. Il lui faut alors frapper à la porte des gens, fouiller les poubelles. Il lui arrive de rester trois jours sans manger, et la faim le pousse parfois à manger des feuilles d'arbres.",
    ]],
    en: ["Marrakech: Jemaa el-Fna square (early 2000)", [
      "He returned to Fez, then set off on foot for Marrakech across the Middle Atlas: Moulay Bouazza, El Hajeb, Beni Mellal, Fquih Ben Salah, Khenifra, Bouya Omar, until he reached Marrakech around January 2000.",
      "He stayed there about four months, on Jemaa el-Fna square. At night he slept on cardboard. By day he carried a box of small items, lollipops among them, which he tried to sell to tourists to earn a little money.",
      "Some days he sold nothing and had not a single dirham. Then he had to knock on people's doors and search through bins. Sometimes he went three days without eating, and hunger drove him at times to eat tree leaves.",
    ]],
    ar: ["مراكش: ساحة جامع الفنا (مطلع 2000)", [
      "عاد إلى فاس، ثم انطلق ماشيًا نحو مراكش عبر الأطلس المتوسط: مولاي بوعزة، الحاجب، بني ملال، الفقيه بن صالح، خنيفرة، بويا عمر، حتى بلغ مراكش نحو يناير 2000م.",
      "أقام بها قرابة أربعة أشهر في ساحة جامع الفنا. ينام الليل على الكرتون، ويحمل في النهار صندوقًا فيه أشياء صغيرة، منها المصّاصات، يحاول بيعها للسيّاح ليجمع قليلًا من المال.",
      "وفي بعض الأيام لا يبيع شيئًا ولا يملك درهمًا واحدًا، فيطرق أبواب الناس ويفتّش في القمامة. وربما مرّت عليه ثلاثة أيام بلا طعام، فيلجئه الجوع أحيانًا إلى أكل أوراق الشجر.",
    ]] },
  { img: ["/media/marche-agadir.webp", ["La plage d'Agadir et la colline de la Kasbah", "The beach at Agadir and the Kasbah hill", "شاطئ أكادير وتلّة القصبة"]], fr: ["Agadir, en traversant l'Atlas (été 2000)", [
      "Vers mai 2000, il quitte Marrakech pour Agadir. Il traverse le Haut Atlas par Chichaoua et Imintanout, un passage très difficile à pied. Il arrive à Agadir pour l'été 2000 et y passe la saison.",
    ]],
    en: ["Agadir, across the Atlas (summer 2000)", [
      "Around May 2000 he left Marrakech for Agadir. He crossed the High Atlas through Chichaoua and Imintanout, a very difficult passage on foot. He reached Agadir for the summer of 2000 and spent the season there.",
    ]],
    ar: ["أكادير، عبر الأطلس (صيف 2000)", [
      "نحو ماي 2000م غادر مراكش إلى أكادير. عبر الأطلس الكبير عن طريق شيشاوة وإمنتانوت، وهو ممرٌّ شديد الصعوبة لمن يقطعه ماشيًا. وبلغ أكادير مع صيف 2000م وقضى فيها الموسم.",
    ]] },
  { img: ["/media/marche-assa-zag.webp", ["Une ville du Sud marocain, au pied des montagnes et de la palmeraie", "A town in southern Morocco, at the foot of the mountains and the palm grove", "مدينة في الجنوب المغربي عند سفح الجبال وواحة النخيل"]], fr: ["Vers le sud : Guelmim, Assa-Zag et Al Mahbes", [
      "Puis la fatigue et le désespoir reviennent, et la vie lui est de nouveau intenable. Il a besoin de changer d'air, et il repart vers le sud. Là encore, il ne sait pas où il va. Il prend une route au hasard et la suit.",
      "Cette route est celle qui mène vers le Sahara. Il ne le sait pas. Il marche jusqu'à Guelmim, puis jusqu'à la ville saharienne d'Assa-Zag, et jusqu'au poste frontière d'Al Mahbes.",
      "Il y rencontre des militaires originaires de sa région d'origine, celle de Taza. Pendant quelques mois, il vit avec eux, à la caserne.",
    ]],
    en: ["South: Guelmim, Assa-Zag and Al Mahbes", [
      "Then exhaustion and despair returned, and life became unbearable once more. He needed a change of air, and he set off to the south. Again he did not know where he was going. He took a road at random and followed it.",
      "It was the road leading to the Sahara. He did not know. He walked to Guelmim, then to the Saharan town of Assa-Zag, and on to the border post of Al Mahbes.",
      "There he met soldiers from his own home region, that of Taza. For a few months he lived with them, in their barracks.",
    ]],
    ar: ["نحو الجنوب: كلميم وآسا الزاك والمحبس", [
      "ثم عاد إليه التعب واليأس، وصارت الحياة لا تُحتمل من جديد، فاحتاج إلى تغيير الأجواء وانطلق نحو الجنوب. ومرة أخرى لا يدري أين يتجه. سلك طريقًا على غير هدى ومضى فيه.",
      "كان ذلك الطريق هو المؤدّي إلى الصحراء، ولم يكن يعلم. مشى حتى كلميم، ثم إلى مدينة آسا الزاك الصحراوية، ثم إلى مركز المحبس الحدودي.",
      "هناك التقى جنودًا من منطقته الأصلية، منطقة تازة، فعاش معهم بضعة أشهر في الثكنة.",
    ]] },
  { fr: ["2001 : le tour des 44 saints", [
      "Il repart ensuite, retourne à Marrakech, plus précisément à Imintanout, et, de début 2001 à la fin de l'année, il accomplit ce que l'on appelle le daour (« le tour ») des 44 saints.",
      "Au Maroc, le moussem est la grande rencontre annuelle qui se tient autour du tombeau d'un saint : pendant quelques jours, des foules viennent de toute la région, avec marchés, repas partagés, rassemblements et invocations. Chaque saint a son moussem, à sa date. Le daour consiste à suivre ces rendez-vous les uns après les autres, de ville en ville : Marrakech, Fès, Rabat, El Jadida et bien d'autres.",
      "Il demeure ainsi quelques jours à chaque moussem. Il travaille un peu, parfois dans des cafés, et quand il ne trouve rien, il vend à la sauvette pour s'en sortir. Il poursuit ce tour pendant un an, jusqu'à la fin de 2001.",
    ]],
    en: ["2001: the tour of the 44 saints", [
      "He then set off again, went back to Marrakech, more precisely to Imintanout, and from early 2001 until the end of the year he made what is known as the daour (“the tour”) of the 44 saints.",
      "In Morocco, a moussem is the great annual gathering held around the tomb of a saint: for a few days, crowds come from the whole region, with markets, shared meals, gatherings and invocations. Each saint has his own moussem, on his own date. The daour consists of following these gatherings one after another, from town to town: Marrakech, Fez, Rabat, El Jadida and many others.",
      "He stayed a few days at each moussem. He worked a little, sometimes in cafés, and when he found nothing he sold goods on the street to get by. He kept up this tour for a year, until the end of 2001.",
    ]],
    ar: ["2001: دورة الأولياء الأربعة والأربعين", [
      "ثم انطلق من جديد وعاد إلى مراكش، وتحديدًا إلى إمنتانوت، وفي سنة 2001م كلها، من أولها إلى آخرها، قام بما يُعرف بـ«الدَّوْر»، أي الطواف على الأولياء الأربعة والأربعين.",
      "الموسم في المغرب هو اللقاء السنوي الكبير الذي يقام حول ضريح وليّ: تفد الجموع من الجهة كلها لبضعة أيام، وتقوم الأسواق والولائم والاجتماعات والأذكار. ولكل وليٍّ موسمه في موعده. والدّور أن يتتبّع المرء هذه المواسم واحدًا بعد آخر، من مدينة إلى مدينة: مراكش، فاس، الرباط، الجديدة وغيرها.",
      "كان يقيم أيامًا في كل موسم، ويعمل قليلًا، أحيانًا في المقاهي، وإذا لم يجد عملًا باع في الطرقات ليتدبّر أمره. وواصل هذه الدورة سنةً كاملة حتى نهاية 2001م.",
    ]] },
  { fr: ["Retour à Rabat (2001-2004)", [
      "À la fin de 2001, il retourne à Rabat. Il y travaille : gardien de sécurité dans des entrepôts, employé dans des cafés et des restaurants.",
    ]],
    en: ["Back in Rabat (2001-2004)", [
      "At the end of 2001 he returned to Rabat. He worked there: as a security guard in warehouses, and in cafés and restaurants.",
    ]],
    ar: ["العودة إلى الرباط (2001-2004)", [
      "في نهاية 2001م عاد إلى الرباط، وعمل هناك حارس أمنٍ في المخازن، وعاملًا في المقاهي والمطاعم.",
    ]] },
  { fr: ["2004 : le retour auprès des siens", [
      "En 2004, la nostalgie le prend. Depuis dix ans, il n'a aucune nouvelle de sa famille et ne sait même pas si ses parents sont encore en vie : à l'époque, il n'y a pas de téléphone, et aucun moyen simple d'avoir des nouvelles.",
      "Il veut enfin savoir comment ils vont, et il appelle sa mère. Elle lui demande de revenir. Il rentre auprès des siens, dix ans après son départ du Rif.",
    ]],
    en: ["2004: coming home", [
      "In 2004, homesickness took hold of him. For ten years he had had no news of his family and did not even know whether his parents were still alive: at the time there were no telephones, and no easy way of getting news.",
      "He finally wanted to know how they were, and he called his mother. She asked him to come back. He returned to his family, ten years after leaving the Rif.",
    ]],
    ar: ["2004: العودة إلى الأهل", [
      "في سنة 2004م غلبه الحنين. فقد مضت عشر سنوات لا يعرف شيئًا عن أهله، حتى إنه لا يدري أهل والداه على قيد الحياة؛ إذ لم يكن الهاتف متاحًا حينها ولا وسيلة يسيرة لمعرفة الأخبار.",
      "أراد أخيرًا أن يطمئنّ عليهم، فاتصل بأمه، فطلبت منه أن يعود. فرجع إلى أهله بعد عشر سنوات من مغادرته الريف.",
    ]] },
  { fr: ["Sans objectif ni destination", [
      "Pendant dix ans, cette marche n'a eu aucun but fixé : ni voyage d'étude, ni pèlerinage vers un lieu précis. Chaque jour, il avançait là où le chemin le conduisait, vivant de ce qu'Allah lui donnait.",
    ]],
    en: ["No goal, no destination", [
      "For ten years, this walk had no fixed purpose: neither a study trip nor a pilgrimage to a particular place. Each day he went where the road led him, living on what God gave him.",
    ]],
    ar: ["بلا هدفٍ ولا وجهة", [
      "طوال عشر سنوات لم تكن لهذه المسيرة غايةٌ محدَّدة: لا رحلة دراسة، ولا حجٌّ إلى مكانٍ بعينه. كان يمضي كل يوم حيث يقوده الطريق، يعيش مما يرزقه الله.",
    ]] },
  { fr: ["La siyaha, une tradition soufie", [
      "Cette forme d'errance pieuse porte, dans la tradition soufie, le nom de siyaha. Elle s'appuie sur plusieurs versets du Coran qui invitent à « parcourir la terre » (par exemple la sourate 29, verset 20) et a été pratiquée par de nombreux maîtres au cours des siècles.",
      { lien: "Lire l'article : la siyaha chez les maîtres soufis" },
    ]],
    en: ["Siyaha, a Sufi tradition", [
      "In the Sufi tradition, this form of pious wandering is called siyaha. It rests on several verses of the Qur'an that invite believers to “journey in the land” (for example surah 29, verse 20) and has been practised by many masters over the centuries.",
      { lien: "Read the article: siyaha among the Sufi masters (in French)" },
    ]],
    ar: ["السياحة، تقليدٌ صوفي", [
      "تُعرف هذه الصورة من الارتحال التعبّدي في التقليد الصوفي باسم «السياحة». وهي تستند إلى آيات عدّة من القرآن تدعو إلى «السير في الأرض» (مثل سورة العنكبوت، الآية 20)، وقد مارسها كثير من المشايخ عبر القرون.",
      { lien: "اقرأ المقال: السياحة عند المشايخ الصوفية (بالفرنسية)" },
    ]] },
  { fr: ["La suite : un livre à paraître", [
      "La suite de ce parcours est racontée en détail dans un livre qui sera bientôt publié aux éditions Les 7 Lectures.",
    ]],
    en: ["What came next: a forthcoming book", [
      "What followed is told in detail in a book to be published soon by Les 7 Lectures.",
    ]],
    ar: ["ما بعد ذلك: كتابٌ قيد الصدور", [
      "تُروى بقية هذه المسيرة بالتفصيل في كتابٍ سيصدر قريبًا عن دار «Les 7 Lectures».",
    ]] },
];

const k0 = (c) => ({ fr: 0, en: 1, ar: 2 })[c];

const GABARIT = (L, code, corps, video, lien) => `<!doctype html>
<html lang="${code}"${code === "ar" ? ' dir="rtl"' : ""}>
<head>
  <!--@include head-->
  <title>${esc(L.titre)} — ${code === "ar" ? "الشيخ محمد فوزي الكركري" : "Shaykh Mohamed Faouzi Al Karkari"}</title>
  <meta name="description" content="${esc(L.desc)}" />
  <meta property="og:title" content="${esc(L.titre)}" />
  <meta property="og:description" content="${esc(L.desc)}" />
  <meta property="og:image" content="/media/peregrination-desert.webp" />
</head>
<body data-page="shaykh">
  <!--@include ui-->
  <!--@include header-->
  <!--@include menu-->
  <div class="smooth" id="top">
  <main>
    <section class="shaykh-texte maitre marche">
      <div class="section-head">
        <p class="kicker">${L.kicker}</p>
        <h1 class="h2" data-split>${esc(L.titre)}</h1>
        <p class="maitre-sous" data-reveal>${esc(L.sous)}</p>
      </div>
      <figure class="marche-photo" data-reveal><img src="/media/peregrination-desert.webp" alt="${esc(L.alt)}" loading="eager" /></figure>
      <div class="actu-corps">
        <p class="maitre-intro">${esc(L.intro)}</p>
${corps}
      </div>
    </section>
${video}    <section class="shaykh-texte maitre">
      <div class="center shaykh-suite">${lien}</div>
    </section>
  </main>
  <!--@include footer-->
  </div>
</body>
</html>
`;

for (const [code, L] of Object.entries(LANG)) {
  const corps = SECTIONS.map((s, k) => `        <h3>${esc(s[code][0])}</h3>\n${s.img ? `        <figure class="marche-fig" data-reveal><img src="${s.img[0]}" alt="${esc(s.img[1][k0(code)])}" loading="lazy" decoding="async" /></figure>\n` : ""}${s[code][1].map((p) => (typeof p === "string" ? `        <p>${esc(p)}</p>` : `        <p><a class="btn-glass btn-glass--dark" href="${L.dir ? "../" : ""}enseignement-siyaha-maitres-soufis.html"><span>${esc(p.lien)}</span><i>${L.fleche}</i></a></p>`)).join("\n")}`).join("\n");
  const video = bandeVideos(
    [{ id: "marche-video", yt: "https://www.youtube.com/watch?v=J4I9HiyCC1I",
      place: { [code]: L.videoPlace }, t: { [code]: L.video }, d: { [code]: L.videoDesc } }],
    code, L.video, L.videoLede,
  );
  const prefixe = L.dir ? "../" : "";
  const lien = `<a class="btn-glass btn-glass--dark" href="qui-est-le-shaykh.html#biographie"><span>${esc(L.bio)}</span><i>${L.fleche}</i></a> <a class="btn-glass btn-glass--dark" href="maitre-mawlay-al-hassan.html"><span>${esc(L.maitre)}</span><i>${L.fleche}</i></a> <a class="btn-glass btn-glass--dark" href="${L.dir ? "" : ""}chaine-de-transmission.html"><span>${esc(L.chaine)}</span><i>${L.fleche}</i></a>`;
  fs.mkdirSync(L.dir || ".", { recursive: true });
  fs.writeFileSync(`${L.dir}marche-de-dix-ans.html`, GABARIT(L, code, corps, video, lien));
}
console.log("marche-de-dix-ans.html ×3");
