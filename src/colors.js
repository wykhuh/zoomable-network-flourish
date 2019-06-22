import data from "./data";
import state from "./state";
import initColors from "@flourish/custom-colors";

let color = initColors(state.color, true);

const updateColors = () => {
  color.updateColors(data.points.map(d => d.group));
};

const setElementColor = element => {
  const group = element.data("group");
  return group ? color.find(group) : "#333";
};

const setNodesColor = (cy, nodes) => {
  cy.batch(() => {
    nodes.forEach(node => {
      node.style({ "background-color": setElementColor });
    });
  });
};

export { updateColors, color, setElementColor, setNodesColor };
