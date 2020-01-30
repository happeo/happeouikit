import showdown from "showdown";

let converter;
const customRules = {
  color: {
    type: "lang",
    regex: /\((.*?)\)\[(rgb\((?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]))\))\]/gi,
    replace: (s, val) => {
      const color = s
        .match(
          /\[(rgb\((?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]))\))\]/gi
        )[0]
        .replace("[", "")
        .replace("]", "");
      return `<span style="color:${color}">${val}</span>`;
    }
  },
  mention: {
    type: "lang",
    regex: /@(\d*):\((.*?)\)/gi,
    replace: s => {
      const r = s.match(/@(\d*):\((.*?)\)/);
      const id = r[1];
      const name = r[2];
      return `<a href="/user/${id}" class="mention" data-user-id="${id}">@${name}</a>`;
    }
  }
};

function getConverter() {
  if ( !!converter ) return converter;

  showdown.extension("color", customRules.color);
  showdown.extension("mention", customRules.mention);

  converter = new showdown.Converter({
    extensions: ["color", "mention"]
  });
  converter.setOption("strikethrough", true); // <del>
  converter.setOption("tables", true); // <table>

  return converter;
}

export default getConverter();
