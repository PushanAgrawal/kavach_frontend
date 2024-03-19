import axios from 'axios';
import Image from 'next/image'

import Router from 'next/router'
import { useState } from 'react'
import Toast from '@/components/Toast';



export default function Home() {

  const [note, setNote] = useState("");
  const [error, setError] = useState(["","",0]);
  const [result, setResult] = useState("");
  const [openTab, setOpenTab] = useState(1);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  

  function handleChange(event) {
    setNote(event.target.value);
    if (openTab==2 && (note.length<250 || note.length>5000)){
      setError(["","The prompt must be between 50 - 1000 words",0]);
    }
    else  
      setError(["","", 1]);
  }

  async function search(event){
    if (openTab==3) {
      console.log(openTab)
      let formData = new FormData();
		  formData.append('image', image);
      formData.append('title',"abcd");
      formData.append('user',2);
      await axios.post("http://localhost:8000/api/create", formData, config)
        .then(resp => {
          console.log(openTab)
          console.log(resp.data);
          setResult(resp.data.result);
        } )
      
      //  block of code to be executed if the condition is true
    }
    else if(!error[2] && openTab==2){}
    else{

    // search route to backend for result
    setResult("........");
      axios.post("http://localhost:8000/apis/",{
        choice:openTab,
        text: note,
        })
      .then(resp => {
        console.log(openTab)
        console.log(resp.data.result);
        
        setResult("........");
        setTimeout(function() {
          //your code to be executed after 1 second
          const ele = document.getElementById("res")
          if (resp.data.result=="NOT A FAKE NEWS"){
            ele.setAttribute("style", "color:green;"); 
          }
          else{
            ele.setAttribute("style", "color:red;"); 
          }
          setResult(resp.data.result);
        }, 300);
        
      } )
      .catch(error => {console.log(error.request.status);
      setError(["Invalid URL","",0])})
    event.preventDefault();
    }
  }

  function imageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  // async function upload(event){
  //   const body = new FormData();
  //   body.append("file", image);
  //   const response = await fetch("/api/hello", {
  //     method: "POST",
  //     body
  //   });
  //   search(event);
  // };
  

  return (
    <main className="flex flex-col items-center p-20 bg-[url('/kavach-bg.jpg')]">
      <div className='flex flex-col bg-white rounded-[10px] items-center w-full text-black p-8 gap-y-8'>

        {/* Title */}
        <div className='text-[#609966] font-bold lg:text-2xl md:text-xl sm:text-lg 2xs:text-base'>
          FAKE NEWS DETECTOR
        </div>

        {/* multi-choice input */}
        <div className="flex flex-wrap w-full px-20">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-[#609966]"
                      : "text-[#609966] bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                    console.log(openTab);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  URL
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-[#609966]"
                      : "text-[#609966] bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(2);
                    console.log(openTab);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Text Prompt
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-[#609966]"
                      : "text-[#609966] bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(3);
                    console.log(openTab);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Image
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <div className='flex flex-col gap-y-2 w-full'>
                      <label for="prompt">Please enter the url:</label>
                      <input
                        className='border border-black'
                        type="text"
                        id="prompt"
                        name="prompt"
                        value={note}
                        required
                        minlength="10"
                        rows={10}
                        onChange={handleChange}
                        pattern='^http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([ndtv timesofindia hindustantimes]+)(.com)(\/[^\s]*)?'
                      />
                      <div className='text-center text-sm text-red-500'>{error[0]}</div>
                      <div className='flex gap-x-4'>
                        <button className='rounded-lg bg-[#609966] text-white w-fit p-1 px-4' onClick={search}>Submit</button>
                        <button className='rounded-lg bg-gray-500 text-white w-fit p-1 px-4' onClick={()=>{setNote(""); setResult("")}}>Refresh</button>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <div className='flex flex-col gap-y-2 w-full'>
                      <label for="prompt">Please enter your text:</label>
                      <textarea
                        className='border border-black'
                        type="text"
                        id="prompt"
                        name="prompt"
                        value={note}
                        required
                        minlength="10"
                        rows={7}
                        onChange={handleChange}
                      />
                      <div className='text-center text-sm text-red-500'>{error[1]}</div>
                      <div className='flex gap-x-4'>
                        <button className={error[2]?'rounded-lg bg-[#609966] text-white w-fit p-1 px-4':'rounded-lg bg-gray-400 text-white w-fit p-1 px-4 cursor-not-allowed'} onClick={search}>Submit</button>
                        <button className='rounded-lg bg-gray-500 text-white w-fit p-1 px-4' onClick={()=>{setNote(""); setResult("")}}>Refresh</button>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <div className='flex flex-col gap-y-2 w-full'>
                      <img src={createObjectURL} />
                      <h4>Select Image</h4>
                      <input type="file" name="myImage" accept="image/png, image/jpeg, image/jpg" onChange={imageChange} />
                      <div className='flex gap-x-4'>
                        <button className='rounded-lg bg-[#609966] text-white w-fit p-1 px-4' type='submit' onClick={search}>Submit</button>
                        <button className='rounded-lg bg-gray-500 text-white w-fit p-1 px-4' onClick={()=>{setNote(""); setResult("")}}>Refresh</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div>
          <input value={result} id='res' className='text-center text-2xl text-red-500 font-bold'/>
        </div>
      </div>
    </main>
  )
}
