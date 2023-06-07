import { prisma } from "@/lib/prisma";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default async function Users({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 1002 / 7 = 143.3 = we have 144 pages of users
  const perPage = 7;
  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / perPage);

  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1;
  const users = await prisma.user.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
  });

  return (
    <div className="min-h-screen bg-gray-50 px-8 pt-12">
      <div className="flex items-center justify-between">
        <div className="w-80">
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-gray-300 pl-10 text-sm focus:border-gray-400 focus:outline-none focus:ring-0"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="ml-16 mt-0 flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-6 -my-2">
          <div className="inline-block min-w-full px-6 py-2 align-middle">
            <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-[62px] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:w-auto">
                      ID
                    </th>
                    <th className="w-[130px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:w-auto">
                      Name
                    </th>
                    <th className="w-[175px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:w-auto">
                      Email
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="max-w-[130px] truncate whitespace-nowrap px-3 py-4 text-sm font-medium sm:w-auto">
                        {user.name}
                      </td>
                      <td className="max-w-[175px] truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:w-auto">
                        {user.email}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-4 pr-4 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <ChevronRightIcon className="h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-semibold">{(page - 1) * perPage + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(page * perPage, totalUsers)}
          </span>{" "}
          of <span className="font-semibold">{totalUsers}</span> users
        </p>
        <div className="space-x-2">
          <Link
            href={page > 2 ? `/?page=${page - 1}` : "/"}
            className={`${
              page === 1 ? "pointer-events-none opacity-50" : ""
            } inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50`}
          >
            Previous
          </Link>
          <Link
            href={page < totalPages ? `/?page=${page + 1}` : `/?page=${page}`}
            className={`${
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            } inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
