import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { API } from "aws-amplify";
import { ShareAltOutlined } from "@ant-design/icons";

const Shares = ({ commentId, username }) => {
  const [shares, setShares] = useState([]);

  const handleOnClickShare = (commentId) => {
    const userHasSharesComment =
      shares.filter((share) => share.username.S === username).length > 0;
    if (!userHasSharesComment) {
      addShare(commentId);
    } else {
      removeShare();
    }
  };

  const addShare = async (commentId) => {
    try {
      const config = {
        body: { username, commentId },
        headers: {
          "Content-Type": "application/json",
        },
      };
      await API.post("todos", "/shares", config);
      fetchSharesCountByComment(commentId);
    } catch (err) {
      console.log("error creating share:", err);
    }
  };

  async function removeShare() {
    const shareId = shares.filter((like) => like.username.S === username)[0]
      .shareId.S;
    try {
      setShares(shares.filter((like) => like.shareId.S !== shareId));
      await API.del("todos", `/shares/${shareId}`);
      fetchSharesCountByComment(commentId);
    } catch (err) {
      console.log("error removing share:", err);
    }
  }

  const fetchSharesCountByComment = async (commentId) => {
    try {
      const res = await API.get("todos", `/shares?commentId=${commentId}`);
      setShares(res.Items);
    } catch (err) {
      console.log("error fetching shares");
    }
  };

  useEffect(() => {
    fetchSharesCountByComment(commentId);
  }, []);

  return (
    <Button
      icon={<ShareAltOutlined />}
      onClick={() => handleOnClickShare(commentId)}
    >
      {shares.length > 0 ? (
        shares.length
      ) : (
        <div style={styles.placeholder}></div>
      )}
    </Button>
  );
};

const styles = {
  placeholder: {
    width: "23px",
  },
};
export default Shares;
