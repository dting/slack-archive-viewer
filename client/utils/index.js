/* eslint-disable camelcase */

const e = document.createElement('div');
export const htmlDecode = function htmlDecode(input) {
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

export const attachmentImageStyle = function attachmentImageStyle({ image_width, image_height }) {
  const style = {};
  if (image_width >= 400) {
    style.width = 400;
    style.height = image_height * (400 / image_width);
  } else {
    style.width = image_width;
    style.height = image_height;
  }
  if (style.height >= 300) {
    style.width *= (300 / style.height);
    style.height = 300;
  }
  return style;
};
