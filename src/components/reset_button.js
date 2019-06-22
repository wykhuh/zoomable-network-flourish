import {
  resetHighlights,
  resetOriginalPositions
} from "../highlight_neighbors";
import { LAYOUT_PADDING, EASING, ANIMATION_DURATION } from "../layout_options";

const addResetListeners = (cy, allNodes, allEdges) => {
  const el = document.querySelector("#reset-layout");
  if (!el) {
    return;
  }

  el.addEventListener("click", () => {
    resetOriginalPositions(cy, allNodes);
    resetHighlights(cy, allNodes, allEdges);

    cy.animation({
      fit: {
        eles: cy.elements(),
        padding: LAYOUT_PADDING
      },
      duration: ANIMATION_DURATION,
      easing: EASING
    }).play();
  });
};

export { addResetListeners };
