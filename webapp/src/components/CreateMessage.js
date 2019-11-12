import React from 'react';

const CreateMessage = props => {
  let input;
  

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: input.value,
        channelId: props.channelId,
      }),
    })
      .then((input.value = ''))
      .then(props.setShouldRefetchMessages(true));
  };


  return (
    <form className="input-group mb-3 p-3" onSubmit={e => handleSubmit(e)}>
      <input
        ref={node => {
          input = node;
        }}
        type="text"
        className="form-control"
        placeholder="Write a message"
      />
      <div className="input-group-append">
        <button className="btn btn-success">Send</button>
      </div>
    </form>
  );
};

export default CreateMessage;
