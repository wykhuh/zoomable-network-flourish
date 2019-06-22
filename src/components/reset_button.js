import {
  resetHighlights,
  resetOriginalPositions,
  fitNodes
} from "../highlight_neighbors";

const addResetListeners = (cy, allNodes, allEdges) => {
  const el = document.querySelector("#reset-layout");
  if (!el) {
    return;
  }

  el.addEventListener("click", () => {
    resetOriginalPositions(cy, allNodes);
    resetHighlights(cy, allNodes, allEdges);
    fitNodes(cy, allNodes);
  });
};

export { addResetListeners };
