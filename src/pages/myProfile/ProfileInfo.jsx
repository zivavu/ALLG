import { useContext } from 'react';
import { UserContext } from '../authentication/UserContext';

const ProfileInfo = () => {
    const [user, setUser] = useContext(UserContext);
    return (
        <div id="profile-user-base-info">
            <span className="profile-info">
                <span className="profile-info-prefix">Jesteś zalgowany jako: </span>
                <span className="profile-info-data">{user.displayName}</span>{' '}
            </span>
            <span className="profile-info">
                <span className="profile-info-prefix">Z konta: </span>
                <span className="profile-info-data"> {user.email}</span>
            </span>
        </div>
    );
};
export default ProfileInfo;
