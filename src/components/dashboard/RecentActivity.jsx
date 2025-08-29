import { User } from "lucide-react";
import React from "react";

function RecentActivity() {
  return (
    <div className="col-span-2 md:col-span-1 pt-7 px-6 bg-white rounded-lg h-[400px]">
      <h3>Recent Activity</h3>
      <hr className="my-6" />
      <div className="">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 overflow-hidden border rounded-full shrink-0">
            <User size={16} />
          </div>
          <div>
            <h6 className="text-sm font-normal">
              You just registered as folaranmi
            </h6>
            <p className="text-xs font-normal">fews seconds ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
