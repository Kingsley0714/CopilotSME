// =====================================================
// AXION FINTECH — Google Apps Script File Upload Handler
// =====================================================
// This script receives file uploads from the website
// and saves them to your Google Drive folder.
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com
// 2. Click "New Project"
// 3. Delete the default code and paste this entire script
// 4. Replace FOLDER_ID below with your Google Drive folder ID
// 5. Click Deploy → New Deployment
// 6. Select Type: "Web app"
// 7. Set "Execute as": Me
// 8. Set "Who has access": Anyone
// 9. Click Deploy → Copy the Web App URL
// 10. Paste that URL into index.html where it says YOUR_APPS_SCRIPT_URL
// =====================================================

// Your Google Drive folder ID — from the URL:
// https://drive.google.com/drive/folders/1_JTDLo-95PlrXvy4iv0PsDzjRItIKHWg
const FOLDER_ID = '1_JTDLo-95PlrXvy4iv0PsDzjRItIKHWg';

// Optional: Email notification when files are uploaded
const NOTIFY_EMAIL = 'inquiry@axionfintech.com.my';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const fileName = data.fileName;
    const fileData = data.fileData; // Base64 encoded
    const mimeType = data.mimeType;
    const category = data.category || 'Uncategorized';
    const companyName = data.companyName || 'Unknown Company';

    // Get the main folder
    const mainFolder = DriveApp.getFolderById(FOLDER_ID);

    // Create or get company subfolder
    let companyFolder;
    const companyFolders = mainFolder.getFoldersByName(companyName);
    if (companyFolders.hasNext()) {
      companyFolder = companyFolders.next();
    } else {
      companyFolder = mainFolder.createFolder(companyName);
    }

    // Create or get category subfolder inside company folder
    let categoryFolder;
    const categoryFolders = companyFolder.getFoldersByName(category);
    if (categoryFolders.hasNext()) {
      categoryFolder = categoryFolders.next();
    } else {
      categoryFolder = companyFolder.createFolder(category);
    }

    // Decode base64 and create the file
    const blob = Utilities.newBlob(
      Utilities.base64Decode(fileData),
      mimeType,
      fileName
    );
    const file = categoryFolder.createFile(blob);

    // Optional: Send email notification
    if (NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject: `[Axion] New Document Upload — ${companyName}`,
          htmlBody: `
            <h2>New Document Uploaded</h2>
            <table style="border-collapse:collapse;">
              <tr><td style="padding:4px 12px;font-weight:bold;">Company:</td><td style="padding:4px 12px;">${companyName}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Category:</td><td style="padding:4px 12px;">${category}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">File:</td><td style="padding:4px 12px;">${fileName}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Size:</td><td style="padding:4px 12px;">${(fileData.length * 0.75 / 1024 / 1024).toFixed(2)} MB</td></tr>
            </table>
            <p><a href="${file.getUrl()}">View File in Google Drive</a></p>
          `
        });
      } catch (emailErr) {
        // Email failed but file upload succeeded — don't fail the whole thing
        Logger.log('Email notification failed: ' + emailErr);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        fileId: file.getId(),
        fileUrl: file.getUrl(),
        message: 'File uploaded successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for CORS preflight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Axion Fintech Upload API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
