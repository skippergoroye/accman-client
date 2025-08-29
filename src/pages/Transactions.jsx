import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import UserDetailsSheet from "../components/dashboard/UserDetailsSheet";
import { useGetUserTransactionsQuery } from "../features/api/users";
import FetchingComp from "../components/FetchingComp";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.authUser);
  const { data, isLoading, isFetching } = useGetUserTransactionsQuery(
    userInfo?._id || ""
  );

  return (
    <DashboardLayout>
      <div className="bg-white px-5 lg:px-10 py-8 h-[95%] w-[97%] rounded-xl shadow-lg overflow-y-scroll hideScrollbar">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <p>All Transaction</p>
            <div className="bg-[#F0FDF4] px-3 rounded-md text-sm py-1">
              {data?.data ? data?.data?.length : 0}
            </div>
          </div>
          {/* <div className="w-full md:w-[320px]">
            <Input
              className=""
              leftIcon={<Search />}
              placeholder="Search for transaction"
            />
          </div> */}
        </div>
        <hr className="my-8" />
        {isLoading || isFetching ? (
          <div className="w-full centered">
            <FetchingComp message="Fetching Transactions..." />
          </div>
        ) : (
          <Table>
            <TableHeader className="rounded-md bg-gray-50 h-14">
              <TableRow>
                <TableHead className=" md:w-min">STATUS</TableHead>
                <TableHead>USER</TableHead>

                <TableHead>TRANSACTION ID</TableHead>
                <TableHead>TRANSACTION TYPE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>DATE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data && data?.data.length ? (
                data?.data
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row?.status}</TableCell>
                      <TableCell>
                        {row?.userId?.firstName} {row?.userId?.lastName}
                      </TableCell>
                      <TableCell>{row?._id}</TableCell>
                      <TableCell>{row?.type && row?.type}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "NGN",
                        }).format(row.amount) ?? 0}
                      </TableCell>
                      <TableCell>
                        {new Date(row?.createdAt).toDateString()}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <UserDetailsSheet isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </DashboardLayout>
  );
};

export default Transactions;
