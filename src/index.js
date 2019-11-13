import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
import coseBilkent from "cytoscape-cose-bilkent";

import allState from "./state";
import allData from "./data";
import { updateColors, setElementColor, setNodesColor, color } from "./colors";
import cyStyle from "./cy_style";
import { coseOptions, colaOptions, coseBilkentOptions } from "./layout_options";
import { stopSpinner } from "./components/spinner";
import { formatEdges, formatNodes, addOriginalPosition } from "./format_data";
import {
  resetOriginalPositions,
  highlightNodeLayout,
  fitNodes
} from "./highlight_neighbors";
import { populateDropdown } from "./components/dropdown_menu";
import { addResetListeners } from "./components/reset_button";

cytoscape.use(coseBilkent);

let layout = coseBilkentOptions;
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
      highlightNodeLayout({
        cy,
        allNodes,
        allEdges,
        targetNode,
        targetNeighborhood
      });
    });
  });
};

const addColorGroupListeners = () => {
  const colorGroupItemEls = document.querySelectorAll("li.color-group-item");

  if (colorGroupItemEls) {
    colorGroupItemEls.forEach(el => {
      el.addEventListener("click", e => {
        let group = e.target.dataset["group"];
        if (e.target.nodeName == "LI") {
          e.target.classList.toggle("inactive");
        } else {
          e.target.parentElement.classList.toggle("inactive");
        }
      });
    });
  }
};

const renderColorGroups = data => {
  const listEl = document.querySelector(".color-groups");
  if (!listEl) return;

  const itemEls = document.querySelectorAll(".color-group-item");
  if (itemEls) {
    itemEls.forEach(i => i.remove());
  }

  var groups = [...new Set(data.points.map(p => p.group))].sort(
    (a, b) => a > b
  );
  let content = "";

  groups.forEach(group => {
    const groupName = group;
    const groupColor = color.find(group);
    content += `<li class="color-group-item" data-group="${groupName}">
      <span data-group="${groupName}" style="background:${groupColor}"></span>
      ${groupName}</li>`;
  });
  listEl.insertAdjacentHTML("beforeend", content);
};

export var data = allData;

export var state = allState;

export function draw() {
  updateColors();
  renderColorGroups(data);

  const edgesData = formatEdges(data.links);
  const nodesData = formatNodes(data.points, data.links);
  const maxEdges = Math.max(...nodesData.map(n => n.data.edgeCount));

  populateDropdown(nodesData);
  stopSpinner();

  cy = cytoscape({
    container: document.getElementById("cy"),
    layout: layout,
    elements: {
      nodes: nodesData,
      edges: edgesData
    },
    style: [
      ...cyStyle,
      {
        selector: "node",
        style: {
          "font-size": "14px",
          height: `mapData(edgeCount, 1, ${maxEdges}, 8, 24)`,
          width: `mapData(edgeCount, 1, ${maxEdges}, 8, 24)`,
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

    highlightNodeLayout({
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
  renderColorGroups(data);
  setNodesColor(cy, allNodes);

  if (targetNeighborhood) {
    resetOriginalPositions(cy, targetNeighborhood);
    fitNodes(cy, targetNeighborhood);
  }
}
