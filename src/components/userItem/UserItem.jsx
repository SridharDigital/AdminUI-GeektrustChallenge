import "./userItem.css"
import trashIcon from "../../assets/trashIcon.svg"
import editIcon from "../../assets/editIcon.svg"

const UserItem = ({ user, updateSelectStatus, deleteUser }) => {
  const onClickCheckBox = (event) =>
    updateSelectStatus(user.id, event.target.checked)

  return (
    <li className="user-item-container">
      <div className="item-checkbox-container">
        <input
          type="checkbox"
          className="item-checkbox"
          onClick={onClickCheckBox}
          checked={user.isSelected}
        />
      </div>
      <p className="user-column-text">{user.name}</p>
      <p className="user-column-text">{user.email}</p>
      <p className="user-column-text">{user.role}</p>
      <div className="user-item-action-container">
        <img src={editIcon} className="trash-icon" />
        <img
          src={trashIcon}
          className="trash-icon"
          onClick={() => deleteUser(user.id)}
        />
      </div>
    </li>
  )
}

export default UserItem
