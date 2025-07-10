import React, { useEffect, useState} from "react"
import axios from 'axios'
import bookdata from "../data/Bookdata"
import { Container, Row } from "react-bootstrap"
import BookItem from "../components/BookItem"

const ListPage:React.FC = () => {
  const [books, setBooks] = useState(bookdata)
  const [, setLoaded] = useState(false)

  useEffect(() => {
    axios.get('https://jamsuham75.github.io/image/data2.json').then((result) => {
      const copy = [...books, ...result.data];
      setBooks(copy)
      setLoaded(true)
    })
    .catch(() => {
      console.log('fail')
    })
  }, [])

  return (
    <div>
      <Container>
        <div className="project_header_container">
          <h1 className="project_header">도서 리스트</h1>
          <div className="hr"></div>
        </div>
        <div>
          <Row className="text-center">
            {books.map((item, i) =>(
              <BookItem key={i} book={item}></BookItem>
              // key 추가
            ))}
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default ListPage