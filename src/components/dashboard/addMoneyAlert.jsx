import React from "react";
import PropTypes from "prop-types";
import { CustomModal } from "../CustomModal";
import { SyncLoader } from "react-spinners";

import { Button } from "../ui/button";

function AddMoneyAlert({ isOpen, onClose, onFund, isLoading }) {
  return (
    <CustomModal
      className={"w-[95%] md:max-w-sm z-[9999]"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="-mt-4 text-lg font-semibold">Are you sure?</h2>
      <p className="p-0 -mt-4 text-sm font-normal">
        You are about to fund your account
      </p>

      <div className="flex justify-end gap-4">
        <Button onClick={onFund} disabled={isLoading}>
          {isLoading ? (
            <SyncLoader size={"0.5rem"} color="#ffffff" />
          ) : (
            "Continue"
          )}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </CustomModal>
  );
}
AddMoneyAlert.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onFund: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default AddMoneyAlert;
