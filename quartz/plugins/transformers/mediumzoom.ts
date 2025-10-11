import { JSResource } from "../../util/resources";
import { QuartzTransformerPlugin } from "../types";
// @ts-ignore
import mediumzoom from "../../components/scripts/mediumzoom.inline";

export const MediumZoom: QuartzTransformerPlugin = () => {
    return {
        name: "MediumZoom",
        externalResources() {
            const js: JSResource[] = []
                
            js.push({
                script: mediumzoom,
                loadTime: "afterDOMReady",
                contentType: "inline"
            })
            
            return { js }
        }
    }
}