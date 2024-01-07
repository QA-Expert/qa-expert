'use client';

import Image, { ImageLoader } from 'next/image';

const navigation = [
  { name: 'Dashboard', current: true },
  { name: 'Team', current: false },
  { name: 'Projects', current: false },
  { name: 'Calendar', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const imageLoader: ImageLoader = ({ src }) => {
  return `https://tailwindui.com/img/logos/${src}`;
};

export default function Nav() {
  return (
    <nav className="bg-gray-800 flex h-14 items-center justify-center gap-4 w-full rounded-t-md">
      <Image
        loader={imageLoader}
        className="h-8 w-auto"
        src="mark.svg?color=indigo&shade=500"
        alt="Company Logo"
      />
      <div className="flex gap-4">
        {navigation.map((item) => (
          <button
            key={item.name}
            className={classNames(
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium',
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
