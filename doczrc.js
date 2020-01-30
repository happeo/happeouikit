const fontFamily = "IBM Plex Sans";
export default {
  title: "Happeo Kit",
  description: "Happeo Kit - The Awesome React kit of Happeo",
  files: "**/*.{mdx}",
  ignore: [
    "readme.md",
    "changelog.md",
    "code_of_conduct.md",
    "contributing.md",
    "license.md",
    "node_modules/*"
  ],
  themeConfig: {
    colors: {
      primary: "#29C4A9",
      secondary: "#2A3443",
      sidebarBg: "#eeeff054",
      dark: "#13161F",
      blue: "#29C4A9",
      skyBlue: "#009DFF",
      link: "#29C4A9"
    },
    styles: {
      h1: {
        fontFamily: fontFamily,
        fontSize: 48
      },
      h2: {
        fontFamily: fontFamily,
        fontSize: 36,
        borderBottom: "1px solid #96969654",
        paddingBottom: "5px",
        lineHeight: "40px"
      },
      body: {
        fontFamily: fontFamily
      }
    }
  }
};
