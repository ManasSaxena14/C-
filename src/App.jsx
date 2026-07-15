import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Terminal, ChevronRight, ChevronDown, Menu, X, Check, XCircle, BookOpen,
  Award, Code2, Hash, Layers, Type, Binary, GitBranch, RotateCw, Sparkles,
  Play, Circle, CheckCircle2, AlertTriangle, Lightbulb, Target, ListChecks,
  Braces, Brackets, Parentheses, Sigma, ArrowLeftRight, Fingerprint,
  ToggleLeft, Repeat, SquareSplitHorizontal, FileWarning, Trophy, ChevronsRight
} from "lucide-react";

/* ============================================================================
   GATE DA — PYTHON MASTERY CONSOLE
   A notebook/REPL-themed interactive study artifact.
============================================================================ */

/* ---------------------------- STYLE SYSTEM ---------------------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

    .pyc-root {
      --bg: #0A0E17;
      --bg-soft: #0D1220;
      --surface: #121829;
      --surface-2: #172038;
      --surface-3: #1C2640;
      --border: #263155;
      --border-soft: #1B2440;
      --text: #E7EAF4;
      --text-dim: #8B93B0;
      --text-dimmer: #5C6484;
      --amber: #F3B94D;
      --amber-soft: rgba(243,185,77,0.12);
      --amber-border: rgba(243,185,77,0.35);
      --teal: #45D5B0;
      --teal-soft: rgba(69,213,176,0.12);
      --teal-border: rgba(69,213,176,0.35);
      --coral: #F16A70;
      --coral-soft: rgba(241,106,112,0.12);
      --coral-border: rgba(241,106,112,0.35);
      --violet: #9C8CFB;
      --violet-soft: rgba(156,140,251,0.12);
      --violet-border: rgba(156,140,251,0.35);
      --blue: #5EA8F2;
      --blue-soft: rgba(94,168,242,0.12);
      --rose: #F27FA8;
      --rose-soft: rgba(242,127,168,0.12);
      --lime: #A8D45C;
      --lime-soft: rgba(168,212,92,0.12);
      --sky: #5CD4E8;
      --sky-soft: rgba(92,212,232,0.12);
      font-family: 'Inter', system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100%;
      position: relative;
    }
    .pyc-root::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(243,185,77,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(243,185,77,0.025) 1px, transparent 1px);
      background-size: 42px 42px;
      pointer-events: none;
      z-index: 0;
    }
    .pyc-font-display { font-family: 'Space Grotesk', sans-serif; }
    .pyc-font-mono { font-family: 'JetBrains Mono', monospace; }

    .pyc-scrollbar::-webkit-scrollbar { width: 9px; height: 9px; }
    .pyc-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .pyc-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 8px; }
    .pyc-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--amber-border); }

    .pyc-fade-in { animation: pycFadeIn 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
    @keyframes pycFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    .pyc-slide-in { animation: pycSlideIn 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
    @keyframes pycSlideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }

    .pyc-blink { animation: pycBlink 1.1s steps(1) infinite; }
    @keyframes pycBlink { 50% { opacity: 0; } }

    .pyc-topic-btn {
      transition: background 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s ease, color 0.2s ease, padding-left 0.2s ease;
      border-radius: 6px;
    }
    .pyc-topic-btn:hover {
      background: var(--surface-2) !important;
      padding-left: 26px !important;
    }

    .pyc-card {
      transition: border-color 0.25s ease, transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease;
    }
    .pyc-card:hover {
      border-color: var(--border) !important;
      box-shadow: 0 4px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(243,185,77,0.06);
      transform: translateY(-1px);
    }

    .pyc-opt {
      transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
      cursor: pointer;
    }
    .pyc-opt:hover {
      border-color: var(--amber-border) !important;
      transform: translateX(3px);
      box-shadow: 0 2px 12px rgba(243,185,77,0.08);
    }

    .pyc-btn {
      transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
      cursor: pointer;
    }
    .pyc-btn:hover {
      filter: brightness(1.12);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
    }
    .pyc-btn:active { transform: translateY(0); box-shadow: none; }

    .pyc-link:hover { color: var(--amber) !important; }

    .pyc-badge-dot { box-shadow: 0 0 0 3px rgba(0,0,0,0.15); }

    .pyc-sidebar-chapter {
      animation: pycSlideIn 0.35s cubic-bezier(0.22, 0.61, 0.36, 1) both;
    }

    .pyc-sidebar-topic-item {
      transition: background 0.2s ease, padding-left 0.2s ease, color 0.2s ease;
      border-radius: 6px;
    }
    .pyc-sidebar-topic-item:hover {
      background: rgba(243,185,77,0.06) !important;
    }

    .pyc-section-enter {
      animation: pycSectionEnter 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both;
    }
    @keyframes pycSectionEnter {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 860px) {
      .pyc-sidebar {
        position: fixed !important; z-index: 45; height: 100dvh !important; top: 0 !important;
        left: 0; transform: translateX(-105%); transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
        box-shadow: 8px 0 40px rgba(0,0,0,0.5); background: var(--bg);
      }
      .pyc-sidebar.pyc-sidebar-open { transform: translateX(0); }
      .pyc-menu-btn { display: flex !important; }
      .pyc-backdrop { display: block !important; }
    }
    .pyc-menu-btn { display: none; }
    .pyc-backdrop {
      display: none; position: fixed; inset: 0; background: rgba(5,7,12,0.65); backdrop-filter: blur(4px);
      z-index: 44; opacity: 0; pointer-events: none; transition: opacity 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .pyc-backdrop.pyc-backdrop-open { opacity: 1; pointer-events: auto; }
  `}</style>
);

/* ---------------------------- SMALL PRIMITIVES ---------------------------- */

const Badge = ({ children, tone = "amber", icon: Icon }) => {
  const map = {
    amber: { bg: "var(--amber-soft)", bd: "var(--amber-border)", fg: "var(--amber)" },
    teal: { bg: "var(--teal-soft)", bd: "var(--teal-border)", fg: "var(--teal)" },
    coral: { bg: "var(--coral-soft)", bd: "var(--coral-border)", fg: "var(--coral)" },
    violet: { bg: "var(--violet-soft)", bd: "var(--violet-border)", fg: "var(--violet)" },
    blue: { bg: "var(--blue-soft)", bd: "rgba(94,168,242,0.35)", fg: "var(--blue)" },
  };
  const c = map[tone] || map.amber;
  return (
    <span
      className="pyc-font-mono"
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: c.bg, border: `1px solid ${c.bd}`, color: c.fg,
        fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999,
        letterSpacing: 0.3, whiteSpace: "nowrap"
      }}
    >
      {Icon && <Icon size={11} strokeWidth={2.5} />}
      {children}
    </span>
  );
};

/* Terminal-style code cell: In[]/Out[] like a notebook */
const CodeCell = ({ code, output, outputTone = "text", note, idx = 1 }) => {
  const toneColor = outputTone === "error" ? "var(--coral)" : outputTone === "teal" ? "var(--teal)" : "var(--text)";
  return (
    <div style={{ background: "var(--bg-soft)", border: "1px solid var(--border-soft)", borderRadius: 10, overflow: "hidden", margin: "10px 0" }}>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div className="pyc-font-mono" style={{ width: 62, flexShrink: 0, padding: "10px 8px", color: "var(--amber)", fontSize: 12, textAlign: "right", opacity: 0.75, borderRight: "1px solid var(--border-soft)" }}>
          In [{idx}]:
        </div>
        <pre className="pyc-font-mono" style={{ margin: 0, padding: "10px 14px", flex: 1, fontSize: 13.5, lineHeight: 1.65, color: "var(--text)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
{code}
        </pre>
      </div>
      {output !== undefined && output !== null && (
        <div style={{ display: "flex", alignItems: "stretch", borderTop: "1px dashed var(--border-soft)" }}>
          <div className="pyc-font-mono" style={{ width: 62, flexShrink: 0, padding: "10px 8px", color: "var(--text-dimmer)", fontSize: 12, textAlign: "right" }}>
            Out:
          </div>
          <pre className="pyc-font-mono" style={{ margin: 0, padding: "10px 14px", flex: 1, fontSize: 13.5, lineHeight: 1.65, color: toneColor, whiteSpace: "pre-wrap", wordBreak: "break-word", fontWeight: 600 }}>
{output}
          </pre>
        </div>
      )}
      {note && (
        <div style={{ padding: "8px 14px 12px 14px", borderTop: "1px dashed var(--border-soft)", display: "flex", gap: 7, alignItems: "flex-start" }}>
          <Lightbulb size={13} style={{ color: "var(--amber)", marginTop: 2, flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: "var(--text-dim)", lineHeight: 1.55 }}>{note}</span>
        </div>
      )}
    </div>
  );
};

/* Dry-run step tracer for hard questions */
const DryRun = ({ steps }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "10px 0", border: "1px solid var(--violet-border)", borderRadius: 10, overflow: "hidden", background: "var(--violet-soft)" }}>
      <button onClick={() => setOpen(o => !o)} className="pyc-btn" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "transparent", border: "none", color: "var(--violet)", fontWeight: 600, fontSize: 13 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}><GitBranch size={14} /> Dry Run — trace it step by step</span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {open && (
        <div className="pyc-fade-in" style={{ padding: "4px 14px 14px 14px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderTop: i > 0 ? "1px dashed rgba(156,140,251,0.2)" : "none" }}>
              <span className="pyc-font-mono" style={{ color: "var(--violet)", fontSize: 11.5, fontWeight: 700, flexShrink: 0, minWidth: 20 }}>{i + 1}</span>
              <span className="pyc-font-mono" style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.6 }}>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* Question block: PYQ or Practice — MCQ / MSQ / NAT */
const QBlock = ({ q, qid, answers, setAnswers, revealed, setRevealed }) => {
  const state = answers[qid] || (q.qtype === "MSQ" ? [] : q.qtype === "NAT" ? "" : null);
  const isRevealed = !!revealed[qid];

  const setState = (val) => setAnswers(prev => ({ ...prev, [qid]: val }));
  const toggleMSQ = (i) => {
    const cur = Array.isArray(state) ? state : [];
    setState(cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i]);
  };

  const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
  const isCorrect = () => {
    if (q.qtype === "NAT") return String(state).trim() === String(q.correct).trim();
    if (q.qtype === "MSQ") {
      const s = Array.isArray(state) ? [...state].sort() : [];
      const c = [...correctArr].sort();
      return s.length === c.length && s.every((v, i) => v === c[i]);
    }
    return state === q.correct;
  };

  return (
    <div style={{ margin: "12px 0", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--surface)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-soft)", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "space-between", background: "var(--surface-2)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center" }}>
          {q.isPYQ ? (
            <Badge tone="teal" icon={CheckCircle2}>PYQ · {q.source}</Badge>
          ) : (
            <Badge tone="amber" icon={Sparkles}>GATE-Style Practice</Badge>
          )}
          <Badge tone="blue">{q.qtype}</Badge>
          <Badge tone="violet">{q.marks} mark{q.marks > 1 ? "s" : ""}</Badge>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <pre className="pyc-font-mono" style={{ margin: "0 0 12px 0", fontSize: 13.5, lineHeight: 1.7, color: "var(--text)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.stem}</pre>

        {q.qtype !== "NAT" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.options.map((opt, i) => {
              const chosen = q.qtype === "MSQ" ? (Array.isArray(state) && state.includes(i)) : state === i;
              const isAns = correctArr.includes(i);
              let bd = "var(--border)", bg = "var(--bg-soft)";
              if (isRevealed) {
                if (isAns) { bd = "var(--teal-border)"; bg = "var(--teal-soft)"; }
                else if (chosen && !isAns) { bd = "var(--coral-border)"; bg = "var(--coral-soft)"; }
              } else if (chosen) { bd = "var(--amber-border)"; bg = "var(--amber-soft)"; }
              return (
                <div key={i} onClick={() => !isRevealed && (q.qtype === "MSQ" ? toggleMSQ(i) : setState(i))}
                  className="pyc-opt"
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, border: `1px solid ${bd}`, background: bg }}>
                  <span style={{
                    width: 18, height: 18, flexShrink: 0, borderRadius: q.qtype === "MSQ" ? 5 : 999,
                    border: `1.5px solid ${chosen ? "var(--amber)" : "var(--text-dimmer)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: chosen ? "var(--amber)" : "transparent"
                  }}>
                    {chosen && <Check size={12} color="#0A0E17" strokeWidth={3.5} />}
                  </span>
                  <span className="pyc-font-mono" style={{ fontSize: 13, color: "var(--text)" }}>{String.fromCharCode(65 + i)}.  {opt}</span>
                  {isRevealed && isAns && <CheckCircle2 size={15} style={{ color: "var(--teal)", marginLeft: "auto" }} />}
                  {isRevealed && chosen && !isAns && <XCircle size={15} style={{ color: "var(--coral)", marginLeft: "auto" }} />}
                </div>
              );
            })}
          </div>
        ) : (
          <input
            type="text" value={state} disabled={isRevealed}
            onChange={(e) => setState(e.target.value)}
            placeholder="Type the numeric answer..."
            className="pyc-font-mono"
            style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${isRevealed ? (isCorrect() ? "var(--teal-border)" : "var(--coral-border)") : "var(--border)"}`, background: "var(--bg-soft)", color: "var(--text)", fontSize: 13.5, outline: "none" }}
          />
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 14, alignItems: "center", flexWrap: "wrap" }}>
          {!isRevealed ? (
            <button onClick={() => setRevealed(prev => ({ ...prev, [qid]: true }))}
              className="pyc-btn pyc-font-mono"
              disabled={q.qtype === "NAT" ? state === "" : (q.qtype === "MSQ" ? state.length === 0 : state === null)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid var(--amber-border)", background: "var(--amber)", color: "#1A1305", fontWeight: 700, fontSize: 12.5, opacity: (q.qtype === "NAT" ? state === "" : (q.qtype === "MSQ" ? state.length === 0 : state === null)) ? 0.4 : 1 }}>
              <Play size={13} fill="#1A1305" /> Run &amp; Check
            </button>
          ) : (
            <span className="pyc-font-mono" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: isCorrect() ? "var(--teal)" : "var(--coral)" }}>
              {isCorrect() ? <><CheckCircle2 size={15} /> Correct</> : <><XCircle size={15} /> Not quite — see explanation</>}
            </span>
          )}
        </div>

        {isRevealed && (
          <div className="pyc-fade-in" style={{ marginTop: 12, padding: "11px 13px", borderRadius: 9, background: "var(--bg-soft)", border: "1px solid var(--border-soft)" }}>
            {q.qtype === "NAT" && (
              <div className="pyc-font-mono" style={{ fontSize: 12.5, color: "var(--teal)", marginBottom: 6, fontWeight: 700 }}>Answer: {q.correct}</div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <Target size={13} style={{ color: "var(--amber)", marginTop: 2, flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 12.8, color: "var(--text-dim)", lineHeight: 1.65 }}>{q.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* Topic Card */
const TopicCard = ({ topic, chapterColor, done, toggleDone, answers, setAnswers, revealed, setRevealed }) => {
  const [open, setOpen] = useState(topic.defaultOpen || false);
  return (
    <div id={topic.id} className="pyc-card" style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--surface)", overflow: "hidden", scrollMarginTop: 84 }}>
      <button onClick={() => setOpen(o => !o)} className="pyc-topic-btn" style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "15px 18px", background: open ? "var(--surface-2)" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span onClick={(e) => { e.stopPropagation(); toggleDone(topic.id); }}
          style={{ width: 22, height: 22, borderRadius: 999, border: `1.5px solid ${done ? "var(--teal)" : "var(--border)"}`, background: done ? "var(--teal-soft)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {done && <Check size={13} style={{ color: "var(--teal)" }} strokeWidth={3} />}
        </span>
        <span className="pyc-font-mono" style={{ fontSize: 11, color: chapterColor, opacity: 0.85, flexShrink: 0, fontWeight: 700 }}>{topic.tag}</span>
        <span className="pyc-font-display" style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", flex: 1 }}>{topic.title}</span>
        {open ? <ChevronDown size={17} style={{ color: "var(--text-dimmer)", flexShrink: 0 }} /> : <ChevronRight size={17} style={{ color: "var(--text-dimmer)", flexShrink: 0 }} />}
      </button>
      {open && (
        <div className="pyc-fade-in" style={{ padding: "4px 18px 20px 18px" }}>
          {topic.concept && <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--text-dim)", margin: "8px 0 4px 0" }}>{topic.concept}</p>}

          {topic.keyPoints && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "10px 0" }}>
              {topic.keyPoints.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <ChevronsRight size={13} style={{ color: chapterColor, marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
          )}

          {topic.examples && topic.examples.map((ex, i) => (
            <CodeCell key={i} idx={i + 1} code={ex.code} output={ex.output} outputTone={ex.tone} note={ex.note} />
          ))}

          {topic.mistakes && topic.mistakes.length > 0 && (
            <div style={{ margin: "12px 0", padding: "12px 14px", borderRadius: 10, background: "var(--coral-soft)", border: "1px solid var(--coral-border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                <AlertTriangle size={14} style={{ color: "var(--coral)" }} />
                <span className="pyc-font-display" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--coral)" }}>Common Mistakes / Gotchas</span>
              </div>
              {topic.mistakes.map((m, i) => (
                <div key={i} style={{ fontSize: 12.5, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: i < topic.mistakes.length - 1 ? 6 : 0 }}>• {m}</div>
              ))}
            </div>
          )}

          {topic.dryRun && <DryRun steps={topic.dryRun} />}

          {topic.question && (
            <QBlock q={topic.question} qid={topic.id + "-q"} answers={answers} setAnswers={setAnswers} revealed={revealed} setRevealed={setRevealed} />
          )}
        </div>
      )}
    </div>
  );
};

/* Quiz block: multiple questions, scored */
const QuizSection = ({ quiz, answers, setAnswers, revealed, setRevealed, onSubmit, savedScore }) => {
  const [submitted, setSubmitted] = useState(false);
  const allAnswered = quiz.questions.every(q => {
    const s = answers[quiz.id + "-" + q.id];
    if (q.qtype === "MSQ") return Array.isArray(s) && s.length > 0;
    if (q.qtype === "NAT") return s !== undefined && s !== "";
    return s !== undefined && s !== null;
  });

  const score = () => {
    let sc = 0;
    quiz.questions.forEach(q => {
      const qid = quiz.id + "-" + q.id;
      const s = answers[qid];
      const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
      if (q.qtype === "NAT") { if (String(s).trim() === String(q.correct).trim()) sc++; }
      else if (q.qtype === "MSQ") {
        const ss = Array.isArray(s) ? [...s].sort() : [];
        const c = [...correctArr].sort();
        if (ss.length === c.length && ss.every((v, i) => v === c[i])) sc++;
      } else { if (s === q.correct) sc++; }
    });
    return sc;
  };

  const handleSubmit = () => {
    const rv = {};
    quiz.questions.forEach(q => rv[quiz.id + "-" + q.id] = true);
    setRevealed(prev => ({ ...prev, ...rv }));
    setSubmitted(true);
    onSubmit(quiz.id, score(), quiz.questions.length);
  };

  return (
    <div id={quiz.id} style={{ border: "1px solid var(--amber-border)", borderRadius: 16, background: "linear-gradient(180deg, var(--surface) 0%, var(--surface) 100%)", overflow: "hidden", scrollMarginTop: 84 }}>
      <div style={{ padding: "16px 20px", background: "var(--amber-soft)", borderBottom: "1px solid var(--amber-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Trophy size={18} style={{ color: "var(--amber)" }} />
          <div>
            <div className="pyc-font-display" style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{quiz.title}</div>
            <div style={{ fontSize: 11.5, color: "var(--text-dim)" }}>{quiz.questions.length} questions · GATE DA level</div>
          </div>
        </div>
        {(submitted || savedScore) && (
          <Badge tone={((submitted ? score() : savedScore.score) / quiz.questions.length) >= 0.6 ? "teal" : "coral"} icon={Award}>
            Score: {submitted ? score() : savedScore.score} / {quiz.questions.length}
          </Badge>
        )}
      </div>
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {quiz.questions.map((q, i) => (
          <div key={q.id}>
            <div className="pyc-font-mono" style={{ fontSize: 11.5, color: "var(--text-dimmer)", marginBottom: 4 }}>Question {i + 1}</div>
            <QBlock q={q} qid={quiz.id + "-" + q.id} answers={answers} setAnswers={setAnswers} revealed={revealed} setRevealed={setRevealed} />
          </div>
        ))}
        {!submitted && (
          <button onClick={handleSubmit} disabled={!allAnswered} className="pyc-btn pyc-font-mono"
            style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 9, border: "1px solid var(--teal-border)", background: "var(--teal)", color: "#08201A", fontWeight: 700, fontSize: 13, opacity: allAnswered ? 1 : 0.4 }}>
            <Terminal size={14} /> Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------------------------- MAIN APP ---------------------------- */
const CH1_TOPICS = [
{
  id: "print-basics", tag: "1.1",
  title: `print() & Quoting`,
  defaultOpen: true,
  concept: `print() displays a value to the console — but whether something is even valid, and what type it becomes, depends entirely on whether it sits inside quotes. This one idea drives a huge share of 1-mark "predict the output" questions.`,
  keyPoints: [
    `A bare token like 40K (no quotes) is not a valid number or identifier — Python raises a SyntaxError before the program even starts running.`,
    `Wrapping it in quotes, "40K", makes it a valid string literal — it prints exactly as written.`,
    `"40" is a string, not an integer, even though it visually looks numeric.`,
    `Unary minus (-) is only defined for numeric types. Applying it to a string, -"40", raises a TypeError at runtime.`,
    `A minus sign written inside the quotes, "-40", is just a character in the string — perfectly valid, no arithmetic involved.`
  ],
  examples: [
    { code: `print(40K)`, output: `SyntaxError: invalid decimal literal`, tone: "error", note: `Python tries to read 40K as a number token — but 'K' can't follow digits in a numeric literal, so this fails before execution even starts.` },
    { code: `print("40K")`, output: `40K`, note: `Now it's a string literal — printed literally, character for character.` },
    { code: `print("40")        # looks numeric...`, output: `40      # ...but type("40") is str, not int`, tone: "teal" },
    { code: `print(-"40")`, output: `TypeError: bad operand type for unary -: 'str'`, tone: "error", note: `You cannot negate a string — unary minus only works on numeric types.` },
    { code: `print("-40")`, output: `-40`, note: `The '-' here is just a character sitting inside the string — no arithmetic happens.` },
  ],
  mistakes: [`SyntaxError vs TypeError: 40K fails at parse/compile time (before the program runs at all); -"40" is syntactically fine but fails at run time when the operation is actually attempted. GATE loves testing exactly this distinction.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `Which of the following, run independently, raises a TypeError (as opposed to a SyntaxError)?`,
    options: [`print(12A)`, `print(-"12")`, `print("12"A)`, `print(1 2)`],
    correct: 1,
    explanation: `print(-"12") parses just fine syntactically — the error only appears when the interpreter actually tries to apply unary minus to a str object at run time, which is a TypeError. The other three are malformed syntax and fail before execution even begins (SyntaxError).` }
},
{
  id: "variables-memory", tag: "1.2",
  title: `Variables & Memory`,
  concept: `A variable is a name bound to a value — but *how* that binding works differs sharply between C and Python, and GATE regularly probes this using id() and type().`,
  keyPoints: [
    `In C, "int x = 10;" carves out a fixed-size box named x and drops 10 directly inside it. "int *y; y = &x;" makes y store x's address.`,
    `In Python, "x = 10" creates an int object 10 somewhere in memory, and x is just a label pointing at it — nothing lives "inside" x itself.`,
    `id(x) returns the memory address (identity) of the object x currently refers to. type(x) returns its class.`,
    `Because integers are immutable, "x = x + 1" does NOT modify the object 10 in place — it builds a brand-new object 11 and re-points x to it. id(x) changes.`
  ],
  examples: [
    { code: `// in C (Box Model)\nint x = 10;\n// A memory box is created.\n// The value 10 is stored inside the box x.\nint *y = &x;\n// y stores the address of x.`, output: undefined },
    { code: `# Python (Reference Model)\nx = 10\n# Python creates an integer object 10 somewhere in memory.\n# x is just a label (reference) pointing to that object.\n# x ───► [10]`, output: undefined },
    { code: `x = 10\nprint(type(x))   # <class 'int'>\nprint(id(x))     # Address (identity) of object 10`, note: `type(x) → What kind of object? (int)\nid(x) → Which object? (its memory identity)` },
    { code: `# What happens in x = x + 1?\nx = 10\nx = x + 1`, output: `Before:\n\nx ───► [10]\n\nAfter:\n\n      [10]   (unchanged)\n\nx ───► [11]`, note: `Python does NOT change 10 into 11. Instead: Old object 10 stays unchanged. New object 11 is created. x now points to 11. So: type(x) → still int, id(x) → changes because x points to a new object.` },
    { code: `x = 10\nprint(type(x))\nprint(id(x))\nx = x + 1\nprint(type(x))\nprint(id(x))`, output: `<class 'int'>\n1000\n<class 'int'>\n2000`, note: `Proof: type stays 'int' both times, but id changes after x = x + 1 — x now points to a completely new object; the old 10 is untouched.` },
  ],
  mistakes: [`"x = x + 1" looks like C's in-place increment, but Python silently rebinds the name to a new object each time — the original object is never mutated. This becomes critical in the very next topic (integer caching), where two independent variables can end up sharing an id purely by coincidence.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `y = 25\nz = y\nz = z + 5\nWhich statement is true immediately after this runs?`,
    options: [`id(y) == id(z)`, `y is still 25, at the same address it had before z was modified`, `y == 30`, `type(y) != type(z)`],
    correct: 1,
    explanation: `"z = y" makes z point to the same object as y. But "z = z + 5" builds a brand-new int object (30) and rebinds only z to it — y is left completely untouched, still 25, at its original address.` }
},
{
  id: "int-caching", tag: "1.3",
  title: `Integer Caching`,
  concept: `For performance, CPython pre-allocates and reuses integer objects in the range -5 to 256. Any integer in this range that appears anywhere in your program shares the exact same object; integers outside it get a fresh object every time.`,
  keyPoints: [
    `Default cached range: -5 to 256 (inclusive).`,
    `Any two variables holding the same value inside this range will have identical id()s — they literally are the same object.`,
    `Outside this range, two variables holding the same value are, in general, two distinct objects with different ids — even though == still reports them equal.`,
    `This is purely a CPython implementation detail, not a language guarantee. Never rely on it in real code — always compare values with ==; only use "is" when you specifically need identity (e.g. checking against None).`
  ],
  examples: [
    { code: `# Integer Caching (CPython)\n# To make Python faster, small integers are reused.\n# Cached Range: -5 to 256\n# Python creates only one object for each integer in this range.`, output: undefined },
    { code: `# Inside the Cache (-5 to 256)\na = 100\nb = 100`, output: `Both variables point to the same object.\n\na ─┐\n   └──► [100]\nb ─┘\n\nSo,\na is b           # True\nid(a) == id(b)   # True`, note: `100 is cached — a and b point to the SAME object` },
    { code: `# Outside the Cache\nx = 300\ny = 300`, output: `Python usually creates two different objects.\n\nx ───► [300]\n\ny ───► [300]\n\nSo,\nx == y   # True   (same value)\nx is y   # False  (different objects)`, tone: "error" },
    { code: `# == vs is\n# == → Checks values\n# is → Checks whether both names point to the same object`, note: `GATE Tip: Use == for comparing values. Use is only to check object identity (e.g., x is None).` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `p = 256\nq = 256\nr = 257\ns = 257\nprint(p is q, r is s)`,
    options: [`True True`, `True False`, `False True`, `False False`],
    correct: 1,
    explanation: `256 lies inside CPython's cached range [-5, 256], so p and q are bound to the same cached object → p is q gives True. 257 lies just outside the cache, so r and s are built as two separate objects → r is s gives False. This is precisely why GATE never expects "is" to be used for value comparison.` }
},
{
  id: "tokens-datatypes", tag: "1.4",
  title: `Tokens & Data Types`,
  concept: `What are Tokens?\nTokens = Smallest meaningful pieces of Python code.`,
  keyPoints: [],
  examples: [
    { code: `x = 10`, output: `This line is broken into 3 tokens:\n\nx → Identifier\n= → Operator\n10 → Literal` },
    { code: `# Types of Tokens\n\n# 1. Keywords\n# Reserved words with a fixed meaning.\n# Examples:\n\nif, else, while, for, def, pass`, note: `❌ Cannot be used as variable names.` },
    { code: `# 2. Identifiers\n# Names given by the programmer.\n\nx\nmarks\ntotal_1\nmyName` },
    { code: `# 3. Literals\n# Values written directly in the code.\n\n10\n3.14\n"Hello"\nTrue` },
    { code: `# 4. Operators\n# Perform operations.\n\n+\n-\n*\n/\n==\n=` },
    { code: `# 5. Punctuators\n# Symbols that define program structure.\n\n( )\n{ }\n:\n,\n[ ]` },
    { code: `# Data Types\n# A data type tells Python what kind of value it is storing.\n\nx = 10        # int\ny = 3.5       # float\nname = "Manas" # str\nflag = True   # bool` },
    { code: `# Dynamic Typing\n# Python automatically decides the data type.\n\nx = 10      # int\nx = "Hi"    # now str`, note: `No type declaration is needed. Python is a dynamically typed language.` },
    { code: `# Common Built-in Data Types\n# (These are the ones most commonly used in GATE.)\n\nint\nfloat\nbool\nstr\nlist\ntuple\nset\ndict` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MSQ",
    stem: `In the line   total_1 = (marks1 + marks2) * 2   which of the following classifications are correct? (Select all that apply)`,
    options: [`total_1 is an Identifier`, `( and ) are Punctuators`, `+ and * are Operators`, `2 is a Keyword`],
    correct: [0, 1, 2],
    explanation: `total_1 is a programmer-chosen name → Identifier. Parentheses group structure → Punctuators. + and * perform operations → Operators. 2 is a fixed value → a Literal, not a Keyword — keywords are reserved words like if/while/def, never numbers.` }
},
{
  id: "print-sep", tag: "1.5",
  title: `print() sep`,
  concept: `When print() receives multiple comma-separated arguments, sep controls what gets inserted BETWEEN each one. The default is a single space. sep must be None or a string — nothing else.`,
  keyPoints: [
    `Default behaviour: print(10, 20, "hi") joins arguments with a single space.`,
    `sep can be any string — ", ", "_", "\\t", "\\n" all work exactly as you'd expect.`,
    `sep is applied only BETWEEN arguments — with a single argument, print(10, sep=", ") still just prints 10, because there's nothing to separate.`,
    `sep must be None or a string. Passing a number, e.g. sep=10, raises a TypeError.`,
    `Only ONE sep is allowed per print() call, and it must come after all positional values — you cannot repeat the keyword, and you cannot place a plain value after it.`
  ],
  examples: [
    { code: `print(10, 20, 30.5, "hi")`, output: `10 20 30.5 hi`, note: `Default separator is a single space.` },
    { code: `print(10, 20, 30.5, "hi", sep=", ")`, output: `10, 20, 30.5, hi` },
    { code: `print(10, 20, 30.5, "hi", sep="_")`, output: `10_20_30.5_hi` },
    { code: `print(10, 20, 3.5, "hi", sep="\\t")`, output: `10\t20\t3.5\thi` },
    { code: `print(10, 20, 3.5, "hi", sep="\\n")`, output: `10\n20\n3.5\nhi`, note: `Each value now lands on its own line.` },
    { code: `print(10, sep=", ")`, output: `10`, note: `Only one argument — nothing to separate, so sep has no visible effect.` },
    { code: `print(10, 20, 3.5, "hi", sep=10)`, output: `TypeError: sep must be None or a string, not int`, tone: "error" },
  ],
  mistakes: [
    `print(10, 20, sep=", ", sep="\\n")  →  SyntaxError: keyword argument repeated: sep. You are only allowed to pass sep= once per call.`,
    `print(10, 20, sep=", ", 50)  →  SyntaxError: positional argument follows keyword argument. Once you use sep=, every remaining plain (positional) value must come BEFORE it, never after.`
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print(1, 2, 3, sep="")`,
    options: [`1 2 3`, `123`, `1,2,3`, `TypeError`],
    correct: 1,
    explanation: `sep="" is a perfectly valid empty string — it just glues the arguments together with nothing between them, giving 123.` }
},
{
  id: "print-end", tag: "1.6",
  title: `print() end`,
  concept: `end controls what gets appended AFTER the current print() call finishes — by default this is a newline "\\n", which is why consecutive print() calls normally land on separate lines. Changing end lets you chain several print() calls onto one line.`,
  keyPoints: [
    `Default end is "\\n" — that's the entire reason each print() call normally starts a fresh line.`,
    `Setting end="" or end=", " (or anything else) suppresses that automatic newline and glues the NEXT print() output right onto the same line.`,
    `end and sep can be combined freely in the same call — sep affects the gaps between this call's own arguments, end affects what happens after this call finishes.`
  ],
  examples: [
    { code: `print("Apple", end=", ")\nprint("Virat")\nprint(2023, end="#")`, output: `Apple, Virat\n2023#`, note: `The first print() doesn't end with \\n, so "Virat" continues right on the same line as "Apple,".` },
    { code: `print(2, end=", ")\nprint(3, end=", ")\nprint(4, end="; ")`, output: `2, 3, 4; `, note: `None of these three calls emit a newline, so all three outputs land on a single line.` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print("A", end="")\nprint("B", end="")\nprint("C")`,
    options: [`A\\nB\\nC`, `ABC`, `A B C`, `A, B, C`],
    correct: 1,
    explanation: `The first two calls suppress the newline entirely (end=""), so their output glues directly onto the next call. The third call uses the default end="\\n". Result: ABC on one line.` }
},
{
  id: "list-type", tag: "1.7",
  title: `Lists`,
  concept: `Use a list when you need a single entity representing a group of values where insertion order must be preserved and duplicates are allowed.`,
  keyPoints: [
    `Insertion order is preserved.`,
    `Heterogeneous objects are allowed — mix int, str, float freely.`,
    `Duplicates are allowed.`,
    `Growable (dynamic size) in nature.`,
    `Values are enclosed within square brackets [ ].`,
    `Lists are mutable — elements can be changed after creation.`
  ],
  examples: [
    { code: `a = [10, 20, 40, "Hello", 30.5]\nprint(type(a))\nprint(a)\na[0] = 99\nprint(a)`, output: `<class 'list'>\n[10, 20, 40, 'Hello', 30.5]\n[99, 20, 40, 'Hello', 30.5]` },
  ],
  mistakes: [`append() vs extend(): append(x) adds x as a single new element (even if x is itself a list, causing nesting); extend(x) adds each element of x individually. This exact distinction is tested directly in the PYQ below.`],
  question: { isPYQ: true, source: "GATE AI 2025 (1 mark)", marks: 1, qtype: "MCQ",
    stem: `Consider the following Python declarations of two lists.\nA = [1, 2, 3]\nB = [4, 5, 6]\nWhich ONE of the following statements results in A = [1, 2, 3, 4, 5, 6]?`,
    options: [`A.extend(B)`, `A.append(B)`, `A.update(B)`, `A.insert(B)`],
    correct: 0,
    explanation: `A.extend(B) unpacks B and appends each of its elements individually, giving [1,2,3,4,5,6]. A.append(B) would instead add B as ONE single nested element: [1,2,3,[4,5,6]]. update() is a set/dict method, not a list method. insert() requires an index as its first argument and would raise a TypeError here.` }
},
{
  id: "tuple-type", tag: "1.8",
  title: `Tuples`,
  concept: `A tuple is identical to a list in behaviour except for one crucial difference: it is immutable — once created, its values can never be changed.`,
  keyPoints: [
    `Same properties as a list (ordered, heterogeneous, duplicates allowed) — except mutability.`,
    `Elements are written within parentheses ( ).`,
    `Attempting item assignment, e.g. a[0] = 5, raises TypeError: 'tuple' object does not support item assignment.`
  ],
  examples: [
    { code: `a = (10, 20, 30, 40, 50, 60)\nb = [10, 20, 30, 40, 50, 60]\nprint(type(a))\nprint(type(b))\na[0] = 5`, output: `<class 'tuple'>\n<class 'list'>\nTypeError: 'tuple' object does not support item assignment`, tone: "error" },
    { code: `x = (5)\nprint(type(x))\ny = (5,)\nprint(type(y))`, output: `<class 'int'>   # parentheses alone are just grouping!\n<class 'tuple'> # the trailing comma is what makes it a tuple`, tone: "teal" },
  ],
  mistakes: [`The single-element tuple trap is one of GATE's favourite one-liners: (5) is just the integer 5 wrapped in grouping parentheses. You need a trailing comma — (5,) — to actually create a 1-element tuple.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print(type((10)), type((10,)), type(()))`,
    options: [`<class 'int'> <class 'tuple'> <class 'tuple'>`, `<class 'tuple'> <class 'tuple'> <class 'tuple'>`, `<class 'int'> <class 'int'> <class 'tuple'>`, `<class 'tuple'> <class 'int'> <class 'tuple'>`],
    correct: 0,
    explanation: `(10) is just 10 in grouping parens → int. (10,) has the trailing comma → a genuine 1-element tuple. () with nothing inside is always an empty tuple, regardless of any comma.` }
},
{
  id: "set-type", tag: "1.9",
  title: `Sets`,
  concept: `Use a set when you need a group of unique values and insertion order doesn't matter.`,
  keyPoints: [
    `No duplicates — inserting an existing value is silently ignored.`,
    `Unordered — don't rely on any particular display order.`,
    `Elements are written within curly braces { }.`,
    `Sets are mutable — add()/remove() are allowed (unlike frozenset).`
  ],
  examples: [
    { code: `a = {1, 2, 3, 4, 5, 6}\nprint(type(a))\nb = {1, 2, 2, 3, 3, 3}\nprint(b)`, output: `<class 'set'>\n{1, 2, 3}    # duplicates silently collapse`, tone: "teal" },
    { code: `x = {}\nprint(type(x))\ny = set()\nprint(type(y))`, output: `<class 'dict'>   # {} is an EMPTY DICT, not an empty set!\n<class 'set'>`, tone: "error" },
  ],
  mistakes: [`{} does NOT create an empty set — it creates an empty dict. The only way to create an empty set is set(). This exact gap is a very common GATE distractor.`],
  question: { isPYQ: true, source: "GATE AI 2025 (2 marks)", marks: 2, qtype: "MCQ",
    stem: `A = {"this", "that"}\nB = {"that", "other"}\nC = {"other", "this"}\nwhile "other" in C:\n    if "this" in A:\n        A, B, C = A - B, B - C, C - A\n    if "that" in B:\n        A, B, C = C | A, A | B, B | C\n\n# When the loop finally terminates, which of A, B, C contains "this"?`,
    options: [`A`, `B`, `C`, `Both A and C`],
    correct: 1,
    explanation: `Trace it fully in the Dry Run below — after two passes through the while body the loop condition "other" in C finally goes False, leaving A={'other'}, B={'this'}, C={'that'}. "this" ends up sitting in B.`,
  },
  dryRun: [
    `Start: A={'this','that'}, B={'that','other'}, C={'other','this'}`,
    `Check while: 'other' in C? Yes → enter loop (pass 1).`,
    `'this' in A? Yes → A,B,C = A-B, B-C, C-A = {'this'}, {'that'}, {'other'}`,
    `'that' in B? Yes → A,B,C = C|A, A|B, B|C = {'other','this'}, {'this','that'}, {'that','other'}`,
    `Check while again: 'other' in C? C={'that','other'} → Yes → loop runs again (pass 2).`,
    `'this' in A? A={'other','this'} → Yes → A,B,C = A-B, B-C, C-A = {'other'}, {'this'}, {'that'}`,
    `'that' in B? B={'this'} → No → skip second if this pass.`,
    `Check while again: 'other' in C? C={'that'} → No → loop ends.`,
    `Final state: A={'other'}, B={'this'}, C={'that'}  →  "this" is in B.`
  ]
},
{
  id: "dict-type", tag: "1.10",
  title: `Dictionaries`,
  concept: `A dictionary stores key–value pairs where both the key and value are chosen by the programmer. Keys act as the lookup handle for their value.`,
  keyPoints: [
    `Keys are unique; values can repeat freely.`,
    `Operations (lookup, delete, update) are performed using keys.`,
    `Dictionaries are mutable.`,
    `Insertion order of keys is maintained (guaranteed since Python 3.7+).`,
    `Keys must be immutable/hashable (int, str, tuple...); values can be of any type whatsoever.`
  ],
  examples: [
    { code: `d = {101: "Virat", 105: "Rohit", 204: "Rahul"}\nprint(type(d), d)`, output: `<class 'dict'> {101: 'Virat', 105: 'Rohit', 204: 'Rahul'}` },
    { code: `d2 = {10: "apple", 11: 9.8, 20: 22, 50: True, 100: [], 200: ()}\nprint(d2[50], d2[100])`, output: `True []`, note: `Values can be absolutely anything — even a list or an empty tuple.` },
  ],
  mistakes: [`Using a list as a key raises TypeError: unhashable type: 'list', because lists are mutable. A tuple CAN be a key (it's immutable) — unless that tuple itself contains a mutable object like a list.`],
  question: { isPYQ: true, source: "GATE DA 2024 (2 marks)", marks: 2, qtype: "NAT",
    stem: `def count(child_dict, i):\n    if i not in child_dict.keys():\n        return 1\n    ans = 1\n    for j in child_dict[i]:\n        ans += count(child_dict, j)\n    return ans\n\nchild_dict = dict()\nchild_dict[0] = [1, 2]\nchild_dict[1] = [3, 4, 5]\nchild_dict[2] = [6, 7, 8]\nprint(count(child_dict, 0))\n\n# The value printed is ______`,
    correct: "9",
    explanation: `child_dict describes a tree: key i's "children" are child_dict[i]; any node with no dict entry is a leaf and contributes exactly 1. Node 0 → children 1, 2. Node 1 → leaf-children 3,4,5 (count=4). Node 2 → leaf-children 6,7,8 (count=4). count(0) = 1 + count(1) + count(2) = 1 + 4 + 4 = 9 — it's simply counting every node in the tree rooted at 0.`
  },
  dryRun: [
    `count(cd, 0): 0 is a key → ans starts at 1.`,
    `  for j in [1, 2]:`,
    `  count(cd, 1): 1 is a key → ans=1, loop over [3,4,5]:`,
    `    count(cd,3) → 3 not a key → returns 1`,
    `    count(cd,4) → 4 not a key → returns 1`,
    `    count(cd,5) → 5 not a key → returns 1`,
    `    ans = 1+1+1+1 = 4  →  count(cd,1) returns 4`,
    `  count(cd, 2): 2 is a key → ans=1, loop over [6,7,8]:`,
    `    count(cd,6), count(cd,7), count(cd,8) each not a key → each returns 1`,
    `    ans = 1+1+1+1 = 4  →  count(cd,2) returns 4`,
    `  Back in count(cd,0): ans = 1 + 4 + 4 = 9`,
    `print(count(child_dict, 0))  →  9`
  ]
},
{
  id: "frozenset-bytes", tag: "1.11",
  title: `frozenset & bytes`,
  concept: `Both types exist to take a familiar mutable structure and freeze it: frozenset is set's immutable twin; bytes is a fixed-range, immutable, array-like sequence of raw byte values.`,
  keyPoints: [
    `frozenset(S) — identical to a set except it is immutable, so add()/remove() are unavailable.`,
    `bytes represents a group of byte numbers, similar to an array — but every value must be an integer from 0 to 255.`,
    `Once created, a bytes object's contents can never change — attempting to do so raises a TypeError.`,
    `List vs bytes: List is heterogeneous + mutable; bytes is homogeneous (ints 0-255 only) + immutable.`
  ],
  examples: [
    { code: `S = {10, 20, 30, 40, 50}\nfs = frozenset(S)\nprint(type(fs))\nfs.add(60)`, output: `<class 'frozenset'>\nAttributeError: 'frozenset' object has no attribute 'add'`, tone: "error" },
    { code: `x = [10, 20, 30, 40]\nb = bytes(x)\nprint(type(b))\nprint(list(b))`, output: `<class 'bytes'>\n[10, 20, 30, 40]` },
    { code: `bytes([10, 300])`, output: `ValueError: bytes must be in range(0, 256)`, tone: "error", note: `Every value handed to bytes() must fit in a single byte: 0-255.` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MSQ",
    stem: `Select all TRUE statements about frozenset and bytes in Python.`,
    options: [`Both are immutable.`, `bytes can store the value 300 directly.`, `frozenset supports the same membership test (in) as set.`, `A frozenset can be built from an existing set using frozenset(S).`],
    correct: [0, 2, 3],
    explanation: `Both types are indeed immutable. bytes is restricted to 0-255 per element, so 300 is invalid (ValueError). Membership testing with "in" works on frozenset exactly like on set. And frozenset(S) is precisely the standard way to freeze an existing set.` }
},
{
  id: "arithmetic-ops", tag: "1.12",
  title: `Arithmetic Operators`,
  concept: `Python has seven arithmetic operators. Two deserve special attention: / always performs true (floating-point) division regardless of operand types, while // performs floor division — it rounds DOWN toward negative infinity, not toward zero.`,
  keyPoints: [
    `+ Addition, - Subtraction, * Multiplication.`,
    `/  → true division: ALWAYS returns a float, even 4/2 gives 2.0, not 2.`,
    `// → floor division: if both operands are int, result is int; if at least one operand is float, result is float — but the VALUE is always floored (mathematical floor, i.e. rounded toward -∞).`,
    `%  → modulo (remainder).`,
    `** → exponentiation, and it is RIGHT-to-LEFT associative — the only common operator here that isn't left-to-right.`
  ],
  examples: [
    { code: `print(5/2, 4/2, 1/2, 1.0/2)`, output: `2.5 2.0 0.5 0.5`, note: `/ always returns float — notice 4/2 gives 2.0, not 2.` },
    { code: `print(5//2, 4//2, 1//2, 5.0//2)`, output: `2 2 0 2.0`, note: `// keeps int if both operands are int; becomes float the moment either operand is float.` },
    { code: `print(2 ** 3 ** 2)   # NOT (2**3)**2`, output: `512`, note: `** is right-associative: this is 2 ** (3**2) = 2**9 = 512, not (2**3)**2 = 64.` },
  ],
  mistakes: [`// is FLOOR division (rounds toward -∞), never truncation toward zero. This only matters for negative operands: -7 // 2 gives -4 (not -3), because floor(-3.5) = -4.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print(-7 // 2, 7 // -2, -7 // -2)`,
    options: [`-4 -4 3`, `-3 -3 3`, `-4 -3 3`, `-3 -4 4`],
    correct: 0,
    explanation: `// always floors toward -∞, never truncates toward zero. -7/2 = -3.5 → floor = -4. 7/-2 = -3.5 → floor = -4. -7/-2 = 3.5 → floor = 3. Result: -4 -4 3.` }
},
{
  id: "string-plus-star", tag: "1.13",
  title: `String Concatenation`,
  concept: `+ and * are overloaded for strings, but with strict type rules: + requires BOTH operands to be strings; * requires exactly one int and one string (repetition).`,
  keyPoints: [
    `+ on strings → concatenation. Both sides must be str — mixing in an int raises TypeError.`,
    `* on a string with an int → repetition. The int can be on either side.`,
    `- and / are NOT defined for strings at all — always TypeError.`
  ],
  examples: [
    { code: `a = "Hello "\nb = "World"\nprint(a + b)\nprint(a * 2)\nprint(2 * a)`, output: `Hello World\nHello Hello \nHello Hello ` },
    { code: `print(a + 2)`, output: `TypeError: can only concatenate str (not "int") to str`, tone: "error" },
    { code: `print(a / 2)`, output: `TypeError: unsupported operand type(s) for /: 'str' and 'int'`, tone: "error" },
    { code: `print("GATE " + "DA 2026")`, output: `GATE DA 2026` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print("ab" * "2")`,
    options: [`abab`, `2ab`, `TypeError`, `ab2`],
    correct: 2,
    explanation: `* needs one int and one str. Here BOTH operands are strings ("ab" and "2"), so Python raises TypeError: can't multiply sequence by non-int of type 'str'. "2" is never automatically converted to an int.` }
},
{
  id: "modulus-deepdive", tag: "1.14",
  title: `Modulus Operator`,
  concept: `Python's % works differently from C's. The formula is a % b = a - (b * (a // b)) — and because // always floors, the RESULT of % always carries the SAME SIGN AS THE DIVISOR (b), never the sign of the dividend (a). This is the single most common modulus trap on GATE.`,
  keyPoints: [
    `Formula: a % b = a - (b * (a // b))`,
    `Sign rule: the result always matches the sign of b (the denominator) — or is 0.`,
    `C, by contrast, truncates toward zero, so C's % follows the sign of the DIVIDEND (a) instead. Never assume C intuition carries over.`
  ],
  examples: [
    { code: `print(10 % 3, -10 % 3, 10 % -3, -10 % -3)`, output: `1 2 -2 -1`, note: `Signs follow the divisor: 3 → positive results, -3 → negative results.` },
    { code: `print(3 % 10, 3 % -10, -3 % 10, -3 % -10)`, output: `3 -7 7 -3` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print(-17 % 5, 17 % -5)`,
    options: [`3 -3`, `-2 2`, `3 2`, `-2 -3`],
    correct: 0,
    explanation: `-17 // 5 = floor(-3.4) = -4, so -17 % 5 = -17 - 5*(-4) = -17+20 = 3. 17 // -5 = floor(-3.4) = -4, so 17 % -5 = 17 - (-5*-4) = 17-20 = -3. Both results take the sign of the divisor (5 → positive, -5 → negative).` }
},
{
  id: "precedence-assoc", tag: "1.15",
  title: `Precedence Rules`,
  concept: `When several operators appear in one expression, precedence decides which runs first, and associativity breaks ties between operators of EQUAL precedence. GATE builds entire questions purely around this ladder.`,
  keyPoints: [
    `() highest → then ** (right-to-left, the one common exception!) → then unary +/- (right-to-left) → then *, /, //, % (left-to-right, all equal precedence) → then binary +, - (left-to-right, lowest of this group).`,
    `Classic trap: -2 ** 2 evaluates as -(2**2) = -4, NOT (-2)**2 = 4 — because ** binds tighter than unary minus.`,
    `Within one precedence tier (e.g. all of *, /, //, %), evaluate strictly left to right — don't assume * happens before % just because it "feels" higher priority; they're equal.`
  ],
  examples: [
    { code: `print(2 ** 6 // 8 % 2)`, output: `0`, note: `64 // 8 = 8, then 8 % 2 = 0 (** first, then left-to-right through //,%).` },
    { code: `print(2*3/4 + 2/5 + 8//5)`, output: `2.9`, note: `1.5 + 0.4 + 1 = 2.9` },
    { code: `print(-2 ** 2)`, output: `-4`, note: `Unary minus is WEAKER than **, so this is -(2**2), not (-2)**2.` },
    { code: `print(5 % 10 + 10 - 23 * 4 // 3)`, output: `-15`, note: `5%10=5, 23*4//3 = 92//3 = 30 → 5 + 10 - 30 = -15.` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 2, qtype: "NAT",
    stem: `Evaluate: 5 + 5 // 5 - 5 * 5 ** 5 % 5\n\n# Result = ______`,
    correct: "6",
    explanation: `** first: 5**5 = 3125. Then scan the */,//,% tier strictly left to right: 5//5=1, then 5*3125=15625, then 15625%5=0. Expression becomes 5 + 1 - 0 = 6.` }
},
{
  id: "relational-chaining", tag: "1.16",
  title: `Relational Chaining`,
  concept: `Python allows chained comparisons like a < b < c — and it does NOT evaluate this left-to-right the way arithmetic would. Instead it silently ANDs every adjacent pair.`,
  keyPoints: [
    `Operators: >, >=, <, <=, ==, != — all support chaining.`,
    `a < b < c < d is exactly equivalent to (a<b) and (b<c) and (c<d).`,
    `If ALL pairwise comparisons are True, the whole chain is True. The moment ANY pair is False, the whole chain is False.`,
    `This chaining rule applies to equality too: 10==10==10==10 is True only because every adjacent pair is equal.`
  ],
  examples: [
    { code: `print(10 < 20, 10 > 20)`, output: `True False` },
    { code: `print(10 < 20 < 30 < 40)`, output: `True`, note: `Every adjacent pair holds: 10<20 and 20<30 and 30<40.` },
    { code: `print(10 < 20 < 30 < 40 > 50)`, output: `False`, note: `The last pair, 40 > 50, is False — that alone breaks the whole chain.` },
    { code: `print(10 == 20 == 30 == 40)`, output: `False`, note: `Even one broken pair (10==20 is False) fails the entire chain.` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print(10 < 20 > 5)`,
    options: [`True`, `False`, `TypeError`, `5`],
    correct: 0,
    explanation: `Chained comparisons are ANDed pairwise: 10<20>5 means (10<20) and (20>5) = True and True = True. It is NOT computing (10<20) first as a standalone boolean and then comparing THAT to 5.` }
},
{
  id: "logical-shortcircuit", tag: "1.17",
  title: `Logical Operators`,
  concept: `Unlike C/Java, Python's and / or do NOT necessarily return True/False when used on non-boolean operands — they return one of the actual operand VALUES. Only "not" always yields a genuine boolean.`,
  keyPoints: [
    `Falsy values: 0, 0.0, "" (empty string), None, and empty containers ([], (), {}, set()). Everything else is truthy.`,
    `x and y → if x is falsy, the result IS x (y is never even evaluated); otherwise the result is y.`,
    `x or y  → if x is truthy, the result IS x (y is never even evaluated); otherwise the result is y.`,
    `not x always returns a real True or False, regardless of x's type.`,
    `Short-circuit rule for compound expressions: bracket strictly by precedence (not binds tighter than and, which binds tighter than or), then evaluate left to right, stopping the instant the final result is determined.`
  ],
  examples: [
    { code: `print(10 and 20)   # 10 is truthy -> result is the 2nd operand\nprint(0 and 20)    # 0 is falsy   -> result is the 1st operand, 20 never evaluated\nprint(30 and 0)`, output: `20\n0\n0` },
    { code: `print(10 or 20)    # 10 is truthy -> result is the 1st operand\nprint(0 or 20)     # 0 is falsy   -> fall through to 2nd operand`, output: `10\n20` },
    { code: `print(not 10, not 0)`, output: `False True` },
    { code: `print("gfg" and "gfg noida")\nprint("" and "gfg")\nprint("" or "gfg")`, output: `gfg noida\n\ngfg`, note: `"" and "gfg" returns the empty string itself (falsy first operand) — it prints as a blank line.` },
    { code: `print(1 or (0 and 0))    # short-circuits immediately\nprint((0 and 0) or 1)`, output: `1\n1`, note: `In the first line, 1 is truthy so or short-circuits — (0 and 0) is never even evaluated.` },
  ],
  mistakes: [`and/or do NOT collapse to True/False for non-boolean operands — they return one of the actual operand values. This trips up almost everyone arriving from C/Java, where && and || always yield a boolean.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print(0 or "" or "GATE" or "DA")`,
    options: [`GATE`, `DA`, `0`, `(empty string)`],
    correct: 0,
    explanation: `or scans left to right and returns the FIRST truthy operand, then stops (short-circuit). 0 is falsy, "" is falsy, "GATE" is truthy — evaluation stops right there; "DA" is never even inspected.` }
},
{
  id: "bitwise-deepdive", tag: "1.18",
  title: `Bitwise Operators`,
  concept: `Bitwise operators work directly on the binary (two's-complement) representation of integers, one bit at a time — completely different machinery from the logical and/or you just saw. GATE loves this topic because a single question can quietly test binary conversion, operator semantics, AND precedence all at once.`,
  keyPoints: [
    `Applicable ONLY to int and bool. Using &, |, ^, ~, <<, >> on a float or str raises a TypeError.`,
    `& (AND) → 1 only where BOTH bits are 1.   | (OR) → 1 where AT LEAST ONE bit is 1.   ^ (XOR) → 1 where the bits DIFFER.`,
    `~ (complement) flips every bit. Because of two's-complement encoding, this has the clean identity ~x = -(x + 1).`,
    `<< (left shift by k) → x << k = x * 2^k.     >> (right shift by k) → x >> k = x // 2^k.`,
    `Extended precedence ladder (high → low): () → ** → unary +,-,~ → *,/,//,% → binary +,- → << >> → & → ^ → | → comparisons → not → and → or. Notice shifts and bitwise ops sit BELOW arithmetic but ABOVE comparisons.`,
    `Handy GATE tricks: x & 1 tests odd/even (1=odd, 0=even) · x << k / x >> k multiply/divide by 2^k fast · a,b = a^b, a^b^... swaps two ints via XOR without a temp variable · x & (x-1) == 0 tests "is x a power of 2" (for x > 0).`
  ],
  examples: [
    { code: `# 4 = 0100   5 = 0101\nprint(4 & 5)   # AND: 1 only where BOTH are 1\nprint(4 | 5)   # OR:  1 where AT LEAST ONE is 1\nprint(4 ^ 5)   # XOR: 1 where they DIFFER`, output: `4    # 0100 & 0101 = 0100\n5    # 0100 | 0101 = 0101\n1    # 0100 ^ 0101 = 0001` },
    { code: `print(5.3 & 2.4)`, output: `TypeError: unsupported operand type(s) for &: 'float' and 'float'`, tone: "error", note: `Bitwise operators categorically refuse float (and str) operands.` },
    { code: `x = 10   # 00001010\nk = 2\nprint(x << k)   # 10 * 2**2`, output: `40`, note: `00001010 shifted left 2 places = 00101000 = 40.` },
    { code: `print(10 >> 2)   # 10 // 2**2\nprint(40 << 3)   # 40 * 2**3\nprint(40 >> 3)   # 40 // 2**3`, output: `2\n320\n5` },
    { code: `x = 5\nprint(~x)         # -(5+1)\ny = -3\nprint(~y)         # -(-3+1)`, output: `-6\n2`, note: `~x = -(x+1) always. Two's complement stores -n as (~n + 1), so flipping bits alone lands one short of -x, i.e. at -(x+1).` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `x = 13, y = 11. What is x ^ y ?`,
    options: [`6`, `9`, `24`, `2`],
    correct: 0,
    explanation: `13 = 1101, 11 = 1011. XOR sets a bit wherever the two differ: 1⊕1=0, 1⊕0=1, 0⊕1=1, 1⊕1=0 → 0110 = 6.` }
},
{
  id: "ascii-chr-ord", tag: "1.19",
  title: `ASCII & Encoding`,
  concept: `ord(char) converts a single character to its ASCII/Unicode code point (an int); chr(code) does the reverse. Combining these with bitwise operators — manipulating characters at the bit level — is a favourite "harder than usual" GATE pattern. This is the toughest single example across all three lecture sets, so it gets a full dry run.`,
  keyPoints: [
    `Memorize these ranges: 'A'-'Z' → 65-90, 'a'-'z' → 97-122, '0'-'9' → 48-57.`,
    `Because letters/digits are contiguous ranges, arithmetic on ord() values (like ord(c)+1 for the "next letter") behaves predictably within a range.`,
    `Always apply chr() as the LAST step to convert a computed integer back into a printable character — forgetting it is the most common slip.`
  ],
  examples: [
    { code: `# Given: a = 'P'  (ord 80),  b = 'x'  (ord 120)\n# 80  = 1010000\n# 120 = 1111000\na = 'P'\nb = 'x'\nc = chr((ord(a) & ord(b)) + ord('*'))\nd = chr((ord(a) | ord(b)) - ord('-'))\ne = chr((ord(a) ^ ord(b)) + ord('+'))\nprint(f"{c} {d} {e}")`, output: `z K S` },
  ],
  dryRun: [
    `ord('P') = 80 = 1010000,   ord('x') = 120 = 1111000`,
    `80 & 120: 1010000 & 1111000 = 1010000 = 80.  c = chr(80 + ord('*')) = chr(80+42) = chr(122) = 'z'`,
    `80 | 120: 1010000 | 1111000 = 1111000 = 120.  d = chr(120 - ord('-')) = chr(120-45) = chr(75) = 'K'`,
    `80 ^ 120: 1010000 ^ 1111000 = 0101000 = 40.   e = chr(40 + ord('+')) = chr(40+43) = chr(83) = 'S'`,
    `f"{c} {d} {e}"  →  "z K S"`
  ],
  question: { isPYQ: false, source: "GATE-Style (harder than usual)", marks: 2, qtype: "MCQ",
    stem: `a = 'P'   # ord 80\nb = 'x'   # ord 120\nc = chr((ord(a) & ord(b)) + ord('*'))\nd = chr((ord(a) | ord(b)) - ord('-'))\ne = chr((ord(a) ^ ord(b)) + ord('+'))\nprint(f"{c} {d} {e}")`,
    options: [`z K S`, `122 75 83`, `* - +`, `P x +`],
    correct: 0,
    explanation: `Work each expression through & / | / ^ on the binary forms of 80 and 120, then feed the integer result through chr() at the very end (see Dry Run above). Option B is a common trap — it's the correct ordinal values, but without the final chr() conversion. Option C mixes up the operator-character arguments themselves rather than the computed results.` }
},
];

const CH2_TOPICS = [
{
  id: "string-basics", tag: "2.1",
  title: `Basics & Slicing`,
  defaultOpen: true,
  concept: `A string is an immutable, ordered sequence of characters. Indexing pulls out one character; slicing pulls out a sub-sequence — and slicing is far more forgiving of out-of-range values than indexing is.`,
  keyPoints: [
    `Immutable — s[0] = 'x' always raises TypeError. There is no way to change a string in place.`,
    `Indexing: s[0] is the first character, s[-1] is the last. Out-of-range direct indexing (e.g. s[100]) raises IndexError.`,
    `Slicing s[start:stop:step] — stop is EXCLUSIVE, step defaults to 1. A negative step walks backward (s[::-1] reverses the string).`,
    `Slicing NEVER raises an error for out-of-range bounds — it just clips silently to whatever is available.`,
    `len(s) returns the character count.`
  ],
  examples: [
    { code: `s = "GATE DA"\nprint(s[0], s[-1])\nprint(s[0:4])\nprint(s[:4], s[5:])\nprint(s[::-1])\nprint(s[::2])`, output: `G A\nGATE\nGATE DA\nAD ETAG\nGT A` },
    { code: `s = "GATE"\nprint(s[10])`, output: `IndexError: string index out of range`, tone: "error" },
    { code: `print(s[2:10])`, output: `TE`, tone: "teal", note: `Slicing never errors on out-of-range bounds — it just clips to what's actually available.` },
    { code: `s[0] = 'g'`, output: `TypeError: 'str' object does not support item assignment`, tone: "error" },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `s = "GATEDA2026"\nprint(s[2:8:2])`,
    options: [`TD2`, `TED2`, `AEA0`, `TEA2`],
    correct: 0,
    explanation: `Index map: G0 A1 T2 E3 D4 A5 2(6) 0(7) 2(8) 6(9). s[2:8:2] starts at 2, stops before 8, steps by 2 → indices 2, 4, 6 → characters T, D, 2 → "TD2".` }
},
{
  id: "string-case-whitespace", tag: "2.2",
  title: `Case & Whitespace`,
  concept: `upper/lower/title/capitalize/swapcase change letter case; strip/lstrip/rstrip remove unwanted characters from the ends. Every single one of these RETURNS A NEW STRING — none of them modify the original, because strings are immutable.`,
  keyPoints: [
    `upper() → ALL CAPS.  lower() → all lowercase.`,
    `title() → Capitalizes The First Letter Of Every Word.`,
    `capitalize() → capitalizes ONLY the very first character of the whole string; forces everything else to lowercase.`,
    `swapcase() → flips the case of every character.`,
    `strip() removes leading+trailing whitespace by default, or any of a given set of characters if you pass an argument. lstrip()/rstrip() do only the left/right side respectively.`
  ],
  examples: [
    { code: `s = "  Gate Da Exam  "\nprint(s.upper())\nprint(s.strip())\nprint(s)`, output: `  GATE DA EXAM  \nGate Da Exam\n  Gate Da Exam  `, note: `The last line proves s itself never changed — every method above returned a brand new string.` },
    { code: `print("gate da".title())\nprint("GATE DA EXAM".capitalize())\nprint("Gate Da".swapcase())\nprint("xxGATExx".strip("x"))`, output: `Gate Da\nGate da exam\ngATE dA\nGATE` },
  ],
  mistakes: [`Calling s.upper() alone (without s = s.upper()) does NOTHING to s — this is the single most common string bug. Strings are immutable, so no method can ever modify one in place; every "transformation" method just returns a fresh string.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `s = "Hello"\ns.upper()\nprint(s)`,
    options: [`HELLO`, `Hello`, `hello`, `Error`],
    correct: 1,
    explanation: `s.upper() computes and returns a new uppercase string, but since it's never assigned back to s, s itself is completely unchanged.` }
},
{
  id: "string-search-methods", tag: "2.3",
  title: `Search & Replace`,
  concept: `find/index locate a substring; count tallies occurrences; startswith/endswith test the edges; replace swaps text. The find-vs-index distinction (how each handles "not found") is a favourite GATE trick.`,
  keyPoints: [
    `find(sub) → lowest index where sub starts, or -1 if absent. NEVER raises an error.`,
    `index(sub) → same job, but raises ValueError: substring not found instead of returning -1.`,
    `count(sub) → number of NON-OVERLAPPING occurrences.`,
    `startswith(prefix) / endswith(suffix) → True/False.`,
    `replace(old, new) → replaces ALL occurrences by default; pass a 3rd argument to cap the count, e.g. replace(old, new, 1).`
  ],
  examples: [
    { code: `s = "gate data gate ai gate"\nprint(s.find("gate"))\nprint(s.find("xyz"))\nprint(s.count("gate"))\nprint(s.startswith("gate"), s.endswith("ai"))`, output: `0\n-1\n3\nTrue False` },
    { code: `s.index("xyz")`, output: `ValueError: substring not found`, tone: "error" },
    { code: `print(s.replace("gate", "GATE"))\nprint(s.replace("gate", "GATE", 1))`, output: `GATE data GATE ai GATE\nGATE data gate ai gate` },
  ],
  mistakes: [`"if s.find(x):" is a classic bug — find() returning 0 (a valid match AT position 0) is falsy in a boolean context, indistinguishable from "not found" at a glance. Always compare explicitly: "if s.find(x) != -1:".`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `s = "banana"\nprint(s.find("na"), s.count("na"))`,
    options: [`2 2`, `2 1`, `4 2`, `-1 2`],
    correct: 0,
    explanation: `"banana" = b-a-n-a-n-a (indices 0-5). "na" first appears at index 2. Non-overlapping count(): matches at index 2 AND index 4 → 2 total occurrences.` }
},
{
  id: "string-split-join", tag: "2.4",
  title: `split() & join()`,
  concept: `split() breaks a string apart into a list; join() glues a list back into a string, using the string it's called ON as the connecting glue.`,
  keyPoints: [
    `s.split() with no arguments splits on any run of whitespace and discards extra blanks automatically.`,
    `s.split(",") splits on an EXACT character — this can produce empty strings, e.g. between two consecutive commas.`,
    `splitlines() splits at line boundaries (\\n, \\r\\n, ...).`,
    `"glue".join(iterable_of_strings) — join() is called on the SEPARATOR, not on the list. Every item in the iterable must already be a string, or it raises TypeError.`
  ],
  examples: [
    { code: `s = "GATE  DA   2026"\nprint(s.split())`, output: `['GATE', 'DA', '2026']`, note: `Multiple spaces collapse automatically with the no-argument form.` },
    { code: `print("a,,b,c".split(","))`, output: `['a', '', 'b', 'c']`, note: `An empty string appears between the two consecutive commas — split(char) does NOT collapse repeats.` },
    { code: `print("-".join(["G","A","T","E"]))`, output: `G-A-T-E` },
    { code: `print(",".join([1, 2, 3]))`, output: `TypeError: sequence item 0: expected str instance, int found`, tone: "error", note: `join() refuses non-string items — you'd need ",".join(map(str,[1,2,3])) instead.` },
  ],
  mistakes: [`join() is called on the glue string, not on the list — ",".join(lst) is correct; lst.join(",") does not exist (AttributeError). Also remember: a string itself is iterable character-by-character, so "-".join("GATE") is valid and gives "G-A-T-E".`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print(":".join("GATE"))`,
    options: [`G:A:T:E`, `GATE`, `TypeError`, `:GATE:`],
    correct: 0,
    explanation: `join() accepts any iterable of strings, and a string is an iterable of its own characters. So ":".join("GATE") glues each character with ":", giving "G:A:T:E".` }
},
{
  id: "string-validate-methods", tag: "2.5",
  title: `Validation (is*)`,
  concept: `The is* family inspects character composition and returns a plain True/False — every one of them returns False on an empty string.`,
  keyPoints: [
    `isalpha() → every character is a letter.  isdigit() → every character is a digit.  isalnum() → every character is a letter OR digit (no spaces/punctuation allowed).`,
    `isspace() → every character is whitespace.`,
    `isupper()/islower() → check case, considering ONLY the alphabetic characters (digits/symbols are ignored, but at least one cased letter must be present).`,
    `istitle() → checks Title Case formatting.`,
    `There is no built-in isfloat() — "20.26".isdigit() is False, because '.' isn't a digit. Checking decimal-numeric strings typically needs try/except float(s).`
  ],
  examples: [
    { code: `print("GATE".isalpha(), "GATE26".isalpha())\nprint("2026".isdigit(), "20.26".isdigit())\nprint("GATE26".isalnum())\nprint("   ".isspace())\nprint("GATE".isupper(), "GATE26".isupper())`, output: `True False\nTrue False\nTrue\nTrue\nTrue True` },
    { code: `print("".isalpha())`, output: `False`, tone: "error", note: `Empty string is always False for isalpha / isdigit / isalnum.` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print("Gate2026".isalnum(), "Gate 2026".isalnum())`,
    options: [`True False`, `True True`, `False False`, `False True`],
    correct: 0,
    explanation: `isalnum() demands every character be a letter or digit — no spaces allowed. "Gate2026" qualifies → True. "Gate 2026" has a space → False.` }
},
{
  id: "string-formatting", tag: "2.6",
  title: `String Formatting`,
  concept: `Three ways exist to build formatted output: the old % operator, .format(), and modern f-strings — which evaluate any expression directly inside { } at that exact point in the code. f-strings are GATE's favourite for output-prediction questions.`,
  keyPoints: [
    `% style: "%s scored %d" % ("Sam", 90)`,
    `.format(): "{} scored {}".format("Sam", 90), or with explicit positions "{1} then {0}".format(a,b)`,
    `f-string (3.6+): f"{name} scored {marks}" — and f"{a+b}" evaluates the expression a+b immediately.`,
    `Precision specifiers matter a lot for predicting output: f"{pi:.2f}" rounds to 2 decimal places.`
  ],
  examples: [
    { code: `name = "GATE"; year = 2026\nprint("%s exam in %d" % (name, year))\nprint("{} exam in {}".format(name, year))\nprint(f"{name} exam in {year}")`, output: `GATE exam in 2026\nGATE exam in 2026\nGATE exam in 2026` },
    { code: `pi = 3.14159\nprint(f"{pi:.2f}")\nprint(f"{5*8}")`, output: `3.14\n40`, note: `Expressions evaluate directly inside the { } of an f-string.` },
  ],
  mistakes: [`f"{x}" always reflects x's value AT THE MOMENT the f-string is evaluated — not some later value. Inside a loop, this catches people who expect it to "auto-update".`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `x = 5\nprint(f"{x} squared is {x**2}")`,
    options: [`5 squared is 25`, `x squared is x**2`, `5 squared is x**2`, `TypeError`],
    correct: 0,
    explanation: `f-strings evaluate any expression inside { } immediately: x becomes 5, and x**2 is computed as 25 before printing.` }
},
{
  id: "string-mistakes", tag: "2.7",
  title: `Common Mistakes`,
  concept: `A rapid-fire round-up of the string traps that reappear most often across GATE papers — worth a final pass on their own.`,
  keyPoints: [
    `Immutability, always: any "mutating-looking" method (upper/replace/strip...) returns a NEW string — you must reassign, e.g. s = s.upper().`,
    `s[0] = 'x' always raises TypeError — you cannot modify a string in place; rebuild it instead, e.g. s = 'x' + s[1:].`,
    `+ concatenation demands both sides be str — Python never auto-converts int to str; you need str(x) + "text" explicitly.`,
    `Comparing strings with < > uses lexicographic order by Unicode code point. ALL uppercase letters (65-90) sort BEFORE ALL lowercase letters (97-122) — so "Z" < "a" is True.`,
    `in / not in on strings check SUBSTRING membership (case-sensitive), not just single-character membership: "AT" in "GATE" is True.`
  ],
  examples: [
    { code: `print("Z" < "a")\nprint("Apple" < "apple")\nprint("AT" in "GATE")`, output: `True\nTrue\nTrue`, note: `'Z' is code point 90, 'a' is 97 — every uppercase letter sorts before every lowercase one.` },
    { code: `print("x" + 5)`, output: `TypeError: can only concatenate str (not "int") to str`, tone: "error" },
    { code: `print("x" + str(5))`, output: `x5` },
    { code: `s = "hello"\ns = "H" + s[1:]\nprint(s)`, output: `Hello`, note: `The idiomatic way to "change" one character — slice around it and rebuild.` },
  ],
  question: { isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "MSQ",
    stem: `Select ALL statements that evaluate to True.`,
    options: [`"Z" < "a"`, `"GATE"[0] == "g"`, `"AT" in "GATE"`, `"10" == 10`],
    correct: [0, 2],
    explanation: `"Z"(90) < "a"(97) → True (uppercase code points are all lower than lowercase). "GATE"[0] is "G" (uppercase), not "g" → False. "AT" in "GATE" → True ("GATE" contains "AT" as its 2nd-3rd characters). "10" == 10 compares a str to an int — Python never considers these equal, regardless of appearance → False.` }
},
];

const CH3_TOPICS = [
{
  id: "assignment-ops", tag: "3.1",
  title: `Assignment Ops`,
  defaultOpen: true,
  concept: `Beyond plain =, Python offers augmented assignment (+=, -=, *=, ...) plus chained and multiple assignment. The subtle part: += behaves differently on mutable vs immutable objects.`,
  keyPoints: [
    `Chained assignment: a = b = c = 10 binds ALL THREE names to the exact same object.`,
    `Multiple assignment: a, b, c = 10, 20, 30 (tuple unpacking) assigns respectively — also how the classic swap x, y = y, x works, with no temp variable.`,
    `Augmented forms: +=, -=, *=, /=, //=, %=, **=, &=, |=, ^=, <<=, >>=.`,
    `On an immutable type (int, str, tuple), x += y is just shorthand for x = x + y — a brand new object, name rebound.`,
    `On a MUTABLE type (list, dict, set), += actually mutates the object in place (it calls __iadd__ / extend under the hood) — any OTHER variable pointing at the same object sees the change too!`
  ],
  examples: [
    { code: `a = b = c = 5\nprint(a, b, c, a is b)`, output: `5 5 5 True`, note: `All three names point at the very same int object.` },
    { code: `x, y = 1, 2\nx, y = y, x\nprint(x, y)`, output: `2 1` },
    { code: `L1 = [1, 2, 3]\nL2 = L1\nL1 += [4]\nprint(L2)`, output: `[1, 2, 3, 4]`, tone: "teal", note: `+= mutated the list in place — L2, which points at the SAME object, sees the change too.` },
  ],
  mistakes: [`+= mutates a list in place, but plain + always builds a new list. L1 = L1 + [4] would have rebound only L1, leaving L2 untouched at [1,2,3] — the exact opposite result. This int-vs-list contrast under += is a classic GATE trap.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `L1 = [1, 2]\nL2 = L1\nL1 = L1 + [3]\nprint(L2)`,
    options: [`[1, 2]`, `[1, 2, 3]`, `Error`, `[3]`],
    correct: 0,
    explanation: `Plain + always builds a brand NEW list and rebinds only L1 to it — L2 still points at the original [1,2], totally unaffected. (Compare with L1 += [3], which would mutate the shared list and change L2 too.)` }
},
{
  id: "membership-ops", tag: "3.2",
  title: `Membership (in/not in)`,
  concept: `in and not in test whether a value exists inside a sequence or collection — a substring test for strings, an element test for list/tuple/set, and a KEY test (not value test) for dictionaries.`,
  keyPoints: [
    `x in seq → True if x is an element of seq (or a substring, for strings).`,
    `x not in seq is the exact negation.`,
    `For a dict, "in" checks the KEYS by default — not the values. Use "x in d.values()" to check values explicitly.`
  ],
  examples: [
    { code: `print(3 in [1,2,3])\nprint("a" in "cat")\nprint(4 not in (1,2,3))`, output: `True\nTrue\nTrue` },
    { code: `d = {"x": 1, "y": 2}\nprint("x" in d)\nprint(1 in d)\nprint(1 in d.values())`, output: `True\nFalse\nTrue`, note: `"in" on a dict checks KEYS by default — 1 is a value, not a key, hence False on line 2.` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `d = {1: "a", 2: "b"}\nprint(1 in d, "a" in d, "a" in d.values())`,
    options: [`True False True`, `True True True`, `False False True`, `True False False`],
    correct: 0,
    explanation: `"in" on a dict checks its keys by default. 1 IS a key → True. "a" is a VALUE, not a key → False. Checking d.values() explicitly, "a" IS present there → True.` }
},
{
  id: "identity-ops", tag: "3.3",
  title: `Identity (is/is not)`,
  concept: `is / is not check whether two names point to the exact SAME object in memory — this is identity, not value equality. This ties directly back to id() and integer caching from Chapter 1.`,
  keyPoints: [
    `a is b is exactly equivalent to id(a) == id(b).`,
    `== compares VALUE equality. is compares OBJECT IDENTITY. Two separately-built, equal-valued objects can be == True while being is False.`,
    `Because of integer caching and string interning, small ints/short strings SOMETIMES (unreliably) share identity — never use "is" for value comparison.`,
    `The one place "is" is the idiomatic, CORRECT choice: comparing against None — always "if x is None:", never "if x == None:".`
  ],
  examples: [
    { code: `a = [1,2,3]\nb = [1,2,3]\nprint(a == b, a is b)`, output: `True False`, note: `Equal VALUES, but two separately constructed list objects.` },
    { code: `c = a\nprint(a is c)`, output: `True`, note: `c is literally the same object as a — no new list was built.` },
    { code: `x = None\nprint(x is None)`, output: `True`, tone: "teal", note: `The idiomatic, correct way to test for None.` },
  ],
  mistakes: [`a == b checks VALUE; a is b checks IDENTITY. Two equal-content but independently-constructed mutable objects (like two separate [1,2,3] lists) are almost always == True but is False.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `s1 = "hello"\ns2 = "hello"\nL1 = ["hello"]\nL2 = ["hello"]\nprint(s1 == s2, L1 == L2, L1 is L2)`,
    options: [`True True False`, `True True True`, `False True False`, `True False False`],
    correct: 0,
    explanation: `s1==s2 and L1==L2 both compare VALUE and both hold equal contents → True, True. But L1 and L2 are two separately built list objects, so L1 is L2 (IDENTITY) → False, regardless of equal contents.` }
},
{
  id: "type-conversion", tag: "3.4",
  title: `Type Conversion`,
  concept: `Implicit conversion happens automatically when Python mixes compatible types in one expression (int widens to float). Explicit conversion is the programmer deliberately calling int(), float(), str()...`,
  keyPoints: [
    `Implicit: int + float → Python promotes the int to float first, no data loss, no crash. bool behaves as int in arithmetic (True=1, False=0).`,
    `Explicit (casting): int("5"), float("3.14"), str(5), list("abc"), etc.`,
    `int() TRUNCATES a float toward zero — it does NOT round: int(9.9) is 9, int(-9.9) is -9.`,
    `int("5.5") raises ValueError directly — a decimal-looking string must go through float() first: int(float("5.5")).`
  ],
  examples: [
    { code: `print(5 + 2.0)\nprint(True + True)\nprint(int(9.9), int(-9.9))`, output: `7.0\n2\n9 -9`, note: `int() truncates, never rounds — both examples chop toward zero.` },
    { code: `print(int("42"))\nprint(int("5.5"))`, output: `42\nValueError: invalid literal for int() with base 10: '5.5'`, tone: "error" },
    { code: `print(int(float("5.5")))\nprint(str(5) + "x")\nprint(list("GATE"))`, output: `5\n5x\n['G', 'A', 'T', 'E']` },
  ],
  mistakes: [`int() truncates — it does NOT round. int(9.9) is 9, not 10. Use round(9.9) if you actually want mathematical rounding.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `print(int(-7.8), round(-7.8))`,
    options: [`-7 -8`, `-8 -8`, `-7 -7`, `-8 -7`],
    correct: 0,
    explanation: `int() truncates toward zero: -7.8 becomes -7 (the decimal part is simply chopped off, not floored). round() does genuine rounding to the nearest integer: -7.8 rounds to -8.` }
},
{
  id: "input-function", tag: "3.5",
  title: `input() Function`,
  concept: `input() ALWAYS returns a str, no matter what the user types — this single fact is responsible for an enormous number of real (and GATE-simulated) beginner bugs.`,
  keyPoints: [
    `input([prompt]) shows an optional prompt, waits for the user, and returns whatever was typed AS A STRING — always, with zero exceptions.`,
    `To use the result numerically you must convert explicitly: int(input()), float(input()).`,
    `A very common one-liner: n = int(input("Enter no: ")) — reads text and converts in a single line.`
  ],
  examples: [
    { code: `# user types: 10\nn = input("Enter no: ")\nprint(type(n))`, output: `<class 'str'>`, note: `Always a string, even though '10' looks numeric.` },
    { code: `# user types: 10\nn = int(input("Enter no: "))\nprint(type(n), n + 5)`, output: `<class 'int'> 15` },
  ],
  mistakes: [`n = input(); print(n + 5) raises TypeError: can only concatenate str (not "int") to str, because n is a string even when the user typed digits. Always wrap with int()/float() before doing arithmetic on input().`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `# user enters: 5\nn = input()\nprint(n * 3)`,
    options: [`15`, `555`, `TypeError`, `5 5 5`],
    correct: 1,
    explanation: `input() always returns a str regardless of what's typed. n is the string "5", so n*3 is STRING repetition (three copies of "5"), giving "555" — not numeric multiplication.` }
},
{
  id: "conditionals", tag: "3.6",
  title: `Conditionals`,
  concept: `if / if-else / if-elif-else pick which block runs, based on Boolean conditions checked top to bottom. Indentation (not braces) defines each block, and at most ONE branch of an elif-chain ever executes.`,
  keyPoints: [
    `Two valid block styles: a multi-line indented block, or a single inline block using semicolons after the colon (best for one-liners only).`,
    `Indentation must be consistent within a block — mismatched indentation raises IndentationError.`,
    `if-elif-else: conditions are checked top to bottom; the FIRST True one runs its block, and every remaining elif/else is skipped — even if a later condition would also be True.`,
    `else is always optional, in every form.`
  ],
  examples: [
    { code: `n = 10\nif n % 2 == 0:\n    print("Even no:")\nelse:\n    print("Odd no:")`, output: `Even no:` },
    { code: `marks = 82\nif marks >= 90:\n    print("A grade")\nelif marks >= 75:\n    print("B grade")\nelif marks >= 60:\n    print("C grade")\nelse:\n    print("D grade")`, output: `B grade`, note: `Stops at the FIRST True condition — the marks>=60 branch is never even checked.` },
  ],
  mistakes: [`Only ONE branch of an if-elif-else chain ever runs, no matter how many later conditions would also be True. This differs from writing several SEPARATE if statements, where every single one gets checked independently.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `x = 15\nif x > 10:\n    print("A")\nif x > 5:\n    print("B")\nelse:\n    print("C")`,
    options: [`A\nB`, `A`, `B`, `A\nC`],
    correct: 0,
    explanation: `These are TWO SEPARATE if statements, not an if-elif chain — each is evaluated independently. x>10 is True → prints A. Then, independently, x>5 is True → prints B (its else is simply skipped). Both lines print.` }
},
{
  id: "while-loop", tag: "3.7",
  title: `while Loop`,
  concept: `while repeats its body as long as the condition stays True, re-checked before every single iteration. It also supports an else clause — one of Python's most under-appreciated features.`,
  keyPoints: [
    `Syntax: while condition: body [else: body] — the else block runs once the condition finally goes False NATURALLY.`,
    `Crucially, the else is SKIPPED entirely if the loop was exited via break. "else means the loop finished without a break."`,
    `Right-shifting a number inside a while loop (x >>= 1) is a classic way to "consume" its bits one at a time — a favourite GATE loop-counting pattern.`
  ],
  examples: [
    { code: `x = 4096          # 2**12\ncount = 0\nwhile x:\n    if x & 1:\n        count += 1\n    x >>= 1\nprint(count)`, output: `1`, note: `4096 is exactly 2**12 — its binary form has exactly one bit set, so exactly one iteration finds a 1-bit.` },
  ],
  mistakes: [`A while-else's else is NOT like an if-else's else. It fires when the loop condition becomes False naturally — and is silently skipped if a break fired at any point.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `i = 0\nwhile i < 3:\n    print(i, end=" ")\n    i += 1\n    if i == 2:\n        break\nelse:\n    print("done")`,
    options: [`0 1`, `0 1 done`, `0 1 2 done`, `0 1 2`],
    correct: 0,
    explanation: `i=0: prints 0, i becomes 1, 1==2? No. i=1: prints 1, i becomes 2, 2==2? Yes → break. The loop exits via break, so the else clause is SKIPPED entirely. Output: "0 1 " with no "done".` }
},
{
  id: "for-range-control", tag: "3.8",
  title: `for Loop & range()`,
  concept: `for iterates directly over any iterable; range() is by far the most common thing to iterate over. break/continue/pass round out the loop-control toolkit.`,
  keyPoints: [
    `for x in sequence: iterates x over every element of a list/tuple/string/set/dict/range, in order.`,
    `range(stop) → 0 .. stop-1.  range(start,stop) → start .. stop-1.  range(start,stop,step) → start, start+step, ... stopping before stop. step can never be 0.`,
    `If the requested direction is impossible (e.g. counting up while start ≥ stop, or a negative step with start < stop), range is simply EMPTY — not an error.`,
    `break exits the loop immediately. continue skips the rest of the CURRENT iteration only. pass is a no-op placeholder, used when Python's syntax demands a block that must otherwise be empty.`,
    `Nested loops: total iterations = (outer count) × (inner count) — the backbone of most time-complexity questions.`
  ],
  examples: [
    { code: `for x in range(5, 20, 3):\n    print(x, end=" ")`, output: `5 8 11 14 17`, note: `Stops before reaching or passing 20.` },
    { code: `print(list(range(2, 6, -1)))`, output: `[]`, tone: "error", note: `Counting UP (2 to 6) needs a POSITIVE step — a negative step here produces zero values, silently, not an error and not [2,3,4,5] reversed.` },
    { code: `for i in range(10):\n    if i == 7:\n        print("stopping")\n        break\n    print(i, end=" ")`, output: `0 1 2 3 4 5 6 stopping` },
    { code: `for i in range(10):\n    if i % 2 == 0:\n        continue\n    print(i, end=" ")`, output: `1 3 5 7 9`, note: `Even numbers are silently skipped, never printed.` },
  ],
  mistakes: [`range(2, 6, -1) is empty — NOT an error, and NOT [2,3,4,5] read backwards. The direction implied by start→stop must match the SIGN of the step, or you silently get zero iterations.`],
  question: { isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "NAT",
    stem: `total = 0\nfor i in range(1, 10, 2):\n    for j in range(0, i, 3):\n        total += 1\nprint(total)\n\n# Result = ______`,
    correct: "10",
    explanation: `Outer i takes 1,3,5,7,9 (five values, step 2). For each i, count multiples of 3 in [0,i): i=1→{0} (1), i=3→{0} (1), i=5→{0,3} (2), i=7→{0,3,6} (3), i=9→{0,3,6} (3). Total = 1+1+2+3+3 = 10.` }
},
];

const CH4_TOPICS = [
{
  id: "sets-creation", tag: "4.1",
  title: `Creating Sets`,
  defaultOpen: true,
  concept: `Beyond the literal {1,2,3} syntax, Python offers several other ways to build a set — and one of them hides a famous trap.`,
  keyPoints: [
    `{} is ALWAYS an empty dict, never an empty set — the ONLY way to create an empty set is set().`,
    `set(iterable) builds a set from any iterable, automatically discarding duplicates: set("bharat") gives the unique characters; set([10,20,10,30]) drops the repeated 10.`,
    `Set comprehension: {expr for item in iterable [if cond]} — identical idea to list comprehension, curly braces instead of square.`,
    `Iterating a set with for is fine, but since sets are unordered, never rely on any particular sequence of output.`
  ],
  examples: [
    { code: `S = {}\nprint(type(S))\nS = set()\nprint(type(S))`, output: `<class 'dict'>   # NOT a set!\n<class 'set'>`, tone: "error" },
    { code: `S = set("bharat")\nprint(S)\nS = set([10, 20, 10, 30])\nprint(S)`, output: `{'b', 'h', 'a', 'r', 't'}   # duplicate 'a' collapses\n{10, 20, 30}` },
    { code: `S = {x*x for x in range(1, 5)}\nprint(S)`, output: `{1, 4, 9, 16}` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `S = {10, 20}\nWhich of the following calls is INVALID and raises an error?`,
    options: [`S.add(30)`, `S.add(30, 40)`, `S.update([30, 40])`, `S.update(range(30, 33))`],
    correct: 1,
    explanation: `add() accepts EXACTLY one element per call — S.add(30, 40) raises TypeError: add() takes exactly one argument (2 given). To add several elements at once you need update(), which accepts one or more iterable arguments.` }
},
{
  id: "set-mutation-methods", tag: "4.2",
  title: `Set Mutation`,
  concept: `Four core ways to change a set after it's created — each with its own rules about what kind of argument it accepts and how it fails.`,
  keyPoints: [
    `add(x) inserts exactly ONE element. Passing more than one positional argument raises TypeError.`,
    `update(*iterables) inserts elements from ONE OR MORE iterable arguments — every argument must itself be iterable, so update(5) fails (int isn't iterable) but update([5]) works.`,
    `remove(x) deletes x; raises KeyError if x isn't present. (discard(x) is the safer cousin — it stays silent instead of raising an error if the element is missing.)`,
    `pop() removes and returns an UNPREDICTABLE element, since a set carries no defined order.`
  ],
  examples: [
    { code: `S = {1, 2, 3}\nS.add(4)\nprint(S)\nS.update([5, 6], (7, 8))\nprint(S)`, output: `{1, 2, 3, 4}\n{1, 2, 3, 4, 5, 6, 7, 8}` },
    { code: `S.update(9)`, output: `TypeError: 'int' object is not iterable`, tone: "error" },
    { code: `S = {10, 20, 30}\nS.remove(20)\nprint(S)\nS.remove(99)`, output: `{10, 30}\nKeyError: 99`, tone: "error" },
  ],
  mistakes: [`add() vs update(): add() takes ONE element; update() takes one-or-more ITERABLES. Mixing them up — e.g. S.add([4,5]) — tries to insert the LIST [4,5] itself as a single element, but lists aren't hashable, so it raises TypeError: unhashable type: 'list' rather than adding 4 and 5 individually.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `S = {1, 2, 3}\nS.add([4, 5])`,
    options: [`{1, 2, 3, [4, 5]}`, `{1, 2, 3, 4, 5}`, `TypeError: unhashable type: 'list'`, `{1, 2, 3}, [4, 5]`],
    correct: 2,
    explanation: `Every set element must be hashable, which requires immutability. add() tries to insert the list [4,5] as a SINGLE element — but lists are mutable and therefore unhashable, raising a TypeError (not a silent nesting the way it would for a tuple).` }
},
{
  id: "set-math", tag: "4.3",
  title: `Set Mathematics`,
  concept: `Sets support the four classic mathematical operations, each available as both a method AND a symbolic operator.`,
  keyPoints: [
    `union (| or .union()) → all elements present in EITHER set (duplicates naturally eliminated).`,
    `intersection (& or .intersection()) → elements present in BOTH sets.`,
    `difference (- or .difference()) → elements in the first set but NOT the second — order matters! a-b ≠ b-a in general.`,
    `symmetric_difference (^ or .symmetric_difference()) → elements in exactly ONE of the two sets.`
  ],
  examples: [
    { code: `a = {10, 20, 30, 40}\nb = {30, 40, 50, 60}\nprint(a | b)\nprint(a & b)\nprint(a - b, b - a)\nprint(a ^ b)`, output: `{10, 20, 30, 40, 50, 60}\n{30, 40}\n{10, 20} {50, 60}\n{10, 20, 50, 60}`, note: `a-b and b-a are NOT the same set — direction matters for difference.` },
  ],
  question: { isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "MCQ",
    stem: `def common(s1, s2):\n    if not s1 or not s2:\n        return set()\n    element = s1.pop()\n    if element in s2:\n        return {element} | common(s1, s2)\n    return common(s1, s2)\nprint(common({2,3,4,5,6}, {5,6,7,8,9}))`,
    options: [`{5, 6}`, `{2, 3, 4}`, `{2, 3, 4, 5, 6, 7, 8}`, `set()`],
    correct: 0,
    explanation: `This is a recursive reimplementation of intersection: it repeatedly pops one element out of s1, keeps it only if it's ALSO in s2, and recurses on what remains. Since pop() eventually drains s1 completely, every element gets tested — only the ones found in BOTH sets, {5,6}, survive into the final union.` }
},
{
  id: "dict-creation-patterns", tag: "4.4",
  title: `Dict Creation`,
  concept: `Beyond the direct {k:v, ...} literal, Python offers several other ways to build a dictionary — each suited to a different situation.`,
  keyPoints: [
    `dict(key=value, ...) — keyword-style construction; keys become the keyword names (must be valid identifiers).`,
    `dict.fromkeys(iterable, value) — builds a dict where EVERY key from the iterable maps to the SAME value (defaults to None). Great for initializing counters or flags.`,
    `Dict comprehension: {key_expr: value_expr for item in iterable [if cond]}.`,
    `dict(zip(keys_list, values_list)) — pairs two parallel lists positionally into key-value pairs. zip() quietly truncates to the SHORTER list.`
  ],
  examples: [
    { code: `d = dict.fromkeys(["a", "b", "c"], 0)\nprint(d)`, output: `{'a': 0, 'b': 0, 'c': 0}` },
    { code: `d = {i: i*i for i in range(1, 5)}\nprint(d)`, output: `{1: 1, 2: 4, 3: 9, 4: 16}` },
    { code: `keys = ["name", "age", "city"]\nvalues = ["Alice", 25, "New York"]\nprint(dict(zip(keys, values)))`, output: `{'name': 'Alice', 'age': 25, 'city': 'New York'}` },
  ],
  mistakes: [`dict.fromkeys(list, default) with a MUTABLE default (like a list) shares the exact SAME object across every key — appending to one key's value silently affects all the others. This is the dict cousin of the mutable-default-argument trap in the Functions chapter.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `keys = ["a", "b", "c"]\nvalues = [1, 2]\nprint(dict(zip(keys, values)))`,
    options: [`{'a': 1, 'b': 2}`, `{'a': 1, 'b': 2, 'c': None}`, `Error`, `{'a': 1, 'b': 2, 'c': 3}`],
    correct: 0,
    explanation: `zip() stops the moment the SHORTER iterable runs out — values has only 2 elements, so 'c' never gets paired with anything and is silently dropped. Not an error, and not filled with None.` }
},
{
  id: "dict-removal", tag: "4.5",
  title: `Dict Removal`,
  concept: `Four different ways to remove things from a dict, each with different failure behaviour and a different return value — a favourite source of GATE distractors.`,
  keyPoints: [
    `del d[key] — removes that one pair; raises KeyError if the key doesn't exist.`,
    `del d — deletes the ENTIRE variable d itself, not just its contents; referencing d afterward raises NameError.`,
    `d.clear() — empties the dict IN PLACE; the variable d still exists, now as a valid empty dict.`,
    `d.pop(key) — removes the pair AND RETURNS its value; raises KeyError if absent (or returns a fallback if you write pop(key, fallback)).`,
    `d.popitem() — removes and returns the LAST-inserted (key, value) pair as a tuple (guaranteed LIFO order since Python 3.7).`
  ],
  examples: [
    { code: `d = {100: "Sachin", 200: "Rohit", 300: "Rahul"}\ndel d[100]\nprint(d)`, output: `{200: 'Rohit', 300: 'Rahul'}` },
    { code: `d = {100: "Sachin"}\ndel d\nprint(d)`, output: `NameError: name 'd' is not defined`, tone: "error" },
    { code: `d = {100: "Virat", 200: "Rohit"}\nprint(d.pop(100))\nprint(d.pop(999, "N/A"))\nprint(d.popitem())`, output: `Virat\nN/A\n(200, 'Rohit')`, note: `pop() RETURNS the removed value; popitem() returns the last-inserted pair as a tuple.` },
  ],
  mistakes: [`del d[key] does NOT return the removed value — it's a statement, not an expression, so "x = del d[key]" is a SyntaxError. Use pop() if you need the value back.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `d = {1: "a", 2: "b", 3: "c"}\nprint(d.pop(5, "missing"), d.popitem())`,
    options: [`missing (3, 'c')`, `KeyError`, `missing (1, 'a')`, `None (3, 'c')`],
    correct: 0,
    explanation: `pop(5, "missing") — key 5 doesn't exist, so the fallback "missing" is returned instead of raising KeyError. popitem() removes and returns the LAST inserted pair, (3, 'c').` }
},
{
  id: "dict-reading-merging", tag: "4.6",
  title: `Reading & Merging`,
  concept: `get / keys / values / items / update / setdefault round out the dictionary toolkit — mostly about reading safely and combining two dictionaries.`,
  keyPoints: [
    `d.get(key) → returns the value, or None if absent (NEVER raises KeyError, unlike d[key]). Supply a custom fallback: d.get(key, "N/A").`,
    `d.keys() / d.values() / d.items() → live VIEW objects (not plain lists) over all keys / all values / all (key,value) tuples — commonly unpacked as "for k, v in d.items():".`,
    `d.update(other) → merges other into d: existing keys get overwritten, new keys get added.`,
    `d.setdefault(key, default) → if key exists, returns its CURRENT value unchanged; if absent, INSERTS it with default and returns that default — a one-line "get-or-insert".`
  ],
  examples: [
    { code: `d = {"a": 1, "b": 2}\nprint(d.get("a"), d.get("z"), d.get("z", 0))`, output: `1 None 0` },
    { code: `d1 = {"a": "apple", "b": "ball"}\nd2 = {"b": "banana", "c": "cat"}\nd1.update(d2)\nprint(d1)`, output: `{'a': 'apple', 'b': 'banana', 'c': 'cat'}` },
    { code: `d = {"x": 1}\nprint(d.setdefault("x", 99))\nprint(d.setdefault("y", 99))\nprint(d)`, output: `1\n99\n{'x': 1, 'y': 99}` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `d = {"a": 1, "b": 2}\nfor k, v in d.items():\n    print(k, v, end=" | ")`,
    options: [`a 1 | b 2 |`, `1 a | 2 b |`, `a b | 1 2 |`, `Error`],
    correct: 0,
    explanation: `items() yields (key, value) tuples in insertion order; unpacking each into k, v prints key then value for every pair.` }
},
{
  id: "list-tuple-set-dict-comparison", tag: "4.7",
  title: `Collection Comparison`,
  concept: `A single reference table pulling together everything learned about the four core containers — GATE loves cross-comparison questions on exactly this.`,
  keyPoints: [
    `List [ ]: ordered, mutable, duplicates allowed, heterogeneous, indexable/sliceable.`,
    `Tuple ( ): ordered, IMMUTABLE, duplicates allowed, heterogeneous, indexable/sliceable.`,
    `Set { }: unordered, mutable, NO duplicates, elements must be hashable, NOT indexable.`,
    `Dict {k:v}: keys act as an ordered, unique, immutable index; values are mutable, can repeat, and can be any type at all.`
  ],
  examples: [
    { code: `for c in [list, tuple, set, dict]:\n    print(c.__name__)`, output: `list\ntuple\nset\ndict` },
  ],
  question: { isPYQ: false, source: "GATE-Style Practice", marks: 1, qtype: "MSQ",
    stem: `Select all TRUE statements.`,
    options: [`A tuple can contain a list as one of its elements.`, `A set can contain a list as one of its elements.`, `A dictionary's values must all be the same type.`, `Two identical values can appear twice in a list.`],
    correct: [0, 3],
    explanation: `A tuple can hold ANY object as an element, including a mutable list (the tuple just can't be reassigned itself). A set requires every element to be hashable — a list is not hashable, so it can never be a set element (TypeError). Dictionary values may all be different types from each other. Lists explicitly allow duplicates.` }
},
];

const CH5_TOPICS = [
{
  id: "why-functions", tag: "5.1",
  title: `Why Functions?`,
  defaultOpen: true,
  concept: `A function bundles a reusable block of code under one name, so it can be executed on demand instead of being retyped every time it's needed.`,
  keyPoints: [
    `Avoids repeating the same statements over and over.`,
    `Divides a large program into smaller, individually-manageable, individually-testable units.`,
    `Improves readability and debuggability, and enables reuse across many call sites.`,
    `Python supports 2 categories: Built-in functions (ship with Python — print(), len(), type()) and User-defined functions (written by the programmer).`,
    `Rule: a function's definition must appear BEFORE it is called — calling it earlier raises NameError: name '...' is not defined.`
  ],
  examples: [
    { code: `greet()\ndef greet():\n    print("hi")`, output: `NameError: name 'greet' is not defined`, tone: "error" },
    { code: `def greet():\n    print("hi")\ngreet()`, output: `hi` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `Which of these is a BUILT-IN function, not a typical user-defined one?`,
    options: [`len()`, `greet()`, `show()`, `mul()`],
    correct: 0,
    explanation: `len() ships with Python itself, available everywhere with zero definition needed — a built-in. The other three are typical names a programmer might pick for their own function.` }
},
{
  id: "defining-calling-returns", tag: "5.2",
  title: `Defining & Calling`,
  concept: `def introduces a function; unlike C/C++/Java (which return at most one value), Python functions can return MULTIPLE values at once, packed implicitly into a tuple.`,
  keyPoints: [
    `Syntax: def function_name(parameters): body.  Calling: result = function_name(arguments).`,
    `return sends a value back and immediately exits the function. A function with no return (or a bare return) returns None.`,
    `"return a, b" is really "return (a, b)" — an implicit tuple — which the caller can unpack directly: x, y = func().`
  ],
  examples: [
    { code: `def sum_sub(a, b):\n    return a + b, a - b\ntotal, diff = sum_sub(200, 100)\nprint(total, diff)`, output: `300 100` },
    { code: `def no_return():\n    x = 5\nprint(no_return())`, output: `None` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `def f(a, b):\n    return a * b\nresult = f(3, 4)\nprint(type(result), result)`,
    options: [`<class 'int'> 12`, `<class 'tuple'> 12`, `<class 'tuple'> (12,)`, `<class 'NoneType'> None`],
    correct: 0,
    explanation: `A single return value is NOT wrapped in a tuple — only "return a, b" (2 or more comma-separated values) becomes a tuple. return a*b returns a plain int here.` }
},
{
  id: "parameters-arguments", tag: "5.3",
  title: `Parameters vs Arguments`,
  concept: `Used loosely as synonyms in casual speech, but GATE (and good practice) distinguishes them precisely.`,
  keyPoints: [
    `Parameters are the names listed in the function DEFINITION — always plain variable names, never values or expressions. Duplicate parameter names in one definition raise SyntaxError.`,
    `Arguments are the actual values/expressions supplied at the CALL site — these can be literals, variables, or full expressions, and the same value may be passed more than once.`,
    `Parameters live in the function's local scope; arguments are evaluated in the CALLER's scope before the call happens.`
  ],
  examples: [
    { code: `def mul(a, b):    # a, b are PARAMETERS\n    return a * b\nx = 4\nmul(x, x + 1)      # x and x+1 are ARGUMENTS`, output: undefined },
    { code: `def mul(a, a):     # duplicate parameter name\n    return a`, output: `SyntaxError: duplicate argument 'a' in function definition`, tone: "error" },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `Which of the following function DEFINITIONS is invalid?`,
    options: [`def f(a, b): return a+b`, `def f(a, a): return a`, `def f(x=1, y=2): return x+y`, `def f(*args): return sum(args)`],
    correct: 1,
    explanation: `def f(a, a) reuses the same parameter name twice in one definition — Python raises SyntaxError: duplicate argument 'a' in function definition. Every other option is perfectly valid.` }
},
{
  id: "default-arguments-trap", tag: "5.4",
  title: `Default Arguments`,
  concept: `A default argument supplies a fallback value used when the caller omits that argument. The catch: the default is evaluated exactly ONCE, at function-DEFINITION time — harmless for immutable defaults, but a notorious bug source for mutable ones.`,
  keyPoints: [
    `def show(a=0, b=1): — calling show(2) uses a=2, b=1 (the default).`,
    `Because the default object is built only once, a MUTABLE default (like a list) is SHARED across every call that doesn't override it — mutating it in one call leaks into the next.`,
    `The standard fix: default to None, and create a fresh mutable object INSIDE the function body when it's actually needed.`
  ],
  examples: [
    { code: `def fun(element, to="good "):\n    to = to + element\n    return to\nprint(fun("morning"))\nprint(fun("evening"))`, output: `good morning\ngood evening`, note: `The string default never mutates (strings are immutable) — each call starts fresh from the same unchanged default object.` },
    { code: `def func(x, lst=[]):\n    lst.append(x)\n    return lst\na = func(1)\nb = func(2)\nc = func(3, [])\nprint(a, b, c)`, output: `[1, 2] [1, 2] [3]`, tone: "error", note: `a and b are secretly the SAME list object — the shared default — so appending via b's call also changed what a points to. c bypasses the trap with an explicit fresh [].` },
  ],
  mistakes: [`This exact mutable-default-list trap is one of the most famous gotchas in the entire language — it appeared almost verbatim as a real GATE DA 2026 question, and GATE loves testing whether you realize a and b above are actually the identical object (a is b is True).`],
  question: { isPYQ: true, source: "GATE DA 2026 (2 marks)", marks: 2, qtype: "MCQ",
    stem: `def append_to_lst(x, lst=[]):\n    lst.append(x)\n    return lst\n\nprint(append_to_lst(1))\nprint(append_to_lst(2))\nprint(append_to_lst(3, []))`,
    options: [`[1]  [2]  [3]`, `[1]  [1, 2]  [3]`, `[1]  [1, 2]  [1, 2, 3]`, `[1]  [2]  [1, 2, 3]`],
    correct: 1,
    explanation: `The default list lst=[] is created exactly ONCE, at function-definition time. First call: no lst passed, so it appends 1 to that one shared default object → [1]. Second call: also no lst passed, so it reuses the SAME now-modified object and appends 2 → [1, 2]. Third call explicitly passes a brand-new [], bypassing the shared default entirely → appending 3 gives just [3].` }
},
{
  id: "positional-keyword-only", tag: "5.5",
  title: `Positional & Keyword`,
  concept: `Python 3.8+ lets you FORCE certain parameters to be passed only positionally, or only by keyword, using the / and * markers in the parameter list.`,
  keyPoints: [
    `Positional-only: def f(a, b, /): — every parameter BEFORE the / can only be given positionally. f(a=1, b=2) raises TypeError.`,
    `Keyword-only: def f(*, a, b): — every parameter AFTER a bare * can only be given by keyword. f(1, 2) raises TypeError.`,
    `A normal parameter (no / or *) accepts EITHER style — the default, most common case.`,
    `These markers lock down a function's public API — preventing callers from depending on parameter NAMES, or on their ORDER, whichever the author wants freedom to change later.`
  ],
  examples: [
    { code: `def show(a, b, /):\n    print(a, b)\nshow(1, 2)\nshow(a=1, b=2)`, output: `1 2\nTypeError: show() got some positional-only arguments passed as keyword arguments: 'a, b'`, tone: "error" },
    { code: `def show(*, a, b):\n    print(a, b)\nshow(1, 2)`, output: `TypeError: show() takes 0 positional arguments but 2 were given`, tone: "error" },
    { code: `show(a=1, b=2)`, output: `1 2`, tone: "teal" },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `def show(a, b, /, c):\n    print(a, b, c)\nWhich call raises a TypeError?`,
    options: [`show(1, 2, 3)`, `show(1, 2, c=3)`, `show(a=1, b=2, c=3)`, `show(5, 10, c=15)`],
    correct: 2,
    explanation: `a and b sit BEFORE the / marker, making them positional-only — they can never be passed by keyword. show(a=1, b=2, c=3) tries to pass both as keywords, which is invalid. The other three all pass a and b positionally, which is always allowed.` }
},
{
  id: "args-kwargs", tag: "5.6",
  title: `*args and **kwargs`,
  concept: `*args and **kwargs let a function accept an ARBITRARY number of extra positional or keyword arguments — the backbone of flexible, general-purpose functions.`,
  keyPoints: [
    `def f(*args): — collects any number of extra positional arguments into a TUPLE named args.`,
    `def f(**kwargs): — collects any number of extra keyword arguments into a DICT named kwargs.`,
    `Both can happily accept ZERO arguments too — args becomes an empty tuple (), kwargs becomes an empty dict {}.`,
    `Ordering in a definition: normal params, then *args, then any keyword-only/default params, then **kwargs last.`
  ],
  examples: [
    { code: `def show(*a):\n    print(a)\nshow(10, 20, 30)\nshow()`, output: `(10, 20, 30)\n()` },
    { code: `def show(**a):\n    print(a)\nshow(roll=101, name="Sonu", age=20)`, output: `{'roll': 101, 'name': 'Sonu', 'age': 20}` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `def total(*nums, **info):\n    return sum(nums), info\nprint(total(1, 2, 3, tax=0.1, currency="INR"))`,
    options: [`(6, {'tax': 0.1, 'currency': 'INR'})`, `(6, ['tax', 'currency'])`, `([1, 2, 3], {'tax': 0.1, 'currency': 'INR'})`, `TypeError`],
    correct: 0,
    explanation: `1, 2, 3 carry no keyword, so they're collected into the *nums TUPLE (1,2,3) and summed to 6. tax and currency ARE keyworded, so they land unchanged in the **info DICT.` }
},
{
  id: "scope-global", tag: "5.7",
  title: `Variable Scope`,
  concept: `Reading a global variable from inside a function works automatically — but MODIFYING one requires explicitly declaring it global first, or Python silently creates a shadowing local variable instead.`,
  keyPoints: [
    `A variable created inside a function is LOCAL — it exists only during that call, invisible outside.`,
    `A variable created at module (top) level is GLOBAL — readable from anywhere, including inside functions, with no special keyword needed.`,
    `To ASSIGN to a global variable from inside a function, you must declare "global varname" first — otherwise Python creates a brand-new LOCAL variable with that name instead.`,
    `Classic gotcha: if a function assigns to a name ANYWHERE in its body, Python treats that name as local for the ENTIRE function — reading it before that assignment (without declaring global) raises UnboundLocalError, even with a same-named global in scope.`
  ],
  examples: [
    { code: `a = 2\nb = 3\ndef mul():\n    global a\n    a = 10\n    b = 20        # this b is purely LOCAL to mul()\n    print(a * b)\nmul()\ndef add():\n    print(a + b)   # global a is now 10; global b is still 3\nadd()`, output: `200\n13` },
    { code: `x = 20\ndef myfun():\n    x = x + 1       # x assigned here -> LOCAL for the whole function\n    print(x)\nmyfun()`, output: `UnboundLocalError: local variable 'x' referenced before assignment`, tone: "error", note: `Because x is assigned somewhere inside myfun(), every use of x in that function is local — including the read on the right of "x + 1", which happens before any local x exists yet.` },
  ],
  mistakes: [`Merely READING a global variable inside a function never needs the global keyword — you only need it the moment you want to REASSIGN that name from inside the function.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `x = 4\ndef myfun():\n    global x\n    x = x + 1\n    print(x)\nmyfun()\nprint(x)`,
    options: [`5\n5`, `5\n4`, `4\n5`, `UnboundLocalError`],
    correct: 0,
    explanation: `global x tells Python to use the module-level x, not a local one. x becomes 5 inside the function (printed), and since it's the SAME global variable, it's still 5 after the function returns.` }
},
{
  id: "nested-nonlocal", tag: "5.8",
  title: `Nested Functions`,
  concept: `When a function is defined INSIDE another function, it can read the outer function's variables automatically — but modifying one requires nonlocal, the middle ground between local and global.`,
  keyPoints: [
    `Three-level hierarchy in a nested function: local (this function's own vars) → enclosing/nonlocal (the outer function's vars) → global (module level).`,
    `nonlocal varname inside an inner function lets it ASSIGN to a variable belonging to its nearest enclosing function — without it, assignment just creates a fresh local variable in the inner function, leaving the outer one untouched.`,
    `nonlocal does NOT reach all the way to global scope — only to the nearest enclosing function. For that you'd need global instead.`
  ],
  examples: [
    { code: `def outer():\n    x = 10\n    def inner():\n        nonlocal x\n        x = 25\n        print("inner x:", x)\n    inner()\n    print("outer x:", x)\nouter()`, output: `inner x: 25\nouter x: 25`, note: `nonlocal made inner()'s assignment reach out and modify outer()'s own x.` },
    { code: `def outer():\n    x = 10\n    def inner():\n        x = 25     # NO nonlocal -> a fresh LOCAL x inside inner()\n        print("inner x:", x)\n    inner()\n    print("outer x:", x)\nouter()`, output: `inner x: 25\nouter x: 10`, tone: "teal", note: `Without nonlocal, inner's x=25 just creates its own separate local variable — outer's x is untouched.` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 2, qtype: "MCQ",
    stem: `x = 100\ndef outer():\n    global x\n    x = 20\n    def inner():\n        x = 30\n    inner()\n    print(x)\nouter()\nprint(x)`,
    options: [`20\n20`, `30\n30`, `20\n30`, `30\n20`],
    correct: 0,
    explanation: `outer() declares global x and sets it to 20 — this changes the module-level x. inner()'s "x = 30" has no nonlocal/global declaration, so it creates its own separate LOCAL x inside inner() only — outer's (now-global) x is never touched. Both prints show 20.` }
},
{
  id: "closures", tag: "5.9",
  title: `Closures`,
  concept: `When an outer function returns an inner function, that inner function keeps a private, persistent link back to the variables of the specific outer call that created it — this is called a closure. Two separate calls to the same outer function create two completely independent closures, each with its own memory.`,
  keyPoints: [
    `Every single call to outer() creates a brand-new, independent local scope — including a brand-new copy of any variable defined there.`,
    `The inner function "closes over" (captures a live reference to) that specific call's variables — not a snapshot, but the actual variable, which is why it can keep changing across repeated calls to the returned inner function.`,
    `Two different closures built from two different calls to the same outer() NEVER share state, even though they came from identical code.`
  ],
  examples: [
    { code: `def outer():\n    x = []\n    def inner(val):\n        x.append(val)\n        return x\n    return inner\n\nf1 = outer()\nf2 = outer()\nprint(f1(10))\nprint(f1(20))\nprint(f2(30))\nprint(f1(40))`, output: `[10]\n[10, 20]\n[30]\n[10, 20, 40]`, note: `f1 and f2 are two SEPARATE closures — each carries its own private x, created by its own call to outer(). f2(30) has zero effect on f1's list.` },
  ],
  mistakes: [`It's tempting to assume f1 and f2 above share the same x since they came from the exact same outer() function — they don't. Each call to outer() is a fresh invocation with its own local scope, and each returned inner function privately remembers only ITS OWN call's variables.`],
  question: { isPYQ: true, source: "GATE DA 2026 (2 marks, MSQ)", marks: 2, qtype: "MSQ",
    stem: `def outer():\n    x = []\n    def inner(val):\n        x.append(val)\n        return x\n    return inner\n\nf1 = outer()\nf2 = outer()\nprint(f1(10))     # Line P\nprint(f1(20))     # Line Q\nprint(f2(30))     # Line R\nprint(f1(40))     # Line S\n\nSelect all correct statements.`,
    options: [`f1 and f2 share the same list x`, `Output of Line Q is [10, 20]`, `Output of Line R is [10, 20, 30]`, `Output of Line S is [10, 20, 40]`],
    correct: [1, 3],
    explanation: `f1 = outer() and f2 = outer() are two separate calls, so each gets its OWN private x — they do not share state, making the first option false. Line Q is f1's second call: its private list grows to [10, 20]. Line R is f2's FIRST call: since f2 has its own independent list, it starts fresh at [30], not [10,20,30]. Line S is f1's third call: its list continues from where it left off, [10, 20, 40].` }
},
];

const CH6_TOPICS = [
{
  id: "zip-function", tag: "6.1",
  title: `zip()`,
  defaultOpen: true,
  concept: `zip() pairs up corresponding elements from two or more iterables into tuples, positionally — a compact alternative to manual index-based pairing.`,
  keyPoints: [
    `zip(a, b) produces pairs (a[0],b[0]), (a[1],b[1]), ...`,
    `If the iterables have different lengths, zip() stops at the SHORTEST one — silently, no error, no padding.`,
    `zip() returns a lazy zip object — wrap it in list() to see the actual pairs.`,
    `dict(zip(keys, values)) is the standard idiom for building a dictionary from two parallel lists.`
  ],
  examples: [
    { code: `names = ["Alice", "Bob", "Charlie"]\nages = [25, 30, 35]\ncities = ["New York", "London", "Paris"]\nprint(list(zip(names, ages, cities)))`, output: `[('Alice', 25, 'New York'), ('Bob', 30, 'London'), ('Charlie', 35, 'Paris')]` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `a = [1, 2, 3, 4]\nb = ["x", "y"]\nprint(list(zip(a, b)))`,
    options: [`[(1, 'x'), (2, 'y')]`, `[(1,'x'),(2,'y'),(3,None),(4,None)]`, `Error`, `[(1,2,3,4), ('x','y')]`],
    correct: 0,
    explanation: `zip() stops the moment the SHORTER iterable (b, length 2) is exhausted — 3 and 4 from a are simply left unpaired, silently, not padded with None and not an error.` }
},
{
  id: "lambda-functions", tag: "6.2",
  title: `Lambda Functions`,
  concept: `A lambda is a small, anonymous, single-expression function — the same idea as def, but restricted to exactly one expression whose value is automatically returned.`,
  keyPoints: [
    `Syntax: lambda arguments: expression — no def, no name (unless assigned), no return keyword, and no statements — only ONE expression.`,
    `Most often used inline, as a throwaway function passed straight into map/filter/sorted/reduce, rather than being separately named.`
  ],
  examples: [
    { code: `add = lambda a, b: a + b\nprint(add(3, 5))`, output: `8` },
    { code: `print((lambda a, b: a + b)(3, 5))`, output: `8`, note: `A lambda can be called immediately without ever being assigned a name.` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `f = lambda x, y=10: x * y\nprint(f(5), f(5, 2))`,
    options: [`50 10`, `15 7`, `50 100`, `Error`],
    correct: 0,
    explanation: `Lambdas support default arguments exactly like def. f(5) uses the default y=10 → 5*10=50. f(5,2) overrides y with 2 → 5*2=10.` }
},
{
  id: "map-filter", tag: "6.3",
  title: `map() and filter()`,
  concept: `map() TRANSFORMS every element of an iterable using a function; filter() KEEPS only the elements that satisfy a condition. Both are almost always paired with a lambda.`,
  keyPoints: [
    `map(function, iterable) → applies function to every element, returns a map object (wrap in list() to view it).`,
    `filter(function, iterable) → keeps only elements where function(x) is truthy; returns a filter object.`,
    `Neither modifies the original iterable — both produce a brand-new iterator.`
  ],
  examples: [
    { code: `numbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x ** 2, numbers))\nprint(squared)`, output: `[1, 4, 9, 16, 25]` },
    { code: `numbers = [1, 2, 3, 4, 5, 6]\neven = list(filter(lambda x: x % 2 == 0, numbers))\nprint(even)`, output: `[2, 4, 6]` },
  ],
  mistakes: [`Forgetting list() around map()/filter() means you print a "<map object at 0x...>" instead of the actual values — a common source of confusing output on GATE-style questions.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `nums = [1, 2, 3, 4, 5]\nresult = list(map(lambda x: x*2, filter(lambda x: x > 2, nums)))\nprint(result)`,
    options: [`[6, 8, 10]`, `[2, 4, 6, 8, 10]`, `[3, 4, 5]`, `[6, 8]`],
    correct: 0,
    explanation: `filter first keeps only elements > 2, giving [3,4,5]. map then doubles each of those: [6,8,10]. filter and map chain directly, inner feeding outer.` }
},
{
  id: "reduce-function", tag: "6.4",
  title: `reduce()`,
  concept: `reduce() (from functools) cumulatively combines every element of an iterable down to a SINGLE value, applying the given function to a running accumulator and the next element, one at a time.`,
  keyPoints: [
    `from functools import reduce is required — reduce is not a plain built-in in Python 3.`,
    `reduce(function, iterable, initial) — if initial is given, the accumulator starts there; otherwise it starts as the first two elements combined.`,
    `The function must take exactly 2 arguments: (accumulator_so_far, next_element).`
  ],
  examples: [
    { code: `from functools import reduce\ndata = [1, 2, 3, 4, 5]\nresult = reduce(lambda x, y: x - 2*y, data, 10)\nprint(result)`, output: `-20` },
  ],
  dryRun: [
    `Start: accumulator x = 10 (the initial value)`,
    `y=1: x = 10 - 2*1 = 8`,
    `y=2: x = 8 - 2*2 = 4`,
    `y=3: x = 4 - 2*3 = -2`,
    `y=4: x = -2 - 2*4 = -10`,
    `y=5: x = -10 - 2*5 = -20`,
    `Final result: -20`
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `from functools import reduce\nnums = [2, 3, 4]\nprint(reduce(lambda a, b: a * b, nums))`,
    options: [`24`, `9`, `2`, `Error - needs an initial value`],
    correct: 0,
    explanation: `With no initial value given, reduce starts with the first two elements: 2*3=6. Then combines the running result with the next element: 6*4=24.` }
},
{
  id: "recursion-basics", tag: "6.5",
  title: `Recursion Basics`,
  concept: `Recursion is a function calling ITSELF to solve a smaller version of the same problem. Every correct recursive function needs a base condition — without one, it recurses forever until Python's call stack overflows.`,
  keyPoints: [
    `Every recursive call pushes a new "activation record" (stack frame) onto the call stack, holding that call's own local variables and its return address.`,
    `The base condition is the case simple enough to answer directly, with NO further recursive call — it's what stops the recursion and starts the stack "unwinding" back up.`,
    `Missing or unreachable base condition → RecursionError: maximum recursion depth exceeded (Python's version of a stack overflow).`
  ],
  examples: [
    { code: `def A(n):\n    if n == 0:      # base condition\n        return\n    print(n, end=",")\n    A(n - 1)\nA(4)`, output: `4,3,2,1,` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `def fact(n):\n    if n == 0:\n        return 1\n    return n * fact(n - 1)\nprint(fact(5))`,
    options: [`120`, `24`, `60`, `RecursionError`],
    correct: 0,
    explanation: `fact(5)=5*fact(4)=5*4*fact(3)=5*4*3*fact(2)=...=5*4*3*2*1*fact(0)=5*4*3*2*1*1=120. Standard factorial recursion with a clean base case at n==0.` }
},
{
  id: "indirect-nested-recursion", tag: "6.6",
  title: `Indirect & Nested`,
  concept: `Recursion isn't limited to a function calling only itself directly — TWO functions can call each other (mutual recursion), or a recursive call can be fed AS THE ARGUMENT to another recursive call (nested recursion).`,
  keyPoints: [
    `Indirect (mutual) recursion: function A calls function B, which calls function A again, and so on — the recursion loops through more than one function before returning.`,
    `Nested recursion: a recursive call appears literally INSIDE the argument list of another call to the same function, e.g. f(f(n+1)) — famously seen in the McCarthy 91 function.`,
    `Both still absolutely require a reachable base condition somewhere in the chain, exactly like direct recursion.`
  ],
  examples: [
    { code: `def is_even(n):\n    if n == 0:\n        return True\n    return is_odd(n - 1)\ndef is_odd(n):\n    if n == 0:\n        return False\n    return is_even(n - 1)\nprint(is_even(4))`, output: `True`, note: `is_even and is_odd repeatedly call EACH OTHER, each time shrinking n by 1, until n reaches the base case 0.` },
    { code: `def nested(n):\n    if n > 100:\n        return n - 10\n    return nested(nested(n + 11))\nprint(nested(97))`, output: `91` },
  ],
  dryRun: [
    `nested(97): 97>100? No -> return nested(nested(97+11)) = nested(nested(108))`,
    `Innermost first: nested(108): 108>100? Yes -> return 108-10 = 98`,
    `Now need: nested(98): 98>100? No -> nested(nested(98+11)) = nested(nested(109))`,
    `nested(109): 109>100? Yes -> 99.  So nested(98) needs nested(99).`,
    `nested(99): not >100 -> nested(nested(110)).  nested(110): >100 -> 100.  So nested(99) needs nested(100).`,
    `nested(100): not >100 (100 is not > 100) -> nested(nested(111)).  nested(111): >100 -> 101.  nested(101): >100 -> 91.`,
    `So nested(100)=91.  Unwinding: nested(99)=91, nested(98)=91, nested(97)=91.`,
    `Final: nested(97) = 91 — this is the famous "McCarthy 91 function": it always returns exactly 91 for any starting n ≤ 100.`
  ],
  question: { isPYQ: false, source: "GATE-Style (harder than usual)", marks: 2, qtype: "NAT",
    stem: `def nested(n):\n    if n > 100:\n        return n - 10\n    return nested(nested(n + 11))\nprint(nested(88))\n\n# Result = ______`,
    correct: "91",
    explanation: `This is the McCarthy 91 function — a famous recursive function proven to return EXACTLY 91 for every starting value n ≤ 100 (and n-10 directly for n > 100). Tracing it by hand, like the Dry Run above for nested(97), always bottoms out at 91.` }
},
{
  id: "pyq-recursive-list-reversal", tag: "6.7",
  title: `PYQ: List Reversal`,
  concept: `A genuine GATE DA 2024 question testing whether you can recognize what a recursive function DOES just from its structure, without being told in plain English.`,
  keyPoints: [
    `Swapping D[sl] and D[s2], then moving sl forward while s2 moves backward (sl+1, s2-1), is the textbook two-pointer, in-place array-reversal pattern — just written recursively instead of with a while loop.`,
    `Recognizing "this recursive shape = that well-known iterative algorithm" is exactly the skill this question tests.`
  ],
  examples: [],
  dryRun: [
    `D = [1,2,3,4,5], call fun(D, 0, 4)`,
    `sl=0 < s2=4 -> swap D[0],D[4]: D=[5,2,3,4,1] -> recurse fun(D,1,3)`,
    `sl=1 < s2=3 -> swap D[1],D[3]: D=[5,4,3,2,1] -> recurse fun(D,2,2)`,
    `sl=2 < s2=2? No (equal) -> base case, stop.`,
    `Final D = [5,4,3,2,1] — exactly the original list, reversed.`
  ],
  question: { isPYQ: true, source: "GATE DA 2024 (2 marks)", marks: 2, qtype: "MCQ",
    stem: `def fun(D, sl, s2):\n    if sl < s2:\n        D[sl], D[s2] = D[s2], D[sl]\n        fun(D, sl + 1, s2 - 1)\n\n# What does fun() do to the list D, first called as fun(D, 0, len(D)-1)?`,
    options: [`It finds the smallest element in D from index sl to s2, both inclusive.`, `It performs merge sort in-place on D between indices sl and s2.`, `It reverses the list D between indices sl and s2, both inclusive.`, `It removes duplicate elements from D between indices sl and s2.`],
    correct: 2,
    explanation: `Each call swaps the outermost still-unswapped pair, then moves both pointers one step inward and repeats — stopping once they meet or cross. That's exactly the standard two-pointer in-place array-reversal algorithm.` }
},
{
  id: "pyq-recursive-division", tag: "6.8",
  title: `PYQ: Division`,
  concept: `A genuine GATE AI 2025 question hiding a classic Python trap inside a recursion problem: the / operator silently turns integers into floats, and that float quietly rides along through every subsequent recursive call.`,
  keyPoints: [
    `(a-1)/2 uses TRUE division, so even though a starts as a clean int, the result becomes a float from the very first recursive call onward.`,
    `Once a is a float, a % 2 and comparisons like a == 0 still work correctly (Python compares/operates across int and float seamlessly) — the recursion doesn't break, it just quietly carries float values all the way down.`,
    `This combination — recursion plus the int-vs-float behaviour of / — is exactly the kind of cross-topic question GATE likes to build.`
  ],
  examples: [],
  dryRun: [
    `f(15, 10): 15 is odd -> return 2 * f((15-1)/2, 10) = 2 * f(7.0, 10)   [/ always gives a float]`,
    `f(7.0, 10): not 0. 7.0 % 2 = 1.0, and 1.0==1 is True -> return 2 * f((7.0-1)/2, 10) = 2 * f(3.0, 10)`,
    `f(3.0, 10): odd -> return 2 * f((3.0-1)/2, 10) = 2 * f(1.0, 10)`,
    `f(1.0, 10): odd -> return 2 * f((1.0-1)/2, 10) = 2 * f(0.0, 10)`,
    `f(0.0, 10): a==0? 0.0==0 is True -> return b = 10`,
    `Unwind: f(1.0,10)=2*10=20.  f(3.0,10)=2*20=40.  f(7.0,10)=2*40=80.  f(15,10)=2*80=160.`
  ],
  question: { isPYQ: true, source: "GATE AI 2025 (2 marks)", marks: 2, qtype: "NAT",
    stem: `def f(a, b):\n    if a == 0:\n        return b\n    if a % 2 == 1:\n        return 2 * f((a - 1) / 2, b)\n    return b + f(a - 1, b)\nprint(f(15, 10))\n\n# Result = ______`,
    correct: "160",
    explanation: `Trace it fully in the Dry Run above. Every step happens to hit the "a is odd" branch, doubling the result each time, until a finally reaches 0.0 and returns b=10. Unwinding the five doublings: 10 → 20 → 40 → 80 → 160.` }
},
{
  id: "pyq-counting-recursive-calls", tag: "6.9",
  title: `PYQ: Counting Calls`,
  concept: `Every recursion question so far has asked "what value does this return?" This one asks something fundamentally harder: "how many TIMES does this function get called in total?" — i.e. how many stack frames get pushed before mystery(4) finishes. This requires building a completely separate recurrence just to count activations, not values, and it's one of the hardest, most GATE-above-level recursion skills there is.`,
  keyPoints: [
    `Define C(n) = total number of calls needed to fully compute mystery(n), including the call itself.`,
    `Every base case contributes exactly 1 call: C(n) = 1 whenever n ≤ 0.`,
    `Every non-base call contributes itself PLUS every call its own two recursive branches trigger: C(n) = 1 + C(n-1) + C(n-2).`,
    `Notice this "counting" recurrence has the exact same Fibonacci-like SHAPE as the original function — you solve it the same way, bottom-up, just tracking a different quantity.`,
    `Don't confuse this with the function's return VALUE — mystery(4) returns 8, but takes 15 total calls to get there. Same code, two different questions, two different recurrences.`
  ],
  examples: [
    { code: `def mystery(n):\n    if n <= 0:\n        return 1\n    return mystery(n - 1) + mystery(n - 2)\n\nprint(mystery(4))`, output: `8`, note: `This is the VALUE mystery(4) returns — a completely separate question from how many times mystery() was called along the way.` },
  ],
  dryRun: [
    `Let C(n) = total calls to compute mystery(n), including the call itself.`,
    `Base cases (n ≤ 0): C(0) = 1 and C(-1) = 1 — each is just a single call with no further recursion.`,
    `C(1) = 1 + C(0) + C(-1) = 1 + 1 + 1 = 3`,
    `C(2) = 1 + C(1) + C(0) = 1 + 3 + 1 = 5`,
    `C(3) = 1 + C(2) + C(1) = 1 + 5 + 3 = 9`,
    `C(4) = 1 + C(3) + C(2) = 1 + 9 + 5 = 15`,
    `So mystery(4) triggers 15 total function-call activations on the stack — even though it only returns the single value 8.`
  ],
  mistakes: [`It's tempting to just compute mystery(4)'s return value (8) and stop — but the question asks for the CALL COUNT, a different recurrence entirely. Always re-read exactly what's being asked: value, call count, or recursion depth are three different things.`],
  question: { isPYQ: true, source: "GATE DA 2026 (2 marks)", marks: 2, qtype: "MCQ",
    stem: `def mystery(n):\n    if n <= 0:\n        return 1\n    return mystery(n - 1) + mystery(n - 2)\n\nmystery(4)\n\n# Assume a typical runtime stack manages function calls: each call is pushed onto the stack and removed only after it finishes execution.\n# What is the total number of function calls (stack activations), including the initial call, to compute mystery(4)?`,
    options: [`5`, `9`, `15`, `17`],
    correct: 2,
    explanation: `This asks for the SIZE of the recursion tree, not the return value. Let C(n) be the number of calls needed for mystery(n): C(n)=1 for every base case (n≤0), and C(n)=1+C(n-1)+C(n-2) otherwise. Working bottom-up (see Dry Run above): C(0)=C(-1)=1, C(1)=3, C(2)=5, C(3)=9, C(4)=15.` }
},
{
  id: "recursion-hanoi-counting", tag: "6.10",
  title: `Hanoi Recursion`,
  concept: `A second call-counting problem, on the single most famous recursive algorithm in computer science — reinforcing the exact skill from the previous topic on a shape GATE reuses constantly: two EQUAL-sized recursive calls per level, instead of two shrinking-by-different-amounts calls.`,
  keyPoints: [
    `Tower of Hanoi moves n disks by recursively moving the top n-1 disks out of the way, moving the largest disk, then recursively moving those n-1 disks back — two recursive calls of size n-1 at every level.`,
    `Call-counting recurrence: C(0) = 1 (base case, just itself). For n > 0: C(n) = 1 + C(n-1) + C(n-1) = 1 + 2·C(n-1) — one call for itself, plus two full copies of the (n-1) subtree.`,
    `This solves in closed form to C(n) = 2^(n+1) − 1, closely mirroring Hanoi's famous "2^n − 1 total disk moves" result — the extra call at each level is exactly why the exponent is one higher.`
  ],
  examples: [
    { code: `def hanoi(n, src, dst, aux):\n    if n == 0:\n        return\n    hanoi(n - 1, src, aux, dst)\n    hanoi(n - 1, aux, dst, src)\n\nhanoi(4, "A", "C", "B")`, output: undefined },
  ],
  dryRun: [
    `Let C(n) = total calls to hanoi() to move n disks, including the initial call.`,
    `Base case: C(0) = 1 (the call itself does nothing further).`,
    `Recursive case: C(n) = 1 (this call) + C(n-1) (first recursive call) + C(n-1) (second recursive call) = 1 + 2·C(n-1)`,
    `C(0) = 1`,
    `C(1) = 1 + 2×1 = 3`,
    `C(2) = 1 + 2×3 = 7`,
    `C(3) = 1 + 2×7 = 15`,
    `C(4) = 1 + 2×15 = 31`,
    `Pattern check: C(n) = 2^(n+1) − 1. For n=4: 2^5 − 1 = 31. Matches!`
  ],
  question: { isPYQ: false, source: "GATE-Style (above GATE level)", marks: 2, qtype: "NAT",
    stem: `def hanoi(n, src, dst, aux):\n    if n == 0:\n        return\n    hanoi(n - 1, src, aux, dst)\n    hanoi(n - 1, aux, dst, src)\n\nhanoi(5, "A", "C", "B")\n\n# Including the initial call, the total number of times hanoi() is called is ______`,
    correct: "63",
    explanation: `Using C(n) = 1 + 2·C(n-1) with C(0)=1: C(1)=3, C(2)=7, C(3)=15, C(4)=31, C(5)=63. In closed form, C(n) = 2^(n+1) − 1, and 2^6 − 1 = 63.` }
},
{
  id: "recursion-permutations", tag: "6.11",
  title: `Permutation Recursion`,
  concept: `A classic, GATE-favourite recursive pattern: peel off one character at a time as the "next chosen character," and recursively permute whatever remains — the recursion tree naturally generates every possible ordering.`,
  keyPoints: [
    `At each call, try EVERY remaining character as the next one, recursing on what's left after removing exactly that character.`,
    `Base case: once nothing remains to choose from, a complete permutation has been built — print it.`,
    `For a string of length n, this always generates exactly n! permutations, since the branching factor shrinks by exactly 1 at each successive level (n choices, then n-1, then n-2, ...).`
  ],
  examples: [
    { code: `def permute(s, chosen=""):\n    if len(s) == 0:\n        print(chosen)\n        return\n    for i in range(len(s)):\n        permute(s[:i] + s[i+1:], chosen + s[i])\n\npermute("AB")`, output: `AB\nBA` },
  ],
  dryRun: [
    `permute('AB', ''): loop tries i=0 then i=1`,
    `  i=0: remove 'A' -> permute('B', 'A')`,
    `    loop tries i=0: remove 'B' -> permute('', 'AB')`,
    `      len('')==0 -> print('AB')`,
    `  i=1: remove 'B' -> permute('A', 'B')`,
    `    loop tries i=0: remove 'A' -> permute('', 'BA')`,
    `      len('')==0 -> print('BA')`,
    `Final printed output, in order: AB then BA`
  ],
  question: { isPYQ: false, source: "GATE-Style (harder than usual)", marks: 2, qtype: "NAT",
    stem: `def permute(s, chosen=""):\n    if len(s) == 0:\n        print(chosen)\n        return\n    for i in range(len(s)):\n        permute(s[:i] + s[i+1:], chosen + s[i])\n\npermute("ABC")\n\n# How many lines does this print in total?`,
    correct: "6",
    explanation: `This recursion generates every permutation of the input string — for a string of length n, that's n! permutations. "ABC" has length 3, so it prints 3! = 6 lines total (ABC, ACB, BAC, BCA, CAB, CBA, in that order).` }
},
];

const CH7_TOPICS = [
{
  id: "classes-objects", tag: "7.1",
  title: `Classes & Objects`,
  defaultOpen: true,
  concept: `A class is a blueprint describing what data (attributes) and behaviour (methods) its instances will have; an object is one concrete instance built from that blueprint.`,
  keyPoints: [
    `class ClassName: introduces a new class — everything indented underneath belongs to its body.`,
    `An object (instance) is created by "calling" the class like a function: obj = ClassName(...).`,
    `Vocabulary: Class = the blueprint/template. Object = one instance built from it. Attribute = a piece of data belonging to an object (a variable). Method = a function belonging to a class, defining behaviour for its objects.`
  ],
  examples: [
    { code: `class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    def display(self):\n        print(f"Name: {self.name}, Age: {self.age}")\n\np1 = Person("Alice", 20)\np1.display()`, output: `Name: Alice, Age: 20` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `Which term correctly describes "display" in the Person class above?`,
    options: [`Method`, `Attribute`, `Object`, `Constructor`],
    correct: 0,
    explanation: `display is a function defined inside the class, describing behaviour available to every Person object — that makes it a method. name/age would be the attributes; p1 is the object; __init__ specifically is the constructor.` }
},
{
  id: "init-constructor-self", tag: "7.2",
  title: `__init__ & self`,
  concept: `__init__ is a special method Python calls AUTOMATICALLY every time a new object is created — its job is to initialize that object's attributes. self refers to "this particular object" inside every method.`,
  keyPoints: [
    `__init__(self, ...) runs automatically the instant ClassName(...) is called — you never call __init__ yourself.`,
    `self is always the FIRST parameter of every instance method (by strong convention named "self") — Python passes the object itself into it automatically; you never supply it explicitly when calling.`,
    `self.attribute_name = value inside __init__ is how each object gets its own independent copy of that data.`,
    `Two objects of the same class have their OWN separate attribute values — changing one never affects the other.`
  ],
  examples: [
    { code: `class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np1 = Person("Alice", 20)\np2 = Person("Bob", 22)\np1.name = "Alicia"\nprint(p1.name, p2.name)`, output: `Alicia Bob`, note: `Changing p1's name has zero effect on p2 — each object keeps its own independent attributes.` },
  ],
  mistakes: [`Forgetting self as a method's first parameter is one of the most common beginner OOP errors — it raises TypeError: method() takes 0 positional arguments but 1 was given, because Python always silently passes the object itself as that first argument.`],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `class Car:\n    def __init__(self, brand, year):\n        self.brand = brand\n        self.year = year\nc1 = Car("Toyota", 2022)\nc2 = Car("Honda", 2021)\nprint(c1.brand, c2.year)`,
    options: [`Toyota 2021`, `Toyota 2022`, `Honda 2021`, `Error`],
    correct: 0,
    explanation: `c1.brand reads c1's own brand attribute, "Toyota". c2.year reads c2's own year attribute, 2021 — each object's __init__ call set up its own independent data.` }
},
{
  id: "attributes-methods-practice", tag: "7.3",
  title: `Attributes & Methods`,
  concept: `Putting it all together — a realistic class with several attributes and a method that uses them, exactly the shape GATE-style OOP questions favour.`,
  keyPoints: [
    `A method can freely use any of self's attributes to compute or print something — that's the entire point of bundling data (attributes) with behaviour (methods) in one class.`,
    `You can create as many independent objects from one class as you like — each call to ClassName(...) builds a brand-new, separate object.`
  ],
  examples: [
    { code: `class DA_Student:\n    def __init__(self, name, roll_no, score):\n        self.name = name\n        self.roll_no = roll_no\n        self.score = score\n    def display_info(self):\n        print(f"Name: {self.name}, Roll No: {self.roll_no}, Score: {self.score}")\n\ns1 = DA_Student("Amit Kumar", "DA2026", 89.6)\ns1.display_info()`, output: `Name: Amit Kumar, Roll No: DA2026, Score: 89.6` },
  ],
  question: { isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ",
    stem: `class Counter:\n    def __init__(self):\n        self.count = 0\n    def increment(self):\n        self.count += 1\nc = Counter()\nc.increment()\nc.increment()\nc.increment()\nprint(c.count)`,
    options: [`3`, `1`, `0`, `Error`],
    correct: 0,
    explanation: `Each call to increment() adds 1 to THIS object's own self.count, which persists between method calls on the same object c. Three calls: count goes 0 → 1 → 2 → 3.` }
},
];

const CHAPTERS = [
  { id: "ch1", num: "01", title: "Python Core Fundamentals", subtitle: "print(), the memory model, data types & every core operator family", topics: CH1_TOPICS },
  { id: "ch2", num: "02", title: "Strings in Depth", subtitle: "Indexing, slicing, every major string method & the tricks GATE builds from them", topics: CH2_TOPICS },
  { id: "ch3", num: "03", title: "Operators Continued, Conversion & Control Flow", subtitle: "Assignment / membership / identity operators, type conversion, input(), conditionals & loops", topics: CH3_TOPICS },
  { id: "ch4", num: "04", title: "Set & Dictionary Methods In Depth", subtitle: "Every core set and dict method, set mathematics, and the full container comparison", topics: CH4_TOPICS },
  { id: "ch5", num: "05", title: "Functions & Scope", subtitle: "Parameters, arguments, *args/**kwargs, default-argument traps, global/nonlocal scoping, and closures", topics: CH5_TOPICS },
  { id: "ch6", num: "06", title: "Functional Tools & Recursion", subtitle: "zip, lambda, map/filter/reduce, and recursion — five real GATE PYQs solved step by step, plus complex call-counting problems", topics: CH6_TOPICS },
  { id: "ch7", num: "07", title: "Object-Oriented Programming Basics", subtitle: "Classes, objects, the __init__ constructor, self, attributes & methods", topics: CH7_TOPICS },
];

const QUIZZES = [
  { id: "quiz1", title: "Quiz 1 — Fundamentals Check", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(type(True), type(True + 1))`, options: [`<class 'bool'> <class 'int'>`, `<class 'bool'> <class 'bool'>`, `<class 'int'> <class 'int'>`, `Error`], correct: 0, explanation: `True itself is of type bool. But True+1 performs arithmetic (True acts as 1) and the RESULT of that arithmetic is a plain int, not bool.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `a = 5\nb = 5\nc = 500\nd = 500\nprint(a is b, c is d)`, options: [`True True`, `True False`, `False True`, `False False`], correct: 1, explanation: `5 is inside the cached range [-5,256] so a and b share the same object → True. 500 is outside the cache, so c and d are separate objects → False.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MSQ", stem: `Which of these are valid Python identifiers?`, options: [`_score`, `2ndTry`, `marks_2026`, `class`], correct: [0, 2], explanation: `_score is valid (may start with underscore). 2ndTry is INVALID — identifiers can never start with a digit. marks_2026 is valid. class is a reserved keyword, so it can never be used as an identifier.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(1, 2, sep="-", end="*")\nprint(3)`, options: [`1-2*3`, `1-2*\n3`, `1 2*3`, `1-2\n3`], correct: 0, explanation: `sep="-" joins the first call's args as "1-2". end="*" replaces its trailing newline with "*", so the second print's "3" lands right after on the same line: "1-2*3".` },
    { id: "q5", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(type(10/2), type(10//2), type(10.0//2))`, options: [`float int float`, `int int float`, `float float float`, `int float float`], correct: 0, explanation: `/ always returns float regardless of operand types. // keeps int when BOTH operands are int (10//2). // becomes float the instant either operand is float (10.0//2).` },
  ]},
  { id: "quiz2", title: "Quiz 2 — print() sep & end Mastery", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print("a","b","c",sep="",end="")\nprint("d")`, options: [`abcd`, `a b c d`, `abc d`, `abc\nd`], correct: 0, explanation: `sep="" removes any gap between a,b,c → "abc". end="" removes the trailing newline, so the next print's "d" glues directly on → "abcd".` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(5, 10, sep=",")`, options: [`5,10`, `5, 10`, `5 10`, `(5,10)`], correct: 0, explanation: `sep="," inserts a literal comma with no space between the two values.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print("x", "y", end=1)`, options: [`x y1`, `x1y1`, `TypeError: end must be None or a string, not int`, `x y`], correct: 2, explanation: `Just like sep, the end parameter must be None or a string. Passing an int raises a TypeError before anything is printed.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(1,2,3, sep="\\n", end="")\nprint(4)`, options: [`1\n2\n34`, `1 2 3 4`, `1\n2\n3\n4`, `1234`], correct: 0, explanation: `sep="\\n" puts each of 1,2,3 on its own line. end="" removes the trailing newline after 3, so the next print's "4" attaches right onto that final line.` },
  ]},
  { id: "quiz3", title: "Quiz 3 — Collections Deep-Check", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `a = [10,20,30,40,50]\nprint(a[1:4], a[-1], a[::-1])`, options: [`[20, 30, 40] 50 [50, 40, 30, 20, 10]`, `[20,30,40,50] 50 [10,20,30,40,50]`, `[10,20,30] 40 [50,40,30,20,10]`, `[20,30] 50 [50,40,30,20,10]`], correct: 0, explanation: `a[1:4] takes indices 1,2,3 → [20,30,40]. a[-1] is the last element, 50. a[::-1] reverses the entire list.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 2, qtype: "MCQ", stem: `t = (1, [2, 3])\nt[1].append(4)\nprint(t)`, options: [`(1, [2, 3, 4])`, `TypeError`, `(1, [2, 3])`, `(1, 4)`], correct: 0, explanation: `t itself is immutable — you can't reassign t[0] or t[1]. But t[1] IS a list, and lists are mutable, so modifying its contents in place (append) is completely legal. Tuple immutability only protects the references it holds, not what those references point to.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `a = {1,2,3,4}\nb = {3,4,5,6}\nprint(a & b, a | b, a - b, a ^ b)`, options: [`{3,4} {1,2,3,4,5,6} {1,2} {1,2,5,6}`, `{3,4} {1,2,3,4,5,6} {1,2} {3,4}`, `{1,2} {1,2,3,4,5,6} {3,4} {1,2,5,6}`, `{3,4} {3,4} {1,2} {1,2,5,6}`], correct: 0, explanation: `& is intersection {3,4}. | is union {1,2,3,4,5,6}. a-b keeps elements in a but not b: {1,2}. ^ (symmetric difference) keeps elements in exactly one of the two: {1,2,5,6}.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `d = {"a":1, "b":2}\nd["c"] = 3\nd["a"] = 100\nprint(d)`, options: [`{'a': 100, 'b': 2, 'c': 3}`, `{'a': 1, 'b': 2, 'c': 3, 'a': 100}`, `Error - key already exists`, `{'c':3,'a':100,'b':2}`], correct: 0, explanation: `Assigning to a NEW key ("c") adds it at the end. Assigning to an EXISTING key ("a") just updates its value in place — its original insertion position is preserved.` },
    { id: "q5", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `fs = frozenset([1,2,3])\nprint(1 in fs, len(fs))\nb = bytes([65,66,67])\nprint(b)`, options: [`True 3 b'ABC'`, `True 3 [65,66,67]`, `False 3 b'ABC'`, `True 3 'ABC'`], correct: 0, explanation: `Membership and len() work on frozenset just like a regular set. bytes([65,66,67]) treats each number as an ASCII code point and displays printable ones as characters: 65,66,67 → 'A','B','C' → b'ABC'.` },
    { id: "q6", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "MSQ", stem: `Which of these correctly create an EMPTY set (not a dict, not anything else)?`, options: [`s = {}`, `s = set()`, `s = frozenset()`, `s = {1,2}.difference({1,2})`], correct: [1, 3], explanation: `{} is always an empty DICT, never a set — the classic trap. set() correctly builds an empty set. frozenset() builds an empty FROZENSET — a different, immutable type. {1,2}.difference({1,2}) evaluates to an empty set object at runtime, so it also qualifies.` },
  ]},
  { id: "quiz4", title: "Quiz 4 — Arithmetic, Modulus & Precedence", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(17 % 5, -17 % -5)`, options: [`2 -2`, `2 2`, `-2 -2`, `-2 2`], correct: 0, explanation: `17%5: 17//5=3, 17-5*3=2. -17%-5: -17//-5=floor(3.4)=3, -17-(-5*3)=-17+15=-2.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(3 + 2 * 5 ** 2 // 5 - 1)`, options: [`12`, `24`, `27`, `126`], correct: 0, explanation: `** first: 5**2=25. Then scan */,// left-to-right: 2*25=50, 50//5=10. Then scan +,- left-to-right: 3+10=13, 13-1=12.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(2 ** 2 ** 3)`, options: [`256`, `64`, `512`, `128`], correct: 0, explanation: `** is right-to-left associative: this is 2 ** (2**3) = 2**8 = 256, NOT (2**2)**3 = 64.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(7.5 % 2)`, options: [`1.5`, `1`, `3.5`, `0.5`], correct: 0, explanation: `% works on floats too, same formula a%b = a-b*(a//b). 7.5//2 = 3.0 (floor of 3.75), so 7.5 - 2*3.0 = 1.5.` },
    { id: "q5", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "NAT", stem: `Evaluate: -3 ** 2 + 4 * 2 // 3\n\n# Result = ______`, correct: "-7", explanation: `** binds tighter than unary minus: -3**2 = -(3**2) = -9. Then 4*2=8, 8//3=2 (floor). Sum: -9 + 2 = -7.` },
  ]},
  { id: "quiz5", title: "Quiz 5 — Relational, Logical & Short-Circuit", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(5 != 5 != 5)`, options: [`False`, `True`, `Error`, `None`], correct: 0, explanation: `Chained: (5!=5) and (5!=5) = False and False = False.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(bool([]), bool([0]), bool(""), bool("0"))`, options: [`False True False True`, `True True True True`, `False False False False`, `False True True True`], correct: 0, explanation: `[] is an empty list → falsy. [0] is a NON-empty list (contains one element) → truthy, regardless of that element's own value. "" is falsy. "0" is a non-empty string → truthy.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `a = 5\nb = 0\nprint(a and b or a)`, options: [`5`, `0`, `False`, `True`], correct: 0, explanation: `and binds tighter than or: (a and b) or a = (5 and 0) or 5 = 0 or 5 = 5, since 0 is falsy so or falls through to the next operand.` },
    { id: "q4", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "MSQ", stem: `Select all expressions that evaluate to True.`, options: [`not not 5`, `5 == 5.0`, `(1,2) == [1,2]`, `10 >= 10 >= 10`], correct: [0, 1, 3], explanation: `not 5 is False, not False is True. 5==5.0 is True — Python compares numeric value across int/float. A tuple is never == a list, regardless of contents → False. Chained: (10>=10) and (10>=10) = True.` },
    { id: "q5", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(not (5 > 3 and 2 > 4))`, options: [`True`, `False`, `Error`, `None`], correct: 0, explanation: `5>3 is True, 2>4 is False. True and False = False. not False = True.` },
  ]},
  { id: "quiz6", title: "Quiz 6 — Bitwise Operators", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(6 & 3, 6 | 3, 6 ^ 3)`, options: [`2 7 5`, `2 7 7`, `0 7 5`, `2 6 5`], correct: 0, explanation: `6=0110, 3=0011. AND=0010=2. OR=0111=7. XOR=0101=5.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(~0, ~1, ~-1)`, options: [`-1 -2 0`, `0 -2 0`, `-1 -1 0`, `-1 -2 -1`], correct: 0, explanation: `~x = -(x+1) always. ~0 = -(0+1) = -1. ~1 = -(1+1) = -2. ~-1 = -(-1+1) = -0 = 0.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `x = 3\nprint(x << 4, x >> 1)`, options: [`48 1`, `12 1`, `48 2`, `24 1`], correct: 0, explanation: `x<<4 = 3*2**4 = 48. x>>1 = 3//2**1 = 3//2 = 1.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(True & False, True | False, True ^ True)`, options: [`False True False`, `0 1 0`, `False True True`, `True False False`], correct: 0, explanation: `Bitwise operators work on bool too (bool is a subtype of int: True=1, False=0), and the result displays as bool when both operands were bool.` },
    { id: "q5", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "MCQ", stem: `def is_power_of_two(n):\n    return n > 0 and (n & (n - 1)) == 0\nprint(is_power_of_two(16), is_power_of_two(18))`, options: [`True False`, `False True`, `True True`, `False False`], correct: 0, explanation: `A power of 2 has exactly one bit set (16=10000). n-1 flips that bit and sets every bit below it (15=01111), so n & (n-1) is 0 only for true powers of 2. 16&15=0 → True. 18=10010, 17=10001, 18&17=10000≠0 → False.` },
  ]},
  { id: "quiz7", title: "Quiz 7 — Strings", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `s = "Data Science"\nprint(s[:4], s[5:], len(s))`, options: [`Data Science 12`, `Data cience 12`, `Data Science 11`, `Dat Science 12`], correct: 0, explanation: `s[:4] → "Data" (indices 0-3). s[5:] → "Science" (index 4 is the space). len() counts all 12 characters including the space.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print("  GATE  ".strip().lower().replace("gate","GATE 2026"))`, options: [`GATE 2026`, `  gate  `, `gate 2026`, `GATE  2026`], correct: 0, explanation: `strip() → "GATE". lower() → "gate". replace("gate","GATE 2026") → "GATE 2026". Methods chain left to right, each acting on the previous result.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print("mississippi".count("ss"), "mississippi".find("ss"))`, options: [`2 2`, `4 2`, `2 5`, `1 2`], correct: 0, explanation: `"mississippi": "ss" (non-overlapping) appears at index 2 and again at index 5 → count=2. find() reports the first occurrence → index 2.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print("2026".isdigit(), "GATE".isalpha(), "GATE2026".isalnum(), "gate da".istitle())`, options: [`True True True False`, `True True True True`, `False True True False`, `True False True False`], correct: 0, explanation: `"2026" all digits → True. "GATE" all letters → True. "GATE2026" letters+digits → True. "gate da" is all lowercase, not Title Case → istitle() is False.` },
    { id: "q5", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print("-".join(["2","0","2","6"]), "20-26".split("-"))`, options: [`2-0-2-6 ['20', '26']`, `2026 ['20-26']`, `2-0-2-6 ['20-26']`, `20-26 ['2','0','2','6']`], correct: 0, explanation: `join glues the list elements with "-" between them → "2-0-2-6". split("-") breaks the string at each "-" → ['20','26'].` },
    { id: "q6", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "MSQ", stem: `s = "python"\nSelect all TRUE statements.`, options: [`s.upper() == "PYTHON"`, `s is now "PYTHON" after calling s.upper()`, `s[0] == "p"`, `s + str(26) == "python26"`], correct: [0, 2, 3], explanation: `s.upper() correctly RETURNS "PYTHON" (True for the comparison) but does NOT change s itself, since strings are immutable — option B is False. s[0] is indeed "p". String + str(26) gives "python26".` },
  ]},
  { id: "quiz8", title: "Quiz 8 — Assignment, Membership, Identity, Conversion & Control Flow", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `a = 10\nb = a\na += 5\nprint(a, b)`, options: [`15 10`, `15 15`, `10 15`, `10 10`], correct: 0, explanation: `a += 5 on an int rebinds a to a NEW object (15), since ints are immutable — b still points to the original 10, untouched.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print("py" in "python", "PY" in "python", 5 in range(1,10))`, options: [`True False True`, `True True True`, `False False True`, `True False False`], correct: 0, explanation: `Membership checks on strings are case-sensitive: "py" in "python" is True, "PY" is absent → False. range(1,10) is 1..9, and 5 falls in that span → True.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `x = 10.0\ny = 10\nprint(x == y, x is y)`, options: [`True False`, `True True`, `False False`, `False True`], correct: 0, explanation: `== compares VALUE — 10.0 and 10 are numerically equal → True. is compares IDENTITY — a float object and an int object are never the same object → False.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `print(bool("False"), int("0"), int(bool("")))`, options: [`True 0 0`, `False 0 0`, `True 0 1`, `False 1 0`], correct: 0, explanation: `bool("False") is True — ANY non-empty string is truthy, regardless of its content, even the string "False" itself. int("0") is simply 0. bool("") is False, and int(False) is 0.` },
    { id: "q5", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `for i in range(3):\n    for j in range(2):\n        if j == 1:\n            continue\n        print(i, j)`, options: [`0 0\n1 0\n2 0`, `0 0\n0 1\n1 0\n1 1\n2 0\n2 1`, `0 0\n1 1\n2 0`, `(nothing)`], correct: 0, explanation: `For every i (0,1,2), the inner loop tries j=0 then j=1. j==1 always triggers continue, skipping its print — only j=0 ever reaches print(). Result: one line per outer iteration.` },
    { id: "q6", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "NAT", stem: `count = 0\nfor i in range(1, 6):\n    if i % 2 == 0:\n        continue\n    for j in range(i):\n        count += 1\nprint(count)\n\n# Result = ______`, correct: "9", explanation: `i runs 1..5; only odd i survive the continue: 1, 3, 5 (2 and 4 skipped). The inner loop adds i to count each time (it runs exactly i times): 1+3+5 = 9.` },
  ]},
  { id: "quiz9", title: "Quiz 9 — Set & Dictionary Methods", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `S = {1,2,3}\nS.update([4,5], {6,7})\nprint(len(S))`, options: [`7`, `5`, `3`, `Error`], correct: 0, explanation: `update() accepts multiple iterable arguments in one call — it adds every element from both [4,5] and {6,7}, giving {1,2,3,4,5,6,7}, length 7.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `a = {1,2,3}\nb = {2,3,4}\nprint(a.symmetric_difference(b))`, options: [`{1, 4}`, `{2, 3}`, `{1,2,3,4}`, `{1,2,3}`], correct: 0, explanation: `symmetric_difference returns elements present in exactly ONE of the two sets: 1 (only in a) and 4 (only in b) — the shared 2,3 are excluded.` },
    { id: "q3", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "MCQ", stem: `d = dict.fromkeys(["x","y","z"], [])\nd["x"].append(1)\nprint(d)`, options: [`{'x': [1], 'y': [1], 'z': [1]}`, `{'x': [1], 'y': [], 'z': []}`, `{'x': [], 'y': [], 'z': []}`, `Error`], correct: 0, explanation: `fromkeys(keys, value) reuses the exact SAME object as the value for every key when that value is mutable — so all three keys secretly point at the SAME list. Appending via d["x"] shows up under every key.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `d = {"a":1,"b":2,"c":3}\ndel d["b"]\nprint(d.get("b", "not found"), list(d.keys()))`, options: [`not found ['a', 'c']`, `2 ['a','b','c']`, `Error`, `None ['a','c']`], correct: 0, explanation: `del d["b"] removes that key entirely. get() with a fallback avoids KeyError and returns "not found" for the now-missing key. keys() reflects only what remains, in original order.` },
    { id: "q5", isPYQ: false, source: "Practice", marks: 1, qtype: "MSQ", stem: `Which pairs correctly match method to behaviour?`, options: [`pop(key) — removes AND returns the value`, `popitem() — removes and returns the FIRST inserted pair`, `clear() — empties the dict but keeps the variable usable`, `get(key) — raises KeyError if key is missing`], correct: [0, 2], explanation: `pop(key) does remove and return the value — correct. popitem() removes the LAST inserted pair (LIFO), not the first — incorrect. clear() empties in place, d itself stays valid — correct. get() NEVER raises KeyError, that's its whole purpose — incorrect.` },
  ]},
  { id: "quiz10", title: "Quiz 10 — Functions, Parameters & Scope", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `def f(a, b=5, *args, **kwargs):\n    print(a, b, args, kwargs)\nf(1, 2, 3, 4, x=10)`, options: [`1 2 (3, 4) {'x': 10}`, `1 2 [3,4] {'x':10}`, `1 5 (2,3,4) {'x':10}`, `Error`], correct: 0, explanation: `a=1 (1st positional), b=2 (overrides default, 2nd positional). Remaining positional args 3,4 fall into *args as a tuple. The keyword x=10 falls into **kwargs as a dict.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `x = 5\ndef f():\n    print(x)\n    x = 10\nf()`, options: [`UnboundLocalError`, `5`, `10`, `None`], correct: 0, explanation: `Because x is assigned somewhere inside f() (x=10), Python treats x as local for the function's ENTIRE body, including the print(x) line before that assignment. Reading a local variable before it's assigned raises UnboundLocalError.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 2, qtype: "MCQ", stem: `def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x += 1\n        return x\n    return inner() + inner()\nprint(outer())`, options: [`5`, `4`, `2`, `3`], correct: 0, explanation: `Each call to inner() increments the SAME shared x (thanks to nonlocal) and returns it: first call -> x becomes 2, returns 2. Second call -> x becomes 3, returns 3. Sum: 2+3=5.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `def show(a, b, /, c):\n    print(a, b, c)\nWhich call raises a TypeError?`, options: [`show(1, 2, 3)`, `show(1, 2, c=3)`, `show(a=1, b=2, c=3)`, `show(5, 10, c=15)`], correct: 2, explanation: `a and b sit before the / marker, making them positional-only — they can never be passed by keyword. show(a=1, b=2, c=3) tries to pass both as keywords, which is invalid.` },
    { id: "q5", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `def make_multiplier(n):\n    def multiplier(x):\n        return x * n\n    return multiplier\ntimes3 = make_multiplier(3)\nprint(times3(10))`, options: [`30`, `13`, `3`, `Error`], correct: 0, explanation: `make_multiplier(3) returns the inner function multiplier, which "remembers" n=3 from its enclosing scope (a closure) even after make_multiplier has finished. times3(10) computes 10*3=30.` },
    { id: "q6", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "NAT", stem: `count = 0\ndef increment():\n    global count\n    count += 1\n    return count\nresults = [increment() for _ in range(4)]\nprint(sum(results))\n\n# Result = ______`, correct: "10", explanation: `Each call to increment() bumps the shared global count by 1 and returns the new value: the four calls return 1, 2, 3, 4. sum([1,2,3,4]) = 10.` },
  ]},
  { id: "quiz11", title: "Quiz 11 — Lambda, map/filter/reduce & Recursion", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `nums = [5, 3, 8, 1, 9]\nprint(sorted(nums, key=lambda x: -x))`, options: [`[9, 8, 5, 3, 1]`, `[1, 3, 5, 8, 9]`, `[5, 3, 8, 1, 9]`, `Error`], correct: 0, explanation: `key=lambda x: -x sorts by each element's NEGATION — the largest original value gets the smallest key, so it sorts first. Net effect: descending order.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `words = ["apple", "hi", "banana", "ok"]\nprint(list(filter(lambda w: len(w) > 2, words)))`, options: [`['apple', 'banana']`, `['hi', 'ok']`, `['apple','hi','banana','ok']`, `[]`], correct: 0, explanation: `filter keeps only words whose length is strictly greater than 2 — "apple"(5) and "banana"(6) qualify; "hi"(2) and "ok"(2) don't.` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `from functools import reduce\nprint(reduce(lambda a,b: a if a>b else b, [3,7,2,9,4]))`, options: [`9`, `4`, `25`, `Error`], correct: 0, explanation: `This reduce pattern keeps whichever of the two arguments is larger at every step — it's manually reimplementing max(). Across [3,7,2,9,4], the largest value is 9.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `def f(n):\n    if n <= 1:\n        return n\n    return f(n-1) + f(n-2)\nprint(f(6))`, options: [`8`, `13`, `5`, `21`], correct: 0, explanation: `This is Fibonacci recursion: f(0)=0,f(1)=1,f(2)=1,f(3)=2,f(4)=3,f(5)=5,f(6)=8.` },
    { id: "q5", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "MSQ", stem: `Select all TRUE statements about map(), filter(), and lambda.`, options: [`map() can take more than one iterable if the lambda accepts multiple arguments.`, `filter() can modify the values it keeps.`, `A lambda body can contain a return statement.`, `list(map(lambda x: x, [])) returns []`], correct: [0, 3], explanation: `map(lambda x,y: x+y, list1, list2) is valid — map() accepts multiple parallel iterables. filter() only SELECTS elements, never transforms them. A lambda body is a single EXPRESSION only — return is a statement and is never allowed inside a lambda (SyntaxError). Mapping over an empty list correctly gives an empty result.` },
    { id: "q6", isPYQ: false, source: "GATE-Style Practice", marks: 2, qtype: "NAT", stem: `def f(n):\n    if n == 0:\n        return 0\n    return n + f(n // 2)\nprint(f(10))\n\n# Result = ______`, correct: "18", explanation: `f(10)=10+f(5). f(5)=5+f(2). f(2)=2+f(1). f(1)=1+f(0). f(0)=0. Unwinding: f(1)=1, f(2)=2+1=3, f(5)=5+3=8, f(10)=10+8=18.` },
  ]},
  { id: "quiz12", title: "Quiz 12 — Object-Oriented Programming Basics", questions: [
    { id: "q1", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `class Box:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\nb = Box(4, 5)\nprint(b.area())`, options: [`20`, `9`, `Error`, `None`], correct: 0, explanation: `__init__ sets self.w=4 and self.h=5 on object b. area() returns self.w * self.h = 4*5 = 20.` },
    { id: "q2", isPYQ: false, source: "Practice", marks: 2, qtype: "MCQ", stem: `class Dog:\n    sound = "Woof"\n    def bark(self):\n        print(self.sound)\nd1 = Dog()\nd2 = Dog()\nd1.sound = "Bark"\nd1.bark()\nd2.bark()`, options: [`Bark\nWoof`, `Woof\nWoof`, `Bark\nBark`, `Error`], correct: 0, explanation: `sound is a CLASS attribute, shared by default. d1.sound = "Bark" creates a new INSTANCE attribute on d1 specifically, shadowing the class attribute for d1 only — d2 still falls back to the original class-level "Woof".` },
    { id: "q3", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `class Account:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amt):\n        self.balance += amt\n        return self.balance\na = Account(100)\na.deposit(50)\nprint(a.deposit(25))`, options: [`175`, `150`, `75`, `Error`], correct: 0, explanation: `Starts at balance=100. deposit(50) -> balance=150. deposit(25) -> balance=175, which is what gets printed.` },
    { id: "q4", isPYQ: false, source: "Practice", marks: 1, qtype: "MCQ", stem: `Which correctly describes the relationship between a class and an object?`, options: [`A class is a blueprint; an object is one instance built from it.`, `An object is a blueprint; a class is one instance of it.`, `A class and an object are always exactly the same thing.`, `A class can only ever produce one object.`], correct: 0, explanation: `A class defines the structure (attributes) and behaviour (methods) shared by all its instances. Each call to ClassName(...) produces a separate, independent object — one class can produce as many objects as needed.` },
  ]},
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [doneMap, setDoneMap] = useState({});
  const [quizScores, setQuizScores] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]?.id);

  useEffect(() => {
    try {
      const d = localStorage.getItem("gate-da-py-done");
      if (d) setDoneMap(JSON.parse(d));
    } catch (e) {}
    try {
      const s = localStorage.getItem("gate-da-py-scores");
      if (s) setQuizScores(JSON.parse(s));
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("gate-da-py-done", JSON.stringify(doneMap)); } catch (e) {}
  }, [doneMap, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("gate-da-py-scores", JSON.stringify(quizScores)); } catch (e) {}
  }, [quizScores, loaded]);

  const toggleDone = (id) => setDoneMap(prev => ({ ...prev, [id]: !prev[id] }));
  const handleQuizSubmit = (qid, sc, total) => setQuizScores(prev => ({ ...prev, [qid]: { score: sc, total } }));

  const totalTopics = CHAPTERS.reduce((a, c) => a + c.topics.length, 0);
  const doneTopics = Object.values(doneMap).filter(Boolean).length;
  const totalQuizQ = QUIZZES.reduce((a, q) => a + q.questions.length, 0);
  const totalPYQ = CHAPTERS.reduce((a, c) => a + c.topics.filter(t => t.question && t.question.isPYQ).length, 0)
                  + QUIZZES.reduce((a, q) => a + q.questions.filter(x => x.isPYQ).length, 0);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  };

  const chapterColors = { ch1: "var(--amber)", ch2: "var(--teal)", ch3: "var(--violet)", ch4: "var(--blue)", ch5: "var(--rose)", ch6: "var(--lime)", ch7: "var(--sky)" };

  return (
    <div className="pyc-root pyc-scrollbar" style={{ minHeight: "100vh" }}>
      <GlobalStyle />

      {/* TOP BAR */}
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(10,14,23,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", maxWidth: 1400, margin: "0 auto" }}>
          <button onClick={() => setSidebarOpen(o => !o)} className="pyc-btn pyc-menu-btn" aria-label="Toggle menu" style={{ alignItems: "center", justifyContent: "center", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", width: 34, height: 34, flexShrink: 0 }}>
            <Menu size={18} />
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--coral)" }} />
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--amber)" }} />
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--teal)" }} />
          </div>
          <div className="pyc-font-mono" style={{ fontSize: 13.5, color: "var(--text)", display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            <span style={{ color: "var(--text-dimmer)" }}>~/gate-da/prep$</span>
            <span style={{ color: "var(--amber)", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>python_fundamentals.py</span>
            <span className="pyc-blink" style={{ color: "var(--teal)" }}>▌</span>
          </div>
          <div className="pyc-font-mono" style={{ display: "flex", gap: 8, fontSize: 11.5, flexShrink: 0 }}>
            <Badge tone="teal" icon={CheckCircle2}>{doneTopics}/{totalTopics}</Badge>
          </div>
        </div>
      </div>

      <div className={`pyc-backdrop ${sidebarOpen ? "pyc-backdrop-open" : ""}`} onClick={() => setSidebarOpen(false)} />

      <div style={{ display: "flex", maxWidth: 1400, margin: "0 auto" }}>
        {/* SIDEBAR */}
        <aside className={`pyc-sidebar pyc-scrollbar ${sidebarOpen ? "pyc-sidebar-open" : ""}`} style={{ width: 272, flexShrink: 0, borderRight: "1px solid var(--border)", height: "calc(100vh - 49px)", position: "sticky", top: 49, overflowY: "auto", padding: "18px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="pyc-font-display" style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dimmer)", letterSpacing: 1.2, padding: "0 8px 10px 8px", textTransform: "uppercase" }}>
              Contents
            </div>
            <button onClick={() => setSidebarOpen(false)} className="pyc-menu-btn pyc-btn" style={{ alignItems: "center", justifyContent: "center", background: "transparent", border: "none", color: "var(--text-dim)", marginRight: 6 }}>
              <X size={18} />
            </button>
          </div>
          {CHAPTERS.map(ch => (
            <div key={ch.id} className="pyc-sidebar-chapter" style={{ marginBottom: 14, animationDelay: `${CHAPTERS.indexOf(ch) * 60}ms` }}>
              <div className="pyc-font-display" style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", fontSize: 12.5, fontWeight: 700, color: chapterColors[ch.id], borderRadius: 6 }}>
                <span className="pyc-font-mono" style={{ opacity: 0.7 }}>{ch.num}</span> {ch.title}
              </div>
              {ch.topics.map(t => (
                <button key={t.id} onClick={() => scrollTo(t.id)} className="pyc-topic-btn pyc-sidebar-topic-item pyc-link" style={{ display: "flex", alignItems: "center", gap: 7, width: "100%", textAlign: "left", padding: "5px 8px 5px 22px", background: "transparent", border: "none", color: doneMap[t.id] ? "var(--text-dimmer)" : "var(--text-dim)", fontSize: 12.5, cursor: "pointer", textDecoration: doneMap[t.id] ? "line-through" : "none" }}>
                  {doneMap[t.id] ? <CheckCircle2 size={12} style={{ color: "var(--teal)", flexShrink: 0 }} /> : <Circle size={12} style={{ flexShrink: 0, opacity: 0.4 }} />}
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</span>
                </button>
              ))}
            </div>
          ))}
          <div style={{ marginTop: 6 }}>
            <div className="pyc-font-display" style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", fontSize: 12.5, fontWeight: 700, color: "var(--amber)" }}>
              <Trophy size={13} /> Practice Quizzes
            </div>
            {QUIZZES.map(q => (
              <button key={q.id} onClick={() => scrollTo(q.id)} className="pyc-topic-btn pyc-link" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 7, width: "100%", textAlign: "left", padding: "6px 8px 6px 22px", background: "transparent", border: "none", color: "var(--text-dim)", fontSize: 12.5, cursor: "pointer" }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.title}</span>
                {quizScores[q.id] && <span className="pyc-font-mono" style={{ fontSize: 10.5, color: "var(--teal)", flexShrink: 0 }}>{quizScores[q.id].score}/{quizScores[q.id].total}</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, minWidth: 0, padding: "28px 22px 80px 22px", position: "relative", zIndex: 1 }}>
          {/* HERO */}
          <div style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Badge tone="teal" icon={CheckCircle2}>{totalPYQ} Real PYQs</Badge>
              <Badge tone="amber" icon={Sparkles}>{totalTopics} Topics</Badge>
              <Badge tone="violet" icon={Trophy}>{totalQuizQ} Quiz Qs</Badge>
            </div>
            <h1 className="pyc-font-display" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 12px 0" }}>
              <span style={{ color: "var(--text-dimmer)" }}>&gt;&gt;&gt; </span>
              Python for <span style={{ color: "var(--amber)" }}>GATE DA</span>
            </h1>
            <p style={{ fontSize: 14.5, color: "var(--text-dim)", maxWidth: 680, lineHeight: 1.7, margin: 0 }}>
              Every concept, output trap, and edge case from all five of your lecture sets — rebuilt as one exam-ready console, from print() basics through OOP.
              Verified PYQs are tagged <Badge tone="teal" icon={CheckCircle2}>PYQ</Badge>, exam-style drills are tagged <Badge tone="amber" icon={Sparkles}>Practice</Badge>. Nothing is mixed up as fact when it isn't.
            </p>
          </div>

          {CHAPTERS.map((ch, ci) => (
            <section key={ch.id} className="pyc-section-enter" style={{ marginBottom: 48, animationDelay: `${ci * 80}ms` }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, borderBottom: `1px solid var(--border)`, paddingBottom: 16 }}>
                <span className="pyc-font-mono pyc-font-display" style={{ fontSize: 34, fontWeight: 700, color: chapterColors[ch.id], opacity: 0.35 }}>{ch.num}</span>
                <div>
                  <h2 className="pyc-font-display" style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--text)" }}>{ch.title}</h2>
                  <p style={{ fontSize: 13, color: "var(--text-dim)", margin: "4px 0 0 0", lineHeight: 1.5 }}>{ch.subtitle}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
                {ch.topics.map(t => (
                  <TopicCard key={t.id} topic={t} chapterColor={chapterColors[ch.id]} done={!!doneMap[t.id]} toggleDone={toggleDone} answers={answers} setAnswers={setAnswers} revealed={revealed} setRevealed={setRevealed} />
                ))}
              </div>
            </section>
          ))}

          {/* QUIZZES */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
              <Trophy size={24} style={{ color: "var(--amber)" }} />
              <div>
                <h2 className="pyc-font-display" style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Practice Quiz Bank</h2>
                <p style={{ fontSize: 13, color: "var(--text-dim)", margin: "3px 0 0 0" }}>Timed-exam style MCQ / MSQ sets, grouped by topic cluster</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {QUIZZES.map(q => (
                <QuizSection key={q.id} quiz={q} answers={answers} setAnswers={setAnswers} revealed={revealed} setRevealed={setRevealed} onSubmit={handleQuizSubmit} savedScore={quizScores[q.id]} />
              ))}
            </div>
          </section>

          <div style={{ textAlign: "center", marginTop: 60, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
            <p className="pyc-font-mono" style={{ fontSize: 12, color: "var(--text-dimmer)" }}>
              <span style={{ color: "var(--teal)" }}>✓</span> compiled with 0 errors · good luck with GATE DA
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
