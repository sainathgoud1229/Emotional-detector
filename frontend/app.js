// app.js
document.getElementById("detectBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value.trim();
  const url = document.getElementById("backendUrl").value.trim() || "http://localhost:3000/detect";
  const summary = document.getElementById("summary");
  const scoresDiv = document.getElementById("scores");

  if (!text) {
    summary.textContent = "Please type something to detect.";
    scoresDiv.innerHTML = "";
    return;
  }

  summary.textContent = "Detecting...";
  scoresDiv.innerHTML = "";

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!resp.ok) throw new Error("API error: " + resp.status);
    const data = await resp.json();

    summary.textContent = `Detected emotion: ${data.emotion.toUpperCase()}`;
    scoresDiv.innerHTML = "";

    // scores object
    const scores = data.scores || {};
    const keysSorted = Object.keys(scores).sort((a,b)=>scores[b]-scores[a]);
    for (const k of keysSorted) {
      const el = document.createElement("div");
      el.className = "score-chip";
      el.textContent = `${k}: ${Math.round((scores[k]||0)*100)}%`;
      scoresDiv.appendChild(el);
    }
  } catch (err) {
    summary.textContent = "Error: " + err.message;
  }
});
