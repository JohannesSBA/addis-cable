import { Arrow, Brand } from "./brand";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div>
          <Brand />
          <p>
            Engineered in Ethiopia.
            <br />
            Connected to what comes next.
          </p>
          <a className="footer-email" href="mailto:info@addiscable.com">
            info@addiscable.com <Arrow diagonal />
          </a>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <a href="/#products">Our products</a>
            <a href="/about">Our company</a>
            <a href="/factory">Manufacturing</a>
            <a href="/markets">Industries we serve</a>
          </div>
          <div>
            <span>Connect</span>
            <a href="/contact">Contact our team</a>
            <a href="/resources/product-catalog">Product catalog</a>
            <a href="/company/quality-standards">Quality & standards</a>
            <a href="https://www.addiscable.com/authorized">
              Verify your cable <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Addis Cable Manufacturing PLC</span>
        <span>Gelan Industrial Zone · Sheger City, Ethiopia</span>
        <div>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms-of-service">Terms</a>
        </div>
      </div>
    </footer>
  );
}
