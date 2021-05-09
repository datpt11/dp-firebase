import React, { FC } from 'react';

import LineAwesome from 'components/LineAwesome';
import Popconfirm from 'components/Popconfirm';

export interface MenuDropdownProps {}

const MenuDropdown: FC<MenuDropdownProps> = () => {
  const renderMenu = (onClose?: () => void) => {
    return (
      <div className="min-w-[240px] rounded-[12px] bg-white shadow-md py-2">
        <div onClick={onClose} className="p-3 hover:bg-secondary">
          Đăng kí
        </div>
        <div className="p-3 hover:bg-secondary">Đăng nhập</div>
        <div className="p-3 hover:bg-secondary">Trợ giúp</div>
      </div>
    );
  };

  return (
    <Popconfirm content={onClose => renderMenu(onClose)} placement="bottom-end" modifiers={[{ name: 'offset', options: { offset: [0, 20] } }]}>
      <button className="inline-block h-10 rounded-[21px] bg-white shadow-md pr-1 pl-3 focus:outline-none">
        <LineAwesome name="bars" size={20} className="align-middle" />
        <LineAwesome name="user-circle" size={36} className="ml-2 align-middle" />
      </button>
    </Popconfirm>
  );
};

export default MenuDropdown;
