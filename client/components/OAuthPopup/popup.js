/**
 * Adapted from Redux-Auth:
 * https://github.com/lynndylanhurley/redux-auth/blob/master/src/utils/popup.js
 *
 * WTFPL © Lynn Dylan Hurley
 */

const OPTS = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no';

/* istanbul ignore next */
function getPopupOffset({ width, height }) {
  const wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  const wTop = window.screenTop ? window.screenTop : window.screenY;

  const left = wLeft + (window.innerWidth / 2) + (-width / 2);
  const top = wTop + (window.innerHeight / 2) + (-height / 2);

  return { top, left };
}

/* istanbul ignore next */
function getPopupSize(provider) {
  switch (provider) {
    case 'facebook':
      return { width: 580, height: 400 };

    case 'google':
      return { width: 452, height: 633 };

    case 'github':
      return { width: 1020, height: 618 };

    case 'linkedin':
      return { width: 527, height: 582 };

    case 'twitter':
      return { width: 495, height: 645 };

    case 'live':
      return { width: 500, height: 560 };

    case 'yahoo':
      return { width: 559, height: 519 };

    case 'slack':
      return { width: 495, height: 645 };

    default:
      return { width: 1020, height: 618 };
  }
}

function getPopupDimensions(provider) {
  const { width, height } = getPopupSize(provider);
  const { top, left } = getPopupOffset({ width, height });

  return `width=${width},height=${height},top=${top},left=${left}`;
}

export default function openPopup(provider, url, name = provider) {
  return window.open(url, name, `${OPTS},${getPopupDimensions(provider)}`);
}
