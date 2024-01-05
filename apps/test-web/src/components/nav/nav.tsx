const navigation = [
  { name: 'Dashboard', current: true },
  { name: 'Team', current: false },
  { name: 'Projects', current: false },
  { name: 'Calendar', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  return (
    <nav className="bg-gray-800 flex h-14 items-center justify-center gap-4 w-full rounded-t-md">
      <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
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
