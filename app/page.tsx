"use client"
import { useEffect, useState } from "react"

export default function Page() {
  const [data, setData] = useState<any[]>([])
  
  useEffect(() => {
    // Nanti konek ke Supabase kamu, sekarang dummy dulu biar jadi
    setData([
      { nama: "Budi Test", lokasi: "Amsterdam", project: "Solar Panel", sdg: 7 },
      { nama: "HTH Alumni", lokasi: "Jakarta", project: "Pendidikan", sdg: 4 },
    ])
  }, [])

  return (
    <div style={{padding:20, fontFamily:"sans-serif", background:"#fafafa", minHeight:"100vh"}}>
      <h1 style={{fontSize:28, fontWeight:"bold"}}>HTH - 100% Track & Trace</h1>
      <p style={{color:"#666"}}>Pendidikan • Lingkungan • SDGs - LIVE di Vercel!</p>
      
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginTop:20}}>
        <div style={{background:"white", padding:16, borderRadius:12, border:"1px solid #eee"}}><b>12</b> KPI Master</div>
        <div style={{background:"white", padding:16, borderRadius:12, border:"1px solid #eee"}}><b>{data.length}</b> Alumni Tracked</div>
        <div style={{background:"white", padding:16, borderRadius:12, border:"1px solid #eee"}}><b>17</b> SDGs Covered</div>
      </div>

      <div style={{background:"white", marginTop:20, padding:16, borderRadius:12, border:"1px solid #eee"}}>
        <h3>Alumni Full Trace</h3>
        <table style={{width:"100%", marginTop:10}}>
          <thead><tr style={{textAlign:"left", color:"#888"}}><th>Nama</th><th>Lokasi</th><th>Project</th><th>SDG</th></tr></thead>
          <tbody>
            {data.map((d,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"8px 0"}}>{d.nama}</td><td>{d.lokasi}</td><td>{d.project}</td><td>SDG {d.sdg}</td></tr>)}
          </tbody>
        </table>
      </div>
      <p style={{marginTop:20, color:"green"}}>✅ Jika ini muncul di Vercel, langkah 1 berhasil!</p>
    </div>
  )
}
