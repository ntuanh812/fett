import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Header/index.css';
import '../style/btn-header.css';

export default function Button() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [username, setUsername] = useState(''); // Trạng thái lưu tên người dùng
  const navigate = useNavigate(); // Khởi tạo hook navigate

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData); // Chuyển chuỗi JSON thành đối tượng
        if (user && user.username) {
          setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
          setUsername(user.username); // Lưu username vào state
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Hàm xử lý khi người dùng nhấn nút "Đăng xuất"
  const handleLogout = () => {
    setIsLoggedIn(false); // Cập nhật trạng thái chưa đăng nhập
    setUsername(''); // Xóa username khỏi state
    localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
    navigate('/'); // Chuyển hướng về trang chủ
  };

  return (
    <div>
      <div className="auth-links">
        {!isLoggedIn ? (
          <>
            {/* Nếu chưa đăng nhập, hiển thị liên kết đăng nhập và đăng ký */}
            <a href="/login" className="login">Đăng nhập</a>
            <a href="/register" className="register">Đăng ký</a>
          </>
        ) : (
          // Nếu đã đăng nhập, hiển thị tên người dùng và nút đăng xuất
          <div>
            <h3 className="welcome">Xin chào {username}</h3>
            <button onClick={handleLogout}>Đăng xuất</button>
          </div>
        )}
      </div>
    </div>
  );
}
