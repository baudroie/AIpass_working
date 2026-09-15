import { useEffect, useRef, useState } from "react";
import { copy, faqs, typographyLines, beginnerLabel, imageAlts, documentLabels, contextSource, factCheckedDate } from "./content.js";
import { imageAssets } from "./assets.js";
import { publicAsset } from "./publicAsset.js";
import {
  siteConfig as config,
  pending,
  safeExternalUrl,
} from "./siteConfig.js";
import {
  HeroTitle,
  HeroSubtitle,
  ConcernTitle,
  Heading,
  Price,
} from "./Typography.jsx";
import { Arrow, Paper, BookArt, ResumeArt, StepIcon, CalendarArt } from "./Diagrams.jsx";
import "./typography.css";

function CTA({
  href = safeExternalUrl(config.applicationUrl),
  children = copy.C05,
  id,
  disabled = false,
}) {
  const body = (
    <>
      {children}
      <span aria-hidden="true">›</span>
    </>
  );
  return disabled ? (
    <button
      className="cta"
      data-cta={id}
      aria-disabled="true"
      aria-describedby="application-status"
      onClick={() => document.getElementById("application-status")?.focus()}
    >
      {body}
    </button>
  ) : (
    <a className="cta" href={href} data-cta={id}>
      {body}
    </a>
  );
}
function Asset({ name, alt, photo = false, className = "" }) {
  const [failed, setFailed] = useState(false);
  const asset = imageAssets[name];
  alt = imageAlts[name] ?? alt;
  return (
    <figure className={`asset${photo ? " asset--photo" : ""} ${className}`} data-asset={name}>
      {failed || asset?.status !== "ready" ? (
        <div className="asset-pending" data-review-placeholder={name}>
          <span>画像素材を準備中</span>
          <small>{alt}</small>
        </div>
      ) : (
        <picture>
          {asset.mobileSrc && (
            <source media="(max-width: 600px)" srcSet={asset.mobileSrc} />
          )}
          <img
            src={asset.src}
            alt={alt}
            onError={() => setFailed(true)}
            loading={name === "hero-students" ? "eager" : "lazy"}
          />
        </picture>
      )}
      {photo && <figcaption>イメージ</figcaption>}
    </figure>
  );
}
function Source({ recruit = false }) {
  return (
    <p className="source">
      出典：
      {recruit ? (
        <a href={contextSource.url}>
          {contextSource.label}
        </a>
      ) : (
        <a href="https://guga.or.jp/outline/">
          GUGA試験概要（{factCheckedDate}確認）
        </a>
      )}
    </p>
  );
}
function Hero({ heroRef, ctaRef }) {
  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="identity">
        <img
          className="seminar-logo"
          src={publicAsset("/assets/seminar-logo-v1.png")}
          width="2167"
          height="726"
          alt="生成AIパスポート 無料セミナー"
        />
      </div>
      <div className="hero-main">
        <div className="hero-typeset">
          <HeroTitle />
          <HeroSubtitle />
          <p className="beginner">{beginnerLabel}</p>
        </div>
        <div className="hero-visual">
          <Asset
            name="hero-students"
            alt="ノートパソコンとノートを持ち、前を向く大学生の男女"
            photo
          />
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-conversion">
          <Price />
          <div ref={ctaRef}>
            <CTA id="A01" />
          </div>
        </div>
        <nav className="hero-nav" aria-label="ページ内メニュー">
          <a href="#content">セミナーについて</a>
          <a href="#faq">よくある質問</a>
        </nav>
      </div>
    </section>
  );
}
function Concern() {
  return (
    <>
      <section className="concern" id="introduction">
        <ConcernTitle />
        <div className="concern-diagram">
          <Asset
            name="thinking-student"
            alt="AIの回答をパソコンで確認する学生"
          />
          <div className="document-steps">
            {[
              ["answer", "AIの回答"],
              ["check", "元の情報を確認"],
              ["corrected", "自分で直す"],
            ].map(([kind, label], i) => (
              <div className="document-step" key={kind}>
                <span>{label}</span>
                <Paper kind={kind} />
                {i < 2 && <Arrow />}
              </div>
            ))}
          </div>
        </div>
        <p className="concern-caption">{copy.C07note}</p>
        <div className="intro-photos">
          <Asset name="intro-writing" alt="応募書類を書いている学生" photo />
          <Asset
            name="intro-conversation"
            alt="自分の考えを説明する学生"
            photo
          />
        </div>
      </section>
      <div className="value-preview">
        <Heading id="C11" />
        <div className="preview-steps">
          {[copy.C12[0], copy.C13[0], copy.C14[0]].map((label, i) => (
            <div key={label}>
              <span className="preview-icon">
                <StepIcon type={["book", "document", "laptop"][i]} />
              </span>
              <b>{label}</b>
              {i < 2 && <Arrow />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
function Qualification() {
  return (
    <section className="qualification section" id="qualification">
      <div className="context-note">
        <h2>
          <span>{typographyLines.C08.map((phrase, i) => <span className="heading-phrase" key={i}>{phrase}</span>)}</span>
        </h2>
        <p>{copy.C08body}</p>
        <Source recruit />
      </div>
      <Heading id="C09" />
      <div className="qualification-intro">
        <div>
          <p className="lead">{copy.C09body}</p>
          <p className="provider">{copy.C09provider}</p>
        </div>
        <BookArt />
      </div>
      <ul className="facts">
        {copy.C10.map((item) => (
          <li key={item}><span className="fact-check" aria-hidden="true">✓</span>{item}</li>
        ))}
      </ul>
      <Source />
      <details className="qualification-note">
        <summary>資格取得について</summary>
        <p>{copy.C10note}</p>
      </details>
      <div className="value-section">
        <Heading id="C11" />
        <p className="lead">{copy.C11body}</p>
        <div className="value-stages">
          {["C12", "C13", "C14"].map((id, i) => (
            <article className={`value-stage value-stage--${i + 1}`} key={id}>
              <span className="stage-number">{i + 1}</span>
              <div className="value-stage-copy">
                <h3>{copy[id][0]}</h3>
                <p>{copy[id][1]}</p>
              </div>
              {i === 0 ? (
                <Asset
                  name="value-thinking-student"
                  alt="AIの基本と注意点を学ぶ学生"
                />
              ) : i === 1 ? (
                <BookArt exam />
              ) : (
                <Asset
                  name="conversation-students"
                  alt="試した使い方を自分の言葉で説明する学生"
                  photo
                />
              )}
            </article>
          ))}
        </div>
        <p className="value-note">{copy.C14note}</p>
      </div>
    </section>
  );
}
function Content() {
  return (
    <section className="content section" id="content">
      <Heading id="C16" />
      <p className="lead">{copy.C15}</p>
      <p>{copy.C15body}</p>
      <div className="topics">
        {copy.C16items.map(([title, body], i) => (
          <article className={`topic topic--${i + 1}`} key={title}>
            <div className="topic-copy">
              <span className="topic-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
            <div className="topic-art">
              {i < 2 ? (
                <>
                  <Paper kind={i === 0 ? "answer" : "plain"} />
                  {i === 0 && <Arrow />}
                  <Paper kind={i === 0 ? "corrected" : "personal"} />
                </>
              ) : (
                <>
                  <Asset name="studying-student" alt="試験に向けて学ぶ学生" />
                  <CalendarArt />
                </>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="reflection">
        <h3>{copy.C17}</h3>
        {copy.C17items.map((text) => (
          <p key={text}>
            <span aria-hidden="true">•</span>
            {text}
          </p>
        ))}
      </div>
      <CTA id="A02" />
    </section>
  );
}
function Scenes() {
  return (
    <section className="scenes section" id="scenes">
      <Heading id="C21" />
      {["C22", "C23", "C24"].map((id, i) => (
        <article className={`scene scene--${i + 1}`} key={id}>
          <div className="scene-heading">
            <b className="scene-number">0{i + 1}</b>
            <div>
              <h3>{copy[id][0]}</h3>
              <p>{copy[id][1]}</p>
            </div>
          </div>
          {i === 0 ? (
            <div className="resume-scene">
              <ResumeArt labels={documentLabels} />
              <Asset
                name="writing-student"
                alt="応募書類を記入する学生"
                photo
              />
            </div>
          ) : i === 1 ? (
            <>
              <Asset
                name="scene-conversation"
                alt="ノートを手に、自分が試したことを説明する学生"
                photo
              />
              <div className="interview-example">
                <h4>{copy.C25}</h4>
                <p>{copy.C25example}</p>
                <small>{copy.C25note}</small>
              </div>
            </>
          ) : (
            <Asset
              name="working-student"
              alt="職場のルールを確認しながらパソコンで作業する学生"
            />
          )}
        </article>
      ))}
    </section>
  );
}
function ExamFlow() {
  return (
    <section className="exam-flow section" id="exam-flow">
      <Heading id="C20" />
      <ol>
        {copy.C20items.map(([title, body], i) => (
          <li key={title}>
            <b className="flow-number">{i + 1}</b>
            <StepIcon type={["book", "document", "laptop", "certificate"][i]} />
            <div className="flow-copy">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
function Application({ sectionRef }) {
  const url = safeExternalUrl(config.applicationUrl);
  return (
    <section
      className="application section"
      id="application"
      ref={sectionRef}
      tabIndex="-1"
    >
      <Heading id="C26" />
      <div className="application-intro">
        <Price full />
        <Asset name="application-student" alt="申込内容を確認する学生" />
        <div className="application-guidance">
          <p>{copy.C27note}</p>
          <p className="materials-fee">教材など参加に必要な費用：{pending(config.materialsFee)}</p>
        </div>
      </div>
      <div className="exam-fee">
        <h3>{copy.C26feeTitle}</h3>
        <p>
          <strong>{copy.C26fee}</strong>
        </p>
        <p>{copy.C26feeNote}</p>
        <p>受験料の補助・主催者負担：{pending(config.examFeeSupport)}</p>
        <Source />
      </div>
      <h3 className="participation-title">{copy.C26flow}</h3>
      <ol className="participation-steps">
        {copy.C26steps.map((text, i) => (
          <li key={text}>
            <b>{i + 1}</b>
            <StepIcon type={["document", "chat", "book"][i]} />
            <span>{text}</span>
            {i < 2 && <Arrow />}
          </li>
        ))}
      </ol>
      <div className="application-policy">
        <p>申込締切：{pending(config.deadline)}</p>
        <p>キャンセルの連絡方法：{pending(config.cancellation)}</p>
      </div>
      <CTA id="A03" href={url} disabled={!url}>
        {copy.C27}
      </CTA>
      {!url && (
        <p className="application-status" id="application-status" tabIndex="-1">
          申込先は確認中です。
        </p>
      )}
    </section>
  );
}
function FAQ() {
  return (
    <section className="faq section" id="faq">
      <h2 className="section-title">よくある質問</h2>
      <Asset name="faq-student" alt="" className="faq-art" />
      {faqs.map(([id, q, a], i) => (
        <div key={id}>
          {id === "Q02" && <h3 className="faq-group">資格や学び方について</h3>}
          <details data-faq={id} open={id === "Q04" || id === "Q10"}>
            <summary>
              <span className="q" aria-hidden="true">
                Q{i + 1}
              </span>
              <span>{q}</span>
              <span className="disclosure" aria-hidden="true" />
            </summary>
            <div className="answer">
              <span aria-hidden="true">A</span>
              <p>{a}</p>
            </div>
          </details>
        </div>
      ))}
    </section>
  );
}
function Final({ sectionRef }) {
  const url = safeExternalUrl(config.applicationUrl);
  return (
    <section className="final" id="final" ref={sectionRef}>
      <Heading id="C28" />
      <div className="final-actions">
        <div>
          <CTA href={url} disabled={!url} id="A04">
            {copy.C27}
          </CTA>
        </div>
      </div>
      <a className="conditions-link" href="#application">
        お申し込みについて
      </a>
      <div className="application-form" id="application-form">
        <iframe
          src={safeExternalUrl(config.applicationEmbedUrl)}
          title="生成AIパスポート無料セミナーのお申し込みフォーム"
          width="640"
          height="1440"
          loading="lazy"
        />
      </div>
      <footer>
        <p>© baudroie inc.</p>
      </footer>
    </section>
  );
}
export function App() {
  const heroRef = useRef(null),
    ctaRef = useRef(null),
    applicationRef = useRef(null),
    finalRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const update = () => {
      const visible = (el) => {
        const r = el?.getBoundingClientRect();
        return r && r.top < innerHeight && r.bottom > 0;
      };
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(
        document.activeElement?.tagName,
      );
      setSticky(
        matchMedia("(max-width:1099px), (max-height:799px)").matches &&
          ctaRef.current?.getBoundingClientRect().bottom < 0 &&
          !visible(applicationRef.current) &&
          !visible(finalRef.current) &&
          !typing,
      );
    };
    const observer = new IntersectionObserver(update);
    [heroRef, applicationRef, finalRef].forEach(
      (ref) => ref.current && observer.observe(ref.current),
    );
    ["scroll", "resize", "focusin", "focusout"].forEach((event) =>
      window.addEventListener(event, update, { passive: true }),
    );
    update();
    return () => {
      observer.disconnect();
      ["scroll", "resize", "focusin", "focusout"].forEach((event) =>
        window.removeEventListener(event, update),
      );
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#application">
        無料セミナーのお申し込みへ
      </a>
      <main className="page">
        <Hero heroRef={heroRef} ctaRef={ctaRef} />
        <div className="story">
          <Concern />
          <Qualification />
          <Content />
          <Scenes />
          <ExamFlow />
          <Application sectionRef={applicationRef} />
          <FAQ />
          <Final sectionRef={finalRef} />
        </div>
      </main>
      {sticky && (
        <aside className="sticky-cta" aria-label="セミナーのお申し込み">
          <CTA id="A05" />
        </aside>
      )}
    </>
  );
}
