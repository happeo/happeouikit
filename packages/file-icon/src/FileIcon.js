/**
 *
 * FileIcon
 *
 */

import React from "react";
import PropTypes from "prop-types";
import {
  IconFileAdobeAfterEffects,
  IconFileAdobePhotoshop,
  IconFileAdobeIndesign,
  IconFolderColor,
  IconGDocsColor,
  IconGDrawColor,
  IconGFormsColor,
  IconGSheetsColor,
  IconGSlideColor,
  IconFileGeneralFile,
  IconImage,
  IconFileLinkColor,
  IconFileMsExcelColor,
  IconFileMsPowerpointColor,
  IconFileMsWordColor,
  IconFileMusicColor,
  IconPagesColor,
  IconFilePdfColor,
  IconPeopleColor,
  IconFileTextColor,
  IconFileVideoColor,
  IconChat,
  IconChannelsColor,
  IconImageOverflowLeft
} from "@happeouikit/icons";
import { navy, alert } from "@happeouikit/colors";

export const MAP_MIME_TYPES_TO_ICONS = {
  "application/vnd.google-apps.folder": IconFolderColor,
  "application/un.team-drive": IconFolderColor,
  "drive-folder": IconFolderColor,
  "application/vnd.google-apps.document": IconGDocsColor,
  "application/vnd.google-apps.spreadsheet": IconGSheetsColor,
  "application/vnd.google-apps.presentation": IconGSlideColor,
  "application/vnd.google-apps.form": IconGFormsColor,
  "application/vnd.google-apps.photo": () => <IconImage fill={alert} />,
  "application/vnd.google-apps.drawing": IconGDrawColor,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": IconFileMsPowerpointColor,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": IconFileMsWordColor,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": IconFileMsExcelColor,
  "application/vnd.google-apps.file": IconFileGeneralFile,
  "application/vnd.google-apps.audio": IconFileMusicColor,
  "application/vnd.google-apps.fusiontable": IconFileGeneralFile,
  "application/vnd.google-apps.map": IconFileGeneralFile,
  "application/vnd.google-apps.script": IconFileGeneralFile,
  "application/vnd.google-apps.sites": IconFileGeneralFile,
  "application/vnd.google-apps.site": IconFileGeneralFile,
  "application/vnd.google-apps.unknown": IconFileGeneralFile,
  "text/html": IconFileGeneralFile,
  "text/plain": IconFileTextColor,
  "text/rtf": IconFileTextColor,
  "application/rtf": IconFileTextColor,
  "application/msword": IconFileMsWordColor,
  "application/vnd.ms-excel": IconFileMsExcelColor,
  "application/vnd.oasis.opendocument.text": IconFileMsWordColor,
  "application/x-vnd.oasis.opendocument.spreadsheet": IconFileMsExcelColor,
  "application/vnd.oasis.opendocument.presentation": IconFileMsPowerpointColor,
  "text/csv": IconFileTextColor,
  "image/jpeg": () => <IconImage fill={alert} />,
  "image/gif": () => <IconImage fill={alert} />,
  "image/png": () => <IconImage fill={alert} />,
  "image/tiff": () => <IconImage fill={alert} />,
  "image/svg+xml": () => <IconImage fill={alert} />,
  "image/vnd.adobe.photoshop": IconFileAdobePhotoshop,
  "application/vnd.adobe.aftereffects.project": IconFileAdobeAfterEffects,
  "application/x-adobe-indesign": IconFileAdobeIndesign,
  "application/pdf": IconFilePdfColor,
  "drive-img": () => <IconImage fill={alert} />,
  image: () => <IconImage fill={alert} />,
  "application/vnd.google-apps.video": IconFileVideoColor,
  "video/quicktime": IconFileVideoColor,
  "video/mpeg": IconFileVideoColor,
  "video/mov": IconFileVideoColor,
  "video/avi": IconFileVideoColor,
  "drive-video": IconFileVideoColor,
  "video/mp4": IconFileVideoColor,
  "video/x-ms-wmv": IconFileVideoColor,
  video: IconFileVideoColor,
  pages: IconPagesColor,
  page: IconPagesColor,
  channel: IconChannelsColor,
  link: IconFileLinkColor,
  people: IconPeopleColor,
  post: () => <IconChat fill={navy} />,
  article: () => <IconImageOverflowLeft fill={alert} />
};

export const supportedMimeTypes = Object.keys(MAP_MIME_TYPES_TO_ICONS);

const FileIcon = ({ mimeType, className }) => {
  const Icon = MAP_MIME_TYPES_TO_ICONS[mimeType] || IconFileGeneralFile;
  return <Icon className={className} />;
};

FileIcon.propTypes = {
  mimeType: PropTypes.string.isRequired
};

export default FileIcon;
