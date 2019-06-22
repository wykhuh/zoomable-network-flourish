import { LAYOUT_PADDING, EASING, ANIMATION_DURATION } from "./layout_options";

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
      "z-index": 200,
      "transition-property": "text-opacity background-color opacity",
      "transition-duration": ANIMATION_DURATION * 2,
      "transition-timing-function": EASING
    }
  },
  {
    selector: ".highlight-edge",
    style: {
      width: 2,
      opacity: 0.8,
      "z-index": 100,
      "transition-property": "opacity width",
      "transition-duration": ANIMATION_DURATION * 2,
      "transition-timing-function": EASING
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
