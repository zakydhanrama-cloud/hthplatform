"use client";
import { useState } from 'react';

const alumniTracking = [
  { id: 1, name: "Paul Geraeds", year: "1986", flag: "🇳🇱→🇩🇪", location: "Amsterdam → Frankfurt", current: "Vice-Chairman NBTC", project: "Netherlands Tourism", trace: ["1986: Lulus HTH", "Chief Steward Frankfurt", "Vice-Chairman NBTC"] },
  { id: 2, name: "Roberto Payer", year: "Senior Hicon", flag: "🇳🇱", location: "Amsterdam", current: "Hilton Waldorf", project: "Hilton Legacy", trace: ["Hilton Worldwide", "Waldorf Astoria", "Senior Hicon Award"] },
  { id: 3, name: "Jozien & Laurie", year: "Junior Hicon", flag: "🇳🇱", location: "Amsterdam", current: "Vini Mini Founders", project: "Kids Allergy-free", trace: ["Founded Vini Mini", "1000 days healthy", "Junior Hicon"] },
  { id: 4, name: "Pieter Olierook", year: "Alumni Hicon", flag: "🇳🇱→🇧🇪", location: "Benelux", current: "Unilever Ice Cream", project: "Ice Cream Divestment", trace: ["Digital Commerce Expert", "Unilever Growth", "Alumni Hicon"] },
  { id: 5, name: "Zaky Dhanrama", year: "2025", flag: "🇳🇱", location: "Amsterdam", current: "Platform Founder", project: "HTH Platform", trace: ["Build Platform", "Vercel Live", "Amsterdam Hub"] },
];

const sustainabilityData = [
  { id: 1, name: "Paul Geraeds - Sustainable Tourism", sdg: "SDG 8, 12", score: 85, action: "Sustainable Tourism Strategy NL", impact: "National Tourism Green Policy", co2: "-15% CO2 Tourism", color: "#A21942" },
  { id: 2, name: "Roberto Payer - Zero Waste Hotels", sdg: "SDG 12, 13", score: 92, action: "Zero Waste Hotel Amsterdam", impact: "Hilton Energy -30%", co2: "-30% Energy", color: "#FD6925" },
  { id: 3, name: "Vini Mini - Organic Food", sdg: "SDG 3, 12", score: 95, action: "Organic + Zero Plastic", impact: "100% Organic Sourcing", co2: "Zero Plastic", color: "#4C9F38" },
  { id: 4, name: "Pieter Olierook - Carbon Neutral", sdg: "SDG 9, 12", score: 88, action: "Sustainable Cold Chain", impact: "Carbon Neutral Logistics", co2: "Carbon Neutral", color: "#FD6925" },
  { id: 5, name: "HTH Platform - Digital Green", sdg: "SDG 4, 13, 17", score: 100, action: "Digital Sustainability Tracking", impact: "Paperless Tracking System", co2: "100% Digital", color: "#3F7E44" },
];

export default function Page() {
  const [tab, setTab] = useState<"alumni" | "sustain">("alumni");
  const [selected, setSelected] = useState<any>(null);

  return (
    <div style={{background: tab === "alumni" ? "#f6f7f8" : "#f0fdf4", minHeight: "100vh", padding: "20px", fontFamily: "system-ui", transition: "0.3s"}}>
      <div style={{maxWidth: "1150px", margin: "0 auto"}}>
        
        <div style={{background: "white", borderRadius: "20px", padding: "24px", border: tab === "alumni" ? "1px solid #eee" : "2px solid #22c55e", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px"}}>
          <div>
            <h1 style={{fontSize: "26px", fontWeight: 900, margin: 0}}>HTH Dual Entity Platform</h1>
            <p style={{color: "#666", margin: "6px 0 0", fontSize: "13px"}}>Entitas 1: Alumni Tracking • Entitas 2: Sustainability Tracking • Amsterdam Live</p>
          </div>
          <div style={{display: "flex", gap: "8px"}}>
            <button onClick={()=>{setTab("alumni"); setSelected(null)}} style={{background: tab==="alumni" ? "black" : "#eee", color: tab==="alumni" ? "white" : "black", border: "none", padding: "10px 18px", borderRadius: "20px", fontWeight: 700, cursor: "pointer"}}>👥 Alumni Tracking</button>
            <button onClick={()=>{setTab("sustain"); setSelected(null)}} style={{background: tab==="sustain" ? "#22c55e" : "#eee", color: tab==="sustain" ? "white" : "black", border: "none", padding: "10px 18px", borderRadius: "20px", fontWeight: 700, cursor: "pointer"}}>🌱 Sustainability</button>
          </div>
        </div>

        {tab === "alumni" ? (
          <>
            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "16px"}}>
              {[
                ["Total Alumni Tracked", "5", "100% Real"], ["Countries Tracked", "3", "NL-DE-BE"], ["Projects Tracked", "5", "Active"],
              ].map((k,i)=>(
                <div key={i} style={{background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #eee"}}>
                  <div style={{fontSize: "10px", color: "#999"}}>{k[0]}</div><div style={{fontSize: "22px", fontWeight: 800, marginTop: "4px"}}>{k[1]}</div><div style={{fontSize: "11px", color: "#00a651", fontWeight: 600}}>{k[2]}</div>
                </div>
              ))}
            </div>
            <div style={{background: "white", borderRadius: "20px", padding: "24px", marginTop: "16px", border: "1px solid #eee"}}>
              <h2 style={{margin: "0 0 16px", fontWeight: 800}}>👥 ENTITAS 1: Alumni Tracking System</h2>
              <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                {alumniTracking.map(a=>(
                  <div key={a.id} onClick={()=>setSelected(a)} style={{border: "1px solid #eee", borderRadius: "14px", padding: "14px", display: "flex", justifyContent: "space-between", cursor: "pointer", background: selected?.id===a.id ? "#f0f9ff" : "white"}}>
                    <div><div style={{fontWeight: 700}}>{a.name} <span style={{fontSize: "10px", background: "#eee", padding: "2px 6px", borderRadius: "10px"}}>{a.year}</span></div><div style={{fontSize: "12px", color: "#666"}}>{a.flag} {a.location} • {a.current}</div></div>
                    <div style={{fontSize: "11px", background: "black", color: "white", padding: "4px 10px", borderRadius: "12px", height: "fit-content"}}>{a.project}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "16px"}}>
              {[
                ["Avg Green Score", "92%", "♻️ High"], ["Zero Waste Projects", "2", "Active"], ["Carbon Saved", "-45% Avg", "Impact"],
              ].map((k,i)=>(
                <div key={i} style={{background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #bbf7d0"}}>
                  <div style={{fontSize: "10px", color: "#999"}}>{k[0]}</div><div style={{fontSize: "22px", fontWeight: 800, marginTop: "4px", color: "#166534"}}>{k[1]}</div><div style={{fontSize: "11px", color: "#22c55e", fontWeight: 600}}>{k[2]}</div>
                </div>
              ))}
            </div>
            <div style={{background: "white", borderRadius: "20px", padding: "24px", marginTop: "16px", border: "1px solid #bbf7d0"}}>
              <h2 style={{margin: "0 0 16px", fontWeight: 800}}>🌱 ENTITAS 2: Sustainability Tracking System</h2>
              <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                {sustainabilityData.map(a=>(
                  <div key={a.id} onClick={()=>setSelected(a)} style={{border: "1px solid #dcfce7", borderRadius: "14px", padding: "14px", display: "flex", justifyContent: "space-between", cursor: "pointer", background: selected?.id===a.id ? "#f0fdf4" : "white"}}>
                    <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
                      <div style={{width: "40px", height: "40px", background: a.color, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "12px"}}>{a.score}%</div>
                      <div><div style={{fontWeight: 700}}>{a.name}</div><div style={{fontSize: "12px", color: "#22c55e"}}>{a.action} • {a.co2}</div></div>
                    </div>
                    <div style={{fontSize: "11px", background: a.color, color: "white", padding: "4px 10px", borderRadius: "12px", height: "fit-content"}}>{a.sdg}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selected && (
          <div style={{background: "white", borderRadius: "20px", padding: "20px", marginTop: "16px", border: tab==="alumni" ? "2px solid black" : "2px solid #22c55e"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}><h3 style={{margin: 0}}>Detail: {selected.name}</h3><button onClick={()=>setSelected(null)} style={{background: "#eee", border: "none", borderRadius: "20px", padding: "6px 12px", cursor: "pointer"}}>Close</button></div>
            <div style={{marginTop: "12px", fontSize: "13px"}}>
              {tab === "alumni" ? <><div><b>Trace Journey:</b> {selected.trace?.join(" → ")}</div><div style={{marginTop: "6px"}}><b>Project:</b> {selected.project}</div></> : <><div><b>Sustainable Action:</b> {selected.action}</div><div style={{marginTop: "6px"}}><b>Impact:</b> {selected.impact} • <b>{selected.co2}</b></div><div style={{marginTop: "8px", background: "#22c55e", color: "white", padding: "8px", borderRadius: "10px", display: "inline-block"}}>Green Score: {selected.score}% • {selected.sdg}</div></>}
            </div>
          </div>
        )}

        <div style={{textAlign: "center", marginTop: "16px", color: "#999", fontSize: "11px"}}>V5.0 Dual Entity • Alumni Tracking ≠ Sustainability Tracking • 2 Entitas Terpisah • Amsterdam Live</div>
      </div>
    </div>
  );
}
