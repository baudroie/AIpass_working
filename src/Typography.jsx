import { copy, currentVariant, typographyLines } from "./content.js";
const segments = new Intl.Segmenter("ja", { granularity: "grapheme" });
export const graphemes = (value) =>
  [...segments.segment(value)].map((item) => item.segment);
export function GlyphRun({ text, prefix }) {
  return graphemes(text).map((glyph, index) => (
    <span
      className="glyph"
      data-glyph={`${prefix}-G${String(index + 1).padStart(2, "0")}`}
      key={index}
    >
      {glyph}
    </span>
  ));
}
export function HeroTitle({ variant = currentVariant }) {
  return (
    <h1
      className="hero-title"
      data-copy="C02"
      data-typo={variant.heroCopyId}
      aria-label={variant.heroLines.join("")}
    >
      {variant.heroLines.map((line, index) => (
        <span
          className={`type-line type-line--${index + 1}`}
          aria-hidden="true"
          key={index}
        >
          <span className="type-phrase">
            <GlyphRun
              text={line}
              prefix={`${variant.heroCopyId}-L${index + 1}`}
            />
          </span>
        </span>
      ))}
    </h1>
  );
}
export function HeroSubtitle() {
  return (
    <p className="hero-subtitle" data-copy="C03">
      <span className="sr-only">{copy.C03}</span>
      <span aria-hidden="true">
        <span className="subtitle-line">
          <GlyphRun text={typographyLines.C03[0]} prefix="C03-L1" />
        </span>
        <span className="subtitle-line">
          <GlyphRun text={typographyLines.C03[1]} prefix="C03-L2" />
        </span>
      </span>
    </p>
  );
}
export function ConcernTitle() {
  return (
    <h2 className="concern-title" data-copy="C07" aria-label={copy.C07}>
      <span className="type-line" aria-hidden="true">
        <span className="latin">
          <GlyphRun
            text={typographyLines.C07[0].slice(0, 7)}
            prefix="C07-L1-LATIN"
          />
        </span>
        <span className="jp">
          <GlyphRun text={typographyLines.C07[0].slice(7)} prefix="C07-L1-JP" />
        </span>
      </span>
      <span className="type-line" aria-hidden="true">
        <GlyphRun text={typographyLines.C07[1]} prefix="C07-L2" />
      </span>
    </h2>
  );
}
export function Heading({ id, as: Tag = "h2", className = "" }) {
  const groups = typographyLines[id];
  return (
    <Tag
      className={`section-title ${className}`}
      data-copy={id}
      aria-label={copy[id]}
    >
      <span aria-hidden="true">
        {groups ? (
          groups.map((text, i) => (
            <span className="heading-phrase" key={i}>
              <GlyphRun text={text} prefix={`${id}-L${i + 1}`} />
            </span>
          ))
        ) : (
          <GlyphRun text={copy[id]} prefix={id} />
        )}
      </span>
    </Tag>
  );
}
export function Price({ full = false }) {
  return (
    <p className="price" data-typo="PRICE">
      <span className="price-label">{full ? "セミナー参加費" : "参加費"}</span>
      <span className="price-value">
        <b className="zero">0</b>
        <span className="yen">円</span>
      </span>
      <span className="price-rays" aria-hidden="true" />
    </p>
  );
}
