import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Croppie from "croppie";
import "croppie/croppie.css";
import { EventEmitter } from "fbemitter";
import { IconButton } from "@happeokit/buttons";
import { IconRotateLeft, IconRotateRight } from "@happeokit/icons";

class ImageCropper extends Component {
  constructor(props) {
    super(props);

    this.croppie = {};
  }

  componentDidMount() {
    const viewport = this.calculateViewport();
    const { enableResize, mouseWheelZoom, url, enableOrientation } = this.props;
    this.croppie = new Croppie(this.croppieRef, {
      enableExif: true,
      enableOrientation,
      enableResize,
      mouseWheelZoom,
      viewport
    });
    this.croppie.bind({ url });

    cropperEvent.addListener("getResult", this.getResult);
  }

  componentWillUnmount() {
    cropperEvent.removeAllListeners();
  }

  calculateViewport = () => {
    const {
      viewport: { aspectRatio, isCircle, ...viewport }
    } = this.props;

    // Croppie wrapper doesn't have a height before initializing, so we use the height of the boundary
    const containerHeight = Number(this.props.boundary.height.slice(0, -2));
    const containerWidth = this.croppieRef.clientWidth;

    const width = Math.min(viewport.width, containerWidth);
    const height = Math.min(viewport.height, containerHeight);

    const completeViewport = {
      width,
      height,
      type: isCircle ? "circle" : "square"
    };

    if (aspectRatio) {
      if (viewport.width) {
        const rawHeight = (width * aspectRatio.h) / aspectRatio.w;
        completeViewport.height = Math.min(rawHeight, containerHeight);
        completeViewport.width =
          (completeViewport.height * aspectRatio.w) / aspectRatio.h;
      }

      if (viewport.height) {
        const rawWidth = (height * aspectRatio.w) / aspectRatio.h;
        completeViewport.width = Math.min(rawWidth, containerWidth);
        completeViewport.height =
          (completeViewport.width * aspectRatio.h) / aspectRatio.w;
      }
    }

    return completeViewport;
  };

  getResult = () => {
    this.croppie.result(this.props.result).then(resp => {
      this.props.onSave(resp);
    });
  };

  render() {
    return (
      <Container>
        <CropperWrapper boundary={this.props.boundary}>
          <div ref={el => (this.croppieRef = el)} />
        </CropperWrapper>

        {this.props.enableOrientation && (
          <Fragment>
            <ButtonWrapper left boundary={this.props.boundary}>
              <IconButton
                icon={IconRotateLeft}
                isActionIcon
                onClick={() => this.croppie.rotate(90)}
              />
            </ButtonWrapper>
            <ButtonWrapper right boundary={this.props.boundary}>
              <IconButton
                icon={IconRotateRight}
                isActionIcon
                onClick={() => this.croppie.rotate(-90)}
              />
            </ButtonWrapper>
          </Fragment>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const CropperWrapper = styled.div`
  width: ${({ boundary }) => boundary.width};
  height: ${({ boundary }) => boundary.height};
  overflow: hidden;
  padding-bottom: 60px;
  margin: 0 auto;
  box-sizing: content-box !important;
`;

const ButtonWrapper = styled.div`
  height: 40px;
  padding: 10px 0;
  position: absolute;
  top: ${({ boundary }) => boundary.height};
  ${({ left }) =>
    left &&
    `
      left: 0;
    `}
  ${({ right }) =>
    right &&
    `
      right: 0;
    `}
`;

ImageCropper.propTypes = {
  boundary: PropTypes.object,
  viewport: PropTypes.object,
  url: PropTypes.string,
  mouseWheelZoom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  enableResize: PropTypes.bool,
  enableOrientation: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  result: PropTypes.object
};

ImageCropper.defaultProps = {
  boundary: {
    width: "100%",
    height: "300px"
  },
  viewport: {
    width: 150,
    height: 150
  },
  result: {
    type: "canvas",
    size: "viewport",
    format: "png",
    quality: 1
  },
  enableResize: false,
  enableOrientation: false,
  mouseWheelZoom: true
};

export default ImageCropper;
export const cropperEvent = new EventEmitter();
