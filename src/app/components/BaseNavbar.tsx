import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const BaseNavbar: React.FC = () => {
    const { user } = useAuth();

    useEffect(() => {
        // Check if user is logged in
        if (user) {
            console.log('User is logged in:', user);
            // Log user details here
        }
    }, [user]);

    return (
        <nav>
            <div className='flex justify-between items-center bg-white px-10 py-5'>
                <img src="./logo.png" alt="logo" height={27} />
                <div className='flex items-center gap-x-3'>
                    <div>
                        <p className='text-xs font-bold'>{user?.name || '-'}</p>
                        <p className='text-xs'>{user?.email || '-'}</p>
                    </div>
                    <img src={user?.picture} className='rounded-full' alt="Profile" width={50} height={50} />
                </div>
            </div>
        </nav>
    );
};

export default BaseNavbar;
