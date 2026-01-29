
import React from 'react';
import StudentProfile from '../components/StudentProfile';
import { StudentProfile as StudentProfileType, Offer } from '../types';
import { CROUS_LOCATIONS } from '../data/locations';

interface ProfilePageProps {
    profile: StudentProfileType;
    setProfile: (profile: StudentProfileType) => void;
    orders: Offer[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, setProfile, orders }) => {
    return (
        <StudentProfile
            profile={profile}
            setProfile={setProfile}
            locations={CROUS_LOCATIONS.filter(l => l !== "All Locations")}
            orders={orders}
        />
    );
};

export default ProfilePage;
