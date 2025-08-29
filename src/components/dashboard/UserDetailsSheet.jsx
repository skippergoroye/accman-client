import React, { useState } from "react";
import { CustomSheet } from "../CustomSheet";
import PropTypes from "prop-types";
import avatar from "../../assets/icons/avatar.svg";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import EditCash from "../../utils/editCash";
import {
  useBlockUserMutation,
  useLazyGetSingleUserQuery,
  useUnBlockUserMutation,
} from "../../features/api/admin";

function UserDetailsSheet({ isOpen, onClose }) {
  const { user } = useSelector((state) => state?.users);
  const [getSingleUser, { isLoading: fetchingUser }] =
    useLazyGetSingleUserQuery();
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const [unBlockUser, { isLoading: unblocking }] = useUnBlockUserMutation();

  return (
    <CustomSheet isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold">{user?.firstName} Details</h2>
      <p className="mt-2 text-sm font-normal">
        Below is folaranmi personal details, you can reach folaranmi via this
        details.
      </p>
      {/* <div className="flex flex-col items-center justify-center">
        <div className="h-[108px] w-[108px] overflow-hidden mt-10">
          <img src={avatar} alt="avatar" className="h-[108px] w-[108px]" />
        </div>
        <h1 className="mt-2">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="mt-px text-sm text-muted">{user?.gender ?? ""}</p>
      </div> */}
      <div className="flex items-center justify-between mt-10">
        <p className="font-normal">User</p>
        <p className="font-normal text-right">
          {" "}
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Email address</p>
        <p className="font-normal text-right">{user?.email}</p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Gender</p>
        <p className="font-normal text-right">{user?.gender}</p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Phone Number</p>
        <p className="font-normal text-right">{user?.phoneNumber}</p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Balance</p>
        <p className="font-normal text-right">
          NGN <EditCash amount={user?.walletBalance} />{" "}
        </p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Enrolled</p>
        <p className="font-normal text-right">
          {user?.createdAt ? new Date(user?.createdAt).toDateString() : ""}
        </p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="font-normal">Status</p>
        <p className="font-normal text-right">
          {user?.isActive ? "Active" : "Not Active"}
        </p>
      </div>
      <div className="flex justify-end w-full mt-20">
        {user?.blocked ? (
          <Button
            disabled={unblocking}
            onClick={() => {
              unBlockUser(user?._id)
                .unwrap()
                .then((res) => {
                  if (res?.data) {
                    getSingleUser(user?._id);
                  }
                });
            }}
            className="h-12 bg-green-500 hover:bg-green-700"
          >
            {unblocking
              ? "Unblocking..."
              : fetchingUser
              ? "Fetching..."
              : `Unblock ${user?.firstName}`}
          </Button>
        ) : (
          <Button
            disabled={blocking}
            onClick={() => {
              blockUser(user?._id)
                .unwrap()
                .then((res) => {
                  if (res?.data) {
                    getSingleUser(user?._id);
                  }
                });
            }}
            className="h-12 bg-red-500 hover:bg-red-700"
          >
            {blocking
              ? "Blocking..."
              : fetchingUser
              ? "Fetching..."
              : `Block ${user?.firstName}`}
          </Button>
        )}
      </div>
    </CustomSheet>
  );
}
UserDetailsSheet.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default UserDetailsSheet;
