import React from 'react'

export default function AddListing() {
  return (  
    <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl text-center my-4 font-semibold'>Add a Listing</h1>
        <form className="flex flex-col  sm:flex-row gap-4">
       <div className='flex flex-col gap-4 flex-1'>
        <input type="text" placeholder='Name' className='border p-3 rounded-md' id='name' maxLength='60' minLength='10' required />
        <textarea type="text" placeholder='Description' className='border p-3 rounded-md' id='description' required  />
        <input type="text" placeholder='Address' className='border p-3 rounded-md' id='address' required  />
        <div className='flex gap-6 flex-wrap'>
          <div className='flex gap-2'>
            <input type='checkbox' id="sell" className='w-5'  />
            <span>Sell</span>
          </div>
         
          <div className='flex gap-2'>
            <input type='checkbox' id="rent" className='w-5' />
            <span>Rent</span>
            </div>
            <div className='flex gap-2'>
            <input type='checkbox' id="offer" className='w-5' />
            <span>Offers</span>
          </div>
          <div className='flex gap-2'>
            <input type='checkbox' id="parking" className='w-5' />
            <span>Parking</span>
          </div>
          <div className='flex gap-2'>
            <input type='checkbox' id="Furnished" className='w-5' />
            <span>Furnished</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex gap-2 items-center'>
            <input type='number' id='bedroom' max='10' min='1'  className='rounded-md border p-3 border-slate-300' required />
            <span>Beds</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input type='number' id='bathrooms' max='10' min='1'  className='rounded-md border p-3 border-slate-300' required />
            <span>Baths</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input type='number' id='regularPrice'  className='rounded-md border p-3 border-slate-300' required />
            <div className='flex flex-col items-center'>
            <p>Regular Price</p>
            <span className='text-xs'>INR / Day</span>
            </div>
            
          </div>
          <div className='flex gap-2 items-center'>
            <input type='number' id='discountPrice' minLength='1' maxLength='10' className='rounded-md border p-3 border-slate-300' required />
            <div className='flex flex-col items-center'>
            <p>Discounted Price</p>
            <span className='text-xs'>INR / Day</span>
            </div>
          
          </div>
        </div>
       </div>
       <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'>Images: <span className='font-normal ml-2 text-slate-400'>First image will be cover image</span></p>
       <div className='flex gap-4'>
        <input type='file' id='images' accept='image/*' multiple className=' p-3 rounded-md w-full border border-gray-300' />
        <button className='uppercase text-green-500 rounded-md p-3 border border-gray-700 hover:shadow-lg disabled:opacity-75' >upload</button>
       </div>
       <button className='p-3 uppercase bg-slate-500 text-white rounded-md hover:opacity-90 disabled:opacity-75'>Add Listing</button>
       </div>

        </form>
    </main> 
  )
}
 