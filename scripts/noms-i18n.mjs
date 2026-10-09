/* Noms des maillons (chaîne de transmission, lignée chérifienne) dans les autres langues :
   en arabe, en écriture arabe ; en anglais, seuls les libellés français sont traduits. */
const cle = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]+/g, "");

const AR = {
  "Shaykh Sidi Mohamed Faouzi Al Karkari": "الشيخ سيدي محمد فوزي الكركري",
  "Sidi Mawlay al-Hassan": "سيدي مولاي الحسن",
  "Sidi Mawlay at-Tahir": "سيدي مولاي الطاهر",
  "Sidi Ahmad al-‘Alawi al-Mustaghanemi": "سيدي أحمد العلوي المستغانمي",
  "Sidi Muhammad ibn al-Habib al-Bouzidi": "سيدي محمد بن الحبيب البوزيدي",
  "Sidi Muhammad ibn Qaddour al-Wakili": "سيدي محمد بن القدور الوكيلي",
  "Sidi Muhammad ibn ‘AbdelQadir al-Bacha": "سيدي محمد بن عبد القادر الباشا",
  "Le Shaykh sidi Abu Ya’za al-Mahaji": "الشيخ سيدي أبو يعزى المهاجي",
  "Sidi Mawlay al-‘Arbi ad-Darqawi": "سيدي مولاي العربي الدرقاوي",
  "Sidi ‘Ali al-Jamal": "سيدي علي الجمل",
  "Sidi Muhammad al-‘Arbi al-Fasi": "سيدي محمد العربي الفاسي",
  "Sidi Ahmad ibn ‘AbdiLlah": "سيدي أحمد بن عبد الله",
  "Sidi Qassim al-Khassassi": "سيدي قاسم الخصاصي",
  "Sidi Muhammad ibn ‘AbdiLlah": "سيدي محمد بن عبد الله",
  "Sidi ‘AbdarRahman al-Fasi": "سيدي عبد الرحمن الفاسي",
  "Sidi Abu al-Mahasin Yusuf al-Fasi": "سيدي أبو المحاسن يوسف الفاسي",
  "Sidi AbdarRahman al-Majdhoub": "سيدي عبد الرحمن المجذوب",
  "Sidi ‘Ali as-Sanhaji ad-Duwwar": "سيدي علي الصنهاجي الدوّار",
  "Sidi Ibrahim al-Fahham": "سيدي إبراهيم الأفحام",
  "Sidi Ahmad Zarrouq": "سيدي أحمد زروق",
  "Sidi Ahmad al-Hadrami": "سيدي أحمد الحضرمي",
  "Sidi Yahiya ibn Ahmad al-Qadiri": "سيدي يحيى بن أحمد القادري",
  "Sidi Ahmad ibn Wafa": "سيدي أحمد بن وفا",
  "Sidi Muhammad Wafa": "سيدي محمد وفا",
  "Sidi Dawoud al-Makhila": "سيدي داود بن باخلا",
  "Sidi ibn ‘Ata Allah as-Sakandari": "سيدي ابن عطاء الله السكندري",
  "Sidi Abu al-‘Abbas al-Mursi": "سيدي أبو العباس المرسي",
  "Sidi Abu al-Hassan as-Shadhili": "سيدي أبو الحسن الشاذلي",
  "Sidi ‘AbdasSalam ibn Mashish": "سيدي عبد السلام بن مشيش",
  "Abu Ziyed ʿAbd ar-Rahman al-Hassani al-ʿAttar, connu comme al-Ziyyat": "أبو زيد عبد الرحمن الحسني العطار، المعروف بالزيّات",
  "Taqi ad-Din": "تقي الدين", "Fakhr ad-Din": "فخر الدين", "Nourredine": "نور الدين",
  "Muhammad Taj ad-Din": "محمد تاج الدين", "Muhammad Chams ad-Din": "محمد شمس الدين",
  "Zinedine al-Qazwani": "زين الدين القزويني",
  "Abu Ishaq Ibrahim al-Basri": "أبو إسحاق إبراهيم البصري",
  "Abu Qacem Ahmad al-Marwani": "أبو القاسم أحمد المرواني",
  "Abu Muhammad Saʿid": "أبو محمد سعيد", "Saʿd": "سعد", "Fath as-Suʿud": "فتح السعود",
  "Saʿid al-Ghazwani": "سعيد الغزواني",
  "Abu Muhammad Jabir ibn Abdullah": "أبو محمد جابر بن عبد الله",
  "Sayiduna al-Hassan ibn ʿAli": "سيدنا الحسن بن علي",
  "Sayiduna ʿAli ibn Abi Talib": "سيدنا علي بن أبي طالب",
  "Le Prophète Muhammad": "النبي محمد ﷺ",
  // lignée chérifienne
  "Sidi Moulay Tayeb al-Karkari al-Idrissi al-Hassani": "سيدي مولاي الطيب الكركري الإدريسي الحسني",
  "Sidi Moulay at-Tahir al-Karkari": "سيدي مولاي الطاهر الكركري",
  "Moulay Muhammad al-Fardi": "مولاي محمد الفردي", "Moulay Tayeb": "مولاي الطيب",
  "Moulay 'Abd al'Qader": "مولاي عبد القادر", "Moulay Ahmad": "مولاي أحمد", "Moulay al-ʿArbi": "مولاي العربي",
  "Moulay Muhammad": "مولاي محمد", "Moulay ʿAli": "مولاي علي", "Moulay Moussa": "مولاي موسى",
  "Moulay Yaʿqoub": "مولاي يعقوب", "Moulay Ibrahim": "مولاي إبراهيم", "Moulay ibn Zayd": "مولاي ابن زيد",
  "Moulay Yahya": "مولاي يحيى", "Moulay 'Abd ar-Rahman": "مولاي عبد الرحمن", "Moulay ʿAbdullah": "مولاي عبد الله",
  "Moulay ʿAbd al-Aziz": "مولاي عبد العزيز", "Moulay Zakariya": "مولاي زكريا", "Moulay ʿIssa": "مولاي عيسى",
  "Moulay al-Hassan": "مولاي الحسن", "Moulay Mimoune Abu-Wakil": "مولاي ميمون أبو وكيل",
  "Moulay Messʿoud": "مولاي مسعود", "Moulay ʿAzouz": "مولاي عزوز", "Moulay Meʿzouz": "مولاي معزوز",
  "Moulay ʿAlal": "مولاي علال", "Moulay Jaber": "مولاي جابر", "Moulay ʿImrane": "مولاي عمران",
  "Moulay Salem": "مولاي سالم", "Moulay ʿIyyad": "مولاي عياض", "Moulay al-Qacem": "مولاي القاسم",
  "Moulay Idriss al-Azhar": "مولاي إدريس الأزهر", "Moulay Idriss al-Akbar": "مولاي إدريس الأكبر",
  "ʿAbdallah al-Kamil": "عبد الله الكامل", "Moulay Hassan al-Thani": "مولاي الحسن المثنى",
  "Moulay Hassan al-Sebt": "مولاي الحسن السبط", "ʿAli et Fatima az-Zahra": "علي وفاطمة الزهراء",
};
const EN = {
  "Le Shaykh sidi Abu Ya’za al-Mahaji": "Shaykh Sidi Abu Ya’za al-Mahaji",
  "Abu Ziyed ʿAbd ar-Rahman al-Hassani al-ʿAttar, connu comme al-Ziyyat": "Abu Ziyed ʿAbd ar-Rahman al-Hassani al-ʿAttar, known as al-Ziyyat",
  "Le Prophète Muhammad": "The Prophet Muhammad ﷺ",
  "ʿAli et Fatima az-Zahra": "ʿAli and Fatima az-Zahra",
};
const tAR = Object.fromEntries(Object.entries(AR).map(([k, v]) => [cle(k), v]));
const tEN = Object.fromEntries(Object.entries(EN).map(([k, v]) => [cle(k), v]));

/** Nom d'un maillon dans la langue demandée (le français et le nom latin restent tels quels si inconnus). */
export function nomMaillon(nom, code) {
  const n = String(nom).replace(/&amp;/g, "&").trim();
  if (code === "ar") return tAR[cle(n)] || nom;
  if (code === "en") return tEN[cle(n)] || nom;
  return nom;
}
