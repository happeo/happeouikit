import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { radius500 } from "@happeokit/theme";
import { active, gray08, lighten80 } from "@happeokit/colors";
import InnerZoneWrapper from "./InnerZoneWrapper";
import { isImage, api } from "@universe/frontend-utils";

class DropZone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      isDragActive: false,
      error: null,
      uploadingImage: null,
      uploading: false
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("dragover", this.toggleDropBoxVisible);
    document.addEventListener("dragleave", this.handleDragLeave);
    document.addEventListener("drop", this.handleDragLeave);

    if (this.props.image) {
      this.setState({ uploadingImage: this.props.image });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("dragover", this.toggleDropBoxVisible);
    document.removeEventListener("dragleave", this.handleDragLeave);
    document.removeEventListener("drop", this.handleDragLeave);
  }

  componentDidUpdate(prevProps) {
    if (this.props.file && this.props.file !== prevProps.file) {
      this.handleUpload(this.props.file);
    }

    if (this.props.image !== prevProps.image) {
      this.setState({
        uploadingImage: this.props.image
      });
    }
  }

  preventDefault = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  openUpload = () => {
    this.inputRef.current.click();
  };

  toggleDropBoxVisible = e => {
    this.preventDefault(e);
    this.setState({ isDragging: true });
  };

  uploadImage = (data, config) => {
    return api.images.upload(data, config);
  };

  handleDragLeave = e => {
    this.preventDefault(e);
    this.setState({ isDragging: false, isDragActive: false });
  };

  handleDragOverInside = e => {
    this.preventDefault(e);
    this.setState({ isDragActive: true });
  };

  handleDrop = e => {
    this.preventDefault(e);
    const droppedFile = e.dataTransfer.files[0];
    this.handleUpload(droppedFile);
  };

  handleChangeInput = e => {
    const file = e.target.files[0];
    if (file) {
      this.handleUpload(file);
    }
  };

  handleUpload = async file => {
    if (this.props.usePreview) {
      try {
        this.setState({
          isDragging: false,
          isDragActive: false,
          uploading: true,
          error: null,
          uploadingImage: { file: file }
        });
        const fileUrl = await this.getFileUrl(file);

        this.setState(prevStates => {
          return {
            ...prevStates,
            uploadingImage: { ...prevStates.uploadingImage, url: fileUrl }
          };
        });

        const config = { now: this.props.imageSize.join(",") };
        const imageResp = await this.uploadImage(file, { params: config });

        if (imageResp && imageResp.data) {
          this.setState(prevStates => {
            return {
              uploading: false,
              uploadingImage: {
                ...prevStates.uploadingImage,
                url: imageResp.data.url
              }
            };
          });
        }
        this.props.onResult(this.state.uploadingImage);
      } catch (err) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.description
        ) {
          this.setState({
            error: err.response.data.description,
            uploading: false
          });
        } else {
          this.setState({
            error: err.message,
            uploading: false
          });
        }
        console.log(err);
      }
    } else {
      try {
        this.setState({
          isDragging: false,
          isDragActive: false,
          error: null,
          uploadingImage: { file: file }
        });
        const fileUrl = await this.getFileUrl(file);

        if (fileUrl) {
          this.props.onResult({
            file,
            url: fileUrl
          });
        }
      } catch (err) {
        this.setState({
          error: err.message
        });
      }
    }
  };

  getFileUrl = file => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = e => {
        if (!isImage(file.type)) {
          reject(new Error("Invalid File Type"));
        }
        if (file.size > this.props.sizeLimit) {
          reject(new Error("File Too Large"));
        }

        resolve(e.target.result);
      };

      reader.onerror = () => {
        reader.abort();
        reject(new Error("Problem parsing input file."));
      };

      reader.readAsDataURL(file);
    });
  };

  removeUploadingImage = event => {
    event.stopPropagation();
    this.setState({ uploading: false, uploadingImage: null }, () => {
      this.props.onResult(this.state.uploadingImage);
    });
  };

  resetDropzone = event => {
    event.stopPropagation();
    this.setState({ error: null, uploadingImage: null });
  };

  render() {
    const {
      error,
      isDragging,
      isDragActive,
      uploadingImage,
      uploading
    } = this.state;
    const {
      circleBoundary,
      onResult,
      innerZone,
      subtitle,
      previewTitle,
      usePreview,
      ...props
    } = this.props;
    return (
      <DropBox
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOverInside}
        onDrop={this.handleDrop}
        onClick={this.openUpload}
        {...props}
      >
        <input
          type="file"
          id="file"
          onChange={this.handleChangeInput}
          ref={this.inputRef}
        />
        <BoxInput
          dragging={isDragging}
          dragActive={isDragActive}
          circleBoundary={circleBoundary}
        >
          <InnerZoneWrapper
            innerZone={innerZone}
            subtitle={subtitle}
            uploadingImage={uploadingImage}
            previewTitle={previewTitle}
            uploading={uploading}
            removeImage={this.removeUploadingImage}
            handleUpload={this.handleUpload}
            error={error}
            resetDropzone={this.resetDropzone}
            usePreview={usePreview}
          />
        </BoxInput>

        {/* TODO: should move to DropZoneWithChildren
        {!isDragging && !error && !uploadingImage &&children && (
          <ChildrenWrapper>{children}</ChildrenWrapper>
        )} */}
      </DropBox>
    );
  }
}

DropZone.propTypes = {
  onResult: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  subtitle: PropTypes.string,
  sizeLimit: PropTypes.number,
  circleBoundary: PropTypes.bool,
  innerZone: PropTypes.node,
  imageSize: PropTypes.array,
  file: PropTypes.object,
  image: PropTypes.object,
  previewTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  usePreview: PropTypes.bool
};

DropZone.defaultProps = {
  imageSize: ["thumb", "sm", "md", "lg"],
  usePreview: true
};

const DropBox = styled.form`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  min-height: ${({ height }) => (height ? `${height}px` : "200px")};
  position: relative;
  display: flex;
  cursor: pointer;

  input[type="file"] {
    display: none;
  }
`;

const BoxInput = styled.div`
  position: relative;
  border: 2px dashed ${gray08};
  border-radius: ${({ circleBoundary }) =>
    circleBoundary ? "50%" : radius500};
  padding: 20px;
  opacity: 1;
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  flex: 1;

  ${({ dragging }) =>
    dragging &&
    css`
      opacity: 1;
    `};

  ${({ dragActive }) =>
    dragActive &&
    css`
      border: 2px solid ${active};
      background-color: ${lighten80(active)};
    `};
`;

export default DropZone;
