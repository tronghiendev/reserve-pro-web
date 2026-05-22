import React from 'react';
import { Popconfirm, Button, App } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteBooking } from '../../hooks/useDeleteBooking';

interface DeleteBookingActionProps {
  bookingId: number;
  guestName: string;
}

export const DeleteBookingAction: React.FC<DeleteBookingActionProps> = ({ bookingId, guestName }) => {
  const { mutateAsync: deleteBooking, isPending } = useDeleteBooking();
  const { message } = App.useApp();

  const handleConfirm = async () => {
    try {
      await deleteBooking(bookingId);
      message.success(`Successfully deleted booking for ${guestName}`);
    } catch {
      message.error('Failed to delete booking');
    }
  };

  return (
    <Popconfirm
      title="Delete Booking"
      description={`Are you sure you want to cancel the booking for ${guestName}?`}
      onConfirm={handleConfirm}
      okText="Yes, Cancel"
      cancelText="No"
      okButtonProps={{ danger: true, loading: isPending }}
    >
      <Button
        danger
        type="text"
        size="small"
        icon={<DeleteOutlined />}
        loading={isPending}
        onClick={(e) => e.stopPropagation()} // Prevent card click triggers
      />
    </Popconfirm>
  );
};
