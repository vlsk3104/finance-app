'use client';

import { useUser } from '@clerk/nextjs';

const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        おかえりなさい{isLoaded ? '、 ' : ' '}
        {user?.firstName ? `${user.firstName}さん👋` : ''}
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        こちらはあなたの家計簿の概要です
      </p>
    </div>
  );
};

export default WelcomeMsg;
