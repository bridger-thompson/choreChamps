# Chore Chart Website Project Outline

## Nov 4th:

- [ x ] Finish requirements gathering
- [ x ] Stand up client, api, and db. They can interact with one another.
- [ x ] Design DB
- [ x ] Automated deployment pipeline - CI/CD Github Actions Pipeline
  - HTTPS support
  - Live production environment
  - Linting/testing

## Nov 11th:

- [ x ] Frontend can hit backend can hit db
- [ ] Authentication for parent vs child
- [ ] Can link parent and child accounts
- [ ] Parents can select a child and that selection persists between pages (like docs)
  - Context
- [ ] Parents can configure chores for a child
  - Chores have a name, description, points, and status
- [ ] Kids can see chores for that day

## Nov 18th:

- [ ] Kids can mark a chore as complete, unable to do, skip, and in progress
- [ ] Kids can leave a note when they mark the chore
- [ ] Completing a chore gives the child points
- [ ] Completing all chores for that day gives bonus points
- [ ] Kids can cycle through future and past days

## Nov 25th:

- [ ] Parent can override their childrens points
- [ ] Parents can configure prizes for a child
  - Prizes have a name, url, image, and price
- [ ] Kids can see prizes and their point values
- [ ] Kids can purchase prizes with their points
- [ ] Pictorial navigation/menus

## Dec 2:

- [ ] Chores can be repeatable automatically from the interval the parent states
- [ ] Parents can see number of chores a child has per day, ratio/percentage of chores they completed that day/week/month, and other metadata
- [ ] Both can see a history of prizes the child has purchased
- [ ] Parent can undo a purchase
- [ ] Can toggle dark/light mode (defaults to browser setting)
  - Store in local storage

## Dec 9 (due date):

- [ ] Parent receives notification when child completes chore, leaves note, and skips chore
  - Websocket
- [ ] Parents receive a notification when their child purchases a prize
- [ ] Lots of animations, especially on the child view
- [ ] Finishing touches

## Extra Stretch Goals:

- [ ] Can optionally defer chores (parent configures for how long/often)
- [ ] Send parent an email when child purchases prize
- [ ] Multi-day streak bonuses
- [ ] Hidden games/easter eggs
- [ ] Parent analytics
- [ ] Alternative child logins
