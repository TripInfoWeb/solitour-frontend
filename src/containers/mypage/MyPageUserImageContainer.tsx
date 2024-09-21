import MyPageUserImage from "@/components/mypage/MyPageUserImage";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import useModalState from "@/hooks/useModalState";
import { useState } from "react";

interface IMyPageUserImageContainer {
  userImageUrl: string;
  userSex: string | null;
}

const MyPageUserImageContainer = (props: IMyPageUserImageContainer) => {
  const [imageUrl, setImageUrl] = useState(props.userImageUrl || "");
  const [imageBase64Data, setImageBase64Data] = useState<string>("");
  const modalState = useModalState();
  
  const imageUpload = (imageDataUrl: string) => {
    setImageBase64Data(imageDataUrl);
    modalState.openModal(); // 이미지 편집을 위한 모달창
  }
  
  const closeCropModal = () => {
    setImageBase64Data("");
    modalState.closeModal();
  };

  const onChangeImageUrl = (url: string) => {
    setImageUrl(url);
  }

    const {
      isDragging,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDropOrInputEvent,
    } = useDragAndDrop({ imageUpload });

  return (
    <div>
      <MyPageUserImage
        dragAndDrop={{
          isDragging,
          onDragEnter,
          onDragLeave,
          onDragOver,
          onDropOrInputEvent,
        }}
        userImageUrl={imageUrl}
        userSex={props.userSex}
        isModalOpen={modalState.isOpen}
        imageBase64Data={imageBase64Data}
        closeCropModal={closeCropModal}
        onChangeImageUrl={onChangeImageUrl}
      />
    </div>
  );
};

export default MyPageUserImageContainer;
