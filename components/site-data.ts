import { Locale } from "@/lib/i18n";

// Единый телефон подтверждён. Осталось: адрес одной строкой, точная ссылка Google Maps (карточка), фото, цены, Telegram @.
export const contactInfo = {
  phone: "+998 91 868 76 66",
  phoneHref: "tel:+998918687666",
  // Telegram: заменить telegram + telegramHref на подтверждённый @username.
  telegram: "@barakacake",
  telegramHref: "https://t.me/barakacake",
  whatsappHref: "https://wa.me/998918687666",
  instagram: "@baraka__cake",
  instagramHref: "https://www.instagram.com/baraka__cake/",
  // Поиск по точке; заменить на прямую ссылку на карточку заведения, когда будет.
  mapHref: "https://www.google.com/maps/search/?api=1&query=Baraka%20Cake%2C%20Khiva%2C%20Khorezm%2C%20Uzbekistan",
};

export const localeCopy = {
  ru: {
    brandSubtitle: "Кондитерская Хивы",
    menuButton: "Смотреть меню",
    whatsappButton: "WhatsApp",
    heroEyebrow: "Торты и десерты в Хиве",
    heroTitle: "Закажите торт, десерты и выпечку",
    heroAccent: "с доставкой по Хиве",
    heroDescription:
      "Baraka Cake — кондитерская для жителей Хивы. Свежая выпечка каждый день, торты на заказ от 24 часов и удобный заказ через WhatsApp, Telegram или сайт.",
    heroPrimaryCta: "Смотреть каталог",
    heroSecondaryCta: "Заказать в WhatsApp",
    heroBadge: "от 24 часов",
    heroCardEyebrow: "Торт на заказ",
    heroTitleCard: "Торт для дня рождения, свадьбы и семейного праздника",
    heroFacts: ["Медовик, шоколад, фисташка", "от 1 кг и больше", "Заказ через WhatsApp и сайт"],
    heroFactLabels: ["Начинки", "Вес", "Заказ"],
    heroQuickFacts: ["Доставка по Хиве", "Торты от 24 часов", "Самовывоз и быстрый заказ"],
    featuredEyebrow: "Популярное",
    featuredTitle: "Популярные торты и десерты",
    featuredDescription: "Популярные торты и десерты для дома, гостей и праздников.",
    viewCatalog: "Смотреть в каталоге",
    customEyebrow: "Торты на заказ",
    customTitle: "Торты на заказ для дня рождения, свадьбы и семейных праздников",
    customDescription: "Выберите вес, начинку, оформление и дату. Мы быстро свяжемся с вами и подтвердим заказ.",
    customFormEyebrow: "Что уточним при заказе",
    customFormTitle: "Вес, начинку, оформление и дату",
    customFormFields: ["Вес торта", "Начинка", "Декор", "Дата", "Комментарий"],
    openForm: "Открыть форму",
    contactCta: "Связаться",
    benefitsEyebrow: "Почему выбирают нас",
    benefitsTitle: "Почему удобно заказывать у нас",
    benefitsDescription: "Свежая выпечка каждый день, торты на заказ от 24 часов и быстрый заказ без лишних звонков.",
    deliveryEyebrow: "Доставка по Хиве",
    deliveryTitle: "Заказать удобно — получить вовремя",
    deliveryDescription:
      "Узнайте условия доставки, время работы и удобный способ связи. Для срочных заказов доступны WhatsApp, Telegram и звонок.",
    deliveryItems: [
      { label: "Доставка", value: "По Хиве ежедневно", icon: "▣" },
      { label: "Самовывоз", value: "Заберите в удобное время", icon: "◫" },
      { label: "WhatsApp", value: "Быстрый заказ в мессенджере", icon: "◌" },
      { label: "Время", value: "Ежедневно: 08:00 - 22:00", icon: "◍" },
    ],
    deliveryPanelEyebrow: "Связь для заказа",
    deliveryPanelTitle: "WhatsApp, Telegram и звонок",
    deliveryPanelDescription: "Напишите нам, если нужен торт на заказ, десерты к празднику или быстрая доставка по городу.",
    reviewsEyebrow: "Отзывы",
    reviewsTitle: "Что говорят наши клиенты",
    reviewsDescription: "Короткие отзывы о заказах, доставке и свежей выпечке.",
    aboutEyebrow: "О нас",
    aboutTitle: "Baraka Cake для жителей Хивы",
    aboutDescription:
      "Мы делаем торты, десерты и выпечку на каждый день и к праздникам. На сайте можно быстро выбрать нужный формат заказа и связаться удобным способом.",
    aboutText: [
      "Baraka Cake — современная кондитерская Хивы, где хочется взять торт домой, к гостям и на праздник.",
      "Нам важны аккуратный вкус, понятный заказ и тёплая подача без лишнего пафоса.",
      "Город чувствуется в палитре, ритме и настроении, а в центре всегда остаётся продукт.",
    ],
    footerDescription:
      "Современная кондитерская Хивы: торты, десерты, выпечка и аккуратная доставка для семейных и праздничных поводов.",
    orderCake: "Заказать торт",
    openAddress: "Открыть адрес",
    quickLinks: "Быстрые ссылки",
    contacts: "Контакты",
    priceFromLabel: "от",
    phoneLabel: "Телефон",
    telegramLabel: "Telegram",
    instagramLabel: "Instagram",
    whatsappLabel: "WhatsApp",
    addressLabel: "Адрес",
    hoursLabel: "Часы работы",
    callButton: "Позвонить",
    orderButton: "Заказать",
    howOrderEyebrow: "Как заказать",
    howOrderTitle: "Три простых шага до вашего заказа",
    howOrderDescription: "Короткий и понятный сценарий для торта на заказ, десертов к гостям и быстрой доставки по Хиве.",
    howOrderSteps: [
      { title: "Выберите товар", description: "Откройте каталог или страницу тортов на заказ и найдите нужный формат." },
      { title: "Напишите нам", description: "Свяжитесь через WhatsApp, Telegram или по телефону и уточните детали." },
      { title: "Получите заказ", description: "Заберите самовывозом или оформите доставку по Хиве на удобное время." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Частые вопросы перед заказом",
    faqDescription: "Быстрые ответы на самые частые вопросы перед оформлением заказа.",
    faqItems: [
      { question: "За сколько можно заказать торт?", answer: "Базовый срок для тортов на заказ — от 24 часов. Срочные заказы уточняются отдельно." },
      { question: "Есть ли доставка по Хиве?", answer: "Да, мы доставляем по Хиве и ближайшим районам. Точное время подтверждаем при оформлении." },
      { question: "Можно ли забрать заказ самовывозом?", answer: "Да, самовывоз доступен ежедневно в рабочие часы кондитерской." },
      { question: "Как оплатить заказ?", answer: "Способ оплаты уточняется при подтверждении заказа в WhatsApp, Telegram или по телефону." },
    ],
    catalogTitle: "Каталог",
    catalogHeading: "Каталог Baraka Cake",
    catalogDescription:
      "Каталог устроен просто: категории, понятные карточки, описание и цены. Выберите нужный товар и перейдите к заказу удобным способом.",
    quickPreview: "Быстрый просмотр",
    details: "Подробнее",
    customPageEyebrow: "Торты на заказ",
    customPageTitle: "Отдельная страница для праздников",
    customPageDescription:
      "Здесь не каталог, а понятная воронка заказа: примеры, выбор веса, начинки, декора, даты и удобный канал связи.",
    orderForm: "Форма заказа",
    submitRequest: "Отправить заявку",
    contactsHeading: "Связаться с Baraka Cake",
    deliveryPageEyebrow: "Доставка",
    deliveryPageTitle: "Условия доставки по Хиве",
    locationsEyebrow: "Локации",
    locationsTitle: "Где нас найти в Хиве",
    mainLocation: "Основная точка",
    locationsDescription: "Удобная локация рядом с Ичан-Калой, чтобы бренд ощущался локальным и близким жителям города.",
  },
  en: {
    brandSubtitle: "Khiva Bakery",
    menuButton: "View menu",
    whatsappButton: "WhatsApp",
    heroEyebrow: "Cakes and desserts in Khiva",
    heroTitle: "Order cakes, desserts and pastries",
    heroAccent: "with delivery across Khiva",
    heroDescription:
      "Baraka Cake is a bakery for Khiva residents. Fresh pastries every day, custom cakes from 24 hours, and easy ordering via WhatsApp, Telegram or the website.",
    heroPrimaryCta: "View catalog",
    heroSecondaryCta: "Order on WhatsApp",
    heroBadge: "from 24 hours",
    heroCardEyebrow: "Custom cake",
    heroTitleCard: "Cake for birthdays, weddings and family celebrations",
    heroFacts: ["Honey cake, chocolate, pistachio", "from 1 kg and up", "Order via WhatsApp and website"],
    heroFactLabels: ["Flavors", "Weight", "Order"],
    heroQuickFacts: ["Delivery in Khiva", "Custom cakes from 24 hours", "Pickup and fast ordering"],
    featuredEyebrow: "Popular",
    featuredTitle: "Popular cakes and desserts",
    featuredDescription: "Popular cakes and desserts for home, guests and celebrations.",
    viewCatalog: "View in catalog",
    customEyebrow: "Custom cakes",
    customTitle: "Custom cakes for birthdays, weddings and family celebrations",
    customDescription: "Choose weight, filling, decoration and date. We will contact you quickly and confirm the order.",
    customFormEyebrow: "What we clarify",
    customFormTitle: "Weight, filling, decoration and date",
    customFormFields: ["Cake weight", "Filling", "Decoration", "Date", "Comment"],
    openForm: "Open form",
    contactCta: "Contact us",
    benefitsEyebrow: "Why choose us",
    benefitsTitle: "Why it is easy to order from us",
    benefitsDescription: "Fresh pastries every day, custom cakes from 24 hours and quick ordering without extra calls.",
    deliveryEyebrow: "Delivery in Khiva",
    deliveryTitle: "Easy to order, on time to receive",
    deliveryDescription:
      "Check delivery terms, opening hours and the easiest way to contact us. For urgent orders, WhatsApp, Telegram and calls are available.",
    deliveryItems: [
      { label: "Delivery", value: "Across Khiva every day", icon: "▣" },
      { label: "Pickup", value: "Collect at your convenient time", icon: "◫" },
      { label: "WhatsApp", value: "Fast order in messenger", icon: "◌" },
      { label: "Hours", value: "Daily: 08:00 - 22:00", icon: "◍" },
    ],
    deliveryPanelEyebrow: "Contact for orders",
    deliveryPanelTitle: "WhatsApp, Telegram and phone",
    deliveryPanelDescription: "Message us if you need a custom cake, desserts for a celebration or fast city delivery.",
    reviewsEyebrow: "Reviews",
    reviewsTitle: "What our customers say",
    reviewsDescription: "Short reviews about orders, delivery and fresh pastries.",
    aboutEyebrow: "About us",
    aboutTitle: "Baraka Cake for Khiva residents",
    aboutDescription:
      "We make cakes, desserts and pastries for everyday life and celebrations. On the site you can quickly choose the right order format and contact us in the easiest way.",
    aboutText: [
      "Baraka Cake is a modern bakery in Khiva where you want to order a cake for home, guests and celebrations.",
      "We care about balanced taste, clear ordering and warm presentation without extra luxury talk.",
      "Khiva is felt in the palette, rhythm and atmosphere, while the product always stays in the center.",
    ],
    footerDescription:
      "A modern Khiva bakery with cakes, desserts, pastries and careful delivery for family and festive moments.",
    orderCake: "Order a cake",
    openAddress: "Open address",
    quickLinks: "Quick links",
    contacts: "Contacts",
    priceFromLabel: "from",
    phoneLabel: "Phone",
    telegramLabel: "Telegram",
    instagramLabel: "Instagram",
    whatsappLabel: "WhatsApp",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    callButton: "Call",
    orderButton: "Order",
    howOrderEyebrow: "How to order",
    howOrderTitle: "Three simple steps to your order",
    howOrderDescription: "A clear path for custom cakes, desserts for guests and quick delivery in Khiva.",
    howOrderSteps: [
      { title: "Choose a product", description: "Open the catalog or custom cakes page and select the format you need." },
      { title: "Message us", description: "Contact us via WhatsApp, Telegram or phone and confirm the details." },
      { title: "Receive your order", description: "Pick it up yourself or arrange delivery in Khiva at a convenient time." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    faqDescription: "Quick answers to the most common questions before placing an order.",
    faqItems: [
      { question: "How early should I order a cake?", answer: "The basic lead time for custom cakes is from 24 hours. Urgent requests are confirmed separately." },
      { question: "Do you deliver in Khiva?", answer: "Yes, we deliver across Khiva and nearby areas. The exact time is confirmed during ordering." },
      { question: "Can I pick up the order myself?", answer: "Yes, pickup is available every day during bakery opening hours." },
      { question: "How do I pay for the order?", answer: "The payment method is clarified when we confirm the order in WhatsApp, Telegram or by phone." },
    ],
    catalogTitle: "Catalog",
    catalogHeading: "Baraka Cake Catalog",
    catalogDescription:
      "The catalog is simple: categories, clear cards, descriptions and prices. Choose what you need and move to the easiest ordering method.",
    quickPreview: "Quick view",
    details: "Details",
    customPageEyebrow: "Custom cakes",
    customPageTitle: "A separate page for celebrations",
    customPageDescription:
      "This is not a catalog but a clear order flow: examples, weight, filling, decoration, date and a convenient contact channel.",
    orderForm: "Order form",
    submitRequest: "Send request",
    contactsHeading: "Contact Baraka Cake",
    deliveryPageEyebrow: "Delivery",
    deliveryPageTitle: "Delivery terms in Khiva",
    locationsEyebrow: "Locations",
    locationsTitle: "Where to find us in Khiva",
    mainLocation: "Main location",
    locationsDescription: "A convenient spot near Itchan Kala so the brand feels local and close to city residents.",
  },
  uz: {
    brandSubtitle: "Xiva qandolatchiligi",
    menuButton: "Menyuni ko‘rish",
    whatsappButton: "WhatsApp",
    heroEyebrow: "Xivadagi tort va desertlar",
    heroTitle: "Tort, desert va pishiriqlarni buyurtma qiling",
    heroAccent: "Xiva bo‘ylab yetkazib berish bilan",
    heroDescription:
      "Baraka Cake — Xiva aholisi uchun qandolatchilik. Har kuni yangi pishiriqlar, 24 soatdan boshlab buyurtma tortlar va WhatsApp, Telegram yoki sayt orqali qulay buyurtma.",
    heroPrimaryCta: "Katalogni ko‘rish",
    heroSecondaryCta: "WhatsApp orqali buyurtma",
    heroBadge: "24 soatdan boshlab",
    heroCardEyebrow: "Buyurtma tort",
    heroTitleCard: "Tug‘ilgan kun, to‘y va oilaviy bayramlar uchun tort",
    heroFacts: ["Medovik, shokolad, pista", "1 kg dan boshlab", "WhatsApp va sayt orqali buyurtma"],
    heroFactLabels: ["Nachinkalar", "Og‘irlik", "Buyurtma"],
    heroQuickFacts: ["Xiva bo‘ylab yetkazib berish", "Tortlar 24 soatdan boshlab", "Olib ketish va tezkor buyurtma"],
    featuredEyebrow: "Mashhur",
    featuredTitle: "Mashhur tort va desertlar",
    featuredDescription: "Uy, mehmonlar va bayramlar uchun mashhur tort va desertlar.",
    viewCatalog: "Katalogda ko‘rish",
    customEyebrow: "Buyurtma tortlar",
    customTitle: "Tug‘ilgan kun, to‘y va oilaviy bayramlar uchun buyurtma tortlar",
    customDescription: "Og‘irlik, nachinka, bezak va sanani tanlang. Biz tez bog‘lanib buyurtmani tasdiqlaymiz.",
    customFormEyebrow: "Nimani aniqlaymiz",
    customFormTitle: "Og‘irlik, nachinka, bezak va sana",
    customFormFields: ["Tort og‘irligi", "Nachinka", "Bezak", "Sana", "Izoh"],
    openForm: "Formani ochish",
    contactCta: "Biz bilan bog‘lanish",
    benefitsEyebrow: "Nega biz",
    benefitsTitle: "Nega bizdan buyurtma berish qulay",
    benefitsDescription: "Har kuni yangi pishiriqlar, 24 soatdan buyurtma tortlar va ortiqcha qo‘ng‘iroqlarsiz tez buyurtma.",
    deliveryEyebrow: "Xiva bo‘ylab yetkazib berish",
    deliveryTitle: "Buyurtma qulay — olish o‘z vaqtida",
    deliveryDescription:
      "Yetkazib berish shartlari, ish vaqti va qulay aloqa usulini ko‘ring. Shoshilinch buyurtmalar uchun WhatsApp, Telegram va qo‘ng‘iroq mavjud.",
    deliveryItems: [
      { label: "Yetkazib berish", value: "Har kuni Xiva bo‘ylab", icon: "▣" },
      { label: "Olib ketish", value: "Qulay vaqtda olib keting", icon: "◫" },
      { label: "WhatsApp", value: "Messenjerdan tez buyurtma", icon: "◌" },
      { label: "Vaqt", value: "Har kuni: 08:00 - 22:00", icon: "◍" },
    ],
    deliveryPanelEyebrow: "Buyurtma uchun aloqa",
    deliveryPanelTitle: "WhatsApp, Telegram va telefon",
    deliveryPanelDescription: "Buyurtma tort, bayram desertlari yoki tez yetkazib berish kerak bo‘lsa, bizga yozing.",
    reviewsEyebrow: "Fikrlar",
    reviewsTitle: "Mijozlarimiz nima deydi",
    reviewsDescription: "Buyurtmalar, yetkazib berish va yangi pishiriqlar haqidagi qisqa fikrlar.",
    aboutEyebrow: "Biz haqimizda",
    aboutTitle: "Baraka Cake — Xiva aholisi uchun",
    aboutDescription:
      "Biz har kunlik va bayramlar uchun tortlar, desertlar va pishiriqlar tayyorlaymiz. Saytda buyurtma formatini tez tanlab, qulay usulda bog‘lanishingiz mumkin.",
    aboutText: [
      "Baraka Cake — Xivadagi zamonaviy qandolatchilik, bu yerda uyga, mehmonlarga va bayramga tort buyurtma qilgingiz keladi.",
      "Biz uchun muhim narsa — muvozanatli ta’m, tushunarli buyurtma va ortiqcha dabdabasiz iliq taqdimot.",
      "Xiva kayfiyati palitra, ritm va atmosferada seziladi, lekin markazda doim mahsulot turadi.",
    ],
    footerDescription:
      "Oila davrasi va bayramlar uchun tortlar, desertlar, pishiriqlar va ehtiyotkorlik bilan yetkazib berishga ega zamonaviy Xiva qandolatchiligi.",
    orderCake: "Tort buyurtma qilish",
    openAddress: "Manzilni ochish",
    quickLinks: "Foydali havolalar",
    contacts: "Bog‘lanish",
    priceFromLabel: "so‘mdan boshlab",
    phoneLabel: "Telefon",
    telegramLabel: "Telegram",
    instagramLabel: "Instagram",
    whatsappLabel: "WhatsApp",
    addressLabel: "Manzil",
    hoursLabel: "Ish vaqti",
    callButton: "Qo‘ng‘iroq",
    orderButton: "Buyurtma berish",
    howOrderEyebrow: "Qanday buyurtma berish mumkin?",
    howOrderTitle: "Buyurtmagacha bo‘lgan uchta oddiy qadam",
    howOrderDescription: "Buyurtma tort, mehmonlar uchun desertlar va tez yetkazib berish uchun tushunarli yo‘l.",
    howOrderSteps: [
      { title: "Mahsulotni tanlang", description: "Katalog yoki buyurtma tortlar sahifasini ochib, kerakli formatni tanlang." },
      { title: "Bizga yozing", description: "WhatsApp, Telegram yoki telefon orqali bog‘lanib, buyurtma tafsilotlarini kelishib oling." },
      { title: "Buyurtmani oling", description: "Qulay vaqtda olib keting yoki Xiva bo‘ylab yetkazib berishni tanlang." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Ko‘p so‘raladigan savollar",
    faqDescription: "Buyurtma berishdan oldingi eng ko‘p so‘raladigan savollarga qisqa javoblar.",
    faqItems: [
      { question: "Tortni necha oldin buyurtma qilish kerak?", answer: "Buyurtma tortlar uchun asosiy muddat 24 soatdan boshlanadi. Shoshilinch buyurtmalar alohida kelishiladi." },
      { question: "Xiva bo‘ylab yetkazib berish bormi?", answer: "Ha, Xiva va yaqin hududlarga yetkazib beramiz. Aniq vaqt buyurtma tasdiqlanganda aytiladi." },
      { question: "Buyurtmani o‘zim olib ketsam bo‘ladimi?", answer: "Ha, qandolatchilik ish vaqtida har kuni olib ketish mumkin." },
      { question: "Buyurtma qanday to‘lanadi?", answer: "To‘lov usuli WhatsApp, Telegram yoki telefon orqali buyurtmani tasdiqlashda kelishiladi." },
    ],
    catalogTitle: "Mahsulotlar",
    catalogHeading: "Baraka Cake mahsulotlari",
    catalogDescription:
      "Mazali tortlar, desertlar va pishiriqlarni tanlang. Buyurtma berish oson va qulay.",
    quickPreview: "Tez ko‘rish",
    details: "Batafsil",
    customPageEyebrow: "Buyurtma tortlar",
    customPageTitle: "Bayramlar uchun alohida sahifa",
    customPageDescription:
      "Bu katalog emas, balki aniq buyurtma yo‘li: misollar, og‘irlik, nachinka, bezak, sana va qulay aloqa kanali.",
    orderForm: "Buyurtma formasi",
    submitRequest: "So‘rov yuborish",
    contactsHeading: "Baraka Cake bilan bog‘lanish",
    deliveryPageEyebrow: "Yetkazib berish",
    deliveryPageTitle: "Xiva bo‘yicha yetkazib berish shartlari",
    locationsEyebrow: "Manzillar",
    locationsTitle: "Xivada bizni qayerdan topish mumkin",
    mainLocation: "Asosiy nuqta",
    locationsDescription: "Brend mahalliy va shahar aholisiga yaqin sezilishi uchun Ichan-Qal’aga yaqin qulay joy.",
  },
} satisfies Record<Locale, Record<string, unknown>>;

const productCopy = {
  ru: {
    "date-caramel-cake": {
      title: "Финиковый торт с карамелью",
      description: "Нежный бисквит, крем на сливках и тёплый восточный акцент.",
      category: "Торты",
      unit: "за торт",
    },
    "baraka-pastry-box": {
      title: "Набор пирожных Baraka",
      description: "Ассорти для семьи, гостей и подарка без лишней суеты.",
      category: "Пирожные",
      unit: "за набор",
    },
    "khiva-honey-cake": {
      title: "Медовик Хива",
      description: "Лёгкий медовый вкус, мягкий крем и ровная праздничная подача.",
      category: "Торты",
      unit: "за торт",
    },
    "baklava-selection": {
      title: "Пахлава и восточные сладости",
      description: "Для чаепития дома, в офисе или к семейному столу.",
      category: "Восточные сладости",
      unit: "за порцию",
    },
  },
  en: {
    "date-caramel-cake": {
      title: "Date cake with caramel",
      description: "Tender sponge, cream and a warm eastern accent.",
      category: "Cakes",
      unit: "per cake",
    },
    "baraka-pastry-box": {
      title: "Baraka pastry box",
      description: "An assortment for family, guests and gifting without fuss.",
      category: "Pastries",
      unit: "per box",
    },
    "khiva-honey-cake": {
      title: "Khiva honey cake",
      description: "Light honey taste, soft cream and a neat festive presentation.",
      category: "Cakes",
      unit: "per cake",
    },
    "baklava-selection": {
      title: "Baklava and eastern sweets",
      description: "For tea at home, in the office or for the family table.",
      category: "Eastern sweets",
      unit: "per serving",
    },
  },
  uz: {
    "date-caramel-cake": {
      title: "Karamelli xurmo torti",
      description: "Yumshoq biskvit, qaymoqli krem va iliq sharqona urg‘u.",
      category: "Tortlar",
      unit: "tort uchun",
    },
    "baraka-pastry-box": {
      title: "Baraka pirojniy to‘plami",
      description: "Oila, mehmonlar va sovg‘a uchun ortiqcha tashvishsiz assorti.",
      category: "Pirojniylar",
      unit: "to‘plam uchun",
    },
    "khiva-honey-cake": {
      title: "Xiva medovigi",
      description: "Yengil asal ta’mi, yumshoq krem va bayramona ko‘rinish.",
      category: "Tortlar",
      unit: "tort uchun",
    },
    "baklava-selection": {
      title: "Pahlava va sharq shirinliklari",
      description: "Uyda, ofisda yoki oilaviy dasturxonda choy uchun.",
      category: "Sharq shirinliklari",
      unit: "portsiya uchun",
    },
  },
} as const;

const aboutTitles = {
  ru: ["Интерьер", "Упаковка", "Десерты", "Витрина"],
  en: ["Interior", "Packaging", "Desserts", "Showcase"],
  uz: ["Interyer", "Qadoq", "Desertlar", "Vitrina"],
} as const;

/** Только сумма с пробелами; валюта добавляется при показе (RU/EN/UZ по-разному). */
const baseProducts = [
  {
    id: "date-caramel-cake",
    slug: "date-caramel-cake",
    priceFrom: "169 000",
    image: "/images/products/product-date-caramel-cake.jpg",
    imageAlt: "Date cake with caramel from Baraka Cake",
    isPopular: true,
  },
  {
    id: "baraka-pastry-box",
    slug: "baraka-pastry-box",
    priceFrom: "79 000",
    image: "/images/products/product-baraka-pastry-box.jpg",
    imageAlt: "Baraka pastry box",
    isPopular: true,
  },
  {
    id: "khiva-honey-cake",
    slug: "khiva-honey-cake",
    priceFrom: "149 000",
    image: "/images/products/product-khiva-honey-cake.jpg",
    imageAlt: "Khiva honey cake from Baraka Cake",
    isPopular: true,
  },
  {
    id: "baklava-selection",
    slug: "baklava-selection",
    priceFrom: "18 000",
    image: "/images/products/product-baklava-selection.jpg",
    imageAlt: "Baklava and eastern sweets from Baraka Cake",
    isPopular: true,
  },
] as const;

export function getCopy(locale: Locale) {
  return localeCopy[locale];
}

/** Убирает хвост валюты из поля товара (БД может содержать «169 000 сум» или «169 000»). */
export function normalizePriceAmount(priceFrom: string): string {
  return priceFrom
    .replace(/\u00a0/g, " ")
    .trim()
    .replace(/\s+(сум|so['ʼ']?m|soum|sum|UZS)\s*$/giu, "")
    .trim();
}

/**
 * UZ: «169 000 so‘mdan boshlab» (сумма без валюты в данных + label из копирайта).
 * RU/EN: «от 169 000 сум» / «from 169 000 сум».
 */
export function formatPriceFromLine(locale: Locale, priceFromLabel: string, priceFrom: string): string {
  const amount = normalizePriceAmount(priceFrom);
  if (locale === "uz") {
    return `${amount} ${priceFromLabel}`;
  }
  return `${priceFromLabel} ${amount} сум`;
}

export function getNavItems(locale: Locale) {
  const labels = {
    ru: ["Главная", "Каталог", "Торты на заказ", "Доставка", "Где мы находимся", "Контакты"],
    en: ["Home", "Catalog", "Custom cakes", "Delivery", "Location", "Contacts"],
    uz: ["Bosh sahifa", "Mahsulotlar", "Buyurtma tortlar", "Yetkazib berish", "Manzil", "Bog‘lanish"],
  }[locale];

  return [
    { href: `/${locale}`, label: labels[0] },
    { href: `/${locale}/catalog`, label: labels[1] },
    { href: `/${locale}/custom-cakes`, label: labels[2] },
    { href: `/${locale}/delivery`, label: labels[3] },
    { href: `/${locale}/locations`, label: labels[4] },
    { href: `/${locale}/contacts`, label: labels[5] },
  ];
}

export function getLocalizedContactInfo(locale: Locale) {
  const localized = {
    ru: {
      address: "Хива, рядом с Ичан-Калой",
      workingHours: "Ежедневно: 07:00 – 21:00",
    },
    en: {
      address: "Khiva, near Itchan Kala",
      workingHours: "Daily: 07:00 – 21:00",
    },
    uz: {
      address: "Xiva, Ichan-Qal’a yaqinida",
      workingHours: "Har kuni: 07:00 – 21:00",
    },
  }[locale];

  return {
    ...contactInfo,
    ...localized,
  };
}

export type SiteCopy = (typeof localeCopy)[Locale];
export type LocalizedContactInfo = ReturnType<typeof getLocalizedContactInfo>;

/** Статические пути к фото hero (тексты карточки — из БД / `getMergedCopy`). */
export function getHeroImageMeta(locale: Locale) {
  return {
    image: "/images/hero/hero-cake.jpg",
    imageAlt:
      locale === "ru"
        ? "Праздничный торт Baraka Cake на светлом фоне"
        : locale === "en"
          ? "Festive Baraka Cake on a light background"
          : "Yorug‘ fondagi bayramona Baraka Cake torti",
  };
}

/** @deprecated используйте `getHeroImageMeta` + тексты из `getMergedCopy` */
export function getHeroContent(locale: Locale) {
  const copy = getCopy(locale);
  return {
    ...getHeroImageMeta(locale),
    badge: copy.heroBadge as string,
    title: copy.heroTitleCard as string,
    facts: copy.heroFacts as string[],
  };
}

/** Статический каталог (fallback, пока в БД нет товаров). */
export function getStaticCatalogProducts(locale: Locale) {
  return baseProducts.map((product) => ({
    ...product,
    ...productCopy[locale][product.id as keyof (typeof productCopy)[typeof locale]],
  }));
}

/** @deprecated используйте getCatalogProducts из @/lib/catalog-data */
export function getFeaturedProducts(locale: Locale) {
  return getStaticCatalogProducts(locale);
}

export function getCustomCakes(locale: Locale) {
  return {
    ru: ["Свадебные торты", "Детские торты", "Праздничные торты", "Корпоративные торты"],
    en: ["Wedding cakes", "Kids cakes", "Celebration cakes", "Corporate cakes"],
    uz: ["To‘y tortlari", "Bolalar tortlari", "Bayram tortlari", "Korporativ tortlar"],
  }[locale];
}

export function getBenefits(locale: Locale) {
  return {
    ru: ["Свежая выпечка каждый день", "Торты на заказ от 24 часов", "Доставка по Хиве", "Заказ через WhatsApp и Telegram"],
    en: ["Fresh pastries every day", "Custom cakes from 24 hours", "Delivery across Khiva", "Ordering via WhatsApp and Telegram"],
    uz: ["Har kuni yangi pishiriqlar", "Tortlar 24 soatdan boshlab", "Xiva bo‘ylab yetkazib berish", "Buyurtma sayt va messenjerlar orqali qabul qilinadi"],
  }[locale];
}

export function getReviews(locale: Locale) {
  return {
    ru: [
      { quote: "Заказывали торт на день рождения. Привезли вовремя, выглядел аккуратно и всем понравился вкус.", author: "Мадина, Хива" },
      { quote: "Удобно, что можно быстро написать в WhatsApp и заказать десерты домой без лишних звонков.", author: "Азиз, Ичан-Кала" },
      { quote: "Брали выпечку и набор пирожных к гостям. Всё свежее, упаковка аккуратная, дети тоже оценили.", author: "Шахноза, Хива" },
    ],
    en: [
      { quote: "We ordered a birthday cake. It arrived on time, looked neat and everyone liked the taste.", author: "Madina, Khiva" },
      { quote: "It is convenient that you can quickly message on WhatsApp and order desserts home without extra calls.", author: "Aziz, Itchan Kala" },
      { quote: "We took pastries and a dessert box for guests. Everything was fresh, the packaging was tidy and the kids loved it too.", author: "Shakhnoza, Khiva" },
    ],
    uz: [
      { quote: "Tug‘ilgan kun uchun tort buyurtma qildik. O‘z vaqtida keldi, chiroyli ko‘rindi va ta’mi hammaga yoqdi.", author: "Madina, Xiva" },
      { quote: "WhatsApp orqali tez yozib, desertlarni uyga buyurtma qilish qulay, ortiqcha qo‘ng‘iroq shart emas.", author: "Aziz, Ichan-Qal’a" },
      { quote: "Mehmonlarga pishiriq va desert to‘plami oldik. Hammasi yangi edi, qadoq ham ozoda, bolalarga ham yoqdi.", author: "Shahnoza, Xiva" },
    ],
  }[locale];
}

export function getDeliveryFacts(locale: Locale) {
  return {
    ru: ["Доставка по Хиве ежедневно", "Торты на заказ — от 24 часов", "Самовывоз и заказ через WhatsApp, Telegram или звонок"],
    en: ["Delivery across Khiva every day", "Custom cakes from 24 hours", "Pickup and ordering via WhatsApp, Telegram or phone"],
    uz: ["Har kuni Xiva bo‘ylab yetkazib berish", "Tortlar 24 soatdan boshlab", "Olib ketish va tezkor buyurtma"],
  }[locale];
}

export function getAboutGallery(locale: Locale) {
  return [
    { title: aboutTitles[locale][0], image: "/images/about/about-interior.jpg", imageAlt: aboutTitles[locale][0] },
    { title: aboutTitles[locale][1], image: "/images/about/about-packaging.jpg", imageAlt: aboutTitles[locale][1] },
    { title: aboutTitles[locale][2], image: "/images/about/about-desserts.jpg", imageAlt: aboutTitles[locale][2] },
    { title: aboutTitles[locale][3], image: "/images/about/about-showcase.jpg", imageAlt: aboutTitles[locale][3] },
  ];
}
