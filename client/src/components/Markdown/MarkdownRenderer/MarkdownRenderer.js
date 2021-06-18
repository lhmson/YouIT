import React, { useEffect, useMemo, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import hljs from "highlight.js"
import EasyMDE from "easymde";
import { toggleFullScreen } from "../../../utils/easymde_overide";
import Loading from "../../Loading/Loading";

function MarkdownRenderer({ text, enableDoubleClickFullScreen = true }) {
  /** @type {[EasyMDE, React.Dispatch<EasyMDE>]} */
  const [mdeInstance, setMdeInstance] = useState(null)
  const [initDone, setInitDone] = useState(false);

  // doesn't work :)
  /** @param {EasyMDE} editor */
  const removeScroll = (editor) => {
    const cm = editor.codemirror;

    const wrapper = cm.getWrapperElement();
    const sidebyside = wrapper.nextSibling;

    cm.getScrollerElement().style.removeProperty('height');
    sidebyside.style.removeProperty('height');
  }

  useEffect(() => {
    if (mdeInstance && !initDone) {
      setInitDone(true);
      EasyMDE.togglePreview(mdeInstance);
      removeScroll(mdeInstance);
    }
  }, [mdeInstance])

  /** @type {EasyMDE.Options} */
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
      toolbar: false,
      status: false,
      scrollbarStyle: "native",
      shortcuts: {
        togglePreview: "",
        toggleSideBySide: "",
      },
      maxHeight: "1px",
    }
  }, [])

  return (
    <div>
      {!initDone && <Loading />}
      <SimpleMDE
        value={text}
        options={mdeOptions}
        getMdeInstance={setMdeInstance}
        onDoubleClick={() => enableDoubleClickFullScreen && toggleFullScreen(mdeInstance)}
        hidden={!initDone}
      />
    </div>
  );
}

export default MarkdownRenderer;
