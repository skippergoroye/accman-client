import { useState } from "react";
import SideImg from "../assets/PNG/SideImg.png";
import Logo from "../assets/PNG/logo.png";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../features/api/users";
import { Button } from "../components/ui/button";
import OnboardingLayout from "../layout/OnboardingLayout";
import { EyeOff, Eye } from "lucide-react";

// Password validation regex
const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const formSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordValidation, { message: "Password not strong enough" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ResetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    const resetCode = location.pathname?.split("/")[2]; // e.g. /reset-new-password/621897 → "621897"

    const payload = {
      email: data.email,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    try {
      await resetPassword({ id: resetCode, body: payload }).unwrap();
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <OnboardingLayout
      sideImage={SideImg}
      author="Folashade Rose"
      feedback="“Using AccMan software has been a game-changer for me! It’s streamlined my finances.”"
    >
      <div className="w-5/6 lg:w-[60%]">
        <img src={Logo} alt="Logo" className="h-[20px] md:h-[34px]" />
        <h1 className="md:text-4xl text-2xl font-medium mt-7">Set a new password</h1>
        <p className="text-base text-neutral-600">It’s easy and quick</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...field}
                      rightIcon={
                        showPassword ? (
                          <Eye onClick={() => setShowPassword(false)} />
                        ) : (
                          <EyeOff onClick={() => setShowPassword(true)} />
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-12 mt-6 bg-violet-600 hover:bg-violet-400">
              {isLoading ? <SyncLoader size={"0.8rem"} color="#fff" /> : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </OnboardingLayout>
  );
};

export default ResetNewPassword;
