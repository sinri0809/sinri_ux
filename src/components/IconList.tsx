import React from 'react';

import IconClose from 'icons/IconClose';

const ICON_DATA_MAP = {
  'icon-close': <IconClose />,
};

type IconKeys = keyof typeof ICON_DATA_MAP;

export type { IconKeys };

export default ICON_DATA_MAP;
