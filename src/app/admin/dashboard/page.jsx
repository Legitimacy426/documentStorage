"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jeUlCAX2V3h
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { ChevronRightIcon, FileIcon, FolderIcon, PlusIcon, SearchIcon, TrashIcon } from "@/components/Icons"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { auth, db } from "@/libs/firebaseConfig"
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore"
import useFetchAll from "@/hooks/useFetchAll"
import SearchableSelect from "@/components/SearchableSelect"
import { useRouter } from "next/navigation"
import { authenticate, useAuthenticate } from "@/libs/useAth"
import { signOut } from "firebase/auth"
import Errors from "@/components/Errors"
import Swal from "sweetalert2"

export default function Component() {

//  useAuthenticate()
// hooks=============================




 
   

const {cards,isPendingC,isErrorC} = useFetchAll('folders',undefined)

// states ==============================
const router = useRouter()
const [selectedOption, setSelectedOption] = useState(null);
const [folderName,setFolder] = useState('')

  // functions===========================

  const handleLogout = () =>{
    signOut(auth).then(() => {
      localStorage.clear();
      router.push('../')
    }).catch((error) => {
      alert("something went wrong")
    });
    
  }
  const handlesearch = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption.id)
   
    // navigate here
    router.push(`/admin/f/${selectedOption.folderName}`)

  };  const handleDelete = (id) => {
    
    const docRef = doc(db, 'folders', id)
    deleteDoc(docRef).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Deleted successifully',
        icon: 'success',
        confirmButtonText: 'close'
      })
     
  }).catch(e => {
      
      Swal.fire({
        title: 'Error!',
        text: `${e.message}`,
        icon: 'error',
        confirmButtonText: 'Close'
      })
     
  })
  }

  const handleNewFolder = (e)=>{
    e.preventDefault()
    if(folderName == ""){
      Swal.fire({
        title: 'Error!',
        text: `A folder name is required`,
        icon: 'error',
        confirmButtonText: 'Close'
      })
      return
    }
    const str = folderName.replace(/\s+/g, '-').toUpperCase()
    const document = {
      label:folderName,
      folderName:str,
      createdAt: serverTimestamp()
  }
  const depoRef = collection(db, "folders")
  addDoc(depoRef, document).then(() => {
    Swal.fire({
      title: 'Success!',
      text: ' Folder created successifully',
      icon: 'success',
      confirmButtonText: 'close'
    })
    
  }).catch((e) => {
    Swal.fire({
      title: 'Error!',
      text: `${e.message}`,
      icon: 'error',
      confirmButtonText: 'Close'
    })
    
     console.log(e.message)
  })
} 
  
  return (
    <>
<div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="w-full navbar bg-base-300">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2">DocSTORE</div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
    
         
          
         
     
        <li>
        <Button className="w-full" variant="outline" onClick={()=>document.getElementById('my_modal_3').showModal()} >
              <PlusIcon className="w-4 h-4 mr-2" />
              New Folder
          </Button> 
        </li>
      
         <li>
        <Button onClick={handleLogout} className="w-full">Logout</Button>
        </li>
        </ul>
      </div>
    </div>
    {/* Page content here */}
    <div className="flex-1 flex flex-col min-h-0">
          <header className="flex items-center gap-4 p-4 border-b min-h-0">
          
            <h1 className="text-lg font-semibold">Folders</h1>
            <form className="flex items-center gap-2 ml-auto">
              <SearchIcon className="w-4 h-4 text-gray-500" />
              <SearchableSelect
          tag={'folders'}
          fil={undefined}
           value={selectedOption}
           onChange={handlesearch}
           placeholder={selectedOption}
          
      />
            </form>
          </header>
          <div className="flex-1 overflow-auto p-4 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
             {cards?.map(card =>(
               <Card key={card.id} className="relative">
               <Link className=" inset-0 relative" href={`./f/${card.folderName}`} >
               <CardContent className="flex flex-col items-center justify-center p-8 relative">
                 <FolderIcon className="w-12 h-12 text-gray-500" />
                 <span className="text-sm font-medium mt-2 peer">{card.folderName}</span>
              
               </CardContent>
               </Link>
             
                    <TrashIcon className="absolute top-2 right-2  w-4 h-4 text-red-500 hover:opacity-100 transition-opacity focus:outline-none" onClick={()=>{handleDelete(card.id)}}/>
              
             </Card>
             ))}
             
            </div>
            <Errors data={cards} loading={isPendingC} error={isErrorC} />
          </div>
        </div>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
   
     
        
  
    <li>
        <Button className="w-full" variant="outline" onClick={()=>document.getElementById('my_modal_3').showModal()} >
              <PlusIcon className="w-4 h-4 mr-2" />
              New Folder
          </Button> 
        </li>
         <li>
        <Button onClick={handleLogout} className="w-full">Logout</Button>
        </li>
    </ul>
  </div>
</div>
    


    {/* modals */}

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}

      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
 <form action="">
 <div className="space-y-2">
            <Label htmlFor="email">Folder name</Label>
            <Input value={folderName} id="folder" placeholder="Enter folder name" onChange={(e)=>{setFolder(e.target.value)}} required type="text" />
  </div>
  <div className="space-y-2 my-2">
  <Button className="w-full" onClick={(e)=>{handleNewFolder(e)}}>Create folder</Button>
  </div>
 </form>


  </div>
</dialog>
    </>
  
  )
}







