import { useState } from 'react';
import SampleButton from './SampleButton';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SampleButton
        message="Hello World"
      >
      </SampleButton>
      
    </>
  )
}

export default App
