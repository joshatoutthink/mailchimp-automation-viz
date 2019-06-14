const getDelta = (elOne, elTwo) => {
  return {
    deltaX: elOne.left - elTwo.left,
    deltaY: elOne.top - elTwo.top,
    deltaW: elOne.width / elTwo.width,
    deltaH: elOne.height / elTwo.height,
  };
};
/**
 *
 * @param {String} el class name of the element that will animate
 * @param {Function} stateChange the function which causes the elements to change size
 * @param {Number}  timing animation time in seconds: optional
 * @param {Boolean} scale wheather to animate scale: optional
 * @param {Boolean} translate wheather to animate translate: optional
 */
function flip({
  el,
  stateChange,
  timing = 0.3,
  scale = true,
  translate = true,
}) {
  //records the size and positon
  const firstBoxes = [...document.querySelectorAll(el)];
  const firstRects = firstBoxes.map(box => {
    const isScale = box.classList.contains("no-scale") ? false : true;
    const bg1 = box;
    if (bg1 === null) return;
    const firstRect = bg1.getBoundingClientRect();
    return { rect: firstRect, key: bg1.dataset.key, isScale };
  });
  console.log(firstRects);

  //changes the state causing layout change
  stateChange();

  requestAnimationFrame(() => {
    firstRects.forEach(({ rect, key, isScale }) => {
      const [firstRect, firstKey] = [rect, key];
      const secondBox = document.querySelector(`[data-key="${firstKey}"]`);
      //records the second size and position
      //L.ast
      const secondRect = secondBox.getBoundingClientRect();

      //I.nvert
      const { deltaX, deltaY, deltaW, deltaH } = getDelta(
        firstRect,
        secondRect
      );
      //sets second box as the firt box size and posistion
      secondBox.style.transition = "none";
      secondBox.style.transformOrigin = "center top";
      secondBox.style.transform = `
      ${translate ? `translate(${deltaX}px, ${deltaY}px)` : ""} 
      ${isScale ? `scale(${deltaW}, ${0})` : ""}
      `;

      //P.lay
      requestAnimationFrame(() => {
        secondBox.style.transition = `transform ${timing}s ease`;
        secondBox.style.transform = `none`;
      });
    });
  });
}
export default flip;
