import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { GOOGLE_INTERNAL_TRAFFIC_TYPE, INTERNAL_USER_COOKIE } from '../src/lib/analytics.ts';

const component = readFileSync(
  new URL('../src/components/InternalTrafficScript.astro', import.meta.url),
  'utf8',
);
const script = component.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script);

type Options = {
  cookie?: string;
  search?: string;
  enabled?: boolean;
  existingGtag?: boolean;
  cookieStore?: boolean;
};

/** Run the actual inline head script before a simulated GTM bootstrap. */
function createPage(options: Options = {}) {
  let cookie = options.cookie ?? '';
  const writes: string[] = [];
  const commands: IArguments[] = [];
  const gtagCalls: unknown[][] = [];
  const focus: (() => void)[] = [];
  const changes: ((event: { changed: { name: string }[]; deleted: { name: string }[] }) => void)[] =
    [];
  const gtag = (...args: unknown[]) => gtagCalls.push(args);
  const window = {
    location: { search: options.search ?? '', protocol: 'https:' },
    dataLayer: commands,
    gtag: options.existingGtag ? gtag : undefined,
    addEventListener: (event: string, handler: () => void) => {
      assert.equal(event, 'focus');
      focus.push(handler);
    },
    cookieStore:
      options.cookieStore === false
        ? undefined
        : {
            addEventListener: (event: string, handler: (typeof changes)[number]) => {
              assert.equal(event, 'change');
              changes.push(handler);
            },
          },
  };
  const document = {
    get cookie() {
      return cookie;
    },
    set cookie(value: string) {
      writes.push(value);
      cookie = value.split(';')[0];
    },
  };
  runInNewContext(script!, {
    window,
    document,
    URLSearchParams,
    enabled: options.enabled ?? true,
    INTERNAL_USER_COOKIE,
    GOOGLE_INTERNAL_TRAFFIC_TYPE,
  });
  return {
    window,
    writes,
    commands,
    gtagCalls,
    gtag,
    readCookie: () => cookie,
    setCookie: (value: string) => {
      cookie = value;
    },
    focus: () => focus.forEach((handler) => handler()),
    change: (name = INTERNAL_USER_COOKIE, deleted = false) =>
      changes.forEach((handler) =>
        handler({
          changed: deleted ? [] : [{ name }],
          deleted: deleted ? [{ name }] : [],
        }),
      ),
  };
}

function parameter(command: IArguments): unknown {
  assert.equal(Object.prototype.toString.call(command), '[object Arguments]');
  assert.equal(command[0], 'set');
  assert.equal(command.length, 2);
  return command[1].traffic_type;
}

test('a marked browser queues the Google tag parameter before the GTM bootstrap', () => {
  const page = createPage({ cookie: `${INTERNAL_USER_COOKIE}=true` });
  assert.equal(parameter(page.commands[0]), 'internal');
  assert.equal(page.commands.length, 1);
  assert.deepEqual(page.writes, []);

  const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  assert.ok(
    layout.indexOf('<InternalTrafficScript ') <
      layout.indexOf('<!-- Google Tag Manager (via GTM Gateway) -->'),
  );
  assert.ok(layout.includes('<InternalTrafficScript enabled={enableAnalytics && !!gtmId} />'));
});

test('a URL flag sets the one-year cookie before sending the initial internal parameter', () => {
  const page = createPage({ search: '?source=staff&internal_user=true' });
  assert.equal(page.readCookie(), `${INTERNAL_USER_COOKIE}=true`);
  assert.match(page.writes[0], /Max-Age=31536000; Path=\/; SameSite=Lax; Secure$/);
  assert.equal(parameter(page.commands[0]), 'internal');
});

test('ordinary visitors and non-true URL values remain unmarked', () => {
  for (const search of ['', '?internal_user=false', '?internal_user=1', '?internal_user=']) {
    const page = createPage({ search });
    assert.equal(parameter(page.commands[0]), undefined);
    assert.deepEqual(page.writes, []);
  }
});

test('analytics-disabled pages still mark the browser without queuing Google commands', () => {
  const page = createPage({ search: '?internal_user=true', enabled: false });
  assert.equal(page.readCookie(), `${INTERNAL_USER_COOKIE}=true`);
  assert.equal(page.commands.length, 0);
  page.setCookie('');
  page.change(INTERNAL_USER_COOKIE, true);
  page.focus();
  assert.equal(page.commands.length, 0);
});

test('cookie changes set and clear the Google parameter without duplicate updates', () => {
  const page = createPage();
  page.setCookie(`${INTERNAL_USER_COOKIE}=true`);
  page.change();
  assert.equal(parameter(page.commands[1]), 'internal');
  page.focus();
  assert.equal(page.commands.length, 2);

  page.setCookie('');
  page.change(INTERNAL_USER_COOKIE, true);
  assert.equal(parameter(page.commands[2]), undefined);
  assert.equal(page.commands.length, 3);
});

test('focus refresh works without Cookie Store and does not reapply a deleted URL marker', () => {
  const page = createPage({ search: '?internal_user=true', cookieStore: false });
  page.setCookie('');
  page.focus();
  assert.equal(parameter(page.commands[1]), undefined);
  assert.equal(page.readCookie(), '');
  assert.equal(page.writes.length, 1);
});

test('unrelated cookie events do not change the Google parameter', () => {
  const page = createPage();
  page.setCookie(`${INTERNAL_USER_COOKIE}=true`);
  page.change('unrelated_cookie');
  assert.equal(page.commands.length, 1);
  page.focus();
  assert.equal(parameter(page.commands[1]), 'internal');
});

test('an existing gtag handler is reused without replacing it or loading another tag', () => {
  const page = createPage({ cookie: `${INTERNAL_USER_COOKIE}=true`, existingGtag: true });
  assert.equal(page.window.gtag, page.gtag);
  assert.equal(page.commands.length, 0);
  assert.equal(page.gtagCalls[0][0], 'set');
  assert.equal((page.gtagCalls[0][1] as { traffic_type: string }).traffic_type, 'internal');
  page.setCookie('');
  page.focus();
  assert.equal((page.gtagCalls[1][1] as { traffic_type: unknown }).traffic_type, undefined);
});
