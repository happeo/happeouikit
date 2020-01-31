import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Avatar } from "@happeouikit/avatar";
import { TextZeta } from "@happeouikit/typography";
import { Loader } from "@happeouikit/loaders";
import { gray01 } from "@happeouikit/colors";

/**
 *
 * UserRow with avatar and user info
 *
 */
const UserDetails = ({ user = {}, color = gray01 }) => {
  if (user.id) {
    const fullName = user.fullName || user.name.fullName;
    const thumbnailPhotoUrl = user.thumbnailPhotoUrl;
    return (
      <UserRow>
        <Avatar size="s" user={{ fullName, thumbnailPhotoUrl }} />
        <TextZeta color={color}>{fullName}</TextZeta>
      </UserRow>
    );
  } else if (user.error) {
    return <TextZeta color={color}>-</TextZeta>;
  } else {
    return (
      <LoaderWrapper>
        <Loader containerHeight="32px" />
      </LoaderWrapper>
    );
  }
};

UserDetails.propTypes = {
  user: PropTypes.object
};

const UserRow = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
  }
`;

const LoaderWrapper = styled.div`
  text-align: center;
`;

export default UserDetails;
