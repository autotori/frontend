function Cookies({ embedded = false }) {
  return (
    <div className={embedded ? '' : 'bg-gray-50 min-h-screen'}>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? 'py-4 sm:py-5' : 'py-8 sm:py-10'}`}>
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${embedded ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}`}>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Evästekäytäntö</h1>
          <p className="text-sm text-gray-600">Laadittu: 30.03.2026 · Viimeksi päivitetty: 30.03.2026</p>
          <p className="text-sm text-gray-600 mb-6">Soveltamisala: Autotori.fi-verkkosivusto ja siihen liittyvät palvelut</p>

          <div className="space-y-5 text-sm sm:text-base text-gray-700 leading-7">
            <section>
              <h2 className="font-semibold text-gray-900 mb-1">1. Mitä evästeet ovat</h2>
              <p>
                Evästeet ovat pieniä tekstitiedostoja, jotka tallennetaan käyttäjän laitteelle, kun käyttäjä vierailee
                verkkosivustolla. Evästeiden avulla sivusto toimii oikein, muistaa valintoja, kerää analytiikkaa ja voi
                näyttää kohdennettua markkinointia.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">2. Miksi Autotori.fi käyttää evästeitä</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>sivuston teknisen toiminnan varmistamiseen</li>
                <li>käyttäjän valintojen muistamiseen</li>
                <li>sivuston käytön analysointiin ja kehittämiseen</li>
                <li>markkinoinnin ja mainonnan kohdentamiseen, jos tällaisia työkaluja käytetään</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">3. Käyttämämme evästetyypit</h2>
              <p><strong>Välttämättömät evästeet:</strong> tarpeen sivuston perustoimintojen kannalta.</p>
              <p><strong>Toiminnalliset evästeet:</strong> muistavat käyttäjän asetuksia, kuten kielivalinnan ja hakusuodattimet.</p>
              <p><strong>Analytiikkaevästeet:</strong> keräävät tietoa kävijämääristä, suosituimmista sivuista ja liikenteen lähteistä.</p>
              <p><strong>Markkinointievästeet:</strong> mahdollistavat uudelleenmarkkinoinnin, mainonnan mittauksen ja kohdennuksen.</p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">4. Kolmansien osapuolten evästeet</h2>
              <p>
                Autotori.fi voi käyttää kolmansien osapuolten palveluja, jotka asettavat evästeitä käyttäjän laitteelle.
                Tällaisia palveluja voivat olla esimerkiksi Google Analytics, Google Ads, Meta Pixel, YouTube ja muut
                käytössä olevat palvelut. Kolmannet osapuolet käsittelevät tietoja omien ehtojensa mukaisesti.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">5. Suostumus evästeisiin</h2>
              <p>
                Välttämättömiä evästeitä voidaan käyttää ilman erillistä suostumusta. Muiden kuin välttämättömien
                evästeiden käyttö perustuu käyttäjän antamaan suostumukseen evästebannerin tai evästeasetusten kautta.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">6. Evästeiden hallinta</h2>
              <p>
                Käyttäjä voi hallita evästeitä evästebannerin asetuksista, selaimen asetuksista sekä poistamalla
                evästeet laitteeltaan. Evästeiden estäminen voi vaikuttaa sivuston toimivuuteen.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">7. Evästeiden voimassaoloaika</h2>
              <p>
                Evästeet voivat olla istuntokohtaisia (poistuvat selaimen sulkemisen jälkeen) tai pysyviä (säilyvät
                laitteella ennalta määritetyn ajan tai kunnes käyttäjä poistaa ne).
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">8. Ota yhteyttä</h2>
              <p>
                Jos käyttäjällä on kysyttävää evästeiden käytöstä, hän voi ottaa yhteyttä: Wasala Oy,
                paavo.vasala@wasala.fi, Vasantie 43, 90310 Oulu, puhelin 0500586737.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">9. Muutokset evästekäytäntöön</h2>
              <p>
                Autotori.fi voi päivittää tätä evästekäytäntöä palvelun, lainsäädännön tai käytäntöjen muuttuessa.
                Ajantasainen versio julkaistaan aina verkkosivustolla.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cookies;
