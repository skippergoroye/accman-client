import React from "react";
import { useGetUserTransactionsQuery } from "../../features/api/users";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import FetchingComp from "../FetchingComp";

function TransactionList() {
  const { userInfo } = useSelector((state) => state.authUser);
  const { data, isLoading, isFetching } = useGetUserTransactionsQuery(
    userInfo?._id || ""
  );
  return (
    <div className="col-span-2  pt-7 px-6 bg-white rounded-lg h-[400px]">
      <h3>Latest Transactions</h3>
      <hr className="my-6" />
      {isLoading || isFetching ? (
        <div className="w-full centered">
          <FetchingComp message="Fetching Transactions..." />
        </div>
      ) : data?.data && data?.data.length ? (
        <Table>
          <TableHeader className="rounded-md bg-gray-50 min-h-14">
            <TableRow>
              <TableHead className=" md:w-min">STATUS</TableHead>
              <TableHead>TRANSACTION ID</TableHead>
              <TableHead>USER</TableHead>
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
                .slice(0, 4)
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="w-min">{row?.status}</TableCell>
                    <TableCell>
                      {row?.userId?.firstName} {row?.userId?.lastName}
                    </TableCell>
                    <TableCell>{row?._id}</TableCell>
                    <TableCell>{row?.type}</TableCell>
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
      ) : (
        <div className="h-4/6">
          <div className="flex flex-col items-center justify-center h-full">
            <h6 className="text-sm font-normal">
              You don’t have any transaction history
            </h6>
            <p className="text-xs font-normal">
              when you make a transaction it will show up here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
