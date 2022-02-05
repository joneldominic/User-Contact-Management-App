import React from "react";
import { useState } from "react";

import styled from "styled-components";

import { FaSearch, FaTimes } from "react-icons/fa";

const FormControl = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin: 10px 25px 25px 25px;
  padding: 20px 15px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.background.default};
  font-size: ${(props) => props.theme.size.lg};

  & > svg {
    color: ${(props) => props.theme.text.disabled};
  }
`;

const Input = styled.input`
  width: 100%;
  margin: 10px;
  color: ${(props) => props.theme.text.primary};
  font-size: ${(props) => props.theme.size.sm};

  border: hidden;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const ClearButtonWrapper = styled.div`
  display: flex;
  align-content: center;

  color: ${(props) => props.theme.text.secondary};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.text.primary};
  }
`;

const SearchBar = (props) => {
  const [keyword, setKeyword] = useState("");

  const clearKeywordHandler = () => {
    setKeyword("");
  };

  const onChangeKeywordHandler = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <FormControl invalid={props.invalid}>
      <FaSearch />
      <Input
        id="search"
        name="search"
        type="text"
        value={keyword}
        onChange={onChangeKeywordHandler}
        placeholder="Search Contact ..."
      />
      <ClearButtonWrapper onClick={clearKeywordHandler}>
        <FaTimes />
      </ClearButtonWrapper>
    </FormControl>
  );
};

SearchBar.defaultProps = {};

export default SearchBar;
