import { ArrowRight, FlaskConical, Heart, Sparkles } from "lucide-react";

function MeaningIllustration() {
  return (
    <svg
      className="visual-guide-illustration meaning-illustration"
      viewBox="0 0 520 274"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="meaning-aura">
          <stop stopColor="var(--violet)" stopOpacity=".2" />
          <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="meaning-stem" x1="135" y1="220" x2="340" y2="40">
          <stop stopColor="var(--mint)" />
          <stop offset=".8" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      <ellipse cx="260" cy="142" rx="210" ry="132" fill="url(#meaning-aura)" />
      <g stroke="var(--line)" strokeWidth="1" opacity=".65">
        <path d="M34 238H486M34 196H486M34 154H486M34 112H486M34 70H486" />
        <path d="M76 28V248M168 28V248M260 28V248M352 28V248M444 28V248" />
      </g>
      <path
        d="M260 230C254 192 272 165 260 127C254 105 228 90 233 59"
        stroke="url(#meaning-stem)"
        strokeWidth="3.3"
        strokeLinecap="round"
      />
      <path d="M260 168C225 161 214 146 205 133M262 138C298 126 315 104 328 86M245 105C219 94 203 73 197 60" stroke="url(#meaning-stem)" strokeWidth="2" strokeLinecap="round" />
      <path d="M205 133C169 110 153 111 149 135C169 151 189 152 205 133ZM328 86C323 55 350 41 371 51C368 76 353 87 328 86ZM197 60C187 33 161 30 149 41C157 62 177 69 197 60ZM234 60C226 39 237 22 256 22C264 42 258 57 234 60Z" fill="var(--mint)" fillOpacity=".2" stroke="var(--mint)" strokeOpacity=".65" strokeWidth="1.5" />
      <circle cx="260" cy="230" r="17" fill="var(--surface)" stroke="var(--mint)" strokeWidth="1.8" />
      <circle cx="260" cy="230" r="6" fill="var(--mint)" />
      <g fill="var(--violet)" opacity=".8">
        <circle cx="126" cy="83" r="2" />
        <circle cx="397" cy="105" r="3" />
        <circle cx="409" cy="201" r="2" />
        <circle cx="100" cy="191" r="2" />
      </g>
      <g fill="var(--text)" fontSize="10" letterSpacing="2">
        <text x="275" y="250">WORD</text>
        <text x="381" y="45">WORLD</text>
      </g>
      <path d="M340 62L377 48" stroke="var(--violet)" strokeOpacity=".65" strokeDasharray="3 5" />
    </svg>
  );
}

function FootprintIllustration() {
  return (
    <svg className="visual-guide-illustration" viewBox="0 0 310 124" fill="none" aria-hidden="true" focusable="false">
      <path d="M40 63H270" stroke="var(--line)" strokeWidth="2" />
      <path d="M88 63L136 20M88 63L136 106M183 63L229 20M183 63L229 106" stroke="var(--mint)" strokeOpacity=".55" strokeWidth="1.6" strokeDasharray="3 7" />
      {[[40,63],[88,63],[136,20],[136,106],[183,63],[229,20],[229,106],[270,63]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r={i===4?15:10} fill="var(--surface)" stroke={i===4?"var(--violet)":"var(--mint)"} strokeOpacity=".85" strokeWidth="1.7"/>
          <circle cx={x} cy={y} r="3" fill={i===4?"var(--violet)":"var(--mint)"}/>
        </g>
      ))}
      <g fill="var(--muted)" fontSize="9" letterSpacing="1.1">
        <text x="34" y="92">TASK</text>
        <text x="169" y="92">SYSTEM</text>
        <text x="246" y="92">IMPACT</text>
      </g>
    </svg>
  );
}

function PerspectivesIllustration() {
  return (
    <svg className="visual-guide-illustration" viewBox="0 0 310 124" fill="none" aria-hidden="true" focusable="false">
      <circle cx="155" cy="60" r="49" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 6" />
      {[[111,60,"mint"],[155,22,"violet"],[199,60,"amber"],[155,98,"blue"]].map(([x,y,color],i)=>(
        <g key={i}>
          <path d={`M155 60L${x} ${y}`} stroke={`var(--${color})`} strokeOpacity=".6" strokeWidth="1.6"/>
          <circle cx={x} cy={y} r="14" fill="var(--surface)" stroke={`var(--${color})`} strokeWidth="1.8"/>
          <circle cx={x} cy={y} r="3.4" fill={`var(--${color})`}/>
        </g>
      ))}
      <circle cx="155" cy="60" r="18" fill="var(--raised)" stroke="var(--violet)" strokeWidth="1.3"/>
      <path d="M149 60h12m-6-6v12" stroke="var(--text)" strokeLinecap="round" strokeWidth="1.8"/>
      <g fill="var(--muted)" fontSize="9" letterSpacing="1">
        <text x="25" y="63">VALUES</text>
        <text x="232" y="63">EVIDENCE</text>
      </g>
    </svg>
  );
}

export default function VisualGuide() {
  return (
    <section className="visual-guide" aria-labelledby="visual-guide-title">
      <div className="visual-guide-heading">
        <div>
          <p className="eyebrow"><span /> START WITH CURIOSITY</p>
          <h2 id="visual-guide-title">See the whole picture.<br/><em>Then look closer.</em></h2>
        </div>
        <p>
          A visual path into difficult questions. Begin with an idea, follow the
          evidence, and decide what it means to you.
        </p>
      </div>
      <div className="visual-guide-grid">
        <a className="visual-story visual-story-feature" href="#author">
          <span className="visual-story-kicker"><Sparkles size={14} aria-hidden="true" /> 01 / CREATIVE AGENCY</span>
          <MeaningIllustration />
          <div className="visual-story-copy">
            <h3>A word becomes a world.</h3>
            <p>
              Art can turn a small idea into an experience. Explore how human
              intention, creative tools, authorship, and consent meet.
            </p>
            <span className="visual-story-cta">Explore the artist's perspective <ArrowRight size={16} aria-hidden="true" /></span>
          </div>
        </a>
        <a className="visual-story visual-story-measure" href="#dashboard">
          <span className="visual-story-kicker"><FlaskConical size={14} aria-hidden="true" /> 02 / WHAT WE CAN MEASURE</span>
          <FootprintIllustration />
          <div className="visual-story-copy">
            <h3>Follow the footprint.</h3>
            <p>
              One headline cannot describe an entire system. See what the
              numbers count—and what they leave out.
            </p>
            <span className="visual-story-cta">Open the evidence <ArrowRight size={16} aria-hidden="true" /></span>
          </div>
        </a>
        <a className="visual-story visual-story-question" href="#perspectives">
          <span className="visual-story-kicker"><Heart size={14} aria-hidden="true" /> 03 / ROOM FOR PERSPECTIVE</span>
          <PerspectivesIllustration />
          <div className="visual-story-copy">
            <h3>One question. Many lenses.</h3>
            <p>
              Look at competing values, strongest arguments, and the questions
              that are still unresolved.
            </p>
            <span className="visual-story-cta">Explore the perspectives <ArrowRight size={16} aria-hidden="true" /></span>
          </div>
        </a>
      </div>
      <div className="visual-guide-foot">
        <span><span className="small-dot mint" /> No moral scores. No false certainty.</span>
        <a href="#workflow">
          Try the energy-per-accepted-output experiment <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
