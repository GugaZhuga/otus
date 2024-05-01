function getPath(htmlElement) {
    if (htmlElement.tagName === "HTML")
        return "HTML";
    let cssSelector = "";
    cssSelector += htmlElement.tagName;
    for (let classItem of htmlElement.classList) {
        cssSelector += `.${classItem}`;
    }
    let id = htmlElement.getAttribute("id");
    if (id) {
        cssSelector += `#${id}`;
    }
    let parentHtmlElement = htmlElement.parentNode;
    if (parentHtmlElement) {
        let parentCssSelector = getPath(parentHtmlElement);
        if (parentCssSelector) {
            cssSelector = `${parentCssSelector}>${cssSelector}`;
        }
    }
    return cssSelector;
}
document.querySelectorAll(getPath($0));
