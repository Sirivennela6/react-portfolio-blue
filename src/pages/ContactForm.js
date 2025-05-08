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
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: data,
    });

    const contentType = response.headers.get('content-type');
    const result = contentType && contentType.includes('application/json')
      ? await response.json()
      : { message: 'Unexpected server error' };

    if (response.ok) {
      setSuccessMessage(result.message);
      setFormData({ senderEmail: '', message: '', file: null });
      setFileName('');
    } else {
      setErrorMessage(result.message || 'Something went wrong.');
    }
  } catch (error) {
    setErrorMessage('Failed to send form. ' + error.message);
  } finally {
    setIsLoading(false);
  }
};
