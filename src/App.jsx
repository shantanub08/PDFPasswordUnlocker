import { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, X, LockOpen, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { unlockPdf, downloadPdf } from './lib/pdfUtils';
import './App.css'; // Just for keeping imports, actual CSS is in index.css

function App() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' }); // idle, loading, success, error
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.name.toLowerCase().endsWith('.pdf')) {
        setFile(droppedFile);
        setStatus({ type: 'idle', message: '' });
        setPassword('');
      } else {
        setStatus({ type: 'error', message: 'Please upload a valid PDF file.' });
      }
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus({ type: 'idle', message: '' });
      setPassword('');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPassword('');
    setStatus({ type: 'idle', message: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!file || !password) return;

    setStatus({ type: 'loading', message: 'Decrypting PDF...' });

    const result = await unlockPdf(file, password);

    if (result.success) {
      setStatus({ type: 'success', message: 'PDF unlocked successfully! Downloading...' });
      downloadPdf(result.data, file.name);
      
      // Reset after a few seconds
      setTimeout(() => {
        handleRemoveFile();
      }, 3000);
    } else {
      setStatus({ type: 'error', message: result.error });
    }
  };

  return (
    <div className="app-container">
      <div className="header-section">
        <h1>PDF Unlocker</h1>
        <p>Securely remove passwords from your PDF files directly in your browser.</p>
      </div>

      <div className="glass-card">
        {!file ? (
          <div 
            className={`dropzone ${isDragging ? 'drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="dropzone-icon" />
            <div className="dropzone-text">Click or drag & drop a PDF here</div>
            <div className="dropzone-subtext">Maximum file size depends on your device's memory</div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="application/pdf" 
              style={{ display: 'none' }} 
            />
          </div>
        ) : (
          <div className="file-selected">
            <div className="file-info">
              <FileText className="file-icon" size={24} color="var(--accent-color)" />
              <span className="file-name">{file.name}</span>
              <button className="remove-btn" onClick={handleRemoveFile} title="Remove file">
                <X size={20} />
              </button>
            </div>

            <form className="password-form" onSubmit={handleUnlock}>
              <div className="input-group">
                <label htmlFor="password">PDF Password</label>
                <input
                  id="password"
                  type="password"
                  className="password-input"
                  placeholder="Enter the password to unlock"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={status.type === 'loading' || status.type === 'success'}
                  autoFocus
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={!password || status.type === 'loading' || status.type === 'success'}
              >
                {status.type === 'loading' ? (
                  <>
                    <Loader2 className="spinner" size={20} />
                    Decrypting...
                  </>
                ) : status.type === 'success' ? (
                  <>
                    <CheckCircle2 size={20} />
                    Unlocked
                  </>
                ) : (
                  <>
                    <LockOpen size={20} />
                    Unlock PDF
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {status.message && (status.type === 'error' || status.type === 'success') && (
          <div className={`message ${status.type}`}>
            {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
