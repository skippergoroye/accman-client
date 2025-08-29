import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../components/ui/button";
import { useChangePasswordMutation } from "../features/api/security";
import { useSelector } from "react-redux";
import { toastSuccess } from "../components/Toast";
import { Loader2 } from "lucide-react";


const formSchema = yup.object().shape({
  currentPassword: yup.string().required("old password is required"),
  newPassword: yup
    .string()
    .min(8, "password must not be less than 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;':",.<>?~`\-=/\\]).{8,}$/,
      "password must have at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
    )
    .required("new password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "password mismatch")
  // .required("confirm password is required"),
});

const SecuritySettings = () => {

  const { userInfo } = useSelector((state) => state?.authUser);
  const userId = userInfo?._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onTouched"
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const formSubmitHandler = (values) => {
    const theData = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    }

    changePassword({
      userId, theData
    }).unwrap().then((res) => {
      reset();
      toastSuccess("Password changed successfully.")
    });
  };



  return (
    <div>
      <div className="pb-6 border-b border-[#F3F3F3]">
        <h4 className="text-xl font-semibold text-gray-900">Change Password</h4>
        <p className="mt-1.5 text-gray-600">Secure your accman account</p>
      </div>
      <div className="mt-8 mb-4">
        <form className="grid grid-cols-1 mt-12 gap-y-5 md:gap-y-7">
          <div className="flex flex-col gap-1 lg:w-1/2">
            <label
              htmlFor="currentPassword"
              className="font-medium text-sm text-[#09090B]"
            >
              Current password
            </label>
            <input
              {...register("currentPassword")}
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="**************"
              className="px-4 py-2 rounded-md border border-[#E4E4E7] outline-none bg-white text-black"
            />
            {errors.currentPassword && (
              <div className="text-sm text-red-600">
                {errors.currentPassword.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 lg:w-1/2">
            <label
              htmlFor="newPassword"
              className="font-medium text-sm text-[#09090B]"
            >
              New password
            </label>
            <input
              {...register("newPassword")}
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="**************"
              className="px-4 py-2 rounded-md border border-[#E4E4E7] outline-none bg-white text-black"
            />
            {errors.newPassword && (
              <div className="text-sm text-red-600">
                {errors.newPassword.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 lg:w-1/2">
            <label
              htmlFor="confirmPassword"
              className="font-medium text-sm text-[#09090B]"
            >
              Confirm new password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="**************"
              className="px-4 py-2 rounded-md border border-[#E4E4E7] outline-none bg-white text-black"
            />
            {errors.confirmPassword && (
              <div className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <Button
            className="bg-violet-700 hover:bg-violet-500 w-min"
            onClick={handleSubmit(formSubmitHandler)}
            disabled={isLoading}
          >
            {!isLoading && "Change password"}
            {isLoading && <>Saving changes <Loader2 className="w-5 h-5 ml-2 animate-spin" /></>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SecuritySettings;
