import "./adminPanel.css"
import { useState, useEffect } from "react"

import UserItem from "../userItem/UserItem"

const AdminPanel = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const usersStartIndex = (currentPage - 1) * 10
  const usersEndIndex = currentPage * 10

  const updateSelectStatus = (userId, selectStatus) => {
    const updatedUsers = users.map((user) => {
      if (userId === user.id) {
        return {
          ...user,
          isSelected: selectStatus,
        }
      } else {
        return {
          ...user,
        }
      }
    })
    setUsers(updatedUsers)
    setSelectAllChecked(selectStatus)
  }

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
  }

  const onClickSelectAll = (event) => {
    setSelectAllChecked(event.target.checked)
    const updatedUsers = users.map((user, index) => {
      if (index >= usersStartIndex && index < usersEndIndex) {
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

  const onClickDeleteSelectedUsers = () => {
    const updatedUsers = users.filter((user) => user.isSelected === false)
    setUsers(updatedUsers)
    setSelectAllChecked(false)
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

  const currentPageUsers = users.slice(usersStartIndex, usersEndIndex)

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
            <input
              type="checkbox"
              className="item-checkbox"
              onClick={onClickSelectAll}
              checked={selectAllChecked}
            />
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
      <div>
        <button className="delete-btn" onClick={onClickDeleteSelectedUsers}>
          Delete Selected
        </button>
        <div className="pagination-container"></div>
      </div>
    </div>
  )
}

export default AdminPanel
