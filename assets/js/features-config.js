/* ============================================================
   ATTICS — Features Configuration
   Edit these values to update the feature cards on the landing page.
   ============================================================ */

const FEATURES_CONFIG = [
  {
    icon: "📍",
    title: "Hyperlokaal",
    description: "Vind spullen op loopafstand. Geen verzending, geen gedoe — gewoon ophalen en gaan.",
  },
  {
    icon: "🔒",
    title: "Veilig Betalen",
    description: "Alle transacties zijn beveiligd met escrow. Je geld is veilig tot je tevreden bent.",
  },
  {
    icon: "💬",
    title: "In-App Chat",
    description: "Spreek ophaaltijden af, stel vragen en bouw vertrouwen op — alles binnen de app.",
  },
  {
    icon: "⭐",
    title: "Geverifieerde Reviews",
    description: "Alleen echte huurders kunnen reviews achterlaten. Weet precies wat je kunt verwachten.",
  },
  {
    icon: "💼",
    title: "Zakelijk Dashboard",
    description: "Volg je inventaris, inkomsten en statistieken in één overzichtelijk dashboard.",
  },
  {
    icon: "🛡️",
    title: "Ingebouwde Verzekering",
    description: "Elke verhuur is gedekt. Verhuur met vertrouwen, wetende dat spullen beschermd zijn.",
  },
];

// Auto-populate the features grid from config
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".features__grid");
  if (!grid) return;

  grid.innerHTML = FEATURES_CONFIG.map(
    (f) =>
      `<div class="feature-card">
        <div class="feature-card__icon">${f.icon}</div>
        <h3>${f.title}</h3>
        <p>${f.description}</p>
      </div>`
  ).join("");
});
