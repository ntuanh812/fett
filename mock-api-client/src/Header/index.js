import React from 'react';
import '../Header/index.css';


export default function Headers() {

  return (
    <div>
      <header className="header">
        <img
          alt="FITA logo"
          src="logoschool.png"
        />
        <div>

          <div className="nav-links">
            <a href="/">TRANG CHỦ</a>
            <a href="/revision">ÔN TẬP</a>
            <a href="/exams">BÀI THI</a>
          </div>
        </div>

        <div className="header-img">
          <img alt="Illustration" src="hat.png" />
        </div>

      </header>
    </div>
  );
}
