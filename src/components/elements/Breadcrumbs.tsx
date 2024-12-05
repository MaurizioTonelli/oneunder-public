import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

export default function Breadcrumbs({
  tournamentId,
  tournamentName,
}: {
  tournamentId: string;
  tournamentName: string;
}) {
  const pages = [
    {
      name: tournamentName,
      href: `/app/admin/tournaments/${tournamentId}`,
      current: false,
    },
    { name: "Day 1", href: "#", current: true },
  ];

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex flex-wrap items-center space-x-4">
        <li className="my-2">
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li className="my-2" key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
