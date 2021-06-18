import React, { useEffect, useMemo, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import hljs from "highlight.js"
import EasyMDE from "easymde";

function PostEditor({ postContentText, setPostContentText }) {
  /**
   * @type {EasyMDE.Options}
   */
  const mdeOptions = useMemo(() => {
    return {
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
        hljs,
      },
      parsingConfig: {
        allowAtxHeaderWithoutSpace: true,
        strikethrough: true,
      },
      previewImagesInEditor: true,
      placeholder: "// Start your blog here!",
      spellChecker: false,
      // uploadImage: true,
      imageUploadFunction: () => console.log("yooo"),
      toolbar: [
        'heading', 'bold', 'italic', 'strikethrough', 'code', '|',
        'link', 'image', 'quote', 'unordered-list', 'ordered-list', 'table', 'horizontal-rule', '|',
        'side-by-side', 'preview', 'fullscreen', '|',
        'redo', 'undo', 'guide',
      ],
    };
  }, [])

  return (
    <div>
      <SimpleMDE
        value={postContentText}
        onChange={setPostContentText}
        options={mdeOptions}
        style={{ fontFamily: "consolas", fontSize: "20px" }}
      />
    </div>
  );
}

export default PostEditor;
