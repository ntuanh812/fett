import React, { useState } from 'react';
import Headers from '.';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosLocalApi from '../api/local-api';

function Login() {
  const [loading, setLoading] = useState(false); // Trạng thái đang tải
  const navigate = useNavigate(); // Điều hướng sau khi đăng nhập

  
  const handleSubmit = async (values) => {
    setLoading(true);
    try { 
      // Gửi yêu cầu đăng nhập
      const response = await axiosLocalApi.post("login", {
        username: values.username,
        password: values.password,
      });

    const { token, user } = response.data;

    // Lưu token và thông tin người dùng vào localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

      // Xử lý phản hồi 
      message.success('Đăng nhập thành công!');
      console.log(response.data); // Ghi log phản hồi từ server

      // Điều hướng đến trang chính
      navigate('/');
    } catch (error) {
      // Xử lý lỗi
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại!';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Headers />
      <h2 className="header-login">ĐĂNG NHẬP</h2>
      <div className="form-login">
        <Form
          name="login"
          onFinish={handleSubmit}
          initialValues={{
            remember: true,
          }}
          style={{
            width: 540,
            margin: '0 auto',
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên đăng nhập!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Đăng nhập
            </Button>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              hoặc <a href="/register">Đăng ký ngay!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
