# SCRIPT

Collapse divs

Add `bg-white border border-gray-300`

Add breathing room: `px-3 py-2`

Adjust placement: `inline-flex items-center justify-center`

Add some spacing on top div: `mt-4`

Add text: `text-sm font-semibold text-gray-900`

Round button: `rounded-md`

Add hover: `hover:bg-gray-50`

Duplicate button to make previous button

Break previous by going to ?page=0

> page >= 2

Change to `page > 2`

Disable button: `page === 1 ? "pointer-events-none opacity-50" : ""`

Add p tag: `<p>Showing 1 to 6 of 100 users</p>`

Layout: `flex items-center justify-between`
Remove `space-x-2`

Wrap buttons in space-x-2: Wrap > .space-x-2

Wrap numbers in span: `<span className="font-semibold">`
Option click, insert mode, `<span>`
Ctrl+z to remove closing span, block mode, e to end
Add closing span.
b back word to opening span, insert, cn control+space, add font-medium

> Ok we're going to take each of these numbers and wrap them in a span tag.
> And now let's decorate these tags with font medium.

Add total users: `const totalUsers = await prisma.user.count();`

Use {totalUsers} in span

Starting: `(page - 1) * 6 + 1`

To: `page * 6`

Get rid of magic six, add perPage: `const perPage = 6;`
Update four 6 to perPage

Update Next link to only link next page if `page * perPage < totalUsers`

```tsx
href={
  page < Math.ceil(totalUsers / perPage)
    ? `/?page=${page + 1}`
    : `/?page=${page}`
}
```

Disable button

```tsx
className={`${
  page >= Math.ceil(totalUsers / perPage)
    ? "pointer-events-none opacity-50"
    : ""
}
```

Explain out of bounds, go to /?page=-1
Guard +searchParams.page > 1

Go to /?page=5000
Guard +searchParams.page <= Math.ceil(totalUsers / perPage)

Put Math.ceil into variable
