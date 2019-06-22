import "cytoscape/dist/cytoscape.min.js";

import allState from "./state";
import allData from "./data";
import { updateColors, setElementColor, setNodesColor, color } from "./colors";

import cyStyle from "./cy_style";
import { fcoseOptions, coseOptions } from "./layout_options";
import { stopSpinner } from "./components/spinner";
import { formatEdges, formatNodes, addOriginalPosition } from "./format_data";
import {
  switchConcentricLayout,
  resetOriginalPositions,
  highlightAndConcentricLayout,
  fitNodes
} from "./highlight_neighbors";
import { populateDropdown } from "./components/dropdown_menu";
import { addResetListeners } from "./components/reset_button";

let cy = null;
let allNodes = null;
let allEdges = null;
let targetNode = null;
let targetNeighborhood = null;

const addDropdownListeners = (cy, allNodes, allEdges) => {
  const el = document.getElementById("dropdown");
  if (!el) {
    return;
  }

  el.addEventListener("change", e => {
    var target = el.options[el.selectedIndex].value;
    targetNode = cy.getElementById(target);
    targetNeighborhood = targetNode.closedNeighborhood();
    fitNodes(cy, targetNeighborhood).then(() => {
      highlightAndConcentricLayout({
        cy,
        allNodes,
        allEdges,
        targetNode,
        targetNeighborhood
      });
    });
  });
};

export var data = allData;

export var state = allState;

export function draw() {
  updateColors();
  console.log(state.color.palette);
  const el = document.querySelector(".color-groups");
  // let html = "";
  // state.color.palette.forEach(c => (html += `<li>${c}</li>`));
  // el.insertAdjacentHTML("beforeend", html);

  var groups = [...new Set(data.points.map(p => p.group))];
  let html = "";

  groups.forEach(group => {
    const groupName = group;
    const groupColor = color.find(group);
    html += `<li><span style="background:${groupColor}"></span>${groupName}</li>`;
  });
  el.insertAdjacentHTML("beforeend", html);

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
          width: `mapData(weight, 1, ${maxEdges}, 8, 40)`,
          "background-color": setElementColor
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

  addDropdownListeners(cy, allNodes, allEdges);
  addResetListeners(cy, allNodes, allEdges);

  cy.on("tap", "node", function(event) {
    targetNode = event.target;
    targetNeighborhood = targetNode.closedNeighborhood();

    highlightAndConcentricLayout({
      cy,
      allNodes,
      allEdges,
      targetNode,
      targetNeighborhood
    });
  });
}

export function update() {
  updateColors();
  setNodesColor(cy, allNodes);

  if (targetNode && state.highlight_layout === "concentric") {
    switchConcentricLayout(targetNode, targetNeighborhood);
  }
  if (targetNode && state.highlight_layout === "random") {
    resetOriginalPositions(cy, targetNeighborhood);
    fitNodes(cy, targetNeighborhood);
  }
}
