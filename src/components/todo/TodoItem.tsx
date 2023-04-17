import { FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { collection, getDocs,updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const styles = {
    // last:border-0 for li element
    li: 'flex justify-between items-center border-b-2 rounded border-gray-900 p-4 mb-2 capitalize duration-500',
    liCompleted: 'flex justify-between items-center bg-westar-400 rounded border-b-2 border-gray-900 p-4 mb-2 capitalize duration-500',
    row: 'flex items-center gap-2',
    text: 'text-2xl ml-2 cursor-pointer',
    textCompleted: 'text-2xl ml-2 cursor-pointer line-through',
    deleteBtn: 'bg-white border-2 border-black rounded-lg p-2',
}


interface TodoitemProps {

    todo: {
        text: string;
        completed: boolean;
    }

    index: number;


}


export default function Todoitem({ todo, index }: TodoitemProps) {


    const [checked, setChecked] = useState(false)

    const handelChecked = () => {
        

        //update completed to local state
        todo.completed = !todo.completed
        

        //update completed to firebase
        const updateCompleted = async (index: number) => {
            const q = collection(db, "todos");
            const querySnapshot = await getDocs(q);
            const docId = querySnapshot.docs[index].id;
            await updateDoc(doc(db, "todos", docId), {
                completed: todo.completed,
            });
        }
        setChecked(todo.completed)
        updateCompleted(index)

    }


    const handleDeleteItemClick = () => {

        const deleteItem = async (index: number) => {

            const q = collection(db, "todos");
            const querySnapshot = await getDocs(q);
            const docId = querySnapshot.docs[index].id;
            await deleteDoc(doc(db, "todos", docId));
        };
        deleteItem(index)
    }


    return (
        <li className={todo.completed ? styles.liCompleted : styles.li}>
            <div className={styles.row}>
                <input onClick={handelChecked} checked={todo.completed} type='checkbox' placeholder='checkbox' onChange={() => setChecked(todo.completed)} />
                <p className={todo.completed ? styles.textCompleted : styles.text}>
                    {todo.text}
                </p>
            </div>
            <button onClick={handleDeleteItemClick} className={styles.deleteBtn} title='FiTrash' type='button'>
                <FiTrash2 />
            </button>
        </li>

    )
}
