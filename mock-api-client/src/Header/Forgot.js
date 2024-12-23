import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import Headers from '../Header';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/forgot-password', { email: values.email });
      message.success('A reset link has been sent to your email.');
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to send reset link. Please try again.');
      message.error('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="container">
      <Headers />
      <h2>Forgot Password</h2>
      <Form
        onFinish={handleSubmit}
        initialValues={{ email }}
        layout="vertical"
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        {errorMessage && <p className="text-error">{errorMessage}</p>}
        
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Forgot;
