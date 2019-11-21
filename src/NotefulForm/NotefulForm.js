import React from 'react';
import './NotefulForm.css';
import { withRouter } from 'react-router-dom';

function NotefulForm(props) {
  const { className, addFolder } = props
  const Imputs = props.children
  

  return (
    <>
      <form
        onSubmit={e => addFolder(e)}
        className={['Noteful-form', className].join(' ')}
        action='#'
      >
        <Imputs />
        <button type="submit">
            Submit
        </button>
      </form>
      
    </>
  )
}

export default withRouter(NotefulForm);
