$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$outputDirectory = Join-Path $PSScriptRoot "..\public\downloads"
$outputFile = Join-Path $outputDirectory "zeds-quotation-request-template.xlsx"

New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
Remove-Item -LiteralPath $outputFile -Force -ErrorAction SilentlyContinue

function Add-Entry {
  param(
    [System.IO.Compression.ZipArchive]$Archive,
    [string]$Path,
    [string]$Content
  )

  $entry = $Archive.CreateEntry($Path)
  $writer = [System.IO.StreamWriter]::new(
    $entry.Open(),
    [System.Text.UTF8Encoding]::new($false)
  )
  try {
    $writer.Write($Content)
  } finally {
    $writer.Dispose()
  }
}

function Cell {
  param([string]$Reference, [string]$Value)
  $safeValue = [System.Security.SecurityElement]::Escape($Value)
  return '<c r="{0}" t="inlineStr"><is><t>{1}</t></is></c>' -f $Reference, $safeValue
}

$rows = [System.Collections.Generic.List[string]]::new()
$headers = @("Fullname", "Company Name", "Address", "Contact Number", "Tin Number", "Item Number", "Brand / Model", "Description", "Quantity", "Unit")
$headerCells = for ($index = 0; $index -lt $headers.Count; $index++) {
  $column = [char]([int][char]'A' + $index)
  Cell ('{0}1' -f $column) $headers[$index]
}
$rows.Add(('<row r="1">{0}</row>' -f ($headerCells -join '')))

for ($rowNumber = 2; $rowNumber -le 21; $rowNumber++) {
  $cells = for ($columnNumber = 0; $columnNumber -lt 10; $columnNumber++) {
    $column = [char]([int][char]'A' + $columnNumber)
    '<c r="{0}{1}"/>' -f $column, $rowNumber
  }
  $rows.Add(('<row r="{0}">{1}</row>' -f $rowNumber, ($cells -join '')))
}

$worksheet = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:J21"/>
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols><col min="1" max="1" width="24" customWidth="1"/><col min="2" max="2" width="28" customWidth="1"/><col min="3" max="3" width="40" customWidth="1"/><col min="4" max="4" width="18" customWidth="1"/><col min="5" max="5" width="20" customWidth="1"/><col min="6" max="6" width="16" customWidth="1"/><col min="7" max="7" width="24" customWidth="1"/><col min="8" max="8" width="38" customWidth="1"/><col min="9" max="9" width="13" customWidth="1"/><col min="10" max="10" width="13" customWidth="1"/></cols>
  <sheetData>$($rows -join [Environment]::NewLine)</sheetData>
  <autoFilter ref="A1:J21"/>
</worksheet>
"@

$archive = [System.IO.Compression.ZipFile]::Open(
  $outputFile,
  [System.IO.Compression.ZipArchiveMode]::Create
)
try {
  Add-Entry $archive "[Content_Types].xml" @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>
"@
  Add-Entry $archive "_rels/.rels" @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>
"@
  Add-Entry $archive "xl/workbook.xml" @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Quotation Request" sheetId="1" r:id="rId1"/></sheets></workbook>
"@
  Add-Entry $archive "xl/_rels/workbook.xml.rels" @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>
"@
  Add-Entry $archive "xl/worksheets/sheet1.xml" $worksheet
} finally {
  $archive.Dispose()
}

Write-Host "Created $outputFile"
