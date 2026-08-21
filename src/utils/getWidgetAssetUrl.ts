/**
 * Resolves a packaged widget asset from the script that loaded the widget.
 *
 * An explicit data-asw-asset-base-url attribute supports integrations that
 * inject the bundle inline instead of loading it from a script URL.
 *
 * @param assetPath Path relative to the widget asset directory.
 * @returns A URL for the packaged asset, or the relative path as a fallback.
 */
export function getWidgetAssetUrl(assetPath: string): string {
    if (typeof document === "undefined") {
        return assetPath;
    }

    const script = findWidgetScript();
    const assetBaseUrl = script?.getAttribute("data-asw-asset-base-url");

    if (assetBaseUrl) {
        return new URL(assetPath, assetBaseUrl).toString();
    }

    if (script?.src) {
        return new URL(assetPath, script.src).toString();
    }

    return assetPath;
}

/**
 * Finds the current widget script or a script with the asset-base override.
 *
 * @returns The script element responsible for resolving packaged assets.
 */
function findWidgetScript(): HTMLScriptElement | null {
    if (document.currentScript instanceof HTMLScriptElement) {
        return document.currentScript;
    }

    return document.querySelector<HTMLScriptElement>(
        "script[data-asw-asset-base-url], script[src*='sienna-accessibility']"
    );
}
