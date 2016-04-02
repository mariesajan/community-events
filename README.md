### Community Events

An example project done as part of learning **node js, drywall, mongo, jade** and **grunt** .

Customized the [Drywall website](http://jedireza.github.io/drywall/) by adding  CRUD functionalities  for Community Events.
The user can find and share community events with eachother.

## Installation

1.  Clone drywall
    ```
    git clone git@github.com:jedireza/drywall.git
    ```

2. If you get the error ``Permission denied (publickey).`` while cloning, add your SSH key to your github account. Refer [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

3. Do setup as mentioned in [Drywall README](https://github.com/jedireza/drywall)  
4. Make sure to create database ``comevents`` and enter records in [mongolab](https://mlab.com). Enter  mongodb url and email credentials in  ``./config.js``.

5. Connect to mongolab from mongo shell before executing mongo commands.

6. Replace with repository files.

7. Install grunt CLI and dependencies.

  ```
  // To install grunt CLI globally.
  npm install -g grunt-cli
  // To install dependencies in package.json
  npm install
  ```
8. Run
    ```
    npm start
    ```

9. Open [localhost:3000](localhost:3000).

### ToDo

  Error propagation from front end to backend
