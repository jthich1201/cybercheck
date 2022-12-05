<div align="center">
<h2><img src="https://i.ibb.co/d0KJrwq/odlogonew-UP.png"><h2>
<img src="https://i.ibb.co/HXk217N/omnistruct-logopng.png" width="300">
<br>
</div>

<div align="">
<h1>Cyber Check
<img src="https://i.ibb.co/Qcjmth5/cc.png" height=80 align="right">
</h1>
<h3>Synopsis</h3>
This project involves the development of a mobile application to support the client’s security incident response process. The app we develop would help our client’s customers to recover more quickly from a security threat by allowing them to view and update a collaborative checklist, accessible to anyone relevant from their organization. Most importantly, it will have logging features that will allow the user to document their actions taken to resolve the issue. It would include a list of action items to test and update the system after recovery. Not only will this application help with incident response, but it will list steps to set up preventative measures in order to avoid the situation from occurring again. It will also make exporting easy if there is a need to share with third parties.
<h3>Testing</h3>
Front-end: During development, each team member was responsible for manually testing their work. Once a task was completed, the branch was rebased with the master branch and tested again to ensure the new changes and additions did not cause unwanted side-effects to previous code or introduce any new problems. After this was tested, the branch was merged into the master branch. Next semester we aim to test the front-end further utilizing a combination of JEST and the React Native Testing Library.

Backend: While we have set-up the backend server, the only active endpoints are for testing purposes for which we utilized POSTMAN to test. We will continue to work on the backend API next semester and will utilize JEST/SuperTest to create test cases for each endpoint we create.

<h3>Deployment</h3>
We will begin deployment next semester once we have developed an MVP. We will be hosting the database and backend on an AWS EC2 VM. We will need to conduct additional research to determine what we need to do in order to publish our application to the Google Play/iOS App Store.

<h3>Developer Instructions</h3>
Ensure Node.js and Expo CLI are installed. To run the application, navigate to the front-end's root directory (cybercheck/cyber-check) and run the following commands in the terminal:
``
npm i
`` 
followed by
``
npm start
``

Since we the backend is not linked and has no current interaction with the front-end, there is no need to run it. 
</div>

