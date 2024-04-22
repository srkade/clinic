import React, { useEffect, useState } from 'react'
import {db} from "../firebaseConfig"
import {collection,getDoc,addDoc} from 'firebase/firestore'
import { imgDB } from '../firebaseConfig';
import {v4} from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


function Doctors() {

  const [txt,setTxt] = useState("");
  const [img,setImg] = useState("");
  const [data,setData] = useState([])
  console.log(data)

      const handleUpload =(e)=>{
        console.log(e.target.files[0])
        const imgs=ref(imgDB,`Imgs/${v4()}`)
        uploadBytes(imgs,e.target.files[0]).then(data=>{
          
          getDownloadURL(data.ref).then(val=>{
            setImg(val)
          })
        })
      }

      const handleClick = async () =>{
        const valRef=collection(db,"txtData")
        await addDoc(valRef,{txtVal:txt,imgUrl:img})
        alert("Data Added Successfully")
      }
      const getData= async ()=>{
        const valRef=collection(db,'textData')
        const dataDb= await getDoc(valRef)
        const allData=dataDb.docs.map(val=>({...val.data(),id:val.id}))
        setData(allData)
        
      }
      useEffect(()=>{
        getData()
      },[])
  return (
    <div>
      <input onChange={(e)=>setTxt(e.target.value)}/>
      <input type='file' onChange={(e)=>handleUpload(e)} />
      <button onClick={handleClick} >Add</button>

      {
        data.map(value=><div>
          <h1>{value.txtVal}</h1>
        </div>)
      }

    </div>

  )
}

export default Doctors