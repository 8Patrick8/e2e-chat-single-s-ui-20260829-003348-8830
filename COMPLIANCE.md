VERDICT: CHANGES_REQUESTED

## 1. DSGVO

**Befund:**  
Die Anwendung verarbeitet keine personenbezogenen Daten im engeren Sinne. Eingaben (Betrag, Prozent, Personenzahl) bleiben ausschließlich im Browser, werden weder gespeichert noch an einen Server übertragen. Es werden keine Cookies gesetzt, kein `localStorage`/`sessionStorage` verwendet, keine externen Skripte oder Tracking-Dienste eingebunden. Daher besteht keine Einwilligungspflicht und kein Cookie-Banner-Erfordernis.

**Bewertung:** Niedrig

**Konkrete Abhilfe:**  
Ein kurzer Datenschutzhinweis im Footer ist empfehlenswert, um transparent zu machen, dass keine personenbezogenen Daten verarbeitet werden. Da die Seite über einen Webserver ausgeliefert wird, kann der Hosting-Anbieter Server-Logs mit IP-Adressen erzeugen – dieser Umstand sollte in einer Datenschutzerklärung erwähnt werden.  
In `index.html` vor `</main>` oder nach `</main>` einen Footer ergänzen:

```html
<footer class="site-footer">
  <p>Dieses Tool verarbeitet keine personenbezogenen Daten. Alle Berechnungen erfolgen lokal in Ihrem Browser.</p>
  <p><a href="datenschutz.html">Datenschutz</a></p>
</footer>
```

---

## 2. EU Cyber Resilience Act (CRA)

**Befund:**  
Die App verwendet keine externen Abhängigkeiten oder Pakete; die Codebasis ist klein und transparent. Es fehlen jedoch dokumentierte Sicherheitseigenschaften, eine dokumentierte Update-/Patch-Fähigkeit und eine SBOM (Software Bill of Materials). Da es sich um ein Produkt mit digitalen Elementen handelt (auch bei rein statischer Bereitstellung), sind diese Dokumentationspflichten relevant.

**Bewertung:** Mittel

**Konkrete Abhilfe:**  
In `README.md` einen Abschnitt **„Sicherheit & Wartung“** ergänzen:

```markdown
## Sicherheit & Wartung
- Keine externen Laufzeit-Abhängigkeiten, keine Paketmanager, keine Build-Schritte.
- SBOM: leer (keine Drittanbieterkomponenten).
- Sicherheitsannahmen: Die App verarbeitet Eingaben ausschließlich lokal, nutzt kein `eval`, kein `innerHTML`; dynamische DOM-Inhalte werden nur über `textContent` gesetzt.
- Update-Prozess: Die statischen Dateien (`index.html`, `app.js`, `styles.css`) werden durch Austausch auf dem Webserver aktualisiert. Sicherheitsrelevante Meldungen können an `security@example.com` gerichtet werden.
```

---

## 3. EU AI Act

**Befund:**  
Keine KI-Funktion vorhanden. Der AI Act ist nicht anwendbar.

---

## 4. Pflichttexte & Benutzeroberfläche

**Befund:**  
Es fehlen Impressum und Datenschutzerklärung. Für eine öffentlich zugängliche Web-App, die geschäftsmäßig angeboten wird, ist ein Impressum in Deutschland nach § 5 DDG grundsätzlich erforderlich. Eine Datenschutzerklärung ist ebenfalls erforderlich, sobald personenbezogene Daten verarbeitet werden – hier zumindest aus Transparenzgründen sinnvoll, auch wenn die App selbst keine personenbezogenen Daten verarbeitet.  
Cookie-Banner: nicht erforderlich, da keine Cookies gesetzt werden. Widerrufsbelehrung: nicht erforderlich, da keine Waren/Dienstleistungen verkauft werden.

**Bewertung:** Hoch

**Konkrete Abhilfe:**  
Zwei statische Zusatzseiten anlegen und im Footer verlinken:

1. `impressum.html` – Anbieterangaben (Name, Anschrift, Kontakt, ggf. Vertretungsberechtigter).  
2. `datenschutz.html` – Hinweis, dass die App keine personenbezogenen Daten verarbeitet, alle Eingaben lokal bleiben und der Hosting-Anbieter ggf. Server-Logs erhebt.

In `index.html` Footer ergänzen:

```html
<footer class="site-footer">
  <a href="impressum.html">Impressum</a>
  <a href="datenschutz.html">Datenschutz</a>
</footer>
```

---

## 5. Barrierefreiheit (WCAG / BITV / EAA)

**Befund:**  
Die Seite verwendet semantisches HTML, Labels mit `for`, `role="status"`/`aria-live` für Hinweise, ausreichende Kontraste und responsive Gestaltung. Es gibt jedoch konkrete Verbesserungspunkte:

- **Fehlerzustände werden nicht für Screenreader verknüpft:** Die Eingabefelder erhalten lediglich die CSS-Klasse `invalid`, aber kein `aria-invalid`-Attribut und keine Verknüpfung zur Fehlermeldung.  
  **Bewertung:** Mittel  
  **Abhilfe:** In `app.js` beim Setzen der Fehlerklasse zusätzlich `field.input.setAttribute("aria-invalid", "true")` und `field.input.setAttribute("aria-describedby", "hint")` setzen; bei korrekter Eingabe `removeAttribute("aria-invalid")` und `removeAttribute("aria-describedby")`.

- **Ergebniswerte werden bei Änderung nicht angesagt:** Nur der Hinweisbereich hat `aria-live`, nicht der Ergebnisbereich. Screenreader-Nutzer erhalten keine Ansage, wenn sich Trinkgeld, Gesamtbetrag oder Betrag pro Person live ändert.  
  **Bewertung:** Mittel  
  **Abhilfe:** Dem Ergebnis-Container `role="status"` und `aria-live="polite"` geben, z. B. `<section class="card" aria-labelledby="results-heading" aria-live="polite">`.

- **Fokusindikator nutzt `outline: none`:** In `styles.css` wird der native Fokusrahmen entfernt und durch einen Box-Shadow ersetzt. Das kann bei bestimmten Kontrasten oder erzwungenen Hochkontrastmodi zu schlechter Sichtbarkeit führen.  
  **Bewertung:** Niedrig  
  **Abhilfe:** `outline: none` entfernen und stattdessen `outline: 2px solid var(--color-accent); outline-offset: 2px;` verwenden; Box-Shadow kann ergänzend bleiben.

- **Fehlermeldung mit `role="alert"` statt `role="status"`:** Bei Eingabefehlern ist eine assertive Ankündigung besser erfassbar.  
  **Bewertung:** Niedrig  
  **Abhilfe:** Im HTML `<p id="hint" class="hint" role="alert" aria-live="assertive"></p>` verwenden.

---

## 6. Sicherheitsimplementierung (Positivbefund)

Keine Sicherheitsmängel im sichtbaren Code:  
- Alle dynamischen DOM-Inhalte werden über `textContent` gesetzt (`setResults`, `clearResults`, `hint.textContent`).  
- Kein `eval`, `new Function`, `setTimeout`/`setInterval` mit String, keine Inline-Event-Handler.  
- Keine Netzwerkzugriffe, keine externen Ressourcen, keine Speicherung von Eingaben.  
- Eingabevalidierung verhindert negative Beträge und Personenzahl 0.