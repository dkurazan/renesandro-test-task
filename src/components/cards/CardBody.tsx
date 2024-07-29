import styles from './TaskCard.module.css';
import ImageLayer from './ImageLayer';
import GenerateBtn from './GenerateBtn';

type CardBodyProps = {
  images: string[];
  id: string;
};

export default function CardBody({ images, id }: CardBodyProps) {
  return (
    <>
      <div className={styles.images}>
        <h4 className={styles.title}>Images</h4>
        <div className={styles.imageLayers}>
          {images.map((image) => (
            <ImageLayer
              key={`${image}--${Math.random() * 1000}`}
              title={image}
              taskId={id}
            />
          ))}
        </div>
      </div>
      <GenerateBtn taskId={id}>Generate</GenerateBtn>
    </>
  );
}
