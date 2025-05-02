import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <h2>About Me</h2>
      <p><strong>Name:</strong> Bala Siri Vennela</p>
      <p><strong>Education:</strong></p>
      <ul>
        <li>Completed schooling at Vikas The Concept School</li>
        <li>Completed intermediate at Deeksha Junior College</li>
        <li>Currently studying at Christ University, Kengeri</li>
        <li>Completed 4th semester of B.Tech</li>
        <li>Pursuing Computer Science and Engineering (CSE) with Honours in Cyber Security</li>
      </ul>
      <p><strong>Programming Languages:</strong></p>
      <ul>
        <li>C,Java,Python,HTML,CSS,JavaScript</li>
      </ul>
      <p><strong>Hobbies:</strong></p>
      <ul>
        <li>Reading,Painting</li>
      </ul>
    </div>
  );
};

export default About;
