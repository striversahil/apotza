// A workaround to generate random id
const id = () => {
  return (Math.random() * 10000).toString();
};

export const ReferenceSidebarComponents = [
  {
    title: "Label",
    target: "text",
  },
  {
    title: "Checkbox",
    target: "checkbox",
  },
  // {
  //   id: id(),
  //   title: "Dropdown",
  //   target: "dropdown",
  // },
  // {
  //   id: id(),
  //   title: "Input",
  //   target: "input",
  // },
  // {
  //   id: id(),
  //   title: "Table",
  //   target: "table",
  // },
  // {
  //   id: id(),
  //   title: "Card",
  //   target: "card",
  // },
];
