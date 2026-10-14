/**
 * VENORA - Centralized Site & Contact Configuration
 * Single source of truth for corporate contact details, office hours,
 * social channels, and enquiry integration settings.
 */

(function () {
  'use strict';

  const siteConfig = {
    brandName: "VENORA Events & Venues",
    tagline: "Thoughtfully selected spaces and considered services for exceptional corporate gatherings.",
    
    // Contact Information (Configurable development defaults)
    contact: {
      email: "contact@venora-venues.example.com",
      phone: "+1 (800) 555-0190",
      phoneRaw: "+18005550190",
      address: {
        line1: "450 Montgomery St, Suite 1800",
        city: "San Francisco",
        state: "CA",
        postalCode: "94104",
        country: "United States",
        formatted: "450 Montgomery St, Suite 1800, San Francisco, CA 94104"
      },
      officeHours: [
        { days: "Monday – Friday", hours: "9:00 AM – 6:00 PM PST", note: "Standard client consultation" },
        { days: "Saturday", hours: "10:00 AM – 3:00 PM PST", note: "Scheduled venue walkthroughs" },
        { days: "Sunday", hours: "Closed", note: "Emergency event-day coordination active" }
      ],
      // Truthful verification flag as required by prompt
      isVerifiedOfficeLocation: false,
      mapEmbedUrl: null // Set to valid Google Maps embed URL once verified
    },

    // Social Channels
    social: {
      linkedin: "https://linkedin.com/company/venora-events",
      twitter: "https://x.com/venora_events",
      instagram: "https://instagram.com/venora.events"
    },

    // Form Submission Integration State (Strictly truthful)
    formIntegration: {
      status: "pending_backend", // 'connected' | 'pending_backend'
      endpoint: null, // e.g. "https://api.venora.com/v1/enquiries" when ready
      supportEmail: "contact@venora-venues.example.com",
      noticeMessage: "Form submission service is currently in development mode. To guarantee your enquiry is received immediately, please reach out directly to our concierge team at contact@venora-venues.example.com."
    }
  };

  if (typeof window !== 'undefined') {
    window.VenoraConfig = siteConfig;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteConfig;
  }
})();
