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
import { ChevronRightIcon, ChevronsRightIcon, DownloadIcon, FileEditIcon, FileIcon, FolderIcon, PlusIcon, SearchIcon, TrashIcon } from "@/components/Icons"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { app, db } from "@/libs/firebaseConfig"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import useFetchAll from "@/hooks/useFetchAll"
import SearchableSelect from "@/components/SearchableSelect"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import { uuid} from 'uuidv4';
const storage = getStorage(app)

export default function Component({params}) {
 
// hooks=============================

const {cards,isPendingC,isErrorC} = useFetchAll('documents',params.fid)
console.log(cards)
// states ==============================
const v4 = uuid()
const [selectedOption, setSelectedOption] = useState(null);
const [folderName,setFolder] = useState('')
const [files, setFiles] = useState([]);
const [progress, setProgress] = useState({});
const [error, setError] = useState(null);



  // functions===========================
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
             setError("success")
              
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
    router.push(`${domainp}/${tag}/${selectedOption.id}`)

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
      <div className="flex-1 px-2 mx-2">Navbar Title</div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          <li>
          <Link className="flex items-center gap-2 font-medium rounded-md p-3" href="/clients">
                  <FolderIcon className="w-4 h-4" />
                  <span className="peer">My Documents</span>
          </Link>
          </li>
          <li>
          <Link className="flex items-center gap-2 font-medium rounded-md p-3" href="/clients">
                  <FolderIcon className="w-4 h-4" />
                  <span className="peer">My Documents</span>
          </Link>
          </li>
         <li>
         <Button className="w-full" variant="outline" onClick={()=>document.getElementById('my_modal_3').showModal()} >
              <PlusIcon className="w-4 h-4 mr-2" />
              New File
          </Button>
         </li>
        </ul>
      </div>
    </div>
    {/* Page content here */}
    <div className="flex-1 flex flex-col min-h-0">
          <header className="flex items-center gap-4 p-4 border-b min-h-0">
            <Button className="rounded-full md:hidden" size="icon" variant="ghost">
              <ChevronRightIcon className="w-6 h-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <h1 className="text-lg font-semibold">{params.fid}</h1>
            <form className="flex items-center gap-2 ml-auto">
              <SearchIcon className="w-4 h-4 text-gray-500" />
              <SearchableSelect
          tag={'folders'}
           value={selectedOption}
           onChange={handlesearch}
           placeholder={selectedOption}
          
      />
            </form>
          </header>
          <div className="flex-1 overflow-auto p-4 min-h-0">
          
            <Table key="1" className="min-w-[300px] w-full">
     
      <TableBody className="text-xs">
        <TableRow className="hover:translate-y-0.5 hover:shadow-md transition-all">
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>$250.00</TableCell>
          <TableCell className="flex justify-end gap-2">
            <Button size="icon" variant="ghost">
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
            <Button size="icon" variant="ghost">
              <ChevronsRightIcon className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow className="hover:translate-y-0.5 hover:shadow-md transition-all">
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>$150.00</TableCell>
          <TableCell className="flex justify-end gap-2">
            <Button size="icon" variant="ghost">
              <FileEditIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
            <Button size="icon" variant="ghost">
              <ChevronsRightIcon className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow className="hover:translate-y-0.5 hover:shadow-md transition-all">
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>$350.00</TableCell>
          <TableCell className="flex justify-end gap-2">
            <Button size="icon" variant="ghost">
              <FileEditIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
            <Button size="icon" variant="ghost">
              <ChevronsRightIcon className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow className="hover:translate-y-0.5 hover:shadow-md transition-all">
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>$450.00</TableCell>
          <TableCell className="flex justify-end gap-2">
            <Button size="icon" variant="ghost">
              <FileEditIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
            <Button size="icon" variant="ghost">
              <ChevronsRightIcon className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow className="hover:translate-y-0.5 hover:shadow-md transition-all">
          <TableCell className="font-medium">INV005</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>$550.00</TableCell>
          <TableCell className="flex justify-end gap-2">
            <Button size="icon" variant="ghost">
              <FileEditIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
            <Button size="icon" variant="ghost">
              <ChevronsRightIcon className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
 

          
          </div>
        </div>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
      <li>
      <Link className="flex items-center gap-2 font-medium rounded-md p-3" href="/clients">
                  <FolderIcon className="w-4 h-4" />
                  <span className="peer">My Documents</span>
          </Link>
      </li>
        <li>
        <Link className="flex items-center gap-2 font-medium rounded-md p-3" href="/clients">
                  <FolderIcon className="w-4 h-4" />
                  <span className="peer">Folders</span>
          </Link>
        </li>
        <li>
         <Button className="w-full" variant="outline" onClick={()=>document.getElementById('my_modal_3').showModal()} >
              <PlusIcon className="w-4 h-4 mr-2" />
              New File
          </Button>
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
            <input className="file-input file-input-bordered w-full "  id="folder"  onChange={handleChange} multiple required type="file" />
  </div>
  <div className="space-y-2 my-2">
  <Button className="w-full" onClick={(e)=>{handleUpload(e)}}>Upload file</Button>
  </div>
  {Object.keys(progress).map((fileName) => (
        <div key={fileName}>
          {fileName}: {progress[fileName]}%
        </div>
      ))}
      {error && <div style={{ color: 'red' }}>{error}</div>}
 </form>


  </div>
</dialog>
    </>
  
  )
}







