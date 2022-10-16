export default (name, value) =>
  name === "email" && value !== "" && !isNaN(+value);
