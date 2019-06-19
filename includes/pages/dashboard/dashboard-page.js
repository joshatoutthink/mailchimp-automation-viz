function dasboardInit() {
  const automations = [...document.querySelectorAll(".automation")];
  automations.forEach(automation => {
    automation.addEventListener("click", () => {
      console.log(automation.dataset.show);
    });
  });
}
window.addEventListener("load", () => dasboardInit());
