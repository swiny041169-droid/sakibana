/* Sakibana site behaviour. Update QUOTATION_EMAIL before launch. */
const QUOTATION_EMAIL = "YOUR_EMAIL@example.com"; // Replace with your real business email.

function el(id) { return document.getElementById(id); }
function esc(value="") { return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c])); }
function categoryName(id) { return (CATEGORIES.find(c => c.id === id) || {}).name || id; }
function productCard(p) {
  return `<article class="product-card"><a class="product-photo" href="detail.html?id=${encodeURIComponent(p.id)}"><img src="${esc(p.photos[0])}" alt="${esc(p.title)}" loading="lazy"><span class="condition">${esc(p.condition)}</span></a><div class="product-info"><p class="eyebrow">${esc(categoryName(p.category))} · ${esc(p.id)}</p><h3><a href="detail.html?id=${encodeURIComponent(p.id)}">${esc(p.title)}</a></h3><p class="product-meta">${esc(p.year)}${p.mileage ? " · " + esc(p.mileage) : ""}</p><p class="price">${esc(p.price || "Price upon request")}</p><a class="text-link" href="detail.html?id=${encodeURIComponent(p.id)}">View details →</a></div></article>`;
}
function renderCategories() {
  const grid = el("category-grid"); if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `<a class="category-card" href="inventory.html?category=${encodeURIComponent(c.id)}"><span class="category-icon">${c.icon}</span><h3>${esc(c.name)}</h3><p>${esc(c.description)}</p><span class="category-arrow">Explore →</span></a>`).join("");
}
function renderFeatured() {
  const grid = el("featured-grid"); if (!grid) return;
  grid.innerHTML = INVENTORY.slice(0, 3).map(productCard).join("");
}
function renderInventory() {
  const grid = el("inventory-grid"); if (!grid) return;
  const select = el("category-filter");
  CATEGORIES.forEach(c => select.insertAdjacentHTML("beforeend", `<option value="${esc(c.id)}">${esc(c.name)}</option>`));
  const params = new URLSearchParams(location.search); if (params.has("category")) select.value = params.get("category");
  function update() {
    const q = el("search").value.toLowerCase().trim(), cat = select.value, condition = el("condition-filter").value;
    const list = INVENTORY.filter(p => (cat === "all" || p.category === cat) && (condition === "all" || p.condition.toLowerCase() === condition.toLowerCase()) && [p.id,p.title,p.make,p.model,p.year,p.description].join(" ").toLowerCase().includes(q));
    grid.innerHTML = list.length ? list.map(productCard).join("") : `<div class="empty-state">No matching listings yet. Please contact us if you are looking for a specific item.</div>`;
    el("results-count").textContent = `${list.length} listing${list.length === 1 ? "" : "s"} shown`;
  }
  ["search","category-filter","condition-filter"].forEach(id => el(id).addEventListener(id === "search" ? "input" : "change", update));
  update();
}
function renderDetail() {
  const host = el("detail-content"); if (!host) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = INVENTORY.find(x => x.id === id);
  if (!p) { host.innerHTML = `<div class="empty-state"><h2>Listing not found</h2><p>Please return to the inventory page.</p><a class="btn btn-primary" href="inventory.html">Browse Inventory</a></div>`; return; }
  document.title = `${p.title} | Sakibana`;
  const specs = Object.entries(p.specs || {}).map(([k,v]) => `<div class="spec-row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  host.innerHTML = `<p class="eyebrow">${esc(categoryName(p.category))} · ${esc(p.id)}</p><h1>${esc(p.title)}</h1><div class="detail-layout"><div><div class="gallery-main"><img id="main-photo" src="${esc(p.photos[0])}" alt="${esc(p.title)}"></div><div class="thumbs">${p.photos.map((src,i)=>`<button class="thumb ${i===0?"selected":""}" data-photo="${esc(src)}" aria-label="Show photo ${i+1}"><img src="${esc(src)}" alt=""></button>`).join("")}</div></div><aside class="detail-summary"><span class="condition inline">${esc(p.condition)}</span><h2>${esc(p.price || "Price upon request")}</h2><p>${esc(p.description)}</p><p><strong>Availability:</strong> ${esc(p.availability || "Please enquire")}</p><p><strong>Location:</strong> ${esc(p.location || "Please enquire")}</p><a class="btn btn-gold" href="quote.html?ref=${encodeURIComponent(p.id)}&product=${encodeURIComponent(p.title)}">Request a Quotation →</a></aside></div><section class="spec-section"><h2>Technical Specifications</h2><dl class="spec-grid">${specs}</dl></section><p class="disclaimer">Specifications and availability are subject to confirmation. Please request current details before making a purchase decision.</p>`;
  host.querySelectorAll(".thumb").forEach(b => b.addEventListener("click", () => { el("main-photo").src = b.dataset.photo; host.querySelectorAll(".thumb").forEach(x=>x.classList.remove("selected")); b.classList.add("selected"); }));
}
function setupQuoteForm() {
  const form = el("quote-form"); if (!form) return;
  const params = new URLSearchParams(location.search);
  if (el("quote-reference")) el("quote-reference").value = params.get("ref") || "";
  if (el("quote-product")) el("quote-product").value = params.get("product") || "";
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (QUOTATION_EMAIL.includes("YOUR_EMAIL")) { el("form-note").textContent = "Setup required: open site.js and replace YOUR_EMAIL@example.com with your business email, then publish again."; return; }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Sakibana quotation request — ${data.get("reference") || data.get("product") || "New inquiry"}`);
    const body = encodeURIComponent([...data.entries()].map(([k,v]) => `${k}: ${v}`).join("\n"));
    location.href = `mailto:${QUOTATION_EMAIL}?subject=${subject}&body=${body}`;
    el("form-note").textContent = "Your email application should open with the inquiry details. Please send the email to complete your request.";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderCategories(); renderFeatured(); renderInventory(); renderDetail(); setupQuoteForm();
  const year = el("year"); if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav");
  if (toggle && nav) toggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
});