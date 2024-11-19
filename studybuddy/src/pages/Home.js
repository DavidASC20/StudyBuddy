import React from 'react';
import FileUpload from '../components/FileUpload';

function Home() {
  return (
    <div className="App">
      <div className="App-body">
        <div className='grid-item-1-home'>
          <h1>StudyBuddy!</h1>
        </div>
        <div className='grid-item-2-home'>
          <h3 className='usp-text'>Upload a previous test, or browse tests by class!</h3>
        </div>
        <div className='grid-item-3-home'>
          <FileUpload />
        </div>
      </div>
    </div>
  )
}

export default Home;