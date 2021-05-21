import React, { useState } from 'react'

function dec2Bin(dec) {
  return dec > -1 ?
    (dec >>> 0).toString(2).padStart(16,0)
    :
    (dec >>> 0).toString(2).slice(16,32)    
}

function BinaryBars({binary}) {
  return (
    <div>
      {binary.split('').map(bit => (
        <span style={
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

function HomePage() {
  const [signedVal, setSignedVal] = useState(0)
  const min = -32768, max = 32767

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
            onChange={(event) => setSignedVal(event.target.value)}
            style={{width:'100%'}} />
      <p style={{fontSize:24}}>16-bit binary: {dec2Bin(signedVal)}</p>
      <BinaryBars binary={dec2Bin(signedVal)} />
    </div>
  )
}

export default HomePage