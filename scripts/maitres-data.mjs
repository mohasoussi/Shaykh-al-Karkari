/* Biographies des maîtres de la chaîne de transmission (une page par maître).
   - « karkariya » : texte repris de karkariya.fr (copie dans scripts/maitres-sources/)
   - sinon : notice rédigée à partir des sources listées en bas de chaque page.
   « cle » = nom tel qu'il apparaît dans la chaîne (accents et ponctuation ignorés).
   Pour ajouter un maître : ajouter une entrée ici, puis node scripts/maitres.mjs (ou npm run importer). */
const W = (t) => `https://en.wikipedia.org/wiki/${t}`;

export const MAITRES = [
  {
    cle: "Sidi Mawlay al-Hassan", slug: "mawlay-al-hassan", nom: "Sidi Mawlay al-Hassan al-Karkari", sous: "Né en 1936 · Shaykh de la Tariqa Karkariya · maître du Shaykh Mohamed Faouzi",
    karkariya: "le-sheykh-sidi-mawlay-al-hassan-radiallahu-anhu", sources: [["Karkariya.fr — Le Shaykh Sidi Mawlay al-Hassan", "https://karkariya.fr/le-sheykh-sidi-mawlay-al-hassan-radiallahu-anhu/"]],
  },
  {
    cle: "Sidi Mawlay at-Tahir", slug: "mawlay-at-tahir", nom: "Sidi Mawlay at-Tahir al-Karkari", sous: "Mort en 1976 · Tamsaman (Rif) · disciple de Sidi Ahmad al-ʿAlawi",
    karkariya: "le-sheykh-sidi-mawlay-at-tahir-radiallahu-anhu", sources: [["Karkariya.fr — Le Shaykh Sidi Mawlay at-Tahir", "https://karkariya.fr/le-sheykh-sidi-mawlay-at-tahir-radiallahu-anhu/"]],
  },
  {
    cle: "Sidi Muhammad ibn Qaddour al-Wakiliy", slug: "ibn-qaddour", nom: "Sidi Muhammad ibn Qaddour al-Wakili", sous: "Mort en 1884 · Montagne de Karkar (Rif) · « Abu l-Mawahib »",
    intro: "Cinquième ascendant du Shaykh Mohamed Faouzi Al Karkari, Sidi Muhammad ibn Qaddour al-Wakili est le grand maître dont est issue la famille spirituelle karkarienne. Surnommé « Abu l-Mawahib », l'homme aux dons et aux prodiges (karamat) extraordinaires, il vécut quarante ans dans la montagne de Karkar, dans le Rif.",
    sections: [
      ["Origines et nom", [
        "Idrisside, il appartient à la tribu des Bani Wakil, dont le fondateur est Moulay Mimoun Abu Wakil (dit Boukil), et descend du Prophète ﷺ par la lignée d'al-Hassan. Il porte le nom d'« Ibn Qaddour » en référence à son oncle Qaddour, qui l'éleva à la mort de ses parents.",
      ]],
      ["Formation et accès à la connaissance", [
        "Il apprit les sciences islamiques auprès du maître de son village. Un jour, il voulut aussi recevoir de lui la science de l'astronomie, mais son maître sur la Voie (probablement Sidi al-Mahaji) refusa, au profit d'une science plus conforme à son rang de chérif. Par la voie du Nom suprême (al-Ism al-Aʿzam), il devint un connaissant par Allah (ʿarif bi-Llah) et un maître éducateur.",
      ]],
      ["La zawiya de Karkar", [
        "Il vécut près de quarante ans sur la montagne de Karkar, dans une demeure d'une grande simplicité : une petite pièce pour les ablutions, le repos et la vie quotidienne, et une petite cuisine. La demeure et la zawiya furent construites en 1844. Il avait coutume d'y faire son dhikr toute l'année en trois lieux précis de la montagne, tandis que les fuqara' de l'époque vivaient sous les arbres ou dans de petits abris autour de sa maison.",
      ]],
      ["Ses disciples", [
        "Parmi ses disciples figure Sidi Muhammad al-Bouzidi, qui le servit pendant quarante ans — notamment en lui apportant l'eau des ablutions — avant de transmettre la Voie à Sidi Ahmad al-ʿAlawi. Un autre de ses disciples, Sidi al-Hibri, fonda sa propre voie, la Hibriyya.",
      ]],
      ["Sa descendance", [
        "Son fils aîné Mawlay at-Tayyib fut le père de Sidi Muhammad al-Fardi, lui-même père de Mawlay at-Tahir, qui fut le père de Mawlay al-Hassan : tous furent des maîtres de la famille karkarienne. Sidi Ahmad al-ʿAlawi dit un jour à Mawlay at-Tahir, petit-fils de Sidi ibn Qaddour : « Votre bien vous a été rendu », voulant dire que la wilaya, sortie de chez son grand-père, revenait à lui.",
      ]],
      ["Son décès", [
        "Il mourut en 1884. Son tombeau et sa zawiya se trouvent sur la montagne de Karkar, non loin de Tamsaman, dans le Rif oriental.",
      ]],
    ],
    sources: [["Karkariya.fr — La Zawiya de Moulay Mohamed Ibn Kaddour al-Wakili al-Karkari", "https://karkariya.fr/zawiya-de-moulay-mohamed-ibn-kaddour-al-wakiliy-al-karkariy/"], ["Karkariya.fr — Le Shaykh Sidi Mawlay at-Tahir", "https://karkariya.fr/le-sheykh-sidi-mawlay-at-tahir-radiallahu-anhu/"], ["Karkariya.fr — Le Shaykh Sidi Mawlay al-Hassan", "https://karkariya.fr/le-sheykh-sidi-mawlay-al-hassan-radiallahu-anhu/"]],
  },
  {
    cle: "Sidi Ahmad al-‘Alawiy al-Mustaghanemiy", slug: "ahmad-al-alawi", nom: "Sidi Ahmad al-ʿAlawi", sous: "1869 – 1934 · Mostaganem (Algérie) · fondateur de la Alawiyya",
    intro: "Maître shadhili de Mostaganem, Sidi Ahmad al-ʿAlawi compte parmi les cheikhs les plus célèbres du XXe siècle. Il est le maître de Mawlay at-Tahir al-Karkari, dont la famille spirituelle donnera la Tariqa Karkariya.",
    sections: [
      ["Enfance et jeunesse", ["Il naquit à Mostaganem, en Algérie, en 1869. Il n'alla jamais à l'école, mais apprit le Coran à la maison auprès de son père, au point d'en connaître presque les neuf dixièmes par cœur. Pour gagner sa vie, il fut cordonnier, puis tint une boutique. Profondément religieux, il avait une soif de connaissance."]],
      ["La rencontre avec Sidi Muhammad al-Bouzidi", ["En 1894, il fit la rencontre décisive de Sidi Muhammad al-Bouzidi, cheikh de la voie Darqawiyya. Voyant son aptitude, celui-ci l'initia à sa voie, lui donna le wird de la confrérie et lui enseigna la pratique du dhikr. Al-ʿAlawi resta quinze ans à son service. Encouragé par son maître à enseigner, il vit sa boutique ressembler plus souvent à une zawiya qu'à un commerce."]],
      ["La succession et les voyages", ["À la mort d'al-Bouzidi, en 1909, al-ʿAlawi fut désigné pour lui succéder comme cheikh. Il résista d'abord et partit plusieurs mois, cette même année, voyager avec un disciple, là où l'esprit le conduisait : Tunis, Tripoli, Istanbul. De retour à Mostaganem, il y propagea la voie shadhilie."]],
      ["La Alawiyya", ["En 1914, sa branche se détacha de la Darqawiyya et prit le nom de Alawiyya, en l'honneur de ʿAli, gendre du Prophète ﷺ, qui lui serait apparu en vision pour lui donner ce nom. Dès 1923, on lui prêtait au moins 100 000 disciples ; à sa mort, environ 200 000, dont quelque 200 Européens convertis. Son ordre fut l'une des premières voies soufies à s'implanter en Europe, notamment auprès des Algériens de France et des Yéménites du pays de Galles."]],
      ["Le voyage en France et l'œuvre", ["En 1926, il se rendit en France et dirigea la première prière communautaire à l'inauguration de la Grande Mosquée de Paris. Il laissa notamment un Diwan, ainsi que des écrits spirituels réunis dans ses œuvres complètes (parmi lesquels Mabadi' at-Ta'yid et Dawhat al-Asrar), et des Munajat."]],
      ["Son décès", ["Il mourut le 14 juillet 1934, à Mostaganem."]],
    ],
    sources: [["Wikipédia — Ahmad al-Alawi", W("Ahmad_al-Alawi")], ["Shaykh Ahmad al-ʿAlawi (1869-1934) — Headless.org", "https://www.headless.org/Biographies/al-alawi.htm"], ["World Wisdom — Shaykh Ahmad al-ʿAlawi", "https://worldwisdom.com/author/shaykh-ahmad-al-alawi/"], ["Karkariya.fr — Le Shaykh Sidi Mawlay at-Tahir", "https://karkariya.fr/le-sheykh-sidi-mawlay-at-tahir-radiallahu-anhu/"]],
  },
  {
    cle: "Sidi Muhammad ibn al-Habib al-Bouzidiy", slug: "muhammad-al-bouzidi", nom: "Sidi Muhammad ibn al-Habib al-Bouzidi", sous: "Mort en 1909 · maître de Sidi Ahmad al-ʿAlawi",
    intro: "Cheikh de la voie shadhilie-darqawie, Sidi Muhammad al-Bouzidi est surtout connu pour avoir été le maître de Sidi Ahmad al-ʿAlawi de Mostaganem.",
    sections: [
      ["Un maître shadhili-darqawi", ["Sidi Muhammad al-Bouzidi était un cheikh de la Darqawiyya, la branche shadhilie fondée sur l'enseignement de Mawlay al-ʿArbi ad-Darqawi. Il rencontra le jeune Ahmad al-ʿAlawi, alors artisan à Mostaganem. Reconnaissant son aptitude à la Voie, il l'initia, lui transmit le wird de la confrérie et lui enseigna la pratique du dhikr à la manière darqawie."]],
      ["Auprès de Sidi ibn Qaddour", ["Selon la tradition karkarienne, Sidi al-Bouzidi fut le disciple de Sidi Muhammad ibn Qaddour al-Wakili, qu'il servit pendant quarante ans dans la montagne de Karkar, attentif à ses moindres besoins et lui apportant notamment l'eau de ses ablutions. C'est par lui que cette transmission passa à Sidi Ahmad al-ʿAlawi."]],
      ["Son décès", ["Il mourut en 1909. Ahmad al-ʿAlawi, qui était resté quinze ans à son service, lui succéda ensuite comme cheikh."]],
    ],
    sources: [["Wikipédia — Ahmad al-Alawi", W("Ahmad_al-Alawi")], ["Wikipédia — Al-Buzidi al-Bujrafi", W("Al-Buzidi_al-Bujrafi")], ["Karkariya.fr — La Zawiya de Moulay Mohamed Ibn Kaddour al-Wakili", "https://karkariya.fr/zawiya-de-moulay-mohamed-ibn-kaddour-al-wakiliy-al-karkariy/"]],
  },
  {
    cle: "Sidi Mawlay al-‘Arbiy ad-Darqawiy", slug: "mawlay-al-arbi-ad-darqawi", nom: "Mawlay al-ʿArbi ad-Darqawi", sous: "1760 – 1823 · Bani Zarwal, près de Fès · fondateur de la Darqawiyya",
    intro: "Rénovateur de la voie shadhilie au Maghreb, Mawlay al-ʿArbi ad-Darqawi a donné son nom à la Darqawiyya, la plus importante confrérie du Maroc de son époque.",
    sections: [
      ["Origines", ["Muhammad al-ʿArbi ad-Darqawi naquit en 1760 dans les montagnes situées au nord de Fès, chez la tribu des Bani Zarwal. Il descendait d'une famille chérifienne hassanide-idrisside installée parmi ces Berbères, sur les collines du nord-est de Fès."]],
      ["Son maître, Sidi ʿAli al-Jamal", ["Sa rencontre avec Sidi ʿAli al-Jamal, grand maître shadhili de Fès, fut décisive. Sous sa direction, il reçut un entraînement spirituel intensif selon la méthode shadhilie, et devint son successeur dans la chaîne."]],
      ["L'enseignement", ["Il insistait sur le détachement du monde (dunya) et mit en garde contre les voies qui exploitaient la notion de baraka. Presque toutes ses lettres portent sur la méthode fondée sur l'invocation (dhikr), que les maîtres évoquent rarement ouvertement. Ces lettres, compilées par lui-même, furent copiées par ses disciples et imprimées de nombreuses fois à Fès en écriture lithographiée ; elles sont connues en traduction anglaise sous le titre Letters of a Sufi Master."]],
      ["Prison et disciples", ["Le sultan Mawlay Sulayman (r. 1792-1822) l'emprisonna pour avoir soutenu des révoltes contre le trône ; il fut libéré sous le règne de Mawlay ʿAbd ar-Rahman (r. 1822-1859). Son enseignement suscita un mouvement qui attira des dizaines de milliers de disciples au Maroc, en Algérie, en Tunisie et au-delà. Parmi les grands noms rattachés à cette tradition figure le savant Ahmad ibn ʿAjiba (1747-1809). Son disciple Muhammad Buziyan al-Gharisi rédigea le Kanz al-Asrar (« Le trésor des mystères »), principale source sur sa vie."]],
      ["Son décès", ["Il mourut en 1823. Son tombeau se trouve à la zawiya de Bou Brih, dans le Rif. Après sa mort, la Darqawiyya s'organisa autour de son enseignement, avec des membres venant de milieux très divers."]],
    ],
    sources: [["Wikipédia — Muhammad al-Arabi al-Darqawi", W("Muhammad_al-Arabi_al-Darqawi")], ["Ghayb.com — Muhammad al-Arabi al-Darqawi", "https://ghayb.com/muhammad-al-arabi-al-darqawi-the-shadhilli-darqawi-order/"], ["Wardah Books — Kanz al-Asrar", "https://wardahbooks.com/products/kanz-al-asrar-a-treasure-of-mysteries"], ["Wikipédia — Darqawiyya", W("Darqawiyya")]],
  },
  {
    cle: "Sidi ‘Aliy al-Jamal", slug: "ali-al-jamal", nom: "Sidi ʿAli al-Jamal", sous: "Mort en 1194 de l'hégire (1779-1780) · Fès · maître de Mawlay al-ʿArbi ad-Darqawi",
    intro: "Grand maître shadhili de Fès, Sidi ʿAli al-Jamal fut le maître spirituel de Mawlay al-ʿArbi ad-Darqawi.",
    sections: [
      ["Un parcours hors du commun", ["Sidi ʿAli al-Jamal avait servi dans l'administration marocaine avant de se rendre en Tunisie pour y étudier auprès de maîtres soufis. À son retour, il établit sa zawiya à Fès. Il était connu pour ses états spirituels extraordinaires, notamment la faculté, rapportée par ses disciples, de voir le Prophète ﷺ en songe comme à l'état de veille."]],
      ["Son enseignement écrit", ["Il rédigeait quelques pages à la fois et les laissait tomber de sa fenêtre dans la cour de sa maison. Son successeur Mawlay al-ʿArbi ad-Darqawi les ramassa et les réunit en un livre : le recueil de ses enseignements, publié en anglais sous le titre Teachings from a Classical Sufi Master."]],
      ["Sa succession", ["Il forma Mawlay al-ʿArbi ad-Darqawi, qui devint son successeur et donna naissance à la Darqawiyya. Il mourut en 1194 de l'hégire (1779-1780)."]],
    ],
    sources: [["Mecca Books — The Darqawi Way", "https://www.meccabooks.com/products/the-darqawi-way"], ["Ghayb.com — Muhammad al-Arabi al-Darqawi", "https://ghayb.com/muhammad-al-arabi-al-darqawi-the-shadhilli-darqawi-order/"], ["Salawat.com — Ali al-Jamal", "https://salawat.com/ali-al-jamal/"]],
  },
  {
    cle: "Sidi Abu al-Mahassin Youssouf al-Fassiy", slug: "abu-al-mahasin-al-fasi", nom: "Sidi Abu al-Mahasin Yusuf al-Fasi", sous: "1530/1531 – 1604 · Ksar el-Kébir et Fès · fondateur de la Zawiya Fassiya",
    intro: "Figure majeure du soufisme marocain, Abu al-Mahasin Yusuf al-Fasi est le fondateur de la Zawiya Fassiya de Fès et le père d'une famille de savants qui a marqué l'histoire intellectuelle du Maroc.",
    sections: [
      ["Naissance et rôle historique", ["Abu al-Mahasin Yusuf ibn Muhammad al-Fasi naquit en 1530 ou 1531 à Ksar el-Kébir. En 1578, il participa — par les guerriers qu'il y envoya — à la célèbre bataille de Ksar el-Kébir, dite « bataille des trois rois », contre les Portugais ; cet engagement lui valut la faveur du sultan saadien Ahmad al-Mansur."]],
      ["Maître et fondateur", ["Installé à Fès, il y fonda la Zawiya Fassiya, dont l'influence s'étendit à tout le nord-ouest de l'Afrique. Sa vie a été racontée par son fils Muhammad al-ʿArbi al-Fasi dans la Mir'at al-Mahasin (« Le miroir des qualités », 1636), qui rapporte aussi les débuts de sa famille. Un autre descendant, ʿAbd ar-Rahman al-Fasi, a écrit un récit sur le cheikh Abu al-Mahasin et son maître al-Majdhub (Ibtihaj al-qulub). Il est aussi connu pour son commentaire des Dala'il al-Khayrat."]],
      ["Son décès", ["Il mourut à Fès le 14 août 1604. Son tombeau se trouve à la Zawiya Fassiya, à Fès."]],
    ],
    sources: [["Wikipédia — Abu al-Mahasin Yusuf al-Fasi", W("Abu_al-Mahasin_Yusuf_al-Fasi")], ["Wikipédia — Mohammed al-Arbi al-Fasi", W("Mohammed_al-Arbi_al-Fasi")], ["Wikipédia — Abd al-Rahman al-Fasi", W("Abd_al-Rahman_al-Fasi")], ["Encyclopædia Britannica — al-Fasi", "https://www.britannica.com/biography/al-Fasi"]],
  },
  {
    cle: "Sidi AbdarRahman al-Majdhoub", slug: "abd-ar-rahman-al-majdhub", nom: "Sidi ʿAbd ar-Rahman al-Majdhub", sous: "1506 – 1568 · Meknès · poète et maître soufi",
    intro: "Poète, mystique et maître soufi, Sidi ʿAbd ar-Rahman al-Majdhub est l'un des saints les plus aimés du Maroc. Ses quatrains, répétés dans tout le Maghreb, sont devenus une source de proverbes.",
    sections: [
      ["Naissance et formation", ["Il naquit en mars 1506 au village de Tit, près d'Azemmour. En 1508, il suivit son père à Irgan, près de Meknès. Élevé dans un milieu soufi, son père avait été l'élève d'Ibrahim Afham al-Zarhuni, lui-même disciple d'Ahmad Zarruq. Il étudia d'abord à Meknès, puis à Fès."]],
      ["Ses maîtres", ["À Meknès, il eut pour professeurs notamment Abu Ruwayin, Ahmad al-Shabih, Saʿid ibn Abi Bakr al-Mishnaza'i, ʿAbd al-Haqq al-Zalliji, Jaʿran as-Sfyani et le qutb ʿUmar al-Khattab al-Zarhuni."]],
      ["Son œuvre", ["Poète populaire autant que mystique, il laissa des quatrains dont de nombreux vers sont connus dans tout le Maghreb et à l'origine de nombreux proverbes (comme « le doute est le commencement de la sagesse »). Ses quatrains forment le livre oral le plus populaire du Maroc : ils dénoncent le mal, l'injustice et les fléaux de la société."]],
      ["Son décès", ["Il mourut le 26 mai 1568, à l'âge de 62 ans, au village de Marshaqa, dans la région du Habt. Il est enterré à Meknès. Son disciple Abu al-Mahasin Yusuf al-Fasi fut l'un des grands continuateurs de sa voie."]],
    ],
    sources: [["Wikipédia — Abd al-Rahman al-Majdoub", W("Abd_al-Rahman_al-Majdoub")], ["Franco.wiki — Abderrahman El Mejdoub", "https://franco.wiki/fr/Abderrahman_El_Mejdoub.html"], ["Wikipédia — Abd al-Rahman al-Fasi", W("Abd_al-Rahman_al-Fasi")]],
  },
  {
    cle: "Sidi Ahmad Zarrouq", slug: "ahmad-zarruq", nom: "Sidi Ahmad Zarruq", sous: "1442 – 1493 · Fès · juriste et maître shadhili",
    intro: "Juriste malikite, théoricien et maître shadhili, Sidi Ahmad Zarruq est considéré comme l'un des plus grands savants de l'histoire de l'islam, et par certains comme le rénovateur (mujaddid) de son siècle.",
    sections: [
      ["Enfance et études", ["Il naquit le 7 juin 1442 dans un village de la région du Tiliwan, entre Fès et Taza, dans la tribu berbère des Barnusi. Orphelin, il fut élevé par sa grand-mère, une juriste accomplie, qui fut sa première enseignante. Dès seize ans, il mena une vie d'étudiant à la Qarawiyyin et à la célèbre madrasa al-ʿInaniyya de Fès."]],
      ["Ses maîtres", ["Il reçut le tasawwuf d'Ahmad ibn ʿUqba al-Hadrami, savant des branches shadhilie et qadirie. Ses mémoires montrent son attachement à al-Zaytuni et l'influence de Muhammad al-Jazuli."]],
      ["Voyages et exil", ["En 873 de l'hégire (1468-1469), il partit en pèlerinage et visita Le Caire et d'autres grandes villes. Après deux ou trois ans à Médine, il poursuivit ses études au Caire. À l'annonce de son arrivée, les savants d'Égypte assistèrent à ses cours. Il enseigna à Al-Azhar, où près de six mille personnes suivaient ses leçons, et devint chef des malikites et de leur département à l'université. Chassé de Fès, il parcourut ensuite l'Afrique du Nord, attirant des disciples du Maroc jusqu'à La Mecque."]],
      ["Œuvre", ["Son ouvrage le plus célèbre est les Qawa'id at-Tasawwuf (« Les principes du soufisme »), qui relie la spiritualité à la jurisprudence ; il écrivit aussi des commentaires de jurisprudence malikite et un commentaire des Hikam d'Ibn ʿAta' Allah. Ses mémoires ont été traduits sous le titre Memoirs of a Sufi Master."]],
      ["Son décès et sa postérité", ["Il s'établit à Misrata, en Libye, où il mourut en 1493. Nombre de ses disciples, principalement shadhilis, fondèrent la branche appelée Zarruqiyya."]],
    ],
    sources: [["Wikipédia — Ahmad Zarruq", W("Ahmad_Zarruq")], ["Fountain Institute — Sheikh Ahmed Zarruq", "https://www.fountaininstitute.co.uk/sheikh-ahmed-zarruq/"], ["Durham e-Theses — Ahmad Zarruq, his life and works", "https://etheses.durham.ac.uk/id/eprint/7919/"], ["Wardah Books — Memoirs of a Sufi Master", "https://wardahbooks.com/products/memoirsofasufimastersidiahmadzarruq"]],
  },
  {
    cle: "Sidi Muhammad Wafa", slug: "muhammad-wafa", nom: "Sidi Muhammad Wafa", sous: "1302 – 1363 · Alexandrie et Le Caire · fondateur de la Wafaiyya",
    intro: "Maître shadhili d'Égypte et chérif idrisside, Sidi Muhammad Wafa est le fondateur de la Wafaiyya, ordre qui rayonna au Caire pendant des siècles.",
    sections: [
      ["Origines", ["Il naquit à Alexandrie en 1302. Sa famille était originaire de Tunis et de Sfax, et sa généalogie remonte à Idris Ier (m. 791), fondateur de la dynastie idrisside : il descendait ainsi du Prophète ﷺ par al-Hassan ibn ʿAli."]],
      ["Sa formation", ["Il fut initié à la voie shadhilie par Sidi Dawud ibn Makhla (m. 1332), disciple du grand Ibn ʿAta' Allah al-Iskandari (m. 1309)."]],
      ["Sa zawiya", ["Il vécut un temps à Akhmim, en Haute-Égypte, puis s'installa au Caire, où il fonda sa zawiya."]],
      ["Sa descendance spirituelle", ["Il mourut en 1363. Son fils cadet ʿAli, devenu célèbre pour sa poésie et ses traités de philosophie mystique, lui succéda. Vingt et un autres membres de sa famille se succédèrent ensuite à la tête de l'ordre, jusqu'en 1907, date de la mort du 22e et dernier khalife, Ahmad Abu al-Futuhat, qui ne laissa pas de descendance masculine."]],
    ],
    sources: [["Egyptian Streets — In the Abode of the Saints: the Wafaiya tradition", "https://egyptianstreets.com/2015/10/20/in-the-abode-of-the-saints-paying-tribute-to-the-wafaiya-tradition/"], ["Mazarat Misr — Sayyidina Mohammed Wafa", "https://mazaratmisr.org/ahl-ul-bayt/sayyidina-mohammed-wafa/"]],
  },
  {
    cle: "Sidi Dawoud al-Makhila", slug: "dawud-ibn-makhla", nom: "Sidi Dawud ibn Makhla", sous: "Mort en 1332 · Égypte · disciple d'Ibn ʿAta' Allah",
    intro: "Sidi Dawud ibn Makhla (al-Makhila) fut un disciple du grand Ibn ʿAta' Allah al-Iskandari et le maître de Sidi Muhammad Wafa.",
    sections: [
      ["Un chaînon de la voie shadhilie", ["Élève d'Ibn ʿAta' Allah al-Iskandari (m. 1309), Dawud ibn Makhla mourut en 1332. Il initia à la voie shadhilie Muhammad Wafa (1302-1363), futur fondateur de la Wafaiyya, assurant ainsi la transmission de l'enseignement shadhili en Égypte."]],
      ["Sa place dans la chaîne", ["Dans la chaîne karkarienne, il relie l'enseignement d'Ibn ʿAta' Allah à celui de la génération des maîtres égyptiens et maghrébins qui suivit. Peu de sources détaillées sont disponibles sur sa vie : la tradition retient surtout la qualité de la transmission qu'il a assurée."]],
    ],
    sources: [["Egyptian Streets — In the Abode of the Saints: the Wafaiya tradition", "https://egyptianstreets.com/2015/10/20/in-the-abode-of-the-saints-paying-tribute-to-the-wafaiya-tradition/"]],
  },
  {
    cle: "Sidi ibn ‘Ata Allah as-Sakandariy", slug: "ibn-ata-allah", nom: "Sidi Ibn ʿAta' Allah al-Iskandari", sous: "1259 – 1309/1310 · Alexandrie et Le Caire · auteur des Hikam",
    intro: "Juriste malikite, muhaddith et maître soufi, Ibn ʿAta' Allah al-Iskandari est l'auteur des célèbres « Hikam » (Sagesses) et le troisième guide de la voie shadhilie.",
    sections: [
      ["Alexandrie", ["Taj ad-Din Abu al-Fadl Ahmad ibn Muhammad ibn ʿAta' Allah naquit à Alexandrie vers 1259, sous les Mamelouks. Juriste malikite, il n'était d'abord pas attiré par la voie soufie et préférait la jurisprudence."]],
      ["La rencontre avec Abu al-ʿAbbas al-Mursi", ["Malgré ses premières réticences, il devint le disciple d'Abu al-ʿAbbas al-Mursi, le deuxième maître de l'ordre shadhili. Il passa douze ans auprès de lui. Après la mort d'al-Mursi (1287), il devint le chef de l'ordre, contribuant à systématiser son enseignement et à conserver les biographies de ses fondateurs."]],
      ["Au Caire", ["Installé au Caire, il enseigna à Al-Azhar et à la madrasa Mansuriyya. Parmi ses élèves figurent Taj ad-Din as-Subki et Shihab ad-Din al-Qarafi. Il présenta un nouveau modèle de soufi : à la fois jurisconsulte et théologien, réconciliant soufis et juristes."]],
      ["Son œuvre", ["Il est surtout connu pour les Hikam al-ʿAta'iyya (« Le livre des sagesses »), recueil de 264 aphorismes spirituels. On lui doit aussi Lata'if al-Minan (sur les prodiges de ses maîtres), Taj al-ʿArus, al-Qasd al-Mujarrad, al-Hawi, et le premier traité systématique sur le dhikr, Miftah al-Falah (« La clé du salut »)."]],
      ["Son décès", ["Il mourut en 709 de l'hégire (1309-1310), au Caire, et fut enterré au cimetière de Sayyid ʿAli Abi al-Wafa, au pied du mont Muqattam."]],
    ],
    sources: [["Wikipédia — Ibn Ata Allah al-Iskandari", W("Ibn_Ata_Allah_al-Iskandari")], ["Fiqh.islamonline — Ibn Ata Allah al-Iskandari", "https://fiqh.islamonline.net/en/ibn-ata-allah-al-iskandari/"], ["Equinox — Ibn ʿAta' Allah al-Sakandari: A Sufi, ʿAlim and Faqih", "https://journal.equinoxpub.com/CIS/article/view/9725"]],
  },
  {
    cle: "Sidi Abu al-‘Abbas al-Mursiy", slug: "abu-al-abbas-al-mursi", nom: "Sidi Abu al-ʿAbbas al-Mursi", sous: "1219 – 1287 · Murcie et Alexandrie · deuxième maître de la voie shadhilie",
    intro: "Venu d'al-Andalus, Abu al-ʿAbbas al-Mursi fut le disciple et le gendre d'Abu al-Hasan ash-Shadhili, puis le maître d'Ibn ʿAta' Allah. Il vécut quarante-trois ans à Alexandrie.",
    sections: [
      ["Murcie", ["Shihab ad-Din Abu al-ʿAbbas Ahmad ibn ʿUmar ibn Muhammad al-Ansari al-Mursi naquit à Murcie, en al-Andalus, en 1219, dans une riche famille de commerçants. Bien instruit dans les sciences religieuses, il était connu pour son honnêteté et ses libéralités envers les nécessiteux."]],
      ["L'exil et le naufrage", ["En 1242, devant la progression de la conquête chrétienne, il quitta l'Espagne avec son père, son frère et sa mère. Une violente tempête frappa le navire au large de la Tunisie : ses parents périrent (considérés comme martyrs), tandis que lui et son frère survécurent et trouvèrent refuge en Tunisie."]],
      ["Auprès d'ash-Shadhili", ["En Tunisie, il entendit parler d'Abu al-Hasan ash-Shadhili, fondateur de la voie shadhilie, et l'accompagna quand celui-ci partit pour Alexandrie. Ash-Shadhili l'aimait : il devint l'un de ses meilleurs disciples et épousa sa fille, dont il eut un fils et deux filles."]],
      ["Alexandrie et l'enseignement", ["Il vécut quarante-trois ans à Alexandrie, insistant sur la spiritualité, l'humilité et la dévotion dans la vie quotidienne. Lors de son premier entretien avec Ibn ʿAta' Allah, il lui donna ce cadre simple : dans les bienfaits, être reconnaissant ; dans les épreuves, être patient ; dans l'obéissance, voir la grâce de Dieu ; dans la désobéissance, demander pardon. Il contribua à structurer la doctrine shadhilie et à consigner la vie de son fondateur."]],
      ["Ses disciples", ["Ses deux disciples les plus connus sont Ibn ʿAta' Allah, qui lui succéda à la tête de l'ordre, et Yaqut al-ʿArsh al-Habashi, qu'il avait élevé dans sa maison dès l'âge de dix ans, qu'il affranchit et maria à sa fille Fatima."]],
      ["Son décès", ["Il mourut en 1287. Une mosquée fut élevée sur son tombeau, dans le quartier d'Anfushi à Alexandrie : devenue la plus célèbre de la ville, c'est la mosquée d'Abu al-ʿAbbas al-Mursi."]],
    ],
    sources: [["Wikipédia — Abu al-Abbas al-Mursi", W("Abu_al-Abbas_al-Mursi")], ["Mazarat Misr — Sayyidina Abu al-Abbas al-Mursi", "https://mazaratmisr.org/alexandria/sayyidina-abu-al-abbas-al-mursi/"], ["Seekers Guidance — Shaykh Yaqut al-ʿArsh al-Habashi", "https://seekersguidance.org/articles/al-qutb-sidi-shaykh-abu-al-durr-yaqut-b-abdullah-al-arsh-al-habashi-shaykh-of-the-shadhuliyya/"]],
  },
  {
    cle: "Sidi Abu al-Hassan as-Shadhiliy", slug: "abu-al-hasan-ash-shadhili", nom: "Sidi Abu al-Hasan ash-Shadhili", sous: "1196 – 1258 · Rif / Tunis / Alexandrie · fondateur de la voie shadhilie",
    intro: "Chérif idrisside né au Maroc, Abu al-Hasan ash-Shadhili est le fondateur de la voie shadhilie, l'une des plus anciennes et des plus influentes confréries soufies.",
    sections: [
      ["Origine et jeunesse", ["Abu al-Hasan ʿAli ibn ʿAbd Allah ibn ʿAbd al-Jabbar al-Hasani wa-l-Husayni ash-Shadhili naquit en 1196 dans le nord du Maroc, près de Ceuta ou de Tanger selon les sources. Sa généalogie remonte à l'imam al-Husayn par sa mère et à l'imam al-Hasan par son père. Jeune, il était réputé pour son savoir et son ascèse : il passa de longues périodes dans la solitude, tout entier à l'adoration et à l'invocation. Il étudia à Fès, où il rencontra le maître soufi Muhammad ibn Harzihim, dont l'influence fut déterminante."]],
      ["La rencontre avec Ibn Mashish", ["En Irak, le maître al-Wasiti lui dit qu'il trouverait son vrai maître au Maghreb. À son retour, il rencontra ʿAbd as-Salam ibn Mashish, le « pôle de l'Occident », et se soumit auprès de lui à une formation rigoureuse. C'est sur la montagne de Jabal al-ʿAlam qu'il le rencontra ; Ibn Mashish n'eut que lui pour disciple."]],
      ["Tunis et Alexandrie", ["Il s'établit en 625 de l'hégire (1228) dans un village près de Tunis, Shadhila, d'où il tira son nom, et y fonda sa première zawiya, avec quarante élèves, les « quarante amis ». Persécuté par des savants locaux malgré la protection du sultan hafside, il s'installa en 642 (1244), à la suite d'une vision du Prophète ﷺ, à Alexandrie. Son enseignement y attira de nombreux disciples, dont des fonctionnaires et des savants."]],
      ["Son décès", ["En route vers son dernier pèlerinage à La Mecque, accompagné de nombreux disciples, il tomba malade et mourut en 1258 à Humaythara, dans le désert oriental d'Égypte. Ses disciples, avec Abu al-ʿAbbas al-Mursi, propagèrent sa voie dans tout le Maghreb et le monde musulman."]],
    ],
    sources: [["Wikipédia — Al-Shadhili", W("Al-Shadhili")], ["Britannica — al-Shadhili", "https://www.britannica.com/biography/al-Shadhili"], ["The Life of Sayyidi Abul Hasan al-Shadhili", "https://sirajuddin.com.au/the-life-of-sayyidi-abul-hasan-al-shadhili/"], ["Anqa — Abu al-Hasan al-Shadhili", "https://anqa.co.uk/about-ibn-arabi/contemporaries/abu-al-hasan-al-shadhili"]],
  },
  {
    cle: "Sidi ‘AbdasSalam ibn Machich", slug: "abd-as-salam-ibn-mashish", nom: "Sidi ʿAbd as-Salam ibn Mashish", sous: "Mort en 1227/1228 · Jabal al-ʿAlam (Rif) · « le pôle de l'Occident »",
    intro: "Maître du Rif et pôle (qutb) de son temps, Sidi ʿAbd as-Salam ibn Mashish est le maître d'Abu al-Hasan ash-Shadhili : par lui, la transmission d'Abu Madyan passa à la voie shadhilie.",
    sections: [
      ["Origines et formation", ["Chérif idrisside, il naquit chez les Beni Arouss, dans les environs du Jabal al-ʿAlam, au nord du Maroc. À seize ans, il partit vers l'Orient pour étudier. À son retour, à Béjaïa, il suivit l'enseignement du mystique andalou Abu Madyan."]],
      ["La retraite de Jabal al-ʿAlam", ["De retour au pays, il se retira dans les montagnes près de Fnideq, puis, dans les dernières années de sa vie, sur les hauteurs du Jabal al-ʿAlam, tout entier à l'adoration, à la prière et à la contemplation. C'est là que vint à lui son unique disciple, Abu al-Hasan ash-Shadhili, également descendant des Idrissides, qui reprit son enseignement et fonda la voie shadhilie. L'enseignement d'ʿAbd as-Salam devint par lui le fondement de la voie."]],
      ["Sa mort", ["Il fut assassiné en 1227/1228 par le rebelle anti-almohade Ibn Abi Tawajin. Son sanctuaire, au sommet de la montagne, dans le Rif, au sud de Tétouan, est un lieu de pèlerinage très fréquenté."]],
    ],
    sources: [["Wikipédia — Abd al-Salam ibn Mashish", W("Abd_al-Salam_ibn_Mashish")], ["Burhaniya.info — Sayyidi Abd al-Salam ibn Bashish", "https://burhaniya.info/silsila-abdu-al-salam-ibn-bashish-en"], ["Wikipédia — Al-Shadhili", W("Al-Shadhili")]],
  },
  {
    cle: "Sayiduna al-Hassan ibn ʿAli", slug: "al-hassan-ibn-ali", nom: "Sayiduna al-Hassan ibn ʿAli", sous: "625 – 670 · Médine · petit-fils du Prophète ﷺ",
    intro: "Fils de ʿAli et de Fatima az-Zahra', petit-fils aîné du Prophète ﷺ, al-Hassan est l'ancêtre du Shaykh Mohamed Faouzi Al Karkari : par lui, la lignée idrisside remonte au Prophète ﷺ.",
    sections: [
      ["Naissance", ["Il naquit à Médine le 4 mars 625. Fils aîné de ʿAli et de Fatima, frère aîné d'al-Husayn, il fut le premier petit-fils du Prophète ﷺ. Son prénom fut choisi par le Prophète ﷺ en personne, qui dit : « Celui qui aime al-Hassan et al-Husayn m'aime, et celui qui les déteste me déteste. »"]],
      ["Une prophétie réalisée", ["Le Prophète ﷺ avait dit de lui : « Mon fils que voici est un maître (sayyid), et par lui Allah réconciliera deux grands groupes de musulmans. »"]],
      ["Le califat et l'année de l'unité", ["Après l'assassinat de ʿAli en janvier 661, al-Hassan fut reconnu calife à Kufa, mais Muʿawiya, gouverneur de Syrie, refusa de lui prêter allégeance et marcha avec une armée sur Kufa, le pressant d'abdiquer. Al-Hassan fut grièvement blessé lors d'une tentative d'assassinat par les kharijites. Soucieux de préserver l'unité des musulmans et d'éviter un bain de sang, il renonça au pouvoir quelques mois après son accession, au profit de Muʿawiya : cette année est restée dans l'histoire comme « l'année de l'unité » (ʿam al-jamaʿa)."]],
      ["Sa mort", ["Il échappa à plusieurs tentatives d'assassinat, mais mourut empoisonné à Médine le 2 mars 670, à l'âge de 47 ans. Il fut enterré au cimetière d'al-Baqiʿ."]],
      ["Sa descendance", ["Parmi ses nombreux enfants figurait le grand érudit al-Hassan al-Muthanna (661-715), dont le fils ʿAbd Allah al-Kamil est un aïeul du Shaykh Mohamed Faouzi Al Karkari, par la lignée de Moulay Idriss."]],
    ],
    sources: [["Wikipédia — Hasan ibn Ali", W("Hasan_ibn_Ali")], ["WikiShia — Hasan ibn Ali", "https://en.wikishia.net/view/Hasan_ibn_Ali"], ["Karkariya — Son ascendance", "ascendance-prophetique.html"]],
  },
  {
    cle: "Sayiduna ʿAli ibn Abi Talib", slug: "ali-ibn-abi-talib", nom: "Sayiduna ʿAli ibn Abi Talib", sous: "vers 600 – 661 · La Mecque et Kufa · cousin et gendre du Prophète ﷺ",
    intro: "Cousin et gendre du Prophète ﷺ, quatrième calife, ʿAli ibn Abi Talib est la source de la chaîne spirituelle de la plupart des voies soufies : la tradition l'appelle « la porte de la cité de la science ».",
    sections: [
      ["Naissance et jeunesse", ["ʿAli naquit vers l'an 600 à La Mecque et, selon de nombreux savants, à l'intérieur même de la Kaaba. Cousin du Prophète ﷺ, il n'adora jamais d'idole et fut le premier enfant à embrasser l'islam."]],
      ["Auprès du Prophète ﷺ", ["Il épousa Fatima az-Zahra', fille du Prophète ﷺ, dont il eut al-Hassan et al-Husayn. Compagnon, narrateur et scribe du Coran, il devint une figure majeure de la première communauté. Le Prophète ﷺ a dit de lui : « Je suis la cité de la science et ʿAli en est la porte » ; « Celui dont je suis le maître, ʿAli en est le maître » ; et : « N'es-tu pas satisfait d'être pour moi ce que Haroun était pour Moussa, sauf qu'il n'y aura pas de prophète après moi ? »"]],
      ["Le califat", ["Après l'assassinat du calife ʿUthman, il fut choisi comme quatrième calife (juin 656) et reçut l'allégeance d'une grande partie des musulmans, à l'exception de Muʿawiya, gouverneur de Syrie, qui exigeait que les meurtriers de ʿUthman fussent d'abord jugés. Cette divergence conduisit à plusieurs conflits majeurs."]],
      ["Sa mort", ["Frappé à la tête par une épée empoisonnée alors qu'il accomplissait la prière de l'aube dans la mosquée de Kufa, par ʿAbd ar-Rahman ibn Muljam, il mourut deux jours plus tard, vers le 28 janvier 661, à l'âge d'environ soixante ans."]],
      ["Dans la tradition soufie", ["Il est le premier maillon humain de presque toutes les chaînes initiatiques soufies après le Prophète ﷺ. Dans la chaîne karkarienne, il est surnommé « la porte de la cité de la science »."]],
    ],
    sources: [["Wikipédia — Ali", W("Ali")], ["WikiShia — Imam Ali b. Abi Talib", "https://en.wikishia.net/view/Ali"], ["Karkariya — Son ascendance", "ascendance-prophetique.html"]],
  },
];
