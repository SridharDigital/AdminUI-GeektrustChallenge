import "./adminPanel.css"
import { useState, useEffect } from "react"

const AdminPanel = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedData = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        )
        const users = await fetchedData.json()
        setUsers(users)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  console.log({ users })
  return <div>AdminPanel</div>
}

export default AdminPanel
