const stopSpinner = () => {
  const el = document.querySelector(".spinner");
  if (!el) {
    return;
  }
  el.classList.add("loaded");
};

export { stopSpinner };
