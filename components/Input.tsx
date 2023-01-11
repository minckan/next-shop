function Input({ type, required, value, onChange }) {
  return (
    <input
      type={type}
      required={required}
      value={value}
      className="border rounded px-3 py-1 w-80"
      onChange={onChange}
    ></input>
  );
}

export default Input;
