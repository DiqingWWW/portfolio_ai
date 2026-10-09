import { tokenExport } from '../content';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(tokenExport, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="state-of-ai-design.tokens.json"',
    },
  });
}
