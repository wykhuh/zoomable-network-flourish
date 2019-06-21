const cyStyle = [
  {
    selector: "node",
    style: {
      label: "data(id)",
      "text-opacity": 0,
      "font-size": "16px",
      "background-color": "#333"
    }
  },
  {
    selector: "edge",
    style: {
      width: 1,
      opacity: 0.4,
      "line-color": "#ccc"
    }
  },
  {
    selector: ".highlight-node",
    style: {
      "text-opacity": 1,
      "background-color": "#000",
      "z-index": 200
    }
  },
  {
    selector: ".highlight-edge",
    style: {
      width: 2,
      opacity: 0.8,
      "z-index": 100
    }
  },
  {
    selector: ".faded",
    style: {
      opacity: 0.08
    }
  }
];

export default cyStyle;
