import React, { Component, useState } from "react";
import styled from "styled-components";
import { IconAddPhoto } from "@happeokit/icons";
import {
  active,
  gray05,
  gray09,
  white,
  success,
  alert,
  lighten90
} from "@happeokit/colors";
import { TextDelta, BodyUI, TextZeta } from "@happeokit/typography";
import { ButtonSecondary } from "@happeokit/buttons";
import { IconCheck, IconDelete } from "@happeokit/icons";
import { Loader } from "@happeokit/loaders";

export default class InnerZone extends Component {
  openImage = e => {
    e.preventDefault();
    window.open(this.props.uploadingImage.url, "_blank");
  };

  render() {
    const {
      innerZone,
      subtitle,
      uploadingImage,
      uploading,
      removeImage,
      previewTitle,
      error,
      resetDropzone,
      usePreview
    } = this.props;

    if (error) {
      return (
        <BodyWrapper>
          <StyledTextZeta>Failed to upload</StyledTextZeta>
          <ImagePreview
            image={uploadingImage}
            uploading={uploading}
            error={error}
          />
          <ButtonSecondary
            text="Try again"
            disabled={uploading}
            onClick={resetDropzone}
          />
        </BodyWrapper>
      );
    } else if (uploadingImage && uploadingImage.url && usePreview) {
      return (
        <BodyWrapper>
          <StyledTextZeta>{previewTitle}</StyledTextZeta>
          <ImagePreview
            image={uploadingImage}
            uploading={uploading}
            removeImage={removeImage}
            openImage={this.openImage}
          />
          {uploadingImage.file ? (
            <ButtonSecondary
              text="View Image"
              disabled={uploading}
              onClick={this.openImage}
            />
          ) : (
            <BodyUI>
              Drag and drop or{" "}
              <LinkText>
                <ButtonText>click here to replace</ButtonText>
              </LinkText>
            </BodyUI>
          )}
        </BodyWrapper>
      );
    } else if (innerZone) {
      return <BodyWrapper>{innerZone}</BodyWrapper>;
    } else {
      return (
        <BodyWrapper>
          <IconWrapper>
            <IconAddPhoto width={30} height={30} fill={active} />
          </IconWrapper>
          <label className="button" htmlFor="file">
            <TextDelta color={active} bold>
              Drag and drop an image
            </TextDelta>
          </label>
          <BodyUI color={gray05} style={{ paddingTop: "6px" }}>
            {subtitle}
          </BodyUI>
        </BodyWrapper>
      );
    }
  }
}

const ImagePreview = ({ image, uploading, removeImage, error, openImage }) => {
  const [hovered, setHovered] = useState(false);

  const guardRemoveImage = event => {
    if (uploading) return;
    removeImage(event);
  };
  return (
    <PreviewContainer>
      <Preview error={error}>
        <Left>
          <StyledImg url={image.url} />
          {image.file ? (
            <FileInfo>
              <FileName>{image.file && image.file.name}</FileName>
              {!error ? (
                <BodyUI color={gray05}>
                  {uploading
                    ? `${Math.round((image.file.size / 1024 / 1024) * 10) /
                        10} MB`
                    : "Uploaded"}
                </BodyUI>
              ) : (
                <BodyUI color={gray05}>{error}</BodyUI>
              )}
            </FileInfo>
          ) : (
            <FileInfo>
              <BodyUI color={gray05} onClick={openImage}>
                <ButtonText>View Image</ButtonText>
              </BodyUI>
            </FileInfo>
          )}
        </Left>
        {!error && (
          <Right
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            uploading={uploading}
            onClick={guardRemoveImage}
          >
            {uploading ? (
              <Loader containerHeight={"26px"} />
            ) : (
              <StyledButton
                isActionIcon
                color={hovered || !image.file ? alert : success}
              >
                {hovered || !image.file ? (
                  <IconDelete fill={white} />
                ) : (
                  <IconCheck fill={white} />
                )}
              </StyledButton>
            )}
          </Right>
        )}
      </Preview>
    </PreviewContainer>
  );
};

const PreviewContainer = styled.div`
  width: 100%;
  margin: 8px 0px 12px 0px;
  flex: 0;
`;

const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ error }) => (error ? lighten90(alert) : gray09)};
  align-items: center;
  padding: 14px 20px;
  border-radius: 6px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Right = styled.div`
  cursor: ${({ uploading }) => (uploading ? "not-allowed" : "pointer")};
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 16px 0 8px;
  overflow: hidden;
`;

const FileName = styled(BodyUI)`
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 150px;
`;

const IconWrapper = styled.div`
  margin-bottom: 8px;
`;

const StyledButton = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  fill: ${white};
  margin-right: 4px;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.div`
  width: 52px;
  height: 44px;
  border-radius: 6px;
  background-position: center;
  background-image: ${({ url }) => `url(${url})`};
  background-size: contain;
  background-color: ${white};
  background-repeat: no-repeat;
`;

const ButtonText = styled.span`
  cursor: pointer;

  :hover {
    color: ${active};
    text-decoration: underline;
  }
`;

const LinkText = styled.span`
  color: ${active};
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledTextZeta = styled(TextZeta)`
  padding: 8px 0;
`;
