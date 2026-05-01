export interface WeddingConfig {
  couple: {
    partner1: string;
    partner2: string;
  };
  date: {
    display: string;
    iso: string;
    ceremony: string;
    reception: string;
    rsvpDeadline: string;
    rsvpDeadlineIso: string;
  };
  venue: {
    name: string;
    city: string;
    fullAddress: string;
    googleMapsUrl: string;
    ceremonyRoom: string;
    receptionRoom: string;
  };
  dresscode: {
    theme: string;
    description: string;
    palette: string[];
    paletteLabels: string[];
    avoid: string[];
  };
  eventFlow: Array<{
    time: string;
    title: string;
    description: string;
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
  gifts: Array<{
    label: string;
    accountName: string;
    accountNumber: string;
    qrImagePath: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  contacts: Array<{
    name: string;
    role: string;
    phone: string;
    email: string;
  }>;
  gallery: {
    photos: Array<{
      src: string;
      alt: string;
    }>;
  };
  story: Array<{
    date: string;
    title: string;
    description: string;
    image: string;
  }>;
}

const config: WeddingConfig = {
  couple: {
    partner1: "Cedric",
    partner2: "Karen",
  },

  date: {
    display: "November 7, 2026",
    iso: "2026-11-07",
    ceremony: "3:00 PM",
    reception: "6:00 PM",
    rsvpDeadline: "October 1, 2026",
    rsvpDeadlineIso: "2026-10-01",
  },

  venue: {
    name: "Hacienda Solange",
    city: "Tagaytay City",
    fullAddress: "// TODO: full address",
    googleMapsUrl: "// TODO: Google Maps link",
    ceremonyRoom: "// TODO: e.g. The Chapel",
    receptionRoom: "// TODO: e.g. The Garden Hall",
  },

  dresscode: {
    theme: "Garden Formal",
    description: "// TODO: one-sentence description of the dress code",
    palette: ["#4A5D3A", "#C8B8A2", "#E8DDD0", "#7A8B6A", "#D4C5B0"],
    paletteLabels: ["Forest", "Linen", "Ivory", "Sage", "Sand"],
    avoid: ["White", "Black", "Neon colors"],
  },

  eventFlow: [
    {
      time: "2:30 PM",
      title: "Guests Arrive",
      description: "// TODO: Welcome and seating",
    },
    {
      time: "3:00 PM",
      title: "Ceremony Begins",
      description: "// TODO: The exchange of vows",
    },
    {
      time: "3:45 PM",
      title: "Cocktail Hour",
      description: "// TODO: Light bites and drinks in the garden",
    },
    {
      time: "5:00 PM",
      title: "Reception Starts",
      description: "// TODO: Guests are seated for dinner",
    },
    {
      time: "6:00 PM",
      title: "Dinner Service",
      description: "// TODO: Multi-course dinner with toasts",
    },
    {
      time: "7:30 PM",
      title: "First Dance",
      description: "// TODO: The couple's first dance together",
    },
    {
      time: "8:00 PM",
      title: "Party & Dancing",
      description: "// TODO: Open dance floor and celebration",
    },
    {
      time: "10:00 PM",
      title: "Send-Off",
      description: "// TODO: Sparkler send-off",
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

  faqs: [
    {
      question: "Is there parking at Hacienda Solange?",
      answer: "// TODO: parking details",
    },
    {
      question: "Are children welcome?",
      answer: "// TODO: policy on children attending",
    },
    {
      question: "Can I bring a plus-one?",
      answer: "// TODO: plus-one policy",
    },
    {
      question: "What is the dress code exactly?",
      answer:
        "Garden Formal. Please refer to the Dress Code section above for the approved palette and what to avoid.",
    },
    {
      question:
        "Will there be a photographer? Can I take photos during the ceremony?",
      answer: "// TODO: photography policy",
    },
    {
      question: "Is there a gift registry?",
      answer:
        "We have a monetary gift option — please see the Gifts section above.",
    },
    {
      question: "What if it rains?",
      answer:
        "Hacienda Solange has indoor contingency spaces. // TODO: add details",
    },
    {
      question: "Will the ceremony be in English or Filipino?",
      answer: "// TODO: language details",
    },
    {
      question: "Will there be a livestream for guests who can't attend?",
      answer: "// TODO: livestream details",
    },
    {
      question: "How do I get to Hacienda Solange from Manila?",
      answer: "// TODO: transportation tips, estimated travel time",
    },
  ],

  contacts: [
    {
      name: "// TODO: Contact 1 Name",
      role: "// TODO: e.g. Wedding Coordinator",
      phone: "// TODO: phone number",
      email: "// TODO: email",
    },
    {
      name: "// TODO: Contact 2 Name",
      role: "// TODO: e.g. Best Man / Maid of Honor",
      phone: "// TODO: phone number",
      email: "// TODO: email",
    },
  ],

  gallery: {
    photos: Array.from({ length: 12 }, (_, i) => ({
      src: `/images/prenup/${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `// TODO: describe pre-nup photo ${i + 1}`,
    })),
  },

  story: [
    {
      date: "// TODO: e.g. March 2019",
      title: "How We Met",
      description: "// TODO: your story of how you first met",
      image: "/images/prenup/01.jpg",
    },
    {
      date: "// TODO: e.g. April 2019",
      title: "First Date",
      description: "// TODO: your first date story",
      image: "/images/prenup/02.jpg",
    },
    {
      date: "// TODO: e.g. December 2019",
      title: "When I Knew",
      description: "// TODO: the moment you knew",
      image: "/images/prenup/03.jpg",
    },
    {
      date: "// TODO: e.g. 2020-2024",
      title: "The Adventures",
      description: "// TODO: adventures you shared together",
      image: "/images/prenup/04.jpg",
    },
    {
      date: "// TODO: e.g. June 2025",
      title: "He Asked",
      description: "// TODO: the proposal story",
      image: "/images/prenup/05.jpg",
    },
    {
      date: "// TODO: e.g. Present Day",
      title: "Now & Always",
      description: "// TODO: looking forward to forever",
      image: "/images/prenup/06.jpg",
    },
  ],
};

export default config;
