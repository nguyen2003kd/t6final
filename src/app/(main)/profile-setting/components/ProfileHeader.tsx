import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, User } from "lucide-react";



export default function ProfileHeader () {
  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-32 w-full bg-primary rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6 boder-1 rounded-b-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
          
          {/* Avatar */}
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-[var(--color-card)] shadow-[var(--shadow-elegant)]">
              <AvatarImage src={"/avatar.png"} alt={"tst"} />
              <AvatarFallback className="bg-[var(--gradient-primary)] text-[var(--color-primary-foreground)] text-2xl font-semibold">
                {"/avatar.png"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-2 right-2 rounded-full h-10 w-10 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)]"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-1 truncate">nguyen</h1>
            <p className="text-[var(--color-muted-foreground)] text-lg">vudinhnguy@</p>
          </div>

          {/* Edit button */}
          <Button 
            className="bg-primary hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
            size="lg"
          >
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
