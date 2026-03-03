// assets/js/worker-json.js

function normalizeDelim(v) {
  return v === 'tab' ? '\t' : v;
}

function isPlainObject(x) {
  return x && typeof x === 'object' && !Array.isArray(x);
}

function flattenObject(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (isPlainObject(v)) {
      flattenObject(v, key, out);
    } else if (Array.isArray(v)) {
      out[key] = JSON.stringify(v);
    } else {
      out[key] = v;
    }
  }
  return out;
}

function jsonToRows(inputText, doFlatten) {
  const raw = JSON.parse(inputText);
  let arr;
  if (Array.isArray(raw)) {
    arr = raw;
  } else if (isPlainObject(raw)) {
    arr = [raw];
  } else {
    arr = [{ value: raw }];
  }
  const rows = arr.map((x) => {
    if (isPlainObject(x)) return doFlatten ? flattenObject(x) : x;
    return { value: Array.isArray(x) ? JSON.stringify(x) : x };
  });
  return rows;
}

function collectHeaders(rows) {
  const set = new Set();
  for (const r of rows) {
    for (const k of Object.keys(r)) set.add(k);
  }
  return Array.from(set);
}

function csvEscape(value, delimChar) {
  const s = value === null || value === undefined ? '' : String(value);
  const needs = s.includes('"') || s.includes('\n') || s.includes('\r') || s.includes(delimChar);
  if (!needs) return s;
  return '"' + s.replace(/"/g, '""') + '"';
}

function buildCsv(rows, delimChar, includeHeader) {
  const headers = collectHeaders(rows);
  const lines = [];
  if (includeHeader) {
    lines.push(headers.map((h) => csvEscape(h, delimChar)).join(delimChar));
  }
  for (const r of rows) {
    const line = headers.map((h) => csvEscape(r[h], delimChar)).join(delimChar);
    lines.push(line);
  }
  return { csv: lines.join('\n'), headers, count: rows.length };
}

self.addEventListener('message', async (e) => {
  const { text, delimiter, includeHeader, doFlatten } = e.data;
  try {
    const delimChar = normalizeDelim(delimiter);
    const rows = jsonToRows(text, doFlatten);
    const { csv, headers, count } = buildCsv(rows, delimChar, includeHeader);

    self.postMessage({ success: true, csv, headers, count });
  } catch (err) {
    self.postMessage({ success: false, error: err.message, syntaxError: true });
  }
});
