import { useEffect, useState } from 'react';

function MobilePopupAd({ storageKey = 'mobile-popup-ad-dismissed', title = 'Special Offer', description = 'This is a demo mobile popup ad slot. Users can close it anytime.' }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(storageKey);
        if (dismissed === 'true') return;

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1800);

        return () => clearTimeout(timer);
    }, [storageKey]);

    const closeAd = () => {
        setIsOpen(false);
        localStorage.setItem(storageKey, 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden">
            <div className="aspect-square w-full max-w-[220px] mx-auto rounded-2xl border border-gray-200 bg-white shadow-2xl flex flex-col items-center justify-center p-4" style={{ minHeight: '200px', minWidth: '200px' }}>
                <button
                    type="button"
                    onClick={closeAd}
                    className="absolute top-4 right-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Close popup ad"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <p className="text-[15px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Ad</p>
                <p className="text-lg font-bold text-gray-900 text-center">{title}</p>
                <p className="mt-2 text-base text-gray-600 text-center">{description}</p>
                <button
                    type="button"
                    className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white"
                >
                    Learn More
                </button>
            </div>
        </div>
    );
}

export default MobilePopupAd;
