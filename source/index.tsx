import { documentReady, render, createCell } from 'web-cell';
import { MapViz } from './page/MapViz';
import './style.css';

documentReady.then(() => render(<MapViz />));
