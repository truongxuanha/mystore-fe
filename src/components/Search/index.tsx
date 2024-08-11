import Input from "../Input";

function Search() {
  function onChange() {}
  return (
    <Input
      placeholder='Search'
      type='search'
      className={`input-global`}
      value=''
      onChange={onChange}
    />
  );
}

export default Search;
