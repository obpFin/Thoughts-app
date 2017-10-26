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
      <h3>Under construction</h3>
  </Modal>
);

export default AddThoughtModal;