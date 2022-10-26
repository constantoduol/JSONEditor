export const EDIT_KEY = "__editable_json_editor__";

export const getKey = (prefix, currentKey, parentKeyPath, marginLeft) => {
  return `${prefix}_${parentKeyPath}_${currentKey}_${marginLeft}`;
};

export const jsonEditorDefaultStyles = {
  dualView: {
    display: "flex",
  },
  jsonViewer: {
    borderLeft: "1px solid lightgrey",
    width: "50%",
    margin: 10,
  },
  jsonEditor: {
    width: "50%",
    fontSize: 14,
    fontFamily: "monospace",
    margin: 10,
  },
  label: {
    color: "#c00",
    marginTop: 4,
  },
  value: {
    marginLeft: 10,
  },
  row: {
    display: "flex",
  },
  root: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  withChildrenLabel: {
    color: "#a52a2a",
  },
  select: {
    borderRadius: 3,
    borderColor: "#d3d3d3",
  },
  typeSelect: {
    marginLeft: 10
  },
  input: {
    borderRadius: 3,
    border: "1px solid #d3d3d3",
    padding: 3,
  },
  addButton: {
    cursor: "pointer",
    color: "black",
    marginLeft: 15,
    fontSize: 14,
  },
  removeButton: {
    cursor: "pointer",
    color: "red",
    marginLeft: 15,
    fontSize: 14,
  },
  saveButton: {
    cursor: "pointer",
    color: "green",
    marginLeft: 15,
    fontSize: 14,
  },
  builtin: {
    color: "#00f",
  },
  text: {
    color: "#077",
  },
  number: {
    color: "#a0a",
  },
  property: {
    color: "#c00",
  },
  collapseIcon: {
    cursor: "pointer",
  },
};

export const jsonViewerDefaultStyles = {
  root: {
    margin: 5,
    fontSize: 14,
    fontFamily: "monospace",
  },
  builtin: {
    color: "#00f",
  },
  text: {
    color: "#077",
  },
  number: {
    color: "#a0a",
  },
  property: {
    color: "#c00",
  },
  collapseIcon: {
    cursor: "pointer",
  },
};
