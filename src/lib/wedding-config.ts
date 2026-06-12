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
    groups: Array<{
      label: string;
      theme: string;
      description: string;
      men: {
        title: string;
        description: string;
        image: string;
        colorPalette: Array<{ name: string; hex: string }>;
      };
      women: {
        title: string;
        description: string;
        image: string;
        colorPalette: Array<{ name: string; hex: string }>;
      };
    }>;
  };
  gifts: Array<{
    label: string;
    accountName: string;
    accountNumber: string;
    qrImagePath?: string;
    logo?: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  accommodations: Array<{
    name: string;
    highlight: string;
    description: string;
    driveTime?: string;
    website?: string;
    phone?: string;
    image: string;
  }>;
  gallery: {
    photos: Array<{
      src: string;
      alt: string;
    }>;
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
    rsvpDeadline: "September 30, 2026",
    rsvpDeadlineIso: "2026-09-30",
  },

  venue: {
    name: "Hacienda Solange Alfonso",
    city: "Cavite",
    country: "Philippines",
    fullAddress: "Hacienda Solange, Alfonso, Cavite, Philippines",
    googleMapsUrl: "https://maps.google.com/?q=Hacienda+Solange+Alfonso+Cavite",
  },

  tagline:
    "Our story has been written with love, and this day marks the start of its most beautiful chapter. We can't wait to celebrate it with you.",

  eventFlow: [
    {
      time: "3:00 PM",
      title: "The vows",
      description:
        "Join us as we exchange our vows surrounded by the ones we love most. A moment of promises, unity, and the beginning of forever.",
    },
    {
      time: "4:00 PM",
      title: "Golden hour drinks",
      description:
        "Enjoy refreshing drinks and light appetizers while mingling with fellow guests in the garden as the golden hour sets in.",
    },
    {
      time: "5:30 PM",
      title: "Sit down & celebrate",
      description:
        "A celebration of love with heartfelt toasts, a curated dinner, and stories shared over candlelit tables under the stars.",
    },
    {
      time: "7:30 PM \u2013 Late",
      title: "Keep the night going",
      description:
        "The night is young and the dance floor awaits. Let loose, celebrate, and make memories that will last a lifetime.",
    },
  ],

  attire: {
    groups: [
      {
        label: "Principal and Secondary Sponsors",
        theme: "Formal",
        description: "",
        men: {
          title: "Gentlemen",
          description:
            "Traditional Barong Tagalog drawn from a warm, understated palette — cream and almond.",
          image: "/images/attire/gentlemen-sponsor.webp",
          colorPalette: [
            { name: "Cream", hex: "#F5ECD7" },
            { name: "Almond", hex: "#E8DAC3" },
          ],
        },
        women: {
          title: "Ladies",
          description:
            "From the soft stillness of sage and dusty sage to the deep, grounded richness of moss and forest green.",
          image: "/images/attire/ladies-sponsor.webp",
          colorPalette: [
            { name: "Sage", hex: "#B3C5A8" },
            { name: "Dusty Sage", hex: "#8FAE82" },
            { name: "Moss", hex: "#6B7F5E" },
            { name: "Forest Green", hex: "#3B4F3A" },
          ],
        },
      },
      {
        label: "All guests",
        theme: "Formal",
        description: "",
        men: {
          title: "Gentlemen",
          description:
            "Formal attire in a palette as warm and unhurried as the earth itself — cream, almond, tan, and brown.",
          image: "/images/attire/gentlemen-guest.webp",
          colorPalette: [
            { name: "Cream", hex: "#F5ECD7" },
            { name: "Almond", hex: "#E8DAC3" },
            { name: "Tan", hex: "#C9A96E" },
            { name: "Brown", hex: "#8B6F47" },
          ],
        },
        women: {
          title: "Ladies",
          description:
            "From the delicate softness of cream and almond to the grounded richness of tan and brown.",
          image: "/images/attire/ladies-guest.webp",
          colorPalette: [
            { name: "Cream", hex: "#F5ECD7" },
            { name: "Almond", hex: "#E8DAC3" },
            { name: "Tan", hex: "#C9A96E" },
            { name: "Brown", hex: "#8B6F47" },
          ],
        },
      },
    ],
  },

  gifts: [
    {
      label: "BDO",
      accountName: "Clarence Cedric Lee",
      accountNumber: "011860037850",
      qrImagePath: "/images/qr/BDO.JPG",
      logo: "/images/logos/bdo.svg",
    },
    {
      label: "BPI",
      accountName: "Clarence Cedric Lee",
      accountNumber: "3729376026",
      qrImagePath: "/images/qr/BPI.PNG",
      logo: "/images/logos/bpi.svg",
    },
  ],

  faqs: [
    {
      question: "What is the dress code?",
      answer:
        "**Principal & Secondary Sponsors:** Gentlemen are requested to wear the traditional Barong Tagalog. Ladies are asked to wear formal gowns in sage, dusty sage, moss, or forest green.\n\n**Guests:** Formal attire in cream, almond, tan, or brown is kindly requested for both gentlemen and ladies.\n\nPlease see the dress code section for further inspiration.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "We recommend arriving 15\u201330 minutes before the ceremony begins at 3:00 PM to get settled and find your seats.",
    },
    {
      question: "Can I bring a plus one?",
      answer:
        "Due to limited seating, we kindly ask that only those named on the invitation attend.",
    },
    {
      question: "Is parking available?",
      answer:
        "Yes, complimentary parking is available at the venue. Attendants will guide you upon arrival.",
    },
  ],

  accommodations: [
    {
      name: "Twin Lakes Hotel Tagaytay",
      highlight: "Best Overall",
      description:
        "An Old European–inspired hotel in the Twin Lakes estate with vineyard and Taal views, warm Filipino hospitality, and easy access along the Tagaytay–Nasugbu highway.",
      driveTime: "≈ 15 min from the venue",
      website: "https://www.twinlakeshotel.com.ph",
      phone: "+63 917 766 7720",
      image: "/images/accommodations/twin-lakes.webp",
    },
    {
      name: "Escala Tagaytay",
      highlight: "Most Popular",
      description:
        "Well-established hotel with gorgeous Taal volcano views, consistently praised for its warm service and beloved breakfast spread.",
      driveTime: "≈ 25 min from the venue",
      website: "https://escalatagaytay.com",
      phone: "+63 2 8519 4444",
      image: "/images/accommodations/escala-tagaytay.webp",
    },
    {
      name: "The Woodlands, Tagaytay Highlands",
      highlight: "Highland Retreat",
      description:
        "Log cabin–style lodgings tucked among the pines of Tagaytay Highlands, with crisp mountain air and sweeping ridge views — a serene escape after the celebration.",
      driveTime: "≈ 50 min from the venue",
      website: "https://www.tagaytayhighlands.com/property/the-woodlands/",
      phone: "+63 917 852 6378",
      image: "/images/accommodations/the-woodlands.webp",
    },
  ],

  gallery: {
    photos: [
      { src: "/images/firsts/k.webp", alt: "Cedric & Karen - First photo together" },
      { src: "/images/firsts/vietnam.webp", alt: "Cedric & Karen - First international travel" },
      { src: "/images/firsts/beach.webp", alt: "Cedric & Karen - First beach trip" },
      { src: "/images/firsts/blackbird.webp", alt: "Cedric & Karen - First date as a couple" },
    ],
  },
};

export default config;
