import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { MdDelete,MdEdit } from "react-icons/md";
import { remove } from "../slice/inventorySlice";
function Details() {

    const data = useSelector((state)=>state.inventory.value)
    const dispatch = useDispatch()

    
  return (
    <>
      <Container className="overflow-auto my-2 p-0 text-center">
        <Table striped bordered hover >
        <thead>
            <tr>
                <th>SR No.</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Genre</th>
                <th>Availability</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            {
                data.map((val,i)=>{
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{val.title}</td>
                            <td>{val.author}</td>
                            <td>₹ {val.price.toLocaleString('en-In')}</td>
                            <td>{val.genre}</td>
                            <td className={val.availability === 'In Stock' ? 'text-success' : 'text-danger'}>{val.availability}</td>
                            <td className="fs-5 "><MdEdit /> <MdDelete onClick={()=>{dispatch(remove(i))}}/></td>
                        </tr>
                    )
                })
            }
        </tbody>
      </Table>
      </Container>
    </>
  );
}

export default Details;
