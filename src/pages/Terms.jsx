function Terms({ embedded = false }) {
  return (
    <div className={embedded ? '' : 'bg-gray-50 min-h-screen'}>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? 'py-4 sm:py-5' : 'py-8 sm:py-10'}`}>
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${embedded ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}`}>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Käyttöehdot</h1>
          <p className="text-sm text-gray-600">Laadittu: 30.03.2026 · Viimeksi päivitetty: 30.03.2026</p>
          <p className="text-sm text-gray-600 mb-6">Palvelu: Autotori.fi · Sovellettava laki: Suomen laki</p>

          <div className="space-y-5 text-sm sm:text-base text-gray-700 leading-7">
            <section>
              <h2 className="font-semibold text-gray-900 mb-1">1. Yleistä</h2>
              <p>
                Nämä käyttöehdot koskevat Autotori.fi-verkkosivuston ja siihen liittyvien palveluiden käyttöä.
                Käyttämällä palvelua käyttäjä hyväksyy nämä käyttöehdot.
              </p>
              <p className="mt-2">
                Palvelun omistaa ja sitä ylläpitää Wasala Oy, Y-tunnus 0518666-8, Vasantie 43, 90310 Oulu,
                sähköposti paavo.vasala@wasala.fi, puhelin 0500586737.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">2. Palvelun tarkoitus</h2>
              <p>
                Autotori.fi on informaatiopalvelu, jossa käyttäjät voivat julkaista ajoneuvoilmoituksia, selata
                ajoneuvojen tietoja, ottaa yhteyttä myyjiin, ostaa lisänäkyvyyttä ja muuta markkinointipalvelua.
                Palveluntarjoaja voi kehittää, muuttaa tai poistaa palvelun ominaisuuksia milloin tahansa.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">3. Käyttäjän vastuu</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>antaa oikeita ja ajantasaisia tietoja</li>
                <li>käyttää palvelua lain, hyvän tavan ja näiden ehtojen mukaisesti</li>
                <li>olla julkaisematta virheellistä, harhaanjohtavaa, loukkaavaa tai lainvastaista sisältöä</li>
                <li>olla häiritsemättä palvelun toimintaa tai turvallisuutta</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">4. Ilmoitukset ja sisältö</h2>
              <p>
                Käyttäjä vastaa siitä, että ilmoituksen tiedot ovat oikeita, hänellä on oikeus myydä tai markkinoida
                kohdetta, eikä sisältö loukkaa kolmansien oikeuksia tai riko lakia. Palveluntarjoajalla on oikeus
                poistaa tai muokata ehtoja tai lakia rikkovaa sisältöä.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">5. Kielletty käyttö</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>väärien tai harhaanjohtavien tietojen antaminen</li>
                <li>toisten henkilötietojen luvaton käyttö</li>
                <li>roskapostin tai häiritsevien viestien lähettäminen</li>
                <li>automaattinen tietojen kerääminen ilman lupaa</li>
                <li>palvelun tekninen häirintä, murtautumisyritykset tai väärinkäyttö</li>
                <li>lainvastaisen, loukkaavan tai vilpillisen sisällön julkaiseminen</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">6. Käyttäjätilit</h2>
              <p>
                Jos palvelussa käytetään käyttäjätilejä, käyttäjä vastaa tunnustensa salassapidosta ja tilin käytöstä.
                Palveluntarjoajalla on oikeus sulkea käyttäjätili tai rajoittaa palvelun käyttöä ehtojen rikkomistilanteissa.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">7. Maksulliset palvelut</h2>
              <p>
                Jos Autotori.fi tarjoaa maksullisia palveluja, hinnat ilmoitetaan erikseen. Käyttäjä sitoutuu
                maksamaan valitsemansa palvelut. Maksuja ei palauteta, ellei pakottavasta lainsäädännöstä tai
                palvelussa ilmoitetuista ehdoista muuta johdu.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">8. Vastuunrajoitus</h2>
              <p>
                Autotori.fi tarjotaan sellaisena kuin se on. Palveluntarjoaja ei takaa palvelun keskeytyksetöntä tai
                virheetöntä toimintaa eikä vastaa välillisistä tai epäsuorista vahingoista, ellei pakottavasta laista muuta johdu.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">9. Immateriaalioikeudet</h2>
              <p>
                Palveluun liittyvät oikeudet kuuluvat palveluntarjoajalle tai sen yhteistyökumppaneille, ellei toisin
                ilmoiteta. Käyttäjä säilyttää oikeudet omaan sisältöönsä, mutta myöntää palveluntarjoajalle oikeuden
                käyttää sisältöä palvelun toteuttamiseksi.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">10. Henkilötietojen käsittely</h2>
              <p>
                Henkilötietojen käsittelystä kerrotaan erillisessä tietosuojaselosteessa, johon käyttäjän tulee
                tutustua ennen palvelun käyttöä.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">11. Linkit kolmansien osapuolten palveluihin</h2>
              <p>
                Palvelu voi sisältää linkkejä kolmansien osapuolten palveluihin. Palveluntarjoaja ei vastaa niiden
                sisällöstä, toiminnasta tai tietosuojakäytännöistä.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">12. Muutokset palveluun ja ehtoihin</h2>
              <p>
                Palveluntarjoaja pidättää oikeuden muuttaa palvelua ja näitä käyttöehtoja. Päivitetyt ehdot tulevat
                voimaan, kun ne julkaistaan Autotori.fi-sivustolla.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">13. Sopimuksen päättyminen</h2>
              <p>
                Palveluntarjoajalla on oikeus keskeyttää tai lopettaa käyttäjän pääsy palveluun, jos käyttäjä rikkoo
                näitä ehtoja, lakia tai käyttää palvelua haitallisesti.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">14. Sovellettava laki ja riitojen ratkaisu</h2>
              <p>
                Näihin käyttöehtoihin sovelletaan Suomen lakia. Erimielisyydet pyritään ensisijaisesti ratkaisemaan
                neuvotteluin. Ellei sovintoa synny, riidat ratkaistaan Keskuskauppakamarin välitysmenettelysääntöjen
                mukaisesti, ellei pakottavasta kuluttajansuojalainsäädännöstä muuta johdu.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
