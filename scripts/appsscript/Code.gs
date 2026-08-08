// Google Apps Script — connects the "GET A QUOTE" form to a Google Sheet.
//
// Setup:
//   1. Create a Google Sheet and add this header row to the first sheet:
//      Fullname | Company Name | Address | Contact Number |
//      TIN Number | Item Number | Brand / Model | Description | Quantity | Unit
//   2. In the Sheet: Extensions -> Apps Script, paste this file's contents.
//   3. Save, then Deploy -> New deployment -> Web app.
//      - Execute as: Me (your account)
//      - Who has access: Anyone
//      Deploy, then copy the "Web app URL".
//   4. Put that URL in the repo's .env.local:
//      GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
//
// Multiple items: a single submission can contain several quoted items. Each
// item is written as its own row (contact details repeated). After editing
// this file, re-deploy the web app — the URL stays the same.

const SHEET_ID = "YOUR_SPREADSHEET_ID"; // from the sheet URL: /spreadsheets/d/<ID>/edit
const SHEET_NAME = "Sheet1";

const CONTACT_KEYS = [
  "Fullname",
  "Company Name",
  "Address",
  "Contact Number",
  "TIN Number",
];
const ITEM_KEYS = [
  "Item Number",
  "Brand / Model",
  "Description",
  "Quantity",
  "Unit",
];

function doPost(e) {
  if (!e) {
    return failure("Missing parameters");
  }
  try {
    const p = parseParams(e);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const itemCount = Math.max(
      p.getAll("Item Number").length,
      p.getAll("Brand / Model").length,
      p.getAll("Description").length,
      p.getAll("Quantity").length,
      p.getAll("Unit").length,
      1
    );
    for (let i = 0; i < itemCount; i++) {
      const row = CONTACT_KEYS.map((key) => p.get(key) || "");
      ITEM_KEYS.forEach((key) => row.push(p.getAll(key)[i] || ""));
      sheet.appendRow(row);
    }
    return success("ok");
  } catch (err) {
    return failure(err.message);
  }
}

// Repeated keys (one set per quoted item) are lost by e.parameter, so parse
// the raw urlencoded body instead. Falls back to e.parameter if no body.
// URLSearchParams is not available in the Apps Script runtime, so parse
// manually. The order of pairs is preserved so getAll() returns items in the
// same order they were submitted.
function parseParams(e) {
  const params = {};
  if (e.postData && e.postData.contents) {
    e.postData.contents.split("&").forEach((pair) => {
      if (!pair) return;
      const idx = pair.indexOf("=");
      const key = decodeParam(pair.slice(0, idx === -1 ? pair.length : idx));
      const value = decodeParam(idx === -1 ? "" : pair.slice(idx + 1));
      (params[key] = params[key] || []).push(value);
    });
  } else if (e.parameter) {
    Object.keys(e.parameter).forEach((key) => {
      (params[key] = params[key] || []).push(e.parameter[key]);
    });
  }
  return {
    get: (key) => (params[key] && params[key].length ? params[key][0] : ""),
    getAll: (key) => params[key] || [],
  };
}

function decodeParam(s) {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch (err) {
    return s;
  }
}

function success(message) {
  return ContentService.createTextOutput(
    JSON.stringify({ result: "success", message: message || "" }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function failure(message) {
  return ContentService.createTextOutput(
    JSON.stringify({ result: "error", message: message || "unknown error" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
