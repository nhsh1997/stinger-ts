import {handleBodyRequestParsing,
  handleCompression,
  handleCors, requestLog } from './common';

export default [handleCompression, handleCors, handleBodyRequestParsing, requestLog];

