import { useEffect, useRef, useState } from "react";
import { activeAudience } from "./audience.js";
import { scheduleOptions } from "./applicationSchedule.js";
import { siteConfig, safeExternalUrl } from "./siteConfig.js";
import { loadScheduleFeed } from "./scheduleFeed.js";

function Field({ id, label, children }) {
  return (
    <div className="application-field">
      <label htmlFor={id}>
        <span>{label}</span>
        <span className="field-required">必須</span>
      </label>
      {children}
    </div>
  );
}

function ScheduleLabel({ option }) {
  const parts = option.startsAt && option.label.match(/^(.+?（[日月火水木金土]）)(.+)$/);
  if (!parts) return <span>{option.label}</span>;
  return <span><span className="schedule-label-part">{parts[1]}</span>{" "}<span className="schedule-label-part">{parts[2]}</span></span>;
}

export function ApplicationForm() {
  const requestId = useRef("");
  const [feed, setFeed] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(siteConfig.scheduleFeedUrl));
  const [submitting, setSubmitting] = useState(false);
  const [retry, setRetry] = useState(0);
  const endpoint = siteConfig.scheduleFeedUrl;
  const options = endpoint ? feed?.options || [] : scheduleOptions;
  const productionReady = Boolean(siteConfig.enableProductionSubmission && endpoint && feed?.mode === "live" && feed?.submissionBackend === "gas");
  const canSubmit = Boolean(siteConfig.enableProductionSubmission && endpoint && feed?.mode === "live" && feed?.submissionBackend === "gas" && feed?.accepting && !error && !loading && !submitting);

  useEffect(() => {
    if (!requestId.current) requestId.current = crypto.randomUUID();
    if (!endpoint) return;
    const controller = new AbortController();
    let running = false;
    async function refresh() {
      if (running) return;
      running = true;
      try {
        const next = await loadScheduleFeed(endpoint, {signal:controller.signal});
        if (controller.signal.aborted) return;
        setFeed(next); setError("");
        setSelected(old => next.options.some(o => o.id === old?.id && o.label === old?.label) ? old : null);
      } catch (err) {
        if (!controller.signal.aborted) { setFeed(null); setSelected(null); setError(err.message); }
      } finally {
        running = false;
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    setLoading(true);
    refresh();
    const interval = setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    return () => { controller.abort(); clearInterval(interval); window.removeEventListener("focus", refresh); };
  }, [endpoint, retry]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit || !selected) return;
    const form = event.currentTarget;
    setSubmitting(true);
    try {
      const current = await loadScheduleFeed(endpoint);
      const choiceId = new FormData(form).get("choiceId");
      if (current.mode !== "live" || !current.accepting || current.submissionBackend !== "gas" || !current.options.some(o => o.id === choiceId && o.label === selected.label)) {
        setFeed(current); setSelected(null);
        setError("日程の受付状況が変わりました。再読み込みしてお選びください。");
        return;
      }
      if (form.reportValidity()) { form.elements.requestId.value = requestId.current; HTMLFormElement.prototype.submit.call(form); }
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  }

  return (
    <form
      className="application-form"
      id="application-form"
      aria-label="無料セミナーのお申し込みフォーム"
      tabIndex="-1"
      onSubmit={handleSubmit}
      action={productionReady ? safeExternalUrl(endpoint) : undefined}
      method={productionReady ? "post" : "dialog"}
      acceptCharset="UTF-8"
    >
      <input type="hidden" name="requestId" defaultValue="" />
      <input type="hidden" name="audience" value={activeAudience} />
      <input type="hidden" name="choiceLabel" value={selected?.label || ""} />
      <p className="application-form-intro">以下の項目をご入力ください。</p>
      <div className="application-fields">
        <Field id="applicant-name" label="氏名">
          <input id="applicant-name" name="name" maxLength={100} autoComplete="name" placeholder="例：山田 太郎" required />
        </Field>
        <Field id="applicant-age" label="年齢">
          <div className="age-input">
            <input id="applicant-age" name="age" pattern="[0-9]{1,3}" maxLength={3} inputMode="numeric" placeholder="例：22" required />
            <span aria-hidden="true">歳</span>
          </div>
        </Field>
        <Field id="applicant-email" label="メールアドレス">
          <input id="applicant-email" type="email" name="email" maxLength={254} autoComplete="email" inputMode="email" placeholder="例：name@example.com" required />
        </Field>
        <Field id="applicant-phone" label="電話番号">
          <input id="applicant-phone" type="tel" name="phone" maxLength={30} autoComplete="tel" placeholder="例：09012345678" required />
        </Field>
        <fieldset className="schedule-field">
          <legend>ご希望の日程・ご相談<span className="field-required">必須</span></legend>
          <p className="schedule-help">いずれか1つをお選びください。</p>
          <div className="schedule-options">
            {options.map(option => (
              <label className="schedule-option" key={option.id}>
                <input type="radio" name="choiceId" value={option.id} checked={selected?.id === option.id} onChange={() => setSelected(option)} required />
                <ScheduleLabel option={option} />
              </label>
            ))}
          </div>
          {loading && <p className="schedule-help" role="status">日程を読み込んでいます。</p>}
          {error && <p className="schedule-help" role="alert">{error} <button type="button" onClick={() => setRetry(n => n + 1)}>再読み込み</button></p>}
          {!loading && !error && endpoint && feed && !options.length && <p className="schedule-help" role="status">現在受付中の日程はありません。</p>}
        </fieldset>
      </div>
      <div className="application-form-submit">
        <button className="cta" type="submit" disabled={!canSubmit} aria-describedby="schedule-draft-status">
          {submitting ? "受付状況を確認しています" : "この内容で申し込む"}<span aria-hidden="true">›</span>
        </button>
        <p id="schedule-draft-status">{siteConfig.enableProductionSubmission && feed?.mode === "live" && feed?.submissionBackend === "gas" ? "送信後、受付結果が表示されます。" : "確認用プレビューのため、送信できません。"}</p>
      </div>
    </form>
  );
}
