'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // import styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor = ({ value, onChange }) => {
  return (
    <div className="editor-container">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={Editor.modules}
        formats={Editor.formats}
        className="h-64"
      />
    </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'header': '1'}, { 'header': '2' }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['link'],
    ['clean'] // remove formatting button
  ],
};

Editor.formats = [
  'font', 'header',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'indent', 'align',
  'link'
];

export default Editor;
