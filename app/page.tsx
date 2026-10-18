"use client";
import { useState } from 'react';

const alumniData = [
  {
    id: 1, name: "Paul Geraeds", year: "1986", flag: "🇳🇱→🇩🇪",
    current: "Vice-Chairman NBTC", location: "Amsterdam → Frankfurt",
    project: "Sustainable Netherlands Tourism", sdg: "SDG 8, 12", sdgColor: "#A21942",
    sustainability: "Promotes sustainable tourism Netherlands", greenScore: 85,
    trace: ["1986: Lulus HTH", "Sustainable Tourism Board", "Green Destinations NL"],
    sustainableAction: "♻️ Sustainable Tourism Strategy NL"
  },
  {
    id: 2, name: "Roberto Payer", year: "Senior Hicon", flag: "🇳🇱",
    current: "Hilton - Waldorf Astoria", location: "Amsterdam",
    project: "Green Hotels - Zero Waste", sdg: "SDG 12, 13", sdgColor: "#FD6925",
    sustainability: "Zero waste hotels, energy efficient", greenScore: 92,
    trace: ["Hilton Green Program", "Waldorf Sustainability", "Energy -30%"],
    sustainableAction: "🌱 Zero Waste Hotel Amsterdam"
  },
  {
    id: 3, name: "Jozien & Laurie - Vini Mini", year: "Junior Hicon", flag: "🇳🇱",
    current: "Co-founders Vini Mini", location: "Amsterdam",
    project: "Healthy & Sustainable Kids Food", sdg: "SDG 3, 12", sdgColor: "#4C9F38",
    sustainability: "Organic, allergy-free, zero plastic", greenScore: 95,
    trace: ["Organic sourcing", "No plastic packaging", "1000 days healthy"],
    sustainableAction: "🌍 Organic + Zero Plastic Packaging"
  },
  {
    id: 4, name: "Pieter Olierook", year: "Alumni Hicon", flag: "🇳🇱",
    current: "Unilever Ice Cream Benelux", location: "Benelux",
    project: "Sustainable Cold Chain", sdg: "SDG 9, 12", sdgColor: "#FD6925",
    sustainability: "Sustainable ice cream supply chain", greenScore: 88,
    trace: ["Sustainable sourcing", "Carbon neutral logistics", "Talent for green"],
    sustainableAction: "❄️ Sustainable Cold Chain - Carbon Neutral"
  },
  {
    id: 5, name: "Zaky Dhanrama - YOU", year: "2025", flag: "🇳🇱",
    current: "Founder HTH Sustainability Platform", location: "Amsterdam",
    project: "100% Trace + Sustainability Dashboard", sdg: "SDG 4, 12, 13, 17", sdgColor: "#3F7E44",
    sustainability: "Digital platform for green hospitality", greenScore: 100,
    trace: ["Build green platform", "Track sustainable alumni", "SDG 17 Partnership"],
    sustainableAction: "💻 Digital Sustainability Tracking Platform"
  },
];

export default function Page() {
  const [selected, setSelected] = useState<any>(null);
  const avgGreen = Math.round(alumniData.reduce((a,b)=>a+b.greenScore,0)/alumniData.length);

  return (
    <div style={{background: "#f0fdf4", minHeight: "100vh", padding: "20px", fontFamily: "system-ui"}}>
      <div style={{maxWidth: "1150px", margin: "0 auto"}}>
        
        <div style={{background: "white", borderRadius: "20px", padding: "24px 28px", display: "flex", justifyContent: "space-between", border: "2px solid #22c55e"}}>
          <div>
            <h1 style={{fontSize: "28px", fontWeight: 900, margin: 0}}>HTH - Sustainability Trace 🌱</h1>
            <p style={{color: "#666", margin: "6px 0 0", fontSize: "14px"}}>♻️ Green Score • 🌍 SDG Impact • 📍 Trace • Sustainable Hospitality</p>
          </div>
          <div style={{background: "#22c55e", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, height: "fit-content"}}>V4.0 GREEN</div>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px", marginTop: "16px"}}>
          {[
            ["Avg Green Score", `${avgGreen}%`, "♻️ Sustainable"], ["Zero Waste", "2 Projects", "Hilton & Vini"], 
            ["Organic", "1 Project", "Vini Mini"], ["Carbon Neutral", "2 Projects", "Unilever"], 
            ["SDGs Covered", "5 SDGs", "3,4,8,9,12,13"], ["Total Green", "5 Alumni", "100% Tracked"],
          ].map((k,i)=>(
            <div key={i} style={{background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #bbf7d0"}}>
              <div style={{fontSize: "10px", color: "#999", textTransform: "uppercase"}}>{k[0]}</div>
              <div style={{fontSize: "20px", fontWeight: 800, marginTop: "4px"}}>{k[1]}</div>
              <div style={{fontSize: "11px", color: "#22c55e", fontWeight: 600, marginTop: "2px"}}>{k[2]}</div>
            </div>
          ))}
        </div>

        <div style={{background: "white", borderRadius: "20px", padding: "24px", marginTop: "16px", border: "1px solid #bbf7d0"}}>
          <h2 style={{margin: "0 0 16px", fontWeight: 800}}>🌱 Sustainability Tracking - All Alumni</h2>
          <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
            {alumniData.map(a=>(
              <div key={a.id} onClick={()=>setSelected(a)} style={{border: "1px solid #dcfce7", borderRadius: "16px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: selected?.id===a.id ? "#f0fdf4" : "white"}}>
                <div style={{display: "flex", gap: "16px", alignItems: "center", flex: 1}}>
                  <div style={{width: "44px", height: "44px", background: a.sdgColor, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800}}>{a.greenScore}%</div>
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 700}}>{a.name} <span style={{fontSize: "11px", background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: "10px", marginLeft: "6px"}}>{a.sdg}</span></div>
                    <div style={{fontSize: "13px", color: "#666", marginTop: "2px"}}>{a.flag} {a.sustainableAction}</div>
                    <div style={{marginTop: "6px", background: "#f0fdf4", borderRadius: "10px", height: "6px", width: "200px"}}><div style={{background: "#22c55e", height: "6px", borderRadius: "10px", width: `${a.greenScore}%`}}></div></div>
                  </div>
                </div>
                <div style={{textAlign: "right"}}>
                  <div style={{fontSize: "12px", color: "#999"}}>Green Score</div>
                  <div style={{fontWeight: 800, color: "#22c55e"}}>{a.greenScore}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{background: "white", borderRadius: "20px", padding: "24px", marginTop: "16px", border: "2px solid #22c55e"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h3 style={{margin: 0}}>🌱 SUSTAINABILITY TRACE: {selected.name}</h3>
              <button onClick={()=>setSelected(null)} style={{background: "#dcfce7", border: "none", borderRadius: "20px", padding: "6px 12px", cursor: "pointer"}}>Close X</button>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "16px"}}>
              <div>
                <div style={{fontSize: "12px", color: "#999"}}>GREEN PROJECT</div>
                <div style={{fontWeight: 600, marginTop: "4px"}}>{selected.project}</div>
                <div style={{fontSize: "12px", color: "#999", marginTop: "12px"}}>SUSTAINABLE ACTION</div>
                <div style={{fontWeight: 600, marginTop: "4px", color: "#22c55e"}}>{selected.sustainableAction}</div>
                <div style={{fontSize: "12px", color: "#999", marginTop: "12px"}}>SUSTAINABILITY DETAIL</div>
                <div style={{fontSize: "13px", marginTop: "4px"}}>{selected.sustainability}</div>
              </div>
              <div>
                <div style={{fontSize: "12px", color: "#999"}}>TRACE + GREEN JOURNEY</div>
                <div style={{marginTop: "8px", borderLeft: "2px solid #22c55e", paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "6px"}}>
                  {selected.trace.map((t:string,i:number)=><div key={i} style={{fontSize: "13px"}}>🌱 {t}</div>)}
                </div>
                <div style={{marginTop: "12px", background: "#22c55e", color: "white", padding: "10px", borderRadius: "12px", fontSize: "13px", fontWeight: 700}}>Green Score: {selected.greenScore}% • {selected.sdg}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{background: "#166534", color: "white", borderRadius: "20px", padding: "20px", marginTop: "16px", textAlign: "center"}}>
          <div style={{fontWeight: 800, fontSize: "16px"}}>🌍 HTH Sustainability Vision</div>
          <div style={{fontSize: "13px", marginTop: "6px", opacity: 0.9}}>100% Alumni Tracked • Avg Green Score {avgGreen}% • Zero Waste • Carbon Neutral • SDG 12 & 13 • Amsterdam Live</div>
        </div>
      </div>
    </div>
  );
}
