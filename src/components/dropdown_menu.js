import {
  resetHighlights,
  highlightElements,
  switchConcentricLayout
} from "../highlight_neighbors";

const addDropdownListeners = (cy, allNodes, allEdges, state) => {
  const el = document.getElementById("dropdown");
  if (!el) {
    return;
  }

  el.addEventListener("change", e => {
    var target = el.options[el.selectedIndex].value;
    var node = cy.getElementById(target);
    var nhood = node.closedNeighborhood();

    resetHighlights(cy, allNodes, allEdges);
    highlightElements(cy, node, nhood);
    if (state.highlight_layout === "concentric") {
      switchConcentricLayout(node, nhood);
    }
  });
};

const populateDropdown = nodesData => {
  const el = document.querySelector("#dropdown");
  if (!el) {
    return;
  }

  const nodes = nodesData.sort((a, b) =>
    a.data.id < b.data.id ? -1 : a.data.id > b.data.id ? 1 : 0
  );

  el.insertAdjacentHTML(
    "beforeend",
    "<option disabled selected>Select option</option>"
  );

  nodes.forEach(node => {
    let html = `<option value="${node.data.id}">
    ${node.data.id} (${node.data.weight})
    </option>`;
    el.insertAdjacentHTML("beforeend", html);
  });
};

export { addDropdownListeners, populateDropdown };
