/**
 * VENORA Client Dashboard - Demo Data Engine
 * Single source of truth for the default demo client, enquiries, bookings,
 * invoices, notifications, and dynamic aggregate calculations.
 * 
 * Provides local storage persistence for demo interactions with a quick reset option.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'venora_client_dashboard_state_v1';

  // 1. Initial / Default Demo State
  const defaultInitialState = {
    client: {
      name: "Alex Morgan",
      title: "VP of Global Events & Strategy",
      company: "Morgan & Co.",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 234-8900",
      location: "San Francisco, CA",
      accountType: "Client",
      tier: "Enterprise Client",
      memberSince: "March 2025",
      isDemo: true,
      avatarInitials: "AM",
      avatarColor: "#C5A15B",
      preferences: {
        emailNotifs: true,
        smsAlerts: true,
        quoteUpdates: true,
        newsletter: false
      }
    },

    // Enquiries dataset
    enquiries: [
      {
        id: "ENQ-2026-881",
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
        status: "Quote Ready", // Draft | Submitted | Under Review | Quote Ready | Awaiting Approval | Closed
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
        status: "Awaiting Approval",
        budget: "$70,000",
        quotedAmount: 62000,
        cateringOption: "Plated 4-Course Gala Dinner & Champagne Service",
        avRequirements: "Full Concert Lighting Rig, Wireless Mics, Dual Stage, Ribbon Displays",
        notes: "Formal black-tie gala recognizing top international partners. Requires red-carpet arrival lounge.",
        stage: "Awaiting Approval",
        timeline: [
          { date: "2026-08-14", title: "Enquiry Submitted", desc: "Gala brief submitted with 300+ attendee threshold." },
          { date: "2026-09-05", title: "Venue Hold Placed", desc: "Metropolitan Grand Ballroom held tentatively." },
          { date: "2026-10-08", title: "Final Agreement Prepared", desc: "Contract and service specifications sent for client sign-off." }
        ]
      },
      {
        id: "ENQ-2026-412",
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
      }
    ],

    // Bookings dataset
    bookings: [
      {
        id: "BKG-2026-104",
        enquiryRef: "ENQ-2026-881",
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
        stageIndex: 4, // 1 to 5
        stages: [
          { name: "Enquiry", completed: true, current: false, date: "Sep 18, 2026" },
          { name: "Quote", completed: true, current: false, date: "Sep 25, 2026" },
          { name: "Approval", completed: true, current: false, date: "Sep 28, 2026" },
          { name: "Payment", completed: false, current: true, date: "50% Paid (Balance Due Nov 5)" },
          { name: "Venue Confirmation", completed: false, current: false, date: "Scheduled upon final settlement" }
        ],
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
        stages: [
          { name: "Enquiry", completed: true, current: false, date: "Aug 14, 2026" },
          { name: "Quote", completed: true, current: false, date: "Oct 08, 2026" },
          { name: "Approval", completed: false, current: true, date: "Contract Awaiting Signature" },
          { name: "Payment", completed: false, current: false, date: "Pending Sign-off" },
          { name: "Venue Confirmation", completed: false, current: false, date: "Pending Approval" }
        ],
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
        stages: [
          { name: "Enquiry", completed: true, current: false, date: "Feb 02, 2025" },
          { name: "Quote", completed: true, current: false, date: "Feb 10, 2025" },
          { name: "Approval", completed: true, current: false, date: "Feb 18, 2025" },
          { name: "Payment", completed: true, current: false, date: "Paid Full ($18,500)" },
          { name: "Venue Confirmation", completed: true, current: true, date: "Executed Successfully" }
        ],
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
      }
    ],

    // Invoices dataset
    invoices: [
      {
        id: "INV-2026-042",
        bookingId: "BKG-2026-104",
        eventName: "Global Tech Leadership Summit 2026",
        venue: "The Glass Atrium",
        description: "50% Booking Hold & Production Deposit",
        issueDate: "2026-09-28",
        dueDate: "2026-10-10",
        amount: 20000,
        status: "Paid", // Paid | Due Soon | Pending | Overdue
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
        eventName: "Global Tech Leadership Summit 2026",
        venue: "The Glass Atrium",
        description: "Final Balance & Hospitality Catering Settlement",
        issueDate: "2026-10-15",
        dueDate: "2026-11-05",
        amount: 18500,
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
        eventName: "Executive Partner Roundtable 2025",
        venue: "Executive Amphitheater",
        description: "Full Event Planning, Space Hire & Staging",
        issueDate: "2025-04-20",
        dueDate: "2025-05-01",
        amount: 18500,
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
      }
    ],

    // Notifications dataset
    notifications: [
      {
        id: "NOTIF-01",
        title: "Tailored Quote Ready for Review",
        message: "VENORA Concierge has formulated your tailored quote ($38,500) for the Global Tech Leadership Summit 2026.",
        timeAgo: "2 hours ago",
        timestamp: "2026-10-14T05:45:00Z",
        read: false,
        category: "quote",
        relatedSection: "enquiries",
        relatedId: "ENQ-2026-881"
      },
      {
        id: "NOTIF-02",
        title: "Payment Receipt Confirmed",
        message: "Your deposit payment of $20,000 for invoice INV-2026-042 was successfully recorded in the demo ledger.",
        timeAgo: "1 day ago",
        timestamp: "2026-10-13T10:15:00Z",
        read: false,
        category: "payment",
        relatedSection: "payments",
        relatedId: "INV-2026-042"
      },
      {
        id: "NOTIF-03",
        title: "Venue Walkthrough Appointment",
        message: "Elena Vance has confirmed your physical walkthrough at The Glass Atrium for Friday, Oct 24 at 11:00 AM PST.",
        timeAgo: "3 days ago",
        timestamp: "2026-10-11T14:30:00Z",
        read: true,
        category: "booking",
        relatedSection: "bookings",
        relatedId: "BKG-2026-104"
      },
      {
        id: "NOTIF-04",
        title: "Catering & AV Catalogue Enhanced",
        message: "Explore our latest curated culinary menus and architectural lighting packages in Explore Services.",
        timeAgo: "1 week ago",
        timestamp: "2026-10-07T09:00:00Z",
        read: true,
        category: "service",
        relatedSection: "services",
        relatedId: "catering-event-addons"
      }
    ],

    // Recent activity timeline
    recentActivity: [
      {
        id: "ACT-01",
        title: "Enquiry submitted",
        detail: "Draft brief created for Product Innovation Showcase 2027",
        date: "Today, 10:15 AM",
        tag: "Enquiry",
        icon: "file-plus",
        statusColor: "gold"
      },
      {
        id: "ACT-02",
        title: "Quote received",
        detail: "Proposal of $38,500 ready for Global Tech Leadership Summit 2026",
        date: "Yesterday, 3:30 PM",
        tag: "Quote Ready",
        icon: "dollar-sign",
        statusColor: "blue"
      },
      {
        id: "ACT-03",
        title: "Booking updated",
        detail: "Stage specifications synchronized for The Glass Atrium",
        date: "Oct 12, 2026",
        tag: "Booking",
        icon: "calendar-check",
        statusColor: "gold"
      },
      {
        id: "ACT-04",
        title: "Payment status updated",
        detail: "$20,000 deposit confirmed for INV-2026-042",
        date: "Oct 05, 2026",
        tag: "Payment Confirmed",
        icon: "check-circle",
        statusColor: "green"
      }
    ]
  };

  /**
   * Clone helper
   */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Load state from localStorage or default
   */
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure client name matches user session if user logged in via public site auth
        const sessionKey = 'venora_active_session';
        const sessionData = sessionStorage.getItem(sessionKey) || localStorage.getItem(sessionKey);
        if (sessionData) {
          try {
            const activeUser = JSON.parse(sessionData);
            if (activeUser.name && activeUser.name !== 'Corporate Delegate') {
              parsed.client.name = activeUser.name;
              parsed.client.email = activeUser.email || parsed.client.email;
              parsed.client.company = activeUser.company || parsed.client.company;
              parsed.client.avatarInitials = activeUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            }
          } catch (e) {
            // ignore session parse error
          }
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Dashboard state load error:', e);
    }
    return deepClone(defaultInitialState);
  }

  // Active state
  let currentState = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
      window.dispatchEvent(new CustomEvent('venora:dashboard-state-changed', { detail: currentState }));
    } catch (e) {
      console.warn('Dashboard state save error:', e);
    }
  }

  function resetState() {
    currentState = deepClone(defaultInitialState);
    saveState();
    return currentState;
  }

  /**
   * Dynamic Metrics Calculation
   */
  const Metrics = {
    // 1. Active Enquiries: Enquiries that are not 'Closed'
    getActiveEnquiriesCount: function () {
      return currentState.enquiries.filter(e => e.status !== 'Closed').length;
    },

    // 2. Upcoming Events: Bookings with date in the future and not 'Past' or 'Cancelled'
    getUpcomingEventsCount: function () {
      return currentState.bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Pending Confirmation').length;
    },

    // 3. Pending Payments: Total remaining balance across all active bookings & due invoices
    getPendingPaymentsAmount: function () {
      const dueInvoicesTotal = currentState.invoices
        .filter(inv => inv.status === 'Due Soon' || inv.status === 'Pending')
        .reduce((sum, inv) => sum + inv.amount, 0);
      return dueInvoicesTotal;
    },

    // 4. Confirmed Bookings: Bookings with status === 'Confirmed'
    getConfirmedBookingsCount: function () {
      return currentState.bookings.filter(b => b.bookingStatus === 'Confirmed').length;
    },

    // Total Amount Quoted across all active bookings
    getTotalQuotedAmount: function () {
      return currentState.bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    },

    // Total Amount Paid across all bookings
    getTotalPaidAmount: function () {
      return currentState.bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
    },

    // Total Balance Remaining across all bookings
    getTotalRemainingBalance: function () {
      return currentState.bookings.reduce((sum, b) => sum + (b.remainingAmount || 0), 0);
    },

    // Next Due Date string
    getNextPaymentDue: function () {
      const dueInv = currentState.invoices.find(inv => inv.status === 'Due Soon');
      return dueInv ? `${dueInv.dueDate} ($${dueInv.amount.toLocaleString()})` : "No urgent payments";
    },

    // Unread notifications count
    getUnreadNotificationsCount: function () {
      return currentState.notifications.filter(n => !n.read).length;
    }
  };

  /**
   * State Mutation Helpers
   */
  const API = {
    getState: () => currentState,
    getMetrics: () => Metrics,
    resetState: resetState,

    // Client profile
    updateClient: function (updatedFields) {
      currentState.client = { ...currentState.client, ...updatedFields };
      if (updatedFields.name) {
        currentState.client.avatarInitials = updatedFields.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      }
      saveState();
      return currentState.client;
    },

    // Enquiries
    getEnquiries: function (filterStatus = 'all') {
      if (filterStatus === 'all') return currentState.enquiries;
      return currentState.enquiries.filter(e => e.status.toLowerCase() === filterStatus.toLowerCase());
    },

    getEnquiryById: function (id) {
      return currentState.enquiries.find(e => e.id === id) || null;
    },

    createEnquiry: function (newEnquiry) {
      const id = "ENQ-2026-" + Math.floor(100 + Math.random() * 900);
      const record = {
        id: id,
        eventName: newEnquiry.eventName || "New Corporate Event",
        serviceId: newEnquiry.serviceId || "venue-discovery",
        serviceName: newEnquiry.serviceName || "Venue Discovery",
        submissionDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        eventDate: newEnquiry.eventDate || "2027-03-15",
        guestCount: parseInt(newEnquiry.guestCount, 10) || 50,
        location: newEnquiry.location || "San Francisco, CA",
        preferredVenue: newEnquiry.preferredVenue || "Pending Selection",
        status: "Submitted",
        budget: newEnquiry.budget || "Custom Quote",
        quotedAmount: 0,
        cateringOption: newEnquiry.cateringOption || "Standard Corporate Refreshments",
        avRequirements: newEnquiry.avRequirements || "Standard Audio-Visual Provisions",
        notes: newEnquiry.notes || "",
        stage: "Submitted",
        timeline: [
          { date: new Date().toISOString().split('T')[0], title: "Enquiry Submitted", desc: "Brief submitted for venue & service evaluation." }
        ]
      };

      currentState.enquiries.unshift(record);

      // Add to recent activity
      currentState.recentActivity.unshift({
        id: "ACT-" + Date.now(),
        title: "Enquiry submitted",
        detail: `${record.eventName} (${record.id})`,
        date: "Just now",
        tag: "Enquiry",
        icon: "file-plus",
        statusColor: "gold"
      });

      // Add notification
      currentState.notifications.unshift({
        id: "NOTIF-" + Date.now(),
        title: "New Enquiry Submitted",
        message: `Your enquiry for ${record.eventName} has been received by VENORA Concierge.`,
        timeAgo: "Just now",
        timestamp: new Date().toISOString(),
        read: false,
        category: "enquiry",
        relatedSection: "enquiries",
        relatedId: id
      });

      saveState();
      return record;
    },

    // Bookings
    getBookings: function (filter = 'all') {
      if (filter === 'all') return currentState.bookings;
      if (filter === 'upcoming') {
        return currentState.bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Pending Confirmation');
      }
      if (filter === 'past') {
        return currentState.bookings.filter(b => b.bookingStatus === 'Past');
      }
      if (filter === 'pending') {
        return currentState.bookings.filter(b => b.bookingStatus === 'Pending Confirmation');
      }
      return currentState.bookings;
    },

    getBookingById: function (id) {
      return currentState.bookings.find(b => b.id === id) || null;
    },

    // Event Details Update
    updateEventDetails: function (bookingId, updatedDetails) {
      const booking = currentState.bookings.find(b => b.id === bookingId);
      if (booking) {
        if (updatedDetails.eventName) booking.eventName = updatedDetails.eventName;
        if (updatedDetails.eventDate) booking.eventDate = updatedDetails.eventDate;
        if (updatedDetails.time) booking.time = updatedDetails.time;
        if (updatedDetails.guestCount) booking.guestCount = parseInt(updatedDetails.guestCount, 10);
        if (updatedDetails.venue) booking.venue = updatedDetails.venue;
        if (updatedDetails.notes) booking.notes = updatedDetails.notes;
        saveState();
        return booking;
      }
      return null;
    },

    // Invoices
    getInvoices: function () {
      return currentState.invoices;
    },

    getInvoiceById: function (id) {
      return currentState.invoices.find(inv => inv.id === id) || null;
    },

    // Notifications
    getNotifications: function (filter = 'all') {
      if (filter === 'unread') return currentState.notifications.filter(n => !n.read);
      if (filter === 'read') return currentState.notifications.filter(n => n.read);
      return currentState.notifications;
    },

    markNotificationRead: function (id) {
      const notif = currentState.notifications.find(n => n.id === id);
      if (notif) {
        notif.read = true;
        saveState();
      }
      return currentState.notifications;
    },

    markAllNotificationsRead: function () {
      currentState.notifications.forEach(n => { n.read = true; });
      saveState();
      return currentState.notifications;
    }
  };

  // Expose globally for vanilla dashboard scripts
  window.VenoraDemoData = API;
})();
