# ENZYME AND MATERIAL-UI

create-react-app

npm install redux react-redux

# for enzyme, create a file called "setupTests.js" in the /src folder.
# when jest starts, it'll look for this file to configure enzyme.
npm install enzyme
npm install enzyme-adapter-react-{react version number, 16 in my case}

# create a src/__tests__ folder for test.
# create a NODEPATH in .env file.  All file references are absolute relative to the /src

# additional installs
npm install axios redux-promise moxios

#VS Code debugger for react - running the application debug

npm start

VS Code launch.json setting
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3001",
      "webRoot": "${workspaceFolder}"
    }
  ]
}

moxis -> mock of axios api.  used for testing.

for pause, use it->done().

create a react app with routing
npm install react-router-dom 

# use this to validate our schema
npm install tv4

