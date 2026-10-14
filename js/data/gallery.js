/**
 * VENORA - Centralized Gallery Data Architecture (gallery.js)
 * Master repository for all photographic exhibition assets, categories, moods,
 * architectural details, and metadata across all 6 interactive gallery sections.
 */

(function () {
  'use strict';

  // 1. Atmosphere / Operational Venue Categories
  const CATEGORIES = [
    'All Spaces',
    'Conference Halls',
    'Meeting Rooms',
    'Corporate Events',
    'Outdoor Venues',
    'Celebrations'
  ];

  // 2. Visual Mood Filters
  const MOODS = [
    { id: 'warm', label: 'Warm & Welcoming' },
    { id: 'bright', label: 'Bright & Airy' },
    { id: 'dramatic', label: 'Dramatic & Elegant' },
    { id: 'evening', label: 'Evening Glow' }
  ];

  // 3. Primary 3D Perspective Gallery Items
  const PRIMARY_3D_ITEMS = [
    {
      id: 'gallery-sovereign-auditorium',
      title: 'The Sovereign Auditorium',
      category: 'Conference Halls',
      shortDesc: 'Tiered acoustic amphitheater with calibrated surround sound and 4K optical broadcast arrays.',
      fullDesc: 'Engineered for flagship enterprise keynotes, global summits, and hybrid digital broadcasts with 600 ergonomic executive seats and multi-channel translation booths.',
      image: 'assets/images/service-conference.jpg',
      imageAlt: 'Tiered executive keynote conference auditorium with grand presentation display',
      capacity: '600 Attendees',
      area: '8,400 sq ft',
      mood: 'dramatic'
    },
    {
      id: 'gallery-meridian-boardroom',
      title: 'The Meridian Boardroom',
      category: 'Meeting Rooms',
      shortDesc: 'Confidential executive chamber with motorized consoles, bespoke leather seating, and skyline views.',
      fullDesc: 'A private environment tailored for sensitive M&A strategy, board summits, and ministerial delegations, equipped with encrypted conferencing and acoustic isolation.',
      image: 'assets/images/venue-meeting.jpg',
      imageAlt: 'Refined executive boardroom with expansive glass partitions and conference table',
      capacity: '24 Guests',
      area: '1,200 sq ft',
      mood: 'bright'
    },
    {
      id: 'gallery-lumina-grand-hall',
      title: 'The Lumina Grand Forum',
      category: 'Corporate Events',
      shortDesc: 'Double-height architectural exhibition hall featuring modular motorized rigging and perimeter lighting.',
      fullDesc: 'Designed to host industry trade summits, automotive unveilings, and major gala conventions with reinforced floor load tolerances and programmable RGBW lighting.',
      image: 'assets/images/venue-corporate.jpg',
      imageAlt: 'Double-height luxury corporate venue with illuminated architectural ceilings',
      capacity: '450 Guests',
      area: '7,200 sq ft',
      mood: 'bright'
    },
    {
      id: 'gallery-veranda-gardens',
      title: 'The Veranda & Garden Atrium',
      category: 'Outdoor Venues',
      shortDesc: 'Landscaped open-air terrace with weather-adaptive glass canopies and evening ambient illumination.',
      fullDesc: 'Seamlessly merges organic botanic landscaping with contemporary corporate hospitality, offering an inspiring open-sky backdrop for cocktail receptions and networking.',
      image: 'assets/images/why-choose.jpg',
      imageAlt: 'Modern landscaped open-air venue terrace with contemporary architectural styling',
      capacity: '280 Guests',
      area: '4,600 sq ft',
      mood: 'warm'
    },
    {
      id: 'gallery-elysian-ballroom',
      title: 'The Elysian Gala Ballroom',
      category: 'Celebrations',
      shortDesc: 'Opulent banquet hall crowned with sculptural pendant chandeliers and customizable ambient hues.',
      fullDesc: 'An exquisite setting for annual galas, honors banquets, and executive milestone celebrations, serviced by a dedicated banquet culinary suite.',
      image: 'assets/images/service-celebration.jpg',
      imageAlt: 'Gala reception hall with warm mood lighting and banquet arrangements',
      capacity: '380 Guests',
      area: '6,500 sq ft',
      mood: 'evening'
    },
    {
      id: 'gallery-apex-keynote-stage',
      title: 'The Apex Keynote Arena',
      category: 'Conference Halls',
      shortDesc: 'Dynamic presentation amphitheater with ultra-wide curved digital displays and acoustic baffles.',
      fullDesc: 'Created for product unveilings, global investor days, and interactive sessions with dual speaker green rooms and real-time streaming infrastructure.',
      image: 'assets/images/service-launch.jpg',
      imageAlt: 'Corporate product launch keynote presentation stage with vibrant digital screen',
      capacity: '500 Attendees',
      area: '7,800 sq ft',
      mood: 'dramatic'
    },
    {
      id: 'gallery-vantage-suite',
      title: 'The Vantage Executive Suite',
      category: 'Meeting Rooms',
      shortDesc: 'Ergonomic team strategy breakout suite with dual interactive touch displays and natural daylight.',
      fullDesc: 'Equipped with soundproof acoustic double glazing, motorized sun shades, and smart collaboration whiteboard integration for multi-day workshops.',
      image: 'assets/images/service-meeting.jpg',
      imageAlt: 'Executive meeting room with professional corporate conference setup',
      capacity: '18 Guests',
      area: '950 sq ft',
      mood: 'bright'
    },
    {
      id: 'gallery-crestview-salon',
      title: 'The Crestview Banquet Salon',
      category: 'Celebrations',
      shortDesc: 'Refined dining suite designed for high-profile executive lunches, awards dinners, and receptions.',
      fullDesc: 'Includes custom tableware collections, sommeliers on demand, and seamless transition between private reception lounge and sit-down dining hall.',
      image: 'assets/images/service-catering.jpg',
      imageAlt: 'Executive hospitality dining setup with gold accents and banquet table',
      capacity: '180 Guests',
      area: '3,200 sq ft',
      mood: 'warm'
    },
    {
      id: 'gallery-glasshouse-pavilion',
      title: 'The Glasshouse Pavilion',
      category: 'Outdoor Venues',
      shortDesc: 'Curved glass conservatory blending indoor climate control with unobstructed sky and garden views.',
      fullDesc: 'Floor-to-ceiling structural glass, heated limestone flooring, and automated air filtration create a stunning year-round pavilion for twilight events.',
      image: 'assets/images/cta-venue.jpg',
      imageAlt: 'Illuminated glass architectural venue pavilion at twilight',
      capacity: '220 Guests',
      area: '3,800 sq ft',
      mood: 'evening'
    },
    {
      id: 'gallery-grand-amphitheater',
      title: 'The Grand Amphitheater Hall',
      category: 'Conference Halls',
      shortDesc: 'Modern continental-seating auditorium with immersive surround audio and dual presenter pedestals.',
      fullDesc: 'Ideal for academic symposiums, international corporate summits, and shareholder assemblies, engineered for crystal-clear spoken word intelligibility.',
      image: 'assets/images/venue-hall.jpg',
      imageAlt: 'Large modern corporate conference auditorium with theater seating',
      capacity: '420 Attendees',
      area: '6,100 sq ft',
      mood: 'dramatic'
    },
    {
      id: 'gallery-atrium-lounge',
      title: 'The Atrium Reception Lounge',
      category: 'Corporate Events',
      shortDesc: 'Spacious hospitality foyer connecting main conference halls with dedicated espresso and cocktail bars.',
      fullDesc: 'Designed to foster spontaneous networking and casual collaboration between summit keynotes, equipped with mobile charging stations and plush seating.',
      image: 'assets/images/about-venue.jpg',
      imageAlt: 'Contemporary corporate lounge with architectural seating and high ceilings',
      capacity: '300 Guests',
      area: '4,500 sq ft',
      mood: 'warm'
    },
    {
      id: 'gallery-solaris-foyer',
      title: 'The Solaris Starlight Gallery',
      category: 'Corporate Events',
      shortDesc: 'Glass-walled promenade with panoramic city views and curated architectural art installations.',
      fullDesc: 'A striking venue for VIP receptions, press conferences, and brand activations that demand a memorable, photo-worthy arrival sequence.',
      image: 'assets/images/hero-panel-left.jpg',
      imageAlt: 'Architectural venue interior with towering windows and ambient lighting',
      capacity: '250 Guests',
      area: '3,600 sq ft',
      mood: 'evening'
    }
  ];

  // 4. Section 4: The Signature Collection (Asymmetrical Curated Exhibition)
  const SIGNATURE_COLLECTION = [
    {
      id: 'sig-001',
      numeral: '001',
      role: 'featured',
      title: 'The Grand Rotunda Promenade',
      category: 'Architectural Masterpiece',
      shortDesc: 'A breathtaking 40-foot soaring glass rotunda where daylight sculpts clean geometric reflections across honed limestone.',
      fullDesc: 'Serving as VENORA\'s flagship architectural statement, the Grand Rotunda provides a transitional gallery space connecting primary conference halls with private executive chambers.',
      image: 'assets/images/hero-venue.jpg',
      imageAlt: 'Grand architectural rotunda with sweeping geometric arches and natural illumination',
      capacity: '400 Guests',
      area: '6,800 sq ft'
    },
    {
      id: 'sig-002',
      numeral: '002',
      role: 'supporting-1',
      title: 'The Horizon Planning Atelier',
      category: 'Consultation & Strategy',
      shortDesc: 'Bespoke event coordination chamber tailored for VIP planners and creative leadership teams.',
      fullDesc: 'Equipped with tactile material boards, 3D venue layout simulators, and private sommelier consultation tables.',
      image: 'assets/images/hero2-planner.jpg',
      imageAlt: 'Executive event coordinator planning venue configurations with architectural blueprints',
      capacity: '12 Guests',
      area: '850 sq ft'
    },
    {
      id: 'sig-003',
      numeral: '003',
      role: 'supporting-2',
      title: 'The Luminary Stage Matrix',
      category: 'Production & AV',
      shortDesc: 'Calibrated acoustic baffle architecture and motorized stage lighting arrays.',
      fullDesc: 'A multi-tier stage framework capable of transforming between dynamic tech launches and orchestral ceremonies.',
      image: 'assets/images/service-av.jpg',
      imageAlt: 'Professional stage audio visual production setup with geometric spotlight grids',
      capacity: '350 Attendees',
      area: '4,200 sq ft'
    },
    {
      id: 'sig-004',
      numeral: '004',
      role: 'supporting-3',
      title: 'The Twilight Lantern Terrace',
      category: 'Open-Air Reception',
      shortDesc: 'An illuminated evening sky pavilion with panoramic horizon views and bespoke fire features.',
      fullDesc: 'Floating above the city canopy, the Lantern Terrace provides an unforgettable open-air sanctuary for post-summit toasts and stargazing.',
      image: 'assets/images/hero-panel-right.jpg',
      imageAlt: 'Illuminated architectural terrace with soft evening lantern lighting',
      capacity: '160 Guests',
      area: '2,900 sq ft'
    }
  ];

  // 5. Section 5: Perspectives in Motion (3 Horizontal Dynamic Bands)
  const MOTION_PERSPECTIVES = {
    topBand: [
      {
        id: 'motion-t1',
        title: 'Keynote Auditorium Horizon',
        category: 'Conference Space',
        shortDesc: 'Sweeping horizontal perspective of main assembly auditorium during opening keynote.',
        image: 'assets/images/service-conference.jpg',
        imageAlt: 'Wide panorama of modern conference hall'
      },
      {
        id: 'motion-t2',
        title: 'Executive Boardroom Gallery',
        category: 'Meeting Space',
        shortDesc: 'Acoustic glass perimeter reflecting warm interior architectural highlights.',
        image: 'assets/images/venue-meeting.jpg',
        imageAlt: 'Executive meeting room with skyline glass'
      },
      {
        id: 'motion-t3',
        title: 'Illuminated Forum Atrium',
        category: 'Corporate Forum',
        shortDesc: 'Geometric ceiling illumination casting symmetry across the forum floor.',
        image: 'assets/images/venue-corporate.jpg',
        imageAlt: 'Grand illuminated corporate venue forum'
      },
      {
        id: 'motion-t4',
        title: 'Veranda Botanic Perimeters',
        category: 'Outdoor Space',
        shortDesc: 'Lush architectural plantings framing contemporary stone terraces.',
        image: 'assets/images/why-choose.jpg',
        imageAlt: 'Outdoor terrace architecture with greenery'
      }
    ],
    middleBand: [
      {
        id: 'motion-m1',
        title: 'Gala Dining Symphony',
        category: 'Celebration',
        shortDesc: 'Warm amber tones and fine crystal settings inside the grand banquet hall.',
        image: 'assets/images/service-celebration.jpg',
        imageAlt: 'Gala ballroom banquet with warm mood lighting'
      },
      {
        id: 'motion-m2',
        title: 'Keynote Presentation Stage',
        category: 'Keynote Arena',
        shortDesc: 'High-contrast presentation graphics lighting up the main presentation display.',
        image: 'assets/images/service-launch.jpg',
        imageAlt: 'Keynote speaker on illuminated stage'
      },
      {
        id: 'motion-m3',
        title: 'Collaborative Strategy Suite',
        category: 'Meeting Suite',
        shortDesc: 'Natural daylight cascading through floor-to-ceiling acoustic glass partitions.',
        image: 'assets/images/service-meeting.jpg',
        imageAlt: 'Meeting suite conference table and daylight'
      },
      {
        id: 'motion-m4',
        title: 'Catering Culinary Showcase',
        category: 'Hospitality',
        shortDesc: 'Curated artisanal dining service prepared for an executive reception.',
        image: 'assets/images/service-catering.jpg',
        imageAlt: 'Fine banquet culinary display and silverware'
      }
    ],
    bottomBand: [
      {
        id: 'motion-b1',
        title: 'Glass Pavilion Twilight',
        category: 'Outdoor Pavilion',
        shortDesc: 'Curved structural glass reflecting the deep blue tones of the dusk horizon.',
        image: 'assets/images/cta-venue.jpg',
        imageAlt: 'Illuminated glass architectural pavilion at dusk'
      },
      {
        id: 'motion-b2',
        title: 'Continental Amphitheater',
        category: 'Auditorium',
        shortDesc: 'Curved theater seating designed for panoramic sightlines and spoken clarity.',
        image: 'assets/images/venue-hall.jpg',
        imageAlt: 'Modern amphitheater hall with theater seating'
      },
      {
        id: 'motion-b3',
        title: 'Contemporary Atrium Promenade',
        category: 'Reception Lounge',
        shortDesc: 'Open gathering space designed for spontaneous networking between conference sessions.',
        image: 'assets/images/about-venue.jpg',
        imageAlt: 'Contemporary lounge with stylish seating'
      },
      {
        id: 'motion-b4',
        title: 'Solaris Starlight Gallery',
        category: 'Exhibition Gallery',
        shortDesc: 'Expansive glass walls offering city panoramas during evening receptions.',
        image: 'assets/images/hero-panel-left.jpg',
        imageAlt: 'Gallery interior with towering windows and soft lighting'
      }
    ]
  };

  // 6. Section 6: Hidden Details (Close-Up Visual Discovery with Interactive Pins)
  const HIDDEN_DETAILS = [
    {
      id: 'detail-01',
      title: 'Acoustic Baffle Geometry',
      category: 'Architectural Finish',
      shortDesc: 'Precision-routed micro-perforated oak paneling engineered to eliminate vocal echo while preserving warmth.',
      image: 'assets/images/service-av.jpg',
      imageAlt: 'Close-up of calibrated acoustic baffle stage structures',
      pinX: '48%',
      pinY: '38%',
      pinLabel: 'Micro-Perforated Oak Acoustics'
    },
    {
      id: 'detail-02',
      title: 'Bespoke Banquet Place Settings',
      category: 'Hospitality Craft',
      shortDesc: 'Matte gold flatware, hand-blown crystal stemware, and linen napkins curated for executive gala dining.',
      image: 'assets/images/service-catering.jpg',
      imageAlt: 'Close-up of luxury banquet table setting with fine cutlery and stemware',
      pinX: '55%',
      pinY: '52%',
      pinLabel: 'Hand-Finished Gold Service'
    },
    {
      id: 'detail-03',
      title: 'Structural Glass Mullion Junctions',
      category: 'Curtain Wall Engineering',
      shortDesc: 'Concealed structural stainless steel spiders allowing unobstructed floor-to-ceiling garden horizons.',
      image: 'assets/images/cta-venue.jpg',
      imageAlt: 'Close-up architectural glass corner and twilight reflection',
      pinX: '35%',
      pinY: '45%',
      pinLabel: 'Concealed Spider Glazing'
    },
    {
      id: 'detail-04',
      title: 'Sculptural Luminaire Arrays',
      category: 'Ambient Lighting',
      shortDesc: 'Concentric hand-brushed brass rings with diffused warm LEDs, creating layered indirect luminance.',
      image: 'assets/images/hero-panel-right.jpg',
      imageAlt: 'Detail of modern architectural pendant luminaire and lighting',
      pinX: '60%',
      pinY: '32%',
      pinLabel: 'Warm Indirect Luminaire'
    },
    {
      id: 'detail-05',
      title: 'Tactile Leather Executive Seating',
      category: 'Ergonomic Interior',
      shortDesc: 'Hand-stitched full-grain Italian leather armchairs engineered for comfortable multi-hour deliberations.',
      image: 'assets/images/venue-meeting.jpg',
      imageAlt: 'Executive boardroom leather armchair and wood grain finish',
      pinX: '42%',
      pinY: '60%',
      pinLabel: 'Full-Grain Italian Leather'
    },
    {
      id: 'detail-06',
      title: 'Keynote Presentation Optical Display',
      category: 'Display Technology',
      shortDesc: 'Seamless 0.9mm micro-LED presentation canvas with matte anti-glare polarization for crystal-clear data legibility.',
      image: 'assets/images/service-launch.jpg',
      imageAlt: 'High-resolution presentation screen and stage border',
      pinX: '50%',
      pinY: '42%',
      pinLabel: 'Anti-Glare Micro-LED'
    }
  ];

  // 7. Section 7: Light & Atmosphere (4 Distinct Visual Mood Chapters)
  const ATMOSPHERE_MOODS = {
    warm: {
      label: 'Warm & Welcoming',
      tagline: 'Amber radiance, tactile timber, and intimate hospitality that fosters authentic conversation.',
      primary: {
        id: 'mood-warm-p',
        title: 'The Veranda Hearth & Terrace',
        category: 'Outdoor Venues',
        shortDesc: 'Natural cedar pergolas and open fire tables glowing beneath dusk skies.',
        image: 'assets/images/why-choose.jpg',
        imageAlt: 'Warm illuminated terrace with comfortable architectural seating'
      },
      supporting: [
        {
          id: 'mood-warm-s1',
          title: 'The Hearthside Dining Salon',
          category: 'Celebrations',
          shortDesc: 'Intimate banquet tables arranged under soft halogen warmth.',
          image: 'assets/images/service-catering.jpg',
          imageAlt: 'Warm banquet setup with candlelight'
        },
        {
          id: 'mood-warm-s2',
          title: 'The Executive Atrium Lounge',
          category: 'Corporate Events',
          shortDesc: 'Welcoming communal hospitality lounge for casual delegate reunions.',
          image: 'assets/images/about-venue.jpg',
          imageAlt: 'Inviting corporate lounge with warm wood and seating'
        }
      ]
    },
    bright: {
      label: 'Bright & Airy',
      tagline: 'Crisp daylight, lofty ceilings, and pristine architectural geometry designed for focus and clarity.',
      primary: {
        id: 'mood-bright-p',
        title: 'The Daylight Atrium Promenade',
        category: 'Corporate Events',
        shortDesc: 'Sunlight flooding through 30-foot structural glass walls onto polished limestone.',
        image: 'assets/images/hero-panel-left.jpg',
        imageAlt: 'Sunlit architectural venue with expansive clear windows'
      },
      supporting: [
        {
          id: 'mood-bright-s1',
          title: 'The Meridian Glass Boardroom',
          category: 'Meeting Rooms',
          shortDesc: 'Acoustic glass perimeter offering unobstructed horizon vistas.',
          image: 'assets/images/venue-meeting.jpg',
          imageAlt: 'Bright modern boardroom with skyline views'
        },
        {
          id: 'mood-bright-s2',
          title: 'The Lumina Grand Forum',
          category: 'Corporate Events',
          shortDesc: 'Daylit exhibition space capable of handling grand installations.',
          image: 'assets/images/venue-corporate.jpg',
          imageAlt: 'Clean bright corporate forum with white ceilings'
        }
      ]
    },
    dramatic: {
      label: 'Dramatic & Elegant',
      tagline: 'High contrast, theatrical directional lighting, and grand architectural scale.',
      primary: {
        id: 'mood-dramatic-p',
        title: 'The Apex Keynote Stage',
        category: 'Conference Halls',
        shortDesc: 'Dynamic spotlighting and razor-sharp digital backdrops commanding total attendee focus.',
        image: 'assets/images/service-launch.jpg',
        imageAlt: 'Dramatic keynote auditorium with bold digital presentation screen'
      },
      supporting: [
        {
          id: 'mood-dramatic-s1',
          title: 'The Sovereign Auditorium Amphitheater',
          category: 'Conference Halls',
          shortDesc: 'Tiered theater seating falling gently into dark acoustic shadows.',
          image: 'assets/images/service-conference.jpg',
          imageAlt: 'Dramatic conference auditorium seating'
        },
        {
          id: 'mood-dramatic-s2',
          title: 'The Grand Amphitheater Arena',
          category: 'Conference Halls',
          shortDesc: 'Monolithic concrete pillars with recessed architectural spotlights.',
          image: 'assets/images/venue-hall.jpg',
          imageAlt: 'Modern amphitheater with dramatic overhead lighting'
        }
      ]
    },
    evening: {
      label: 'Evening Glow',
      tagline: 'Twilight silhouettes, glowing glass lanterns, and celebratory ambiance under the stars.',
      primary: {
        id: 'mood-evening-p',
        title: 'The Glasshouse Pavilion at Dusk',
        category: 'Outdoor Venues',
        shortDesc: 'Illuminated glass architecture glowing like a jewel box against a deep cobalt evening sky.',
        image: 'assets/images/cta-venue.jpg',
        imageAlt: 'Glowing glass pavilion exterior illuminated at twilight'
      },
      supporting: [
        {
          id: 'mood-evening-s1',
          title: 'The Elysian Gala Ballroom',
          category: 'Celebrations',
          shortDesc: 'Sculptural chandeliers casting soft golden highlights across celebratory tables.',
          image: 'assets/images/service-celebration.jpg',
          imageAlt: 'Evening gala celebration banquet hall'
        },
        {
          id: 'mood-evening-s2',
          title: 'The Starlight Lantern Terrace',
          category: 'Corporate Events',
          shortDesc: 'Evening skyline cocktails accompanied by ambient architectural backlighting.',
          image: 'assets/images/hero-panel-right.jpg',
          imageAlt: 'Evening lounge terrace with soft atmospheric lighting'
        }
      ]
    }
  };

  // 8. Section 8: The Endless Frame (Wide Continuous Moving Photographic Ribbon)
  const ENDLESS_FRAME_ITEMS = [
    {
      id: 'endless-01',
      title: 'The Sovereign Horizon',
      category: 'Keynote Space',
      shortDesc: 'Acoustic architectural curve of the main conference auditorium.',
      image: 'assets/images/service-conference.jpg',
      imageAlt: 'Conference auditorium panorama'
    },
    {
      id: 'endless-02',
      title: 'The Atrium Foyer',
      category: 'Hospitality',
      shortDesc: 'Open promenade connecting delegate assembly halls.',
      image: 'assets/images/about-venue.jpg',
      imageAlt: 'Atrium foyer with seating'
    },
    {
      id: 'endless-03',
      title: 'The Garden Veranda',
      category: 'Open-Air Setting',
      shortDesc: 'Organic stone terraces and modern cedar canopies.',
      image: 'assets/images/why-choose.jpg',
      imageAlt: 'Terrace garden venue'
    },
    {
      id: 'endless-04',
      title: 'The Executive Boardroom',
      category: 'Strategy Chamber',
      shortDesc: 'Acoustic double glazing and skyline horizons.',
      image: 'assets/images/venue-meeting.jpg',
      imageAlt: 'Boardroom conference setup'
    },
    {
      id: 'endless-05',
      title: 'The Elysian Ballroom',
      category: 'Banquet Hall',
      shortDesc: 'Handcrafted pendant chandeliers over celebratory tables.',
      image: 'assets/images/service-celebration.jpg',
      imageAlt: 'Gala reception hall'
    },
    {
      id: 'endless-06',
      title: 'The Glasshouse Twilight',
      category: 'Glass Pavilion',
      shortDesc: 'Floor-to-ceiling glass pavilion illuminated at dusk.',
      image: 'assets/images/cta-venue.jpg',
      imageAlt: 'Glass architectural venue'
    },
    {
      id: 'endless-07',
      title: 'The Lumina Forum',
      category: 'Exhibition Hall',
      shortDesc: 'Double-height volume engineered for flagship showcases.',
      image: 'assets/images/venue-corporate.jpg',
      imageAlt: 'Lumina corporate hall'
    },
    {
      id: 'endless-08',
      title: 'The Apex Keynote Stage',
      category: 'Presentation Stage',
      shortDesc: 'Ultra-wide digital screen and dramatic lighting.',
      image: 'assets/images/service-launch.jpg',
      imageAlt: 'Keynote presentation stage'
    }
  ];

  // Global Flattened Lookup Index (enables ANY image from ANY section to open in the shared lightbox)
  const ALL_FLATTENED_LOOKUP = {};

  function registerItem(item) {
    if (item && item.id && !ALL_FLATTENED_LOOKUP[item.id]) {
      ALL_FLATTENED_LOOKUP[item.id] = item;
    }
  }

  PRIMARY_3D_ITEMS.forEach(registerItem);
  SIGNATURE_COLLECTION.forEach(registerItem);
  MOTION_PERSPECTIVES.topBand.forEach(registerItem);
  MOTION_PERSPECTIVES.middleBand.forEach(registerItem);
  MOTION_PERSPECTIVES.bottomBand.forEach(registerItem);
  HIDDEN_DETAILS.forEach(registerItem);
  ENDLESS_FRAME_ITEMS.forEach(registerItem);
  Object.values(ATMOSPHERE_MOODS).forEach(m => {
    registerItem(m.primary);
    m.supporting.forEach(registerItem);
  });

  // Public API
  window.VenoraGallery = {
    getCategories: () => [...CATEGORIES],
    getMoods: () => [...MOODS],
    get3DItems: () => [...PRIMARY_3D_ITEMS],
    get3DByCategory: (cat) => {
      if (!cat || cat === 'All Spaces') return [...PRIMARY_3D_ITEMS];
      return PRIMARY_3D_ITEMS.filter(it => it.category === cat);
    },
    getSignatureCollection: () => [...SIGNATURE_COLLECTION],
    getMotionPerspectives: () => ({ ...MOTION_PERSPECTIVES }),
    getHiddenDetails: () => [...HIDDEN_DETAILS],
    getMoodData: (moodId) => ATMOSPHERE_MOODS[moodId] || ATMOSPHERE_MOODS['warm'],
    getEndlessFrameItems: () => [...ENDLESS_FRAME_ITEMS],
    getItemById: (id) => ALL_FLATTENED_LOOKUP[id] || null,
    getAllFlattened: () => Object.values(ALL_FLATTENED_LOOKUP)
  };
})();
