/** @format */

CreateIndex({
  name: 'findPlanByDate',
  unique: false,
  serialized: true,
  source: 'Plan',
  terms: [
    {
      field: ['data', 'week']
    },
    {
      field: ['data', 'owner']
    }
  ]
});

CreateIndex({
  name: 'findShoppingByDate',
  unique: false,
  serialized: true,
  source: 'Plan',
  terms: [
    {
      field: ['data', 'week']
    },
    {
      field: ['data', 'owner']
    }
  ]
});

createIndex({
  name: 'allPlansSortedByWeek',
  unique: false,
  serialized: true,
  source: 'Plan',
  terms: [
    {
      field: ['data', 'owner']
    }
  ],
  values: [
    {
      field: ['data', 'week']
    },
    {
      field: ['ref']
    }
  ]
});
