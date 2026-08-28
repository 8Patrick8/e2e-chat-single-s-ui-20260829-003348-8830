VERDICT: APPROVED

## Sicherheitsbericht

**Prüfumfang:** Analyse des vollständigen Produkts (statische Web-App „Trinkgeld-Rechner“) gemäß den vorgegebenen Prüfbereichen. Es wurden keine Sicherheitsscanner ausgeführt (`no applicable security scanners for this project type`); die Bewertung basiert auf manueller Quellcodeanalyse.

**1. Secrets / hartkodierte Zugangsdaten**
Keine gefunden. In `app.js`, `index.html` und `styles.css` sind keine Schlüssel, Passwörter, Token oder kritischen URLs hinterlegt. Die einzige Konstante ist das Euro-Symbol `\u20AC`. Die übrigen aufgelisteten Dateien (`README.md`, `AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, `RUN.json`, `.gitignore`) enthalten laut sichtbarem Stand keine offensichtlichen Secrets.

**2. Injection & Eingaben**
- **XSS:** Alle dynamischen DOM-Inhalte (`tipValue`, `totalValue`, `perPersonValue`, `hint`) werden ausschließlich über `textContent` gesetzt (`app.js`, Zeilen 20–22, 29–31, 56). `innerHTML`, `insertAdjacentHTML` und `outerHTML` werden nicht verwendet.
- **Laufzeit-Codeausführung:** Kein `eval`, kein `new Function`, kein `setTimeout`/`setInterval` mit String-Argument und keine Event-Handler-Attribute. Die Ereignisbindung erfolgt über `addEventListener`.
- **Eingabeparsing:** `parseNumber` konvertiert Eingaben mit `Number(raw)` und validiert mit `isFinite`. Leere, nicht-numerische, negative sowie Personenzahl < 1 werden als Fehler behandelt und führen zu einer verständlichen Meldung; Ergebnisse werden gelöscht. Eine fehlende Obergrenze für Zahlen ist kein ausnutzbares Sicherheitsrisiko.

**3. AuthN/AuthZ**
Nicht anwendbar: Die App ist eine rein statische Client-Anwendung ohne Authentifizierung, Sitzungen oder Backend-Endpunkte.

**4. Abhängigkeiten**
Keine externen Bibliotheken oder CDN-Ressourcen eingebunden. Es bestehen keine bekannten verwundbaren Abhängigkeiten.

**5. Konfiguration & Transport**
- Keine unsicheren Standardeinstellungen, kein offenes Debugging, kein CORS, keine übermäßigen Berechtigungen.
- Optionale Härtung (niedrige Priorität): Eine Content Security Policy könnte ergänzt werden, um künftige Änderungen abzusichern.
  - Betroffene Datei/Stelle: `index.html` im `<head>`.
  - Konkreter Fix: `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'">`.
  - Dies ist abwärtskompatibel, da die App ausschließlich eigene statische Ressourcen (`app.js`, `styles.css`) lädt und keine Inline-Skripte oder externen Abhängigkeiten verwendet.

**Fazit:** Es wurden keine ausnutzbaren Sicherheitslücken festgestellt. Die Sicherheitskriterien AC-07 und AC-08 sind erfüllt. Das Produkt ist für die Auslieferung geeignet.