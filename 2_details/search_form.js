class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: "" }
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onTitleSubmitted(this.state.title);
    // <SearchForm onTitleSubmitted={...}>
  }

  handleAddFavorite = () => {
    console.debug("Favorites button was clicked")
    this.props.onFavoriteClicked()
  }

  render() {
    let addLink = null;

    if (this.props.showFavoritesButton) {
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
}
