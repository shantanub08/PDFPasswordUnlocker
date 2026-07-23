import { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, X, LockOpen, Loader2, CheckCircle2, AlertCircle, ShieldCheck, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { unlockPdf, downloadPdf } from './lib/pdfUtils';
import logoSvg from './assets/Logo.svg';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        setShowPassword(false);
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
      setShowPassword(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPassword('');
    setShowPassword(false);
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
      setStatus({ type: 'success', message: 'PDF unlocked successfully! File downloaded.' });
      downloadPdf(result.data, file.name);
    } else {
      setStatus({ type: 'error', message: result.error });
    }
  };

  const handleKeyDownDropzone = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="app-container">
      <div className="header-section">
        <div className="header-title-container">
          <img src={logoSvg} alt="PDF Password Unlocker Logo" className="header-logo" />
          <h1>PDF Password Unlocker</h1>
        </div>
        <p>Securely remove passwords from your PDF files directly in your browser.</p>
        <div className="privacy-badge">
          <ShieldCheck size={16} className="privacy-badge-icon" />
          <span>100% Local Wasm Decryption • Files Never Leave Your Browser</span>
        </div>
      </div>

      <div className="glass-card">
        {!file ? (
          <div 
            className={`dropzone ${isDragging ? 'drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={handleKeyDownDropzone}
            tabIndex={0}
            role="button"
            aria-label="Upload PDF file"
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
              <button className="remove-btn" onClick={handleRemoveFile} title="Remove file" aria-label="Remove file">
                <X size={20} />
              </button>
            </div>

            <form className="password-form" onSubmit={handleUnlock}>
              <div className="input-group">
                <label htmlFor="password">PDF Password</label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="password-input"
                    placeholder="Enter the password to unlock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={status.type === 'loading' || status.type === 'success'}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={status.type === 'loading' || status.type === 'success'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {status.type !== 'success' ? (
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={!password || status.type === 'loading'}
                >
                  {status.type === 'loading' ? (
                    <>
                      <Loader2 className="spinner" size={20} />
                      Decrypting...
                    </>
                  ) : (
                    <>
                      <LockOpen size={20} />
                      Unlock PDF
                    </>
                  )}
                </button>
              ) : (
                <button 
                  type="button" 
                  className="reset-btn"
                  onClick={handleRemoveFile}
                >
                  <RefreshCw size={18} />
                  Unlock Another PDF
                </button>
              )}
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
