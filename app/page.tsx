"use client";
import { useState } from 'react';

const data = [
  { nama: "Budi Test", lokasi: "Amsterdam", flag: "🇳🇱", project: "Solar Panel", sdg: "SDG 7", color: "#FCC30B" },
  { nama: "HTH Alumni", lokasi: "Jakarta", flag: "🇮🇩", project: "Pendidikan", sdg: "SDG 4", color: "#C5192D" },
  { nama: "Siti A.", lokasi: "Amsterdam", flag: "🇳🇱", project: "Circular Economy", sdg: "SDG 12", color: "#BF8B2E" },
  { nama: "Zaky Dhanrama", lokasi: "Amsterdam", flag: "🇳🇱", project: "HTH Platform", sdg: "SDG 9", color: "#FD6925" },
];

const kpis = [
  ["Total Alumni", "124", "100% Tracked"], ["Amsterdam", "18", "Eropa Hub"], ["Jakarta", "89", "Indonesia Hub"],
  ["Active Project", "42", "On-going"], ["SDG 4", "35", "Education"], ["SDG 7", "22", "Clean Energy"],
  ["Employment", "92%", "After HTH"], ["Impact Score", "87%", "Sustainability"], ["Partners", "24", "Org"],
  ["Countries", "8", "Covered"], ["SDGs", "17", "All Covered"], ["Growth", "+18%", "This Year"],
];

export default function Page() {
  const [q, setQ] = useState("");
  const filtered = data.filter(d => d.nama.toLowerCase().includes(q.toLowerCase()));
  
  return (
    <div style={{background: "#f6f7f8", minHeight: "100vh", padding: "24px", fontFamily: "Inter, sans-serif"}}>
      <div style={{maxWidth: "1100px", margin: "0 auto"}}>
        
        <div style={{background: "white", borderRadius: "20px", padding: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #eee"}}>
          <div>
            <h1 style={{fontSize: "28px", fontWeight: 900, margin: 0}}>HTH - 100% Track & Trace</h1>
            <p style={{color: "#666", margin: "6px 0 0"}}>Pendidikan • Lingkungan • SDGs • LIVE • Amsterdam</p>
          </div>
          <div style={{background: "black", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: 700}}>V2.1 PRO</div>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px", marginTop: "20px"}}>
          {kpis.map((k,i) => (
            <div key={i} style={{background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #eee"}}>
              <div style={{fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px"}}>{k[0]}</div>
              <div style={{fontSize: "24px", fontWeight: 800, marginTop: "6px"}}>{k[1]}</div>
              <div style={{fontSize: "12px", color: "#00a651", marginTop: "4px", fontWeight: 600}}>{k[2]}</div>
            </div>
          ))}
        </div>

        <div style={{background: "white", borderRadius: "20px", padding: "24px", marginTop: "20px", border: "1px solid #eee", boxShadow: "0 1px 3px rgba(0,0,0,0.05)"}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
            <h2 style={{margin: 0, fontSize: "18px", fontWeight: 800}}>Alumni Full Trace</h2>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search alumni..." style={{border: "1px solid #ddd", borderRadius: "20px", padding: "8px 14px", fontSize: "13px", outline: "none"}} />
          </div>

          <div style={{overflowX: "auto"}}>
            <table style={{width: "100%", borderCollapse: "collapse"}}>
              <thead><tr style={{textAlign: "left", fontSize: "11px", color: "#aaa", borderBottom: "1px solid #eee"}}><th style={{paddingBottom: "12px"}}>NAMA</th><th>LOKASI</th><th>PROJECT</th><th>SDG</th></tr></thead>
              <tbody>
                {filtered.map((a,i) => (
                  <tr key={i} style={{borderBottom: "1px solid #f2f2f2"}}>
                    <td style={{padding: "16px 0", fontWeight: 600}}>{a.nama}</td>
                    <td>{a.flag} {a.lokasi}</td>
                    <td>{a.project}</td>
                    <td><span style={{background: a.color, color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700}}>{a.sdg}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginTop: "20px", background: "#e6f9ec", color: "#00a651", padding: "10px 16px", borderRadius: "12px", fontSize: "13px", fontWeight: 700}}>✅ UI Fixed! Langkah 2 Berhasil - Dashboard PRO!</div>
        </div>
      </div>
    </div>
  );
}
