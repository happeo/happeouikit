import { FILE_TYPE_NAMES, FOLDER_TYPES, MODAL_TYPES } from "./constants";

/**
 * Recursively find item by id in items children
 * @param item
 * @param id
 * @returns {null|*|null|*}
 */
export const findDriveById = (id, item) => {
  if (item.id === id) return item;
  if (item.children) {
    for (let child of item.children) {
      const found = findDriveById(id, child);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Find item in a nested array by id
 * @param id
 * @param array
 * @returns {*}
 */
export const findItemInArray = (id, array) => {
  for (let item of array) {
    let found = findDriveById(id, item);
    if (found) {
      return found;
    }
  }

  return null;
};

export const getFileType = file => {
  if (!file) return null;
  if (
    file.kind &&
    file.kind.toLowerCase().includes(FILE_TYPE_NAMES.TEAM_DRIVE.toLowerCase())
  ) {
    return FILE_TYPE_NAMES.TEAM_DRIVE;
  } else if (FOLDER_TYPES.includes(file.mimeType)) {
    return FILE_TYPE_NAMES.FOLDER;
  } else if (file.mimeType.includes("video")) {
    return "video";
  } else if (file.mimeType.includes("image")) {
    return "image";
  }
  return FILE_TYPE_NAMES.FILE;
};

export const isTeamDrive = file => {
  return getFileType(file) === FILE_TYPE_NAMES.TEAM_DRIVE;
};

export const isFile = file => {
  return getFileType(file) === FILE_TYPE_NAMES.FILE;
};

export const isFolder = file => {
  return getFileType(file) === FILE_TYPE_NAMES.FOLDER;
};

export const isVideo = file => {
  return getFileType(file) === FILE_TYPE_NAMES.VIDEO;
};
export const isImage = file => {
  return getFileType(file) === FILE_TYPE_NAMES.IMAGE;
};

export const getTypeEnum = type => {
  switch (type) {
    case "application/vnd.google-apps.document":
      return "docs";
    case "application/vnd.google-apps.drawing":
      return "drawings";
    case "application/vnd.google-apps.form":
      return "forms";
    case "application/vnd.google-apps.map":
      return "mymaps";
    case "application/vnd.google-apps.spreadsheet":
      return "sheets";
    case "application/vnd.google-apps.presentation":
      return "slides";
    default:
      return "docs";
  }
};

const docTypes = [
  "application/vnd.google-apps.document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  "application/pdf"
];

const sheetTypes = [
  "application/vnd.google-apps.spreadsheet",
  "application/x-vnd.oasis.opendocument.spreadsheet",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

const presTypes = [
  "application/vnd.google-apps.presentation",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.presentation"
];

const formTypes = ["application/vnd.google-apps.form"];

export const getMimeTypeEnum = mimeType => {
  if (docTypes.includes(mimeType)) return "docs";
  if (presTypes.includes(mimeType)) return "slides";
  if (formTypes.includes(mimeType)) return "forms";
  if (sheetTypes.includes(mimeType)) return "sheets";
  return "docs"; //Fallback to 'docs'
};

/**
 * Check if non-file item type can be marked as selected on single click
 * @param item
 * @param allowedType
 * @param allowTeamDrives
 * @param isDoubleClick
 */
export const isSelectable = (
  item,
  allowedType,
  allowTeamDrives,
  isDoubleClick
) => {
  if (!item) return false;
  if (isDoubleClick && !isFile(item)) return false;
  if (isTeamDrive(item) && allowTeamDrives) return true;
  if (isFile(item) && allowedType === MODAL_TYPES.file) return true;
  if (isVideo(item) && allowedType === MODAL_TYPES.video) return true;
  if (isImage(item) && allowedType === MODAL_TYPES.image) return true;

  // if item is not of type file and it's a double click, it cannot be selected
  if (isFolder(item) && allowedType === MODAL_TYPES.folder) return true;
  if (allowedType === MODAL_TYPES.all) return true;
  // default to false
  return false;
};
