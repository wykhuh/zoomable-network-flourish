import { concentricOptions } from "./layout_options";

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

const switchConcentricLayout = (node, nhood) => {
  var layout = nhood.filter(":visible").makeLayout({
    ...concentricOptions,
    concentric: function(element) {
      if (element.same(node)) {
        return 2;
      } else {
        return 1;
      }
    }
  });

  layout.run();
};

const resetOriginalPositions = (cy, nodes) => {
  cy.batch(() => {
    nodes.forEach(function(node) {
      var p = node.data("original_position");
      node.position({ x: p.x, y: p.y });
    });
  });
};

export {
  resetHighlights,
  highlightElements,
  switchConcentricLayout,
  resetOriginalPositions
};
