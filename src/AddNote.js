import React, { Component } from 'react'

export default class AddNote extends Component {
    render() {
        return (
          <fieldset>
            <label htmlFor="noteName">Note Name</label>
            <input type="text" name="noteName" id="noteName"/>
            
          </fieldset>
        );
      }
    }