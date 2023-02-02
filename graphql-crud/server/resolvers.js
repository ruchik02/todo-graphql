const books=[];
const resolvers={
    Query:{
        books:()=>books,
    },
    Mutation:{
        addBook: (_, { name, authorId }) => {
            const book = { name, authorId };
            books.push(book);
            return book;
          },
        //   deleteBook: (_, { name}) => {
        //     const index = books.findIndex(book => book.name === name);
        //     if (index !== -1) {
        //       const deletedBook = books.splice(index, 1);
        //       return deletedBook[0];
        //     }
        //   },
          deleteBook: (_, args) => {
            const index = books.findIndex((book) => book.name === args.name);
            if (index !== -1) {
              const deletedBook = books[index];
              books.splice(index, 1);
              return deletedBook;
            }
            return null;
          },
    }
}
export default resolvers;