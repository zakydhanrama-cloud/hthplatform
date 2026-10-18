"use client";
import { useState } from 'react';

const alumni = [
  { name: "Paul Geraeds", year: "1986", loc: "Frankfurt", job: "Vice-Chairman NBTC", journey: "1986 → Chief Steward → NBTC" },
  { name: "Roberto Payer", year: "Senior Hicon", loc: "Amsterdam", job: "Hilton Waldorf", journey: "Hilton → Waldorf → Award" },
  { name: "Zaky Dhanrama", year: "2025", loc: "Amsterdam", job: "Founder Platform", journey: "Build → Deploy → Demo" },
];

const sustain = [
  { pilar: "💧 Water", title: "MADE BLUE x HTH", value: "12.300L", target: "-40%", proof: "Sensor 6L→3L", trace: "1L saved = 1L Mali", color: "#0ea5e9", score: "92%" },
  { pilar: "🥗 SENSE", title: "Plant-forward Food", value: "82% local", target: "80% <250km", proof: "Invoice Westland", trace: "Seasonal, Ethical", color: "#22c55e", score: "95%" },
  { pilar: "🏢 Green Ops", title: "Green Key Gold", value: "105k kWh", target: "-30% Energy", proof: "Smart meter", trace: "Zero Waste", color: "#16a34a", score: "98%" },
  { pilar: "🐝 Biodiversity", title: "Beekeeping Roof-top", value: "2.5kg honey", target: "5 colonies", proof: "Logbook 2019", trace: "Eden Garden", color: "#eab308", score: "88%" },
  { pilar: "💡 Innovation", title: "SHC Challenge", value: "Funded $50k", target: "15 proposals", proof: "NEOM Pitch", trace: "Zero-emission hotel", color: "#7c3aed", score: "100%" },
];

const kpi10 = [
  ["Employability 6 bulan", "96%", ">=95%", "Tracer Study Launch.it", "✅"],
  ["Employer Satisfaction", "88/100", ">=85", "Survei 67 mitra", "✅"],
  ["Academic Reputation", "82/100", ">=80", "QS Global", "✅"],
  ["Riset per tahun", "18", "Min 15", "Scopus", "✅"],
  ["Retention Year 1", "92%", ">=90%", "Osiris NSE", "✅"],
  ["Graduation 4-5yr", "85%", ">=80%", "Keuzegids", "✅"],
  ["Magang bintang 5", "100%", "100% wajib", "Placement Office", "✅"],
  ["Kemitraan industri", "67 mitra", "50+", "MoU", "✅"],
  ["% Internasional", "44%", ">=40%", "HR Census", "✅"],
  ["QS 5-Star Gold", "Gold", "Maintain", "NVAO Audit", "✅"],
];

const chapters = [
  { name: "Aruba Chapter", members: 21, loc: "Aruba", emoji: "🏖️" },
  { name: "Bangkok Chapter", members: 28, loc: "Bangkok, Thailand", emoji: "🌃" },
  { name: "Barcelona Chapter", members: 99, loc: "Barcelona, Spain", emoji: "🏛️" },
  { name: "Amsterdam Chapter", members: 450, loc: "Amsterdam", emoji: "🚲" },
];

export default function Demo() {
  const [tab, setTab] = useState("sustain");
  return (
    <div style={{background: "#f8fafc", minHeight: "100vh", padding: "16px", fontFamily: "system-ui"}}>
      <div style={{maxWidth: "900px", margin: "0 auto"}}>
        <div style={{background: "white", borderRadius: "20px", padding: "16px", border: "2px solid #22c55e", textAlign: "center"}}>
          <h1 style={{margin: 0, fontSize: "20px", fontWeight: 900}}>HTH DEMO - Green Key Gold 🌱</h1>
          <p style={{margin: "4px 0 0", fontSize: "11px", color: "#666"}}>Hospitality for a better world • Track & Trace Demo Version</p>
          <div style={{display: "flex", gap: "6px", justifyContent: "center", marginTop: "12px", flexWrap: "wrap"}}>
            {[
              ["alumni", "👥 Alumni"],
              ["sustain", "🌱 Sustain 5 KPI"],
              ["chapters", "🌍 Chapters (30)"],
              ["kpi", "📊 10 KPI"],
            ].map(([id, label])=>(
              <button key={id} onClick={()=>setTab(id)} style={{background: tab===id ? "#22c55e" : "#eee", color: tab===id ? "white" : "black", border: "none", padding: "8px 14px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>{label}</button>
            ))}
          </div>
        </div>

        {tab==="alumni" && (
          <div style={{background: "white", borderRadius: "16px", padding: "16px", marginTop: "12px"}}>
            <h3 style={{margin: "0 0 10px", fontSize: "14px"}}>👥 Alumni Tracking + Career Journey</h3>
            {alumni.map((a,i)=><div key={i} style={{border: "1px solid #eee", borderRadius: "10px", padding: "10px", marginBottom: "8px", fontSize: "12px"}}><b>{a.name}</b> ({a.year}) - {a.loc} • {a.job}<br/><span style={{color: "#666", fontSize: "11px"}}>Trace: {a.journey}</span></div>)}
          </div>
        )}

        {tab==="sustain" && (
          <div style={{marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px"}}>
            {sustain.map((s,i)=>(
              <div key={i} style={{background: "white", borderRadius: "16px", padding: "14px", borderLeft: `6px solid ${s.color}`}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <div><div style={{fontSize: "10px", color: s.color, fontWeight: 800}}>{s.pilar}</div><div style={{fontWeight: 800, fontSize: "13px"}}>{s.title}</div></div>
                  <div style={{background: s.color, color: "white", borderRadius: "10px", padding: "4px 8px", fontSize: "11px", fontWeight: 800, height: "fit-content"}}>{s.score}</div>
                </div>
                <div style={{marginTop: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "11px"}}>
                  <div style={{background: "#f8fafc", padding: "6px 8px", borderRadius: "8px"}}><b>Value:</b> {s.value}<br/><b>Target:</b> {s.target}</div>
                  <div style={{background: "#f0fdf4", padding: "6px 8px", borderRadius: "8px"}}><b>Proof:</b> {s.proof}<br/><b>Trace:</b> {s.trace}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==="chapters" && (
          <div style={{background: "white", borderRadius: "16px", padding: "16px", marginTop: "12px"}}>
            <h3 style={{margin: "0 0 12px", fontSize: "14px"}}>🌍 Discover (30) - Global Chapters</h3>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px"}}>
              {chapters.map((c,i)=><div key={i} style={{border: "1px solid #eee", borderRadius: "14px", overflow: "hidden", textAlign: "center"}}><div style={{height: "80px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px"}}>{c.emoji}</div><div style={{padding: "10px"}}><div style={{fontWeight: 700, fontSize: "12px"}}>{c.name}</div><div style={{fontSize: "10px", color: "#666"}}>{c.members} members • {c.loc}</div><div style={{background: "#991b1b", color: "white", borderRadius: "6px", padding: "6px", marginTop: "8px", fontSize: "10px", fontWeight: 700}}>Log in to join</div></div></div>)}
            </div>
          </div>
        )}

        {tab==="kpi" && (
          <div style={{background: "white", borderRadius: "16px", padding: "16px", marginTop: "12px"}}>
            <h3 style={{margin: "0 0 10px", fontSize: "14px"}}>📊 10 KPI - Track & Trace Audit</h3>
            {kpi10.map((k,i)=><div key={i} style={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", padding: "8px 0", fontSize: "11px"}}><div><b>{k[0]}</b><br/><span style={{color: "#666"}}>{k[3]}</span></div><div style={{textAlign: "right"}}><b style={{color: "#7c3aed"}}>{k[1]}</b> <span style={{fontSize: "9px"}}>({k[2]})</span><br/>{k[4]} Verified</div></div>)}
          </div>
        )}

        <div style={{textAlign: "center", marginTop: "16px", fontSize: "10px", color: "#999"}}>HTH Demo V8 • Group Removed • For Demo Only • Amsterdam 2026</div>
      </div>
    </div>
  );
}
