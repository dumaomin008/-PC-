import React, { useMemo, useRef, useState } from 'react';
import {
  Building2,
  Wallet,
  TrendingUp,
  PieChart,
  ChevronRight,
  BarChart3,
  BadgeDollarSign,
  Receipt,
  User,
  Trophy,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

function formatCNY(n) {
  const v = Number(n || 0);
  return v.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 });
}

function sum(obj) {
  return Object.values(obj || {}).reduce((acc, v) => acc + Number(v || 0), 0);
}

function clampPct(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

const KPI = ({ title, value, sub, icon: Icon, tone = 'indigo' }) => {
  const toneMap = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600' },
  };
  const t = toneMap[tone] ?? toneMap.indigo;

  return (
    <div className="relative overflow-hidden bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white">
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-50 ${t.bg} pointer-events-none`} />
      <div className="flex items-start justify-between relative z-10">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${t.bg} ${t.text} shadow-sm`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{title}</h3>
          </div>
          <div className="text-3xl font-black text-slate-800 tracking-tight truncate">{value}</div>
          {sub ? <div className="text-xs font-bold text-slate-400 mt-2">{sub}</div> : null}
        </div>
      </div>
    </div>
  );
};

const StackedBar = ({ revenue, cost, profit }) => {
  const rev = Number(revenue || 0);
  const c = Number(cost || 0);
  const p = Number(profit || 0);
  const total = Math.max(1, Math.abs(rev));
  const costPct = clampPct((c / total) * 100);
  const profitPct = clampPct((Math.max(0, p) / total) * 100);

  return (
    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
      <div className="h-full bg-rose-400" style={{ width: `${costPct}%` }} />
      <div className="h-full bg-emerald-400" style={{ width: `${profitPct}%` }} />
    </div>
  );
}

export default function HomeDashboard() {
  const [period, setPeriod] = useState('today'); // today | week | month | custom
  const [selectedFleetId, setSelectedFleetId] = useState('fleet_ah');
  const [expandedDriverId, setExpandedDriverId] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [hoveredDriver, setHoveredDriver] = useState(null);
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [tempPeriod, setTempPeriod] = useState('today'); // 临时存储当前选中的时间段
  const driverSectionRef = useRef(null);

  // 假数据（口径：你给的成本分类）
  const mock = useMemo(() => {
    const fleets = [
      {
        id: 'fleet_ah',
        name: '安徽一车队',
        revenue: { today: 186000, month: 4680000 },
        vehicleCost: {
          trailer: { charge: 4200, maintenance: 2800, fuel: 9500, inspection: 1200, consumables: 800 },
          tractor: { maintenance: 5200, inspection: 900 },
        },
        waybillCost: {
          toll: 18600,
          loading: 7200,
          parking: 1600,
          infoFee: 900,
          misc: 1200,
          driverSalary: 35600,
        },
        driverReportedCost: {
          charge: 8600,
          maintenance: 4300,
          fuel: 22100,
          toll: 7400,
          loading: 3400,
          parking: 2100,
          misc: 1900,
          consumables: 1100,
          infoFee: 600,
          inspection: 800,
        },
        drivers: [
          {
            id: 'd_001',
            name: '罗勇',
            revenue: { today: 52000, month: 1260000 },
            cost: {
              charge: 2600,
              maintenance: 1100,
              fuel: 6800,
              toll: 2100,
              loading: 900,
              parking: 600,
              misc: 500,
              consumables: 300,
              infoFee: 120,
              inspection: 200,
              salary: 5200,
            },
            waybills: { today: 8, month: 186 },
          },
          {
            id: 'd_002',
            name: '杨雨安',
            revenue: { today: 43000, month: 980000 },
            cost: {
              charge: 2000,
              maintenance: 900,
              fuel: 5600,
              toll: 1800,
              loading: 800,
              parking: 500,
              misc: 420,
              consumables: 260,
              infoFee: 120,
              inspection: 160,
              salary: 4600,
            },
            waybills: { today: 7, month: 160 },
          },
          {
            id: 'd_003',
            name: '宋宜胜',
            revenue: { today: 28000, month: 720000 },
            cost: {
              charge: 1400,
              maintenance: 800,
              fuel: 4100,
              toll: 1500,
              loading: 700,
              parking: 420,
              misc: 380,
              consumables: 210,
              infoFee: 90,
              inspection: 140,
              salary: 3600,
            },
            waybills: { today: 5, month: 124 },
          },
        ],
      },
      {
        id: 'fleet_js',
        name: '江苏二车队',
        revenue: { today: 142000, month: 3890000 },
        vehicleCost: {
          trailer: { charge: 3600, maintenance: 2400, fuel: 7800, inspection: 1100, consumables: 650 },
          tractor: { maintenance: 4300, inspection: 780 },
        },
        waybillCost: {
          toll: 15200,
          loading: 6100,
          parking: 1300,
          infoFee: 850,
          misc: 900,
          driverSalary: 30200,
        },
        driverReportedCost: {
          charge: 7200,
          maintenance: 3900,
          fuel: 18800,
          toll: 6200,
          loading: 2900,
          parking: 1700,
          misc: 1600,
          consumables: 900,
          infoFee: 520,
          inspection: 700,
        },
        drivers: [
          {
            id: 'd_101',
            name: '谷自豪',
            revenue: { today: 48000, month: 1180000 },
            cost: {
              charge: 2200,
              maintenance: 980,
              fuel: 6200,
              toll: 1900,
              loading: 880,
              parking: 520,
              misc: 460,
              consumables: 280,
              infoFee: 110,
              inspection: 180,
              salary: 4900,
            },
            waybills: { today: 7, month: 172 },
          },
          {
            id: 'd_102',
            name: '黄金满',
            revenue: { today: 36000, month: 880000 },
            cost: {
              charge: 1600,
              maintenance: 820,
              fuel: 4900,
              toll: 1600,
              loading: 760,
              parking: 480,
              misc: 420,
              consumables: 220,
              infoFee: 90,
              inspection: 150,
              salary: 4200,
            },
            waybills: { today: 6, month: 144 },
          },
        ],
      },
      {
        id: 'fleet_bj',
        name: '北京三车队',
        revenue: { today: 98000, month: 2600000 },
        vehicleCost: {
          trailer: { charge: 2500, maintenance: 1800, fuel: 5400, inspection: 900, consumables: 520 },
          tractor: { maintenance: 3200, inspection: 620 },
        },
        waybillCost: {
          toll: 9800,
          loading: 4200,
          parking: 900,
          infoFee: 720,
          misc: 700,
          driverSalary: 21000,
        },
        driverReportedCost: {
          charge: 5200,
          maintenance: 2700,
          fuel: 12200,
          toll: 4100,
          loading: 2100,
          parking: 1200,
          misc: 1100,
          consumables: 650,
          infoFee: 380,
          inspection: 520,
        },
        drivers: [
          {
            id: 'd_201',
            name: '刘强历',
            revenue: { today: 41000, month: 960000 },
            cost: {
              charge: 1700,
              maintenance: 900,
              fuel: 5200,
              toll: 1750,
              loading: 780,
              parking: 420,
              misc: 380,
              consumables: 210,
              infoFee: 90,
              inspection: 140,
              salary: 4300,
            },
            waybills: { today: 6, month: 150 },
          },
          {
            id: 'd_202',
            name: '朱叶飞',
            revenue: { today: 33000, month: 780000 },
            cost: {
              charge: 1400,
              maintenance: 820,
              fuel: 4300,
              toll: 1500,
              loading: 680,
              parking: 380,
              misc: 320,
              consumables: 190,
              infoFee: 80,
              inspection: 130,
              salary: 3600,
            },
            waybills: { today: 5, month: 118 },
          },
        ],
      },
    ];

    const fleetsComputed = fleets.map((f) => {
      const vehicleTrailer = sum(f.vehicleCost.trailer);
      const vehicleTractor = sum(f.vehicleCost.tractor);
      const vehicleTotal = vehicleTrailer + vehicleTractor;
      const waybillTotal = sum(f.waybillCost);
      const driverReportedTotal = sum(f.driverReportedCost);
      const totalCost = vehicleTotal + waybillTotal + driverReportedTotal;

      return {
        ...f,
        computed: {
          vehicleTrailer,
          vehicleTractor,
          vehicleTotal,
          waybillTotal,
          driverReportedTotal,
          totalCost,
          profit: {
            today: f.revenue.today - totalCost,
            week: f.revenue.today * 7 - totalCost * 7, // 仅用于演示：把日数据放大成“本周”口径
            month: f.revenue.month - totalCost * 20, // 仅用于演示：把日成本放大成“本月”口径
          },
          totalCostByPeriod: {
            today: totalCost,
            week: totalCost * 7,
            month: totalCost * 20,
          },
        },
      };
    });

    const company = fleetsComputed.reduce(
      (acc, f) => {
        acc.revenue.today += f.revenue.today;
        acc.revenue.week += f.revenue.today * 7; // 仅用于演示：把日数据放大成“本周”口径
        acc.revenue.month += f.revenue.month;
        acc.cost.today += f.computed.totalCostByPeriod.today;
        acc.cost.week += f.computed.totalCostByPeriod.week;
        acc.cost.month += f.computed.totalCostByPeriod.month;
        return acc;
      },
      { revenue: { today: 0, week: 0, month: 0 }, cost: { today: 0, week: 0, month: 0 } }
    );
    const companyProfit = {
      today: company.revenue.today - company.cost.today,
      week: company.revenue.week - company.cost.week,
      month: company.revenue.month - company.cost.month,
    };

    // 司机红黑榜数据（按运单量排序）
    const driverLeaderboard = fleets.flatMap(fleet => 
      fleet.drivers.map(driver => {
        // 为司机添加 week 数据
        if (!driver.waybills.week) {
          driver.waybills.week = driver.waybills.today * 7;
        }
        if (!driver.revenue.week) {
          driver.revenue.week = driver.revenue.today * 7;
        }
        // 处理自定义时间段的情况
        const currentPeriod = period === 'custom' ? 'week' : period;
        return {
          id: driver.id,
          name: driver.name,
          fleet: fleet.name,
          waybills: driver.waybills[currentPeriod],
          revenue: driver.revenue[currentPeriod],
          waybillList: [
          { id: 'YD20260331000001', date: '2026-03-31', amount: Math.floor(Math.random() * 3000) + 5000, status: 'completed', customer: '北京某某物流有限公司', route: '北京-上海', settlementType: '月结', origin: '北京市朝阳区', destination: '上海市浦东新区', planStartDate: '2026-03-31', planEndDate: '2026-04-01' },
          { id: 'YD20260330000002', date: '2026-03-30', amount: Math.floor(Math.random() * 3000) + 5000, status: 'completed', customer: '上海某某贸易有限公司', route: '上海-广州', settlementType: '现结', origin: '上海市浦东新区', destination: '广州市天河区', planStartDate: '2026-03-30', planEndDate: '2026-03-31' },
          { id: 'YD20260329000003', date: '2026-03-29', amount: Math.floor(Math.random() * 3000) + 5000, status: 'completed', customer: '广州某某制造有限公司', route: '广州-深圳', settlementType: '周结', origin: '广州市天河区', destination: '深圳市南山区', planStartDate: '2026-03-29', planEndDate: '2026-03-30' },
        ],
        details: {
          averageRevenue: Math.floor(driver.revenue[currentPeriod] / driver.waybills[currentPeriod] || 0),
          efficiencyRate: `${Math.floor(Math.random() * 20) + 80}%`,
          safetyScore: Math.floor(Math.random() * 10) + 90,
          totalDistance: `${Math.floor(Math.random() * 5000) + 10000}公里`,
        }
      };
    }))
    .sort((a, b) => b.waybills - a.waybills);

    // 核心线路利润排行数据
    const routeProfitRanking = [
      {
        id: 'route_001', 
        name: '北京-上海', 
        profit: 125000, 
        revenue: 350000, 
        cost: 225000, 
        waybills: 45,
        waybillList: [
          { id: 'YD20260331000001', date: '2026-03-31', amount: 8500, status: 'completed' },
          { id: 'YD20260330000002', date: '2026-03-30', amount: 7200, status: 'completed' },
          { id: 'YD20260329000003', date: '2026-03-29', amount: 9100, status: 'completed' },
        ],
        details: {
          distance: '1318公里',
          averageCost: 5000,
          averageProfit: 2778,
          successRate: '98%',
        }
      },
      {
        id: 'route_002', 
        name: '上海-广州', 
        profit: 98000, 
        revenue: 280000, 
        cost: 182000, 
        waybills: 38,
        waybillList: [
          { id: 'YD20260331000004', date: '2026-03-31', amount: 7800, status: 'completed' },
          { id: 'YD20260330000005', date: '2026-03-30', amount: 6500, status: 'completed' },
          { id: 'YD20260329000006', date: '2026-03-29', amount: 8200, status: 'completed' },
        ],
        details: {
          distance: '1430公里',
          averageCost: 4789,
          averageProfit: 2579,
          successRate: '96%',
        }
      },
      {
        id: 'route_003', 
        name: '广州-深圳', 
        profit: 85000, 
        revenue: 220000, 
        cost: 135000, 
        waybills: 52,
        waybillList: [
          { id: 'YD20260331000007', date: '2026-03-31', amount: 4200, status: 'completed' },
          { id: 'YD20260330000008', date: '2026-03-30', amount: 3800, status: 'completed' },
          { id: 'YD20260329000009', date: '2026-03-29', amount: 4500, status: 'completed' },
        ],
        details: {
          distance: '120公里',
          averageCost: 2596,
          averageProfit: 1635,
          successRate: '99%',
        }
      },
      {
        id: 'route_004', 
        name: '北京-广州', 
        profit: 72000, 
        revenue: 200000, 
        cost: 128000, 
        waybills: 32,
        waybillList: [
          { id: 'YD20260331000010', date: '2026-03-31', amount: 6800, status: 'completed' },
          { id: 'YD20260330000011', date: '2026-03-30', amount: 7100, status: 'completed' },
          { id: 'YD20260329000012', date: '2026-03-29', amount: 6500, status: 'completed' },
        ],
        details: {
          distance: '2120公里',
          averageCost: 4000,
          averageProfit: 2250,
          successRate: '95%',
        }
      },
      {
        id: 'route_005', 
        name: '上海-成都', 
        profit: 65000, 
        revenue: 180000, 
        cost: 115000, 
        waybills: 28,
        waybillList: [
          { id: 'wb_401', date: '2026-03-31', amount: 6800, status: 'completed' },
          { id: 'wb_402', date: '2026-03-30', amount: 6200, status: 'completed' },
          { id: 'wb_403', date: '2026-03-29', amount: 7100, status: 'completed' },
        ],
        details: {
          distance: '1980公里',
          averageCost: 4107,
          averageProfit: 2321,
          successRate: '97%',
        }
      },
    ].sort((a, b) => b.profit - a.profit);

    return { fleets: fleetsComputed, company, companyProfit, driverLeaderboard, routeProfitRanking };
  }, [period]);

  const selectedFleet = useMemo(() => mock.fleets.find((f) => f.id === selectedFleetId) ?? mock.fleets[0], [mock, selectedFleetId]);

  // 处理自定义时间段的情况
  const currentPeriod = period === 'custom' ? 'week' : period;
  const companyRevenue = mock.company.revenue[currentPeriod];
  const companyCost = mock.company.cost[currentPeriod];
  const companyProfit = mock.companyProfit[currentPeriod];
  const companyMargin = companyRevenue > 0 ? companyProfit / companyRevenue : 0;

  // 司机红黑榜数据（前5名和后5名）
  const topDrivers = mock.driverLeaderboard?.slice(0, 5) || [];
  const bottomDrivers = mock.driverLeaderboard?.slice(-5).reverse() || [];

  // 核心线路利润排行数据
  const topRoutes = mock.routeProfitRanking?.slice(0, 5) || [];

  const fleetRows = useMemo(() => {
    return mock.fleets
      .map((f) => {
        // 处理自定义时间段的情况
        const currentPeriod = period === 'custom' ? 'week' : period;
        // 确保 revenue 存在，如果不存在则使用 today 的数据
        const revenue = f.revenue[currentPeriod] || f.revenue.today * (currentPeriod === 'week' ? 7 : 20);
        const cost = f.computed.totalCostByPeriod[currentPeriod];
        const profit = revenue - cost;
        return {
          id: f.id,
          name: f.name,
          revenue,
          cost,
          profit,
          vehicleCost: f.computed.vehicleTotal,
          waybillCost: f.computed.waybillTotal,
          driverReportedCost: f.computed.driverReportedTotal,
          driversCount: f.drivers.length,
        };
      })
      .sort((a, b) => b.revenue - a.revenue);
  }, [mock, period]);

  const driverRows = useMemo(() => {
    const rows = (selectedFleet?.drivers ?? []).map((d) => {
      const revenue = d.revenue[period];
      const totalCost = sum(d.cost);
      const profit = revenue - totalCost;
      return {
        id: d.id,
        name: d.name,
        revenue,
        cost: totalCost,
        profit,
        waybills: d.waybills[period],
        breakdown: d.cost,
      };
    });
    return rows.sort((a, b) => b.revenue - a.revenue);
  }, [selectedFleet, period]);

  const handleFleetDrillDown = (fleetId) => {
    setSelectedFleetId(fleetId);
    setExpandedDriverId(null);
    // 等待下一帧渲染后滚动定位到驾驶员区
    requestAnimationFrame(() => {
      driverSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const costLabels = {
    charge: '充电',
    maintenance: '维保',
    fuel: '加油',
    toll: '过路',
    loading: '装卸货',
    parking: '停车',
    misc: '其他',
    consumables: '耗材',
    infoFee: '信息',
    inspection: '审车',
    salary: '工资',
  };

  const costBreakdownCompany = useMemo(() => {
    // 展示层：按三大类拆
    const vehicle = mock.fleets.reduce((acc, f) => acc + f.computed.vehicleTotal, 0);
    const waybill = mock.fleets.reduce((acc, f) => acc + f.computed.waybillTotal, 0);
    const driver = mock.fleets.reduce((acc, f) => acc + f.computed.driverReportedTotal, 0);
    const total = vehicle + waybill + driver;
    return { vehicle, waybill, driver, total };
  }, [mock]);

  // 司机红黑榜组件
  const DriverLeaderboard = ({ title, drivers, isTop }) => (
    <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${isTop ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} flex items-center justify-center shadow-sm`}>
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight">{title}</h2>
            <p className="text-xs font-bold text-slate-400 mt-1">按运单量排序</p>
          </div>
        </div>
        <div className="relative group">
          <img 
            src={isTop ? "https://api.dicebear.com/7.x/notionists/svg?seed=topdriver&backgroundColor=transparent" : "https://api.dicebear.com/7.x/notionists/svg?seed=improvedriver&backgroundColor=transparent"} 
            alt={title} 
            className="w-16 h-16 object-cover rounded-[1.5rem] shadow-md transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute -bottom-4 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity font-bold shadow-lg">
            {isTop ? '优秀司机' : '待提升司机'}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {drivers.map((driver, index) => (
          <div 
            key={driver.id} 
            className="relative flex items-center justify-between p-4 rounded-[1.75rem] bg-slate-50/70 border border-slate-100 transition-all duration-300 cursor-pointer hover:bg-slate-50 hover:shadow-md"
            onMouseEnter={() => {
              // 确保只显示当前卡片的近期运单列表
              setHoveredDriver(driver.id);
              setHoveredRoute(null);
            }}
            onMouseLeave={() => setHoveredDriver(null)}
            onClick={() => {
              setSelectedDriver(driver);
              setShowDriverModal(true);
            }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg ${isTop ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {index + 1}
              </div>
              <div>
                <div className="text-[14px] font-black text-slate-800">{driver.name}</div>
                <div className="text-[11px] font-bold text-slate-400">{driver.fleet}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[16px] font-black text-slate-800">{driver.waybills} 单</div>
              <div className="text-[11px] font-bold text-slate-400">{formatCNY(driver.revenue)}</div>
            </div>
            
            {/* 鼠标移入时显示的运单数据列表 */}
            {hoveredDriver === driver.id && (
              <div className="absolute bottom-full right-0 mb-2 w-80 bg-white rounded-[1.75rem] shadow-xl shadow-slate-200/80 border border-slate-100 p-4 z-500">
                <div className="text-[12px] font-black text-slate-700 mb-3">近期运单</div>
                <div className="space-y-3">
                  {driver.waybillList.map(waybill => (
                    <div key={waybill.id} className="flex justify-between items-center p-2 bg-slate-50/70 rounded-xl">
                      <div>
                        <div className="text-[11px] font-bold text-slate-600">{waybill.date}</div>
                        <div className="text-[10px] font-bold text-slate-400">运单 #{waybill.id}</div>
                      </div>
                      <div className="text-[12px] font-black text-slate-800">{formatCNY(waybill.amount)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[10px] font-bold text-slate-400 text-right">点击查看详情</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // 核心线路利润排行组件
  const RouteProfitRanking = () => (
    <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight">核心线路利润排行</h2>
            <p className="text-xs font-bold text-slate-400 mt-1">按利润排序</p>
          </div>
        </div>
        <div className="relative group">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=route&backgroundColor=transparent" 
            alt="核心线路利润排行" 
            className="w-16 h-16 object-cover rounded-[1.5rem] shadow-md transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute -bottom-4 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity font-bold shadow-lg">
            核心线路分析
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {topRoutes.map((route, index) => (
          <div 
            key={route.id} 
            className="relative flex items-center justify-between p-4 rounded-[1.75rem] bg-slate-50/70 border border-slate-100 transition-all duration-300 cursor-pointer hover:bg-slate-50 hover:shadow-md"
            onMouseEnter={() => {
              // 确保只显示当前卡片的近期运单列表
              setHoveredRoute(route.id);
              setHoveredDriver(null);
            }}
            onMouseLeave={() => setHoveredRoute(null)}
            onClick={() => {
              setSelectedRoute(route);
              setShowRouteModal(true);
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg bg-indigo-100 text-indigo-700">
                {index + 1}
              </div>
              <div>
                <div className="text-[14px] font-black text-slate-800">{route.name}</div>
                <div className="text-[11px] font-bold text-slate-400">{route.waybills} 单</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[16px] font-black text-emerald-600">{formatCNY(route.profit)}</div>
            </div>
            
            {/* 鼠标移入时显示的线路数据列表 */}
            {hoveredRoute === route.id && (
              <div className="absolute bottom-full right-0 mb-2 w-80 bg-white rounded-[1.75rem] shadow-xl shadow-slate-200/80 border border-slate-100 p-4 z-500">
                <div className="text-[12px] font-black text-slate-700 mb-3">近期运单</div>
                <div className="space-y-3">
                  {route.waybillList.map(waybill => (
                    <div key={waybill.id} className="flex justify-between items-center p-2 bg-slate-50/70 rounded-xl">
                      <div>
                        <div className="text-[11px] font-bold text-slate-600">{waybill.date}</div>
                        <div className="text-[10px] font-bold text-slate-400">运单 #{waybill.id}</div>
                      </div>
                      <div className="text-[12px] font-black text-slate-800">{formatCNY(waybill.amount)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[10px] font-bold text-slate-400 text-right">点击查看详情</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // 司机详情弹框组件
  const DriverDetailModal = () => (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-white max-w-2xl w-full mx-4 p-8 animate-slideIn">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">司机详情</h2>
              <p className="text-xs font-bold text-slate-400 mt-1">{selectedDriver?.name} 的详细信息</p>
            </div>
          </div>
          <button 
            type="button" 
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all"
            onClick={() => setShowDriverModal(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50/70 rounded-[1.75rem] border border-slate-100 p-5 transition-all hover:shadow-sm">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">基本信息</div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">姓名</div>
                  <div className="text-[13px] font-black text-slate-800">{selectedDriver?.name || '—'}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">所属车队</div>
                  <div className="text-[13px] font-black text-slate-800">{selectedDriver?.fleet || '—'}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">运单数量</div>
                  <div className="text-[13px] font-black text-slate-800">{selectedDriver?.waybills || 0} 单</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">总营收</div>
                  <div className="text-[13px] font-black text-slate-800">{formatCNY(selectedDriver?.revenue || 0)}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50/70 rounded-[1.75rem] border border-slate-100 p-5 transition-all hover:shadow-sm">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">绩效指标</div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">平均营收</div>
                  <div className="text-[13px] font-black text-slate-800">{formatCNY(selectedDriver?.details?.averageRevenue || 0)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50/70 rounded-[1.75rem] border border-slate-100 p-5 transition-all hover:shadow-sm">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">近期运单</div>
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <table className="w-full text-left">
                  <thead className="bg-white rounded-t-[1rem] border border-slate-100">
                    <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-4 py-3">运单号</th>
                      <th className="px-4 py-3">结算金额</th>
                      <th className="px-4 py-3">客户名称</th>
                      <th className="px-4 py-3">路线名称</th>
                      <th className="px-4 py-3">结算类型</th>
                      <th className="px-4 py-3">装货地</th>
                      <th className="px-4 py-3">卸货地</th>
                      <th className="px-4 py-3">计划开始日期</th>
                      <th className="px-4 py-3">计划结束日期</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedDriver?.waybillList?.length > 0 ? (
                      selectedDriver.waybillList.map(waybill => (
                        <tr key={waybill.id} className="bg-white transition-all hover:bg-slate-50/50">
                          <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.id}</td>
                          <td className="px-4 py-3 text-[13px] font-black text-slate-800">{formatCNY(waybill.amount)}</td>
                          <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.customer}</td>
                          <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.route}</td>
                          <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.settlementType}</td>
                          <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.origin}</td>
                          <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.destination}</td>
                          <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.planStartDate}</td>
                          <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.planEndDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white">
                        <td colSpan={9} className="px-4 py-8 text-center text-[13px] font-bold text-slate-400">
                          暂无运单数据
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          <button 
            type="button" 
            className="px-6 py-3 rounded-2xl text-[13px] font-black text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
            onClick={() => setShowDriverModal(false)}
          >
            关闭
          </button>
          <button 
            type="button" 
            className="px-6 py-3 rounded-2xl text-[13px] font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            查看完整记录
          </button>
        </div>
      </div>
    </div>
  );

  // 线路详情弹框组件
  const RouteDetailModal = () => (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-white max-w-2xl w-full mx-4 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">线路详情</h2>
              <p className="text-xs font-bold text-slate-400 mt-1">{selectedRoute?.name} 的详细信息</p>
            </div>
          </div>
          <button 
            type="button" 
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all"
            onClick={() => setShowRouteModal(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50/70 rounded-[1.75rem] border border-slate-100 p-5">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">线路信息</div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">线路名称</div>
                  <div className="text-[13px] font-black text-slate-800">{selectedRoute?.name}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">运单数量</div>
                  <div className="text-[13px] font-black text-slate-800">{selectedRoute?.waybills} 单</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">总营收</div>
                  <div className="text-[13px] font-black text-slate-800">{formatCNY(selectedRoute?.revenue)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">总成本</div>
                  <div className="text-[13px] font-black text-rose-600">{formatCNY(selectedRoute?.cost)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">总利润</div>
                  <div className="text-[13px] font-black text-emerald-600">{formatCNY(selectedRoute?.profit)}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50/70 rounded-[1.75rem] border border-slate-100 p-5">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">线路指标</div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">距离</div>
                  <div className="text-[13px] font-black text-slate-800">{selectedRoute?.details?.distance}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">平均成本</div>
                  <div className="text-[13px] font-black text-slate-800">{formatCNY(selectedRoute?.details?.averageCost)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[13px] font-bold text-slate-600">平均利润</div>
                  <div className="text-[13px] font-black text-emerald-600">{formatCNY(selectedRoute?.details?.averageProfit)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50/70 rounded-[1.75rem] border border-slate-100 p-5">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">近期运单</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white rounded-t-[1rem] border border-slate-100">
                  <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-4 py-3">运单号</th>
                    <th className="px-4 py-3">日期</th>
                    <th className="px-4 py-3">金额</th>
                    <th className="px-4 py-3">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedRoute?.waybillList.map(waybill => (
                    <tr key={waybill.id} className="bg-white">
                      <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.id}</td>
                      <td className="px-4 py-3 text-[13px] font-bold text-slate-600">{waybill.date}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-slate-800">{formatCNY(waybill.amount)}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black border bg-emerald-50 text-emerald-600 border-emerald-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          已完成
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          <button 
            type="button" 
            className="px-6 py-3 rounded-2xl text-[13px] font-black text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
            onClick={() => setShowRouteModal(false)}
          >
            关闭
          </button>
          <button 
            type="button" 
            className="px-6 py-3 rounded-2xl text-[13px] font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            查看完整记录
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* 顶部标题 + 时间维度 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-14 h-14 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
            <Building2 className="w-7 h-7 text-indigo-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight truncate">首页数据统计大屏</h1>
            <p className="text-sm font-black text-slate-400 mt-1 uppercase tracking-widest">Revenue / Cost / Profit Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto relative z-20">
          <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-2 flex items-center gap-2 relative z-10">
            <button
              type="button"
              onClick={() => setPeriod('today')}
              className={`px-6 py-3 rounded-2xl text-[13px] font-black transition-all ${
                period === 'today' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              今日
            </button>
            <button
              type="button"
              onClick={() => setPeriod('week')}
              className={`px-6 py-3 rounded-2xl text-[13px] font-black transition-all ${
                period === 'week' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              本周
            </button>
            <button
              type="button"
              onClick={() => setPeriod('month')}
              className={`px-6 py-3 rounded-2xl text-[13px] font-black transition-all ${
                period === 'month' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              本月
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCustomDatePicker(!showCustomDatePicker);
                if (!showCustomDatePicker) {
                  setTempPeriod(period); // 保存当前选中的时间段
                }
              }}
              className={`px-6 py-3 rounded-2xl text-[13px] font-black transition-all ${
                period === 'custom' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              自定义
            </button>
            {showCustomDatePicker && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-4 w-80 z-500">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-500 mb-2">开始日期</label>
                    <input
                      type="date"
                      value={customDateRange.start}
                      onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 mb-2">结束日期</label>
                    <input
                      type="date"
                      value={customDateRange.end}
                      onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomDatePicker(false);
                        // 取消时恢复之前的时间段
                        if (period === 'custom') {
                          setPeriod(tempPeriod);
                        }
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-black text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPeriod('custom'); // 只有在确定后才设置为custom
                        setShowCustomDatePicker(false);
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      确定
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="relative group">
              <img 
                src="https://api.dicebear.com/7.x/notionists/svg?seed=fleet&backgroundColor=transparent" 
                alt="车队管理" 
                className="w-32 h-32 object-cover rounded-[2rem] shadow-lg transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-4 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity font-bold shadow-lg">
                车队管理概览
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 公司 KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPI title="公司总体营收" value={formatCNY(companyRevenue)} sub="汇总所有车队" icon={BadgeDollarSign} tone="indigo" />
        <KPI title="公司总体成本" value={formatCNY(companyCost)} sub="上报所有费用 + 工资" icon={Receipt} tone="rose" />
        <KPI title="公司总体利润" value={formatCNY(companyProfit)} sub="汇总所有车队" icon={TrendingUp} tone="emerald" />
        <KPI
          title="成本结构"
          value={formatCNY(costBreakdownCompany.total)}
          sub={`车成本 ${formatCNY(costBreakdownCompany.vehicle)} · 运单成本 ${formatCNY(costBreakdownCompany.waybill)} · 驾驶员成本 ${formatCNY(costBreakdownCompany.driver)}`}
          icon={PieChart}
          tone="amber"
        />
      </div>

      {/* 司机红黑榜和核心线路利润排行 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DriverLeaderboard title="司机红榜" drivers={topDrivers} isTop={true} />
          <DriverLeaderboard title="司机黑榜" drivers={bottomDrivers} isTop={false} />
        </div>
        <RouteProfitRanking />
      </div>

      {/* 车队维度：对比 + 表格 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-800 tracking-tight">车队经营概览</h2>
                <p className="text-xs font-bold text-slate-400 mt-1">点击车队可下钻至驾驶员维度</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr className="text-[12px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-5">车队</th>
                  <th className="px-4 py-5">营收</th>
                  <th className="px-4 py-5">成本</th>
                  <th className="px-4 py-5">利润</th>
                  <th className="px-6 py-5">结构</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/80">
                {fleetRows.map((r) => {
                  const isActive = r.id === selectedFleetId;
                  return (
                    <tr
                      key={r.id}
                      className={`cursor-pointer transition-colors ${isActive ? 'bg-indigo-50/40' : 'hover:bg-indigo-50/20'}`}
                      onClick={() => handleFleetDrillDown(r.id)}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shadow-sm ${isActive ? 'bg-white border-indigo-100 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                            <Wallet className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[14px] font-black text-slate-800 truncate flex items-center gap-2">
                              {r.name}
                              {isActive ? <ChevronRight className="w-4 h-4 text-indigo-500" /> : null}
                            </div>
                            <div className="text-[11px] font-bold text-slate-400 mt-1">{r.driversCount} 名驾驶员</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-[13px] font-black text-slate-700">{formatCNY(r.revenue)}</td>
                      <td className="px-4 py-5 text-[13px] font-black text-rose-600">{formatCNY(r.cost)}</td>
                      <td className={`px-4 py-5 text-[13px] font-black ${r.profit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatCNY(r.profit)}</td>
                      <td className="px-6 py-5">
                        <StackedBar revenue={r.revenue} cost={r.cost} profit={r.profit} />
                        <div className="mt-2 text-[10px] font-bold text-slate-400">
                          车 {formatCNY(r.vehicleCost)} · 运单 {formatCNY(r.waybillCost)} · 驾驶员 {formatCNY(r.driverReportedCost)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 选中车队的成本口径卡片 */}
        <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-black text-slate-800 tracking-tight truncate">{selectedFleet?.name ?? '车队'}</h2>
              <p className="text-xs font-bold text-slate-400 mt-1">成本口径拆分（示例数据）</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] bg-slate-50/70 border border-slate-100 p-5 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">车成本（挂车 + 牵引车）</div>
                <div className="text-sm font-black text-slate-800">{formatCNY(selectedFleet?.computed.vehicleTotal ?? 0)}</div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl border border-slate-100 p-4">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">挂车</div>
                  <div className="text-[13px] font-black text-slate-700">{formatCNY(selectedFleet ? sum(selectedFleet.vehicleCost.trailer) : 0)}</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-2">
                    充电/维保/加油/审车/耗材
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-4">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">牵引车</div>
                  <div className="text-[13px] font-black text-slate-700">{formatCNY(selectedFleet ? sum(selectedFleet.vehicleCost.tractor) : 0)}</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-2">
                    维保/审车
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-50/70 border border-slate-100 p-5 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">运单成本</div>
                <div className="text-sm font-black text-slate-800">{formatCNY(selectedFleet?.computed.waybillTotal ?? 0)}</div>
              </div>
              <div className="mt-3 text-[11px] font-bold text-slate-400">
                过路费/装卸货/停车/信息/其他/驾驶员工资
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-50/70 border border-slate-100 p-5 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">驾驶员成本（上报）</div>
                <div className="text-sm font-black text-slate-800">{formatCNY(selectedFleet?.computed.driverReportedTotal ?? 0)}</div>
              </div>
              <div className="mt-3 text-[11px] font-bold text-slate-400">
                充电/维保/加油/过路/装卸/停车/其他/耗材/信息/审车
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 驾驶员维度 */}
      <div ref={driverSectionRef} className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 scroll-mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 tracking-tight">驾驶员经营明细（{selectedFleet?.name ?? '—'}）</h2>
              <p className="text-xs font-bold text-slate-400 mt-1">营收 / 成本 / 利润 / 运单数（示例数据）</p>
            </div>
          </div>
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            点击驾驶员行可展开成本分项
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-[12px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-5">驾驶员</th>
                <th className="px-4 py-5">营收</th>
                <th className="px-4 py-5">成本</th>
                <th className="px-4 py-5">利润</th>
                <th className="px-6 py-5">运单数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {driverRows.map((d) => {
                const isExpanded = expandedDriverId === d.id;
                const entries = Object.entries(d.breakdown ?? {})
                  .map(([k, v]) => ({ key: k, label: costLabels[k] ?? k, value: Number(v || 0) }))
                  .sort((a, b) => b.value - a.value);

                return (
                  <React.Fragment key={d.id}>
                    <tr
                      className={`cursor-pointer transition-colors ${isExpanded ? 'bg-emerald-50/20' : 'hover:bg-emerald-50/10'}`}
                      onClick={() => setExpandedDriverId((prev) => (prev === d.id ? null : d.id))}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shadow-sm ${isExpanded ? 'bg-white border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                            <User className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[14px] font-black text-slate-800 truncate flex items-center gap-2">
                              {d.name}
                              <span className={`text-[10px] font-black px-2 py-1 rounded-full border ${isExpanded ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                {isExpanded ? '收起明细' : '展开明细'}
                              </span>
                            </div>
                            <div className="text-[11px] font-bold text-slate-400 mt-1">成本口径：上报费用 + 工资</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-[13px] font-black text-slate-700">{formatCNY(d.revenue)}</td>
                      <td className="px-4 py-5 text-[13px] font-black text-rose-600">{formatCNY(d.cost)}</td>
                      <td className={`px-4 py-5 text-[13px] font-black ${d.profit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatCNY(d.profit)}</td>
                      <td className="px-6 py-5 text-[13px] font-black text-slate-700">{d.waybills}</td>
                    </tr>
                    {isExpanded ? (
                      <tr className="bg-white">
                        <td colSpan={6} className="px-6 pb-6">
                          <div className="mt-2 rounded-[1.75rem] bg-slate-50/70 border border-slate-100 p-6 shadow-inner">
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">成本分项明细（示例）</div>
                              <div className="text-[12px] font-black text-slate-700">合计 {formatCNY(d.cost)}</div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                              {entries.map((e) => (
                                <div key={e.key} className="bg-white rounded-2xl border border-slate-100 p-4">
                                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{e.label}</div>
                                  <div className="text-[13px] font-black text-slate-800 mt-2">{formatCNY(e.value)}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 司机详情弹框 */}
      {showDriverModal && <DriverDetailModal />}
      
      {/* 线路详情弹框 */}
      {showRouteModal && <RouteDetailModal />}
    </div>
  );
}

