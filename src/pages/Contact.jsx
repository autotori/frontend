import { useEffect, useRef, useState } from 'react';
import { submitContactForm } from '../api';

const INQUIRY_OPTIONS = [
  { value: 'general_query', label: 'General query' },
  { value: 'bug_report', label: 'Bug report' },
  { value: 'advertisement', label: 'Advertisement' }
];

const AD_SPACE_OPTIONS = [
  // Desktop
  { value: 'home_top_banner_970x250', label: 'Etusivu - Yläbanneri - 970×250 - Desktop' },
  { value: 'home_top_banner_728x90', label: 'Etusivu - Yläbanneri - 728×90 - Desktop' },
  { value: 'home_mid_page_728x90', label: 'Etusivu - Keskisivu - 728×90 - Desktop' },
  { value: 'home_mid_page_300x250', label: 'Etusivu - Keskisivu - 300×250 - Desktop' },
  { value: 'home_bottom_banner_970x90', label: 'Etusivu - Alabanneri - 970×90 - Desktop' },
  { value: 'home_feed_ads_300x250', label: 'Etusivu - Feed-mainokset - 300×250 - Kaikki' },
  { value: 'ai_advisor_top_banner_970x250', label: 'Tekoälyneuvoja - Yläbanneri - 970×250 - Desktop' },
  { value: 'ai_advisor_bottom_banner_970x90', label: 'Tekoälyneuvoja - Alabanneri - 970×90 - Desktop' },
  { value: 'ai_comparison_top_banner_970x250', label: 'Vertaa - Yläbanneri - 970×250 - Desktop' },
  { value: 'ai_comparison_bottom_banner_970x90', label: 'Vertaa - Alabanneri - 970×90 - Desktop' },
  { value: 'search_top_banner_970x250', label: 'Haku - Yläbanneri - 970×250 - Desktop' },
  { value: 'search_bottom_banner_970x90', label: 'Haku - Alabanneri - 970×90 - Desktop' },
  { value: 'search_feed_ads_300x250', label: 'Haku - Feed-mainokset - 300×250 - Kaikki' },
  { value: 'feed_native_integrated_cards_300x250', label: 'Feed (Native) - Integroitu kortti - 300×250 - Kaikki' },
  { value: 'feed_native_integrated_cards_336x280', label: 'Feed (Native) - Integroitu kortti - 336×280 - Kaikki' },

  // Mobile
  { value: 'home_top_banner_200x200', label: 'Etusivu - Yläbanneri - 200×200 - Mobile' },
  { value: 'home_feed_ads_300x250_mobile', label: 'Etusivu - Feed-mainokset - 300×250 - Mobile' },
  { value: 'home_feed_ads_336x280_mobile', label: 'Etusivu - Feed-mainokset - 336×280 - Mobile' },
  { value: 'home_mid_page_200x200', label: 'Etusivu - Keskisivu - 200×200 - Mobile' },
  { value: 'home_bottom_banner_200x200', label: 'Etusivu - Alabanneri - 200×200 - Mobile' },
  { value: 'ai_advisor_top_banner_200x200', label: 'Tekoälyneuvoja - Yläbanneri - 200×200 - Mobile' },
  { value: 'ai_advisor_bottom_banner_200x200', label: 'Tekoälyneuvoja - Alabanneri - 200×200 - Mobile' },
  { value: 'ai_compare_top_banner_200x200', label: 'Vertaa - Yläbanneri - 200×200 - Mobile' },
  { value: 'ai_compare_bottom_banner_200x200', label: 'Vertaa - Alabanneri - 200×200 - Mobile' },
  { value: 'search_top_banner_200x200', label: 'Haku - Yläbanneri - 200×200 - Mobile' },
  { value: 'search_feed_ads_300x250_mobile', label: 'Haku - Feed-mainokset - 300×250 - Mobile' },
  { value: 'search_feed_ads_336x280_mobile', label: 'Haku - Feed-mainokset - 336×280 - Mobile' },
  { value: 'feed_native_integrated_cards_300x250_mobile', label: 'Feed (Native) - Integroitu kortti - 300×250 - Mobile' },
  { value: 'feed_native_integrated_cards_336x280_mobile', label: 'Feed (Native) - Integroitu kortti - 336×280 - Mobile' },
  { value: 'popup_center_overlay_200x200', label: 'Popup - Keskioverlay - 200×200 - Mobile' }
];

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  inquiryType: 'general_query',
  message: '',
  companyName: '',
  adBudget: '',
  campaignTimeline: '',
  adSpaces: [],
  adFiles: []
};

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [adSpaceDropdownOpen, setAdSpaceDropdownOpen] = useState(false);
  const adSpaceDropdownRef = useRef(null);

  const isAdvertisementInquiry = form.inquiryType === 'advertisement';

  const selectedAdSpaces = AD_SPACE_OPTIONS.filter((option) => form.adSpaces.includes(option.value));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!adSpaceDropdownRef.current) return;
      if (!adSpaceDropdownRef.current.contains(event.target)) {
        setAdSpaceDropdownOpen(false);
      }
    };

    if (adSpaceDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [adSpaceDropdownOpen]);

  useEffect(() => {
    if (!status || status.type !== 'success') return;

    const timer = setTimeout(() => {
      setStatus(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAdSpace = (value) => {
    setForm((prev) => {
      const exists = prev.adSpaces.includes(value);
      const nextAdSpaces = exists
        ? prev.adSpaces.filter((space) => space !== value)
        : [...prev.adSpaces, value];

      return { ...prev, adSpaces: nextAdSpaces };
    });
  };

  const removeAdSpace = (value) => {
    setForm((prev) => ({
      ...prev,
      adSpaces: prev.adSpaces.filter((space) => space !== value)
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setForm((prev) => ({ ...prev, adFiles: [...prev.adFiles, ...files] }));
    e.target.value = '';
  };

  const removeAdFile = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      adFiles: prev.adFiles.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    if (isAdvertisementInquiry) {
      if (!form.companyName.trim()) {
        setStatus({ type: 'error', message: 'Please enter your company name for advertisement requests.' });
        setSubmitting(false);
        return;
      }

      if (!form.adSpaces.length) {
        setStatus({ type: 'error', message: 'Please select at least one advertisement space.' });
        setSubmitting(false);
        return;
      }
    }

    try {
      await submitContactForm(form);
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Ota yhteyttä</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Onko sinulla kysyttävää, löysitkö virheen vai haluatko mainostaa palvelussamme? Käytä tätä lomaketta, niin ohjaamme pyyntösi oikealle henkilölle.
          </p>
          <p className="text-sm text-blue-700 mt-4">
            <a href="/advertisement-placements" className="underline hover:text-blue-900">
              Katso kaikki mainospaikat ja hinnat
            </a>
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 items-start">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6 lg:p-7 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Get in touch</h3>
            <p className="text-sm text-gray-600 mb-4">
              We usually respond within one business day. For urgent matters, you can reach us by phone during office hours.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.96.73l1.09 3.63a1 1 0 01-.54 1.2l-1.52.76a11.04 11.04 0 006.01 6.01l.76-1.52a1 1 0 011.2-.54l3.63 1.09a1 1 0 01.73.96V19a2 2 0 01-2 2h-1C9.82 21 3 14.18 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-700">+358 40 123 4567</p>
                  <p className="text-gray-400 text-xs">Mon–Fri, 9:00–17:00 (EET)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5A2 2 0 003 7v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-700">support@autotori.fi</p>
                  <p className="text-gray-400 text-xs">We aim to reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 8c0 7-7.5 11-7.5 11S4.5 15 4.5 8A7.5 7.5 0 0112 0.5 7.5 7.5 0 0119.5 8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-700">Helsinki, Finland</p>
                  <p className="text-gray-400 text-xs">Fully remote, serving customers across Finland</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6 lg:p-7 lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    name="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    {INQUIRY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isAdvertisementInquiry && (
                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 sm:p-4 space-y-4">
                  <h4 className="text-sm sm:text-base font-semibold text-blue-900">Advertisement Details</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        required={isAdvertisementInquiry}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Estimated Budget (optional)</label>
                      <input
                        type="text"
                        name="adBudget"
                        value={form.adBudget}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. €1,000 - €3,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Campaign Timeline (optional)</label>
                    <input
                      type="text"
                      name="campaignTimeline"
                      value={form.campaignTimeline}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 1 May 2026 - 30 June 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Advertisement Space (select one or more)</label>

                    <div className="relative" ref={adSpaceDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setAdSpaceDropdownOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <span>
                          {selectedAdSpaces.length > 0
                            ? `${selectedAdSpaces.length} space(s) selected`
                            : 'Choose advertisement spaces'}
                        </span>
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform ${adSpaceDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {adSpaceDropdownOpen && (
                        <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg p-2 max-h-64 overflow-y-auto">
                          <div className="space-y-1">
                            {AD_SPACE_OPTIONS.map((option) => {
                              const checked = form.adSpaces.includes(option.value);
                              return (
                                <label
                                  key={option.value}
                                  className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 cursor-pointer transition-colors ${checked
                                    ? 'border-blue-300 bg-blue-50'
                                    : 'border-transparent bg-white hover:bg-gray-50'
                                    }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleAdSpace(option.value)}
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs sm:text-sm text-gray-700 leading-5">{option.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5">Selected spaces</p>

                      {selectedAdSpaces.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedAdSpaces.map((space) => (
                            <button
                              key={space.value}
                              type="button"
                              onClick={() => removeAdSpace(space.value)}
                              className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-800 px-2.5 py-1 text-[11px] sm:text-xs font-medium hover:bg-blue-200 transition-colors"
                              title="Remove selected ad space"
                            >
                              <span>{space.label}</span>
                              <span className="text-sm leading-none">×</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] sm:text-xs text-gray-400">No advertisement space selected yet.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload Ad Creative (optional, multiple images)</label>
                    <input
                      type="file"
                      name="adFiles"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="mt-2">
                      {form.adFiles.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {form.adFiles.map((file, index) => (
                            <button
                              key={`${file.name}-${file.size}-${index}`}
                              type="button"
                              onClick={() => removeAdFile(index)}
                              className="max-w-full inline-flex items-center gap-1 rounded-full bg-indigo-100 text-indigo-800 px-2.5 py-1 text-[11px] sm:text-xs font-medium hover:bg-indigo-200 transition-colors"
                              title="Remove uploaded file"
                            >
                              <span className="truncate max-w-[180px] sm:max-w-[260px]">{file.name}</span>
                              <span className="text-sm leading-none">×</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] sm:text-xs text-gray-400">No image uploaded yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {status && (
                <div
                  className={`text-sm rounded-lg px-3 py-2 border ${status.type === 'success'
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                >
                  {status.message}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <p className="text-[11px] sm:text-xs text-gray-400 max-w-full sm:max-w-xs">
                  By sending this form you agree that we may contact you about your request. We do not share your details with third parties.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-blue-600 px-4 sm:px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
