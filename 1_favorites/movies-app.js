class MoviesApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      posterUrl: "http://via.placeholder.com/300x450",
      searched: false,
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
    fetch(movie_search_url).then(this.parseResponse).then(this.showPoster);
    this.setState({ title: "" });
  }

  parseResponse = (response) => { return response.json(); }

  showPoster = (data) => {
    console.debug(data)
    if (data.results.length > 0) {
      this.setState({ searched: true, posterUrl: "http://image.tmdb.org/t/p/w300/" + data.results[0].poster_path })
    } else {
      this.setState({ searched: false })
    }
  }

  handleAddFavorite = (event) => {
    event.preventDefault();
    this.setState( { favorites: this.state.favorites.concat(this.state.posterUrl) } );
  }
  render() {
    let addLink = null;

    if (this.state.searched) {
      addLink = <a href="#" onClick={this.handleAddFavorite} className="btn btn-primary" id="addFavorite">Add to Favorites</a>
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
            <img id="movie" src={this.state.posterUrl} />
          </div>

          <div className="col-sm-6">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Movie Title (Year)</h4>
              </div>
              <div class="card-body">
                <p class="card-text">
                  <em>
                    Some kind of brief, witty overview will be displayed here.
                  </em>
                </p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Directed By:</strong> Famous Director</li>
                <li class="list-group-item"><strong>Starring:</strong>
                  <ul>
                    <li>Actor #1 as Character #1</li>
                    <li>Actor #2 as Character #2</li>
                    <li>Actor #3 as Character #3</li>
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
