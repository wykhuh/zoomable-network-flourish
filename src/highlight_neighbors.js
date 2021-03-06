import { LAYOUT_PADDING, EASING, ANIMATION_DURATION } from "./layout_options";
import state from "./state";

const resetHighlights = (cy, allNodes, allEdges) => {
  cy.batch(() => {
    allNodes.removeClass("highlight-node faded");
    allEdges.removeClass("highlight-edge faded");
  });
};

const highlightElements = (cy, node, nhood) => {
  var others = cy.elements().not(nhood);

  cy.batch(() => {
    node.addClass("highlight-node");
    node.neighborhood("edge").addClass("highlight-edge");
    node.neighborhood("node").addClass("highlight-node");
    others.addClass("faded");
  });
};

const resetOriginalPositions = (cy, nodes) => {
  cy.batch(() => {
    nodes.forEach(function(node) {
      var position = node.data("original_position");
      node
        .animation({
          position: position,
          duration: ANIMATION_DURATION,
          easing: EASING
        })
        .play();
    });
  });
};

const fitNodes = (cy, nodes) => {
  return cy
    .animation({
      fit: {
        eles: nodes,
        padding: LAYOUT_PADDING
      },
      duration: ANIMATION_DURATION,
      easing: EASING
    })
    .play()
    .promise();
};

const highlightNodeLayout = ({
  cy,
  allNodes,
  allEdges,
  targetNode,
  targetNeighborhood
}) => {
  resetHighlights(cy, allNodes, allEdges);
  highlightElements(cy, targetNode, targetNeighborhood);
};

export {
  resetHighlights,
  highlightElements,
  resetOriginalPositions,
  highlightNodeLayout,
  fitNodes
};
