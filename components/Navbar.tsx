import { Button } from "./ui/button";


export default function Navbar() {
  return (
    
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white border-b sticky top-0 z-20">

      <div className="font-semibold">
        Welcome, Admin!
      </div>

      <Button variant="outline" className="rounded-3xl">
        Logout
      </Button>
    </header>
  )
}
