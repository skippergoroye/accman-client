import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(
  ({ className, type, leftIcon, rightIcon, error, ...props }, ref) => {
    return (
      <div className={cn(`relative w-full`)}>
        {!!leftIcon && (
          <div className="absolute left-3 top-[50%] -translate-y-[50%]">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `flex items-center justify-center gap-3 h-14 w-full rounded-md border border-gray-400 bg-white px-3 py-2 ${
              leftIcon ? "pl-10" : ""
            } ${
              rightIcon ? "pr-14" : ""
            } text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-light placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`,
            className
          )}
          ref={ref}
          {...props}
        />
        {!!rightIcon && (
          <div className="absolute right-3 top-[50%] -translate-y-[50%]">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  placeholder: PropTypes.string,
};
Input.displayName = "Input";

export { Input };
