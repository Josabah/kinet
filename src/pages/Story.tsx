import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Cpu,
  Download,
} from "lucide-react";
import { toPng } from "html-to-image";
import SeoHead from "@/components/SeoHead";
import { pageSeo } from "@/config/seo";
import "./Story.css";

const KINET_MARK_PATH =
  "M114 60L61 86L61 232L114 258L114 188L191 256L256 256L149 160L252 60L194 60L114 137Z";

const MobilePhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <rect x="4.5" y="2" width="15" height="20" rx="3.25" />
    <path d="M8.5 2 10 4.4h4L15.5 2M10.5 19.2h3" />
  </svg>
);

const Story = () => {
  const canvasRef = useRef<HTMLElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadImage = async () => {
    const node = canvasRef.current;
    if (!node || downloading) {
      return;
    }

    setDownloading(true);

    try {
      const images = [...node.querySelectorAll("img")];
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)));

      const scale = Math.max(2, 1080 / node.offsetWidth);
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: scale,
        backgroundColor: "#fafaf8",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "kinet-solutions-story.png";
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
  <>
    <SeoHead
      title={pageSeo.story.title}
      description={pageSeo.story.description}
      path={pageSeo.story.path}
      noindex
    />

    <main className="story-preview">
      <button
        type="button"
        className="story-download"
        onClick={() => {
          void downloadImage();
        }}
        disabled={downloading}
      >
        <Download aria-hidden="true" />
        <span>{downloading ? "Preparing…" : "Download image"}</span>
      </button>
      <article
        ref={canvasRef}
        className="story-canvas"
        aria-label="Kinet Solutions social story graphic"
      >
        <div className="story-grid" aria-hidden="true" />
        <div className="story-safe">
        <header className="story-identity">
          <img
            className="story-logo"
            src="/kinet-logo-lockup.svg"
            alt="Kinet Solutions"
          />
          <a className="story-talk" href="/contact">
            <span>Talk to us</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </header>

        <section className="story-message" aria-label="Kinet services">
          <ol className="story-services">
            <li>
              <img
                className="story-web-icon"
                src="/web-applications-icon.png"
                alt=""
                aria-hidden="true"
              />
              <strong>Web applications</strong>
            </li>
            <li>
              <img
                className="story-backend-icon"
                src="/backend-infrastructure-icon.png"
                alt=""
                aria-hidden="true"
              />
              <strong>Backend infrastructure</strong>
            </li>
            <li><MobilePhoneIcon /><strong>Mobile applications</strong></li>
            <li><Cpu aria-hidden="true" /><strong>AI-powered platforms</strong></li>
          </ol>
        </section>

        <section className="story-work" aria-label="Selected Kinet product interfaces">
          <svg
            className="story-field-mark"
            viewBox="0 0 1000 959.8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect className="story-field-background" x="0" y="7.5" width="1000" height="945" />
            <svg
              x="17.5"
              y="-10.25"
              width="965"
              height="980.31"
              viewBox="61 60 195 198"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d={KINET_MARK_PATH} />
            </svg>
          </svg>

          <div className="story-device-stack">
            <figure className="story-product story-product-kidus">
              <img
                src="/story-mobile/kidus-petros.png"
                alt="Kidus Petros church website displayed on a mobile device"
              />
              <figcaption><span>02</span><strong>Church website + CMS</strong></figcaption>
            </figure>

            <figure className="story-product story-product-pov">
              <img
                src="/story-mobile/povet.png"
                alt="POV.ET Ethiopian photography archive displayed on a mobile device"
              />
              <figcaption><span>03</span><strong>Photography archive</strong></figcaption>
            </figure>

            <figure className="story-product story-product-brije">
              <img
                src="/story-mobile/brije.png"
                alt="Brije brand and creator marketplace displayed on a mobile device"
              />
              <figcaption><span>05</span><strong>Creator marketplace</strong></figcaption>
            </figure>

            <figure className="story-product story-product-unscripted">
              <img
                src="/story-mobile/unscripted.png"
                alt="Unscripted Codes engineering publication displayed on a mobile device"
              />
              <figcaption><span>04</span><strong>Engineering publication</strong></figcaption>
            </figure>

            <figure className="story-product story-product-uat story-product-featured">
              <img
                src="/story-mobile/uat-model.png"
                alt="UAT Model Exam learning platform displayed on a mobile device"
              />
              <figcaption><span>01</span><strong>Exam preparation</strong></figcaption>
            </figure>
          </div>

        </section>

        <footer className="story-footer">
          <div className="story-footer-rule">
            <span />
          </div>
          <div className="story-footer-copy">
            <p>
              Design &amp; engineering for founders who care
              <br />
              about getting it right the first time.
            </p>
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 2.5v19M9.5 2.9C7.3 7.5 7.3 16.5 9.5 21.1M14.5 2.9c2.2 4.6 2.2 13.6 0 18.2M5.1 6h13.8M3 10h18M2.5 14h19M5.1 18h13.8" />
              </svg>
              <strong>kinetsolutions.dev</strong>
            </div>
          </div>
        </footer>
        </div>
      </article>
    </main>
  </>
  );
};

export default Story;
