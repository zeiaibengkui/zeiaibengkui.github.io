export function getElementIndex(element: HTMLElement): number {
    return Array.prototype.indexOf.call(element.parentNode?.children, element);
}
