import Book from "../Models/book.js";


export const createBook = async (req,res) =>{
    try{
        const {title,author,genre,description,publishedDate,review,ratings} = req.body;
        const userId = req.user._id;

        if(!title || !author || !genre || !description || !publishedDate || !review || !ratings){
           return res.status(400).json({msg: "One or more fields is empty"});
        }
        const newBook = new Book({title,author,genre,description,publishedDate,review,ratings, user: userId});
        await newBook.save();

        console.log(newBook._id);
        res.status(201).json({msg: "Created Book successfully", newBook})

    }catch(error){
        console.log(error)
        res.status(500).json({msg: error.message});
    }
};

export const getAllBooks = async (req,res) =>{
    try{
        const getBooks = await Book.find({});
        if(getBooks.length === 0){
          return  res.status(404).json({msg: "Books not found"});
        }
        
        res.status(200).json({msg: "Success in getting all books", getBooks})

    }catch(error){
        res.status(500).json({msg: error.message});
    }
};

export const getUserBooks = async (req,res) =>{
    try{
        const userId = req.user._id;
        const getBooks = await Book.find({user: userId});
        if(getBooks.length === 0){
          return  res.status(404).json({msg: "Books not found"});
        }
        console.log(userId,getBooks)
        res.status(200).json({msg: "Success in getting all books", getBooks})

    }catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const getSingleBook = async (req,res) =>{
    try{
        const {id} = req.params;
        const userId = req.user._id;
        const findBook = await Book.findOne({_id: id, user: userId});
        if(!findBook){
           return res.status(400).json({msg: "Could not find book"});
        }
        res.status(200).json({msg: "Success in getting single book", book: findBook})
    }catch(error){
        res.status(500).json({msg: error.message})
    }
};

export const updateBook = async (req,res) =>{
    try{
        
        const {id} = req.params;
        const userId = req.user._id;
        const changeBook = await Book.findByIdAndUpdate({_id: id, user: userId}, req.body, {new: true});
        if(!changeBook){
           return res.status(404).json({msg: "Could not update book", ok: false});
        }
        res.status(200).json({msg: "Success in updating book",ok: true, changeBook})

    }catch(error){
        res.status(500).json({msg: error.message})
    }
}

export const deleteBook = async (req,res) =>{
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({msg: "No book to delete", ok: false})
        }
        res.status(200).json({msg: "Success in deleting book", ok: true});

    }catch(error){
        res.status(500).json({msg: error.message})
    }
};

