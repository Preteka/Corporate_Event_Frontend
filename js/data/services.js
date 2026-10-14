/**
 * VENORA - Centralized Services Data
 * Defines the 6 core corporate event and venue services.
 * Schema: id, slug, name, category, shortDescription, fullDescription, image, imageAlt,
 *         benefits, features, process, pricing, faqs, ctaLabel
 */

(function () {
  'use strict';

  const servicesData = [
    {
      id: "venue-discovery",
      slug: "venue-discovery",
      name: "Venue Discovery",
      category: "Venue Discovery",
      shortDescription: "Discover suitable venues for conferences, meetings, workshops, and corporate gatherings.",
      fullDescription: "Explore venue options according to your event type, capacity requirements, preferred atmosphere, and planning needs. VENORA helps organize the discovery process so you can evaluate suitable spaces more clearly, from historic auditoriums to sleek glass pavilions.",
      image: "assets/images/venue-hall.jpg",
      imageAlt: "Executive corporate amphitheater and auditorium venue",
      badge: "Curated Portfolio",
      benefits: [
        "Explore diverse venue architectural styles & layouts",
        "Compare capacity, acoustic staging & technical provisions",
        "Identify spaces precisely suited to your attendee numbers",
        "Organize preferred shortlists with transparent details"
      ],
      features: [
        {
          title: "Comprehensive Venue Catalog",
          desc: "Access verified corporate auditoriums, boardrooms, and expansive exhibition atriums."
        },
        {
          title: "Spatial & Technical Assessment",
          desc: "Review ceiling heights, stage dimensions, natural illumination, and acoustic isolation."
        },
        {
          title: "Capacity & Layout Matching",
          desc: "Filter by theater, classroom, banquet, or U-shape configurations tailored to your delegation."
        },
        {
          title: "Transparent Site Evaluation",
          desc: "Clear venue profiles highlighting accessibility, parking, and logistics staging points."
        }
      ],
      process: [
        {
          step: "01",
          title: "Define Spatial Criteria",
          desc: "Specify your event dates, expected guest count, seating format, and technical requirements."
        },
        {
          step: "02",
          title: "Curated Shortlist",
          desc: "Receive a tailored selection of verified spaces meeting your architectural and logistical standards."
        },
        {
          step: "03",
          title: "Virtual or In-Person Walkthrough",
          desc: "Inspect preferred halls with venue coordination leads to evaluate flow and staging layout."
        },
        {
          step: "04",
          title: "Selection & Booking Request",
          desc: "Lock in your preferred space with clear booking documentation and scheduling milestones."
        }
      ],
      pricing: {
        type: "enquiry",
        description: "Venue discovery assistance is included in our planning packages or provided as a standalone consultation. Actual venue hire fees depend on venue selection and duration."
      },
      faqs: [
        {
          question: "How does VENORA select and verify venues?",
          answer: "Every venue in the VENORA portfolio undergoes rigorous evaluation for corporate standards, including audiovisual readiness, high-speed connectivity, acoustic control, and guest comfort."
        },
        {
          question: "Can we schedule site inspections before committing?",
          answer: "Yes. Once you review your curated shortlist, our team coordinates private walkthroughs with on-site venue managers to review staging, lighting, and delegate reception."
        },
        {
          question: "Do you accommodate specialized capacity requirements?",
          answer: "Our portfolio spans intimate executive boardrooms for 10 delegates up to expansive auditoriums and exhibition halls accommodating 1,000+ attendees."
        },
        {
          question: "Are venue hire charges included in the discovery fee?",
          answer: "Discovery guidance and requirement matching are part of VENORA services. Actual venue hire fees and security deposits are billed directly based on the venue's published schedule."
        }
      ],
      ctaLabel: "Enquire About Venue Discovery"
    },
    {
      id: "corporate-event-planning",
      slug: "corporate-event-planning",
      name: "Corporate Event Planning",
      category: "Event Planning",
      shortDescription: "Organize your event requirements and planning details in a clear, structured workflow.",
      fullDescription: "Coordinate your event requirements through an organized planning experience, from defining the purpose of your gathering to reviewing important venue and service details. We bring order to corporate summits, leadership retreats, and company milestones.",
      image: "assets/images/service-meeting.jpg",
      imageAlt: "Professional corporate event planning and executive boardroom arrangement",
      badge: "End-to-End Coordination",
      benefits: [
        "Structured event requirement organization & roadmap",
        "Comprehensive milestones & planning checklists",
        "Seamless coordination of vendors, staging & timing",
        "Clear high-level overview of critical event needs"
      ],
      features: [
        {
          title: "Milestone Roadmaps",
          desc: "Step-by-step timelines ensuring every logistical detail is addressed well ahead of event day."
        },
        {
          title: "Stakeholder Alignment",
          desc: "Clear coordination between leadership, speakers, production teams, and venue management."
        },
        {
          title: "Resource & Budget Tracking",
          desc: "Transparent allocation of planning resources across venue, hospitality, and staging."
        },
        {
          title: "Risk & Contingency Preparedness",
          desc: "Pre-planned protocols for technical backup, timing adjustments, and guest flow management."
        }
      ],
      process: [
        {
          step: "01",
          title: "Discovery & Briefing",
          desc: "Align on event objectives, attendee demographic, key program segments, and milestones."
        },
        {
          step: "02",
          title: "Blueprint & Schedule",
          desc: "Develop the full running order, production requirements, and vendor coordination schedule."
        },
        {
          step: "03",
          title: "Review & Refinement",
          desc: "Collaborative review checkpoints with your internal committee to finalize event details."
        },
        {
          step: "04",
          title: "Execution Oversight",
          desc: "Structured support leading up to event day to ensure every element unfolds seamlessly."
        }
      ],
      pricing: {
        type: "enquiry",
        description: "Event planning engagements are tailored based on event complexity, delegate count, and planning duration. Available through Professional and Signature packages."
      },
      faqs: [
        {
          question: "What types of corporate events do you specialize in?",
          answer: "We support corporate summits, executive retreats, investor days, annual general meetings, partner conferences, and milestone business galas."
        },
        {
          question: "How involved will our team need to be during the planning?",
          answer: "We adapt to your team's bandwidth. We manage the detailed operational legwork and present clear checkpoints and decision summaries for your approval."
        },
        {
          question: "How early should corporate event planning begin?",
          answer: "For major conferences and summits, we recommend starting 8 to 16 weeks prior. Smaller meetings and executive workshops can be organized on shorter timelines."
        },
        {
          question: "Do you assist with on-site coordination during the event?",
          answer: "Yes, our planning services include on-site run-of-show supervision to coordinate speakers, stage timing, catering service, and delegate transitions."
        }
      ],
      ctaLabel: "Start Planning Your Event"
    },
    {
      id: "conference-meeting-coordination",
      slug: "conference-meeting-coordination",
      name: "Conference & Meeting Coordination",
      category: "Event Planning",
      shortDescription: "Plan professional meetings, workshops, and conferences with organized event details.",
      fullDescription: "Bring venue information, meeting requirements, schedules, and essential event arrangements together to support a more organized corporate gathering. We coordinate speaker stages, breakout sessions, and delegate hospitality with precision.",
      image: "assets/images/service-conference.jpg",
      imageAlt: "Tiered auditorium setup for corporate conferences and summits",
      badge: "Multi-Track Focus",
      benefits: [
        "Meeting and workshop requirement planning",
        "Conference schedule and run-of-show organization",
        "Breakout room and main plenary synchronization",
        "Venue layout and seating arrangement review"
      ],
      features: [
        {
          title: "Run-of-Show Development",
          desc: "Minute-by-minute schedules for keynotes, panel discussions, Q&A sessions, and intermissions."
        },
        {
          title: "Speaker & VIP Management",
          desc: "Dedicated green room coordination, rehearsal slots, and stage briefing support."
        },
        {
          title: "Breakout Session Flow",
          desc: "Smooth delegate movement between plenary auditoriums and specialized workshop rooms."
        },
        {
          title: "Delegate Collateral & Badging Setup",
          desc: "Structured reception desk coordination for rapid, professional attendee check-in."
        }
      ],
      process: [
        {
          step: "01",
          title: "Program Architecture",
          desc: "Establish conference tracks, keynote timings, workshop requirements, and delegate volumes."
        },
        {
          step: "02",
          title: "Room & Track Allocation",
          desc: "Assign main stages, breakout suites, and networking foyers to match audience capacity."
        },
        {
          step: "03",
          title: "Technical Rehearsals",
          desc: "Coordinate AV audio checks, presentation slide sync, and stage lighting with technicians."
        },
        {
          step: "04",
          title: "Day-of-Event Direction",
          desc: "Active floor supervision to keep presentations on schedule and transitions effortless."
        }
      ],
      pricing: {
        type: "enquiry",
        description: "Coordination fees depend on conference scale, number of concurrent tracks, and day count. Available as part of our Professional package."
      },
      faqs: [
        {
          question: "Can you manage hybrid and multi-track conferences?",
          answer: "Yes, we coordinate spatial and timing requirements for multi-track agendas, including concurrent breakout rooms and live broadcast integration."
        },
        {
          question: "Who manages speaker timing and stage transitions?",
          answer: "Our coordinators work directly with stage managers to ensure speaker timers, teleprompters, and panel handoffs proceed according to the master run-of-show."
        },
        {
          question: "Do you handle registration desks and attendee badge distribution?",
          answer: "We organize the physical reception flow, signage, and queuing design to ensure swift and dignified delegate arrival."
        },
        {
          question: "Can we request custom stage configurations?",
          answer: "We review stage dimensions, seating curves, and podium placements with the venue team to optimize sightlines for all attendees."
        }
      ],
      ctaLabel: "Coordinate Your Conference"
    },
    {
      id: "catering-event-addons",
      slug: "catering-event-addons",
      name: "Catering & Event Add-ons",
      category: "Event Support",
      shortDescription: "Explore suitable catering options and additional services for your gathering.",
      fullDescription: "Review available catering and supplementary event services based on the venue, event type, and requirements you provide. From executive coffee breaks and working lunches to formal multi-course gala dinners, we organize dining that reflects your brand.",
      image: "assets/images/service-catering.jpg",
      imageAlt: "Gourmet corporate catering and hospitality presentation",
      badge: "Culinary & Service",
      benefits: [
        "Curated catering menus tailored to corporate events",
        "Seamless service timing coordinated with agenda",
        "Dietary requirement tracking and premium options",
        "Organized selection of supplementary event add-ons"
      ],
      features: [
        {
          title: "Corporate Hospitality Menus",
          desc: "Artisanal coffee services, energizing breakfast buffets, and refined executive plated dinners."
        },
        {
          title: "Dietary Consideration Protocols",
          desc: "Clearly labeled vegetarian, vegan, gluten-free, and culturally specific dietary options."
        },
        {
          title: "Service Pace Synchronization",
          desc: "Meal and break delivery synchronized precisely with conference intermissions to prevent delays."
        },
        {
          title: "Lounge & Bar Presentation",
          desc: "Sophisticated networking beverage bars, sommelier selections, and elegant mocktail stations."
        }
      ],
      process: [
        {
          step: "01",
          title: "Tasting & Concept Curation",
          desc: "Discuss format preferences, service style, guest headcount, and budget parameters."
        },
        {
          step: "02",
          title: "Menu Finalization",
          desc: "Select curated seasonal courses, coffee breaks, and beverage service options."
        },
        {
          step: "03",
          title: "Venue Kitchen Coordination",
          desc: "Liaise with venue banquet staff to verify back-of-house prep areas and serving logistics."
        },
        {
          step: "04",
          title: "Impeccable Service",
          desc: "Professional hospitality staff ensure timely, discreet, and refined culinary delivery."
        }
      ],
      pricing: {
        type: "enquiry",
        description: "Catering is priced per cover/delegate based on menu selection, beverage package, and service style. Quoted transparently as part of your event plan."
      },
      faqs: [
        {
          question: "Can catering be customized for diverse international delegates?",
          answer: "Yes, our hospitality partners specialize in international menus, health-conscious selections, and religious/dietary certifications."
        },
        {
          question: "How do you coordinate meal times with our keynote agenda?",
          answer: "We synchronize kitchen dispatch directly with the stage run-of-show so breaks are fresh and service completes without delaying subsequent sessions."
        },
        {
          question: "Can we request menu tastings prior to the event?",
          answer: "Tastings can be arranged for large-scale galas, annual celebrations, and Signature package engagements."
        },
        {
          question: "Are table linens, tableware, and glassware included?",
          answer: "All standard dinnerware, linens, and presentation elements are coordinated directly with the catering team or venue banquet inventory."
        }
      ],
      ctaLabel: "Explore Catering Options"
    },
    {
      id: "venue-booking-reservation",
      slug: "venue-booking-reservation",
      name: "Venue Booking & Reservation Support",
      category: "Venue Discovery",
      shortDescription: "Keep your preferred venue, reservation information, and booking requirements organized.",
      fullDescription: "Manage the information associated with your venue selection and booking request through a clear, structured process. Actual reservation confirmation depends on venue availability and the applicable booking process. VENORA provides organized administrative clarity from initial hold to signed agreement.",
      image: "assets/images/about-venue.jpg",
      imageAlt: "The Grand Ballroom corporate venue prepared for reservations",
      badge: "Contract & Dates",
      benefits: [
        "Structured booking requirement collection",
        "Date availability and holding period assistance",
        "Contract terms and logistical clause review",
        "Clear communication of next steps and deposit milestones"
      ],
      features: [
        {
          title: "Direct Venue Liaison",
          desc: "Single point of contact coordinating holds, access dates, and facility guidelines."
        },
        {
          title: "Clear Contract Review",
          desc: "Transparent review of load-in times, curfews, sound restrictions, and damage deposit terms."
        },
        {
          title: "Date Hold Management",
          desc: "Structured tracking of provisional dates, option expiries, and formal confirmation deadlines."
        },
        {
          title: "Documentation Organization",
          desc: "All venue insurance policies, licenses, floorplans, and agreements stored in one place."
        }
      ],
      process: [
        {
          step: "01",
          title: "Availability Request",
          desc: "Submit your desired dates, load-in requirements, and alternate backup date options."
        },
        {
          step: "02",
          title: "Provisional Hold",
          desc: "Secure temporary holds on preferred spaces while finalizing internal corporate approvals."
        },
        {
          step: "03",
          title: "Terms & Agreement Review",
          desc: "Review venue booking agreements, payment schedules, and operational parameters."
        },
        {
          step: "04",
          title: "Reservation Handover",
          desc: "Formalize the booking with documentation delivered to your organization's event committee."
        }
      ],
      pricing: {
        type: "enquiry",
        description: "Booking support is integrated within our service packages. Venue rental charges and security deposits are billed according to venue agreements."
      },
      faqs: [
        {
          question: "Does VENORA guarantee venue availability?",
          answer: "Availability depends on each venue's active booking calendar. We place provisional holds where supported and communicate status with full transparency."
        },
        {
          question: "How are payment deposits handled?",
          answer: "Payment terms and deposit schedules are established directly with the venue according to their contractual policies. VENORA organizes the milestone timeline."
        },
        {
          question: "Can we request early access for stage load-in?",
          answer: "Yes, we specify load-in and rehearsal time requirements during the initial booking inquiry to ensure necessary access windows are included."
        },
        {
          question: "What cancellation policies apply?",
          answer: "Cancellation terms are governed by the specific venue agreement. We highlight all penalty deadlines and force majeure provisions clearly prior to signing."
        }
      ],
      ctaLabel: "Enquire About Venue Booking"
    },
    {
      id: "event-support-management",
      slug: "event-support-management",
      name: "Event Support & Booking Management",
      category: "Event Support",
      shortDescription: "Keep event information, selected services, and booking updates organized in one place.",
      fullDescription: "Bring important event information and selected service details together so you can review the progress of your booking and identify the next steps. From production coordination to post-event settlement, VENORA keeps your corporate occasion organized.",
      image: "assets/images/service-av.jpg",
      imageAlt: "Audiovisual presentation lighting and technical event support",
      badge: "Operational Support",
      benefits: [
        "Centralized event information and documentation",
        "Clear status visibility across selected services",
        "Technical coordination for audio-visual and staging",
        "Organized follow-up and post-event administrative review"
      ],
      features: [
        {
          title: "Central Booking Overview",
          desc: "Unified tracking of venue contracts, catering schedules, and production deliverables."
        },
        {
          title: "Audiovisual & Technical Support",
          desc: "Coordination of stage lighting, wireless microphones, LED walls, and recording systems."
        },
        {
          title: "Vendor Point-of-Contact",
          desc: "Direct communication line between your team and all external service contributors."
        },
        {
          title: "Post-Event Reconciliation",
          desc: "Orderly wrap-up, equipment teardown oversight, and final invoice reconciliation."
        }
      ],
      process: [
        {
          step: "01",
          title: "Service Aggregation",
          desc: "Consolidate all chosen services, venue specifications, and operational contacts."
        },
        {
          step: "02",
          title: "Pre-Event Alignment",
          desc: "Comprehensive logistics check 72 hours before the gathering to verify all dependencies."
        },
        {
          step: "03",
          title: "Active Event Supervision",
          desc: "Real-time communication and logistical monitoring throughout the duration of the event."
        },
        {
          step: "04",
          title: "Wrap-up & Debrief",
          desc: "Post-event review, delegate feedback collation, and vendor settlement documentation."
        }
      ],
      pricing: {
        type: "enquiry",
        description: "Support management is included in our Signature tier and available as an add-on for Professional package bookings."
      },
      faqs: [
        {
          question: "What does the booking management service cover on event day?",
          answer: "Our team coordinates vendor arrivals, AV readiness, registration setup, schedule pacing, and resolves logistical adjustments quietly behind the scenes."
        },
        {
          question: "Do you supply the technical audio-visual equipment directly?",
          answer: "We partner with top-tier production vendors and in-house venue technicians, coordinating all technical specifications and load-in schedules."
        },
        {
          question: "How do we track updates during the planning phase?",
          answer: "You receive regular milestone summaries detailing confirmed deliverables, pending decisions, and next steps."
        },
        {
          question: "What happens after the event concludes?",
          answer: "We oversee tear-down coordination, confirm proper return of any rental assets, and provide an organized invoice reconciliation for your finance team."
        }
      ],
      ctaLabel: "Manage Your Booking"
    }
  ];

  // Helper getters
  function getAllServices() {
    return servicesData;
  }

  function getServiceBySlug(slug) {
    if (!slug) return null;
    const clean = String(slug).toLowerCase().trim();
    return servicesData.find(s => s.slug === clean || s.id === clean) || null;
  }

  function getRelatedServices(currentSlug, count = 3) {
    const current = getServiceBySlug(currentSlug);
    if (!current) return servicesData.slice(0, count);
    
    // First try same category, then others
    const others = servicesData.filter(s => s.slug !== current.slug);
    const sameCat = others.filter(s => s.category === current.category);
    const diffCat = others.filter(s => s.category !== current.category);
    return [...sameCat, ...diffCat].slice(0, count);
  }

  function getCategories() {
    const cats = new Set(servicesData.map(s => s.category));
    return ["All Services", ...Array.from(cats)];
  }

  // Expose on global window object for vanilla JS usage
  if (typeof window !== 'undefined') {
    window.VenoraServices = {
      data: servicesData,
      getAll: getAllServices,
      getBySlug: getServiceBySlug,
      getRelated: getRelatedServices,
      getCategories: getCategories
    };
  }

  // CommonJS export if running in Node environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      servicesData,
      getAllServices,
      getServiceBySlug,
      getRelatedServices,
      getCategories
    };
  }
})();
