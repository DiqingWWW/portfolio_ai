import { cssExport } from '../content';

export const dynamic = 'force-static';

export function GET() {
  return new Response(cssExport, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Content-Disposition': 'attachment; filename="state-of-ai-design.tokens.css"',
    },
  });
}
