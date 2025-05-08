import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    senderEmail: '',
    message: '',
    file: null,
  });
  const [fileName, setFileName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    setFileName(file ? file.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true);

    const data = new FormData();
    data.append('senderEmail', formData.senderEmail);
    data.append('message', formData.message);
    if (formData.file) data.append('file', formData.file);

    try {
      const response = await fetch('https://react-portfolio-blue.onrender.com/', {
        method: 'POST',
        body: data,
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (response.ok) {
          setSuccessMessage(result.message);
          setFormData({ senderEmail: '', message: '', file: null });
          setFileName('');
        } else {
          setErrorMessage(result.message);
        }
      } else {
        const text = await response.text();
        setErrorMessage(`Unexpected server response: ${text}`);
      }
    } catch (error) {
      setErrorMessage('Failed to send form. ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" encType="multipart/form-data">
      <h2>Send Email</h2>
      <input
        type="email"
        name="senderEmail"
        value={formData.senderEmail}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
      />
      <input type="file" name="file" onChange={handleFileChange} />
      {fileName && <p>Selected File: {fileName}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default ContactForm;
