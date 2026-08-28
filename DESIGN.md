# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Minimalistisch hell und aufgeräumt mit einem ruhigen Teal-Akzent — wirkt wie ein schlichtes, vertrauenswürdiges Finanz-Tool und bleibt auf Mobil wie Desktop klar lesbar.

## Colors

- `--color-bg`: **#f6f7f9**
- `--color-fg`: **#17191d**
- `--color-accent`: **#0f766e**
- `--color-accent_hover`: **#115e59**
- `--color-accent_active`: **#0c4f4b**
- `--color-border`: **#e3e6ea**
- `--color-muted`: **#5c6570**
- `--color-surface`: **#ffffff**
- `--color-error`: **#b91c1c**
- `--color-error_bg`: **#fdf3f2**

## Typography

- `font_family`: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- `heading_weight`: 600
- `body_weight`: 400

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 6px
- `--radius-md`: 10px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Button

min-height 48px (mobile-tauglich), padding 12px 24px, radius md, bg=accent, color=#ffffff, font-weight 600, font-size 16px; hover: bg=accent_hover (ca. 8% dunkler); active: bg=accent_active; focus-visible: 2px Outline in accent mit 2px Offset; disabled: opacity 0.5, cursor not-allowed.

### Card

bg=surface, border 1px solid border, radius lg (16px), padding 24px (16px auf <480px), box-shadow 0 1px 3px rgba(23,25,29,0.06); trennt Eingabe- und Ergebnisbereich klar voneinander.

### Input

height 48px, padding 0 14px, radius md, border 1px solid border, bg=surface, color=fg, font-size 16px; focus: border=accent + 3px Ring rgba(15,118,110,0.15); ungültig/Fehler: border=error + Hintergrund error_bg; zugehöriges Label: font-size 14px, color=muted, margin-bottom 8px.

### ResultRow

flex mit space-between, padding 12px 0, border-bottom 1px solid border (letzte Zeile ohne); Label 14px muted; Wert 20px fg, font-weight 600, font-variant-numeric: tabular-nums für ruhige Ziffernausrichtung; Währungszeichen direkt am Wert.

### Hint

Fehlermeldung: font-size 14px, color=error, min-height 20px reserviert, positioniert vor den Ergebniszeilen; wird ausschließlich per textContent gesetzt, kein innerHTML.

## Layout Principles

- Container max-width 640px, zentriert, padding 24px (16px auf Mobil), einspaltiges Layout.
- Abstände: 24px zwischen Hauptsektionen, 16px innerhalb einer Sektion, 8px zwischen Label und Eingabefeld.
- Breakpoints: unter 480px stapeln Eingaben und Ergebnisse in voller Breite; ab 480px bleiben die Bereiche einspaltig, aber mit komfortabler Zeilenhöhe und klar getrennten Cards.
- Ergebniswerte rechtsbündig mit tabular-nums, Labels linksbündig; Eingaben und Ergebnisse visuell durch Cards getrennt.
- Kein externes Framework; nur Flexbox/Grid mit den definierten Tokens; Hinweistexte reservieren festen Platz, damit nichts springt.
