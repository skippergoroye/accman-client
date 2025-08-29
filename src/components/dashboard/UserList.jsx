import { User } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import avatar from "../../assets/icons/avatar.svg";
import { useSelector } from "react-redux";
import EditCash from "../../utils/editCash";

function UserList() {
  const { users } = useSelector((state) => state?.users);

  return (
    <div className="col-span-2 md:col-span-2  px-6 relative overflow-hidden bg-white rounded-lg shadow-md h-[440px] overflow-y-scroll hideScrollbar">
      <div className="sticky top-0 z-20 bg-white pt-7 ">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <p>All users</p>
            <div className="bg-[#F0FDF4] px-3 rounded-md text-sm py-1">
              <EditCash amount={users?.length || 0} />
            </div>
          </div>
        </div>
        <hr className="my-6" />
      </div>
      <div className="">
        <Table>
          <TableHeader className="rounded-md bg-gray-50 h-14">
            <TableRow>
              <TableHead className="">S/N</TableHead>
              <TableHead className=" md:w-[220px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Enrolled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-scroll">
            {users.slice(0, 5).map((_data, i) => (
              <TableRow key={_data + i}>
                <TableCell>{i + 1}</TableCell>

                <TableCell className="font-medium ">
                  <div className="flex w-[180px] md:w-full gap-3">
                    {/* <div className="w-12 h-12 overflow-hidden rounded-full shrink-0">
                      <img src={avatar} className="object-cover w-12 h-12" />
                    </div> */}
                    <div>
                      <h6>
                        {_data?.firstName} {_data?.lastName}
                      </h6>
                      {/* <p className="text-xs font-normal">{@olakunle}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{_data?.email}</TableCell>
                <TableCell>
                  {_data?.isVerified ? "Verified" : "Not verified"}
                </TableCell>
                <TableCell className="">
                  {new Date(_data?.createdAt).toDateString()}
                </TableCell>
                {/* <TableCell className="">
                  <Button
                    variant="link"
                    onClick={() => setIsOpen(!isOpen)}
                    className="hover:bg-transparent text-violet-600"
                  >
                    View
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default UserList;
