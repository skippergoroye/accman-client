"use client";
import Logo from "../assets/PNG/logo.png";

import OnboardingLayout from "../layout/OnboardingLayout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useVerifyOtpMutation } from "../features/api/users";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address.").min(1, {
    message: "Email is required.",
  }),
  otp: z.string().min(6, {
    message: "Otp should be 6 digits",
  }),
});

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  console.log(location, "ROUTEEES");

  const successNotifying = () => {
    toast.success("Otp verification Successful");
  };

  const onSubmit = async (data) => {
    try {
      const response = await verifyOtp(data).unwrap();
      successNotifying();
      navigate("/login");
    } catch (error) {
      toast.error(error.data.error);
      console.error("verification email failed:", error);
    }
  };

  return (
    <OnboardingLayout
      feedback="“I love how intuitive AccMan interface is, making it easy to
    navigate and manage multiple accounts seamlessly.”"
      author="Idris Alabi"
    >
      <div className="w-5/6 lg:w-[60%]">
        <div>
          <img src={Logo} alt="Logo" className="h-[20px] md:h-[34px]" />
        </div>
        <h1 className="md:text-4xl text-2xl font-medium leading-[40px] mt-7">
          Verify OTP
        </h1>
        <p className="mt-px text-base font-normal text-neutral-600">
          It’s easy and quick. let’s get you back.
        </p>

        <Form {...form}>
          <form className="mt-10 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      className="border-neutral-300"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Enter Otp</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your otp password"
                      className="border-neutral-300"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full h-12 mt-6 bg-violet-600 hover:bg-violet-400"
          >
            {isLoading ? (
              <SyncLoader size={"0.8rem"} color="#ffffff" />
            ) : (
              "Verify account"
            )}
          </Button>
          <p className="mt-4 text-center">
            <span className="font-semibold text-violet-600">
              <Link to={"/login"}>Resend Otp</Link>
            </span>
          </p>
        </Form>
      </div>
    </OnboardingLayout>
  );
};

export default VerifyOtp;
