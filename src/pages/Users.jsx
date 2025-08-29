import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import avatar from "../assets/icons/avatar.svg";

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
import { Button } from "../components/ui/button";
import UserDetailsSheet from "../components/dashboard/UserDetailsSheet";
import FetchingComp from "../components/FetchingComp";
import { useSelector } from "react-redux";
import {
  useLazyGetAllUsersQuery,
  useLazyGetSingleUserQuery,
  useLazySearchUserQuery,
} from "../features/api/admin";
import { SyncLoader } from "react-spinners";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import Spinner from "../components/spinner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  search: z.string(),
});

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const { users } = useSelector((state) => state?.users);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const [getAllUsers, { isLoading, isFetching: fetchingUsers }] =
    useLazyGetAllUsersQuery();
  const [searchUser, { isFetching }] = useLazySearchUserQuery();
  const [getSingleUser, { isLoading: fetchingUser }] =
    useLazyGetSingleUserQuery();

  useEffect(() => {
    const getData = setTimeout(() => {
      if (form.watch("search") === "") {
        getAllUsers().unwrap();
      } else {
        searchUser(form.watch("search")).unwrap();
      }
    }, 1500);

    return () => clearTimeout(getData);
  }, [form.watch("search")]);

  return (
    <DashboardLayout>
      <div className="bg-white px-5 lg:px-10 pb-8 h-[95%] w-[97%] rounded-xl shadow-lg overflow-y-scroll hideScrollbar">
        <div className="sticky top-0 z-10 pt-8 bg-white">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
              <p>All users</p>
              <div className="bg-[#F0FDF4] px-3 rounded-md text-sm py-1">
                {users.length}
              </div>
            </div>
            <div className="w-full md:w-[320px]">
              <Form {...form}>
                <form className="mt-10 space-y-6">
                  <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Search users..."
                            className="border-neutral-300"
                            leftIcon={<Search />}
                            {...field}
                            rightIcon={
                              isFetching ? <Spinner size="h-5 w-5" /> : <></>
                            }
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <hr className="my-8" />
        </div>
        {isLoading || fetchingUsers ? (
          <div className="w-full centered">
            <FetchingComp message="Fetching Users..." />
          </div>
        ) : (
          <Table>
            <TableHeader className="rounded-md bg-gray-50 h-14">
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className>
              {users
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((_data, i) => (
                  <TableRow key={_data + i}>
                    <TableCell className="font-medium ">
                      <div className="flex w-[180px] md:w-full  gap-3">
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
                    <TableCell className="">
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelected(_data?._id);
                          getSingleUser(_data?._id)
                            .unwrap()
                            .then((res) => {
                              console.log(res);
                              if (res?.data) {
                                setIsOpen(!isOpen);
                              }
                            });
                        }}
                        className="hover:bg-transparent text-violet-600"
                      >
                        {fetchingUser && selected === _data?._id ? (
                          <SyncLoader size={"0.5rem"} color="#000" />
                        ) : (
                          "View"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
      <UserDetailsSheet isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </DashboardLayout>
  );
};

export default Users;
