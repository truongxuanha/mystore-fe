import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function SearchProduct() {
  return (
    <form className='flex items-center border rounded-md'>
      <input
        type='search'
        placeholder='Tìm kiếm...'
        className='p-2 outline-none rounded-sm'
      />

      <FontAwesomeIcon icon={faMagnifyingGlass} className='p-2' />
    </form>
  )
}

export default SearchProduct
