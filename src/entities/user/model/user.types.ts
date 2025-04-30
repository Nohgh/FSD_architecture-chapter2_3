interface Address {
  address: string;
  city: string;
  state: string;
}

interface Company {
  name: string;
  title: string;
}

export interface User {
  id: number;
  age?: number;
  email?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  image: string;
  phone?: string;
  address?: Address;
  company?: Company;
}
