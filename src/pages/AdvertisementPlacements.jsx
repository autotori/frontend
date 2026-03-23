import React from "react";

// Advertisement placements table and info
export default function AdvertisementPlacements() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="mb-6 sm:mb-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Mainospaikat ja maksutiedot</h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-6">
                        Valitse haluamasi mainospaikka ja ota yhteyttä lomakkeella. Voit valita mainoksen koon, sijainnin ja laitteet. Mainospaikat ovat näkyvissä sekä tietokoneella että mobiililaitteilla.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-blue-900 border border-blue-200 rounded-xl">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-2 py-1 text-left">Sivu</th>
                                    <th className="px-2 py-1 text-left">Sijoittelu</th>
                                    <th className="px-2 py-1 text-left">Koko</th>
                                    <th className="px-2 py-1 text-left">Laite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Desktop */}
                                <tr><td className="text-left">Etusivu</td><td className="text-left">Yläbanneri</td><td className="text-left">970×250 / 728×90</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Etusivu</td><td className="text-left">Keskisivu</td><td className="text-left">728×90 / 300×250</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Etusivu</td><td className="text-left">Alabanneri</td><td className="text-left">970×90</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Etusivu</td><td className="text-left">Feed-mainokset</td><td className="text-left">300×250</td><td className="text-left">Kaikki laitteet</td></tr>
                                <tr><td className="text-left">Tekoälyneuvoja</td><td className="text-left">Yläbanneri</td><td className="text-left">970×250</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Tekoälyneuvoja</td><td className="text-left">Alabanneri</td><td className="text-left">970×90</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Vertaa</td><td className="text-left">Yläbanneri</td><td className="text-left">970×250</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Vertaa</td><td className="text-left">Alabanneri</td><td className="text-left">970×90</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Haku</td><td className="text-left">Yläbanneri</td><td className="text-left">970×250</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Haku</td><td className="text-left">Alabanneri</td><td className="text-left">970×90</td><td className="text-left">Tietokone</td></tr>
                                <tr><td className="text-left">Haku</td><td className="text-left">Feed-mainokset</td><td className="text-left">300×250</td><td className="text-left">Kaikki laitteet</td></tr>
                                <tr><td className="text-left">Feed (Native)</td><td className="text-left">Integroitu kortti</td><td className="text-left">300×250 / 336×280</td><td className="text-left">Kaikki laitteet</td></tr>
                                {/* Mobile */}
                                <tr><td className="text-left">Etusivu</td><td className="text-left">Yläbanneri</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Etusivu</td><td className="text-left">Feed-mainokset</td><td className="text-left">300×250 / 336×280</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Etusivu</td><td className="text-left">Keskisivu</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Etusivu</td><td className="text-left">Alabanneri</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Tekoälyneuvoja</td><td className="text-left">Yläbanneri</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Tekoälyneuvoja</td><td className="text-left">Alabanneri</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Vertaa</td><td className="text-left">Yläbanneri</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Vertaa</td><td className="text-left">Alabanneri</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Haku</td><td className="text-left">Yläbanneri</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Haku</td><td className="text-left">Feed-mainokset</td><td className="text-left">300×250 / 336×280</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Feed (Native)</td><td className="text-left">Integroitu kortti</td><td className="text-left">300×250 / 336×280</td><td className="text-left">Mobiili</td></tr>
                                <tr><td className="text-left">Popup</td><td className="text-left">Keskioverlay</td><td className="text-left">200×200</td><td className="text-left">Mobiili</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-blue-900 mt-3 mb-2">
                        Mainospaikan hinta määräytyy valitun koon, sijainnin ja kampanjan keston mukaan. Voit liittää mainoskuvat ja kertoa budjetista sekä aikataulusta.
                    </p>
                    <p className="text-xs text-blue-700">
                        Lähetä yhteydenottopyyntö, niin olemme sinuun yhteydessä maksutietojen ja sopimuksen osalta.
                    </p>
                </div>
            </div>
        </div>
    );
}
