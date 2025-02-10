/**
 * @param {{ querySelectorAll: (arg0: string) => Iterable<any> | ArrayLike<any>; }} node
 */
export function trapFocus(node) {
    if (!node) return; // Guard clause

    function focusable() {
        return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    }

    $effect(() => {
        focusable()[0]?.focus();
    });
}