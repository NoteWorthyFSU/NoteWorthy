
import React from 'react';
import './noteworthy.css'

class MeetOurTeam extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (<div>
      <form action = 'http://localhost:3000/meetourteam' method = 'POST'>
      <html>
      <body>
      <div class="contact-form">
      <br></br>
      <br></br>
      <h1> <center><font size ="20" >Meet Our Team</font></center></h1>
      <br></br>
      <br></br>
      <br></br>

      <br></br>
        <div class="team">
          <div class="team_member">
          <div class="team_img">
        <img src={require('/Users/lexiewebel/Desktop/Group Project Repos/NoteWorthy/webapp/src/lexie.png')} />
      </div>
            <h3>Lexie Webel</h3>
            <p class="role">UI developer</p>
            <p>I am a Software Engineer earning a Computer Science degree in the accelerated Bachelors of Science and Masters (BS/MS) program at Florida State University, with a double minor in Math and Bio-Chemistry and an initial graduation date of May 2021. I am the President of Women in Computer Science (WiCS/ACM-W) at FSU. I am a hard worker passionate in all areas of technology, leadership, empowering others, and creating products that help change the world!</p>
          </div>
          <div class="team_member">
          <div class="team_img">
        <img src={require('/Users/lexiewebel/Desktop/Group Project Repos/NoteWorthy/webapp/src/daimeun.png')} />
      </div>
            <h3>Daimeun Praytor</h3>
            <p class="role">UI Developer</p>
            <p>I am a software engineer student currently studying for a Bachelor’s degree in Computer Science at Florida State University. I have a Minor in Mathematics and plan to graduate in the spring of 2021. I am interested in tracking trends in large datasets to better predict fluctuations in the stock market. In my spare time I play various video games, as well as play with my two Dobermans.</p>
            </div>
          <div class="team_member">
          <div class="team_img">
        <img src={require('/Users/lexiewebel/Desktop/Group Project Repos/NoteWorthy/webapp/src/orlando.png')} />
      </div>
            <h3>Orlando Kenny</h3>
            <p class="role">Backend developer</p>
            <p>I am currently a sophomore pursuing a Bachelor of Science in Computer Science degree at the Florida State University. My strong suits are my curiosity and my willingness to learn and delve into projects that may be overwhelming at first. I am passionate about being able to apply the knowledge that I have obtained to computer software!</p>
          </div>

          <div class="team_member">
          <div class="team_img">
        <img src={require('/Users/lexiewebel/Desktop/Group Project Repos/NoteWorthy/webapp/src/humbert.png')} />
      </div>
            <h3>Humbert Tores</h3>
            <p class="role">Backend developer</p>
            <p>I am a student studying Computer Science with a minor in Mathematics at Florida State University. I discovered my love for programming in High School when I started participating in local Hackathons including the 2014 Congressional STEM Competition FL-27 for which I was awarded the Overall District App Developer award. In my time in college, I have dipped my toes in as many branches of the Computer Science field as have been made available to me, as I find them all very interesting and applicable to my everyday work. I hope to one day have a role in developing software that positively impacts society. I currently work as a computer support technician for FSU’s Office of Enrollment Management.</p>
          </div>
          <div class="team_member">
          <div class="team_img">
        <img src={require('/Users/lexiewebel/Desktop/Group Project Repos/NoteWorthy/webapp/src/tyler.png')} />
      </div>
            <h3>Tyler Gurly</h3>
            <p class="role">Notes Developer</p>
            <p>I am a senior studying Computer Science at Florida State University. I will be graduating on May 1st, 2020. I had my first 'real-world' technology based job at J&J Management in Summer 2019 as an IT Intern. I enjoy problem solving and taking challenges head on! I fell in love with technology at a young age through gaming.</p>
          </div>
          <div class="team_member">
          <div class="team_img">
        <img src={require('/Users/lexiewebel/Desktop/Group Project Repos/NoteWorthy/webapp/src/dav.png')} />
      </div>
            <h3>Dave Mendelsohn</h3>
            <p class="role">Notes Developer</p>
            <p>I'm a computer science student. I like code, I like the Grateful Dead, and I like you for visitiing our site.</p>
          </div>
        </div>
        </div>
      </body>
      </html>
      </form>
      </div>);
    }
  }
  export default MeetOurTeam
