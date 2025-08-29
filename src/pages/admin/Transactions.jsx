import React, { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

import { SyncLoader } from "react-spinners";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  useGetFundingRequestsQuery,
  useGetTransactionsQuery,
  useLazyGetUserTransactionIDQuery,
} from "../../features/api/admin";
import FetchingComp from "../../components/FetchingComp";
import { Button } from "../../components/ui/button";
import TransactionDetailsSheet from "../../components/dashboard/TransactionDetailsSheet";
import AllTransactionRequests from "../../components/dashboard/AllTransactionRequests";

const AdminTransactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [selected, setSelected] = useState("");

  const { isFetching, isLoading, data } = useGetTransactionsQuery();
  const { data: requests } = useGetFundingRequestsQuery();
  const [getUserTransactionID, { isFetching: fetchingTransaction }] =
    useLazyGetUserTransactionIDQuery();

  return (
    <DashboardLayout>
      <div className="w-[96%] lg:w-[495px] bg-white rounded-lg h-[131px] shadow-md flex flex-col justify-between p-8 mb-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-violet-600">Total Requests</p>
          <Button onClick={() => setOpenRequest(!openRequest)}>
            View Requests
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm">
            <span className="text-3xl font-semibold">
              {requests?.data
                ? requests.data.filter((_data) => {
                    if (_data.status === "pending") {
                      return _data;
                    }
                  }).length
                : 0}
            </span>
          </p>
        </div>
      </div>
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
                <TableHead className=" w-min">STATUS</TableHead>
                <TableHead className="">USER</TableHead>
                <TableHead>TRANSACTION ID</TableHead>
                <TableHead>TRANSACTION TYPE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead className="min-w-[150px]">DATE</TableHead>
                <TableHead></TableHead>
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
                      <TableCell>{!row?.type ? "" : row?.type}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "NGN",
                        }).format(row.amount) ?? 0}
                      </TableCell>
                      <TableCell className="">
                        {new Date(row?.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="">
                        <Button
                          variant="link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(row?._id);
                            const data = {
                              userId: row?.userId?._id,
                              tranId: row?._id,
                            };
                            getUserTransactionID(data)
                              .unwrap()
                              .then((res) => {
                                if (res?.data) {
                                  setIsOpen(!isOpen);
                                }
                              });
                          }}
                          className="hover:bg-transparent text-violet-600"
                        >
                          {fetchingTransaction && selected === row?._id ? (
                            <SyncLoader size={"0.5rem"} color="#000" />
                          ) : (
                            "View"
                          )}
                        </Button>
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
      <TransactionDetailsSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      />
      <AllTransactionRequests
        isOpen={openRequest}
        onClose={() => setOpenRequest(!openRequest)}
      />
    </DashboardLayout>
  );
};

export default AdminTransactions;
