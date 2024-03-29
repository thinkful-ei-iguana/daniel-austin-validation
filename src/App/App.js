import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import NotefulForm from '../NotefulForm/NotefulForm';
import './App.css';
import AddFolder from '../AddFolder';
import AddNote from '../AddNote';
import ErrorBoundary from '../ErrorBoundary';
import { withRouter } from 'react-router-dom';


class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleAddFolder = event => {
    event.preventDefault();
    event.persist();

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: event.target.folderName.value })
    }).then(res => {
      if (res.ok) return res.json();
      else throw new Error('Error, folder cannot be created');
    }).then(folder => {
      this.props.history.push(`/`)
      this.setState({ folders: [...this.state.folders, folder] });
    }).catch(err => {
      console.log(err.message);
    });
  }

  handleAddNote = event => {
    event.preventDefault();
    event.persist();

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: event.target.noteName.value,
        modified: Date.now(),
        content: event.target.noteContent.value,
        folderId: event.target.folderSelect.value
      })
    }).then(res => {
      if (res.ok) return res.json();
      else throw new Error('Error, note cannot be created');
    }).then(note => {
      this.props.history.push(`/folder/${note.folderId}`)
      this.setState({ notes: [...this.state.notes, note] });
    }).catch(err => {
      console.log(err.message);
    })
  }

  renderNavRoutes() {
    return (
      <ErrorBoundary>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </ErrorBoundary>
    );
  }

  renderMainRoutes() {
    return (
      <ErrorBoundary>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" render={(props) => (
          <NotefulForm
            {...props}
            children={AddFolder}
            onSubmit={this.handleAddFolder}
          />
        )} />
        <Route path="/add-note" render={(props) => (
          <ErrorBoundary>
            <NotefulForm
              {...props}
              children={AddNote}
              onSubmit={this.handleAddNote}
            />
          </ErrorBoundary>
        )} />
      </ErrorBoundary>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default withRouter(App);
