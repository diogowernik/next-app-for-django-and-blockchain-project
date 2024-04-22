import { useRouter } from 'next/router';

export default function UserProfile() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <h1>Perfil de Usuário: {username}</h1>
      {/* Conteúdo do perfil do usuário */}
    </div>
  );
}
