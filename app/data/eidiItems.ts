export type EidiItem = {
  id: string;
  type: 'cash' | 'gift' | 'surprise';
  title: string;
  description: string;
  personalMessage: string;
  amount?: number;
  fromPerson?: string;
  price?: number;
  brand?: string;
  productUrl?: string;
  imageUrl?: string;
  category?: 'fashion' | 'beauty' | 'islamic' | 'footwear' | 'luxury' | 'jewellery' | 'sweets';
  isLocked?: boolean;
  password?: string;
  surpriseContent?: string;
};

export const eidiItems: EidiItem[] = [
  // Cash Eidis
  {
    id: 'cash-1',
    type: 'cash',
    title: 'Eidi',
    description: 'Bade log se aashirwad!',
    personalMessage: 'Use this for something nice, or save it! 💖',
    amount: 5001,
    fromPerson: 'Mee',
  },
  {
    id: 'cash-2',
    type: 'cash',
    title: ' Meri taraf se Eidi',
    description: 'hum hamesa se dil-daar hote hain.',
    personalMessage: 'Treat yourself to your favorite coffee today! ☕',
    amount: 2001,
    fromPerson: 'Mee',
  },
  {
    id: 'cash-3',
    type: 'cash',
    title: 'Prashant Ki Eidi',
    description: 'Most awaited envelope...',
    personalMessage: 'For that special thing you wanted to buy. ✨',
    amount: 11001,
    fromPerson: 'Mee',
  },

  // Gift Eidis
  {
    id: 'gift-1',
    type: 'gift',
    title: 'Festive Kurta Set',
    brand: 'BIBA',
    description: 'A gorgeous festive look just for you.',
    personalMessage: 'Soch raha hoon yeh tumhare kitna suit karega ❤️',
    price: 0,
    category: 'fashion',
    productUrl: 'https://www.nykaafashion.com/libas-mauve-floral-embroidered-straight-kurta-with-lining-pant-with-dupatta-set-of-3/p/20056777',
    imageUrl: 'https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/7/17fece2OLIBAS00039438_2.jpg?rnd=20200526195200&tr=w-256',
  },
  {
    id: 'gift-2',
    type: 'gift',
    title: 'Leather Juttis',
    brand: 'Fabindia',
    description: 'To match your beautiful ethnic outfits.',
    personalMessage: 'Tumhare chhote chhote paanv ke liye 🤭',
    price: 0,
    category: 'footwear',
    productUrl: 'https://www.limeroad.com/copper-pu-padchin-p21930405?imgIdx=0&src_id=merge_feed_story__2&reference_story_id=69b6dfba72154fd088b43920',
    imageUrl: 'https://img0.junaroad.com/uiproducts/21930405/zoom_0-1746711615.jpg',
  },
   {
    id: "gift-payal-1",
    type: "gift",
    title: "Silver Tigress Anklet",
    brand: "Giva",
    description: "925 silver anklet with tiger motifs and alternating beads. Length: 23 cm + 3 cm adjustable. Perfect for sensitive skin.",
    personalMessage: "Har kadam pe yaad aana mera ✨",
    price: 0,
    category: "jewellery",
    productUrl: "https://www.giva.co/products/silver-tigress-anklet",
    imageUrl: "https://www.giva.co/cdn/shop/files/A0190_2.jpg?v=1721710327&width=713"
  },
  {
    id: "gift-earrings-1",
    type: "gift",
    title: "Silver Oxidised Filigree Jhumka Earrings",
    brand: "Eternz",
    description: "Beautiful dome-shaped jhumka earrings with intricate filigree work in oxidized silver finish.",
    personalMessage: "Tumhare bina yeh kaan sahi nahi lagte ❤️",
    price: 0,
    category: "jewellery",
    productUrl: "https://www.eternz.com/products/silver-oxidised-filigree-dome-shaped-jhumka-earrings",
    imageUrl: "https://cdn.eternz.com/thumbnails/products/148028329_259dae56_thumbnail_1024.jpg"
  },
  {
    id: "gift-mithai-1",
    type: "gift",
    title: "Haldiram's Kaju Katli",
    brand: "Haldiram's",
    description: "Premium Kaju Katli made from cashew nuts, silver vark topped. Perfect for gifting.",
    personalMessage: "Thoda meetha, thoda pyaar 💛",
    price: 0,
    category: "sweets",
    productUrl: "https://www.bigbasket.com/pd/40330807/haldirams-kaju-katli-250-g/?z=Ga9BX3pQL&utm_source=google&utm_medium=cpc&utm_term=%7Bkeyword%7D&utm_campaign=Global-PLA%2F&gad_source=1&gad_campaignid=23491480295&gbraid=0AAAAA91V9op97FPaTpn5UgaZCKH2_o9z2&gclid=Cj0KCQjw4PPNBhD8ARIsAMo-iczbpg0WO2Oa-AEyoQqeehQLCd5y59iuC05Hy4OKVoNEBDCh9AgdH8waAlSQEALw_wcB",
    imageUrl: "https://www.bbassets.com/media/uploads/p/l/40330807_4-haldirams-kaju-katli.jpg"
  },
  // Surprise Eidis
  {
    id: 'surprise-1',
    type: 'surprise',
    title: 'Secret Message 💌',
    description: 'A very special message locked away.',
    personalMessage: 'Enter our special date to see this! (Hint: Our Anniversary)',
    isLocked: true,
    password: '1234',
    surpriseContent: 'Eid Mubarak Jaanu! Even though we are from different worlds, my world revolves around you. Hope this little virtual Eidi brings a smile to your face. I love you! ❤️',
  },
  {
    id: 'surprise-2',
    type: 'surprise',
    title: 'Mystery Gift 🎁',
    description: 'Something you\'ve been wanting for a long time.',
    personalMessage: 'Only the key holder can open this treasure.',
    isLocked: true,
    password: '1234',
    surpriseContent: 'Pack your bags! We are going on a romantic weekend getaway next month! ✨✈️',
  }
];
