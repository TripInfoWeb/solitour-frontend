import useOutsideClick from "@/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  className?: React.HTMLProps<HTMLElement>["className"];
  onClose: () => void;
}

/**
 * 
 * @param param0 
 * <Modal isOpen={isModal} onClose={() => setIsModal(false)} className="flex items-center justify-center">
 *   <ModalComponent closeModal={() => setIsModal(false)} />
 * </Modal>
 */

export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);
  useOutsideClick(ref, () => {
    onClose();
  });

  if (documentBody == null) return;
  if (isOpen === false) return;
    return createPortal(
      <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black/30">
        <div ref={ref}>{children}</div>
      </div>,
      documentBody,
    );
};
