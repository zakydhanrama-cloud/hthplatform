"use client";
import { useState } from 'react';

const initialAlumni = [
  { id: 1, name: "Paul Geraeds", year: "1986", flag: "🇳🇱→🇩🇪", location: "Frankfurt", current: "Vice-Chairman NBTC", project: "Netherlands Tourism", trace: ["1986 Lulus HTH", "Chief Steward Frankfurt", "Vice-Chairman NBTC"] },
  { id: 2, name: "Roberto Payer", year: "Senior Hicon", flag: "🇳🇱", location: "Amsterdam", current: "Hilton Waldorf", project: "Hilton Legacy", trace: ["Hilton Worldwide", "Waldorf Astoria", "Senior Hicon Award"] },
  { id: 3, name: "Jozien & Laurie", year: "Junior Hicon", flag: "🇳🇱", location: "Amsterdam", current: "Vini Mini Founders", project: "Kids Food", trace: ["Founded Vini Mini", "Healthy 1000 days", "Junior Hicon"] },
  { id: 4, name: "Pieter Olierook", year: "Alumni Hicon", flag: "🇳🇱→🇧🇪", location: "Benelux", current: "Unilever Ice Cream", project: "Ice Cream", trace: ["Digital Commerce", "Unilever Growth", "Alumni Hicon"] },
  { id: 5, name: "Zaky Dhanrama", year: "2025", flag: "🇳🇱", location: "Amsterdam", current: "Platform Founder", project: "HTH Platform", trace: ["Build Platform", "Vercel Live", "Amsterdam Hub"] },
];

const initialSustainProjects = [
  { id: 1, name: "MADE BLUE x HTH - Water", pilar: "Water Stewardship", sdg: "SDG 6,12", score: 92, action: "Toilet 6L → 3L + Shower App", co2: "-40% Water Use", impact: "1L saved = 1L clean water for community", color: "#0ea5e9" },
  { id: 2, name: "SENSE Framework - Food", pilar: "SENSE Food", sdg: "SDG 2,12,13", score: 95, action: "Plant-forward default + 80% <250km", co2: "-35% Food Miles", impact: "Seasonal, Ethical, Nutritious", color: "#22c55e" },
  { id: 3, name: "Green Key Gold Campus", pilar: "Green Operations", sdg: "SDG 7,13", score: 98, action: "Renewable Energy + Zero Plastic", co2: "-30% Energy", impact: "ESG Compliance + Zero Waste Guides", color: "#16a34a" },
  { id: 4, name: "Beekeeping + Eden Garden", pilar: "Biodiversity", sdg: "SDG 15", score: 88, action: "Roof-top Bees 2019 + Eden Garden", co2: "Biodiversity +", impact: "Honey extraction curriculum", color: "#eab308" },
  { id: 5, name: "Sustainable Hospitality Challenge", pilar: "Innovation", sdg: "SDG 9,17", score: 100, action: "Zero-emission hotel design", co2: "NEOM Funded", impact: "World Sustainable Hospitality Alliance", color: "#7c3aed" },
];

const chapters = [
  { name: "Aruba Chapter", members: 21, loc: "Aruba", img: "🏖️", color: "#0ea5e9" },
  { name: "Bangkok Chapter", members: 28, loc: "Bangkok, Thailand", img: "🌃", color: "#f59e0b" },
  { name: "Barcelona Chapter", members: 99, loc: "Barcelona, Spain", img: "🏛️", color: "#ec4899" },
  { name: "Amsterdam Chapter", members: 450, loc: "Amsterdam, Netherlands", img: "🚲", color: "#22c55e" },
  { name: "Dubai Chapter", members: 67, loc: "Dubai, UAE", img: "🏜️", color: "#f97316" },
  { name: "Singapore Chapter", members: 52, loc: "Singapore", img: "🦁", color: "#dc2626" },
];

const kpiData = [
  { pilar: "Employer Reputation & Employability", kpi: "Employability Rate 6 bulan", target: ">=95%", cara: "Tracer Study 6 bulan pasca lulus", val: "96%", status: "✅" },
  { pilar: "Employer Reputation & Employability", kpi: "Employer Satisfaction Index", target: ">=85/100", cara: "Survei tahunan mitra industri", val: "88/100", status: "✅" },
  { pilar: "Academic Reputation & Research", kpi: "Academic Reputation Score", target: ">=80/100", cara: "Survei QS global", val: "82/100", status: "✅" },
  { pilar: "Academic Reputation & Research", kpi: "Riset terapan / industri per tahun", target: "Min 15", cara: "Audit Research Centre", val: "18", status: "✅" },
  { pilar: "Study Success & Student Support", kpi: "1st Year Retention Rate", target: ">=90%", cara: "Registrasi ulang tahun ke-2", val: "92%", status: "✅" },
  { pilar: "Study Success & Student Support", kpi: "Graduation Rate 4-5 tahun", target: ">=80%", cara: "Data akademik Keuzegids", val: "85%", status: "✅" },
  { pilar: "Practical Integration & Connection", kpi: "Magang internasional bintang 5", target: "100% (2x wajib)", cara: "Verifikasi Placement Office", val: "100%", status: "✅" },
  { pilar: "Practical Integration & Connection", kpi: "Kemitraan aktif industri", target: "Min 50+ mitra", cara: "Review MoU Industry Relations", val: "67 mitra", status: "✅" },
  { pilar: "Internationalisation & Quality", kpi: "% Internasional mahasiswa & staf", target: ">=40%", cara: "Sensus HR & Akademik", val: "44%", status: "✅" },
  { pilar: "Internationalisation & Quality", kpi: "QS 5-Star & NVAO/The-ICE", target: "Maintain", cara: "Audit eksternal berkala", val: "5-Star Gold", status: "✅" },
];

export default function Page() {
  const [tab, setTab] = useState<"alumni" | "sustain" | "chapters" | "kpi" | "group">("sustain");
  const [alumni, setAlumni] = useState(initialAlumni);
  const [sustain, setSustain] = useState(initialSustainProjects);
  const [searchA, setSearchA] = useState("");
  const [searchS, setSearchS] = useState("");
  const [showAddA, setShowAddA] = useState(false);
  const [showAddS, setShowAddS] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [formA, setFormA] = useState({name:"", year:"", location:"", current:"", project:"", trace:""});
  const [formS, setFormS] = useState({name:"", pilar:"", sdg:"", score:"", action:"", co2:"", impact:""});

  const filteredA = alumni.filter(a=> a.name.toLowerCase().includes(searchA.toLowerCase()));
  const filteredS = sustain.filter(s=> s.name.toLowerCase().includes(searchS.toLowerCase()) || s.pilar.toLowerCase().includes(searchS.toLowerCase()));

  const addAlumni = () => {
    if(!formA.name) return alert("Isi nama dulu!");
    setAlumni([{ id: Date.now(), name: formA.name, year: formA.year||"2025", flag: "🇳🇱", location: formA.location||"Amsterdam", current: formA.current||"Alumni", project: formA.project||"Project", trace: formA.trace ? formA.trace.split(",") : ["New Journey"] }, ...alumni]);
    setFormA({name:"", year:"", location:"", current:"", project:"", trace:""}); setShowAddA(false);
  };
  const addSustain = () => {
    if(!formS.name) return alert("Isi nama project!");
    setSustain([{ id: Date.now(), name: formS.name, pilar: formS.pilar||"Green Operations", sdg: formS.sdg||"SDG 12", score: parseInt(formS.score)||90, action: formS.action||"Green Action", co2: formS.co2||"-20%", impact: formS.impact||"High Impact", color: "#22c55e" }, ...sustain]);
    setFormS({name:"", pilar:"", sdg:"", score:"", action:"", co2:"", impact:""}); setShowAddS(false);
  };

  return (
    <div style={{background: "#f8fafc", minHeight: "100vh", padding: "14px", fontFamily: "system-ui"}}>
      <div style={{maxWidth: "1200px", margin: "0 auto"}}>
        <div style={{background: "white", borderRadius: "20px", padding: "18px", border: "2px solid #22c55e", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px"}}>
          <div><h1 style={{fontSize: "18px", fontWeight: 900, margin: 0}}>HTH ULTIMATE V7 - Green Key Gold 🌱</h1><p style={{color: "#666", margin: "2px 0 0", fontSize: "10px"}}>Hospitality for a better world • Net Positive Hospitality • World Sustainable Hospitality Alliance</p></div>
          <div style={{display: "flex", gap: "5px", flexWrap: "wrap"}}>
            <button onClick={()=>setTab("alumni")} style={{background: tab==="alumni" ? "black" : "#eee", color: tab==="alumni" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>👥 Alumni ({alumni.length})</button>
            <button onClick={()=>setTab("sustain")} style={{background: tab==="sustain" ? "#22c55e" : "#eee", color: tab==="sustain" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>🌱 Sustain 5 KPI</button>
            <button onClick={()=>setTab("chapters")} style={{background: tab==="chapters" ? "#dc2626" : "#eee", color: tab==="chapters" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>🌍 Chapters (30)</button>
            <button onClick={()=>setTab("kpi")} style={{background: tab==="kpi" ? "#7c3aed" : "#eee", color: tab==="kpi" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>📊 10 KPI</button>
            <button onClick={()=>setTab("group")} style={{background: tab==="group" ? "#2563eb" : "#eee", color: tab==="group" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>🔗 Group</button>
          </div>
        </div>

        {tab==="alumni" && (
          <div style={{background: "white", borderRadius: "20px", padding: "18px", marginTop: "12px"}}>
            <div style={{display: "flex", gap: "8px", marginBottom: "12px"}}><input value={searchA} onChange={e=>setSearchA(e.target.value)} placeholder="🔍 Search alumni..." style={{flex: 1, border: "1px solid #ddd", borderRadius: "20px", padding: "8px 12px", fontSize: "12px"}}/><button onClick={()=>setShowAddA(!showAddA)} style={{background: "black", color: "white", border: "none", borderRadius: "20px", padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>➕ Add</button></div>
            {showAddA && <div style={{background: "#f9f9f9", borderRadius: "12px", padding: "12px", marginBottom: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px"}}><input placeholder="Nama *" value={formA.name} onChange={e=>setFormA({...formA, name:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Year" value={formA.year} onChange={e=>setFormA({...formA, year:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Location" value={formA.location} onChange={e=>setFormA({...formA, location:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Current Job" value={formA.current} onChange={e=>setFormA({...formA, current:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Project" value={formA.project} onChange={e=>setFormA({...formA, project:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Journey (koma)" value={formA.trace} onChange={e=>setFormA({...formA, trace:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><button onClick={addAlumni} style={{gridColumn: "span 2", background: "black", color: "white", border: "none", borderRadius: "8px", padding: "8px", fontWeight: 700, cursor: "pointer"}}>Save</button></div>}
            {filteredA.map(a=><div key={a.id} onClick={()=>setSelected(a)} style={{border: "1px solid #eee", borderRadius: "10px", padding: "10px", marginBottom: "6px", cursor: "pointer", fontSize: "12px"}}><b>{a.name}</b> - {a.location} • {a.current} • Journey {a.trace.length} steps</div>)}
          </div>
        )}

        {tab==="sustain" && (
          <div style={{marginTop: "12px"}}>
            <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", marginBottom: "12px"}}>
              {[
                ["💧 Water", "MADE BLUE", "-40% Water", "6L→3L toilet"],
                ["🥗 SENSE", "Plant-forward", "80% <250km", "Seasonal Ethical"],
                ["🏢 Green Ops", "Green Key Gold", "-30% Energy", "ESG + Zero Waste"],
                ["🐝 Biodiversity", "Beekeeping", "Roof-top 2019", "Eden Garden"],
                ["💡 Innovation", "SHC Challenge", "NEOM Funded", "Zero-emission"],
              ].map((k,i)=><div key={i} style={{background: "white", borderRadius: "14px", padding: "12px", border: "1px solid #bbf7d0"}}><div style={{fontSize: "10px", color: "#999"}}>{k[0]}</div><div style={{fontSize: "12px", fontWeight: 800, marginTop: "4px"}}>{k[1]}</div><div style={{fontSize: "10px", color: "#22c55e", marginTop: "2px"}}>{k[2]}</div><div style={{fontSize: "9px", color: "#666"}}>{k[3]}</div></div>)}
            </div>
            <div style={{background: "white", borderRadius: "20px", padding: "18px", border: "2px solid #22c55e"}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px"}}>
                <h2 style={{margin: 0, fontSize: "14px"}}>🌱 Sustainability - 5 Pilar HTH Green Key Gold + Hospitality for a better world</h2>
                <div style={{display: "flex", gap: "8px"}}><input value={searchS} onChange={e=>setSearchS(e.target.value)} placeholder="🔍 Search pilar..." style={{border: "1px solid #bbf7d0", borderRadius: "20px", padding: "6px 10px", fontSize: "11px"}}/><button onClick={()=>setShowAddS(!showAddS)} style={{background: "#22c55e", color: "white", border: "none", borderRadius: "20px", padding: "6px 12px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>➕ Add Project</button></div>
              </div>
              {showAddS && <div style={{background: "#f0fdf4", borderRadius: "12px", padding: "12px", marginBottom: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px"}}><input placeholder="Project Name *" value={formS.name} onChange={e=>setFormS({...formS, name:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Pilar (Water/SENSE/Green/Bio/Innov)" value={formS.pilar} onChange={e=>setFormS({...formS, pilar:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="SDG" value={formS.sdg} onChange={e=>setFormS({...formS, sdg:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Score" value={formS.score} onChange={e=>setFormS({...formS, score:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Action" value={formS.action} onChange={e=>setFormS({...formS, action:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="CO2 Impact" value={formS.co2} onChange={e=>setFormS({...formS, co2:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><button onClick={addSustain} style={{gridColumn: "span 2", background: "#22c55e", color: "white", border: "none", borderRadius: "8px", padding: "8px", fontWeight: 700, cursor: "pointer"}}>Save Sustainability Project</button></div>}
              <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                {filteredS.map(s=>(
                  <div key={s.id} onClick={()=>setSelected(s)} style={{border: "1px solid #dcfce7", borderRadius: "12px", padding: "12px", display: "flex", justifyContent: "space-between", cursor: "pointer", background: "#fafffe"}}>
                    <div style={{display: "flex", gap: "10px", alignItems: "center"}}><div style={{width: "42px", height: "42px", background: s.color, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "11px"}}>{s.score}%</div><div><div style={{fontWeight: 700, fontSize: "12px"}}>{s.name} <span style={{fontSize: "9px", background: "#dcfce7", color: "#166534", padding: "2px 6px", borderRadius: "8px", marginLeft: "4px"}}>{s.pilar}</span></div><div style={{fontSize: "11px", color: "#166534"}}>{s.action} • {s.co2}</div><div style={{fontSize: "10px", color: "#666"}}>{s.impact}</div></div></div>
                    <div style={{fontSize: "9px", background: s.color, color: "white", padding: "4px 8px", borderRadius: "10px", height: "fit-content"}}>{s.sdg}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab==="chapters" && (
          <div style={{background: "white", borderRadius: "20px", padding: "18px", marginTop: "12px", border: "1px solid #fecaca"}}>
            <h2 style={{margin: "0 0 14px"}}>Discover (30) - Global Alumni Chapters 🌍</h2>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px"}}>
              {chapters.map((c,i)=>(
                <div key={i} style={{border: "1px solid #eee", borderRadius: "16px", overflow: "hidden", background: "white"}}>
                  <div style={{height: "140px", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px"}}>{c.img}</div>
                  <div style={{padding: "14px"}}>
                    <div style={{fontWeight: 700, fontSize: "15px"}}>{c.name}</div>
                    <div style={{fontSize: "12px", color: "#666", marginTop: "4px"}}>{c.members} members · {c.loc}</div>
                    <button style={{width: "100%", background: "#991b1b", color: "white", border: "none", borderRadius: "8px", padding: "10px", marginTop: "12px", fontWeight: 700, cursor: "pointer", fontSize: "13px"}}>Log in to join</button>
                    <button style={{width: "100%", background: "#e5e7eb", color: "black", border: "none", borderRadius: "8px", padding: "10px", marginTop: "8px", fontWeight: 600, cursor: "pointer", fontSize: "13px"}}>Go to Group</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="kpi" && (
          <div style={{background: "white", borderRadius: "20px", padding: "18px", marginTop: "12px", border: "1px solid #e9d5ff"}}>
            <h2 style={{margin: "0 0 14px", fontSize: "14px"}}>📊 10 KPI HTH - Tracer Study + NVAO + QS + Internationalisation</h2>
            <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              {kpiData.map((k,i)=>(
                <div key={i} style={{border: "1px solid #f3e8ff", borderRadius: "10px", padding: "10px 12px", display: "flex", justifyContent: "space-between", fontSize: "11px"}}>
                  <div style={{flex: 1}}><div style={{fontSize: "9px", color: "#999"}}>{k.pilar}</div><div style={{fontWeight: 700}}>{k.kpi}</div><div style={{color: "#666"}}>{k.cara}</div></div>
                  <div style={{textAlign: "right"}}><div style={{fontWeight: 800, color: "#7c3aed"}}>{k.val}</div><div style={{fontSize: "9px"}}>Target: {k.target}</div><div>{k.status}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="group" && (
          <div style={{background: "white", borderRadius: "20px", padding: "0", marginTop: "12px", border: "2px solid #2563eb", overflow: "hidden"}}>
            <div style={{padding: "14px", background: "#eff6ff", display: "flex", justifyContent: "space-between"}}><b style={{fontSize: "13px"}}>🔗 Official HTH Alumni - alumnihotelschool.nl/topics</b><a href="https://www.alumnihotelschool.nl/topics" target="_blank" style={{background: "#2563eb", color: "white", padding: "6px 12px", borderRadius: "20px", textDecoration: "none", fontSize: "11px", fontWeight: 700}}>Open Full Site ↗</a></div>
            <div style={{height: "600px"}}><iframe src="https://www.alumnihotelschool.nl/topics" style={{width: "100%", height: "100%", border: "none"}} title="Official"></iframe></div>
          </div>
        )}

        {selected && <div style={{background: "white", borderRadius: "14px", padding: "14px", marginTop: "12px", border: "2px solid #ddd", fontSize: "12px"}}><div style={{display: "flex", justifyContent: "space-between"}}><b>{selected.name}</b><button onClick={()=>setSelected(null)} style={{border: "none", background: "#eee", borderRadius: "10px", padding: "4px 8px", cursor: "pointer"}}>X</button></div><div style={{marginTop: "6px"}}>{selected.action || selected.trace?.join(" → ") || selected.impact}</div></div>}
      </div>
    </div>
  );
}
