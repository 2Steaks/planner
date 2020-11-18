/** @format */

CreateFunction({
  name: 'all_plans_sorted_by_week',
  body: Query(
    Lambda(
      ['size', 'after', 'before'],
      Let(
        {
          match: Match(Index('allPlansSortedByWeek'), Identity()),
          page: If(
            Equals(Var('before'), null),
            If(
              Equals(Var('after'), null),
              Paginate(Var('match'), { size: Var('size') }),
              Paginate(Var('match'), { after: Var('after'), size: Var('size') })
            ),
            Paginate(Var('match'), { before: Var('before'), size: Var('size') })
          )
        },
        Map(Var('page'), Lambda('values', Get(Select(1, Var('values')))))
      )
    )
  )
});

CreateFunction({
  name: 'find_plan_by_date',
  body: Query(
    Lambda(
      ['week'],
      Select(
        ['data'],
        Map(
          Paginate(Match(Index('findPlanByDate'), [Var('week'), Identity()])),
          Lambda('x', Get(Var('x')))
        )
      )
    )
  )
});

CreateFunction({
  name: 'find_shopping_by_date',
  body: Query(
    Lambda(
      ['week'],
      Select(
        ['data'],
        Map(
          Paginate(
            Match(Index('findShoppingByDate'), [Var('week'), Identity()])
          ),
          Lambda('x', Get(Var('x')))
        )
      )
    )
  )
});

CreateFunction({
  name: 'search_recipes_by_title',
  body: Query(
    Lambda(
      'title',
      Map(
        Filter(
          Paginate(Match(Index('allRecipes'))),
          Lambda(
            'recipeRef',
            ContainsStr(
              LowerCase(Select(['data', 'title'], Get(Var('recipeRef')))),
              Var('title')
            )
          )
        ),
        Lambda('x', Get(Var('x')))
      )
    )
  )
});