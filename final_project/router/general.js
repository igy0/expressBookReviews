const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
// import axios from 'axios';
const axios = require('axios');

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) { 
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
        return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(res.send(JSON.stringify(books, null, 4)))
        }, 3000)
    })

    myPromise.then(() => {
        console.log("Book List retrieved");
      })
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const isbn = req.params.isbn;
            resolve(res.send(books[isbn])); 
        }, 3000)
    })

    myPromise.then(() => {
        console.log("Book retrieved from ISBN");
      })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const author = req.params.author;
            const keys = Object.keys(books);
            let bookList = [];
            let i = 0;
            keys.forEach(element => {
                if (books[element].author === author) {
                    bookList[i] = books[element];
                    i++;
                }
            })
            resolve(res.send(bookList));
        }, 3000)
    })

    myPromise.then(() => {
        console.log("Book retrieved from author");
      })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const title = req.params.title;
            const keys = Object.keys(books);
            keys.forEach(element => {
                if (books[element].title === title) {
                resolve(res.send(books[element]));
            }
        })
        }, 3000)
    })

    myPromise.then(() => {
        console.log("Book retrieved from title");
      })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
