import Logo from "../assets/PNG/logo.png";
import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import OnboardingLayout from "../layout/OnboardingLayout";
import { EyeOff, Eye } from "lucide-react";
import { SyncLoader } from "react-spinners";
import { useLoginUserMutation } from "../features/api/users";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredentials } from "../features/auth/authSliceUser";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address.").min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(1, { message: "Must have at least 1 character" }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { userInfo } = useSelector((state) => state.authUser);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const successNotifying = (msg) => {
    toast.success(msg);
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      dispatch(
        setUserCredentials({
          user: response.data.user,
          token: response.data.accessToken,
        })
      );
      successNotifying(response.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.data.message);
      // console.log(error)
    }
  };

  return (
    <OnboardingLayout
      feedback="“I love how intuitive AccMan interface is, making it easy to
    navigate and manage multiple accounts seamlessly.”"
      author="Idris Alabi"
    >
      <div className="w-5/6 lg:w-[60%]">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-[20px] md:h-[34px]" />
        </Link>
        <h1 className="md:text-4xl text-2xl font-medium leading-[40px] mt-7">
          Welcome back!
        </h1>
        <p className="mt-px text-base font-normal text-neutral-600">
          Sign in to your account
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Password"
                      className="border-neutral-300"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      rightIcon={
                        showPassword ? (
                          <Eye
                            className="cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <EyeOff
                            className="cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <p className="mt-2 text-sm font-semibold text-purple-600">
            <Link to="/reset-password" className="text-primary">
              Forgot password?
            </Link>
          </p>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full h-12 mt-6 bg-violet-600 hover:bg-violet-400"
          >
            {isLoading ? (
              <SyncLoader size={"0.8rem"} color="#ffffff" />
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="mt-4 text-sm text-center">
            Don’t have an account ?{" "}
            <span className="font-semibold text-violet-600">
              <Link to={"/create-account"}>Create an account</Link>
            </span>
          </p>
        </Form>
      </div>
    </OnboardingLayout>
  );
};

export default Login;
