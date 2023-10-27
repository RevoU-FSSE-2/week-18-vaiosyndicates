import React from 'react'

const List = ({data, onClickEdit, onClickDel}) => {
  return (
    <ul className="list-reset">

          {data !== undefined && data.length > 0 && data.map((cur, key) => {
            return (
                <li className="relative flex items-center justify-between px-2 py-6 border-b">
                  <div className='flex-1'>
                    <p  className="inline-block mt-1 text-white">{cur.title}</p>
                  </div>
                  <div className='flex-1 w-2'>
                    <p  className="inline-block mt-1 text-white">{cur.time}</p>
                  </div>
                  <div className='flex-1'>
                    <button type="button" className="right-0 flex items-center" onClick={() => onClickEdit(cur.id, cur.idUser, cur.title, cur.time )}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button type="button" className="right-0 flex items-center" onClick={() => onClickDel(cur.id, cur.idUser)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-700" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                  </div>
                  
              </li>
            );
          })}
    </ul>
  )
}

export default List