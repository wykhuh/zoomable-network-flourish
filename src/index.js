import "cytoscape/dist/cytoscape.min.js";

import cyStyle from "./cy_style";
import { fcoseOptions, coseOptions } from "./layout_options";
import { stopSpinner } from "./components/spinner";
import { formatEdges, formatNodes, addOriginalPosition } from "./format_data";
import {
  resetHighlights,
  highlightElements,
  switchConcentricLayout
} from "./highlight_neighbors";
import {
  populateDropdown,
  addDropdownListeners
} from "./components/dropdown_menu";
import { addResetListeners } from "./components/reset_button";

let cy = null;
let allNodes = null;
let allEdges = null;

export var data = {};

export var state = {
  highlight_layout: "random"
};

export function draw() {
  const edgesData = formatEdges(data.links);
  const nodesData = formatNodes(data.points, data.links);
  const maxEdges = Math.max(...nodesData.map(n => n.data.weight));

  populateDropdown(nodesData);
  stopSpinner();

  cy = cytoscape({
    container: document.getElementById("cy"),
    layout: coseOptions,
    elements: {
      nodes: nodesData,
      edges: edgesData
    },
    style: [
      ...cyStyle,
      {
        selector: "node",
        style: {
          height: `mapData(weight, 1, ${maxEdges}, 8, 40)`,
          width: `mapData(weight, 1, ${maxEdges}, 8, 40)`
        }
      }
    ]
  });

  cy.promiseOn("layoutstop").then(() => {
    addOriginalPosition(cy, nodesData);
  });

  cy.minZoom(0.1);
  cy.maxZoom(4);

  allNodes = cy.nodes();
  allEdges = cy.edges();

  addDropdownListeners(cy, allNodes, allEdges, state);
  addResetListeners(cy, allNodes, allEdges);

  cy.on("tap", "node", function(event) {
    const node = event.target;
    const nhood = node.closedNeighborhood();

    resetHighlights(cy, allNodes, allEdges);
    highlightElements(cy, node, nhood);
    if (state.highlight_layout === "concentric") {
      switchConcentricLayout(node, nhood);
    }
  });
}

export function update() {
  if (targetNode && state.highlight_layout === "concentric") {
    switchConcentricLayout(targetNode, targetNeighborhood);
  }

  if (targetNode && state.highlight_layout === "random") {
    resetOriginalPositions(cy, targetNeighborhood);
  }
}
