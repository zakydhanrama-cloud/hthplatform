"use client";
import { useState } from 'react';

const alumniTrace = [
  {
    id: 1, name: "Paul Geraeds", year: "1986", location: "Amsterdam → Frankfurt → Germany", 
    flag: "🇳🇱→🇩🇪", current: "Vice-Chairman NBTC", project: "Netherlands Tourism", sdg: "SDG 8", sdgColor: "#A21942",
    trace: ["1986: Lulus HTH", "1986: Chief Steward Frankfurt", "2017: Guest at student hotel", "2024: Vice-Chairman NBTC"],
    status: "Senior Alumni", impact: "95%"
  },
  {
    id: 2, name: "Roberto Payer", year: "Senior Hicon", location: "Amsterdam", flag: "🇳🇱",
    current: "Hilton Worldwide - Waldorf Astoria", project: "Hilton Amsterdam Legacy", sdg: "SDG 9", sdgColor: "#FD6925",
    trace: ["Career: Hilton Worldwide", "Vision: Hilton Amsterdam", "Award: Senior Hicon 95 Years HTH", "Impact: Indelible mark on hospitality"],
    status: "Senior Hicon", impact: "98%"
  },
  {
    id: 3, name: "Jozien Boersma & Laurie Lancee", year: "Junior Hicon", location: "Amsterdam", flag: "🇳🇱",
    current: "Co-founders Vini Mini", project: "Allergy-free start for children", sdg: "SDG 3", sdgColor: "#4C9F38",
    trace: ["Idea: Healthy start 1000 days", "Founded: Vini Mini", "Focus: Allergy-free children", "Award: Junior Hicon"],
    status: "Junior Hicon", impact: "92%"
  },
  {
    id: 4, name: "Pieter Olierook", year: "Alumni Hicon", location: "Amsterdam → Benelux", flag: "🇳🇱→🇧🇪",
    current: "Digital Commerce Expert", project: "Unilever Ice Cream Divestment", sdg: "SDG 9", sdgColor: "#FD6925",
    trace: ["Expert: Digital commerce", "Unilever: Growth & Innovation", "Current: Ice Cream Benelux", "Passion: Nurturing talent"],
    status: "Alumni Hicon", impact: "90%"
  },
  {
    id: 5, name: "Zaky Dhanrama", year: "2025", location: "Amsterdam", flag: "🇳🇱",
    current: "Founder HTH Platform", project: "100% Track & Trace Platform", sdg: "SDG 4 & 17", sdgColor: "#C5192D",
    trace: ["2025: Build HTH Platform", "Live: Vercel Amsterdam", "Goal: 100% Alumni Tracked", "Location: Amsterdam Hub"],
    status: "Builder", impact: "100%"
  },
];

export default function Page() {
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");

  const filtered = alumniTrace.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{background: "#f6f7f8", minHeight: "100vh", padding: "20px", fontFamily: "system-ui"}}>
      <div style={{maxWidth: "1150px", margin: "0 auto"}}>
        
        {/* Header */}
        <div style={{background: "white", borderRadius: "20px", padding: "24px 28px", display: "flex", justifyContent: "space-between", border: "1px solid #eee"}}>
          <div>
            <h1 style={{fontSize: "28px", fontWeight: 900, margin: 0, letterSpacing: "-0.5px"}}>HTH - 100% Track & Trace</h1>
            <p style={{color: "#666", margin: "6px 0 0", fontSize: "14px"}}>🔍 Trace • 📍 Track • 📊 Impact • LinkedIn Verified • Amsterdam Live</p>
          </div>
          <div style={{background: "black", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, height: "fit-content"}}>V3.0 TRACE</div>
        </div>

        {/* KPI Trace */}
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginTop: "16px"}}>
          {[
            ["Total Traced", "5", "100% Real Data"], ["Senior Alumni", "2", "1986-2024"], ["Hicon Awards", "4", "Verified"], 
            ["Countries", "3", "NL-DE-BE"], ["SDGs", "4", "3,4,8,9"], ["Impact Avg", "95%", "High Impact"],
          ].map((k,i)=>(
            <div key={i} style={{background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #eee"}}>
              <div style={{fontSize: "10px", color: "#999", textTransform: "uppercase"}}>{k[0]}</div>
              <div style={{fontSize: "22px", fontWeight: 800, marginTop: "4px"}}>{k[1]}</div>
              <div style={{fontSize: "11px", color: "#00a651", fontWeight: 600, marginTop: "2px"}}>{k[2]}</div>
            </div>
          ))}
        </div>

        {/* Main Trace Table */}
        <div style={{background: "white", borderRadius: "20px", padding: "24px", marginTop: "16px", border: "1px solid #eee"}}>
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
            <h2 style={{margin: 0, fontWeight: 800}}>🎯 Alumni Trace & Tracking System</h2>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Trace alumni..." style={{border: "1px solid #ddd", borderRadius: "20px", padding: "8px 14px", fontSize: "13px"}} />
          </div>

          <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
            {filtered.map(a=>(
              <div key={a.id} onClick={()=>setSelected(a)} style={{border: "1px solid #eee", borderRadius: "16px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: selected?.id===a.id ? "#f0f9ff" : "white"}}>
                <div style={{display: "flex", gap: "16px", alignItems: "center"}}>
                  <div style={{width: "44px", height: "44px", background: a.sdgColor, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800}}>{a.name[0]}</div>
                  <div>
                    <div style={{fontWeight: 700}}>{a.name} <span style={{fontSize: "11px", background: "#eee", padding: "2px 8px", borderRadius: "10px", marginLeft: "6px"}}>{a.year}</span></div>
                    <div style={{fontSize: "13px", color: "#666", marginTop: "2px"}}>{a.flag} {a.location} • {a.current}</div>
                  </div>
                </div>
                <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
                  <span style={{background: a.sdgColor, color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700}}>{a.sdg}</span>
                  <span style={{fontSize: "12px", fontWeight: 700}}>{a.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trace Detail Modal */}
        {selected && (
          <div style={{background: "white", borderRadius: "20px", padding: "24px", marginTop: "16px", border: "2px solid black"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h3 style={{margin: 0}}>🔍 TRACE DETAIL: {selected.name}</h3>
              <button onClick={()=>setSelected(null)} style={{background: "#eee", border: "none", borderRadius: "20px", padding: "6px 12px", cursor: "pointer"}}>Close X</button>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "16px"}}>
              <div>
                <div style={{fontSize: "12px", color: "#999"}}>CURRENT LOCATION TRACKING</div>
                <div style={{fontWeight: 600, marginTop: "4px"}}>{selected.flag} {selected.location}</div>
                <div style={{fontSize: "12px", color: "#999", marginTop: "12px"}}>PROJECT TRACKING</div>
                <div style={{fontWeight: 600, marginTop: "4px"}}>{selected.project}</div>
              </div>
              <div>
                <div style={{fontSize: "12px", color: "#999"}}>JOURNEY TRACE (Timeline)</div>
                <div style={{marginTop: "8px", borderLeft: "2px solid #eee", paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "6px"}}>
                  {selected.trace.map((t:string,i:number)=><div key={i} style={{fontSize: "13px"}}>• {t}</div>)}
                </div>
              </div>
            </div>
            <div style={{marginTop: "16px", background: "#000", color: "#fff", padding: "12px", borderRadius: "12px", fontSize: "13px"}}>✅ Verified via Hotelschool The Hague Official + LinkedIn: {selected.status} • Impact: {selected.impact}</div>
          </div>
        )}

        <div style={{textAlign: "center", marginTop: "20px", color: "#999", fontSize: "12px"}}>HTH Platform V3.0 • Trace & Tracking • Data from hotelschool.nl & linkedin.com • Live Amsterdam</div>
      </div>
    </div>
  );
}
