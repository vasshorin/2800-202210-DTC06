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

## Hosted URL


Click [here](https://warm-cove-79874.herokuapp.com/pages/index.html) to access our application.


## Usage

```
TBD for proper Usage guide
```

## Our Team


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
* TalkJS
* EJS
* bcrypt
* FirebaseStorage
* Heroku


# Needed Tools

* Any text editor or IDE like VSCode
* A web browser
* A command line


# Content structure

```
|   .gitignore
|   package-lock.json
|   package.json
|   Procfile
|   README.md
|   server.js
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
|   |       setting.html
|   |       sign_up.html
|   |       template.html
|   |       
|   +---scripts
|   |       admin.js
|   |       chat.js
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
|   |       topNav.js
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
|   |       setting.css
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

* NodeJS
```
Copyright Node.js contributors. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
```

* ExpressJS
```

(The MIT License)

Copyright (c) 2009-2014 TJ Holowaychuk <tj@vision-media.ca>
Copyright (c) 2013-2014 Roman Shtylman <shtylman+expressjs@gmail.com>
Copyright (c) 2014-2015 Douglas Christopher Wilson <doug@somethingdoug.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

* MongoDB
```
MongoDB is free and the source is available. Versions released prior to October 16, 2018 are published under the AGPL. All versions released after October 16, 2018, including patch fixes for prior versions, are published under the Server Side Public License (SSPL) v1.
```

* Mongoose
```
Copyright (c) 2004-2013 Sergey Lyubka
Copyright (c) 2013-2021 Cesanta Software Limited
All rights reserved

This software is dual-licensed: you can redistribute it and/or modify
it under the terms of the GNU General Public License version 2 as
published by the Free Software Foundation. For the terms of this
license, see <http://www.gnu.org/licenses/>.

You are free to use this software under the terms of the GNU General
Public License, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU General Public License for more details.

Alternatively, you can license this software under a commercial
license, as set out in <https://mongoose.ws/licensing/>.
```
