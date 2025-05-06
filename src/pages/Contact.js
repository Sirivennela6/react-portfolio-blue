import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_2jc8lxs',  
        'template_2uao04k',
        form.current,
        'HZEzHP67StbBfOVRn'
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
        },
        (error) => {
          alert('Failed to send message.');
        }
      );

    e.target.reset();
  };

  return (
    <div className="contact-page">
      <h2>Contact Me</h2>
      <div className="contact-container">
        {/* Left Side - Contact Info */}
        <div className="contact-info">
          <p>You can reach me through the following ways:</p>
          <ul>
            <li>
              📧 Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bala.siri@btech.christuniversity.in" target="_blank" rel="noopener noreferrer">bala.siri@btech.christuniversity.in</a>
            </li>
            <li>
              📱 Phone: <a href="tel:+917386477696">+91 7386477696</a>
            </li>
          </ul>
        </div>

        {/* Right Side - Email Form */}
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <label>Name</label>
          <input type="text" name="user_name" required />

          <label>Email</label>
          <input type="email" name="user_email" required />

          <label>Message</label>
          <textarea name="message" rows="4" required />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
