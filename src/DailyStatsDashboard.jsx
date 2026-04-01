import React, { useEffect, useMemo, useState } from 'react';
import { Search, RotateCcw, Download, Building2, Truck, TrendingUp, PieChart, CheckCircle2 } from 'lucide-react';

const cardBase = 'bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/40 p-6';

function formatNum(n) {
  return Number(n || 0).toLocaleString('zh-CN');
}

function TinyBar({ value, max = 100 }) {
  const pct = Math.max(4, Math.min(100, (value / Math.max(1, max)) * 100));
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function DailyStatsDashboard({ mode = 'transport' }) {
  const isRevenue = mode === 'revenue';
  const [selectedTeam, setSelectedTeam] = useState('研发中心');
  const [trendReady, setTrendReady] = useState(false);

  useEffect(() => {
    setTrendReady(false);
    const t = setTimeout(() => setTrendReady(true), 30);
    return () => clearTimeout(t);
  }, [mode]);

  const data = useMemo(() => {
    const teams = [
      { name: '研发中心', plannedTrips: 0, finishedTrips: 0, revenue: 0, tonnage: 0, active: 0 },
      { name: '南京车队', plannedTrips: 252, finishedTrips: 26, revenue: 268000, tonnage: 1118, active: 12 },
      { name: '合肥车队', plannedTrips: 438, finishedTrips: 6, revenue: 142000, tonnage: 592, active: 7 },
      { name: '项目一公司', plannedTrips: 376, finishedTrips: 38, revenue: 355000, tonnage: 1460, active: 19 },
    ];

    const routeCompare = [
      { route: '杭州-合肥', planned: 120, done: 116 },
      { route: '南京-苏州', planned: 96, done: 88 },
      { route: '合肥-芜湖', planned: 78, done: 74 },
      { route: '上海-杭州', planned: 65, done: 61 },
    ];

    const trend = [
      { date: '03-22', value: isRevenue ? 82 : 36 },
      { date: '03-23', value: isRevenue ? 126 : 54 },
      { date: '03-24', value: isRevenue ? 108 : 45 },
      { date: '03-25', value: isRevenue ? 188 : 82 },
      { date: '03-26', value: isRevenue ? 146 : 63 },
      { date: '今日', value: isRevenue ? 35 : 8 },
    ];

    const statusRate = [
      { name: '空闲车辆', value: 48 },
      { name: '运输中', value: 36 },
      { name: '异常车辆', value: 16 },
    ];

    return { teams, routeCompare, trend, statusRate };
  }, [isRevenue]);

  const selected = data.teams.find((t) => t.name === selectedTeam) ?? data.teams[0];
  const totalPlanned = data.teams.reduce((s, t) => s + t.plannedTrips, 0);
  const totalDone = data.teams.reduce((s, t) => s + t.finishedTrips, 0);
  const totalRevenue = data.teams.reduce((s, t) => s + t.revenue, 0);
  const totalTonnage = data.teams.reduce((s, t) => s + t.tonnage, 0);

  return (
    <div className="space-y-6">
      <div className={`${cardBase} p-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-3">
          <div className="xl:col-span-2 px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-[13px] font-black text-slate-600">时间段: 2026-03-27 至 2026-03-27</div>
          <div className="xl:col-span-2 px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-[13px] font-black text-slate-600">项目公司: 研发中心</div>
          <div className="xl:col-span-1 px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-[13px] font-black text-slate-600">路线: 请选择</div>
          <button type="button" className="px-4 py-3 rounded-2xl bg-indigo-600 text-white font-black text-[13px] flex items-center justify-center gap-2"><Search className="w-4 h-4" /> 查询</button>
          <div className="flex gap-2">
            <button type="button" className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 text-slate-600 font-black text-[13px] flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" /> 重置</button>
            <button type="button" className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black text-[13px] flex items-center justify-center gap-2"><Download className="w-4 h-4" /> 导出</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className={cardBase}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-black text-slate-700">{isRevenue ? '各公司营收与运力对比' : '各路线计划与完成车次对比'}</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">对比视图</span>
          </div>
          <div className="space-y-3">
            {(isRevenue ? data.teams.map(t => ({ k: t.name, a: t.revenue, b: t.active })) : data.routeCompare.map(r => ({ k: r.route, a: r.planned, b: r.done }))).map((r) => (
              <div key={r.k} className="rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
                <div className="grid grid-cols-[96px_1fr_40px_40px] items-center gap-2">
                  <div className="text-[12px] font-black text-slate-500 truncate">{r.k}</div>
                  <TinyBar value={r.a} max={isRevenue ? totalRevenue : 140} />
                  <div className="text-[11px] font-black text-slate-500 text-right">{formatNum(r.a)}</div>
                  <div className="text-[11px] font-black text-indigo-500 text-right">{formatNum(r.b)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cardBase}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-black text-slate-700">{isRevenue ? '单车产值效能分析' : '任务完成率趋势分析'}</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">趋势</span>
          </div>
          <div className="flex items-end gap-2 h-[170px]">
            {data.trend.map((p, idx) => (
              <div key={p.date} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-indigo-100 border border-indigo-100/70 transition-all duration-700 ease-out"
                  style={{
                    height: `${trendReady ? Math.max(10, p.value) : 8}%`,
                    transitionDelay: `${idx * 90}ms`,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg relative">
                    <span className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.15)] transition-all duration-700 ${trendReady ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
                <div className="text-[11px] font-black text-slate-400">{p.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={cardBase}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-black text-slate-700">{isRevenue ? '营收贡献占比' : '运车辆状态占比'}</h3>
            <PieChart className="w-4 h-4 text-slate-300" />
          </div>
          <div className="space-y-3 pt-1">
            {data.statusRate.map((s) => (
              <div key={s.name} className="rounded-xl bg-slate-50/70 border border-slate-100 p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[12px] font-black text-slate-500"><span>{s.name}</span><span>{s.value}%</span></div>
                <TinyBar value={s.value} max={100} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-[2rem] p-6 shadow-xl shadow-indigo-200/40">
            <div className="text-[11px] font-black uppercase tracking-widest opacity-80">全项目概览</div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div><div className="text-xs opacity-80">计划车次</div><div className="text-3xl font-black">{totalPlanned}</div></div>
              <div><div className="text-xs opacity-80">完成车次</div><div className="text-3xl font-black">{totalDone}</div></div>
              <div><div className="text-xs opacity-80">总营收</div><div className="text-2xl font-black">{formatNum(totalRevenue)}</div></div>
              <div><div className="text-xs opacity-80">总吨位</div><div className="text-2xl font-black">{formatNum(totalTonnage)}</div></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/40 p-3 space-y-2">
            {data.teams.map((t) => {
              const active = t.name === selectedTeam;
              return (
                <button key={t.name} type="button" onClick={() => setSelectedTeam(t.name)} className={`w-full text-left rounded-[1.25rem] p-4 border transition-all ${active ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-black text-slate-700">{t.name}</div>
                    {active ? <CheckCircle2 className="w-4 h-4 text-indigo-500" /> : null}
                  </div>
                  <div className="mt-2 text-[11px] font-black text-slate-500 flex justify-between">
                    <span>计划 {t.plannedTrips}</span>
                    <span>完成 {t.finishedTrips}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="xl:col-span-3 bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/40 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-black text-slate-800">{selected.name}</h3>
              <p className="text-xs font-black text-slate-400 mt-1">共 1 条线路结果</p>
            </div>
            <div className="flex items-center gap-4 text-[12px] font-black text-slate-500">
              <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1"><Truck className="w-4 h-4" /> 运输中 {selected.active}</span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1"><Building2 className="w-4 h-4" /> 总车辆 {Math.max(0, selected.active + 8)}</span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> 总营收 {formatNum(selected.revenue)}</span>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-100 p-6 bg-white shadow-inner">
            <h4 className="font-black text-slate-700 mb-4">杭州-合肥</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/40">
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">车辆与班次</div>
                <div className="space-y-2 text-[13px] font-black text-slate-600">
                  <div className="flex justify-between"><span>总车辆数</span><span>{selected.active + 8} 辆</span></div>
                  <div className="flex justify-between"><span>运输车辆</span><span className="text-emerald-600">{selected.active} 辆</span></div>
                  <div className="flex justify-between"><span>计划车次</span><span>{selected.plannedTrips} 次</span></div>
                  <div className="flex justify-between"><span>完成车次</span><span className="text-indigo-600">{selected.finishedTrips} 次</span></div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/40">
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">吨位统计</div>
                <div className="space-y-2 text-[13px] font-black text-slate-600">
                  <div className="flex justify-between"><span>完成吨位</span><span>{formatNum(selected.tonnage)} T</span></div>
                  <div className="flex justify-between"><span>平均吨位</span><span>{Math.round(selected.tonnage / Math.max(1, selected.finishedTrips || 1))} T/次</span></div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/40">
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{isRevenue ? '营收数据' : '运输价值'}</div>
                <div className="space-y-2 text-[13px] font-black text-slate-600">
                  <div className="flex justify-between"><span>含税收入</span><span>{formatNum(selected.revenue)}</span></div>
                  <div className="flex justify-between"><span>不含税收入</span><span>{formatNum(Math.round(selected.revenue * 0.92))}</span></div>
                  <div className="flex justify-between"><span>单位收益</span><span>{formatNum(Math.round(selected.revenue / Math.max(1, selected.finishedTrips || 1)))}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

