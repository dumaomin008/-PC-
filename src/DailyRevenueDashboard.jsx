import React, { useEffect, useState } from 'react';
import {
  Search, RefreshCw, Download, CalendarDays,
  ChevronDown, TrendingUp, Car,
  CheckCircle2, MapPin, Activity, PieChart, BarChart3,
  Building2, Route, Star, Users
} from 'lucide-react';

export default function DailyRevenueDashboard() {
  const [isChartMounted, setIsChartMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsChartMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const trendData = [
    { date: '03-22', value: 26 },
    { date: '03-23', value: 42 },
    { date: '03-24', value: 36 },
    { date: '03-25', value: 74 },
    { date: '03-26', value: 63 },
    { date: '今日', value: 88 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex items-center bg-slate-50/80 border border-slate-100 rounded-2xl px-5 py-3.5 w-80 shadow-inner">
            <CalendarDays className="w-5 h-5 text-slate-400 mr-3" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">时间段</span>
              <span className="text-[14px] font-bold text-slate-700 leading-none">2026-03-27 至 2026-03-27</span>
            </div>
          </div>

          <div className="flex items-center bg-slate-50/80 border border-slate-100 rounded-2xl px-5 py-3.5 w-72 shadow-inner relative cursor-pointer">
            <Building2 className="w-5 h-5 text-slate-400 mr-3" />
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">项目公司</span>
              <span className="text-[14px] font-bold text-slate-700 leading-none">研发中心</span>
            </div>
            <ChevronDown className="w-5 h-5 text-slate-400 absolute right-5" />
          </div>

          <div className="flex items-center bg-slate-50/80 border border-slate-100 rounded-2xl px-5 py-3.5 w-64 shadow-inner relative cursor-pointer">
            <Route className="w-5 h-5 text-slate-400 mr-3" />
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">路线</span>
              <span className="text-[14px] font-bold text-slate-400 leading-none">请选择</span>
            </div>
            <ChevronDown className="w-5 h-5 text-slate-400 absolute right-5" />
          </div>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
          <button type="button" className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[15px] shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
            <Search className="w-5 h-5" /> 查询
          </button>
          <button type="button" className="flex items-center gap-2 px-6 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-[15px] border border-slate-200 hover:bg-slate-100 transition-all">
            <RefreshCw className="w-5 h-5" /> 重置
          </button>
          <button type="button" className="flex items-center gap-2 px-6 py-4 bg-white text-indigo-600 rounded-2xl font-black text-[15px] border border-indigo-100 hover:bg-indigo-50 transition-all shadow-sm">
            <Download className="w-5 h-5" /> 导出
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[260px]">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />各公司营收与运力对比
            </h3>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-lg uppercase tracking-widest border border-slate-100">对比视图</span>
          </div>
          <div className="flex flex-col gap-4 flex-1 justify-center">
            {[
              { name: '研发中心', rev: 0, cars: 8 },
              { name: '南京车队', rev: 268000, cars: 14 },
              { name: '合肥车队', rev: 142000, cars: 12 },
              { name: '项目一公司', rev: 355000, cars: 16 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 text-sm font-bold group">
                <span className="w-20 text-slate-600">{item.name}</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 left-0 bottom-0 bg-indigo-100 rounded-full" style={{ width: `${(item.rev / 355000) * 100}%` }} />
                  <div className="absolute top-0 left-0 bottom-0 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-700 ease-out" style={{ width: isChartMounted ? `${(item.cars / 16) * 100}%` : '0%' }} />
                </div>
                <div className="w-16 text-right flex gap-2 justify-end">
                  <span className="text-slate-800 font-black">{Math.round(item.rev / 1000)}</span>
                  <span className="text-indigo-600 font-black">{item.cars}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center relative z-10">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />单车产值效能分析
            </h3>
            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg uppercase tracking-widest border border-indigo-100/50 shadow-inner">动态趋势</span>
          </div>

          <div className="flex-1 relative mt-6 flex items-end justify-between px-2 z-10 min-h-[140px]">
            <div className="absolute left-0 right-0 bottom-[25px] h-[2px] bg-slate-100 rounded-full"></div>
            {trendData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center relative h-full justify-end w-12 z-10">
                <div className="relative flex flex-col items-center justify-end w-full h-[100px] mb-2">
                  <div
                    className={`w-1.5 rounded-full origin-bottom transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${idx === 5 ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-slate-200'}`}
                    style={{ height: isChartMounted ? `${item.value}%` : '0%', transitionDelay: `${idx * 100}ms` }}
                  ></div>
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20 ${idx === 5 ? 'bg-indigo-600 scale-125 ring-4 ring-indigo-100' : 'bg-slate-400'}`}
                    style={{ bottom: isChartMounted ? `calc(${item.value}% - 7px)` : '-7px', transitionDelay: `${idx * 100}ms` }}
                  ></div>
                </div>
                <span className={`text-[11px] font-black ${idx === 5 ? 'text-indigo-600' : 'text-slate-400'}`}>{item.date}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-indigo-50/80 to-transparent pointer-events-none opacity-40"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-500" />营收贡献占比
            </h3>
          </div>
          <div className="flex flex-col gap-5 flex-1 justify-center">
            {[
              { label: '项目一公司', pct: 46, color: 'bg-amber-500' },
              { label: '南京车队', pct: 35, color: 'bg-indigo-500' },
              { label: '合肥车队', pct: 19, color: 'bg-blue-500' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2 group">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-bold text-slate-600">{item.label}</span>
                  <span className="text-[15px] font-black text-slate-800">{item.pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: isChartMounted ? `${item.pct}%` : '0%', transitionDelay: `${idx * 150}ms` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-[380px] flex flex-col gap-6 shrink-0">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-[15px] font-black opacity-90 mb-8 flex items-center gap-2">
                <Star className="w-5 h-5 fill-white" /> 全项目营收概览
              </h2>
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                <div className="flex flex-col gap-1"><span className="text-[11px] font-bold uppercase tracking-widest opacity-70">总含税收入</span><span className="text-4xl font-black tracking-tight">¥765K</span></div>
                <div className="flex flex-col gap-1"><span className="text-[11px] font-bold uppercase tracking-widest opacity-70">总不含税收入</span><span className="text-4xl font-black tracking-tight text-emerald-300 drop-shadow-sm">¥704K</span></div>
                <div className="flex flex-col gap-1"><span className="text-[11px] font-bold uppercase tracking-widest opacity-70">出货车次</span><span className="text-3xl font-black tracking-tight">70</span></div>
                <div className="flex flex-col gap-1"><span className="text-[11px] font-bold uppercase tracking-widest opacity-70">总吨位 (T)</span><span className="text-3xl font-black tracking-tight">3,170</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-white flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2">
            {[
              { name: '研发中心', rev: '0', exRev: '0', active: true },
              { name: '南京车队', rev: '268,000', exRev: '246,560', active: false },
              { name: '合肥车队', rev: '142,000', exRev: '130,640', active: false },
              { name: '项目一公司', rev: '355,000', exRev: '326,600', active: false },
            ].map((proj, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-[1.5rem] flex items-center justify-between cursor-pointer transition-all border-2 ${proj.active ? 'bg-indigo-50/50 border-indigo-500 shadow-md shadow-indigo-100' : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100'}`}
              >
                <div className="flex flex-col gap-2">
                  <h4 className={`text-[17px] font-black ${proj.active ? 'text-indigo-900' : 'text-slate-800'}`}>{proj.name}</h4>
                  <div className={`text-[11px] font-bold ${proj.active ? 'text-indigo-600' : 'text-slate-400'} flex gap-4`}>
                    <span>含税 <span className="text-sm font-black ml-1">{proj.rev}</span></span>
                    <span>不含税 <span className="text-sm font-black ml-1">{proj.exRev}</span></span>
                  </div>
                </div>
                {proj.active && (
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-white flex flex-col overflow-hidden">
          <div className="p-8 pb-6 border-b border-slate-50 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">研发中心</h2>
              <p className="text-sm font-bold text-slate-400 mt-2">共 <span className="text-indigo-600 font-black">1</span> 条线路结果</p>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 shadow-sm"><Car className="w-4 h-4 text-slate-400" /><span className="text-xs font-bold text-slate-500">运输中</span><span className="text-base font-black text-slate-800">0</span></div>
              <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 shadow-sm"><Users className="w-4 h-4 text-slate-400" /><span className="text-xs font-bold text-slate-500">总车辆</span><span className="text-base font-black text-slate-800">8</span></div>
              <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 shadow-sm"><Activity className="w-4 h-4 text-slate-400" /><span className="text-xs font-bold text-slate-500">总营收</span><span className="text-base font-black text-slate-800">0</span></div>
            </div>
          </div>

          <div className="p-8 flex-1 overflow-y-auto bg-slate-50/30">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><MapPin className="w-5 h-5" /></div>
                <h3 className="text-xl font-black text-slate-800 tracking-wide">杭州 - 合肥</h3>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                  <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-6 block">车辆与班次</span>
                  <div className="space-y-5 text-sm font-bold text-slate-600">
                    <div className="flex justify-between items-end"><span>总车辆数</span><p className="text-2xl font-black text-slate-800">8 <span className="text-xs">辆</span></p></div>
                    <div className="flex justify-between items-end"><span>运输车辆</span><p className="text-2xl font-black text-emerald-500">0 <span className="text-xs">辆</span></p></div>
                    <div className="flex justify-between items-end"><span>出货车次</span><p className="text-2xl font-black text-indigo-600">0 <span className="text-xs">次</span></p></div>
                  </div>
                </div>
                <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                  <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-6 block">吨位统计</span>
                  <div className="space-y-5 text-sm font-bold text-slate-600">
                    <div className="flex justify-between items-end"><span>完成吨位</span><p className="text-2xl font-black text-slate-800">0 <span className="text-xs">T</span></p></div>
                    <div className="flex justify-between items-end"><span>平均吨位</span><p className="text-2xl font-black text-slate-800">0 <span className="text-xs">T/次</span></p></div>
                  </div>
                </div>
                <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-amber-200/40 rounded-full blur-3xl pointer-events-none"></div>
                  <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-6 block relative z-10">营收统计</span>
                  <div className="space-y-5 relative z-10 text-sm font-bold text-slate-600">
                    <div className="flex justify-between items-end"><span>含税收入</span><p className="text-2xl font-black text-slate-800">0</p></div>
                    <div className="flex justify-between items-end"><span>不含税收入</span><p className="text-2xl font-black text-slate-800">0</p></div>
                    <div className="flex justify-between items-end pt-2 mt-2 border-t border-slate-200"><span className="text-sm font-black text-slate-800">吨均收入</span><p className="text-3xl font-black text-amber-500 drop-shadow-sm">0</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

