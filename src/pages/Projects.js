import React from 'react';
import projectImg from '../assets/project-image.webp'; // Replace with your own image
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects">
      <h2>My Projects</h2>
      <div className="project-grid">
        <div className="project-card">
          <img src={projectImg} alt="Project" />
          <h3>Portfolio</h3>
          <p>A simple portfolio created using HTML,CSS & JS integrated with VS code.</p>
          <div className="project-links">
            <a href="https://portfolio-git-main-siri-vennelas-projects.vercel.app/" target="_blank" rel="noopener noreferrer">
              Live Project
            </a>
            <a href="https://github.com/Sirivennela6/Portfolio" target="_blank" rel="noopener noreferrer">
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
