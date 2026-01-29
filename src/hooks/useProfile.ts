
import { useLocalStorage } from './useLocalStorage';
import { StudentProfile } from '../types';
import { INITIAL_PROFILE } from '../data/constants';

export const useProfile = () => {
    return useLocalStorage<StudentProfile>('crous_profile', INITIAL_PROFILE);
};
