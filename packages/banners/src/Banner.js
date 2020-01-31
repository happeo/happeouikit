import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextZeta, BodyUI } from "@happeouikit/typography";
import { active, success, warn, alert, gray04 } from "@happeouikit/colors";
import { IconError, IconInfoRound, IconCheckCircle } from "@happeouikit/icons";

const stateMap = { info: active, success, warn, error: alert };

const Banner = ({ state, title, description, icon, action }) => {
  const iconMap = {
    info: () => <IconInfoRound />,
    success: () => <IconCheckCircle />,
    warn: () => <IconError />,
    error: () => <IconError />
  };

  return (
    <Container color={stateMap[state]}>
      <IconWrapper hasDescription={!!description} fill={stateMap[state]}>
        {icon || iconMap[state]()}
      </IconWrapper>
      <Content>
        <TextZeta>{title}</TextZeta>
        {description && (
          <BodyUI color={gray04} style={{ paddingTop: "4px" }}>
            {description}
          </BodyUI>
        )}
        {action && <ActionWrapper>{action}</ActionWrapper>}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  border-radius: 6px;
  min-width: 285px;
  padding: 16px 40px 16px 16px;
  position: relative;
  box-shadow: 0px 1px 4px rgba(186, 198, 208, 0.5),
    0px 1px 4px rgba(0, 157, 255, 0.05);

  :after {
    content: "";
    position: absolute;
    width: 8px;
    left: 0px;
    top: 0;
    bottom: 0;
    background: ${({ color }) => color};
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  padding-top: ${({ hasDescription }) => hasDescription && "10px"};
  padding-left: 10px;
  padding-right: 18px;
  font-size: 24px;

  path {
    fill: ${({ fill }) => fill};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionWrapper = styled.div`
  padding-top: 14px;
`;

Banner.propTypes = {
  state: PropTypes.oneOf(Object.keys(stateMap)).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.object,
  action: PropTypes.object
};

Banner.defaultProps = {
  state: "info"
};

export default Banner;
