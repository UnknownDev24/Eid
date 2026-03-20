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
  category?: 'fashion' | 'beauty' | 'islamic' | 'footwear' | 'luxury';
  isLocked?: boolean;
  password?: string;
  surpriseContent?: string;
};

export const eidiItems: EidiItem[] = [
  // Cash Eidis
  {
    id: 'cash-1',
    type: 'cash',
    title: 'Nani Ki Eidi',
    description: 'Bade log se aashirwad!',
    personalMessage: 'Use this for something nice, or save it! 💖',
    amount: 5001,
    fromPerson: 'Nani',
  },
  {
    id: 'cash-2',
    type: 'cash',
    title: 'Chachu Ki Eidi',
    description: 'Chachu toh humesha dil-daar hote hain.',
    personalMessage: 'Treat yourself to your favorite coffee today! ☕',
    amount: 2001,
    fromPerson: 'Chachu',
  },
  {
    id: 'cash-3',
    type: 'cash',
    title: 'Bade Papa Ki Eidi',
    description: 'Most awaited envelope...',
    personalMessage: 'For that special thing you wanted to buy. ✨',
    amount: 11001,
    fromPerson: 'Bade Papa',
  },

  // Gift Eidis
  {
    id: 'gift-1',
    type: 'gift',
    title: 'BIBA Festive Kurta Set',
    brand: 'BIBA',
    description: 'A gorgeous festive look just for you.',
    personalMessage: 'Soch raha hoon yeh tujhe kitna suit karega ❤️',
    price: 3499,
    category: 'fashion',
    productUrl: 'https://www.biba.in',
    imageUrl: 'https://images.unsplash.com/photo-1583391733958-65e28a50fac6?w=800&q=80',
  },
  {
    id: 'gift-2',
    type: 'gift',
    title: 'Leather Juttis',
    brand: 'Fabindia',
    description: 'To match your beautiful ethnic outfits.',
    personalMessage: 'Tere chhote chhote paanv ke liye 🤭',
    price: 1899,
    category: 'footwear',
    productUrl: 'https://www.fabindia.com',
    imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80',
  },
  {
    id: 'gift-3',
    type: 'gift',
    title: 'Petal Pout Lip Mask',
    brand: 'Sonrisa',
    description: 'Keep that amazing smile glowing!',
    personalMessage: 'For the softest kisses 😘',
    price: 990,
    category: 'beauty',
    productUrl: 'https://sonrisa.in',
    imageUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800&q=80',
  },
  {
    id: 'gift-4',
    type: 'gift',
    title: 'Crème Vanilla Perfume',
    brand: 'OSSA',
    description: 'A luxurious and sweet fragrance.',
    personalMessage: 'Main chahta hoon teri khushbu har jagah ho ✨',
    price: 899,
    category: 'beauty',
    productUrl: 'https://ossa.in',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
  },
  {
    id: 'gift-5',
    type: 'gift',
    title: 'Jersey Hijab Gift Box',
    description: 'A set of premium soft hijabs.',
    personalMessage: 'You look beautiful in everything MashaAllah 🌙',
    price: 1499,
    category: 'islamic',
    imageUrl: 'https://images.unsplash.com/photo-1589705345759-7b3c2bb08a1f?w=800&q=80',
  },
  {
    id: 'gift-6',
    type: 'gift',
    title: 'Burberry Check Scarf',
    brand: 'Burberry',
    description: 'Iconic luxury for the special one.',
    personalMessage: 'Kyunki tu kisi shehzadi se kam nahi 👑',
    price: 45000,
    category: 'luxury',
    productUrl: 'https://in.burberry.com',
    imageUrl: 'https://images.unsplash.com/photo-1601056543168-52fce1ccafce?w=800&q=80',
  },
  {
    id: 'gift-7',
    type: 'gift',
    title: 'Beauty Hamper',
    brand: 'Nykaa',
    description: 'A collection of your favorite makeup.',
    personalMessage: 'Though you don\'t need any of this to look pretty 💕',
    price: 2499,
    category: 'beauty',
    productUrl: 'https://www.nykaa.com',
    imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
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
