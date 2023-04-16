import React, { useCallback } from "react";
import Button from "../global/Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  actionDisabled?: boolean;
}

export default function Modal({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, actionDisabled }: ModalProps) {

  const handleClose = useCallback(() => {
    if (actionDisabled) {
      return;
    }
    onClose();
  }, [actionDisabled, onClose])

  const handleSubmit = useCallback(() => {
    if (actionDisabled) {
        return;
    }
    onSubmit();
}, [actionDisabled, onSubmit])

  if (!isOpen) {
    return null;
  } else {
    return (
      <>
        <div className='flex flex-col mt-4 p-4 rounded-2xl max-w-[40ch] mx-auto bg-westar-50 border-black border-4'>
          <h1 className='p-2 mb-2 mx-auto text-4xl font-semibold'>
            {title}
          </h1>
          {body}
          <Button label={actionLabel} disabled={actionDisabled} onClick={handleSubmit} />
          {footer}
        </div>
      </>
    )
  }
}
