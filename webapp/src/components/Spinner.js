import React from 'react'
import { HashLoader } from 'react-spinners';


const Spinner = () => {
    return (
        <div
        style={{ marginTop: 250 }}
        className="d-flex justify-content-center align-items-center"
      >
        <HashLoader
          sizeUnit={'px'}
          size={120}
          color={'#3f0f40'}
        />
      </div>
    )
}

export default Spinner
