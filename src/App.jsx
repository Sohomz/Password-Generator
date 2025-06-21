import { useState, useCallback, useEffect, useRef} from 'react'

import './index.css'

function App() {

  const [len,setLen]=useState(8);
  const [numberAllow,setNumberAllow]=useState(false);
  const [chrAllow,setChrAllow]=useState(false);
  const [pwd,setPwd]=useState('');
  const pwdRef=useRef(null); // we are taking this to take the <input> param, like we were using getElementById same functionality. Now,without this also, code will work, but to give user more info that its copied or onClick some msg, we need this.
  const [message,setMessage]=useState('');

  const pwdGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllow){
      str+="A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2"
    }
    if (chrAllow){
      str+="ABC)%*^!<>?DEF@#$GHIJ)%*^!<>?KLMNOP@#$[]QRST)%*^!<>?${}[]YZa)%*^!<>?bcde@#${}[]fgh[]*()%*^!<>?ijklmn[]*()%*^!<>?opqrs[]*()%*^!<>?tuv[]*()%*^!<>?wxyz"
    }

    for (let index = 0; index < len; index++) {
      let c=Math.floor((Math.random()*str.length)+1);
      pass+=str.charAt(c);
    }
    setPwd(pass)
  },[len,numberAllow,chrAllow,setPwd]); // without setPwd it will work, but as we know for optimization we are using useCallback hook


  // useCallback is a React Hook that lets you cache a function definition between re-renders. reason to use useCallback is to prevent a component from re-rendering unless its props have changed. This is because of something called "referential equality".Every time a component re-renders, its functions get recreated. Because of this, the addTodo function has actually changed. Here, when only the len, numberAloow, chrAllow minimum anyone of it will change then only function will re-render. By this we can achieve to call same  func pwdGenerator whenever there is a chnge in its props/dependencies

  // pwdGenerator(), cant call this here because we dont have the control, err will come too many re-renders, this is not because of useCallback, even if u delete it, it will give same err. Use button, onClick this function no issue. Else useEffect

  useEffect(()=>{
    pwdGenerator()
  },[len,numberAllow,chrAllow]) //useCallback is for optimization purpose only, we can use useEffect also to dothe same work, whatever dependencies are there are stored into a cached memory, thats why optimized, thats it. useEffect is used when a webpage renders for the first time and if the dependencies have changes, then rerender

  const copyToClipboard=useCallback(()=>{
    pwdRef.current?.select(); //this will select that pwd in <input> tag. ? is to check if its blank
    //pwdRef.current?.setSelectionRange(0,6); // this will select only 3 characters from start for UI only, its not going to copy 6 character, its just UI
    window.navigator.clipboard.writeText(pwd) //there is no window object in serverSide
    .then(()=>{
      setMessage(`you copied ${pwd}`)
    })
    .catch((err)=>{
      setMessage("Error!!")
    })
    .finally(()=>{
      setTimeout(()=>{
        setMessage("");
      },3000)
    });
  },[pwd])

  
  return (
    <>
      <h1 className='flex justify-center text-4xl'>Password generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-6 my-8  text-orange-500 bg-gray-800">

        <div className="flex shadow-rounded-lg  mb-4 font-bold">
          <input type="text" value={pwd} ref={pwdRef} className="outline-none w-full p-2 rounded-md h-10" placeholder='password here' readOnly></input>
          <button onClick={copyToClipboard} className="p-2 text-white justify-center bg-blue-700 rounded-md ml-4 hover:bg-blue-800 hover:scale-110">Copy</button>
        </div>
        <div className="text-green-500">{message}</div>
        <div className="flex items-center gap-x-1">
          <input type='range' min={6} max={30} value={len} className="cursor-pointer" onChange={(e)=> {setLen(e.target.value)}}></input>
          <label>Length: {len}</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input type="checkbox" className="cursor-pointer" onChange={(e1)=> {setNumberAllow(prevState=>(!prevState))}}></input>
          {/* Here we are setting the prevState varible as checkbox tick in/out */}
          <label >Number Allowance {numberAllow}</label>      
        </div>
        <div className="flex items-center gap-x-1">
        <input type="checkbox" className="cursor-pointer" onChange={(e2)=> {setChrAllow(prevState=>(!prevState))}}></input>
          {/* Here we are setting the prevState varible as checkbox tick in/out */}
          <label >Special Character Allowance {chrAllow}</label>      
        </div>
      </div>
    </>
  )
}

export default App
