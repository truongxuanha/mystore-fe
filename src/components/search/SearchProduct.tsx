import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchProduct() {
  return (
    <form className='flex items-center border rounded-md'>
      <input
        type='search'
        placeholder='Tìm kiếm...'
        className='p-2 outline-none rounded-sm'
      />

      <MagnifyingGlassIcon arria-hidden='true' className='w-6 h-6' />
    </form>
  );
}

export default SearchProduct;
