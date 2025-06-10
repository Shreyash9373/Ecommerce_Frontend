import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import { format } from 'date-fns';
import { Select, Theme } from '@radix-ui/themes';
import Breadcrumbs from '../../components/Breadcrumbs';
import '@radix-ui/themes/styles.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Insights = () => {
  const { user } = useAuth();
  const [purchaseSummary, setPurchaseSummary] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [spendingPatterns, setSpendingPatterns] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
        
        const summaryRes = await axios.get('/api/v1/user/purchase-summary', { headers });
        setPurchaseSummary(summaryRes.data.data);
        
        const statusRes = await axios.get('/api/v1/user/order-status-insights', { headers });
        setOrderStatus(statusRes.data.data);
        
        const patternsRes = await axios.get('/api/v1/user/spending-patterns', { headers });
        setSpendingPatterns(patternsRes.data.data);
        
        const monthlyRes = await axios.get(`/api/v1/user/monthly-spending?year=${selectedYear}`, { headers });
        setMonthlySpending(monthlyRes.data.data);
      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, selectedYear]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading insights...</div>;
  }

  // Filter purchase summary by selected month
  const filteredPurchaseSummary = selectedMonth === 'all' 
    ? purchaseSummary 
    : purchaseSummary.filter(item => item.month === parseInt(selectedMonth));

  // Format data for charts
  const formattedPurchaseSummary = filteredPurchaseSummary.map(item => ({
    name: `${monthNames[item.month - 1]} ${item.year}`,
    orders: item.totalOrders,
    amount: item.totalAmount,
    avg: item.averageOrderValue
  }));

  const formattedMonthlySpending = monthlySpending.map(item => ({
    name: monthNames[item.month - 1],
    amount: item.totalSpent,
    orders: item.orderCount
  }));

  const formattedSpendingPatterns = spendingPatterns.map(item => ({
    date: format(new Date(item.date), 'MMM dd'),
    amount: item.totalSpent
  }));

  return (
    <Theme>
      <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 md:ml-12 lg:ml-24">
        <Breadcrumbs />
        <h2 className="text-xl font-semibold md:text-2xl">Your Shopping Insights</h2>
        
        {/* Year Selector */}
        <div className="flex justify-end mb-4 " >
          <Select.Root 
            value={selectedYear.toString()} 
            onValueChange={(value) => setSelectedYear(parseInt(value))}
            size="1"
            
          >
            <Select.Trigger className="w-[120px]  bg-white text-black" />
            <Select.Content position="popper" className="bg-white text-black">
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <Select.Item key={year} value={year.toString()} className="hover:bg-black text-black">{year}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Purchase Summary with Month Selector */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Monthly Purchase Summary</h2>
              <Select.Root 
                value={selectedMonth} 
                onValueChange={setSelectedMonth}
                size="1"
              >
                <Select.Trigger className="w-[120px] bg-white text-black" />
                <Select.Content position="popper" className="bg-white text-black">
                  <Select.Item value="all" className="hover:bg-black text-black">All Months</Select.Item>
                  {monthNames.map((month, index) => (
                    <Select.Item key={month} value={(index + 1).toString()} className="hover:bg-black text-black">
                      {month}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formattedPurchaseSummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" name="Total Orders" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="amount" name="Total Spent" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Order Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Rest of your components remain the same */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Monthly Spending - {selectedYear}</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedMonthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.2}
                    name="Total Spent" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#ff7300" 
                    strokeWidth={2}
                    name="Orders" 
                    dot={{ r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Daily Spending</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedSpendingPatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Amount Spent" 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
};

export default Insights;