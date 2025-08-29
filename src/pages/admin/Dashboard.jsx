import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import DocumentImg from "../../assets/PNG/documents.png";
import PropsType from "prop-types";
import EditCash from "../../utils/editCash";
import UserList from "../../components/dashboard/UserList";

import { useSelector } from "react-redux";
import {
  useAdminDashboardMetricsQuery,
  useGetAllUsersQuery,
} from "../../features/api/admin";

const AdminDashboard = () => {
  const { isLoading } = useGetAllUsersQuery();

  const { data } = useAdminDashboardMetricsQuery();

  return (
    <DashboardLayout>
      <div className="grid grid-cols-3 gap-4 pr-4">
        <TopCard
          title={"Total Balance"}
          amount={data?.data?.totalBalance || 0}
          isAmount={true}
        />
        <TopCard
          title={"Pending Transactions"}
          textColor="text-green-500"
          amount={data?.data?.pendingTransactions || 0}
          isAmount={false}
        />
        <TopCard
          title={"Failed Transactions"}
          textColor="text-red-500"
          amount={data?.data?.failedTransactions || 0}
          isAmount={false}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 pr-4 mt-14">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center col-span-2">
            <img
              src={DocumentImg}
              alt="Documents"
              className="mt-12 h-auto w-full max-w-[300px]"
            />
            <h3 className="mt-10 text-xl">Fetching Data...</h3>
          </div>
        ) : (
          <UserList />
        )}
        {/* <TransactionList /> */}
      </div>
      {/* <Addmoney isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} /> */}
    </DashboardLayout>
  );
};

export default AdminDashboard;

function TopCard({ title, amount, isAmount, textColor = "text-violet-600" }) {
  return (
    <div className="col-span-3 md:col-span-1 bg-white shadow-md rounded-lg h-[161px] flex flex-col justify-between p-8">
      <div className="flex items-center justify-between">
        <p className={`text-sm ${textColor} font-semibold`}>{title}</p>
        {/* <Button onClick={() => setIsOpen(!isOpen)}>ADD MONEY</Button> */}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-xs">
          {isAmount && <span className="font-semibold">NGN</span>}{" "}
          <span className="text-2xl font-semibold">
            <EditCash amount={amount} />
          </span>
        </p>
      </div>
    </div>
  );
}

TopCard.propsType = {
  title: PropsType.string.isRequired,
  amount: PropsType.number.isRequired,
  isAmount: PropsType.bool,
  textColor: PropsType.string,
};
