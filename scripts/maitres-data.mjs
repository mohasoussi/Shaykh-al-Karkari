/* Biographies des maîtres de la chaîne de transmission (une page par maître).
   - « karkariya » : texte repris de karkariya.fr (copie dans scripts/maitres-sources/)
   - sinon : notice rédigée (introduction + sections).
   « cle » = nom tel qu'il apparaît dans la chaîne (accents et ponctuation ignorés).
   Pour ajouter un maître : ajouter une entrée ici, puis node scripts/maitres.mjs (ou npm run actualites). */

export const MAITRES = [
  { cle: "Sidi Mawlay al-Hassan", slug: "mawlay-al-hassan", nom: "Sidi Mawlay al-Hassan al-Karkari", sous: "Né en 1936 · Shaykh de la Tariqa Karkariya · maître du Shaykh Mohamed Faouzi", karkariya: "le-sheykh-sidi-mawlay-al-hassan-radiallahu-anhu" },
  { cle: "Sidi Mawlay at-Tahir", slug: "mawlay-at-tahir", nom: "Sidi Mawlay at-Tahir al-Karkari", sous: "Mort en 1976 · Tamsaman (Rif) · disciple de Sidi Ahmad al-ʿAlawi", karkariya: "le-sheykh-sidi-mawlay-at-tahir-radiallahu-anhu" },

  {
    cle: "Sidi Muhammad ibn Qaddour al-Wakiliy", slug: "ibn-qaddour", nom: "Sidi Muhammad ibn Qaddour al-Wakili", sous: "Mort en 1884 · Montagne de Karkar (Rif) · « Abu l-Mawahib »",
    intro: "Cinquième ascendant du Shaykh Mohamed Faouzi Al Karkari, Sidi Muhammad ibn Qaddour al-Wakili est le grand maître dont est issue toute la famille spirituelle karkarienne. Surnommé « Abu l-Mawahib » — l'homme aux dons et aux prodiges (karamat) extraordinaires —, il vécut quarante ans dans la montagne de Karkar, dans le Rif, au service de Dieu et de ses disciples.",
    sections: [
      ["Une lignée chérifienne", [
        "Idrisside, Sidi Muhammad ibn Qaddour appartient à la tribu des Bani Wakil, dont le fondateur est Moulay Mimoun Abu Wakil (dit Boukil), enterré à Zaouiat Sidi Boukil, dans le Tafilalet. Par les Idrissides, il descend d'al-Hassan, petit-fils du Prophète ﷺ, et sa généalogie rejoint celle des grands chérifs du nord du Maroc. On l'appelle aussi « al-Boukili », en référence à son ancêtre.",
        "Les sources de la tradition karkarienne le désignent comme « le grand cheikh » (ash-shaykh al-kabir) et comme un imam de la connaissance : c'est à lui qu'on rattache l'origine de la lignée qui, de génération en génération, a porté la Voie jusqu'au Shaykh Mohamed Faouzi Al Karkari.",
      ]],
      ["Orphelin, élevé par son oncle", [
        "Il porte le nom d'« Ibn Qaddour » en référence à son oncle Qaddour, qui l'éleva à la mort de ses parents. Avant d'être le maître que l'on vénère, il fut ainsi un enfant privé de ses parents, recueilli par un membre de sa famille.",
      ]],
      ["Sa formation", [
        "Il apprit d'abord les sciences islamiques auprès du maître de son village. Un jour, il voulut aussi recevoir de lui la science de l'astronomie, mais son maître sur la Voie — il s'agit probablement de Sidi al-Mahaji — refusa et l'orienta vers une science plus conforme à son rang de chérif.",
        "Cette anecdote est souvent racontée : le chemin spirituel n'est pas une accumulation de savoirs, mais l'accès à la connaissance de Dieu. Par la voie du Nom suprême (al-Ism al-Aʿzam), Sidi ibn Qaddour devint un connaissant par Allah (ʿarif bi-Llah) et un maître éducateur.",
      ]],
      ["La zawiya de Karkar", [
        "Il vécut près de quarante ans sur la montagne de Karkar, dans le Rif oriental. Sa demeure et sa zawiya, construites en 1844, étaient d'une grande simplicité : une petite pièce comprenant un coin pour les ablutions, un coin pour se reposer et un coin pour vivre, le tout sur quelques mètres carrés, et une petite cuisine. La demeure familiale se trouve à gauche de la zawiya, en dehors.",
        "Il avait coutume de faire son dhikr toute l'année en trois lieux précis de la montagne. Les fuqara' de l'époque vivaient sous les arbres ou dans de petits abris de fortune éparpillés autour de sa maison : une vie de dénuement qui contraste avec l'ampleur de son rayonnement spirituel.",
      ]],
      ["Ses disciples", [
        "Parmi ses disciples figure Sidi Muhammad al-Bouzidi, qui le servit pendant quarante ans — notamment en lui apportant l'eau des ablutions — et qui transmit ensuite la Voie à Sidi Ahmad al-ʿAlawi de Mostaganem. C'est par cette transmission que la lumière de Karkar est revenue, au XXe siècle, dans la famille même de Sidi ibn Qaddour.",
        "Un autre de ses disciples, Sidi al-Hibri, fonda sa propre voie, la Hibriyya.",
      ]],
      ["Sa descendance spirituelle", [
        "Son fils aîné, Mawlay at-Tayyib, fut le père de Sidi Muhammad al-Fardi, un homme connu pour sa droiture, dont on rapporte de nombreux prodiges. Celui-ci fut le père de Mawlay at-Tahir, qui rejoignit Sidi Ahmad al-ʿAlawi et devint à son tour un grand maître, puis de Mawlay al-Hassan, le maître du Shaykh Mohamed Faouzi Al Karkari.",
        "Sidi Ahmad al-ʿAlawi dit un jour à Mawlay at-Tahir, petit-fils de Sidi ibn Qaddour, en citant la sourate Yusuf : « Votre bien vous a été rendu », voulant dire que la wilaya (la sainteté), sortie de chez son grand-père, était revenue à lui.",
      ]],
      ["Son décès et son tombeau", [
        "Il mourut en 1884. Sa tombe et sa zawiya se trouvent sur la montagne de Karkar, non loin de Tamsaman : c'est là que beaucoup de ses descendants et de ses disciples viennent encore se recueillir. Un disciple d'un autre ordre, Sidi as-Sayid, y passa un jour une nuit en espérant qu'Allah lui montrerait celui qui le conduirait à Lui — et il vit en rêve Mawlay at-Tahir.",
      ]],
    ],
  },

  {
    cle: "Sidi Ahmad al-‘Alawiy al-Mustaghanemiy", slug: "ahmad-al-alawi", nom: "Sidi Ahmad al-ʿAlawi", sous: "1869 – 1934 · Mostaganem (Algérie) · fondateur de la Alawiyya",
    intro: "Maître shadhili de Mostaganem, Sidi Ahmad al-ʿAlawi compte parmi les cheikhs les plus célèbres du XXe siècle. Il est le maître de Mawlay at-Tahir al-Karkari, dont la famille spirituelle donnera la Tariqa Karkariya. Sa vie, racontée par Martin Lings dans un livre devenu classique, est celle d'un artisan sans instruction devenu l'un des guides spirituels les plus écoutés de son temps.",
    sections: [
      ["Un enfant promis à la piété", [
        "Ahmad ibn Mustafa al-ʿAlawi naquit à Mostaganem, en Algérie, en 1869. Il était le fils unique de la famille, avec deux sœurs. On raconte qu'avant sa naissance, sa mère rêva que le Prophète ﷺ lui tendait une fleur, ce que son mari interpréta comme l'annonce d'un fils pieux.",
        "Il n'alla jamais à l'école. À la maison, son père lui apprit le Coran, dont il connut presque les neuf dixièmes par cœur. Pour gagner sa vie, il devint cordonnier, puis tint une boutique. Profondément religieux de nature, il avait pourtant soif de connaissance : il étudia la théologie et s'intéressa aux dons spirituels, jusqu'à la rencontre qui allait tout changer.",
      ]],
      ["La rencontre avec Sidi Muhammad al-Bouzidi", [
        "En 1894, il rencontra Sidi Muhammad al-Bouzidi, cheikh de la voie shadhilie-darqawie. Voyant son aptitude à la Voie, celui-ci l'initia, lui donna le wird de la confrérie et lui apprit à pratiquer le dhikr à la manière darqawie. Jusque-là, al-ʿAlawi avait étudié la théologie et cultivé de petits pouvoirs spirituels ; désormais, tout changeait.",
        "Il resta quinze ans au service de son maître. Encouragé par lui à enseigner, il vit sa boutique ressembler plus souvent à une zawiya qu'à un commerce.",
      ]],
      ["La succession et les voyages", [
        "À la mort d'al-Bouzidi, en 1909, al-ʿAlawi fut désigné pour lui succéder comme cheikh. Il résista d'abord, et, cette même année, partit plusieurs mois voyager avec un disciple, là où l'esprit le conduisait : Tunis, Tripoli, Istanbul. De retour à Mostaganem, il y propagea la voie shadhilie.",
      ]],
      ["La naissance de la Alawiyya", [
        "En 1914, sa branche se détacha de la Darqawiyya et prit le nom de Alawiyya, en l'honneur de ʿAli, gendre du Prophète ﷺ, qui lui serait apparu en vision pour lui donner ce nom. Dès 1923, on lui prêtait au moins 100 000 disciples ; quatre ans plus tard, plus de 200 000. À sa mort, on comptait environ 200 000 fidèles, dont près de 200 Européens convertis.",
        "Il fut ainsi le premier cheikh arabe à attirer un nombre significatif de convertis européens. Le Suisse Frithjof Schuon se convertit à l'islam à Mostaganem, passa près de quatre mois dans sa zawiya, reçut de lui l'initiation et le nom de ʿIsa Nur ad-Din. Martin Lings, qui y fit sa thèse, lui consacra un livre classique, <em>A Sufi Saint of the Twentieth Century</em>, qui contient des traductions de sa poésie et de ses écrits.",
      ]],
      ["Un maître de son temps", [
        "Ahmad al-ʿAlawi sut parler aux Algériens de son époque avec des moyens modernes. En plus de ses écrits spirituels et de sa poésie, il fonda et dirigea deux hebdomadaires : Lisan ad-Din (« La langue de la foi », 1912, qui eut une brève existence) et al-Balagh al-Jaza'iri (« Le Messager algérien », 1926, qui dura davantage).",
        "Il fut critique à la fois de l'extrémisme fondamentaliste et de la modernité sécularisée, telle qu'elle s'incarnait en Turquie sous Atatürk, et chercha à réconcilier l'islam et la modernité.",
      ]],
      ["Un voyage à Paris", [
        "En 1926, il se rendit en France et dirigea la première prière communautaire lors de l'inauguration de la Grande Mosquée de Paris, en présence du président de la République.",
      ]],
      ["Son œuvre", [
        "Il laissa un Diwan de poésie, des ouvrages de doctrine tels que Mabadi' at-Ta'yid et Dawhat al-Asrar, des Munajat (invocations), ainsi qu'un grand commentaire de poème, la Minah al-Quddusiyya, dans lequel il développe une lecture soufie d'un poème classique. Ses œuvres complètes ont été réunies en arabe.",
      ]],
      ["Son décès et son héritage", [
        "Il mourut le 14 juillet 1934, à Mostaganem. L'Alawiyya, l'une des premières voies soufies à s'implanter en Europe, est restée vivante en Algérie, en France et jusque chez les Yéménites du pays de Galles. Pour la Tariqa Karkariya, il est le maître de Mawlay at-Tahir et le maillon qui a ramené la sainteté dans la famille de Sidi ibn Qaddour.",
      ]],
    ],
  },

  {
    cle: "Sidi Muhammad ibn al-Habib al-Bouzidiy", slug: "muhammad-al-bouzidi", nom: "Sidi Muhammad ibn al-Habib al-Bouzidi", sous: "Mort en 1909 · maître de Sidi Ahmad al-ʿAlawi",
    intro: "Cheikh de la voie shadhilie-darqawie, Sidi Muhammad al-Bouzidi est un maillon essentiel de la chaîne : disciple de Sidi ibn Qaddour dans la montagne de Karkar, il fut le maître de Sidi Ahmad al-ʿAlawi, par qui la Voie parvint à la famille karkarienne.",
    sections: [
      ["Au service d'un maître pendant quarante ans", [
        "Selon la tradition karkarienne, Sidi al-Bouzidi fut le disciple de Sidi Muhammad ibn Qaddour al-Wakili, qu'il servit pendant quarante ans dans la montagne de Karkar. Il l'accompagnait au quotidien, lui apportait l'eau des ablutions et attendait auprès de lui, attentif à ses moindres besoins. Cette longue fréquentation, faite d'humilité et de service, est la clef de sa réalisation : on reçoit la Voie en servant celui qui la porte.",
      ]],
      ["Un cheikh de la Darqawiyya", [
        "Sidi al-Bouzidi appartenait à la voie darqawie, la branche shadhilie fondée sur l'enseignement de Mawlay al-ʿArbi ad-Darqawi. Les sources le décrivent comme un cheikh réputé dans cette tradition, dont la pédagogie reposait sur le wird de la confrérie et sur la pratique du dhikr à la manière darqawie.",
      ]],
      ["La rencontre avec Ahmad al-ʿAlawi", [
        "À Mostaganem, il rencontra le jeune Ahmad al-ʿAlawi, alors artisan. Voyant son aptitude à la Voie, il l'initia, lui donna le wird et lui apprit à pratiquer le dhikr. Al-ʿAlawi resta quinze ans à son service, jusqu'à la mort de son maître. C'est par cette initiation que la transmission venue de Karkar atteignit Mostaganem — et qu'elle devait revenir, avec Mawlay at-Tahir, dans la famille même de Sidi ibn Qaddour.",
      ]],
      ["Son décès", [
        "Il mourut en 1909. Ahmad al-ʿAlawi, élu pour lui succéder, hésita plusieurs mois avant d'accepter cette charge, puis fonda la Alawiyya.",
      ]],
    ],
  },

  {
    cle: "Sidi Mawlay al-‘Arbiy ad-Darqawiy", slug: "mawlay-al-arbi-ad-darqawi", nom: "Mawlay al-ʿArbi ad-Darqawi", sous: "1760 – 1823 · Bani Zarwal, près de Fès · fondateur de la Darqawiyya",
    intro: "Rénovateur de la voie shadhilie au Maghreb, Mawlay al-ʿArbi ad-Darqawi a donné son nom à la Darqawiyya, la plus importante confrérie du Maroc de son époque. Ses lettres, qui expliquent avec une rare franchise la méthode du dhikr, sont encore lues dans le monde entier.",
    sections: [
      ["Origines", [
        "Abu ʿAbd Allah Muhammad al-ʿArbi ad-Darqawi naquit en 1760 dans les montagnes situées au nord de Fès, chez la tribu berbère des Bani Zarwal. Il descendait d'une famille chérifienne hassanide-idrisside installée parmi ces Berbères, sur les collines du nord-est de Fès.",
      ]],
      ["Son maître, Sidi ʿAli al-Jamal", [
        "La rencontre avec Sidi ʿAli al-Jamal, grand maître shadhili de Fès, fut décisive dans son cheminement. Sous sa direction, il reçut un entraînement spirituel intensif selon la méthode shadhilie, et devint son successeur dans la chaîne. Cette relation maître-disciple est restée célèbre : c'est lui qui rassembla les pages que son maître, dit-on, laissait tomber de sa fenêtre dans la cour de sa maison.",
      ]],
      ["Un renouveau de la voie", [
        "À la suite de son maître, il revivifia la voie shadhilie. Il insistait sur le détachement du monde (dunya) et critiquait les confréries qui exploitaient la notion de baraka. Sa doctrine, d'une grande simplicité, se concentre sur l'invocation (dhikr) et sur la relation au maître.",
        "Après sa mort, la Darqawiyya s'organisa autour de son enseignement, avec des membres venus de milieux très divers. Ce fut longtemps la plus importante confrérie du Maroc, avant de voir son rôle décliner en s'étendant à toute l'Afrique du Nord.",
      ]],
      ["Les lettres", [
        "Il est l'auteur de lettres adressées à ses disciples (fuqara') sur le dhikr qu'il prêchait et sur la conduite de la vie quotidienne. Presque toutes portent sur la méthode fondée sur l'invocation, que les maîtres évoquent rarement ouvertement. Compilées par lui-même, copiées par ses disciples, elles furent imprimées de nombreuses fois à Fès en écriture lithographiée. Elles sont connues en traduction anglaise sous les titres <em>Letters of a Sufi Master</em> et <em>The Darqawi Way</em>.",
      ]],
      ["Prison et rôle politique", [
        "Le sultan Mawlay Sulayman (r. 1792-1822) l'emprisonna pour avoir soutenu des révoltes contre le trône ; il fut libéré sous le règne de Mawlay ʿAbd ar-Rahman (r. 1822-1859). Entre 1803 et 1805, il joua un rôle clef dans la rébellion de l'ouest algérien, prise dans le conflit entre le bey turc d'Oran et les fuqara' de Tlemcen. Au Maroc comme en Algérie, la Darqawiyya fut engagée dans des mouvements de protestation.",
      ]],
      ["Ses disciples", [
        "Son enseignement suscita un mouvement qui attira des dizaines de milliers de disciples au Maroc, en Algérie, en Tunisie et au-delà. Son disciple Muhammad Buziyan al-Gharisi, qui l'avait servi vingt ans, rédigea à sa mort le <em>Kanz al-Asrar</em> (« Le trésor des mystères »), principale source sur sa vie. La tradition des grands commentateurs, dont Ahmad ibn ʿAjiba (1747-1809), se rattache à la même famille spirituelle.",
      ]],
      ["Son décès et son héritage", [
        "Il mourut en 1823. Son tombeau se trouve à la zawiya de Bou Brih, dans le Rif. De la Darqawiyya sont issues plusieurs branches, dont celle de Sidi Muhammad al-Bouzidi et, par lui, la Alawiyya de Mostaganem.",
      ]],
    ],
  },

  {
    cle: "Sidi ‘Aliy al-Jamal", slug: "ali-al-jamal", nom: "Sidi ʿAli al-Jamal", sous: "Mort en 1194 de l'hégire (1779-1780) · Fès · maître de Mawlay al-ʿArbi ad-Darqawi",
    intro: "Grand maître shadhili de Fès, Sidi ʿAli al-Jamal fut le maître spirituel de Mawlay al-ʿArbi ad-Darqawi. Il est l'un des chaînons par lesquels le renouveau de la voie shadhilie au XVIIIe siècle a été transmis.",
    sections: [
      ["Un parcours hors du commun", [
        "Sidi ʿAli al-Jamal avait servi dans l'administration marocaine avant de se rendre en Tunisie pour y étudier auprès de maîtres soufis, puis revint à Fès, où il fonda sa zawiya.",
      ]],
      ["Des états spirituels extraordinaires", [
        "Il était connu pour ses états spirituels extraordinaires. Ses disciples rapportent notamment qu'il pouvait voir le Prophète ﷺ en songe comme à l'état de veille — une grâce qui, dans la tradition soufie, est la marque des plus grands saints.",
      ]],
      ["Son enseignement écrit", [
        "Il rédigeait quelques pages à la fois et les laissait tomber de sa fenêtre dans la cour de sa maison. Son successeur Mawlay al-ʿArbi ad-Darqawi les ramassait et les réunit en un livre, recueil de ses conseils au chercheur sur la voie de l'ascèse. L'ouvrage est connu en anglais sous le titre <em>Teachings from a Classical Sufi Master</em>.",
      ]],
      ["La formation de Mawlay al-ʿArbi", [
        "Sous sa conduite, le jeune Mawlay al-ʿArbi ad-Darqawi reçut un entraînement spirituel intensif selon la méthode shadhilie. Cette formation donna naissance à la Darqawiyya, dont l'influence s'étendit à tout le Maghreb.",
      ]],
      ["Son décès", ["Il mourut en 1194 de l'hégire (1779-1780), laissant à son disciple la charge de poursuivre la transmission."]],
    ],
  },

  {
    cle: "Sidi Abu al-Mahassin Youssouf al-Fassiy", slug: "abu-al-mahasin-al-fasi", nom: "Sidi Abu al-Mahasin Yusuf al-Fasi", sous: "1530/1531 – 1604 · Ksar el-Kébir et Fès · fondateur de la Zawiya Fassiya",
    intro: "Figure majeure du soufisme marocain, Abu al-Mahasin Yusuf al-Fasi est le fondateur de la Zawiya Fassiya de Fès et le père d'une famille de savants qui a marqué l'histoire intellectuelle du Maroc. Disciple de Sidi ʿAbd ar-Rahman al-Majdhub, il fut aussi un homme d'action.",
    sections: [
      ["Naissance et famille", [
        "Abu al-Mahasin Yusuf ibn Muhammad al-Fasi naquit en 1530 ou 1531 à Ksar el-Kébir. Sa famille, issue d'émigrés d'al-Andalus, s'était installée au Maroc ; il se fixa à Fès, où sa réputation de maître et de savant attira de nombreux élèves.",
      ]],
      ["Le disciple d'al-Majdhub", [
        "Il fut le disciple de Sidi ʿAbd ar-Rahman al-Majdhub, le grand mystique-poète de Meknès. Il lui voua une telle vénération qu'il fit élever, dit la tradition, la coupole au-dessus de sa tombe. Un de ses descendants, ʿAbd ar-Rahman al-Fasi, a écrit un récit sur le cheikh Abu al-Mahasin et son maître al-Majdhub (<em>Ibtihaj al-qulub</em>).",
        "L'enseignement de sa zawiya suivait l'école d'al-Jazuli, elle-même issue de la voie shadhilie, ainsi que celle d'al-Majdhub.",
      ]],
      ["La bataille des trois rois", [
        "En 1578, il participa — par les guerriers qu'il envoya — à la célèbre bataille de Ksar el-Kébir, dite « bataille des trois rois », contre les Portugais. Cet engagement lui valut la faveur du sultan saadien Ahmad al-Mansur.",
      ]],
      ["La Zawiya Fassiya", [
        "Installé à Fès, il y fonda la Zawiya Fassiya, dont l'influence s'étendit à tout le nord-ouest de l'Afrique. Il est connu pour son commentaire des <em>Dala'il al-Khayrat</em>, le célèbre recueil de prières sur le Prophète ﷺ.",
      ]],
      ["Ses fils et sa descendance", [
        "Son fils Muhammad al-ʿArbi al-Fasi (1580-1642) rédigea en 1636 la <em>Mir'at al-Mahasin</em> (« Le miroir des qualités »), qui raconte la vie de son père et les débuts de la famille. Un autre fils, ʿAbd al-Qadir, fut le grand-père de ʿAbd al-Qadir al-Fasi (1599-1680), dont le fils ʿAbd ar-Rahman al-Fasi (1631-1685) écrivit quelque 170 ouvrages. La famille des Fasi, dont les membres sont appelés « Fasiyyun », fut l'une des élites intellectuelles du Maroc du XVIIe siècle.",
      ]],
      ["Son décès", ["Il mourut à Fès le 14 août 1604 et fut enterré à la Zawiya Fassiya."]],
    ],
  },

  {
    cle: "Sidi AbdarRahman al-Majdhoub", slug: "abd-ar-rahman-al-majdhub", nom: "Sidi ʿAbd ar-Rahman al-Majdhub", sous: "1506 – 1568 · Meknès · poète et maître soufi",
    intro: "Poète, mystique et maître soufi, Sidi ʿAbd ar-Rahman al-Majdhub est l'un des saints les plus aimés du Maroc. Ses quatrains, répétés dans tout le Maghreb, sont devenus une source de proverbes.",
    sections: [
      ["Naissance et enfance", [
        "Il naquit en mars 1506 au village de Tit, près d'Azemmour. En 1508, il suivit son père à Irgan, près de Meknès. Il grandit dans un milieu soufi : son père avait été l'élève d'Ibrahim Afham al-Zarhuni, lui-même disciple du grand Ahmad Zarruq.",
      ]],
      ["Ses études et ses maîtres", [
        "Il étudia d'abord à Meknès, puis à Fès. À Meknès, il eut pour professeurs Abu Ruwayin, Ahmad al-Shabih, Saʿid ibn Abi Bakr al-Mishnaza'i, ʿAbd al-Haqq al-Zalliji, Jaʿran as-Sfyani et le qutb ʿUmar al-Khattab al-Zarhuni. Il complète sa formation à Fès auprès d'autres savants, dont ʿAli as-Sanhaji.",
      ]],
      ["L'attraction divine (jadhb)", [
        "On l'appelle « al-Majdhub », « l'attiré » : celui que l'attraction divine (jadhb) a saisi. Dans la tradition soufie, le majdhub est le mystique que Dieu attire à Lui, le plaçant d'emblée au terme du chemin, au-delà des conventions sociales. Cet état explique le caractère libre, parfois déconcertant, de sa parole.",
      ]],
      ["Les quatrains", [
        "Poète populaire autant que mystique, il laissa des quatrains qui fusionnent spiritualité extatique, introspection morale et satire sociale. Ses vers dénoncent le mal, l'injustice et les fléaux de la société ; ils sont le livre oral le plus populaire du Maroc. De nombreux vers sont connus dans tout le Maghreb et sont à l'origine de proverbes comme « le doute est le commencement de la sagesse » (<em>ash-shakk awwal al-hikma</em>), qui priorisent la substance intérieure sur les apparences.",
      ]],
      ["Son héritage", [
        "Son disciple Abu al-Mahasin Yusuf al-Fasi fit élever la coupole de sa tombe, à Meknès, et transmit sa voie par la Zawiya Fassiya de Fès. Sa tombe, à Meknès, attire chaque jour de nombreux visiteurs.",
      ]],
      ["Son décès", ["Il mourut le 26 mai 1568, à l'âge de 62 ans, au village de Marshaqa, dans la région du Habt."]],
    ],
  },

  {
    cle: "Sidi Ahmad Zarrouq", slug: "ahmad-zarruq", nom: "Sidi Ahmad Zarruq", sous: "1442 – 1493 · Fès · juriste et maître shadhili",
    intro: "Juriste malikite, théoricien et maître shadhili, Sidi Ahmad Zarruq est considéré comme l'un des plus grands savants de l'histoire de l'islam, et par certains comme le rénovateur (mujaddid) de son siècle. Il fut le premier à recevoir le titre de « régulateur des savants et des saints » (muhtasib al-ʿulama' wa-l-awliya').",
    sections: [
      ["Enfance et études", [
        "Il naquit le 7 juin 1442 dans un village de la région du Tiliwan, entre Fès et Taza, dans la tribu berbère des Barnusi. Orphelin dès les premiers jours, il fut élevé par sa grand-mère, une juriste accomplie, qui fut sa première enseignante. Dès seize ans, il mena une vie d'étudiant à la Qarawiyyin et à la célèbre madrasa al-ʿInaniyya de Fès.",
      ]],
      ["Ses maîtres", [
        "Il reçut le tasawwuf d'Ahmad ibn ʿUqba al-Hadrami, savant des branches shadhilie et qadirie. Ses mémoires montrent son attachement à al-Zaytuni et l'influence de Muhammad al-Jazuli.",
      ]],
      ["Voyages et exil", [
        "En 873 de l'hégire (1468-1469), il partit en pèlerinage et visita Le Caire et d'autres grandes villes. Après deux ou trois ans à Médine, il poursuivit ses études au Caire. À l'annonce de son arrivée, les savants d'Égypte assistèrent à ses cours. Il enseigna à Al-Azhar, où près de six mille personnes suivaient ses leçons, et devint chef des malikites et de leur département à l'université.",
        "Chassé de Fès, il parcourut l'Afrique du Nord, attirant des disciples du Maroc jusqu'à La Mecque.",
      ]],
      ["Un réformateur", [
        "Zarruq a cherché à rapprocher le soufisme et le droit. Dans ses <em>Qawa'id at-Tasawwuf</em> (« Les principes du soufisme »), il propose un traitement systématique de la discipline spirituelle, fondée sur les textes. Il y note que le soufisme a reçu plus de deux mille définitions, chacune renvoyant à l'état spirituel de celui qui la formule.",
        "Il rédigea aussi des commentaires de jurisprudence malikite et un commentaire des <em>Hikam</em> d'Ibn ʿAta' Allah, et composa la <em>Wazifa Zarruqiyya</em>, litanie du matin et du soir destinée à former ses disciples.",
      ]],
      ["Ses mémoires", ["Ses souvenirs, traduits en anglais sous le titre <em>Memoirs of a Sufi Master</em>, sont une source précieuse sur son parcours et sa pensée."]],
      ["Son décès et sa postérité", [
        "Il s'établit à Misrata, en Libye, où il mourut en 1493. Nombre de ses disciples, principalement shadhilis, fondèrent la branche appelée Zarruqiyya. Son sanctuaire à Misrata a été profané dans les troubles récents. Son influence a pourtant traversé les siècles : on le cite aujourd'hui comme l'un des maîtres les plus complets de la Voie.",
      ]],
    ],
  },

  {
    cle: "Sidi Muhammad Wafa", slug: "muhammad-wafa", nom: "Sidi Muhammad Wafa", sous: "1302 – 1363 · Alexandrie et Le Caire · fondateur de la Wafaiyya",
    intro: "Maître shadhili d'Égypte et chérif idrisside, Sidi Muhammad Wafa est le fondateur de la Wafaiyya, ordre qui rayonna au Caire pendant des siècles et dont la famille dirigea la Voie jusqu'au début du XXe siècle.",
    sections: [
      ["Origines", ["Il naquit à Alexandrie en 1302. Sa famille était originaire de Tunis et de Sfax, et sa généalogie remonte à Idris Ier (m. 791), fondateur de la dynastie idrisside : il descendait ainsi du Prophète ﷺ par al-Hassan ibn ʿAli."]],
      ["Sa formation", ["Il fut initié à la voie shadhilie par Sidi Dawud ibn Makhla (m. 1332), disciple du grand Ibn ʿAta' Allah al-Iskandari (m. 1309). Il se rattache ainsi directement à l'école d'Alexandrie."]],
      ["Pourquoi « Wafa » ?", ["Son nom vient, raconte la tradition, d'un épisode célèbre : un jour que le niveau du Nil avait dangereusement baissé, les habitants du Caire, craignant la famine, lui demandèrent de prier Dieu. Sa renommée s'étendit alors, et on l'appela dès lors « Wafa »."]],
      ["Sa zawiya", ["Il vécut un temps à Akhmim, en Haute-Égypte, puis s'installa au Caire, où il fonda sa zawiya."]],
      ["Sa descendance spirituelle", ["Il mourut en 1363 (765 de l'hégire). Son fils cadet ʿAli, devenu célèbre pour sa poésie et ses traités de philosophie mystique, lui succéda. Vingt et un autres membres de sa famille se succédèrent ensuite à la tête de l'ordre, jusqu'en 1907, date de la mort du 22e et dernier khalife, Ahmad Abu al-Futuhat, qui ne laissa pas de descendance masculine."]],
      ["Son tombeau", ["Il fut enterré dans sa mosquée du Caire, la mosquée Wafaiyya, dans laquelle reposent plus d'une vingtaine de saints."]],
    ],
  },

  {
    cle: "Sidi Dawoud al-Makhila", slug: "dawud-ibn-makhla", nom: "Sidi Dawud ibn Makhla", sous: "Mort en 1332 · Égypte · disciple d'Ibn ʿAta' Allah",
    intro: "Sidi Dawud ibn Makhla (al-Makhila) fut un disciple du grand Ibn ʿAta' Allah al-Iskandari et le maître de Sidi Muhammad Wafa. Les sources sur sa vie sont rares, mais son rôle dans la chaîne est capital : c'est par lui que l'enseignement de l'école d'Alexandrie fut transmis aux maîtres cairotes.",
    sections: [
      ["Un disciple d'Ibn ʿAta' Allah", ["Dawud ibn Makhla fit partie du cercle d'Ibn ʿAta' Allah al-Iskandari (m. 1309), le troisième guide de la voie shadhilie et l'auteur des <em>Hikam</em>. À l'époque, ce cercle réunissait au Caire et à Alexandrie des juristes et des soufis qui voyaient dans la Voie une discipline compatible avec la science exotérique."]],
      ["Le maître de Muhammad Wafa", ["Il initia à la voie shadhilie Muhammad Wafa (1302-1363), fondateur de la Wafaiyya, et fit ainsi passer le flambeau à la génération suivante. Cette transmission est un maillon discret mais essentiel de la chaîne."]],
      ["Son décès", ["Il mourut en 1332. La tradition ne retient de lui que la qualité de la transmission qu'il a assurée — ce qui, dans la Voie, est la plus haute des œuvres."]],
    ],
  },

  {
    cle: "Sidi ibn ‘Ata Allah as-Sakandariy", slug: "ibn-ata-allah", nom: "Sidi Ibn ʿAta' Allah al-Iskandari", sous: "1259 – 1309/1310 · Alexandrie et Le Caire · auteur des Hikam",
    intro: "Juriste malikite, muhaddith et maître soufi, Ibn ʿAta' Allah al-Iskandari est l'auteur des célèbres « Hikam » (Sagesses) et le troisième guide de la voie shadhilie. Il est celui qui fit du soufisme une discipline respectée au sein même de la science islamique.",
    sections: [
      ["Alexandrie", ["Taj ad-Din Abu al-Fadl Ahmad ibn Muhammad ibn ʿAta' Allah naquit à Alexandrie en 658 de l'hégire (1259), sous les Mamelouks, au sein d'une illustre famille de savants malikites. Il fit très tôt preuve d'une maîtrise de toutes les disciplines religieuses."]],
      ["Un adversaire devenu disciple", ["Chose remarquable, Ibn ʿAta' Allah était d'abord hostile au soufisme et critiquait l'enseignement d'Abu al-ʿAbbas al-Mursi. Mais sa rencontre avec lui changea sa vie. Il devint son disciple et passa douze ans à ses côtés, pour devenir lui-même un maître reconnu."]],
      ["Le chef de la voie", ["Après la mort d'al-Mursi (686/1287), il devint le chef de l'ordre shadhili. Il fut responsable de la mise en système de la doctrine shadhilie et de l'enregistrement de la vie des fondateurs, Abu al-Hasan ash-Shadhili et Abu al-ʿAbbas al-Mursi, dans ses <em>Lata'if al-Minan</em>."]],
      ["Au Caire", ["Installé au Caire, il enseigna à Al-Azhar et à la madrasa Mansuriyya. Parmi ses élèves figurent Taj ad-Din as-Subki et Shihab ad-Din al-Qarafi. Il présenta un modèle nouveau : le soufi à la fois jurisconsulte et théologien, réconciliant soufis et juristes, et rapprochant l'islam des villes et celui des campagnes."]],
      ["Une rencontre avec Ibn Taymiyya", ["Un épisode célèbre le montre à la mosquée al-Husayn du Caire. Il dirigeait la prière quand Ibn Taymiyya, tout juste sorti de prison, la fit derrière lui. Après la prière, les deux hommes échangèrent des salutations respectueuses, et Ibn ʿAta' Allah, par humilité, s'excusa s'il avait joué un rôle dans l'emprisonnement d'Ibn Taymiyya."]],
      ["Une œuvre immense", ["On lui attribue une vingtaine d'ouvrages, dont les <em>Hikam al-ʿAta'iyya</em> (« Le livre des sagesses »), recueil de 264 aphorismes spirituels qui s'ouvre sur ces mots : « Parmi les signes de l'appui sur l'action, la diminution de l'espérance lors de la faute. » On lui doit aussi <em>Lata'if al-Minan</em>, <em>Taj al-ʿArus</em>, <em>al-Tanwir</em>, <em>al-Qasd al-Mujarrad</em>, <em>al-Hawi</em> et le premier traité systématique sur le dhikr, <em>Miftah al-Falah</em> (« La clé du salut »). Les <em>Hikam</em> ont été commentés par de nombreux maîtres, dont Ahmad Zarruq et Ahmad ibn ʿAjiba."]],
      ["Son décès", ["Il mourut en 709 de l'hégire (1309-1310), au Caire, et fut enterré au cimetière de Sayyid ʿAli Abi al-Wafa, au pied du mont Muqattam."]],
    ],
  },

  {
    cle: "Sidi Abu al-‘Abbas al-Mursiy", slug: "abu-al-abbas-al-mursi", nom: "Sidi Abu al-ʿAbbas al-Mursi", sous: "1219 – 1287 · Murcie et Alexandrie · deuxième maître de la voie shadhilie",
    intro: "Venu d'al-Andalus, Abu al-ʿAbbas al-Mursi fut le disciple et le gendre d'Abu al-Hasan ash-Shadhili, puis le maître d'Ibn ʿAta' Allah. Il vécut quarante-trois ans à Alexandrie, où son tombeau est devenu l'un des lieux de dévotion les plus fréquentés.",
    sections: [
      ["Murcie", ["Shihab ad-Din Abu al-ʿAbbas Ahmad ibn ʿUmar ibn Muhammad al-Ansari al-Mursi naquit à Murcie, en al-Andalus, en 1219, dans une riche famille de commerçants. Bien instruit dans les sciences religieuses, il était connu pour son honnêteté et ses libéralités envers les nécessiteux. Il vécut la progression de la reconquête chrétienne qui poussait les communautés musulmanes vers le sud."]],
      ["L'exil et le naufrage", ["En 1242, devant la progression de la conquête chrétienne, il quitta l'Espagne avec son père, son frère et sa mère. Une violente tempête frappa le navire au large de la Tunisie : ses parents périrent (considérés comme martyrs), tandis que lui et son frère survécurent et trouvèrent refuge en Tunisie."]],
      ["Auprès d'ash-Shadhili", ["En Tunisie, il entendit parler d'Abu al-Hasan ash-Shadhili, fondateur de la voie shadhilie, et l'accompagna quand celui-ci partit pour Alexandrie. Ash-Shadhili l'aimait : il devint l'un de ses meilleurs disciples et épousa sa fille, dont il eut un fils et deux filles. Sa formation andalouse, alliée à la tradition mystique de son maître, forma une synthèse qui plut à la population d'Alexandrie."]],
      ["Le successeur", ["Peu avant sa mort, à Humaythara, ash-Shadhili s'isola avec lui, lui transmit la connaissance dont Dieu l'avait gratifié, puis déclara à ses compagnons qu'à sa mort ils devraient prendre Abu al-ʿAbbas comme successeur, car il aurait un grand rôle parmi eux."]],
      ["Alexandrie et l'enseignement", ["Il vécut quarante-trois ans à Alexandrie, insistant sur la spiritualité, l'humilité et la dévotion dans la vie quotidienne. Il disait que Dieu entend tout et donne à chacun la compréhension selon ses capacités. Lors de son premier entretien avec Ibn ʿAta' Allah, il lui donna ce cadre simple : dans les bienfaits, être reconnaissant ; dans les épreuves, être patient ; dans l'obéissance, voir la grâce de Dieu ; dans la désobéissance, demander pardon."]],
      ["Ses disciples", ["Ses deux disciples les plus connus sont Ibn ʿAta' Allah, qui lui succéda à la tête de l'ordre, et Yaqut al-ʿArsh al-Habashi, qu'il avait élevé dans sa maison dès l'âge de dix ans, qu'il affranchit et maria à sa fille Fatima, et qui lui succéda comme cheikh de la voie. Yaqut était appelé « le secret du cheikh Abu al-ʿAbbas »."]],
      ["Son décès et son tombeau", ["Il mourut en 1287. Une mosquée fut élevée sur son tombeau, dans le quartier d'Anfushi à Alexandrie : devenue la plus célèbre de la ville, c'est la mosquée d'Abu al-ʿAbbas al-Mursi, qui couvre plus de quatre hectares. Il est l'un des quatre grands saints d'Égypte, avec Ahmad al-Badawi, ad-Dasuqi et al-Haggag."]],
    ],
  },

  {
    cle: "Sidi Abu al-Hassan as-Shadhiliy", slug: "abu-al-hasan-ash-shadhili", nom: "Sidi Abu al-Hasan ash-Shadhili", sous: "1196 – 1258 · Rif / Tunis / Alexandrie · fondateur de la voie shadhilie",
    intro: "Chérif idrisside né au Maroc, Abu al-Hasan ash-Shadhili est le fondateur de la voie shadhilie, l'une des plus anciennes et des plus influentes confréries soufies. Sa doctrine, qui préfère la gratitude à l'ascèse et le service à la retraite, a marqué tout le monde musulman.",
    sections: [
      ["Origine et jeunesse", ["Abu al-Hasan ʿAli ibn ʿAbd Allah ibn ʿAbd al-Jabbar al-Hasani wa-l-Husayni ash-Shadhili naquit en 1196 dans le nord du Maroc, près de Ceuta ou de Tanger selon les sources, chez les Ghumara. Sa généalogie remonte à l'imam al-Husayn par sa mère et à l'imam al-Hasan par son père.", "Jeune, il était réputé pour son savoir et son ascèse : il passa de longues périodes dans la solitude, tout entier à l'adoration et à l'invocation, hésitant entre la vie d'ascète dans la nature et le retour auprès des savants et des justes. Il étudia à Fès, où il rencontra le maître soufi Muhammad ibn Harzihim, dont l'influence fut déterminante."]],
      ["La recherche du pôle", ["Il voyagea jusqu'en Irak, où il rencontra le maître al-Wasiti, qui lui dit qu'il trouverait son véritable maître au Maghreb, là d'où il venait. À son retour, il rencontra ʿAbd as-Salam ibn Mashish, le « pôle de l'Occident », qui avait été l'élève d'Abu Madyan. À leur première rencontre, il l'interrogea sur sa condition intérieure ; Ibn Mashish répondit : « Je me plains à Dieu de la fraîcheur du contentement et de la soumission, comme tu te plains à Lui de la chaleur de l'initiative et du choix. » Sous sa direction, il subit une formation rigoureuse, avant de partir pour la Tunisie sur l'ordre de son maître."]],
      ["Shadhila et Tunis", ["Il s'établit à Shadhila, près de Tunis, d'où il tira son nom : « ash-Shadhili ». Il s'y retira dans une grotte au sommet du Jabal Zaghwan avec son premier compagnon, Abu Yahya ʿAbd Allah ibn Samala al-Habibi, et fonda en 625 de l'hégire (1228) sa première zawiya à Tunis, avec quarante élèves, les « quarante amis ». Persécuté par des savants locaux malgré la protection du sultan hafside, il connut l'opposition des théologiens."]],
      ["Alexandrie", ["En 642 (1244), à la suite d'une vision du Prophète ﷺ, il s'installa à Alexandrie. Son enseignement y attira de nombreux disciples, parmi lesquels des fonctionnaires de la cour et des savants."]],
      ["Sa doctrine", ["Un aspect distinctif de sa voie est la primauté de la gratitude (shukr) sur l'ascèse (zuhd). On lui prête cette phrase : « Si tu vois un faqir aux vêtements sales, doute de son état spirituel. » Dieu a comblé Ses serviteurs de bienfaits ; il n'est pas besoin de les refuser. L'ultime conseil que lui donna Ibn Mashish avant son départ insistait sur la transformation de la conscience, vers un recentrage intérieur et extérieur sur Dieu, le contentement avec Dieu en toute circonstance et le retrait intérieur de la création, dans la prospérité comme dans l'épreuve."]],
      ["Ses prières", ["Ses prières, notamment le <em>Hizb al-Bahr</em> (« la litanie de la mer »), sont encore récitées dans de nombreux cercles. À Humaythara, peu avant sa mort, il conseilla à ses compagnons de s'y attacher fermement : « Apprenez-la à vos enfants, car le Nom suprême de Dieu s'y trouve. »"]],
      ["Son décès", ["En route vers son dernier pèlerinage à La Mecque, accompagné de nombreux disciples, il tomba malade et mourut en 1258 à Humaythara, dans le désert oriental d'Égypte, au bord de la mer Rouge. Ses disciples, avec Abu al-ʿAbbas al-Mursi, propagèrent sa voie dans tout le Maghreb et le monde musulman. Son mausolée de Humaythara reste un lieu de pèlerinage."]],
    ],
  },

  {
    cle: "Sidi ‘AbdasSalam ibn Machich", slug: "abd-as-salam-ibn-mashish", nom: "Sidi ʿAbd as-Salam ibn Mashish", sous: "Mort en 1227/1228 · Jabal al-ʿAlam (Rif) · « le pôle de l'Occident »",
    intro: "Maître du Rif et pôle (qutb) de son temps, Sidi ʿAbd as-Salam ibn Mashish est le maître d'Abu al-Hasan ash-Shadhili : par lui, la transmission d'Abu Madyan passa à la voie shadhilie. Il est l'un des ancêtres spirituels de la Tariqa Karkariya.",
    sections: [
      ["Origines", ["Chérif idrisside, il naquit chez les Beni Arouss, dans les environs du Jabal al-ʿAlam, au nord du Maroc. Sa généalogie, mêlant des ancêtres aux noms berbères du côté maternel et une ascendance arabe du côté paternel, remonte au Prophète ﷺ. On le connaît aussi sous le nom d'al-ʿAlami, d'après la montagne."]],
      ["Son voyage vers l'Orient", ["À seize ans, il partit vers l'Orient pour étudier. À son retour, à Béjaïa, il suivit l'enseignement du mystique andalou Abu Madyan, dont il devint l'un des héritiers spirituels."]],
      ["La retraite de Jabal al-ʿAlam", ["De retour au pays, il se retira dans les montagnes près de Fnideq, puis, dans les dernières années de sa vie, sur les hauteurs du Jabal al-ʿAlam, tout entier à l'adoration, à la prière et à la contemplation. C'est là que vint à lui son unique disciple, Abu al-Hasan ash-Shadhili, également descendant des Idrissides."]],
      ["Sa transmission", ["Sa pédagogie reposait sur le recentrage de la conscience sur Dieu, le contentement en toute circonstance et la liberté intérieure vis-à-vis de la création. On lui attribue la prière sur le Prophète ﷺ connue comme <em>as-Salat al-Mashishiyya</em>, encore récitée aujourd'hui. Il demanda à ash-Shadhili de partir pour Shadhila, en Tunisie, pour y fonder sa voie ; c'est ainsi que son enseignement donna naissance à la voie shadhilie."]],
      ["Sa mort", ["Il fut assassiné en 1227/1228 par le rebelle anti-almohade Ibn Abi Tawajin. Son sanctuaire, au sommet de la montagne, dans le Rif, au sud de Tétouan, est un lieu de pèlerinage très fréquenté : une visite des disciples karkaris à Mawlay Abdessalam ibn Machich est relatée dans les actualités de ce site."]],
    ],
  },

  {
    cle: "Sayiduna al-Hassan ibn ʿAli", slug: "al-hassan-ibn-ali", nom: "Sayiduna al-Hassan ibn ʿAli", sous: "625 – 670 · Médine · petit-fils du Prophète ﷺ",
    intro: "Fils de ʿAli et de Fatima az-Zahra', petit-fils aîné du Prophète ﷺ, al-Hassan est l'ancêtre du Shaykh Mohamed Faouzi Al Karkari : par lui, la lignée idrisside remonte au Prophète ﷺ. Il est resté dans l'histoire comme l'homme qui préféra renoncer au pouvoir plutôt que de verser le sang des musulmans.",
    sections: [
      ["Naissance et nom", ["Il naquit à Médine, en l'an 3 de l'hégire (mars 625). Fils aîné de ʿAli et de Fatima, frère aîné d'al-Husayn, il fut le premier petit-fils du Prophète ﷺ. Son prénom, inconnu jusqu'alors à l'époque préislamique, lui fut donné par le Prophète ﷺ en personne : « al-Hassan », la bonté, la beauté. Le Prophète ﷺ immola un agneau pour les pauvres, et Fatima rasa la tête de l'enfant et donna aux pauvres le poids de ses cheveux en argent."]],
      ["Auprès du Prophète ﷺ", ["Il passa une grande partie de son enfance auprès du Prophète ﷺ, dont il apprit les manières et le comportement. Le Prophète ﷺ le portait parfois sur ses épaules. Il a dit : « Celui qui aime al-Hassan et al-Husayn m'aime, et celui qui les déteste me déteste. » Et : « Voici mes petits-fils, les fils de ma fille. Seigneur, je les aime ; aime-les, et aime ceux qui les aiment. » Al-Hassan fait partie des Ahl al-Kisa' et de ceux qui accompagnèrent le Prophète ﷺ lors de la mubahala."]],
      ["Une prophétie réalisée", ["Le Prophète ﷺ avait dit de lui : « Mon fils que voici est un maître (sayyid), et par lui Allah réconciliera deux grands groupes de musulmans. »"]],
      ["Le califat et l'année de l'unité", ["Après l'assassinat de ʿAli en janvier 661, al-Hassan fut reconnu calife à Kufa, mais Muʿawiya, gouverneur de Syrie, refusa de lui prêter allégeance et marcha avec une armée sur Kufa, le pressant d'abdiquer. Al-Hassan fut grièvement blessé lors d'une tentative d'assassinat par les kharijites. Soucieux de préserver l'unité des musulmans et d'éviter un bain de sang, il renonça au pouvoir après environ sept mois de règne, au profit de Muʿawiya, à des conditions précises : que celui-ci gouverne selon le Coran et la sunna, qu'un conseil désigne son successeur et que les partisans d'al-Hassan reçoivent l'amnistie. Cette année est restée dans l'histoire comme « l'année de l'unité » (ʿam al-jamaʿa)."]],
      ["Sa personnalité", ["Il était connu pour sa générosité et sa piété. Il avait toujours une table prête pour ceux qui avaient faim. On rapporte qu'il accomplit le pèlerinage vingt-cinq fois, à pied, de Médine à La Mecque, et qu'à trois reprises dans sa vie il partagea tous ses biens et en donna la moitié en aumône. Entendant un homme prier à la Kaaba pour être délivré d'une dette de 10 000 dirhams, il rentra chez lui et lui apporta la somme."]],
      ["Sa mort", ["Retiré à Médine, il fut empoisonné — la tradition accuse l'une de ses épouses — et mourut le 28 safar 50 de l'hégire (mars 670), à l'âge de 47 ans. Il fut enterré au cimetière d'al-Baqiʿ."]],
      ["Sa descendance", ["Parmi ses nombreux enfants figurait le grand érudit al-Hassan al-Muthanna (661-715), dont le fils ʿAbd Allah al-Kamil est un aïeul du Shaykh Mohamed Faouzi Al Karkari, par la lignée de Moulay Idriss. Ses descendants, les Hassanides, forment l'une des deux grandes branches des chérifs, avec les Husaynides. Au Maroc, les Idrissides en sont l'une des branches les plus connues."]],
    ],
  },

  {
    cle: "Sayiduna ʿAli ibn Abi Talib", slug: "ali-ibn-abi-talib", nom: "Sayiduna ʿAli ibn Abi Talib", sous: "vers 600 – 661 · La Mecque et Kufa · cousin et gendre du Prophète ﷺ",
    intro: "Cousin et gendre du Prophète ﷺ, quatrième calife, ʿAli ibn Abi Talib est la source de la chaîne spirituelle de la plupart des voies soufies : la tradition l'appelle « la porte de la cité de la science ».",
    sections: [
      ["Naissance et jeunesse", ["ʿAli naquit vers l'an 600 à La Mecque et, selon de nombreux savants, à l'intérieur même de la Kaaba. Il était le fils d'Abu Talib, chef du clan des Hashim et oncle du Prophète ﷺ. Dès son plus jeune âge, il fut très lié à Muhammad ﷺ, qui l'accueillit dans sa maison. Il n'adora jamais d'idole et fut le premier enfant à embrasser l'islam."]],
      ["Les années de La Mecque et l'Hégire", ["Quand le Prophète ﷺ déclara sa mission, en 610, ʿAli compta parmi les premiers à accepter la foi nouvelle, et resta fidèle à ses côtés dans les pires épreuves. En 622, lors de l'Hégire vers Médine, il risqua sa vie en dormant dans le lit du Prophète ﷺ pour tromper ceux qui voulaient l'assassiner, afin que son cousin puisse partir en sécurité."]],
      ["Médine", ["Il prit part aux principales batailles livrées par le Prophète ﷺ entre 622 et 632. Il épousa Fatima az-Zahra', fille du Prophète ﷺ, dont il eut al-Hassan et al-Husayn. Compagnon, narrateur et scribe du Coran, il devint une figure majeure de la première communauté. Le Prophète ﷺ a dit de lui : « Je suis la cité de la science et ʿAli en est la porte » ; « Celui dont je suis le maître, ʿAli en est le maître » ; et : « N'es-tu pas satisfait d'être pour moi ce que Haroun était pour Moussa, sauf qu'il n'y aura pas de prophète après moi ? »"]],
      ["Le califat", ["Après l'assassinat du calife ʿUthman, il fut choisi comme quatrième calife (juin 656), non par un comité mais par la demande populaire de Médine, et reçut l'allégeance d'une grande partie des musulmans, à l'exception de Muʿawiya, gouverneur de Syrie, qui exigeait que les meurtriers de ʿUthman fussent d'abord jugés. Cette divergence conduisit à plusieurs conflits majeurs, la « première discorde » (fitna), qui ébranla l'unité de la communauté. Il régna près de cinq ans, entre 656 et 661."]],
      ["Sa mort", ["Frappé à la tête par une épée empoisonnée alors qu'il accomplissait la prière de l'aube dans la mosquée de Kufa, par ʿAbd ar-Rahman ibn Muljam, il mourut deux jours plus tard, vers le 28 janvier 661, à l'âge d'environ soixante ans. Selon la tradition, il est enterré à Najaf, en Irak."]],
      ["Dans la tradition soufie", ["Il est le premier maillon humain de presque toutes les chaînes initiatiques soufies après le Prophète ﷺ. Dans la chaîne karkarienne, il est surnommé « la porte de la cité de la science ». C'est de lui, par al-Hassan, que se prolonge la lignée chérifienne du Shaykh Mohamed Faouzi Al Karkari."]],
    ],
  },
];
