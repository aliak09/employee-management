import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

export default function page() {
  return (
    // UI for the login
    <div className='flex justify-center items-center flex-col gap-6 min-h-screen'>
      <div className='text-3xl font-bold'>Employee Management System</div>
      <Card className="w-full max-w-[320]">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email or username"
                  required
                />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder='Enter your password' required />
                <div className="flex items-center justify-between">
                  <Checkbox>Remember</Checkbox>
                  <p className='text-sm'>Remember Me</p>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                  </div>
                </div>
              </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full hover:cursor-pointer">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
