import React from "react";
import styled from "styled-components";
import { ButtonPrimary, ButtonSecondary } from "@happeokit/buttons";
import { Modal } from "@happeokit/modal";
import { gray08 } from "@happeokit/colors";
import ImageCropper, { cropperEvent } from "./ImageCropper";

class ImageCropperExample extends React.Component {
  constructor(props) {
    super(props);

    this.croppie = {};
    this.state = {
      url: null,
      isOpen: false
    };
  }

  handleChange = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = e => {
      this.setState(
        {
          url: e.target.result
        },
        () => {
          this.setState({ isOpen: true });
        }
      );
    };
  };

  openUpload = () => {
    this.uploadInputRef.click();
  };

  closeModal = () => {
    this.setState({ isOpen: false });
    this.uploadInputRef.value = "";
  };

  onSave = resultData => {
    this.closeModal();
    this.setState({ imageSrc: resultData });
  };

  getResult = () => {
    cropperEvent.emit("getResult");
  };

  render() {
    return (
      <Container>
        <AvatarWrapper>
          <img
            style={{ width: "100%", height: "100%" }}
            src={this.state.imageSrc}
            alt="Avatar"
          />
        </AvatarWrapper>
        <UploadButton>
          <ButtonSecondary onClick={this.openUpload} text="Upload" />
          <input
            type="file"
            onChange={this.handleChange}
            ref={ref => (this.uploadInputRef = ref)}
            id="file"
          />
        </UploadButton>

        <Modal
          iconClose
          headerText={"Upload image"}
          isOpen={this.state.isOpen}
          close={this.closeModal}
          width={"25%"}
          footer={false}
        >
          <ImageCropper
            url={this.state.url}
            onSave={this.onSave}
            onCancel={this.closeModal}
            viewport={{
              width: 200,
              height: 200,
              isCircle: true
            }}
            enableOrientation={true}
          />
          <ModalFooter>
            <ButtonSecondary text="Cancel" onClick={this.closeModal} />
            <ButtonPrimary text="Save" onClick={this.getResult} />
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const AvatarWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${gray08};
  overflow: hidden;
  margin: 0 15px 0 0;

  img {
    object-fit: cover;
  }
`;

const ModalFooter = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

ImageCropper.propTypes = {};

export default ImageCropperExample;
