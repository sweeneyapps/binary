import React, { useEffect, useState, useRef } from 'react'

function dec2Bin(dec) {
  return dec > -1 ?
    (dec >>> 0).toString(2).padStart(16,0)
    :
    (dec >>> 0).toString(2).slice(16,32)    
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}


function BinaryBars({binary}) {
  return (
    <div>
      {binary.split('').map((bit, index) => (
        <span key={index} style={
          {backgroundColor: bit === '1' ? 'green' : 'white',
           border:'solid',
           borderColor:'black',
           padding:10, height:10
          }
        }>&nbsp;</span>
      ))}
    </div>
  )
}

let timer

function HomePage() {
  const [signedVal, setSignedVal] = useState(0)
  const [delay, setDelay] = useState(1000000000)
  const min = -32768, max = 32767

  useInterval(() => {
    setSignedVal(signedVal + 1)
  }, delay)

  return (
    <div>
      <h1>
        Let learn some binaries today!
        and tomorrow... 
      </h1>
      <h2 style={{color:'blue'}}>
        The value for 16-bit signed integer is:
        {signedVal}
      </h2>
      <input type="range" min={min} max={max} value={signedVal} 
            onChange={(event) => setSignedVal(Number(event.target.value))}
            style={{width:'100%'}} />
      <p style={{fontSize:24}}>16-bit binary: {dec2Bin(signedVal)}</p>
      <BinaryBars binary={dec2Bin(signedVal)} />
      <br></br>
      <button onClick={() => setSignedVal(0)}>Reset to Zero</button>
      <button onClick={() => setSignedVal(signedVal < max ? signedVal + 1 : signedVal)}>+</button>
      <button onClick={() => setSignedVal(signedVal > min ? signedVal - 1 : signedVal)}>-</button>
      <button onClick={() => setDelay(1000)}>run slower</button>
      <button onClick={() => setDelay(100)}>run normal</button>
      <button onClick={() => setDelay(10)}>run faster</button>
      <button onClick={() => setDelay(100000)}>stop</button>
    </div>
  )
}

export default HomePage