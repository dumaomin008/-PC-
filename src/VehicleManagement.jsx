import React, { useState, useMemo } from 'react';
import { Search, Filter, RefreshCw, Upload, Plus, Star, StarOff, Edit, Trash2, MoreHorizontal, ChevronLeft, ChevronRight, Car } from 'lucide-react';

// 车辆管理页面组件
const VehicleManagement = () => {
  // 模拟数据
  const mockVehicles = useMemo(() => {
    const vehicles = [];
    for (let i = 1; i <= 10; i++) {
      vehicles.push({
        id: i,
        star: i % 2 === 1,
        plateNumber: i % 2 === 1 ? '贵A2332M0' : '贵A171N8',
        source: i % 2 === 1 ? '自有' : '外调',
        type: i % 2 === 1 ? '挂车' : '牵引车',
        info: i % 2 === 1 ? 'HCC3330DWr2G2046082\n桂糖罐' : 'HCC3330DWr2G2046082\n贵州(新欧曼)',
        status: i % 2 === 1 ? '运输中' : '闲置中',
        driver: '王滨',
        driverPhone: '137****2345',
        currentWaybill: i % 2 === 1 ? 'YD20260228000014' : '',
        inspectionExpiry: '2026-03-19',
        roadTransportExpiry: '2026-03-19',
        trafficInspectionExpiry: '2026-03-19'
      });
    }
    return vehicles;
  }, []);

  // 状态管理
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [filters, setFilters] = useState({
    attention: '全部',
    plateNumber: '',
    vin: '',
    status: '全部',
    type: '全部',
    inspectionExpiry: '',
    roadTransportExpiry: '',
    trafficInspectionExpiry: ''
  });

  // 处理关注状态切换
  const handleStarToggle = (id) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, star: !vehicle.star } : vehicle
    ));
  };

  // 处理筛选条件变化
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // 处理搜索
  const handleSearch = () => {
    // 这里可以添加搜索逻辑
    console.log('搜索', filters);
  };

  // 处理重置
  const handleReset = () => {
    setFilters({
      attention: '全部',
      plateNumber: '',
      vin: '',
      status: '全部',
      type: '全部',
      inspectionExpiry: '',
      roadTransportExpiry: '',
      trafficInspectionExpiry: ''
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
            <Car className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">车辆管理中心</h1>
            <p className="text-sm font-black text-slate-400 mt-1 uppercase tracking-widest">Fleet Vehicle Management Hub</p>
          </div>
        </div>
        <button type="button" className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] hover:bg-indigo-600 transition-all font-black text-sm shadow-xl shadow-slate-900/10 hover:-translate-y-1">
          <Plus className="w-6 h-6" />
          <span>新增车辆</span>
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8">

              {/* 车辆类型统计 */}
              <div className="grid grid-cols-7 gap-4 mb-8">
                <div className="bg-slate-50/70 border border-slate-100 rounded-[1.75rem] p-4">
                  <div className="text-lg font-black text-slate-800">100 台</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">牵引车</div>
                </div>
                <div className="bg-slate-50/70 border border-slate-100 rounded-[1.75rem] p-4">
                  <div className="text-lg font-black text-slate-800">200 台</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">挂车</div>
                </div>
                <div className="bg-slate-50/70 border border-slate-100 rounded-[1.75rem] p-4">
                  <div className="text-lg font-black text-slate-800">200 台</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">运输车辆</div>
                </div>
                <div className="bg-slate-50/70 border border-slate-100 rounded-[1.75rem] p-4">
                  <div className="text-lg font-black text-slate-800">200 台</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">空调车辆</div>
                </div>
                <div className="bg-slate-50/70 border border-slate-100 rounded-[1.75rem] p-4">
                  <div className="text-lg font-black text-slate-800">200 台</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">行驶证定期到期</div>
                </div>
                <div className="bg-slate-50/70 border border-slate-100 rounded-[1.75rem] p-4">
                  <div className="text-lg font-black text-slate-800">200 台</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">道路运输证定期到期</div>
                </div>
                <div className="bg-slate-50/70 border border-slate-100 rounded-[1.75rem] p-4">
                  <div className="text-lg font-black text-slate-800">200 台</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">交通检验定期到期</div>
                </div>
              </div>

              {/* 筛选条件 */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-[1.75rem] p-6 mb-8">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">关注状态</label>
                    <select 
                      name="attention" 
                      value={filters.attention}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="全部">全部</option>
                      <option value="已关注">已关注</option>
                      <option value="未关注">未关注</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">车牌号</label>
                    <input 
                      type="text" 
                      name="plateNumber" 
                      value={filters.plateNumber}
                      onChange={handleFilterChange}
                      placeholder="请输入" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">VIN码</label>
                    <input 
                      type="text" 
                      name="vin" 
                      value={filters.vin}
                      onChange={handleFilterChange}
                      placeholder="请输入" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">车辆状态</label>
                    <select 
                      name="status" 
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="全部">全部</option>
                      <option value="运输中">运输中</option>
                      <option value="闲置中">闲置中</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">车辆类型</label>
                    <select 
                      name="type" 
                      value={filters.type}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="全部">全部</option>
                      <option value="牵引车">牵引车</option>
                      <option value="挂车">挂车</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">检验有效期</label>
                    <input 
                      type="date" 
                      name="inspectionExpiry" 
                      value={filters.inspectionExpiry}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">道路运输证有效期</label>
                    <input 
                      type="date" 
                      name="roadTransportExpiry" 
                      value={filters.roadTransportExpiry}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">交通检验有效期</label>
                    <input 
                      type="date" 
                      name="trafficInspectionExpiry" 
                      value={filters.trafficInspectionExpiry}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <button 
                    onClick={handleSearch}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-300"
                  >
                    搜索
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-sm font-black transition-all hover:bg-slate-200"
                  >
                    重置
                  </button>
                  <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-sm font-black transition-all hover:bg-slate-200 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    批量导入
                  </button>
                  <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-sm font-black transition-all hover:bg-slate-200 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    整批导入
                  </button>
                  <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-sm font-black transition-all hover:bg-slate-200 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    新建挂车
                  </button>
                  <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-sm font-black transition-all hover:bg-slate-200 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    新建牵引车
                  </button>
                </div>
              </div>

              {/* 车辆表格 */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 border-b border-slate-100">
                    <tr className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-4 py-5">序号</th>
                      <th className="px-4 py-5">关注</th>
                      <th className="px-4 py-5">车牌号</th>
                      <th className="px-4 py-5">车辆来源</th>
                      <th className="px-4 py-5">车辆类型</th>
                      <th className="px-4 py-5">车辆信息</th>
                      <th className="px-4 py-5">车辆状态</th>
                      <th className="px-4 py-5">操作司机</th>
                      <th className="px-4 py-5">当前运输单号</th>
                      <th className="px-4 py-5">年检有效期至</th>
                      <th className="px-4 py-5">道路运输证有效期至</th>
                      <th className="px-4 py-5">交通检验有效期至</th>
                      <th className="px-4 py-5">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50/80">
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-5 text-sm font-black text-slate-700">{vehicle.id}</td>
                        <td className="px-4 py-5">
                          <button 
                            onClick={() => handleStarToggle(vehicle.id)}
                            className="text-yellow-500 hover:text-yellow-600 transition-colors"
                          >
                            {vehicle.star ? <Star className="w-5 h-5" /> : <StarOff className="w-5 h-5" />}
                          </button>
                        </td>
                        <td className="px-4 py-5">
                          <span className={`text-sm font-black px-2 py-1 rounded-full ${vehicle.source === '自有' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {vehicle.plateNumber}
                          </span>
                        </td>
                        <td className="px-4 py-5 text-sm font-black text-slate-700">{vehicle.source}</td>
                        <td className="px-4 py-5 text-sm font-black text-slate-700">{vehicle.type}</td>
                        <td className="px-4 py-5 text-sm font-black text-slate-700 whitespace-pre-line">{vehicle.info}</td>
                        <td className="px-4 py-5">
                          <span className={`text-sm font-black px-2 py-1 rounded-full ${vehicle.status === '运输中' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-4 py-5 text-sm font-black text-slate-700">
                          {vehicle.driver}<br />
                          <span className="text-xs text-slate-400">{vehicle.driverPhone}</span>
                        </td>
                        <td className="px-4 py-5 text-sm font-black text-slate-700">{vehicle.currentWaybill}</td>
                        <td className="px-4 py-5 text-sm font-black text-slate-700">{vehicle.inspectionExpiry}</td>
                        <td className="px-4 py-5 text-sm font-black text-slate-700">{vehicle.roadTransportExpiry}</td>
                        <td className="px-4 py-5 text-sm font-black text-slate-700">{vehicle.trafficInspectionExpiry}</td>
                        <td className="px-4 py-5">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-blue-500">
                              <span className="text-xs font-bold">详情</span>
                            </button>
                            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-indigo-500">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-rose-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 分页 */}
              <div className="flex items-center justify-between mt-8">
                <div className="text-sm font-bold text-slate-400">
                  共 400 条
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
                    3
                  </button>
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
                    4
                  </button>
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
                    5
                  </button>
                  <span className="text-slate-400">...</span>
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
                    6
                  </button>
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
                    20
                  </button>
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm font-bold text-slate-400">
                  前 3 页
                </div>
              </div>
      </div>
    </div>
  );
};

export default VehicleManagement;