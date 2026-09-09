// Informational geometry / diagrams are code-native as expressly allowed in 08.
export function Arrow({ className = "" }) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 40 28"
      aria-hidden="true"
    >
      <path
        d="M3 14h31M24 4l11 10-11 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Paper({ kind = "answer" }) {
  return (
    <svg
      className={`paper paper--${kind}`}
      viewBox="0 0 112 145"
      aria-hidden="true"
    >
      <path
        d="M10 9L101 5l2 130-93 4z"
        fill="white"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M24 25h58M24 37h45M24 50h60M24 63h58M24 76h52M24 89h59M24 103h57M24 116h42"
        stroke="#a4aab0"
        strokeWidth="3"
      />
      {kind === "answer" && (
        <>
          <path
            d="M22 50h64M22 63h52M22 89h59"
            stroke="#E0F46B"
            strokeWidth="8"
          />
          <path
            d="M26 50h56M26 63h44M26 89h52"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </>
      )}
      {(kind === "corrected" || kind === "personal") && (
        <path
          d="M24 50h60M24 63h58M24 89h48"
          stroke="#19855e"
          strokeWidth="4"
        />
      )}
      {kind === "personal" && (
        <>
          <rect x="75" y="18" width="20" height="24" fill="#edf2ef" />
          <circle cx="85" cy="24" r="4" fill="#536c60" />
          <path d="M77 39v-3c0-10 16-10 16 0v3z" fill="#536c60" />
          <g className="paper-magnifier" stroke="currentColor" strokeWidth="3">
            <circle cx="89" cy="86" r="27" fill="white" fillOpacity=".75" />
            <circle cx="89" cy="86" r="23" fill="none" stroke="#39B47F" />
            <path d="m108 107 20 22" strokeWidth="8" />
          </g>
        </>
      )}
      {kind === "check" && (
        <g fill="white" stroke="currentColor" strokeWidth="3">
          <circle cx="78" cy="73" r="24" fill="white" fillOpacity=".65" />
          <path d="M95 92l19 23" strokeWidth="8" />
        </g>
      )}
    </svg>
  );
}
export function CalendarArt() {
  return (
    <svg className="calendar-art" viewBox="0 0 120 128" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
        <path d="m10 24 94-3 4 91-94 6z" fill="white" />
        <path d="m10 24 94-3 1 17-94 3z" fill="#39B47F" />
        <path d="M26 15v18M52 14v18M80 13v18" strokeLinecap="round" />
      </g>
      {[0,1,2].flatMap(row=>[0,1,2,3].map(col=><rect key={`${row}-${col}`} x={23+col*18} y={49+row*19} width="12" height="13" fill="#bbc1c5" />))}
      <path d="m110 15 7-6m-6 19h8m-12-23 1-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
export function BookArt({ exam = false }) {
  if (exam)
    return (
      <div className="exam-art" role="img" aria-label="学習と試験">
        <svg viewBox="0 0 270 190" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M24 29 108 7l26 146-88 26z" fill="#167351" />
            <path d="M46 166 130 142l4 11-88 26-8-8z" fill="white" />
            <path d="m158 14 89 14-20 147-91-14z" fill="white" />
            <path
              d="m158 68 10 2-2 10-10-2zm-4 29 10 2-2 10-10-2zm-4 29 10 2-2 10-10-2z"
              fill="none"
            />
            <path d="m176 76 48 7m-53 22 49 7m-53 22 47 7" stroke="#a4aab0" />
          </g>
          <text x="79" y="88" textAnchor="middle" dominantBaseline="middle"
            transform="rotate(-13 79 88)" fill="white">学習</text>
          <text x="199" y="46" textAnchor="middle" dominantBaseline="middle"
            transform="rotate(8 199 46)" fill="currentColor">試験</text>
        </svg>
      </div>
    );
  return (
    <div className={`book-art ${exam ? "book-art--exam" : ""}`}>
      <svg viewBox="0 0 270 210" aria-hidden="true">
        <path
          d="M15 150C0 77 87 9 174 11c79 3 112 81 66 147-56 61-202 55-225-8z"
          fill="#E0F46B"
        />
        <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          <path
            d="M37 62q52-20 97 3 45-23 93-7v114q-44-15-93 5-45-20-97-6z"
            fill="white"
          />
          <path d="M134 65v112" fill="none" />
          <path
            d="M49 84h58M49 100h61M49 114h54M49 130h59M49 145h58"
            stroke="#a4aab0"
          />
          <path d="M49 100h61M49 113h50" stroke="#cce34c" strokeWidth="5" />
          <circle cx="181" cy="114" r="27" fill="white" />
          <path d="m166 113 12 12 20-23" fill="none" />
          <path d="m122 164 90-21 39 25-94 28-35-19z" fill="#14694b" />
          <path d="m123 177 35 21 92-28v10l-93 28-34-20z" fill="white" />
        </g>
      </svg>
      {exam && <span className="book-label">学習・受験</span>}
    </div>
  );
}
export function ResumeArt({ labels = ["履歴書", "資格欄"] }) {
  return (
    <div className="resume-art">
      <Paper kind="answer" />
      <strong>{labels[0]}</strong>
      <span>{labels[1]}</span>
    </div>
  );
}
export function StepIcon({ type }) {
  const paths = {
    book: "M5 6q10-4 19 0 9-4 19 0v33q-10-4-19 0-10-4-19 0zM24 6v33",
    document: "M10 3h29v41H10zM16 12h17M16 19h17M16 26h17M16 33h11",
    laptop: "M7 5h35v28H7zM7 33 2 42h45l-5-9M18 38h13",
    certificate: "M9 4h30v39H9zM15 12h18M15 19h18M15 26h13M31 32v13l5-3 4 3V32",
    calendar:
      "M6 9h36v33H6zM6 18h36M15 3v12M33 3v12M15 25h3m5 0h3m5 0h3M15 33h3m5 0h3m5 0h3",
    mail: "M3 8h42v32H3zM3 8l21 17L45 8",
    chat: "M6 6h36v28H23L12 43v-9H6zM13 14h22M13 22h16",
  };
  return (
    <svg className="step-icon" viewBox="0 0 48 48" aria-hidden="true">
      <path
        d={paths[type] || paths.document}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
