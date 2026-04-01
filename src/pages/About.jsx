function About() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Tietoa Autotorista</h2>
                    <p className="text-gray-600">Luotettava autonhakupalvelu Suomessa</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8 mb-6">
                    <div className="prose max-w-none">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Missiomme</h3>
                        <p className="text-gray-700 mb-6">
                            Autotori on kattava autojen hakualusta, joka on suunniteltu helpottamaan autonostokokemustasi Suomessa. Keräämme ja yhtenäistämme ilmoituksia useista luotettavista lähteistä, jolloin pääset tutustumaan tuhansiin autoihin yhdellä kätevällä sivustolla.
                            experience in Finland. We collect and normalize listings from multiple trusted sources,
                            giving you access to thousands of cars in one convenient location.
                        </p>

                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tärkeimmät ominaisuudet</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-1">Edistynyt haku</h4>
                                <p className="text-sm text-gray-600">
                                    Suodata hinnan, merkin, mallin, ajokilometrien, polttoainetyypin, vaihteiston ja muiden tekijöiden mukaan
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-1">Vertaa autoja</h4>
                                <p className="text-sm text-gray-600">
                                    Vertaa useita ajoneuvoja rinnakkain, jotta voit tehdä perustellun päätöksen
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-1">Tekoälyn suositukset</h4>
                                <p className="text-sm text-gray-600">
                                    Saat henkilökohtaisia ehdotuksia budjettisi, tarpeidesi ja mieltymystesi perusteella.
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-1">Reaaliaikaiset päivitykset</h4>
                                <p className="text-sm text-gray-600">
                                    Pääset käsiksi uusimpiin ilmoituksiin lähes reaaliaikaisen tietojen synkronoinnin ansiosta
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tietolähteet</h3>
                        <p className="text-gray-700 mb-4">
                            Keräämme autotarjouksia luotettavilta suomalaisilta autoalustoilta:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                            <li><strong>Saka</strong> – Laadukkaat käytetyt autot</li>
                            <li><strong>Autokeskus</strong> – Laaja valikoima autoja</li>
                            <li><strong>Kamux</strong> – Suomen johtava käytettyjen autojen jälleenmyyjä</li>
                        </ul>

                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tietosuoja & vaatimustenmukaisuus</h3>
                        <p className="text-gray-700 mb-4">
                            Kunnioitamme yksityisyyttäsi ja noudatamme kaikkia asiaankuuluvia määräyksiä:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                            <li>Tallennamme vain tavanomaisia yhteenvetotietoja</li>
                            <li>Kuvia tai markkinointitekstejä ei tallenneta pysyvästi</li>
                            <li>Kaikki haut ohjaavat sinut alkuperäisen myyjän verkkosivustolle</li>
                            <li>Käytämme rajoituksia lähde-API:n kuormituksen hallitsemiseksi</li>
                            <li>Ilmoitukset poistetaan automaattisesti poistopyyntöjen perusteella</li>
                        </ul>

                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Yhteystiedot & tuki</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-gray-700 mb-2">
                                Onko sinulla kysymyksiä tai palautetta? Otamme mielellämme vastaan palautetta!
                            </p>
                            <p className="text-sm text-gray-600">
                                Email: <span className="font-medium">contact@autotori.fi</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Support: <span className="font-medium">support@autotori.fi</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-sm text-gray-600">
                        © 2026 Autotori. Kaikki oikeudet pidätetään. Suunniteltu autonostajille Suomessa
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
