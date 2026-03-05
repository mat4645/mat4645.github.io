// assets/js/worker-csv.js

function normalizeNewlines(s) {
  return s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function decodeArrayBuffer(buf, encSel) {
  const enc = encSel === 'utf-8-bom' ? 'utf-8' : encSel;
  let text;
  try {
    text = new TextDecoder(enc, { fatal: false }).decode(buf);
  } catch (e) {
    text = new TextDecoder('utf-8', { fatal: false }).decode(buf);
  }
  if (text.startsWith('\uFEFF')) text = text.slice(1);
  // eslint-disable-next-line no-control-regex
  return text.replace(/\u0000/g, '');
}

function parseCSV(text, delimiterChar) {
  const delim = delimiterChar === 'tab' ? '\t' : delimiterChar;
  const s = normalizeNewlines(text);

  const rows = [];
  let i = 0,
    field = '',
    row = [],
    inQuotes = false;

  while (i < s.length) {
    const ch = s[i];

    if (inQuotes) {
      if (ch === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      } else {
        field += ch;
        i++;
        continue;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (ch === delim) {
        row.push(field);
        field = '';
        i++;
        continue;
      }
      if (ch === '\n') {
        row.push(field);
        rows.push(row);
        field = '';
        row = [];
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
  }
  row.push(field);
  rows.push(row);

  while (
    rows.length &&
    rows[rows.length - 1].length === 1 &&
    rows[rows.length - 1][0].trim() === ''
  ) {
    rows.pop();
  }
  return rows;
}

function safeKey(s, idx) {
  const t = (s ?? '').trim();
  if (!t) return `col${idx + 1}`;
  return t.replace(/\s+/g, '_').replace(/[^\w-]/g, '_');
}

function csvToJson(text, delimiter, hasHeader) {
  const rows = parseCSV(text, delimiter);
  if (!rows.length) return { json: [], headers: [], rowsCount: 0 };

  let headers = [];
  let start = 0;

  if (hasHeader) {
    headers = rows[0].map((h, i) => safeKey(h, i));
    start = 1;
  } else {
    const maxCols = Math.max(...rows.map((r) => r.length));
    headers = Array.from({ length: maxCols }, (_, i) => `col${i + 1}`);
  }

  const json = rows.slice(start).map((r) => {
    const o = {};
    for (let i = 0; i < headers.length; i++) {
      o[headers[i]] = r[i] ?? '';
    }
    return o;
  });

  return { json, headers, rowsCount: rows.length };
}

self.addEventListener('message', async (e) => {
  const { fileBuffer, textData, isTextMode, fileEncoding, delimiter, hasHeader } = e.data;
  try {
    let text = '';
    if (isTextMode) {
      text = textData;
    } else {
      text = decodeArrayBuffer(fileBuffer, fileEncoding);
    }

    const { json, headers, rowsCount } = csvToJson(text, delimiter, hasHeader);

    // Use JSON.stringify outside the main thread memory allocation for the big string if possible
    // Although returning raw JSON object to main thread takes structured clone overhead.
    // Typically it is faster to stringify in the worker to not block the main thread.
    const jsonText = JSON.stringify(json, null, 2);

    self.postMessage({ success: true, json, jsonText, headers, rowsCount });
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
});
