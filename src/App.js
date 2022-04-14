import React, { useState } from 'react'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { IconContext } from "react-icons";
import axios from 'axios'
function App() {
  const data = {
    wasHelpful: null,
    comment: ''
  }
  const [review, setReview] = useState(data)
  const [postedreview, setPostReview] = useState(null)
  let time = new Date(postedreview?.createdAt)
  time = new Date(time.getTime() + (time.getTimezoneOffset() * 60000))
  const inputtime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()

  async function addreview() {
    const result = await axios.post('https://6239be97bbe20c3f66c93c18.mockapi.io/api/v1/feedback/', review)
    setPostReview(result.data)
  }

  async function editreview() {
    const result = await axios.put(`https://6239be97bbe20c3f66c93c18.mockapi.io/api/v1/feedback/${postedreview?.id}`, review)
    setPostReview(result.data)
  }

  return (
    <div className="App">
      <div className='flex flex-col w-fit mx-auto py-6 tracking-wider'>
        <div className='flex flex-col w-fit mx-auto text-[#161616]'>
          <div className='font-semibold'>Is this page useful?</div>
          <div className='flex justify-between py-2'>

            <div className='flex cursor-pointer items-center' onClick={() => setReview(prevState => ({ ...prevState, wasHelpful: true }))}>
              <IconContext.Provider value={{ color: `${review.wasHelpful === null ? '#525252' : (review.wasHelpful ? '#000000' : '#E3E3E3')}`, className: `mr-2` }}>
                <FiThumbsUp />Yes
              </IconContext.Provider>
            </div>
            <div className='flex cursor-pointer items-center' onClick={() => setReview(prevState => ({ ...prevState, wasHelpful: false }))}>
              <IconContext.Provider value={{ color: `${review.wasHelpful === null ? '#525252' : (review.wasHelpful ? '#E3E3E3' : '#000000')}`, className: `mr-2` }}>
                <FiThumbsDown />No
              </IconContext.Provider>
            </div>
          </div>
        </div>

        {review.wasHelpful !== null &&
          <>
            <textarea
              className='bg-[#F4F4F4] text-[#525252] text-sm h-40 w-44 p-2'
              placeholder='Any additional feedback?'
              value={review.comment}
              type="text"
              onChange={(e) => {
                setReview(prevState => ({
                  ...prevState,
                  comment: e.target.value
                }))
              }}
              name="comment"></textarea>
            <div className='flex justify-end text-sm pt-2'>
              <button className='text-[#522143] p-1 mr-2'>Skip</button>
              {postedreview === null ?
                <button className='bg-[#0069D9] text-white p-1 w-18' onClick={() => addreview()}>Submit</button> :
                <button className='bg-[#0069D9] text-white p-1 w-18' onClick={() => editreview()}>Edit</button>
              }
            </div>
          </>}

        {postedreview &&
          <div className={`mt-4 p-2 bg-slate-50 text-sm w-44 flex ${postedreview?.wasHelpful ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className='pr-2 flex items-center'>
              <IconContext.Provider value={{ color: `${postedreview?.wasHelpful ? 'rgb(34 197 94)' : 'rgb(239 68 68)'}`, size: `1.5em` }}>
                {postedreview?.wasHelpful ?
                  <div><FiThumbsUp /></div> :
                  <div><FiThumbsDown /></div>
                }
              </IconContext.Provider>
            </div>
            <div className='text-xs w-full'>
              <div >{postedreview?.comment}</div>
              <div className='flex justify-between items-center pt-2'>
                <div>{postedreview?.createdAt && inputtime}</div>
                <div>{postedreview?.id}</div>
              </div>
            </div>
          </div>}
      </div>
    </div >
  );
}

export default App;
