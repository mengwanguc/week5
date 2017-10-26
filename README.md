# Week 5

The theme for this week is:

> Hierarchy of Data

This week, you'll need a local web server to run this code.

* Got Python 3.x? `python3 -m http.server`
* Got Python 2.x? `python -m SimpleHTTPServer 3000`
* Got Node? First: `npm install http-server -g` then `http-server` to start

We will start with `1_favorites/index.html`

### Challenge #1

Using the static mockup as a guide, display all movie details
including the title, release date, director, and the cast.

HINTS:

* Modify the code so that when a search is performed (and at least one match is found), store all of the movie information in `this.state` instead of just the poster url.  
* Use the movie data to render the entire UI.  
* When you're done, you shouldn't need the `searched` data member any longer.
* You'll need to use another API call to retrieve the release date, director, and cast (see below).

### Challenge #2

* Break the code up into three independent React components: 1) search form, 2) movie details (poster and info), and 3) favorites list.

### Challenge #3

* Modify the code so that when a favorite movie is clicked, the poster and all details are displayed.


### TheMovieDB.org API

The URL for getting cast and crew data is:

`https://api.themoviedb.org/3/movie/:movie_id/credits?api_key=:api_key`

Here's an example:

`https://api.themoviedb.org/3/movie/392044/credits?api_key=bde024f3eb43f597aafe01ed9c9098c6`

* Dig into the `crew` object and look for entries where the `job` is `Director`.
* Dig into the `cast` object for actor/role information.


### Big Ideas

* Building features in a web application is a puzzle where several pieces
must be coordinated together.  React is one attempt to provide a mental model
for building a user interface that reacts to underlying state changes.
* Getting components to pass data to each other isn't obvious.  In general, parent components pass data to their children
by using `props`.  Children pass data to their parent via callback functions.
* Be sure to review my guidelines on React state management from last week.
