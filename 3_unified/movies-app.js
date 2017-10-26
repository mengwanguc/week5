class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="col-sm-6 mb-3">
        {this.props.list.map( favorite => {
          return <img key={favorite} className="float-left thumbnail" src={favorite} />
        })}
      </div>
    )
  }
}
class MovieDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = { }
  }

  posterUrl = () => {
    if (this.props.movie) {
      return "http://image.tmdb.org/t/p/w300/" + this.props.movie.poster_path;
    }
    return "http://via.placeholder.com/300x450";
  }


  render() {
    let cast = null;
    if (this.props.movie && this.props.movie.actors) {
      cast = this.props.movie.actors.map((actor) => <li key={actor.name}>{actor.name} as {actor.character}</li>);
    }

    return (
      <div className="row">
        <div className="col-sm-4">
          <img id="movie" src={this.posterUrl()} />
        </div>

        <div className="col-sm-6">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0">{this.props.movie && this.props.movie.title} ({this.props.movie && this.props.movie.release_date.substr(0,4)})</h4>
            </div>
            <div class="card-body">
              <p class="card-text">
                <em>
                  {this.props.movie && this.props.movie.overview}
                </em>
              </p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Directed By:</strong> {this.props.movie && this.props.movie.director && this.props.movie.director.name}</li>
              <li class="list-group-item"><strong>Starring:</strong>
                <ul>
                  {cast}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
    }
  }
  render() {
    let addLink = null;
    if (this.props.showAddFavoritesButton) {
      addLink = <a href="#" onClick={this.handleAddFavorite} className="btn btn-primary" id="addFavorite">Add to Favorites</a>
    }
    return (
      <div className="col-sm-6">
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Search by title..." className="form-control" onChange={this.handleTitleChange} value={this.state.title} type="text" name="title" autofocus={true} />
          <button class="btn btn-primary my-3 mr-3">Search</button>
          {addLink}
        </form>
      </div>
    )
  }

  handleAddFavorite = (event) => {
    event.preventDefault();
    this.props.onFavoriteClick()
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onTitleChange(this.state.title);
    this.setState({ title: "" });
  }
}

class MoviesApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: null,
      favorites: []
    }
  }

  retrieveMovieData = (title) => {
    // let key = 'e9743662f5a39568d8e25225f2c97e09'
    let key = 'bde024f3eb43f597aafe01ed9c9098c6'

    let movie_search_url = 'https://api.themoviedb.org/3/search/movie?api_key=' + key + '&language=en-US'
    movie_search_url += "&query=" + title;
    fetch(movie_search_url).then(this.parseResponse).then(this.showMovie);

  }

  parseResponse = (response) => { return response.json(); }

  showMovie = (data) => {
    // let key = 'e9743662f5a39568d8e25225f2c97e09'
    let key = 'bde024f3eb43f597aafe01ed9c9098c6'

    if (data.results.length > 0) {
      let movie = data.results[0];
      console.debug(movie);
      this.setState({ movie: movie })
      fetch("https://api.themoviedb.org/3/movie/" + movie.id + "/credits?api_key=" + key).
        then(this.parseResponse).then(this.receiveDetails);
    } else {
      this.setState({ movie: null })
    }
  }

  handleAddFavorite = () => {
    this.setState( { favorites: this.state.favorites.concat(this.posterUrl()) } );
  }
  receiveDetails = (data) => {
    console.debug(data);
    let movie = this.state.movie;
    movie.director = data.crew.find(entry => (entry.job === 'Director'));
    movie.actors = data.cast.slice(0, 3)
    this.setState({ movie: movie });
  }

  posterUrl = () => {
    if (this.state.movie) {
      return "http://image.tmdb.org/t/p/w300/" + this.state.movie.poster_path;
    }
    return "http://via.placeholder.com/300x450";
  }


  render() {

    return (
      <div>
        <div className="row">
          <SearchForm onTitleChange={this.retrieveMovieData} onFavoriteClick={this.handleAddFavorite} showAddFavoritesButton={this.state.movie != null} />
          <Favorites list={this.state.favorites} />
        </div>

        <MovieDetails movie={this.state.movie}/>

      </div>
    )
  }
}
ReactDOM.render(
  <MoviesApp />,
  document.getElementById('root')
);
