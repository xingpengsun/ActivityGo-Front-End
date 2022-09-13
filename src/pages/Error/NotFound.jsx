import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { SITE_TITLE } from "../../config";

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = `Not Found - ${SITE_TITLE}`;
  }, []);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
