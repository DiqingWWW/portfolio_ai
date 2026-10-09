import type { Metadata } from 'next';
import SystemPage from './SystemPage';
export const metadata: Metadata = {title:'Epple — Design System Study',description:'Evidence-backed study of Epple website foundations, components, motion and composition.',robots:{index:false,follow:false}};
export default function Page(){return <SystemPage/>;}
