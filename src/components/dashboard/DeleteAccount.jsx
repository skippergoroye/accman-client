import React from "react";
import PropTypes from "prop-types";
import { CustomModal } from "../CustomModal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDeleteUserMutation } from "../../features/api/users";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../Toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../features/auth/authSliceUser";



const DeleteAccount = ({ isOpen, onClose, setIsOpen }) => {
  const { userInfo } = useSelector((state) => state.authUser);
  const id = userInfo?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const onUserDelete = () => {
    try {
      deleteUser(id).unwrap().then((res) => {
        toastSuccess("Account Deleted successfully.");
        setIsOpen(!isOpen);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("usertoken");
        dispatch(userLogout());
        navigate("/login");
      });
    } catch (error) {
      toastError("Something went wrong while deleting your account.");
    }
  }

  return (
    <CustomModal
      className={"w-[95%] md:max-w-lg"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="-mt-4 text-lg font-semibold">Are you absolutely sure?</h2>
      <p className="p-0 -mt-4 text-sm font-normal">
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </p>
      <div className="flex justify-end">
        <Button
          variant="destructive"
          onClick={onUserDelete}
          disabled={isLoading}
        >
          {!isLoading && "Yes, delete account"}
          {isLoading && <>Deleting account <Loader2 className="w-5 h-5 ml-2 animate-spin" /></>}
        </Button>
      </div>
    </CustomModal>
  );
};

DeleteAccount.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DeleteAccount;
