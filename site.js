/* Sakibana site behaviour. Paste your Web3Forms access key below (see the guide). */
const WEB3FORMS_KEY = "3f2a5561-401f-4316-83c1-88e6d51c7c2f"; // the key is not secret; your email stays private on web3forms.com

function el(id) { return document.getElementById(id); }
function esc(value="") { return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c])); }
function categoryName(id) { return (CATEGORIES.find(c => c.id === id) || {}).name || id; }
function productCard(p) {
  return `<article class="product-card"><a class="product-photo" href="detail.html?id=${encodeURIComponent(p.id)}"><img src="${esc(p.photos[0])}" alt="${esc(p.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='placeholder.svg'"><span class="condition">${esc(p.condition)}</span></a><div class="product-info"><p class="eyebrow">${esc(categoryName(p.category))} · ${esc(p.id)}</p><h3><a href="detail.html?id=${encodeURIComponent(p.id)}">${esc(p.title)}</a></h3><p class="product-meta">${[p.year, p.mileage].filter(Boolean).map(esc).join(" · ")}</p><p class="price">${esc(p.price || "Price upon request")}</p><a class="text-link" href="detail.html?id=${encodeURIComponent(p.id)}">View details →</a></div></article>`;
}
function renderCategories() {
  const grid = el("category-grid"); if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `<a class="category-card" href="inventory.html?category=${encodeURIComponent(c.id)}"><span class="category-photo"><img src="${esc(c.image)}" alt="${esc(c.name)}" loading="lazy"></span><span class="category-label"><svg class="i"><use href="#i-${esc(c.icon)}"/></svg><span>${esc(c.name)}</span><svg class="i chev"><use href="#i-chevron"/></svg></span></a>`).join("");
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
  host.innerHTML = `<p class="eyebrow">${esc(categoryName(p.category))} · ${esc(p.id)}</p><h1>${esc(p.title)}</h1><div class="detail-layout"><div><div class="gallery-main"><img id="main-photo" src="${esc(p.photos[0])}" alt="${esc(p.title)}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='placeholder.svg'"></div><div class="thumbs">${p.photos.map((src,i)=>`<button class="thumb ${i===0?"selected":""}" data-photo="${esc(src)}" aria-label="Show photo ${i+1}"><img src="${esc(src)}" alt="" referrerpolicy="no-referrer" onerror="this.closest('.thumb').remove()"></button>`).join("")}</div></div><aside class="detail-summary"><span class="condition inline">${esc(p.condition)}</span><h2>${esc(p.price || "Price upon request")}</h2><p>${esc(p.description)}</p><p><strong>Availability:</strong> ${esc(p.availability || "Please enquire")}</p><p><strong>Location:</strong> ${esc(p.location || "Please enquire")}</p><a class="btn btn-gold" href="quote.html?ref=${encodeURIComponent(p.id)}&product=${encodeURIComponent(p.title)}">Request a Quotation →</a></aside></div><section class="spec-section"><h2>Technical Specifications</h2><dl class="spec-grid">${specs}</dl></section><p class="disclaimer">Specifications and availability are subject to confirmation. Please request current details before making a purchase decision.</p>`;
  host.querySelectorAll(".thumb").forEach(b => b.addEventListener("click", () => { el("main-photo").src = b.dataset.photo; host.querySelectorAll(".thumb").forEach(x=>x.classList.remove("selected")); b.classList.add("selected"); }));
}
function setupQuoteForm() {
  const form = el("quote-form"); if (!form) return;
  const params = new URLSearchParams(location.search);
  if (el("quote-reference")) el("quote-reference").value = params.get("ref") || "";
  if (el("quote-product")) el("quote-product").value = params.get("product") || "";
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const note = el("form-note"), button = form.querySelector("button[type=submit]");
    note.className = "form-note";
    if (WEB3FORMS_KEY.includes("PASTE_YOUR")) { note.textContent = "Setup required: open site.js and paste your Web3Forms access key, then upload the file again."; note.classList.add("error"); return; }
    const data = Object.fromEntries(new FormData(form));
    data.access_key = WEB3FORMS_KEY;
    data.from_name = "Sakibana website";
    data.subject = `Sakibana quotation request — ${data.reference || data.product || "New inquiry"}`;
    button.disabled = true; note.textContent = "Sending your request…";
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || "Request failed");
      form.reset();
      note.textContent = "Thank you. Your quotation request has been sent. We will reply to you by email.";
      note.classList.add("ok");
    } catch (err) {
      note.textContent = "Sorry, your request could not be sent. Please try again in a moment.";
      note.classList.add("error");
    } finally { button.disabled = false; }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderCategories(); renderFeatured(); renderInventory(); renderDetail(); setupQuoteForm();
  const year = el("year"); if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
    nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); } });
  }
  // soft shadow under the header once the page is scrolled
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
});
