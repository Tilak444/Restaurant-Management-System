// ─── Dashboard Page ───────────────────────────────────────────────────────────
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/charts/ChartCard';
import SalesChart from '../components/charts/SalesChart';
import ExpensesChart from '../components/charts/ExpensesChart';
import StatusBadge from '../components/ui/StatusBadge';
import PageHeader from '../components/ui/PageHeader';
import { statCards, salesChartData, expensesChartData, recentOrders, topItems } from '../data/dashboardData';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening at Wow Pizza Hub today."
        action={
          <span className="text-xs bg-orange-50 text-orange-600 font-semibold px-3 py-1.5 rounded-full border border-orange-100">
            📅 Monday, 9 Jun 2026
          </span>
        }
      />

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ChartCard
          title="Sales Overview"
          subtitle="Monthly revenue — current year"
        >
          <SalesChart data={salesChartData} />
        </ChartCard>
        <ChartCard
          title="Expenses Overview"
          subtitle="Monthly cost breakdown"
        >
          <ExpensesChart data={expensesChartData} />
        </ChartCard>
      </div>

      {/* ── Bottom Row: Recent Orders + Top Items ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
              <p className="text-xs text-gray-500 mt-0.5">Latest transactions today</p>
            </div>
            <Link
              to="/orders"
              className="text-xs text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/70">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-2.5">Order ID</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5">Table</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5">Status</th>
                  <th className="text-right text-xs font-semibold text-gray-500 px-5 py-2.5">Amount</th>
                  <th className="text-right text-xs font-semibold text-gray-500 px-5 py-2.5">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-3 text-sm font-semibold text-orange-500">{order.id}</td>
                    <td className="px-3 py-3 text-sm text-gray-800">{order.customer}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{order.table}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-sm font-semibold text-gray-900 text-right">{order.amount}</td>
                    <td className="px-5 py-3 text-xs text-gray-400 text-right">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Items */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Top Selling Items</h3>
          <p className="text-xs text-gray-500 mb-4">This month</p>
          <div className="space-y-3">
            {topItems.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-2xl">{item.img}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-orange-400 h-1.5 rounded-full transition-all"
                        style={{ width: `${100 - i * 16}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">{item.sold} sold</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 shrink-0">{item.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
