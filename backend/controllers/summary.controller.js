const fs = require('fs');
const { processPDFAndGenerateSummary } = require('../utils/summaryHelper.js');

const summaryController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const result = await processPDFAndGenerateSummary(pdfBuffer);

    fs.unlinkSync(req.file.path); // Cleanup

    res.json({
      success: true,
      summary: result.summary,
      fileInfo: result.fileInfo,
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  summaryController,
};
