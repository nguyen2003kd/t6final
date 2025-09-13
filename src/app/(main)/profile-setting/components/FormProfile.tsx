import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Globe } from "lucide-react";

export default function FormProfile() {
  return (
    <div className="space-y-6 ">
      {/* Personal Information */}
      <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* First & Last name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter first name" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter last name" className="mt-2" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              className="mt-2 min-h-[100px]"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Location & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input id="location" placeholder="Enter your location" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input id="website" placeholder="Enter your website" className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Control your profile visibility and privacy preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Public Profile</Label>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to others
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
