/** @format */

Update(Function('all_plans_sorted_by_week'), {
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

Update(Function('find_plan_by_date'), {
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

Update(Function('find_shopping_by_date'), {
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

Update(Function('search_recipes_by_title'), {
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

Update(Function('find_favourite_recipe_by_id'), {
  name: 'find_favourite_recipe_by_id',
  role: null,
  body: Query(
    Lambda(
      ['id'],
      Select(
        ['data', 0],
        Map(
          Paginate(
            Match(Index('user_favourites_by_recipe_and_user'), [
              Ref(Collection('Recipe'), Var('id')),
              Identity()
            ])
          ),
          Lambda('x', Equals(Get(Var('x'))))
        ),
        false
      )
    )
  )
});

Update(Function('find_favourite_recipe_by_id'), {
  name: 'find_favourite_recipe_by_id',
  role: null,
  body: Query(
    Lambda(
      ['id'],
      Select(
        ['data', 0],
        Map(
          Paginate(
            Match(Index('user_favourites_by_recipe_and_user'), [
              Ref(Collection('Recipe'), Var('id')),
              Identity()
            ])
          ),
          Lambda('x', Equals(Get(Var('x'))))
        ),
        false
      )
    )
  )
});

Update(Function('search_recipes'), {
  name: 'search_recipes',
  role: null,
  body: Query(
    Lambda(
      ['title', 'calories', 'tags', 'size', 'after', 'before'],
      Let(
        {
          result: Filter(
            Match(Index('allRecipes')),
            Lambda(
              'recipe',
              And(
                If(
                  IsString(Var('title')),
                  Containsstr(
                    Trim(
                      LowerCase(Select(['data', 'title'], Get(Var('recipe'))))
                    ),
                    Trim(LowerCase(Var('title')))
                  ),
                  true
                ),
                If(
                  IsNumber(Var('calories')),
                  LTE(
                    Divide(
                      Reduce(
                        Lambda(
                          ['acc', 'value'],
                          Add(Var('acc'), Select(['calories'], Var('value')))
                        ),
                        0,
                        Select(['data', 'ingredients'], Get(Var('recipe')))
                      ),
                      Select(['data', 'serving'], Get(Var('recipe')))
                    ),
                    Var('calories')
                  ),
                  true
                )
              )
            )
          ),
          page: If(
            Equals(Var('before'), null),
            If(
              Equals(Var('after'), null),
              Paginate(Var('result'), { size: Var('size') }),
              Paginate(Var('result'), {
                after: Var('after'),
                size: Var('size')
              })
            ),
            Paginate(Var('result'), {
              before: Var('before'),
              size: Var('size')
            })
          )
        },
        Map(Var('page'), Lambda('ref', Get(Var('ref'))))
      )
    )
  )
});

Update(Function('search_recipes_optimised'), {
  name: 'search_recipes_optimised',
  role: null,
  body: Query(
    Lambda(
      ['title', 'size', 'after', 'before'],
      Let(
        {
          result: Union(
            Map(
              NGram(Var('title'), 3, 3),
              Lambda('ngram', Match(Index('recipes_by_ngrams'), Var('ngram')))
            )
          ),
          page: If(
            Equals(Var('before'), null),
            If(
              Equals(Var('after'), null),
              Paginate(Var('result'), { size: Var('size') }),
              Paginate(Var('result'), {
                after: Var('after'),
                size: Var('size')
              })
            ),
            Paginate(Var('result'), {
              before: Var('before'),
              size: Var('size')
            })
          )
        },
        Map(Var('page'), Lambda('ref', Get(Var('ref'))))
      )
    )
  )
});