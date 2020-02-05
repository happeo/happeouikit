export const actions = [
  {
    name: "Edit page",
    callback: val => console.log("edited", val),
    type: "edit"
  },
  {
    name: "Archive page",
    callback: val => console.log("archived", val),
    type: "archive"
  }
];
