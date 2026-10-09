import type { Metadata } from 'next';
import SystemPage from './SystemPage';

export const metadata: Metadata = {
  title: 'State of AI Design — Design System Study',
  description:
    'An evidence-backed bilingual design-system study of stateofaidesign.com.',
};

export default function Page() {
  return <SystemPage />;
}
