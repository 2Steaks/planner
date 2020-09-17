/** @format */

CreateRole({
  name: 'Guest',
  privileges: [
    {
      resource: Collection('User'),
      actions: {
        read: true,
        write: false,
        create: true,
        delete: false,
        history_read: false,
        history_write: false,
        unrestricted_read: false
      }
    },
    {
      resource: Index('unique_User_email'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    }
  ]
});

CreateRole({
  name: 'Auth',
  privileges: [
    {
      resource: Collection('Recipe'),
      actions: {
        read: true,
        write: Query(
          Lambda(
            ['oldData', 'newData'],
            And(
              Equals(Identity(), Select(['data', 'author'], Var('oldData'))),
              Equals(
                Select(['data', 'author'], Var('oldData')),
                Select(['data', 'author'], Var('newData'))
              )
            )
          )
        ),
        create: Query(
          Lambda(
            'values',
            Equals(Identity(), Select(['data', 'author'], Var('values')))
          )
        ),
        delete: Query(
          Lambda(
            'ref',
            Equals(Identity(), Select(['data', 'author'], Get(Var('ref'))))
          )
        ),
        history_read: false,
        history_write: false,
        unrestricted_read: false
      }
    },
    {
      resource: Collection('Plan'),
      actions: {
        read: Query(
          Lambda(
            'ref',
            Equals(Identity(), Select(['data', 'owner'], Get(Var('ref'))))
          )
        ),
        write: Query(
          Lambda(
            ['oldData', 'newData'],
            And(
              Equals(Identity(), Select(['data', 'owner'], Var('oldData'))),
              Equals(
                Select(['data', 'owner'], Var('oldData')),
                Select(['data', 'owner'], Var('newData'))
              )
            )
          )
        ),
        create: Query(
          Lambda(
            'values',
            Equals(Identity(), Select(['data', 'owner'], Var('values')))
          )
        ),
        delete: false,
        history_read: false,
        history_write: false,
        unrestricted_read: false
      }
    },
    {
      resource: Collection('Schedule'),
      actions: {
        read: Query(
          Lambda(
            'ref',
            Equals(Identity(), Select(['data', 'owner'], Get(Var('ref'))))
          )
        ),
        write: Query(
          Lambda(
            ['oldData', 'newData'],
            And(
              Equals(Identity(), Select(['data', 'owner'], Var('oldData'))),
              Equals(
                Select(['data', 'owner'], Var('oldData')),
                Select(['data', 'owner'], Var('newData'))
              )
            )
          )
        ),
        create: Query(
          Lambda(
            'values',
            Equals(Identity(), Select(['data', 'owner'], Var('values')))
          )
        ),
        delete: Query(
          Lambda(
            'ref',
            Equals(Identity(), Select(['data', 'owner'], Get(Var('ref'))))
          )
        ),
        history_read: false,
        history_write: false,
        unrestricted_read: false
      }
    },
    {
      resource: Collection('Shopping'),
      actions: {
        read: Query(
          Lambda(
            'ref',
            Equals(Identity(), Select(['data', 'owner'], Get(Var('ref'))))
          )
        ),
        write: Query(
          Lambda(
            ['oldData', 'newData'],
            And(
              Equals(Identity(), Select(['data', 'owner'], Var('oldData'))),
              Equals(
                Select(['data', 'owner'], Var('oldData')),
                Select(['data', 'owner'], Var('newData'))
              )
            )
          )
        ),
        create: Query(
          Lambda(
            'values',
            Equals(Identity(), Select(['data', 'owner'], Var('values')))
          )
        ),
        delete: false,
        history_read: false,
        history_write: false,
        unrestricted_read: false
      }
    },
    {
      resource: Collection('User'),
      actions: {
        read: true,
        write: true,
        create: false,
        delete: false,
        history_read: false,
        history_write: false,
        unrestricted_read: false
      }
    },
    {
      resource: Collection('Tag'),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: true,
        history_read: false,
        history_write: false,
        unrestricted_read: false
      }
    },
    {
      resource: Collection('recipe_tags'),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: true,
        history_read: false,
        history_write: false,
        unrestricted_read: false
      }
    },
    {
      resource: Ref(Ref('functions'), 'find_plan_by_date'),
      actions: {
        call: true
      }
    },
    {
      resource: Ref(Ref('functions'), 'find_shopping_by_date'),
      actions: {
        call: true
      }
    },
    {
      resource: Ref(Ref('functions'), 'all_plans_sorted_by_week'),
      actions: {
        call: true
      }
    },
    {
      resource: Ref(Ref('functions'), 'search_recipes_by_title'),
      actions: {
        call: true
      }
    },
    {
      resource: Index('allTags'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('allRecipes'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('unique_Recipe_title'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('recipe_tags_by_tag'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('recipe_tags_by_recipe_and_tag'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('recipe_author_by_user'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('recipe_tags_by_recipe'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('plan_schedule_by_plan'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('unique_Tag_name'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('shopping_owner_by_user'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('findPlanByDate'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('findShoppingByDate'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    },
    {
      resource: Index('allPlansSortedByWeek'),
      actions: {
        unrestricted_read: false,
        read: true
      }
    }
  ],
  membership: [
    {
      resource: Collection('User')
    }
  ]
});
