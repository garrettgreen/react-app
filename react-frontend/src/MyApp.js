// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([
    ]); 

    async function makePostCall(person) {
      try {
        const response = await axios.post('http://localhost:8000/users', person);
  
        if (response.status === 201) {
          const newUserWithId = response.data; // Get updated representation from response (task 3)
          setCharacters([...characters, newUserWithId]); // Update the state
        }
  
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    useEffect(() => {
      fetchAll().then( result => {
         if (result)
            setCharacters(result);
       });
   }, [] );

    async function fetchAll(){
      try {
         const response = await axios.get('http://localhost:8000/users');
         return response.data.users_list;     
      }
      catch (error){
         //We're not handling errors. Just logging into the console.
         console.log(error); 
         return false;         
      }
   }

   function removeOneCharacter(index) {
      const userToDelete = characters[index];
      // axios delte request to backend
      axios
        .delete(`http://localhost:8000/users/${userToDelete.id}`)
        .then((response) => {
          if (response.status === 204) {
            // User deleted successfully in backend, update frontend (task 4)
            const updatedCharacters = [...characters];
            updatedCharacters.splice(index, 1);
            setCharacters(updatedCharacters);
          } else if (response.status === 404) {
            // User not found in the backend, handle as needed (show an error message, etc.)
            console.log('User not found in the backend.');
          }
        })
        .catch((error) => {
          // Handle network or other errors here
          console.log(error);
        });
    }

    function updateList (person) { 
      makePostCall(person).then( result => {
      if (result && result.status === 200)
        setCharacters([...characters, person] );
      });
 }
    
  return (
	<div className="container">
	    <Table characterData={characters}
            removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList}/>
     </div>
  ) 
}

export default MyApp;



