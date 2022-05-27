# 2800-202210-DTC06 - UCAN

<!-- ABOUT THE PROJECT -->
## About The Project

Our team, UCAN, is developing a web
application to help Ukrainian refugees who
have arrived into Canada to adapt their new
life in the country by providing a platform that
connects people who are willing to offer help
and Ukrainian refugees who would appreciate
support from others.

Here's why you want to check this out:
* You should be able to find a housing!
* You just should
* You :smile:


Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#top">back to top</a>)</p>


# To get started

In order to get started, you need to clone our repository:

```
git clone https://github.com/vasshorin/2800-202210-DTC06.git
```
Run the following command to install all the dependencies:

``` 
cd 2800-202210-DTC06
npm install
```

and then run the following command to start the server:

```
node start server.js
```
or run the following command to start the server in production mode:

```
nodemon server.js
```

If you would like to use our application but connect to your own database, in the `server.js` file, you can change the `mongoose.connect` on line 88 and `app.use(sessions{uri:})` on line 100 line to your own database url.

# Built With

* HTML
* CSS
* JavaScript
* NodeJS
* ExpressJS
* MongoDB
* Mongoose


# Needed Tools

* Any text editor or IDE like VSCode
* A web browser
* A command line


# Content structure

```
|   .gitignore
|   Dev.txt
|   package-lock.json
|   package.json
|   Procfile
|   README.md
|   server.js
|   Tree.txt
|   
+---.vscode
|       settings.json
|       
+---models
|       housingPost.js
|       user.js
|       
+---public
|   |   index.html
|   |   
|   +---images
|   |       backgornd.jpeg
|   |       background_learmmore.jpeg
|   |       contact-img.svg
|   |       favicon.ico
|   |       icon-1.png
|   |       icon-2.png
|   |       icon-3.png
|   |       icon-4.png
|   |       logo.png
|   |       profile-icon.png
|   |       UCAN_logo.png
|   |       
|   +---pages
|   |       admin.html
|   |       chat.html
|   |       community.html
|   |       houseListings.html
|   |       jobPostings.html
|   |       learnMore.html
|   |       logIn.html
|   |       newCommunityForm.html
|   |       newHouseListing.html
|   |       newJobForm.html
|   |       profile.html
|   |       sign_up.html
|   |       template.html
|   |       
|   +---scripts
|   |       admin.js
|   |       communityListings.js
|   |       houseListings.js
|   |       index.js
|   |       jobListings.js
|   |       logIn.js
|   |       newCommunityForm.js
|   |       newHouseListing.js
|   |       newJobForm.js
|   |       sign_up.js
|   |       skeleton.js
|   |       
|   +---skeletons
|   |       bottomNav.html
|   |       footer.html
|   |       topNav.html
|   |       
|   +---styles
|   |       admin.css
|   |       chat.css
|   |       generalCommunityPage.css
|   |       generalHouseListings.css
|   |       generalJobListings.css
|   |       index.css
|   |       individualHousePost.css
|   |       newCommunityForm.css
|   |       newHouseListing.css
|   |       newJobForm.css
|   |       sign_up.css
|   |       skeleton.css
|   |       style.css
|   |       subCommunityStyle.css
|   |       
|   \---sub_pages
|           subCommunityPage.html
|           
\---views
        communityPost.ejs
        housing.ejs
        
```

# CopyRights

* Bootstrap
```
    https://github.com/twbs/bootstrap/blob/v5.0.2/LICENSE
    The MIT License (MIT)

    Copyright (c) 2011-2021 Twitter, Inc.
    Copyright (c) 2011-2021 The Bootstrap Authors

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE. 
```

<p align="right">(<a href="#top">back to top</a>)</p>

