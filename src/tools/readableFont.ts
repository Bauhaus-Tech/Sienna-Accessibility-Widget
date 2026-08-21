import { injectToolCSS } from "../utils/cssGenerator";
import IToolConfig from "../types/IToolConfig";
import { ALL_ELEMENT_SELECTORS, TEXT_SELECTORS } from "../enum/Selectors";
import { getWidgetAssetUrl } from "../utils/getWidgetAssetUrl";

export const readableFontConfig: IToolConfig = {
    id: "readable-font",
    selector: `html`,
    childrenSelector: [...ALL_ELEMENT_SELECTORS, ...TEXT_SELECTORS],
    styles: {
        'font-family': 'OpenDyslexic3,Comic Sans MS,Arial,Helvetica,sans-serif'
    },
    css: `@font-face {font-family: OpenDyslexic3;src: url("${getWidgetAssetUrl("fonts/OpenDyslexic3-Regular.woff")}") format("woff"), url("${getWidgetAssetUrl("fonts/OpenDyslexic3-Regular.ttf")}") format("truetype");}`
}

export default function readableFont(enable=false) {
    injectToolCSS({
        ...readableFontConfig,
        enable
    })
}
