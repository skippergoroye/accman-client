import React from "react";
import PropTypes from "prop-types";
import { CustomModal } from "../CustomModal";

import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { adminLogout } from "../../features/auth/authSliceAdmin";
import { userLogout } from "../../features/auth/authSliceUser";

function Logout({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogout = () => {
    if (pathname.includes("/backoffice")) {
      dispatch(adminLogout());
      navigate("/backoffice");
    } else {
      dispatch(userLogout());
      navigate("/login");
    }
  };
  return (
    <CustomModal
      className={"w-[95%] md:max-w-lg"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="-mt-4 text-lg font-semibold">Are you sure?</h2>
      <p className="p-0 -mt-4 text-sm font-normal">
        You are about to log out from your account
      </p>

      <div className="flex justify-end gap-4">
        <Button onClick={onLogout}>Continue</Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </CustomModal>
  );
}
Logout.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default Logout;
