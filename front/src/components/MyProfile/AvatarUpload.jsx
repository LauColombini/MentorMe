// https://openbase.io/js/react-avatar-edit
import React, { useState } from "react"
import { useSelector } from "react-redux"
import ReactDOM from "react-dom"
import Avatar from "react-avatar-edit"
import axios from "axios"

export default function AvatarUpload() {
  // const [preview, setPreview] = useState(null)
  const [src, setSrc] = useState("")
  const [file, setFile] = useState(null)
  const userId = useSelector((state) => state.currentUser._id)

  const onClose = () => {
    setFile(null)
    // setPreview(null)}
  }

  // const onCrop = (preview) => setPreview(preview)

  const onBeforeFileLoad = (e) => {
    if (e.target.files[0].size > 71680) {
      alert("File is too big!")
      e.target.value = ""
      setFile(null)
    } else {
      setFile(e.target.files[0])
    }
  }

  const uploadHandler = () => {
    const fileData = new FormData()
    fileData.append("image", file, file.name)
    axios.post(`/api/users/${userId}/uploadAvatar`, fileData).then((res) => console.log(res))
  }

  return (
    <div>
      <Avatar
        width={390}
        height={295}
        label="Seleccionar una foto"
        onClose={onClose}
        // onCrop={onCrop}
        // onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={src}
      />
      {/* {preview === null ? null : <img src={preview} alt="Preview" />} */}
      {file !== null ? (
        <button type="submit" onClick={uploadHandler}>
          Subir foto
        </button>
      ) : null}
    </div>
  )
}
