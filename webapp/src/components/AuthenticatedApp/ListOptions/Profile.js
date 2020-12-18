import React, { useState, useEffect, useContext } from 'react';
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
import getHost from '../../../utils/getHost';

const Profile = ({ setIsOpenModal, isOpenModal, currentUser }) => {
  const { getCurrentUser } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const HOST = getHost();
  let uploadInput;

  useEffect(() => {
    const socket = new WebSocket(HOST);

    socket.onmessage = msg => {
      const event = JSON.parse(msg.data);
      if (event.type === 'AVATAR_URL_UPDATED')
        setAvatar(event.payload.avatar_url);
    };
    // eslint-disable-next-line
  }, []);

  const uploadAvatar = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', uploadInput.files[0]);
    await updateAvatarProfile(formData);
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
              src={avatar === '' ? currentUser.avatar_url : avatar}
              alt="profil utilisateur"
              className="my-2"
            />
            <input
              ref={ref => {
                uploadInput = ref;
              }}
              onChange={e => uploadAvatar(e)}
              accept="image/*"
              type="file"
              name="profile"
              id="file"
            />
            <ButtonUpload htmlFor="file">
              <SVGIcon name="trash" width={20} fill="#eee" />
              <span style={{ fontSize: 13 }}>upload an image</span>
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
