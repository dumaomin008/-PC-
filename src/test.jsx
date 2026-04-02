import React, { useState } from 'react';
import { 
  Search, Plus, Filter, MoreHorizontal, 
  Phone, ShieldCheck, AlertCircle, CheckCircle2,
  Clock, Edit, Trash2, ChevronDown, Download,
  Car, FileText, Image as ImageIcon, Eye, 
  CalendarDays, Star, Activity, MapPin, 
  FileCheck, LayoutGrid, List, RefreshCw, Upload, Truck,
  ShieldAlert, X, Info, UserCheck, IdCard, FileBadge, Route, Save, Users, AlertTriangle, XCircle, FileInput
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVehicle, setActiveVehicle] = useState(null);

  // 🌟 全局状态
  const [activeFilter, setActiveFilter] = useState('all');
  const [formMode, setFormMode] = useState(null);
  const [editingData, setEditingData] = useState(null);

  // --------------------------------------------------------
  // 🚀 模拟数据
  // --------------------------------------------------------
  const [mockVehicles, setMockVehicles] = useState([
    {
      id: "1", isFavorite: true, plate: "皖A233363", source: "自有", type: "挂车", projectCompany: "项目一公司",
      vin: "HCCB3DDW6R2046082", engineNo: "标配侧翻", status: "driving",
      driverName: "汪一波", driverPhone: "137****2345", driverId: "YQ20260320000104",
      annualExpiry: "2026-03-19", transportCertExpiry: "2026-05-12", insuranceExpiry: "2026-08-20",
      brand: "新能源", busVin: "商州 (乘汽底盘)", tractorVin: "艾换电一体版", batteryCapacity: "国轩电池391度",
      batteryType: "充换电一体", busModel: "中通客车", certDate: "2024-09-07", registerDate: "2024-09-07",
      transportCertNo: "1234567789", usageNature: "货运", engineModel: "合肥市公交局", vehicleColor: "黄色",
      axes: "多轴", dimensions: "7360*2525*3450", passengers: "12", totalWeight: "10000",
      curbWeight: "38865", approvedWeight: "7390", tractorTotalWeight: "21345", maintenanceExpiry: "2025-03-10",
      scrapExpiry: "2025-03-10",
      boundDriver: { name: "汪一波", gender: "男", id: "JKLSJ261027", phone: "151****1234", idCard: "34**********10171352", avatar: "Felix", licenseType: "A2", licenseExpiry: "2028-10-15", status: "运输中" },
      waybills: [{ id: "YD20260320000104", status: "待装车", project: "项目一公司", isReturn: "散耗", mileage: "预计运输里程120 km", time: "2026-03-24 09:31", from: "巢湖中联水泥有限公司", fromAddr: "安徽省合肥市肥东县巢湖市槐林镇...", to: "南京中联水泥有限公司", toAddr: "江苏省南京市江宁区江苏省南京市..." }]
    },
    {
      id: "2", isFavorite: false, plate: "皖A12138", source: "外调", type: "牵引车", projectCompany: "项目二公司",
      vin: "HCCB3DDW6R2046082", engineNo: "奔驰 (极光底盘)", status: "idle",
      driverName: "李师傅", driverPhone: "139****5678", driverId: "-",
      annualExpiry: "2026-03-19", transportCertExpiry: "2026-04-10", insuranceExpiry: "2026-11-05",
      boundDriver: { name: "李师傅", gender: "男", id: "JKLSJ261028", phone: "139****5678", idCard: "34**********10171111", avatar: "Jasper", licenseType: "A2", licenseExpiry: "2027-05-20", status: "空闲待命" },
      waybills: []
    },
    {
      id: "3", isFavorite: true, plate: "皖A233363", source: "外采二手", type: "挂车", projectCompany: "项目一公司",
      vin: "HCCB3DDW6R2046082", engineNo: "标配侧翻", status: "driving",
      driverName: "王大拿", driverPhone: "138****9999", driverId: "YQ20260320000104",
      annualExpiry: "2026-03-19", transportCertExpiry: "2026-06-30", insuranceExpiry: "2026-09-15",
      boundDriver: { name: "王大拿", gender: "男", id: "JKLSJ261029", phone: "138****9999", idCard: "34**********10172222", avatar: "Sam", licenseType: "B2", licenseExpiry: "2029-01-10", status: "运输中" },
      waybills: []
    },
    {
      id: "4", isFavorite: false, plate: "皖A12138", source: "外调", type: "牵引车", projectCompany: "项目三公司",
      vin: "HCCB3DDW6R2046082", engineNo: "奔驰 (极光底盘)", status: "offline",
      driverName: "-", driverPhone: "-", driverId: "-",
      annualExpiry: "2026-03-19", transportCertExpiry: "2026-03-19", insuranceExpiry: "2026-03-19",
      boundDriver: null, waybills: []
    },
  ]);

  const FILTER_DICT = {
    'all': '全部运力', 'own': '自有车辆', 'external': '外调车辆',
    'warning_license': '行驶证异常监控', 'warning_cert': '运输资质异常监控', 'warning_insurance': '交强险异常监控'
  };

  const filteredVehicles = mockVehicles.filter(v => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'own') return v.source === '自有';
    if (activeFilter === 'external') return v.source === '外调';
    if (activeFilter === 'warning_license') return v.id === '1' || v.id === '3';
    if (activeFilter === 'warning_cert') return v.id === '2';
    if (activeFilter === 'warning_insurance') return v.id === '4';
    return true;
  });

  const toggleFavorite = (id, e) => { e.stopPropagation(); setMockVehicles(prev => prev.map(v => v.id === id ? { ...v, isFavorite: !v.isFavorite } : v)); };
  const openEditForm = (vehicle, e) => { e.stopPropagation(); setEditingData(vehicle); setFormMode(vehicle.type === '挂车' ? 'create_trailer' : 'create_tractor'); };
  const openCreateForm = (type) => { setEditingData(null); setFormMode(`create_${type}`); };

  // --------------------------------------------------------
  // 🎨 辅助 UI 组件
  // --------------------------------------------------------
  const StatusBadge = ({ status }) => {
    const config = {
      driving: { bg: 'bg-emerald-500/10', text: 'text-emerald-700', border: 'border-emerald-500/20', label: '运输中', dot: 'bg-emerald-500' },
      idle: { bg: 'bg-blue-500/10', text: 'text-blue-700', border: 'border-blue-500/20', label: '空闲中', dot: 'bg-blue-500' },
      offline: { bg: 'bg-slate-500/10', text: 'text-slate-600', border: 'border-slate-500/20', label: '离线/异常', dot: 'bg-slate-400' },
    }[status] || { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200', label: '未知', dot: 'bg-slate-300' };
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold border ${config.bg} ${config.text} ${config.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot} shadow-sm`}></span>{config.label}
      </span>
    );
  };

  const SourceBadge = ({ source }) => {
    const isOwn = source === '自有';
    const isExternal = source === '外调';
    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[12px] font-bold border tracking-wide 
        ${isOwn ? 'bg-indigo-50 text-indigo-700 border-indigo-200/60' : isExternal ? 'bg-amber-50 text-amber-700 border-amber-200/60' : 'bg-purple-50 text-purple-700 border-purple-200/60'}`}>
        {source}
      </span>
    );
  };

  const SectionTitle = ({ title, icon: Icon, color = "text-indigo-600" }) => (
    <div className="flex items-center gap-3 mb-6 pl-1 group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:rotate-6 ${color.replace('text', 'bg').replace('600', '50')} ${color}`}>
        <Icon className="w-5 h-5" strokeWidth={2.5} />
      </div>
      <h3 className="text-lg font-extrabold text-slate-800 tracking-wide">{title}</h3>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-slate-100 to-transparent ml-4"></div>
    </div>
  );

  const DataField = ({ label, value, valueClass = "" }) => (
    <div className="flex flex-col gap-1.5 group">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest transition-colors group-hover:text-indigo-400">{label}</span>
      <span className={`text-[14px] font-semibold text-slate-800 ${valueClass}`}>{value || '-'}</span>
    </div>
  );

  const CircularGauge = ({ title, dateStr, days, colorClass }) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const pct = days === '暂无' ? 0 : Math.min(100, Math.max(0, (parseInt(days) / 365) * 100));
    const strokeDashoffset = circumference - (pct / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-4 group cursor-default">
        <div className="relative w-32 h-32 flex items-center justify-center">
           <svg className="w-full h-full transform -rotate-90 drop-shadow-sm transition-transform duration-700 group-hover:scale-105" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
             <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={`${colorClass} transition-all duration-1000 ease-out`} />
           </svg>
           <div className="absolute flex flex-col items-center justify-center mt-1">
              {days === '暂无' ? (
                <span className="text-xl font-bold text-slate-300">暂无</span>
              ) : (
                <><span className={`text-3xl font-extrabold tracking-tight leading-none ${colorClass}`}>{days}</span><span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Days</span></>
              )}
           </div>
        </div>
        <div className="text-center transition-transform duration-300 group-hover:-translate-y-1">
           <p className="text-[14px] font-bold text-slate-700 mb-1.5">{title}</p>
           {dateStr && <p className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md inline-block border border-slate-200/60">{dateStr} 到期</p>}
        </div>
      </div>
    );
  };

  const BasicStatCard = ({ title, value, unit, icon: Icon, illustration, filterKey, isLarge = false }) => {
    const isActive = activeFilter === filterKey;
    return (
      <div 
        onClick={() => setActiveFilter(isActive ? 'all' : filterKey)}
        className={`relative overflow-hidden rounded-[2rem] transition-all duration-300 cursor-pointer flex flex-col border
        ${isLarge ? 'p-6 h-[140px]' : 'p-5 h-[120px]'}
        ${isActive 
          ? 'bg-indigo-50/50 border-indigo-300 ring-4 ring-indigo-500/20 shadow-[0_10px_30px_rgb(79,70,229,0.15)] -translate-y-1' 
          : 'bg-white border-white/80 hover:border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)]'}`}
      >
        <div className="flex items-center gap-3 relative z-10">
          <div className={`rounded-xl flex items-center justify-center ${isLarge ? 'w-10 h-10 bg-indigo-50 text-indigo-600' : 'w-8 h-8 bg-slate-50 text-slate-500'}`}>
            <Icon className={isLarge ? "w-5 h-5" : "w-4 h-4"} strokeWidth={2.5} />
          </div>
          <h3 className={`font-bold tracking-wide ${isLarge ? 'text-[15px]' : 'text-[13px]'} ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>{title}</h3>
        </div>
        <div className={`relative z-10 mt-auto flex items-baseline gap-1 ${isLarge ? 'pb-2' : ''}`}>
          <span className={`font-black tracking-tight ${isLarge ? 'text-5xl' : 'text-4xl'} ${isActive ? 'text-indigo-600' : 'text-slate-800'}`}>{value}</span>
          <span className={`text-sm font-semibold ${isActive ? 'text-indigo-400' : 'text-slate-400'}`}>{unit}</span>
        </div>
        <div className={`absolute right-4 bottom-2 pointer-events-none transition-all duration-500 ${isLarge ? 'w-28 h-28' : 'w-24 h-24'} ${isActive ? 'opacity-100 scale-105' : 'opacity-80 group-hover:scale-105 group-hover:opacity-100'}`}>
          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${illustration}&backgroundColor=transparent`} alt="illus" className="w-full h-full object-contain mix-blend-multiply" />
        </div>
      </div>
    );
  };

  const MonitorStatCard = ({ title, icon: Icon, stats, filterKey, illustration }) => {
    const isActive = activeFilter === filterKey;
    const total = stats.normal + stats.warning + stats.expired;
    const pNormal = total === 0 ? 0 : (stats.normal / total) * 100;
    const pWarning = total === 0 ? 0 : (stats.warning / total) * 100;
    const pExpired = total === 0 ? 0 : (stats.expired / total) * 100;

    return (
      <div 
        onClick={() => setActiveFilter(isActive ? 'all' : filterKey)}
        className={`relative overflow-hidden rounded-[2rem] p-6 h-[276px] transition-all duration-300 cursor-pointer flex flex-col border
        ${isActive ? 'bg-white border-rose-200 ring-4 ring-rose-500/10 shadow-[0_10px_30px_rgb(225,29,72,0.1)] -translate-y-1' : 'bg-white border-white/80 hover:border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)]'}`}
      >
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
            <Icon className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <h3 className={`text-[14px] font-bold tracking-wide ${isActive ? 'text-rose-600' : 'text-slate-600'}`}>{title}</h3>
        </div>
        <div className="relative z-10 mt-6 flex items-baseline gap-1.5">
          <span className={`text-5xl font-black tracking-tight ${isActive ? 'text-rose-600' : 'text-slate-800'}`}>{total}</span>
          <span className="text-sm font-semibold text-slate-400">台</span>
        </div>
        <div className="absolute right-4 top-12 w-24 h-24 opacity-80 pointer-events-none mix-blend-multiply">
          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${illustration}&backgroundColor=transparent`} alt="illus" className="w-full h-full object-contain" />
        </div>
        <div className="mt-auto space-y-4 relative z-10">
          <div className="flex justify-between">
             <div className="flex flex-col gap-1"><div className="flex items-center gap-1.5 text-emerald-500"><CheckCircle2 className="w-3.5 h-3.5"/> <span className="text-[12px] font-bold">正常</span></div><span className="text-[16px] font-extrabold text-slate-800">{stats.normal}</span></div>
             <div className="flex flex-col gap-1"><div className="flex items-center gap-1.5 text-amber-500"><Clock className="w-3.5 h-3.5"/> <span className="text-[12px] font-bold">临期</span></div><span className="text-[16px] font-extrabold text-slate-800">{stats.warning}</span></div>
             <div className="flex flex-col gap-1"><div className="flex items-center gap-1.5 text-rose-500"><XCircle className="w-3.5 h-3.5"/> <span className="text-[12px] font-bold">脱审</span></div><span className="text-[16px] font-extrabold text-slate-800">{stats.expired}</span></div>
          </div>
          <div className="flex w-full h-[6px] rounded-full overflow-hidden bg-slate-100 gap-[2px]">
            {pNormal > 0 && <div style={{width: `${pNormal}%`}} className="bg-emerald-400"></div>}
            {pWarning > 0 && <div style={{width: `${pWarning}%`}} className="bg-amber-400"></div>}
            {pExpired > 0 && <div style={{width: `${pExpired}%`}} className="bg-rose-500 relative overflow-hidden"><div className="absolute inset-0 bg-white/30 animate-pulse"></div></div>}
          </div>
        </div>
      </div>
    );
  };

  // 🌟 修复：彻底移除了 <option> 上的 selected，只使用 <select> 上的 defaultValue
  const FormField = ({ label, type = 'text', required = false, placeholder, options = [], width = 'col-span-1', defaultValue = "" }) => (
    <div className={`flex flex-col gap-2 ${width} group`}>
      <label className="text-[13px] font-bold text-slate-600 flex items-center gap-1 transition-colors group-focus-within:text-indigo-600">
        {required && <span className="text-rose-500 translate-y-[1px]">*</span>}
        {label}
      </label>
      <div className="relative">
        {type === 'select' ? (
          <>
            <select defaultValue={defaultValue || ""} className="w-full bg-slate-50/80 border border-slate-200/60 hover:border-indigo-300 rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white shadow-sm appearance-none cursor-pointer transition-all">
              <option value="" disabled hidden>{placeholder || '请选择'}</option>
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
          </>
        ) : type === 'date' ? (
          <>
            <input type="text" defaultValue={defaultValue} className="w-full bg-slate-50/80 border border-slate-200/60 hover:border-indigo-300 rounded-2xl pl-5 pr-10 py-3.5 text-[14px] font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white shadow-sm transition-all placeholder:text-slate-400" placeholder={placeholder || '请选择日期'} />
            <CalendarDays className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
          </>
        ) : (
          <input type={type} defaultValue={defaultValue} className="w-full bg-slate-50/80 border border-slate-200/60 hover:border-indigo-300 rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white shadow-sm transition-all placeholder:text-slate-400" placeholder={placeholder || '请输入'} />
        )}
      </div>
    </div>
  );

  const ImageUploadBox = ({ title, subTitle }) => (
    <div className="flex flex-col gap-2 group cursor-pointer h-full">
      <div className="flex-1 min-h-[140px] bg-slate-50/50 rounded-[1.5rem] border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center gap-3 relative overflow-hidden p-4">
        <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
          <Plus className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </div>
        <div className="text-center relative z-10">
          <p className="text-[14px] font-extrabold text-slate-600 group-hover:text-indigo-600 transition-colors">{title}</p>
          {subTitle && <p className="text-[12px] font-bold text-slate-400 mt-0.5">{subTitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full font-sans text-slate-800 relative selection:bg-indigo-200 selection:text-indigo-900">
      
      <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-indigo-300/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-300/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full space-y-6 relative z-10">
        
        {/* ========================================== */}
        {/* 顶部导航 & 动作区 */}
        {/* ========================================== */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-xl rounded-[1.5rem] shadow-sm border border-white flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-indigo-500/20 group-hover:scale-105">
               <Truck className="w-8 h-8 text-indigo-600 transition-transform duration-500 group-hover:-rotate-12" strokeWidth={2} />
            </div>
            <div>
               <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">车辆档案管理中心</h1>
               <p className="text-[13px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Vehicle Management Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md p-1.5 rounded-3xl border border-white shadow-sm">
             <div className="flex items-center">
                <button className="flex items-center gap-2 bg-transparent text-slate-600 px-5 py-2.5 rounded-2xl hover:bg-white hover:text-indigo-600 transition-all font-bold text-[14px] hover:shadow-sm">
                  <FileInput className="w-4 h-4" /><span>挂车导入</span>
                </button>
                <button className="flex items-center gap-2 bg-transparent text-slate-600 px-5 py-2.5 rounded-2xl hover:bg-white hover:text-indigo-600 transition-all font-bold text-[14px] hover:shadow-sm">
                  <FileInput className="w-4 h-4" /><span>牵引车导入</span>
                </button>
             </div>
             
             <div className="w-px h-6 bg-slate-300/50 mx-1"></div>
             
             <div className="flex items-center gap-2">
                <button onClick={() => openCreateForm('trailer')} className="flex items-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-100 px-5 py-2.5 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all font-bold text-[14px] shadow-sm hover:shadow-indigo-600/20">
                  <Plus className="w-4 h-4" /><span>新建挂车</span>
                </button>
                <button onClick={() => openCreateForm('tractor')} className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-2xl hover:bg-indigo-600 transition-all font-bold text-[14px] shadow-sm hover:shadow-indigo-600/20">
                  <Plus className="w-4 h-4" /><span>新建牵引车</span>
                </button>
             </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 1. 结构与安全监控仪表盘 */}
        {/* ========================================== */}
        <div className="grid grid-cols-12 gap-8 mb-4">
          <div className="col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1"><div className="w-1.5 h-4 bg-indigo-500 rounded-full shadow-sm shadow-indigo-500/30"></div><span className="text-[14px] font-bold text-slate-500 tracking-wide">运力结构组成</span></div>
            <BasicStatCard title="车辆总数量 (全部)" value="261" unit="台" icon={Users} filterKey="all" illustration="peeps-1" isLarge={true} />
            <div className="grid grid-cols-2 gap-4">
               <BasicStatCard title="自有车辆" value="156" unit="台" icon={Car} filterKey="own" illustration="peeps-2" />
               <BasicStatCard title="外调车辆" value="105" unit="台" icon={Route} filterKey="external" illustration="peeps-3" />
            </div>
          </div>
          <div className="col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1"><div className="w-1.5 h-4 bg-rose-500 rounded-full shadow-sm shadow-rose-500/30"></div><span className="text-[14px] font-bold text-slate-500 tracking-wide">证件效期安全监控看板</span></div>
            <div className="grid grid-cols-3 gap-5">
              <MonitorStatCard title="行驶证有效监控" icon={IdCard} filterKey="warning_license" illustration="peeps-4" stats={{ normal: 9, warning: 0, expired: 1 }} />
              <MonitorStatCard title="机动车驾驶证监控" icon={Car} filterKey="warning_cert" illustration="peeps-5" stats={{ normal: 8, warning: 1, expired: 1 }} />
              <MonitorStatCard title="道路从业资格证监控" icon={FileCheck} filterKey="warning_insurance" illustration="peeps-6" stats={{ normal: 8, warning: 1, expired: 1 }} />
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 🌟 2. 沉浸式 Active Banner (还原截图蓝色横幅) */}
        {/* ========================================== */}
        <div className={`transition-all duration-500 ease-out origin-top ${activeFilter !== 'all' ? 'opacity-100 h-auto translate-y-0 pb-6' : 'opacity-0 h-0 -translate-y-4 overflow-hidden pointer-events-none'}`}>
          <div className="bg-indigo-600 rounded-2xl px-6 py-5 flex items-center justify-between shadow-xl shadow-indigo-600/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[16px] tracking-wide">正在查看【{FILTER_DICT[activeFilter]}】分类的车辆名单</span>
                <span className="text-indigo-100/80 font-medium text-[13px] mt-0.5">共筛选出 {filteredVehicles.length} 条符合条件的记录</span>
              </div>
            </div>
            <button onClick={() => setActiveFilter('all')} className="flex items-center gap-2 bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-[14px] hover:bg-slate-50 transition-all shadow-sm hover:scale-105 active:scale-95">
              <RefreshCw className="w-4 h-4" /> 清除筛选
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* 3. 高密度搜索与过滤舱 */}
        {/* ========================================== */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] shadow-xl shadow-slate-200/40 p-8 flex flex-col gap-6 transition-all">
          <div className="grid grid-cols-4 xl:grid-cols-8 gap-5">
            {[
              { label: '关注状态', type: 'select', options: ['全部', '未关注', '已关注'] },
              { label: '车牌号码', type: 'input', placeholder: '如: 皖A233363' },
              { label: '车辆 VIN 码', type: 'input', placeholder: '精准搜索' },
              { label: '车辆状态', type: 'select', options: ['全部', '运输中', '空闲中'] },
              { label: '车辆来源', type: 'select', options: ['全部', '自有', '外调', '外采二手'] },
              { label: '年检有效期', type: 'date', placeholder: '选择日期' },
              { label: '运输证有效期', type: 'date', placeholder: '选择日期' },
              { label: '交强险日期', type: 'date', placeholder: '选择日期' },
            ].map((field, idx) => (
              <div key={idx} className="space-y-2 group">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1 group-focus-within:text-indigo-600 transition-colors">{field.label}</label>
                <div className="relative">
                  {field.type === 'select' ? (
                    <><select defaultValue="" className="w-full bg-white/60 border border-slate-200/60 hover:border-indigo-200 rounded-2xl px-4 py-3 text-[13px] font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white shadow-sm appearance-none cursor-pointer transition-all"><option value="" disabled hidden>请选择</option>{field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select><ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" /></>
                  ) : field.type === 'date' ? (
                    <><input className="w-full bg-white/60 border border-slate-200/60 hover:border-indigo-200 rounded-2xl pl-4 pr-9 py-3 text-[13px] font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white shadow-sm transition-all placeholder:text-slate-400" placeholder={field.placeholder} /><CalendarDays className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" /></>
                  ) : (
                    <input className="w-full bg-white/60 border border-slate-200/60 hover:border-indigo-200 rounded-2xl px-4 py-3 text-[13px] font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white shadow-sm transition-all placeholder:text-slate-400" placeholder={field.placeholder} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-start pt-6 border-t border-slate-200/60">
             <div className="flex items-center gap-4">
                <button className="px-8 py-3.5 bg-indigo-600 text-white text-[14px] font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"><Search className="w-4 h-4" /> 立即查询</button>
                <button className="px-8 py-3.5 bg-white text-slate-600 text-[14px] font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 border border-slate-200 shadow-sm hover:text-slate-800"><RefreshCw className="w-4 h-4" /> 重置条件</button>
             </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 4. 数据呈现区 */}
        {/* ========================================== */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-white overflow-hidden min-h-[500px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-6 w-16 text-center">序号</th>
                <th className="px-2 py-6 w-12 text-center">关注</th>
                <th className="px-5 py-6">车牌号</th>
                <th className="px-5 py-6">车辆来源</th>
                <th className="px-5 py-6">车辆类型</th>
                <th className="px-5 py-6">所属项目</th>
                <th className="px-5 py-6 min-w-[180px]">车辆信息</th>
                <th className="px-5 py-6">车辆状态</th>
                <th className="px-5 py-6">接车司机</th>
                <th className="px-5 py-6">当前运单</th>
                <th className="px-5 py-6 min-w-[160px]">资质效期</th>
                <th className="px-6 py-6 text-right min-w-[140px]">操作管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              {filteredVehicles.length > 0 ? filteredVehicles.map((v, index) => (
                <tr key={v.id} onClick={() => setActiveVehicle(v)} className="hover:bg-indigo-50/40 transition-colors duration-300 group cursor-pointer relative">
                  <td className="px-6 py-5 text-center text-[13px] font-semibold text-slate-400 group-hover:text-indigo-400 transition-colors">{index + 1}</td>
                  <td className="px-2 py-5 text-center" onClick={(e) => toggleFavorite(v.id, e)}>
                    <Star className={`w-5 h-5 mx-auto transition-all duration-300 hover:scale-125 ${v.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-300 hover:text-amber-400'}`} />
                  </td>
                  <td className="px-5 py-5"><span className="inline-flex px-3.5 py-1.5 bg-indigo-50/50 text-indigo-700 border border-indigo-100 rounded-xl text-[14px] font-extrabold shadow-sm tracking-wider font-mono">{v.plate}</span></td>
                  <td className="px-5 py-5"><SourceBadge source={v.source} /></td>
                  <td className="px-5 py-5 text-[14px] font-bold text-slate-700">{v.type}</td>
                  <td className="px-5 py-5">
                    <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 whitespace-nowrap">
                      {v.projectCompany}
                    </span>
                  </td>
                  <td className="px-5 py-5 flex flex-col gap-1 justify-center">
                    <span className="text-[12px] font-bold text-slate-400 tracking-wider font-mono">{v.vin}</span>
                    <span className="text-[13px] font-semibold text-slate-700">{v.engineNo}</span>
                  </td>
                  <td className="px-5 py-5"><StatusBadge status={v.status} /></td>
                  
                  <td className="px-5 py-5">
                    {v.boundDriver ? (
                      <div className="flex items-center gap-3 p-1.5 -ml-1.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 shadow-sm overflow-hidden shrink-0">
                          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${v.boundDriver.avatar}&backgroundColor=f8fafc`} alt={v.boundDriver.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-slate-800">{v.boundDriver.name}</span>
                          <span className="text-[11px] font-semibold text-slate-400">{v.boundDriver.phone}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center">
                        <span className="text-[14px] font-bold text-slate-400">-</span>
                        <span className="text-[11px] font-medium text-slate-400">暂无接车</span>
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-5">
                    {v.driverId && v.driverId !== '-' ? (
                      <span onClick={(e) => e.stopPropagation()} className="text-[13px] font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer border-b border-dashed border-slate-300 hover:border-indigo-400 pb-0.5">{v.driverId}</span>
                    ) : (
                      <span className="text-slate-400 font-bold">-</span>
                    )}
                  </td>
                  
                  <td className="px-5 py-5">
                    <div className="flex flex-col gap-1.5 bg-slate-50/50 p-2 rounded-xl border border-slate-100 shadow-inner">
                      <div className="flex justify-between items-center text-[11px]"><span className="text-slate-400 font-bold">年检</span><span className="text-slate-700 font-extrabold">{v.annualExpiry}</span></div>
                      <div className="flex justify-between items-center text-[11px]"><span className="text-slate-400 font-bold">运证</span><span className="text-slate-700 font-extrabold">{v.transportCertExpiry}</span></div>
                      <div className="flex justify-between items-center text-[11px]"><span className="text-slate-400 font-bold">交强险</span><span className="text-indigo-600 font-extrabold bg-indigo-50 px-1.5 rounded">{v.insuranceExpiry}</span></div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5 text-right align-middle" onClick={e => e.stopPropagation()}>
                     <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => setActiveVehicle(v)} className="p-2.5 text-indigo-500 bg-indigo-50/50 hover:bg-indigo-100 rounded-xl transition-all shadow-sm border border-indigo-100 hover:scale-110 active:scale-95" title="查看档案"><Eye className="w-4 h-4" strokeWidth={2.5} /></button>
                        <button onClick={(e) => openEditForm(v, e)} className="p-2.5 text-blue-500 bg-blue-50/50 hover:bg-blue-100 rounded-xl transition-all shadow-sm border border-blue-100 hover:scale-110 active:scale-95" title="编辑信息"><Edit className="w-4 h-4" strokeWidth={2.5} /></button>
                        <button className="p-2.5 text-rose-500 bg-rose-50/50 hover:bg-rose-100 rounded-xl transition-all shadow-sm border border-rose-100 hover:scale-110 active:scale-95" title="删除记录"><Trash2 className="w-4 h-4" strokeWidth={2.5} /></button>
                     </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="11" className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center justify-center gap-4">
                         <div className="w-24 h-24 opacity-30 mix-blend-multiply"><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=empty&backgroundColor=transparent`} alt="empty" /></div>
                         <p className="text-slate-400 font-bold text-sm">当前分类下没有找到对应的车辆记录</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* ========================================================= */}
      {/* 🚀 侧滑抽屉：完整恢复的【车辆全景数字档案】 */}
      {/* ========================================================= */}
      {activeVehicle && !formMode && (
        <>
          <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 animate-in fade-in duration-300" onClick={() => setActiveVehicle(null)}></div>
          <div className="fixed top-0 right-0 h-full w-[980px] bg-[#f8fafc] shadow-2xl z-50 animate-in slide-in-from-right duration-500 flex flex-col border-l border-white overflow-hidden">
             
             {/* Drawer Header */}
             <div className="px-10 py-6 border-b border-slate-200/60 bg-white/80 backdrop-blur-md flex justify-between items-center shrink-0 shadow-sm relative z-20">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30">
                   <FileText className="w-5 h-5" />
                 </div>
                 <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">车辆全景数字档案</h2>
               </div>
               <button onClick={() => setActiveVehicle(null)} className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-colors text-slate-400 border border-slate-200 shadow-sm">
                 <X className="w-5 h-5" />
               </button>
             </div>

             {/* Drawer Body */}
             <div className="flex-1 overflow-y-auto p-10 space-y-8 relative scroll-smooth">
               {/* 装饰大背景 */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px] pointer-events-none"></div>

               {/* Title Row with Big Illustration */}
               <div className="flex items-center justify-between bg-white p-8 rounded-[2.5rem] border border-white shadow-[0_10px_40px_rgb(0,0,0,0.04)] relative z-10 overflow-hidden group">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-10 pointer-events-none mix-blend-multiply group-hover:scale-110 transition-transform duration-700">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=dashboard&backgroundColor=transparent`} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex items-center gap-6 relative z-10">
                   <div className="p-5 bg-indigo-50 rounded-[2rem] border border-indigo-100 shadow-inner group-hover:-translate-y-1 transition-transform">
                     <Truck className="w-10 h-10 text-indigo-600" />
                   </div>
                   <div className="flex flex-col">
                      <div className="flex items-center gap-4 mb-2">
                         <h1 className="text-4xl font-black text-slate-800 tracking-tight font-mono">{activeVehicle.plate}</h1>
                         <StatusBadge status={activeVehicle.status} />
                         <SourceBadge source={activeVehicle.source} />
                      </div>
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                        VIN: {activeVehicle.vin} <span className="w-1 h-1 rounded-full bg-slate-300"></span> Type: {activeVehicle.type}
                      </span>
                   </div>
                 </div>
               </div>

               {/* Module 1: 合规监控仪表盘 */}
               <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] relative z-10">
                 <div className="flex justify-between items-center mb-8">
                    <SectionTitle icon={ShieldCheck} title="合规事项监控" color="text-indigo-600" />
                    <span className="text-[12px] font-bold px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 shadow-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> 所有证件状态正常
                    </span>
                 </div>
                 <div className="flex justify-around px-4">
                   <CircularGauge title="年检有效期" days="80" dateStr={activeVehicle.annualExpiry} colorClass="text-blue-500" />
                   <CircularGauge title="道路运输证" days="125" dateStr={activeVehicle.transportCertExpiry} colorClass="text-indigo-500" />
                   <CircularGauge title="交强险有效期" days="200" dateStr={activeVehicle.insuranceExpiry} colorClass="text-emerald-500" />
                   <CircularGauge title="商业险有效期" days="暂无" dateStr="" colorClass="text-slate-300" />
                 </div>
               </div>

               {/* Module 2 & 3: 基本信息与技术参数 */}
               <div className="grid grid-cols-2 gap-8 relative z-10">
                 <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] flex flex-col">
                   <SectionTitle icon={Info} title="车辆基本属性" color="text-indigo-600" />
                   <div className="grid grid-cols-2 gap-y-6 gap-x-6 px-1">
                     <DataField label="车辆品牌" value={activeVehicle.brand} />
                     <DataField label="电池类型" value={activeVehicle.batteryType} />
                     <DataField label="客车车架号" value={activeVehicle.busVin} />
                     <DataField label="牵引车架号" value={activeVehicle.tractorVin} />
                     <DataField label="电池容量" value={activeVehicle.batteryCapacity} valueClass="text-emerald-600" />
                     <DataField label="发证日期" value={activeVehicle.certDate} />
                     <div className="col-span-2 mt-2">
                       <DataField label="道路运输证号" value={activeVehicle.transportCertNo} valueClass="text-lg tracking-widest text-indigo-700 bg-indigo-50 px-5 py-3 rounded-2xl inline-block border border-indigo-100 font-mono shadow-inner" />
                     </div>
                   </div>
                 </div>

                 <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] flex flex-col">
                   <SectionTitle icon={Car} title="技术规格参数" color="text-indigo-600" />
                   <div className="grid grid-cols-2 gap-y-6 gap-x-6 px-1">
                     <DataField label="使用性质" value={activeVehicle.usageNature} />
                     <DataField label="车辆颜色" value={activeVehicle.vehicleColor} />
                     <DataField label="外廓尺寸 (mm)" value={activeVehicle.dimensions} />
                     <DataField label="轴数" value={activeVehicle.axes} />
                     <DataField label="总质量 (kg)" value={activeVehicle.totalWeight} />
                     <DataField label="整备质量 (kg)" value={activeVehicle.curbWeight} />
                     <DataField label="强制报废时间" value={activeVehicle.scrapExpiry} valueClass="text-rose-600 bg-rose-50 px-2 py-1 rounded-md" />
                     <DataField label="二级维护到期" value={activeVehicle.maintenanceExpiry} />
                   </div>
                 </div>
               </div>

               {/* Module 4 & 5: 司机与证件 */}
               <div className="grid grid-cols-5 gap-8 relative z-10">
                 
                 {/* 当前绑定司机 (融入插画) */}
                 <div className="col-span-2 bg-gradient-to-br from-indigo-50 to-white rounded-[2.5rem] p-8 border border-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] flex flex-col relative overflow-hidden group">
                   <div className="flex justify-between items-center mb-8 relative z-10">
                     <SectionTitle icon={UserCheck} title="接车司机记录" color="text-indigo-600" />
                   </div>
                   {activeVehicle.boundDriver ? (
                     <div className="flex-1 flex flex-col justify-between relative z-10">
                       <div className="flex flex-col items-center gap-4 text-center">
                         <div className="w-28 h-28 rounded-[2rem] bg-white border-4 border-white shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                           <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${activeVehicle.boundDriver.avatar}&backgroundColor=f1f5f9`} className="w-full h-full object-cover" />
                         </div>
                         <div className="space-y-1 mt-2">
                           <div className="flex items-center justify-center gap-2">
                             <span className="text-2xl font-extrabold text-slate-800">{activeVehicle.boundDriver.name}</span>
                             <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-[11px] font-bold uppercase">{activeVehicle.boundDriver.gender}</span>
                           </div>
                           <p className="text-sm font-bold text-slate-500">{activeVehicle.boundDriver.id}</p>
                         </div>
                       </div>
                       
                       <div className="bg-white/60 p-5 rounded-2xl space-y-3 mt-6 border border-white">
                         <div className="text-[13px] font-semibold text-slate-600 flex items-center gap-3"><Phone className="w-4 h-4 text-indigo-500"/> {activeVehicle.boundDriver.phone}</div>
                         <div className="text-[13px] font-semibold text-slate-600 flex items-center gap-3"><IdCard className="w-4 h-4 text-indigo-500"/> {activeVehicle.boundDriver.idCard}</div>
                       </div>
                     </div>
                   ) : (
                     <div className="flex-1 flex flex-col items-center justify-center text-sm font-bold text-slate-400 bg-white/50 rounded-3xl border border-dashed border-slate-200">
                       <UserCheck className="w-12 h-12 text-slate-300 mb-3" strokeWidth={1.5} />
                       暂无接车司机
                     </div>
                   )}
                 </div>

                 {/* 车辆证件资质 */}
                 <div className="col-span-3 bg-white rounded-[2.5rem] p-8 border border-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] flex flex-col relative z-10">
                   <SectionTitle icon={FileBadge} title="核心资质电子扫描件" color="text-indigo-600" />
                   <div className="flex gap-8 border-b border-slate-100 mb-8 pb-3 px-2">
                     <span className="text-[15px] font-extrabold text-indigo-600 border-b-[3px] border-indigo-600 pb-3 -mb-[15px] cursor-pointer">机动车行驶证</span>
                     <span className="text-[15px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">道路运输证</span>
                   </div>
                   <div className="flex-1 flex gap-6">
                     <div className="flex-1 bg-slate-50 rounded-[2rem] overflow-hidden group cursor-pointer relative border-2 border-slate-100 hover:border-indigo-200 transition-colors p-2">
                        <div className="w-full h-full rounded-2xl overflow-hidden relative">
                          <img src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-white text-[15px] font-bold gap-2">
                            <Eye className="w-5 h-5"/> 点击预览大图
                          </div>
                        </div>
                     </div>
                     <div className="flex-1 bg-slate-50 rounded-[2rem] overflow-hidden group cursor-pointer relative border-2 border-slate-100 hover:border-indigo-200 transition-colors p-2 flex flex-col items-center justify-center border-dashed">
                        <Upload className="w-8 h-8 text-slate-300 mb-3 group-hover:text-indigo-400 transition-colors" />
                        <span className="text-[13px] font-bold text-slate-400 group-hover:text-indigo-500">上传副页扫描件</span>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Module 6: 运单记录 */}
               <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] relative z-10">
                 <SectionTitle icon={Route} title="近三十天动态运单履历" color="text-indigo-600" />
                 <div className="space-y-5">
                   {activeVehicle.waybills && activeVehicle.waybills.length > 0 ? activeVehicle.waybills.map((bill, idx) => (
                     <div key={idx} className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                       <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100"><FileText className="w-5 h-5"/></div>
                           <span className="text-[16px] font-extrabold text-slate-800 tracking-wide font-mono">{bill.id}</span>
                           <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-[12px] font-bold ml-2">{bill.status}</span>
                           <span className="text-[12px] font-bold text-slate-500 ml-4 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-200">{bill.project}</span>
                           <span className="text-[12px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">{bill.mileage}</span>
                         </div>
                         <span className="text-[13px] font-bold text-slate-400 flex items-center gap-2"><Clock className="w-4 h-4" /> {bill.time}</span>
                       </div>
                       
                       <div className="flex items-center justify-between pl-[3.25rem]">
                         <div className="space-y-5 flex-1 relative">
                           {/* 连接线 */}
                           <div className="absolute left-[3px] top-3 bottom-3 w-[2px] bg-slate-200 border-l border-dashed border-slate-300"></div>
                           
                           <div className="flex items-start gap-5 relative z-10">
                             <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-800 ring-4 ring-slate-100"></div>
                             <div>
                               <p className="text-[15px] font-extrabold text-slate-800">{bill.from}</p>
                               <p className="text-[13px] font-medium text-slate-500 mt-1 max-w-md truncate">{bill.fromAddr}</p>
                             </div>
                           </div>
                           <div className="flex items-start gap-5 relative z-10">
                             <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-4 ring-indigo-50"></div>
                             <div>
                               <p className="text-[15px] font-extrabold text-slate-800">{bill.to}</p>
                               <p className="text-[13px] font-medium text-slate-500 mt-1 max-w-md truncate">{bill.toAddr}</p>
                             </div>
                           </div>
                         </div>
                         <button className="px-6 py-3 text-[14px] font-bold text-slate-600 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">查看运单详情</button>
                       </div>
                     </div>
                   )) : (
                     <div className="py-20 text-center flex flex-col items-center gap-5 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-5 mix-blend-multiply pointer-events-none flex items-center justify-center">
                          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=empty&backgroundColor=transparent`} className="w-48 h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 relative z-10">
                          <Route className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                        </div>
                        <span className="text-[15px] font-bold text-slate-400 relative z-10">近三十天暂无运单记录</span>
                     </div>
                   )}
                 </div>
               </div>

             </div>
          </div>
        </>
      )}

      {/* 🌟 新建/编辑车辆表单抽屉 (高度定制化挂车表单) */}
      {formMode && (
         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-in fade-in flex justify-end" onClick={() => setFormMode(null)}>
            <div className="h-full w-[960px] bg-[#f8fafc] shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col border-l border-white" onClick={e=>e.stopPropagation()}>
               
               {/* 表单头部 */}
               <div className="px-10 py-6 border-b border-slate-200/60 bg-white/90 backdrop-blur-md flex justify-between items-center relative z-20 shadow-sm shrink-0">
                 <div className="flex items-center gap-4">
                   <div className={`p-3 text-white rounded-2xl shadow-lg ${formMode.includes('create') ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-indigo-500/30' : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30'}`}>
                     {formMode.includes('create') ? <Plus className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                   </div>
                   <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                     {formMode === 'create_tractor' ? '新增牵引车' : formMode === 'create_trailer' ? '新增挂车' : '编辑车辆信息'}
                   </h2>
                 </div>
                 <button onClick={() => setFormMode(null)} className="p-2.5 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-full transition-colors border border-slate-200 shadow-sm">
                   <X className="w-5 h-5" />
                 </button>
               </div>

               {/* 表单内容区 */}
               <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-8 relative scroll-smooth custom-scrollbar">
                 {/* 装饰背景 */}
                 <div className="absolute right-[-10%] top-[5%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none"></div>

                 {formMode === 'create_trailer' || (formMode === 'edit' && editingData?.type === '挂车') ? (
                   /* 挂车专属表单布局 (完美还原截图字段) */
                   <>
                     {/* Card 1: 核心基础信息 */}
                     <div className="bg-white p-8 rounded-[2rem] border border-white shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative z-10">
                       <SectionTitle icon={Car} title="核心基础信息" color="text-indigo-600" />
                       <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                         <FormField label="所属项目公司" type="select" required options={['项目一公司', '项目二公司', '项目三公司']} defaultValue={editingData?.projectCompany} />
                         <FormField label="车牌号" required placeholder="请输入" defaultValue={editingData?.plate} />
                         <FormField label="车辆VIN码" required placeholder="请输入" defaultValue={editingData?.vin} />
                         <FormField label="车辆来源" type="select" required options={['自有', '外调', '外采二手']} defaultValue={editingData?.source} />
                         <FormField label="车辆类型" type="select" required options={['牵引车', '挂车']} defaultValue="挂车" />
                         <FormField label="挂车类型" type="select" required options={['仓栅式', '平板式', '自卸式']} />
                         <FormField label="挂车所有人" type="select" required options={['公司A', '公司B']} />
                         <FormField label="挂车品牌" type="select" options={['品牌A', '品牌B']} />
                         <FormField label="挂车供应商" type="select" options={['供应商A', '供应商B']} />
                         <FormField label="使用性质" type="select" options={['货运', '客运', '非营运']} />
                         <FormField label="车牌颜色" type="select" options={['黄色', '蓝色', '绿色']} defaultValue={editingData?.vehicleColor} />
                       </div>
                     </div>

                     {/* Card 2: 技术规格参数 */}
                     <div className="bg-white p-8 rounded-[2rem] border border-white shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative z-10">
                       <SectionTitle icon={Info} title="技术规格参数" color="text-indigo-600" />
                       <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                         <FormField label="轴数" type="select" options={['2轴', '3轴', '4轴']} defaultValue={editingData?.axes} />
                         <FormField label="外廓尺寸(mm)" placeholder="请输入" defaultValue={editingData?.dimensions} />
                         <FormField label="总质量(kg)" type="number" placeholder="请输入" defaultValue={editingData?.totalWeight} />
                         <FormField label="整备质量(kg)" type="number" placeholder="请输入" defaultValue={editingData?.curbWeight} />
                         <FormField label="核定载质量(kg)" type="number" placeholder="请输入" defaultValue={editingData?.approvedWeight} />
                         <FormField label="车长(米)" type="number" placeholder="请输入" />
                       </div>
                     </div>

                     {/* Card 3: 资质与保险效期 */}
                     <div className="bg-white p-8 rounded-[2rem] border border-white shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative z-10">
                       <SectionTitle icon={ShieldCheck} title="资质证件效期" color="text-indigo-600" />
                       <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                         <FormField label="注册日期" type="date" required defaultValue={editingData?.registerDate} />
                         <FormField label="发证日期" type="date" required defaultValue={editingData?.certDate} />
                         <FormField label="检验有效期" type="date" required defaultValue={editingData?.annualExpiry} />
                         <FormField label="道路运输证号" required placeholder="请输入" defaultValue={editingData?.transportCertNo} />
                         <FormField label="道路运输证有效期至" type="date" required defaultValue={editingData?.transportCertExpiry} />
                         <FormField label="发证机关" placeholder="请输入" />
                         <FormField label="二级维修时间" type="date" defaultValue={editingData?.maintenanceExpiry} />
                         <FormField label="强制报废期止" type="date" defaultValue={editingData?.scrapExpiry} />
                       </div>
                     </div>
                   </>
                 ) : (
                   /* 牵引车专属表单布局 */
                   <>
                     {/* Card 1: 核心基础信息 */}
                     <div className="bg-white p-8 rounded-[2rem] border border-white shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative z-10">
                       <SectionTitle icon={Car} title="核心基础信息" color="text-indigo-600" />
                       <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                         <FormField label="所属项目公司" type="select" required options={['项目一公司', '项目二公司', '项目三公司']} defaultValue={editingData?.projectCompany} />
                         <FormField label="能源类型" type="select" required options={['燃油', '纯电动', '混合动力']} />
                         <FormField label="车牌号" required placeholder="请输入车牌号" defaultValue={editingData?.plate} />
                         <FormField label="车辆VIN码" required placeholder="请输入17位VIN码" defaultValue={editingData?.vin} />
                         <FormField label="车辆来源" type="select" required options={['自有', '外调', '外采二手']} defaultValue={editingData?.source} />
                         <FormField label="车辆类型" type="select" required options={['牵引车', '挂车']} defaultValue="牵引车" />
                         <FormField label="牵引车品牌" type="select" required />
                         <FormField label="牵引车类型" type="select" required />
                         <FormField label="牵引车所有人" type="select" required />
                         <FormField label="使用性质" type="select" options={['货运', '客运', '非营运']} />
                         <FormField label="车牌颜色" type="select" options={['黄色', '蓝色', '绿色', '白色']} defaultValue={editingData?.vehicleColor} />
                       </div>
                     </div>

                     {/* Card 2: 电池与规格参数 */}
                     <div className="bg-white p-8 rounded-[2rem] border border-white shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative z-10">
                       <SectionTitle icon={Info} title="电池与技术规格" color="text-indigo-600" />
                       <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                         <FormField label="电池类型" type="select" required options={['磷酸铁锂', '三元锂', '充换电一体']} defaultValue={editingData?.batteryType} />
                         <FormField label="电池容量" type="select" required options={['282度', '350度', '391度', '420度']} defaultValue={editingData?.batteryCapacity} />
                         <FormField label="轴数" type="select" options={['2轴', '3轴', '4轴', '5轴', '6轴及以上']} defaultValue={editingData?.axes} />
                         <FormField label="外廓尺寸(mm)" placeholder="长 * 宽 * 高" defaultValue={editingData?.dimensions} />
                         <FormField label="总质量(kg)" type="number" placeholder="请输入" defaultValue={editingData?.totalWeight} />
                         <FormField label="整备质量(kg)" type="number" placeholder="请输入" defaultValue={editingData?.curbWeight} />
                         <FormField label="核定载质量(kg)" type="number" placeholder="请输入" defaultValue={editingData?.approvedWeight} />
                         <FormField label="车长(米)" type="number" placeholder="请输入" />
                         <FormField label="准牵引总质量(Kg)" type="number" placeholder="请输入" width="col-span-2" />
                       </div>
                     </div>

                     {/* Card 3: 资质与保险效期 */}
                     <div className="bg-white p-8 rounded-[2rem] border border-white shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative z-10">
                       <SectionTitle icon={ShieldCheck} title="资质与保险效期" color="text-indigo-600" />
                       <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                         <FormField label="注册日期" type="date" required defaultValue={editingData?.registerDate} />
                         <FormField label="发证日期" type="date" required defaultValue={editingData?.certDate} />
                         <FormField label="发证机关" placeholder="请输入发证机关全称" width="col-span-2" />
                         
                         <div className="col-span-2 h-px bg-slate-100 my-2"></div>
                         
                         <FormField label="检验有效期" type="date" required defaultValue={editingData?.annualExpiry} />
                         <FormField label="交强险日期" type="date" required defaultValue={editingData?.insuranceExpiry} />
                         <FormField label="商业险" type="select" required options={['已购买', '未购买']} />
                         <FormField label="商业险日期" type="date" />
                         
                         <div className="col-span-2 h-px bg-slate-100 my-2"></div>

                         <FormField label="道路运输证号" required placeholder="请输入运输证号" defaultValue={editingData?.transportCertNo} />
                         <FormField label="道路运输证有效期至" type="date" required defaultValue={editingData?.transportCertExpiry} />
                         <FormField label="二级维修时间" type="date" defaultValue={editingData?.maintenanceExpiry} />
                         <FormField label="强制报废期止" type="date" defaultValue={editingData?.scrapExpiry} />
                       </div>
                     </div>
                   </>
                 )}

                 {/* Card 4: 证件影像档案 (挂车与牵引车通用) */}
                 <div className="bg-white p-8 rounded-[2rem] border border-white shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative z-10 flex flex-col gap-8">
                   <div>
                     <SectionTitle icon={IdCard} title="行驶证信息" color="text-slate-700" />
                     <div className="grid grid-cols-2 gap-6 pl-2">
                       <ImageUploadBox title="行驶证主页" subTitle="点击上传清晰原件" />
                       <ImageUploadBox title="行驶证副页" subTitle="点击上传清晰原件" />
                     </div>
                   </div>
                   
                   <div className="h-px bg-slate-100 w-full"></div>

                   <div>
                     <SectionTitle icon={FileBadge} title="道路运输证信息" color="text-slate-700" />
                     <div className="grid grid-cols-2 gap-6 pl-2">
                       <ImageUploadBox title="道路运输证照片" subTitle="点击上传清晰原件" />
                       <ImageUploadBox title="有效期照片" subTitle="包含有效期的内页盖章页" />
                     </div>
                   </div>
                 </div>

               </div>

               {/* 表单底部动作区 */}
               <div className="p-6 bg-white/90 backdrop-blur-md border-t border-slate-200/60 flex justify-end gap-4 shrink-0 relative z-20 shadow-[0_-10px_20px_rgb(0,0,0,0.02)]">
                 <button onClick={() => setFormMode(null)} className="px-10 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold text-[14px] hover:bg-slate-200 transition-all border border-slate-200">
                   取消
                 </button>
                 <button onClick={() => setFormMode(null)} className="px-10 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-[14px] flex items-center gap-2 hover:bg-indigo-700 hover:-translate-y-0.5 shadow-lg shadow-indigo-600/20 transition-all">
                   <Save className="w-4 h-4" /> 确认提交
                 </button>
               </div>

            </div>
         </div>
      )}

    </div>
  );
}