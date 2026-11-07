SAKIBANA WEBSITE STARTER PACKAGE
================================

WHAT THIS IS
A responsive static website starter for Sakibana. It includes:
- Home page
- Inventory listing with category, condition and keyword filters
- Individual item detail pages with photo gallery and specifications
- Quotation request page
- About and Contact pages
- Editable logo SVG and placeholder image

IMPORTANT
This package is a website source-code starter, not a live/published website.
It does not automatically create a Google Sites website. It is intended to be
hosted as a static website on a free static hosting service such as GitHub Pages
or Netlify. You can edit the files directly.

HOW TO PREVIEW
1. Extract the ZIP file.
2. Open index.html in a modern browser.
3. For best results, use a local web server or publish the folder to static hosting.

HOW TO EDIT / ADD INVENTORY
1. Open data.js in a text editor.
2. Find the INVENTORY array.
3. Duplicate an existing listing object.
4. Give the new listing a unique ID (e.g. CAR-002).
5. Set category to one of:
   cars, trucks-trailers, construction, agri, medical
6. Update title, make, model, year, condition, mileage/hours, location,
   availability, price, description, photos and specs.
7. Put product photos in the assets folder and reference them, e.g.
   photos: ["assets/CAR-002-front.jpg", "assets/CAR-002-interior.jpg"]
8. Save data.js and publish/upload the updated website folder.

PHOTO RECOMMENDATIONS
Use JPG, PNG or WebP. Use clear images you own or have permission to publish.
For each listing, add a main photo and extra views. Do not publish customer
personal information, vehicle registration documents, or sensitive serial data.

QUOTATION FORM — IMPORTANT SETUP
The included form uses the visitor's email application (mailto) as a simple
starter method. It does not send submissions to a server or store them online.
Before launch:
1. Open site.js.
2. Replace YOUR_EMAIL@example.com with the real Sakibana business email.
3. Re-publish the site.
A better customer experience is to create a Google Form and link/embed it on
quote.html, or connect a form backend (for example FormSubmit or Formspree).
A form backend may have usage limits or terms that can change. Test a submission
before sharing the website with customers.

FREE HOSTING OPTIONS
- GitHub Pages: https://pages.github.com/
- Netlify: https://www.netlify.com/
Both can host a static site on a provider subdomain without buying your own domain.
Check each provider's current free-plan terms before launch.

SUGGESTED PRE-LAUNCH CHECKLIST
[ ] Replace sample listings with real inventory
[ ] Replace placeholder photos with authorized product photos
[ ] Verify every specification and availability status
[ ] Replace the quotation email address
[ ] Add real company details, email and WhatsApp to contact.html
[ ] Test every category, listing link, gallery thumbnail and form
[ ] Check mobile display
[ ] Confirm export, shipping, medical-device and other regulatory requirements
    for the relevant product and destination countries
[ ] Publish and test the public URL

BRANDING
The included assets/logo.svg is an editable vector logo concept. You can open it
in a vector editor or replace it with your finalized brand artwork.
