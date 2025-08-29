import React, { useState } from "react";
import PropTypes from "prop-types";
import { CustomModal } from "../CustomModal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import AddMoneyAlert from "./addMoneyAlert";
import {
  useAddFundMutation,
  useLazyGetUserTransactionsQuery,
} from "../../features/api/users";
import { useSelector } from "react-redux";

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Amount field is required",
  }),
});
function Addmoney({ isOpen, onClose }) {
  const [openAlert, setIsOpen] = useState(false);
  const [addFund, { isLoading }] = useAddFundMutation();
  const { userInfo } = useSelector((state) => state.authUser);
  const [getUserTransactions] = useLazyGetUserTransactionsQuery(
    userInfo?._id || ""
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = (data) => {
    setIsOpen(!openAlert);
  };

  const onFund = () => {
    addFund({ amount: Number(form.watch("amount")) }).then((res) => {
      if (res?.data) {
        getUserTransactions(userInfo?._id || "");
        setIsOpen(!openAlert);
        onClose();
      }
    });
  };

  console.log(form.formState.errors);

  return (
    <CustomModal
      className={"w-[95%] md:max-w-lg"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="-mt-4 text-lg font-semibold">Add Money</h2>
      <p className="p-0 -mt-4 text-sm font-normal">
        Boost your financial power. Add money effortlessly and watch your
        savings soar!
      </p>
      <div className="flex items-center gap-4 mt-4">
        <p className="">Amount</p>
        <Form {...form}>
          <form className="w-full">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      className="w-full h-11"
                      type="number"
                      {...field}
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
      <div className="flex justify-end">
        <Button onClick={form.handleSubmit(onSubmit)}>Continue</Button>
      </div>
      <AddMoneyAlert
        isOpen={openAlert}
        onClose={() => setIsOpen(!openAlert)}
        onFund={onFund}
        isLoading={isLoading}
      />
    </CustomModal>
  );
}
Addmoney.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default Addmoney;
