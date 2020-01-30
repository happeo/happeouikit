import React, { Component, Fragment, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { ButtonPrimary, ButtonSecondary } from "@happeokit/buttons";
import { BodyUI } from "@happeokit/typography";
import ConfirmModal from "./ConfirmModal";

export default class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen1: false,
      isOpen2: false
    };
  }

  close = modalNum => {
    this.setState({ [`isOpen${modalNum}`]: false });
  };

  render() {
    return (
      <Fragment>
        <ButtonRow>
          <ButtonPrimary
            text="Modal with header and footer"
            onClick={() => this.setState({ isOpen1: true })}
          />

          <ButtonPrimary
            text="Modal without header and with custom footer"
            onClick={() => this.setState({ isOpen2: true })}
          />
        </ButtonRow>

        {/*Modal with header*/}
        <Modal
          data-target="test"
          isOpen={this.state.isOpen1}
          close={() => this.close(1)}
          headerText={"Header Text"}
          width={"300px"}
          okCallback={() => this.close(1)}
          cancelText={"Cancel"}
        >
          <BodyUI>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
            vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
            nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
            nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
            nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
            nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
            nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </BodyUI>
        </Modal>

        {/*Modal without header*/}
        <Modal
          footer={false}
          isOpen={this.state.isOpen2}
          close={() => this.close(2)}
          width={"30%"}
        >
          <BodyUI>
            Lorem ipsum dolor sit amet, sonet everti mei in, at his amet simul
            fabellas. Amet platonem et eos. Pri viris oportere in. Ad per sale
            paulo fabulas, mel iriure albucius atomorum ex. At simul aliquando
            sit, mel putent praesent salutatus id.
          </BodyUI>

          <ModalFooter>
            <ButtonSecondary text="Cancel" onClick={() => this.close(2)} />
            <ButtonPrimary text="OK" onClick={() => this.close(2)} />
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const ModalFooter = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;
`;

export const ConfirmModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <ButtonPrimary
        text="Open confirm modal"
        onClick={() => setIsOpen(true)}
      />
      <ConfirmModal
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        header={"Test header"}
        bodyText={"Confirm action"}
        okCb={() => setIsOpen(false)}
      />
    </Fragment>
  );
};
