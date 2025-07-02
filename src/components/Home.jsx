import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../slice/inventorySlice";
import Table from "react-bootstrap/Table";
import { MdDelete,MdEdit } from "react-icons/md";
import { remove } from "../slice/inventorySlice";
import Card from 'react-bootstrap/Card';
import { IoSearchSharp } from "react-icons/io5";
import Header from "./Header";
import * as Yup from 'yup';

let vali = Yup.object({
    title:Yup.string().required('title must be required...'),
    author:Yup.string().required('author name must be required...'),
    price:Yup.string().required('price must be required...'),
    genre:Yup.string().required('genre must be required...'),
})

function Home() {
  const [cat,setcat] = useState('');
  const [store,setstore] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setedit(null)
    resetForm();
  };
  const handleShow = () => setShow(true);

  const {value} = useSelector((state)=>state.inventory)
  
  const totalbooks = value.length;
  const stock = value.filter((item)=>item.availability === "In Stock").length
  const outstock = value.filter((item)=>item.availability === "Out of Stock").length

  const filterrecord = value.filter((item)=>{
    const rec = store.toLowerCase();

    return ((item.title.toLowerCase().includes(rec) ||
            item.genre.toLowerCase().includes(rec) ||
            item.author.toLowerCase().includes(rec)) && item.genre.includes(cat))
  }) 

  const [edit,setedit] = useState(null)

  const dispatch = useDispatch();

  let init = {
    title:'',
    author:'',
    price:'',
    genre:'',
    availability:''
  }

  

  const {errors,touched,values,handleBlur,handleChange,handleSubmit,resetForm,setValues} = useFormik({
    initialValues:init,
    validationSchema:vali,
    onSubmit:(values)=>{
        if(edit === null){
          dispatch(add(values))
          handleClose()
          resetForm();

        }
        else{
          dispatch(update({edit,value:values}))
          setedit(null)
          handleClose()
          resetForm();
        }
    }

    
  })
  return (
    <>
      <Header onaddclick={handleShow}/>
      <Container className="my-5 ">
        {/* <button type="button" className="btn btn-primary" onClick={handleShow}>
            <FaPlus className="mb-1" /> Add New Book
          </button> */}
        <Row className="my-4">
          <Col lg={4} md={6} sm={12}>
            <Card className="box shadow">
              <Card.Body>
                <Card.Title>Total Books</Card.Title>
                <h1>{totalbooks}</h1>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Card className="box shadow">
              <Card.Body>
                <Card.Title>Total Stock</Card.Title>
                <h1>{stock}</h1>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Card className="box shadow" >
              <Card.Body>
                <Card.Title>Total Out of Stock</Card.Title>
                <h1>{outstock}</h1>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className=" justify-content-between ">
          <Col lg={4} md={6}>
            <Form className="d-flex my-2 mt-4 rounded-2 border border-black">
            <Form.Control
              type="search"
              placeholder="Search Here ..."
              className="me-1 border-0 srch"
              onChange={(e)=>{setstore(e.target.value)}}
            />
            <IoSearchSharp className="fs-4 m-auto me-3"/>
            {/* <Button variant="btn btn-dark" >Search</Button> */}
          </Form>
          </Col>
          <Col lg={3} md={4}>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label className="mb-0 mt-1">Filter Books</Form.Label>
              <Form.Select name="genre" className=" border border-black" onChange={(e)=>{setcat(e.target.value)}}>
                <option value="">All Books</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Science">Science</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

       <div className="overflow-auto text-center">
         <Table striped bordered hover  className="my-3 shadow-sm">
        <thead >
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
                filterrecord.map((val,i)=>{
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{val.title}</td>
                            <td>{val.author}</td>
                            <td>₹{val.price.toLocaleString('en-In')}</td>
                            <td>{val.genre}</td>
                            <td className={val.availability === 'In Stock' ? 'text-success' : 'text-danger'}>{val.availability}</td>
                            <td className="fs-5 "><MdEdit onClick={()=>{setValues(val); setedit(i); handleShow()}} /> <MdDelete onClick={()=>{dispatch(remove(i))}}/></td>
                        </tr>
                    )
                })
            }
        </tbody>
        </Table>
       </div>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >{edit === null ? "Add New Book" : "Edit Book"}</Modal.Title>
        </Modal.Header>
       <Form onSubmit={handleSubmit}>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text"  name="title" value={values.title} onChange={handleChange} onBlur={handleBlur}/>
              {(touched.title && errors.title) ? <small className="text-danger">{errors.title}</small> : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text"   name="author" value={values.author} onChange={handleChange} onBlur={handleBlur}/>
              {(touched.author && errors.author) ? <small className="text-danger">{errors.author}</small> : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number"   name="price" value={values.price} onChange={handleChange} onBlur={handleBlur}/>
              {(touched.price && errors.price) ? <small className="text-danger">{errors.price}</small> : null}
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridState">
              <Form.Label>Genre</Form.Label>
              <Form.Select  name="genre" value={values.genre} onChange={handleChange} onBlur={handleBlur}>
                <option>Choose...</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Science">Science</option>
              </Form.Select>
              {(touched.genre && errors.genre) ? <small className="text-danger">{errors.genre}</small> : null}
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridState">
              <Form.Label>Availability</Form.Label>
              <Form.Select defaultValue="Choose..." name="availability" value={values.availability} onChange={handleChange} onBlur={handleBlur}>
                <option>Choose...</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </Form.Select>
              {(touched.availability && errors.availability) ? <small className="text-danger">{errors.availability}</small> : null}
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <input type="submit" className="btn btn-primary" value={edit === null ? 'Add' : 'Update'}/>
        </Modal.Footer>
    </Form>
      </Modal>
    </>
  );
}

export default Home;
