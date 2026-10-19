"use client";
import { useState, useEffect } from "react";

type HistoryPoint = { date: string; val: number; label: string };
type KPI = {
  id: number; cat: string; catLabel: string; title: string;
  value: string; target: string; proof: string; trace: string;
  score: number; logs: string[]; description: string; history: HistoryPoint[];
};

const defaultData: KPI[] = [
  {id:1, cat:"water", catLabel:"💧 Water", title:"MADE BLUE x HTH", value:"12.300L", target:"-40%", proof:"Sensor 6L→3L", trace:"1L saved = 1L Mali", score:92, logs:["2026-10-01 - Sensor installed","2026-10-12 - 6L→3L verified"], description:"TRACK: Smart sensor measures flow. TRACE: 1L saved = 1L Mali donation.", history:[{date:"Oct 1", val:70, label:"70%"},{date:"Oct 8", val:85, label:"85%"},{date:"Oct 12", val:92, label:"92%"}]},
  {id:2, cat:"sense", catLabel:"🌿 SENSE", title:"Plant-forward Food", value:"82% local", target:"80% <250km", proof:"Invoice Westland", trace:"Seasonal, Ethical", score:95, logs:["Invoice WL-8821"], description:"TRACK: Invoice tracking. TRACE: Seasonal ethical.", history:[{date:"Sep", val:75},{date:"Oct", val:95} as any]},
  {id:3, cat:"green", catLabel:"🏢 Green Ops", title:"Green Key Gold", value:"105k kWh", target:"-30% Energy", proof:"Smart meter", trace:"Zero Waste", score:98, logs:["Smart meter 105k"], description:"Energy via smart meter.", history:[{date:"Sep", val:80},{date:"Oct", val:98} as any]},
  {id:4, cat:"bio", catLabel:"🐝 Biodiversity", title:"Beekeeping Roof-top", value:"2.5kg honey", target:"5 colonies", proof:"Logbook 2019", trace:"Eden Garden", score:88, logs:["2.5kg harvested"], description:"Logbook tracking.", history:[{date:"Sep", val:60},{date:"Oct", val:88} as any]},
  {id:5, cat:"material", catLabel:"♻️ Material", title:"Canal Catch Program", value:"45kg plastic", target:"120kg/year", proof:"Dock scale + Photo log", trace:"1kg = 5 products", score:68, logs:["Oct 12 - 5kg weighed"], description:"TRACK: Dock scale + photo. TRACE: 1kg=5 products.", history:[{date:"Oct 10", val:20, label:"10kg"},{date:"Oct 12", val:45, label:"45kg"},{date:"Oct 15", val:68, label:"68%"}]},
  {id:6, cat:"energy", catLabel:"🔥 Energy", title:"Distillery Heat Bank", value:"350 kWh", target:"5000 kWh/year", proof:"Heat meter at exchanger", trace:"1kWh = 0.2kg CO2", score:45, logs:["350 kWh recovered"], description:"Heat meter tracking.", history:[{date:"Oct 1", val:10},{date:"Oct 12", val:45} as any]},
];

// Simple Chart Components - No library needed!
function BarChart({ data }: { data: KPI[] }) {
  const max = 100;
  return (
    <div style={{display:"flex", alignItems:"flex-end", gap:8, height:120, padding:"0 10px"}}>
      {data.map(k => (
        <div key={k.id} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
          <div style={{fontSize:10, fontWeight:700}}>{k.score}%</div>
          <div style={{width:"100%", background:"#e5f5e9", borderRadius:"8px 8px 0 0", height:`${k.score}%`, maxHeight:90, minHeight:10, backgroundColor:k.score>=90?"#22c55e":k.score>=70?"#f59e0b":"#ef4444", transition:"all 0.5s"}}></div>
          <div style={{fontSize:8, textAlign:"center", lineHeight:1}}>{k.title.split(" ")[0]}</div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ history }: { history: HistoryPoint[] }) {
  if(!history || history.length<2) return <div style={{fontSize:12, color:"#999", textAlign:"center", padding:20}}>Add more logs to see chart progress 📈</div>;
  const maxVal = Math.max(...history.map(h=>h.val), 100);
  const minVal = 0;
  const W=320, H=120, P=20;
  const points = history.map((h,i)=>{
    const x = P + (i*(W-2*P))/(history.length-1);
    const y = H - P - ((h.val-minVal)/(maxVal-minVal))*(H-2*P);
    return {x,y,h};
  });
  const pathD = points.map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  return (
    <div style={{background:"white", borderRadius:12, padding:10, border:"1px solid #eef2ee"}}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
        <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="#e5e7eb" strokeWidth={1}/>
        <line x1={P} y1={P} x2={P} y2={H-P} stroke="#e5e7eb" strokeWidth={1}/>
        <path d={pathD} fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinejoin="round"/>
        {points.map((p,i)=>(
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4} fill="#22c55e" stroke="white" strokeWidth={2}/>
            <text x={p.x} y={p.y-10} fontSize={9} textAnchor="middle" fill="#166534" fontWeight={700}>{p.h.val}%</text>
            <text x={p.x} y={H-2} fontSize={8} textAnchor="middle" fill="#6b7280">{p.h.date}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function Page() {
  const [data, setData] = useState<KPI[]>([]);
  const [selected, setSelected] = useState<KPI | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<any>({cat:"water", title:"", value:"", target:"", proof:"", trace:"", score:0, description:""});
  const [newLog, setNewLog] = useState(""); const [newLogVal, setNewLogVal] = useState("");

  useEffect(()=>{const s=localStorage.getItem("hth_kpi_v3"); setData(s?JSON.parse(s):defaultData)},[]);
  useEffect(()=>{if(data.length) localStorage.setItem("hth_kpi_v3", JSON.stringify(data))},[data]);

  const saveKPI=()=>{
    const kpi:KPI={id:Date.now(), cat:form.cat, catLabel:form.cat, title:form.title||"Untitled", value:form.value, target:form.target, proof:form.proof, trace:form.trace, score:Number(form.score)||0, logs:[], description:form.description||`TRACK: ${form.proof}. TRACE: ${form.trace}`, history:[{date:new Date().toLocaleDateString().slice(0,5), val:Number(form.score)||0, label:`${form.score}%`} ]};
    setData([...data,kpi]); setShowAdd(false);
  };
  const addLog=()=>{
    if(!selected||!newLog) return;
    const val = Number(newLogVal)||selected.score;
    const hist = {date:new Date().toLocaleDateString().slice(0,5), val, label:newLog};
    const updated = data.map(d=>d.id===selected.id?{...d, logs:[...d.logs, `${new Date().toLocaleDateString()} - ${newLog} (${val}%)`], history:[...d.history, hist], score:val, value:`${val}% / ${d.value}`}:d);
    setData(updated);
    const sel = updated.find(d=>d.id===selected.id)!; setSelected(sel); setNewLog(""); setNewLogVal("");
  };
  const catColor:any={water:"#0ea5e9", sense:"#22c55e", green:"#16a34a", bio:"#eab308", energy:"#f97316", material:"#3b82f6"};

  return (
    <div style={{background:"#f8faf6", minHeight:"100vh", padding:16, fontFamily:"Inter, sans-serif"}}>
      <div style={{maxWidth:900, margin:"0 auto"}}>
        <div style={{background:"white", border:"2px solid #22c55e", borderRadius:20, padding:24, textAlign:"center"}}>
          <h1 style={{fontSize:22, fontWeight:900}}>HTH DEMO - Green Key Gold 🌱</h1>
          <p style={{fontSize:13, color:"#6b7c6b"}}>Click any card to see Chart + Track & Trace</p>
          <div style={{marginTop:16, background:"#f9fafb", borderRadius:14, padding:14}}>
            <div style={{fontSize:12, fontWeight:800, textAlign:"left", marginBottom:8}}>📊 OVERALL PROGRESS CHART</div>
            <BarChart data={data}/>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:"#6b7280", marginTop:8}}><span>Total KPIs: {data.length}</span><span>Avg Score: {Math.round(data.reduce((a,b)=>a+b.score,0)/data.length||0)}%</span></div>
          </div>
        </div>

        <div style={{marginTop:16}}>
          {data.map(k=>(
            <div key={k.id} onClick={()=>setSelected(k)} style={{background:"white", borderRadius:16, padding:18, marginBottom:12, cursor:"pointer", borderLeft:`5px solid ${catColor[k.cat]}`, boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><div><div style={{fontSize:11, fontWeight:800, color:catColor[k.cat]}}>{k.catLabel}</div><div style={{fontWeight:800, fontSize:15}}>{k.title}</div></div><div style={{background:k.score>=90?"#22c55e":k.score>=70?"#f59e0b":"#ef4444", color:"white", padding:"4px 10px", borderRadius:999, fontSize:12, fontWeight:800, height:24}}>{k.score}%</div></div>
              <div style={{fontSize:12, marginTop:6}}><b>Value:</b> {k.value} <b style={{marginLeft:10}}>Target:</b> {k.target}</div>
              <div style={{background:"#f0fdf4", borderRadius:10, padding:"8px 12px", marginTop:8, fontSize:12}}><b>Proof:</b> {k.proof} | <b>Trace:</b> {k.trace}</div>
              <div style={{fontSize:11, color:"#22c55e", marginTop:6, fontWeight:600}}>📈 Click to see Chart + Track & Trace + Add log →</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setShowAdd(true)} style={{width:"100%", padding:14, background:"#111827", color:"white", border:"none", borderRadius:14, fontWeight:700, cursor:"pointer", marginTop:10}}>+ Add New KPI</button>
      </div>

      {selected && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:16}} onClick={()=>setSelected(null)}>
          <div style={{background:"white", borderRadius:20, padding:20, maxWidth:520, width:"100%", maxHeight:"90vh", overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex", justifyContent:"space-between"}}><h3 style={{fontWeight:800}}>{selected.title}</h3><button onClick={()=>setSelected(null)} style={{border:"none", background:"#f3f4f6", borderRadius:8, padding:"4px 8px"}}>✕</button></div>
            
            <div style={{marginTop:12}}><div style={{fontSize:11, fontWeight:800, color:"#16a34a"}}>📈 PROGRESS CHART - Track Over Time</div><div style={{marginTop:8}}><LineChart history={selected.history}/></div></div>

            <div style={{marginTop:14, background:"#f9fafb", borderRadius:12, padding:12}}>
              <div style={{fontSize:12, fontWeight:700}}>HOW TO TRACK & TRACE</div>
              <div style={{fontSize:13, marginTop:6, lineHeight:1.5}}>{selected.description}</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10}}>
                <div style={{background:"#ecfdf5", padding:10, borderRadius:10, fontSize:12}}><b>🔍 TRACK</b><br/>{selected.proof}</div>
                <div style={{background:"#eff6ff", padding:10, borderRadius:10, fontSize:12}}><b>🔗 TRACE</b><br/>{selected.trace}</div>
              </div>
            </div>

            <div style={{marginTop:14}}>
              <div style={{fontWeight:700, fontSize:13}}>📝 Proof Logs + Chart Data</div>
              <div style={{maxHeight:100, overflowY:"auto", marginTop:6}}>{selected.logs.map((l,i)=><div key={i} style={{fontSize:12, padding:"4px 0", borderBottom:"1px solid #f3f4f6"}}>• {l}</div>)}</div>
              <div style={{display:"flex", gap:6, marginTop:10, flexWrap:"wrap"}}>
                <input value={newLog} onChange={e=>setNewLog(e.target.value)} placeholder="Log: 13 Oct - 7kg weighed" style={{flex:2, minWidth:140, padding:10, border:"1px solid #d1d5db", borderRadius:10, fontSize:12}}/>
                <input value={newLogVal} onChange={e=>setNewLogVal(e.target.value)} type="number" placeholder="Score % e.g. 75" style={{flex:1, minWidth:70, padding:10, border:"1px solid #d1d5db", borderRadius:10, fontSize:12}}/>
                <button onClick={addLog} style={{padding:"10px 14px", background:"#22c55e", color:"white", border:"none", borderRadius:10, fontWeight:700}}>Add & Update Chart</button>
              </div>
              <div style={{fontSize:11, color:"#6b7280", marginTop:6}}>Tip: Input log + score baru → chart line bakal naik otomatis 📈</div>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:60, padding:16}}>
          <div style={{background:"white", borderRadius:20, padding:20, maxWidth:480, width:"100%"}}>
            <h3 style={{fontWeight:800}}>Add New KPI + Chart</h3>
            <div style={{display:"flex", flexDirection:"column", gap:8, marginTop:12}}>
              <select value={form.cat} onChange={e=>setForm({...form, cat:e.target.value})} style={{padding:10, borderRadius:10, border:"1px solid #d1d5db"}}><option value="water">💧 Water</option><option value="material">♻️ Material - Canal</option><option value="energy">🔥 Energy - Heat Bank</option><option value="sense">🌿 Food</option><option value="green">🏢 Green Ops</option><option value="bio">🐝 Bio</option></select>
              <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" style={{padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/>
              <div style={{display:"flex", gap:8}}><input value={form.value} onChange={e=>setForm({...form, value:e.target.value})} placeholder="Value" style={{flex:1, padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/><input value={form.target} onChange={e=>setForm({...form, target:e.target.value})} placeholder="Target" style={{flex:1, padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/></div>
              <input value={form.proof} onChange={e=>setForm({...form, proof:e.target.value})} placeholder="Proof - Track method" style={{padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/>
              <input value={form.trace} onChange={e=>setForm({...form, trace:e.target.value})} placeholder="Trace - Impact destination" style={{padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/>
              <input value={form.score} onChange={e=>setForm({...form, score:e.target.value})} type="number" placeholder="Initial score %" style={{padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/>
              <button onClick={saveKPI} style={{padding:12, background:"#22c55e", color:"white", border:"none", borderRadius:12, fontWeight:700}}>Save KPI with Chart</button>
              <button onClick={()=>setShowAdd(false)} style={{padding:10, background:"#f3f4f6", border:"none", borderRadius:12}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
