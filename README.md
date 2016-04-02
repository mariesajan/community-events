### Community Events

An example project done as part of learning **node js, drywall, mongolab, mongo, jade** and **grunt** .

Drywall is a website and user system for Node.js


## Installation

1.  Clone the drywall
    ```
    git clone git@github.com:jedireza/drywall.git
    ```

2. If you get permission denied error while cloning, add SSH key to your github account. Refer [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

3. Do the setup as mentioned in [Drywall README](https://github.com/jedireza/drywall)  

4.  Go to mongolab.com and create the database ``comevents``

5. Make sure to create database ``comevents`` in mongolab and enter the mongodb url in ``config.js``. To work the Email functionality, give email credentials in the ``config.js``. Also, connect to the mongolab before executing the commands in mongo shell.

6. Replace with the repository files.

7. Install grunt CLI and dependencies.

    ```
    //To install grunt CLI globally.
    npm install -g grunt-cli
    //To install dependencies in package.json
    npm install
    ```
8. Run
    ```
    npm start
    ```

9. Open [localhost:3000](localhost:3000).

### ToDo

  Error propogation from front end to backend is not done.
