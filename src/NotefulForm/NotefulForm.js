import React from 'react';
import './NotefulForm.css';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

function NotefulForm(props) {
  const { className, onSubmit } = props;
  const Imputs = props.children;
  

  return (
    <>
      <form
        onSubmit={e => onSubmit(e)}
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

NotefulForm.propTypes = {
  className: propTypes.string,
  onSubmit: propTypes.func
}
