import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Header/index.css';

export default function Headers() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Khởi tạo hook navigate

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    navigate('/'); // Chuyển hướng về trang chủ khi đăng xuất
  };

  return (
    <div>
      <header className="header">
        <img
          alt="FITA logo"
          src="logoschool.png"
        />
        <div>
          <div className="search-bar">
            <input placeholder="Tìm kiếm..." type="text" />
            <i className="fas fa-search"></i>
          </div>

          <div className="nav-links">
            <a href="/">TRANG CHỦ</a>
            <a href="/revision">ÔN TẬP</a>
            <a href="/exams">BÀI THI</a>
          </div>
        </div>

        <div className="header-img">
          <img alt="Illustration" src="hat.png" />
        </div>

        <div className="auth-links">
          {!isLoggedIn ? (
            <>
              <a href="/login" className="login">Đăng nhập</a>
              <a href="/register" className="register">Đăng ký</a>
            </>
          ) : (
            <div>
              <h3 className="welcome">Xin chào</h3>
              <button onClick={handleLogout}>Đăng xuất</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
