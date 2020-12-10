/** @format */

CreateIndex({
  name: 'findPlanByDate',
  unique: false,
  serialized: true,
  source: Collection('Plan'),
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
  source: Collection('Shopping'),
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
  name: 'allPlansSortedByWeek',
  unique: false,
  serialized: true,
  source: Collection('Plan'),
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

CreateIndex({
  name: 'recipes_by_ngrams',
  source: {
    collection: Collection('Recipe'),
    fields: {
      ngrams: Query(
        Lambda(
          'recipe',
          Distinct(
            NGram(LowerCase(Select(['data', 'title'], Var('recipe'))), 3, 3)
          )
        )
      )
    }
  },
  terms: [
    {
      binding: 'ngrams'
    }
  ]
});

