    import React,{useState} from 'react'
    import { gql,useMutation,useQuery } from "@apollo/client";
    import '../App.css';
    const ADD_BOOK = gql`
  mutation AddBook($name: String!, $authorId: String!) {
    addBook(name: $name, authorId: $authorId) {
      name
      authorId
    }
  }
`;
const DELETE_BOOK = gql`
  mutation deleteBook($name: String) {
    deleteBook(name: $name) {
      name
    }
  }
`;

const GET_BOOKS = gql`
  {
    books {
      name
      authorId
    }
  }
`;
    const Form = () => {
      const [name, setName] = useState('');
      const [authorId, setAuthorId] = useState('');
      const [addBook] = useMutation(ADD_BOOK, {
        update(cache, { data: { addBook } }) {
          const { books } = cache.readQuery({ query: GET_BOOKS });
          cache.writeQuery({
            query: GET_BOOKS,
            data: { books: books.concat([addBook]) },
          });
        },
      });
      const [deleteBook] = useMutation(DELETE_BOOK, {
        update(cache, { data: { deleteBook } }) {
          const { books } = cache.readQuery({ query: GET_BOOKS });
          cache.writeQuery({
            query: GET_BOOKS,
            data: { books: books.filter((book) => book.name !== deleteBook.name) },
          });
        },
      });
      const { loading, error, data,refetch } = useQuery(GET_BOOKS);
      const handleDelete = async (name) => {
        await deleteBook({ variables: { name } });
        refetch();
      };
    return (
        <div className='todo-container'>
          <form onSubmit={async(e)=>{
            e.preventDefault();
            await addBook({ variables: { name, authorId } });
           refetch();
           setAuthorId('');
           setName('');
          }}>  
        <input
        type="text"
        className='todo-input'
        placeholder="book name"
        value={name}
        onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
        className='todo-input'
        type="text"
        value={authorId}
        placeholder="authorid"
        onChange={(e) => {
          setAuthorId(e.target.value);
          }}
  
        />
        <button className='todo-button' type='submit'> Create User</button>
        </form>
        {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <ul className='data'>
          {data.books.map((book) => (
            <li className='list' key={book.authorId}>
              {book.name} by Author ID: {book.authorId}
              <button className='btn' onClick={()=>handleDelete}>Delete</button>
            </li>
          ))}
          
        </ul>
      )}
        </div>

    )
    }

    export default Form