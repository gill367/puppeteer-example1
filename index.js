const puppeteer = require('puppeteer');

async function convertHTMLToPDF(htmlContent, pdfPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set the page content to the HTML content
  await page.setContent(htmlContent);
  
  // Generate PDF from the HTML with headers and footers
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size: 10px; text-align: center;">Header</div>',
    footerTemplate: '<div style="font-size: 10px; text-align: center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    margin: {
      top: '100px',
      bottom: '50px',
      left: '20px',
      right: '20px'
    }
  });
  

  await browser.close();
  
  console.log(`PDF generated at: ${pdfPath}`);
}

const sampleHTMLContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Sample HTML</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
      </style>
    </head>
    <body>
      <h1>Sample Table Spanning Three Pages</h1>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
          </tr>
        </thead>
        <tbody>
          <!-- Create a large table to span three pages -->
          ${Array(500).fill('').map((_, index) => `
            <tr>
              <td>Row ${index + 1}, Column 1</td>
              <td>Row ${index + 1}, Column 2</td>
              <td>Row ${index + 1}, Column 3</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
  </html>
`;

convertHTMLToPDF(sampleHTMLContent, 'output.pdf');
