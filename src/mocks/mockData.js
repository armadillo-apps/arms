export const mockApartment = {
  _id: "67890def",
  name: "Garden Shack",
  address: "10 Another Road #05-10",
  bedrooms: 2,
  capacity: 2,
  status: "active",
  landlord: {
    name: "Jack",
    accountNumber: "54321"
  },
  leases: [
    {
      _id: "5555tyu",
      leaseStart: "25 June 2019",
      leaseEnd: "24 June 2021",
      monthlyRent: 5000,
      currency: "THB"
    }
  ],
  stays: [],
  remarks: "testing",
  country: "Singapore"
};

export const mockExpiringApartment = {
  ...mockApartment,
  leases: [
    {
      leaseStart: "25 June 2019",
      leaseEnd: "24 June 2020",
      monthlyRent: 5000,
      currency: "THB"
    }
  ]
};

export const mockApartments = [
  {
    _id: "458",
    name: "Sentosa Cove",
    address: "19 Crazy Rich Asians Avenue",
    bedrooms: 100,
    capacity: 100,
    status: "inactive",
    leases: [
      {
        leaseStart: "26 June 2019",
        leaseEnd: "23 July 2019",
        monthlyRent: 30000,
        currency: "SGD"
      }
    ],
    stays: [],
    remarks: "testing",
    country: "Singapore"
  },
  {
    _id: "123",
    name: "Parc Sophia",
    address: "18 Bogus Street #01-01",
    bedrooms: 1,
    capacity: 10,
    status: "active",
    leases: [
      {
        leaseStart: "25 June 2019",
        leaseEnd: "24 June 2020",
        monthlyRent: 5000,
        currency: "THB"
      }
    ],
    stays: [],
    remarks: "testing",
    country: "Thailand"
  },
  {
    _id: "456",
    name: "Sea View",
    address: "19 Bogus Street #02-02",
    bedrooms: 2,
    capacity: 5,
    status: "active",
    leases: [
      {
        leaseStart: "26 June 2018",
        leaseEnd: "23 June 2021",
        monthlyRent: 4000,
        currency: "SGD"
      }
    ],
    stays: [],
    remarks: "testing",
    country: "Singapore"
  }
];

export const mockOccupants = [
  {
    _id: "5d36b4ade2a0d50eff851283",
    name: "Bob",
    employeeId: "1234561b",
    gender: "male",
    remarks: "testing for Bob",
    homeOffice: "Singapore, Singapore",
    status: "allocated"
  },
  {
    _id: "5d36b4ade2a0d50eff851284",
    name: "Jason",
    status: "unallocated",
    homeOffice: "North America, Dallas"
  },
  {
    _id: "5d36b4ade2a0d50eff851285",
    name: "Tim",
    status: "inactive"
  }
];

export const mockOccupantDetails = [
  {
    _id: "12345abc",
    name: "Tom",
    employeeId: "1234567a",
    remarks: "might extend stay",
    homeOffice: "Melbourne, Australia",
    gender: "male",
    status: "unallocated"
  }
];

export const guestUser = { email: "guest@email.com", role: "guest" };

export const adminUser = { email: "admin@email.com", role: "admin" };

export const modalStates = {
  success: true,
  message: "success"
};

export const mockStays = [
  {
    _id: "123",
    apartment: {
      name: "Parc Sophia",
      leases: [
        {
          _id: "5d401557d855f9677f345692",
          leaseStart: "2008-10-25T00:00:00.000Z",
          leaseEnd: "2004-12-25T00:00:00.000Z",
          monthlyRent: "6000",
          currency: "THB"
        },
        {
          _id: "5d40fb0fe45a8c76d1061ebd",
          leaseStart: "2009-11-25T00:00:00.000Z",
          leaseEnd: "2003-11-25T00:00:00.000Z",
          monthlyRent: "7000",
          currency: "SGD"
        }
      ]
    },
    leaseId: "5d401557d855f9677f345692",
    checkInDate: "2009-12-25T00:00:00.000Z",
    checkOutDate: "2019-12-25T00:00:00.000Z"
  },
  {
    _id: "234",
    apartment: {
      name: "Parc El'Royale",
      leases: [
        {
          _id: "5d401557d855f9677f345692",
          leaseStart: "2002-9-25T00:00:00.000Z",
          leaseEnd: "2003-12-25T00:00:00.000Z",
          monthlyRent: "8000",
          currency: "SGD"
        },
        {
          _id: "5d40fb0fe45a8c76d1061ebd",
          leaseStart: "2009-11-25T00:00:00.000Z",
          leaseEnd: "2003-11-25T00:00:00.000Z",
          monthlyRent: "7000",
          currency: "SGD"
        }
      ]
    },
    leaseId: "5d401557d855f9677f345692",
    checkInDate: "2002-12-25T00:00:00.000Z",
    checkOutDate: "2003-12-25T00:00:00.000Z"
  },
  {
    _id: "456",
    checkInDate: "2001-12-25T00:00:00.000Z",
    checkOutDate: "2004-12-25T00:00:00.000Z",
    apartment: {
      name: "The Beacon Condo",
      leases: [
        {
          _id: "5d401557d855f9677f345693",
          leaseStart: "2008-10-25T00:00:00.000Z",
          leaseEnd: "2004-12-25T00:00:00.000Z",
          monthlyRent: "6000",
          currency: "SGD"
        },
        {
          _id: "5d40fb0fe45a8c76d1061eb4",
          leaseStart: "2009-11-25T00:00:00.000Z",
          leaseEnd: "2003-11-25T00:00:00.000Z",
          monthlyRent: "7000",
          currency: "THB"
        }
      ]
    }
  }
];

export const mockStayHistory = [
  {
    _id: "67890123",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80017be83df",
    checkInDate: new Date("01-01-2010"),
    checkOutDate: new Date("01-01-2011"),
    leaseId: "e83724nht8",
    occupantName: "John",
    occupantRemarks: "remarks1"
  },
  {
    _id: "67890124",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80017be1234",
    checkInDate: new Date("01-01-2200"),
    checkOutDate: new Date("01-02-2300"),
    leaseId: "e83724nht8",
    occupantName: "Tim",
    occupantRemarks: "remarks2"
  },
  {
    _id: "67890125",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80016be1324",
    checkInDate: new Date("01-01-2018"),
    checkOutDate: new Date(),
    leaseId: "e83724nht8",
    occupantName: "Kai",
    occupantRemarks: "remarks3"
  }
];
