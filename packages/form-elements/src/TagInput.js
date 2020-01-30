import React, {
  Fragment,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AsyncCreatableSelect from "react-select/async-creatable";
import { BodyUI, TinyText, TextZeta } from "@happeokit/typography";
import { Tag, sanitiseHashtag } from "./index";
import { dropdownStyles } from "./Dropdown";
import { IconButton } from "@happeokit/buttons";
import { IconAddCircle } from "@happeokit/icons";
import { gray04, active, alert } from "@happeokit/colors";
import messages from "./messages";
import { Spacer } from "@happeokit/layout";

const TagInput = forwardRef(
  (
    {
      label,
      loadOptions,
      callback,
      placeholder,
      maxOptions,
      warningThreshold,
      warningMessage,
      targetElement = "pages",
      intl,
      ...props
    },
    ref
  ) => {
    const asyncCreatableSelectRef = useRef(null);
    const [state, setState] = useState({ error: false, warning: false });
    const [isMenuFocused, setIsMenuFocused] = useState(false);

    const onChange = input => {
      const formattedInput =
        input &&
        input.map(hashtag => ({
          hashtag: sanitiseHashtag(hashtag.value || hashtag.hashtag)
        }));

      setState({
        error:
          maxOptions && formattedInput && formattedInput.length >= maxOptions,
        warning:
          warningThreshold &&
          formattedInput &&
          formattedInput.length >= warningThreshold
      });

      callback(formattedInput);
    };

    useImperativeHandle(ref, () => ({
      addTag: tag => {
        asyncCreatableSelectRef &&
          asyncCreatableSelectRef.current &&
          asyncCreatableSelectRef.current.select.select.select.selectOption({
            hashtag: sanitiseHashtag(tag)
          });
      },
      reloadOptions: () => {
        asyncCreatableSelectRef &&
          loadOptions &&
          asyncCreatableSelectRef.current &&
          asyncCreatableSelectRef.current.loadOptions("", loadOptions);
      }
    }));

    const { warning, error } = state;

    return (
      <Fragment>
        {label && <StyledLabel targetElement={targetElement} text={label} />}
        {warning && (
          <BodyUI
            style={{
              color: alert,
              paddingTop: targetElement === "article" ? "0px" : "5px",
              paddingBottom: targetElement === "article" ? "4px" : "8px"
            }}
          >
            {warningMessage}
          </BodyUI>
        )}
        {error && isMenuFocused && (
          <TinyText style={{ color: alert }}>
            {messages.tagMaximumNumberExceeded}
            {maxOptions}
          </TinyText>
        )}
        <StyledDropdown
          ref={asyncCreatableSelectRef}
          classNamePrefix="dropdown"
          placeholder={placeholder}
          isMulti
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          components={{ MultiValue: SelectInput, DropdownIndicator: "" }}
          isClearable={false}
          formatOptionLabel={FormatOptionLabel}
          getOptionValue={opt => sanitiseHashtag(opt.hashtag || opt.value)}
          getOptionLabel={opt => sanitiseHashtag(opt.label || opt.hashtag)}
          onChange={onChange}
          isSearchable
          isValidNewOption={(inputValue, existingValues, selectOptions) => {
            if (inputValue === "") return false;
            const sanitizedInput = sanitiseHashtag(inputValue);
            const isNotDuplicated = !existingValues
              .map(option => sanitiseHashtag(option.value))
              .includes(sanitizedInput);
            return isNotDuplicated;
          }}
          isOptionDisabled={option => {
            option.isDisabled = error;
            return error;
          }}
          onFocus={() => setIsMenuFocused(true)}
          onBlur={() => setIsMenuFocused(false)}
          {...props}
        />
      </Fragment>
    );
  }
);

TagInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  loadOptions: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.array,
  maxOptions: PropTypes.number
};

const SelectInput = props => {
  const text = props.data.hashtag || props.data.label;
  return (
    text && (
      <InputTag
        key={text}
        text={sanitiseHashtag(text)}
        closeCallback={props.removeProps.onClick}
      />
    )
  );
};

/**
 * Custom formatting for option and create option labels. If no hashtag matching
 * inout is present in the options list, a create option is displayed
 * @param hashtag
 * @param count
 * @param props
 * @returns {*}
 */
const FormatOptionLabel = ({
  hashtag,
  count,
  isDisabled,
  suggested,
  ...props
}) => {
  if (hashtag) {
    return (
      <CreateInputRow>
        <CreateInputRowInner>
          <div style={{ display: "flex" }}>
            {isDisabled && <BodyUI color={alert}>*</BodyUI>}
            <BodyUI>{sanitiseHashtag(hashtag)}</BodyUI>
          </div>
          <Spacer height={"8px"} />
          <BodyUI color={gray04}>
            {!suggested ? messages.timesUsed + count : messages.suggestedTag}
          </BodyUI>
        </CreateInputRowInner>
      </CreateInputRow>
    );
  } else {
    return <InjectedFormatCreateLabel {...props} />;
  }
};

const FormatCreateLabel = ({ value }) => {
  const sanitisedHashtag = sanitiseHashtag(value);
  const lengthExceeded = sanitisedHashtag.length >= 64;
  return (
    <CreateInputRow>
      <CreateInputRowInner>
        <BodyUI color={active}>{sanitisedHashtag}</BodyUI>
        <Spacer height={"8px"} />
        {lengthExceeded ? (
          <BodyUI color={alert}>{messages.tagLengthExceeded}</BodyUI>
        ) : (
          <BodyUI color={gray04}>{messages.addTag}</BodyUI>
        )}
      </CreateInputRowInner>
      <IconButton icon={IconAddCircle} />
    </CreateInputRow>
  );
};

const InjectedFormatCreateLabel = FormatCreateLabel;

const StyledDropdown = styled(AsyncCreatableSelect)`
  ${dropdownStyles};
`;

const StyledLabel = ({ targetElement, text }) => {
  if (targetElement === "article") {
    return (
      <StyledArticleLabel bold color={gray04}>
        {text}
      </StyledArticleLabel>
    );
  }

  return (
    <TinyText uppercase bold color={gray04} style={{ paddingBottom: "5px" }}>
      {text}
    </TinyText>
  );
};

const StyledArticleLabel = styled(TextZeta)`
  padding-bottom: 16px;
  :first-letter {
    text-transform: capitalize;
  }
`;

const InputTag = styled(Tag)`
  display: flex;
  align-items: center;
  margin: 4px;

  p {
    position: static;
  }

  svg {
    display: flex;
  }
`;

const CreateInputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    fill: ${active};
  }
`;

const CreateInputRowInner = styled.div`
  display: flex;
  flex-direction: column;
`;
export default TagInput;
