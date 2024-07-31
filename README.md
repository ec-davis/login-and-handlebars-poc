# Login and Handlebars POC
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
## <a name="Description"></a>Description
Example implementation of 
- basic authentication with session storage
- hashed password storage with bcrypt
- a from-scratch implementation of Handlebars
- [deployment to Render](https://login-and-handlebars-poc.onrender.com/) with a Postgres DB



Repo [on GitHub](https://github.com/crestonesoftware/login-and-handlebars-poc)



## <a name="Table of Contents"></a>Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Credits](#Credits)
- [Testing](#Testing)
- [Questions](#Questions)
- [License](#License)

## <a name="Installation"></a>Installation
N/A; the application is deployed to Render
## <a name="Usage"></a>Usage
See testing instructions
## <a name="Credits"></a>Credits
I followed the example of the login and Handlebars implementations in my team project 2. I did not copy-and-paste the code; I hand-wrote it because my goal was to understand it.
## <a name="Testing"></a>Testing
*Positive Testing*
- Click Login and Sign up with a valid email address and a password at least 8 characters in length
- Note that "Log in" is replaced with "Log out"
- Logout and note that "Log out" is replaced with "Log in"
- While logged out, click the Dashboard and confirm that you arrive at the Login page

*Negative testing*

- Sign up, logout and sign up again with the same email address
- Sign up with a password less than 8 characters in length
- Sign up with an invalid email address
## <a name="Questions"></a>Questions
Find this and other projects on GitHub: <a href="https://github.com/crestonesoftware">crestonesoftware</a>

Got questions? Contact me: <a href="mailto:elliott.davis@crestonetech.com">elliott.davis@crestonetech.com</a>
## <a name="License"></a>License
This project is licensed under the Mozilla Public License 2.0 license. For license details, click on the license badge below the title of this file.
