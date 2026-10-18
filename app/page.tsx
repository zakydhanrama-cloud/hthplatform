"use client";
import { useState } from 'react';

const initialAlumni = [
  { id: 1, name: "Paul Geraeds", year: "1986", flag: "🇳🇱→🇩🇪", location: "Frankfurt", current: "Vice-Chairman NBTC", project: "Netherlands Tourism", trace: ["1986 Lulus HTH", "Chief Steward Frankfurt", "Vice-Chairman NBTC"] },
  { id: 2, name: "Roberto Payer", year: "Senior Hicon", flag: "🇳🇱", location: "Amsterdam", current: "Hilton Waldorf", project: "Hilton Legacy", trace: ["Hilton Worldwide", "Waldorf Astoria", "Senior Hicon"] },
  { id: 3, name: "Zaky Dhanrama", year: "2025", flag: "🇳🇱", location: "Amsterdam", current: "Platform Founder", project: "HTH V8", trace: ["Build V8", "Track & Trace", "Amsterdam Hub"] },
];

const sustainInit = [
  { id: 1, pilar: "Water Stewardship", name: "MADE BLUE x HTH", desc: "Toilet 6L→3L + Shower App", target: "Save 40%", baseline: "2023: 20.500L/bulan", kpi: "-40% Water Use", color: "#0ea5e9", sdg: "SDG 6,12", logs: [{date: "2026-09-01", value: "12.800L", proof: "Sensor Den Haag", impact: "1L saved = 1L clean water Mali"}, {date: "2026-10-01", value: "12.300L", proof: "App report", impact: "500L for Kenya"}], score: 92 },
  { id: 2, pilar: "SENSE Framework", name: "SENSE Food", desc: "Plant-forward default + 80% <250km", target: "80% local", baseline: "2022: 55% local", kpi: "80% + 35% less miles", color: "#22c55e", sdg: "SDG 2,12,13", logs: [{date: "2026-10-15", value: "82% local", proof: "Invoice Westland 45km", impact: "Menu: Seasonal Tomat"}, {date: "2026-10-16", value: "88% plant", proof: "QR Scan Kantin", impact: "-35% CO2"}], score: 95 },
  { id: 3, pilar: "Green Operations", name: "Green Key Gold Campus", desc: "Renewable + Zero Plastic", target: "-30% Energy", baseline: "2022: 150.000 kWh", kpi: "-30% Energy ESG", color: "#16a34a", sdg: "SDG 7,13", logs: [{date: "2026-09-30", value: "105.000 kWh", proof: "Smart meter Ams", impact: "Solar 40%"}, {date: "2026-10-01", value: "12kg sampah", proof: "Timbangan kantin", impact: "Zero plastic ✅"}], score: 98 },
  { id: 4, pilar: "Biodiversity", name: "Beekeeping + Eden Garden", desc: "Roof-top Bees 2019 + Eden Garden", target: "5 colonies", baseline: "2019: 1 colony", kpi: "Biodiversity +", color: "#eab308", sdg: "SDG 15", logs: [{date: "2026-08-20", value: "2.5kg honey", proof: "Logbook Zaky", impact: "Extract by students"}, {date: "2026-09-10", value: "Eden: 15kg", proof: "Foto panen", impact: "Lokal produce"}], score: 88 },
  { id: 5, pilar: "Innovation", name: "Sustainable Hospitality Challenge", desc: "Zero-emission hotel design", target: "15 proposals funded", baseline: "2020: 0", kpi: "NEOM Funded", color: "#7c3aed", sdg: "SDG 9,17", logs: [{date: "2026-06-01", value: "Proposal HTH-X", proof: "Pitch deck", impact: "Funding $50k NEOM"}, {date: "2026-09-01", value: "Prototype", proof: "WAHA Alliance", impact: "Real hotel test"}], score: 100 },
];

const kpi10Init = [
  { id: 1, pilar: "Employer Reputation", kpi: "Employability Rate 6 bulan", target: ">=95%", method: "Tracer Study 6 bulan via Launch.it", val: "96%", status: "Verified", lastAudit: "2026-03-15", evidence: [{date: "2026-03-15", doc: "Tracer 6mo 2025.pdf", proof: "Osiris + LinkedIn verify", note: "245/255 kerja"}], nextDue: "2027-03-15" },
  { id: 2, pilar: "Employer Reputation", kpi: "Employer Satisfaction Index", target: ">=85/100", method: "Survei tahunan mitra industri", val: "88/100", status: "Verified", lastAudit: "2026-05-01", evidence: [{date: "2026-05-01", doc: "Employer Survey Hilton.pdf", proof: "Email response 67 mitra"}], nextDue: "2027-05-01" },
  { id: 3, pilar: "Academic & Research", kpi: "Academic Reputation Score", target: ">=80/100", method: "Survei QS global", val: "82/100", status: "Verified", lastAudit: "2026-06-10", evidence: [{date: "2026-06-10", doc: "QS Reputation 2026.pdf", proof: "QS Intelligence portal"}], nextDue: "2027-06-10" },
  { id: 4, pilar: "Academic & Research", kpi: "Riset terapan / industri / thn", target: "Min 15", method: "Audit Research Centre", val: "18 projects", status: "Verified", lastAudit: "2026-09-01", evidence: [{date: "2026-09-01", doc: "Scopus 18.pdf", proof: "Scopus citations"}], nextDue: "2027-09-01" },
  { id: 5, pilar: "Study Success", kpi: "1st Year Retention Rate", target: ">=90%", method: "Registrasi ulang tahun ke-2", val: "92%", status: "Verified", lastAudit: "2026-08-30", evidence: [{date: "2026-08-30", doc: "Osiris Retention.pdf", proof: "NSE + Osiris"}], nextDue: "2027-08-30" },
  { id: 6, pilar: "Study Success", kpi: "Graduation Rate 4-5 thn", target: ">=80%", method: "Data akademik Keuzegids", val: "85%", status: "Verified", lastAudit: "2026-08-30", evidence: [{date: "2026-08-30", doc: "Keuzegids 2026.pdf", proof: "Keuzegids verified"}], nextDue: "2027-08-30" },
  { id: 7, pilar: "Practical Integration", kpi: "Magang internasional bintang 5", target: "100% (2x wajib)", method: "Verifikasi Placement Office", val: "100%", status: "Verified", lastAudit: "2026-07-15", evidence: [{date: "2026-07-15", doc: "Placement 2025.pdf", proof: "2x internship 5-star"}], nextDue: "2027-07-15" },
  { id: 8, pilar: "Practical Integration", kpi: "Kemitraan aktif industri", target: "Min 50+ mitra", method: "Review MoU Industry Relations", val: "67 mitra", status: "Verified", lastAudit: "2026-09-20", evidence: [{date: "2026-09-20", doc: "MoU List 67.pdf", proof: "MoU active"}], nextDue: "2027-09-20" },
  { id: 9, pilar: "Internationalisation", kpi: "% Internasional mhs & staf", target: ">=40%", method: "Sensus HR & Akademik", val: "44%", status: "Verified", lastAudit: "2026-09-01", evidence: [{date: "2026-09-01", doc: "HR Census 2026.pdf", proof: "HR portal"}], nextDue: "2027-09-01" },
  { id: 10, pilar: "Internationalisation", kpi: "QS 5-Star & NVAO/The-ICE", target: "Maintain", method: "Audit eksternal berkala", val: "5-Star Gold", status: "Verified", lastAudit: "2026-10-01", evidence: [{date: "2026-10-01", doc: "Green Key Gold Cert.pdf", proof: "QS Stars + NVAO visit"}], nextDue: "2027-10-01" },
];

const chapters = [
  { name: "Aruba Chapter", members: 21, loc: "Aruba", img: "🏖️", color: "#0ea5e9" },
  { name: "Bangkok Chapter", members: 28, loc: "Bangkok, Thailand", img: "🌃", color: "#f59e0b" },
  { name: "Barcelona Chapter", members: 99, loc: "Barcelona, Spain", img: "🏛️", color: "#ec4899" },
  { name: "Amsterdam Chapter", members: 450, loc: "Amsterdam", img: "🚲", color: "#22c55e" },
  { name: "Dubai Chapter", members: 67, loc: "Dubai", img: "🏜️", color: "#f97316" },
  { name: "Singapore Chapter", members: 52, loc: "Singapore", img: "🦁", color: "#dc2626" },
];

export default function Page() {
  const [tab, setTab] = useState<"alumni"|"sustain"|"chapters"|"kpi">("sustain");
  const [alumni, setAlumni] = useState(initialAlumni);
  const [sustain, setSustain] = useState(sustainInit);
  const [kpi10, setKpi10] = useState(kpi10Init);
  const [searchA, setSearchA] = useState("");
  const [searchS, setSearchS] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [showAddA, setShowAddA] = useState(false);
  const [formA, setFormA] = useState({name:"", year:"", location:"", current:"", project:"", trace:""});
  const [logForm, setLogForm] = useState({sustainId: 0, date: "", value: "", proof: "", impact: ""});
  const [evidenceForm, setEvidenceForm] = useState({kpiId: 0, date: "", doc: "", proof: "", note: ""});

  const filteredA = alumni.filter(a=> a.name.toLowerCase().includes(searchA.toLowerCase()));
  const filteredS = sustain.filter(s=> s.name.toLowerCase().includes(searchS.toLowerCase()) || s.pilar.toLowerCase().includes(searchS.toLowerCase()));

  const addAlumni = () => {
    if(!formA.name) return alert("Isi nama!");
    setAlumni([{ id: Date.now(), name: formA.name, year: formA.year||"2025", flag: "🇳🇱", location: formA.location||"Amsterdam", current: formA.current||"Alumni", project: formA.project||"Project", trace: formA.trace ? formA.trace.split(",") : ["New Journey"] }, ...alumni]);
    setFormA({name:"", year:"", location:"", current:"", project:"", trace:""}); setShowAddA(false);
  };

  const addSustainLog = () => {
    if(!logForm.sustainId) return alert("Pilih pilar dulu!");
    setSustain(prev=> prev.map(s=> s.id===logForm.sustainId ? {...s, logs: [{date: logForm.date||new Date().toISOString().split('T')[0], value: logForm.value, proof: logForm.proof, impact: logForm.impact}, ...s.logs]} : s));
    setLogForm({sustainId: 0, date: "", value: "", proof: "", impact: ""});
  };

  const addKpiEvidence = () => {
    if(!evidenceForm.kpiId) return alert("Pilih KPI dulu!");
    setKpi10(prev=> prev.map(k=> k.id===evidenceForm.kpiId ? {...k, evidence: [{date: evidenceForm.date||new Date().toISOString().split('T')[0], doc: evidenceForm.doc, proof: evidenceForm.proof, note: evidenceForm.note}, ...k.evidence], lastAudit: evidenceForm.date||new Date().toISOString().split('T')[0]} : k));
    setEvidenceForm({kpiId: 0, date: "", doc: "", proof: "", note: ""});
  };

  return (
    <div style={{background: "#f8fafc", minHeight: "100vh", padding: "14px", fontFamily: "system-ui"}}>
      <div style={{maxWidth: "1200px", margin: "0 auto"}}>
        <div style={{background: "white", borderRadius: "20px", padding: "18px", border: "2px solid #22c55e", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px"}}>
          <div><h1 style={{fontSize: "17px", fontWeight: 900, margin: 0}}>HTH V8 - Track & Trace - Green Key Gold 🌱</h1><p style={{color: "#666", margin: "2px 0 0", fontSize: "10px"}}>Group REMOVED • Sustain Trace: Daily Logs + Proof • 10 KPI Trace: Evidence + Audit Timeline</p></div>
          <div style={{display: "flex", gap: "5px", flexWrap: "wrap"}}>
            <button onClick={()=>setTab("alumni")} style={{background: tab==="alumni" ? "black" : "#eee", color: tab==="alumni" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>👥 Alumni ({alumni.length})</button>
            <button onClick={()=>setTab("sustain")} style={{background: tab==="sustain" ? "#22c55e" : "#eee", color: tab==="sustain" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>🌱 Sustain Trace (5)</button>
            <button onClick={()=>setTab("chapters")} style={{background: tab==="chapters" ? "#dc2626" : "#eee", color: tab==="chapters" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>🌍 Chapters (30)</button>
            <button onClick={()=>setTab("kpi")} style={{background: tab==="kpi" ? "#7c3aed" : "#eee", color: tab==="kpi" ? "white" : "black", border: "none", padding: "7px 12px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "10px"}}>📊 10 KPI Trace</button>
          </div>
        </div>

        {tab==="alumni" && (
          <div style={{background: "white", borderRadius: "20px", padding: "18px", marginTop: "12px"}}>
            <div style={{display: "flex", gap: "8px", marginBottom: "12px"}}><input value={searchA} onChange={e=>setSearchA(e.target.value)} placeholder="🔍 Search alumni..." style={{flex: 1, border: "1px solid #ddd", borderRadius: "20px", padding: "8px 12px", fontSize: "12px"}}/><button onClick={()=>setShowAddA(!showAddA)} style={{background: "black", color: "white", border: "none", borderRadius: "20px", padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>➕ Add</button></div>
            {showAddA && <div style={{background: "#f9f9f9", borderRadius: "12px", padding: "12px", marginBottom: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px"}}><input placeholder="Nama *" value={formA.name} onChange={e=>setFormA({...formA, name:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Year" value={formA.year} onChange={e=>setFormA({...formA, year:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Location" value={formA.location} onChange={e=>setFormA({...formA, location:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Current Job" value={formA.current} onChange={e=>setFormA({...formA, current:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Project" value={formA.project} onChange={e=>setFormA({...formA, project:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><input placeholder="Journey koma" value={formA.trace} onChange={e=>setFormA({...formA, trace:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px"}}/><button onClick={addAlumni} style={{gridColumn: "span 2", background: "black", color: "white", border: "none", borderRadius: "8px", padding: "8px", fontWeight: 700, cursor: "pointer"}}>Save</button></div>}
            {filteredA.map(a=><div key={a.id} onClick={()=>setSelected(a)} style={{border: "1px solid #eee", borderRadius: "10px", padding: "10px", marginBottom: "6px", cursor: "pointer", fontSize: "12px"}}><b>{a.name}</b> - {a.location} • {a.current}</div>)}
          </div>
        )}

        {tab==="sustain" && (
          <div style={{marginTop: "12px"}}>
            <div style={{background: "white", borderRadius: "16px", padding: "14px", border: "1px solid #bbf7d0", marginBottom: "10px"}}>
              <b style={{fontSize: "12px"}}>➕ TRACK & TRACE: Add Daily Log (Proof Fisik)</b>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginTop: "8px"}}>
                <select value={logForm.sustainId} onChange={e=>setLogForm({...logForm, sustainId: parseInt(e.target.value)})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px", fontSize: "11px"}}><option value={0}>Pilih Pilar...</option>{sustain.map(s=><option key={s.id} value={s.id}>{s.pilar}</option>)}</select>
                <input type="date" value={logForm.date} onChange={e=>setLogForm({...logForm, date: e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px", fontSize: "11px"}}/>
                <input placeholder="Value: 12.300L / 82% / 2.5kg" value={logForm.value} onChange={e=>setLogForm({...logForm, value: e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px", fontSize: "11px"}}/>
                <input placeholder="Proof: Sensor / Invoice / Foto" value={logForm.proof} onChange={e=>setLogForm({...logForm, proof: e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px", fontSize: "11px"}}/>
                <input placeholder="Impact: Mali water / CO2 save" value={logForm.impact} onChange={e=>setLogForm({...logForm, impact: e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px", fontSize: "11px"}}/>
                <button onClick={addSustainLog} style={{background: "#22c55e", color: "white", border: "none", borderRadius: "8px", padding: "6px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>Add Log → Trace</button>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
              {filteredS.map(s=>(
                <div key={s.id} style={{background: "white", borderRadius: "16px", padding: "14px", border: `2px solid ${s.color}`}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                    <div><div style={{fontSize: "9px", color: s.color, fontWeight: 800}}>{s.pilar} • {s.sdg}</div><div style={{fontWeight: 800, fontSize: "13px", marginTop: "2px"}}>{s.name} <span style={{background: s.color, color: "white", padding: "2px 6px", borderRadius: "8px", fontSize: "10px"}}>{s.score}%</span></div><div style={{fontSize: "11px", color: "#333", marginTop: "4px"}}>{s.desc} • Target: {s.target}</div><div style={{fontSize: "10px", color: "#666"}}>Baseline: {s.baseline} • KPI: {s.kpi}</div></div>
                    <button onClick={()=>setSelected(s)} style={{background: s.color, color: "white", border: "none", borderRadius: "20px", padding: "6px 10px", fontSize: "10px", fontWeight: 700, cursor: "pointer"}}>Trace {s.logs.length}</button>
                  </div>
                  <div style={{marginTop: "10px", borderTop: "1px dashed #eee", paddingTop: "8px"}}>
                    <div style={{fontSize: "10px", fontWeight: 700, color: "#666"}}>📍 TRACEABILITY LOGS:</div>
                    <div style={{display: "flex", gap: "6px", overflowX: "auto", marginTop: "6px"}}>
                      {s.logs.map((l,i)=><div key={i} style={{minWidth: "180px", background: "#f0fdf4", borderRadius: "8px", padding: "8px", border: "1px solid #dcfce7"}}><div style={{fontSize: "10px", fontWeight: 700}}>{l.date} → {l.value}</div><div style={{fontSize: "9px", color: "#666"}}>Proof: {l.proof}</div><div style={{fontSize: "9px", color: s.color, fontWeight: 600}}>Impact: {l.impact}</div></div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="chapters" && (
          <div style={{background: "white", borderRadius: "20px", padding: "18px", marginTop: "12px", border: "1px solid #fecaca"}}>
            <h2 style={{margin: "0 0 14px"}}>Discover (30) 🌍</h2>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px"}}>
              {chapters.map((c,i)=><div key={i} style={{border: "1px solid #eee", borderRadius: "16px", overflow: "hidden"}}><div style={{height: "120px", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px"}}>{c.img}</div><div style={{padding: "12px"}}><div style={{fontWeight: 700, fontSize: "14px"}}>{c.name}</div><div style={{fontSize: "11px", color: "#666"}}>{c.members} members · {c.loc}</div><button style={{width: "100%", background: "#991b1b", color: "white", border: "none", borderRadius: "8px", padding: "8px", marginTop: "10px", fontWeight: 700, cursor: "pointer", fontSize: "12px"}}>Log in to join</button><button style={{width: "100%", background: "#e5e7eb", color: "black", border: "none", borderRadius: "8px", padding: "8px", marginTop: "6px", fontWeight: 600, cursor: "pointer", fontSize: "12px"}}>Go to Group</button></div></div>)}
            </div>
          </div>
        )}

        {tab==="kpi" && (
          <div style={{marginTop: "12px"}}>
            <div style={{background: "white", borderRadius: "16px", padding: "14px", border: "1px solid #e9d5ff", marginBottom: "10px"}}>
              <b style={{fontSize: "12px"}}>➕ TRACK & TRACE: Upload Evidence (Audit Trail)</b>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginTop: "8px"}}>
                <select value={evidenceForm.kpiId} onChange={e=>setEvidenceForm({...evidenceForm, kpiId: parseInt(e.target.value)})} style={{border: "1px solid #e9d5ff", borderRadius: "8px", padding: "6px", fontSize: "11px"}}><option value={0}>Pilih KPI...</option>{kpi10.map(k=><option key={k.id} value={k.id}>{k.kpi}</option>)}</select>
                <input type="date" value={evidenceForm.date} onChange={e=>setEvidenceForm({...evidenceForm, date: e.target.value})} style={{border: "1px solid #e9d5ff", borderRadius: "8px", padding: "6px", fontSize: "11px"}}/>
                <input placeholder="Doc: Tracer 6mo.pdf" value={evidenceForm.doc} onChange={e=>setEvidenceForm({...evidenceForm, doc: e.target.value})} style={{border: "1px solid #e9d5ff", borderRadius: "8px", padding: "6px", fontSize: "11px"}}/>
                <input placeholder="Proof: QS portal / Osiris" value={evidenceForm.proof} onChange={e=>setEvidenceForm({...evidenceForm, proof: e.target.value})} style={{border: "1px solid #e9d5ff", borderRadius: "8px", padding: "6px", fontSize: "11px"}}/>
                <input placeholder="Note: 245/255 kerja" value={evidenceForm.note} onChange={e=>setEvidenceForm({...evidenceForm, note: e.target.value})} style={{border: "1px solid #e9d5ff", borderRadius: "8px", padding: "6px", fontSize: "11px"}}/>
                <button onClick={addKpiEvidence} style={{background: "#7c3aed", color: "white", border: "none", borderRadius: "8px", padding: "6px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>Upload Evidence → Verify</button>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              {kpi10.map(k=>(
                <div key={k.id} style={{background: "white", borderRadius: "14px", padding: "12px", border: "1px solid #f3e8ff"}}>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{flex: 1}}><div style={{fontSize: "9px", color: "#999"}}>{k.pilar} • {k.method}</div><div style={{fontWeight: 700, fontSize: "12px"}}>{k.kpi} <span style={{background: "#f3e8ff", color: "#7c3aed", padding: "2px 6px", borderRadius: "8px", fontSize: "10px"}}>{k.val}</span> <span style={{fontSize: "10px"}}>{k.status==="Verified" ? "✅" : "⚠️"}</span></div><div style={{fontSize: "10px", color: "#666"}}>Target: {k.target} • Last Audit: {k.lastAudit} • Next Due: {k.nextDue}</div></div>
                    <button onClick={()=>setSelected(k)} style={{background: "#7c3aed", color: "white", border: "none", borderRadius: "20px", padding: "6px 10px", fontSize: "10px", fontWeight: 700, cursor: "pointer", height: "fit-content"}}>Trace {k.evidence.length}</button>
                  </div>
                  <div style={{marginTop: "8px", borderTop: "1px dashed #eee", paddingTop: "6px", display: "flex", gap: "6px", overflowX: "auto"}}>
                    {k.evidence.map((e,i)=><div key={i} style={{minWidth: "200px", background: "#faf5ff", borderRadius: "8px", padding: "6px 8px", border: "1px solid #f3e8ff"}}><div style={{fontSize: "10px", fontWeight: 700}}>{e.date} - {e.doc}</div><div style={{fontSize: "9px", color: "#666"}}>Proof: {e.proof}</div><div style={{fontSize: "9px", color: "#7c3aed"}}>{e.note || e.proof}</div></div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected && <div style={{background: "white", borderRadius: "14px", padding: "14px", marginTop: "12px", border: "2px solid #ddd", fontSize: "12px"}}><div style={{display: "flex", justifyContent: "space-between"}}><b>{selected.name || selected.kpi}</b><button onClick={()=>setSelected(null)} style={{border: "none", background: "#eee", borderRadius: "10px", padding: "4px 8px", cursor: "pointer"}}>X</button></div><div style={{marginTop: "6px", fontSize: "11px", whiteSpace: "pre-wrap"}}>{JSON.stringify(selected, null, 2)}</div></div>}
      </div>
    </div>
  );
}
