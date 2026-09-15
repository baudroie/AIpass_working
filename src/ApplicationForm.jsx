import { useState } from "react";
import { siteConfig, safeExternalUrl } from "./siteConfig.js";
import { applicationFields, scheduleEntries } from "./applicationFields.js";

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

export function ApplicationForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  return (
    <form
      className="application-form"
      id="application-form"
      aria-label="無料セミナーのお申し込みフォーム"
      tabIndex="-1"
      action={safeExternalUrl(siteConfig.applicationSubmitUrl)}
      method="post"
      target="_self"
      acceptCharset="UTF-8"
    >
      <p className="application-form-intro">以下の項目をご入力ください。</p>
      <div className="application-fields">
        <Field id="applicant-name" label="氏名">
          <input id="applicant-name" name={applicationFields.name} autoComplete="name" placeholder="例：山田 太郎" required />
        </Field>
        <Field id="applicant-age" label="年齢">
          <div className="age-input">
            <input id="applicant-age" name={applicationFields.age} inputMode="numeric" placeholder="例：22" required />
            <span aria-hidden="true">歳</span>
          </div>
        </Field>
        <Field id="applicant-email" label="メールアドレス">
          <input id="applicant-email" type="email" name={applicationFields.email} autoComplete="email" inputMode="email" placeholder="例：name@example.com" required />
        </Field>
        <Field id="applicant-phone" label="電話番号">
          <input id="applicant-phone" type="tel" name={applicationFields.phone} autoComplete="tel" placeholder="例：09012345678" required />
        </Field>
        <Field id="applicant-date" label="参加希望日">
          <input id="applicant-date" type="date" value={date} onChange={event => setDate(event.target.value)} max="2076-01-01" required />
        </Field>
        <Field id="applicant-time" label="参加希望時間">
          <input id="applicant-time" type="time" value={time} onChange={event => setTime(event.target.value)} step="60" required />
        </Field>
      </div>
      {Object.entries(scheduleEntries(date, time)).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <div className="application-form-submit">
        <button className="cta" type="submit">
          この内容で申し込む<span aria-hidden="true">›</span>
        </button>
        <p>送信後、Googleフォームの受付結果が表示されます。</p>
      </div>
    </form>
  );
}
