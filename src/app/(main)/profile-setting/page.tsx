import ProfileHeader from '@/app/(main)/profile-setting/components/ProfileHeader'
import FormProfile from '@/app/(main)/profile-setting/components/FormProfile'
export default function Profile(){
    return(
        <div className='flex flex-col gap-5'>
            <ProfileHeader/>
            <FormProfile/>
        </div>
    )
}