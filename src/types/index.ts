export interface Room {
  id: number;
  name: string;
  capacity: number;
}

export interface Booking {
  id: number;
  room_id: number;
  user_name: string;
  start_time: string;   // format "YYYY-MM-DD HH:mm:ss"
  end_time: string;     // format "YYYY-MM-DD HH:mm:ss"
  created_at?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}
