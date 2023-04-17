import TodoItem from './TodoItem'
import { GrFormAdd } from 'react-icons/gr'
import React, { useState, useEffect } from 'react'
import { db } from '../../lib/firebase'
import { query, collection, getDocs, updateDoc, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore";

const styles = {
    bg: 'mx-auto mt-4 p-2 justify-center max-w-[50ch] ',
    container: 'bg-westar-100 w-full m-auto rounded-lg border-4 border-black p-4',
    form: 'flex justify-bewteen justify-center gap-2',
    input: 'w-full border-2 border-black rounded-lg p-2 text-2xl',
    addBtn: 'bg-white border-2 border-black rounded-lg p-2',
    addBtnIcon: 'hover:rotate-90 active:rotate-180 transition duration-500',
    count: 'text-center pt-4'
}


interface TodoProps {
    id: string;
    text: string;
    completed: boolean;
}

export default function Todo() {

    const [todos, setTodos] = useState([] as TodoProps[]);
    const [input, setInput] = useState('')

    useEffect(() => {
        //get path /todos from firebase 
        const q = query(collection(db, "todos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todos = [] as TodoProps[];
            querySnapshot.forEach((doc) => {
                todos.push({ text: doc.data().text, completed: doc.data().completed, id: doc.id });
            });
            setTodos(todos);
        });
        return unsubscribe;
    }, [])

    // const handleDeleteItemClick = async (index: number) => {
    //     // Remove the item from the local state by creating a new array without the item
    //     const updatedTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    //     setTodos(updatedTodos);

    //     // Remove the item from the Firestore database by querying for the document ID
    //     const querySnapshot = await getDocs(collection(db, "todos"));
    //     const docId = querySnapshot.docs[index].id;
    //     await deleteDoc(doc(db, "todos", docId));

    // };
    //Update todo in firebase





    const handleAddItemClick = async () => {

        if (!input) {
            return;
        }

        await addDoc(collection(db, "todos"), { text: input, completed: false })
        // setTodos([...todos, { text: input, completed: false, id: todos.length.toString() }])
    }

    //delete todo  

    // const [todos, setTodos] = useState([]);

    return (
        <div className={styles.bg}  >
            <div className={styles.container}>
                <form className={styles.form}>
                    <input className={styles.input} type='text' placeholder='todo' value={input} onChange={(e) => setInput(e.target.value)}></input>
                    <button onClick={handleAddItemClick} className={styles.addBtn} title='add' type='button' ><GrFormAdd className={styles.addBtnIcon} size={40} /></button>
                </form>
                <ul>
                    {todos.map((todo, index) => (
                        <TodoItem key={index} todo={todo} index={index} />
                    ))}
                </ul>

                <p className={styles.count}>You have {todos.length} todos</p>

            </div>
        </div>
    )
}
