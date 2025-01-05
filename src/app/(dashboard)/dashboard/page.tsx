import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/custom/dashboard/header"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/sign-in")

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard', active: true },
        ]}
      />

      <div className='flex flex-1 flex-col gap-4 p-4'>
        Charts Here
      </div>
    </>
  )
}