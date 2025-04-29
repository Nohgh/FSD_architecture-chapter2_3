import { JSX, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | JSX.Element | null;
  children: ReactNode;
}

export const Modal = ({ open, onOpenChange, title, children }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <div className="space-y-4">{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
