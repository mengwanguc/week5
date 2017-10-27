class Favorites extends React.Component {

  constructor(props) {
    super(props)
    this.state = { }
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
