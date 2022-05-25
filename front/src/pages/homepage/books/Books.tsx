import { Row } from "react-bootstrap";
import { Book } from "./book/Book";
import { useAppSelector } from "../../../redux/hooks";
import { Book as BookInterface } from "../../../redux/features/books/booksSlice";

const Books = () => {
  const { books } = useAppSelector((state) => state.books);

  return (
    <Row className="pt-4 justify-content-md-start justify-content-center">
      {books?.map((book: BookInterface) => {
        return <Book key={book.id} {...book} />;
      })}
    </Row>
  );
};

export default Books;
