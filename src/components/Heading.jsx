import React from "react";
import PropTypes from "prop-types";

function Heading(props) {
  return <h1 className="text-uppercase">{props.title}</h1>;
}

export default Heading;

Heading.propTypes = {
  title: PropTypes.string,
};
