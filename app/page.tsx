"use client";
import { useState, useEffect } from "react";

type Status = "done" | "in_progress" | "stuck";
type HistoryPoint = { date: string; val: number; status: Status; note?: string };
type KPI = {
  id: number; cat: string; catLabel: string; title: string; value: string; target: string;
  proof: string; trace: string; score: number; logs: string[]; description: string;
  history: HistoryPoint[]; status: Status;
};

const defaultData: KPI[] = [
  {id:1, cat:"water", catLabel:"💧 Water", title:"MADE BLUE x HTH", value:"12.300L", target:"-40%", proof:"Sensor 6L→3L", trace:"1L = 1L Mali", score:92, status:"done", logs:["Oct 1 Sensor installed [in_progress]","Oct 12 verified 92% [done]"], description:"TRACK: Sensor flow. TRACE: Mali donation.", history:[{date:"Oct 1", val:30, status:"stuck", note:"Idea"},{date:"Oct 5", val:70, status:"in_progress", note:"Sensor installed"},{date:"Oct 12", val:92, status:"done", note:"Verified"}]},
  {id:5, cat:"material", catLabel:"♻️ Material", title:"Canal Catch Program", value:"45kg plastic", target:"120kg/year", proof:"Dock scale + Photo", trace:"1kg = 5 products", score:68, status:"in_progress", logs:["Oct 10 Started [stuck]","Oct 12 5kg weighed [in_progress]"], description:"TRACK: Dock scale + photo.", history:[{date:"Oct 10", val:10, status:"stuck", note:"No scale"},{date:"Oct 12", val:45, status:"in_progress", note:"5kg weighed"},{date:"Oct 15", val:68, status:"in_progress", note:"45kg total"}]},
  {id:6, cat:"energy", catLabel:"🔥 Energy", title:"Distillery Heat Bank", value:"350 kWh", target:"5000 kWh/year", proof:"Heat meter", trace:"1kWh = 0.2kg CO2", score:45, status:"stuck", logs:["Oct 1 Permit delayed [stuck]"], description:"TRACK: Heat meter. STUCK due permit.", history:[{date:"Oct 1", val:10, status:"stuck", note:"Permit delayed"},{date:"Oct 12", val:45, status:"stuck", note:"350kWh only"}]},
  {id:2, cat:"sense", catLabel:"🌿 SENSE", title:"Plant-forward Food", value:"82% local", target:"80% <250km", proof:"Invoice Westland", trace:"Seasonal, Ethical", score:95, status:"done", logs:["Invoice verified [done]"], description:"Invoice tracking.", history:[{date:"Sep", val:78, status:"in_progress"},{date:"Oct", val:95, status:"done"}]},
  {id:3, cat:"green", catLabel:"🏢 Green Ops", title:"Green Key Gold", value:"105k kWh", target:"-30% Energy", proof:"Smart meter", trace:"Zero Waste", score:98, status:"done", logs:["Smart meter [done]"], description:"Smart meter energy.", history:[{date:"Sep", val:80, status:"in_progress"},{date:"Oct", val:98, status:"done"}]},
  {id:4, cat:"bio", catLabel:"🐝 Biodiversity", title:"Beekeeping Roof-top", value:"2.5kg honey", target:"5 colonies", proof:"Logbook", trace:"Eden Garden", score:88, status:"in_progress", logs:["2.5kg harvested [in_progress]"], description:"Logbook tracking.", history:[{date:"Sep", val:60, status:"in_progress"},{date:"Oct", val:88, status:"in_progress"}]},
];

function LineChart({history}:{history:HistoryPoint[]}) {
  const W=320,H=110,P=20,max=100;
  const pts=history.map((h,i)=>({x:P+i*(W-2*P)/Math.max(1,history.length-1), y:H-P-(h.val/max)*(H-2*P), h}));
  const d=pts.map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  return (<svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{background:"white", borderRadius:12, border:"1px solid #eee"}}><path d={d} fill="none" stroke="#22c55e" strokeWidth={2.5}/>{pts.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r={6} fill={p.h.status==="done"?"#22c55e":p.h.status==="in_progress"?"#f59e0b":"#ef4444"} stroke="white" strokeWidth={2}/><text x={p.x} y={p.y-12} fontSize={9} fontWeight={800} textAnchor="middle">{p.h.val}%</text><text x={p.x} y={H-2} fontSize={8} fill="#888" textAnchor="middle">{p.h.date}</text></g>)}</svg>);
}
function Timeline({history}:{history:HistoryPoint[]}) {
  return (
    <div style={{position:"relative", paddingLeft:24, marginTop:8}}>
      <div style={{position:"absolute", left:7, top:0, bottom:0, width:2, background:"#e5e7eb"}}/>
      {history.map((h,i)=>(
        <div key={i} style={{position:"relative", marginBottom:14, display:"flex", gap:10, alignItems:"flex-start"}}>
          <div style={{position:"absolute", left:-20, width:14, height:14, borderRadius:999, background:h.status==="done"?"#22c55e":h.status==="in_progress"?"#f59e0b":"#ef4444", border:"2px solid white", boxShadow:"0 0 0 2px #e5e7eb"}}/>
          <div style={{flex:1, background:h.status==="done"?"#f0fdf4":h.status==="in_progress"?"#fffbeb":"#fef2f2", borderRadius:8, padding:"6px 10px"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontSize:11, fontWeight:800}}>{h.date} - {h.status==="done"?"✅ Done":h.status==="in_progress"?"🚧 In Progress":"🚩 Stuck"} {h.val}%</span></div>
            {h.note && <div style={{fontSize:11, color:"#555", marginTop:2}}>{h.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

const statusConfig: any = {
  done:{label:"Done", icon:"✅", color:"#22c55e", bg:"#dcfce7"},
  in_progress:{label:"In Progress", icon:"🚧", color:"#d97706", bg:"#fef3c7"},
  stuck:{label:"Stuck", icon:"🚩", color:"#dc2626", bg:"#fee2e2"},
};

export default function Page() {
  const [data,setData]=useState<KPI[]>([]);
  const [selected,setSelected]=useState<KPI|null>(null);
  const [showAdd,setShowAdd]=useState(false);
  const [filter,setFilter]=useState<"all"|Status>("all");
  const [form,setForm]=useState({cat:"water", title:"", value:"", target:"", proof:"", trace:"", score:"", desc:"", status:"in_progress" as Status});
  const [logText,setLogText]=useState(""); const [logVal,setLogVal]=useState(""); const [logStatus,setLogStatus]=useState<Status>("in_progress");

  useEffect(()=>{const s=localStorage.getItem("hth_final_v3"); setData(s?JSON.parse(s):defaultData)},[]);
  useEffect(()=>{if(data.length) localStorage.setItem("hth_final_v3", JSON.stringify(data))},[data]);

  const filtered = filter==="all" ? data : data.filter(d=>d.status===filter);
  const counts = {all:data.length, done:data.filter(d=>d.status==="done").length, in_progress:data.filter(d=>d.status==="in_progress").length, stuck:data.filter(d=>d.status==="stuck").length};

  const deleteKPI = (id:number, e?:any) => {
    if(e) e.stopPropagation();
    if(!confirm("Delete KPI ini? Ga bisa di-undo!")) return;
    const upd = data.filter(d=>d.id!==id);
    setData(upd); setSelected(null);
  };
  const saveKPI=()=>{
    const h:HistoryPoint={date:new Date().toLocaleDateString().slice(0,5), val:Number(form.score)||0, status:form.status, note:form.title||"Created"};
    const k:KPI={id:Date.now(), cat:form.cat as any, catLabel:form.cat, title:form.title||"Untitled", value:form.value, target:form.target, proof:form.proof, trace:form.trace, score:Number(form.score)||0, status:form.status, logs:[`Created as ${form.status} - ${form.title}`], description:form.desc||`TRACK: ${form.proof}. TRACE: ${form.trace}`, history:[h]};
    setData([...data,k]); setShowAdd(false);
  };
  const addLog=()=>{
    if(!selected||!logText) return;
    const v=Number(logVal)||selected.score;
    const hist:HistoryPoint={date:new Date().toLocaleDateString().slice(0,5), val:v, status:logStatus, note:logText};
    const upd=data.map(d=>d.id===selected.id?{...d, logs:[...d.logs, `${new Date().toLocaleDateString()} - ${logText} [${logStatus}] (${v}%)`], history:[...d.history, hist], score:v, status:logStatus}:d);
    setData(upd); setSelected(upd.find(d=>d.id===selected.id)!); setLogText(""); setLogVal("");
  };

  const catColor:any={water:"#0ea5e9", sense:"#22c55e", green:"#16a34a", bio:"#eab308", energy:"#f97316", material:"#3b82f6"};

  return (
    <div style={{background:"#f8faf6", minHeight:"100vh", padding:16, fontFamily:"Inter, sans-serif"}}>
      <div style={{maxWidth:900, margin:"0 auto"}}>
        <div style={{background:"white", border:"2px solid #22c55e", borderRadius:20, padding:20}}>
          <h1 style={{fontSize:22, fontWeight:900, textAlign:"center"}}>HTH DEMO - Green Key Gold 🌱</h1>
          <div style={{display:"flex", gap:6, marginTop:14, justifyContent:"center", flexWrap:"wrap"}}>
            {[
              {key:"all", label:`All (${counts.all})`},
              {key:"done", label:`✅ Done (${counts.done})`},
              {key:"in_progress", label:`🚧 Progress (${counts.in_progress})`},
              {key:"stuck", label:`🚩 Stuck (${counts.stuck})`},
            ].map((t:any)=><button key={t.key} onClick={()=>setFilter(t.key)} style={{padding:"8px 14px", borderRadius:999, fontSize:11, fontWeight:800, border:"1px solid #e5e7eb", background:filter===t.key?"#111827":"white", color:filter===t.key?"white":"#333", cursor:"pointer"}}>{t.label}</button>)}
          </div>
        </div>

        <div style={{marginTop:14}}>
          {filtered.map(k=>(
            <div key={k.id} onClick={()=>setSelected(k)} style={{background:"white", borderRadius:16, padding:16, marginBottom:10, cursor:"pointer", borderLeft:`5px solid ${catColor[k.cat]}`, boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div><div style={{fontSize:11, fontWeight:800, color:catColor[k.cat]}}>{k.catLabel}</div><div style={{fontWeight:800, fontSize:14}}>{k.title}</div></div>
                <div style={{display:"flex", gap:6, alignItems:"center"}}>
                  <span style={{fontSize:10, fontWeight:800, padding:"4px 8px", borderRadius:999, background:statusConfig[k.status].bg, color:statusConfig[k.status].color}}>{statusConfig[k.status].icon} {statusConfig[k.status].label}</span>
                  <span style={{background:k.score>=90?"#22c55e":k.score>=70?"#f59e0b":"#ef4444", color:"white", padding:"4px 10px", borderRadius:999, fontSize:12, fontWeight:800}}>{k.score}%</span>
                  <button onClick={(e)=>deleteKPI(k.id,e)} style={{border:"none", background:"#fee2e2", borderRadius:6, padding:"4px 6px", cursor:"pointer"}}>🗑️</button>
                </div>
              </div>
              <div style={{fontSize:12, marginTop:6}}><b>Value:</b> {k.value} <b style={{marginLeft:12}}>Target:</b> {k.target}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setShowAdd(true)} style={{width:"100%", padding:14, background:"#111827", color:"white", border:"none", borderRadius:14, fontWeight:700, cursor:"pointer", marginTop:6}}>+ Add New KPI with Status</button>
      </div>

      {selected && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:12}} onClick={()=>setSelected(null)}>
          <div style={{background:"white", borderRadius:20, padding:18, maxWidth:540, width:"100%", maxHeight:"92vh", overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex", justifyContent:"space-between"}}><h3 style={{fontWeight:800}}>{selected.title} - {selected.score}%</h3>
              <div style={{display:"flex", gap:6}}><button onClick={()=>deleteKPI(selected.id)} style={{border:"none", background:"#fee2e2", color:"#dc2626", borderRadius:8, padding:"6px 10px", fontWeight:700, cursor:"pointer"}}>🗑️ Delete</button><button onClick={()=>setSelected(null)} style={{border:"none", background:"#f3f4f6", borderRadius:8, padding:"4px 8px"}}>✕</button></div>
            </div>

            <div style={{marginTop:12}}><div style={{fontSize:11, fontWeight:800, color:"#16a34a"}}>📈 CHART + 🕒 TIMELINE PROGRESS</div><div style={{marginTop:6}}><LineChart history={selected.history}/></div></div>

            <div style={{marginTop:14}}><div style={{fontSize:12, fontWeight:800}}>🕒 PROGRESS TIMELINE - Ide baru: Stuck → In Progress → Done</div><Timeline history={selected.history}/></div>

            <div style={{marginTop:12, background:"#f9fafb", borderRadius:12, padding:12}}>
              <div style={{fontSize:12, fontWeight:800}}>🔍 TRACK & TRACE</div>
              <div style={{fontSize:13, marginTop:6}}>{selected.description}</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}><div style={{background:"#ecfdf5", padding:8, borderRadius:8, fontSize:11}}><b>TRACK</b><br/>{selected.proof}</div><div style={{background:"#eff6ff", padding:8, borderRadius:8, fontSize:11}}><b>TRACE</b><br/>{selected.trace}</div></div>
            </div>

            <div style={{marginTop:12}}>
              <div style={{fontWeight:700, fontSize:13}}>📝 Update Progress (auto timeline + chart)</div>
              <input value={logText} onChange={e=>setLogText(e.target.value)} placeholder="Note: e.g. Permit approved, scale bought" style={{width:"100%", marginTop:6, padding:10, border:"1px solid #d1d5db", borderRadius:10, fontSize:12}}/>
              <div style={{display:"flex", gap:6, marginTop:6}}><input value={logVal} onChange={e=>setLogVal(e.target.value)} type="number" placeholder="Score %" style={{flex:1, padding:10, border:"1px solid #d1d5db", borderRadius:10}}/><select value={logStatus} onChange={e=>setLogStatus(e.target.value as any)} style={{flex:1, padding:10, borderRadius:10, border:"1px solid #d1d5db", fontSize:12}}><option value="stuck">🚩 Stuck</option><option value="in_progress">🚧 In Progress</option><option value="done">✅ Done</option></select><button onClick={addLog} style={{padding:"10px 14px", background:"#22c55e", color:"white", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer"}}>Save</button></div>
              <div style={{fontSize:10, color:"#888", marginTop:4}}>Save = timeline nambah, chart naik, status badge ganti, tab filter update</div>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:60, padding:12}}>
          <div style={{background:"white", borderRadius:20, padding:18, maxWidth:460, width:"100%"}}>
            <h3 style={{fontWeight:800}}>Add KPI + Status</h3>
            <div style={{display:"flex", flexDirection:"column", gap:8, marginTop:12}}>
              <select value={form.cat} onChange={e=>setForm({...form, cat:e.target.value})} style={{padding:10, borderRadius:10, border:"1px solid #d1d5db"}}><option value="water">💧 Water</option><option value="material">♻️ Canal</option><option value="energy">🔥 Heat Bank</option><option value="sense">🌿 Food</option><option value="green">🏢 Green Ops</option><option value="bio">🐝 Bio</option></select>
              <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" style={{padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/>
              <div style={{display:"flex", gap:8}}><input value={form.value} onChange={e=>setForm({...form, value:e.target.value})} placeholder="Value" style={{flex:1, padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/><input value={form.target} onChange={e=>setForm({...form, target:e.target.value})} placeholder="Target" style={{flex:1, padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/></div>
              <div style={{display:"flex", gap:8}}><input value={form.score} onChange={e=>setForm({...form, score:e.target.value})} type="number" placeholder="Score %" style={{flex:1, padding:10, borderRadius:10, border:"1px solid #d1d5db"}}/><select value={form.status} onChange={e=>setForm({...form, status:e.target.value as any})} style={{flex:1, padding:10, borderRadius:10, border:"1px solid #d1d5db"}}><option value="stuck">🚩 Stuck</option><option value="in_progress">🚧 In Progress</option><option value="done">✅ Done</option></select></div>
              <button onClick={saveKPI} style={{padding:12, background:"#22c55e", color:"white", border:"none", borderRadius:12, fontWeight:700}}>Save</button>
              <button onClick={()=>setShowAdd(false)} style={{padding:10, background:"#f3f4f6", border:"none", borderRadius:12}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
