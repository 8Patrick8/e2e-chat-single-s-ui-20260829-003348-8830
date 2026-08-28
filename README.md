# Trinkgeld-Rechner

Ein schlichter, einseitiger Trinkgeld-Rechner, der aus Betrag, Trinkgeld-Prozent
und Personenzahl live das Trinkgeld, den Gesamtbetrag und den Betrag pro Person
berechnet. Die Berechnung erfolgt direkt im Browser bei jeder Eingabe — ohne
Klick auf einen Button. Ungültige Eingaben (leere Felder, nicht-numerische Werte,
negative Beträge/Prozente oder eine Personenzahl unter 1) zeigen eine verständliche
Hinweismeldung und unterdrücken die Ergebniswerte, statt unsinnige Ergebnisse
anzuzeigen.

## Tech-Stack

- **Markup:** HTML
- **Styling:** CSS (vanilla, ohne Framework, Design-Tokens aus `DESIGN.md`)
- **Logik:** JavaScript (vanilla, ES5-kompatibel, ohne externe Abhängigkeiten)
- **Build:** keiner — statische Dateien, die direkt im Browser laufen

## Installation

Keine Installation nötig. Es werden keine externen Abhängigkeiten heruntergeladen
oder gebaut — die drei Dateien `index.html`, `styles.css` und `app.js` genügen.

## Starten

Die Seite ist statisch. Einfach `index.html` im Browser öffnen — oder einen
lokalen HTTP-Server starten (empfohlen, weil `file://` moderne Browser-APIs
einschränkt):

```bash
python -m http.server 8000
```

Dann im Browser `http://localhost:8000` öffnen.

## Benutzung

- Die drei Eingabefelder **Betrag**, **Trinkgeld-Prozent** und **Personenzahl**
  sind vorbelegt (50 €, 10 %, 2 Personen).
- Beim Öffnen erscheinen sofort die Werte **Trinkgeld 5.00 €**, **Gesamtbetrag
  55.00 €** und **Betrag pro Person 27.50 €**.
- Jede Änderung eines Eingabewerts aktualisiert alle drei Ergebniswerte sofort
  und ohne Klick auf einen Button.
- Eine ungültige Eingabe (leeres Feld, keine Zahl, negativer Betrag/Prozent,
  Personenzahl kleiner als 1) blendet die Ergebniswerte aus und zeigt stattdessen
  eine verständliche Hinweismeldung im Hinweisbereich.

## Features

- Live-Berechnung bei jedem `input`-Event (kein Button nötig)
- Drei vorbelegte Eingabefelder: Betrag, Trinkgeld-Prozent, Personenzahl
- Drei beschriftete Ergebniswerte: Trinkgeld, Gesamtbetrag, Betrag pro Person
- Werte werden auf zwei Nachkommastellen gerundet und mit dem Währungszeichen € angezeigt
- Validierung mit verständlicher Hinweismeldung und Unterdrückung fehlerhafter Ergebnisse
- Responsives, aufgeräumtes Layout (schlicht, klar getrennte Eingabe-/Ergebnisbereiche)
- Sicher: alle dynamischen DOM-Inhalte werden ausschließlich über `textContent` gesetzt
  (kein `innerHTML`, kein `eval`, keine Event-Handler-Attribute)
