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

const SHEET_ID = "YOUR_SPREADSHEET_ID"; // from the sheet URL: /spreadsheets/d/<ID>/edit
const SHEET_NAME = "Sheet1";

function doPost(e) {
  if (!e || !e.parameter) {
    return failure("Missing parameters");
  }
  const p = e.parameter;
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    sheet.appendRow([
      p["Fullname"] || "",
      p["Company Name"] || "",
      p["Address"] || "",
      p["Contact Number"] || "",
      p["TIN Number"] || "",
      p["Item Number"] || "",
      p["Brand / Model"] || "",
      p["Description"] || "",
      p["Quantity"] || "",
      p["Unit"] || "",
    ]);
    return success("ok");
  } catch (err) {
    return failure(err.message);
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
