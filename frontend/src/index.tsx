import App from './App';
import { createRoot } from 'react-dom/client';

const domNode= document.getElementById('root') as HTMLElement ;
const root = createRoot(domNode)

root.render(<App/>)

