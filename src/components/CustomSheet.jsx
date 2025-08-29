import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

import PropTypes from "prop-types";
import { cn } from "../lib/utils";

export const CustomSheet = ({
  isOpen,
  onClose,
  title,
  description,
  footer,
  children,
  className,
  side = "right",
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose} modal={true}>
      <SheetContent side={side} className={cn(`sm:max-w-lg`, className)}>
        {/* <Image alt='pattern' src={Pattern} className='absolute -top-0 h-30' /> */}

        <SheetHeader>
          {!!title && <SheetTitle>{title}</SheetTitle>}

          {/* Description */}
          {!!description && (
            <SheetDescription>
              Anyone who has this link will be able to view this.
            </SheetDescription>
          )}
        </SheetHeader>

        {children}

        {/* Footer */}
        {!!footer && (
          <SheetFooter className="sm:justify-start">{footer}</SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

CustomSheet.propType = {
  isOpen: PropTypes.bool,
  children: React.ReactNode,
  onClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  header: React.ReactNode,
  footer: React.ReactNode,
  className: PropTypes.string,
};
