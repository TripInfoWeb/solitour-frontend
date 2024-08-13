"use client";

import QuillEditor from "@/components/diary/write/QuillEditor";
import { ImageResize } from "quill-image-resize-module-ts";
import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";

interface Props {
  content: string;
  onChange: (value: string) => void;
}

const QuillEditorContainer = ({ content, onChange }: Props) => {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = () => {
    // Step 1. 이미지 파일을 첨부할 수 있는 input을 생성합니다.
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    // Step 2. 이미지 핸들러 실행 시, input 클릭 이벤트를 발생시킵니다.
    input.click();

    // Step 3. change 이벤트가 발생했을 때의 이미지 처리 로직을 적용합니다.
    input.addEventListener("change", () => {
      if (input.files && quillRef.current) {
        const file = input.files[0];
        const blob = new Blob([file], { type: "image/png" });
        const url = URL.createObjectURL(blob);

        const Image = Quill.import("formats/image");
        Image.sanitize = (url: string) => url;

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();

        if (range) {
          editor.insertEmbed(range.index, "image", url);
          editor.setSelection(range.index + 1, 0);
        }
      }
    });
  };

  const modules = useMemo(() => {
    ReactQuill.Quill.register("modules/imageResize", ImageResize);

    return {
      // 더 많은 옵션은 다음 링크를 참고할 것.
      // https://quilljs.com/docs/modules/toolbar
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }, { font: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          ["bold", "italic", "underline", "strike"],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["link", "image", "video"],
        ],
        handlers: { image: imageHandler },
      },
      imageResize: {
        modules: ["Resize", "DisplaySize", "Toolbar"],
        handleStyles: {
          backgroundColor: "#00B488",
          border: "none",
          // other camelCase styles for size display
        },
      },
    };
  }, []);

  return (
    <QuillEditor
      content={content}
      quillRef={quillRef}
      modules={modules}
      onChange={onChange}
    />
  );
};

export default QuillEditorContainer;
