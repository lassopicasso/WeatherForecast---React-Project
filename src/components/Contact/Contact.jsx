import React from "react";
import Heading from "../Heading";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name").min(3, "Your name must be at least 3 characters long."),
  age: yup.number().typeError("Please enter your age, only numbers").min(10, "You have to be at least 10 years old").max(20, "You can't be older than 20 years old"),
  url: yup
    .string()
    .required("Please enter the url of the website")
    .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, "The url is not valid"),
});

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log("Data submitted: " + data);
  }

  return (
    <Container className="contact__container">
      <Heading title="Contact" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label className="font-weight-bold text-color">Name</Form.Label>
          <Form.Control {...register("name")} type="text" placeholder="Name" className="shadow mb-1 bg-white rounded" />
          {errors.name && <span className="error-input">{errors.name.message}</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control {...register("age")} type="number" placeholder="Enter age" className="shadow mb-1 bg-white rounded" />
          {errors.age && <span className="error-input">{errors.age.message}</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <div className="form__url-input">
            <span className="input-group-text shadow bg-white rounded " id="basic-addon3">
              https://
            </span>
            <Form.Control {...register("url")} type="text" placeholder="example.com" className="shadow bg-white rounded " />
          </div>
          {errors.url && <span className="error-input">{errors.url.message}</span>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
