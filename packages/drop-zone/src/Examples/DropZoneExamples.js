import React from "react";
import styled from "styled-components";
import { black50, white } from "@happeokit/colors";
import { BodyUI } from "@happeokit/typography";
import { Modal } from "@happeokit/modal";
import { ButtonSecondary, ButtonPrimary } from "@happeokit/buttons";
import ModalBody from "./ModalBody";
import { cropperEvent } from "@happeokit/image-cropper";

class DropZoneExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: { url: "" },
      isModalOpen: false,
      result: ""
    };
  }

  openMediaModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ image: { url: "" }, isModalOpen: false });
  };

  openUpload = () => {
    this.uploadInputRef.click();
  };

  uploadImage = url => {
    this.setState({ image: { url } });
  };

  getResult = () => {
    cropperEvent.emit("getResult");
  };

  saveAvatar = data => {
    this.closeModal();
    this.setState({ result: data });
  };

  render() {
    const { result, image } = this.state;
    return (
      <Container>
        <AvatarWrapper onClick={this.openMediaModal}>
          <AvatarTextWrapper hide={!!result}>
            <BodyUI color={white} bold>
              Change avatar
            </BodyUI>
          </AvatarTextWrapper>
          <img style={{ width: "100%", height: "100%" }} src={result} />
        </AvatarWrapper>

        <Modal isOpen={this.state.isModalOpen} width={"25%"} footer={false}>
          <ModalBody
            uploadImage={this.uploadImage}
            showCropper={image.url}
            imageUrl={image.url}
            onSave={this.saveAvatar}
          />
          <ModalFooter>
            <ButtonSecondary text="Cancel" onClick={this.closeModal} />
            <ButtonPrimary
              text="Upload"
              disabled={!image.url}
              onClick={this.getResult}
            />
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
  justify-content: center
  width: 100%;
`;

const AvatarTextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  opacity: ${({ hide }) => (hide ? 0 : 1)}
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    margin: auto;
  }
`;

const AvatarWrapper = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 15px 0 0;
  cursor: pointer;
  position: relative;
  background-image: linear-gradient(315deg, #00c6ff, #009dff);

  ::before {
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    opacity: 0;
    background-color: ${black50};
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  img {
    object-fit: cover;
  }

  :hover {
    div {
      opacity: 1;
    }

    ::before {
      opacity: 1;
    }
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

export default DropZoneExamples;
