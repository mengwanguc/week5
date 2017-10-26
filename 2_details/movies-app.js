class MoviesApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      movie: null,
      favorites: []
    }
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // let key = 'e9743662f5a39568d8e25225f2c97e09'
    let key = 'bde024f3eb43f597aafe01ed9c9098c6'

    let movie_search_url = 'https://api.themoviedb.org/3/search/movie?api_key=' + key + '&language=en-US'
    movie_search_url += "&query=" + this.state.title;
    fetch(movie_search_url).then(this.parseResponse).then(this.showMovie);
    this.setState({ title: "" });
  }

  parseResponse = (response) => { return response.json(); }

  posterUrl = () => {
    if (this.state.movie) {
      return "http://image.tmdb.org/t/p/w300/" + this.state.movie.poster_path;
    }
    return "http://via.placeholder.com/300x450";
  }

  showMovie = (data) => {
    // let key = 'e9743662f5a39568d8e25225f2c97e09'
    let key = 'bde024f3eb43f597aafe01ed9c9098c6'

    if (data.results.length > 0) {
      let movie = data.results[0];
      this.setState({ movie: movie })
      let url = "https://api.themoviedb.org/3/movie/" + movie.id + "/credits?api_key=" + key
      console.debug(url)
      fetch(url).then(this.parseResponse).then(this.receiveDetails);
    } else {
      this.setState({ movie: null })
    }
  }

  receiveDetails = (data) => {
    console.debug(data);
    let movie = this.state.movie;
    movie.director = data.crew.find(entry => (entry.job === 'Director'));
    movie.actors = data.cast.slice(0, 3)
    this.setState({ movie: movie });
  }

  handleAddFavorite = (event) => {
    event.preventDefault();
    this.setState( { favorites: this.state.favorites.concat(this.posterUrl()) } );
  }

  render() {
    let addLink = null;

    if (this.state.movie) {
      addLink = <a href="#" onClick={this.handleAddFavorite} className="btn btn-primary" id="addFavorite">Add to Favorites</a>
    }

    let cast = [<li>Actor #1 as Character #1</li>,<li>Actor #2 as Character #2</li>,<li>Actor #3 as Character #3</li>]
    if (this.state.movie && this.state.movie.actors) {
      cast = this.state.movie.actors.map((actor) => <li key={actor.name}>{actor.name} as {actor.character}</li>);
    }

    let titleAndYear = "Movie Title (Year)"
    if (this.state.movie) {
      titleAndYear = this.state.movie.title
      if (this.state.movie.release_date) {
        titleAndYear += " (" + this.state.movie.release_date.substr(0,4) + ")"
      }
    }

    let directedBy = "Famous Director"
    if (this.state.movie && this.state.movie.director && this.state.movie.director.name) {
      directedBy = this.state.movie.director.name
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <form onSubmit={this.handleSubmit}>
              <input placeholder="Search by title..." className="form-control" onChange={this.handleTitleChange} value={this.state.title} type="text" name="title" autofocus={true} />
              <button class="btn btn-primary my-3 mr-3">Search</button>
              {addLink}
            </form>
          </div>

          <div className="col-sm-6 mb-3">
            {this.state.favorites.map( favorite => {
              return <img key={favorite} className="float-left thumbnail" src={favorite} />
            })}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <img id="movie" src={this.posterUrl()} />
          </div>

          <div className="col-sm-6">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <h4 class="mb-0">{titleAndYear}</h4>
              </div>
              <div class="card-body">
                <p class="card-text">
                  <em>
                    {(this.state.movie && this.state.movie.overview) || "Some kind of brief, witty overview will be displayed here."}
                  </em>
                </p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Directed By:</strong> {directedBy}</li>
                <li class="list-group-item"><strong>Starring:</strong>
                  <ul>
                    {cast}
                  </ul>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    )
  }
}
ReactDOM.render(
  <MoviesApp />,
  document.getElementById('root')
);
