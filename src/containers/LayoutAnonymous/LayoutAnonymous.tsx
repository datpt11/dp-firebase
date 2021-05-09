import React, { FC } from 'react';

import Image from 'components/Image/Image';

export interface LayoutAnonymousProps {}

const LayoutAnonymous: FC<LayoutAnonymousProps> = ({ children }) => {
  return (
    <div className="relative">
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://firebasestorage.googleapis.com/v0/b/messenger-b8108.appspot.com/o/5236768.jpg?alt=media&token=7526cc01-eebf-456f-b735-1390b4e0b3e1)',
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center rounded-[12px] h-[93%] w-3/4 overflow-hidden ">
            <div
              className="backdrop-blur-[16px] w-1/2 md:flex items-center h-full p-[15px] hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
              }}
            >
              <div className="w-full">
                <div className="w-10 h-10 mx-auto">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/messenger-b8108.appspot.com/o/SF_logo.png?alt=media&token=e710c8eb-963a-427e-9363-015b36697f8f"
                    aspectRatioInPercent={100}
                  />
                </div>
                <div className="w-full">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/messenger-b8108.appspot.com/o/undraw_Group_chat_re_frmo-2.png?alt=media&token=8b56c90c-2f0b-4aa2-a250-8306110a1ffe"
                    aspectRatioInPercent={71}
                  />
                </div>
                <div className="text-center w-3/4 mx-auto">
                  <h2 className="text-white font-bold text-xl">SF helps you connect and share with the people in your life.</h2>
                </div>
              </div>
            </div>
            <div className="bg-white w-full md:w-1/2 h-full py-[20px] px-[40px] md:px-[60px]">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAnonymous;
