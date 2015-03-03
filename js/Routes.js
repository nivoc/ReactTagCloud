var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Route = Router.Route, DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var TagCloudPage = require('./components/TagCloudPage.react');

var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div>
        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="tagCloudDetail" path="/tagcloud/:topicHashID" handler={TagCloudPage}/>
    <Route name="tagCloud" path="/tagcloud/" handler={TagCloudPage}/>
    <DefaultRoute handler={TagCloudPage}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
