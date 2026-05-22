import React from 'react';
import { Tag } from 'antd';
import dayjs from 'dayjs';

interface BookingStatusTagProps {
  startTime: string;
  endTime: string;
}

export const BookingStatusTag: React.FC<BookingStatusTagProps> = ({ startTime, endTime }) => {
  const now = dayjs();
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  let status: 'in-progress' | 'upcoming' | 'past' = 'upcoming';
  if (now.isAfter(start) && now.isBefore(end)) {
    status = 'in-progress';
  } else if (now.isAfter(end)) {
    status = 'past';
  }

  if (status === 'in-progress') {
    return (
      <Tag color="processing" variant="filled" style={{ fontWeight: 500 }}>
        In Progress
      </Tag>
    );
  }

  if (status === 'past') {
    return (
      <Tag color="default" variant="filled" style={{ fontWeight: 500 }}>
        Ended
      </Tag>
    );
  }

  return (
    <Tag color="warning" variant="filled" style={{ fontWeight: 500 }}>
      Upcoming
    </Tag>
  );
};
