import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BookingFormSection } from '../BookingFormSection';
import { useUI } from '../../../contexts/UIContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useCreateBooking } from '../../../hooks/useCreateBooking';
import { App } from 'antd';

vi.mock('../../../contexts/UIContext', () => ({
  useUI: vi.fn(),
}));

vi.mock('../../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../hooks/useCreateBooking', () => ({
  useCreateBooking: vi.fn(),
}));

describe('BookingFormSection', () => {
  const mockCreateBooking = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-05-21T12:00:00'));
    vi.clearAllMocks();
    vi.mocked(useUI).mockReturnValue({
      selectedRoomId: 10,
      selectRoom: vi.fn(),
      isDrawerOpen: false,
      setIsDrawerOpen: vi.fn(),
    });
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      loading: false,
    });
    vi.mocked(useCreateBooking).mockReturnValue({
      mutateAsync: mockCreateBooking,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateBooking>);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders form elements and pre-populates host name', () => {
    render(
      <App>
        <BookingFormSection />
      </App>
    );

    expect(screen.getByText('Quick Reserve')).toBeInTheDocument();
    expect(screen.getByLabelText('Meeting Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Host Name')).toBeDisabled();
    expect((screen.getByLabelText('Host Name') as HTMLInputElement).value).toBe('John Doe');
  });

  it('shows error if end time is before start time', async () => {
    render(
      <App>
        <BookingFormSection />
      </App>
    );

    fireEvent.change(screen.getByLabelText('Meeting Title'), { target: { value: 'Sync Meeting' } });
    
    const startTimeInput = screen.getByLabelText('Start Time');
    fireEvent.focus(startTimeInput);
    fireEvent.change(startTimeInput, { target: { value: '15:00' } });
    fireEvent.keyDown(startTimeInput, { key: 'Enter', code: 'Enter' });

    const endTimeInput = screen.getByLabelText('End Time');
    fireEvent.focus(endTimeInput);
    fireEvent.change(endTimeInput, { target: { value: '14:00' } });
    fireEvent.keyDown(endTimeInput, { key: 'Enter', code: 'Enter' });

    fireEvent.click(screen.getByRole('button', { name: 'Confirm Booking' }));

    await waitFor(() => {
      expect(screen.getByText('End time must be after start time.')).toBeInTheDocument();
    });
  });

  it('shows error if start time is in the past', async () => {
    render(
      <App>
        <BookingFormSection />
      </App>
    );

    fireEvent.change(screen.getByLabelText('Meeting Title'), { target: { value: 'Sync Meeting' } });
    
    const startTimeInput = screen.getByLabelText('Start Time');
    fireEvent.focus(startTimeInput);
    fireEvent.change(startTimeInput, { target: { value: '11:00' } });
    fireEvent.keyDown(startTimeInput, { key: 'Enter', code: 'Enter' });

    const endTimeInput = screen.getByLabelText('End Time');
    fireEvent.focus(endTimeInput);
    fireEvent.change(endTimeInput, { target: { value: '11:30' } });
    fireEvent.keyDown(endTimeInput, { key: 'Enter', code: 'Enter' });

    fireEvent.click(screen.getByRole('button', { name: 'Confirm Booking' }));

    await waitFor(() => {
      expect(screen.getByText('Start time cannot be in the past.')).toBeInTheDocument();
    });
  });

  it('submits form successfully and resets input fields', async () => {
    mockCreateBooking.mockResolvedValue({ id: 100 });

    render(
      <App>
        <BookingFormSection />
      </App>
    );

    fireEvent.change(screen.getByLabelText('Meeting Title'), { target: { value: 'Successful Sync' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirm Booking' }));

    await waitFor(() => {
      expect(mockCreateBooking).toHaveBeenCalled();
      expect((screen.getByLabelText('Meeting Title') as HTMLInputElement).value).toBe('');
    });
  });

  it('displays collision alert on 422 error from server', async () => {
    const mockAxiosError = {
      isAxiosError: true,
      response: {
        status: 422,
        data: {
          message: 'The room is already booked for this time period.',
          errors: {
            start_time: ['The room is already booked for this time period.'],
          },
        },
      },
    };
    
    const axiosModule = await import('axios');
    vi.spyOn(axiosModule.default, 'isAxiosError').mockReturnValue(true);

    mockCreateBooking.mockRejectedValue(mockAxiosError);

    render(
      <App>
        <BookingFormSection />
      </App>
    );

    fireEvent.change(screen.getByLabelText('Meeting Title'), { target: { value: 'Conflict Sync' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirm Booking' }));

    await waitFor(() => {
      expect(screen.getByText('The room is already booked for this time period.')).toBeInTheDocument();
    });
  });
});
