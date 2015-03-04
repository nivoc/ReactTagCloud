# Description
This playground project uses React in combination with the vanilla flux designpattern, React Router and Jest (Sister of Jasmine) for Tests. Following the Flux-Pattern adds a little overhead but enables very clean and predictable understandable code - save to grow. Once a developer grasped the concept and work patterns of flux it enables a very quick way of understanding unknown code. It also enables hot-reload capabilites because all the state is always only in the stores and no component is allowed to have side effects.

# Setup
```
npm install
```

# Run
```
npm start
```
Accessible at `http://localhost:3001/`

_Hint:_ `npm start` is booting a local dev server with hot code replacement enabled. **Try it!**: If you modify a component lets say 'TagCloudTopic' and hit save, the change will be hot-replaced in the browser. No reload required! This works currently with all stateless components basically everything thats inside the components folder (js&css).

# Test
`npm test`

# Minified Build
```
npm run build
```
