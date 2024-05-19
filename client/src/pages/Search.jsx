import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
         <form className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap' >Search Term:</label>
                <input type='text' placeholder='Search...' id='searchTerm'
                className='border w-full p-3 rounded-lg' />
            </div>
            <div className='flex flex-wrap items-center gap-2'>
                <label className='font-semibold' >Type:</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='all' className='w-5' />
                    <span>Rent & Sale</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5' />
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5' />
                    <span>Sale</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offers' className='w-5' />
                    <span>Offers</span>
                </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5' />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5' />
              <span>Furnished</span>
            </div>
          </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>
                    Sort:
                </label>
                <select id='sort_order' className='border p-3 rounded-md'>
                    <option>Price high to low</option>
                    <option>Price low to high</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                </select>
            </div>
            <button className='bg-gray-700 rounded-md p-3 text-white hover:opacity-90'>
                Search
            </button>
         </form>
        </div>

        <div>
            <h1 className='text-3xl font-semibold p-3 border-b mt-7'>Listings:</h1>
        </div>
    </div>
  )
}

export default Search;