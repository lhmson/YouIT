// Saved overflow setting
var saved_overflow = '';

/**
 * Toggle full screen of the editor.  
 * This is expected to work when the editor has no toolbar
 */
export function toggleFullScreen(editor) {
  // Set fullscreen
  var cm = editor.codemirror;
  cm.setOption('fullScreen', !cm.getOption('fullScreen'));

  // Prevent scrolling on body during fullscreen active
  if (cm.getOption('fullScreen')) {
    saved_overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = saved_overflow;
  }

  var wrapper = cm.getWrapperElement();
  var sidebyside = wrapper.nextSibling;

  if (editor.options.onToggleFullScreen) {
    editor.options.onToggleFullScreen(cm.getOption('fullScreen') || false);
  }

  // Remove or set maxHeight
  if (typeof editor.options.maxHeight !== 'undefined') {
    if (cm.getOption('fullScreen')) {
      cm.getScrollerElement().style.removeProperty('height');
      sidebyside.style.removeProperty('height');
    } else {
      // cm.getScrollerElement().style.height = editor.options.maxHeight;
      // editor.setPreviewMaxHeight();
    }
  }
}