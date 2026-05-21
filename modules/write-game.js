// Write Game Engine — shared component included by modules that use the "write" game type.
// Relies on module globals: GAMES, ST, DT, DN, loseLife, winLv

function doWrite(lv, body) {
  document.getElementById("g-sub").textContent = "Escribí tu respuesta";
  body.innerHTML =
    '<div><span class="tbadge tbw">✍️ Escribir</span> <span class="dtag ' + DT[ST.cl] + '">' + DN[ST.cl] + '</span>' +
    '<div class="gtitle" style="margin-top:5px">' + lv.prompt + '</div></div>' +
    (lv.hint ? '<div class="tip" style="margin-top:0"><span>💡</span><span>' + lv.hint + '</span></div>' : '') +
    '<textarea class="warea" id="warea" placeholder="' + lv.placeholder + '" oninput="onWriteInput()"></textarea>' +
    '<div class="wcnt" id="wcnt">0 palabras — mínimo ' + lv.minWords + '</div>' +
    '<div class="wfb" id="wfb"></div>' +
    '<button class="nbtn" id="wbtn" disabled onclick="submitWrite()">Verificar ✓</button>';
}

function onWriteInput() {
  var lv = GAMES.find(function(g){ return g.id === ST.cg; }).levels[ST.cl - 1];
  var text = document.getElementById("warea").value;
  var words = text.trim().split(/\s+/).filter(function(w){ return w.length > 0; }).length;
  var cnt = document.getElementById("wcnt");
  cnt.textContent = words + " palabras — mínimo " + lv.minWords;
  cnt.className = words >= lv.minWords ? "wcnt wcnt-ok" : "wcnt";
  document.getElementById("wbtn").disabled = words < lv.minWords;
  var pct = Math.min(100, Math.round((words / lv.minWords) * 100));
  document.getElementById("g-prog").style.width = pct + "%";
}

function checkWrite(text, criteria, minRequired) {
  var lower = text.toLowerCase();
  var hits = [];
  var misses = [];
  criteria.forEach(function(c) {
    var patterns = c.kw.split("|");
    var found = patterns.some(function(p){ return lower.indexOf(p.toLowerCase()) !== -1; });
    if (found) hits.push(c); else misses.push(c);
  });
  var threshold = (minRequired !== undefined) ? minRequired : Math.ceil(criteria.length * 0.6);
  var verdict = hits.length === criteria.length ? "correct" : hits.length >= threshold ? "partial" : "incorrect";
  return { verdict: verdict, hits: hits, misses: misses };
}

function submitWrite() {
  var btn = document.getElementById("wbtn");
  btn.disabled = true;
  btn.textContent = "Evaluando...";
  setTimeout(function() {
    var lv = GAMES.find(function(g){ return g.id === ST.cg; }).levels[ST.cl - 1];
    var text = document.getElementById("warea").value;
    var result = checkWrite(text, lv.criteria, lv.minRequired);
    renderWriteResult(result, lv);
  }, 700);
}

function renderWriteResult(result, lv) {
  var fb  = document.getElementById("wfb");
  var btn = document.getElementById("wbtn");
  var area = document.getElementById("warea");

  if (result.verdict === "correct") {
    ST.sc++; ST.st++;
    fb.className = "wfb wfb-ok";
    fb.innerHTML = "<span>✓</span><span>" + lv.fb + "</span>";
    btn.textContent = "Continuar →";
    btn.disabled = false;
    btn.onclick = winLv;
    area.disabled = true;

  } else if (result.verdict === "partial") {
    ST.sc++; ST.st++;
    var missingLabels = result.misses.map(function(m){ return m.label; }).join(", ");
    fb.className = "wfb wfb-partial";
    fb.innerHTML = "<span>⚡</span><span>¡Buena base! Faltó incluir: <strong>" + missingLabels + "</strong>. Podés continuar o mejorar tu respuesta.</span>";

    btn.textContent = "Continuar igual →";
    btn.disabled = false;
    btn.onclick = winLv;

    var imp = document.createElement("button");
    imp.className = "nbtn";
    imp.style.cssText = "background:#f3f4f6;color:#111;margin-top:6px";
    imp.textContent = "Mejorar mi respuesta";
    imp.onclick = function() {
      fb.className = "wfb"; fb.innerHTML = "";
      area.disabled = false; area.focus();
      btn.textContent = "Verificar ✓";
      btn.onclick = submitWrite;
      var w = area.value.trim().split(/\s+/).filter(function(x){ return x.length > 0; }).length;
      btn.disabled = w < lv.minWords;
      ST.sc--; ST.st--;
      imp.remove();
    };
    btn.insertAdjacentElement("afterend", imp);

  } else {
    ST.st++;
    var missingLabels2 = result.misses.map(function(m){ return m.label; }).join(", ");
    fb.className = "wfb wfb-no";
    fb.innerHTML = "<span>✗</span><span>Faltaron elementos: <strong>" + missingLabels2 + "</strong>.</span>";
    loseLife("Revisá estos elementos en tu respuesta: " + missingLabels2 + ".");

    btn.textContent = "Reintentar";
    btn.disabled = false;
    btn.onclick = function() {
      fb.className = "wfb"; fb.innerHTML = "";
      btn.textContent = "Verificar ✓";
      btn.onclick = submitWrite;
      var w = area.value.trim().split(/\s+/).filter(function(x){ return x.length > 0; }).length;
      btn.disabled = w < lv.minWords;
    };
  }
}
