import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import userProfile from '../../../img/userProfile.svg';
import { ButtonUpload } from './ListOptions.styled';

const Profile = ({ setIsOpenModal, isOpenModal, currentUser }) => {
  return (
    <Modal
      size="sm"
      isOpen={isOpenModal}
      toggle={() => setIsOpenModal(!isOpenModal)}
    >
      <ModalHeader toggle={() => setIsOpenModal(!isOpenModal)}>
        Edit profile
      </ModalHeader>

      <ModalBody>
        <Form>
          <div style={{ maxWidth: 200 }} className="mx-auto">
            <img
              style={{ maxWidth: 200 }}
              src={userProfile}
              alt="profil utilisateur"
              className="m-2"
            />
            <input type="file" id="file" />
            <ButtonUpload htmlFor="file">
              <i className="fas fa-upload mr-2" />
              <span style={{ fontSize: 13 }}>upload an image</span>
            </ButtonUpload>
          </div>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder={currentUser.username}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          type="submit"
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

Profile.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Profile;
