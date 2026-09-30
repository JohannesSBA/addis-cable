export const metadata = {
  title: "Powering What Comes Next",
  description:
    "Discover Addis Cable Manufacturing PLC: precision electrical cables and conductors, proudly manufactured in Ethiopia.",
  alternates: { canonical: "/" },
};
import { Arrow } from "@/components/brand";
import { CinemaVideo, MotionLayer } from "@/components/motion-layer";
const products = [
  {
    n: "01",
    title: "Low voltage cables",
    meta: "EVERYDAY POWER. EXCEPTIONAL RELIABILITY.",
    image: "/brand/low-voltage.svg",
    href: "/products/low-voltage",
    spec: "Up to 1 kV",
    description:
      "Built for the spaces where life happens. Dependable conductors for homes, commercial buildings, and industry.",
  },
  {
    n: "02",
    title: "Medium & high voltage",
    meta: "ENGINEERED FOR THE BIGGER PICTURE.",
    image: "/brand/medium-voltage.svg",
    href: "/products/medium-voltage",
    spec: "3.8–33 kV MV",
    description:
      "Precision insulation and robust construction for power networks, industrial zones, and ambitious infrastructure.",
  },
  {
    n: "03",
    title: "Overhead conductors",
    meta: "CONNECTING PLACES. CARRYING POSSIBILITY.",
    image: "/brand/conductors.svg",
    href: "/products/conductors-abc",
    spec: "AAC · AAAC · ABC",
    description:
      "Aluminum conductors and aerial bundled cables that carry reliable electricity across cities and communities.",
  },
];
const industries = [
  "Energy & utilities",
  "Buildings & real estate",
  "Industry & manufacturing",
  "Transport & infrastructure",
];
export default function Home() {
  return (
    <main id="main-content">
      <MotionLayer />
      <section
        className="hero-cinema"
        data-parallax
        aria-labelledby="hero-title"
      >
        <div className="hero-visual" data-depth=".19">
          <CinemaVideo
            src="/media/copper-loop.mp4"
            poster="/brand/hero-poster.webp"
            className="hero-video"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-guide" data-depth=".10" aria-hidden="true">
          <span>Cu</span>
          <span>29 / CONDUCTIVITY</span>
          <i />
        </div>
        <div className="wrap hero-content" data-depth=".045">
          <div className="eyebrow light">
            <span className="status-dot" />
            POWERING ETHIOPIA. CONNECTING TOMORROW.
          </div>
          <h1 id="hero-title">
            The power
            <br />
            behind <em>progress.</em>
          </h1>
          <p>
            From the first strand to the national grid.
            <br className="desktop-break" /> Precision cables, proudly
            engineered in Ethiopia.
          </p>
          <div className="hero-actions">
            <a href="#products" className="button copper">
              Explore our products <Arrow />
            </a>
            <a href="/about" className="text-link light">
              Our story <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="wrap hero-bottom">
          <a href="#introduction">
            <span className="scroll-line" />
            SCROLL TO DISCOVER
          </a>
          <span>PRECISION IN EVERY STRAND.</span>
        </div>
      </section>
      <section className="trust-strip" aria-label="Our capabilities">
        <div className="wrap">
          <span>
            LOCAL EXPERTISE.
            <br />
            <strong>WORLD-CLASS STANDARDS.</strong>
          </span>
          <span>IEC type-tested</span>
          <span>Copper & aluminum</span>
          <span>Complete traceability</span>
          <span>Nationwide supply</span>
        </div>
      </section>
      <section id="introduction" className="intro-section section-space wrap">
        <div className="eyebrow">01 / BUILT TO CONNECT</div>
        <div className="intro-grid">
          <h2>
            Great things begin
            <br />
            with a <em>connection.</em>
          </h2>
          <div>
            <p className="large-copy">
              A growing nation needs power it can count on. We make the cables
              that carry it.
            </p>
            <p>
              At Addis Cable, we bring together material expertise, modern
              manufacturing, and an enduring commitment to quality. From our
              factory in Gelan, we help power Ethiopia’s homes, industries, and
              most important infrastructure.
            </p>
            <a href="/about" className="text-link">
              Meet Addis Cable <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="metrics">
          <div>
            <strong>
              13,836<span>t</span>
            </strong>
            <span>Annual production capacity</span>
          </div>
          <div>
            <strong>26</strong>
            <span>Advanced production lines</span>
          </div>
          <div>
            <strong>
              300<span>+</span>
            </strong>
            <span>Product variations</span>
          </div>
          <div className="metric-message">
            <span className="mini-mark">↗</span>
            <p>
              Made here.
              <br />
              <strong>Built for what’s next.</strong>
            </p>
          </div>
        </div>
      </section>
      <section id="products" className="portfolio-section section-space">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <div className="eyebrow">02 / THE PRODUCT PORTFOLIO</div>
              <h2>
                A cable for every
                <br />
                <em>possibility.</em>
              </h2>
            </div>
            <div>
              <p>
                The right conductor. The right construction.
                <br />
                The confidence to build something lasting.
              </p>
              <a href="/resources/product-catalog" className="text-link">
                View product catalog <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <a className="product-card" href={p.href} key={p.n}>
                <div className="product-art">
                  <span className="product-number">AC / {p.n}</span>
                  <img
                    src={p.image}
                    alt={p.title + " conductor construction illustration"}
                    width="520"
                    height="390"
                    loading="lazy"
                  />
                  <span className="product-spec">{p.spec}</span>
                  <span className="product-arrow">
                    <Arrow diagonal />
                  </span>
                </div>
                <div className="product-copy">
                  <span>{p.meta}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="portfolio-extra">
            <span>More ways to connect</span>
            <a href="/products/winding-wires">
              Winding & enamelled wires <Arrow diagonal />
            </a>
            <a href="/products/high-voltage">
              High voltage solutions <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>
      <section className="factory-story" data-parallax>
        <div className="factory-photo" data-depth=".13">
          <img
            src="/media/factory-poster.jpg"
            width="1080"
            height="608"
            alt="Inside the Addis Cable manufacturing facility in Gelan"
            loading="lazy"
          />
        </div>
        <div className="factory-tint" />
        <div className="wrap factory-content" data-depth=".04">
          <div className="eyebrow light">03 / THE MAKING OF RELIABILITY</div>
          <h2>
            It’s what’s inside
            <br />
            that <em>counts.</em>
          </h2>
          <p>
            Exceptional cables start long before installation. They start with
            precision, process, and people who care about every strand.
          </p>
          <a className="button ivory" href="/factory">
            Inside our manufacturing <Arrow />
          </a>
        </div>
        <span className="factory-location">
          GELAN INDUSTRIAL ZONE / ETHIOPIA
        </span>
      </section>
      <section className="standards-section section-space wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">04 / QUALITY WITHOUT COMPROMISE</div>
            <h2>
              Confidence,
              <br />
              <em>built in.</em>
            </h2>
          </div>
          <p>
            Performance you can measure.
            <br />
            Reliability you can build on.
          </p>
        </div>
        <div className="standards-grid">
          <article>
            <span>01 / MATERIALS</span>
            <h3>Pure potential.</h3>
            <p>
              High-conductivity copper and aluminum, selected for consistent
              electrical and mechanical performance.
            </p>
          </article>
          <article>
            <span>02 / PROCESS</span>
            <h3>Precision at every step.</h3>
            <p>
              Controlled drawing, stranding, insulation, and testing. Every
              stage matters. Every detail earns its place.
            </p>
          </article>
          <article>
            <span>03 / PROOF</span>
            <h3>Tested. Traced. Trusted.</h3>
            <p>
              IEC and Ethiopian standards, routine factory testing, and
              traceability from production to your project.
            </p>
          </article>
        </div>
        <a className="text-link" href="/company/quality-standards">
          Explore our quality standards <Arrow diagonal />
        </a>
      </section>
      <section className="industry-section">
        <div className="wrap industry-grid">
          <div>
            <div className="eyebrow light">05 / WHERE WE MAKE A DIFFERENCE</div>
            <h2>
              Powering the places
              <br />
              that move us <em>forward.</em>
            </h2>
            <p>
              Wherever Ethiopia is growing, we’re helping make the connection.
            </p>
          </div>
          <div className="industry-list">
            {industries.map((name, i) => (
              <a key={name} href="/markets">
                <span>0{i + 1}</span>
                <h3>{name}</h3>
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="project-cta section-space wrap">
        <div className="eyebrow">YOUR NEXT CONNECTION STARTS HERE.</div>
        <div>
          <h2>
            Let’s build
            <br />
            <em>what comes next.</em>
          </h2>
          <a href="/contact" className="button ink">
            Talk to our team <Arrow diagonal />
          </a>
        </div>
        <p>Tell us about your project. We’ll help you find the right cable.</p>
      </section>
    </main>
  );
}
