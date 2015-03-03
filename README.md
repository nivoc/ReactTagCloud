# Setup
npm install

# Run
npm start
- The side is now accessible at http://localhost:3001/
- Hint: npm start is starting the local dev server in hot-replace-mode. *Try it*! If you modify a components e.g. TagCloudTopic, the change will be hot-replaced in the browser. No reload required!

# Test
npm test :-)

# Minified Build
npm run build

# Description
The Project uses React in combination with the plain Facebook-Flux Architecture and Jest for Test. Following a strict Flux-Pattern adds some overhead but enables very clean and understandable code. It also enables hot-reload capabilites because all the state is always only in the stores and no component is allowed to have side effects.