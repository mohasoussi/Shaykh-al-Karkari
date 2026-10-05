/* Biographies : ancêtres de la lignée chérifienne du Shaykh (rédaction neutre, d'après l'article « Son ascendance »). */
const L = (o) => ({ rubrique: "lignee", ...o });

export const LIGNEE = [
  L({
    cle: "Fatima az-Zahra", slug: "fatima-az-zahra", nom: "Fatima az-Zahra'",
    sous: "Vers 605 – 632 · La Mecque et Médine · fille du prophète Muhammad",
    intro: "Fatima, surnommée az-Zahra' (« la Rayonnante »), est la plus jeune fille du prophète Muhammad et de Khadija. Épouse d'ʿAli ibn Abi Talib, elle est la mère d'al-Hasan et d'al-Husayn, dont descendent tous les chérifs, y compris les Idrissides du Maroc.",
    sections: [
      ["Famille et jeunesse", ["Fatima naquit à La Mecque, avant le début de la prédication de son père selon la plupart des sources. Elle grandit dans la maison de Muhammad et de Khadija, puis accompagna sa famille dans les épreuves des années mecquoises. Après l'Hégire, elle s'installa à Médine."]],
      ["Mariage et enfants", ["Vers l'an 2 de l'hégire, elle épousa son cousin ʿAli ibn Abi Talib. Le couple eut quatre enfants connus : al-Hasan, al-Husayn, Zaynab et Umm Kulthum. La vie du foyer fut marquée par la simplicité : les sources rapportent qu'elle s'occupait elle-même des tâches ménagères."]],
      ["Place dans la tradition", ["Dans la tradition musulmane, Fatima est honorée comme l'une des femmes les plus vénérées de l'islam, en raison de sa proximité avec le Prophète. Ses descendants, appelés chérifs ou sayyids, sont répartis dans tout le monde musulman, notamment par les lignées hassanide et husaynide."]],
      ["Décès", ["Elle mourut à Médine environ six mois après son père, en 632, à moins de trente ans. Le lieu exact de sa sépulture est discuté par les sources."]],
    ],
  }),

  L({
    cle: "Moulay Hassan al-Thani", slug: "hasan-al-muthanna", nom: "Al-Hasan al-Muthanna",
    sous: "661 – 715 · Médine · arrière-petit-fils du prophète Muhammad",
    intro: "Al-Hasan al-Muthanna (« le Second Hasan ») est le fils d'al-Hasan ibn ʿAli et le père d'ʿAbd Allah al-Kamil. Il est l'un des ancêtres directs des Idrissides.",
    sections: [
      ["Naissance et famille", ["Il naquit à Médine en 661, fils d'al-Hasan ibn ʿAli et de Khawla. Il porte le surnom de « al-Muthanna » pour le distinguer de son père, dont il porte le même nom."]],
      ["À Karbala", ["En 680, à l'âge de dix-neuf ans, il accompagna son oncle al-Husayn lors de la bataille de Karbala. Blessé, il fut capturé mais survécut grâce à l'intervention d'un parent maternel qui servait dans l'armée omeyyade."]],
      ["Mariage et descendance", ["Il épousa sa cousine Fatima, fille d'al-Husayn, l'une des survivantes de Karbala. De cette union naquirent plusieurs enfants, dont ʿAbd Allah al-Kamil, ancêtre des Idrissides du Maroc."]],
      ["Décès", ["Il mourut vers 715. Il est resté connu pour sa piété et son érudition."]],
    ],
  }),

  L({
    cle: "ʿAbdallah al-Kâmil", slug: "abd-allah-al-kamil", nom: "ʿAbd Allah al-Kamil",
    sous: "Mort vers 762 · Médine et Irak · père d'Idris Ier",
    intro: "ʿAbd Allah al-Kamil (« le Complet ») fut le chef des descendants d'al-Hasan à Médine à l'époque des derniers Omeyyades puis des premiers Abbassides. Père du prétendant Muhammad an-Nafs az-Zakiyya et de Moulay Idris, fondateur de la dynastie idrisside, il est l'un des ancêtres directs du Shaykh Mohamed Faouzi Al Karkari.",
    sections: [
      ["Un surnom et deux lignées", ["Il tient son surnom d'« al-Kamil » du fait qu'il était à la fois descendant d'al-Hasan par son père, al-Hasan al-Muthanna, et d'al-Husayn par sa mère, Fatima bint al-Husayn. Il réunissait ainsi les deux branches de la famille du Prophète."]],
      ["Le chef des Hassanides de Médine", ["À Médine, il était considéré comme le chef des descendants d'al-Hasan, à une époque où beaucoup espéraient voir la famille du Prophète prendre la tête de la communauté. Pour renverser les Omeyyades, il s'associa à d'autres groupes, dont les Abbassides, avec lesquels il conclut un accord prévoyant que le pouvoir reviendrait à son fils Muhammad an-Nafs az-Zakiyya."]],
      ["Trahison abbasside et prison", ["Une fois les Omeyyades renversés (750), les Abbassides refusèrent de tenir cet engagement. Le calife al-Mansur exigea l'allégeance d'ʿAbd Allah al-Kamil, qui refusa, et le fit emprisonner. Il mourut en détention vers 762."]],
      ["Sa descendance", ["Ses fils Muhammad an-Nafs az-Zakiyya et Ibrahim se révoltèrent en 762-763 contre les Abbassides et furent tués. Un autre fils, Idris, échappa à la répression et s'enfuit vers l'ouest : il fonda la dynastie idrisside au Maroc."]],
    ],
  }),

  L({
    cle: "Moulay Idriss al-Akbar", slug: "idris-i", nom: "Moulay Idris Ier (al-Akbar)",
    sous: "Vers 745 – 791 · Hijaz, Maroc · fondateur de la dynastie idrisside",
    intro: "Moulay Idris Ier, dit al-Akbar, est le fondateur de la dynastie idrisside, première dynastie musulmane du Maroc. Réfugié au Maghreb après la bataille de Fakhkh, il fut accueilli par les tribus berbères du Moyen Atlas, qui lui prêtèrent allégeance. Il est l'ancêtre direct du Shaykh Mohamed Faouzi Al Karkari.",
    sections: [
      ["Fakhkh et la fuite", ["Fils d'ʿAbd Allah al-Kamil, Idris participa à la révolte des descendants du Prophète contre les Abbassides, qui s'acheva en 786 par la bataille de Fakhkh, près de La Mecque, où de nombreux membres de la famille périrent. Il parvint à s'échapper."]],
      ["L'exil vers l'ouest", ["Poursuivi par les autorités abbassides, il passa par l'Égypte, puis l'Ifriqiya (Tunisie actuelle), avant d'atteindre l'extrémité occidentale du monde musulman. Il trouva refuge auprès des tribus berbères, en particulier dans la cité antique de Volubilis, près de Meknès."]],
      ["La fondation du royaume", ["Les tribus, qui respectaient la famille du Prophète, se rassemblèrent autour de lui et le reconnurent comme chef. En 788, les Awraba lui prêtèrent allégeance. Il épousa Kenza, issue de cette tribu, et donna naissance à l'État idrisside."]],
      ["Mort", ["Le calife Harun ar-Rashid, craignant ce pouvoir concurrent, fit envoyer un émissaire qui se fit passer pour un fugitif et l'assassina, en 791 ou 792. Son fils, Idris II, naquit quelques mois plus tard. Moulay Idris est enterré dans la ville qui porte son nom, Moulay Idris Zerhoun, près de Meknès, où son mausolée attire encore de nombreux visiteurs."]],
    ],
  }),

  L({
    cle: "Moulay Idriss al-Azhar", slug: "idris-ii", nom: "Moulay Idris II (al-Azhar)",
    sous: "Vers 791 – 828 · Volubilis et Fès · fondateur de Fès",
    intro: "Moulay Idris II, dit al-Azhar (« le Radieux »), est le fils posthume d'Idris Ier. Monté sur le trône à onze ans, il consolida l'État idrisside et fonda la ville de Fès au début du IXe siècle. Il est l'aïeul direct du Shaykh Mohamed Faouzi Al Karkari.",
    sections: [
      ["Un enfant roi", ["Il naquit après l'assassinat de son père, d'une mère berbère, Kenza. Élevé en secret et protégé par les tribus, il fut reconnu à onze ans comme souverain. Il s'attacha à organiser le territoire et à consolider l'État."]],
      ["La fondation de Fès", ["Vers 808-809, il fonda la ville de Fès, qui devint la capitale idrisside et, plus tard, l'un des grands centres religieux et intellectuels du monde musulman. La ville accueillit des immigrants venus de Kairouan et d'al-Andalus."]],
      ["Alliances et territoire", ["Il étendit son autorité grâce à des alliances avec plusieurs tribus berbères et laissa à sa mort, en 828, un vaste territoire unifié."]],
      ["Descendance", ["Il laissa une quinzaine d'enfants, dont douze fils. Son fils Muhammad lui succéda et partagea le royaume entre ses frères, ce qui fragilisa l'unité de l'État. Le mausolée d'Idris II se trouve dans sa zawiya, au cœur de la médina de Fès, près de la mosquée al-Qarawiyyin."]],
    ],
  }),

  L({
    cle: "Moulay al-Qacem", slug: "al-qasim-ibn-idris", nom: "Moulay al-Qasim ibn Idris",
    sous: "Mort vers 860 · Rif occidental · fils d'Idris II",
    intro: "Moulay al-Qasim est l'un des douze fils d'Idris II. Gouverneur d'une partie du Rif occidental, il se retira du pouvoir pour mener une vie de dévotion. Il est l'aïeul direct du Shaykh Mohamed Faouzi Al Karkari.",
    sections: [
      ["Le partage du royaume", ["À la mort d'Idris II (828), son fils Muhammad fut proclamé souverain. Sur le conseil de leur grand-mère Kenza, il partagea le royaume en onze provinces, confiées à ses frères. Al-Qasim reçut le Rif occidental, qu'il administra de Tanger à Larache et jusqu'aux environs d'al-Hoceima."]],
      ["Le refus de la guerre", ["Quand un conflit éclata entre Muhammad et ses frères, al-Qasim, connu pour sa piété et son ascétisme, refusa de s'y engager malgré l'ordre de son frère."]],
      ["La retraite", ["Vers 840, il se retira du pouvoir pour s'installer dans un ribat, un lieu de retraite, dans la région d'Asilah. Il y finit ses jours vers 860, dans la dévotion. Son fils Muhammad al-Bakmani lui succéda."]],
    ],
  }),

  L({
    cle: "Moulay Muhammad al-Bakmani", slug: "muhammad-al-bakmani", nom: "Muhammad ibn al-Qasim al-Bakmani",
    sous: "Fin du IXe siècle · Rif occidental · fils d'al-Qasim ibn Idris",
    intro: "Muhammad ibn al-Qasim, surnommé al-Bakmani, succéda à son père comme chef du Rif occidental. Il maintint l'autorité idrisside dans la région malgré l'affaiblissement du pouvoir de Fès.",
    sections: [
      ["Un contexte de déclin", ["Au moment où il prend la tête du Rif occidental, le pouvoir central des Idrissides à Fès se désagrège. Il parvient pourtant à maintenir l'autorité de sa famille sur sa région."]],
      ["Descendance", ["Il eut plusieurs enfants, parmi lesquels Ahmad ibn Muhammad, connu sous le nom d'Ahmad Belkarti, aïeul du Shaykh Mohamed Faouzi Al Karkari."]],
    ],
  }),

  L({
    cle: "Moulay Ahmad Belkarti", slug: "ahmad-belkarti", nom: "Ahmad ibn Muhammad, dit Belkarti (Janun)",
    sous: "Mort vers 920 · Rif occidental · idrisside",
    intro: "Ahmad ibn Muhammad, connu sous le nom d'Ahmad Belkarti, surnommé « Janun » (« la lune » en berbère), fut l'un des dirigeants idrissides du nord du Maroc au début du Xe siècle. Il est l'aïeul direct du Shaykh Mohamed Faouzi Al Karkari.",
    sections: [
      ["Un contexte de menaces", ["Il partagea le contrôle des régions du nord et de l'ouest du Maroc avec ses frères Ibrahim et al-Qasim, dans un contexte d'incursions fatimides et omeyyades de plus en plus fréquentes."]],
      ["Repli vers les montagnes", ["Face aux menaces extérieures, il contribua à maintenir le pouvoir idrisside mais finit par se replier dans les zones montagneuses du Rif. Il mourut vers 920."]],
      ["Descendance", ["Il laissa plusieurs enfants, dont Moulay ʿIyyad, gouverneur local dans la région de Ksar el-Kébir."]],
    ],
  }),

  L({
    cle: "Moulay ʿIyyad", slug: "moulay-iyyad", nom: "Moulay ʿIyyad",
    sous: "Mort vers 960 · Ksar el-Kébir · fils d'Ahmad Belkarti",
    intro: "Moulay ʿIyyad fut gouverneur local dans la région de Ksar el-Kébir. Il mourut vers 960, laissant plusieurs enfants, dont Moulay Salem ibn ʿIyyad.",
    sections: [
      ["Gouverneur local", ["À l'époque d'un déclin accéléré du pouvoir idrisside, il exerça son autorité à l'échelle locale, dans la région de Ksar el-Kébir."]],
      ["Descendance", ["Parmi ses enfants figure Moulay Salem ibn ʿIyyad, aïeul du Shaykh Mohamed Faouzi Al Karkari."]],
    ],
  }),

  L({
    cle: "Moulay Salem", slug: "moulay-salem", nom: "Moulay Salem ibn ʿIyyad",
    sous: "Xe siècle · Rif / Jbala · ancêtre de nombreux chérifs du nord du Maroc",
    intro: "Moulay Salem ibn ʿIyyad fut témoin de la chute progressive des Idrissides. Il est cité comme l'ancêtre de nombreux chérifs du nord du Maroc, parmi lesquels ʿAbd as-Salam ibn Mashish, et marque le passage de l'élite princière aux chérifs ruraux du Rif.",
    sections: [
      ["Entre pouvoir et retrait", ["Moulay Salem se situe au point de bascule entre les Idrissides princiers, impliqués dans la politique locale, et les Idrissides ruraux qui, en se retirant des affaires du pouvoir, se fondirent dans les montagnes du Rif."]],
      ["Vers l'enseignement religieux", ["Il s'orienta vers la vie spirituelle et l'enseignement religieux au sein des tribus jbalas et eut une nombreuse descendance, composée de personnalités connues pour leur piété et leur sagesse."]],
      ["Descendance", ["Entre le XIe et le XVe siècle, sa lignée se prolonge par Moulay ʿImrane, Moulay Jaber, Moulay ʿAlal, Moulay ʿAbd al-ʿAziz, Moulay Meʿzouz, Moulay ʿAzouz, Moulay Moussa, Moulay ʿIssa et Moulay Messʿoud, jusqu'à Moulay Mimoun Abu Wakil."]],
    ],
  }),

  L({
    cle: "Moulay ʿImrane", slug: "moulay-imrane", nom: "Moulay ʿImrane ibn Salem",
    sous: "XIe siècle · Moyen Atlas (Tadla)",
    intro: "Moulay ʿImrane ibn Salem est le fils de Moulay Salem. Selon la tradition généalogique, il émigra vers la région de Tadla, dans le Moyen Atlas, où naîtra son descendant Mimoun Abu Wakil.",
    sections: [
      ["Une émigration vers Tadla", ["La famille quitta le nord pour s'installer dans la région de Tadla. C'est là que, plus tard, naîtra Mimoun Abu Wakil, fondateur de la tribu des Bani Wakil."]],
      ["Descendance", ["Sa lignée se prolonge par Moulay Jaber, Moulay ʿAlal, Moulay ʿAbd al-ʿAziz, Moulay Meʿzouz, Moulay ʿAzouz, Moulay Moussa, Moulay ʿIssa et Moulay Messʿoud."]],
    ],
  }),

  L({
    cle: "Moulay Mimoune Abu-Wakil", slug: "mimoun-abu-wakil", nom: "Mimoun Abu Wakil (Boukil)",
    sous: "1050 – XIIe siècle · Tadla et Tafilalet · fondateur des Bani Wakil",
    intro: "Mimoun Abu Wakil, dit Boukil, est le fondateur de la tribu des Bani Wakil, qui regroupe plusieurs familles de chérifs idrissides. Disciple d'Abu Hamid al-Ghazali pendant plusieurs années, il termina sa vie dans le Tafilalet, où son mausolée est encore visité.",
    sections: [
      ["Naissance", ["Il naquit en 442 de l'hégire (1050) dans la région de Tadla, dans le Moyen Atlas, où son aïeul Moulay ʿImrane ibn Salem avait émigré. Il grandit dans une période troublée, marquée par les rivalités tribales et la lutte entre les Fatimides et le chef berbère Musa ibn Abi al-ʿAfiya, jusqu'à l'avènement de l'Almoravide Yusuf ibn Tashfin."]],
      ["Le pèlerinage et al-Ghazali", ["Vers 1096, il partit en pèlerinage avec son frère ʿAbd ar-Rahman. Ils y rencontrèrent l'imam Abu Hamid al-Ghazali, dont ils suivirent l'enseignement plusieurs années, jusqu'à la mort de ʿAbd ar-Rahman à Médine. Mimoun rentra au Maroc à l'époque des premiers soulèvements des Almohades contre le pouvoir almoravide."]],
      ["Famille et décès", ["Il épousa sa cousine, avec qui il eut cinq enfants, et fut enterré près d'Errachidia, au village de Zaouiat Sidi Boukil, dans le Tafilalet, où se trouve son mausolée. Les arbres généalogiques du Shaykh Mohamed Faouzi Al Karkari et de son épouse se rejoignent au niveau de Mimoun."]],
      ["Les Bani Wakil", ["Après lui, la tribu des Bani Wakil se divisa en quatre groupes de chérifs idrissides : Ankad, Trifa, les Bani Wakil al-Mawakhikh (qui tirent leur nom de son fils Sidi Mkhoukh) et les Ouled Sidi Moussa. Son lointain descendant Muhammad ibn Qaddour porte le nom d'« al-Wakili » ou « al-Boukili » en référence à lui."]],
    ],
  }),

  L({
    cle: "Moulay ʿIssa Makhoukh", slug: "sidi-makhoukh", nom: "Sidi ʿIssa ibn Mimoun, dit Makhoukh",
    sous: "XIIe siècle · Errachidia et Oriental · fils de Mimoun Abu Wakil",
    intro: "Sidi ʿIssa ibn Mimoun, connu dans plusieurs ouvrages sous le nom de Sidi Makhoukh, est l'un des fils de Mimoun Abu Wakil. Installé près d'Oujda, il a laissé une trace durable dans la mémoire locale : son mausolée se trouve à El Aïoun Sidi Mellouk.",
    sections: [
      ["Enfance et installation", ["Il grandit dans le village d'Ighejd, dans la province d'Errachidia, puis s'installa près d'Oujda, à El Aïoun Sidi Mellouk, où il mourut."]],
      ["Mémoire locale", ["Un mausolée fut élevé sur sa tombe, et de nombreux bâtiments publics de la ville portent aujourd'hui son nom."]],
      ["Descendance", ["Parmi ses enfants figure Sidi ʿAli ibn ʿIssa, dont descendent, de génération en génération, Moulay Mohamed, Moulay al-Hassan, Moulay ʿIssa, Moulay Yahya, Moulay Zakariya, Moulay ʿAbd al-ʿAziz, Moulay Abdallah, Moulay ʿAbd ar-Rahman, Moulay Yahya, Moulay ibn Zayd, Moulay Ibrahim, Moulay Yaʿqub, Moulay ʿAli, Moulay Moussa puis Sidi ʿAli ibn Moussa."]],
    ],
  }),

  L({
    cle: "Moulay ʿAli Ibn Moussa", slug: "ali-ibn-moussa", nom: "Sidi ʿAli ibn Moussa",
    sous: "XVIe siècle · al-Aroui (Rif oriental) · participant à la bataille des trois rois",
    intro: "Sidi ʿAli ibn Moussa fut un maître religieux du Rif oriental qui vécut au XVIe siècle, sous la dynastie saadienne. Il est connu pour avoir pris part à la bataille des trois rois (1578). Son mausolée se trouve à al-Aroui.",
    sections: [
      ["Un maître du Rif oriental", ["Fils de Sidi Moussa ibn ʿAli, il appartenait à une famille de chérifs établie dans le Rif oriental. Il exerça comme maître religieux auprès des populations de la région."]],
      ["La bataille des trois rois", ["En 1578, la bataille de Ksar el-Kébir (ou « bataille des trois rois ») opposa le sultan saadien ʿAbd al-Malik, accompagné de son frère Ahmad al-Mansur, au roi du Portugal Sébastien Ier, soutenu par le sultan déchu al-Mutawakkil. L'armée marocaine l'emporta totalement ; le roi Sébastien et al-Mutawakkil périrent, et la défaite fut suivie de l'annexion du Portugal par la couronne d'Espagne. Sidi ʿAli ibn Moussa figurait parmi les participants."]],
      ["Retour et décès", ["Il regagna sa région d'origine, à al-Aroui, où il fut enterré. Son mausolée se trouve à côté de celui de son père, dans le cimetière portant son nom à l'entrée de la ville."]],
      ["Les mausolées du Rif oriental", ["Depuis le XVIe siècle, douze ascendants du Shaykh Mohamed Faouzi Al Karkari ont été inhumés entre al-Aroui et Tamsaman, dans des mausolées surmontés d'un dôme. Beaucoup étaient des juristes et des maîtres spirituels. De Sidi ʿAli ibn Moussa descendent, dans l'ordre, Moulay Mohamed, Moulay al-ʿArbi, Moulay Ahmad, Moulay ʿAbd al-Qadir et Muhammad ibn Qaddour al-Wakili."]],
    ],
  }),

  L({
    cle: "Moulay Muhammad al-Fardiy", slug: "muhammad-al-fardi", nom: "Mawlay Muhammad al-Fardi",
    sous: "XIXe-XXe siècle · Montagne de Karkar (Rif) · père de Mawlay at-Tahir",
    intro: "Mawlay Muhammad al-Fardi est le petit-fils d'Ibn Qaddour, le père de Mawlay at-Tahir et le grand-père de Mawlay al-Hassan. Il était réputé dans le Rif pour sa droiture et son honnêteté.",
    sections: [
      ["Éducation", ["Il fut éduqué par son père, Mawlay at-Tayyib, fils aîné d'Ibn Qaddour, qui insistait particulièrement sur la sincérité et l'honnêteté."]],
      ["Une réputation de droiture", ["Une anecdote rapportée par sa famille illustre cette réputation : à l'époque du protectorat, alors qu'il se rendait à Fès, il fut arrêté avec les autres voyageurs à un barrage de contrôle. Tous prétendaient ne pas avoir d'argent sur eux ; lui reconnut en avoir et dit le montant. Ses interlocuteurs, incrédules, se moquèrent de lui et le laissèrent passer sans le fouiller."]],
      ["Descendance", ["Il fut le père de Mawlay at-Tahir, qui rejoignit Ahmad al-ʿAlawi, fonda la zawiya de Tamsaman et fut à son tour le père de Mawlay al-Hassan. Mawlay at-Tahir compta son propre père parmi ses disciples."]],
    ],
  }),
];
