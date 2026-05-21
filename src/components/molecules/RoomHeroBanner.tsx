import React from 'react';
import { Tag, Typography } from 'antd';
import {
  WifiOutlined,
  DesktopOutlined,
  VideoCameraOutlined,
  SoundOutlined,
  CoffeeOutlined,
  ProjectOutlined,
  TeamOutlined
} from '@ant-design/icons';
import type { Room } from '../../types';
import styles from './RoomHeroBanner.module.css';

const { Title, Paragraph } = Typography;

interface RoomHeroBannerProps {
  room: Room;
}

// Map amenity strings to icons for high fidelity
const getAmenityIcon = (name: string) => {
  const normalized = name.toLowerCase();
  if (normalized.includes('wi-fi') || normalized.includes('wifi')) {
    return <WifiOutlined />;
  }
  if (normalized.includes('tv') || normalized.includes('screen')) {
    return <DesktopOutlined />;
  }
  if (normalized.includes('projector')) {
    return <ProjectOutlined />;
  }
  if (normalized.includes('video') || normalized.includes('conf') || normalized.includes('camera')) {
    return <VideoCameraOutlined />;
  }
  if (normalized.includes('sound') || normalized.includes('speaker') || normalized.includes('audio')) {
    return <SoundOutlined />;
  }
  if (normalized.includes('coffee') || normalized.includes('tea') || normalized.includes('bar')) {
    return <CoffeeOutlined />;
  }
  return <TeamOutlined />;
};

export const RoomHeroBanner: React.FC<RoomHeroBannerProps> = ({ room }) => {
  return (
    <div className={styles.banner}>
      {room.image_url ? (
        <img
          src={room.image_url}
          alt={room.name}
          className={styles.coverImage}
        />
      ) : (
        <div className={styles.gradientFallback} />
      )}
      
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.badgeRow}>
            <Tag className={styles.tagFeatured}>Featured Space</Tag>
            <Tag className={styles.tagCapacity}>{room.capacity} Seats Available</Tag>
          </div>
          
          <Title className={styles.roomName}>
            {room.name}
          </Title>
          
          {room.description && (
            <Paragraph className={styles.description}>
              {room.description}
            </Paragraph>
          )}

          {room.amenities && room.amenities.length > 0 && (
            <div className={styles.amenitiesRow}>
              {room.amenities.map((amenity, idx) => (
                <Tag key={idx} className={styles.amenityTag}>
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomHeroBanner;
