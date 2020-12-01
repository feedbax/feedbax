/** @jsx jsx */

import "react";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

import Layout from "~components/Layout";
import Footer from "~components/Footer";
import Logo from "~components/Logo";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div css={stylesLegal}>
        <Logo styles={{ marginTop: "30px" }} />

        <div className="content">
          <h1>Open-Source Lizenzen</h1>

          <ul>
            <li>
              Twemoji -{" "}
              <a href="https://twemoji.twitter.com/">
                https://twemoji.twitter.com/
              </a>
              <br />
              <small>
                Copyright 2020 Twitter, Inc and other contributors <br />
                Code licensed under the MIT License:{" "}
                <a href="http://opensource.org/licenses/MIT">
                  http://opensource.org/licenses/MIT
                </a>{" "}
                <br />
                Graphics licensed under CC-BY 4.0:{" "}
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  https://creativecommons.org/licenses/by/4.0/
                </a>
              </small>
            </li>
          </ul>

          <h1>Datenschutz</h1>

          <p>
            Wir freuen uns sehr, dass du Feedbax, powered by 365 STEPS, nutzt.
            Feedbax ist ein Umfragetool, das im Rahmen des STEPS-Projekts der
            Christlichen Jugendpflege e. V. konzeptioniert und realisiert wurde.
            Als Team ist es uns wichtig, dass der Schutz und die Sicherheit
            Deiner persönlichen Daten gewahrt werden.
          </p>

          <h2>1. Allgemeine Hinweise</h2>

          <p>
            Nachfolgend möchten wir dich über unsere Datenschutzerklärung
            informieren. Du findest hier Informationen über die Erhebung und
            Verwendung persönlicher Daten bei der Nutzung unserer Webseite. Wir
            beachten dabei das für Deutschland geltende Datenschutzrecht.
          </p>

          <p>
            Wir weisen ausdrücklich darauf hin, dass die Datenübertragung im
            Internet Sicherheitslücken aufweisen und nicht lückenlos vor dem
            Zugriff durch Dritte geschützt werden kann.
          </p>

          <h3>Verantwortliche Stelle</h3>
          <h4>Christliche Jugendpflege e. V.</h4>

          <p>
            Vertreten durch Markus Danzeisen, Lothar Jung, Oliver Last, Matthias
            Kohlmann
          </p>

          <p>
            Hundesegen 2<br />
            27432 Basdahl
            <br />
            Telefon +49 4766 717
            <br />
            E-Mail: info@365steps.de
          </p>

          <h5>Registereintrag</h5>

          <p>
            Eingetragen im Vereinsregister.
            <br />
            Registergericht: Amtsgericht Tostedt
            <br />
            Registernummer: VR 150127
          </p>

          <h3>Was uns wichtig ist</h3>

          <p>
            Feedbax soll für dich einfach und unkompliziert sein. Deine
            Privatsphäre ist uns wichtig. Im Folgenden schreiben wir dir, wie
            deine Daten bei uns verwendet werden. Wenn du mehr dazu wissen
            willst oder generell Fragen hast, kontaktiere uns einfach unter
            info@365steps.de.
          </p>

          <h3>Widerruf deiner Einwilligung zur Datenverarbeitung</h3>

          <p>
            Viele Datenverarbeitungsvorgänge sind nur mit Deiner ausdrücklichen
            Einwilligung möglich. Du kannst eine bereits erteilte Einwilligung
            jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per
            E-Mail an uns. Da Datenerfassung bei Feedbax grundsätzlich anonym
            erfolgt, musst du uns jedoch belegen können, dass Du diese Daten
            erstellt hast! Falls es um deine personenbezogenen Daten geht,
            werden wir diese auch ohne Beleg löschen.
          </p>

          <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>

          <p>
            Im Falle von Verstößen gegen die DSGVO steht dir ein Beschwerderecht
            bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat deines
            gewöhnlichen Aufenthalts, deines Arbeitsplatzes oder des Orts des
            mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet
            anderweitiger verwaltungsrechtlicher oder gerichtlicher
            Rechtsbehelfe.
          </p>

          <h3>SSL- bzw. TLS-Verschlüsselung</h3>

          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
            Übertragung vertraulicher Inhalte, die du an uns als Seitenbetreiber
            sendest, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
            Verbindung erkennst du daran, dass die Adresszeile des Browsers von
            "http://" auf "https://" wechselt und an dem Schloss-Symbol in
            deinem Browser. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert
            ist, können die Daten, die du an uns schickst, nicht von Dritten
            mitgelesen werden.
          </p>

          <h3>Widerspruch gegen Werbe-E-Mails</h3>

          <p>
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
            Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter
            Werbung und Informationsmaterialien wird hiermit widersprochen. Wir
            behalten uns ausdrücklich rechtliche Schritte im Falle der
            unverlangten Zusendung von Werbeinformationen, etwa durch
            Spam-E-Mails, vor.
          </p>

          <h2>2. Datenerfassung auf dieser Website</h2>

          <h3>Weshalb verwenden wir deine Daten?</h3>

          <ul>
            <li>
              Wir wollen mega interaktive Umfragen durchführen bzw. dir und
              deinem Event ein exzellentes Umfragetool zur Verfügung stellen.
            </li>
          </ul>

          <h3>
            Welche Arten von Daten werden im Rahmen der Nutzung von Feedbax
            erhoben?
          </h3>

          <ul>
            <li>Inhaltsdaten</li>
            <li>Nutzungsdaten</li>
            <li>Meta-/Kommunikationsdaten</li>
          </ul>

          <h3>Erhebung personenbezogener Daten</h3>

          <p>
            Du kannst Feedbax ohne Angabe personenbezogener Daten nutzen. Da
            Feedbax ein offenes Umfragetool ist, besteht natürlich die
            Möglichkeit, dass du versehentlich und für alle anderen
            Umfrageteilnehmer einsehbare personenbezogene Daten einträgst. Diese
            Daten werden in unserer Datenbank gespeichert, jedoch nicht an
            Dritte weitergegeben. Solltest du mit einem personenbezogenen
            Eintrag nicht einverstanden sein, melde dich bitte unverzüglich bei
            uns.
          </p>

          <p>
            Die Antworten der Umfrage-Teilnehmer sind zu 100% anonym. Wir haben
            keine Möglichkeit, abgegebene Antworten einzelnen Personen
            zuzuordnen. Wichtig: Mit Feedbax sollten keine personenbezogenen
            Daten gesammelt werden.
          </p>

          <h3>Auskunft, Löschung und Berichtigung</h3>

          <p>
            Du hast nämlich im Rahmen der geltenden gesetzlichen Bestimmungen
            jederzeit das Recht auf unentgeltliche Auskunft über deine
            gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
            und den Zweck der Datenverarbeitung und ggf. ein Recht auf
            Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren
            Fragen zum Thema personenbezogene Daten kannst du dich jederzeit
            unter der im Impressum angegebenen Adresse an uns wenden.
          </p>

          <p>
            Wir behalten uns vor, doppelte und ähnliche Einträge sowieso
            sinnlose Kommentare zu löschen.
          </p>

          <h3>Urheberrecht</h3>

          <p>
            Mit dem Eintragen von jeglichen Daten stimmst du zu, dass deine
            anonymisiert eingegebenen Daten in vollem Umfang verarbeitet und von
            uns veröffentlicht werden dürfen. Personenbezogene Daten werden wir
            wie oben schon beschrieben nicht weitergeben.
          </p>

          <h3>Cookies</h3>

          <p>
            Cookies sind Informationen, die von unserem Webserver oder
            Webservern Dritter an die Web-Browser der Nutzer übertragen und dort
            für einen späteren Abruf gespeichert werden. Bei Cookies kann es
            sich um kleine Dateien oder sonstige Arten der
            Informationsspeicherung handeln.
          </p>

          <p>
            Bei der Nutzung von Feedbax werden folgende Daten gespeichert und
            anonymisiert an den Server übertragen.
          </p>

          <ul>
            <li>
              Ein Session/Tracking-Cookie für deine Nutzung von Feedbax (Um
              Mehrfachantworten zu vermeiden)
            </li>
            <li>Ein Session-Cookie für die Nutzung von socket.io</li>
            <li>
              Ein Cookie um sich an die akzeptierte Cookie Meldung zu erinnern
            </li>
            <li>
              Ein Session-Cookie um die Verbindung einem unserer Server zuordnen
              zu können (konsistente Verbindung)
            </li>
          </ul>

          <p>
            Außerdem enthält ein Cookie die Angabe über seine Herkunft und die
            Speicherfrist. Session-Cookies werden zum Teil gelöscht, wenn du
            Feedbax beendest.
          </p>

          <p>
            Gespeicherte Cookies können in den Systemeinstellungen deines
            Browsers gelöscht werden. Der Ausschluss von Cookies kann dazu
            führen, dass Feedbax nicht mehr funktioniert.
          </p>

          <h3>Kontaktaufnahme</h3>

          <p>
            Bei der Kontaktaufnahme mit uns (per Kontaktformular oder E-Mail)
            werden die Angaben des Nutzers zur Bearbeitung der Kontaktanfrage
            und deren Abwicklung gem. Art. 6 Abs. 1 lit. b) DSGVO verarbeitet.
          </p>

          <h2>3. Hosting</h2>

          <h3>Externes Hosting</h3>

          <p>
            Diese Website wird bei einem externen Dienstleister gehostet
            (digitalocean.com). Alle Daten, die du eingibst und von uns erfasst
            werden, werden auf den Servern des Hosters gespeichert. Hierbei kann
            es sich v. a. um Inhaltsdaten, Meta- und Kommunikationsdaten,
            Inhaltsdaten (Fragen und Antworten der Teilnehmer) und sonstige
            Daten handeln, die über unsere Website generiert werden.
          </p>

          <p>
            Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung
            gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1
            lit. b DSGVO) und im Interesse einer sicheren, schnellen und
            effizienten Bereitstellung unseres Online-Angebots durch einen
            professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Unser Hoster
            wird deine Daten nur insoweit verarbeiten, wie dies zur Erfüllung
            seiner Leistungspflichten erforderlich ist und unsere Weisungen in
            Bezug auf diese Daten befolgen.
          </p>

          <p>
            Unsere Infrastruktur für Feedbax wird bei digitalocean.com gehostet.
            Die Infrastruktur ist in Frankfurt am Main untergebracht und
            unterliegt somit auch den EU-Datenschutzbestimmungen. Sämtliche
            Daten, die für den Betrieb der Applikation notwendig sind, werden
            dort gespeichert.
            <br />
            <br />
            <a href="https://www.digitalocean.com/legal/gdpr/">
              https://www.digitalocean.com/legal/gdpr/
            </a>
          </p>

          <p>
            digitalocean.com ist unter dem US-EU-Datenschutzabkommen "Privacy
            Shield" zertifiziert und verpflichtet sich damit, die
            EU-Datenschutzvorgaben einzuhalten.
            <br />
            <br />
            <a href="https://www.digitalocean.com/legal/privacy-shield/">
              https://www.digitalocean.com/legal/privacy-shield/
            </a>
          </p>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

const stylesLegal = css`
  font-family: "Roboto Slab";

  position: relative;
  background-color: ${colors.first};

  color: ${colors.third};
  text-align: justify;

  * {
    color: ${colors.third};
  }

  .content {
    max-width: 600px;

    margin: 60px auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;
