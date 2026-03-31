function Privacy({ embedded = false }) {
  return (
    <div className={embedded ? '' : 'bg-gray-50 min-h-screen'}>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? 'py-4 sm:py-5' : 'py-8 sm:py-10'}`}>
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${embedded ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}`}>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Tietosuojaseloste</h1>
          <p className="text-sm text-gray-600 mb-6">Laadittu: 30.03.2026 · Viimeksi päivitetty: 30.03.2026</p>

          <div className="space-y-5 text-sm sm:text-base text-gray-700 leading-7">
            <section>
              <h2 className="font-semibold text-gray-900 mb-1">1. Rekisterinpitäjä</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Yritys: Wasala Oy</li>
                <li>Y-tunnus: 0518666-8</li>
                <li>Osoite: Vasantie 43, 90310 Oulu</li>
                <li>Sähköposti: paavo.vasala@wasala.fi</li>
                <li>Puhelin: 0500586737</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">2. Yhteyshenkilö tietosuoja-asioissa</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nimi: Paavo Vasala</li>
                <li>Sähköposti: paavo.vasala@wasala.fi</li>
                <li>Puhelin: 0500586737</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">3. Mitä tämä tietosuojaseloste koskee</h2>
              <p>
                Tämä tietosuojaseloste kuvaa, miten Autotori.fi käsittelee henkilötietoja verkkosivuston käyttäjistä,
                asiakkaista, yhteydenottajista, ilmoittajista, myyjistä, ostajista ja muista palvelun käyttäjistä.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">4. Mitä henkilötietoja keräämme</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>nimi</li>
                <li>sähköpostiosoite</li>
                <li>puhelinnumero</li>
                <li>osoitetiedot</li>
                <li>yrityksen nimi ja Y-tunnus, jos kyseessä on yritysasiakas</li>
                <li>ajoneuvoilmoitukseen liittyvät tiedot</li>
                <li>yhteydenottolomakkeiden ja viestien sisältö</li>
                <li>laskutus- ja maksutiedot</li>
                <li>asiakassuhteeseen liittyvät tiedot</li>
                <li>IP-osoite, selain- ja laitteen tekniset tiedot</li>
                <li>sivuston käyttöä koskevat loki- ja analytiikkatiedot</li>
                <li>evästeiden ja vastaavien teknologioiden avulla kerättävät tiedot</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">5. Mistä henkilötiedot saadaan</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>käyttäjältä itseltään verkkosivuston, lomakkeiden, yhteydenottojen tai asiakkuuden yhteydessä</li>
                <li>palvelun käytön yhteydessä automaattisesti</li>
                <li>
                  mahdollisilta maksupalveluntarjoajilta, teknisiltä palvelukumppaneilta tai muilta
                  yhteistyökumppaneilta siltä osin kuin se on tarpeen palvelun toteuttamiseksi
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">6. Henkilötietojen käsittelyn tarkoitukset</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>palvelun tarjoaminen ja ylläpito</li>
                <li>käyttäjätilien hallinta</li>
                <li>ajoneuvoilmoitusten julkaisu ja käsittely</li>
                <li>yhteydenottoihin vastaaminen</li>
                <li>asiakassuhteen hoitaminen</li>
                <li>tilausten, maksujen ja laskutuksen hoitaminen</li>
                <li>palvelun turvallisuuden varmistaminen ja väärinkäytösten estäminen</li>
                <li>palvelun analysointi ja kehittäminen</li>
                <li>markkinointi ja asiakasviestintä soveltuvan lainsäädännön mukaisesti</li>
                <li>lakisääteisten velvoitteiden noudattaminen</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">7. Henkilötietojen käsittelyn oikeusperusteet</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>sopimuksen täytäntöönpano tai sopimusta edeltävät toimenpiteet</li>
                <li>rekisterinpitäjän lakisääteinen velvoite</li>
                <li>rekisterinpitäjän oikeutettu etu (esim. palvelun kehittäminen ja tietoturva)</li>
                <li>rekisteröidyn suostumus, kun se on tarpeen</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">8. Tietojen säilytysaika</h2>
              <p>
                Säilytämme henkilötietoja vain niin kauan kuin se on tarpeen tässä selosteessa kuvattujen tarkoitusten
                toteuttamiseksi tai lain edellyttämän ajan.
              </p>
              <p className="mt-2">
                Esimerkkejä säilytysajoista: yhteydenottopyynnöt 12 kk, asiakassuhdetiedot asiakassuhteen ajan ja sen
                jälkeen 6 vuotta, kirjanpitoaineisto kirjanpitolainsäädännön mukaisesti, analytiikka- ja lokitiedot 12
                kuukautta sekä markkinointisuostumukset ja -kiellot niin kauan kuin niiden noudattaminen on tarpeen.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">9. Säännönmukaiset tietojen luovutukset</h2>
              <p>
                Voimme luovuttaa henkilötietoja teknisille palveluntarjoajille ja hosting-kumppaneille,
                maksupalveluntarjoajille, analytiikka- ja viestintäpalvelujen tarjoajille, kirjanpito- ja lakipalveluille
                sekä viranomaisille, kun laki sitä edellyttää. Tietoja ei myydä ulkopuolisille tahoille.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">10. Tietojen siirto EU-/ETA-alueen ulkopuolelle</h2>
              <p>
                Pyrimme ensisijaisesti käsittelemään henkilötietoja EU-/ETA-alueella. Jos tietoja siirretään alueen
                ulkopuolelle, huolehdimme lainmukaisista suojatoimista (esim. SCC-vakiolausekkeet).
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">11. Henkilötietojen suojaaminen</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>pääsynhallinta ja käyttöoikeuksien rajaus</li>
                <li>salasanat ja tunnistautuminen</li>
                <li>palomuurit ja tietoturvapäivitykset</li>
                <li>salattu tiedonsiirto</li>
                <li>lokitus</li>
                <li>henkilöstön ohjeistus ja tietojen käsittelyn rajaaminen tarpeen mukaan</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">12. Rekisteröidyn oikeudet</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>saada tieto henkilötietojensa käsittelystä</li>
                <li>tarkastaa itseään koskevat tiedot</li>
                <li>pyytää virheellisen tai puutteellisen tiedon oikaisua</li>
                <li>pyytää tietojen poistamista, kun lailliset edellytykset täyttyvät</li>
                <li>pyytää käsittelyn rajoittamista</li>
                <li>vastustaa henkilötietojen käsittelyä tietyissä tilanteissa</li>
                <li>pyytää tietojen siirtämistä järjestelmästä toiseen</li>
                <li>peruuttaa suostumus milloin tahansa, jos käsittely perustuu suostumukseen</li>
                <li>tehdä valitus valvontaviranomaiselle</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">13. Oikeuksien käyttäminen</h2>
              <p>
                Rekisteröity voi käyttää oikeuksiaan ottamalla yhteyttä: Wasala Oy, paavo.vasala@wasala.fi,
                Vasantie 43, 90310 Oulu. Pyynnön esittäjän henkilöllisyys voidaan tarvittaessa varmistaa.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">14. Oikeus tehdä valitus valvontaviranomaiselle</h2>
              <p>
                Jos rekisteröity katsoo, että henkilötietoja on käsitelty lainvastaisesti, hänellä on oikeus tehdä
                valitus Tietosuojavaltuutetun toimistolle.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">15. Evästeet</h2>
              <p>
                Autotori.fi voi käyttää evästeitä sivuston tekniseen toimintaan, käyttökokemuksen parantamiseen,
                analytiikkaan ja mahdolliseen markkinointiin. Ei-välttämättömiä evästeitä käytetään vain suostumuksella.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-1">16. Muutokset tähän tietosuojaselosteeseen</h2>
              <p>
                Pidätämme oikeuden päivittää tätä tietosuojaselostetta lainsäädännön, viranomaisohjeiden tai palvelun
                kehityksen vuoksi. Uusin versio on aina saatavilla verkkosivustolla.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
