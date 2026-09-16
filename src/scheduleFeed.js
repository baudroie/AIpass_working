export function validateScheduleFeed(data) {
  if (!data || ![1,2].includes(data.schemaVersion) || data.ok !== true || !['preview','live'].includes(data.mode) || !Array.isArray(data.options) || data.options.length > 30) throw new Error('日程を読み込めませんでした。');
  const ids = new Set(), labels = new Set();
  const options = data.options.map(option => {
    if (!option || typeof option.id !== 'string' || !/^[a-zA-Z0-9_-]{1,60}$/.test(option.id) || ids.has(option.id) || typeof option.label !== 'string' || !option.label.trim() || option.label.length > 160 || /[<>\r\n○〇]|未定|要確認/.test(option.label) || labels.has(option.label)) throw new Error('日程を確認できませんでした。');
    ids.add(option.id); labels.add(option.label);
    const hasTime = option.startsAt !== undefined || option.endsAt !== undefined;
    if (hasTime && (!isScheduleTime(option.startsAt) || !isScheduleTime(option.endsAt) || Date.parse(option.endsAt) <= Date.parse(option.startsAt))) throw new Error('日程の時刻を確認できませんでした。');
    if (option.id.startsWith('cal_') && !hasTime) throw new Error('日程の終了時刻を確認できませんでした。');
    return { id: option.id, label: option.label, ...(hasTime ? { startsAt:option.startsAt, endsAt:option.endsAt } : {}) };
  }).filter(option => !option.endsAt || Date.parse(option.endsAt) > Date.now())
    .sort((a,b) => fixedRequestRank(a.id) - fixedRequestRank(b.id));
  const live = data.mode === 'live';
  if (data.accepting === true && (!live || data.schemaVersion !== 2 || data.submissionBackend !== 'gas' || !options.length)) throw new Error('受付情報を確認できませんでした。');
  if (typeof data.updatedAt !== 'string' || !Number.isFinite(Date.parse(data.updatedAt)) || Date.now() - Date.parse(data.updatedAt) > 30 * 60 * 1000 || Date.parse(data.updatedAt) - Date.now() > 5 * 60 * 1000) throw new Error('日程の更新を確認できませんでした。');
  return {options,mode:data.mode,accepting:data.accepting === true,submissionBackend:data.schemaVersion === 2 ? data.submissionBackend : null,updatedAt:data.updatedAt};
}

function isScheduleTime(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value));
}

function fixedRequestRank(id) { return id === 'next-dates' ? 1 : id === 'consultation' ? 2 : 0; }

// Public schedule-only JSONP is supported by Apps Script ContentService.
// No user input, answer data, account tokens or response-sheet reads are sent.
export function loadScheduleFeed(endpoint, { signal } = {}) {
  const url = new URL(endpoint);
  if (url.origin !== 'https://script.google.com' || !/^\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/.test(url.pathname)) return Promise.reject(new Error('日程の連携先が未設定です。'));
  return new Promise((resolve, reject) => {
    const callback = `scheduleCb_${crypto.randomUUID().replaceAll('-', '_')}`;
    const script = document.createElement('script');
    let timer;
    function cleanup() { clearTimeout(timer); script.remove(); delete window[callback]; signal?.removeEventListener('abort', abort); }
    function fail(message) { cleanup(); reject(new Error(message)); }
    function abort() { fail('日程の取得を中止しました。'); }
    window[callback] = payload => {
      try { const result = validateScheduleFeed(payload); cleanup(); resolve(result); }
      catch (error) { cleanup(); reject(error); }
    };
    if (signal?.aborted) { abort(); return; }
    signal?.addEventListener('abort', abort, { once:true });
    url.searchParams.set('callback', callback);
    url.searchParams.set('_', String(Date.now()));
    script.src = url.href;
    script.referrerPolicy = 'no-referrer';
    script.onerror = () => fail('日程を読み込めませんでした。');
    timer = setTimeout(() => fail('日程の読み込みに時間がかかっています。'), 15000);
    document.head.appendChild(script);
  });
}
