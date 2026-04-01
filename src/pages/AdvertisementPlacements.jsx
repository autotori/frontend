import { useEffect, useMemo, useState } from "react";

const AD_ROWS = [
    { page: "Etusivu", placement: "Yläbanneri", size: "970×250 / 728×90", device: "Tietokone", screenshot: "home-top-desktop.png" },
    { page: "Etusivu", placement: "Keskisivu", size: "728×90 / 300×250", device: "Tietokone", screenshot: "home-middle-desktop.png" },
    { page: "Etusivu", placement: "Alabanneri", size: "970×90", device: "Tietokone", screenshot: "home-bottom-desktop.png" },
    { page: "Tekoälyneuvoja", placement: "Yläbanneri", size: "970×250", device: "Tietokone", screenshot: "ai-advisor-top-desktop.png" },
    { page: "Tekoälyneuvoja", placement: "Alabanneri", size: "970×90", device: "Tietokone", screenshot: "ai-advisor-bottom-desktop.png" },
    { page: "Vertaa", placement: "Yläbanneri", size: "970×250", device: "Tietokone", screenshot: "compare-top-desktop.png" },
    { page: "Vertaa", placement: "Alabanneri", size: "970×90", device: "Tietokone", screenshot: "compare-bottom-desktop.png" },
    { page: "Haku", placement: "Yläbanneri", size: "970×250", device: "Tietokone", screenshot: "search-top-desktop.png" },
    { page: "Haku", placement: "Alabanneri", size: "970×90", device: "Tietokone", screenshot: "search-bottom-desktop.png" },
    { page: "Etusivu", placement: "Yläbanneri", size: "200×200", device: "Mobiili", screenshot: "home-top-mobile.png" },
    { page: "Etusivu", placement: "Keskisivu", size: "200×200", device: "Mobiili", screenshot: "home-middle-mobile.png" },
    { page: "Etusivu", placement: "Alabanneri", size: "200×200", device: "Mobiili", screenshot: "home-bottom-mobile.png" },
    { page: "Tekoälyneuvoja", placement: "Yläbanneri", size: "200×200", device: "Mobiili", screenshot: "ai-advisor-top-mobile.png" },
    { page: "Tekoälyneuvoja", placement: "Alabanneri", size: "200×200", device: "Mobiili", screenshot: "ai-advisor-bottom-mobile.png" },
    { page: "Vertaa", placement: "Yläbanneri", size: "200×200", device: "Mobiili", screenshot: "compare-top-mobile.png" },
    { page: "Vertaa", placement: "Alabanneri", size: "200×200", device: "Mobiili", screenshot: "compare-bottom-mobile.png" },
    { page: "Haku", placement: "Yläbanneri", size: "200×200", device: "Mobiili", screenshot: "search-top-mobile.png" },
    { page: "Popup", placement: "Keskioverlay", size: "200×200", device: "Mobiili", screenshot: "popup-overlay-mobile.png" }
].map((row, index) => ({ ...row, id: `${row.page}-${row.placement}-${row.size}-${row.device}-${index}` }));

function screenshotPath(row) {
    return `/ad-previews/${row.screenshot}`;
}

function ScreenshotFrame({ row, deviceKey }) {
    const [imgFailed, setImgFailed] = useState(false);
    const src = screenshotPath(row);
    const isMobile = deviceKey === "mobile";

    useEffect(() => {
        setImgFailed(false);
    }, [src]);

    return (
        <div className={`relative rounded-2xl border border-gray-200 bg-gray-100 overflow-hidden shadow-inner ${isMobile ? "max-h-[72vh]" : ""}`}>
            {!imgFailed ? (
                <>
                    <img
                        src={src}
                        alt={`${row.page} ${deviceKey} preview`}
                        className={`block mx-auto object-contain ${isMobile ? "max-h-[72vh] w-auto max-w-full" : "w-full h-auto"}`}
                        onError={() => setImgFailed(true)}
                    />
                </>
            ) : (
                <div className="min-h-[220px] flex flex-col items-center justify-center gap-2 text-center px-4 py-6">
                    <div className="text-gray-400 text-3xl">🖼️</div>
                    <p className="text-sm font-semibold text-gray-700">No image found</p>
                    <p className="text-xs text-gray-500 font-mono break-all">{src}</p>
                </div>
            )}
        </div>
    );
}

function PlacementPreview({ row }) {
    const deviceKeys = row.device === "Mobiili" ? ["mobile"] : ["desktop"];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className={`mx-auto w-full ${deviceKeys.length > 1 ? "max-w-4xl" : "max-w-xl"}`}>
                <div className={`grid gap-4 ${deviceKeys.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`}>
                    {deviceKeys.map((deviceKey) => (
                        <div key={deviceKey} className="space-y-2">
                            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                                {deviceKey === "mobile" ? "Mobiili preview" : "Desktop preview"}
                            </p>
                            <ScreenshotFrame row={row} deviceKey={deviceKey} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PreviewModal({ row, onClose }) {
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    if (!row) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button type="button" onClick={onClose} className="absolute inset-0 bg-black/45" aria-label="Sulje esikatselu" />

            <div className="relative z-10 w-full max-w-3xl max-h-[90vh] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-y-auto">
                <div className="px-5 py-4 border-b border-gray-200 flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Mainospaikan esikatselu</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {row.page} · {row.placement} · {row.size} · {row.device}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-9 w-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-xl leading-none"
                        aria-label="Sulje"
                    >
                        ×
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <PlacementPreview row={row} />
                </div>
            </div>
        </div>
    );
}

export default function AdvertisementPlacements() {
    const [selectedRow, setSelectedRow] = useState(null);

    const groupedRows = useMemo(() => AD_ROWS, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="mb-6 sm:mb-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Mainospaikat ja maksutiedot</h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-4">
                        Valitse haluamasi mainospaikka ja ota yhteyttä lomakkeella. Voit valita mainoksen koon, sijainnin ja laitteet.
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 font-medium mb-6">
                        Vinkki: klikkaa taulukon riviä nähdäksesi visuaalinen esikatselu mainoksen tarkasta sijainnista.
                    </p>

                    <div className="hidden md:block overflow-x-auto rounded-xl border border-blue-200 bg-white shadow-sm">
                        <table className="min-w-full text-sm text-blue-900">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-3 py-2 text-left font-semibold">Sivu</th>
                                    <th className="px-3 py-2 text-left font-semibold">Sijoittelu</th>
                                    <th className="px-3 py-2 text-left font-semibold">Koko</th>
                                    <th className="px-3 py-2 text-left font-semibold">Laite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedRows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="border-t border-blue-100 hover:bg-blue-50/60 cursor-pointer transition-colors"
                                        onClick={() => setSelectedRow(row)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setSelectedRow(row);
                                            }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <td className="px-3 py-2 text-left">{row.page}</td>
                                        <td className="px-3 py-2 text-left">{row.placement}</td>
                                        <td className="px-3 py-2 text-left">{row.size}</td>
                                        <td className="px-3 py-2 text-left">{row.device}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden space-y-2 text-left">
                        {groupedRows.map((row) => (
                            <button
                                key={`mobile-${row.id}`}
                                type="button"
                                className="w-full rounded-xl border border-blue-200 bg-white px-3 py-3 shadow-sm hover:bg-blue-50 transition-colors"
                                onClick={() => setSelectedRow(row)}
                            >
                                <div className="text-sm font-semibold text-gray-900">{row.page} · {row.placement}</div>
                                <div className="mt-1 text-xs text-gray-600">Koko: {row.size}</div>
                                <div className="text-xs text-gray-600">Laite: {row.device}</div>
                            </button>
                        ))}
                    </div>

                    <p className="text-sm text-blue-900 mt-4 mb-2">
                        Mainospaikan hinta määräytyy valitun koon, sijainnin ja kampanjan keston mukaan. Voit liittää mainoskuvat ja kertoa budjetista sekä aikataulusta.
                    </p>
                    <p className="text-xs text-blue-700">
                        Lähetä yhteydenottopyyntö, niin otamme sinuun yhteyttä maksutietojen ja sopimuksen osalta.
                    </p>
                </div>
            </div>

            {selectedRow ? <PreviewModal row={selectedRow} onClose={() => setSelectedRow(null)} /> : null}
        </div>
    );
}
