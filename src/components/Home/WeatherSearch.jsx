import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  city: yup.string().required("Please enter a city"),
  // .matches(/^[aA-zZ\s]+$/, "Only letters A-Z are allowed"),
});

function WeatherSearch(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="form__search-city d-inline-flex">
        <Form.Group className="mb-3">
          <Form.Control {...register("city")} type="text" placeholder="City" className="me-2" />
          {errors.city && <span className="error-input">{errors.city.message}</span>}
        </Form.Group>
        <Button variant="primary" className="h-50" type="submit">
          {props.searching ? "Searching.." : "Search"}
        </Button>
      </div>
    </Form>
  );
}

export default WeatherSearch;
