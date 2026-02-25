/* ============================================================
   ATTICS — Stats Configuration
   Fetches live stats from Supabase, falls back to defaults.
   ============================================================ */

const SUPABASE_URL = "https://ohroussxlrzuxbbqevbw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_GlxJ2k1MdGoHhp-xqu9p3g_KCUIvD4w";

// Fallback values shown if the API call fails
const STATS_FALLBACK = [
  { target: 0, label: "Gebruikers" },
  { target: 0, label: "Beschikbare Items" },
  { target: 0, label: "Uitgeleend" },
];

// Fetch live stats from Supabase RPC function
async function fetchStats() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_stats`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    return [
      { target: data.active_users || 0, label: "Gebruikers" },
      { target: data.total_listings || 0, label: "Beschikbare Items" },
      { target: data.total_rented || 0, label: "Uitgeleend" },
    ];
  } catch (err) {
    console.warn("Could not fetch stats from Supabase:", err);
    return STATS_FALLBACK;
  }
}

// Auto-populate the stats section and trigger counter animation
document.addEventListener("DOMContentLoaded", async () => {
  const statsInner = document.querySelector(".stats__inner");
  if (!statsInner) return;

  const stats = await fetchStats();

  statsInner.innerHTML = stats
    .map(
      (s) =>
        `<div class="stat">
          <div class="stat__number" data-target="${s.target}">0</div>
          <div class="stat__label">${s.label}</div>
        </div>`
    )
    .join("");

  // Dispatch event so script.js knows the stats are ready
  window.dispatchEvent(new CustomEvent("stats-ready"));
});
