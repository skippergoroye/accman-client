function EditCash(props) {
  return (
    <>
      <>
        {new Intl.NumberFormat("en-US").format(
          props.amount ? parseFloat(props.amount) : 0.0
        )}{" "}
      </>
    </>
  );
}

export default EditCash;
