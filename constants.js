export const SETTINGS_LANG = "lang";
export const ASSETS_ROOT = "https://cdn.happeo.com/misc";

// Global settings
const settings = window.settings || {};
if (!settings.env) settings.env = "local";

export const ROOT = settings.env === "local" ? "https://staging.unvrs.io" : "";
let CDN_PATH = "//cdn.happeo.com";
if (settings.env === "staging") {
  CDN_PATH = "//cdn-b.happeo.com";
} else if (settings.env === "local") {
  CDN_PATH = "";
}

export const uploadConfig = {
  upload: ROOT + "/api/images/upload",
  get: ROOT + "/api/images/image"
};

export const IMG_SIZES = "thumb,sm,md,lg";

export { settings, CDN_PATH };
