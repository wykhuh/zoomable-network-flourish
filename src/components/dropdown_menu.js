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
    ${node.data.id} (${node.data.edgeCount})
    </option>`;
    el.insertAdjacentHTML("beforeend", html);
  });
};

export { populateDropdown };
