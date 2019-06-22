const formatEdges = edgeData => {
  return edgeData.map(item => ({ data: item }));
};

const formatNodes = (nodeData, edgeData) => {
  return nodeData.map(item => {
    return {
      data: {
        ...item,
        weight: edgeData.filter(i => i.source == item.id || i.target == item.id)
          .length
      }
    };
  });
};

const addOriginalPosition = (cy, nodesData) => {
  cy.batch(() => {
    nodesData.forEach(node => {
      const position = cy.getElementById(node.data.id).position();
      node.data.original_position = { ...position };
    });
  });
};

export { formatEdges, formatNodes, addOriginalPosition };
