import React, { useState } from "react";
import { CustomSheet } from "../CustomSheet";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import EditCash from "../../utils/editCash";

function TransactionDetailsSheet({ isOpen, onClose }) {
  const { transaction } = useSelector((state) => state?.authAdmin);

  return (
    <CustomSheet isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold">Transaction Details</h2>
      <div className="flex items-center justify-between mt-10">
        <p className="font-normal">Transaction Amount</p>
        <p className="font-normal text-right">
          NGN <EditCash amount={transaction?.amount} />{" "}
        </p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">User </p>
        <p className="font-normal text-right">
          {transaction?.userId?.firstName} {transaction?.userId?.lastName}
        </p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">User Email address</p>
        <p className="font-normal text-right">{transaction?.userId?.email}</p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Transaction Type</p>
        <p className="font-normal text-right">{transaction?.type}</p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Status</p>
        <p className="font-normal text-right">
          {transaction?.status && transaction?.status}
        </p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Transaction ID</p>
        <p className="font-normal text-right">{transaction?._id}</p>
      </div>
    </CustomSheet>
  );
}
TransactionDetailsSheet.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default TransactionDetailsSheet;
