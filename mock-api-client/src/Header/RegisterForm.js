import React from 'react';
import Headers from '.';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosLocalApi from '../api/local-api';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Gọi API để đăng ký
      const response = await axiosLocalApi.post("register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      //
      const { token, user } = response.data;

      // Lưu token và thông tin người dùng vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Hiển thị thông báo thành công
      message.success('Đăng ký thành công! Chuyển đến trang chủ');
      navigate('/')
    } catch (error) {
      // Hiển thị thông báo lỗi
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
      message.error(errorMessage);
    }
  };

  return (
    <div className="container">
      <Headers />
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>ĐĂNG KÝ</h2>
      <div className="form-register" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Form
          form={form}
          name="register"
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
          style={{
            width: 540,
          }}
        >
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Họ tên của bạn!',
              },
            ]}
          >
            <Input placeholder="Nhập họ tên" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Username!',
              },
            ]}
          >
            <Input placeholder="Nhập username" prefix={<UserOutlined />} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email!',
              },
              {
                type: 'email',
                message: 'Email không hợp lệ!',
              },
            ]}
          >
            <Input placeholder="Nhập email" prefix={<MailOutlined />} />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
              {
                min: 8,
                message: 'Mật khẩu phải có ít nhất 8 ký tự!',
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Xác nhận mật khẩu"
            name="password2"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" prefix={<LockOutlined />} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
