### Community Events

An example project done as part of learning **node js, drywall, mongolab, mongo, jade** and **grunt** .

Drywall is a website and user system for Node.js

Go to mongolab.com and create:
dbname: comevents

## Installation

1.  Clone the drywall
    ```
    git clone git@github.com:jedireza/drywall.git
    ```

2. If you get permission denied error while cloning, add SSH key to your github account. Refer [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

3.  Replace package.json and /schema/User.js with that in repository

4. Install grunt CLI and dependencies.

    ```
    //To install grunt CLI globally.
    npm install -g grunt-cli
    //To install dependencies in package.json
    npm install
    ```
5. Run
    ```
    grunt
    ```

6. Open [localhost:3000](localhost:3000).
