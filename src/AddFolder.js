import React, { Component } from 'react';

export default class AddFolder extends Component {

  render() {
    return (
      <fieldset>
        <label htmlFor="folderName">Folder Name</label>
        <input type="text" name="folderName" id="folderName"/>
        
      </fieldset>
    );
  }
}