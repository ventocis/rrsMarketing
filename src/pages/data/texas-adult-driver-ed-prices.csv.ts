/**
 * /data/texas-adult-driver-ed-prices.csv — the /adult-drivers-ed/texas/cost table as CSV, built from the same
 * module as the page (src/data/ade-prices.ts), so the download can never disagree with the table.
 * Each monthly refresh also freezes a copy as public/data/texas-adult-driver-ed-prices-YYYY-MM.csv.
 */
import type { APIRoute } from 'astro';
import { toCsv } from '../../data/ade-prices';

export const GET: APIRoute = () =>
  new Response(toCsv(), { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
