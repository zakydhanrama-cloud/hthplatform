"use client";
import { useState } from 'react';

const initialAlumni = [
  { id: 1, name: "Paul Geraeds", year: "1986", flag: "🇳🇱→🇩🇪", location: "Amsterdam → Frankfurt", current: "Vice-Chairman NBTC", project: "Netherlands Tourism", trace: ["1986: Lulus HTH", "Chief Steward Frankfurt", "Vice-Chairman NBTC"] },
  { id: 2, name: "Roberto Payer", year: "Senior Hicon", flag: "🇳🇱", location: "Amsterdam", current: "Hilton Waldorf", project: "Hilton Legacy", trace: ["Hilton Worldwide", "Waldorf Astoria", "Senior Hicon"] },
  { id: 3, name: "Jozien & Laurie", year: "Junior Hicon", flag: "🇳🇱", location: "Amsterdam", current: "Vini Mini Founders", project: "Kids Food", trace: ["Founded Vini Mini", "Healthy 1000 days", "Junior Hicon"] },
  { id: 4, name: "Pieter Olierook", year: "Alumni Hicon", flag: "🇳🇱→🇧🇪", location: "Benelux", current: "Unilever Ice Cream", project: "Ice Cream", trace: ["Digital Commerce", "Unilever Growth", "Alumni Hicon"] },
  { id: 5, name: "Zaky Dhanrama", year: "2025", flag: "🇳🇱", location: "Amsterdam", current: "Platform Founder", project: "HTH Platform", trace: ["Build Platform", "Vercel Live", "Amsterdam Hub"] },
];

const initialSustain = [
  { id: 1, name: "Paul Geraeds - Sustainable Tourism", sdg: "SDG 8,12", score: 85, action: "Sustainable Tourism Strategy", impact: "National Green Policy", co2: "-15% CO2", color: "#A21942" },
  { id: 2, name: "Roberto Payer - Zero Waste Hotels", sdg: "SDG 12,13", score: 92, action: "Zero Waste Hotel", impact: "Energy -30%", co2: "-30% Energy", color: "#FD6925" },
  { id: 3, name: "Vini Mini - Organic", sdg: "SDG 3,12", score: 95, action: "Organic + Zero Plastic", impact: "100% Organic", co2: "Zero Plastic", color: "#4C9F38" },
];

export default function Page() {
  const [tab, setTab] = useState<"alumni" | "sustain" | "group">("alumni");
  const [alumni, setAlumni] = useState(initialAlumni);
  const [sustain, setSustain] = useState(initialSustain);
  const [searchA, setSearchA] = useState("");
  const [searchS, setSearchS] = useState("");
  const [showAddA, setShowAddA] = useState(false);
  const [showAddS, setShowAddS] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [formA, setFormA] = useState({name:"", year:"", location:"", current:"", project:"", trace:""});
  const [formS, setFormS] = useState({name:"", sdg:"", score:"", action:"", impact:"", co2:""});

  const filteredA = alumni.filter(a=> a.name.toLowerCase().includes(searchA.toLowerCase()) || a.current.toLowerCase().includes(searchA.toLowerCase()));
  const filteredS = sustain.filter(s=> s.name.toLowerCase().includes(searchS.toLowerCase()) || s.action.toLowerCase().includes(searchS.toLowerCase()));

  const addAlumni = () => {
    if(!formA.name) return alert("Isi nama dulu beb!");
    const newA = { id: Date.now(), name: formA.name, year: formA.year||"2025", flag: "🇳🇱", location: formA.location||"Amsterdam", current: formA.current||"HTH Alumni", project: formA.project||"New Project", trace: formA.trace ? formA.trace.split(",") : ["New Journey"] };
    setAlumni([newA, ...alumni]); setFormA({name:"", year:"", location:"", current:"", project:"", trace:""}); setShowAddA(false);
  };
  const addSustain = () => {
    if(!formS.name) return alert("Isi nama project dulu beb!");
    const newS = { id: Date.now(), name: formS.name, sdg: formS.sdg||"SDG 12", score: parseInt(formS.score)||90, action: formS.action||"Green Action", impact: formS.impact||"High Impact", co2: formS.co2||"-20% CO2", color: "#22c55e" };
    setSustain([newS, ...sustain]); setFormS({name:"", sdg:"", score:"", action:"", impact:"", co2:""}); setShowAddS(false);
  };

  return (
    <div style={{background: tab==="alumni" ? "#f6f7f8" : tab==="sustain" ? "#f0fdf4" : "#eff6ff", minHeight: "100vh", padding: "16px", fontFamily: "system-ui"}}>
      <div style={{maxWidth: "1150px", margin: "0 auto"}}>
        <div style={{background: "white", borderRadius: "20px", padding: "20px", border: "1px solid #eee", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px"}}>
          <div><h1 style={{fontSize: "20px", fontWeight: 900, margin: 0}}>HTH MAX V6.1 + Official Group</h1><p style={{color: "#666", margin: "4px 0 0", fontSize: "11px"}}>Dual Entity + Official Alumni Connection • Amsterdam Live</p></div>
          <div style={{display: "flex", gap: "6px", flexWrap: "wrap"}}>
            <button onClick={()=>{setTab("alumni"); setSelected(null)}} style={{background: tab==="alumni" ? "black" : "#eee", color: tab==="alumni" ? "white" : "black", border: "none", padding: "8px 14px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>👥 Alumni ({alumni.length})</button>
            <button onClick={()=>{setTab("sustain"); setSelected(null)}} style={{background: tab==="sustain" ? "#22c55e" : "#eee", color: tab==="sustain" ? "white" : "black", border: "none", padding: "8px 14px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>🌱 Sustain ({sustain.length})</button>
            <button onClick={()=>{setTab("group"); setSelected(null)}} style={{background: tab==="group" ? "#2563eb" : "#eee", color: tab==="group" ? "white" : "black", border: "none", padding: "8px 14px", borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "11px"}}>🔗 Official Group</button>
          </div>
        </div>

        {tab==="alumni" && (
          <div style={{background: "white", borderRadius: "20px", padding: "20px", marginTop: "14px", border: "1px solid #eee"}}>
            <div style={{display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap"}}>
              <input value={searchA} onChange={e=>setSearchA(e.target.value)} placeholder="🔍 Search alumni..." style={{flex: 1, border: "1px solid #ddd", borderRadius: "20px", padding: "10px 14px", fontSize: "13px", minWidth: "200px"}}/>
              <button onClick={()=>setShowAddA(!showAddA)} style={{background: "black", color: "white", border: "none", borderRadius: "20px", padding: "10px 18px", fontWeight: 700, cursor: "pointer"}}>➕ Add Alumni</button>
            </div>
            {showAddA && (
              <div style={{background: "#f9f9f9", borderRadius: "16px", padding: "16px", marginBottom: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
                <input placeholder="Nama Alumni *" value={formA.name} onChange={e=>setFormA({...formA, name:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="Year" value={formA.year} onChange={e=>setFormA({...formA, year:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="Location" value={formA.location} onChange={e=>setFormA({...formA, location:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="Current Job" value={formA.current} onChange={e=>setFormA({...formA, current:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="Project" value={formA.project} onChange={e=>setFormA({...formA, project:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="Career Journey (pisah koma)" value={formA.trace} onChange={e=>setFormA({...formA, trace:e.target.value})} style={{border: "1px solid #ddd", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <button onClick={addAlumni} style={{gridColumn: "span 2", background: "black", color: "white", border: "none", borderRadius: "10px", padding: "10px", fontWeight: 700, cursor: "pointer"}}>Save Alumni</button>
              </div>
            )}
            {filteredA.map(a=>(
              <div key={a.id} onClick={()=>setSelected({type:"alumni", ...a})} style={{border: "1px solid #eee", borderRadius: "12px", padding: "12px", marginBottom: "8px", display: "flex", justifyContent: "space-between", cursor: "pointer"}}>
                <div><div style={{fontWeight: 700, fontSize: "13px"}}>{a.name}</div><div style={{fontSize: "11px", color: "#666"}}>{a.flag} {a.location} • {a.current} • {a.trace.length} steps</div></div>
                <div style={{fontSize: "10px", background: "black", color: "white", padding: "4px 8px", borderRadius: "10px", height: "fit-content"}}>{a.project}</div>
              </div>
            ))}
          </div>
        )}

        {tab==="sustain" && (
          <div style={{background: "white", borderRadius: "20px", padding: "20px", marginTop: "14px", border: "1px solid #bbf7d0"}}>
            <div style={{display: "flex", gap: "10px", marginBottom: "16px"}}>
              <input value={searchS} onChange={e=>setSearchS(e.target.value)} placeholder="🔍 Search sustainability..." style={{flex: 1, border: "1px solid #bbf7d0", borderRadius: "20px", padding: "10px 14px", fontSize: "13px"}}/>
              <button onClick={()=>setShowAddS(!showAddS)} style={{background: "#22c55e", color: "white", border: "none", borderRadius: "20px", padding: "10px 18px", fontWeight: 700, cursor: "pointer"}}>➕ Add Sustain</button>
            </div>
            {showAddS && (
              <div style={{background: "#f0fdf4", borderRadius: "16px", padding: "16px", marginBottom: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
                <input placeholder="Project Name *" value={formS.name} onChange={e=>setFormS({...formS, name:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="SDG" value={formS.sdg} onChange={e=>setFormS({...formS, sdg:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="Score 0-100" value={formS.score} onChange={e=>setFormS({...formS, score:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="Action" value={formS.action} onChange={e=>setFormS({...formS, action:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="Impact" value={formS.impact} onChange={e=>setFormS({...formS, impact:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <input placeholder="CO2" value={formS.co2} onChange={e=>setFormS({...formS, co2:e.target.value})} style={{border: "1px solid #bbf7d0", borderRadius: "10px", padding: "8px 12px", fontSize: "12px"}}/>
                <button onClick={addSustain} style={{gridColumn: "span 2", background: "#22c55e", color: "white", border: "none", borderRadius: "10px", padding: "10px", fontWeight: 700, cursor: "pointer"}}>Save Sustain</button>
              </div>
            )}
            {filteredS.map(s=>(
              <div key={s.id} onClick={()=>setSelected({type:"sustain", ...s})} style={{border: "1px solid #dcfce7", borderRadius: "12px", padding: "12px", marginBottom: "8px", display: "flex", justifyContent: "space-between", cursor: "pointer"}}>
                <div style={{display: "flex", gap: "10px", alignItems: "center"}}><div style={{width: "36px", height: "36px", background: s.color, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "11px"}}>{s.score}%</div><div><div style={{fontWeight: 700, fontSize: "13px"}}>{s.name}</div><div style={{fontSize: "11px", color: "#22c55e"}}>{s.action} • {s.co2}</div></div></div>
                <div style={{fontSize: "10px", background: s.color, color: "white", padding: "4px 8px", borderRadius: "10px", height: "fit-content"}}>{s.sdg}</div>
              </div>
            ))}
          </div>
        )}

        {tab==="group" && (
          <div style={{background: "white", borderRadius: "20px", padding: "0", marginTop: "14px", border: "2px solid #2563eb", overflow: "hidden"}}>
            <div style={{padding: "16px", background: "#eff6ff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px"}}>
              <div><h3 style={{margin: 0}}>🔗 Official HTH Alumni Group</h3><p style={{margin: "4px 0 0", fontSize: "12px", color: "#666"}}>Source: alumnihotelschool.nl/topics • Connected to your tracking platform</p></div>
              <a href="https://www.alumnihotelschool.nl/topics" target="_blank" style={{background: "#2563eb", color: "white", padding: "8px 16px", borderRadius: "20px", textDecoration: "none", fontWeight: 700, fontSize: "12px"}}>Open Full Site ↗</a>
            </div>
            <div style={{padding: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px"}}>
              {[
                ["🏨 Hotelschool Alumni Topics", "Official topics from alumni", "View Topics", "https://www.alumnihotelschool.nl/topics"],
                ["👥 Connect Alumni", "Join official network", "Join Network", "https://www.alumnihotelschool.nl/"],
                ["📅 Events & Reunions", "HTH Alumni Events", "See Events", "https://www.alumnihotelschool.nl/topics"],
                ["💼 Career Hub", "Jobs & Career from Alumni", "Career Hub", "https://www.alumnihotelschool.nl/topics"],
              ].map((c,i)=>(
                <div key={i} style={{border: "1px solid #dbeafe", borderRadius: "12px", padding: "14px", background: "#f8faff"}}>
                  <div style={{fontWeight: 700, fontSize: "13px"}}>{c[0]}</div><div style={{fontSize: "11px", color: "#666", marginTop: "4px"}}>{c[1]}</div>
                  <a href={c[3]} target="_blank" style={{display: "inline-block", marginTop: "8px", background: "#2563eb", color: "white", padding: "6px 12px", borderRadius: "20px", fontSize: "11px", textDecoration: "none", fontWeight: 700}}>{c[2]} ↗</a>
                </div>
              ))}
            </div>
            <div style={{height: "600px", borderTop: "1px solid #eee"}}>
              <iframe src="https://www.alumnihotelschool.nl/topics" style={{width: "100%", height: "100%", border: "none"}} title="Official Alumni Group"></iframe>
            </div>
          </div>
        )}

        {selected && (
          <div style={{background: "white", borderRadius: "16px", padding: "16px", marginTop: "14px", border: "2px solid #ddd"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}><b>{selected.type==="alumni" ? "👥 Career Journey" : "🌱 Sustain"}: {selected.name}</b><button onClick={()=>setSelected(null)} style={{border: "none", background: "#eee", borderRadius: "12px", padding: "4px 10px", cursor: "pointer"}}>X</button></div>
            <div style={{marginTop: "8px", fontSize: "12px"}}>
              {selected.type==="alumni" ? <div style={{borderLeft: "2px solid black", paddingLeft: "10px"}}>{selected.trace?.map((t:string,i:number)=><div key={i}>📍 {i+1}. {t}</div>)}</div> : <div>{selected.action} • {selected.co2} • {selected.sdg}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
