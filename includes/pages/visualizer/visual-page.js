import flip from "../../../javascripts/flip";
///////////////--///////////////////////////////
function widgetInit() {
  const widget = document.querySelector("#va-widget");

  const automations = document.querySelectorAll(".automation");
  const viewLinks = [...automations].map(automation =>
    automation.querySelector('[data-action="view"]')
  );

  /* state toggling funtions */
  //controls going from list and automation view
  function activateState(link) {
    const stateValue =
      typeof link === "string"
        ? link
        : link.closest(".automation").dataset.active
        ? "list"
        : link.dataset.show;

    flip({
      el: "[data-key]",
      stateChange: () => (widget.dataset.state = stateValue),
    });
    //removes all active attributes
    document
      .querySelectorAll("[data-active]")
      .forEach(el => el.removeAttribute("data-active"));
    //adds active attribute to automation which was clicked

    document
      .querySelectorAll(`[data-show="${stateValue}"]`)
      .forEach(el =>
        el.closest(".automation").setAttribute("data-active", true)
      );
  }

  //controls going from emails and stats view from with in the automation view
  function activateAutomationState(btn) {
    //toggles the dataset attr
    const automation = document.querySelector(".automation[data-active]");
    const automationState =
      automation.dataset.automationview === "emails" ? "stats" : "emails";
    automation.dataset.automationview = automationState;

    //changes the button text
    const btnText =
      automationState === "emails"
        ? "show automation stats"
        : "view automation emails";
    btn.innerText = btnText;
  }
  /* */

  //sets the initial state
  /* if coming from the dashboard widget it will load the 
    automation-id from the url query params  
  */
  function setStateOnPageLoad() {
    console.log("ran");
    const urlParams = new URLSearchParams(window.location.search);
    const hasInitialState = urlParams.has("initial");
    if (!hasInitialState) {
      return;
    }
    const stateFromParam = urlParams.get("initial");
    activateState(stateFromParam);
  }
  window.addEventListener("load", setStateOnPageLoad());

  /* eventListeners and small cosmetic functions */
  //toggles the state between list and the active automation
  viewLinks.forEach(
    link => link.addEventListener("click", () => activateState(link))
    //TODO scroll to container top
  );

  //controls the state when go back button is clicked
  const back = widget.querySelectorAll(".back");
  back.forEach(
    back => back.addEventListener("click", () => activateState("list"))
    //TODO scroll to container top
  );

  //toggles the automation state
  const automationStateToggle = document.querySelectorAll(
    ".toggle-automation-view"
  );
  [...automationStateToggle].forEach(toggler =>
    toggler.addEventListener("click", () => activateAutomationState(toggler))
  );
  //gives the button initial text
  automations.forEach(automation => {
    const toggle = automation.querySelector(".toggle-automation-view");
    toggle.innerText =
      automation.getAttribute("data-automationView") === "emails"
        ? "show automation stats"
        : "view automation emails";
  });
  ///creates a staggering effect for automation-emails && automation-stats
  const innerAutomations = document.querySelectorAll(
    ".automation-emails, .automation-stats"
  );
  innerAutomations.forEach((innerAutomation, i) =>
    [...innerAutomation.querySelectorAll("li")].forEach((li, i) => {
      li.style.setProperty("--delay", i);
    })
  );
}

window.addEventListener("load", () => widgetInit());
