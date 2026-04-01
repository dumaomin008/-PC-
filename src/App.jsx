import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Filter,
  Phone, AlertCircle, CheckCircle2,
  Clock, Edit, Trash2, KeyRound,
  Users, UserCheck, UserPlus, ArrowRight, LayoutGrid, List,
  Car, X, FileText,
  ChevronDown, ImagePlus, Info,
  IdCard, FileBadge, Image as ImageIcon, Eye, ShieldAlert,
  CalendarDays, FileCheck, XCircle,
  MapPin, Truck, UserCog,
  CheckCircle, ShieldX, RefreshCw,
  LayoutDashboard, Settings, PieChart
} from 'lucide-react';
import HomeDashboard from './HomeDashboard.jsx';
import DailyStatsDashboard from './DailyStatsDashboard.jsx';

export default function App() {
  const [viewMode, setViewMode] = useState('list');
  const [liveStatusFilter, setLiveStatusFilter] = useState('');
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [activeDriver, setActiveDriver] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeWaybillDriver, setActiveWaybillDriver] = useState(null);
  const [activeCardFilter, setActiveCardFilter] = useState(null);
  const [resetPwdDriver, setResetPwdDriver] = useState(null);
  const [activeNav, setActiveNav] = useState('home');
  const [expandedParent, setExpandedParent] = useState('');

  // 全新高维度搜索状态
  const [filters, setFilters] = useState({
    name: '',
    id: '',
    phone: '',
    source: '',
    authStatus: '',
    docStatus: ''
  });

  const TODAY = new Date('2026-03-31');

  // 核心数据状态
  const [mockDrivers, setMockDrivers] = useState([
    {
      id: "JKLSJ2610305", name: "罗勇", phone: "13307376006", source: "自有",
      authStatus: "verified", docStatus: "passed", joinDate: "2026-03-25", createTime: "2026-03-25 16:34:23",
      liveStatus: "driving", vehicle: "京A·88888",
      avatarSeed: "Felix", username: "13307376006",
      idCardNo: "430124198805231234", idCardExpiry: "2036-05-23",
      bankCardNo: "6222 0214 5678 1234 567", driverLicenseExpiry: "2030-05-20", qualCertificateExpiry: "2032-11-15",
    },
    {
      id: "JKLSJ2610304", name: "杨雨安", phone: "17755079277", source: "自有",
      authStatus: "authenticating", docStatus: "passed", joinDate: "2026-03-23", createTime: "2026-03-23 09:33:56",
      liveStatus: "idle", vehicle: "沪C·66666",
      avatarSeed: "Aneka", username: "yanguan_driver",
      idCardNo: "310115199208154321", idCardExpiry: "2035-08-15",
      bankCardNo: "6228 4800 1234 5678 901", driverLicenseExpiry: "2029-10-10",
      qualCertificateExpiry: "2026-04-15",
    },
    {
      id: "JKLSJ2610303", name: "宋宜胜", phone: "13955106249", source: "外调",
      authStatus: "unverified", docStatus: "pending", joinDate: "2026-03-23", createTime: "2026-03-23 09:33:32",
      liveStatus: "offline", vehicle: "未绑定",
      avatarSeed: "Jasper", username: "13955106249",
      idCardNo: "340102199512128888", idCardExpiry: "2035-12-12",
      bankCardNo: "6217 0001 2222 3333 444", driverLicenseExpiry: "2028-01-01", qualCertificateExpiry: "2027-06-30",
    },
    {
      id: "JKLSJ2610302", name: "谷自豪", phone: "18337579996", source: "自有",
      authStatus: "verified", docStatus: "passed", joinDate: "2026-03-23", createTime: "2026-03-23 09:13:16",
      liveStatus: "driving", vehicle: "粤B·99999",
      avatarSeed: "Oliver", username: "18337579996",
      idCardNo: "440304199001015678", idCardExpiry: "2030-01-01",
      bankCardNo: "6222 0808 1111 2222 333", driverLicenseExpiry: "2028-08-08", qualCertificateExpiry: "2029-09-09",
    },
    {
      id: "JKLSJ2610301", name: "周辉", phone: "13696765432", source: "外调",
      authStatus: "failed", docStatus: "rejected", joinDate: "2026-03-18", createTime: "2026-03-18 12:29:00",
      liveStatus: "exception", vehicle: "未绑定",
      avatarSeed: "Sam", username: "zhouhui99",
      idCardNo: "330106198511223344", idCardExpiry: "2026-03-10",
      bankCardNo: "6214 8888 9999 0000 111", driverLicenseExpiry: "2031-11-22", qualCertificateExpiry: "2035-12-01",
    },
    {
      id: "JKLSJ2610300", name: "黄金满", phone: "18207709983", source: "自有",
      authStatus: "verified", docStatus: "passed", joinDate: "2026-03-17", createTime: "2026-03-17 09:23:29",
      liveStatus: "idle", vehicle: "京A·66666",
      avatarSeed: "Jack", username: "18207709983",
      idCardNo: "110105197804159999", idCardExpiry: "2038-04-15",
      bankCardNo: "6228 1234 5678 9012 345", driverLicenseExpiry: "2026-04-10",
      qualCertificateExpiry: "2030-05-05",
    },
    {
      id: "JKLSJ2610299", name: "刘强历", phone: "18726877660", source: "外调",
      authStatus: "dl_expired", docStatus: "passed", joinDate: "2026-03-16", createTime: "2026-03-16 17:02:14",
      liveStatus: "driving", vehicle: "苏E·88888",
      avatarSeed: "Leo", username: "18726877660",
      idCardNo: "320501199307081111", idCardExpiry: "2033-07-08",
      bankCardNo: "6222 9876 5432 1098 765", driverLicenseExpiry: "2026-03-15", qualCertificateExpiry: "2031-08-20",
    },
    {
      id: "JKLSJ2610298", name: "朱生夫", phone: "18715576669", source: "自有",
      authStatus: "verified", docStatus: "passed", joinDate: "2026-03-16", createTime: "2026-03-16 17:01:36",
      liveStatus: "offline", vehicle: "未绑定",
      avatarSeed: "Max", username: "zhushengfu",
      idCardNo: "340822198009102222", idCardExpiry: "2040-09-10",
      bankCardNo: "6217 5555 6666 7777 888", driverLicenseExpiry: "2032-12-12", qualCertificateExpiry: "2028-10-01",
    },
    {
      id: "JKLSJ2610297", name: "朱叶飞", phone: "15398220909", source: "自有",
      authStatus: "qc_expired", docStatus: "passed", joinDate: "2026-03-16", createTime: "2026-03-16 17:01:26",
      liveStatus: "driving", vehicle: "川A·12345",
      avatarSeed: "Zoe", username: "15398220909",
      idCardNo: "510107198903033333", idCardExpiry: "2039-03-03",
      bankCardNo: "6228 1122 3344 5566 777", driverLicenseExpiry: "2035-05-05",
      qualCertificateExpiry: "2026-03-20",
    },
    {
      id: "JKLSJ2610296", name: "陈涛", phone: "18726887927", source: "外调",
      authStatus: "unverified", docStatus: "pending", joinDate: "2026-03-16", createTime: "2026-03-16 17:01:15",
      liveStatus: "idle", vehicle: "未绑定",
      avatarSeed: "Toby", username: "chentao_88",
      idCardNo: "420111199610204444", idCardExpiry: "2036-10-20",
      bankCardNo: "6214 9999 8888 7777 666", driverLicenseExpiry: "2030-07-07", qualCertificateExpiry: "2034-04-04",
    }
  ]);

  const getValidityStatus = (dateStr) => {
    if (!dateStr) return 'normal';
    const expiry = new Date(dateStr);
    const diffDays = Math.ceil((expiry - TODAY) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'expired';
    if (diffDays <= 30) return 'warning';
    return 'normal';
  };

  const handleResetFilters = () => {
    setFilters({ name: '', id: '', phone: '', source: '', authStatus: '', docStatus: '' });
    setActiveCardFilter(null);
  };

  const displayedDrivers = useMemo(() => {
    return mockDrivers.filter(driver => {
      // 全新多维度交叉检索逻辑
      if (filters.name && !driver.name.includes(filters.name)) return false;
      if (filters.id && !driver.id.includes(filters.id)) return false;
      if (filters.phone && !driver.phone.includes(filters.phone)) return false;
      if (filters.source && driver.source !== filters.source) return false;
      if (filters.authStatus && driver.authStatus !== filters.authStatus) return false;
      if (filters.docStatus && driver.docStatus !== filters.docStatus) return false;

      if (liveStatusFilter && driver.liveStatus !== liveStatusFilter) return false;

      // 卡片下钻检索
      if (activeCardFilter) {
        if (activeCardFilter.type === 'source') {
           if (activeCardFilter.key === 'own' && driver.source !== '自有') return false;
           if (activeCardFilter.key === 'out' && driver.source === '自有') return false;
        } else if (activeCardFilter.type === 'compliance') {
           const status = getValidityStatus(driver[activeCardFilter.key]);
           if (status === 'normal') return false;
        }
      }
      return true;
    });
  }, [mockDrivers, filters, liveStatusFilter, activeCardFilter]);

  const stats = useMemo(() => {
    const calcDoc = (expiryKey) => {
      let normal = 0, warning = 0, expired = 0;
      mockDrivers.forEach(d => {
        if (!d[expiryKey]) return;
        const status = getValidityStatus(d[expiryKey]);
        if (status === 'expired') expired++;
        else if (status === 'warning') warning++;
        else normal++;
      });
      return { normal, warning, expired };
    };

    return {
      total: mockDrivers.length + 251,
      own: mockDrivers.filter(d => d.source === '自有').length + 150,
      out: mockDrivers.filter(d => d.source !== '自有').length + 101,
      idCard: calcDoc('idCardExpiry'),
      driverLicense: calcDoc('driverLicenseExpiry'),
      qual: calcDoc('qualCertificateExpiry')
    };
  }, [mockDrivers]);

  const toggleSelectAll = () => {
    if (selectedDrivers.length === displayedDrivers.length && displayedDrivers.length > 0) setSelectedDrivers([]);
    else setSelectedDrivers(displayedDrivers.map(d => d.id));
  };

  const toggleSelect = (id) => {
    setSelectedDrivers(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleBatchApprove = () => {
    setMockDrivers(prev => prev.map(d => selectedDrivers.includes(d.id) ? { ...d, authStatus: 'verified', docStatus: 'passed' } : d));
    setSelectedDrivers([]);
  };

  const handleBatchReject = () => {
    setMockDrivers(prev => prev.map(d => selectedDrivers.includes(d.id) ? { ...d, authStatus: 'unverified', docStatus: 'rejected' } : d));
    setSelectedDrivers([]);
  };

  const handleSingleApprove = (id) => {
    setMockDrivers(prev => prev.map(d => d.id === id ? { ...d, authStatus: 'verified', docStatus: 'passed' } : d));
    setActiveDriver(null);
  };

  const handleSingleReject = (id) => {
    setMockDrivers(prev => prev.map(d => d.id === id ? { ...d, authStatus: 'unverified', docStatus: 'rejected' } : d));
    setActiveDriver(null);
  };

  // --- 辅助组件 ---
  const LiveStatusIndicator = ({ status }) => {
    const config = {
      driving: { color: 'bg-emerald-500', glow: 'shadow-[0_0_8px_rgba(16,185,129,0.4)]', label: '运输中' },
      idle: { color: 'bg-blue-500', glow: 'shadow-[0_0_8px_rgba(59,130,246,0.4)]', label: '空闲中' },
    }[status];

    if (!config) return null;

    return (
      <div className="flex items-center gap-2">
        <div className="relative flex h-2.5 w-2.5">
          {status === 'driving' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-500"></span>}
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.color} ${config.glow}`}></span>
        </div>
        <span className="text-[13px] font-bold text-slate-600">{config.label}</span>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const configs = {
      verified: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: CheckCircle2, label: '已认证' },
      unverified: { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', icon: AlertCircle, label: '未认证' },
      authenticating: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: Clock, label: '认证中' },
      failed: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', icon: XCircle, label: '认证失败' },
      id_expired: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', icon: ShieldAlert, label: '身份证过期' },
      dl_expired: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', icon: ShieldAlert, label: '驾驶证过期' },
      qc_expired: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', icon: ShieldAlert, label: '从业资格证过期' },

      passed: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', label: '通过' },
      pending: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', label: '待审核' },
      rejected: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', label: '未通过' },
    };
    const config = configs[status] || configs.unverified;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black border ${config.bg} ${config.text} ${config.border} uppercase tracking-wider`}>
        {Icon && <Icon className="w-3 h-3" />}
        {!Icon && <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: 'currentColor'}}></span>}
        {config.label}
      </span>
    );
  };

  const DocRadar = ({ driver }) => {
    const statusMap = [
      { key: 'ID', status: getValidityStatus(driver.idCardExpiry), icon: IdCard },
      { key: 'DL', status: getValidityStatus(driver.driverLicenseExpiry), icon: Car },
      { key: 'QC', status: getValidityStatus(driver.qualCertificateExpiry), icon: FileBadge },
    ];
    return (
      <div className="flex items-center gap-1.5">
        {statusMap.map((doc, idx) => (
          <div
            key={idx}
            className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all shadow-sm
              ${doc.status === 'expired' ? 'bg-rose-50 border-rose-200 text-rose-500 animate-pulse' :
                doc.status === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-500' :
                'bg-slate-50 border-slate-100 text-slate-300'}`}
            title={`${doc.key}: ${doc.status === 'expired' ? '已逾期' : doc.status === 'warning' ? '临期' : '正常'}`}
          >
            <doc.icon className="w-3.5 h-3.5" />
          </div>
        ))}
      </div>
    );
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, bgClass, illustration, details, filterObj }) => {
    const isActive = activeCardFilter?.key === filterObj?.key && activeCardFilter?.type === filterObj?.type;
    return (
      <div
        className={`relative overflow-hidden bg-white rounded-[2rem] p-6 transition-all duration-300 cursor-pointer group
          ${isActive ? 'ring-4 ring-indigo-500/30 shadow-[0_10px_40px_rgba(99,102,241,0.2)] -translate-y-1' : 'shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white hover:-translate-y-1 hover:shadow-xl'}`}
        onClick={() => {
          if (!filterObj) return;
          if (isActive) setActiveCardFilter(null);
          else setActiveCardFilter(filterObj);
        }}
      >
        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-50 ${bgClass} pointer-events-none transition-opacity group-hover:opacity-80`}></div>
        <div className="flex justify-between items-start relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${bgClass} ${colorClass} shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-[14px] font-black text-slate-500">{title}</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-800 tracking-tight">{value}</span>
              <span className="text-xs font-medium text-slate-400">{subtitle}</span>
            </div>
          </div>
          <div className="w-16 h-16 drop-shadow-md opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110 duration-300 relative">
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${illustration}&backgroundColor=transparent`} alt="icon" className="w-full h-full object-contain" />
            {filterObj && (
              <div className="absolute -bottom-4 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity font-bold shadow-lg">
                {isActive ? '取消筛选' : '点击筛选异常名单'}
              </div>
            )}
          </div>
        </div>
        {details && (
          <div className="mt-6 pt-4 border-t border-slate-50 relative z-10 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="flex flex-col"><span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5"/> 正常</span><span className="text-sm font-black text-slate-700">{details.normal}</span></div>
                <div className="flex flex-col"><span className="text-[10px] font-black text-amber-500 uppercase flex items-center gap-1"><Clock className="w-2.5 h-2.5"/> 临期</span><span className="text-sm font-black text-slate-700">{details.warning}</span></div>
                <div className="flex flex-col"><span className="text-[10px] font-black text-rose-500 uppercase flex items-center gap-1"><ShieldX className="w-2.5 h-2.5"/> 脱审</span><span className="text-sm font-black text-slate-700">{details.expired}</span></div>
             </div>
             <div className="flex-1 max-w-[60px] h-1.5 bg-slate-100 rounded-full ml-4 flex overflow-hidden">
                <div className="bg-emerald-400 h-full transition-all" style={{ width: `${(details.normal/(details.normal+details.warning+details.expired))*100}%` }}></div>
                <div className="bg-amber-400 h-full transition-all" style={{ width: `${(details.warning/(details.normal+details.warning+details.expired))*100}%` }}></div>
                <div className="bg-rose-400 h-full transition-all" style={{ width: `${(details.expired/(details.normal+details.warning+details.expired))*100}%` }}></div>
             </div>
          </div>
        )}
      </div>
    );
  };

  // 🚀 核心修复点：安全渲染 Icon
  const SectionTitle = ({ icon: Icon, title, color = "text-emerald-600" }) => (
    <div className="flex items-center gap-3 mb-6 pl-1">
      {Icon && (
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${color.replace('text', 'bg').replace('600', '50')} ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h3 className={`text-lg font-black tracking-wide ${color}`}>{title}</h3>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-slate-100 to-transparent"></div>
    </div>
  );

  const DataBlock = ({ label, value, isHighlight = false, valueClass = "" }) => (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className={`text-[15px] font-bold ${isHighlight ? 'text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl w-max shadow-sm border border-indigo-100/50' : 'text-slate-700'} ${valueClass}`}>
        {value || '-'}
      </span>
    </div>
  );

  const CertPhotoBox = ({ title }) => (
    <div className="relative group flex flex-col items-center">
      <div className="w-full h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex flex-col items-center justify-center relative overflow-hidden group-hover:border-indigo-300 transition-all cursor-pointer">
         <ImageIcon className="w-8 h-8 text-slate-300 relative z-10 mb-2 group-hover:text-indigo-400 transition-colors" />
         <span className="text-sm font-bold text-slate-400 relative z-10 group-hover:text-indigo-500 transition-colors">{title}</span>
         <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-sm">
            <span className="text-white text-sm font-bold flex items-center gap-1.5"><Eye className="w-4 h-4" /> 查看大图</span>
         </div>
      </div>
    </div>
  );

  const ExpiryDateBlock = ({ label, dateStr }) => {
    const status = getValidityStatus(dateStr);
    return (
      <div className={`flex flex-col p-4 rounded-2xl border transition-all duration-500 ${status === 'expired' ? 'bg-rose-50/50 border-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : status === 'warning' ? 'bg-amber-50/50 border-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-slate-50 border-slate-100'}`}>
        <span className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${status === 'expired' ? 'text-rose-500' : status === 'warning' ? 'text-amber-500' : 'text-slate-400'}`}>{label}</span>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${status === 'expired' ? 'bg-rose-100 border-rose-200 text-rose-600' : status === 'warning' ? 'bg-amber-100 border-amber-200 text-amber-600' : 'bg-white border-slate-100 text-slate-400'}`}><CalendarDays className="w-5 h-5" /></div>
          <span className={`text-xl font-black tracking-tight ${status === 'expired' ? 'text-rose-700' : status === 'warning' ? 'text-amber-700' : 'text-slate-700'}`}>{dateStr || '-'}</span>
        </div>
      </div>
    );
  };

  const DriverCard = ({ driver }) => {
    const isSelected = selectedDrivers.includes(driver.id);
    const hasExpiryIssue = getValidityStatus(driver.idCardExpiry) !== 'normal' || getValidityStatus(driver.driverLicenseExpiry) !== 'normal' || getValidityStatus(driver.qualCertificateExpiry) !== 'normal';
    const hasVehicle = driver.vehicle && driver.vehicle !== '未绑定';

    return (
      <div
        className={`relative overflow-hidden rounded-[2.5rem] p-6 transition-all duration-500 group cursor-pointer border-2
          ${isSelected ? 'bg-indigo-50/50 border-indigo-400 shadow-xl scale-[1.02]' :
            hasExpiryIssue ? 'bg-white border-amber-100 shadow-lg' : 'bg-white border-white hover:border-indigo-100 shadow-sm'}`}
        onClick={() => setActiveDriver(driver)}
      >
        {hasExpiryIssue && <div className="absolute -left-10 -top-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-60"></div>}
        <div className="flex justify-between items-start mb-5 relative z-10">
          <div className="flex flex-col gap-2">
            {hasVehicle && ['driving', 'idle'].includes(driver.liveStatus) && <LiveStatusIndicator status={driver.liveStatus} />}
            <div className="flex gap-1.5"><StatusBadge status={driver.authStatus} /><StatusBadge status={driver.docStatus} /></div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div
              onClick={(e) => { e.stopPropagation(); toggleSelect(driver.id); }}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${isSelected ? 'bg-indigo-600 border-indigo-600 rotate-0' : 'border-slate-200 bg-white rotate-12 hover:border-indigo-400'}`}
            >
              {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
            <DocRadar driver={driver} />
          </div>
        </div>
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-100 to-indigo-50 shadow-inner border-4 border-white mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
             <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${driver.avatarSeed}&backgroundColor=f1f5f9`} alt={driver.name} className="w-full h-full object-cover" />
             {hasExpiryIssue && <div className="absolute inset-0 border-4 border-amber-400/30 rounded-full animate-pulse"></div>}
          </div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">{driver.name}</h3>
          <p className="text-sm font-bold text-slate-400 mt-1">{driver.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-[1.5rem] border border-slate-100/50 relative z-10 group-hover:opacity-0 transition-opacity duration-300">
          <div className="flex flex-col"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">入职时间</span><span className="text-[13px] font-bold text-slate-700 bg-white px-2 py-1 rounded-xl border border-slate-100 shadow-sm w-max"><CalendarDays className="w-3.5 h-3.5 inline mr-1 text-indigo-500"/> {driver.joinDate}</span></div>
          <div className="flex flex-col"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">绑定车辆</span><span className={`text-[13px] font-bold truncate bg-white px-2 py-1 rounded-xl border border-slate-100 shadow-sm w-max ${hasVehicle ? 'text-blue-600' : 'text-slate-400'}`}><Car className="w-3.5 h-3.5 inline mr-1 text-slate-400"/> {driver.vehicle || '未绑定'}</span></div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 bg-white/95 backdrop-blur-2xl p-4 rounded-[1.5rem] shadow-2xl border border-white translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
           {driver.liveStatus === 'driving' && (<button type="button" onClick={(e) => { e.stopPropagation(); setActiveWaybillDriver(driver); }} className="w-11 h-11 flex items-center justify-center text-violet-600 hover:bg-violet-600 hover:text-white bg-violet-50 rounded-2xl transition-all shadow-sm"><MapPin className="w-5 h-5" /></button>)}
           <button type="button" onClick={(e) => { e.stopPropagation(); setActiveDriver(driver); }} className="w-11 h-11 flex items-center justify-center text-indigo-500 hover:bg-indigo-600 hover:text-white bg-indigo-50 rounded-2xl transition-all shadow-sm"><Eye className="w-5 h-5" /></button>
           {driver.docStatus === 'pending' && (<button type="button" onClick={(e) => { e.stopPropagation(); setActiveDriver(driver); }} className="w-11 h-11 flex items-center justify-center text-emerald-500 hover:bg-emerald-600 hover:text-white bg-emerald-50 rounded-2xl transition-all shadow-sm"><FileCheck className="w-5 h-5" /></button>)}
           <button type="button" onClick={(e) => e.stopPropagation()} className="w-11 h-11 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white bg-blue-50 rounded-2xl transition-all shadow-sm"><Edit className="w-5 h-5" /></button>
           <button type="button" onClick={(e) => { e.stopPropagation(); setResetPwdDriver(driver); }} className="w-11 h-11 flex items-center justify-center text-amber-500 hover:bg-amber-600 hover:text-white bg-amber-50 rounded-2xl transition-all shadow-sm"><KeyRound className="w-5 h-5" /></button>
           <button type="button" onClick={(e) => e.stopPropagation()} className="w-11 h-11 flex items-center justify-center text-rose-500 hover:bg-rose-600 hover:text-white bg-rose-50 rounded-2xl transition-all shadow-sm"><Trash2 className="w-5 h-5" /></button>
        </div>
      </div>
    );
  };

  const navGroups = [
    { id: 'home', title: '首页', icon: LayoutDashboard, children: [] },
    {
      id: 'transport',
      title: '运输管理',
      icon: Truck,
      children: [
        { id: 'plan_management', label: '计划管理' },
        { id: 'plan_audit', label: '计划审核' },
        { id: 'waybill_management', label: '运单管理' },
      ],
    },
    {
      id: 'in_transit',
      title: '在途管理',
      icon: Truck,
      children: [
        { id: 'leaderboard_audit', label: '榜单审核' },
        { id: 'fee_audit', label: '费用审核' },
        { id: 'event_records', label: '事件记录' },
      ],
    },
    {
      id: 'settlement',
      title: '结算中心',
      icon: FileText,
      children: [
        { id: 'waybill_data_correction', label: '运单数据修正' },
        { id: 'customer_settlement_management', label: '客户结算管理' },
        { id: 'driver_settlement_management', label: '司机结算管理' },
      ],
    },
    {
      id: 'safety',
      title: '安全管理',
      icon: ShieldAlert,
      children: [
        { id: 'doc_issuing_management', label: '发文管理' },
        { id: 'accident_reporting', label: '事故上报' },
        { id: 'accident_archive', label: '事故档案' },
        { id: 'violation_events', label: '违规事件' },
      ],
    },
    {
      id: 'driver_archive',
      title: '司机档案',
      icon: Users,
      children: [
        { id: 'driver_management', label: '司机管理' },
        { id: 'driver_authentication', label: '司机认证' },
        { id: 'shift_records', label: '交班记录' },
      ],
    },
    {
      id: 'vehicle_archive',
      title: '车辆档案',
      icon: Car,
      children: [{ id: 'vehicle_management', label: '车辆管理' }],
    },
    {
      id: 'statistics',
      title: '统计中心',
      icon: PieChart,
      children: [
        { id: 'daily_transport_data', label: '日运输数据统计' },
        { id: 'daily_revenue_data', label: '日营收数据统计' },
      ],
    },
    {
      id: 'customer_management',
      title: '客户管理',
      icon: UserPlus,
      children: [
        { id: 'customer_list', label: '客户管理' },
        { id: 'address_management', label: '地址管理' },
        { id: 'route_management', label: '路线管理' },
        { id: 'contract_management', label: '合同管理' },
      ],
    },
    {
      id: 'strategy_configuration',
      title: '策略配置',
      icon: Settings,
      children: [
        { id: 'driver_settlement_rules', label: '司机结算规则' },
        { id: 'customer_settlement_rules', label: '客户结算规则' },
      ],
    },
    {
      id: 'fleet_ecology',
      title: '车队生态',
      icon: FileText,
      children: [{ id: 'fleet_management', label: '车队管理' }],
    },
    {
      id: 'organization_structure',
      title: '组织架构',
      icon: Users,
      children: [
        { id: 'department_management', label: '部门管理' },
        { id: 'role_management', label: '岗位管理' },
      ],
    },
    {
      id: 'basic_info',
      title: '基本信息',
      icon: FileBadge,
      children: [{ id: 'category_management', label: '品类管理' }],
    },
    {
      id: 'system_management',
      title: '系统管理',
      icon: Settings,
      children: [
        { id: 'user_management', label: '用户管理' },
        { id: 'role_management_sys', label: '角色管理' },
        { id: 'menu_management', label: '菜单管理' },
        { id: 'dictionary_management', label: '字典管理' },
        { id: 'audit_configuration', label: '审核配置' },
      ],
    },
  ];

  const activeModule = useMemo(() => {
    for (const group of navGroups) {
      const child = group.children?.find((c) => c.id === activeNav);
      if (child) return { parent: group.title, child: child.label, key: child.id };
      if (group.id === activeNav) return { parent: group.title, child: null, key: group.id };
    }
    return null;
  }, [activeNav, navGroups]);

  const PlaceholderPage = () => (
    <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-12 min-h-[520px] flex items-center justify-center">
      <div className="max-w-xl text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">模块建设中</h2>
        <p className="text-sm font-bold text-slate-400 mt-3">
          {activeModule
            ? `当前菜单：${activeModule.child ? `${activeModule.parent} / ${activeModule.child}` : activeModule.parent}`
            : '当前菜单'}
        </p>
        <p className="text-[13px] font-bold text-slate-500 mt-2">
          该页面暂未接入业务内容，后续可按同一风格快速扩展。
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[1080px] bg-[#f4f7fa] p-10 font-sans text-slate-800 relative overflow-x-hidden mx-auto shadow-[0_0_100px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 flex gap-8 items-start max-w-[1920px] mx-auto">
        <aside className="w-[272px] shrink-0 bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 p-6 sticky top-8 self-start">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-[1.25rem] shadow-lg shadow-indigo-200/60 flex items-center justify-center text-white border border-indigo-400/30">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fleet OS</p>
              <p className="text-base font-black text-slate-800 tracking-tight truncate">擎车联</p>
            </div>
          </div>
          <nav className="space-y-4" aria-label="主导航">
            {navGroups.map((group) => {
              const children = group.children ?? [];
              const isGroupActive = children.some((c) => c.id === activeNav);
              const isExpanded = expandedParent === group.id;
              const hasChildren = children.length > 0;
              const Icon = group.icon;

              return (
                <div key={group.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!hasChildren) {
                        setActiveNav(group.id);
                        return;
                      }
                      setExpandedParent((prev) => (prev === group.id ? '' : group.id));
                      setActiveNav(children[0]?.id ?? group.id);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl text-left text-[13px] font-black tracking-tight transition-all duration-200 border
                      ${isGroupActive || (!hasChildren && activeNav === group.id)
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-100 shadow-sm shadow-indigo-100/50'
                        : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800 hover:border-slate-100'
                      }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors
                          ${isGroupActive || (!hasChildren && activeNav === group.id)
                            ? 'bg-white border-indigo-100 text-indigo-600'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                          }`}
                      >
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                      <span className="truncate">{group.title}</span>
                    </span>
                    {hasChildren ? (
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''} ${
                          isGroupActive ? 'text-indigo-500' : ''
                        }`}
                      />
                    ) : null}
                  </button>

                  {hasChildren ? (
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-2.5 border-l-2 border-indigo-100/80 ml-6 pl-4 pr-1 py-2">
                          {children.map((child, idx) => {
                            const isActive = activeNav === child.id;
                            return (
                              <li
                                key={child.id}
                                className={`transition-all duration-300 ${isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}
                                style={{ transitionDelay: `${Math.min(idx * 35, 180)}ms` }}
                              >
                                <button
                                  type="button"
                                  onClick={() => setActiveNav(child.id)}
                                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-[12.5px] font-black tracking-tight transition-all duration-200 border
                                    ${isActive
                                      ? 'bg-gradient-to-r from-indigo-50 to-indigo-50/30 border-indigo-200/80 text-indigo-700 shadow-sm shadow-indigo-100/40'
                                      : 'bg-white/60 text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800 hover:border-slate-100'
                                    }`}
                                >
                                  <span className={`relative h-2.5 w-2.5 rounded-full transition-all ${isActive ? 'bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.12)]' : 'bg-slate-300'}`} />
                                  <span className="truncate">{child.label}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-4 shadow-inner">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">当前模块</p>
              <p className="text-sm font-black text-slate-700">
                {activeModule
                  ? activeModule.child
                    ? `${activeModule.parent} / ${activeModule.child}`
                    : activeModule.parent
                  : '—'}
              </p>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0 space-y-10">
          {activeNav === 'home' ? (
            <HomeDashboard />
          ) : activeNav === 'daily_transport_data' ? (
            <DailyStatsDashboard mode="transport" />
          ) : activeNav === 'daily_revenue_data' ? (
            <DailyStatsDashboard mode="revenue" />
          ) : activeNav !== 'driver_management' ? (
            <PlaceholderPage />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden"><Users className="w-8 h-8 text-indigo-600" /></div>
                  <div><h1 className="text-3xl font-black text-slate-800 tracking-tight">司机管理中心</h1><p className="text-sm font-black text-slate-400 mt-1 uppercase tracking-widest">Fleet Compliance & Efficiency Hub</p></div>
                </div>
                <button type="button" onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] hover:bg-indigo-600 transition-all font-black text-sm shadow-xl shadow-slate-900/10 hover:-translate-y-1"><Plus className="w-6 h-6" /><span>新增司机档案</span></button>
              </div>

        <div className="space-y-8">
          <div className="flex gap-8">
             <div className="w-1/3">
                <div className="flex items-center gap-2 mb-4 px-2"><div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div><span className="text-sm font-black text-slate-400 uppercase tracking-widest">运力结构组成</span></div>
                <div className="flex flex-col gap-6">
                   <StatCard title="司机总数量 (全部)" value={stats.total} subtitle="人" icon={Users} colorClass="text-indigo-600" bgClass="bg-indigo-50" illustration="team" filterObj={{ type: 'source', key: 'all', name: '全部运力' }} />
                   <div className="grid grid-cols-2 gap-6">
                      <StatCard title="自有司机" value={stats.own} subtitle="人" icon={UserCheck} colorClass="text-blue-600" bgClass="bg-blue-50" illustration="business" filterObj={{ type: 'source', key: 'own', name: '自有司机' }} />
                      <StatCard title="外调司机" value={stats.out} subtitle="人" icon={UserCog} colorClass="text-violet-600" bgClass="bg-violet-50" illustration="travel" filterObj={{ type: 'source', key: 'out', name: '外调司机' }} />
                   </div>
                </div>
             </div>

             <div className="flex-1">
                <div className="flex items-center gap-2 mb-4 px-2"><div className="w-1.5 h-4 bg-rose-500 rounded-full"></div><span className="text-sm font-black text-slate-400 uppercase tracking-widest">证件效期安全监控看板</span></div>
                <div className="grid grid-cols-3 gap-6 h-[calc(100%-2rem)]">
                  <StatCard title="身份证有效监控" value={stats.idCard.normal + stats.idCard.warning + stats.idCard.expired} subtitle="人" icon={IdCard} colorClass="text-rose-600" bgClass="bg-rose-50" illustration="security" details={stats.idCard} filterObj={{ type: 'compliance', key: 'idCardExpiry', name: '身份证' }} />
                  <StatCard title="机动车驾驶证监控" value={stats.driverLicense.normal + stats.driverLicense.warning + stats.driverLicense.expired} subtitle="人" icon={Car} colorClass="text-emerald-600" bgClass="bg-emerald-50" illustration="drive" details={stats.driverLicense} filterObj={{ type: 'compliance', key: 'driverLicenseExpiry', name: '驾驶证' }} />
                  <StatCard title="道路从业资格证监控" value={stats.qual.normal + stats.qual.warning + stats.qual.expired} subtitle="人" icon={FileBadge} colorClass="text-amber-600" bgClass="bg-amber-50" illustration="document" details={stats.qual} filterObj={{ type: 'compliance', key: 'qualCertificateExpiry', name: '从业资格证' }} />
                </div>
             </div>
          </div>

        {activeCardFilter && (
           <div className="bg-indigo-600 text-white rounded-[1.5rem] p-5 flex items-center justify-between shadow-xl shadow-indigo-200/50 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-4">
                 <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Filter className="w-6 h-6" /></div>
                 <div>
                    <h4 className="text-lg font-black tracking-wide">
                       {activeCardFilter.type === 'compliance' ? `正在查看【${activeCardFilter.name}】存在 临期/脱审 风险的司机名单` : `正在查看【${activeCardFilter.name}】分类的司机名单`}
                    </h4>
                    <p className="text-sm font-medium text-indigo-200 mt-1">共筛选出 {displayedDrivers.length} 条符合条件的记录</p>
                 </div>
              </div>
              <button type="button" onClick={() => setActiveCardFilter(null)} className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-sm hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-sm"><RefreshCw className="w-4 h-4"/> 清除筛选</button>
           </div>
        )}

        <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <input value={filters.name} onChange={e => setFilters({...filters, name: e.target.value})} placeholder="司机姓名" className="px-6 py-4 bg-slate-50/80 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white w-full text-[14px] font-bold text-slate-800 shadow-inner outline-none transition-all placeholder:text-slate-400" />
              <input value={filters.id} onChange={e => setFilters({...filters, id: e.target.value})} placeholder="工号" className="px-6 py-4 bg-slate-50/80 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white w-full text-[14px] font-bold text-slate-800 shadow-inner outline-none transition-all placeholder:text-slate-400" />
              <input value={filters.phone} onChange={e => setFilters({...filters, phone: e.target.value})} placeholder="手机号" className="px-6 py-4 bg-slate-50/80 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white w-full text-[14px] font-bold text-slate-800 shadow-inner outline-none transition-all placeholder:text-slate-400" />

              <div className="relative">
                <select value={filters.source} onChange={e => setFilters({...filters, source: e.target.value})} className="px-6 py-4 bg-slate-50/80 border border-slate-100 rounded-2xl w-full text-[14px] font-bold text-slate-600 appearance-none cursor-pointer shadow-inner outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                  <option value="">司机来源</option>
                  <option value="自有">自有司机</option>
                  <option value="外调">外调司机</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select value={filters.authStatus} onChange={e => setFilters({...filters, authStatus: e.target.value})} className="px-6 py-4 bg-slate-50/80 border border-slate-100 rounded-2xl w-full text-[14px] font-bold text-slate-600 appearance-none cursor-pointer shadow-inner outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                  <option value="">认证状态</option>
                  <option value="unverified">未认证</option>
                  <option value="verified">已认证</option>
                  <option value="authenticating">认证中</option>
                  <option value="failed">认证失败</option>
                  <option value="id_expired">身份证过期</option>
                  <option value="dl_expired">驾驶证过期</option>
                  <option value="qc_expired">从业资格证过期</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select value={filters.docStatus} onChange={e => setFilters({...filters, docStatus: e.target.value})} className="px-6 py-4 bg-slate-50/80 border border-slate-100 rounded-2xl w-full text-[14px] font-bold text-slate-600 appearance-none cursor-pointer shadow-inner outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                  <option value="">证件审核</option>
                  <option value="pending">待审核</option>
                  <option value="passed">通过</option>
                  <option value="rejected">未通过</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
           </div>

           <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
             <div className="bg-slate-50/80 p-1.5 rounded-2xl flex items-center shadow-inner gap-1">
                <button type="button" onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`} title="卡片视图"><LayoutGrid className="w-5 h-5" /></button>
                <button type="button" onClick={() => setViewMode('list')} className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`} title="列表视图"><List className="w-5 h-5" /></button>
             </div>
             <div className="flex gap-4">
                <button type="button" onClick={handleResetFilters} className="px-8 py-3.5 rounded-2xl bg-slate-50 text-slate-600 font-black hover:bg-slate-100 transition-all border border-slate-200">重置条件</button>
                <button type="button" className="px-10 py-3.5 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center gap-2"><Search className="w-5 h-5"/> 立即查询</button>
             </div>
           </div>
        </div>

        <div className="min-h-[500px]">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                 {displayedDrivers.length > 0 ? displayedDrivers.map(driver => <DriverCard key={driver.id} driver={driver} />) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400"><FileText className="w-16 h-16 mb-4 opacity-20"/><p className="text-lg font-black">没有找到符合条件的司机档案</p></div>
                 )}
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white overflow-hidden shadow-2xl shadow-slate-200/50 mt-6">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 border-b border-slate-100">
                    <tr className="text-[12px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-8 py-6 w-16 text-center"><input type="checkbox" checked={selectedDrivers.length === displayedDrivers.length && displayedDrivers.length > 0} onChange={toggleSelectAll} className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" /></th>
                      <th className="px-4 py-6">工号</th>
                      <th className="px-4 py-6">司机档案 (姓名/手机)</th>
                      <th className="px-4 py-6">来源</th>
                      <th className="px-4 py-6">身份证号码 (脱敏)</th>
                      <th className="px-4 py-6">认证状态</th>
                      <th className="px-4 py-6">实时状态 / 车辆</th>
                      <th className="px-4 py-6">证件效期 (雷达)</th>
                      <th className="px-4 py-6">创建时间</th>
                      <th className="px-8 py-6 text-right min-w-[280px]">管理操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50/80">
                    {displayedDrivers.length > 0 ? displayedDrivers.map((driver) => {
                      const hasVehicle = driver.vehicle && driver.vehicle !== '未绑定';
                      return (
                        <tr key={driver.id} className="hover:bg-indigo-50/30 transition-colors group cursor-pointer" onClick={() => setActiveDriver(driver)}>
                          <td className="px-8 py-6 text-center" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedDrivers.includes(driver.id)} onChange={() => toggleSelect(driver.id)} className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 cursor-pointer transition-all" /></td>
                          <td className="px-4 py-6 text-sm font-black text-slate-700">{driver.id}</td>
                          <td className="px-4 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-[1rem] bg-slate-100 shadow-inner overflow-hidden shrink-0 border-2 border-white transition-transform group-hover:scale-110"><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${driver.avatarSeed}&backgroundColor=f8fafc`} alt={driver.name} className="w-full h-full object-cover" /></div>
                              <div><p className="text-[15px] font-black text-slate-800">{driver.name}</p><p className="text-xs font-bold text-slate-400 mt-0.5">{driver.phone}</p></div>
                            </div>
                          </td>
                          <td className="px-4 py-6"><span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-black text-slate-500 shadow-sm">{driver.source}</span></td>
                          <td className="px-4 py-6 text-[15px] font-bold text-slate-500 tracking-wider">
                             {driver.idCardNo ? driver.idCardNo.replace(/^(.{4})(?:\d+)(.{4})$/, "$1**********$2") : '-'}
                          </td>
                          <td className="px-4 py-6 flex flex-col gap-1.5 pt-7"><StatusBadge status={driver.authStatus} /><StatusBadge status={driver.docStatus} /></td>
                          <td className="px-4 py-6">
                             <div className="flex flex-col gap-2 items-start">
                               {hasVehicle && ['driving', 'idle'].includes(driver.liveStatus) && (
                                 <LiveStatusIndicator status={driver.liveStatus} />
                               )}
                               <span className={`text-[11px] font-black px-2 py-0.5 rounded border shadow-sm flex items-center gap-1 ${hasVehicle ? 'text-indigo-600 bg-indigo-50 border-indigo-100' : 'text-slate-400 bg-slate-50 border-slate-200'}`}>
                                  <Car className="w-3 h-3"/>{driver.vehicle || '未绑定'}
                               </span>
                             </div>
                          </td>
                          <td className="px-4 py-6"><DocRadar driver={driver} /></td>
                          <td className="px-4 py-6 text-[13px] font-bold text-slate-400">{driver.createTime}</td>
                          <td className="px-8 py-6 text-right" onClick={e => e.stopPropagation()}>
                             <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all">
                                {driver.liveStatus === 'driving' && (<button type="button" onClick={() => setActiveWaybillDriver(driver)} className="w-10 h-10 flex items-center justify-center text-violet-600 hover:bg-violet-600 hover:text-white bg-violet-50 rounded-xl transition-all shadow-sm" title="查看当前运单"><MapPin className="w-4 h-4" /></button>)}
                                <button type="button" onClick={() => setActiveDriver(driver)} className="w-10 h-10 flex items-center justify-center text-indigo-500 hover:bg-indigo-600 hover:text-white bg-indigo-50 rounded-xl transition-all shadow-sm" title="查看详情"><Eye className="w-4 h-4" /></button>
                                {driver.docStatus === 'pending' && (<button type="button" onClick={() => setActiveDriver(driver)} className="w-10 h-10 flex items-center justify-center text-emerald-500 hover:bg-emerald-600 hover:text-white bg-emerald-50 rounded-xl transition-all shadow-sm" title="资质审核"><FileCheck className="w-4 h-4" /></button>)}
                                <button type="button" className="w-10 h-10 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white bg-blue-50 rounded-xl transition-all shadow-sm" title="编辑档案"><Edit className="w-4 h-4" /></button>
                                <button type="button" onClick={() => setResetPwdDriver(driver)} className="w-10 h-10 flex items-center justify-center text-amber-500 hover:bg-amber-600 hover:text-white bg-amber-50 rounded-xl transition-all shadow-sm" title="重置密码"><KeyRound className="w-4 h-4" /></button>
                                <button type="button" className="w-10 h-10 flex items-center justify-center text-rose-500 hover:bg-rose-600 hover:text-white bg-rose-50 rounded-xl transition-all shadow-sm" title="删除记录"><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr><td colSpan="10" className="py-20 text-center text-slate-400 font-black text-lg">没有找到符合条件的司机档案</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
            </>
          )}
      </div>
      </div>

      {/* 📦 批量审核控制台 */}
      {selectedDrivers.length > 0 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-3xl border border-white/10 px-8 py-5 rounded-[2.5rem] flex items-center gap-8 shadow-2xl z-40 animate-in slide-in-from-bottom-20 duration-500 border-t border-white/20">
          <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-lg border border-indigo-500/30">{selectedDrivers.length}</div><div className="flex flex-col"><span className="font-black text-white leading-none">已选择记录</span><span className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Selected</span></div></div>
          <div className="w-[1px] h-8 bg-slate-700/50"></div>
          <div className="flex gap-3">
            <button type="button" onClick={handleBatchApprove} className="px-8 py-3 bg-emerald-500 text-white rounded-2xl text-[14px] font-black flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"><CheckCircle2 className="w-5 h-5" /> 批量审核通过</button>
            <button type="button" onClick={handleBatchReject} className="px-8 py-3 bg-white/10 text-rose-400 rounded-2xl text-[14px] font-black flex items-center gap-2 hover:bg-rose-500/20 hover:text-rose-300 transition-all border border-white/10"><XCircle className="w-5 h-5" /> 批量驳回申请</button>
          </div>
          <button type="button" onClick={() => setSelectedDrivers([])} className="p-3 text-slate-500 hover:text-white rounded-full transition-colors bg-white/5 hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 📄 司机电子档案抽屉 - Z-index: 50 */}
      {/* ============================================================ */}
      {activeDriver && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 animate-in fade-in duration-500" onClick={() => setActiveDriver(null)}></div>
          <div className="fixed top-0 right-0 h-full w-full max-w-[850px] bg-white/95 backdrop-blur-3xl shadow-[-20px_0_80px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-right duration-700 flex flex-col border-l border-white overflow-hidden">
             <div className="p-10 pb-8 border-b border-slate-50 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-5"><div className="p-4 bg-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-indigo-100 border-2 border-indigo-400"><FileText className="w-7 h-7" /></div><div><h2 className="text-3xl font-black text-slate-800 tracking-tight">司机电子档案</h2><p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">ID: {activeDriver.id}</p></div></div>
              <button type="button" onClick={() => setActiveDriver(null)} className="w-14 h-14 bg-slate-50 flex items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-inner border border-slate-100 hover:rotate-90"><X className="w-7 h-7" /></button>
            </div>
             <div className="p-10 flex-1 overflow-y-auto space-y-12 custom-scrollbar bg-slate-50/30">
              {activeDriver.liveStatus === 'driving' && (
                <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl shadow-indigo-200/50 cursor-pointer hover:scale-[1.01] transition-all group" onClick={() => { setActiveWaybillDriver(activeDriver); }}>
                  <div className="flex items-center gap-6 text-white"><div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-inner"><Truck className="w-8 h-8" /></div><div><div className="flex items-center gap-2"><span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-300 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 mr-2 shadow-sm shadow-emerald-500"></span><h4 className="text-2xl font-black tracking-wide">当前正在执行运输任务</h4></div><p className="text-[16px] font-bold text-indigo-100 mt-2 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity"><MapPin className="w-4 h-4"/> 运单 YD20260327000006 · 点击查看实时路线</p></div></div>
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl text-white group-hover:bg-white group-hover:text-indigo-600 transition-all shadow-lg"><ArrowRight className="w-7 h-7" /></div>
                </div>
              )}
              <div className="flex items-center gap-10 p-10 bg-gradient-to-br from-white to-indigo-50/30 rounded-[3rem] border border-white shadow-xl shadow-slate-200/40 relative overflow-hidden">
                 <div className="absolute -right-40 -top-40 w-96 h-96 bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none"></div>
                 <div className="w-36 h-36 rounded-[2.5rem] bg-white shadow-2xl overflow-hidden shrink-0 border-8 border-white z-10 scale-110 shadow-indigo-100/50"><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${activeDriver.avatarSeed}&backgroundColor=f1f5f9`} alt="avatar" className="w-full h-full object-cover" /></div>
                 <div className="flex-1 z-10 pt-2">
                    <div className="flex items-center justify-between mb-4"><h3 className="text-4xl font-black text-slate-800 tracking-tight">{activeDriver.name}</h3>{(activeDriver.vehicle && activeDriver.vehicle !== '未绑定') && <LiveStatusIndicator status={activeDriver.liveStatus} />}</div>
                    <div className="flex items-center gap-6 mb-6"><p className="text-xl font-bold text-slate-500 flex items-center gap-3"><Phone className="w-5 h-5 text-slate-400"/> {activeDriver.phone}</p><div className="w-2 h-2 bg-slate-200 rounded-full"></div><p className="text-xl font-bold text-slate-700 flex items-center gap-3"><Car className="w-6 h-6 text-blue-500"/> {activeDriver.vehicle || '无车辆'}</p></div>
                    <span className="px-5 py-2 bg-white/80 border border-slate-100 rounded-2xl text-sm font-black text-slate-600 shadow-sm">{activeDriver.source}</span>
                 </div>
              </div>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-white space-y-10">
                 <SectionTitle icon={Users} title="基本与财务配置" color="text-indigo-600" />
                 <div className="grid grid-cols-2 gap-y-10 gap-x-16"><DataBlock label="登录用户名" value={activeDriver.username} /><DataBlock label="身份证号码" value={activeDriver.idCardNo} /><DataBlock label="结算银行卡号" value={activeDriver.bankCardNo} isHighlight /></div>
                 <div className="pt-2"><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 block pl-1">结算银行卡电子凭证</span><div className="w-1/2 pr-4"><CertPhotoBox title="银行卡正面影像" /></div></div>
              </div>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-white"><SectionTitle icon={IdCard} title="身份认证效期监控" color="text-indigo-600" /><div className="grid grid-cols-2 gap-8 mb-10"><CertPhotoBox title="身份证人像面" /><CertPhotoBox title="身份证国徽面" /></div><ExpiryDateBlock label="身份证有效期至" dateStr={activeDriver.idCardExpiry} /></div>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-white"><SectionTitle icon={Car} title="机动车驾驶证档案" color="text-indigo-600" /><div className="grid grid-cols-2 gap-8 mb-10"><CertPhotoBox title="驾驶证主页" /><CertPhotoBox title="驾驶证副页" /></div><ExpiryDateBlock label="驾驶证强制审验期至" dateStr={activeDriver.driverLicenseExpiry} /></div>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-white"><SectionTitle icon={FileBadge} title="运输从业资格监控" color="text-indigo-600" /><div className="w-1/2 pr-4 mb-10"><CertPhotoBox title="从业资格证主页" /></div><ExpiryDateBlock label="从业资格证有效期至" dateStr={activeDriver.qualCertificateExpiry} /></div>
            </div>
            <div className="p-10 border-t border-slate-100 bg-white flex items-center justify-between shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
               {activeDriver.docStatus === 'pending' ? (
                 <div className="flex w-full items-center justify-between animate-in fade-in slide-in-from-bottom-2"><button type="button" onClick={() => setActiveDriver(null)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black border border-slate-200 hover:bg-slate-200 transition-all">取消操作</button><div className="flex gap-4"><button type="button" onClick={() => handleSingleReject(activeDriver.id)} className="px-10 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black border border-rose-100 hover:bg-rose-100 transition-all shadow-sm"><XCircle className="w-5 h-5" /> 审核拒绝</button><button type="button" onClick={() => handleSingleApprove(activeDriver.id)} className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1"><CheckCircle2 className="w-6 h-6" /> 通过审核</button></div></div>
               ) : (
                 <><div className="flex gap-3"><button type="button" className="px-8 py-4 bg-indigo-50 text-indigo-600 rounded-[1.5rem] font-black flex items-center gap-3 hover:bg-indigo-100 transition-all"><Edit className="w-5 h-5" /> 编辑</button><button type="button" onClick={() => setResetPwdDriver(activeDriver)} className="px-8 py-4 bg-amber-50 text-amber-600 rounded-[1.5rem] font-black flex items-center gap-3 hover:bg-amber-100 transition-all"><KeyRound className="w-5 h-5" /> 重置密码</button><button type="button" className="px-8 py-4 bg-rose-50 text-rose-600 rounded-[1.5rem] font-black flex items-center gap-3 hover:bg-rose-100 transition-all"><Trash2 className="w-5 h-5" /> 删除</button></div><button type="button" onClick={() => setActiveDriver(null)} className="px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-slate-800 transition-all shadow-xl">关闭抽屉</button></>
               )}
            </div>
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* 📍 运单详情：完整展示版 - Z-index: 60 (高于抽屉确保可覆盖) */}
      {/* ============================================================ */}
      {activeWaybillDriver && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4" onClick={() => setActiveWaybillDriver(null)}>
          <div className="bg-[#f8fafc] rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.25)] border border-white w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="px-10 py-7 bg-white border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-100"><FileText className="w-7 h-7" /></div>
                 <div>
                   <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">YD20260327000006 <span className="text-[11px] font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-widest">正在运输</span></h2>
                 </div>
              </div>
              <button type="button" onClick={() => setActiveWaybillDriver(null)} className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 transition-colors shadow-inner border border-slate-100"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar space-y-8 text-slate-800">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                <SectionTitle icon={Info} title="运单基本信息" color="text-emerald-600" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
                  <DataBlock label="计划号" value="YS20260327000002" /><DataBlock label="有效期" value="03-27 ~ 03-28" />
                  <DataBlock label="客户" value="巢湖海螺" /><DataBlock label="回头货" value="否" />
                  <DataBlock label="品类" value="石粉" /><DataBlock label="结算" value="天数" />
                  <DataBlock label="发证日" value="2024-09-07" /><DataBlock label="运输证号" value="CB3DDW6RZ..." />
                  <div className="col-span-2"><DataBlock label="项目归属" value="合肥车队 / 项目一分公司" /></div>
                </div>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex items-center gap-12">
                 <div className="flex flex-col items-center justify-center md:border-r border-slate-100 md:pr-16 shrink-0"><span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 pl-1">预估总里程</span><p className="text-6xl font-black text-emerald-600">120 <span className="text-2xl font-bold opacity-30">km</span></p></div>
                 <div className="flex-1 flex flex-col gap-6 relative">
                    <div className="absolute left-[17px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-emerald-100"></div>
                    <div className="flex items-start gap-6 relative z-10"><div className="w-9 h-9 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-emerald-200">装</div><div><h4 className="text-xl font-black text-slate-800 tracking-tight">含山建材中心库</h4><p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-emerald-400"/> 安徽省马鞍山市含山县昭关镇东兴村</p></div></div>
                    <div className="flex items-start gap-6 relative z-10"><div className="w-9 h-9 bg-blue-500 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-blue-200">卸</div><div><h4 className="text-xl font-black text-slate-800 tracking-tight">下塘码头自营站</h4><p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-blue-400"/> 安徽省合肥市长丰县下塘镇仓库</p></div></div>
                 </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100"><div className="flex justify-between items-center mb-6"><SectionTitle title="装货磅单凭证" color="text-emerald-600" /><span className="text-[10px] font-bold text-slate-300">03-27 15:03</span></div><div className="flex gap-6"><div className="w-28 h-28 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center shrink-0 hover:bg-white transition-all cursor-pointer"><Truck className="w-8 h-8 text-slate-300" /></div><div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
                       <DataBlock label="重量(毛)" value="40.5t" /><DataBlock label="重量(皮)" value="15.2t" /><div className="col-span-2"><DataBlock label="净重" value="25.3吨" valueClass="text-3xl text-emerald-600 font-black" /></div>
                    </div></div></div>
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100"><div className="flex justify-between items-center mb-6"><SectionTitle title="卸货磅单凭证" color="text-blue-600" /><span className="text-[10px] font-bold text-slate-300">03-27 15:30</span></div><div className="flex gap-6"><div className="w-28 h-28 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center shrink-0 hover:bg-white transition-all cursor-pointer"><Truck className="w-8 h-8 text-slate-300" /></div><div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
                       <DataBlock label="重量(毛)" value="40.2t" /><DataBlock label="重量(皮)" value="15.2t" /><div className="col-span-2"><DataBlock label="净重" value="25.0吨" valueClass="text-3xl text-blue-600 font-black" /></div>
                    </div></div></div>
              </div>
            </div>
            <div className="p-8 bg-white border-t border-slate-100 flex justify-end shrink-0"><button type="button" onClick={() => setActiveWaybillDriver(null)} className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-900/10 tracking-widest text-sm">确认并关闭记录</button></div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🔐 修改密码弹窗 - Z-index: 90 (置顶之上) */}
      {/* ============================================================ */}
      {resetPwdDriver && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-[90] flex items-center justify-center p-4" onClick={() => setResetPwdDriver(null)}>
          <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] w-full max-w-md p-10 animate-in zoom-in-95 duration-200 border border-white" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <div className="p-3 bg-amber-50 text-amber-500 rounded-xl shadow-inner"><KeyRound className="w-6 h-6"/></div> 重置司机密码
              </h3>
              <button type="button" onClick={() => setResetPwdDriver(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"><X className="w-6 h-6"/></button>
            </div>
            <div className="space-y-6 mb-10">
               <div className="bg-slate-50/80 p-5 rounded-2xl flex items-center gap-4 border border-slate-100 shadow-inner">
                 <div className="w-14 h-14 rounded-xl bg-white shadow-sm overflow-hidden border border-white"><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${resetPwdDriver.avatarSeed}&backgroundColor=f1f5f9`} className="w-full h-full object-cover" alt="" /></div>
                 <div><p className="font-black text-slate-800 text-lg">{resetPwdDriver.name}</p><p className="text-xs font-bold text-slate-400 mt-1 tracking-wider uppercase">工号: {resetPwdDriver.id}</p></div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">设置新密码</label>
                 <input type="password" placeholder="请输入8-16位强密码" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none shadow-sm transition-all" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">确认新密码</label>
                 <input type="password" placeholder="请再次输入以确认" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none shadow-sm transition-all" />
               </div>
            </div>
            <div className="flex gap-4 justify-end">
              <button type="button" onClick={() => setResetPwdDriver(null)} className="px-8 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all">取消</button>
              <button type="button" onClick={() => setResetPwdDriver(null)} className="px-10 py-4 bg-amber-500 text-white font-black rounded-2xl hover:bg-amber-600 shadow-xl shadow-amber-200 transition-all hover:-translate-y-1">确认并生效</button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ➕ 新增司机弹窗 - Z-index: 80 (置顶) */}
      {/* ============================================================ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[80] p-4 sm:p-6" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-[3rem] shadow-2xl border border-white w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
             <div className="relative bg-gradient-to-r from-indigo-50 to-blue-50/50 p-10 pb-12 overflow-hidden shrink-0"><div className="absolute right-0 top-0 w-80 h-80 bg-white/40 rounded-full blur-3xl pointer-events-none"></div><div className="absolute -right-10 -bottom-10 w-48 h-48 opacity-80 pointer-events-none drop-shadow-2xl animate-in fade-in duration-1000"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=document&backgroundColor=transparent" alt="illustration" className="w-full h-full object-contain" /></div><button type="button" onClick={() => setIsAddModalOpen(false)} className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-slate-400 bg-white/60 backdrop-blur-sm rounded-full shadow-sm hover:text-rose-500 transition-all border border-white z-20"><X className="w-7 h-7" /></button><div className="relative z-10 flex items-center gap-5"><div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-lg border border-slate-100"><UserPlus className="w-8 h-8 text-indigo-600" /></div><div><h2 className="text-3xl font-black text-slate-800 tracking-tight">新增司机档案</h2><p className="text-base font-bold text-slate-400 mt-1">请填写下方信息以录入全新运力资料。</p></div></div></div>
             <div className="p-10 -mt-6 bg-white rounded-t-[3rem] relative z-10 flex-1 overflow-y-auto custom-scrollbar space-y-10">
                <div><div className="flex items-center gap-3 mb-6"><div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest">01 / Profile</div><h3 className="text-lg font-black text-slate-800 tracking-tight">基本身份信息</h3></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100/50 shadow-inner"><div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">用户名登录名</label><input className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 shadow-sm transition-all" placeholder="用于APP登录" /></div><div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">司机真实姓名</label><input className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 shadow-sm transition-all" placeholder="输入姓名" /></div><div className="col-span-2 space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">联系手机号</label><input className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 shadow-sm transition-all" placeholder="输入11位手机号" /><p className="text-[11px] font-bold text-indigo-500/60 mt-2 pl-1 flex items-center gap-2"><Info className="w-3 h-3"/> 此号码将作为司机端的系统唯一登录凭证。</p></div></div></div>
                <div><div className="flex items-center gap-3 mb-6"><div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest">02 / Assets</div><h3 className="text-lg font-black text-slate-800 tracking-tight">财务与资产配置</h3></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100/50 shadow-inner"><div className="col-span-2 space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">司机来源分类</label><div className="relative"><select className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500/10 shadow-sm transition-all"><option>自有司机</option><option>外协合作</option><option>临时调用</option></select><ChevronDown className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" /></div></div><div className="col-span-2 space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">结算银行卡正面照片</label><div className="w-full border-2 border-dashed border-indigo-200 bg-white hover:bg-indigo-50/30 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden shadow-sm"><div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ImagePlus className="w-8 h-8 text-indigo-500" /></div><p className="text-[14px] font-black text-indigo-900">点击上传或拖拽图片至此处</p></div></div></div></div>
             </div>
             <div className="p-8 border-t border-slate-100 flex justify-end gap-5 bg-slate-50/30 shrink-0"><button type="button" onClick={() => setIsAddModalOpen(false)} className="px-10 py-4 font-black text-slate-400 text-sm hover:text-slate-600 transition-all">放弃创建</button><button type="button" className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-2xl shadow-slate-900/20 hover:bg-indigo-600 transition-all hover:-translate-y-1">确认提交档案</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
