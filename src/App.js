import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: true,
  }

  listenWebsite = event => {
    this.setState({website: event.target.value})
  }

  listenUserName = event => {
    this.setState({username: event.target.value})
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = e => {
    e.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: false})
    } else {
      this.setState({isShow: true})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-con">
        <img
          className="logo"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="input-con">
          <img
            className="img"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          />
          <img
            className="img-lg "
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
          <form className="form" onSubmit={this.addContent}>
            <h1 className="heading">Add New Password</h1>
            <div className="web-input">
              <img
                className="web-icon"
                alt="website"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />
              <input
                className="input"
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.listenWebsite}
              />
            </div>

            <div className="web-input">
              <img
                className="web-icon"
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />
              <input
                className="input"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.listenUserName}
              />
            </div>

            <div className="web-input">
              <img
                className="web-icon"
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              />
              <input
                className="input"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.listenPassword}
              />
            </div>
            <button className="btn" type="submit">
              Add
            </button>
          </form>
        </div>

        <div className="password-con">
          <div className="manage-con">
            <div className="password-manager">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-holder">
              <img
                className="search-icon"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />

          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                className="empty-image"
                alt="no passwords"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              />
              <p className="desc">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="list-con">
              {newList.map(eachItem => (
                <li className="list" id={eachItem.id} key={eachItem.id}>
                  <p className={`initial ${eachItem.classAdd}`}>
                    {eachItem.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="web">{eachItem.websiteName}</p>
                    <p className="web">{eachItem.userName}</p>
                    {isShow && (
                      <img
                        className="star-icon"
                        alt="stars"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      />
                    )}
                    {!isShow && <p className="web">{eachItem.Password}</p>}
                  </div>
                  <button
                    className="del-btn"
                    type="button"
                    data-testid="delete"
                    onClick={() => this.deleteItem(eachItem.id)}
                  >
                    <img
                      className="delete-icon"
                      alt="delete"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
