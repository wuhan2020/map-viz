import { observer } from 'mobx-web-cell';
import { component, mixin, createCell } from 'web-cell';

interface MapVizState {
    data?: any;
    filterFunc?: () => void;
}

@observer
@component({
    tagName: 'map-viz',
    renderTarget: 'children'
})
export class MapViz extends mixin<{}, MapVizState>() {
    public render(_, input: MapVizState) {
        return <h1>Hello World!!</h1>
    } 
}