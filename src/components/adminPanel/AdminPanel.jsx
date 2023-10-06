import "./adminPanel.css"
import { useState, useEffect } from "react"

import UserItem from "../userItem/UserItem"

const AdminPanel = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const updateSelectStatus = (userId, selectStatus) => {
    const updatedUsers = users.map((user) => {
      if (userId === user.id) {
        return {
          ...user,
          isSelected: event.target.checked,
        }
      } else {
        return {
          ...user,
        }
      }
    })
    setUsers(updatedUsers)
  }

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedData = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        )
        const fetchedUsers = await fetchedData.json()
        const updatedUserData = fetchedUsers.map((user) => ({
          ...user,
          isSelected: false,
        }))
        setUsers(updatedUserData)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const currentPageUsers = users.slice(0, 9)

  console.log({ users })

  return (
    <div className="content-wrapper">
      <input
        type="search"
        className="users-search-bar"
        placeholder="Search by name, email or role"
      />
      <ul className="admin-dashboard-container">
        <li className="user-item-container">
          <div className="item-checkbox-container">
            <input type="checkbox" className="item-checkbox" />
          </div>
          <p className="users-column-heading">Name</p>
          <p className="users-column-heading">Email</p>
          <p className="users-column-heading">Role</p>
          <p className="users-column-heading">Actions</p>
        </li>
        {currentPageUsers.map((user) => (
          <UserItem
            user={user}
            key={user.id}
            updateSelectStatus={updateSelectStatus}
            deleteUser={deleteUser}
          />
        ))}
      </ul>
    </div>
  )
}

export default AdminPanel
