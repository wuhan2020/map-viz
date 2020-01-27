import { documentReady, render, createCell } from 'web-cell';
import { MapViz } from "./page/MapViz";

documentReady.then(() => render(<MapViz />));
