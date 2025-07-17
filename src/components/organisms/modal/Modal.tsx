import React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Modal({ label, isOpen, description, children, onClose, width, onSubmit, labelCancel, labelSubmit, isLoading }: {
  readonly label: string,
  readonly isOpen: boolean,
  readonly description?: string,
  readonly children: React.ReactNode,
  readonly width?: string,
  readonly onClose: () => void,
  readonly labelCancel?: string,
  readonly labelSubmit?: string,
  readonly onSubmit?: boolean,
  readonly isLoading?: boolean
}) {

  function handleButtonClick() {
    const btnSubmit = document.getElementById("btnSubmit");
    if (btnSubmit) {
      btnSubmit.click();
    }
  }

  const widthClass = width ?? 'w-auto';

  return (

    // <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger> */}
      <DialogContent
        onInteractOutside={(event) => {
          if (isLoading) {
            event.preventDefault();
          } else {
            onClose();
          }
        }}
        className={`h-auto max-h-[48rem] overflow-y-auto ${widthClass}`}>
        <DialogHeader className=" py-2">
          <DialogTitle className="text-lg text-primary dark:text-white capitalize">{label}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        {onSubmit && (
          <DialogFooter className="flex flex-row justify-end">
            <Button type="button" variant="transparent" onClick={onClose}>{labelCancel ?? "Batal"}</Button>
            <Button type="submit" disabled={isLoading} onClick={handleButtonClick}>{labelSubmit ?? "Simpan"}</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
    // </>
  );
}
