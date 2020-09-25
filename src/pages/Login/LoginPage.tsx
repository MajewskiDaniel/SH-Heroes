import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.scss";
import {Form, Input, Button, notification} from "antd";
import { Authentication as LoginSvc } from "../../services/Authentication";
import { Consumer } from "../../components/AuthContext/AuthContext";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  //   const [form] = Form.useForm();
  //   const [, forceUpdate] = useState();

  //   //   To disable submit button at the beginning.
  //   useEffect(() => {
  //     forceUpdate({});
  //   }, []);

  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onSuccess = async (values: any, setAuth: (value: boolean) => void) => {
    const isValid = await LoginSvc.login(values);
    if(isValid) {
      setAuth(isValid!);
      history.push("/home");
      notification['success']({
        message: 'Success',
        description:
          'logged in successfully'
      });
    } else {
      setAuth(isValid!);
      notification['error']({
        message: 'Error',
        description:
          'Credentials invalid'
      });
    }

  };

  const onFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.instruction}>
        <span>Please, fill in your username and password to log in</span>
      </div>
      <Consumer>
        {({ setAuth, auth }) => (
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={(values) => onSuccess(values, setAuth)}
            onFinishFailed={onFailed}
          >
            <Form.Item
              label="Username"
              name="login"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                // disabled={
                //   !form.isFieldsTouched(true)
                //     ||
                //     form.getFieldsError().filter(({ errors }) => errors.length)
                //       .length
                // }
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        )}
      </Consumer>
    </div>
  );
};

export default Login;
