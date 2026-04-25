export async function unlockPdf(file, password) {
  return new Promise(async (resolve) => {
    try {
      const fileBytes = await file.arrayBuffer();

      // Ensure QPDF is available
      if (!window.QPDF) {
        return resolve({ success: false, error: 'QPDF library is not loaded.' });
      }

      window.QPDF.path = '/qpdf/'; // Point to the public folder where qpdf-worker.js lives

      let qpdfLogs = [];

      window.QPDF({
        logger: function (text) {
          console.log('QPDF:', text);
          qpdfLogs.push(text);
        },
        ready: function (qpdf) {
          try {
            // Save input file to virtual filesystem
            qpdf.save('input.pdf', fileBytes);
            
            // Run decrypt command
            // We use the same argument structure as the .bat file
            const args = ['--password=' + password, '--decrypt', 'input.pdf', 'output.pdf'];
            qpdfLogs.push('Executing with args: ' + args.join(' '));

            qpdf.execute(args, function(err) {
              if (err) {
                const logsStr = qpdfLogs.join('\n');
                if (logsStr.toLowerCase().includes('invalid password')) {
                  return resolve({ success: false, error: 'Incorrect password' });
                }
                // Provide the full context if it failed
                let detailedError = err.message;
                if (detailedError === 'Command failed') {
                   // extract last few logs to give context
                   const relevantLogs = qpdfLogs.filter(l => l.includes('stderr') || l.toLowerCase().includes('error') || l.includes('WARNING'));
                   if (relevantLogs.length > 0) {
                     detailedError += ': ' + relevantLogs[relevantLogs.length - 1];
                   }
                }
                return resolve({ success: false, error: detailedError });
              }
              
              // Load decrypted output file from virtual filesystem
              qpdf.load('output.pdf', function (loadErr, unlockedBytes) {
                if (loadErr) {
                  return resolve({ success: false, error: loadErr.message || 'Failed to load output PDF.' });
                }
                
                return resolve({ success: true, data: unlockedBytes });
              });
            });
          } catch (e) {
            resolve({ success: false, error: e.message || 'An error occurred while processing.' });
          }
        }
      });
    } catch (error) {
      resolve({ success: false, error: error.message || 'Failed to decrypt PDF' });
    }
  });
}

export function downloadPdf(bytes, originalName) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  
  // Create unlocked filename
  const fileNameWithoutExt = originalName.replace(/\.pdf$/i, '');
  link.download = `${fileNameWithoutExt}_unlocked.pdf`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
