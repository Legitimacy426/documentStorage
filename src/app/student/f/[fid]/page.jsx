"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jeUlCAX2V3h
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon, DownloadIcon, FileEditIcon, FileIcon, FolderIcon, PlusIcon, SearchIcon, TrashIcon } from "@/components/Icons"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { useState,useEffect } from "react"
import { app, auth, db } from "@/libs/firebaseConfig"
import { addDoc, collection, serverTimestamp,doc,deleteDoc } from "firebase/firestore"
import useFetchAll from "@/hooks/useFetchAll"
import SearchableSelect from "@/components/SearchableSelect"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import { uuid} from 'uuidv4';
import { useRouter } from "next/navigation"
import { authenticate, useAuthenticate } from "@/libs/useAth"
import { signOut } from "firebase/auth"
import Errors from "@/components/Errors"
import Swal from "sweetalert2"
const storage = getStorage(app)

export default function Component({params}) {
  // useAuthenticate()
// hooks=============================

const {cards,isPendingC,isErrorC} = useFetchAll('documents',params.fid)
console.log(cards)
// states ==============================
const router = useRouter()
const v4 = uuid()
const [selectedOption, setSelectedOption] = useState(null);
const [folderName,setFolder] = useState('')
const [files, setFiles] = useState([]);
const [progress, setProgress] = useState({});
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);



  // functions===========================
  const handleLogout = () =>{
    signOut(auth).then(() => {
      localStorage.clear();
      router.push('../')
    }).catch((error) => {
      alert("something went wrong")
    });
    
  }
  const handleDelete = (id) => {
    
    const docRef = doc(db, 'documents', id)
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
  
  
  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = (e) => {
    e.preventDefault()
   try {
    files.forEach((file) => {
      const storageRef = ref(storage, `${params.fid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressValue = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: progressValue,
          }));
        },
        (error) => {
          setError(error.message);
        },
        () => {
        
           getDownloadURL(ref(storage, `${params.fid}/${file.name}`))
            .then((url) => {
              // successs================
              const document = {
                label:params.fid + file.name,
                folderName:params.fid,
                createdAt: serverTimestamp(),
                url
            }
            const depoRef = collection(db, "documents")
            addDoc(depoRef, document).then(() => {
            setSuccess("documents Uploaded")
              
            }).catch((e) => {
               alert("error uploading document")
               console.log(e.message)
            })
              console.log('File available at: ', url);
            });
        }
      );
    });
    
   } catch (error) {
    setError(error.message);
   }
  };

  const handlesearch = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption.id)
   
    // navigate here
    router.push(`${selectedOption.url}`)

  };

 
  
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
      <div className="flex-1 px-2 mx-2"><h2>DocSTORE</h2></div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
         
          <li>
          <Link className="flex items-center gap-2 font-medium rounded-md p-3" href="/admin/dashboard">
                  <FolderIcon className="w-4 h-4" />
                  <span className="peer">Folders</span>
          </Link>
          </li>
{/*        
        <li>
        <Button onClick={handleLogout} className="w-full">Logout</Button>
        </li> */}
        </ul>
      </div>
    </div>
    {/* Page content here */}
    <div className="flex-1 flex flex-col min-h-0">
          <header className="flex items-center gap-4 p-4 border-b min-h-0">
            <Link  href="/student/dashboard" className="rounded-full md:hidden" size="icon" variant="ghost">
              
              <ChevronLeftIcon className="w-6 h-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Link>
            <h1 className="text-lg font-semibold">{params.fid}</h1>
            <form className="flex items-center gap-2 ml-auto">
              <SearchIcon className="w-4 h-4 text-gray-500" />
              <SearchableSelect
            
          tag={'documents'}
          fil={params.fid}
           value={selectedOption}
           onChange={handlesearch}
           placeholder={selectedOption}
          
      />
            </form>
          </header>
          <div className="flex-1 overflow-auto p-4 min-h-0">
          
            <Table key="1" className="min-w-[300px] w-full">
     
      <TableBody className="text-xs">
      {cards.map(card =>(
          <TableRow key={card.id} className="hover:translate-y-0.5 hover:shadow-md transition-all">
          <TableCell className="font-medium"><FileIcon  className="w-5 h-6 text-gray-500" /></TableCell>
          <TableCell className="font-medium"><Link href={card.url} target="_blank" >{card.label}</Link></TableCell>
        
          
          <TableCell className="flex justify-end gap-2">
           <Link href={card.url} target="_blank" >
           <Button size="icon" variant="ghost">
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
           </Link>
        
          
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
    <Errors data={cards} loading={isPendingC} error={isErrorC} />

          
          </div>
        </div>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
     
        <li>
        <Link className="flex items-center gap-2 font-medium rounded-md p-3"  href="/student/dashboard">
                  <FolderIcon className="w-4 h-4" />
                  <span className="peer">Folders</span>
          </Link>
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
<label htmlFor="">New document</label>
            <input className="file-input file-input-bordered w-full "  onChange={handleChange} multiple required type="file" />
  </div>
  <div className="space-y-2 my-2">
  <Button className="w-full" onClick={(e)=>{handleUpload(e)}}>Upload file</Button>
  </div>
  {Object.keys(progress).map((fileName) => (
        <div key={fileName}>
          <small>{fileName}: {progress[fileName]}%</small>
        </div>
      ))}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
 </form>


  </div>
</dialog>
    </>
  
  )
}







