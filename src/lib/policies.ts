/**
 * Shared policy documents. Markdown lives in src/content/policies/ and is rendered at build time
 * with {{token}} substitution so one source serves every page that shows it.
 *
 * Tokens not supplied by the caller fall back to DEFAULT_TOKENS, so a document rendered on the
 * global site (no course context) still reads correctly.
 */
import { marked } from 'marked';
import { readFileSync } from 'fs';
import { join } from 'path';

export const DEFAULT_TOKENS: Record<string, string> = {
  legalName: 'Road Ready Driver Instruction LLC',
  dba: 'Road Ready Safety',
  supportEmail: 'info@roadreadysafety.com',
  refundsEmail: 'refunds@roadreadysafety.com',
  supportPhone: '(888) 885-5707',
  courseName: 'the course',
  stateName: 'your state',
  agency: 'the state agency that approved the course',
  today: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
};

export function renderPolicy(file: string, tokens: Record<string, string> = {}): string {
  const raw = readFileSync(join(process.cwd(), 'src/content/policies', file), 'utf-8');
  const all = { ...DEFAULT_TOKENS, ...tokens };
  const substituted = raw.replace(/\{\{(\w+)\}\}/g, (_, key: string) => (key in all ? all[key] : `{{${key}}}`));
  return marked(substituted) as string;
}
