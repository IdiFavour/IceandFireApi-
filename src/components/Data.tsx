import React, { useState, useEffect } from 'react'
import { BooksApi } from '../logic/api/book.api'
import { Book } from '../logic/interfaces/book.interface'
interface DataProps {
    query: string
}
function Data({ query }: DataProps) {
    const [books, setBooks] = useState<Book[]>()

    useEffect(() => {
        new BooksApi().search(query).then((val) => {
            setBooks(val)
        })
    }, [query])

    return (

        <div className="container mt-5">
            <div className="row">
                {
                    books?.map((book, i) => (
                        <div className="col-md-4 mb-3" key={i}>
                            <div className="card p-3">
                                <div className="d-flex flex-row mb-3">
                                    <div className="d-flex flex-column ml-2">
                                        <span className="h5">{book.name}</span>
                                        <span className="text-black-50">By {book.authors}</span>
                                    </div>
                                </div>
                                <h6>Published by: {book.publisher}</h6>
                                <div className="d-flex justify-content-between install mt-3">
                                    <small className="text-black-50 ">ISBN {book.isbn}</small>
                                    <span>{book.released.slice(0, -9)}</span>
                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>


        </div>


    )
}

export default Data