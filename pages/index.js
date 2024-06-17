import styles from '../styles/Home.module.css';
import AssetTable from '../components/Assets';

export default function Home() {
  
  return (
    <div className={styles.container}>
      <AssetTable/>
    </div>
  );
}
