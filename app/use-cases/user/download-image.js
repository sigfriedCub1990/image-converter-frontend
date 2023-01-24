const { writeFile } = require("node:fs/promises");
const { Buffer } = require("node:buffer");
const { downloadFile } = require("../aws");

function makeDownloadImage() {
  return async ({ uuid }) => {
    // Download file from S3
    const file = await downloadFile({ uuid });
    // Transform response body into a Buffer
    const buffer = new Buffer.from(await file.Body.transformToByteArray());
    // Write Buffer to temporal location
    const fileName = `/tmp/${uuid}`;
    await writeFile(fileName, buffer);

    return fileName;
  };
}

module.exports = makeDownloadImage;
