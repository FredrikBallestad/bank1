
import { useRouter } from 'next/router';

const UserAccountPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  // Du kan nå hente brukerinformasjon basert på userId,
  // for eksempel gjennom en API-forespørsel til backenden din.

  return (
    <div>
      {/* Vis brukerinformasjon her basert på hentet data */}
      <h1>Konto for bruker: {userId}</h1>
    </div>
  );
};

export default UserAccountPage;