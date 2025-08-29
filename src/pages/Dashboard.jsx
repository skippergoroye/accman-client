import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Button } from "../components/ui/button";
import Addmoney from "../components/dashboard/Addmoney";
import RecentActivity from "../components/dashboard/RecentActivity";
import TransactionList from "../components/dashboard/TransactionList";
import { useGetBalanceQuery } from "../features/api/users";
import EditCash from "../utils/editCash";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isFetching } = useGetBalanceQuery();

  return (
    <DashboardLayout>
      <div className="w-[96%] lg:w-[495px] bg-white rounded-lg h-[161px] flex flex-col justify-between p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-violet-600">Total Balance</p>
          <Button onClick={() => setIsOpen(!isOpen)}>ADD MONEY</Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm">
            NGN{" "}
            <span className="text-2xl font-semibold">
              <EditCash amount={data?.balance || 0} />
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 pr-4 mt-14">
        {/* <RecentActivity /> */}
        <TransactionList />
      </div>
      <Addmoney isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </DashboardLayout>
  );
};

export default Dashboard;
