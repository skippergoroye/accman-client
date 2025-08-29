import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import PropTypes from "prop-types";
import { cn } from "../lib/utils";
import { Copy } from "lucide-react";

export const CustomModal = ({
  isOpen,
  onClose,
  title,
  description,
  footer,
  children,
  className,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent className={cn(`sm:max-w-lg`, className)}>
        {/* <Image alt='pattern' src={Pattern} className='absolute -top-0 h-30' /> */}

        <DialogHeader>
          {!!title && <DialogTitle>{title}</DialogTitle>}

          {/* Description */}
          {!!description && (
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          )}
        </DialogHeader>

        {children}

        {/* Footer */}
        {!!footer && (
          <DialogFooter className="sm:justify-start">{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

CustomModal.propType = {
  isOpen: PropTypes.bool,
  children: React.ReactNode,
  onClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  header: React.ReactNode,
  footer: React.ReactNode,
  className: PropTypes.string,
};
