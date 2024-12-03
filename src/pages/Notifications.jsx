import React from 'react'
import Sidebar from '../components/Sidebar'
import './../styles/Notifications.css'

function Notifications() {
  return (
    <div>
<Sidebar/>

<div className='notifications-container'>
    
    <p>Notifications</p>


    <table>
      <thead>
<tr>
  <th>TIMELOG ID</th>
  <th>USER ID</th>
  <th>NAME</th>
  <th>TIME IN</th>
  <th>DATE LOGGED</th>
  <th>TYPE</th>
  <th>MANAGE</th>

</tr>
      </thead>

    </table>
    <div>

    </div>

</div>

    </div>
  )
}

export default Notifications