import { getUserWithProjects } from '@/lib/queries'

export default async function SignUp() {
  const user = await getUserWithProjects('GEYdxa0YRqNgIbGTeZ4f_')
  console.log(user)

  return <div>test</div>
}
