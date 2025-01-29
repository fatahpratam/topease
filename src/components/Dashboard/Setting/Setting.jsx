import './Setting.css';
import { ProtectedRoute } from "../../Utilities/index.js";
import { useUserStorage } from "../../../contexts/index.js";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Setting() {
  const { isLoggedIn } = useUserStorage();
  return (
    <ProtectedRoute to={'/dashboard/home'} condition={!isLoggedIn()}>
      <div className="setting">
        <h2 className="setting__h2">Pengaturan</h2>
        <ChangeName />
        <ChangePhoneNumber />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </ProtectedRoute>
  )
}

function ChangeName() {
  const
    [editMode, setEditMode] = useState(false),
    { loginInfo, changeUsername } = useUserStorage(),
    [username, setUsername] = useState(loginInfo.name),
    inputRef = useRef();

  const handleInputChange = e => setUsername(e.target.value);

  const handleChangeButton = () => {
    setEditMode(!editMode);
  };

  const handleSaveButton = () => {
    if (username.length === 0) {
      inputRef.current.reportValidity();
    }
    else {
      changeUsername(loginInfo.id, username);
      setEditMode(!editMode);
    }
  };

  const handleCancelButton = () => {
    setUsername(loginInfo.name);
    setEditMode(!editMode);
  };

  return (
    <div className="setting__container" >
      <h3 className="setting__h3">Ganti Nama</h3>
      <p className="setting__p">Ubah nama pengguna Anda untuk memperbarui informasi profil.</p>
      <input
        type="text"
        className="setting__input"
        readOnly={!editMode}
        value={username}
        onChange={handleInputChange}
        ref={inputRef}
        required
      />
      <div className="setting__sub-container">
        {
          !editMode
            ? <button className="setting__button" onClick={handleChangeButton}>Ganti nama</button>
            : <>
              <button className="setting__button" onClick={handleSaveButton} type="submit">Simpan</button>
              <button className="setting__button" onClick={handleCancelButton}>Batal</button>
            </>
        }
      </div>
    </div>
  )
}

function ChangePhoneNumber() {
  const
    [editMode, setEditMode] = useState(false),
    { loginInfo } = useUserStorage(),
    [phoneNumber, setPhoneNumber] = useState(loginInfo.phoneNumber),
    navigate = useNavigate(),
    inputRef = useRef();

  const handleInputChange = e => setPhoneNumber(e.target.value);

  const handleChangeButton = () => {
    setEditMode(!editMode);
  };

  const handleSaveButton = () => {
    if (/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(phoneNumber)) {
      setEditMode(!editMode);
      navigate('/otp/change-number', {
        state: {
          userId: loginInfo.id,
          newPhoneNumber: phoneNumber
        }
      });
    }
    else {
      inputRef.current.reportValidity();
    }
  };

  const handleCancelButton = () => {
    setPhoneNumber(loginInfo.phoneNumber);
    setEditMode(!editMode);
  };

  return (
    <div className="setting__container">
      <h3 className="setting__h3">Ganti Nomor WhatsApp</h3>
      <p className="setting__p">Perbarui nomor WhatsApp Anda untuk menjaga komunikasi tetap lancar.</p>
      <input
        type="text"
        className="setting__input"
        readOnly={!editMode}
        value={phoneNumber}
        onChange={handleInputChange}
        pattern='^(\+62|62|0)8[1-9][0-9]{6,11}$'
        ref={inputRef}
        required
      />
      <div className="setting__sub-container">
        {
          !editMode
            ? <button className="setting__button" onClick={handleChangeButton}>Ganti nomor</button>
            : <>
              <button className="setting__button" onClick={handleSaveButton} type="submit">Verifikasi</button>
              <button className="setting__button" onClick={handleCancelButton}>Batal</button>
            </>
        }
      </div>
    </div>
  )
}

function ChangePassword() {
  const
    navigate = useNavigate(),
    { loginInfo } = useUserStorage()

  const handleOnClick = () => {
    navigate('/otp/forgot-password', {
      state: { phoneNumber: loginInfo.phoneNumber }
    });
  };

  return (
    <div className="setting__container">
      <h3 className="setting__h3">Ganti Kata Sandi</h3>
      <p className="setting__p">Tingkatkan keamanan akun Anda dengan mengganti kata sandi secara berkala.</p>
      <button className="setting__button" onClick={handleOnClick}>Ganti kata sandi</button>
    </div>
  )
}

function DeleteAccount() {
  const
    navigate = useNavigate(),
    { loginInfo } = useUserStorage()

  const handleOnClick = () => {
    navigate('/otp/delete-account', {
      state: { userId: loginInfo.id }
    });
  };

  return (
    <div className="setting__container">
      <h3 className="setting__h3">Hapus Akun</h3>
      <p className="setting__p">Hapus akun Anda secara permanen jika Anda tidak lagi membutuhkan layanan kami.</p>
      <button
        className="setting__button setting__button--delete"
        onClick={handleOnClick}
      >Hapus akun</button>
    </div>
  )
}