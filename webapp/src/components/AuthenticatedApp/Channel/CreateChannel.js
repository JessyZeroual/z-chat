import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { postChannel } from '../../../controllers/channel';

const CreateChannel = ({
  setIsOpenModal,
  isOpenModal,
  setShouldRefetchChannel,
}) => {
  let input;

  const handleSubmit = e => {
    e.preventDefault();

    postChannel(input.value)
      .then(setIsOpenModal(false))
      .then(setShouldRefetchChannel(true));
  };

  return (
    <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>
      <ModalHeader toggle={() => setIsOpenModal(!isOpenModal)}>
        Create channel
      </ModalHeader>
      <form onSubmit={e => handleSubmit(e)}>
        <ModalBody>
          <p className="text-muted">
            Channels allow your team to communicate. Their use is optimal when
            they are organized around a theme (#marketing, for example).
          </p>

          <input
            ref={node => {
              input = node;
            }}
            className="form-control"
            placeholder="name"
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={() => setIsOpenModal(!isOpenModal)}>
            Submit
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

CreateChannel.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  setShouldRefetchChannel: PropTypes.func.isRequired,
};

export default CreateChannel;
