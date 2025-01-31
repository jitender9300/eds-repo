export default async function decorate(block) {
  const directions = ["left", "right", "left", "right"];
  const listItems = block.querySelectorAll("li");
  listItems.forEach((li, index) => {
    const marquee = document.createElement("marquee");
    marquee.innerHTML = li.innerHTML;
    marquee.setAttribute("direction", directions[index % directions.length]);
    marquee.setAttribute("behavior", "alternate");
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("marquee-wrapper");
    wrapperDiv.appendChild(marquee);
    li.replaceWith(wrapperDiv);
  });
}
