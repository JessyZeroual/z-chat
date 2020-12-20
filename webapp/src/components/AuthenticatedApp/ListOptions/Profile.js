import React, { useState, useContext } from 'react';
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
import CurrentUserContext from '../../../context/CurrentUserContext';

import { updateAvatarProfile, updateUser } from '../../../controllers/user';
import { ButtonUpload } from './ListOptions.styled';
import SVGIcon from '../../../icon/SVGIcon';

const Profile = ({ setIsOpenModal, isOpenModal, currentUser }) => {
  const { getCurrentUser } = useContext(CurrentUserContext);
  const [focusInputUpload, setFocusInputUpload] = useState(false);
  const [username, setUsername] = useState('');
  let uploadInput;

  const uploadAvatar = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', uploadInput.files[0]);
    const response = await updateAvatarProfile(formData);
    if (response.ok) {
      getCurrentUser();
    }
  };

  const editUsername = async e => {
    e.preventDefault();
    const response = await updateUser(username);
    if (response.ok) {
      getCurrentUser();
    }
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpenModal}
      toggle={() => setIsOpenModal(!isOpenModal)}
    >
      <ModalHeader toggle={() => setIsOpenModal(!isOpenModal)}>
        Edit profile
      </ModalHeader>

      <Form onSubmit={editUsername}>
        <ModalBody>
          <div style={{ maxWidth: 200 }} className="mx-auto">
            <img
              width="200"
              src={currentUser.avatar_url}
              alt="profil utilisateur"
              className="my-2"
            />
            <input
              ref={ref => {
                uploadInput = ref;
              }}
              onChange={e => uploadAvatar(e)}
              onFocus={() => setFocusInputUpload(true)}
              onBlur={() => setFocusInputUpload(false)}
              accept="image/*"
              type="file"
              name="profile"
              id="file"
            />
            <ButtonUpload htmlFor="file" focusInputUpload={focusInputUpload}>
              <SVGIcon name="upload" width={20} fill="black" />
              <span style={{ marginLeft: 5, fontSize: 13 }}>
                Upload an image
              </span>
            </ButtonUpload>
          </div>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              onChange={e => setUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              placeholder={currentUser.username}
            />
          </FormGroup>
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
      </Form>
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
    avatar_url: PropTypes.string,
  }).isRequired,
};

export default Profile;
