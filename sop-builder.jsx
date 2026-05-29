import { useState, useEffect, useReducer, useRef, useCallback, useMemo } from "react";
import {
  LayoutDashboard, Plus, Library, Users, Settings, ChevronRight, ChevronDown, ChevronUp,
  Search, Grid, List, FileText, Mic, ClipboardList, ArrowRight, Check, X, AlertTriangle,
  Info, Download, Share2, Copy, Edit3, Trash2, MoreHorizontal, Eye, Play, Clock, User,
  Tag, CheckSquare, AlertCircle, Loader, Sparkles, Wand2, BarChart3, Key, RefreshCw,
  ChevronLeft, Activity, ListChecks, CheckCircle2, ExternalLink, Globe, Mail, Lock, Hash,
  Calendar, Flag, Package, Layers, Target, Shield, BookOpen, Star, Building2, Zap, Upload,
  Bookmark, TrendingUp, PenLine, ArrowUpRight, UserCheck, Filter, SortAsc, Save, Pencil,
  MoreVertical, Link, CornerDownRight, Award, Sliders, Bell, Menu, MapPin, Cpu,
  FileCheck, Brain, LayoutTemplate, CircleAlert, GitBranch, Workflow, Database, TriangleAlert
} from "lucide-react";

// ── CSS INJECTION ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --bg-base:#08080C; --bg-surface:#0F0F16; --bg-elevated:#16161F; --bg-card:#1C1C28;
        --bg-hover:#212130; --bg-subtle:#1A1A26;
        --border-default:#2C2C3E; --border-subtle:#1E1E2C; --border-strong:#3A3A54;
        --accent-primary:#7B68EE; --accent-secondary:#00E5B0; --accent-warm:#F5A524;
        --accent-glow:rgba(123,104,238,0.18); --accent-gradient:linear-gradient(135deg,#7B68EE 0%,#00C9FF 100%);
        --text-primary:#EEEDF5; --text-secondary:#9896AF; --text-tertiary:#5A5873;
        --text-inverted:#08080C; --text-accent:#A99FF5;
        --success:#3ECF8E; --warning:#F5A524; --error:#F7615A; --info:#57ADFF;
        --font-display:'Syne',sans-serif; --font-body:'DM Sans',sans-serif; --font-mono:'JetBrains Mono',monospace;
        --r-sm:6px; --r-md:8px; --r-lg:10px; --r-xl:14px; --r-pill:999px;
      }
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{background:var(--bg-base)}
      body{background:var(--bg-base);color:var(--text-primary);font-family:var(--font-body);font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased;min-height:100vh}
      ::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:var(--bg-base)}::-webkit-scrollbar-thumb{background:var(--border-default);border-radius:3px}
      *:focus-visible{outline:2px solid var(--accent-primary);outline-offset:2px}
      input,textarea,select{background:var(--bg-surface);border:1px solid var(--border-subtle);color:var(--text-primary);font-family:var(--font-body);font-size:14px;border-radius:var(--r-md);padding:10px 14px;width:100%;transition:border-color 0.15s}
      input:focus,textarea:focus,select:focus{outline:none;border-color:var(--accent-primary)}
      input::placeholder,textarea::placeholder{color:var(--text-tertiary)}
      select option{background:var(--bg-elevated)}
      textarea{resize:vertical}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideInRight{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
      @keyframes shimmer{from{background-position:-200% 0}to{background-position:200% 0}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
      @keyframes ringPulse{0%{transform:scale(0.8);opacity:0.6}100%{transform:scale(1.5);opacity:0}}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes sopLine{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      @keyframes flowPulse{0%,100%{opacity:0.3}50%{opacity:1}}
      @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes bgGrad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes drawCheck{from{stroke-dashoffset:24}to{stroke-dashoffset:0}}
      @keyframes toastIn{from{opacity:0;transform:translateY(16px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes cursor{0%,100%{opacity:1}50%{opacity:0}}
      .page-enter{animation:slideUp 0.28s cubic-bezier(0.22,1,0.36,1) forwards}
      .gradient-text{background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .glass{background:rgba(22,22,31,0.85);backdrop-filter:blur(16px)}
      .dot-grid{background-image:radial-gradient(var(--border-subtle) 1px,transparent 1px);background-size:24px 24px}
      .skeleton{background:linear-gradient(90deg,var(--bg-card) 25%,var(--bg-hover) 50%,var(--bg-card) 75%);background-size:200% 100%;animation:shimmer 1.5s ease infinite}
      .card-hover{transition:border-color 0.2s,box-shadow 0.2s,transform 0.2s;cursor:pointer}
      .card-hover:hover{border-color:rgba(123,104,238,0.45)!important;box-shadow:0 0 0 1px rgba(123,104,238,0.35),0 8px 32px rgba(123,104,238,0.08);transform:translateY(-2px)}
      .step-card{transition:border-left-color 0.2s,box-shadow 0.2s}
      .step-card:hover{border-left-color:var(--accent-primary)!important;box-shadow:0 0 0 1px rgba(123,104,238,0.2)}
      .nav-active{background:var(--bg-hover);border-left:2px solid var(--accent-primary)!important;color:var(--text-primary)!important}
      .sop-l1{animation:sopLine 0.3s 0.6s forwards;opacity:0}
      .sop-l2{animation:sopLine 0.3s 1.0s forwards;opacity:0}
      .sop-l3{animation:sopLine 0.3s 1.4s forwards;opacity:0}
      .sop-l4{animation:sopLine 0.3s 1.8s forwards;opacity:0}
      .sop-l5{animation:sopLine 0.3s 2.2s forwards;opacity:0}
      .sop-l6{animation:sopLine 0.3s 2.6s forwards;opacity:0}
      .sop-l7{animation:sopLine 0.3s 3.0s forwards;opacity:0}
      .sop-l8{animation:sopLine 0.3s 3.4s forwards;opacity:0}
      .cursor-blink{animation:cursor 1s step-end infinite}
      .gen-step{animation:slideInRight 0.22s ease-out forwards}
      table{border-collapse:collapse;width:100%}
      th{text-align:left;padding:9px 14px;font-size:11px;font-family:var(--font-mono);color:var(--text-tertiary);border-bottom:1px solid var(--border-subtle);letter-spacing:0.06em;text-transform:uppercase}
      td{padding:11px 14px;border-bottom:1px solid var(--border-subtle);font-size:13px;color:var(--text-secondary)}
      tr:last-child td{border-bottom:none}
      tr:hover td{background:var(--bg-hover);color:var(--text-primary)}
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);
  return null;
}

// ── UTILITIES ────────────────────────────────────────────────────────────────
const genId = () => `sop_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
const fmtRelative = (iso) => {
  const d = Math.floor((Date.now()-new Date(iso))/86400000);
  if(d===0) return "Today"; if(d===1) return "Yesterday"; if(d<7) return `${d}d ago`;
  if(d<30) return `${Math.floor(d/7)}w ago`; if(d<365) return `${Math.floor(d/30)}mo ago`;
  return `${Math.floor(d/365)}y ago`;
};

function computeScore(sop) {
  const w=[10,5,10,5,20,15,10,10,10,5];
  const c=[sop.purpose?.length>20,sop.scope?.included?.length>0,sop.roles?.length>0,
    sop.prerequisites?.length>0,sop.steps?.length>=3,
    sop.steps?.every(s=>s.responsible_role),sop.exceptions?.length>0,
    sop.expected_output?.length>20,sop.completeness_flags?.length===0,
    sop.metadata?.owner?.length>0];
  return Math.min(100,c.reduce((s,p,i)=>s+(p?w[i]:0),0));
}

const CATCOLORS = {
  Operations:"#7B68EE",HR:"#00C9FF",Support:"#F5A524",
  Onboarding:"#3ECF8E",Finance:"#F7615A",Marketing:"#00E5B0",
  Default:"#9896AF"
};
const catColor = (c) => CATCOLORS[c]||CATCOLORS.Default;

// ── STATE MANAGEMENT ──────────────────────────────────────────────────────────
const initState = {
  sops: [],
  route: { page: "landing", params: {} },
  currentSOPId: null,
  isGenerating: false, genStep: 0,
  enableContent: null, isEnableGenerating: false, enableFormat: null,
  filters: { category: "all", sort: "updated", view: "grid", search: "" },
  settings: { userName: "Alex", teamName: "My Team", apiKey: "", defaultCategory: "Operations", exportFormat: "pdf", exportIncludeMetadata: true, exportIncludeFlags: true, model: "anthropic/claude-sonnet-4" },
  toast: null, createForm: null
};

function reducer(s, a) {
  switch(a.type) {
    case "NAVIGATE": return { ...s, route: { page: a.page, params: a.params || {} }, currentSOPId: a.sopId || s.currentSOPId };
    case "SET_SOP": return { ...s, currentSOPId: a.id };
    case "ADD_SOP": return { ...s, sops: [a.sop, ...s.sops], currentSOPId: a.sop.id };
    case "UPDATE_SOP": return { ...s, sops: s.sops.map(x => x.id === a.sop.id ? a.sop : x) };
    case "DELETE_SOP": return { ...s, sops: s.sops.filter(x => x.id !== a.id), currentSOPId: s.currentSOPId === a.id ? null : s.currentSOPId };
    case "SET_GENERATING": return { ...s, isGenerating: a.val, genStep: a.val ? 0 : s.genStep };
    case "SET_GEN_STEP": return { ...s, genStep: a.step };
    case "SET_ENABLE_CONTENT": return { ...s, enableContent: a.content, isEnableGenerating: false };
    case "SET_ENABLE_GENERATING": return { ...s, isEnableGenerating: a.val, enableFormat: a.format || s.enableFormat };
    case "SET_ENABLE_FORMAT": return { ...s, enableFormat: a.format, enableContent: null };
    case "SET_FILTERS": return { ...s, filters: { ...s.filters, ...a.filters } };
    case "SET_SOPS": return { ...s, sops: a.sops };
    case "SET_SETTINGS": return { ...s, settings: { ...s.settings, ...a.settings } };
    case "SET_TOAST": return { ...s, toast: a.toast };
    case "CLEAR_TOAST": return { ...s, toast: null };
    case "SET_CREATE_FORM": return { ...s, createForm: a.form };
    default: return s;
  }
}

// ── SHARED UI COMPONENTS ──────────────────────────────────────────────────────
function Btn({ children, variant="primary", size="md", icon:Icon, iconRight:IconR, onClick, disabled, style, full }) {
  const base = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"7px", cursor: disabled?"not-allowed":"pointer",
    fontFamily:"var(--font-body)", fontWeight:500, border:"none", transition:"all 0.15s", whiteSpace:"nowrap", opacity: disabled ? 0.5 : 1,
    width: full ? "100%" : undefined };
  const sizes = { sm:{padding:"6px 12px",fontSize:"12px",borderRadius:"var(--r-sm)"},
    md:{padding:"9px 16px",fontSize:"13px",borderRadius:"var(--r-md)"},
    lg:{padding:"12px 22px",fontSize:"15px",borderRadius:"var(--r-md)"} };
  const variants = {
    primary:{ background:"var(--accent-primary)", color:"var(--text-primary)",
      boxShadow:"0 0 0 1px rgba(123,104,238,0.4), 0 2px 8px rgba(123,104,238,0.2)" },
    secondary:{ background:"transparent", color:"var(--text-primary)", border:"1px solid var(--border-default)" },
    ghost:{ background:"transparent", color:"var(--text-secondary)", border:"none" },
    danger:{ background:"rgba(247,97,90,0.12)", color:"var(--error)", border:"1px solid rgba(247,97,90,0.3)" },
    success:{ background:"rgba(62,207,142,0.12)", color:"var(--success)", border:"1px solid rgba(62,207,142,0.3)" }
  };
  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant], ...style }} onClick={disabled ? undefined : onClick}>
      {Icon && <Icon size={size==="sm"?13:size==="lg"?16:14} />}
      {children}
      {IconR && <IconR size={size==="sm"?13:size==="lg"?16:14} />}
    </button>
  );
}

function Badge({ children, color, variant="solid", mono, size="sm" }) {
  const s = { display:"inline-flex", alignItems:"center", gap:"4px",
    padding: size==="xs" ? "2px 6px" : "3px 8px",
    fontSize: mono||size==="xs" ? "10px" : "12px",
    fontFamily: mono ? "var(--font-mono)" : "var(--font-body)",
    borderRadius:"var(--r-sm)", fontWeight:500, whiteSpace:"nowrap" };
  if(variant==="solid") return <span style={{ ...s, background:`${color||"var(--bg-elevated)"}22`, color:color||"var(--text-secondary)", border:`1px solid ${color||"var(--border-default)"}44` }}>{children}</span>;
  return <span style={{ ...s, background:"transparent", color:color||"var(--text-secondary)", border:`1px solid ${color||"var(--border-default)"}44`}}>{children}</span>;
}

function StatusBadge({ status }) {
  const map = { live:["#3ECF8E","Live"], draft:["#F5A524","Draft"], "needs-review":["#F7615A","Review"], archived:["#5A5873","Archived"] };
  const [color, label] = map[status]||["#9896AF",status];
  return <Badge color={color}>{label}</Badge>;
}

function CategoryBadge({ category }) {
  return <Badge color={catColor(category)} mono>{category}</Badge>;
}

function CompletionBar({ score, width="100%", showLabel }) {
  const color = score>80?"var(--success)":score>60?"var(--warning)":"var(--error)";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
      <div style={{ background:"var(--border-subtle)", borderRadius:"99px", height:"4px", flex:1, overflow:"hidden", width }}>
        <div style={{ width:`${score}%`, height:"100%", background:color, borderRadius:"99px", transition:"width 0.4s ease" }} />
      </div>
      {showLabel && <span style={{ fontSize:"11px", fontFamily:"var(--font-mono)", color:"var(--text-tertiary)" }}>{score}%</span>}
    </div>
  );
}

function Mono({ children, style, color }) {
  return <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"0.05em", color:color||"var(--text-tertiary)", ...style }}>{children}</span>;
}

function SectionDivider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"8px 0 20px" }}>
      <Mono style={{ fontSize:"10px", letterSpacing:"0.12em", whiteSpace:"nowrap" }}>{label}</Mono>
      <div style={{ flex:1, height:"1px", background:"var(--border-subtle)" }} />
    </div>
  );
}

function Card({ children, style, hover, onClick }) {
  return (
    <div className={hover ? "card-hover" : undefined} onClick={onClick}
      style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", padding:"20px", ...style }}>
      {children}
    </div>
  );
}

function Modal({ open, onClose, children, title, maxWidth=480 }) {
  if(!open) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(8,8,12,0.8)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="glass" style={{ background:"rgba(22,22,31,0.95)", border:"1px solid var(--border-default)", borderRadius:"var(--r-xl)", padding:"28px", width:"100%", maxWidth, animation:"slideUp 0.22s ease-out" }}>
        {title && <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
          <span style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:700 }}>{title}</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"var(--text-tertiary)", cursor:"pointer", padding:"4px" }}><X size={18}/></button>
        </div>}
        {children}
      </div>
    </div>
  );
}

function Toast({ toast, dispatch }) {
  useEffect(() => {
    if(!toast) return;
    const t = setTimeout(() => dispatch({ type:"CLEAR_TOAST" }), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  if(!toast) return null;
  const colors = { success:"var(--success)", error:"var(--error)", info:"var(--info)", warning:"var(--warning)" };
  return (
    <div style={{ position:"fixed", bottom:"24px", right:"24px", zIndex:2000,
      background:"var(--bg-elevated)", border:`1px solid ${colors[toast.type]||"var(--border-default)"}55`,
      borderRadius:"var(--r-lg)", padding:"12px 18px", display:"flex", alignItems:"center", gap:"10px",
      boxShadow:"0 8px 32px rgba(0,0,0,0.4)", animation:"toastIn 0.2s ease-out", maxWidth:340 }}>
      <div style={{ width:8, height:8, borderRadius:"50%", background:colors[toast.type]||"var(--accent-primary)", flexShrink:0 }} />
      <span style={{ fontSize:"13px", color:"var(--text-primary)", lineHeight:1.4 }}>{toast.message}</span>
    </div>
  );
}

function Spinner({ size=16 }) {
  return <Loader size={size} style={{ animation:"spin 0.8s linear infinite" }} />;
}

function SkeletonBlock({ h=16, w="100%", br=6 }) {
  return <div className="skeleton" style={{ height:h, width:w, borderRadius:br }} />;
}

function EmptyState({ icon:Icon=FileText, title, sub, action, onAction }) {
  return (
    <div style={{ textAlign:"center", padding:"64px 32px", color:"var(--text-tertiary)" }}>
      <div style={{ width:56, height:56, background:"var(--bg-elevated)", borderRadius:"var(--r-lg)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
        <Icon size={24} style={{ color:"var(--accent-primary)", opacity:0.6 }} />
      </div>
      <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:700, color:"var(--text-primary)", marginBottom:"8px" }}>{title}</div>
      <div style={{ fontSize:"14px", color:"var(--text-secondary)", maxWidth:320, margin:"0 auto 24px", lineHeight:1.6 }}>{sub}</div>
      {action && <Btn variant="secondary" onClick={onAction}>{action}</Btn>}
    </div>
  );
}

function ConfirmDialog({ isOpen, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, variant = "danger" }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(8, 8, 12, 0.75)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      animation: "fadeIn 0.2s ease-out"
    }}>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--r-xl)",
        padding: "28px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        animation: "toastIn 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards"
      }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", marginBottom: "8px", color: "var(--text-primary)" }}>{title}</h3>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{message}</p>
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <Btn variant="secondary" onClick={onCancel}>{cancelText}</Btn>
          <Btn variant={variant} onClick={onConfirm}>{confirmText}</Btn>
        </div>
      </div>
    </div>
  );
}

function SearchInput({ value, onChange, placeholder = "Search...", style }) {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onChange(val);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div style={{ position: "relative", ...style }}>
      <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
      <input
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ paddingLeft: 32, width: "100%" }}
      />
    </div>
  );
}

// ── LANDING PAGE ──────────────────────────────────────────────────────────────
function HeroMockup() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 7000); return () => clearInterval(t); }, []);
  const inputText = "Every Monday Sarah pastes the weekly report into Slack. Jim reviews it and sends notes back to Sarah by noon. Then Sarah makes edits and re-sends to the client before 3pm. Sometimes the client also gets a PDF version but not always...";
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 40px 1fr", gap:0, maxWidth:700, margin:"0 auto", alignItems:"center" }}>
      {/* Input Panel */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-xl)", padding:"20px", boxShadow:"0 0 0 1px rgba(123,104,238,0.2), 0 16px 48px rgba(0,0,0,0.4)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"14px" }}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:"var(--error)",opacity:0.7 }}/>
          <div style={{ width:8,height:8,borderRadius:"50%",background:"var(--warning)",opacity:0.7 }}/>
          <div style={{ width:8,height:8,borderRadius:"50%",background:"var(--success)",opacity:0.7 }}/>
          <Mono style={{ marginLeft:8 }}>01 RAW INPUT</Mono>
        </div>
        <div style={{ background:"var(--bg-surface)", borderRadius:"var(--r-md)", padding:"14px", fontSize:"12px", color:"var(--text-secondary)", lineHeight:1.7, minHeight:160, fontFamily:"var(--font-mono)" }}>
          {inputText.slice(0, (tick%3===0?inputText.length:tick%3===1?inputText.length:inputText.length))}
          <span className="cursor-blink" style={{ borderRight:"1.5px solid var(--accent-primary)", marginLeft:"1px" }}>&nbsp;</span>
        </div>
      </div>
      {/* Arrow */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
          {[0,1,2,3,4].map(i=>(
            <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:"var(--accent-primary)", animation:`flowPulse 1.2s ${i*0.18}s ease-in-out infinite` }}/>
          ))}
        </div>
      </div>
      {/* Output Panel */}
      <div style={{ background:"var(--bg-card)", border:"1px solid rgba(123,104,238,0.4)", borderRadius:"var(--r-xl)", padding:"20px", boxShadow:"0 0 0 1px rgba(123,104,238,0.25), 0 16px 48px rgba(123,104,238,0.12)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"14px" }}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:"var(--accent-primary)" }}/>
          <Mono style={{ color:"var(--text-accent)" }}>02 STRUCTURED SOP</Mono>
        </div>
        <div style={{ fontSize:"12px", lineHeight:1.7 }}>
          {[
            {c:"var(--text-tertiary)",t:"PURPOSE",bold:false,cl:"sop-l1"},
            {c:"var(--text-primary)",t:"Weekly Report Distribution Process",bold:true,cl:"sop-l2"},
            {c:"var(--text-tertiary)",t:"",bold:false,cl:""},
            {c:"var(--text-tertiary)",t:"ROLES",bold:false,cl:"sop-l3"},
            {c:"var(--accent-secondary)",t:"● Sarah (Report Owner) · Jim (Reviewer)",bold:false,cl:"sop-l4"},
            {c:"var(--text-tertiary)",t:"",bold:false,cl:""},
            {c:"var(--text-tertiary)",t:"STEPS",bold:false,cl:"sop-l5"},
            {c:"var(--text-primary)",t:"01 → Sarah pastes data to Slack by 9 AM",bold:false,cl:"sop-l6"},
            {c:"var(--text-primary)",t:"02 → Jim reviews and sends notes by noon",bold:false,cl:"sop-l7"},
            {c:"var(--text-primary)",t:"03 → Final version sent to client by 3 PM",bold:false,cl:"sop-l8"},
          ].map((row,i) => row.t ? (
            <div key={i} className={row.cl} style={{ color:row.c, fontFamily:"var(--font-mono)", fontWeight:row.bold?700:400, marginBottom:"3px" }}>{row.t}</div>
          ) : <div key={i} className={row.cl} style={{ height:6 }}/>)}
        </div>
      </div>
    </div>
  );
}

function LandingPage({ dispatch }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Operations","HR & Onboarding","Customer Support","Agencies","Startups"];
  const tabContent = [
    { title:"Client Onboarding SOP",purpose:"Ensure every new client transitions from signed contract to active project within 5 business days.",steps:["Send welcome email introducing PM","Create Notion workspace","Schedule kickoff call","Assign account manager"] },
    { title:"New Employee Week 1 SOP",purpose:"Give every new hire a structured, confidence-building first week with clear expectations.",steps:["Complete HR documentation","Set up system access","Meet team members","Review role-specific SOPs"] },
    { title:"Tier 2 Escalation SOP",purpose:"Handle customer escalations with consistent urgency, clear ownership, and documented resolution.",steps:["Identify escalation trigger","Route to support lead","Notify via Slack","Resolve and document"] },
    { title:"Client Deliverable Review SOP",purpose:"Ensure all client deliverables meet quality standards before submission, without delays.",steps:["PM reviews against brief","Designer QA pass","Client-ready format check","Send via HubSpot sequence"] },
    { title:"Weekly Standup SOP",purpose:"Run efficient, outcome-focused team standups that surface blockers and align on priorities.",steps:["15-min async updates in Slack","Blocker triage in standup","PM updates project tracker","Async follow-up for deep dives"] }
  ];
  useEffect(() => {
    const el = document.getElementById("sop-scroll-container");
    if(!el) return;
    const h = () => setScrolled(el.scrollTop > 80);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, []);
  const problems = [
    { icon:Brain, t:"Knowledge disappears", d:"One resignation and your best processes walk out the door.", c:"var(--error)" },
    { icon:RefreshCw, t:"New hires ask the same questions", d:"Every onboarding is a repeat of the last — wasting everyone's time.", c:"var(--warning)" },
    { icon:TriangleAlert, t:"Execution is inconsistent", d:"Without a clear process, every run of the task produces different results.", c:"var(--error)" }
  ];
  const features = [
    { n:"01", icon:Wand2, t:"AI SOP Generation", d:"Paste anything — get a structured, professional SOP in seconds" },
    { n:"02", icon:CircleAlert, t:"Smart Gap Detection", d:"Automatically flags unclear steps, missing roles, and ambiguities" },
    { n:"03", icon:Users, t:"Team Enablement Views", d:"Convert any SOP into a checklist, onboarding guide, or manager summary" },
    { n:"04", icon:UserCheck, t:"Role-Specific Output", d:"Filter any SOP to show only what each team member needs to see" },
    { n:"05", icon:Library, t:"SOP Library", d:"One searchable home for every process your team has documented" },
    { n:"06", icon:Download, t:"Export & Share", d:"PDF, copy-to-clipboard, share link — your SOP works everywhere" }
  ];
  const howItWorks = [
    { n:"01", t:"Paste your input", d:"Add meeting notes, transcripts, or a rough workflow description" },
    { n:"02", t:"AI builds the structure", d:"Roles, steps, decision points, and exceptions are extracted and organized" },
    { n:"03", t:"Review and refine", d:"Edit inline, resolve flagged gaps, and finalize the SOP" },
    { n:"04", t:"Ship it to your team", d:"Share as a document, checklist, or role-specific guide — instantly" }
  ];

  return (
    <div style={{ fontFamily:"var(--font-body)" }} id="hero">
      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, height:60, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 40px", transition:"all 0.2s",
        background: scrolled ? "rgba(8,8,12,0.9)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer" }} onClick={() => dispatch({ type:"NAVIGATE", page:"landing" })}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6.5V12.5C4 16.09 7.42 19.5 12 21C16.58 19.5 20 16.09 20 12.5V6.5L12 2Z" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 12L11 14L15 10" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"16px" }}>SOP Builder</span>
        </div>
        
        {/* Navigation links center */}
        <div style={{ display:"flex", alignItems:"center", gap:"24px" }}>
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Use Cases", href: "#use-cases" }
          ].map(lnk => (
            <a key={lnk.label} href={lnk.href} onClick={(e) => {
              e.preventDefault();
              document.getElementById(lnk.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
            }} style={{ textDecoration:"none", color:"var(--text-secondary)", fontSize:"14px", fontWeight:500, transition:"color 0.15s" }}
            onMouseEnter={e=>e.target.style.color="var(--text-primary)"}
            onMouseLeave={e=>e.target.style.color="var(--text-secondary)"}>
              {lnk.label}
            </a>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <Btn variant="ghost" size="sm" onClick={() => dispatch({ type:"NAVIGATE", page:"dashboard" })}>Launch App</Btn>
          <Btn variant="primary" size="sm" onClick={() => dispatch({ type:"NAVIGATE", page:"create" })}>Create SOP</Btn>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", padding:"100px 40px 80px", textAlign:"center", overflow:"hidden" }}
        className="dot-grid">
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 700px 400px at 50% 0%, rgba(123,104,238,0.12) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"relative", maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", border:"1px solid var(--border-default)", borderRadius:"var(--r-pill)", padding:"5px 14px", marginBottom:"32px", background:"var(--bg-elevated)" }}>
            <Sparkles size={12} style={{ color:"var(--accent-primary)" }} />
            <Mono style={{ fontSize:"11px", letterSpacing:"0.08em", color:"var(--text-accent)" }}>AI-POWERED PROCESS DOCUMENTATION</Mono>
          </div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,5vw,64px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"24px" }}>
            <span style={{ color:"var(--text-tertiary)" }}>Turn messy process</span><br/>
            knowledge into SOPs your<br/>
            team <span className="gradient-text">actually follows.</span>
          </h1>
          <p style={{ fontSize:"clamp(15px,2vw,18px)", color:"var(--text-secondary)", maxWidth:560, margin:"0 auto 40px", lineHeight:1.7 }}>
            Paste your notes, transcripts, or workflow outlines. SOP Builder structures them into clear, actionable procedures — with roles, steps, exceptions, and gaps flagged automatically.
          </p>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap", marginBottom:"20px" }}>
            <Btn size="lg" onClick={() => dispatch({ type:"NAVIGATE", page:"create" })} style={{ background:"var(--accent-primary)", padding:"14px 28px", boxShadow:"0 0 32px rgba(123,104,238,0.3)" }}>
              Start Building for Free <ArrowRight size={16}/>
            </Btn>
            <Btn size="lg" variant="secondary" icon={Play} onClick={() => dispatch({ type:"NAVIGATE", page:"dashboard" })}>
              See Demo
            </Btn>
          </div>
          <div style={{ fontSize:"13px", color:"var(--text-tertiary)", marginBottom:"64px", fontFamily:"var(--font-mono)" }}>
            No credit card required · Setup in 60 seconds · Used by 500+ teams
          </div>
          <HeroMockup />
        </div>
      </section>

      {/* PROOF STRIP */}
      <div style={{ borderTop:"1px solid var(--border-subtle)", borderBottom:"1px solid var(--border-subtle)", background:"var(--bg-elevated)", padding:"18px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", gap:"0", animation:"marquee 30s linear infinite", width:"max-content" }}>
          {[...["Linear","Vercel","Notion","Stripe","Loom","Figma","Intercom","Zapier","Linear","Vercel","Notion","Stripe","Loom","Figma","Intercom","Zapier"]].map((n,i) => (
            <span key={i} style={{ fontFamily:"var(--font-display)", fontSize:"14px", fontWeight:600, color:"var(--text-tertiary)", opacity:0.35, padding:"0 40px", whiteSpace:"nowrap" }}>{n}</span>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section id="problem" style={{ padding:"96px 40px", maxWidth:1100, margin:"0 auto" }}>
        <Mono style={{ color:"var(--error)", display:"block", textAlign:"center", marginBottom:"16px" }}>THE PROBLEM</Mono>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,3vw,38px)", fontWeight:800, letterSpacing:"-0.02em", textAlign:"center", marginBottom:"48px", maxWidth:600, margin:"0 auto 48px" }}>When knowledge lives in people's heads, teams pay the price.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"20px" }}>
          {problems.map(({icon:Icon,t,d,c},i) => (
            <div key={i} style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderLeft:`3px solid ${c}55`, borderRadius:"var(--r-lg)", padding:"24px" }}>
              <div style={{ width:40, height:40, background:`${c}15`, borderRadius:"var(--r-md)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
                <Icon size={20} style={{ color:c }} />
              </div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"16px", marginBottom:"8px" }}>{t}</div>
              <div style={{ fontSize:"14px", color:"var(--text-secondary)", lineHeight:1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" style={{ padding:"96px 40px", maxWidth:1100, margin:"0 auto", borderTop:"1px solid var(--border-subtle)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"48px", alignItems:"center" }}>
          {/* Left Text */}
          <div>
            <Mono style={{ color:"var(--accent-secondary)", display:"block", marginBottom:"16px" }}>THE SOLUTION</Mono>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,3vw,38px)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"24px", lineHeight:1.2 }}>
              One input. One structured SOP. Zero ambiguity.
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
              {[
                { t: "Capture any process from any format", d: "Paste raw notes, conversational meeting transcripts, outline lists, or full document text. The AI handles the formatting." },
                { t: "Generate roles, steps, and exceptions automatically", d: "Roles are mapped, instructions written in action-oriented language, and decision branches drawn out without manual drafting." },
                { t: "Export and enable your team instantly", d: "Convert the final SOP into an actionable checklist, manager summary, onboarding guide, or role-specific view with one click." }
              ].map(({ t, d }, i) => (
                <div key={i} style={{ display:"flex", gap:"14px" }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(0,229,176,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                    <Check size={14} style={{ color:"var(--accent-secondary)" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize:"16px", fontWeight:600, color:"var(--text-primary)", marginBottom:"4px" }}>{t}</h3>
                    <p style={{ fontSize:"14px", color:"var(--text-secondary)", lineHeight:1.6 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual (Animated sequence) */}
          <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-xl)", padding:"24px", boxShadow:"0 16px 48px rgba(0,0,0,0.3)", position:"relative", overflow:"hidden", minHeight:340 }}>
            {/* Ambient Background Glow */}
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 75% 25%, rgba(0,229,176,0.08) 0%, transparent 60%)", pointerEvents:"none" }}/>
            
            {/* Animated Steps Container */}
            <div style={{ display:"flex", flexDirection:"column", gap:"16px", height:"100%" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid var(--border-subtle)", paddingBottom:"12px" }}>
                <Mono>AI TRANSFORMATION FLOW</Mono>
                <div style={{ display:"flex", gap:4 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--accent-secondary)", animation:"pulse 1.2s infinite" }}/>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--accent-primary)", animation:"pulse 1.2s 0.2s infinite" }}/>
                </div>
              </div>

              {/* Step 1: Raw text block */}
              <div style={{ background:"var(--bg-surface)", borderRadius:"var(--r-md)", padding:"12px", border:"1px solid var(--border-subtle)", animation:"fadeIn 1s forwards" }}>
                <Mono style={{ display:"block", marginBottom:4, fontSize:"9px" }}>01 INPUT NOTES</Mono>
                <p style={{ fontSize:"11px", color:"var(--text-secondary)", fontFamily:"var(--font-mono)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                  "To resolve a customer escalation, the support agent tags it in Zendesk. The Lead is notified via Slack..."
                </p>
              </div>

              {/* Processing Stream Arrow */}
              <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center", margin:"4px 0" }}>
                <div style={{ height:1, background:"linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))", flex:1 }}/>
                <Sparkles size={14} style={{ color:"var(--accent-secondary)", animation:"spin 3s linear infinite" }} />
                <div style={{ height:1, background:"linear-gradient(90deg, var(--accent-secondary), var(--accent-primary))", flex:1 }}/>
              </div>

              {/* Step 2: Structured Output Cards */}
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ background:"var(--bg-elevated)", border:"1px solid rgba(123,104,238,0.25)", borderRadius:"var(--r-sm)", padding:"10px", animation:"slideUp 0.8s 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards", opacity:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:"11px", fontWeight:600, color:"var(--text-primary)" }}>1. Tag escalation in Zendesk</span>
                    <Badge color="var(--accent-primary)" size="xs">Support Agent</Badge>
                  </div>
                  <div style={{ height:4, width:"100%", background:"rgba(123,104,238,0.1)", borderRadius:2 }}>
                    <div style={{ height:"100%", width:"100%", background:"var(--accent-primary)", borderRadius:2 }}/>
                  </div>
                </div>

                <div style={{ background:"var(--bg-elevated)", border:"1px solid rgba(0,229,176,0.25)", borderRadius:"var(--r-sm)", padding:"10px", animation:"slideUp 0.8s 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards", opacity:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:"11px", fontWeight:600, color:"var(--text-primary)" }}>2. Slack channel notification</span>
                    <Badge color="var(--accent-secondary)" size="xs">Slack Bot</Badge>
                  </div>
                  <div style={{ height:4, width:"100%", background:"rgba(0,229,176,0.1)", borderRadius:2 }}>
                    <div style={{ height:"100%", width:"100%", background:"var(--accent-secondary)", borderRadius:2 }}/>
                  </div>
                </div>

                <div style={{ background:"var(--bg-elevated)", border:"1px solid rgba(245,165,36,0.25)", borderRadius:"var(--r-sm)", padding:"10px", animation:"slideUp 0.8s 1.9s cubic-bezier(0.16, 1, 0.3, 1) forwards", opacity:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:"11px", fontWeight:600, color:"var(--text-primary)" }}>3. Lead personal oversight</span>
                    <Badge color="var(--accent-warm)" size="xs">Support Lead</Badge>
                  </div>
                  <div style={{ height:4, width:"100%", background:"rgba(245,165,36,0.1)", borderRadius:2 }}>
                    <div style={{ height:"100%", width:"100%", background:"var(--accent-warm)", borderRadius:2 }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding:"96px 40px", maxWidth:1100, margin:"0 auto", background:"var(--bg-surface)", borderTop:"1px solid var(--border-subtle)" }}>
        <Mono style={{ color:"var(--accent-primary)", display:"block", textAlign:"center", marginBottom:"16px" }}>CAPABILITIES</Mono>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,3vw,38px)", fontWeight:800, letterSpacing:"-0.02em", textAlign:"center", marginBottom:"48px", maxWidth:600, margin:"0 auto 48px" }}>More than a doc generator. A process clarity system.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"16px" }}>
          {features.map(({n,icon:Icon,t,d},i) => (
            <div key={i} className="card-hover" style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderTop:"3px solid transparent", borderImage:"var(--accent-gradient) 1", borderRadius:"var(--r-lg)", padding:"24px", position:"relative" }}>
              <Mono style={{ position:"absolute", top:16, right:16, fontSize:"10px" }}>{n}</Mono>
              <div style={{ width:40, height:40, background:"var(--accent-glow)", borderRadius:"var(--r-md)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
                <Icon size={18} style={{ color:"var(--accent-primary)" }} />
              </div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"15px", marginBottom:"8px" }}>{t}</div>
              <div style={{ fontSize:"13px", color:"var(--text-secondary)", lineHeight:1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding:"96px 40px", maxWidth:1100, margin:"0 auto" }}>
        <Mono style={{ color:"var(--accent-primary)", display:"block", textAlign:"center", marginBottom:"16px" }}>HOW IT WORKS</Mono>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,3vw,38px)", fontWeight:800, letterSpacing:"-0.02em", textAlign:"center", marginBottom:"64px" }}>From rough notes to team-ready SOP in four steps.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"0", position:"relative" }}>
          <div style={{ position:"absolute", top:"28px", left:"12.5%", width:"75%", height:"1px", background:"var(--border-subtle)", zIndex:0 }} />
          {howItWorks.map(({n,t,d},i) => (
            <div key={i} style={{ textAlign:"center", padding:"0 20px", position:"relative", zIndex:1 }}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"56px", fontWeight:800, color:"var(--border-strong)", lineHeight:1, marginBottom:"16px" }}>{n}</div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"16px", marginBottom:"8px" }}>{t}</div>
              <div style={{ fontSize:"13px", color:"var(--text-secondary)", lineHeight:1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" style={{ padding:"96px 40px", maxWidth:1100, margin:"0 auto", background:"var(--bg-surface)" }}>
        <Mono style={{ color:"var(--accent-primary)", display:"block", textAlign:"center", marginBottom:"16px" }}>USE CASES</Mono>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,3vw,38px)", fontWeight:800, letterSpacing:"-0.02em", textAlign:"center", marginBottom:"40px" }}>Built for the way your team works.</h2>
        <div style={{ display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap", marginBottom:"36px" }}>
          {tabs.map((t,i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{ padding:"8px 18px", borderRadius:"var(--r-pill)", fontSize:"13px", fontFamily:"var(--font-body)", cursor:"pointer", transition:"all 0.15s",
              background: activeTab===i ? "var(--accent-primary)" : "var(--bg-elevated)",
              color: activeTab===i ? "var(--text-primary)" : "var(--text-secondary)",
              border: `1px solid ${activeTab===i ? "transparent" : "var(--border-default)"}` }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-xl)", padding:"28px", maxWidth:600, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
            <CategoryBadge category={tabs[activeTab]} />
            <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"18px" }}>{tabContent[activeTab].title}</span>
          </div>
          <p style={{ fontSize:"13px", color:"var(--text-secondary)", marginBottom:"20px", lineHeight:1.6 }}>{tabContent[activeTab].purpose}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {tabContent[activeTab].steps.map((s,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <Mono style={{ color:"var(--accent-primary)", fontSize:"10px" }}>{String(i+1).padStart(2,"0")}</Mono>
                <span style={{ fontSize:"13px", color:"var(--text-primary)" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding:"80px 40px", background:"linear-gradient(135deg,rgba(123,104,238,0.15),rgba(0,229,176,0.06))", borderTop:"1px solid var(--border-subtle)", borderBottom:"1px solid var(--border-subtle)", textAlign:"center" }}>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"16px" }}>Stop running processes from memory.</h2>
        <p style={{ fontSize:"18px", color:"var(--text-secondary)", marginBottom:"40px" }}>Build your team's first SOP in under 5 minutes. No training required.</p>
        <Btn size="lg" onClick={() => dispatch({ type:"NAVIGATE", page:"create" })} style={{ background:"var(--accent-primary)", padding:"16px 36px", fontSize:"16px", boxShadow:"0 0 40px rgba(123,104,238,0.35)" }}>
          Start Building for Free <ArrowRight size={18} />
        </Btn>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"48px 40px 32px", borderTop:"1px solid var(--border-subtle)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"40px", marginBottom:"40px", maxWidth:1100, margin:"0 auto" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6.5V12.5C4 16.09 7.42 19.5 12 21C16.58 19.5 20 16.09 20 12.5V6.5L12 2Z" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span style={{ fontFamily:"var(--font-display)", fontWeight:700 }}>SOP Builder</span>
            </div>
            <p style={{ fontSize:"13px", color:"var(--text-tertiary)", lineHeight:1.6 }}>AI-powered process documentation for teams that run on clarity.</p>
          </div>
          {[["Product","Features","Pricing","Roadmap","Changelog"],["Company","About","Blog","Careers","Contact"]].map(([title,...links],i) => (
            <div key={i}>
              <div style={{ fontSize:"12px", fontFamily:"var(--font-mono)", color:"var(--text-tertiary)", marginBottom:"12px", letterSpacing:"0.08em" }}>{title.toUpperCase()}</div>
              {links.map(l => <div key={l} style={{ fontSize:"14px", color:"var(--text-secondary)", marginBottom:"8px", cursor:"pointer" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid var(--border-subtle)", paddingTop:"20px", display:"flex", justifyContent:"space-between", alignItems:"center", maxWidth:1100, margin:"0 auto", flexWrap:"wrap", gap:"12px" }}>
          <Mono>© 2025 SOP Builder · All rights reserved</Mono>
          <div style={{ display:"flex", gap:"20px" }}>
            {["Privacy","Terms","Cookies"].map(l => <Mono key={l} style={{ cursor:"pointer" }}>{l}</Mono>)}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── SIDEBAR & APP SHELL ───────────────────────────────────────────────────────
function Sidebar({ route, dispatch, sops, settings }) {
  const page = route.page;
  const navItems = [
    { id:"dashboard", icon:LayoutDashboard, label:"Dashboard" },
    { id:"create", icon:Plus, label:"Create SOP" },
    { id:"library", icon:Library, label:"SOP Library" },
    { id:"settings", icon:Settings, label:"Settings" }
  ];
  return (
    <div style={{ width:240, minWidth:240, height:"100vh", background:"var(--bg-surface)", borderRight:"1px solid var(--border-subtle)", display:"flex", flexDirection:"column", position:"sticky", top:0 }}>
      <div style={{ padding:"20px 16px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6.5V12.5C4 16.09 7.42 19.5 12 21C16.58 19.5 20 16.09 20 12.5V6.5L12 2Z" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 12L11 14L15 10" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"15px" }}>SOP Builder</span>
        </div>
      </div>
      <div style={{ padding:"0 8px", marginBottom:8 }}>
        <div style={{ height:1, background:"var(--border-subtle)" }}/>
      </div>
      <nav style={{ flex:1, padding:"8px" }}>
        {navItems.map(({ id, icon:Icon, label }) => (
          <button key={id} className={page===id ? "nav-active" : undefined}
            onClick={() => dispatch({ type:"NAVIGATE", page:id })}
            style={{ display:"flex", alignItems:"center", gap:"10px", width:"100%", padding:"9px 12px", borderRadius:"var(--r-md)", border:"none",
              background: page===id ? "var(--bg-hover)" : "transparent",
              color: page===id ? "var(--text-primary)" : "var(--text-tertiary)",
              cursor:"pointer", fontSize:"14px", fontFamily:"var(--font-body)", fontWeight:500,
              transition:"all 0.12s", marginBottom:"2px",
              borderLeft: page===id ? "2px solid var(--accent-primary)" : "2px solid transparent" }}>
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
      <div style={{ padding:"16px", borderTop:"1px solid var(--border-subtle)" }}>
        <div style={{ fontSize:"13px", fontWeight:600, color:"var(--text-primary)", marginBottom:"4px" }}>Built by Sai Kiran</div>
        <div style={{ fontSize:"11px", color:"var(--text-tertiary)", lineHeight:1.4 }}>Data cleared after session expires.</div>
      </div>
    </div>
  );
}

function AppShell({ route, dispatch, sops, settings, children }) {
  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
      <Sidebar route={route} dispatch={dispatch} sops={sops} settings={settings} />
      <div id="sop-scroll-container" style={{ flex:1, overflowY:"auto", background:"var(--bg-base)" }}>
        {children}
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardPage({ sops, dispatch }) {
  const alerts = useMemo(() => {
    const list = [];
    const ninetyDays = 90 * 24 * 60 * 60 * 1000;
    sops.forEach(sop => {
      if (sop.completeness_flags && sop.completeness_flags.length > 0) {
        list.push({
          id: `gap-${sop.id}`,
          type: "error",
          title: `Unresolved Gaps`,
          message: `"${sop.title}" has ${sop.completeness_flags.length} item(s) flagged for review.`,
          sopId: sop.id,
          icon: AlertCircle,
          color: "var(--error)"
        });
      }
      const ageMs = Date.now() - new Date(sop.metadata.updated_at).getTime();
      if (ageMs > ninetyDays) {
        list.push({
          id: `stale-${sop.id}`,
          type: "warning",
          title: `Process Stale`,
          message: `"${sop.title}" was last updated ${fmtRelative(sop.metadata.updated_at)}. Standard review is overdue.`,
          sopId: sop.id,
          icon: AlertTriangle,
          color: "var(--warning)"
        });
      }
    });
    return list;
  }, [sops]);

  const stats = [
    { label:"Total SOPs", value:sops.length, icon:FileText, trend:"+2 this month" },
    { label:"Live SOPs", value:sops.filter(s=>s.metadata.status==="live").length, icon:CheckCircle2, trend:"Active" },
    { label:"Avg. Completeness", value:(sops.length ? Math.round(sops.reduce((s,x)=>s+x.metadata.completeness_score,0)/sops.length) : 0)+"%", icon:Activity, trend:"Good health" },
    { label:"Open Flags", value:sops.reduce((s,x)=>s+x.completeness_flags.length,0), icon:AlertTriangle, trend:"Needs attention", warn:true }
  ];
  const quickCreate = [
    { icon:PenLine, t:"From Notes", d:"Paste a text description or summary" },
    { icon:Mic, t:"From Transcript", d:"Paste a meeting or voice transcript" },
    { icon:ClipboardList, t:"From Outline", d:"Paste a checklist or step list" }
  ];
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";
  return (
    <div className="page-enter" style={{ padding:"36px 40px", maxWidth:1100 }}>
      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"32px" }}>
        <div>
          <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"28px", letterSpacing:"-0.02em", marginBottom:"6px" }}>Dashboard</h1>
          <div style={{ fontSize:"14px", color:"var(--text-secondary)" }}>
            {greeting} — {now.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
          </div>
        </div>
        <Btn icon={Plus} onClick={() => dispatch({ type:"NAVIGATE", page:"create" })}>New SOP</Btn>
      </div>

      {/* STATS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"16px", marginBottom:"32px" }}>
        {stats.map(({label,value,icon:Icon,trend,warn},i) => (
          <div key={i} className="card-hover" onClick={() => i===0||i===1 ? dispatch({ type:"NAVIGATE", page:"library" }) : undefined}
            style={{ background:"var(--bg-card)", border:`1px solid ${warn&&Number(value)>0?"rgba(247,97,90,0.3)":"var(--border-default)"}`, borderRadius:"var(--r-lg)", padding:"20px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
              <Icon size={18} style={{ color:warn&&Number(value)>0?"var(--error)":"var(--accent-primary)" }} />
              <ArrowUpRight size={14} style={{ color:"var(--text-tertiary)" }}/>
            </div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"32px", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"4px" }}>{value}</div>
            <div style={{ fontSize:"13px", color:"var(--text-secondary)", marginBottom:"4px" }}>{label}</div>
            <Mono style={{ fontSize:"10px", color:warn&&Number(value)>0?"var(--error)":"var(--text-tertiary)" }}>{trend}</Mono>
          </div>
        ))}
      </div>

      {/* QUICK CREATE */}
      <div style={{ marginBottom:"32px" }}>
        <SectionDivider label="QUICK CREATE" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"12px" }}>
          {quickCreate.map(({icon:Icon,t,d},i) => (
            <div key={i} className="card-hover" onClick={() => dispatch({ type:"NAVIGATE", page:"create" })}
              style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-subtle)", borderRadius:"var(--r-lg)", padding:"18px", display:"flex", alignItems:"center", gap:"14px" }}>
              <div style={{ width:38, height:38, background:"var(--accent-glow)", borderRadius:"var(--r-md)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon size={18} style={{ color:"var(--accent-primary)" }}/>
              </div>
              <div>
                <div style={{ fontWeight:600, fontSize:"14px", marginBottom:"2px" }}>{t}</div>
                <div style={{ fontSize:"12px", color:"var(--text-tertiary)" }}>{d}</div>
              </div>
              <ArrowRight size={14} style={{ color:"var(--text-tertiary)", marginLeft:"auto", flexShrink:0 }}/>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT SOPs */}
      <div style={{ marginBottom:"32px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
          <SectionDivider label="RECENT SOPs" />
          {sops.length > 0 && <Btn variant="ghost" size="sm" onClick={() => dispatch({ type:"NAVIGATE", page:"library" })} iconRight={ArrowRight}>View All</Btn>}
        </div>
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", overflow:"hidden" }}>
          {sops.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-tertiary)" }}>
              <FileText size={32} style={{ color: "var(--accent-primary)", opacity: 0.5, marginBottom: "12px" }} />
              <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>No SOPs created yet</div>
              <div style={{ fontSize: "12px", marginBottom: "20px" }}>Generate your first SOP to populate the dashboard.</div>
              <Btn size="sm" icon={Plus} onClick={() => dispatch({ type: "NAVIGATE", page: "create" })}>Create SOP</Btn>
            </div>
          ) : (
            <table>
              <thead><tr>
                <th>Title</th><th>Category</th><th>Owner</th><th>Updated</th><th>Completeness</th><th>Status</th>
              </tr></thead>
              <tbody>
                {sops.map(sop => (
                  <tr key={sop.id} style={{ cursor:"pointer" }} onClick={() => dispatch({ type:"NAVIGATE", page:"view", sopId:sop.id })}>
                    <td><span style={{ fontWeight:600, color:"var(--text-primary)" }}>{sop.title}</span></td>
                    <td><CategoryBadge category={sop.metadata.category}/></td>
                    <td>{sop.metadata.owner}</td>
                    <td><Mono>{fmtRelative(sop.metadata.updated_at)}</Mono></td>
                    <td><div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <CompletionBar score={sop.metadata.completeness_score} width="80px" />
                      <Mono>{sop.metadata.completeness_score}%</Mono>
                    </div></td>
                    <td><StatusBadge status={sop.metadata.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ALERTS PANEL */}
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
          <SectionDivider label="ACTIVE ATTENTION REQUIRED" />
        </div>
        {alerts.length === 0 ? (
          <div style={{ background:"rgba(62,207,142,0.06)", border:"1px solid rgba(62,207,142,0.25)", borderRadius:"var(--r-lg)", padding:"18px", display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:"rgba(62,207,142,0.12)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--success)" }}>
              <Check size={16} />
            </div>
            <div>
              <div style={{ fontWeight:600, fontSize:"14px", color:"var(--text-primary)" }}>All processes healthy</div>
              <div style={{ fontSize:"12px", color:"var(--text-secondary)" }}>Zero stale documents or unresolved AI completeness flags detected.</div>
            </div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"12px" }}>
            {alerts.map(alert => {
              const Icon = alert.icon;
              return (
                <div key={alert.id} className="card-hover" onClick={() => dispatch({ type:"NAVIGATE", page:"view", sopId:alert.sopId })}
                  style={{ background:"var(--bg-card)", border:`1px solid ${alert.type==="error"?"rgba(247,97,90,0.3)":"rgba(245,165,36,0.3)"}`, borderRadius:"var(--r-lg)", padding:"16px", display:"flex", gap:"14px", alignItems:"flex-start" }}>
                  <div style={{ width:34, height:34, background:alert.type==="error"?"rgba(247,97,90,0.1)":"rgba(245,165,36,0.1)", borderRadius:"var(--r-md)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:alert.color }}>
                    <Icon size={18} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:"14px", color:"var(--text-primary)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      {alert.title}
                      <span style={{ fontSize:"10px", color:"var(--text-accent)", fontFamily:"var(--font-mono)" }}>
                        Resolve →
                      </span>
                    </div>
                    <div style={{ fontSize:"12px", color:"var(--text-secondary)", marginTop:2, lineHeight:1.5 }}>{alert.message}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── CREATE PAGE ───────────────────────────────────────────────────────────────
const GEN_STEPS = ["Analyzing your process input...","Identifying roles and responsibilities...","Building step-by-step instructions...","Detecting gaps and missing steps...","Finalizing your SOP..."];
const SOP_SYSTEM = `You are a principal-level operations consultant specializing in creating Standard Operating Procedures for technology companies, agencies, and operations teams.

Transform raw process knowledge — notes, transcripts, outlines, or descriptions — into a complete, professionally structured SOP.

CRITICAL RULES:
- Extract real, specific steps from the input. Never be generic.
- Assign roles to steps wherever determinable.
- Use imperative, action-oriented language: "Navigate to...", "Click...", "Confirm...", "Send..."
- Number steps sequentially from 1.
- Flag any unclear, ambiguous, or missing steps in completeness_flags.
- Infer reasonable structure when the input is thin — but flag what you inferred.

RETURN FORMAT: Valid JSON only. No preamble. No markdown fences. Exactly this schema:
{"title":"string","purpose":"string","scope":{"included":["string"],"excluded":["string"]},"roles":[{"role":"string","person_or_team":"string","responsibility":"string"}],"prerequisites":["string"],"steps":[{"step_number":1,"title":"string","description":"string","responsible_role":"string or null","tools_used":["string"],"is_decision_point":false,"decision_options":null,"flags":[]}],"decision_points":[{"condition":"string","if_true":"string","if_false":"string"}],"exceptions":[{"scenario":"string","handling":"string"}],"expected_output":"string","review_notes":{"review_frequency":"string","next_review_date":"string","update_triggers":["string"]},"completeness_flags":[{"severity":"high|medium|low","type":"gap|ambiguity|missing_role|missing_tool|inferred_step","step_reference":null,"description":"string","suggestion":"string"}]}`;

const INPUT_MODES = [
  { id:"notes", icon:PenLine, label:"Text Notes", ph:`Our client onboarding process starts when a new contract is signed. Sarah from sales sends an intro email to the project team. The PM then creates a Notion workspace and schedules a kickoff call within 48 hours. After the kickoff, the team has 5 days to deliver the first deliverable...` },
  { id:"transcript", icon:Mic, label:"Transcript", ph:`[00:02:14] So for the weekly reporting process, what happens is Marcus pulls the data from Salesforce on Monday morning...\n[00:03:45] Right, and then Sarah reviews it and sends to the client by noon...\n[00:04:22] And if there are anomalies, Jim flags them in Slack before it goes out...` },
  { id:"outline", icon:ClipboardList, label:"Outline", ph:`Weekly Report Process:\n1. Pull Salesforce data (Marcus, Monday 8am)\n2. Format in Notion template\n3. Review for accuracy\n4. Send via HubSpot to client list\n5. Notify team in Slack #reports` },
  { id:"document", icon:Upload, label:"Document", ph:"Paste document content here..." }
];

async function callOpenRouterAPI(system, userContent, maxTokens=4000) {
  let apiKey = atob("c2stb3ItdjEtZTg0YjM3NTQ0MWFiMzVkOTEyZWU4ZTg3MjY1NzFmNDMwYjIxZTY1MWJiYWE2ZWM3ZWQxNTJkMzllYTI2NWVhNQ==");
  let model = "anthropic/claude-sonnet-4";
  try {
    const stored = sessionStorage.getItem("sop-builder-settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed) {
        if (parsed.model) model = parsed.model;
      }
    }
  } catch(e) {}

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin || "https://sopbuilder.team",
      "X-Title": "SOP Builder for Teams"
    },
    body:JSON.stringify({
      model: model,
      messages:[
        { role:"system", content:system },
        { role:"user", content:userContent }
      ],
      max_tokens:maxTokens
    })
  });
  const data = await res.json();
  if(data.error) throw new Error(data.error.message || JSON.stringify(data.error));
  return data.choices[0].message.content.replace(/```json\n?|```\n?/g,"").trim();
}

function CreatePage({ dispatch }) {
  const [form, setForm] = useState({ processName:"", department:"", owner:"", frequency:"weekly", priority:"medium", inputMode:"notes", input:"", additionalContext:"", tools:"" });
  const [isGen, setIsGen] = useState(false);
  const [genStep, setGenStep] = useState(-1);
  const [error, setError] = useState(null);
  const [showContext, setShowContext] = useState(false);

  const handleGenerate = useCallback(async () => {
    if(!form.input.trim()) { setError("Please add some process input before generating."); return; }
    if(!form.processName.trim()) { setError("Please enter a process name."); return; }
    setError(null); setIsGen(true); setGenStep(0);
    const stepInterval = setInterval(() => setGenStep(s => s < GEN_STEPS.length-1 ? s+1 : s), 900);
    try {
      const userMsg = `Process Name: ${form.processName}\nDepartment: ${form.department||"Not specified"}\nOwner: ${form.owner||"Not specified"}\nFrequency: ${form.frequency}\nInput Type: ${form.inputMode}\n\nRAW PROCESS INPUT:\n${form.input}${form.additionalContext?`\n\nAdditional Context: ${form.additionalContext}`:""}${form.tools?`\nTools used: ${form.tools}`:""}`;
      const raw = await callOpenRouterAPI(SOP_SYSTEM, userMsg);
      const parsed = JSON.parse(raw);
      const id = genId();
      const score = computeScore({...parsed, metadata:{ owner:form.owner, status:"draft" }});
      const sop = { ...parsed, id, metadata:{
        category:form.department||"Operations", department:form.department||"Operations",
        owner:form.owner||"Unassigned", frequency:form.frequency,
        version:"1.0", status:"draft", priority:form.priority,
        created_at:new Date().toISOString(), updated_at:new Date().toISOString(),
        completeness_score:score
      }};
      clearInterval(stepInterval); setGenStep(GEN_STEPS.length-1);
      setTimeout(() => { dispatch({ type:"ADD_SOP", sop }); dispatch({ type:"NAVIGATE", page:"view", sopId:id }); setIsGen(false); }, 600);
    } catch(e) {
      clearInterval(stepInterval); setIsGen(false); setGenStep(-1);
      setError(`Generation failed: ${e.message}. Please check your input and try again.`);
    }
  }, [form, dispatch]);

  const activeMode = INPUT_MODES.find(m=>m.id===form.inputMode);
  return (
    <div className="page-enter" style={{ maxWidth:720, margin:"0 auto", padding:"36px 40px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"28px" }}>
        <Btn variant="ghost" size="sm" icon={ChevronLeft} onClick={() => dispatch({ type:"NAVIGATE", page:"dashboard" })}>Back</Btn>
        <div style={{ height:16, width:1, background:"var(--border-subtle)" }}/>
        <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"24px", letterSpacing:"-0.02em" }}>Create New SOP</h1>
      </div>

      {/* STEP INDICATOR */}
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"32px" }}>
        {["01 INPUT","02 GENERATE","03 REVIEW"].map((s,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <Mono style={{ color: i===0 ? "var(--accent-primary)" : "var(--text-tertiary)", fontSize:"11px" }}>{s}</Mono>
            {i<2 && <div style={{ width:20, height:1, background:"var(--border-subtle)" }}/>}
          </div>
        ))}
      </div>

      {/* CONTEXT */}
      <Card style={{ marginBottom:"20px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"14px" }}>
          <div>
            <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Process Name *</label>
            <input value={form.processName} onChange={e=>setForm(p=>({...p,processName:e.target.value}))} placeholder="e.g. Weekly Client Report Distribution" />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            <div>
              <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Department / Team</label>
              <input value={form.department} onChange={e=>setForm(p=>({...p,department:e.target.value}))} placeholder="e.g. Customer Success" />
            </div>
            <div>
              <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Process Owner</label>
              <input value={form.owner} onChange={e=>setForm(p=>({...p,owner:e.target.value}))} placeholder="e.g. Sarah Chen" />
            </div>
            <div>
              <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Frequency</label>
              <select value={form.frequency} onChange={e=>setForm(p=>({...p,frequency:e.target.value}))}>
                <option value="daily">Daily</option><option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option><option value="ad-hoc">Ad-hoc</option>
                <option value="event-driven">Event-driven</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Priority</label>
              <select value={form.priority} onChange={e=>setForm(p=>({...p,priority:e.target.value}))}>
                <option value="low">Low</option><option value="medium">Medium</option>
                <option value="high">High</option><option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* INPUT MODES */}
      <Card style={{ marginBottom:"20px" }}>
        <div style={{ display:"flex", gap:"4px", marginBottom:"16px", background:"var(--bg-surface)", padding:"4px", borderRadius:"var(--r-md)" }}>
          {INPUT_MODES.map(({id,icon:Icon,label}) => (
            <button key={id} onClick={()=>setForm(p=>({...p,inputMode:id}))}
              style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"6px",
                padding:"8px 10px", borderRadius:"var(--r-sm)", border:"none", cursor:"pointer",
                fontSize:"12px", fontFamily:"var(--font-body)", transition:"all 0.15s",
                background: form.inputMode===id ? "var(--bg-card)" : "transparent",
                color: form.inputMode===id ? "var(--text-primary)" : "var(--text-tertiary)",
                boxShadow: form.inputMode===id ? "0 1px 3px rgba(0,0,0,0.2)" : "none" }}>
              <Icon size={13}/>{label}
            </button>
          ))}
        </div>
        <div style={{ fontSize:"12px", color:"var(--text-tertiary)", marginBottom:"10px" }}>
          {form.inputMode==="notes" && "Paste a freeform text description or summary of the process."}
          {form.inputMode==="transcript" && "Paste meeting notes, voice-to-text output, or recorded call transcripts."}
          {form.inputMode==="outline" && "Paste a numbered checklist, step list, or rough outline."}
          {form.inputMode==="document" && "Paste document content or a structured description."}
        </div>
        <textarea value={form.input} onChange={e=>setForm(p=>({...p,input:e.target.value}))}
          rows={10} placeholder={activeMode?.ph} style={{ fontSize:"13px", lineHeight:1.7 }}/>
        <div style={{ textAlign:"right", marginTop:"6px" }}>
          <Mono>{form.input.length} chars</Mono>
        </div>
      </Card>

      {/* OPTIONAL CONTEXT */}
      <div style={{ marginBottom:"24px" }}>
        <button onClick={()=>setShowContext(v=>!v)} style={{ display:"flex", alignItems:"center", gap:"6px", background:"none", border:"none", color:"var(--text-secondary)", cursor:"pointer", fontSize:"13px", fontFamily:"var(--font-body)" }}>
          {showContext ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
          {showContext ? "Hide" : "+ Add"} Additional Context (Optional)
        </button>
        {showContext && (
          <div style={{ marginTop:"14px", display:"flex", flexDirection:"column", gap:"12px" }}>
            <div>
              <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Tools & Systems Used (comma-separated)</label>
              <input value={form.tools} onChange={e=>setForm(p=>({...p,tools:e.target.value}))} placeholder="e.g. Slack, Notion, Salesforce, HubSpot" />
            </div>
            <div>
              <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Known Exceptions or Edge Cases</label>
              <textarea value={form.additionalContext} onChange={e=>setForm(p=>({...p,additionalContext:e.target.value}))} rows={3} placeholder="Any known edge cases, exceptions, or additional context..." style={{ fontSize:"13px" }}/>
            </div>
          </div>
        )}
      </div>

      {error && <div style={{ background:"rgba(247,97,90,0.1)", border:"1px solid rgba(247,97,90,0.3)", borderRadius:"var(--r-md)", padding:"12px 16px", marginBottom:"16px", fontSize:"13px", color:"var(--error)" }}>{error}</div>}

      {/* GENERATION FLOW */}
      {isGen ? (
        <Card style={{ padding:"32px", border:"1px solid rgba(123,104,238,0.3)", boxShadow:"0 8px 32px rgba(123,104,238,0.06)" }}>
          <div style={{ marginBottom:"24px" }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"18px", marginBottom:"6px", display:"flex", alignItems:"center", gap:"8px" }}>
              <Sparkles size={16} style={{ color:"var(--accent-primary)", animation:"pulse 1.5s infinite" }}/>
              Building your SOP...
            </div>
            <div style={{ fontSize:"13px", color:"var(--text-secondary)" }}>AI is analyzing your input and generating a structured, professional procedure.</div>
          </div>
          
          <div style={{ display:"flex", flexDirection:"column", gap:"14px", marginBottom:"32px" }}>
            {GEN_STEPS.map((step, i) => {
              const isActive = i === genStep;
              const isComplete = i < genStep;
              const isPending = i > genStep;
              
              return (
                <div key={i} className={isActive ? "gen-step" : undefined}
                  style={{ display:"flex", alignItems:"center", gap:"12px", 
                    opacity: isPending ? 0.35 : 1, 
                    transition:"all 0.3s ease",
                    transform: isPending ? "translateX(6px)" : "translateX(0)" }}>
                  
                  {isComplete ? (
                    <div style={{ width:20, height:20, borderRadius:"50%", background:"var(--success)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--bg-base)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17L4 12" strokeDasharray="24" strokeDashoffset="24" style={{ animation: "drawCheck 0.4s ease-out forwards" }} />
                      </svg>
                    </div>
                  ) : isActive ? (
                    <div style={{ position:"relative", width:20, height:20, borderRadius:"50%", background:"var(--accent-glow)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--accent-primary)" }} />
                      <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid var(--accent-primary)", animation:"ringPulse 1.2s infinite" }} />
                    </div>
                  ) : (
                    <div style={{ width:20, height:20, borderRadius:"50%", background:"var(--bg-surface)", border:"1px solid var(--border-default)", flexShrink:0 }} />
                  )}
                  
                  <span style={{ fontSize:"13px", fontWeight: isActive ? 600 : 400, color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Skeleton Document Shape */}
          <SectionDivider label="SOP STRUCTURE PREVIEW" />
          <div style={{ opacity:0.25, display:"flex", flexDirection:"column", gap:"12px", background:"rgba(22,22,31,0.5)", borderRadius:"var(--r-md)", padding:"16px", border:"1px dashed var(--border-subtle)" }}>
            <SkeletonBlock h={14} w="40%" br={4} />
            <div style={{ display:"flex", gap:6, margin:"4px 0" }}>
              <SkeletonBlock h={16} w="60px" br={99} />
              <SkeletonBlock h={16} w="45px" br={99} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:8 }}>
              <SkeletonBlock h={8} w="95%" />
              <SkeletonBlock h={8} w="80%" />
              <SkeletonBlock h={8} w="88%" />
            </div>
          </div>
        </Card>
      ) : (
        <button onClick={handleGenerate} style={{ width:"100%", padding:"16px", background:"var(--accent-primary)", border:"none", borderRadius:"var(--r-md)", color:"var(--text-primary)", fontSize:"16px", fontFamily:"var(--font-display)", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", boxShadow:"0 0 24px rgba(123,104,238,0.25)", transition:"all 0.15s", letterSpacing:"-0.01em" }}
          onMouseEnter={e=>e.target.style.boxShadow="0 0 40px rgba(123,104,238,0.4)"}
          onMouseLeave={e=>e.target.style.boxShadow="0 0 24px rgba(123,104,238,0.25)"}>
          <Sparkles size={18}/> Generate SOP with AI <ArrowRight size={18}/>
        </button>
      )}
    </div>
  );
}

// ── SOP VIEWER ────────────────────────────────────────────────────────────────
// ── HELPER COMPONENTS FOR VIEWER ─────────────────────────────────────────────
function InlineEdit({ value, onSave, multiline }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  
  if (editing) {
    return (
      <div style={{ width: "100%", marginTop: 8 }}>
        {multiline ? (
          <textarea value={val} onChange={e=>setVal(e.target.value)} rows={3} style={{ width:"100%", marginBottom:8, fontSize:"14px", lineHeight:1.7 }} />
        ) : (
          <input value={val} onChange={e=>setVal(e.target.value)} style={{ width:"100%", marginBottom:8, fontSize:"14px" }} />
        )}
        <div style={{ display:"flex", gap:6 }}>
          <Btn variant="primary" size="sm" onClick={() => { onSave(val); setEditing(false); }}>Save</Btn>
          <Btn variant="secondary" size="sm" onClick={() => { setVal(value); setEditing(false); }}>Cancel</Btn>
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} style={{ cursor: "pointer", border:"1px dashed transparent", transition:"all 0.15s", borderRadius:"var(--r-sm)", padding:"4px" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-strong)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
      <p style={{ display:"inline", fontSize:"14px", color:"var(--text-secondary)", lineHeight:1.7 }}>{value}</p>
      <Pencil size={12} style={{ marginLeft:8, color:"var(--text-tertiary)", display:"inline-block", verticalAlign:"middle" }} />
    </div>
  );
}

function DecisionBlock({ dp }) {
  return (
    <div style={{ background:"var(--bg-elevated)", borderRadius:"var(--r-md)", padding:"20px", marginBottom:"12px", border:"1px solid var(--border-subtle)", overflowX:"auto" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"40px", position:"relative", minWidth:600, padding:"10px 0" }}>
        {/* IF box */}
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-sm)", padding:"12px 16px", width:180, zIndex:2, flexShrink:0 }}>
          <Mono style={{ color:"var(--accent-primary)", display:"block", marginBottom:4 }}>IF CONDITION</Mono>
          <span style={{ fontSize:"13px", fontWeight:600, color:"var(--text-primary)" }}>{dp.condition}</span>
        </div>

        {/* Branching SVG Connector */}
        <div style={{ width:60, height:80, position:"relative", zIndex:1, flexShrink:0 }}>
          <svg width="60" height="80" style={{ overflow:"visible" }}>
            <path d="M 0 40 L 30 40 L 30 15 L 60 15" fill="none" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 30 40 L 30 65 L 60 65" fill="none" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="0" cy="40" r="3" fill="var(--accent-primary)" />
            <circle cx="60" cy="15" r="3" fill="var(--success)" />
            <circle cx="60" cy="65" r="3" fill="var(--warning)" />
          </svg>
        </div>

        {/* Actions Column */}
        <div style={{ display:"flex", flexDirection:"column", gap:"12px", zIndex:2, flexShrink:0 }}>
          {/* THEN branch */}
          <div style={{ background:"var(--bg-card)", border:"1px solid rgba(62,207,142,0.25)", borderLeft:"3px solid var(--success)", borderRadius:"var(--r-sm)", padding:"10px 14px", width:220 }}>
            <Mono style={{ color:"var(--success)", display:"block", marginBottom:2 }}>THEN</Mono>
            <span style={{ fontSize:"13px", color:"var(--text-primary)" }}>{dp.if_true}</span>
          </div>
          {/* ELSE branch */}
          <div style={{ background:"var(--bg-card)", border:"1px solid rgba(245,165,36,0.25)", borderLeft:"3px solid var(--warning)", borderRadius:"var(--r-sm)", padding:"10px 14px", width:220 }}>
            <Mono style={{ color:"var(--warning)", display:"block", marginBottom:2 }}>ELSE</Mono>
            <span style={{ fontSize:"13px", color:"var(--text-primary)" }}>{dp.if_false}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SOP VIEWER ────────────────────────────────────────────────────────────────
function SOPViewer({ sop, dispatch, allSops }) {
  const [collapsed, setCollapsed] = useState({});
  const [checkedPrereqs, setCheckedPrereqs] = useState({});
  const [checkedScope, setCheckedScope] = useState({});
  const [copyOk, setCopyOk] = useState(false);
  const toggle = (k) => setCollapsed(p=>({...p,[k]:!p[k]}));
  const copyLink = () => { navigator.clipboard?.writeText(`SOP: ${sop.title}`); setCopyOk(true); setTimeout(()=>setCopyOk(false),2000); };

  const Section = ({ id, label, icon:Icon, children }) => (
    <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", overflow:"hidden", marginBottom:"12px" }}>
      <div onClick={()=>toggle(id)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", cursor:"pointer", transition:"background 0.12s" }}
        onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <Icon size={15} style={{ color:"var(--accent-primary)" }}/>
          <Mono style={{ fontSize:"10px", letterSpacing:"0.1em" }}>{label}</Mono>
        </div>
        {collapsed[id] ? <ChevronDown size={14} style={{ color:"var(--text-tertiary)" }}/> : <ChevronUp size={14} style={{ color:"var(--text-tertiary)" }}/>}
      </div>
      {!collapsed[id] && <div style={{ padding:"0 20px 20px" }}>{children}</div>}
    </div>
  );

  if(!sop) return <div style={{ padding:40 }}><EmptyState icon={FileText} title="SOP not found" sub="This SOP may have been deleted." action="Go to Library" onAction={()=>dispatch({type:"NAVIGATE",page:"library"})}/></div>;

  // Related SOPs logic
  const displayRelated = allSops
    .filter(s => s.id !== sop.id && s.metadata.category === sop.metadata.category)
    .slice(0, 3);
  const fallbackRelated = displayRelated.length > 0 ? displayRelated : allSops.filter(s => s.id !== sop.id).slice(0, 2);

  return (
    <div className="page-enter" style={{ display:"flex", gap:"24px", padding:"36px 40px", alignItems:"flex-start" }}>
      {/* MAIN */}
      <div style={{ flex:1, minWidth:0, maxWidth:800 }}>
        {/* BREADCRUMB + BACK */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"24px" }}>
          <Btn variant="ghost" size="sm" icon={ChevronLeft} onClick={()=>dispatch({type:"NAVIGATE",page:"library"})}>Library</Btn>
          <ChevronRight size={12} style={{color:"var(--text-tertiary)"}}/>
          <span style={{ fontSize:"13px", color:"var(--text-secondary)" }}>{sop.title}</span>
        </div>

        {/* DOC HEADER */}
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-xl)", padding:"28px", marginBottom:"20px" }}>
          <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"28px", letterSpacing:"-0.02em", marginBottom:"12px", lineHeight:1.2 }}>{sop.title}</h1>
          <div style={{ display:"flex", gap:"16px", marginBottom:"14px", flexWrap:"wrap" }}>
            <Mono>ID: {sop.id.slice(0,12)}</Mono>
            <Mono>v{sop.metadata.version}</Mono>
            <Mono>Updated {fmtRelative(sop.metadata.updated_at)}</Mono>
            <Mono>Owner: {sop.metadata.owner}</Mono>
          </div>
          <div style={{ display:"flex", gap:"8px", marginBottom:"16px", flexWrap:"wrap" }}>
            <CategoryBadge category={sop.metadata.category}/>
            <StatusBadge status={sop.metadata.status}/>
            <Badge color="var(--info)" mono>{sop.metadata.frequency}</Badge>
            <Badge color="var(--warning)" mono>{sop.metadata.priority}</Badge>
          </div>
          <div style={{ marginBottom:"16px" }}>
            <div style={{ fontSize:"12px", color:"var(--text-secondary)", marginBottom:"6px" }}>Completeness</div>
            <CompletionBar score={sop.metadata.completeness_score} showLabel/>
          </div>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            <Btn variant="primary" size="sm" icon={Edit3} onClick={()=>dispatch({type:"NAVIGATE",page:"edit",sopId:sop.id})}>Edit SOP</Btn>
            <Btn variant="secondary" size="sm" icon={Wand2} onClick={()=>dispatch({type:"NAVIGATE",page:"enable",sopId:sop.id})}>Team Enablement</Btn>
            <Btn variant="secondary" size="sm" icon={copyOk?CheckCircle2:Share2} onClick={copyLink}>{copyOk?"Copied!":"Share Link"}</Btn>
            <Btn variant="ghost" size="sm" icon={Download}>Export PDF</Btn>
            <Btn variant="ghost" size="sm" icon={Copy}>Duplicate</Btn>
          </div>
        </div>

        {/* PURPOSE */}
        <Section id="purpose" label="PURPOSE" icon={Target}>
          <InlineEdit value={sop.purpose} onSave={(val) => {
            const updated = { ...sop, purpose: val, metadata: { ...sop.metadata, updated_at: new Date().toISOString() } };
            dispatch({ type: "UPDATE_SOP", sop: updated });
          }} multiline />
        </Section>

        {/* SCOPE */}
        <Section id="scope" label="SCOPE" icon={Layers}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
            <div>
              <div style={{ fontSize:"12px", fontWeight:600, color:"var(--success)", marginBottom:"8px" }}>✓ Included</div>
              {sop.scope.included.map((item,i) => (
                <div key={i} style={{ display:"flex", gap:"8px", alignItems:"flex-start", marginBottom:"6px" }}>
                  <CheckCircle2 size={13} style={{ color:"var(--success)", marginTop:2, flexShrink:0 }}/>
                  <span style={{ fontSize:"13px", color:"var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:"12px", fontWeight:600, color:"var(--error)", marginBottom:"8px" }}>✗ Excluded</div>
              {sop.scope.excluded.map((item,i) => (
                <div key={i} style={{ display:"flex", gap:"8px", alignItems:"flex-start", marginBottom:"6px" }}>
                  <X size={13} style={{ color:"var(--error)", marginTop:2, flexShrink:0 }}/>
                  <span style={{ fontSize:"13px", color:"var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ROLES */}
        <Section id="roles" label="ROLES & RESPONSIBILITIES" icon={Users}>
          <table>
            <thead><tr><th>Role</th><th>Person / Team</th><th>Responsibility</th></tr></thead>
            <tbody>{sop.roles.map((r,i) => (
              <tr key={i}>
                <td><Badge color={catColor(r.role)}>{r.role}</Badge></td>
                <td style={{ color:"var(--text-primary)" }}>{r.person_or_team}</td>
                <td>{r.responsibility}</td>
              </tr>
            ))}</tbody>
          </table>
        </Section>

        {/* PREREQUISITES */}
        {sop.prerequisites?.length > 0 && (
          <Section id="prereqs" label="PREREQUISITES" icon={CheckSquare}>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {sop.prerequisites.map((p,i) => (
                <label key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start", cursor:"pointer" }}>
                  <input type="checkbox" checked={!!checkedPrereqs[i]} onChange={()=>setCheckedPrereqs(s=>({...s,[i]:!s[i]}))} style={{ width:"auto", marginTop:2 }}/>
                  <span style={{ fontSize:"13px", color:checkedPrereqs[i]?"var(--text-tertiary)":"var(--text-primary)", textDecoration:checkedPrereqs[i]?"line-through":"none", transition:"all 0.15s" }}>{p}</span>
                </label>
              ))}
            </div>
          </Section>
        )}

        {/* STEPS */}
        <Section id="steps" label="STEP-BY-STEP INSTRUCTIONS" icon={ListChecks}>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {sop.steps.map((step,i) => (
              <div key={i} className="step-card" style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-subtle)", borderLeft:"3px solid transparent", borderRadius:"var(--r-md)", padding:"16px 18px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"24px", fontWeight:500, color:"var(--border-strong)", lineHeight:1 }}>{String(step.step_number).padStart(2,"0")}</span>
                    <span style={{ fontWeight:600, fontSize:"14px", color:"var(--text-primary)" }}>{step.title}</span>
                  </div>
                  {step.responsible_role && <Badge color={catColor(step.responsible_role)}>{step.responsible_role}</Badge>}
                </div>
                <p style={{ fontSize:"13px", color:"var(--text-secondary)", lineHeight:1.65, marginLeft:36, marginBottom:step.tools_used?.length||step.is_decision_point?10:0 }}>{step.description}</p>
                {(step.tools_used?.length>0 || step.is_decision_point) && (
                  <div style={{ display:"flex", gap:"8px", marginLeft:36, flexWrap:"wrap" }}>
                    {step.tools_used?.map(t=><Badge key={t} color="var(--info)" size="xs" mono>{t}</Badge>)}
                    {step.is_decision_point && <Badge color="var(--warning)" size="xs">⚡ Decision Point</Badge>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* DECISION POINTS */}
        {sop.decision_points?.length > 0 && (
          <Section id="decisions" label="DECISION POINTS" icon={GitBranch}>
            {sop.decision_points.map((dp,i) => (
              <DecisionBlock key={i} dp={dp} />
            ))}
          </Section>
        )}

        {/* EXCEPTIONS */}
        {sop.exceptions?.length > 0 && (
          <Section id="exceptions" label="EXCEPTIONS & EDGE CASES" icon={Shield}>
            {sop.exceptions.map((ex,i) => (
              <div key={i} style={{ background:"var(--bg-elevated)", borderRadius:"var(--r-md)", padding:"14px 16px", marginBottom:"8px" }}>
                <div style={{ fontWeight:600, fontSize:"13px", marginBottom:"4px" }}>{ex.scenario}</div>
                <div style={{ fontSize:"13px", color:"var(--text-secondary)", lineHeight:1.6 }}>{ex.handling}</div>
              </div>
            ))}
          </Section>
        )}

        {/* EXPECTED OUTPUT */}
        <Section id="output" label="EXPECTED OUTPUT" icon={Award}>
          <p style={{ fontSize:"14px", color:"var(--text-secondary)", lineHeight:1.7 }}>{sop.expected_output}</p>
        </Section>

        {/* FLAGS */}
        {sop.completeness_flags?.length > 0 && (
          <div style={{ background:"rgba(247,97,90,0.06)", border:"1px solid rgba(247,97,90,0.25)", borderRadius:"var(--r-lg)", overflow:"hidden", marginBottom:"12px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"14px 20px", borderBottom:"1px solid rgba(247,97,90,0.2)" }}>
              <AlertTriangle size={15} style={{ color:"var(--warning)" }}/>
              <span style={{ fontSize:"13px", fontWeight:600 }}>{sop.completeness_flags.length} item{sop.completeness_flags.length>1?"s":""} flagged for review</span>
            </div>
            <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:"10px" }}>
              {sop.completeness_flags.map((f,i) => (
                <div key={i} style={{ display:"flex", gap:"12px", alignItems:"flex-start" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:f.severity==="high"?"var(--error)":f.severity==="medium"?"var(--warning)":"var(--info)", marginTop:4, flexShrink:0 }}/>
                  <div>
                    <div style={{ fontSize:"13px", color:"var(--text-primary)", marginBottom:"2px" }}>{f.description}</div>
                    <div style={{ fontSize:"12px", color:"var(--text-tertiary)" }}>→ {f.suggestion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* METADATA PANEL */}
      <div style={{ width:220, flexShrink:0, position:"sticky", top:36 }}>
        {/* Status Dropdown */}
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", padding:"16px", marginBottom:"12px" }}>
          <SectionDivider label="PROCESS STATUS" />
          <select value={sop.metadata.status} onChange={e => {
            const updated = { ...sop, metadata: { ...sop.metadata, status: e.target.value, updated_at: new Date().toISOString() } };
            dispatch({ type:"UPDATE_SOP", sop: updated });
            dispatch({ type:"SET_TOAST", toast: { type:"success", message: `Status updated to ${e.target.value}` } });
          }} style={{ fontSize:"13px", width:"100%" }}>
            <option value="draft">Draft</option>
            <option value="live">Live</option>
            <option value="needs-review">Needs Review</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Quick Stats */}
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", padding:"16px", marginBottom:"12px" }}>
          <SectionDivider label="QUICK STATS" />
          {[
            ["Steps",sop.steps?.length||0],["Roles",sop.roles?.length||0],
            ["Flags",sop.completeness_flags?.length||0],["Version",`v${sop.metadata.version}`]
          ].map(([l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
              <span style={{ fontSize:"12px", color:"var(--text-secondary)" }}>{l}</span>
              <Mono style={{ color:"var(--text-primary)" }}>{v}</Mono>
            </div>
          ))}
        </div>

        {/* Related SOPs */}
        {fallbackRelated.length > 0 && (
          <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", padding:"16px", marginBottom:"12px" }}>
            <SectionDivider label="RELATED PROCESSES" />
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {fallbackRelated.map(rel => (
                <div key={rel.id} onClick={() => dispatch({ type:"NAVIGATE", page:"view", sopId:rel.id })}
                  style={{ fontSize:"12px", color:"var(--text-secondary)", cursor:"pointer", padding:"6px 8px", borderRadius:"var(--r-sm)", border:"1px solid transparent", display:"flex", gap:4, alignItems:"center" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
                  <FileText size={12} style={{ color:"var(--accent-primary)", flexShrink:0 }} />
                  <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{rel.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Version History */}
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", padding:"16px", marginBottom:"12px" }}>
          <SectionDivider label="VERSION HISTORY" />
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"11px", color:"var(--text-secondary)" }}>
              <span>v{sop.metadata.version} (Active)</span>
              <Mono>{fmtDate(sop.metadata.updated_at)}</Mono>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"11px", color:"var(--text-tertiary)", opacity:0.6 }}>
              <span>v1.0 (Created)</span>
              <Mono>{fmtDate(sop.metadata.created_at)}</Mono>
            </div>
          </div>
        </div>

        <Btn full variant="secondary" size="sm" icon={Wand2} onClick={()=>dispatch({type:"NAVIGATE",page:"enable",sopId:sop.id})}>
          Team Enablement
        </Btn>
        <div style={{ marginTop:"8px" }}>
          <Btn full variant="ghost" size="sm" icon={Trash2} onClick={()=>{ dispatch({type:"DELETE_SOP",id:sop.id}); dispatch({type:"NAVIGATE",page:"library"}); }}>
            Delete SOP
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ── LIBRARY ───────────────────────────────────────────────────────────────────
function LibraryPage({ sops, filters, dispatch }) {
  const { category, sort, view, search } = filters;
  const categories = ["All",...new Set(sops.map(s=>s.metadata.category))];
  const filtered = useMemo(() => {
    let r = [...sops];
    if(category!=="all") r = r.filter(s=>s.metadata.category===category);
    if(search) r = r.filter(s=>s.title.toLowerCase().includes(search.toLowerCase())||s.purpose?.toLowerCase().includes(search.toLowerCase()));
    if(sort==="updated") r.sort((a,b)=>new Date(b.metadata.updated_at)-new Date(a.metadata.updated_at));
    else if(sort==="alpha") r.sort((a,b)=>a.title.localeCompare(b.title));
    else if(sort==="score") r.sort((a,b)=>b.metadata.completeness_score-a.metadata.completeness_score);
    return r;
  }, [sops,category,sort,search]);

  return (
    <div className="page-enter" style={{ padding:"36px 40px" }}>
      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
        <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"28px", letterSpacing:"-0.02em" }}>SOP Library</h1>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          <SearchInput
            value={search}
            onChange={val=>dispatch({type:"SET_FILTERS",filters:{search:val}})}
            placeholder="Search SOPs..."
            style={{ width:240 }}
          />
          <div style={{ display:"flex", border:"1px solid var(--border-default)", borderRadius:"var(--r-md)", overflow:"hidden" }}>
            {[["grid",Grid],["list",List]].map(([id,Icon])=>(
              <button key={id} onClick={()=>dispatch({type:"SET_FILTERS",filters:{view:id}})} style={{ padding:"8px 10px", border:"none", cursor:"pointer", background:view===id?"var(--bg-hover)":"var(--bg-surface)", color:view===id?"var(--text-primary)":"var(--text-tertiary)", transition:"all 0.12s" }}><Icon size={14}/></button>
            ))}
          </div>
          <Btn icon={Plus} onClick={()=>dispatch({type:"NAVIGATE",page:"create"})}>New SOP</Btn>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"24px", flexWrap:"wrap" }}>
        {categories.map(c=>(
          <button key={c} onClick={()=>dispatch({type:"SET_FILTERS",filters:{category:c==="All"?"all":c}})}
            style={{ padding:"6px 14px", borderRadius:"var(--r-pill)", fontSize:"12px", fontFamily:"var(--font-body)", cursor:"pointer", transition:"all 0.12s", border:`1px solid ${(c==="All"&&category==="all")||(c===category)?"var(--accent-primary)":"var(--border-default)"}`, background:(c==="All"&&category==="all")||(c===category)?"rgba(123,104,238,0.1)":"transparent", color:(c==="All"&&category==="all")||(c===category)?"var(--accent-primary)":"var(--text-secondary)" }}>
            {c}
          </button>
        ))}
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"6px" }}>
          <Mono>Sort:</Mono>
          <select value={sort} onChange={e=>dispatch({type:"SET_FILTERS",filters:{sort:e.target.value}})} style={{ width:"auto", padding:"5px 10px", fontSize:"12px" }}>
            <option value="updated">Last Updated</option>
            <option value="alpha">Alphabetical</option>
            <option value="score">Completeness</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Library} title="Your team's first SOP is waiting to be built." sub="Paste a process description and watch SOP Builder turn it into a clear, structured document in seconds." action="Create First SOP" onAction={()=>dispatch({type:"NAVIGATE",page:"create"})}/>
      ) : view==="grid" ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px" }}>
          {filtered.map(sop=>(
            <div key={sop.id} className="card-hover" onClick={()=>dispatch({type:"NAVIGATE",page:"view",sopId:sop.id})}
              style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", padding:"20px", position:"relative" }}>
              <div style={{ position:"absolute", top:16, right:16 }}><StatusBadge status={sop.metadata.status}/></div>
              <CategoryBadge category={sop.metadata.category}/>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"15px", margin:"10px 0 8px", paddingRight:60, lineHeight:1.3 }}>{sop.title}</h3>
              <p style={{ fontSize:"12px", color:"var(--text-secondary)", marginBottom:"16px", lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{sop.purpose}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid var(--border-subtle)", paddingTop:"12px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"var(--accent-glow)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:700, color:"var(--accent-primary)" }}>{sop.metadata.owner[0]}</div>
                  <Mono style={{ fontSize:"10px" }}>{fmtRelative(sop.metadata.updated_at)}</Mono>
                </div>
                <CompletionBar score={sop.metadata.completeness_score} width="70px" showLabel/>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", overflow:"hidden" }}>
          <table>
            <thead><tr><th>Title</th><th>Category</th><th>Owner</th><th>Updated</th><th>Completeness</th><th>Status</th></tr></thead>
            <tbody>{filtered.map(sop=>(
              <tr key={sop.id} style={{ cursor:"pointer" }} onClick={()=>dispatch({type:"NAVIGATE",page:"view",sopId:sop.id})}>
                <td><span style={{ fontWeight:600, color:"var(--text-primary)" }}>{sop.title}</span></td>
                <td><CategoryBadge category={sop.metadata.category}/></td>
                <td>{sop.metadata.owner}</td>
                <td><Mono>{fmtRelative(sop.metadata.updated_at)}</Mono></td>
                <td><CompletionBar score={sop.metadata.completeness_score} width="80px" showLabel/></td>
                <td><StatusBadge status={sop.metadata.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── TEAM ENABLEMENT ───────────────────────────────────────────────────────────
const FORMATS = [
  { id:"checklist", icon:CheckSquare, label:"Checklist View", desc:"Step-by-step actionable checklist for daily execution",
    system:`Convert this SOP JSON into an execution-ready checklist. Group steps into logical phases. Each item under 15 words, actionable. Return ONLY valid JSON: [{"phase":"string","items":[{"id":1,"text":"string","role":"string or null","done":false}]}]` },
  { id:"onboarding", icon:BookOpen, label:"Onboarding Guide", desc:"Simplified beginner version with context and tips",
    system:`Rewrite this SOP as a friendly beginner-ready onboarding guide. Assume zero prior knowledge. Explain the "why" behind key steps. Return ONLY valid JSON: {"introduction":"string","steps":[{"number":1,"title":"string","instruction":"string","why_it_matters":"string","tip":"string or null"}],"common_mistakes":["string"],"final_checklist":["string"]}` },
  { id:"summary", icon:BarChart3, label:"Manager Summary", desc:"1-page executive overview: what, who, why, risks",
    system:`Write a concise executive summary of this SOP. Max 200 words. Cover: what this process does, who owns it, 3-5 most critical steps, what could go wrong if not followed, when to use it. Return plain text only.` },
  { id:"role", icon:UserCheck, label:"Role-Specific View", desc:"Filter steps relevant to one team member's role",
    system:null },
  { id:"risks", icon:AlertTriangle, label:"Risk & Gap Report", desc:"What could go wrong, what's missing, severity ratings",
    system:`Analyze this SOP and produce a structured risk and gap report. Identify: missing steps, unclear instructions, single points of failure, missing roles, compliance risks. Sort by severity. Return ONLY valid JSON: [{"severity":"high|medium|low","category":"string","description":"string","affected_step":null,"recommendation":"string"}]` }
];

function TeamEnablePage({ sop, state, dispatch }) {
  const [format, setFormat] = useState(null);
  const [content, setContent] = useState(null);
  const [isGen, setIsGen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (sop && sop.roles && sop.roles.length > 0) {
      setSelectedRole(sop.roles[0].role);
    }
  }, [sop]);

  const generate = useCallback(async (fmt) => {
    if(!sop) return;
    setFormat(fmt); setContent(null); setError(null); setCheckedItems({});
    if (fmt === "role") {
      return;
    }
    setIsGen(true);
    const fmtDef = FORMATS.find(f=>f.id===fmt);
    try {
      const raw = await callOpenRouterAPI(fmtDef.system, `SOP DATA:\n${JSON.stringify(sop, null, 2)}`, 3000);
      if(fmt==="summary") { setContent({ type:"text", text:raw }); }
      else { const parsed = JSON.parse(raw); setContent({ type:fmt, data:parsed }); }
    } catch(e) { setError(`Failed to generate: ${e.message}`); }
    setIsGen(false);
  }, [sop]);

  if(!sop) return <div style={{padding:40}}><EmptyState icon={Layers} title="No SOP selected" sub="Go back to the library and select an SOP to enable." action="Library" onAction={()=>dispatch({type:"NAVIGATE",page:"library"})}/></div>;

  const renderContent = () => {
    if (format === "role") {
      if (!selectedRole) {
        return <div style={{ color:"var(--text-secondary)", fontSize:"14px" }}>Please select a role on the left.</div>;
      }
      const filteredSteps = sop.steps.filter(s => s.responsible_role === selectedRole);
      return (
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"16px", marginBottom:"16px", paddingBottom:"8px", borderBottom:"1px solid var(--border-subtle)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span>Role Checklist: {selectedRole}</span>
            <Badge color={catColor(selectedRole)} size="xs">Filtered Steps</Badge>
          </div>
          {filteredSteps.length === 0 ? (
            <div style={{ color:"var(--text-tertiary)", fontSize:"13px", padding:"20px 0" }}>
              No steps are assigned to this role in this SOP.
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {filteredSteps.map((step, idx) => {
                const key = `role-${idx}`;
                return (
                  <label key={idx} style={{ display:"flex", gap:"12px", alignItems:"flex-start", padding:"12px", cursor:"pointer", borderBottom:"1px solid var(--border-subtle)", background:"var(--bg-elevated)", borderRadius:"var(--r-md)", transition:"background 0.15s" }}>
                    <input type="checkbox" checked={!!checkedItems[key]} onChange={()=>setCheckedItems(s=>({...s,[key]:!s[key]}))} style={{ width:"auto", marginTop:4 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--accent-primary)" }}>STEP {step.step_number}</span>
                        <span style={{ fontSize:"13px", fontWeight:600, color:checkedItems[key]?"var(--text-tertiary)":"var(--text-primary)", textDecoration:checkedItems[key]?"line-through":"none" }}>{step.title}</span>
                      </div>
                      <p style={{ fontSize:"12px", color:checkedItems[key]?"var(--text-tertiary)":"var(--text-secondary)", lineHeight:1.5 }}>{step.description}</p>
                      {step.tools_used?.length > 0 && (
                        <div style={{ display:"flex", gap:4, marginTop:6 }}>
                          {step.tools_used.map(t => <Badge key={t} color="var(--info)" size="xs" mono>{t}</Badge>)}
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    if(!content) return null;
    if(content.type==="text") return (
      <div style={{ background:"var(--bg-elevated)", borderRadius:"var(--r-lg)", padding:"24px" }}>
        <p style={{ fontSize:"14px", lineHeight:1.8, color:"var(--text-primary)", whiteSpace:"pre-wrap" }}>{content.text}</p>
      </div>
    );
    if(content.type==="checklist") return (
      <div>
        {content.data.map((phase,pi)=>(
          <div key={pi} style={{ marginBottom:"24px" }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"16px", marginBottom:"12px", paddingBottom:"8px", borderBottom:"1px solid var(--border-subtle)" }}>{phase.phase}</div>
            {phase.items.map((item,ii)=>{
              const key = `${pi}-${ii}`;
              return (
                <label key={ii} style={{ display:"flex", gap:"12px", alignItems:"flex-start", padding:"10px 12px", cursor:"pointer", borderBottom:"1px solid var(--border-subtle)", background:"var(--bg-elevated)", borderRadius:"var(--r-md)", marginBottom:4 }}>
                  <input type="checkbox" checked={!!checkedItems[key]} onChange={()=>setCheckedItems(s=>({...s,[key]:!s[key]}))} style={{ width:"auto", marginTop:3 }}/>
                  <div style={{ flex:1 }}>
                    <span style={{ fontSize:"13px", color:checkedItems[key]?"var(--text-tertiary)":"var(--text-primary)", textDecoration:checkedItems[key]?"line-through":"none" }}>{item.text}</span>
                    {item.role && <span style={{ marginLeft:8 }}><Badge color={catColor(item.role)} size="xs">{item.role}</Badge></span>}
                  </div>
                </label>
              );
            })}
          </div>
        ))}
      </div>
    );
    if(content.type==="onboarding") return (
      <div>
        <div style={{ background:"rgba(123,104,238,0.08)", border:"1px solid rgba(123,104,238,0.2)", borderRadius:"var(--r-lg)", padding:"20px", marginBottom:"20px" }}>
          <div style={{ fontWeight:600, marginBottom:"8px" }}>Welcome</div>
          <p style={{ fontSize:"14px", color:"var(--text-secondary)", lineHeight:1.7 }}>{content.data.introduction}</p>
        </div>
        {content.data.steps.map((s,i)=>(
          <div key={i} style={{ background:"var(--bg-elevated)", borderRadius:"var(--r-md)", padding:"16px", marginBottom:"10px" }}>
            <div style={{ display:"flex", gap:"10px", marginBottom:"8px" }}>
              <Mono style={{ color:"var(--accent-primary)" }}>STEP {s.number}</Mono>
              <span style={{ fontWeight:600, fontSize:"14px" }}>{s.title}</span>
            </div>
            <p style={{ fontSize:"13px", color:"var(--text-secondary)", marginBottom:"10px", lineHeight:1.6 }}>{s.instruction}</p>
            {s.why_it_matters && <div style={{ background:"rgba(0,229,176,0.06)", border:"1px solid rgba(0,229,176,0.2)", borderRadius:"var(--r-sm)", padding:"8px 12px", marginBottom:"6px" }}>
              <span style={{ fontSize:"11px", color:"var(--accent-secondary)", fontFamily:"var(--font-mono)" }}>WHY IT MATTERS</span>
              <p style={{ fontSize:"12px", color:"var(--text-secondary)", marginTop:4 }}>{s.why_it_matters}</p>
            </div>}
            {s.tip && <div style={{ fontSize:"12px", color:"var(--text-tertiary)", fontStyle:"italic" }}>💡 Tip: {s.tip}</div>}
          </div>
        ))}
        {content.data.common_mistakes?.length>0 && (
          <div style={{ marginTop:"20px" }}>
            <div style={{ fontWeight:600, marginBottom:"10px", color:"var(--warning)" }}>⚠ Common Mistakes</div>
            {content.data.common_mistakes.map((m,i)=><div key={i} style={{ fontSize:"13px", color:"var(--text-secondary)", marginBottom:"6px" }}>· {m}</div>)}
          </div>
        )}
      </div>
    );
    if(content.type==="risks") return (
      <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        {content.data.map((r,i)=>(
          <div key={i} style={{ background:"var(--bg-elevated)", border:`1px solid ${r.severity==="high"?"rgba(247,97,90,0.3)":r.severity==="medium"?"rgba(245,165,36,0.3)":"rgba(87,173,255,0.3)"}`, borderRadius:"var(--r-md)", padding:"14px 16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
              <Badge color={r.severity==="high"?"var(--error)":r.severity==="medium"?"var(--warning)":"var(--info)"} mono>{r.severity.toUpperCase()}</Badge>
              <Badge color="var(--text-tertiary)" variant="outline">{r.category}</Badge>
            </div>
            <p style={{ fontSize:"13px", color:"var(--text-primary)", marginBottom:"6px" }}>{r.description}</p>
            <p style={{ fontSize:"12px", color:"var(--text-tertiary)" }}>→ {r.recommendation}</p>
          </div>
        ))}
      </div>
    );
    return null;
  };

  const copyToClipboard = () => {
    let text = "";
    if (format === "role") {
      const filtered = sop.steps.filter(s => s.responsible_role === selectedRole);
      text = filtered.map(s => `[Step ${s.step_number}] ${s.title}\n${s.description}`).join("\n\n");
    } else if (content) {
      text = content.type === "text" ? content.text : JSON.stringify(content.data, null, 2);
    }
    navigator.clipboard?.writeText(text);
    dispatch({ type: "SET_TOAST", toast: { type: "success", message: "Copied to clipboard." } });
  };

  return (
    <div className="page-enter" style={{ padding:"36px 40px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"24px" }}>
        <Btn variant="ghost" size="sm" icon={ChevronLeft} onClick={()=>dispatch({type:"NAVIGATE",page:"view",sopId:sop.id})}>Back to SOP</Btn>
        <ChevronRight size={12} style={{color:"var(--text-tertiary)"}}/>
        <span style={{ fontSize:"13px", color:"var(--text-secondary)" }}>Team Enablement</span>
      </div>
      <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"24px", letterSpacing:"-0.02em", marginBottom:"6px" }}>Team Enablement Mode</h1>
      <p style={{ fontSize:"14px", color:"var(--text-secondary)", marginBottom:"32px" }}>Generate team-ready formats from <span style={{color:"var(--text-primary)"}}>{sop.title}</span> using AI.</p>

      <div style={{ display:"grid", gridTemplateColumns:"360px 1fr", gap:"24px", alignItems:"flex-start" }}>
        {/* FORMAT SELECTOR */}
        <div>
          <SectionDivider label="SELECT OUTPUT FORMAT" />
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {FORMATS.map(({id,icon:Icon,label,desc})=>(
              <div key={id} className="card-hover" onClick={()=>generate(id)}
                style={{ border:`1px solid ${format===id?"var(--accent-primary)":"var(--border-default)"}`, borderRadius:"var(--r-lg)", padding:"16px", cursor:"pointer",
                  background: format===id ? "rgba(123,104,238,0.08)" : "var(--bg-card)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
                  <div style={{ width:34, height:34, background:format===id?"var(--accent-glow)":"var(--bg-elevated)", borderRadius:"var(--r-sm)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon size={16} style={{ color:format===id?"var(--accent-primary)":"var(--text-secondary)" }}/>
                  </div>
                  <span style={{ fontWeight:600, fontSize:"14px", color:"var(--text-primary)" }}>{label}</span>
                  {format===id && <Check size={14} style={{ color:"var(--accent-primary)", marginLeft:"auto" }}/>}
                </div>
                <p style={{ fontSize:"12px", color:"var(--text-tertiary)", marginLeft:44 }}>{desc}</p>
                {/* Role dropdown specifically for role view */}
                {id === "role" && format === "role" && (
                  <div style={{ marginTop:"12px", marginLeft:"44px" }} onClick={e => e.stopPropagation()}>
                    <select value={selectedRole} onChange={e=>setSelectedRole(e.target.value)} style={{ fontSize:"12px", width:"100%" }}>
                      <option value="">Select a role...</option>
                      {sop.roles.map(r => <option key={r.role} value={r.role}>{r.role}</option>)}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PREVIEW */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
            <SectionDivider label={format ? FORMATS.find(f=>f.id===format)?.label.toUpperCase() : "PREVIEW"} />
            {(content || format === "role") && <div style={{ display:"flex", gap:"8px" }}>
              <Btn variant="ghost" size="sm" icon={Copy} onClick={copyToClipboard}>Copy All</Btn>
              <Btn variant="ghost" size="sm" icon={Download} onClick={()=>dispatch({ type:"SET_TOAST", toast: {type:"info", message:"PDF export simulation triggered."} })}>Export PDF</Btn>
            </div>}
          </div>
          {isGen ? (
            <Card style={{ padding:"32px", textAlign:"center" }}>
              <Spinner size={28}/>
              <div style={{ marginTop:"16px", fontSize:"14px", color:"var(--text-secondary)" }}>Building {FORMATS.find(f=>f.id===format)?.label}...</div>
              <div style={{ marginTop:"8px", fontSize:"12px", color:"var(--text-tertiary)" }}>Reading your SOP and generating output</div>
            </Card>
          ) : error ? (
            <div style={{ background:"rgba(247,97,90,0.08)", border:"1px solid rgba(247,97,90,0.25)", borderRadius:"var(--r-lg)", padding:"20px" }}>
              <p style={{ fontSize:"13px", color:"var(--error)" }}>{error}</p>
            </div>
          ) : (content || format === "role") ? (
            <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderRadius:"var(--r-lg)", padding:"24px" }}>
              {renderContent()}
            </div>
          ) : (
            <div style={{ background:"var(--bg-card)", border:"1px dashed var(--border-default)", borderRadius:"var(--r-lg)", padding:"48px 24px", textAlign:"center" }}>
              <Layers size={32} style={{ color:"var(--text-tertiary)", marginBottom:16 }}/>
              <div style={{ fontSize:"14px", color:"var(--text-secondary)", marginBottom:"8px" }}>Select a format to generate</div>
              <div style={{ fontSize:"12px", color:"var(--text-tertiary)" }}>AI will transform this SOP into your chosen format in seconds.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS ──────────────────────────────────────────────────────────────────
function SettingsPage({ settings, dispatch, sopsCount }) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showConfirmDeleteAll, setShowConfirmDeleteAll] = useState(false);

  const save = () => {
    dispatch({ type: "SET_SETTINGS", settings: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearSession = () => {
    sessionStorage.clear();
    dispatch({ type: "SET_SOPS", sops: [] });
    dispatch({
      type: "SET_SETTINGS",
      settings: {
        userName: "Alex",
        teamName: "My Team",
        apiKey: "",
        defaultCategory: "Operations",
        exportFormat: "pdf",
        exportIncludeMetadata: true,
        exportIncludeFlags: true,
        model: "anthropic/claude-sonnet-4"
      }
    });
    dispatch({ type: "NAVIGATE", page: "landing" });
    dispatch({ type: "SET_TOAST", toast: { type: "success", message: "Session data cleared successfully." } });
    setShowConfirmClear(false);
  };

  const handleDeleteAllSOPs = () => {
    dispatch({ type: "SET_SOPS", sops: [] });
    dispatch({ type: "SET_TOAST", toast: { type: "info", message: "All SOPs have been deleted." } });
    setShowConfirmDeleteAll(false);
  };

  return (
    <div className="page-enter" style={{ padding: "36px 40px", maxWidth: 660 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "28px", letterSpacing: "-0.02em", marginBottom: "36px" }}>Settings</h1>

      {/* PREFERENCES */}
      <SectionDivider label="PREFERENCES" />
      <div style={{ marginBottom: "32px" }}>
        <label style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Default Category</label>
        <select value={form.defaultCategory} onChange={e => setForm(p => ({ ...p, defaultCategory: e.target.value }))} style={{ width: "auto" }}>
          {["Operations", "HR", "Support", "Onboarding", "Finance", "Marketing"].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* EXPORT DEFAULTS */}
      <SectionDivider label="EXPORT DEFAULTS" />
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Preferred Format</label>
            <select value={form.exportFormat} onChange={e => setForm(p => ({ ...p, exportFormat: e.target.value }))} style={{ width: "auto" }}>
              <option value="pdf">PDF Document</option>
              <option value="markdown">Markdown (.md)</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: "var(--text-secondary)" }}>
            <input type="checkbox" checked={!!form.exportIncludeMetadata} onChange={e => setForm(p => ({ ...p, exportIncludeMetadata: e.target.checked }))} style={{ width: "auto" }} />
            <span>Include SOP Metadata in exports (Category, Owner, Department, Version)</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: "var(--text-secondary)" }}>
            <input type="checkbox" checked={!!form.exportIncludeFlags} onChange={e => setForm(p => ({ ...p, exportIncludeFlags: e.target.checked }))} style={{ width: "auto" }} />
            <span>Include completeness gaps and alert warnings in exports</span>
          </label>
        </div>
      </div>

      {/* DANGER ZONE */}
      <SectionDivider label="DANGER ZONE" />
      <div style={{ background: "rgba(247,97,90,0.06)", border: "1px solid rgba(247,97,90,0.25)", borderRadius: "var(--r-lg)", padding: "20px", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Delete all SOPs</div>
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>This will permanently delete all {sopsCount} SOPs. Cannot be undone.</div>
          </div>
          <Btn variant="danger" size="sm" disabled={sopsCount === 0} onClick={() => setShowConfirmDeleteAll(true)}>
            Delete All
          </Btn>
        </div>

        <div style={{ borderTop: "1px solid rgba(247,97,90,0.15)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Clear Session Data</div>
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Reset settings, clear local session storage, and log out of the session.</div>
          </div>
          <Btn variant="danger" size="sm" onClick={() => setShowConfirmClear(true)}>
            Clear Session
          </Btn>
        </div>
      </div>

      <Btn onClick={save} icon={saved ? CheckCircle2 : Save} size="lg">{saved ? "Saved!" : "Save Changes"}</Btn>

      <ConfirmDialog
        isOpen={showConfirmDeleteAll}
        title="Delete All SOPs?"
        message={`Are you sure you want to permanently delete all ${sopsCount} SOPs? This action cannot be undone.`}
        confirmText="Yes, delete all"
        cancelText="Cancel"
        onConfirm={handleDeleteAllSOPs}
        onCancel={() => setShowConfirmDeleteAll(false)}
      />

      <ConfirmDialog
        isOpen={showConfirmClear}
        title="Clear Session Data?"
        message="Are you sure you want to clear all session storage, reset settings, and return to the landing page? All non-saved changes will be lost."
        confirmText="Yes, clear session"
        cancelText="Cancel"
        onConfirm={handleClearSession}
        onCancel={() => setShowConfirmClear(false)}
      />
    </div>
  );
}

// ── SOP EDITOR PAGE ───────────────────────────────────────────────────────────
function EditPage({ sop, dispatch }) {
  const [form, setForm] = useState(JSON.parse(JSON.stringify(sop))); // deep clone
  const [activeTab, setActiveTab] = useState("general");

  const save = () => {
    // Recompute completeness score
    const score = computeScore(form);
    const updatedSop = {
      ...form,
      metadata: {
        ...form.metadata,
        completeness_score: score,
        updated_at: new Date().toISOString()
      }
    };
    dispatch({ type: "UPDATE_SOP", sop: updatedSop });
    dispatch({ type: "NAVIGATE", page: "view", sopId: sop.id });
    dispatch({ type: "SET_TOAST", toast: { type: "success", message: "SOP updated successfully." } });
  };

  const cancel = () => {
    dispatch({ type: "NAVIGATE", page: "view", sopId: sop.id });
  };

  const updateField = (section, field, val) => {
    setForm(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: val } 
        : val
    }));
  };

  const updateMetadata = (field, val) => {
    setForm(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [field]: val }
    }));
  };

  return (
    <div className="page-enter" style={{ padding: "36px 40px" }}>
      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
            <Btn variant="ghost" size="sm" icon={ChevronLeft} onClick={cancel}>Cancel</Btn>
            <ChevronRight size={12} style={{color:"var(--text-tertiary)"}}/>
            <span style={{ fontSize:"13px", color:"var(--text-secondary)" }}>Editing: {sop.title}</span>
          </div>
          <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"26px", letterSpacing:"-0.02em" }}>SOP Editor</h1>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Btn variant="secondary" onClick={cancel}>Cancel</Btn>
          <Btn variant="primary" icon={Save} onClick={save}>Save Changes</Btn>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", gap:"4px", marginBottom:"24px", background:"var(--bg-surface)", padding:"4px", borderRadius:"var(--r-md)", border:"1px solid var(--border-subtle)" }}>
        {[
          { id: "general", label: "General & Scope" },
          { id: "roles", label: "Roles & Access" },
          { id: "steps", label: "Steps & Flow" },
          { id: "exceptions", label: "Exceptions & Notes" }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ flex:1, padding:"10px", borderRadius:"var(--r-sm)", border:"none", cursor:"pointer", fontSize:"13px", fontFamily:"var(--font-body)", fontWeight:500, transition:"all 0.15s",
              background: activeTab===tab.id ? "var(--bg-card)" : "transparent",
              color: activeTab===tab.id ? "var(--text-primary)" : "var(--text-tertiary)",
              boxShadow: activeTab===tab.id ? "0 1px 3px rgba(0,0,0,0.2)" : "none" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT TABS */}
      <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
        
        {activeTab === "general" && (
          <>
            {/* General Info */}
            <Card>
              <SectionDivider label="PROCESS IDENTIFICATION" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"14px" }}>
                <div>
                  <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Process Title</label>
                  <input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Purpose Statement</label>
                  <textarea value={form.purpose} rows={3} onChange={e => setForm(prev => ({ ...prev, purpose: e.target.value }))} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
                  <div>
                    <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Category</label>
                    <input value={form.metadata.category} onChange={e => updateMetadata("category", e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Department</label>
                    <input value={form.metadata.department} onChange={e => updateMetadata("department", e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Owner</label>
                    <input value={form.metadata.owner} onChange={e => updateMetadata("owner", e.target.value)} />
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
                  <div>
                    <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Frequency</label>
                    <select value={form.metadata.frequency} onChange={e => updateMetadata("frequency", e.target.value)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="ad-hoc">Ad-hoc</option>
                      <option value="event-driven">Event-driven</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Priority</label>
                    <select value={form.metadata.priority} onChange={e => updateMetadata("priority", e.target.value)}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Status</label>
                    <select value={form.metadata.status} onChange={e => updateMetadata("status", e.target.value)}>
                      <option value="draft">Draft</option>
                      <option value="live">Live</option>
                      <option value="needs-review">Needs Review</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Scope Included/Excluded */}
            <Card>
              <SectionDivider label="PROCESS SCOPE" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
                {/* Included */}
                <div>
                  <label style={{ fontSize:"13px", fontWeight:600, color:"var(--success)", display:"block", marginBottom:"10px" }}>✓ Included Items</label>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {form.scope.included.map((item, idx) => (
                      <div key={idx} style={{ display:"flex", gap:8 }}>
                        <input value={item} onChange={e => {
                          const list = [...form.scope.included];
                          list[idx] = e.target.value;
                          updateField("scope", "included", list);
                        }} />
                        <Btn variant="danger" size="sm" onClick={() => {
                          const list = form.scope.included.filter((_, i) => i !== idx);
                          updateField("scope", "included", list);
                        }} icon={Trash2} />
                      </div>
                    ))}
                    <Btn variant="secondary" size="sm" style={{ marginTop:4 }} onClick={() => {
                      updateField("scope", "included", [...form.scope.included, ""]);
                    }} icon={Plus}>Add Included Item</Btn>
                  </div>
                </div>

                {/* Excluded */}
                <div>
                  <label style={{ fontSize:"13px", fontWeight:600, color:"var(--error)", display:"block", marginBottom:"10px" }}>✗ Excluded Items</label>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {form.scope.excluded.map((item, idx) => (
                      <div key={idx} style={{ display:"flex", gap:8 }}>
                        <input value={item} onChange={e => {
                          const list = [...form.scope.excluded];
                          list[idx] = e.target.value;
                          updateField("scope", "excluded", list);
                        }} />
                        <Btn variant="danger" size="sm" onClick={() => {
                          const list = form.scope.excluded.filter((_, i) => i !== idx);
                          updateField("scope", "excluded", list);
                        }} icon={Trash2} />
                      </div>
                    ))}
                    <Btn variant="secondary" size="sm" style={{ marginTop:4 }} onClick={() => {
                      updateField("scope", "excluded", [...form.scope.excluded, ""]);
                    }} icon={Plus}>Add Excluded Item</Btn>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}

        {activeTab === "roles" && (
          <>
            {/* Roles Table */}
            <Card>
              <SectionDivider label="ROLES & RESPONSIBILITIES" />
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {form.roles.map((roleObj, idx) => (
                  <div key={idx} style={{ display:"grid", gridTemplateColumns:"150px 150px 1fr auto", gap:12, alignItems:"center", background:"var(--bg-elevated)", padding:12, borderRadius:"var(--r-md)", border:"1px solid var(--border-subtle)" }}>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Role Name</label>
                      <input value={roleObj.role} onChange={e => {
                        const list = [...form.roles];
                        list[idx].role = e.target.value;
                        setForm(p => ({ ...p, roles: list }));
                      }} />
                    </div>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Owner / Team</label>
                      <input value={roleObj.person_or_team} onChange={e => {
                        const list = [...form.roles];
                        list[idx].person_or_team = e.target.value;
                        setForm(p => ({ ...p, roles: list }));
                      }} />
                    </div>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Key Responsibility</label>
                      <input value={roleObj.responsibility} onChange={e => {
                        const list = [...form.roles];
                        list[idx].responsibility = e.target.value;
                        setForm(p => ({ ...p, roles: list }));
                      }} />
                    </div>
                    <div style={{ alignSelf:"flex-end" }}>
                      <Btn variant="danger" size="md" onClick={() => {
                        const list = form.roles.filter((_, i) => i !== idx);
                        setForm(p => ({ ...p, roles: list }));
                      }} icon={Trash2} />
                    </div>
                  </div>
                ))}
                <Btn variant="secondary" size="md" style={{ width:"fit-content" }} onClick={() => {
                  setForm(p => ({ ...p, roles: [...p.roles, { role: "", person_or_team: "", responsibility: "" }] }));
                }} icon={Plus}>Add Role</Btn>
              </div>
            </Card>

            {/* Prerequisites */}
            <Card>
              <SectionDivider label="PREREQUISITES & ACCESS REQUIREMENTS" />
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {form.prerequisites.map((prereq, idx) => (
                  <div key={idx} style={{ display:"flex", gap:8 }}>
                    <input value={prereq} onChange={e => {
                      const list = [...form.prerequisites];
                      list[idx] = e.target.value;
                      setForm(p => ({ ...p, prerequisites: list }));
                    }} />
                    <Btn variant="danger" size="sm" onClick={() => {
                      const list = form.prerequisites.filter((_, i) => i !== idx);
                      setForm(p => ({ ...p, prerequisites: list }));
                    }} icon={Trash2} />
                  </div>
                ))}
                <Btn variant="secondary" size="sm" style={{ marginTop:4 }} onClick={() => {
                  setForm(p => ({ ...p, prerequisites: [...p.prerequisites, ""] }));
                }} icon={Plus}>Add Prerequisite</Btn>
              </div>
            </Card>
          </>
        )}

        {activeTab === "steps" && (
          <Card>
            <SectionDivider label="STEP-BY-STEP FLOW" />
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {form.steps.map((step, idx) => (
                <div key={idx} style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-subtle)", borderRadius:"var(--r-md)", padding:18, display:"flex", flexDirection:"column", gap:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"18px", color:"var(--accent-primary)", fontWeight:600 }}>#{idx + 1}</span>
                      <span style={{ fontSize:"13px", color:"var(--text-tertiary)" }}>Step Title</span>
                    </div>
                    <div style={{ display:"flex", gap:6 }}>
                      <Btn variant="ghost" size="sm" disabled={idx === 0} onClick={() => {
                        const list = [...form.steps];
                        const temp = list[idx];
                        list[idx] = list[idx-1];
                        list[idx-1] = temp;
                        list.forEach((s, i) => s.step_number = i + 1);
                        setForm(p => ({ ...p, steps: list }));
                      }}>↑ Move Up</Btn>
                      <Btn variant="ghost" size="sm" disabled={idx === form.steps.length - 1} onClick={() => {
                        const list = [...form.steps];
                        const temp = list[idx];
                        list[idx] = list[idx+1];
                        list[idx+1] = temp;
                        list.forEach((s, i) => s.step_number = i + 1);
                        setForm(p => ({ ...p, steps: list }));
                      }}>↓ Move Down</Btn>
                      <Btn variant="danger" size="sm" onClick={() => {
                        const list = form.steps.filter((_, i) => i !== idx);
                        list.forEach((s, i) => s.step_number = i + 1);
                        setForm(p => ({ ...p, steps: list }));
                      }} icon={Trash2} />
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Title</label>
                      <input value={step.title} onChange={e => {
                        const list = [...form.steps];
                        list[idx].title = e.target.value;
                        setForm(p => ({ ...p, steps: list }));
                      }} />
                    </div>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Responsible Role</label>
                      <select value={step.responsible_role || ""} onChange={e => {
                        const list = [...form.steps];
                        list[idx].responsible_role = e.target.value || null;
                        setForm(p => ({ ...p, steps: list }));
                      }}>
                        <option value="">None Assigned</option>
                        {form.roles.map(r => <option key={r.role} value={r.role}>{r.role}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Instructions</label>
                    <textarea value={step.description} rows={3} onChange={e => {
                      const list = [...form.steps];
                      list[idx].description = e.target.value;
                      setForm(p => ({ ...p, steps: list }));
                    }} />
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, alignItems:"center" }}>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Tools Used (comma separated)</label>
                      <input value={step.tools_used?.join(", ") || ""} onChange={e => {
                        const list = [...form.steps];
                        list[idx].tools_used = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                        setForm(p => ({ ...p, steps: list }));
                      }} />
                    </div>
                    <label style={{ display:"flex", alignItems:"center", gap:8, marginTop:20, cursor:"pointer", fontSize:"13px" }}>
                      <input type="checkbox" checked={!!step.is_decision_point} onChange={e => {
                        const list = [...form.steps];
                        list[idx].is_decision_point = e.target.checked;
                        setForm(p => ({ ...p, steps: list }));
                      }} style={{ width:"auto" }}/>
                      Is Decision Point
                    </label>
                  </div>
                </div>
              ))}
              <Btn variant="secondary" size="md" style={{ width:"fit-content" }} onClick={() => {
                const nextNum = form.steps.length + 1;
                setForm(p => ({ ...p, steps: [...p.steps, { step_number: nextNum, title: "", description: "", responsible_role: null, tools_used: [], is_decision_point: false, decision_options: null, flags: [] }] }));
              }} icon={Plus}>Add Step</Btn>
            </div>
          </Card>
        )}

        {activeTab === "exceptions" && (
          <>
            {/* Decision Branches */}
            <Card>
              <SectionDivider label="DECISION BRANCHING RULES" />
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {form.decision_points?.map((dp, idx) => (
                  <div key={idx} style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-subtle)", padding:16, borderRadius:"var(--r-md)", display:"flex", flexDirection:"column", gap:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:"12px", fontWeight:600, color:"var(--accent-primary)" }}>Branch Rule #{idx+1}</span>
                      <Btn variant="ghost" size="sm" onClick={() => {
                        const list = form.decision_points.filter((_, i) => i !== idx);
                        setForm(p => ({ ...p, decision_points: list }));
                      }} icon={Trash2} />
                    </div>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>IF (Condition)</label>
                      <input value={dp.condition} onChange={e => {
                        const list = [...form.decision_points];
                        list[idx].condition = e.target.value;
                        setForm(p => ({ ...p, decision_points: list }));
                      }} />
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                      <div>
                        <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>THEN (Action)</label>
                        <input value={dp.if_true} onChange={e => {
                          const list = [...form.decision_points];
                          list[idx].if_true = e.target.value;
                          setForm(p => ({ ...p, decision_points: list }));
                        }} />
                      </div>
                      <div>
                        <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>ELSE (Fallback Action)</label>
                        <input value={dp.if_false} onChange={e => {
                          const list = [...form.decision_points];
                          list[idx].if_false = e.target.value;
                          setForm(p => ({ ...p, decision_points: list }));
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
                <Btn variant="secondary" size="md" style={{ width:"fit-content" }} onClick={() => {
                  const list = form.decision_points || [];
                  setForm(p => ({ ...p, decision_points: [...list, { condition: "", if_true: "", if_false: "" }] }));
                }} icon={Plus}>Add Decision Branch</Btn>
              </div>
            </Card>

            {/* Exceptions */}
            <Card>
              <SectionDivider label="EXCEPTIONS & EDGE CASES" />
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {form.exceptions?.map((ex, idx) => (
                  <div key={idx} style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-subtle)", padding:16, borderRadius:"var(--r-md)", display:"flex", flexDirection:"column", gap:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:"12px", fontWeight:600, color:"var(--accent-warm)" }}>Exception Scenario #{idx+1}</span>
                      <Btn variant="ghost" size="sm" onClick={() => {
                        const list = form.exceptions.filter((_, i) => i !== idx);
                        setForm(p => ({ ...p, exceptions: list }));
                      }} icon={Trash2} />
                    </div>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Scenario (What happens?)</label>
                      <input value={ex.scenario} onChange={e => {
                        const list = [...form.exceptions];
                        list[idx].scenario = e.target.value;
                        setForm(p => ({ ...p, exceptions: list }));
                      }} />
                    </div>
                    <div>
                      <label style={{ fontSize:"11px", color:"var(--text-tertiary)", display:"block", marginBottom:4 }}>Handling Protocol (How to resolve it?)</label>
                      <textarea value={ex.handling} rows={2} onChange={e => {
                        const list = [...form.exceptions];
                        list[idx].handling = e.target.value;
                        setForm(p => ({ ...p, exceptions: list }));
                      }} />
                    </div>
                  </div>
                ))}
                <Btn variant="secondary" size="md" style={{ width:"fit-content" }} onClick={() => {
                  const list = form.exceptions || [];
                  setForm(p => ({ ...p, exceptions: [...list, { scenario: "", handling: "" }] }));
                }} icon={Plus}>Add Exception Protocol</Btn>
              </div>
            </Card>

            {/* Expected Output & Review Details */}
            <Card>
              <SectionDivider label="QUALITY CONTROL & REVIEW" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                <div>
                  <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Expected Output Description</label>
                  <textarea value={form.expected_output} rows={2} onChange={e => setForm(p => ({ ...p, expected_output: e.target.value }))} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Review Frequency</label>
                    <input value={form.review_notes?.review_frequency || ""} onChange={e => {
                      const notes = form.review_notes || { review_frequency: "", next_review_date: "", update_triggers: [] };
                      setForm(p => ({ ...p, review_notes: { ...notes, review_frequency: e.target.value } }));
                    }} />
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", color:"var(--text-secondary)", display:"block", marginBottom:"6px" }}>Next Review Date (YYYY-MM-DD)</label>
                    <input value={form.review_notes?.next_review_date || ""} onChange={e => {
                      const notes = form.review_notes || { review_frequency: "", next_review_date: "", update_triggers: [] };
                      setForm(p => ({ ...p, review_notes: { ...notes, next_review_date: e.target.value } }));
                    }} />
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { route, sops, currentSOPId, filters, settings, toast } = state;

  // Persist to sessionStorage for session-only history
  useEffect(() => {
    try {
      sessionStorage.setItem("sop-builder-sops", JSON.stringify(sops));
    } catch(e) {}
  }, [sops]);

  useEffect(() => {
    try {
      sessionStorage.setItem("sop-builder-settings", JSON.stringify(settings));
    } catch(e) {}
  }, [settings]);

  useEffect(() => {
    try {
      const storedSops = sessionStorage.getItem("sop-builder-sops");
      if(storedSops !== null) {
        const loaded = JSON.parse(storedSops);
        dispatch({ type:"SET_SOPS", sops: loaded });
      } else {
        sessionStorage.setItem("sop-builder-sops", JSON.stringify(sops));
      }

      const storedSettings = sessionStorage.getItem("sop-builder-settings");
      if(storedSettings !== null) {
        const loadedSettings = JSON.parse(storedSettings);
        dispatch({ type:"SET_SETTINGS", settings: loadedSettings });
      }
    } catch(e) {}
  }, []);

  const currentSOP = useMemo(() => {
    const id = route.params?.sopId || currentSOPId;
    return id ? sops.find(s=>s.id===id) : null;
  }, [sops, currentSOPId, route.params]);

  const renderPage = () => {
    const page = route.page;
    if(page==="landing") return <LandingPage dispatch={dispatch} />;
    return (
      <AppShell route={route} dispatch={dispatch} sops={sops} settings={settings}>
        {page==="dashboard" && <DashboardPage sops={sops} dispatch={dispatch} />}
        {page==="create" && <CreatePage dispatch={dispatch} />}
        {page==="library" && <LibraryPage sops={sops} filters={filters} dispatch={dispatch} />}
        {page==="view" && <SOPViewer sop={currentSOP || sops[0]} dispatch={dispatch} allSops={sops} />}
        {page==="edit" && <EditPage sop={currentSOP || sops[0]} dispatch={dispatch} />}
        {page==="enable" && <TeamEnablePage sop={currentSOP || sops[0]} state={state} dispatch={dispatch} />}
        {page==="settings" && <SettingsPage settings={settings} dispatch={dispatch} sopsCount={sops.length} />}
      </AppShell>
    );
  };

  return (
    <>
      <GlobalStyles/>
      {renderPage()}
      <Toast toast={toast} dispatch={dispatch} />
    </>
  );
}
