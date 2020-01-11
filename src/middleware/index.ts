import {handleBodyRequestParsing,
  handleCompression,
  handleCors } from './common';

export default [handleCompression, handleCors, handleBodyRequestParsing];

