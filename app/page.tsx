"use client";
import { useState } from 'react';

const alumniData = [
  { id: 1, nama: "Budi Test", lokasi: "Amsterdam", project: "Solar Panel", sdg: "SDG 7", status: "Active", tahun: 2023 },
  { id: 2, nama: "HTH Alumni", lokasi: "Jakarta", project: "Pendidikan", sdg: "SDG 4", status: "Active", tahun: 2024 },
  { id: 3, nama: "Siti Amsterdam", lokasi: "Amsterdam", project: "Circular Economy", sdg: "SDG 12", status: "Active", tahun: 2024 },
  { id: 4, nama: "Zaky Dhanrama", lokasi: "Amsterdam", project: "HTH Platform", sdg: "SDG 9", status: "Founder", tahun: 2025 },
];

const kpis = [
  { label: "Total Alumni", value: "124", sub: "Tracked 100%" },
  { label: "Amsterdam Hub", value: "18", sub: "Eropa" },
  { label: "Jakarta Hub", value: "89", sub: "Indonesia" },
  { label: "Active Project", value: "42", sub: "On-going" },
  { label: "SDG 4 - Education", value: "35", sub: "Projects" },
  { label: "SDG 7 - Energy", value: "22", sub: "Projects" },
  { label: "SDG 13 - Climate", value: "18", sub: "Projects" },
  { label: "Employment", value: "92%", sub: "After HTH" },
  { label: "Sustainability", value: "87%", sub: "Impact Score" },
  { label: "Partner", value: "24", sub: "Org & Company" },
  { label: "Countries", value: "8", sub: "Covered" },
  { label: "SDGs Covered", value: "17", sub: "All SDGs" },
];

export default function Page() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  
  const filtered = alumniData.filter(a => 
    (filter === "All" || a.lokasi === filter || a.sdg === filter) &&
    a.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f8f9fa] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black">HTH - 100% Track & Trace</h1>
              <p className="text-gray-500 mt-1">Pendidikan • Lingkungan • SDGs • LIVE di Vercel! • Amsterdam</p>
            </div>
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm">v2.0 LIVE</div>
          </div>
        </div>

        {/* 12 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</p>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              <p className="text-xs text-green-600 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Alumni Trace */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold">Alumni Full Trace</h2>
            <div className="flex gap-2">
              <input placeholder="Search nama..." value={search} onChange={e=>setSearch(e.target.value)} className="border rounded-full px-4 py-2 text-sm w-40" />
              <select value={filter} onChange={e=>setFilter(e.target.value)} className="border rounded-full px-4 py-2 text-sm">
                <option value="All">All</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Jakarta">Jakarta</option>
                <option value="SDG 4">SDG 4</option>
                <option value="SDG 7">SDG 7</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="text-left text-xs text-gray-400 uppercase border-b"><th className="pb-3">Nama</th><th>Lokasi</th><th>Project</th><th>SDG</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 font-medium">{a.nama}</td>
                    <td>{a.lokasi === 'Amsterdam' ? '🇳🇱' : '🇮🇩'} {a.lokasi}</td>
                    <td>{a.project}</td>
                    <td><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">{a.sdg}</span></td>
                    <td><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-green-600 text-sm mt-6 font-bold">✅ Langkah 2 Berhasil! Dashboard PRO LIVE!</p>
        </div>
      </div>
    </main>
  );
}
