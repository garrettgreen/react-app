// backend.js
import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

// to get users by name and job
app.get('/users', (req, res) => {
    const { name, job } = req.query;

    // Filter users list
    const filteredUsers = users['users_list'].filter((user) => {
        return (!name || user['name'] === name) && (!job || user['job'] === job);
    });

    if (filteredUsers.length === 0) {
        // No users found, return a 404 
        res.status(404).send('No matching users found.');
    } else {
        // Respond with the filtered users
        res.send({ users_list: filteredUsers });
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];

    // Find the index of user
    const index = users['users_list'].findIndex((user) => user['id'] === id);

    if (index === -1) {
        // return a 404 status if user not found
        res.status(404).send('Resource not found.');
    } else {
        // Remove user from the array 
        users['users_list'].splice(index, 1);
        res.status(204).end(); // Respond with a 204 status (No Content) for successful deletion
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).end();
});

function addUser(user){
    users['users_list'].push(user);
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      