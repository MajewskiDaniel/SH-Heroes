import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.scss";
import { Form, Input, Button } from "antd";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  //   To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onSuccess = (values: any) => {
    console.log("Success:", values);
    setIsAuthenticated(true);
  };

  const onFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setIsAuthenticated(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.instruction}>
        <span>Please, fill in your username and password to log in</span>
      </div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSuccess}
        onFinishFailed={onFailed}
      >
        <Form.Item
          label="Username"
          name="login"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            // disabled={
            //   !form.isFieldsTouched(true) ||
            //   form.getFieldsError().filter(({ errors }) => errors.length).length
            // }
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
