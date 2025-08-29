import React, { useState } from "react";
import PropTypes from "prop-types";
import { CustomModal } from "../CustomModal";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";

import { Button } from "../ui/button";
import EditCash from "../../utils/editCash";
import {
  useApproveFundingMutation,
  useLazyGetFundingRequestsQuery,
  useLazyGetTransactionsQuery,
  useRejectFundingMutation,
} from "../../features/api/admin";
import FetchingComp from "../FetchingComp";

function AllTransactionRequests({ isOpen, onClose, onFund }) {
  const { requests } = useSelector((state) => state.authAdmin);
  const { userInfo } = useSelector((state) => state.authUser);
  const [getTransactions, { data, isLoading, isFetching }] =
    useLazyGetTransactionsQuery();
  const [selected, setSelected] = useState("");

  const [approveFunding, { isLoading: approving }] =
    useApproveFundingMutation();
  const [rejectFunding, { isLoading: rejecting }] = useRejectFundingMutation();
  const [getFundingRequest, { isFetching: requesting }] =
    useLazyGetFundingRequestsQuery();

  return (
    <CustomModal
      className={"w-[95%] md:max-w-lg z-[9999]"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="-mt-4 text-lg font-semibold">Account funding requests</h2>
      <p className="p-0 -mt-4 text-sm font-normal">
        Here is a list of pending requests
      </p>
      {requests.filter((req) => {
        if (req?.status === "pending") {
          return req;
        }
      }).length ? (
        requests
          .filter((req) => {
            if (req?.status === "pending") {
              return req;
            }
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((req, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-bold">
                  NGN <EditCash amount={req?.amount} />
                </p>
                <p className="font-normal">
                  {req?.userId?.firstName} {req?.userId?.lastName}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setSelected(req?._id);
                    approveFunding(req?._id)
                      .unwrap()
                      .then((res) => {
                        getFundingRequest().unwrap();
                        getTransactions().unwrap();
                      });
                  }}
                >
                  {approving && selected === req?._id ? (
                    <SyncLoader size={"0.5rem"} color="#ffffff" />
                  ) : (
                    "Approve"
                  )}
                </Button>
                <Button
                  variant={"outline"}
                  className="text-red-500 border-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => {
                    setSelected(req?._id);
                    rejectFunding(req?._id)
                      .unwrap()
                      .then((res) => {
                        getFundingRequest().unwrap();
                        getTransactions().unwrap();
                      });
                  }}
                >
                  {rejecting && selected === req?._id ? (
                    <SyncLoader size={"0.5rem"} color="#ffffff" />
                  ) : (
                    "Reject"
                  )}
                </Button>
              </div>
            </div>
          ))
      ) : (
        <FetchingComp message="No pending request" />
      )}

      {/* <div className="flex justify-end gap-4">
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
      </div> */}
    </CustomModal>
  );
}
AllTransactionRequests.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onFund: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default AllTransactionRequests;
