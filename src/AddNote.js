import React, { Component } from 'react';
import ApiContext from './ApiContext';


export default class AddNote extends Component {
  static contextType = ApiContext;
  
  render() {
    const { folders } = this.context;

    return (
      <fieldset>
        <label htmlFor="noteName" >Note Name</label>
        <input type="text" name="noteName" id="noteName" required/>
        <label htmlFor="noteContent">Content</label>
        <input type="text" name='noteContent' id='noteContent' />
        <select name="folderSelect" id="folderSelect">
          {folders.map(folder => {
            return (
              <option value={folder.id} key={folder.id} id={folder.id}>
                {folder.name}
              </option>
            );
          })}
        </select>
      </fieldset>
    );
  }
}