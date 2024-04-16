import React,{useState,useEffect} from 'react'
import Image from "next/image";
import { db } from "../firebaseConfig";
import {collection,addDoc,getDocs,deleteDoc,serverTimestamp,query,orderBy,doc,updateDoc, QuerySnapshot} from "firebase/firestore"
import { Input } from '@/components/ui/input';

async function addTodoTofirebase(title,details,dueDate){
  try {
    const docRef=await addDoc(collection(db,"todos"),{
      title:title,
      details:details,
      dueDate:dueDate,
      createdAt:serverTimestamp(),
    })
    console.log(`Todos added to firebase: ${docRef.id}`)
    return true;
  } catch (error) {
    console.error(`todos adding ${error}`);
    return false;
  }
}

// function to fetch todos from fireStore

async function fetchTodosfromFirestore(){
  const todoCollection=collection(db,"todos");
  const querySnapshot=await getDocs(query(todoCollection,orderBy("createdAt","desc")));
  const todos = [];
  querySnapshot.forEach((doc)=>{
    const todoData = doc.data();
    todos.push({id:doc.id,...todoData});
  })
  return todos;
}

//delte todos
async function deleteTodoFromFirestore(todoId){
  try {
    console.log("Attempting to delete todo with Is:",todoId);
    await deleteDoc(doc(db,"todos",todoId));
    return todoId;
  } catch (error) {
    console.error("Error deleting todo: ",error);
    return null;
  }
}

function Doctors() {
    const [title,setTitle] = useState("");
    const [details,setDetails] = useState("");
    const [dueDate,setDueDate] = useState("");


    //State to hold the list of todos
    const [todos,setTodos] = useState([]);


    //State to hold the selected todo for update 
    const [selectedTodo,setSelectedTodo] = useState(null);

    //state to track whether the form is in update mode 
    const [isUpdateMode,setIsUpdateMode] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(isUpdateMode){
            try {
                const updatedTodo ={
                    title,
                    details,
                    dueDate,
                }

                const todoRef = doc(db,"todos",selectedTodo.id);
                await updateDoc(todoRef,updatedTodo);

                //reset the form fileds
                setTitle("");
                setDetails("");
                setDueDate("");
                setSelectedTodo(null);
                setIsUpdateMode(false);

                alert("Todo Updated Successfully")

            } catch (error) {
                console.error("Error updating todo :",error)
            }
        }else{
            const added = await addTodoTofirebase(title,details,dueDate);
            if(added){
                setTitle("");
                setDetails("");
                setDueDate("");

                alert("Todo added to fireStore Successfully!!");

            }

        }
    };

    //fetch todos from firestore on component mount 

    useEffect(()=>{
        async function fetchTodos(){
            const todos=await fetchTodosfromFirestore();
            setTodos(todos);
        }
        fetchTodos();

    },[]);

    //function to handle "update Button click "
    const handleUpdateClick = (todo)=>{
        // set the selected todos value to the from fileds 
        setTitle(todo.title || "")
        setDetails(todo.details || "");
        setDueDate(todo.dueDate || "");

        setSelectedTodo(todo);
        setIsUpdateMode(true);
    }

    //fetch todos from firestore on component mount 

    useEffect(()=>{
        async function fetchTodos(){
            const todos = await fetchTodosfromFirestore();
            setTodos(todos);
        }
        fetchTodos();
    },[]);
  return (
    <main className='flex flex-1 items-center justify-center flex-col md:flex-row min-h-screen ' >
        {/* Left Section */}
        <section className='flex flex-1 md:flex-col items-center md:justify-start mx-auto'>
            {/*Logo */}
            <div className='absolute top-4 left-4'>

            </div>

            {/* TodoForm */}

            <div className='p-6 md:p-12 mt-10 rounded-lg shadow-xl w-full max-w-lg bg-white'>
                <h1 className='text-center text-2xl font-bold leading-9 text-gray-900'>
                    {isUpdateMode ? "Update Your Todo": "Create A Todo"}
                </h1>
                <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-600'>Todos</label>
                        <div className='mt-2'>
                            <Input id="title" name="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className='w-full rounded border py-2 text-gray-900 shadow ring' />

                        </div>
                    </div>
                    <div>
                        <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-600'>Todos</label>
                        <div className='mt-2'>
                            <Input id="title" name="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className='w-full rounded border py-2 text-gray-900 shadow ring' />

                        </div>
                    </div>
                </form>

            </div>
        </section>
    </main>
  )
}

export default Doctors