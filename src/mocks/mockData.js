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
      leaseStart: "25 Jun 19",
      leaseEnd: "25 Jun 22",
      monthlyRent: 1000,
      currency: "SGD"
    }
  ]
};

export const mockOccupants = [
  {
    _id: "5d36b4ade2a0d50eff851283",
    name: "Bob",
    employeeId: "1234561b",
    remarks: "testing for Bob",
    homeOffice: "Singapore, Singapore",
    status: "allocated"
  },
  {
    _id: "5d36b4ade2a0d50eff851284",
    name: "Jason",
    status: "unallocated"
  },
  {
    _id: "5d36b4ade2a0d50eff851285",
    name: "Tim",
    status: "inactive"
  }
];
