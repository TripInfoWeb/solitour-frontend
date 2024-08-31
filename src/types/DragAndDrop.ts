import { ChangeEvent } from "react";

export type dragAndDropProps = {
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDropOrInputEvent: (
        e: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
    ) => void;
};