export function initColorPicker(onPickColorCallback = (() => null)) {
  const colorPicker = new ColorPicker({
    mode: 'hsl-h',
    size: 3,
    noRGBr: true,
    noRGBg: true,
    noRGBb: true,
    noResize: true,
    appendTo: document.querySelector('#colorpicker-container'),
  });

  colorPicker.color.options.actionCallback = (e, action) => {
    onPickColorCallback(colorPicker, e, action);
  }

  return colorPicker;
}
