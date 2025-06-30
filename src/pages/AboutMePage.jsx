const AboutMePage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About this project</h1>
        <p>
          This website was developed as the final project for the{" "}
          <strong>Advanced Front-End Development</strong> course at{" "}
          <strong>Hack Academy</strong>. Its purpose is to provide a platform
          for managing a digital movie store, allowing users to browse featured
          movies, view detailed information, and purchase titles easily.
        </p>

        <h2>Technologies used</h2>
        <ul>
          <li>
            <strong>React</strong> – Main library for building the user
            interface.
          </li>
          <li>
            <strong>JavaScript</strong>, <strong>HTML</strong>, and{" "}
            <strong>CSS</strong> – Core web development languages.
          </li>
          <li>
            <strong>Redux</strong> – For global state management.
          </li>
          <li>
            <strong>Axios</strong> – For handling HTTP requests.
          </li>
          <li>
            <strong>The Movie Database (TMDb) API</strong> – Used to fetch movie
            data.
          </li>
          <li>
            <strong>Git</strong> – Version control tool used throughout the
            development process.
          </li>
        </ul>

        <h2>About the developer</h2>
        <img src="public/images/IMG_0274.jpeg" alt="Diego Andreu"></img> 
        <p>
          My name is <strong>Diego Andreu</strong>, I am a{" "}
          <strong>student of Information Technology Analysis</strong> and a
          passionate <strong>web developer</strong> with a strong interest in
          building user-oriented digital experiences. This project represents a
          synthesis of the knowledge acquired throughout the course, combining
          practical implementation of modern technologies with a focus on clean
          design and responsive interaction.
        </p>
        <p>
          It was an opportunity to put into practice concepts such as
          component-based architecture, state management using Redux, and API
          integration with Axios. The goal was not only to create a functional
          application, but also to deliver an intuitive and accessible interface
          that enhances the user experience.
        </p>
        <p>
          I see this project as a solid step forward in my journey as a
          developer, and I’m committed to continuing my growth in the field by
          exploring new tools, refining my skills, and taking on more complex
          challenges.
        </p>
      </div>
    </div>
  );
};

export default AboutMePage;
