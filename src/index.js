import "cytoscape/dist/cytoscape.min.js";

import cyStyle from "./cy_style";
import { fcose_options, cose_options } from "./layout_options";
import { stopSpinner } from "./components/spinner";
import { formatEdges, formatNodes } from "./format_data";

let cy = null;

export var data = {};

export var state = {};

export function draw() {
  const edgesData = formatEdges(data.links);
  const nodesData = formatNodes(data.points, data.links);
  const maxEdges = Math.max(...nodesData.map(n => n.data.weight));

  cy = cytoscape({
    container: document.getElementById("cy"),
    layout: cose_options,
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

  cy.minZoom(0.1);
  cy.maxZoom(4);

  stopSpinner();
}

export function update() {
  alert("update");
}
