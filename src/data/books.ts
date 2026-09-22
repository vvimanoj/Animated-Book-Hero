export interface Book {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  author: string;
  authorRole: string;
  year: string;
  category: string;
  eyebrow: string;
  description: string;
  cover?: string; // empty or undefined for mock books without image
  clothbound?: {
    bg: string;
    border: string;
    foilColor: string;
    motif: string;
  };
  accentColor: string;
  ambientRgba: string;
  highlightColor: string;
  stats: {
    pages: string;
    binding: string;
    isbn: string;
    imprint: string;
  };
  reviews: {
    quote: string;
    critic: string;
    publication: string;
  }[];
  excerpt: string;
  curatorNote: string;
}

export const FEATURED_BOOKS: Book[] = [
  {
    id: "alchemist",
    number: "01",
    title: "The Alchemist",
    subtitle: "A Fable About Following Your Dream",
    author: "Paulo Coelho",
    authorRole: "Brazilian Lyricist & Novelist",
    year: "1988",
    category: "Philosophical Allegory",
    eyebrow: "FEATURED ARCHIVE • VOLUME I",
    description:
      "A luminous fable tracing Santiago, an Andalusian shepherd whose recurring dream of the Egyptian pyramids becomes an odyssey into the Soul of the World and the omens that guide destiny.",
    cover: "/books/alchemist.jpg",
    accentColor: "#E09F3E",
    ambientRgba: "rgba(224, 159, 62, 0.35)",
    highlightColor: "#FBBF24",
    stats: {
      pages: "208 pages",
      binding: "Clothbound Foil-Stamped Hardcover",
      isbn: "978-0062315007",
      imprint: "Éditions mvvnx1 • Deluxe Masterwork",
    },
    reviews: [
      {
        quote: "A wise and inspiring modern classic that urges us to listen to our hearts and read the omens of the world.",
        critic: "Editorial Board",
        publication: "The New York Times Book Review",
      },
      {
        quote: "A tale of unforgettable simplicity that touches the universal core of the human spirit.",
        critic: "Literary Gazette",
        publication: "The Paris Review",
      },
    ],
    excerpt:
      "The boy's name was Santiago. Dusk was falling as the boy arrived with his herd at an abandoned church. The roof had fallen in long ago, and an enormous sycamore had grown on the spot where the sacristy had once stood. He decided to spend the night there...",
    curatorNote:
      "Celebrated across 170 nations, this volume remains the quintessential modern parable on the alchemy of self-discovery.",
  },
  {
    id: "atomic",
    number: "02",
    title: "Atomic Habits",
    subtitle: "Tiny Changes, Remarkable Results",
    author: "James Clear",
    authorRole: "Behavioral Researcher & Writer",
    year: "2018",
    category: "Behavioral Science",
    eyebrow: "SYSTEMIC INQUIRY • VOLUME II",
    description:
      "An architectonic inquiry into the compounding nature of small actions. Clear demonstrates how microscopic shifts in habit identity compound into profound trajectories of human potential.",
    cover: "/books/atomic.jpg",
    accentColor: "#F59E0B",
    ambientRgba: "rgba(245, 158, 11, 0.32)",
    highlightColor: "#FCD34D",
    stats: {
      pages: "320 pages",
      binding: "Buckram Hardcover with Blind Embossing",
      isbn: "978-0735211292",
      imprint: "vvimanoj Monographs in Human Systems",
    },
    reviews: [
      {
        quote: "A supremely disciplined work. Clear strips away motivational fluff to expose the biology and mechanics of lasting change.",
        critic: "Dr. Adam Grant",
        publication: "Wharton Behavioral Institute",
      },
      {
        quote: "Atomic Habits is not a self-help manual; it is an engineering blueprint for deliberate living.",
        critic: "Review of Behavioral Literature",
        publication: "The Financial Times",
      },
    ],
    excerpt:
      "The fate of British Cycling changed one day in 2003. The organization, which was the governing body for professional cycling in Great Britain, had recently hired Dave Brailsford as its new performance director...",
    curatorNote:
      "A masterclass in cognitive architecture, selected for its rigorous grounding in neuroscience and daily design.",
  },
  {
    id: "ikigai",
    number: "03",
    title: "Ikigai",
    subtitle: "The Japanese Secret to a Long and Happy Life",
    author: "Héctor García & Francesc Miralles",
    authorRole: "Anthropological Researchers",
    year: "2016",
    category: "Eastern Philosophy",
    eyebrow: "CONTEMPLATIVE STUDIES • VOLUME III",
    description:
      "Drawn from the centenarians of Ogimi, Okinawa, this meditative investigation explores the convergence of passion, mission, vocation, and profession that infuses every dawn with quiet purpose.",
    cover: "/books/ikigai.jpg",
    accentColor: "#38BDF8",
    ambientRgba: "rgba(56, 189, 248, 0.32)",
    highlightColor: "#7DD3FC",
    stats: {
      pages: "208 pages",
      binding: "Natural Woven Linen with Silkscreened Spine",
      isbn: "978-0143130726",
      imprint: "Kyoto-Paris Transmissions",
    },
    reviews: [
      {
        quote: "A tranquil, profoundly grounding text. It teaches that the antidote to modern angst lies in the delicate joy of absorption.",
        critic: "Cultural Dispatch",
        publication: "The Guardian Arts",
      },
      {
        quote: "Brimming with gentle wisdom gathered directly from the elders of the world's longest-living village.",
        critic: "Eastern Studies Review",
        publication: "Kyoto Literary Journal",
      },
    ],
    excerpt:
      "This book began on a rainy night in Tokyo, when its authors sat together in a tiny bar. We had read each other’s work, but had never met in person. What started as a casual conversation turned into an exploration of the question: what is our reason for being?...",
    curatorNote:
      "An antidote to modern haste, highlighting the Japanese philosophy of presence, diet, and purposeful community.",
  },
  {
    id: "psyofmoney",
    number: "04",
    title: "The Psychology of Money",
    subtitle: "Timeless Lessons on Wealth, Greed, and Happiness",
    author: "Morgan Housel",
    authorRole: "Financial Historian & Partner",
    year: "2020",
    category: "Economic Philosophy",
    eyebrow: "HISTORICAL ESSAYS • VOLUME IV",
    description:
      "Nineteen short stories exploring the strange ways people think about wealth. Housel proves that financial mastery is not an analytical science, but a soft skill governed by human emotion and ego.",
    cover: "/books/psyofmoney.jpg",
    accentColor: "#34D399",
    ambientRgba: "rgba(52, 211, 153, 0.32)",
    highlightColor: "#6EE7B7",
    stats: {
      pages: "256 pages",
      binding: "Archival Green Cotton Cloth with Gilt Edges",
      isbn: "978-0857197689",
      imprint: "Éditions de l'Économie Morale",
    },
    reviews: [
      {
        quote: "One of the most perceptive, literate, and humane treatments of wealth ever written. Irreplaceable.",
        critic: "Howard Marks",
        publication: "Oaktree Memos",
      },
      {
        quote: "Housel writes with the narrative elegance of a historian and the psychological acumen of a therapist.",
        critic: "The Wall Street Journal",
        publication: "Weekend Literary Review",
      },
    ],
    excerpt:
      "Doing well with money has a little to do with how smart you are and a lot to do with how you behave. And behavior is hard to teach, even to really smart people. A genius who loses control of their emotions can be a financial disaster...",
    curatorNote:
      "Selected for its rare literary grace in a genre typically dominated by dry mathematics and short-term speculation.",
  },
  {
    id: "subtleart",
    number: "05",
    title: "The Subtle Art of Not Giving a F*ck",
    subtitle: "A Counterintuitive Approach to Living a Good Life",
    author: "Mark Manson",
    authorRole: "Philosophical Essayist & Author",
    year: "2016",
    category: "Stoic Realism",
    eyebrow: "CONTEMPORARY CRITIQUE • VOLUME V",
    description:
      "A searing, unfiltered manifesto for confronting existential finitude. Manson argues that human resilience stems not from turning lemons into lemonade, but from choosing the struggles worth enduring.",
    cover: "/books/subtleart.jpg",
    accentColor: "#F97316",
    ambientRgba: "rgba(249, 115, 22, 0.35)",
    highlightColor: "#FDBA74",
    stats: {
      pages: "224 pages",
      binding: "Smyth-Sewn Hardcover with Matte Ochre Jacket",
      isbn: "978-0062457714",
      imprint: "mvvnx1 Counter-Philosophy Series",
    },
    reviews: [
      {
        quote: "A bracing, fiercely honest antidote to the relentless tyranny of positive thinking. Piercingly lucid.",
        critic: "Philosophy Today",
        publication: "Sunday Times London",
      },
      {
        quote: "Manson revitalizes the wisdom of the Stoics and the Buddha through an urgent, contemporary vernacular.",
        critic: "Modern Epictetus Project",
        publication: "Literary Review",
      },
    ],
    excerpt:
      "In my life, I have given a f*ck about many things. I have also not given a f*ck about many things. And like the road not taken, it was the f*cks I didn’t give that made all the difference...",
    curatorNote:
      "A raw and visceral reinterpretation of classical stoicism adapted for an era overwhelmed by sensory noise.",
  },
  // MOCK BOOKS WITHOUT COVER IMAGE (Prestigious Clothbound Typographic Folios)
  {
    id: "meditations",
    number: "06",
    title: "Meditations",
    subtitle: "The Personal Notebooks of Marcus Aurelius",
    author: "Marcus Aurelius",
    authorRole: "Roman Emperor & Philosopher",
    year: "180 AD",
    category: "Classical Stoicism",
    eyebrow: "IMPERIAL ARCHIVE • VOLUME VI",
    description:
      "Written during nocturnal encampments along the Danubian frontier, these private spiritual exercises remain humanity's most intimate guide to duty, calm judgment, and inner freedom.",
    cover: "", // No image, pure clothbound foil design
    clothbound: {
      bg: "linear-gradient(145deg, #2b0b0e 0%, #150507 100%)",
      border: "#b91c1c",
      foilColor: "#fca5a5",
      motif: "IMPERIUM ROMANUM",
    },
    accentColor: "#EF4444",
    ambientRgba: "rgba(239, 68, 68, 0.32)",
    highlightColor: "#FCA5A5",
    stats: {
      pages: "272 pages",
      binding: "Oxblood Woven Cloth with Gilt Roman Fillet",
      isbn: "978-0140449334",
      imprint: "Éditions Classiques du Capitole",
    },
    reviews: [
      {
        quote: "The private reflections of the most powerful man on Earth, reminding himself that all worldly glory is dust.",
        critic: "Prof. Pierre Hadot",
        publication: "Collège de France",
      },
      {
        quote: "Unsurpassed in its serene moral gravity and psychological precision.",
        critic: "Classical Review",
        publication: "Oxford Philosophical Journal",
      },
    ],
    excerpt:
      "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil...",
    curatorNote:
      "An essential anchor for any thinking library, presented in our bespoke clothbound edition without exterior jacket.",
  },
  {
    id: "letters",
    number: "07",
    title: "Letters from a Stoic",
    subtitle: "Epistulae Morales ad Lucilium",
    author: "Seneca",
    authorRole: "Roman Statesman & Moralist",
    year: "65 AD",
    category: "Moral Epistles",
    eyebrow: "LATIN ESSAYS • VOLUME VII",
    description:
      "A monumental epistolary masterpiece exploring the art of living with dignity, navigating wealth, facing mortal finitude, and defending intellectual tranquility in times of turbulence.",
    cover: "", // No image, pure clothbound foil design
    clothbound: {
      bg: "linear-gradient(145deg, #0e1526 0%, #060912 100%)",
      border: "#6366f1",
      foilColor: "#c7d2fe",
      motif: "EPISTULAE MORALES",
    },
    accentColor: "#6366F1",
    ambientRgba: "rgba(99, 102, 241, 0.32)",
    highlightColor: "#A5B4FC",
    stats: {
      pages: "336 pages",
      binding: "Prussian Blue Buckram with Blind Frame",
      isbn: "978-0140442106",
      imprint: "Bibliotheca Stoica Romana",
    },
    reviews: [
      {
        quote: "Seneca writes as a friend in council, speaking directly to the anxieties that plague humanity across centuries.",
        critic: "Dr. Robin Campbell",
        publication: "Cambridge Philological Society",
      },
      {
        quote: "Clear, urgent, and relentlessly practical in its counsel on time and mortality.",
        critic: "Literary Gazette",
        publication: "Times Literary Supplement",
      },
    ],
    excerpt:
      "It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a sufficiently generous estimate has been given to us for the highest achievements if it were all well invested...",
    curatorNote:
      "Celebrated for its crystalline Latin syntax and razor-sharp diagnosis of human distraction.",
  },
  {
    id: "republic",
    number: "08",
    title: "The Republic",
    subtitle: "On the Just Polis and the Human Soul",
    author: "Plato",
    authorRole: "Founding Philosopher of Athens",
    year: "375 BC",
    category: "Political Philosophy",
    eyebrow: "ACADEMIC HERITAGE • VOLUME VIII",
    description:
      "The foundational dialogue of Western intellectual history. Socrates and his companions search for the definition of justice, constructing the ideal commonwealth and deciphering the myth of the cave.",
    cover: "", // No image, pure clothbound foil design
    clothbound: {
      bg: "linear-gradient(145deg, #081c18 0%, #030d0b 100%)",
      border: "#0d9488",
      foilColor: "#99f6e4",
      motif: "POLITEIA ATTIKA",
    },
    accentColor: "#14B8A6",
    ambientRgba: "rgba(20, 184, 166, 0.32)",
    highlightColor: "#5EEAD4",
    stats: {
      pages: "448 pages",
      binding: "Cypress Green Linen with Antique Silver Foil",
      isbn: "978-0140455113",
      imprint: "The Platonic Academy Press",
    },
    reviews: [
      {
        quote: "The whole of Western philosophy is but a series of footnotes to Plato. Here is the bedrock.",
        critic: "Alfred North Whitehead",
        publication: "Process & Reality Essays",
      },
      {
        quote: "An indelible work of dramatic genius and speculative power that shaped our conceptions of truth and justice.",
        critic: "Hellenic Studies",
        publication: "Athens Academic Review",
      },
    ],
    excerpt:
      "I went down yesterday to the Piraeus with Glaucon the son of Ariston, that I might offer up my prayers to the goddess; and also because I wanted to see in what manner they would celebrate the festival...",
    curatorNote:
      "Bound in archival natural linen with bespoke foil typesetting honoring early Mediterranean print masters.",
  },
];

/**
 * High-performance 500+ scalable catalog generator
 */
export function generateExpandedCatalog(targetCount = 500): Book[] {
  const result: Book[] = [...FEATURED_BOOKS];
  const archetypes = [
    { title: "Beyond Good and Evil", author: "Friedrich Nietzsche", category: "Existential Philosophy", year: "1886" },
    { title: "The Prince", author: "Niccolò Machiavelli", category: "Statecraft & Power", year: "1532" },
    { title: "Critique of Pure Reason", author: "Immanuel Kant", category: "Epistemology", year: "1781" },
    { title: "The Myth of Sisyphus", author: "Albert Camus", category: "Absurdist Philosophy", year: "1942" },
    { title: "Ethics", author: "Baruch Spinoza", category: "Metaphysics", year: "1677" },
    { title: "Essays", author: "Michel de Montaigne", category: "Humanistic Inquiry", year: "1580" },
    { title: "Walden", author: "Henry David Thoreau", category: "Transcendentalism", year: "1854" },
    { title: "The Art of War", author: "Sun Tzu", category: "Strategic Philosophy", year: "5th C. BC" },
  ];

  for (let i = result.length; i < targetCount; i++) {
    const arch = archetypes[i % archetypes.length];
    const numStr = String(i + 1).padStart(3, "0");
    const hue = (i * 37) % 360;

    result.push({
      id: `volume-${i + 1}`,
      number: numStr,
      title: `${arch.title} (Vol. ${Math.floor(i / archetypes.length) + 1})`,
      subtitle: "Archival Library Monograph",
      author: arch.author,
      authorRole: "Classical Scholar",
      year: arch.year,
      category: arch.category,
      eyebrow: `ARCHIVE MONOGRAPH • VOL. ${numStr}`,
      description: `Archival preservation volume ${numStr} from the permanent collection of mvvnx1 & vvimanoj, bound in hand-stitched cloth with archival acid-free paper.`,
      cover: "",
      clothbound: {
        bg: `linear-gradient(145deg, hsl(${hue}, 25%, 12%) 0%, #08090b 100%)`,
        border: `hsl(${hue}, 60%, 40%)`,
        foilColor: `hsl(${hue}, 75%, 75%)`,
        motif: `FOLIO ${numStr}`,
      },
      accentColor: `hsl(${hue}, 70%, 50%)`,
      ambientRgba: `hsla(${hue}, 70%, 50%, 0.32)`,
      highlightColor: `hsl(${hue}, 80%, 75%)`,
      stats: {
        pages: `${200 + ((i * 17) % 350)} pages`,
        binding: "Archival Clothbound Monograph",
        isbn: `978-0199${String(i).padStart(6, "0")}`,
        imprint: "Éditions mvvnx1 & vvimanoj",
      },
      reviews: [
        {
          quote: "A foundational text preserved with impeccable editorial rigor.",
          critic: "Archival Review",
          publication: "International Folio Journal",
        },
      ],
      excerpt:
        "In the quiet chambers of human contemplation, the written word endures as an unyielding testament to the architecture of mind...",
      curatorNote: `Volume ${numStr} curated for the permanent institutional and private library collections.`,
    });
  }
  return result;
}

// 500+ Books dataset for production scale
export const FULL_CATALOG_500: Book[] = generateExpandedCatalog(500);
