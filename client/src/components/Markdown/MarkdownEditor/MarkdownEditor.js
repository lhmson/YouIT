import React, { useMemo, } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

/**
 * @param {{style: React.CSSProperties, text: string, setText, placeholder: string, maxHeight: number}} param0 
 */
function MarkdownEditor({ text, setText, style, placeholder, maxHeight }) {
  /**
   * @type {EasyMDE.Options}
   */
  const mdeOptions = useMemo(() => {
    return {
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
      parsingConfig: {
        strikethrough: true,
      },
      previewImagesInEditor: true,
      placeholder: placeholder,
      spellChecker: false,
      // uploadImage: true,
      toolbar: [
        'heading', 'bold', 'italic', 'strikethrough', 'code', '|',
        'link', 'image', 'quote', 'unordered-list', 'ordered-list', 'table', 'horizontal-rule', '|',
        'side-by-side', 'preview', 'fullscreen', '|',
        'redo', 'undo', 'guide',
      ],
      maxHeight,
    };
  }, [])

  return (
    <div>
      <SimpleMDE
        value={text}
        onChange={setText}
        options={mdeOptions}
        style={style}
      />
    </div>
  );
}

export default MarkdownEditor;
