import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import { CurrentUserProvider } from '../../../context/CurrentUserContext';
import MessageList from './messageList/MessageList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    channelId: '1',
  }),
}));

describe('Message', () => {
  describe('Delete button', () => {
    describe('When current user is owner of the message', () => {
      let wrapper;

      const currentUser = {
        id: 1,
      };

      const contextValue = {
        currentUser,
      };

      beforeEach(() => {
        fetchMock.getOnce(
          `/api/channels/1/20/0/messages`,
          {
            messages: [
              {
                id: 5,
                user_id: 1,
              },
            ],
            nextMessages: [],
          },
          { overwriteRoutes: true }
        );

        fetchMock.delete(`/api/messages/5`, 200, { overwriteRoutes: true });

        wrapper = mount(
          <CurrentUserProvider value={contextValue}>
            <MessageList isSmallScreen={false} />
          </CurrentUserProvider>
        );
      });

      it('Should show delete button', async done => {
        setImmediate(() => {
          wrapper.update(); // update rendering with new state

          const deleteButton = wrapper.find(
            'button[data-selector="message-delete-button"]'
          );

          // console.log(wrapper.debug()); // show rendered wrapper
          expect(deleteButton).toHaveLength(1);
          done();
        });
      });

      describe('When clicking on delete button', () => {
        describe('server responds with 200', () => {
          it('Deletes message on channel', done => {
            setImmediate(() => {
              wrapper.update();
              const deleteButton = wrapper.find(
                'button[data-selector="message-delete-button"]'
              );
              deleteButton.simulate('click');
              setImmediate(() => {
                wrapper.update();
                const message = wrapper.find('[data-selector="message-5"]');
                expect(message).toHaveLength(0);
                done();
              });
            });
          });
        });
      });

      // describe('server does not respond', () => {
      //   it('Keeps message on channel', done => {
      //     fetchMock.delete(
      //       `/api/messages/5`,
      //       { throws: 'error' },
      //       { overwriteRoutes: true }
      //     );
      //     setImmediate(() => {
      //       wrapper.update();

      //       const deleteButton = wrapper.find(
      //         'button[data-selector="message-delete-button"]'
      //       );
      //       deleteButton.simulate('click');
      //       setImmediate(() => {
      //         wrapper.update();
      //         const message = wrapper.find('[data-selector="message-5"]');
      //         expect(message).toHaveLength(3);
      //         done();
      //       });
      //     });
      //   });
      // });
    });
  });

  describe('When current user is not owner of the message', () => {
    let wrapper;

    const currentUser = {
      id: 1,
    };

    const contextValue = {
      currentUser,
    };
    beforeEach(() => {
      fetchMock.getOnce(
        `/api/channels/1/20/0/messages`,
        {
          messages: [
            {
              id: 5,
              user_id: 2,
            },
          ],
          nextMessages: [],
        },
        { overwriteRoutes: true }
      );

      wrapper = mount(
        <CurrentUserProvider value={contextValue}>
          <MessageList isSmallScreen={false} />
        </CurrentUserProvider>
      );
    });

    it('Should not show delete button', done => {
      setImmediate(() => {
        wrapper.update();
        const deleteButton = wrapper.find(
          'button[data-selector="message-delete-button"]'
        );
        expect(deleteButton).toHaveLength(0);
        done();
      });
    });
  });
});
