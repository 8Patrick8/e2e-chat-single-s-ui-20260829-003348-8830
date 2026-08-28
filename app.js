(function () {
  "use strict";

  var CURRENCY = "\u20AC";

  var amountInput = document.getElementById("amount");
  var percentInput = document.getElementById("tipPercent");
  var peopleInput = document.getElementById("people");
  var tipValue = document.getElementById("tipValue");
  var totalValue = document.getElementById("totalValue");
  var perPersonValue = document.getElementById("perPersonValue");
  var hint = document.getElementById("hint");

  var fields = [
    {
      input: amountInput,
      label: "Betrag",
      check: function (n) {
        return n < 0 ? "darf nicht negativ sein" : null;
      }
    },
    {
      input: percentInput,
      label: "Trinkgeld-Prozent",
      check: function (n) {
        return n < 0 ? "darf nicht negativ sein" : null;
      }
    },
    {
      input: peopleInput,
      label: "Personenzahl",
      check: function (n) {
        return n < 1 ? "muss mindestens 1 sein" : null;
      }
    }
  ];

  function formatMoney(value) {
    return value.toFixed(2) + " " + CURRENCY;
  }

  function setResults(tip, total, perPerson) {
    tipValue.textContent = formatMoney(tip);
    totalValue.textContent = formatMoney(total);
    perPersonValue.textContent = formatMoney(perPerson);
  }

  function clearResults() {
    tipValue.textContent = "";
    totalValue.textContent = "";
    perPersonValue.textContent = "";
  }

  function parseNumber(raw) {
    if (raw.trim() === "") {
      return null;
    }
    var n = Number(raw);
    return isFinite(n) ? n : NaN;
  }

  function calculate() {
    var values = [];
    var firstError = null;

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var n = parseNumber(field.input.value);
      var error = null;

      if (n === null) {
        error = field.label + " ist leer. Bitte einen Wert eingeben.";
      } else if (isNaN(n)) {
        error = field.label + " muss eine Zahl sein.";
      } else {
        var checkError = field.check(n);
        if (checkError) {
          error = field.label + " " + checkError + ".";
        }
      }

      if (error) {
        field.input.classList.add("invalid");
        if (firstError === null) {
          firstError = error;
        }
      } else {
        field.input.classList.remove("invalid");
        values.push(n);
      }
    }

    if (firstError !== null) {
      hint.textContent = firstError;
      clearResults();
      return;
    }

    hint.textContent = "";

    var tip = values[0] * (values[1] / 100);
    var total = values[0] + tip;
    var perPerson = total / values[2];

    setResults(tip, total, perPerson);
  }

  amountInput.addEventListener("input", calculate);
  percentInput.addEventListener("input", calculate);
  peopleInput.addEventListener("input", calculate);

  calculate();
})();
