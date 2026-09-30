"use client";
import { useState } from "react";
import { Arrow } from "./brand";
export function Contact() {
  const [prepared, setPrepared] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject =
      "Project enquiry — " + String(data.get("company") || data.get("name"));
    const body =
      "Name: " +
      data.get("name") +
      "\nEmail: " +
      data.get("email") +
      "\nCompany: " +
      data.get("company") +
      "\nProduct interest: " +
      data.get("product") +
      "\n\n" +
      data.get("message");
    window.location.href =
      "mailto:info@addiscable.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    setPrepared(true);
  }
  return (
    <main id="main-content" className="detail-page">
      <section className="detail-hero wrap">
        <span className="eyebrow">LET’S MAKE THE CONNECTION</span>
        <h1>
          Great projects
          <br />
          start with a conversation<span>.</span>
        </h1>
        <p>
          Tell us what you’re building. Our team will help you choose the right
          conductor, construction, and specification.
        </p>
      </section>
      <section className="contact-grid wrap">
        <div className="contact-details">
          <h2>Talk to Addis Cable.</h2>
          <a href="mailto:info@addiscable.com">
            info@addiscable.com <Arrow diagonal />
          </a>
          <a href="tel:+251114627841">+251 114 62 78 41</a>
          <a href="tel:+251986091148">+251 986 09 11 48</a>
          <div>
            <span className="eyebrow">VISIT OUR FACILITY</span>
            <p>
              Gelan Industrial Zone
              <br />
              Sheger City, Ethiopia
            </p>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=Addis+Cable+Manufacturing+Gelan+Ethiopia"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find us on the map <Arrow diagonal />
            </a>
          </div>
        </div>
        <form onSubmit={submit} className="enquiry-form">
          <div className="form-row">
            <label>
              Your name
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Full name"
              />
            </label>
            <label>
              Email address
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label>
            Company
            <input
              name="company"
              autoComplete="organization"
              placeholder="Company or organization"
            />
          </label>
          <label>
            What are you looking for?
            <select name="product">
              <option>Help selecting a cable</option>
              <option>Low voltage cables</option>
              <option>Medium & high voltage cables</option>
              <option>Overhead conductors & ABC</option>
              <option>Winding & enamelled wires</option>
              <option>Product catalog & technical specifications</option>
            </select>
          </label>
          <label>
            Tell us about your project
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Application, voltage, quantities, location, and timeline…"
            />
          </label>
          <p className="form-note">
            This prepares an enquiry in your email app. Send it from there to
            reach our team.
          </p>
          <button type="submit" className="button ink">
            Prepare email enquiry <Arrow diagonal />
          </button>
          {prepared && (
            <p role="status" className="form-status">
              Your email draft is ready. If your email app didn’t open, contact{" "}
              <a href="mailto:info@addiscable.com">info@addiscable.com</a>{" "}
              directly.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
