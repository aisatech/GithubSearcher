import styles from './UserProfileCard.module.css'; 

interface UserProfileCardProps {
  avatarUrl: string;
  name: string;
  bio: string;
}


function UserProfileCard({ avatarUrl, name, bio }: UserProfileCardProps) {
  return (
    <div className={styles.cardContainer}>
      <img
        src={avatarUrl}
        alt={`Foto de perfil de ${name}`}
        className={styles.avatar}
        width="100" 
        height="100"
      />
      <div className={styles.userInfo}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.bio}>{bio}</p>
      </div>
    </div>
  );
}

export default UserProfileCard;