export interface WeddingConfig {
  couple: {
    partner1: string;
    partner2: string;
  };
  date: {
    display: string;
    dayOfWeek: string;
    iso: string;
    rsvpDeadline: string;
    rsvpDeadlineIso: string;
  };
  venue: {
    name: string;
    city: string;
    country: string;
    fullAddress: string;
    googleMapsUrl: string;
  };
  tagline: string;
  eventFlow: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  attire: {
    theme: string;
    description: string;
    colorPalette: Array<{
      name: string;
      hex: string;
    }>;
    men: {
      title: string;
      description: string;
      image: string;
    };
    women: {
      title: string;
      description: string;
      image: string;
    };
  };
  gifts: Array<{
    label: string;
    accountName: string;
    accountNumber: string;
    qrImagePath: string;
  }>;
  rsvp: {
    googleFormUrl: string;
    googleFormFields: {
      name: string;
      attending: string;
      guestCount: string;
      mealPreference: string;
      songRequest: string;
      message: string;
    };
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  story: Array<{
    year: string;
    title: string;
    description: string;
    image: string;
  }>;
  experience: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  gallery: {
    photos: Array<{
      src: string;
      alt: string;
    }>;
  };
  images: {
    hero: string;
    storyDivider: string;
  };
}

const config: WeddingConfig = {
  couple: {
    partner1: "Cedric",
    partner2: "Karen",
  },

  date: {
    display: "November 7, 2026",
    dayOfWeek: "Saturday",
    iso: "2026-11-07",
    rsvpDeadline: "October 1, 2026",
    rsvpDeadlineIso: "2026-10-01",
  },

  venue: {
    name: "Hacienda Solange",
    city: "Tagaytay City",
    country: "Philippines",
    fullAddress: "// TODO: full address",
    googleMapsUrl: "// TODO: Google Maps link",
  },

  tagline:
    "Our story has been written with love, and this day marks the start of its most beautiful chapter. We can't wait to celebrate it with you.",

  eventFlow: [
    {
      time: "3:00 PM",
      title: "Wedding Ceremony",
      description:
        "Join us as we exchange our vows surrounded by the ones we love most. A moment of promises, unity, and the beginning of forever.",
    },
    {
      time: "4:00 PM",
      title: "Cocktail Hour",
      description:
        "Enjoy refreshing drinks and light appetizers while mingling with fellow guests in the garden as the golden hour sets in.",
    },
    {
      time: "5:30 PM",
      title: "Dinner Reception",
      description:
        "A celebration of love with heartfelt toasts, a curated dinner, and stories shared over candlelit tables under the stars.",
    },
    {
      time: "7:30 PM \u2013 Late",
      title: "After Party",
      description:
        "The night is young and the dance floor awaits. Let loose, celebrate, and make memories that will last a lifetime.",
    },
  ],

  attire: {
    theme: "Filipiniana Formal",
    description:
      "We invite our guests to honor Filipino heritage through elegant Filipiniana-inspired attire. Gentlemen in Barong Tagalog and ladies in modern Filipiniana or terno silhouettes, in our wedding color palette.",
    colorPalette: [
      { name: "Blush", hex: "#D4B5A7" },
      { name: "Terracotta", hex: "#A56B5B" },
      { name: "Forest", hex: "#3A4A3B" },
      { name: "Moss", hex: "#A8B88F" },
      { name: "Linen", hex: "#E8E0D5" },
    ],
    men: {
      title: "For the Gentlemen",
      description:
        "A classic Barong Tagalog \u2014 either embroidered jusi or pi\u00f1a fabric \u2014 paired with dark slacks and leather shoes. Keep accessories minimal and elegant.",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&crop=top",
    },
    women: {
      title: "For the Ladies",
      description:
        "A modern Filipiniana dress or terno with butterfly sleeves in soft, muted tones from our palette. Floor-length or tea-length silhouettes are both welcome.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&crop=center",
    },
  },

  gifts: [
    {
      label: "GCash",
      accountName: "// TODO: account name",
      accountNumber: "// TODO: account number",
      qrImagePath: "/images/qr/placeholder-gcash.png",
    },
    {
      label: "Maya",
      accountName: "// TODO: account name",
      accountNumber: "// TODO: account number",
      qrImagePath: "/images/qr/placeholder-maya.png",
    },
    {
      label: "BPI",
      accountName: "// TODO: account name",
      accountNumber: "// TODO: account number",
      qrImagePath: "/images/qr/placeholder-bpi.png",
    },
  ],

  rsvp: {
    googleFormUrl: "// TODO: paste your Google Form URL here",
    googleFormFields: {
      name: "entry.XXXXXX",
      attending: "entry.XXXXXX",
      guestCount: "entry.XXXXXX",
      mealPreference: "entry.XXXXXX",
      songRequest: "entry.XXXXXX",
      message: "entry.XXXXXX",
    },
  },

  faqs: [
    {
      question: "What is the dress code?",
      answer:
        "Filipiniana Formal. Gentlemen in Barong Tagalog and ladies in modern Filipiniana or terno. Please refer to the Attire & Palette section for the approved color palette.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "We recommend arriving 15\u201330 minutes before the ceremony begins at 3:00 PM to get settled and find your seats.",
    },
    {
      question: "Can I bring a plus one?",
      answer:
        "Due to limited seating, we kindly ask that only those named on the invitation attend. If you have questions, please reach out to us directly.",
    },
    {
      question: "Is parking available?",
      answer:
        "Yes, complimentary parking is available at the venue. Attendants will guide you upon arrival.",
    },
    {
      question: "Are children welcome?",
      answer:
        "While we love your little ones, this will be an adults-only celebration. We hope you understand and enjoy a night out!",
    },
  ],

  story: [
    {
      year: "2019",
      title: "The First Hello",
      description:
        "What started as a chance encounter at a gathering of friends quickly became the most meaningful conversation of our lives. From that moment, everything changed.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1000&fit=crop",
    },
    {
      year: "2024",
      title: "The Proposal",
      description:
        "With the golden sun setting over the horizon and the sound of waves as our witness, one knee touched the sand and a forever question was asked.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=1000&fit=crop",
    },
    {
      year: "2026",
      title: "The Celebration",
      description:
        "And now, surrounded by the people who mean the most to us, we begin the next chapter of our story \u2014 together, always.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop",
    },
  ],

  experience: [
    {
      title: "Explore Tagaytay",
      description:
        "Discover the cool mountain breeze, stunning views of Taal Lake, and charming cafes and restaurants that make Tagaytay a beloved destination.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=800&fit=crop",
    },
    {
      title: "Cozy Stays",
      description:
        "From boutique bed-and-breakfasts to hillside villas, find the perfect place to rest before or after the celebration.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=800&fit=crop",
    },
    {
      title: "Spa & Wellness",
      description:
        "Treat yourself to a rejuvenating experience at one of Tagaytay's renowned wellness retreats and hot spring resorts.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=800&fit=crop",
    },
  ],

  gallery: {
    photos: Array.from({ length: 12 }, (_, i) => ({
      src: `/images/prenup/${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `Cedric & Karen - Photo ${i + 1}`,
    })),
  },

  images: {
    hero: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop",
    storyDivider: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&h=600&fit=crop&crop=center",
  },
};

export default config;
