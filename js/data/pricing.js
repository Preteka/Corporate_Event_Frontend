/**
 * VENORA - Centralized Pricing & Package Data
 * Configures the 3 pricing tiers (Essential, Professional, Signature),
 * package comparison table matrix, and pricing FAQs.
 */

(function () {
  'use strict';

  const packagesData = [
    {
      id: "essential",
      slug: "essential",
      name: "Essential",
      tagline: "For executive board meetings, workshops, and straightforward venue discovery.",
      priceDisplay: "Custom Quote",
      sampleNote: "Sample indicative quote from ₹35,000 for requirement curation",
      featured: false,
      badge: "Meetings & Workshops",
      idealFor: "10 to 50 delegates · Single-day corporate meetings",
      ctaLabel: "Choose Essential",
      ctaHref: "checkout.html?package=essential",
      summary: "Curated venue discovery and structured requirement gathering for focused corporate meetings.",
      inclusions: [
        "Curated venue discovery & shortlist support (up to 3 spaces)",
        "Basic event requirement collection & spatial brief",
        "Essential booking information & venue liaison",
        "Email-based enquiry workflow & milestone timeline",
        "Layout review for boardroom or classroom formats"
      ],
      exclusionsNote: "Venue rental fees, catering, and on-site production quoted separately."
    },
    {
      id: "professional",
      slug: "professional",
      name: "Professional",
      tagline: "For conferences, summits, and multi-track corporate gatherings.",
      priceDisplay: "Custom Quote",
      sampleNote: "Sample indicative quote from ₹85,000 for end-to-end planning",
      featured: true,
      badge: "Most Popular",
      idealFor: "50 to 250 delegates · Full-day conferences & summits",
      ctaLabel: "Choose Professional",
      ctaHref: "checkout.html?package=professional",
      summary: "End-to-end conference coordination, staging synchronization, and add-on hospitality planning.",
      inclusions: [
        "Priority venue discovery & arranged site walkthroughs",
        "Structured event planning roadmap & milestones",
        "Run-of-show schedule & speaker timing coordination",
        "Catering & hospitality add-on preference collection",
        "Basic audio-visual specification & rehearsal review",
        "Dedicated VENORA event coordinator assigned"
      ],
      exclusionsNote: "Venue rental fees, food & beverage per-cover charges billed directly based on selection."
    },
    {
      id: "signature",
      slug: "signature",
      name: "Signature",
      tagline: "For flagship annual summits, milestone galas, and complex corporate gatherings.",
      priceDisplay: "Tailored Quote",
      sampleNote: "Bespoke corporate engagement tailored to delegation scope",
      featured: false,
      badge: "Flagship Gatherings",
      idealFor: "250+ delegates · Multi-day or multi-track summits",
      ctaLabel: "Choose Signature",
      ctaHref: "checkout.html?package=signature",
      summary: "Comprehensive bespoke management, VIP delegate handling, and on-site run-of-show supervision.",
      inclusions: [
        "Comprehensive architectural venue sourcing & spatial design",
        "Detailed multi-track event scheduling & breakout flow",
        "Premium culinary & hospitality curation oversight",
        "Full technical AV & broadcast staging synchronization",
        "On-site lead event director & coordination team on event day",
        "Post-event financial reconciliation & vendor wrap-up"
      ],
      exclusionsNote: "All venue, catering, and third-party production costs itemized transparently."
    }
  ];

  // Feature Comparison Matrix
  const comparisonMatrix = [
    {
      category: "Venue Discovery & Selection",
      features: [
        {
          name: "Curated venue shortlist",
          essential: "Up to 3 spaces",
          professional: "Up to 6 spaces",
          signature: "Unlimited curated spaces"
        },
        {
          name: "Venue site visit coordination",
          essential: "Self-guided guidance",
          professional: "Coordinated accompaniment",
          signature: "Private VIP walkthroughs"
        },
        {
          name: "Spatial capacity & floorplan review",
          essential: true,
          professional: true,
          signature: true
        },
        {
          name: "Date hold & reservation administrative support",
          essential: true,
          professional: true,
          signature: true
        }
      ]
    },
    {
      category: "Event Planning & Run-of-Show",
      features: [
        {
          name: "Event requirement brief & checklist",
          essential: true,
          professional: true,
          signature: true
        },
        {
          name: "Detailed run-of-show schedule",
          essential: false,
          professional: true,
          signature: true
        },
        {
          name: "Multi-track & breakout room flow",
          essential: false,
          professional: "Up to 2 tracks",
          signature: "Complex multi-track"
        },
        {
          name: "Dedicated VENORA event coordinator",
          essential: "Remote support",
          professional: "Assigned lead coordinator",
          signature: "Senior director + floor team"
        }
      ]
    },
    {
      category: "Hospitality & Technical Support",
      features: [
        {
          name: "Catering menu & dietary preference collection",
          essential: "Basic checklist",
          professional: "Curated menu selection",
          signature: "Bespoke culinary curation & tastings"
        },
        {
          name: "Audio-visual specification coordination",
          essential: "Standard venue AV check",
          professional: "Technical rehearsal review",
          signature: "Full production & staging sync"
        },
        {
          name: "On-site supervision on event day",
          essential: false,
          professional: "Key milestones oversight",
          signature: "Full-day dedicated presence"
        },
        {
          name: "Post-event reconciliation report",
          essential: "Email summary",
          professional: "Detailed review",
          signature: "Full vendor reconciliation"
        }
      ]
    }
  ];

  // Pricing FAQs
  const pricingFaqs = [
    {
      question: "How is the final price determined?",
      answer: "VENORA planning services are provided either as transparent package tiers or customized consultations based on event scale. Venue rental charges, catering per-cover fees, and specialized technical production are always quoted with itemized clarity based on the specific venue and service providers chosen."
    },
    {
      question: "Are venue rental charges included in these packages?",
      answer: "No. Venue rental charges depend on the specific space, date, and hire duration selected. VENORA coordinates the discovery, contract terms, and date holds, and provides clear cost estimates prior to any commitment."
    },
    {
      question: "Can I request additional services or customize a plan?",
      answer: "Yes. Our three tiers serve as structured foundations. You can add specific supplementary services—such as extended AV support, bespoke hospitality tasting, or extra breakout coordination—to any plan."
    },
    {
      question: "Is my booking automatically confirmed after submitting an enquiry?",
      answer: "Submitting a package enquiry initiates a structured requirement review and provisional date hold with the venue. Final reservation confirmation occurs once venue availability is verified, contracts are reviewed, and the required deposit is processed."
    },
    {
      question: "Can I modify my event requirements after choosing a plan?",
      answer: "Yes. Your assigned VENORA coordinator will review your requirement brief and adjust guest counts, seating formats, or service preferences during the initial planning checkpoints."
    },
    {
      question: "What happens if a preferred venue is unavailable on our date?",
      answer: "If a venue is booked on your primary date, our discovery team immediately presents alternative dates with the same space or suitable alternate venues in our portfolio matching your architectural and capacity criteria."
    }
  ];

  function getAllPackages() {
    return packagesData;
  }

  function getPackageById(id) {
    if (!id) return null;
    const clean = String(id).toLowerCase().trim();
    return packagesData.find(p => p.id === clean || p.slug === clean) || null;
  }

  function getComparisonMatrix() {
    return comparisonMatrix;
  }

  function getPricingFaqs() {
    return pricingFaqs;
  }

  if (typeof window !== 'undefined') {
    window.VenoraPricing = {
      packages: packagesData,
      comparison: comparisonMatrix,
      faqs: pricingFaqs,
      getAll: getAllPackages,
      getById: getPackageById,
      getComparison: getComparisonMatrix,
      getFaqs: getPricingFaqs
    };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      packagesData,
      comparisonMatrix,
      pricingFaqs,
      getAllPackages,
      getPackageById,
      getComparisonMatrix,
      getPricingFaqs
    };
  }
})();
