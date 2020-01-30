import React from "react";
import styled from "styled-components";
import { active } from "@happeokit/colors";
import { BodyUI } from "@happeokit/typography";
import { IconPhoto } from "@happeokit/icons";
import DropZone from "../DropZone";
import { ButtonPrimary } from "@happeokit/buttons";
import { ImageCropper } from "@happeokit/image-cropper";

class ModalBody extends React.Component {
  constructor(props) {
    super(props);
  }

  openUpload = () => {
    this.uploadInputRef.click();
  };

  handleChangeInput = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      this.props.uploadImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  render() {
    if (this.props.showCropper) {
      return (
        <ModalBodyWrapper>
          <ImageCropper
            url={this.props.image.url}
            onSave={this.props.onSave}
            viewport={{
              width: 130,
              height: 130,
              isCircle: true
            }}
            boundary={{
              width: "100%",
              height: "170px"
            }}
          />
        </ModalBodyWrapper>
      );
    } else {
      return (
        <ModalBodyWrapper>
          <DropZone
            onlyImage
            circleBoundary
            width={150}
            height={150}
            innerZone={dropImageZone()}
            onResult={this.props.uploadImage}
          />
          <BodyUI>or</BodyUI>
          <UploadButton>
            <ButtonPrimary text="Upload photo" onClick={this.openUpload} />
            <input
              type="file"
              onChange={this.handleChangeInput}
              ref={ref => (this.uploadInputRef = ref)}
              id="file"
              accept="image/*"
            />
          </UploadButton>
        </ModalBodyWrapper>
      );
    }
  }
}

const dropImageZone = () => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <IconPhoto
        width={40}
        height={40}
        fill={active}
        style={{ paddingBottom: 5 }}
      />
      <BodyUI color={active}>Drop Photo</BodyUI>
    </div>
  );
};

const ModalBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 230px;
`;

const UploadButton = styled.label`
  position: relative;

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: -1;
  }
`;

export default ModalBody;
