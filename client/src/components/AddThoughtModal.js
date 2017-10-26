import React from 'react';
import Modal from 'react-modal';

const AddThoughtModal = (props) => (
  <Modal
      isOpen={props.isOpen}
      contentLabel="add a Thought"
      onRequestClose={props.handleToggleThought}
      closeTimeoutMS={200}
      className="modal"
  >
      <h3 className="modal-title">Share a thought!</h3>
      <form>
			  <input className="text-area" type="text" name="name" />
			  <input className="submit-thought" type="submit" value="Submit" />
			</form>
  </Modal>
);

export default AddThoughtModal;