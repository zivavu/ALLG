import AdvertsSection from '../../components/advertsListSection/AdvertsSection';

function Profile() {
    return (
        <div id="profile-page">
            <AdvertsSection
                size="full-width"
                type="usersAdverts"
                header="Twoje ogłoszenia"
                noAdvertsMessage="Nie dodałeś jeszcze żadnych ogłoszeń"
            />
            <AdvertsSection
                size="full-width"
                type="watchedAdverts"
                header="Obserowane ogłoszenia"
                noAdvertsMessage="Nie masz obserowanych ogłoszeń"
            />
        </div>
    );
}
export default Profile;
