/**
 * VENORA Admin Dashboard - Central Data Adapter & Store
 * Connects shared data libraries (services, pricing, blogs, site config)
 * and provides persistent synchronization with the Client Dashboard state.
 * 
 * Strict Vanilla JavaScript implementation.
 */

(function () {
  'use strict';

  const ADMIN_STORAGE_KEY = 'venora_admin_dashboard_state_v1';
  const CLIENT_STORAGE_KEY = 'venora_client_dashboard_state_v1';

  // Fallback initial dataset if local storage is blank
  const defaultInitialState = {
    // 1. Venues Catalog
    venues: [
      {
        id: "VEN-01",
        name: "The Glass Atrium",
        category: "Corporate & Gala",
        location: "1200 Market Street, San Francisco, CA",
        capacity: 250,
        description: "Luminous glass atrium featuring 360-degree skyline panoramas, integrated audio-visual trusses, and acoustic dampening panels for conferences and evening receptions.",
        image: "../assets/images/venue-hall.jpg",
        facilities: ["4K LED Staging", "Executive Green Room", "Acoustic Isolation", "Catering Galley", "Fiber Uplink"],
        includedServices: ["venue-discovery", "catering-event-addons"],
        pricingType: "Fixed Daily Rate",
        basePrice: 14000,
        availability: "Available",
        publicationStatus: "Published",
        createdAt: "2026-01-15",
        updatedAt: "2026-10-10"
      },
      {
        id: "VEN-02",
        name: "Metropolitan Grand Ballroom",
        category: "Gala & Summit",
        location: "800 California Street, San Francisco, CA",
        capacity: 450,
        description: "Grand multi-tier ballroom designed for high-profile stakeholder conventions, awards dinners, and corporate galas with red carpet arrival reception.",
        image: "../assets/images/venue-corporate.jpg",
        facilities: ["Concert Audio System", "Dual LED Screens", "Red Carpet Arrival", "VIP Mezzanine", "Full Commercial Kitchen"],
        includedServices: ["conference-meeting-coordination", "corporate-event-planning"],
        pricingType: "Fixed Daily Rate",
        basePrice: 18000,
        availability: "Available",
        publicationStatus: "Published",
        createdAt: "2026-02-10",
        updatedAt: "2026-10-08"
      },
      {
        id: "VEN-03",
        name: "Executive Amphitheater & Gardens",
        category: "Retreat & Governance",
        location: "450 Montgomery St / Napa Valley, CA",
        capacity: 65,
        description: "Intimate tiered amphitheater and private vineyard terrace, ideal for executive board deliberations, investor roundtables, and high-security summits.",
        image: "../assets/images/venue-meeting.jpg",
        facilities: ["Encrypted Video Conferencing", "Tiered Leather Seating", "Private Terrace", "Sommelier Bar", "Private Valet"],
        includedServices: ["corporate-event-planning", "catering-event-addons"],
        pricingType: "Quote Required",
        basePrice: 8500,
        availability: "Available",
        publicationStatus: "Published",
        createdAt: "2026-03-01",
        updatedAt: "2026-10-12"
      },
      {
        id: "VEN-04",
        name: "Urban Loft & Gallery Hall",
        category: "Showcase & Exhibition",
        location: "Downtown Innovation District, SF, CA",
        capacity: 150,
        description: "Open-concept industrial-chic architectural gallery featuring double-height exposed concrete walls and modular staging, ideal for hardware unveils and showcases.",
        image: "../assets/images/about-venue.jpg",
        facilities: ["Modular Staging", "Projection Mapping", "Outdoor Terrace", "Barista Bar", "Load-in Bay"],
        includedServices: ["venue-discovery", "brand-product-launches"],
        pricingType: "Fixed Daily Rate",
        basePrice: 9200,
        availability: "Available",
        publicationStatus: "Published",
        createdAt: "2026-04-12",
        updatedAt: "2026-10-13"
      },
      {
        id: "VEN-05",
        name: "Silicon Summit Hall",
        category: "Keynote & Conference",
        location: "Silicon Valley Tech Center, San Jose, CA",
        capacity: 220,
        description: "Modern enterprise presentation hall with wide panoramic curved display, multi-track breakout classrooms, and live-streaming production control room.",
        image: "../assets/images/service-conference.jpg",
        facilities: ["Curved Projection Array", "Broadcast Control Booth", "3 Breakout Classrooms", "High-Density WiFi 7", "Press Room"],
        includedServices: ["conference-meeting-coordination"],
        pricingType: "Fixed Daily Rate",
        basePrice: 12000,
        availability: "Maintenance",
        publicationStatus: "Published",
        createdAt: "2026-05-18",
        updatedAt: "2026-09-25"
      }
    ],

    // 2. Clients Directory
    clients: [
      {
        id: "CLI-01",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        company: "Morgan & Co.",
        title: "VP of Global Events & Strategy",
        phone: "+1 (555) 234-8900",
        location: "San Francisco, CA",
        tier: "Enterprise Client",
        status: "Active",
        enquiriesCount: 5,
        bookingsCount: 3,
        lastActivity: "2026-10-14 05:45",
        isDemoAccount: true
      },
      {
        id: "CLI-02",
        name: "Sarah Jenkins",
        email: "s.jenkins@vertex.example.com",
        company: "Vertex Innovations",
        title: "Chief Marketing Officer",
        phone: "+1 (555) 489-1120",
        location: "Seattle, WA",
        tier: "Corporate Tier",
        status: "Active",
        enquiriesCount: 2,
        bookingsCount: 1,
        lastActivity: "2026-10-12 14:20",
        isDemoAccount: false
      },
      {
        id: "CLI-03",
        name: "David Vance",
        email: "d.vance@sterlingcap.example.com",
        company: "Sterling Capital",
        title: "Director of Investor Relations",
        phone: "+1 (555) 672-3344",
        location: "New York, NY",
        tier: "Corporate Tier",
        status: "Active",
        enquiriesCount: 1,
        bookingsCount: 1,
        lastActivity: "2026-10-09 11:15",
        isDemoAccount: false
      },
      {
        id: "CLI-04",
        name: "Rachel Adams",
        email: "r.adams@horizonhealth.example.com",
        company: "Horizon Health",
        title: "Head of People & Culture",
        phone: "+1 (555) 890-5566",
        location: "Boston, MA",
        tier: "Standard Tier",
        status: "Active",
        enquiriesCount: 1,
        bookingsCount: 0,
        lastActivity: "2026-10-05 09:30",
        isDemoAccount: false
      },
      {
        id: "CLI-05",
        name: "Michael Chang",
        email: "m.chang@apexvc.example.com",
        company: "Apex Ventures",
        title: "Managing Partner",
        phone: "+1 (555) 312-7788",
        location: "San Francisco, CA",
        tier: "Enterprise Client",
        status: "Active",
        enquiriesCount: 1,
        bookingsCount: 1,
        lastActivity: "2026-09-28 16:40",
        isDemoAccount: false
      }
    ],

    // 3. Operational Enquiries
    enquiries: [
      {
        id: "ENQ-2026-881",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        clientEmail: "alex.morgan@example.com",
        company: "Morgan & Co.",
        eventName: "Global Tech Leadership Summit 2026",
        serviceId: "venue-discovery",
        serviceName: "Venue Discovery",
        submissionDate: "2026-09-18",
        lastUpdated: "2026-10-12",
        eventDate: "2026-11-20",
        eventEndDate: "2026-11-21",
        guestCount: 180,
        location: "Financial District, San Francisco",
        preferredVenue: "The Glass Atrium",
        status: "Quote Ready", // Draft | Submitted | Under Review | Additional Information Required | Quote Ready | Awaiting Client Approval | Closed
        budget: "$40,000",
        quotedAmount: 38500,
        cateringOption: "Executive Banquet & Sommelier Selection",
        avRequirements: "4K Dual LED Wall, Spatial Audio, Live Broadcast Staging",
        notes: "Keynote presentation with international streaming and VIP breakout salons. Strict acoustic dampening required.",
        stage: "Quote Ready",
        timeline: [
          { date: "2026-09-18", title: "Enquiry Submitted", desc: "Detailed requirements received by VENORA Concierge team." },
          { date: "2026-09-22", title: "Spatial Assessment Complete", desc: "Shortlist generated for 180-delegate conference spaces." },
          { date: "2026-10-12", title: "Tailored Quote Delivered", desc: "Detailed quote of $38,500 prepared and awaiting client review." }
        ]
      },
      {
        id: "ENQ-2026-754",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        clientEmail: "alex.morgan@example.com",
        company: "Morgan & Co.",
        eventName: "Executive Board Strategy Retreat",
        serviceId: "corporate-event-planning",
        serviceName: "Corporate Event Planning",
        submissionDate: "2026-10-02",
        lastUpdated: "2026-10-10",
        eventDate: "2026-12-05",
        eventEndDate: "2026-12-06",
        guestCount: 35,
        location: "Napa Valley / Northern California",
        preferredVenue: "Executive Amphitheater & Gardens",
        status: "Under Review",
        budget: "$25,000",
        quotedAmount: 21500,
        cateringOption: "Farm-to-Table Private Chef Dinner & Luncheon",
        avRequirements: "Secure High-Speed Telepresence & Encrypted Presentation Staging",
        notes: "Confidential Q4 executive board meeting. Absolute privacy and bespoke concierge support requested.",
        stage: "Under Review",
        timeline: [
          { date: "2026-10-02", title: "Enquiry Submitted", desc: "Private brief submitted for executive retreat." },
          { date: "2026-10-10", title: "Concierge Coordination", desc: "Coordinator assigned to inspect Napa Valley private venue options." }
        ]
      },
      {
        id: "ENQ-2026-620",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        clientEmail: "alex.morgan@example.com",
        company: "Morgan & Co.",
        eventName: "Annual Stakeholder Gala & Awards",
        serviceId: "conference-meeting-coordination",
        serviceName: "Conference Coordination",
        submissionDate: "2026-08-14",
        lastUpdated: "2026-10-08",
        eventDate: "2027-01-15",
        eventEndDate: "2027-01-15",
        guestCount: 320,
        location: "Waterfront Atrium, San Francisco",
        preferredVenue: "Metropolitan Grand Ballroom",
        status: "Awaiting Client Approval",
        budget: "$70,000",
        quotedAmount: 62000,
        cateringOption: "Plated 4-Course Gala Dinner & Champagne Service",
        avRequirements: "Full Concert Lighting Rig, Wireless Mics, Dual Stage, Ribbon Displays",
        notes: "Formal black-tie gala recognizing top international partners. Requires red-carpet arrival lounge.",
        stage: "Awaiting Client Approval",
        timeline: [
          { date: "2026-08-14", title: "Enquiry Submitted", desc: "Gala brief submitted with 300+ attendee threshold." },
          { date: "2026-09-05", title: "Venue Hold Placed", desc: "Metropolitan Grand Ballroom held tentatively." },
          { date: "2026-10-08", title: "Final Agreement Prepared", desc: "Contract and service specifications sent for client sign-off." }
        ]
      },
      {
        id: "ENQ-2026-412",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        clientEmail: "alex.morgan@example.com",
        company: "Morgan & Co.",
        eventName: "Product Innovation Showcase 2027",
        serviceId: "catering-event-addons",
        serviceName: "Catering & Event Add-ons",
        submissionDate: "2026-10-13",
        lastUpdated: "2026-10-13",
        eventDate: "2027-02-18",
        eventEndDate: "2027-02-18",
        guestCount: 120,
        location: "Downtown Innovation District",
        preferredVenue: "Urban Loft & Gallery Hall",
        status: "Draft",
        budget: "$28,000",
        quotedAmount: 0,
        cateringOption: "Artisan Coffee Bar & Gourmet Canapés",
        avRequirements: "Interactive Projection Mapping & Live Demo Pods",
        notes: "Drafting specifications for hardware product unveiling. Seeking open-concept staging spaces.",
        stage: "Draft",
        timeline: [
          { date: "2026-10-13", title: "Draft Saved", desc: "Client initiated draft event brief." }
        ]
      },
      {
        id: "ENQ-2026-309",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        clientEmail: "alex.morgan@example.com",
        company: "Morgan & Co.",
        eventName: "Regional Sales Leadership Workshop",
        serviceId: "venue-discovery",
        serviceName: "Venue Discovery",
        submissionDate: "2026-04-10",
        lastUpdated: "2026-05-15",
        eventDate: "2026-06-12",
        eventEndDate: "2026-06-12",
        guestCount: 85,
        location: "Silicon Valley Tech Center",
        preferredVenue: "Silicon Summit Hall",
        status: "Closed",
        budget: "$18,000",
        quotedAmount: 17500,
        cateringOption: "Continental Breakfast & Working Bento Lunches",
        avRequirements: "Dual Projector Array & Lapel Microphone Set",
        notes: "Completed corporate engagement. Archival reference.",
        stage: "Closed",
        timeline: [
          { date: "2026-04-10", title: "Enquiry Submitted", desc: "Brief filed for June workshop." },
          { date: "2026-05-15", title: "Enquiry Completed", desc: "Booking fulfilled and successfully archived." }
        ]
      },
      {
        id: "ENQ-2026-905",
        clientId: "CLI-02",
        clientName: "Sarah Jenkins",
        clientEmail: "s.jenkins@vertex.example.com",
        company: "Vertex Innovations",
        eventName: "Q1 Global Engineering Summit",
        serviceId: "conference-meeting-coordination",
        serviceName: "Conference Coordination",
        submissionDate: "2026-09-20",
        lastUpdated: "2026-10-04",
        eventDate: "2027-02-10",
        eventEndDate: "2027-02-12",
        guestCount: 200,
        location: "Silicon Valley Tech Center",
        preferredVenue: "Silicon Summit Hall",
        status: "Under Review",
        budget: "$35,000",
        quotedAmount: 28000,
        cateringOption: "All-Day Beverage & Hot Buffet",
        avRequirements: "Live Streaming & Breakout Microphones",
        notes: "Requires dual streaming feeds to APAC engineering hubs.",
        stage: "Under Review",
        timeline: [
          { date: "2026-09-20", title: "Enquiry Received", desc: "Requirements logged by concierge." },
          { date: "2026-10-04", title: "Technical Review", desc: "AV team assessing Silicon Summit Hall broadcast capability." }
        ]
      }
    ],

    // 4. Quotes Ledger
    quotes: [
      {
        id: "QUO-2026-881",
        enquiryId: "ENQ-2026-881",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Global Tech Leadership Summit 2026",
        venueName: "The Glass Atrium",
        packageId: "signature",
        packageName: "Signature Tier",
        status: "Awaiting Client Approval", // Draft | Sent for Review | Awaiting Client Approval | Approved | Rejected | Expired
        issueDate: "2026-10-12",
        expiryDate: "2026-10-26",
        totalAmount: 38500,
        notes: "Comprehensive summit staging package with 2-day exclusive atrium access.",
        lineItems: [
          { description: "The Glass Atrium Exclusive Hall Hire (2 Days)", quantity: 2, rate: 12000, amount: 24000 },
          { description: "4K LED Dual Wall & Spatial Audio Engineering Rig", quantity: 1, rate: 8000, amount: 8000 },
          { description: "Executive Banquet & Sommelier Selection Allocation", quantity: 180, rate: 36.11, amount: 6500 }
        ]
      },
      {
        id: "QUO-2026-620",
        enquiryId: "ENQ-2026-620",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Annual Stakeholder Gala & Awards",
        venueName: "Metropolitan Grand Ballroom",
        packageId: "signature",
        packageName: "Signature Tier",
        status: "Sent for Review",
        issueDate: "2026-10-08",
        expiryDate: "2026-10-22",
        totalAmount: 62000,
        notes: "Black-tie awards gala with red carpet arrival and plated 4-course banquet.",
        lineItems: [
          { description: "Metropolitan Grand Ballroom Evening Rental", quantity: 1, rate: 18000, amount: 18000 },
          { description: "4-Course Plated Dinner Service (320 covers)", quantity: 320, rate: 100, amount: 32000 },
          { description: "Theatrical Lighting Rig & Spatial Sound Array", quantity: 1, rate: 8000, amount: 8000 },
          { description: "Red Carpet Media Step & Repeat Arrival Lounge", quantity: 1, rate: 4000, amount: 4000 }
        ]
      },
      {
        id: "QUO-2026-754",
        enquiryId: "ENQ-2026-754",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Executive Board Strategy Retreat",
        venueName: "Executive Amphitheater & Gardens",
        packageId: "professional",
        packageName: "Professional Tier",
        status: "Draft",
        issueDate: "2026-10-10",
        expiryDate: "2026-10-24",
        totalAmount: 21500,
        notes: "Confidential board session in Napa Valley with private chef.",
        lineItems: [
          { description: "Executive Amphitheater Private Rental", quantity: 1, rate: 8500, amount: 8500 },
          { description: "Private Chef Farm-to-Table Dinner & Luncheon", quantity: 35, rate: 200, amount: 7000 },
          { description: "High-Security Encrypted Telepresence Staging", quantity: 1, rate: 6000, amount: 6000 }
        ]
      },
      {
        id: "QUO-2026-905",
        enquiryId: "ENQ-2026-905",
        clientId: "CLI-02",
        clientName: "Sarah Jenkins",
        company: "Vertex Innovations",
        eventName: "Q1 Global Engineering Summit",
        venueName: "Silicon Summit Hall",
        packageId: "professional",
        packageName: "Professional Tier",
        status: "Approved",
        issueDate: "2026-09-30",
        expiryDate: "2026-10-14",
        totalAmount: 28000,
        notes: "Summit technical staging approved by Vertex Innovations finance.",
        lineItems: [
          { description: "Silicon Summit Hall Full Day Access", quantity: 1, rate: 12000, amount: 12000 },
          { description: "Dual-Feed International Broadcast Rig", quantity: 1, rate: 9000, amount: 9000 },
          { description: "Executive Catering & Beverage Service (200 covers)", quantity: 200, rate: 35, amount: 7000 }
        ]
      }
    ],

    // 5. Bookings Directory
    bookings: [
      {
        id: "BKG-2026-104",
        enquiryRef: "ENQ-2026-881",
        quoteRef: "QUO-2026-881",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Global Tech Leadership Summit 2026",
        venue: "The Glass Atrium",
        venueLocation: "1200 Market Street, San Francisco, CA",
        venueImage: "../assets/images/venue-hall.jpg",
        eventDate: "Nov 20, 2026",
        dateRaw: "2026-11-20",
        time: "08:30 AM – 06:00 PM PST",
        guestCount: 180,
        package: "Signature Tier",
        packageId: "signature",
        bookingStatus: "Confirmed", // Confirmed | Pending Confirmation | Past | Cancelled
        bookingStage: "Payment", // Enquiry -> Quote -> Approval -> Payment -> Venue Confirmation
        stageIndex: 4,
        paymentStatus: "Partial", // Paid | Partial | Pending | Overdue
        totalAmount: 38500,
        paidAmount: 20000,
        remainingAmount: 18500,
        nextDueDate: "Nov 05, 2026",
        coordinator: {
          name: "Elena Vance",
          role: "Senior Event Concierge",
          email: "elena.vance@venora-venues.example.com",
          phone: "+1 (800) 555-0190 ext. 204"
        },
        inclusions: [
          "Exclusive Full-Day Access to The Glass Atrium",
          "Comprehensive Audio-Visual Staging with 4K LED Screen",
          "Dedicated VENORA On-Site Event Director & Sound Engineer",
          "Executive Banquet Service with Sommelier Beverage Curation",
          "VIP Green Room & Executive Breakout Salons"
        ],
        notes: "Venue walkthrough confirmed for Oct 24. Stage specs approved by client production lead."
      },
      {
        id: "BKG-2026-092",
        enquiryRef: "ENQ-2026-620",
        quoteRef: "QUO-2026-620",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Annual Stakeholder Gala & Awards",
        venue: "Metropolitan Grand Ballroom",
        venueLocation: "800 California Street, San Francisco, CA",
        venueImage: "../assets/images/venue-corporate.jpg",
        eventDate: "Jan 15, 2027",
        dateRaw: "2027-01-15",
        time: "06:00 PM – 11:30 PM PST",
        guestCount: 320,
        package: "Signature Tier",
        packageId: "signature",
        bookingStatus: "Pending Confirmation",
        bookingStage: "Approval",
        stageIndex: 3,
        paymentStatus: "Pending Quote Approval",
        totalAmount: 62000,
        paidAmount: 0,
        remainingAmount: 62000,
        nextDueDate: "Upon Contract Execution",
        coordinator: {
          name: "Marcus Sterling",
          role: "Lead Production Director",
          email: "marcus.sterling@venora-venues.example.com",
          phone: "+1 (800) 555-0190 ext. 312"
        },
        inclusions: [
          "Full Grand Ballroom Rental (Evening)",
          "4-Course Plated Banquet Dinner for 320 Guests",
          "Theatrical Lighting Truss & Spatial Sound Array",
          "Red Carpet Step & Repeat Media Arrival Area"
        ],
        notes: "Awaiting final sign-off from Morgan & Co. finance department."
      },
      {
        id: "BKG-2025-048",
        enquiryRef: "ENQ-2025-119",
        quoteRef: "QUO-2025-119",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Executive Partner Roundtable 2025",
        venue: "Executive Amphitheater",
        venueLocation: "450 Montgomery St, San Francisco, CA",
        venueImage: "../assets/images/venue-meeting.jpg",
        eventDate: "May 14, 2025",
        dateRaw: "2025-05-14",
        time: "09:00 AM – 04:00 PM PST",
        guestCount: 45,
        package: "Professional Tier",
        packageId: "professional",
        bookingStatus: "Past",
        bookingStage: "Venue Confirmation",
        stageIndex: 5,
        paymentStatus: "Paid in Full",
        totalAmount: 18500,
        paidAmount: 18500,
        remainingAmount: 0,
        nextDueDate: "Settled",
        coordinator: {
          name: "Elena Vance",
          role: "Senior Event Concierge",
          email: "elena.vance@venora-venues.example.com",
          phone: "+1 (800) 555-0190 ext. 204"
        },
        inclusions: [
          "Executive Amphitheater Access",
          "Ultra-HD Telepresence Staging",
          "Gourmet Luncheon & Afternoon Espresso Bar"
        ],
        notes: "Completed with exceptional client satisfaction rating."
      },
      {
        id: "BKG-2026-115",
        enquiryRef: "ENQ-2026-905",
        quoteRef: "QUO-2026-905",
        clientId: "CLI-02",
        clientName: "Sarah Jenkins",
        company: "Vertex Innovations",
        eventName: "Q1 Global Engineering Summit",
        venue: "Silicon Summit Hall",
        venueLocation: "Silicon Valley Tech Center, San Jose, CA",
        venueImage: "../assets/images/service-conference.jpg",
        eventDate: "Feb 10, 2027",
        dateRaw: "2027-02-10",
        time: "09:00 AM – 05:30 PM PST",
        guestCount: 200,
        package: "Professional Tier",
        packageId: "professional",
        bookingStatus: "Confirmed",
        bookingStage: "Payment",
        stageIndex: 4,
        paymentStatus: "Partial",
        totalAmount: 28000,
        paidAmount: 14000,
        remainingAmount: 14000,
        nextDueDate: "Jan 15, 2027",
        coordinator: {
          name: "Elena Vance",
          role: "Senior Event Concierge",
          email: "elena.vance@venora-venues.example.com",
          phone: "+1 (800) 555-0190 ext. 204"
        },
        inclusions: [
          "Silicon Summit Hall Access",
          "Dual-Feed International Broadcast Rig",
          "Executive Lunch & Refreshments"
        ],
        notes: "Deposit received. Staging specs validated."
      }
    ],

    // 6. Invoices & Payments Ledger
    invoices: [
      {
        id: "INV-2026-042",
        bookingId: "BKG-2026-104",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Global Tech Leadership Summit 2026",
        venue: "The Glass Atrium",
        description: "50% Booking Hold & Production Deposit",
        issueDate: "2026-09-28",
        dueDate: "2026-10-10",
        totalAmount: 20000,
        paidAmount: 20000,
        remainingAmount: 0,
        status: "Paid", // Paid | Due Soon | Pending | Overdue | Partially Paid | Cancelled
        paidDate: "2026-10-05",
        paymentMethod: "Corporate Wire Transfer (Demo Ref #WR-9921)",
        taxAmount: 1600,
        subtotal: 18400,
        lineItems: [
          { description: "Primary Venue Reservation Deposit — The Glass Atrium", quantity: 1, rate: 14000, amount: 14000 },
          { description: "AV Staging & Technical Engineering Allocation", quantity: 1, rate: 4400, amount: 4400 },
          { description: "Applicable Venue Operations & Municipal Tax (8.5%)", quantity: 1, rate: 1600, amount: 1600 }
        ]
      },
      {
        id: "INV-2026-049",
        bookingId: "BKG-2026-104",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Global Tech Leadership Summit 2026",
        venue: "The Glass Atrium",
        description: "Final Balance & Hospitality Catering Settlement",
        issueDate: "2026-10-15",
        dueDate: "2026-11-05",
        totalAmount: 18500,
        paidAmount: 0,
        remainingAmount: 18500,
        status: "Due Soon",
        paidDate: null,
        paymentMethod: "Pending Client Authorization",
        taxAmount: 1480,
        subtotal: 17020,
        lineItems: [
          { description: "Remaining Venue Staging & Space Settlement", quantity: 1, rate: 10520, amount: 10520 },
          { description: "Executive Banquet & Sommelier Package (180 covers)", quantity: 180, rate: 36.11, amount: 6500 },
          { description: "Hospitality & Service Operations Surcharge", quantity: 1, rate: 1480, amount: 1480 }
        ]
      },
      {
        id: "INV-2025-018",
        bookingId: "BKG-2025-048",
        clientId: "CLI-01",
        clientName: "Alex Morgan",
        company: "Morgan & Co.",
        eventName: "Executive Partner Roundtable 2025",
        venue: "Executive Amphitheater",
        description: "Full Event Planning, Space Hire & Staging",
        issueDate: "2025-04-20",
        dueDate: "2025-05-01",
        totalAmount: 18500,
        paidAmount: 18500,
        remainingAmount: 0,
        status: "Paid",
        paidDate: "2025-04-25",
        paymentMethod: "Corporate Amex (Demo Auth #AX-4102)",
        taxAmount: 1450,
        subtotal: 17050,
        lineItems: [
          { description: "Executive Amphitheater Full Day Hire", quantity: 1, rate: 12050, amount: 12050 },
          { description: "Telepresence Recording & AV Direction", quantity: 1, rate: 5000, amount: 5000 },
          { description: "Taxes & Municipal Facilities Levy", quantity: 1, rate: 1450, amount: 1450 }
        ]
      },
      {
        id: "INV-2026-055",
        bookingId: "BKG-2026-115",
        clientId: "CLI-02",
        clientName: "Sarah Jenkins",
        company: "Vertex Innovations",
        eventName: "Q1 Global Engineering Summit",
        venue: "Silicon Summit Hall",
        description: "50% Booking Deposit & Broadcast Reservation",
        issueDate: "2026-10-01",
        dueDate: "2026-10-20",
        totalAmount: 14000,
        paidAmount: 14000,
        remainingAmount: 0,
        status: "Paid",
        paidDate: "2026-10-06",
        paymentMethod: "ACH Business Wire (Demo Ref #ACH-5109)",
        taxAmount: 1100,
        subtotal: 12900,
        lineItems: [
          { description: "Silicon Summit Hall Advance Reservation", quantity: 1, rate: 8000, amount: 8000 },
          { description: "Broadcast Engineering Deposit", quantity: 1, rate: 4900, amount: 4900 },
          { description: "Municipal Facility Tax", quantity: 1, rate: 1100, amount: 1100 }
        ]
      }
    ],

    // 7. Notifications
    notifications: [
      {
        id: "NOTIF-ADM-01",
        title: "New Enquiry Submitted",
        message: "Alex Morgan (Morgan & Co.) submitted draft specifications for Product Innovation Showcase 2027.",
        timeAgo: "2 hours ago",
        timestamp: "2026-10-14T05:45:00Z",
        read: false,
        category: "enquiry",
        relatedSection: "enquiries",
        relatedId: "ENQ-2026-412"
      },
      {
        id: "NOTIF-ADM-02",
        title: "Quote Ready for Review",
        message: "Quote QUO-2026-881 for $38,500 delivered to Alex Morgan is awaiting sign-off.",
        timeAgo: "1 day ago",
        timestamp: "2026-10-13T10:15:00Z",
        read: false,
        category: "quote",
        relatedSection: "quotes",
        relatedId: "QUO-2026-881"
      },
      {
        id: "NOTIF-ADM-03",
        title: "Deposit Payment Received",
        message: "$20,000 corporate wire deposit confirmed for INV-2026-042 (The Glass Atrium).",
        timeAgo: "3 days ago",
        timestamp: "2026-10-11T14:30:00Z",
        read: true,
        category: "payment",
        relatedSection: "payments",
        relatedId: "INV-2026-042"
      },
      {
        id: "NOTIF-ADM-04",
        title: "Walkthrough Confirmed",
        message: "On-site walkthrough at The Glass Atrium scheduled with Alex Morgan for Oct 24 at 11:00 AM.",
        timeAgo: "4 days ago",
        timestamp: "2026-10-10T09:00:00Z",
        read: true,
        category: "booking",
        relatedSection: "bookings",
        relatedId: "BKG-2026-104"
      }
    ],

    // 8. Recent Operations Activity
    activityLog: [
      {
        id: "ACT-01",
        type: "Enquiry",
        title: "Enquiry submitted",
        detail: "Draft brief created for Product Innovation Showcase 2027 (Morgan & Co.)",
        timestamp: "Today, 10:15 AM",
        user: "Alex Morgan",
        badgeClass: "badge-gold"
      },
      {
        id: "ACT-02",
        type: "Quote",
        title: "Quote prepared",
        detail: "Proposal of $38,500 prepared for Global Tech Leadership Summit 2026",
        timestamp: "Yesterday, 3:30 PM",
        user: "Elena Vance (Concierge)",
        badgeClass: "badge-blue"
      },
      {
        id: "ACT-03",
        type: "Booking",
        title: "Booking status updated",
        detail: "Stage specs approved for The Glass Atrium (BKG-2026-104)",
        timestamp: "Oct 12, 2026",
        user: "Admin Team",
        badgeClass: "badge-gold"
      },
      {
        id: "ACT-04",
        type: "Payment",
        title: "Payment confirmed",
        detail: "$20,000 wire deposit logged for INV-2026-042",
        timestamp: "Oct 05, 2026",
        user: "Finance Desk",
        badgeClass: "badge-green"
      },
      {
        id: "ACT-05",
        type: "Client",
        title: "Client profile updated",
        detail: "Tier updated to Enterprise Client for Morgan & Co.",
        timestamp: "Sep 28, 2026",
        user: "System",
        badgeClass: "badge-purple"
      }
    ],

    // 9. Site Configuration (Admin View)
    siteSettings: {
      brandName: "VENORA Events & Venues",
      tagline: "Thoughtfully selected spaces and considered services for exceptional corporate gatherings.",
      adminContactEmail: "contact@venora-venues.example.com",
      adminPhone: "+1 (800) 555-0190",
      officeAddress: "450 Montgomery St, Suite 1800, San Francisco, CA 94104",
      officeHoursWeekday: "9:00 AM – 6:00 PM PST",
      officeHoursSaturday: "10:00 AM – 3:00 PM PST",
      officeHoursSunday: "Emergency Event-Day Operations Only",
      socialLinkedin: "https://linkedin.com/company/venora-events",
      socialTwitter: "https://x.com/venora_events",
      socialInstagram: "https://instagram.com/venora.events",
      formEndpointStatus: "Development Mode (Mock Submissions)",
      defaultTheme: "light",
      defaultDirection: "ltr",
      demoModeActive: true
    }
  };

  // State in-memory cache
  let currentState = null;

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Load state with cross-portal synchronization
   */
  function loadState() {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        currentState = JSON.parse(stored);
      } else {
        currentState = deepClone(defaultInitialState);
      }

      // Check if client dashboard state exists and synchronize shared records
      const clientStored = localStorage.getItem(CLIENT_STORAGE_KEY);
      if (clientStored) {
        try {
          const clientData = JSON.parse(clientStored);
          if (clientData.enquiries && Array.isArray(clientData.enquiries)) {
            // Merge client enquiries that match or are new
            clientData.enquiries.forEach(cEnq => {
              const idx = currentState.enquiries.findIndex(e => e.id === cEnq.id);
              if (idx >= 0) {
                // Update status and details
                currentState.enquiries[idx].status = cEnq.status;
                currentState.enquiries[idx].lastUpdated = cEnq.lastUpdated || currentState.enquiries[idx].lastUpdated;
              } else {
                currentState.enquiries.unshift(cEnq);
              }
            });
          }
          if (clientData.bookings && Array.isArray(clientData.bookings)) {
            clientData.bookings.forEach(cBkg => {
              const idx = currentState.bookings.findIndex(b => b.id === cBkg.id);
              if (idx >= 0) {
                currentState.bookings[idx].bookingStatus = cBkg.bookingStatus;
                currentState.bookings[idx].paymentStatus = cBkg.paymentStatus;
              } else {
                currentState.bookings.unshift(cBkg);
              }
            });
          }
          if (clientData.invoices && Array.isArray(clientData.invoices)) {
            clientData.invoices.forEach(cInv => {
              const idx = currentState.invoices.findIndex(i => i.id === cInv.id);
              if (idx >= 0) {
                currentState.invoices[idx].status = cInv.status;
              } else {
                currentState.invoices.unshift(cInv);
              }
            });
          }
        } catch (e) {
          console.warn('VENORA Admin: Could not parse client state for sync', e);
        }
      }
    } catch (err) {
      console.warn('VENORA Admin: LocalStorage read error, using defaults', err);
      currentState = deepClone(defaultInitialState);
    }
  }

  /**
   * Save state locally and synchronize back to client dashboard store where relevant
   */
  function saveState() {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(currentState));

      // Synchronize with client store for Alex Morgan
      const clientStored = localStorage.getItem(CLIENT_STORAGE_KEY);
      if (clientStored) {
        try {
          const clientData = JSON.parse(clientStored);
          // Sync Alex Morgan's enquiries
          currentState.enquiries.forEach(adminEnq => {
            if (adminEnq.clientId === 'CLI-01' || adminEnq.clientEmail === 'alex.morgan@example.com') {
              const cIdx = clientData.enquiries.findIndex(e => e.id === adminEnq.id);
              if (cIdx >= 0) {
                clientData.enquiries[cIdx].status = adminEnq.status;
                clientData.enquiries[cIdx].stage = adminEnq.status;
              }
            }
          });
          // Sync Alex Morgan's bookings
          currentState.bookings.forEach(adminBkg => {
            if (adminBkg.clientId === 'CLI-01' || adminBkg.company === 'Morgan & Co.') {
              const cIdx = clientData.bookings.findIndex(b => b.id === adminBkg.id);
              if (cIdx >= 0) {
                clientData.bookings[cIdx].bookingStatus = adminBkg.bookingStatus;
                clientData.bookings[cIdx].paymentStatus = adminBkg.paymentStatus;
              }
            }
          });
          localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clientData));
        } catch (e) {
          console.warn('VENORA Admin: Client sync write warning', e);
        }
      }
    } catch (err) {
      console.warn('VENORA Admin: LocalStorage write error', err);
    }
  }

  // Initialize state
  loadState();

  // Public API for Admin Dashboard
  const AdminAdapter = {
    // ------------------------------------------------------------------------
    // Overview Metrics & Calculations
    // ------------------------------------------------------------------------
    getOverviewMetrics: function () {
      const enquiries = currentState.enquiries || [];
      const bookings = currentState.bookings || [];
      const invoices = currentState.invoices || [];

      const totalEnquiries = enquiries.length;
      const pendingReviews = enquiries.filter(e => 
        e.status === 'Under Review' || 
        e.status === 'Submitted' || 
        e.status === 'Draft' || 
        e.status === 'Additional Information Required'
      ).length;

      const upcomingBookings = bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Pending Confirmation').length;
      const confirmedBookings = bookings.filter(b => b.bookingStatus === 'Confirmed').length;

      // Outstanding balance calculated from actual invoice records
      const outstandingPayments = invoices.reduce((sum, inv) => {
        const remaining = inv.remainingAmount !== undefined ? inv.remainingAmount : (inv.status === 'Paid' ? 0 : inv.totalAmount);
        return sum + (inv.status !== 'Paid' ? remaining : 0);
      }, 0);

      const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
      const totalPaid = invoices.reduce((sum, inv) => sum + (inv.paidAmount || (inv.status === 'Paid' ? inv.totalAmount : 0)), 0);
      const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue').length;

      return {
        totalEnquiries,
        pendingReviews,
        upcomingBookings,
        confirmedBookings,
        outstandingPayments,
        totalInvoiced,
        totalPaid,
        overdueInvoices
      };
    },

    getActivityLog: function () {
      return currentState.activityLog || [];
    },

    logActivity: function (type, title, detail, badgeClass = 'badge-gold') {
      const newAct = {
        id: 'ACT-' + Date.now(),
        type,
        title,
        detail,
        timestamp: 'Just now',
        user: 'Admin',
        badgeClass
      };
      if (!currentState.activityLog) currentState.activityLog = [];
      currentState.activityLog.unshift(newAct);
      saveState();
      return newAct;
    },

    // ------------------------------------------------------------------------
    // Venues Management
    // ------------------------------------------------------------------------
    getVenues: function (filter = {}) {
      let list = currentState.venues || [];
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(v => v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q));
      }
      if (filter.category && filter.category !== 'all') {
        list = list.filter(v => v.category === filter.category);
      }
      if (filter.status && filter.status !== 'all') {
        list = list.filter(v => v.publicationStatus === filter.status);
      }
      if (filter.availability && filter.availability !== 'all') {
        list = list.filter(v => v.availability === filter.availability);
      }
      return list;
    },

    getVenueById: function (id) {
      return (currentState.venues || []).find(v => v.id === id) || null;
    },

    saveVenue: function (venueData) {
      if (!venueData.id) {
        // Create new
        venueData.id = 'VEN-' + String((currentState.venues.length + 1)).padStart(2, '0');
        venueData.createdAt = new Date().toISOString().split('T')[0];
        venueData.updatedAt = venueData.createdAt;
        if (!venueData.image) venueData.image = '../assets/images/venue-hall.jpg';
        currentState.venues.unshift(venueData);
        AdminAdapter.logActivity('Venue', 'Venue Created', `Added new venue: ${venueData.name}`, 'badge-gold');
      } else {
        // Update existing
        const idx = currentState.venues.findIndex(v => v.id === venueData.id);
        if (idx >= 0) {
          venueData.updatedAt = new Date().toISOString().split('T')[0];
          currentState.venues[idx] = { ...currentState.venues[idx], ...venueData };
          AdminAdapter.logActivity('Venue', 'Venue Updated', `Updated details for ${venueData.name}`, 'badge-blue');
        }
      }
      saveState();
      return venueData;
    },

    deleteVenue: function (id) {
      const idx = currentState.venues.findIndex(v => v.id === id);
      if (idx >= 0) {
        const name = currentState.venues[idx].name;
        currentState.venues.splice(idx, 1);
        AdminAdapter.logActivity('Venue', 'Venue Archived', `Deactivated venue: ${name}`, 'badge-purple');
        saveState();
        return true;
      }
      return false;
    },

    // ------------------------------------------------------------------------
    // Services Management (Reuses window.VenoraServices)
    // ------------------------------------------------------------------------
    getServices: function (filter = {}) {
      let services = [];
      if (window.VenoraServices && typeof window.VenoraServices.getAll === 'function') {
        services = deepClone(window.VenoraServices.getAll());
      } else {
        // Fallback default
        services = [
          { id: "venue-discovery", slug: "venue-discovery", name: "Venue Discovery", category: "Venue Discovery", shortDescription: "Discover suitable venues for conferences and corporate events." },
          { id: "corporate-event-planning", slug: "corporate-event-planning", name: "Corporate Event Planning", category: "Event Planning", shortDescription: "End-to-end event planning and executive coordination." },
          { id: "conference-meeting-coordination", slug: "conference-meeting-coordination", name: "Conference & Meeting Coordination", category: "Conference", shortDescription: "Technical management and speaker timing coordination." },
          { id: "brand-product-launches", slug: "brand-product-launches", name: "Brand & Product Launches", category: "Brand Launches", shortDescription: "High-impact visual staging and press reception management." },
          { id: "corporate-celebrations", slug: "corporate-celebrations", name: "Corporate Celebrations", category: "Celebrations", shortDescription: "Annual galas, milestone banquets, and stakeholder celebrations." },
          { id: "catering-event-addons", slug: "catering-event-addons", name: "Catering & Event Add-ons", category: "Catering & AV", shortDescription: "Sommelier curation, banquet service, and spatial AV packages." }
        ];
      }

      // Merge any admin overrides stored in currentState
      if (currentState.serviceOverrides) {
        services = services.map(s => {
          if (currentState.serviceOverrides[s.id]) {
            return { ...s, ...currentState.serviceOverrides[s.id] };
          }
          return { ...s, publicationStatus: "Published" };
        });
      } else {
        services = services.map(s => ({ ...s, publicationStatus: "Published" }));
      }

      if (filter.search) {
        const q = filter.search.toLowerCase();
        services = services.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
      }
      if (filter.category && filter.category !== 'all') {
        services = services.filter(s => s.category === filter.category);
      }
      return services;
    },

    saveServiceOverride: function (id, data) {
      if (!currentState.serviceOverrides) currentState.serviceOverrides = {};
      currentState.serviceOverrides[id] = { ...(currentState.serviceOverrides[id] || {}), ...data };
      saveState();
      AdminAdapter.logActivity('Service', 'Service Updated', `Updated service parameters for: ${id}`, 'badge-blue');
      return true;
    },

    // ------------------------------------------------------------------------
    // Pricing & Packages Management (Reuses window.VenoraPricing)
    // ------------------------------------------------------------------------
    getPackages: function () {
      let pkgs = [];
      if (window.VenoraPricing && typeof window.VenoraPricing.getAll === 'function') {
        pkgs = deepClone(window.VenoraPricing.getAll());
      } else {
        pkgs = [
          { id: "essential", name: "Essential", priceDisplay: "Custom Quote", sampleNote: "From $35,000", featured: false },
          { id: "professional", name: "Professional", priceDisplay: "Custom Quote", sampleNote: "From $85,000", featured: true },
          { id: "signature", name: "Signature", priceDisplay: "Custom Quote", sampleNote: "Tailored Quote", featured: false }
        ];
      }

      // Check admin overrides
      if (currentState.packageOverrides) {
        pkgs = pkgs.map(p => {
          if (currentState.packageOverrides[p.id]) {
            return { ...p, ...currentState.packageOverrides[p.id] };
          }
          return { ...p, publicationStatus: "Published" };
        });
      } else {
        pkgs = pkgs.map(p => ({ ...p, publicationStatus: "Published" }));
      }
      return pkgs;
    },

    savePackageOverride: function (id, data) {
      if (!currentState.packageOverrides) currentState.packageOverrides = {};
      currentState.packageOverrides[id] = { ...(currentState.packageOverrides[id] || {}), ...data };
      saveState();
      AdminAdapter.logActivity('Pricing', 'Package Updated', `Updated package details for: ${id}`, 'badge-gold');
      return true;
    },

    // ------------------------------------------------------------------------
    // Blog Management (Reuses window.VenoraBlogs)
    // ------------------------------------------------------------------------
    getBlogs: function (filter = {}) {
      let blogs = [];
      if (window.VenoraBlogs && typeof window.VenoraBlogs.getAll === 'function') {
        blogs = deepClone(window.VenoraBlogs.getAll());
      } else {
        blogs = [
          { id: "choose-the-perfect-corporate-event-venue", slug: "choose-the-perfect-corporate-event-venue", title: "How to Choose the Perfect Venue for Your Corporate Event", category: "Venue Selection", publishedDisplay: "October 1, 2026", author: { name: "VENORA Editorial Team" } }
        ];
      }

      // Apply overrides or newly created blogs from currentState
      if (currentState.blogsList && Array.isArray(currentState.blogsList)) {
        blogs = currentState.blogsList;
      } else {
        blogs = blogs.map(b => ({ ...b, publicationStatus: "Published" }));
        currentState.blogsList = blogs;
        saveState();
      }

      if (filter.search) {
        const q = filter.search.toLowerCase();
        blogs = blogs.filter(b => b.title.toLowerCase().includes(q) || (b.category && b.category.toLowerCase().includes(q)));
      }
      if (filter.category && filter.category !== 'all') {
        blogs = blogs.filter(b => b.category === filter.category);
      }
      if (filter.status && filter.status !== 'all') {
        blogs = blogs.filter(b => b.publicationStatus === filter.status);
      }
      return blogs;
    },

    getBlogBySlug: function (slug) {
      const list = AdminAdapter.getBlogs();
      return list.find(b => b.slug === slug || b.id === slug) || null;
    },

    saveBlog: function (blogData) {
      if (!currentState.blogsList) {
        AdminAdapter.getBlogs(); // initializes currentState.blogsList
      }
      if (!blogData.slug) {
        blogData.slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      blogData.id = blogData.slug;
      if (!blogData.image) blogData.image = 'assets/images/venue-hall.jpg';
      if (!blogData.author) {
        blogData.author = { name: "VENORA Editorial Team", role: "Event Planning Insights" };
      }
      if (!blogData.publishedDisplay) {
        blogData.publishedDisplay = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      }

      const idx = currentState.blogsList.findIndex(b => b.slug === blogData.slug);
      if (idx >= 0) {
        currentState.blogsList[idx] = { ...currentState.blogsList[idx], ...blogData };
        AdminAdapter.logActivity('Blog', 'Article Updated', `Updated editorial article: ${blogData.title}`, 'badge-blue');
      } else {
        currentState.blogsList.unshift(blogData);
        AdminAdapter.logActivity('Blog', 'Article Published', `Published new article: ${blogData.title}`, 'badge-gold');
      }
      saveState();
      return blogData;
    },

    // ------------------------------------------------------------------------
    // Enquiries Management
    // ------------------------------------------------------------------------
    getEnquiries: function (filter = {}) {
      let list = currentState.enquiries || [];
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(e => 
          e.id.toLowerCase().includes(q) || 
          e.eventName.toLowerCase().includes(q) || 
          e.clientName.toLowerCase().includes(q) ||
          e.company.toLowerCase().includes(q)
        );
      }
      if (filter.status && filter.status !== 'all') {
        list = list.filter(e => e.status === filter.status);
      }
      if (filter.service && filter.service !== 'all') {
        list = list.filter(e => e.serviceId === filter.service);
      }
      return list;
    },

    getEnquiryById: function (id) {
      return (currentState.enquiries || []).find(e => e.id === id) || null;
    },

    updateEnquiryStatus: function (id, newStatus, note = '') {
      const enq = (currentState.enquiries || []).find(e => e.id === id);
      if (enq) {
        const oldStatus = enq.status;
        enq.status = newStatus;
        enq.stage = newStatus;
        enq.lastUpdated = new Date().toISOString().split('T')[0];
        if (!enq.timeline) enq.timeline = [];
        enq.timeline.unshift({
          date: enq.lastUpdated,
          title: `Status: ${newStatus}`,
          desc: note || `Enquiry transitioned from ${oldStatus} to ${newStatus}.`
        });
        saveState();
        AdminAdapter.logActivity('Enquiry', 'Enquiry Updated', `${id} set to ${newStatus}`, 'badge-gold');
        return enq;
      }
      return null;
    },

    addEnquiryNote: function (id, noteText) {
      const enq = (currentState.enquiries || []).find(e => e.id === id);
      if (enq) {
        if (!enq.timeline) enq.timeline = [];
        enq.timeline.unshift({
          date: new Date().toISOString().split('T')[0],
          title: "Internal Note Added",
          desc: noteText
        });
        saveState();
        AdminAdapter.logActivity('Enquiry', 'Internal Note', `Added note to ${id}`, 'badge-blue');
        return enq;
      }
      return null;
    },

    // ------------------------------------------------------------------------
    // Quotes Management
    // ------------------------------------------------------------------------
    getQuotes: function (filter = {}) {
      let list = currentState.quotes || [];
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(quo => 
          quo.id.toLowerCase().includes(q) ||
          quo.eventName.toLowerCase().includes(q) ||
          quo.clientName.toLowerCase().includes(q) ||
          quo.company.toLowerCase().includes(q)
        );
      }
      if (filter.status && filter.status !== 'all') {
        list = list.filter(quo => quo.status === filter.status);
      }
      return list;
    },

    getQuoteById: function (id) {
      return (currentState.quotes || []).find(quo => quo.id === id) || null;
    },

    saveQuote: function (quoteData) {
      if (!quoteData.id) {
        quoteData.id = 'QUO-2026-' + Math.floor(100 + Math.random() * 900);
        quoteData.issueDate = new Date().toISOString().split('T')[0];
        quoteData.status = quoteData.status || 'Draft';
        currentState.quotes.unshift(quoteData);
        AdminAdapter.logActivity('Quote', 'Quote Created', `Created ${quoteData.id} for ${quoteData.eventName}`, 'badge-gold');
      } else {
        const idx = currentState.quotes.findIndex(q => q.id === quoteData.id);
        if (idx >= 0) {
          currentState.quotes[idx] = { ...currentState.quotes[idx], ...quoteData };
          AdminAdapter.logActivity('Quote', 'Quote Updated', `Updated quote ${quoteData.id}`, 'badge-blue');
        }
      }
      saveState();
      return quoteData;
    },

    updateQuoteStatus: function (id, newStatus) {
      const quote = (currentState.quotes || []).find(q => q.id === id);
      if (quote) {
        quote.status = newStatus;
        saveState();
        AdminAdapter.logActivity('Quote', 'Quote Status', `${id} set to ${newStatus}`, 'badge-gold');
        return quote;
      }
      return null;
    },

    // ------------------------------------------------------------------------
    // Bookings Management
    // ------------------------------------------------------------------------
    getBookings: function (filter = {}) {
      let list = currentState.bookings || [];
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(b => 
          b.id.toLowerCase().includes(q) || 
          b.eventName.toLowerCase().includes(q) || 
          b.venue.toLowerCase().includes(q) ||
          b.clientName.toLowerCase().includes(q)
        );
      }
      if (filter.status && filter.status !== 'all') {
        list = list.filter(b => b.bookingStatus === filter.status);
      }
      if (filter.timeline && filter.timeline !== 'all') {
        if (filter.timeline === 'upcoming') {
          list = list.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Pending Confirmation');
        } else if (filter.timeline === 'past') {
          list = list.filter(b => b.bookingStatus === 'Past');
        }
      }
      return list;
    },

    getBookingById: function (id) {
      return (currentState.bookings || []).find(b => b.id === id) || null;
    },

    updateBookingStatus: function (id, bookingStatus, paymentStatus = null) {
      const booking = (currentState.bookings || []).find(b => b.id === id);
      if (booking) {
        booking.bookingStatus = bookingStatus;
        if (paymentStatus) booking.paymentStatus = paymentStatus;
        saveState();
        AdminAdapter.logActivity('Booking', 'Booking Status', `${id} updated to ${bookingStatus}`, 'badge-gold');
        return booking;
      }
      return null;
    },

    // ------------------------------------------------------------------------
    // Clients Directory
    // ------------------------------------------------------------------------
    getClients: function (filter = {}) {
      let list = currentState.clients || [];
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(c => 
          c.name.toLowerCase().includes(q) || 
          c.email.toLowerCase().includes(q) || 
          c.company.toLowerCase().includes(q)
        );
      }
      return list;
    },

    getClientById: function (id) {
      const client = (currentState.clients || []).find(c => c.id === id) || null;
      if (!client) return null;

      // Attach client's connected records dynamically
      const connectedEnquiries = (currentState.enquiries || []).filter(e => e.clientId === id || e.clientEmail === client.email);
      const connectedQuotes = (currentState.quotes || []).filter(q => q.clientId === id || q.clientName === client.name);
      const connectedBookings = (currentState.bookings || []).filter(b => b.clientId === id || b.clientName === client.name);
      const connectedInvoices = (currentState.invoices || []).filter(i => i.clientId === id || i.clientName === client.name);

      return {
        ...client,
        enquiries: connectedEnquiries,
        quotes: connectedQuotes,
        bookings: connectedBookings,
        invoices: connectedInvoices
      };
    },

    // ------------------------------------------------------------------------
    // Invoices & Payments Management
    // ------------------------------------------------------------------------
    getInvoices: function (filter = {}) {
      let list = currentState.invoices || [];
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(inv => 
          inv.id.toLowerCase().includes(q) || 
          inv.eventName.toLowerCase().includes(q) || 
          inv.clientName.toLowerCase().includes(q) ||
          inv.company.toLowerCase().includes(q)
        );
      }
      if (filter.status && filter.status !== 'all') {
        list = list.filter(inv => inv.status === filter.status);
      }
      return list;
    },

    getInvoiceById: function (id) {
      return (currentState.invoices || []).find(i => i.id === id) || null;
    },

    recordDemoPayment: function (id, paidAmount, method) {
      const invoice = (currentState.invoices || []).find(i => i.id === id);
      if (invoice) {
        invoice.paidAmount = (invoice.paidAmount || 0) + Number(paidAmount);
        if (invoice.paidAmount >= invoice.totalAmount) {
          invoice.paidAmount = invoice.totalAmount;
          invoice.remainingAmount = 0;
          invoice.status = "Paid";
        } else {
          invoice.remainingAmount = invoice.totalAmount - invoice.paidAmount;
          invoice.status = "Partially Paid";
        }
        invoice.paidDate = new Date().toISOString().split('T')[0];
        invoice.paymentMethod = method || "Demo Record";
        saveState();
        AdminAdapter.logActivity('Payment', 'Demo Payment Logged', `$${paidAmount} recorded on ${id}`, 'badge-green');
        return invoice;
      }
      return null;
    },

    // ------------------------------------------------------------------------
    // Notifications Center
    // ------------------------------------------------------------------------
    getNotifications: function (filter = 'all') {
      let list = currentState.notifications || [];
      if (filter === 'unread') return list.filter(n => !n.read);
      if (filter === 'read') return list.filter(n => n.read);
      return list;
    },

    markNotificationRead: function (id) {
      const notif = (currentState.notifications || []).find(n => n.id === id);
      if (notif) {
        notif.read = true;
        saveState();
      }
      return currentState.notifications;
    },

    markAllNotificationsRead: function () {
      (currentState.notifications || []).forEach(n => { n.read = true; });
      saveState();
      return currentState.notifications;
    },

    getUnreadNotificationsCount: function () {
      return (currentState.notifications || []).filter(n => !n.read).length;
    },

    // ------------------------------------------------------------------------
    // Website Settings
    // ------------------------------------------------------------------------
    getSettings: function () {
      return currentState.siteSettings || defaultInitialState.siteSettings;
    },

    saveSettings: function (newSettings) {
      currentState.siteSettings = { ...(currentState.siteSettings || {}), ...newSettings };
      saveState();
      AdminAdapter.logActivity('Settings', 'Settings Updated', 'Platform preferences updated in demo mode', 'badge-purple');
      return currentState.siteSettings;
    },

    resetDemoData: function () {
      currentState = deepClone(defaultInitialState);
      saveState();
      return currentState;
    }
  };

  // Expose globally
  window.VenoraAdminData = AdminAdapter;
})();
