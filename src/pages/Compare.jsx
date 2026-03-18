import AICompare from '../components/AICompare';
import MobileAdSlot from '../components/MobileAdSlot';
import MobilePopupAd from '../components/MobilePopupAd';

function Compare() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                {/* Top Banner Ad Placeholder (Desktop only) */}
                <div className="hidden md:flex justify-center mb-8">
                    <div className="bg-blue-200 border border-blue-400 rounded-xl flex items-center justify-center text-blue-900 font-bold text-lg shadow-lg" style={{ width: 970, height: 250 }}>
                        Top Banner Ad<br />
                        970x250 px (Billboard)
                        <div className="text-xs font-normal mt-2">Position: Above comparison results | Engagement: Premium placement</div>
                    </div>
                </div>

                <MobileAdSlot
                    className="mb-5"
                    title="Compare Page Top Ad"
                    subtitle="320x100 mobile banner"
                    tone="blue"
                />

                <AICompare />

                {/* Bottom Banner Ad Placeholder (Desktop only) */}
                <div className="hidden md:flex justify-center mt-12">
                    <div className="bg-yellow-200 border border-yellow-400 rounded-xl flex items-center justify-center text-yellow-900 font-bold text-lg shadow-lg" style={{ width: 970, height: 90 }}>
                        Bottom Banner Ad<br />
                        970x90 px (Large Leaderboard)
                        <div className="text-xs font-normal mt-2">Position: Below comparison results | Engagement: Extended visibility</div>
                    </div>
                </div>

                <MobileAdSlot
                    className="mt-8"
                    title="Compare Page Bottom Ad"
                    subtitle="320x100 mobile banner"
                    tone="amber"
                />

            </div>

            <MobilePopupAd
                storageKey="popup-ad-compare"
                title="Sponsored Comparison Deal"
                description="Popup ad example for mobile. Close it to continue browsing."
            />
        </div>
    );
}

export default Compare;
